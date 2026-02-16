"""
Admin routes for managing solutions, FAQs, and mega menu configuration
"""
from fastapi import APIRouter, HTTPException, Depends, Body
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import logging
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Get logger
logger = logging.getLogger(__name__)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

router = APIRouter(prefix="/api/admin/content", tags=["admin-content"])

# Pydantic models for requests
class FAQItem(BaseModel):
    question: str
    answer: str

class UpdateSolutionFAQs(BaseModel):
    faqs: List[FAQItem]

class UpdateMegaMenuConfig(BaseModel):
    featured: Optional[bool] = None
    popular: Optional[bool] = None
    badge: Optional[str] = None
    mega_menu_category: Optional[str] = None
    mega_menu_order: Optional[int] = None

class BulkMegaMenuConfig(BaseModel):
    solutions: List[Dict[str, Any]]  # List of {slug, featured, category, order, badge}


# ============= SOLUTION FAQs MANAGEMENT =============

@router.get("/solutions")
async def get_all_solutions_admin():
    """Get all solutions with admin fields for management"""
    try:
        solutions = await db.solutions.find(
            {},
            {
                "_id": 0,
                "id": 1,
                "slug": 1,
                "title": 1,
                "category": 1,
                "featured": 1,
                "popular": 1,
                "badge": 1,
                "mega_menu_category": 1,
                "mega_menu_order": 1,
                "faqs": 1
            }
        ).to_list(1000)
        
        return {
            "success": True,
            "data": solutions,
            "count": len(solutions)
        }
    except Exception as e:
        logger.error(f"Error fetching solutions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/solutions/{slug}")
async def get_solution_admin(slug: str):
    """Get single solution with all fields for editing"""
    try:
        solution = await db.solutions.find_one({"slug": slug}, {"_id": 0})
        
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        return {
            "success": True,
            "data": solution
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching solution: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/solutions/{slug}/faqs")
async def update_solution_faqs(slug: str, data: UpdateSolutionFAQs):
    """Update FAQs for a solution"""
    try:
        # Validate solution exists
        solution = await db.solutions.find_one({"slug": slug})
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        # Convert Pydantic models to dicts
        faqs_data = [faq.model_dump() for faq in data.faqs]
        
        # Update
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": {"faqs": faqs_data}}
        )
        
        if result.modified_count > 0:
            return {
                "success": True,
                "message": f"Updated {len(faqs_data)} FAQs for {slug}",
                "faqs_count": len(faqs_data)
            }
        else:
            return {
                "success": True,
                "message": "No changes made (FAQs already up to date)"
            }
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating FAQs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/solutions/{slug}/faqs")
async def add_faq_to_solution(slug: str, faq: FAQItem):
    """Add a new FAQ to a solution"""
    try:
        solution = await db.solutions.find_one({"slug": slug})
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        # Add new FAQ to existing array
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$push": {"faqs": faq.model_dump()}}
        )
        
        return {
            "success": True,
            "message": f"Added FAQ to {slug}"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error adding FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/solutions/{slug}/faqs/{faq_index}")
async def delete_faq_from_solution(slug: str, faq_index: int):
    """Delete a specific FAQ by index"""
    try:
        solution = await db.solutions.find_one({"slug": slug})
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        faqs = solution.get("faqs", [])
        if faq_index < 0 or faq_index >= len(faqs):
            raise HTTPException(status_code=400, detail="Invalid FAQ index")
        
        # Remove FAQ at index
        faqs.pop(faq_index)
        
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": {"faqs": faqs}}
        )
        
        return {
            "success": True,
            "message": f"Deleted FAQ #{faq_index} from {slug}"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= MEGA MENU CONFIGURATION =============

@router.get("/mega-menu/featured")
async def get_featured_solutions():
    """Get all solutions marked as featured for mega menu"""
    try:
        solutions = await db.solutions.find(
            {"featured": True},
            {
                "_id": 0,
                "slug": 1,
                "title": 1,
                "featured": 1,
                "popular": 1,
                "badge": 1,
                "mega_menu_category": 1,
                "mega_menu_order": 1
            }
        ).sort("mega_menu_order", 1).to_list(100)
        
        # Group by category
        by_category = {
            "residential": [],
            "commercial": [],
            "specialized": []
        }
        
        for sol in solutions:
            cat = sol.get("mega_menu_category", "residential")
            if cat in by_category:
                by_category[cat].append(sol)
        
        return {
            "success": True,
            "data": {
                "all": solutions,
                "by_category": by_category,
                "total_featured": len(solutions)
            }
        }
    except Exception as e:
        logger.error(f"Error fetching featured solutions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/solutions/{slug}/mega-menu")
async def update_solution_mega_menu_config(slug: str, config: UpdateMegaMenuConfig):
    """Update mega menu configuration for a solution"""
    try:
        solution = await db.solutions.find_one({"slug": slug})
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        # Build update dict (only include non-None values)
        update_data = {}
        if config.featured is not None:
            update_data["featured"] = config.featured
        if config.popular is not None:
            update_data["popular"] = config.popular
        if config.badge is not None:
            update_data["badge"] = config.badge if config.badge else None
        if config.mega_menu_category is not None:
            update_data["mega_menu_category"] = config.mega_menu_category
        if config.mega_menu_order is not None:
            update_data["mega_menu_order"] = config.mega_menu_order
        
        if not update_data:
            return {"success": True, "message": "No changes to apply"}
        
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": update_data}
        )
        
        return {
            "success": True,
            "message": f"Updated mega menu config for {slug}",
            "updated_fields": list(update_data.keys())
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating mega menu config: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mega-menu/bulk-update")
async def bulk_update_mega_menu(data: BulkMegaMenuConfig):
    """Bulk update mega menu configuration for multiple solutions"""
    try:
        updated_count = 0
        errors = []
        
        for sol_config in data.solutions:
            slug = sol_config.get("slug")
            if not slug:
                errors.append("Missing slug in configuration")
                continue
            
            update_data = {}
            if "featured" in sol_config:
                update_data["featured"] = sol_config["featured"]
            if "mega_menu_category" in sol_config:
                update_data["mega_menu_category"] = sol_config["mega_menu_category"]
            if "mega_menu_order" in sol_config:
                update_data["mega_menu_order"] = sol_config["mega_menu_order"]
            if "badge" in sol_config:
                update_data["badge"] = sol_config["badge"]
            if "popular" in sol_config:
                update_data["popular"] = sol_config["popular"]
            
            if update_data:
                result = await db.solutions.update_one(
                    {"slug": slug},
                    {"$set": update_data}
                )
                if result.modified_count > 0:
                    updated_count += 1
        
        return {
            "success": True,
            "message": f"Updated {updated_count} solutions",
            "updated_count": updated_count,
            "errors": errors if errors else None
        }
    except Exception as e:
        logger.error(f"Error in bulk update: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mega-menu/reset")
async def reset_mega_menu_config():
    """Reset all solutions to not featured (use with caution)"""
    try:
        result = await db.solutions.update_many(
            {},
            {
                "$set": {
                    "featured": False,
                    "popular": False,
                    "badge": None
                }
            }
        )
        
        return {
            "success": True,
            "message": f"Reset {result.modified_count} solutions",
            "modified_count": result.modified_count
        }
    except Exception as e:
        logger.error(f"Error resetting mega menu: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= STATISTICS =============

@router.get("/stats")
async def get_content_stats():
    """Get content statistics for dashboard"""
    try:
        total_solutions = await db.solutions.count_documents({})
        solutions_with_faqs = await db.solutions.count_documents({"faqs": {"$exists": True, "$ne": []}})
        featured_solutions = await db.solutions.count_documents({"featured": True})
        
        total_services = await db.services.count_documents({})
        total_projects = await db.projects.count_documents({})
        
        return {
            "success": True,
            "data": {
                "solutions": {
                    "total": total_solutions,
                    "with_faqs": solutions_with_faqs,
                    "featured": featured_solutions,
                    "faq_completion": f"{(solutions_with_faqs/total_solutions)*100:.1f}%" if total_solutions > 0 else "0%"
                },
                "services": {
                    "total": total_services
                },
                "projects": {
                    "total": total_projects
                }
            }
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))



# ============= SITE SETTINGS =============

@router.get("/settings/{key}")
async def get_setting(key: str):
    """Get a specific setting by key"""
    try:
        setting = await db.settings.find_one({"key": key}, {"_id": 0})
        if setting:
            return setting
        return {"key": key, "value": None}
    except Exception as e:
        logger.error(f"Error fetching setting {key}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/settings/{key}")
async def update_setting(key: str, data: dict):
    """Update a specific setting"""
    try:
        result = await db.settings.update_one(
            {"key": key},
            {"$set": {"key": key, "value": data.get("value")}},
            upsert=True
        )
        return {"success": True, "message": f"Setting '{key}' updated"}
    except Exception as e:
        logger.error(f"Error updating setting {key}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/settings")
async def get_all_settings():
    """Get all site settings"""
    try:
        settings = await db.settings.find({}, {"_id": 0}).to_list(100)
        return settings
    except Exception as e:
        logger.error(f"Error fetching settings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

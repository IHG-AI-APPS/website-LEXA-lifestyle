"""
Admin routes for comprehensive Solutions and Services management
Provides full CRUD with SEO, priority ordering, and enhanced content fields
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from uuid import uuid4
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from utils.auth import verify_admin_token
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin", tags=["admin-solutions-services"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


# ===== PYDANTIC MODELS =====

class SolutionUpdate(BaseModel):
    title: str
    slug: str
    category: str
    description: str
    long_description: Optional[str] = ""
    meta_description: Optional[str] = None
    image: str
    hero_image: Optional[str] = None
    features: List[str] = []
    process: Optional[List[dict]] = []
    icon: Optional[str] = None
    tags: List[str] = []
    brands: Optional[List[str]] = []
    feature_cards: Optional[List[dict]] = []
    faqs: Optional[List[dict]] = []
    additional_sections: Optional[List[dict]] = []
    featured: Optional[bool] = False
    popular: Optional[bool] = False
    badge: Optional[str] = None
    mega_menu_category: Optional[str] = None
    mega_menu_order: Optional[int] = 99
    priority: int = 100
    tagline: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    key_benefits: List[str] = []
    related_products: List[dict] = []
    certifications: List[str] = []
    compatible_brands: List[str] = []


class ServiceUpdate(BaseModel):
    name: str
    slug: Optional[str] = None
    title: Optional[str] = None
    description: str
    long_description: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    hero_image: Optional[str] = None
    order: int = 100
    priority: int = 100
    tagline: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    key_features: List[str] = []
    process_steps: List[dict] = []
    related_products: List[dict] = []
    certifications: List[str] = []
    faqs: List[dict] = []
    featured: bool = False


class PriorityReorder(BaseModel):
    items: List[dict]  # List of {id, priority}


# ===== SOLUTIONS ADMIN =====

@router.get("/solutions-full")
async def admin_get_all_solutions(token: dict = Depends(verify_admin_token)):
    """Get all solutions with full details for admin management"""
    try:
        solutions = await db.solutions.find({}, {"_id": 0}).sort("priority", 1).to_list(200)
        
        # Get statistics
        categories = await db.solutions.distinct("category")
        featured_count = await db.solutions.count_documents({"featured": True})
        
        return {
            "solutions": solutions,
            "total": len(solutions),
            "categories": categories,
            "featured_count": featured_count
        }
    except Exception as e:
        logger.error(f"Error fetching solutions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch solutions")


@router.get("/solutions-full/{solution_id}")
async def admin_get_solution(solution_id: str, token: dict = Depends(verify_admin_token)):
    """Get single solution by ID with all fields"""
    try:
        solution = await db.solutions.find_one(
            {"$or": [{"id": solution_id}, {"slug": solution_id}]},
            {"_id": 0}
        )
        
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        return {"solution": solution}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching solution: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch solution")


@router.post("/solutions-full")
async def admin_create_solution(solution: SolutionUpdate, token: dict = Depends(verify_admin_token)):
    """Create new solution with all fields"""
    try:
        solution_dict = solution.model_dump()
        solution_dict["id"] = str(uuid4())
        solution_dict["created_at"] = datetime.now(timezone.utc)
        solution_dict["updated_at"] = datetime.now(timezone.utc)
        
        # Check for duplicate slug
        existing = await db.solutions.find_one({"slug": solution_dict["slug"]})
        if existing:
            raise HTTPException(status_code=400, detail="Solution with this slug already exists")
        
        await db.solutions.insert_one(solution_dict)
        
        logger.info(f"Admin {token.get('username')} created solution: {solution_dict['slug']}")
        return {"success": True, "id": solution_dict["id"], "message": "Solution created successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating solution: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create solution")


@router.put("/solutions-full/{solution_id}")
async def admin_update_solution(solution_id: str, solution: SolutionUpdate, token: dict = Depends(verify_admin_token)):
    """Update solution with all fields"""
    try:
        solution_dict = solution.model_dump()
        solution_dict["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.solutions.update_one(
            {"$or": [{"id": solution_id}, {"slug": solution_id}]},
            {"$set": solution_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        logger.info(f"Admin {token.get('username')} updated solution: {solution_id}")
        return {"success": True, "message": "Solution updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating solution: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update solution")


@router.delete("/solutions-full/{solution_id}")
async def admin_delete_solution(solution_id: str, token: dict = Depends(verify_admin_token)):
    """Delete solution"""
    try:
        result = await db.solutions.delete_one(
            {"$or": [{"id": solution_id}, {"slug": solution_id}]}
        )
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        
        logger.info(f"Admin {token.get('username')} deleted solution: {solution_id}")
        return {"success": True, "message": "Solution deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting solution: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete solution")


@router.patch("/solutions-full/{solution_id}")
async def admin_patch_solution(solution_id: str, updates: Dict[str, Any], token: dict = Depends(verify_admin_token)):
    """Partially update a solution (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        updates["updated_at"] = datetime.now(timezone.utc)
        result = await db.solutions.update_one(
            {"$or": [{"id": solution_id}, {"slug": solution_id}]},
            {"$set": updates}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        logger.info(f"Admin {token.get('username')} patched solution: {solution_id}")
        return {"success": True, "message": "Solution patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching solution: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch solution")


@router.put("/solutions-full/reorder")
async def admin_reorder_solutions(data: PriorityReorder, token: dict = Depends(verify_admin_token)):
    """Bulk update solution priorities for reordering"""
    try:
        updated_count = 0
        for item in data.items:
            result = await db.solutions.update_one(
                {"$or": [{"id": item["id"]}, {"slug": item["id"]}]},
                {"$set": {"priority": item["priority"], "updated_at": datetime.now(timezone.utc)}}
            )
            if result.modified_count > 0:
                updated_count += 1
        
        logger.info(f"Admin {token.get('username')} reordered {updated_count} solutions")
        return {"success": True, "updated_count": updated_count, "message": f"Reordered {updated_count} solutions"}
    except Exception as e:
        logger.error(f"Error reordering solutions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to reorder solutions")


# ===== SERVICES ADMIN =====

@router.get("/services")
async def admin_get_all_services(token: dict = Depends(verify_admin_token)):
    """Get all services with full details for admin management"""
    try:
        services = await db.services.find({}, {"_id": 0}).sort("priority", 1).to_list(200)
        
        # Ensure all services have required fields with defaults
        for service in services:
            service.setdefault("priority", 100)
            service.setdefault("key_features", [])
            service.setdefault("process_steps", [])
            service.setdefault("related_products", [])
            service.setdefault("certifications", [])
            service.setdefault("faqs", [])
            service.setdefault("featured", False)
        
        featured_count = await db.services.count_documents({"featured": True})
        
        return {
            "services": services,
            "total": len(services),
            "featured_count": featured_count
        }
    except Exception as e:
        logger.error(f"Error fetching services: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")


@router.get("/services/{service_id}")
async def admin_get_service(service_id: str, token: dict = Depends(verify_admin_token)):
    """Get single service by ID with all fields"""
    try:
        service = await db.services.find_one(
            {"$or": [{"id": service_id}, {"slug": service_id}]},
            {"_id": 0}
        )
        
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        # Ensure defaults
        service.setdefault("priority", 100)
        service.setdefault("key_features", [])
        service.setdefault("process_steps", [])
        service.setdefault("related_products", [])
        service.setdefault("certifications", [])
        service.setdefault("faqs", [])
        
        return {"service": service}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching service: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch service")


@router.post("/services")
async def admin_create_service(service: ServiceUpdate, token: dict = Depends(verify_admin_token)):
    """Create new service with all fields"""
    try:
        service_dict = service.model_dump()
        service_dict["id"] = str(uuid4())
        service_dict["created_at"] = datetime.now(timezone.utc)
        service_dict["updated_at"] = datetime.now(timezone.utc)
        
        # Generate slug if not provided
        if not service_dict.get("slug"):
            service_dict["slug"] = service_dict["name"].lower().replace(" ", "-").replace("&", "and")
        
        # Check for duplicate slug
        existing = await db.services.find_one({"slug": service_dict["slug"]})
        if existing:
            raise HTTPException(status_code=400, detail="Service with this slug already exists")
        
        await db.services.insert_one(service_dict)
        
        logger.info(f"Admin {token.get('username')} created service: {service_dict['slug']}")
        return {"success": True, "id": service_dict["id"], "message": "Service created successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating service: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create service")


@router.put("/services/{service_id}")
async def admin_update_service(service_id: str, service: ServiceUpdate, token: dict = Depends(verify_admin_token)):
    """Update service with all fields"""
    try:
        service_dict = service.model_dump()
        service_dict["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.services.update_one(
            {"$or": [{"id": service_id}, {"slug": service_id}]},
            {"$set": service_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        logger.info(f"Admin {token.get('username')} updated service: {service_id}")
        return {"success": True, "message": "Service updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating service: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update service")


@router.delete("/services/{service_id}")
async def admin_delete_service(service_id: str, token: dict = Depends(verify_admin_token)):
    """Delete service"""
    try:
        result = await db.services.delete_one(
            {"$or": [{"id": service_id}, {"slug": service_id}]}
        )
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        logger.info(f"Admin {token.get('username')} deleted service: {service_id}")
        return {"success": True, "message": "Service deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting service: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete service")


@router.patch("/services/{service_id}")
async def admin_patch_service(service_id: str, updates: Dict[str, Any], token: dict = Depends(verify_admin_token)):
    """Partially update a service (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        updates["updated_at"] = datetime.now(timezone.utc)
        result = await db.services.update_one(
            {"$or": [{"id": service_id}, {"slug": service_id}]},
            {"$set": updates}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        logger.info(f"Admin {token.get('username')} patched service: {service_id}")
        return {"success": True, "message": "Service patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching service: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch service")


@router.put("/services/reorder")
async def admin_reorder_services(data: PriorityReorder, token: dict = Depends(verify_admin_token)):
    """Bulk update service priorities for reordering"""
    try:
        updated_count = 0
        for item in data.items:
            result = await db.services.update_one(
                {"$or": [{"id": item["id"]}, {"slug": item["id"]}]},
                {"$set": {"priority": item["priority"], "order": item["priority"], "updated_at": datetime.now(timezone.utc)}}
            )
            if result.modified_count > 0:
                updated_count += 1
        
        logger.info(f"Admin {token.get('username')} reordered {updated_count} services")
        return {"success": True, "updated_count": updated_count, "message": f"Reordered {updated_count} services"}
    except Exception as e:
        logger.error(f"Error reordering services: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to reorder services")

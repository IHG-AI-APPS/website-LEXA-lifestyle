"""
Package Enhancement API Routes
"""
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api/packages", tags=["package-enhancements"])

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/enhancements")
async def get_package_enhancements(tier: str = None, category: str = None):
    """
    Get available enhancements and optional add-ons
    - tier: Filter by package tier (essential, enhanced, highend)
    - category: Filter by category (Lighting, Security, Climate, etc.)
    """
    try:
        query = {}
        
        if tier:
            query["$or"] = [
                {"applies_to_tiers": tier},
                {"included_in_tier": {"$ne": tier}}  # Not already included
            ]
        
        if category:
            query["category"] = category
        
        enhancements = await db.package_enhancements.find(query, {"_id": 0}).to_list(100)
        
        # Group by category
        by_category = {}
        for enh in enhancements:
            cat = enh.get('category', 'Other')
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(enh)
        
        return {
            "enhancements": enhancements,
            "by_category": by_category,
            "total_count": len(enhancements)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/enhancements/summary")
async def get_enhancements_summary():
    """Get summary of available enhancements by category"""
    try:
        enhancements = await db.package_enhancements.find({}, {"_id": 0}).to_list(100)
        
        categories = {}
        for enh in enhancements:
            cat = enh.get('category', 'Other')
            if cat not in categories:
                categories[cat] = {
                    "count": 0,
                    "total_value": 0,
                    "items": []
                }
            categories[cat]["count"] += 1
            categories[cat]["total_value"] += enh.get('base_price_aed', 0)
            categories[cat]["items"].append({
                "name": enh.get('name'),
                "price": enh.get('base_price_aed'),
                "type": enh.get('type')
            })
        
        return {
            "categories": categories,
            "total_enhancements": len(enhancements),
            "total_potential_value": sum(enh.get('base_price_aed', 0) for enh in enhancements)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

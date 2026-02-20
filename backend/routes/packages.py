"""
Property Package Routes
Smart Home Packages API
"""
from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
import logging

router = APIRouter(prefix="/api/packages", tags=["packages"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/property-types")
async def get_property_types():
    """Get all property package types"""
    try:
        packages = await db.property_packages.find(
            {"featured": True},
            {"_id": 0, "slug": 1, "title": 1, "subtitle": 1, "description": 1, 
             "hero_image": 1, "image": 1, "display_order": 1}
        ).sort("display_order", 1).to_list(20)
        
        # Normalize image field
        for pkg in packages:
            if not pkg.get('image') and pkg.get('hero_image'):
                pkg['image'] = pkg['hero_image']
        
        return {"packages": packages}
    except Exception as e:
        logger.error(f"Property types error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch property types")


@router.get("/property-types/{slug}")
async def get_property_package(slug: str):
    """Get complete package details with all tiers"""
    try:
        package = await db.property_packages.find_one({"slug": slug}, {"_id": 0})
        
        if not package:
            raise HTTPException(status_code=404, detail="Property package not found")
        
        return package
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Property package error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch property package")


@router.get("/specialty-rooms")
async def get_specialty_rooms():
    """Get all available specialty room add-ons"""
    try:
        rooms = await db.specialty_rooms.find({}, {"_id": 0}).sort("category", 1).to_list(50)
        return {"specialty_rooms": rooms}
    except Exception as e:
        logger.error(f"Specialty rooms error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch specialty rooms")


@router.get("/enhancements")
async def get_package_enhancements(
    tier: Optional[str] = Query(None, description="Filter by tier: essential, enhanced, highend"),
    category: Optional[str] = Query(None, description="Filter by category: Lighting, Security, etc.")
):
    """Get available enhancements and optional add-ons"""
    try:
        query = {}
        
        if tier:
            query["applies_to_tiers"] = tier
        
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
        logger.error(f"Enhancements error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch enhancements")


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
        logger.error(f"Enhancement summary error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch enhancement summary")


@router.get("/control-systems")
async def get_control_systems(tier: Optional[str] = Query(None, description="Filter by tier level")):
    """Get available control/automation systems"""
    try:
        query = {}
        
        if tier:
            query["recommended_for_tiers"] = tier
        
        systems = await db.control_systems.find(query, {"_id": 0}).sort("featured", -1).to_list(20)
        
        return {
            "control_systems": systems,
            "total_count": len(systems)
        }
    
    except Exception as e:
        logger.error(f"Control systems error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch control systems")


@router.get("/brand-options")
async def get_brand_options(tier: Optional[str] = Query(None, description="Filter by tier level")):
    """Get available brand/product selection options"""
    try:
        query = {}
        
        if tier:
            query["applies_to_tiers"] = tier
        
        brand_options = await db.brand_options.find(query, {"_id": 0}).to_list(50)
        
        return {
            "brand_options": brand_options,
            "total_categories": len(brand_options)
        }
    
    except Exception as e:
        logger.error(f"Brand options error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch brand options")


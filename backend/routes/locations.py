"""
Location Pages API Routes
Dynamic location content management
"""
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
import logging

router = APIRouter(prefix="/api/locations", tags=["locations"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("")
async def get_locations():
    """Get all locations"""
    try:
        locations = await db.locations.find({}, {"_id": 0}).sort("display_order", 1).to_list(50)
        return {"locations": locations}
    except Exception as e:
        logger.error(f"Locations fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch locations")


@router.get("/{slug}")
async def get_location(slug: str):
    """Get a single location by slug"""
    try:
        location = await db.locations.find_one({"slug": slug}, {"_id": 0})
        if not location:
            raise HTTPException(status_code=404, detail="Location not found")
        return location
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Location fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch location")


@router.put("/{slug}")
async def update_location(slug: str, data: dict):
    """Update a location (admin)"""
    try:
        data.pop("_id", None)
        result = await db.locations.update_one({"slug": slug}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Location not found")
        updated = await db.locations.find_one({"slug": slug}, {"_id": 0})
        return updated
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Location update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update location")

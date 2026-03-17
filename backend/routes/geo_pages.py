"""
Geo Pages Management API
Full CRUD for location-specific landing pages with rich content
"""
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
import logging

router = APIRouter(prefix="/api/geo-pages", tags=["Geo Pages"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("")
async def get_all_geo_pages():
    """Get all geo pages (list view with minimal fields)"""
    try:
        pages = await db.geo_pages.find(
            {},
            {"_id": 0, "slug": 1, "locationName": 1, "region": 1, "heroTitle": 1, "heroHighlight": 1, "active": 1}
        ).sort("locationName", 1).to_list(100)
        return {"geo_pages": pages}
    except Exception as e:
        logger.error(f"Geo pages list error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch geo pages")


@router.get("/slug/{slug:path}")
async def get_geo_page_by_slug(slug: str):
    """Get a single geo page by its slug path (e.g. 'dubai/palm-jumeirah-smart-homes')"""
    try:
        page = await db.geo_pages.find_one({"slug": slug}, {"_id": 0})
        if not page:
            raise HTTPException(status_code=404, detail="Geo page not found")
        return page
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Geo page fetch error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch geo page")


@router.put("/slug/{slug:path}")
async def update_geo_page(slug: str, data: dict):
    """Update a geo page by slug (admin)"""
    try:
        data.pop("_id", None)
        data.pop("slug", None)  # Don't allow slug changes
        result = await db.geo_pages.update_one({"slug": slug}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Geo page not found")
        updated = await db.geo_pages.find_one({"slug": slug}, {"_id": 0})
        return updated
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Geo page update error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update geo page")


@router.post("")
async def create_geo_page(data: dict):
    """Create a new geo page"""
    try:
        data.pop("_id", None)
        if not data.get("slug"):
            raise HTTPException(status_code=400, detail="slug is required")
        existing = await db.geo_pages.find_one({"slug": data["slug"]})
        if existing:
            raise HTTPException(status_code=400, detail="A page with this slug already exists")
        await db.geo_pages.insert_one(data)
        created = await db.geo_pages.find_one({"slug": data["slug"]}, {"_id": 0})
        return created
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Geo page create error: {e}")
        raise HTTPException(status_code=500, detail="Failed to create geo page")


@router.delete("/slug/{slug:path}")
async def delete_geo_page(slug: str):
    """Delete a geo page by slug"""
    try:
        result = await db.geo_pages.delete_one({"slug": slug})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Geo page not found")
        return {"message": "Geo page deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Geo page delete error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete geo page")

"""Public brands and products routes"""
from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.content import Brand, ProductCategory, Video
from datetime import datetime
import os
import logging

router = APIRouter(prefix="/api", tags=["brands-products"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/brands", response_model=List[Brand])
async def get_brands(category: Optional[str] = None, featured: Optional[bool] = None):
    """Get all brands, optionally filtered by category or featured status. Sorted by priority (lower = first)"""
    try:
        query = {}
        if category:
            query["categories"] = category
        if featured is not None:
            query["featured"] = featured
        
        # Sort by priority (ascending) first, then by name
        brands = await db.brands.find(query, {"_id": 0}).sort([("priority", 1), ("name", 1)]).to_list(200)
        return brands
    except Exception as e:
        logger.error(f"Get brands error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch brands")


@router.get("/brands/{slug}", response_model=Brand)
async def get_brand(slug: str):
    """Get a single brand by slug"""
    try:
        brand = await db.brands.find_one({"slug": slug}, {"_id": 0})
        if not brand:
            raise HTTPException(status_code=404, detail="Brand not found")
        return brand
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get brand error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch brand")


@router.put("/brands/reorder")
async def reorder_brands(priorities: List[dict]):
    """
    Update brand priorities in bulk.
    Expects: [{"id": "brand-id", "priority": 1}, ...]
    """
    try:
        for item in priorities:
            await db.brands.update_one(
                {"id": item["id"]},
                {"$set": {"priority": item["priority"]}}
            )
        return {"message": "Brand priorities updated successfully"}
    except Exception as e:
        logger.error(f"Reorder brands error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update brand priorities")



@router.get("/products", response_model=List[ProductCategory])
async def get_product_categories(featured: Optional[bool] = None):
    """Get all product categories"""
    try:
        query = {}
        if featured is not None:
            query["featured"] = featured
        
        products = await db.product_categories.find(query, {"_id": 0}).sort([("name", 1)]).to_list(100)
        return products
    except Exception as e:
        logger.error(f"Get products error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")


@router.get("/products/{slug}", response_model=ProductCategory)
async def get_product_category(slug: str):
    """Get a single product category by slug"""
    try:
        product = await db.product_categories.find_one({"slug": slug}, {"_id": 0})
        if not product:
            raise HTTPException(status_code=404, detail="Product category not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product")


@router.get("/videos", response_model=List[Video])
async def get_videos(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = Query(default=50, le=100),
    related_service: Optional[str] = None,
    related_project: Optional[str] = None
):
    """Get all videos, optionally filtered by category, service, or project"""
    try:
        query = {}
        if category:
            query["category"] = category
        if featured is not None:
            query["featured"] = featured
        if related_service:
            query["related_service"] = related_service
        if related_project:
            query["related_project"] = related_project
        
        videos = await db.videos.find(query, {"_id": 0}).sort([("published_date", -1)]).limit(limit).to_list(limit)
        return videos
    except Exception as e:
        logger.error(f"Get videos error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch videos")


@router.get("/videos/{video_id}", response_model=Video)
async def get_video(video_id: str):
    """Get a single video by ID"""
    try:
        video = await db.videos.find_one({"id": video_id}, {"_id": 0})
        if not video:
            raise HTTPException(status_code=404, detail="Video not found")
        return video
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get video error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch video")

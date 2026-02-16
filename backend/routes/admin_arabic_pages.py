"""
Admin routes for managing Arabic SEO pages
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timezone
import logging
import os
from motor.motor_asyncio import AsyncIOMotorClient

logger = logging.getLogger(__name__)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

router = APIRouter(prefix="/api/admin/arabic-pages", tags=["admin-arabic-pages"])

# Pydantic models
class ArabicPageCreate(BaseModel):
    slug: str
    title: str
    meta_title: str
    meta_description: str
    meta_keywords: List[str]
    canonical_url: str
    english_alternate_url: Optional[str] = None
    page_type: str  # 'landing' or 'blog'
    hero_title: str
    hero_subtitle: str
    hero_description: Optional[str] = None
    content_sections: List[dict]  # Flexible content structure
    cta_text: Optional[str] = "احجز استشارة مجانية"
    cta_url: Optional[str] = "/contact"
    published: bool = True
    priority: float = 0.8  # Sitemap priority

class ArabicPageUpdate(BaseModel):
    title: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[List[str]] = None
    canonical_url: Optional[str] = None
    english_alternate_url: Optional[str] = None
    page_type: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_description: Optional[str] = None
    content_sections: Optional[List[dict]] = None
    cta_text: Optional[str] = None
    cta_url: Optional[str] = None
    published: Optional[bool] = None
    priority: Optional[float] = None


@router.get("")
async def get_all_arabic_pages():
    """Get all Arabic SEO pages"""
    try:
        pages = await db.arabic_seo_pages.find(
            {},
            {"_id": 0}
        ).sort("created_at", -1).to_list(1000)
        
        return {
            "success": True,
            "data": pages,
            "count": len(pages)
        }
    except Exception as e:
        logger.error(f"Error fetching Arabic pages: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{slug}")
async def get_arabic_page(slug: str):
    """Get single Arabic page by slug"""
    try:
        page = await db.arabic_seo_pages.find_one({"slug": slug}, {"_id": 0})
        
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return {
            "success": True,
            "data": page
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching Arabic page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
async def create_arabic_page(page_data: ArabicPageCreate):
    """Create new Arabic SEO page"""
    try:
        # Check if slug already exists
        existing = await db.arabic_seo_pages.find_one({"slug": page_data.slug})
        if existing:
            raise HTTPException(status_code=400, detail="Page with this slug already exists")
        
        # Create page document
        page_doc = page_data.dict()
        page_doc["created_at"] = datetime.now(timezone.utc).isoformat()
        page_doc["updated_at"] = datetime.now(timezone.utc).isoformat()
        
        await db.arabic_seo_pages.insert_one(page_doc)
        
        return {
            "success": True,
            "message": "Arabic page created successfully",
            "slug": page_data.slug
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating Arabic page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{slug}")
async def update_arabic_page(slug: str, page_data: ArabicPageUpdate):
    """Update existing Arabic page"""
    try:
        # Check if page exists
        existing = await db.arabic_seo_pages.find_one({"slug": slug})
        if not existing:
            raise HTTPException(status_code=404, detail="Page not found")
        
        # Prepare update data (only include fields that were provided)
        update_data = {k: v for k, v in page_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
        
        await db.arabic_seo_pages.update_one(
            {"slug": slug},
            {"$set": update_data}
        )
        
        return {
            "success": True,
            "message": "Arabic page updated successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating Arabic page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{slug}")
async def delete_arabic_page(slug: str):
    """Delete Arabic page"""
    try:
        result = await db.arabic_seo_pages.delete_one({"slug": slug})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return {
            "success": True,
            "message": "Arabic page deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting Arabic page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/public/{slug}")
async def get_public_arabic_page(slug: str):
    """Public endpoint to fetch Arabic page for rendering (no auth required)"""
    try:
        page = await db.arabic_seo_pages.find_one(
            {"slug": slug, "published": True},
            {"_id": 0}
        )
        
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        
        return {
            "success": True,
            "data": page
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching public Arabic page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/public/list/all")
async def get_all_published_arabic_pages():
    """Public endpoint to list all published Arabic pages for sitemap"""
    try:
        pages = await db.arabic_seo_pages.find(
            {"published": True},
            {"_id": 0, "slug": 1, "priority": 1, "updated_at": 1, "page_type": 1}
        ).to_list(1000)
        
        return {
            "success": True,
            "data": pages
        }
    except Exception as e:
        logger.error(f"Error fetching published Arabic pages: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

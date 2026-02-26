"""Public API routes - health, root, leads, news"""
from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.content import News
from models.submissions import LeadRequest
from utils.cache import cache
from datetime import datetime, timezone
import os
import logging
import uuid

router = APIRouter(prefix="/api", tags=["public"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/")
async def root():
    return {"message": "LEXA Lifestyle API", "version": "2.0.0", "status": "operational"}


@router.get("/health")
async def health_check():
    try:
        await db.command('ping')
        return {"status": "healthy", "database": "connected", "timestamp": datetime.now(timezone.utc).isoformat()}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")


@router.post("/leads")
async def create_lead(lead: LeadRequest):
    """Create a generic lead"""
    try:
        lead_doc = lead.model_dump()
        lead_doc['id'] = str(uuid.uuid4())
        lead_doc['timestamp'] = datetime.now(timezone.utc).isoformat()
        await db.leads.insert_one(lead_doc)
        return {"message": "Lead created successfully", "id": lead_doc['id']}
    except Exception as e:
        logger.error(f"Lead creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create lead")


@router.get("/news", response_model=List[News])
async def get_news(limit: Optional[int] = None, category: Optional[str] = None):
    """Get all news articles"""
    try:
        cache_key = f"news:cat={category}:limit={limit}"
        cached = await cache.get(cache_key)
        if cached is not None:
            return cached
        query = {}
        if category:
            query["category"] = category
        
        cursor = db.news.find(query, {"_id": 0}).sort([("published_date", -1)])
        if limit:
            cursor = cursor.limit(limit)
        
        news = await cursor.to_list(1000)
        return news
    except Exception as e:
        logger.error(f"Get news error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")


@router.get("/news/{slug}", response_model=News)
async def get_news_item(slug: str):
    """Get a single news item by slug"""
    try:
        news_item = await db.news.find_one({"slug": slug}, {"_id": 0})
        if not news_item:
            raise HTTPException(status_code=404, detail="News not found")
        return news_item
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get news item error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch news item")


@router.get("/case-studies/{slug}")
async def get_case_study(slug: str):
    """Get a case study by slug"""
    try:
        case_study = await db.case_studies.find_one({"slug": slug}, {"_id": 0})
        if not case_study:
            case_study = await db.projects.find_one({"id": slug}, {"_id": 0})
        if not case_study:
            case_study = await db.projects.find_one({"slug": slug}, {"_id": 0})
        if not case_study:
            raise HTTPException(status_code=404, detail="Case study not found")
        return case_study
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get case study error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch case study")

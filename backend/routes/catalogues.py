"""Catalogue routes - Public and Admin CRUD"""
from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.content import Catalogue
import os
import logging

router = APIRouter(prefix="/api", tags=["catalogues"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/catalogues", response_model=List[Catalogue])
async def get_catalogues(category: Optional[str] = None, brand_slug: Optional[str] = None):
    """Get all published catalogues, optionally filtered"""
    query = {"published": True}
    if category:
        query["category"] = category
    if brand_slug:
        query["brand_slug"] = brand_slug
    catalogues = await db.catalogues.find(query, {"_id": 0}).sort([("priority", 1), ("title", 1)]).to_list(200)
    return catalogues


@router.get("/catalogues/{slug}", response_model=Catalogue)
async def get_catalogue(slug: str):
    """Get a single catalogue by slug"""
    cat = await db.catalogues.find_one({"slug": slug}, {"_id": 0})
    if not cat:
        raise HTTPException(status_code=404, detail="Catalogue not found")
    return cat

"""
Geo Pages Management API
Handles CRUD operations for location-specific landing pages (Dubai areas, Abu Dhabi areas)
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
from bson import ObjectId
import os

router = APIRouter(prefix="/api/geo-pages", tags=["Geo Pages"])

# MongoDB connection
from pymongo import MongoClient
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "lexa_db")
client = MongoClient(MONGO_URL)
db = client[DB_NAME]
geo_pages_collection = db["geo_pages"]

# Models
class GeoPageCommunity(BaseModel):
    name: str
    type: str
    price_range: Optional[str] = None
    projects_count: Optional[str] = None

class GeoPageFAQ(BaseModel):
    question: str
    answer: str

class GeoPageCreate(BaseModel):
    slug: str  # e.g., "abu-dhabi/saadiyat-island-smart-homes"
    title: str
    meta_description: str
    meta_keywords: Optional[str] = ""
    region: str  # "dubai" or "abu-dhabi"
    area_name: str  # e.g., "Saadiyat Island"
    hero_headline: str
    hero_subheadline: str
    hero_image_url: Optional[str] = ""
    communities: List[GeoPageCommunity] = []
    faqs: List[GeoPageFAQ] = []
    stats: Optional[dict] = {}
    whatsapp_prefill: Optional[str] = ""
    active: bool = True

class GeoPageUpdate(GeoPageCreate):
    pass

# Helper to serialize MongoDB documents
def serialize_geo_page(page):
    if page:
        page["id"] = str(page.pop("_id"))
        if "created_at" in page:
            page["created_at"] = page["created_at"].isoformat() if isinstance(page["created_at"], datetime) else page["created_at"]
        if "updated_at" in page:
            page["updated_at"] = page["updated_at"].isoformat() if isinstance(page["updated_at"], datetime) else page["updated_at"]
    return page

# Routes
@router.get("")
async def get_all_geo_pages():
    """Get all geo pages"""
    pages = list(geo_pages_collection.find().sort("region", 1))
    return {"geo_pages": [serialize_geo_page(p) for p in pages]}

@router.get("/by-region/{region}")
async def get_geo_pages_by_region(region: str):
    """Get geo pages by region (dubai or abu-dhabi)"""
    pages = list(geo_pages_collection.find({"region": region}))
    return {"geo_pages": [serialize_geo_page(p) for p in pages]}

@router.get("/{page_id}")
async def get_geo_page(page_id: str):
    """Get single geo page by ID"""
    try:
        page = geo_pages_collection.find_one({"_id": ObjectId(page_id)})
        if not page:
            raise HTTPException(status_code=404, detail="Geo page not found")
        return serialize_geo_page(page)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("")
async def create_geo_page(page: GeoPageCreate):
    """Create a new geo page"""
    # Check if slug already exists
    existing = geo_pages_collection.find_one({"slug": page.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A page with this slug already exists")
    
    page_data = page.dict()
    page_data["created_at"] = datetime.now(timezone.utc)
    page_data["updated_at"] = datetime.now(timezone.utc)
    
    result = geo_pages_collection.insert_one(page_data)
    page_data["id"] = str(result.inserted_id)
    if "_id" in page_data:
        del page_data["_id"]
    
    return {"message": "Geo page created successfully", "geo_page": page_data}

@router.put("/{page_id}")
async def update_geo_page(page_id: str, page: GeoPageUpdate):
    """Update a geo page"""
    try:
        existing = geo_pages_collection.find_one({"_id": ObjectId(page_id)})
        if not existing:
            raise HTTPException(status_code=404, detail="Geo page not found")
        
        page_data = page.dict()
        page_data["updated_at"] = datetime.now(timezone.utc)
        
        geo_pages_collection.update_one(
            {"_id": ObjectId(page_id)},
            {"$set": page_data}
        )
        
        return {"message": "Geo page updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{page_id}")
async def delete_geo_page(page_id: str):
    """Delete a geo page"""
    try:
        result = geo_pages_collection.delete_one({"_id": ObjectId(page_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Geo page not found")
        return {"message": "Geo page deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/seed-defaults")
async def seed_default_geo_pages():
    """Seed default geo pages if collection is empty"""
    count = geo_pages_collection.count_documents({})
    if count > 0:
        return {"message": f"Geo pages already exist ({count} pages). Skipping seed."}
    
    default_pages = [
        {
            "slug": "dubai/palm-jumeirah-smart-homes",
            "title": "Smart Home Automation Palm Jumeirah | LEXA",
            "meta_description": "Palm Jumeirah's premier smart home automation. Control4 & Crestron for signature villas, frond villas, apartments. 15+ years Dubai experience.",
            "meta_keywords": "smart home Palm Jumeirah, home automation Palm, Control4 Palm Jumeirah",
            "region": "dubai",
            "area_name": "Palm Jumeirah",
            "hero_headline": "Smart Home Automation Palm Jumeirah",
            "hero_subheadline": "Premium automation for Dubai's iconic island destination.",
            "active": True
        },
        {
            "slug": "dubai/emirates-hills-villa-automation",
            "title": "Emirates Hills Villa Automation | LEXA",
            "meta_description": "Emirates Hills smart home specialists. Luxury villa automation with Control4, Crestron, Lutron. Golf course views with intelligent living.",
            "meta_keywords": "smart home Emirates Hills, villa automation Emirates Hills",
            "region": "dubai",
            "area_name": "Emirates Hills",
            "hero_headline": "Villa Automation Emirates Hills",
            "hero_subheadline": "Intelligent living for Dubai's most prestigious address.",
            "active": True
        },
        {
            "slug": "dubai/downtown-dubai-penthouse-automation",
            "title": "Downtown Dubai Penthouse Automation | LEXA",
            "meta_description": "Downtown Dubai smart home experts. Penthouse & apartment automation near Burj Khalifa. High-rise specialists.",
            "meta_keywords": "smart home Downtown Dubai, penthouse automation Dubai",
            "region": "dubai",
            "area_name": "Downtown Dubai",
            "hero_headline": "Penthouse Automation Downtown Dubai",
            "hero_subheadline": "Smart living with Burj Khalifa views.",
            "active": True
        },
        {
            "slug": "dubai/dubai-hills-smart-villas",
            "title": "Dubai Hills Smart Villas | LEXA",
            "meta_description": "Dubai Hills Estate smart home automation. Family villas with intelligent living. Golf course community specialists.",
            "meta_keywords": "smart home Dubai Hills, villa automation Dubai Hills Estate",
            "region": "dubai",
            "area_name": "Dubai Hills Estate",
            "hero_headline": "Smart Villas Dubai Hills",
            "hero_subheadline": "Family-focused automation for modern golf course living.",
            "active": True
        },
        {
            "slug": "abu-dhabi/luxury-home-automation",
            "title": "Luxury Home Automation Abu Dhabi | LEXA",
            "meta_description": "Abu Dhabi's premier smart home automation. Serving Saadiyat, Yas Island, Al Reem. 15+ years UAE experience.",
            "meta_keywords": "smart home Abu Dhabi, home automation Abu Dhabi, Control4 Abu Dhabi",
            "region": "abu-dhabi",
            "area_name": "Abu Dhabi",
            "hero_headline": "Luxury Home Automation Abu Dhabi",
            "hero_subheadline": "Premium smart living across the capital.",
            "active": True
        },
        {
            "slug": "abu-dhabi/saadiyat-island-smart-homes",
            "title": "Smart Home Automation Saadiyat Island | LEXA",
            "meta_description": "Saadiyat Island smart home specialists. Cultural district villas, beachfront properties. Premium Control4 integration.",
            "meta_keywords": "smart home Saadiyat Island, home automation Saadiyat",
            "region": "abu-dhabi",
            "area_name": "Saadiyat Island",
            "hero_headline": "Smart Home Automation Saadiyat Island",
            "hero_subheadline": "Premium automation for Abu Dhabi's cultural district.",
            "active": True
        },
        {
            "slug": "abu-dhabi/yas-island-villa-automation",
            "title": "Smart Home Automation Yas Island | LEXA",
            "meta_description": "Yas Island smart home experts. Yas Acres, West Yas, Yas Bay automation. Entertainment-focused living.",
            "meta_keywords": "smart home Yas Island, Yas Acres automation",
            "region": "abu-dhabi",
            "area_name": "Yas Island",
            "hero_headline": "Smart Home Automation Yas Island",
            "hero_subheadline": "Entertainment-focused automation for island living.",
            "active": True
        },
        {
            "slug": "abu-dhabi/al-reem-island-automation",
            "title": "Smart Home Automation Al Reem Island | LEXA",
            "meta_description": "Al Reem Island apartment automation specialists. High-rise smart homes, penthouse solutions. Wireless systems.",
            "meta_keywords": "smart home Al Reem Island, apartment automation Abu Dhabi",
            "region": "abu-dhabi",
            "area_name": "Al Reem Island",
            "hero_headline": "Smart Home Automation Al Reem Island",
            "hero_subheadline": "High-rise smart living for Abu Dhabi's urban center.",
            "active": True
        },
        {
            "slug": "sharjah/smart-home-automation",
            "title": "Smart Home Automation Sharjah | LEXA",
            "meta_description": "Sharjah's premier smart home automation services. Villas, apartments, townhouses. Control4 & Crestron experts serving all Sharjah communities.",
            "meta_keywords": "smart home Sharjah, home automation Sharjah, Control4 Sharjah",
            "region": "sharjah",
            "area_name": "Sharjah",
            "hero_headline": "Smart Home Automation Sharjah",
            "hero_subheadline": "Premium smart living for Sharjah's finest communities.",
            "active": True
        },
        {
            "slug": "ras-al-khaimah/villa-automation",
            "title": "Villa Automation Ras Al Khaimah | LEXA",
            "meta_description": "Ras Al Khaimah smart home specialists. Villa automation for Al Hamra, Mina Al Arab, RAK beachfront properties.",
            "meta_keywords": "smart home Ras Al Khaimah, villa automation RAK, home automation Ras Al Khaimah",
            "region": "ras-al-khaimah",
            "area_name": "Ras Al Khaimah",
            "hero_headline": "Villa Automation Ras Al Khaimah",
            "hero_subheadline": "Intelligent living for RAK's premium properties.",
            "active": True
        },
        {
            "slug": "ajman/home-automation",
            "title": "Home Automation Ajman | LEXA",
            "meta_description": "Ajman smart home solutions. Affordable luxury automation for villas and apartments. Control4 & smart systems.",
            "meta_keywords": "smart home Ajman, home automation Ajman, Control4 Ajman",
            "region": "ajman",
            "area_name": "Ajman",
            "hero_headline": "Home Automation Ajman",
            "hero_subheadline": "Smart living solutions for Ajman homes.",
            "active": True
        },
        {
            "slug": "fujairah/smart-homes",
            "title": "Smart Homes Fujairah | LEXA",
            "meta_description": "Fujairah smart home automation. Beachfront villas, mountain retreats. Premium home automation services.",
            "meta_keywords": "smart home Fujairah, home automation Fujairah, Control4 Fujairah",
            "region": "fujairah",
            "area_name": "Fujairah",
            "hero_headline": "Smart Homes Fujairah",
            "hero_subheadline": "Intelligent automation for Fujairah's scenic properties.",
            "active": True
        },
        {
            "slug": "umm-al-quwain/home-automation",
            "title": "Home Automation Umm Al Quwain | LEXA",
            "meta_description": "Umm Al Quwain smart home services. Villa automation, beachfront properties, waterfront homes. Control4 integration.",
            "meta_keywords": "smart home Umm Al Quwain, home automation UAQ, Control4 Umm Al Quwain",
            "region": "umm-al-quwain",
            "area_name": "Umm Al Quwain",
            "hero_headline": "Home Automation Umm Al Quwain",
            "hero_subheadline": "Smart living for UAQ's waterfront communities.",
            "active": True
        },
        {
            "slug": "al-ain/smart-home-automation",
            "title": "Smart Home Automation Al Ain | LEXA",
            "meta_description": "Al Ain smart home specialists. Villa automation for Garden City. Control4, Crestron, Lutron integration.",
            "meta_keywords": "smart home Al Ain, home automation Al Ain, Control4 Al Ain",
            "region": "al-ain",
            "area_name": "Al Ain",
            "hero_headline": "Smart Home Automation Al Ain",
            "hero_subheadline": "Premium automation for the Garden City.",
            "active": True
        }
    ]
    
    for page in default_pages:
        page["created_at"] = datetime.now(timezone.utc)
        page["updated_at"] = datetime.now(timezone.utc)
        page["communities"] = []
        page["faqs"] = []
        page["stats"] = {}
        page["hero_image_url"] = ""
        page["whatsapp_prefill"] = ""
    
    geo_pages_collection.insert_many(default_pages)
    
    return {"message": f"Seeded {len(default_pages)} default geo pages"}

"""
Tracking & Analytics Settings API
Manages tracking pixel IDs for GA4, Meta, LinkedIn, Google Ads
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient

from utils.auth import verify_admin_token

router = APIRouter(prefix="/api/admin/tracking", tags=["Admin Tracking"])
logger = logging.getLogger(__name__)

# Database connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

class TrackingSettings(BaseModel):
    ga4_measurement_id: Optional[str] = ""
    google_ads_id: Optional[str] = ""
    google_ads_conversion_label: Optional[str] = ""
    meta_pixel_id: Optional[str] = ""
    linkedin_partner_id: Optional[str] = ""
    tiktok_pixel_id: Optional[str] = ""
    twitter_pixel_id: Optional[str] = ""
    snapchat_pixel_id: Optional[str] = ""
    
class TrackingSettingsUpdate(TrackingSettings):
    pass


@router.get("/settings")
async def get_tracking_settings(token: dict = Depends(verify_admin_token)):
    """Get current tracking pixel settings"""
    try:
        settings = await db.settings.find_one({"type": "tracking"}, {"_id": 0})
        
        if not settings:
            # Return default empty settings
            return {
                "settings": {
                    "ga4_measurement_id": "",
                    "google_ads_id": "",
                    "google_ads_conversion_label": "",
                    "meta_pixel_id": "",
                    "linkedin_partner_id": "",
                    "tiktok_pixel_id": "",
                    "twitter_pixel_id": "",
                    "snapchat_pixel_id": "",
                }
            }
        
        return {"settings": settings.get("data", {})}
    except Exception as e:
        logger.error(f"Error fetching tracking settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch tracking settings")


@router.put("/settings")
async def update_tracking_settings(
    settings: TrackingSettingsUpdate, 
    token: dict = Depends(verify_admin_token)
):
    """Update tracking pixel settings"""
    try:
        settings_dict = settings.model_dump()
        
        await db.settings.update_one(
            {"type": "tracking"},
            {
                "$set": {
                    "type": "tracking",
                    "data": settings_dict,
                    "updated_at": datetime.now(timezone.utc),
                    "updated_by": token.get("username", "admin")
                }
            },
            upsert=True
        )
        
        logger.info(f"Admin {token.get('username')} updated tracking settings")
        
        return {
            "success": True,
            "message": "Tracking settings updated successfully",
            "settings": settings_dict
        }
    except Exception as e:
        logger.error(f"Error updating tracking settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update tracking settings")


# Public endpoint for frontend to fetch tracking IDs
@router.get("/public/config")
async def get_public_tracking_config():
    """Get tracking config for frontend (public endpoint)"""
    try:
        settings = await db.settings.find_one({"type": "tracking"}, {"_id": 0})
        
        if not settings:
            return {"config": {}}
        
        data = settings.get("data", {})
        
        # Only return non-empty values
        config = {}
        if data.get("ga4_measurement_id"):
            config["ga4_measurement_id"] = data["ga4_measurement_id"]
        if data.get("google_ads_id"):
            config["google_ads_id"] = data["google_ads_id"]
        if data.get("google_ads_conversion_label"):
            config["google_ads_conversion_label"] = data["google_ads_conversion_label"]
        if data.get("meta_pixel_id"):
            config["meta_pixel_id"] = data["meta_pixel_id"]
        if data.get("linkedin_partner_id"):
            config["linkedin_partner_id"] = data["linkedin_partner_id"]
        if data.get("tiktok_pixel_id"):
            config["tiktok_pixel_id"] = data["tiktok_pixel_id"]
        if data.get("twitter_pixel_id"):
            config["twitter_pixel_id"] = data["twitter_pixel_id"]
        if data.get("snapchat_pixel_id"):
            config["snapchat_pixel_id"] = data["snapchat_pixel_id"]
            
        return {"config": config}
    except Exception as e:
        logger.error(f"Error fetching public tracking config: {str(e)}")
        return {"config": {}}

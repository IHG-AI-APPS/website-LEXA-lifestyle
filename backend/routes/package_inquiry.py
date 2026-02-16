"""
Package inquiry submission endpoint
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from services.email_service import EmailService
from datetime import datetime, timezone
import os
import logging
from uuid import uuid4

router = APIRouter(prefix="/api/package-inquiry", tags=["package-inquiry"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


class SpecialtyRoomItem(BaseModel):
    slug: str
    name: str
    price: int


class EnhancementItem(BaseModel):
    name: str
    price: int
    category: str


class PackageInquirySubmission(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    property_type: str
    package_tier: str
    base_price: int
    specialty_rooms: List[SpecialtyRoomItem] = []
    included_rooms_count: int = 0
    enhancements: List[EnhancementItem] = []
    total_price: int
    message: Optional[str] = ""
    source_page: str = "Package Builder"


@router.post("/submit")
async def submit_package_inquiry(inquiry: PackageInquirySubmission):
    """
    Submit package inquiry and send email to sales team
    """
    try:
        # Create inquiry record
        inquiry_record = {
            "id": str(uuid4()),
            "customer_name": inquiry.customer_name,
            "customer_email": inquiry.customer_email,
            "customer_phone": inquiry.customer_phone,
            "property_type": inquiry.property_type,
            "package_tier": inquiry.package_tier,
            "base_price": inquiry.base_price,
            "specialty_rooms": [room.dict() for room in inquiry.specialty_rooms],
            "included_rooms_count": inquiry.included_rooms_count,
            "enhancements": [enh.dict() for enh in inquiry.enhancements],
            "total_price": inquiry.total_price,
            "message": inquiry.message,
            "source_page": inquiry.source_page,
            "status": "new",
            "created_at": datetime.now(timezone.utc),
        }
        
        # Save to database
        await db.package_inquiries.insert_one(inquiry_record)
        logger.info(f"Package inquiry saved: {inquiry_record['id']}")
        
        # Send email to sales team
        specialty_rooms_data = [
            {"name": room.name, "price": room.price} 
            for room in inquiry.specialty_rooms
        ]
        
        enhancements_data = [
            {"name": enh.name, "price": enh.price, "category": enh.category}
            for enh in inquiry.enhancements
        ]
        
        email_result = await EmailService.send_package_inquiry_notification(
            customer_name=inquiry.customer_name,
            customer_email=inquiry.customer_email,
            customer_phone=inquiry.customer_phone,
            property_type=inquiry.property_type,
            package_tier=inquiry.package_tier,
            base_price=inquiry.base_price,
            specialty_rooms=specialty_rooms_data,
            included_rooms_count=inquiry.included_rooms_count,
            enhancements=enhancements_data,
            total_price=inquiry.total_price,
            message=inquiry.message or "",
            source_page=inquiry.source_page,
        )
        
        return {
            "status": "success",
            "inquiry_id": inquiry_record['id'],
            "message": "Your package inquiry has been submitted successfully. Our team will contact you within 24 hours.",
            "email_sent": email_result.get('status') == 'success'
        }
        
    except Exception as e:
        logger.error(f"Package inquiry submission failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")

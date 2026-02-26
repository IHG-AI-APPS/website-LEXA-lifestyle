"""
Public booking routes (consultation, experience centre)
"""
from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from models.bookings import (
    ConsultationBooking,
    ConsultationBookingCreate,
    ExperienceCentreBooking,
    ExperienceCentreBookingCreate
)
from services.email_service import EmailService
from services.whatsapp_service import WhatsAppService

whatsapp_service = WhatsAppService()
from services.erpnext_service import ERPNextService
from middleware.simple_rate_limiter import check_rate_limit
from middleware.security import SecurityValidator, get_client_ip
import os
import logging

router = APIRouter(prefix="/api", tags=["bookings"])
logger = logging.getLogger(__name__)

# Database connection (will be injected)
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.post("/consultation", response_model=ConsultationBooking)
async def create_consultation_booking(
    booking_data: ConsultationBookingCreate,
    request: Request
):
    """Create a new consultation booking"""
    try:
        # Rate limiting
        client_ip = get_client_ip(request)
        check_rate_limit(client_ip, "consultation_booking")
        
        # Validate email
        email_validation = SecurityValidator.validate_email_address(booking_data.email)
        if not email_validation.get('valid'):
            raise HTTPException(status_code=400, detail=email_validation.get('error', 'Invalid email'))
        
        # Validate phone
        phone_validation = SecurityValidator.validate_phone(booking_data.phone)
        if not phone_validation.get('valid'):
            raise HTTPException(status_code=400, detail=phone_validation.get('error', 'Invalid phone'))
        
        # Sanitize text inputs
        sanitized_name = SecurityValidator.sanitize_text(booking_data.name, max_length=100)
        sanitized_message = SecurityValidator.sanitize_text(booking_data.message or "", max_length=2000) if booking_data.message else None
        
        # Create booking
        booking_dict = booking_data.model_dump()
        booking_dict['name'] = sanitized_name
        booking_dict['message'] = sanitized_message
        booking = ConsultationBooking(**booking_dict)
        
        # Save to database
        await db.consultation_bookings.insert_one(booking.model_dump())
        
        # Send notifications
        try:
            # Email notification - send to sales team using branded template
            await EmailService.send_consultation_notification(
                name=booking.name,
                email=booking.email,
                phone=booking.phone,
                persona=booking.persona or "",
                message=booking.message or ""
            )
            
            # WhatsApp notification
            await whatsapp_service.send_lead_notification(
                lead_name=booking.name,
                lead_email=booking.email,
                lead_phone=booking.phone,
                lead_type="Consultation Request"
            )
            
            # ERPNext lead creation
            await ERPNextService.create_lead(
                lead_name=booking.name,
                email=booking.email,
                phone=booking.phone,
                source="Website - Consultation",
                notes=booking.message or ""
            )
            
        except Exception as e:
            logger.warning(f"Notification failed: {str(e)}")
        
        return booking
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Consultation booking error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")


@router.post("/experience-centre/booking", response_model=ExperienceCentreBooking)
async def create_experience_centre_booking(
    booking_data: ExperienceCentreBookingCreate,
    request: Request
):
    """Create experience centre booking"""
    try:
        # Rate limiting
        client_ip = get_client_ip(request)
        check_rate_limit(client_ip, "experience_booking")
        
        # Validate email
        email_validation = SecurityValidator.validate_email_address(booking_data.email)
        if not email_validation.get('valid'):
            raise HTTPException(status_code=400, detail=email_validation.get('error', 'Invalid email'))
        
        # Validate phone
        phone_validation = SecurityValidator.validate_phone(booking_data.phone)
        if not phone_validation.get('valid'):
            raise HTTPException(status_code=400, detail=phone_validation.get('error', 'Invalid phone'))
        
        # Sanitize text inputs
        sanitized_name = SecurityValidator.sanitize_text(booking_data.name, max_length=100)
        sanitized_message = SecurityValidator.sanitize_text(booking_data.message or "", max_length=2000) if booking_data.message else None
        
        # Create booking
        booking_dict = booking_data.model_dump()
        booking_dict['name'] = sanitized_name
        booking_dict['message'] = sanitized_message
        booking = ExperienceCentreBooking(**booking_dict)
        
        # Save to database
        await db.experience_centre_bookings.insert_one(booking.model_dump())
        
        # Send notifications
        try:
            # Email notification using branded template
            await EmailService.send_experience_centre_notification(
                name=booking.name,
                email=booking.email,
                phone=booking.phone,
                date=booking.date,
                time=booking.time,
                interests=booking.interests,
                message=booking.message or ""
            )
            
            await whatsapp_service.send_lead_notification(
                lead_name=booking.name,
                lead_email=booking.email,
                lead_phone=booking.phone,
                lead_type=f"Experience Centre - {booking.date}"
            )
            
            await ERPNextService.create_lead(
                lead_name=booking.name,
                email=booking.email,
                phone=booking.phone,
                source="Website - Experience Centre",
                notes=f"Date: {booking.date}, Time: {booking.time}, Interests: {', '.join(booking.interests) if booking.interests else 'None'}"
            )
            
        except Exception as e:
            logger.warning(f"Notification failed: {str(e)}")
        
        return booking
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Experience centre booking error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")



from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class BookingModalRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    preferredDate: str
    preferredTime: str
    message: Optional[str] = None
    bookingType: str  # 'site-visit', 'experience-center', 'video-call'
    submissionId: Optional[str] = None
    source: Optional[str] = "booking_modal"

class BookingModalResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    bookingType: str
    preferredDate: str
    preferredTime: str
    status: str
    createdAt: str


@router.post("/contact/booking", response_model=BookingModalResponse)
async def create_modal_booking(
    booking_data: BookingModalRequest,
    request: Request
):
    """Create a booking from the modal form (replaces Calendly)"""
    try:
        # Rate limiting
        client_ip = get_client_ip(request)
        check_rate_limit(client_ip, "booking_modal")
        
        # Validate email
        email_validation = SecurityValidator.validate_email_address(booking_data.email)
        if not email_validation.get('valid'):
            raise HTTPException(status_code=400, detail=email_validation.get('error', 'Invalid email'))
        
        # Validate phone
        phone_validation = SecurityValidator.validate_phone(booking_data.phone)
        if not phone_validation.get('valid'):
            raise HTTPException(status_code=400, detail=phone_validation.get('error', 'Invalid phone'))
        
        # Sanitize inputs
        sanitized_name = SecurityValidator.sanitize_text(booking_data.name, max_length=100)
        sanitized_message = SecurityValidator.sanitize_text(booking_data.message or "", max_length=2000) if booking_data.message else None
        
        # Map booking type to readable label
        booking_type_labels = {
            'site-visit': 'Free Site Visit',
            'experience-center': 'Experience Center Tour',
            'video-call': 'Video Consultation'
        }
        
        # Create booking record
        import uuid
        booking_id = str(uuid.uuid4())[:8].upper()
        now = datetime.utcnow()
        
        booking_record = {
            "id": booking_id,
            "name": sanitized_name,
            "email": booking_data.email,
            "phone": booking_data.phone,
            "bookingType": booking_data.bookingType,
            "bookingTypeLabel": booking_type_labels.get(booking_data.bookingType, booking_data.bookingType),
            "preferredDate": booking_data.preferredDate,
            "preferredTime": booking_data.preferredTime,
            "message": sanitized_message,
            "submissionId": booking_data.submissionId,
            "source": booking_data.source,
            "status": "pending",
            "createdAt": now.isoformat(),
            "updatedAt": now.isoformat()
        }
        
        # Save to database
        await db.booking_requests.insert_one(booking_record)
        
        # Send notifications
        try:
            # Email notification to sales team
            await EmailService.send_consultation_notification(
                name=sanitized_name,
                email=booking_data.email,
                phone=booking_data.phone,
                persona=booking_type_labels.get(booking_data.bookingType, "Booking Request"),
                message=f"Booking Type: {booking_type_labels.get(booking_data.bookingType)}\nPreferred Date: {booking_data.preferredDate}\nPreferred Time: {booking_data.preferredTime}\n\nMessage: {sanitized_message or 'N/A'}"
            )
            
            # WhatsApp notification
            await whatsapp_service.send_lead_notification(
                lead_name=sanitized_name,
                lead_email=booking_data.email,
                lead_phone=booking_data.phone,
                lead_type=booking_type_labels.get(booking_data.bookingType, "Booking")
            )
            
            # ERPNext lead creation
            await ERPNextService.create_lead(
                lead_name=sanitized_name,
                email=booking_data.email,
                phone=booking_data.phone,
                source=f"Website - {booking_type_labels.get(booking_data.bookingType, 'Booking Modal')}",
                notes=f"Date: {booking_data.preferredDate}, Time: {booking_data.preferredTime}\n{sanitized_message or ''}"
            )
            
        except Exception as e:
            logger.warning(f"Booking notification failed: {str(e)}")
        
        return BookingModalResponse(
            id=booking_id,
            name=sanitized_name,
            email=booking_data.email,
            phone=booking_data.phone,
            bookingType=booking_data.bookingType,
            preferredDate=booking_data.preferredDate,
            preferredTime=booking_data.preferredTime,
            status="pending",
            createdAt=now.isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Modal booking error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")

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
            await WhatsAppService.send_message(
                phone_number=os.environ.get('WHATSAPP_NOTIFICATION_NUMBER', '+971501234567'),
                template_name="lead_notification",
                parameters=[booking.name, "Consultation Request"]
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
            
            await WhatsAppService.send_message(
                phone_number=os.environ.get('WHATSAPP_NOTIFICATION_NUMBER'),
                template_name="lead_notification",
                parameters=[booking.name, f"Experience Centre - {booking.date}"]
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

"""
Form submission routes (villa-designer, cinema, architects, contractors, developers, contact)
"""
from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from models.submissions import (
    VillaDesignSubmission,
    VillaDesignSubmissionCreate,
    CinemaConfigRequest,
    ArchitectResourceRequest,
    ArchitectResourceRequestCreate,
    ContractorProjectRequest,
    ContractorProjectRequestCreate,
    DeveloperToolkitRequest,
    DeveloperToolkitRequestCreate,
    ContactMessage,
    ContactMessageCreate
)
from middleware.simple_rate_limiter import check_rate_limit
from middleware.security import SecurityValidator, get_client_ip
from services.email_service import EmailService
from services.whatsapp_service import WhatsAppService, whatsapp_service
from services.erpnext_service import ERPNextService, erpnext_service
from datetime import datetime, timezone
import os
import uuid
import logging
import httpx
import json

router = APIRouter(prefix="/api", tags=["submissions"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


async def trigger_n8n_webhook(url: str, data: dict):
    """Helper to trigger N8N webhooks"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data, timeout=10.0)
            response.raise_for_status()
            logger.info(f"N8N webhook triggered successfully: {url}")
    except Exception as e:
        logger.error(f"N8N webhook failed: {str(e)}")


async def send_lead_notification_email(lead_type: str, submission_id: str, name: str, email: str, phone: str, company: str, details: str, sales_email: str):
    """Helper to send lead notification emails - LEXA branded"""
    try:
        await EmailService.send_lead_notification(
            lead_type=lead_type,
            name=name,
            email=email,
            phone=phone,
            company=company,
            details=details,
            submission_id=submission_id,
        )
    except Exception as e:
        logger.error(f"Email notification failed: {str(e)}")
        raise


@router.post("/villa-designer/submit", response_model=VillaDesignSubmission)
async def submit_villa_design(input: VillaDesignSubmissionCreate):
    """Submit luxury villa design qualifier form"""
    try:
        submission = VillaDesignSubmission(**input.model_dump())
        doc = submission.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.villa_design_submissions.insert_one(doc)
        
        # Trigger N8N webhook if configured
        n8n_webhook_url = os.getenv('N8N_VILLA_DESIGN_WEBHOOK_URL')
        if n8n_webhook_url:
            webhook_data = {
                "type": "villa_design",
                "id": submission.id,
                "name": submission.name,
                "email": submission.email,
                "phone": submission.phone,
                "property_type": submission.property_type,
                "property_size": submission.property_size,
                "lifestyle_goals": submission.lifestyle_goals,
                "timeline": submission.timeline,
                "budget_range": submission.budget_range,
                "timestamp": submission.timestamp.isoformat(),
            }
            await trigger_n8n_webhook(n8n_webhook_url, webhook_data)
        
        logger.info(f"Villa design submission created: {submission.id}")
        return submission
    except Exception as e:
        logger.error(f"Villa design submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit villa design request")


@router.post("/cinema-configurator/")
async def submit_cinema_config(data: CinemaConfigRequest):
    """Submit cinema configurator request"""
    try:
        cinema_data = data.model_dump()
        cinema_data['created_at'] = datetime.now(timezone.utc).isoformat()
        cinema_data['id'] = str(uuid.uuid4())
        
        # Save to database
        await db.cinema_configs.insert_one(cinema_data)
        
        # Send email notification
        try:
            email_body = f"Room Size: {cinema_data.get('room_size', 'N/A')}, Budget: {cinema_data.get('budget', 'N/A')}"
            await EmailService.send_sales_notification(
                customer_name=data.name,
                customer_email=data.email,
                customer_phone=data.phone,
                details=email_body
            )
        except Exception as email_error:
            logger.warning(f"Email notification failed: {email_error}")
        
        return {"message": "Cinema configuration submitted successfully", "id": cinema_data['id']}
    except Exception as e:
        logger.error(f"Error submitting cinema config: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit request")


@router.post("/architects/resource-request", response_model=ArchitectResourceRequest)
async def submit_architect_resource_request(request: Request, input: ArchitectResourceRequestCreate):
    """Submit architect resource request"""
    try:
        # Rate limiting
        client_ip = get_client_ip(request)
        check_rate_limit(client_ip, "architects/resource-request", "form")
        
        # Check honeypot
        try:
            body = await request.body()
            raw_data = json.loads(body.decode())
            if SecurityValidator.check_honeypot(raw_data.get('website') or raw_data.get('url') or raw_data.get('homepage')):
                logger.warning(f"Bot detected via honeypot from IP: {client_ip}")
                raise HTTPException(status_code=400, detail="Invalid request")
        except json.JSONDecodeError:
            pass
        
        # Security validation
        input_data = input.model_dump()
        validation_result = SecurityValidator.validate_submission(input_data)
        
        if not validation_result['valid']:
            errors = validation_result.get('errors', ['Validation failed'])
            logger.warning(f"Validation failed for {input_data.get('email', 'unknown')}: {errors}")
            raise HTTPException(status_code=422, detail={"errors": errors, "message": errors[0] if errors else "Validation failed"})
        
        # Use sanitized data
        sanitized_data = validation_result['sanitized_data']
        resource_request = ArchitectResourceRequest(**sanitized_data)
        
        doc = resource_request.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        doc['client_ip'] = client_ip
        await db.architect_resource_requests.insert_one(doc)
        
        # Send email to sales team
        try:
            sales_email = os.getenv("SALES_EMAIL", "sales@lexalifestyle.com")
            await send_lead_notification_email(
                lead_type="Architect Resource Request",
                submission_id=resource_request.id,
                name=resource_request.name,
                email=resource_request.email,
                phone=resource_request.phone,
                company=resource_request.company or "Not provided",
                details=f"Resource Type: {resource_request.resource_type}\nMessage: {resource_request.message or 'None'}",
                sales_email=sales_email
            )
        except Exception as email_error:
            logger.error(f"Failed to send architect resource email: {str(email_error)}")
        
        # Send WhatsApp notification
        try:
            await whatsapp_service.send_lead_notification(
                lead_name=resource_request.name,
                lead_email=resource_request.email,
                lead_phone=resource_request.phone,
                lead_type="Architect Resource Request"
            )
        except Exception as wa_error:
            logger.error(f"WhatsApp notification failed: {str(wa_error)}")
        
        # Create lead in ERPNext
        try:
            await erpnext_service.create_lead(
                submission_id=resource_request.id,
                contact_name=resource_request.name,
                contact_email=resource_request.email,
                contact_phone=resource_request.phone,
                company=resource_request.company or "",
                project_type="Architect Resource Request",
                total_cost=0,
                emirate="UAE",
                notes=f"Resource Type: {resource_request.resource_type}\nMessage: {resource_request.message or 'None'}"
            )
        except Exception as erp_error:
            logger.error(f"ERPNext integration failed: {str(erp_error)}")
        
        logger.info(f"Architect resource request created: {resource_request.id}")
        return resource_request
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Architect resource request error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit resource request")


@router.post("/contractors/project-request", response_model=ContractorProjectRequest)
async def submit_contractor_project_request(input: ContractorProjectRequestCreate):
    """Submit contractor project request"""
    try:
        request_obj = ContractorProjectRequest(**input.model_dump())
        doc = request_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contractor_project_requests.insert_one(doc)
        
        # Send notifications
        try:
            sales_email = os.getenv("SALES_EMAIL", "sales@lexalifestyle.com")
            await send_lead_notification_email(
                lead_type="Contractor Project Request",
                submission_id=request_obj.id,
                name=request_obj.name,
                email=request_obj.email,
                phone=request_obj.phone,
                company=request_obj.company or "Not provided",
                details=f"Project Type: {request_obj.project_type}\nTimeline: {request_obj.timeline or 'Not specified'}\nMessage: {request_obj.message or 'None'}",
                sales_email=sales_email
            )
        except Exception as e:
            logger.error(f"Notification failed: {str(e)}")
        
        logger.info(f"Contractor project request created: {request_obj.id}")
        return request_obj
    except Exception as e:
        logger.error(f"Contractor project request error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit project request")


@router.post("/developers/toolkit-request", response_model=DeveloperToolkitRequest)
async def submit_developer_toolkit_request(input: DeveloperToolkitRequestCreate):
    """Submit developer toolkit request"""
    try:
        request_obj = DeveloperToolkitRequest(**input.model_dump())
        doc = request_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.developer_toolkit_requests.insert_one(doc)
        
        # Send notifications
        try:
            sales_email = os.getenv("SALES_EMAIL", "sales@lexalifestyle.com")
            await send_lead_notification_email(
                lead_type="Developer Toolkit Request",
                submission_id=request_obj.id,
                name=request_obj.name,
                email=request_obj.email,
                phone=request_obj.phone,
                company=request_obj.company or "Not provided",
                details=f"Project Scale: {request_obj.project_scale}\nTimeline: {request_obj.timeline or 'Not specified'}\nMessage: {request_obj.message or 'None'}",
                sales_email=sales_email
            )
        except Exception as e:
            logger.error(f"Notification failed: {str(e)}")
        
        logger.info(f"Developer toolkit request created: {request_obj.id}")
        return request_obj
    except Exception as e:
        logger.error(f"Developer toolkit request error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit toolkit request")


@router.post("/contact", response_model=ContactMessage)
async def submit_contact_message(input: ContactMessageCreate):
    """Submit contact form message"""
    try:
        message = ContactMessage(**input.model_dump())
        doc = message.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contact_messages.insert_one(doc)
        
        # Send email notification
        try:
            sales_email = os.getenv("SALES_EMAIL", "sales@lexalifestyle.com")
            await EmailService.send_email(
                to_email=sales_email,
                subject=f"New Contact Message from {message.name}",
                html_content=f"""
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Phone:</strong> {message.phone}</p>
                <p><strong>Message:</strong></p>
                <p>{message.message}</p>
                <p><strong>Time:</strong> {message.timestamp}</p>
                """
            )
        except Exception as e:
            logger.error(f"Contact email notification failed: {str(e)}")
        
        logger.info(f"Contact message created: {message.id}")
        return message
    except Exception as e:
        logger.error(f"Contact message error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact message")

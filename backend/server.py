from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="LEXA Lifestyle API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============= MODELS =============

class ConsultationBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = None
    persona: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConsultationBookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: Optional[str] = None
    persona: Optional[str] = None

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10)


# ============= N8N WEBHOOK HELPER =============

async def trigger_n8n_webhook(webhook_url: str, data: dict) -> bool:
    """
    Trigger N8N webhook with form data
    Returns True if successful, False otherwise
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                webhook_url,
                json=data,
                timeout=10.0
            )
            response.raise_for_status()
            logger.info(f"N8N webhook triggered successfully: {webhook_url}")
            return True
    except Exception as e:
        logger.error(f"Failed to trigger N8N webhook: {str(e)}")
        return False


# ============= ROUTES =============

@api_router.get("/")
async def root():
    return {
        "message": "LEXA Lifestyle API",
        "version": "1.0.0",
        "status": "operational"
    }

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test MongoDB connection
        await db.command('ping')
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")


@api_router.post("/consultation", response_model=ConsultationBooking)
async def book_consultation(input: ConsultationBookingCreate):
    """
    Book a design consultation
    Stores in database and triggers N8N webhook for WhatsApp + Email
    """
    try:
        # Create consultation object
        consultation = ConsultationBooking(**input.model_dump())
        
        # Store in database
        doc = consultation.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.consultations.insert_one(doc)
        
        logger.info(f"Consultation booked: {consultation.name} ({consultation.email})")
        
        # Trigger N8N webhook (if configured)
        n8n_webhook_url = os.getenv('N8N_CONSULTATION_WEBHOOK_URL')
        if n8n_webhook_url:
            webhook_data = {
                "type": "consultation",
                "name": consultation.name,
                "email": consultation.email,
                "phone": consultation.phone,
                "message": consultation.message or "No message provided",
                "persona": consultation.persona or "Not specified",
                "timestamp": consultation.timestamp.isoformat(),
                "id": consultation.id
            }
            await trigger_n8n_webhook(n8n_webhook_url, webhook_data)
        else:
            logger.warning("N8N_CONSULTATION_WEBHOOK_URL not configured")
        
        return consultation
        
    except Exception as e:
        logger.error(f"Error booking consultation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to book consultation")


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_message(input: ContactMessageCreate):
    """
    Submit general contact message
    Stores in database and triggers N8N webhook
    """
    try:
        # Create contact message object
        contact = ContactMessage(**input.model_dump())
        
        # Store in database
        doc = contact.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contact_messages.insert_one(doc)
        
        logger.info(f"Contact message received: {contact.name} - {contact.subject}")
        
        # Trigger N8N webhook (if configured)
        n8n_webhook_url = os.getenv('N8N_CONTACT_WEBHOOK_URL')
        if n8n_webhook_url:
            webhook_data = {
                "type": "contact",
                "name": contact.name,
                "email": contact.email,
                "phone": contact.phone,
                "subject": contact.subject,
                "message": contact.message,
                "timestamp": contact.timestamp.isoformat(),
                "id": contact.id
            }
            await trigger_n8n_webhook(n8n_webhook_url, webhook_data)
        else:
            logger.warning("N8N_CONTACT_WEBHOOK_URL not configured")
        
        return contact
        
    except Exception as e:
        logger.error(f"Error submitting contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit message")


@api_router.get("/consultations", response_model=List[ConsultationBooking])
async def get_consultations(limit: int = 50):
    """Get recent consultation bookings (admin endpoint)"""
    try:
        consultations = await db.consultations.find(
            {},
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime objects
        for consultation in consultations:
            if isinstance(consultation['timestamp'], str):
                consultation['timestamp'] = datetime.fromisoformat(consultation['timestamp'])
        
        return consultations
    except Exception as e:
        logger.error(f"Error fetching consultations: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch consultations")


@api_router.get("/contact-messages", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50):
    """Get recent contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find(
            {},
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime objects
        for message in messages:
            if isinstance(message['timestamp'], str):
                message['timestamp'] = datetime.fromisoformat(message['timestamp'])
        
        return messages
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")


# Include the router in the main app
app.include_router(api_router)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")

from fastapi import FastAPI, APIRouter, HTTPException, Query, Depends, Request, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, validator
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import jwt
from passlib.context import CryptContext

# Import security middleware
from middleware.security import SecurityValidator, get_client_ip
from middleware.simple_rate_limiter import check_rate_limit
from middleware.security_headers import SecurityHeadersMiddleware

# Import caching utility
from utils.cache import cache, cached

# Import route modules
from routes import public_api, content, bookings, submissions, calculator, brands_products, admin_content, packages, package_inquiry, intelligence, admin_extended_content, admin_arabic_pages, patches, ai_recommendations, project_builder, smart_home_features, pricing, admin_solutions_services, ai_chatbot, lead_enhancement, seo_enhancement, uploads, analytics, schedule_visit, smart_recommendations, geo_pages, tracking_settings, sales_intelligence, locations, catalogues, regression_tests, admin_whatsapp, product_catalog

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Clean up stale git lock files on server startup
def cleanup_git_locks():
    """Remove stale git lock files to prevent push failures"""
    git_lock = Path("/app/.git/index.lock")
    if git_lock.exists():
        try:
            git_lock.unlink()
            print("🧹 Cleaned up stale git lock file")
        except Exception:
            pass
    # Clean up any other git locks
    for lock_file in Path("/app").rglob("*.lock"):
        if ".git" in str(lock_file):
            try:
                lock_file.unlink()
            except Exception:
                pass

cleanup_git_locks()

# JWT Configuration
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not SECRET_KEY and os.environ.get("FLASK_ENV") == "production":
    raise ValueError("JWT_SECRET_KEY environment variable is required for production deployment")
elif not SECRET_KEY:
    # Development fallback
    SECRET_KEY = "development-secret-key-not-for-production"
    print("⚠️  WARNING: Using development JWT secret key. Set JWT_SECRET_KEY for production!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Admin Credentials - Read from environment variables for production
DEFAULT_ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
DEFAULT_ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "lexa2026")

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="LEXA Lifestyle API", version="2.0.0")

# Add GZip compression middleware for faster responses
from fastapi.middleware.gzip import GZipMiddleware
import subprocess
import asyncio as _asyncio
app.add_middleware(GZipMiddleware, minimum_size=500)

# Add security headers middleware
app.add_middleware(SecurityHeadersMiddleware)

# Add Cache-Control headers for public GET endpoints
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response as StarletteResponse
import hashlib

class ETagCacheMiddleware(BaseHTTPMiddleware):
    """Adds ETag + Cache-Control headers to public GET endpoints.
    Returns 304 Not Modified when client sends matching If-None-Match."""
    
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        
        is_public_get = (
            request.method == "GET"
            and request.url.path.startswith("/api/")
            and "/admin/" not in request.url.path
        )
        
        if not is_public_get:
            return response
        
        # Add Cache-Control
        response.headers["Cache-Control"] = "public, max-age=60, s-maxage=120, stale-while-revalidate=300"
        
        # Read response body to compute ETag
        body = b""
        async for chunk in response.body_iterator:
            body += chunk if isinstance(chunk, bytes) else chunk.encode()
        
        etag = '"' + hashlib.md5(body).hexdigest() + '"'
        response.headers["ETag"] = etag
        
        # Check If-None-Match from client
        client_etag = request.headers.get("if-none-match", "")
        if client_etag == etag:
            return StarletteResponse(status_code=304, headers={
                "ETag": etag,
                "Cache-Control": response.headers.get("Cache-Control", ""),
            })
        
        # Return full response with body
        return StarletteResponse(
            content=body,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.media_type,
        )

app.add_middleware(ETagCacheMiddleware)

api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
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

class VillaDesignSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    property_type: str
    property_size: str
    lifestyle_goals: List[str]
    timeline: str
    budget_range: str
    name: str
    email: EmailStr
    phone: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class VillaDesignSubmissionCreate(BaseModel):
    property_type: str = Field(..., min_length=2)
    property_size: str = Field(..., min_length=2)
    lifestyle_goals: List[str] = Field(..., min_items=1)
    timeline: str = Field(..., min_length=2)
    budget_range: str = Field(..., min_length=2)
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)

class ArchitectResourceRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    resource_type: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class ArchitectResourceRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: Optional[str] = None
    resource_type: str = Field(..., min_length=2)
    message: Optional[str] = None

class ContractorProjectRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: str
    project_type: str
    systems_needed: List[str]
    project_timeline: str
    drawings_uploaded: bool = False
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class ContractorProjectRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=100)
    project_type: str = Field(..., min_length=2)
    systems_needed: List[str] = Field(..., min_items=1)
    project_timeline: str = Field(..., min_length=2)
    message: Optional[str] = None

class DeveloperToolkitRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: str
    project_scale: str
    units_count: Optional[int] = None
    resource_type: str
    timeline: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class DeveloperToolkitRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=100)
    project_scale: str = Field(..., min_length=2)
    units_count: Optional[int] = None
    resource_type: str = Field(..., min_length=2)
    timeline: str = Field(..., min_length=2)
    message: Optional[str] = None


class ExperienceCentreBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str
    time: str
    name: str
    email: EmailStr
    phone: str
    interests: List[str] = []
    message: Optional[str] = None
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ExperienceCentreBookingCreate(BaseModel):
    date: str
    time: str
    name: str
    email: str = ""  # Optional for quick booking
    phone: str
    interests: List[str] = []
    message: Optional[str] = None
    
    @validator('name')
    def name_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    @validator('phone')
    def phone_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Phone cannot be empty')
        return v.strip()

class CinemaConfigRequest(BaseModel):
    roomSize: str
    seatingCapacity: str
    screenSize: str
    audioSystem: str
    seatingType: str
    lighting: list[str]
    acoustics: str
    budget: str
    name: str
    email: str
    phone: str
    notes: str
    estimatedCost: int

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

class Solution(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    category: str
    description: str
    long_description: Optional[str] = None
    image: str
    features: List[str] = []
    brands: List[str] = []
    tags: List[str] = []
    gallery_images: List[str] = []
    feature_cards: List[dict] = []
    faqs: List[dict] = []
    meta_description: Optional[str] = None

class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    category: str
    description: str
    long_description: Optional[str] = None
    image: str
    features: List[str] = []
    process: List[str] = []
    icon: Optional[str] = None
    tags: List[str] = []

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: Optional[str] = None  # Made optional for backward compatibility with existing data
    title: str
    location: str
    type: str
    year: str
    image: Optional[str] = None  # Made optional - can be uploaded after creation
    systems: List[str] = []
    description: Optional[str] = None
    published: bool = True  # Default to published
    featured: bool = False  # Default to not featured
    # Extended fields for Admin CMS
    category: Optional[str] = None
    video_url: Optional[str] = None
    features: List[str] = []
    results: List[str] = []  # Results/metrics
    images: List[str] = []  # Alternative to gallery
    thumbnail: Optional[str] = None
    size: Optional[str] = None
    # Case Study fields
    challenge: Optional[str] = None
    solution_details: Optional[str] = None
    outcome: Optional[str] = None
    client_testimonial: Optional[str] = None
    client_name: Optional[str] = None
    client_role: Optional[str] = None
    technical_specs: List[str] = []
    timeline: Optional[str] = None
    budget_range: Optional[str] = None
    team_size: Optional[int] = None
    gallery: List[str] = []
    completion_date: Optional[str] = None
    consultant: Optional[str] = None
    contractor: Optional[str] = None
    brands: List[dict] = []
    products: List[dict] = []


# Project Type model for managing project types
class ProjectType(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True

# Project Category model for managing project categories  
class ProjectCategory(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True

# Team Member model for managing team members
class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    image: str = ""
    bio: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    role: str
    company: Optional[str] = None
    testimonial: str
    rating: int = 5
    image: Optional[str] = None

class Article(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    category: str
    excerpt: str
    content: str
    image: str
    author: str
    read_time: int
    published_date: str
    tags: List[str] = []

class News(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    image: str
    author: str
    published_date: str
    tags: List[str] = []
    featured: bool = False

class Brand(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    name: str
    logo: str
    description: str
    website: Optional[str] = None
    categories: List[str] = []
    featured: bool = False
    country: Optional[str] = None
    year_established: Optional[str] = None
    tagline: Optional[str] = None
    hero_image: Optional[str] = None
    # Extended fields for Admin CMS
    priority: int = 100  # Lower number = higher priority (shown first)
    products: List[dict] = []  # Top selling products with name, description, image, price_range
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    long_description: Optional[str] = None  # Extended description for SEO
    certifications: List[str] = []  # e.g., ["CEDIA Certified", "THX Certified"]
    key_features: List[str] = []  # Key brand features/benefits
    gallery_images: List[str] = []  # Inspiration gallery
    feature_cards: List[dict] = []  # Feature category cards [{title, description, benefits[]}]
    related_solutions: List[str] = []  # Related solution slugs

class SiteSettings(BaseModel):
    """Site-wide settings for logos, social links, favicon, and homepage content"""
    model_config = ConfigDict(extra="ignore")
    # Logos
    header_logo_light: Optional[str] = None  # Logo for light mode/dark background
    header_logo_dark: Optional[str] = None   # Logo for dark mode/light background
    footer_logo_light: Optional[str] = None
    footer_logo_dark: Optional[str] = None
    favicon: Optional[str] = None
    # Social Media Links
    social_facebook: Optional[str] = None
    social_instagram: Optional[str] = None
    social_twitter: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_youtube: Optional[str] = None
    social_tiktok: Optional[str] = None
    social_whatsapp: Optional[str] = None
    # Contact Info
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_address: Optional[str] = None
    # Homepage Content
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_video_url: Optional[str] = None
    hero_image: Optional[str] = None
    hero_cta_text: Optional[str] = None
    hero_cta_link: Optional[str] = None
    # SEO
    site_name: Optional[str] = None
    site_description: Optional[str] = None
    # Additional homepage sections
    featured_projects_title: Optional[str] = None
    featured_projects_subtitle: Optional[str] = None
    about_section_title: Optional[str] = None
    about_section_content: Optional[str] = None
    about_section_image: Optional[str] = None

class ProductCategory(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    name: str
    description: str
    image: str
    icon: Optional[str] = None
    brands: List[str] = []
    related_solutions: List[str] = []
    specifications: List[str] = []
    featured: bool = False

class CostCalculatorInput(BaseModel):
    property_type: str
    square_footage: int
    systems: List[str]
    timeline: Optional[str] = None

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    preferred_contact: str
    timeline: Optional[str] = None
    property_type: Optional[str] = None
    square_footage: Optional[int] = None
    systems: List[str] = []
    estimated_cost: Optional[str] = None
    message: Optional[str] = None
    source: str
    timestamp: str
    status: str = "new"

    budget_range: Optional[str] = None

class CostCalculatorResult(BaseModel):
    estimated_cost_min: int
    estimated_cost_max: int
    timeline_weeks: int
    recommended_solutions: List[str]

class Video(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    video_url: str  # YouTube, Vimeo, or direct video URL
    thumbnail_url: Optional[str] = None
    duration: Optional[str] = None  # e.g., "3:45"
    category: str  # e.g., "case-study", "service", "gallery", "testimonial", "product"
    tags: List[str] = []
    featured: bool = False
    view_count: int = 0
    published_date: str
    related_service: Optional[str] = None  # Service slug
    related_project: Optional[str] = None  # Project ID
    related_solution: Optional[str] = None  # Solution slug
    embed_code: Optional[str] = None  # Custom embed code if needed

# ============= CALCULATOR SUBMISSION MODELS =============

class CalculatorSubmissionCreate(BaseModel):
    # Project Details
    project_type: str
    sub_category: str
    total_area: int
    num_rooms: int
    num_floors: int
    construction_stage: str
    
    # Solutions Selected
    selected_solutions: Dict[str, str]  # {solution_id: level_id}
    
    # Preferences
    control_platform: Optional[str] = None
    security_brand: Optional[str] = None
    lighting_system: Optional[str] = None
    
    # Timeline & Budget
    timeline: str
    budget_range: str
    
    # Location
    emirate: str
    city: Optional[str] = None
    property_name: Optional[str] = None
    
    # Contact Info
    contact_name: str
    contact_email: EmailStr
    contact_phone: str
    contact_company: Optional[str] = None
    contact_role: Optional[str] = None
    
    # Additional Features
    additional_features: List[str] = []
    
    # Privilege/Discount Card
    privilege_card: Optional[str] = None
    
    # Other Notes
    notes: Optional[str] = None

class CalculatorSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_type: str
    sub_category: str
    total_area: int
    num_rooms: int
    num_floors: int
    construction_stage: str
    selected_solutions: Dict[str, str]
    control_platform: Optional[str] = None
    security_brand: Optional[str] = None
    lighting_system: Optional[str] = None
    timeline: str
    budget_range: str
    emirate: str
    city: Optional[str] = None
    property_name: Optional[str] = None
    contact_name: str
    contact_email: EmailStr
    contact_phone: str
    contact_company: Optional[str] = None
    contact_role: Optional[str] = None
    additional_features: List[str] = []
    privilege_card: Optional[str] = None
    notes: Optional[str] = None
    
    # Calculated fields
    total_cost: int
    estimated_timeline_weeks: int
    cost_breakdown: List[Dict[str, Any]]
    
    # Metadata
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"  # new, contacted, quoted, closed

class CalculatorQuote(BaseModel):
    total_cost: int
    estimated_timeline_weeks: int
    cost_breakdown: List[Dict[str, Any]]
    size_multiplier: float
    retrofit_premium: float

# ============= AUTHENTICATION MODELS & HELPERS =============

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Dependency to verify JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return {"username": username}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Initialize admin user on first run
async def init_admin():
    """Create default admin user if none exists"""
    admin = await db.admin_users.find_one({"username": DEFAULT_ADMIN_USERNAME})
    if not admin:
        hashed_password = get_password_hash(DEFAULT_ADMIN_PASSWORD)
        await db.admin_users.insert_one({
            "username": DEFAULT_ADMIN_USERNAME,
            "password": hashed_password,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"✅ Default admin user created: {DEFAULT_ADMIN_USERNAME}")


# ============= N8N WEBHOOK HELPER =============

async def trigger_n8n_webhook(webhook_url: str, data: dict) -> bool:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(webhook_url, json=data, timeout=10.0)
            response.raise_for_status()
            logger.info(f"N8N webhook triggered: {webhook_url}")
            return True
    except Exception as e:
        logger.error(f"N8N webhook failed: {str(e)}")
        return False

async def send_lead_notification_email(
    lead_type: str,
    submission_id: str,
    name: str,
    email: str,
    phone: str,
    company: str,
    details: str,
    sales_email: str
):
    """Send lead notification email to sales team using Gmail SMTP"""
    try:
        from services.email_service import EmailService
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🎯 New Lead: {lead_type}</h1>
                                </td>
                            </tr>
                            
                            <!-- Body -->
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 24px 0;">Lead Information</h2>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                        <tr>
                                            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Submission ID:</strong></td>
                                            <td style="padding: 12px 0; color: #1a1a1a; text-align: right; font-size: 14px; border-bottom: 1px solid #e5e7eb;">{submission_id}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                                            <td style="padding: 12px 0; color: #1a1a1a; text-align: right; font-size: 14px; border-bottom: 1px solid #e5e7eb;">{name}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                                            <td style="padding: 12px 0; color: #1a1a1a; text-align: right; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:{email}" style="color: #2563eb; text-decoration: none;">{email}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                                            <td style="padding: 12px 0; color: #1a1a1a; text-align: right; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><a href="tel:{phone}" style="color: #2563eb; text-decoration: none;">{phone}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;"><strong>Company:</strong></td>
                                            <td style="padding: 12px 0; color: #1a1a1a; text-align: right; font-size: 14px; border-bottom: 1px solid #e5e7eb;">{company}</td>
                                        </tr>
                                    </table>
                                    
                                    <h3 style="color: #1a1a1a; font-size: 18px; margin: 24px 0 12px 0;">Additional Details</h3>
                                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #000000;">
                                        <p style="color: #4b5563; margin: 0; white-space: pre-line; font-size: 14px;">{details}</p>
                                    </div>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                                        <tr>
                                            <td align="center">
                                                <a href="mailto:{email}?subject=Re: {lead_type} - LEXA Lifestyle" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Reply to Lead</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 12px; margin: 0;">LEXA Lifestyle LLC | Integrated Luxury Living</p>
                                    <p style="color: #9ca3af; font-size: 11px; margin: 8px 0 0 0;">This is an automated notification from your website lead generation system.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        result = await EmailService.send_email(
            to_email=sales_email,
            subject=f"🎯 New Lead: {lead_type} - {name}",
            html_content=html_content
        )
        
        if result["status"] == "success":
            logger.info(f"Lead notification email sent to {sales_email}")
        else:
            logger.warning(f"Email sending {result['status']}: {result.get('reason') or result.get('error')}")
        
    except Exception as e:
        logger.error(f"Failed to send lead notification email: {str(e)}")
        raise


# ============= ROUTES =============
# Note: Public routes (health, solutions, articles, calculator, etc.) have been
# extracted to /routes/ modules and registered in app setup below

# ============= SETTINGS =============

@api_router.get("/settings")
async def get_settings():
    """Get site settings (with caching)"""
    try:
        # Try cache first (30 minutes TTL since settings rarely change)
        cache_key = "settings:site_settings"
        cached_settings = await cache.get(cache_key)
        if cached_settings is not None:
            return cached_settings
        
        # Cache miss - fetch from database
        settings = await db.settings.find_one({"key": "site_settings"}, {"_id": 0})
        if not settings:
            # Return defaults
            settings = {
                "hero_title": "LUXURY SMART LIVING",
                "hero_subtitle": "Designed & Delivered End-to-End",
                "brands_count": 50,
                "years_experience": 20,
                "projects_count": 1000,
                "experience_center_size": 60000
            }
        
        # Cache for 30 minutes
        await cache.set(cache_key, settings, ttl_seconds=1800)
        
        return settings
    except Exception as e:
        logger.error(f"Settings error: {str(e)}")
        return {}

# ============= ARTICLES / RESOURCES =============

@api_router.post("/admin/videos", response_model=Video, dependencies=[Depends(verify_token)])
async def create_video(video: Video, token_data: dict = Depends(verify_token)):
    """Create a new video (admin only)"""
    try:
        video_dict = video.model_dump()
        await db.videos.insert_one(video_dict)
        return video
    except Exception as e:
        logger.error(f"Create video error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create video")

@api_router.put("/admin/videos/{video_id}", response_model=Video, dependencies=[Depends(verify_token)])
async def update_video(video_id: str, video: Video, token_data: dict = Depends(verify_token)):
    """Update a video (admin only)"""
    try:
        video_dict = video.model_dump()
        result = await db.videos.replace_one({"id": video_id}, video_dict)
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        
        return video
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update video error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update video")

@api_router.delete("/admin/videos/{video_id}", dependencies=[Depends(verify_token)])
async def delete_video(video_id: str, token_data: dict = Depends(verify_token)):
    """Delete a video (admin only)"""
    try:
        result = await db.videos.delete_one({"id": video_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        
        return {"message": "Video deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete video error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete video")

@api_router.patch("/admin/videos/{video_id}")
async def patch_video(video_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a video (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.videos.update_one({"id": video_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        return {"message": "Video patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch video error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch video")

# ============= ADMIN AUTHENTICATION =============

@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(login_data: LoginRequest):
    """Admin login endpoint"""
    try:
        # Check credentials
        admin = await db.admin_users.find_one({"username": login_data.username})
        
        if not admin or not verify_password(login_data.password, admin["password"]):
            raise HTTPException(status_code=401, detail="Incorrect username or password")
        
        # Create access token
        access_token = create_access_token(data={"sub": login_data.username})
        
        return TokenResponse(access_token=access_token)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")

@api_router.get("/admin/verify")
async def verify_admin(user: dict = Depends(verify_token)):
    """Verify if token is valid"""
    return {"username": user["username"], "valid": True}

# ============= ADMIN - SOLUTIONS MANAGEMENT =============

@api_router.post("/admin/solutions")
async def create_solution(solution: Solution, user: dict = Depends(verify_token)):
    """Create a new solution"""
    try:
        solution_dict = solution.model_dump()
        await db.solutions.insert_one(solution_dict)
        return {"message": "Solution created successfully", "id": solution.id}
    except Exception as e:
        logger.error(f"Create solution error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create solution")

@api_router.put("/admin/solutions/{solution_id}")
async def update_solution(solution_id: str, solution: Solution, user: dict = Depends(verify_token)):
    """Update an existing solution"""
    try:
        solution_dict = solution.model_dump()
        result = await db.solutions.update_one(
            {"id": solution_id},
            {"$set": solution_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        return {"message": "Solution updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update solution error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update solution")

@api_router.delete("/admin/solutions/{solution_id}")
async def delete_solution(solution_id: str, user: dict = Depends(verify_token)):
    """Delete a solution"""
    try:
        result = await db.solutions.delete_one({"id": solution_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        return {"message": "Solution deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete solution error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete solution")

@api_router.patch("/admin/solutions/{solution_id}")
async def patch_solution(solution_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a solution (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.solutions.update_one({"id": solution_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Solution not found")
        return {"message": "Solution patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch solution error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch solution")

# ============= ADMIN - PROJECTS MANAGEMENT =============

@api_router.get("/admin/projects")
async def admin_get_projects(
    response: Response,
    user: dict = Depends(verify_token)
):
    """Get ALL projects (including unpublished) for admin panel"""
    # Prevent caching - always return fresh data
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    # No filter - return all projects for admin
    projects = await db.projects.find({}, {"_id": 0}).sort("year", -1).to_list(500)
    return projects

@api_router.get("/projects")
async def get_projects(
    response: Response,
    featured: Optional[bool] = None,
    category: Optional[str] = None,
    limit: int = 100
):
    """Get all published projects"""
    # Prevent caching - always return fresh data
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    query = {"published": True}
    
    if featured is not None:
        query["featured"] = featured
    
    if category:
        query["category"] = category
    
    projects = await db.projects.find(query, {"_id": 0}).sort("year", -1).limit(limit).to_list(limit)
    return projects

@api_router.get("/projects/{project_id}")
async def get_project_by_id(project_id: str):
    """Get a single project by ID or slug"""
    # Try to find by ID first, then by slug
    project = await db.projects.find_one(
        {"$or": [{"id": project_id}, {"slug": project_id}]},
        {"_id": 0}
    )
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Backwards compatibility fixes
    logger.info(f"Project before fixes - has image: {'image' in project}, has images: {len(project.get('images', []))}")
    
    if "gallery" in project and not project.get("images"):
        project["images"] = project["gallery"]
        logger.info("Mapped gallery to images")
    
    if not project.get("image") and project.get("images"):
        project["image"] = project["images"][0]
        logger.info(f"Set image field to: {project['image'][:80]}")
    
    logger.info(f"Project after fixes - has image: {'image' in project}")
    
    return project

@api_router.post("/admin/projects")
async def create_project(project: Project, user: dict = Depends(verify_token)):
    """Create a new project"""
    try:
        project_dict = project.model_dump()
        await db.projects.insert_one(project_dict)
        return {"message": "Project created successfully", "id": project.id}
    except Exception as e:
        logger.error(f"Create project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

@api_router.put("/admin/projects/{project_id}")
async def update_project(project_id: str, project: Project, user: dict = Depends(verify_token)):
    """Update an existing project"""
    try:
        project_dict = project.model_dump()
        # Preserve the original ID
        project_dict['id'] = project_id
        # Also update 'images' field for backward compatibility with frontend
        if 'gallery' in project_dict:
            project_dict['images'] = project_dict['gallery']
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": project_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update project")

@api_router.delete("/admin/projects/{project_id}")
async def delete_project(project_id: str, user: dict = Depends(verify_token)):
    """Delete a project"""
    try:
        result = await db.projects.delete_one({"id": project_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete project")

@api_router.patch("/admin/projects/{project_id}")
async def patch_project(project_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a project (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.projects.update_one({"id": project_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch project")


# ============= PROJECT TYPES MANAGEMENT =============

@api_router.get("/project-types")
async def get_project_types():
    """Get all project types"""
    try:
        types = await db.project_types.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return types
    except Exception as e:
        logger.error(f"Get project types error: {str(e)}")
        return []

@api_router.post("/admin/project-types")
async def create_project_type(project_type: ProjectType, user: dict = Depends(verify_token)):
    """Create a new project type"""
    try:
        type_dict = project_type.model_dump()
        await db.project_types.insert_one(type_dict)
        return {"message": "Project type created successfully", "id": project_type.id}
    except Exception as e:
        logger.error(f"Create project type error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project type")

@api_router.put("/admin/project-types/{type_id}")
async def update_project_type(type_id: str, project_type: ProjectType, user: dict = Depends(verify_token)):
    """Update an existing project type"""
    try:
        type_dict = project_type.model_dump()
        result = await db.project_types.update_one(
            {"id": type_id},
            {"$set": type_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project type not found")
        return {"message": "Project type updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update project type error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update project type")

@api_router.delete("/admin/project-types/{type_id}")
async def delete_project_type(type_id: str, user: dict = Depends(verify_token)):
    """Delete a project type"""
    try:
        result = await db.project_types.delete_one({"id": type_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project type not found")
        return {"message": "Project type deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete project type error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete project type")

# ============= PROJECT CATEGORIES MANAGEMENT =============

@api_router.get("/project-categories")
async def get_project_categories():
    """Get all project categories"""
    try:
        categories = await db.project_categories.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return categories
    except Exception as e:
        logger.error(f"Get project categories error: {str(e)}")
        return []

@api_router.post("/admin/project-categories")
async def create_project_category(category: ProjectCategory, user: dict = Depends(verify_token)):
    """Create a new project category"""
    try:
        cat_dict = category.model_dump()
        await db.project_categories.insert_one(cat_dict)
        return {"message": "Project category created successfully", "id": category.id}
    except Exception as e:
        logger.error(f"Create project category error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project category")

@api_router.put("/admin/project-categories/{category_id}")
async def update_project_category(category_id: str, category: ProjectCategory, user: dict = Depends(verify_token)):
    """Update an existing project category"""
    try:
        cat_dict = category.model_dump()
        result = await db.project_categories.update_one(
            {"id": category_id},
            {"$set": cat_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project category not found")
        return {"message": "Project category updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update project category error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update project category")

@api_router.delete("/admin/project-categories/{category_id}")
async def delete_project_category(category_id: str, user: dict = Depends(verify_token)):
    """Delete a project category"""
    try:
        result = await db.project_categories.delete_one({"id": category_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project category not found")
        return {"message": "Project category deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete project category error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete project category")


# ============= ADMIN - TEAM MEMBERS MANAGEMENT =============

@api_router.get("/team-members")
async def get_team_members():
    """Get all active team members (public)"""
    try:
        members = await db.team_members.find({"is_active": True}).sort("order", 1).to_list(100)
        for m in members:
            m.pop("_id", None)
        return members
    except Exception as e:
        logger.error(f"Get team members error: {str(e)}")
        return []

@api_router.get("/admin/team-members")
async def get_all_team_members(user: dict = Depends(verify_token)):
    """Get all team members (admin)"""
    try:
        members = await db.team_members.find({}).sort("order", 1).to_list(100)
        for m in members:
            m.pop("_id", None)
        return members
    except Exception as e:
        logger.error(f"Get team members error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch team members")

@api_router.post("/admin/team-members")
async def create_team_member(member: TeamMember, user: dict = Depends(verify_token)):
    """Create a new team member"""
    try:
        member_dict = member.model_dump()
        member_dict['created_at'] = datetime.now(timezone.utc).isoformat()
        await db.team_members.insert_one(member_dict)
        return {"message": "Team member created successfully", "id": member.id}
    except Exception as e:
        logger.error(f"Create team member error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create team member")

@api_router.put("/admin/team-members/{member_id}")
async def update_team_member(member_id: str, member: TeamMember, user: dict = Depends(verify_token)):
    """Update an existing team member"""
    try:
        member_dict = member.model_dump()
        member_dict['id'] = member_id
        result = await db.team_members.update_one(
            {"id": member_id},
            {"$set": member_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Team member not found")
        return {"message": "Team member updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update team member error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update team member")

@api_router.delete("/admin/team-members/{member_id}")
async def delete_team_member(member_id: str, user: dict = Depends(verify_token)):
    """Delete a team member"""
    try:
        result = await db.team_members.delete_one({"id": member_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Team member not found")
        return {"message": "Team member deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete team member error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete team member")


# ============= ADMIN - ARTICLES MANAGEMENT =============

@api_router.post("/admin/articles")
async def create_article(article: Article, user: dict = Depends(verify_token)):
    """Create a new article"""
    try:
        article_dict = article.model_dump()
        await db.articles.insert_one(article_dict)
        
        # Invalidate all articles cache keys
        await cache.delete_prefix("articles:")
        
        return {"message": "Article created successfully", "id": article.id}
    except Exception as e:
        logger.error(f"Create article error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create article")

@api_router.put("/admin/articles/{article_id}")
async def update_article(article_id: str, article: Article, user: dict = Depends(verify_token)):
    """Update an existing article"""
    try:
        article_dict = article.model_dump()
        result = await db.articles.update_one(
            {"id": article_id},
            {"$set": article_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Article not found")
        
        # Invalidate all articles cache keys
        await cache.delete_prefix("articles:")
        
        return {"message": "Article updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update article error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update article")

@api_router.delete("/admin/articles/{article_id}")
async def delete_article(article_id: str, user: dict = Depends(verify_token)):
    """Delete an article"""
    try:
        result = await db.articles.delete_one({"id": article_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Article not found")
        
        # Invalidate all articles cache keys
        await cache.delete_prefix("articles:")
        
        return {"message": "Article deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete article error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete article")

@api_router.patch("/admin/articles/{article_id}")
async def patch_article(article_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update an article (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        await cache.delete_prefix("articles:")
        result = await db.articles.update_one({"id": article_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Article not found")
        return {"message": "Article patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch article error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch article")


# ============= ADMIN - NEWS MANAGEMENT =============

@api_router.post("/admin/news")
async def create_news(article: News, user: dict = Depends(verify_token)):
    """Create a new news article"""
    try:
        news_dict = article.model_dump()
        await db.news.insert_one(news_dict)
        return {"message": "News article created successfully", "id": article.id}
    except Exception as e:
        logger.error(f"Create news error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create news article")

@api_router.put("/admin/news/{news_id}")
async def update_news(news_id: str, article: News, user: dict = Depends(verify_token)):
    """Update an existing news article"""
    try:
        news_dict = article.model_dump()
        result = await db.news.update_one(
            {"id": news_id},
            {"$set": news_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
        return {"message": "News article updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update news error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update news article")

@api_router.delete("/admin/news/{news_id}")
async def delete_news(news_id: str, user: dict = Depends(verify_token)):
    """Delete a news article"""
    try:
        result = await db.news.delete_one({"id": news_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
        return {"message": "News article deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete news error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete news article")

@api_router.patch("/admin/news/{news_id}")
async def patch_news(news_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a news article (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.news.update_one({"id": news_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
        return {"message": "News article patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch news error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch news article")

# ============= ADMIN - BRANDS MANAGEMENT =============

@api_router.post("/admin/brands")
async def create_brand(brand: Brand, user: dict = Depends(verify_token)):
    """Create a new brand"""
    try:
        brand_dict = brand.model_dump()
        await db.brands.insert_one(brand_dict)
        # Clear brands cache
        await cache.delete_prefix("brands:")
        return {"message": "Brand created successfully", "id": brand.id}
    except Exception as e:
        logger.error(f"Create brand error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create brand")

@api_router.put("/admin/brands/{brand_id}")
async def update_brand(brand_id: str, brand: Brand, user: dict = Depends(verify_token)):
    """Update an existing brand"""
    try:
        brand_dict = brand.model_dump()
        result = await db.brands.update_one(
            {"id": brand_id},
            {"$set": brand_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Brand not found")
        # Clear brands cache to ensure fresh data is fetched
        await cache.delete_prefix("brands:")
        return {"message": "Brand updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update brand error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update brand")

@api_router.delete("/admin/brands/{brand_id}")
async def delete_brand(brand_id: str, user: dict = Depends(verify_token)):
    """Delete a brand"""
    try:
        result = await db.brands.delete_one({"id": brand_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Brand not found")
        # Clear brands cache
        await cache.delete_prefix("brands:")
        return {"message": "Brand deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete brand error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete brand")

@api_router.patch("/admin/brands/{brand_id}")
async def patch_brand(brand_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a brand (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.brands.update_one({"id": brand_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Brand not found")
        # Clear brands cache
        await cache.delete_prefix("brands:")
        return {"message": "Brand patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch brand error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch brand")


# ============= ADMIN - CATALOGUES MANAGEMENT =============

@api_router.post("/admin/catalogues")
async def create_catalogue(data: dict, user: dict = Depends(verify_token)):
    """Create a new catalogue"""
    try:
        from models.content import Catalogue
        catalogue = Catalogue(**data)
        cat_dict = catalogue.model_dump()
        await db.catalogues.insert_one(cat_dict)
        return {"message": "Catalogue created successfully", "id": catalogue.id}
    except Exception as e:
        logger.error(f"Create catalogue error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create catalogue: {str(e)}")

@api_router.put("/admin/catalogues/{catalogue_id}")
async def update_catalogue(catalogue_id: str, data: dict, user: dict = Depends(verify_token)):
    """Update a catalogue"""
    try:
        from models.content import Catalogue
        catalogue = Catalogue(**data)
        cat_dict = catalogue.model_dump()
        result = await db.catalogues.update_one({"id": catalogue_id}, {"$set": cat_dict})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Catalogue not found")
        return {"message": "Catalogue updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update catalogue error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update catalogue: {str(e)}")

@api_router.delete("/admin/catalogues/{catalogue_id}")
async def delete_catalogue(catalogue_id: str, user: dict = Depends(verify_token)):
    """Delete a catalogue"""
    try:
        result = await db.catalogues.delete_one({"id": catalogue_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Catalogue not found")
        return {"message": "Catalogue deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete catalogue error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete catalogue")

@api_router.patch("/admin/catalogues/{catalogue_id}")
async def patch_catalogue(catalogue_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a catalogue (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.catalogues.update_one({"id": catalogue_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Catalogue not found")
        return {"message": "Catalogue patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch catalogue error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch catalogue")

@api_router.get("/admin/catalogues")
async def admin_get_catalogues(user: dict = Depends(verify_token)):
    """Get all catalogues (including unpublished) for admin"""
    try:
        catalogues = await db.catalogues.find({}, {"_id": 0}).sort([("priority", 1), ("title", 1)]).to_list(200)
        return catalogues
    except Exception as e:
        logger.error(f"Admin get catalogues error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch catalogues")


# ============= ADMIN - PRODUCT CATEGORIES MANAGEMENT =============

@api_router.post("/admin/products")
async def create_product_category(product: ProductCategory, user: dict = Depends(verify_token)):
    """Create a new product category"""
    try:
        product_dict = product.model_dump()
        await db.product_categories.insert_one(product_dict)
        return {"message": "Product category created successfully", "id": product.id}
    except Exception as e:
        logger.error(f"Create product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create product category")

@api_router.put("/admin/products/{product_id}")
async def update_product_category(product_id: str, product: ProductCategory, user: dict = Depends(verify_token)):
    """Update an existing product category"""
    try:
        product_dict = product.model_dump()
        result = await db.product_categories.update_one(
            {"id": product_id},
            {"$set": product_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product category not found")
        return {"message": "Product category updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update product category")

@api_router.delete("/admin/products/{product_id}")
async def delete_product_category(product_id: str, user: dict = Depends(verify_token)):
    """Delete a product category"""
    try:
        result = await db.product_categories.delete_one({"id": product_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product category not found")
        return {"message": "Product category deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete product category")

@api_router.patch("/admin/products/{product_id}")
async def patch_product_category(product_id: str, updates: Dict[str, Any], user: dict = Depends(verify_token)):
    """Partially update a product category (only provided fields)"""
    try:
        updates.pop("_id", None)
        updates.pop("id", None)
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
        result = await db.product_categories.update_one({"id": product_id}, {"$set": updates})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product category not found")
        return {"message": "Product category patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Patch product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch product category")


# ============= ADMIN - PRODUCT SERIES MANAGEMENT =============

@api_router.get("/product-series")
async def get_product_series():
    """Get all product series definitions"""
    try:
        series = await db.product_series.find({}, {"_id": 0}).sort([("name", 1)]).to_list(100)
        return series
    except Exception as e:
        logger.error(f"Get product series error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product series")

@api_router.post("/admin/product-series")
async def create_product_series(series: Dict[str, Any], user: dict = Depends(verify_token)):
    """Create a new product series"""
    try:
        series_id = series.get("id") or f"series-{uuid.uuid4().hex[:8]}"
        series_data = {
            "id": series_id,
            "name": series.get("name", ""),
            "slug": series.get("slug", series.get("name", "").lower().replace(" ", "-")),
            "description": series.get("description", ""),
            "brand": series.get("brand", ""),
            "category": series.get("category", ""),
            "image": series.get("image", ""),
            "featured": series.get("featured", False),
            "active": series.get("active", True),
            "order": series.get("order", 0),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.product_series.insert_one(series_data)
        series_data.pop("_id", None)
        return {"message": "Series created successfully", "series": series_data}
    except Exception as e:
        logger.error(f"Create series error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create series")

@api_router.put("/admin/product-series/{series_id}")
async def update_product_series(series_id: str, series: Dict[str, Any], user: dict = Depends(verify_token)):
    """Update an existing product series"""
    try:
        series.pop("_id", None)
        series["updated_at"] = datetime.now(timezone.utc).isoformat()
        result = await db.product_series.update_one({"id": series_id}, {"$set": series})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Series not found")
        return {"message": "Series updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update series error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update series")

@api_router.delete("/admin/product-series/{series_id}")
async def delete_product_series(series_id: str, user: dict = Depends(verify_token)):
    """Delete a product series"""
    try:
        result = await db.product_series.delete_one({"id": series_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Series not found")
        return {"message": "Series deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete series error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete series")


# ============= ADMIN - FORM SUBMISSIONS VIEWER =============

@api_router.get("/admin/submissions/consultations")
async def get_consultation_submissions(user: dict = Depends(verify_token), limit: int = Query(50, le=200)):
    """Get all consultation form submissions"""
    try:
        # Check both collections: consultation_bookings (from bookings.py) and consultations (legacy)
        submissions_new = await db.consultation_bookings.find({}, {"_id": 0}).sort([("timestamp", -1)]).limit(limit).to_list(limit)
        submissions_legacy = await db.consultations.find({}, {"_id": 0}).sort([("timestamp", -1)]).limit(limit).to_list(limit)
        # Combine submissions - each sorted individually, return combined list
        all_submissions = submissions_new + submissions_legacy
        return all_submissions[:limit]
    except Exception as e:
        logger.error(f"Get submissions error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

@api_router.get("/admin/submissions/contacts")
async def get_contact_submissions(user: dict = Depends(verify_token), limit: int = Query(50, le=200)):
    """Get all contact form submissions"""
    try:
        submissions = await db.contact_messages.find({}, {"_id": 0}).sort([("timestamp", -1)]).limit(limit).to_list(limit)
        return submissions
    except Exception as e:
        logger.error(f"Get contact submissions error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

# ============= ADMIN - DASHBOARD STATS =============

@api_router.get("/admin/stats")
async def get_admin_stats(user: dict = Depends(verify_token)):
    """Get dashboard statistics"""
    try:
        stats = {
            "solutions_count": await db.solutions.count_documents({}),
            "projects_count": await db.projects.count_documents({}),
            "articles_count": await db.articles.count_documents({}),
            "testimonials_count": await db.testimonials.count_documents({}),
            "consultations_count": await db.consultations.count_documents({}) + await db.consultation_bookings.count_documents({}),
            "contacts_count": await db.contact_messages.count_documents({}),
            "brands_count": await db.brands.count_documents({}),
            "products_count": await db.product_categories.count_documents({})
        }
        return stats
    except Exception as e:
        logger.error(f"Get stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch stats")

# ============= ADMIN - SITE SETTINGS =============

@api_router.get("/site-settings")
async def get_site_settings():
    """Get site settings (public - for header/footer)"""
    try:
        settings = await db.site_settings.find_one({}, {"_id": 0})
        if not settings:
            # Return default settings
            return {
                "header_logo_light": "/images/lexa-logo-white.png",
                "header_logo_dark": "/images/lexa-logo.png",
                "footer_logo_light": "/images/lexa-logo-white.png",
                "footer_logo_dark": "/images/lexa-logo.png",
                "favicon": "/favicon.ico",
                "social_instagram": "https://instagram.com/lexalifestyle",
                "social_facebook": "https://facebook.com/lexalifestyle",
                "social_linkedin": "https://linkedin.com/company/lexalifestyle",
                "social_youtube": "",
                "social_twitter": "",
                "social_tiktok": "",
                "social_whatsapp": "",
                "contact_email": "info@lexalifestyle.com",
                "contact_phone": "+971 4 XXX XXXX",
                "contact_address": "Dubai, UAE",
                "hero_title": "Transform Your Space Into an Intelligent Sanctuary",
                "hero_subtitle": "Experience the future of luxury living with LEXA's cutting-edge smart home solutions.",
                "hero_video_url": "",
                "hero_image": "",
                "site_name": "LEXA Lifestyle",
                "site_description": "Premium Smart Home Automation Solutions"
            }
        return settings
    except Exception as e:
        logger.error(f"Get site settings error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch site settings")

@api_router.get("/admin/site-settings")
async def get_admin_site_settings(user: dict = Depends(verify_token)):
    """Get site settings for admin panel"""
    try:
        settings = await db.site_settings.find_one({}, {"_id": 0})
        if not settings:
            # Return default settings
            settings = {
                "header_logo_light": "/images/lexa-logo-white.png",
                "header_logo_dark": "/images/lexa-logo.png",
                "footer_logo_light": "/images/lexa-logo-white.png",
                "footer_logo_dark": "/images/lexa-logo.png",
                "favicon": "/favicon.ico",
                "social_instagram": "",
                "social_facebook": "",
                "social_linkedin": "",
                "social_youtube": "",
                "social_twitter": "",
                "social_tiktok": "",
                "social_whatsapp": "",
                "contact_email": "info@lexalifestyle.com",
                "contact_phone": "+971 4 XXX XXXX",
                "contact_address": "Dubai, UAE",
                "hero_title": "Transform Your Space Into an Intelligent Sanctuary",
                "hero_subtitle": "Experience the future of luxury living with LEXA's cutting-edge smart home solutions.",
                "hero_video_url": "",
                "hero_image": "",
                "hero_cta_text": "Explore Solutions",
                "hero_cta_link": "/solutions",
                "site_name": "LEXA Lifestyle",
                "site_description": "Premium Smart Home Automation Solutions",
                "featured_projects_title": "Our Portfolio",
                "featured_projects_subtitle": "Explore our latest smart home transformations",
                "about_section_title": "About LEXA",
                "about_section_content": "",
                "about_section_image": ""
            }
        return settings
    except Exception as e:
        logger.error(f"Get admin site settings error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch site settings")

@api_router.put("/admin/site-settings")
async def update_site_settings(settings: Dict[str, Any], request: Request, user: dict = Depends(verify_token)):
    """Update site settings (admin only)"""
    try:
        # Add timestamp
        settings["updated_at"] = datetime.now(timezone.utc).isoformat()
        settings["updated_by"] = user.get('username')
        
        # Update or insert
        await db.site_settings.update_one(
            {},
            {"$set": settings},
            upsert=True
        )
        
        # Invalidate cache
        await cache.delete("site_settings")
        
        # Log the action
        await log_admin_action(
            action="update",
            resource="site_settings",
            details="Updated site settings",
            username=user.get('username'),
            ip=get_client_ip(request),
            status="success"
        )
        
        logger.info(f"Site settings updated by {user.get('username')}")
        return {"message": "Site settings updated successfully"}
    except Exception as e:
        logger.error(f"Update site settings error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update site settings")

# ============= CAREERS/JOBS MANAGEMENT =============

@api_router.get("/careers")
async def get_careers(active_only: bool = True):
    """Get all job positions (public)"""
    try:
        query = {"is_active": True} if active_only else {}
        careers = await db.careers.find(query, {"_id": 0}).sort("posted_date", -1).to_list(100)
        return careers
    except Exception as e:
        logger.error(f"Get careers error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch careers")

@api_router.get("/careers/{job_id}")
async def get_career(job_id: str):
    """Get a specific job position"""
    try:
        career = await db.careers.find_one({"id": job_id}, {"_id": 0})
        if not career:
            raise HTTPException(status_code=404, detail="Job position not found")
        return career
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get career error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch career")

@api_router.post("/admin/careers")
async def create_career(job: Dict[str, Any], user: dict = Depends(verify_token)):
    """Create a new job position"""
    try:
        if not job.get("id"):
            job["id"] = f"job-{datetime.now().timestamp():.0f}"
        job["created_at"] = datetime.now(timezone.utc).isoformat()
        job["created_by"] = user.get("username")
        
        await db.careers.insert_one(job)
        return {"message": "Job position created successfully", "id": job["id"]}
    except Exception as e:
        logger.error(f"Create career error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create job position")

@api_router.put("/admin/careers/{job_id}")
async def update_career(job_id: str, job: Dict[str, Any], user: dict = Depends(verify_token)):
    """Update a job position"""
    try:
        job["updated_at"] = datetime.now(timezone.utc).isoformat()
        job["updated_by"] = user.get("username")
        
        result = await db.careers.update_one(
            {"id": job_id},
            {"$set": job}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Job position not found")
        return {"message": "Job position updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update career error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update job position")

@api_router.delete("/admin/careers/{job_id}")
async def delete_career(job_id: str, user: dict = Depends(verify_token)):
    """Delete a job position"""
    try:
        result = await db.careers.delete_one({"id": job_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Job position not found")
        return {"message": "Job position deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete career error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete job position")

# ============= SETTINGS MANAGEMENT =============

@api_router.get("/settings/{key}")
async def get_setting(key: str):
    """Get a specific setting by key"""
    try:
        setting = await db.settings.find_one({"key": key}, {"_id": 0})
        if not setting:
            # Return default values for common settings
            defaults = {
                "homepage_stats": {
                    "key": "homepage_stats",
                    "value": [
                        {"icon": "Award", "value": 1000, "suffix": "+", "label": "Premium Brands"},
                        {"icon": "TrendingUp", "value": 15, "suffix": "+", "label": "Years Experience"},
                        {"icon": "Globe", "value": 50, "suffix": "+", "label": "Markets Served"},
                        {"icon": "Users", "value": 1000, "suffix": "s", "label": "Satisfied Customers"}
                    ]
                },
                "hero_stats": {
                    "key": "hero_stats",
                    "value": [
                        {"icon": "Shield", "value": "15+", "label": "Years"},
                        {"icon": "CheckCircle", "value": "500+", "label": "Projects"},
                        {"icon": "Star", "value": "4.9", "label": "Rating"}
                    ]
                },
                "trust_badges_stats": {
                    "key": "trust_badges_stats",
                    "value": [
                        {"icon": "Building2", "value": "500+", "label": "Projects Completed"},
                        {"icon": "Users", "value": "15+", "label": "Years Experience"},
                        {"icon": "Star", "value": "4.9", "label": "Client Rating"},
                        {"icon": "Award", "value": "32+", "label": "Premium Brands"}
                    ]
                }
            }
            if key in defaults:
                # Save default to database
                await db.settings.insert_one(defaults[key])
                return defaults[key]
            raise HTTPException(status_code=404, detail="Setting not found")
        return setting
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get setting error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch setting")

@api_router.get("/settings")
async def get_all_settings():
    """Get all settings"""
    try:
        settings = await db.settings.find({}, {"_id": 0}).to_list(100)
        return settings
    except Exception as e:
        logger.error(f"Get settings error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch settings")

@api_router.put("/admin/settings/{key}")
async def update_setting(key: str, setting: Dict[str, Any], request: Request, user: dict = Depends(verify_token)):
    """Update or create a setting (admin only)"""
    try:
        setting_doc = {
            "key": key,
            "value": setting.get("value"),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.settings.update_one(
            {"key": key},
            {"$set": setting_doc},
            upsert=True
        )
        
        # Invalidate settings cache
        await cache.delete("settings:site_settings")
        
        # Log the action
        await log_admin_action(
            action="update",
            resource="settings",
            details=f"Updated setting: {key}",
            username=user.get('username'),
            ip=get_client_ip(request),
            status="success"
        )
        
        logger.info(f"Setting updated: {key} by {user.get('username')}")
        return {"message": "Setting updated successfully", "key": key}
    except Exception as e:
        logger.error(f"Update setting error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update setting")

# ============= SYSTEM HEALTH & MONITORING =============

@api_router.get("/admin/cache/stats")
async def get_cache_stats(user: dict = Depends(verify_token)):
    """Get cache statistics (admin only)"""
    try:
        stats = await cache.stats()
        return {
            "status": "success",
            "cache": stats
        }
    except Exception as e:
        logger.error(f"Cache stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get cache stats")

@api_router.post("/admin/cache/clear")
async def clear_cache(user: dict = Depends(verify_token)):
    """Clear all cache (admin only)"""
    try:
        await cache.clear()
        logger.info(f"Cache cleared by admin: {user.get('username')}")
        return {
            "status": "success",
            "message": "Cache cleared successfully"
        }
    except Exception as e:
        logger.error(f"Clear cache error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to clear cache")

@api_router.get("/admin/system/health")
async def get_system_health(user: dict = Depends(verify_token)):
    """Get system health status (admin only)"""
    try:
        import psutil
        import time
        from datetime import timedelta
        
        # Database health check
        db_start = time.time()
        await db.admin_users.count_documents({})
        db_latency = int((time.time() - db_start) * 1000)
        
        # Get system stats
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        # Calculate uptime (simplified)
        uptime_seconds = int(time.time() - psutil.boot_time())
        uptime = str(timedelta(seconds=uptime_seconds))
        
        # Overall health status
        status = "healthy"
        if db_latency > 100 or memory.percent > 85:
            status = "warning"
        if db_latency > 500 or memory.percent > 95:
            status = "error"
        
        return {
            "status": status,
            "database": {
                "status": "connected",
                "latency": db_latency
            },
            "api": {
                "status": "running",
                "uptime": uptime
            },
            "storage": {
                "used": int(disk.used / (1024 * 1024)),  # MB
                "total": int(disk.total / (1024 * 1024))  # MB
            },
            "version": "v2.0.0",
            "lastUpdated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "memory": {
                "used_percent": memory.percent,
                "available_mb": int(memory.available / (1024 * 1024))
            }
        }
    except Exception as e:
        logger.error(f"System health check error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch system health")

@api_router.get("/admin/activity-logs")
async def get_activity_logs(user: dict = Depends(verify_token)):
    """Get activity logs (admin only)"""
    try:
        # Get logs from database (last 1000 entries)
        logs = await db.activity_logs.find({}, {"_id": 0}).sort("timestamp", -1).limit(1000).to_list(1000)
        return logs
    except Exception as e:
        logger.error(f"Get activity logs error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch activity logs")

@api_router.post("/admin/activity-logs")
async def create_activity_log(log_data: Dict[str, Any], request: Request, user: dict = Depends(verify_token)):
    """Create activity log entry (internal use)"""
    try:
        log_entry = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "user": user.get("username"),
            "action": log_data.get("action"),
            "resource": log_data.get("resource"),
            "details": log_data.get("details"),
            "ip_address": get_client_ip(request),
            "status": log_data.get("status", "success")
        }
        await db.activity_logs.insert_one(log_entry)
        return {"message": "Log created"}
    except Exception as e:
        logger.error(f"Create activity log error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create log")

# Helper function to log admin actions
async def log_admin_action(action: str, resource: str, details: str, username: str, ip: str, status: str = "success"):
    """Log admin action to database"""
    try:
        log_entry = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "user": username,
            "action": action,
            "resource": resource,
            "details": details,
            "ip_address": ip,
            "status": status
        }
        await db.activity_logs.insert_one(log_entry)
    except Exception as e:
        logger.error(f"Failed to log action: {str(e)}")

@api_router.get("/admin/system/version")
async def get_system_version():
    """Get current system version info"""
    return {
        "version": "v2.0.0",
        "release_date": "2026-02-04",
        "changelog": [
            "✅ Added enterprise security features",
            "✅ Implemented dynamic content management",
            "✅ Added settings management system",
            "✅ Improved admin panel UX",
            "✅ Added system health monitoring"
        ],
        "update_available": False,
        "latest_version": "v2.0.0"
    }

# ============= SEO MANAGEMENT =============

@api_router.get("/admin/seo/audit")
async def get_seo_audit(user: dict = Depends(verify_token)):
    """Run SEO audit and return score + issues"""
    try:
        issues = []
        
        # Check sitemap
        try:
            sitemap_exists = Path("/app/frontend/app/sitemap.ts").exists()
            if not sitemap_exists:
                issues.append({
                    "type": "error",
                    "category": "technical",
                    "message": "Sitemap file missing",
                    "fix": "Create sitemap.ts in app directory"
                })
        except Exception:
            pass
        
        # Check robots.txt
        try:
            robots_exists = Path("/app/frontend/public/robots.txt").exists()
            if not robots_exists:
                issues.append({
                    "type": "warning",
                    "category": "technical",
                    "message": "robots.txt file not found",
                    "fix": "Create robots.txt in public directory"
                })
        except Exception:
            pass
        
        # Check meta descriptions in database
        articles_without_meta = await db.articles.count_documents({"description": {"$exists": False}})
        if articles_without_meta > 0:
            issues.append({
                "type": "warning",
                "category": "content",
                "message": f"{articles_without_meta} articles missing meta descriptions",
                "fix": "Add meta descriptions to articles in admin panel"
            })
        
        # Check for duplicate titles
        articles = await db.articles.find({}, {"title": 1}).to_list(1000)
        titles = [a.get("title") for a in articles if a.get("title")]
        if len(titles) != len(set(titles)):
            issues.append({
                "type": "warning",
                "category": "content",
                "message": "Duplicate page titles detected",
                "fix": "Ensure each page has a unique title tag"
            })
        
        # Calculate scores
        errors = len([i for i in issues if i["type"] == "error"])
        warnings = len([i for i in issues if i["type"] == "warning"])
        
        technical_score = max(0, 100 - (errors * 20) - (warnings * 10))
        content_score = max(0, 100 - (articles_without_meta * 5))
        performance_score = 85  # Placeholder - would need real performance testing
        mobile_score = 90  # Placeholder - would need mobile testing
        overall_score = int((technical_score + content_score + performance_score + mobile_score) / 4)
        
        return {
            "score": {
                "overall": overall_score,
                "technical": technical_score,
                "content": content_score,
                "performance": performance_score,
                "mobile": mobile_score
            },
            "issues": issues
        }
    except Exception as e:
        logger.error(f"SEO audit error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to run SEO audit")

@api_router.get("/admin/seo/meta-tags")
async def get_all_meta_tags(user: dict = Depends(verify_token)):
    """Get meta tags for all pages"""
    try:
        meta_tags = await db.seo_meta_tags.find({}, {"_id": 0}).to_list(100)
        return meta_tags
    except Exception as e:
        logger.error(f"Get meta tags error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch meta tags")

@api_router.put("/admin/seo/meta-tags/{page_id}")
async def update_meta_tags(page_id: str, meta_data: Dict[str, Any], user: dict = Depends(verify_token)):
    """Update meta tags for a specific page"""
    try:
        meta_doc = {
            "page_id": page_id,
            "title": meta_data.get("title"),
            "description": meta_data.get("description"),
            "keywords": meta_data.get("keywords", []),
            "og_title": meta_data.get("og_title"),
            "og_description": meta_data.get("og_description"),
            "og_image": meta_data.get("og_image"),
            "canonical_url": meta_data.get("canonical_url"),
            "robots": meta_data.get("robots", "index,follow"),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.seo_meta_tags.update_one(
            {"page_id": page_id},
            {"$set": meta_doc},
            upsert=True
        )
        
        await log_admin_action(
            action="update",
            resource="seo_meta_tags",
            details=f"Updated meta tags for page: {page_id}",
            username=user.get('username'),
            ip="",
            status="success"
        )
        
        return {"message": "Meta tags updated successfully"}
    except Exception as e:
        logger.error(f"Update meta tags error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update meta tags")

@api_router.get("/admin/seo/redirects")
async def get_redirects(user: dict = Depends(verify_token)):
    """Get all 301 redirects"""
    try:
        redirects = await db.seo_redirects.find({}, {"_id": 0}).to_list(1000)
        return redirects
    except Exception as e:
        logger.error(f"Get redirects error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch redirects")

@api_router.post("/admin/seo/redirects")
async def create_redirect(redirect_data: Dict[str, Any], request: Request, user: dict = Depends(verify_token)):
    """Create a new 301 redirect"""
    try:
        redirect_doc = {
            "id": str(uuid.uuid4()),
            "from_url": redirect_data.get("from_url"),
            "to_url": redirect_data.get("to_url"),
            "type": redirect_data.get("type", "301"),
            "enabled": redirect_data.get("enabled", True),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.seo_redirects.insert_one(redirect_doc)
        
        await log_admin_action(
            action="create",
            resource="seo_redirects",
            details=f"Created redirect: {redirect_data.get('from_url')} -> {redirect_data.get('to_url')}",
            username=user.get('username'),
            ip=get_client_ip(request),
            status="success"
        )
        
        # Remove MongoDB _id before returning
        redirect_doc.pop('_id', None)
        
        return {"message": "Redirect created successfully", "redirect": redirect_doc}
    except Exception as e:
        logger.error(f"Create redirect error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create redirect")

@api_router.delete("/admin/seo/redirects/{redirect_id}")
async def delete_redirect(redirect_id: str, user: dict = Depends(verify_token)):
    """Delete a redirect"""
    try:
        await db.seo_redirects.delete_one({"id": redirect_id})
        
        await log_admin_action(
            action="delete",
            resource="seo_redirects",
            details=f"Deleted redirect: {redirect_id}",
            username=user.get('username'),
            ip="",
            status="success"
        )
        
        return {"message": "Redirect deleted successfully"}
    except Exception as e:
        logger.error(f"Delete redirect error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete redirect")

@api_router.get("/admin/seo/images")
async def get_image_seo_data(user: dict = Depends(verify_token)):
    """Scan and analyze all images for SEO optimization"""
    try:
        # Scan components and pages for images
        images = []
        image_id = 0
        
        # Sample data - In production, this would scan actual files
        # For now, let's check images in database (articles, projects, etc.)
        
        # Check article images
        articles = await db.articles.find({}, {"_id": 0, "title": 1, "image": 1, "slug": 1}).to_list(1000)
        for article in articles:
            if article.get("image"):
                image_id += 1
                images.append({
                    "id": f"article-{article.get('slug', image_id)}",
                    "url": article.get("image"),
                    "alt": article.get("title", ""),  # Using title as alt (should be separate field)
                    "page": f"/blog/{article.get('slug', '')}",
                    "size": 150000,  # Placeholder
                    "width": 1200,
                    "height": 630,
                    "format": "jpg",
                    "hasAlt": bool(article.get("title")),
                    "isOptimized": True,  # Placeholder
                    "lazyLoaded": True
                })
        
        # Check project images
        projects = await db.projects.find({}, {"_id": 0, "name": 1, "image": 1, "slug": 1}).to_list(1000)
        for project in projects:
            if project.get("image"):
                image_id += 1
                images.append({
                    "id": f"project-{project.get('slug', image_id)}",
                    "url": project.get("image"),
                    "alt": project.get("name", ""),
                    "page": f"/projects/{project.get('slug', '')}",
                    "size": 200000,
                    "width": 1920,
                    "height": 1080,
                    "format": "jpg",
                    "hasAlt": bool(project.get("name")),
                    "isOptimized": False,  # Projects often have large images
                    "lazyLoaded": True
                })
        
        # Check solution images
        solutions = await db.solutions.find({}, {"_id": 0, "name": 1, "image": 1, "slug": 1}).to_list(1000)
        for solution in solutions:
            if solution.get("image"):
                image_id += 1
                images.append({
                    "id": f"solution-{solution.get('slug', image_id)}",
                    "url": solution.get("image"),
                    "alt": solution.get("name", ""),
                    "page": f"/solutions/{solution.get('slug', '')}",
                    "size": 180000,
                    "width": 1600,
                    "height": 900,
                    "format": "jpg",
                    "hasAlt": bool(solution.get("name")),
                    "isOptimized": True,
                    "lazyLoaded": True
                })
        
        # Calculate stats
        total = len(images)
        with_alt = len([img for img in images if img["hasAlt"]])
        without_alt = total - with_alt
        needs_optimization = len([img for img in images if not img["isOptimized"]])
        optimized = total - needs_optimization
        lazy_loaded = len([img for img in images if img["lazyLoaded"]])
        
        stats = {
            "total": total,
            "withAlt": with_alt,
            "withoutAlt": without_alt,
            "optimized": optimized,
            "needsOptimization": needs_optimization,
            "lazyLoaded": lazy_loaded
        }
        
        return {
            "images": images,
            "stats": stats
        }
    except Exception as e:
        logger.error(f"Image SEO scan error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to scan images")

@api_router.put("/admin/seo/images/{image_id}")
async def update_image_alt(image_id: str, update_data: Dict[str, Any], user: dict = Depends(verify_token)):
    """Update alt text for an image"""
    try:
        new_alt = update_data.get("alt", "")
        
        # Parse image_id to determine collection
        if image_id.startswith("article-"):
            slug = image_id.replace("article-", "")
            await db.articles.update_one(
                {"slug": slug},
                {"$set": {"image_alt": new_alt}}
            )
        elif image_id.startswith("project-"):
            slug = image_id.replace("project-", "")
            await db.projects.update_one(
                {"slug": slug},
                {"$set": {"image_alt": new_alt}}
            )
        elif image_id.startswith("solution-"):
            slug = image_id.replace("solution-", "")
            await db.solutions.update_one(
                {"slug": slug},
                {"$set": {"image_alt": new_alt}}
            )
        
        await log_admin_action(
            action="update",
            resource="image_seo",
            details=f"Updated alt text for image: {image_id}",
            username=user.get('username'),
            ip="",
            status="success"
        )
        
        return {"message": "Alt text updated successfully"}
    except Exception as e:
        logger.error(f"Update image alt error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update alt text")

# Register extracted route modules
app.include_router(public_api.router)
app.include_router(content.router)
app.include_router(admin_content.router)  # Admin content management
app.include_router(admin_extended_content.router)  # Extended admin content
app.include_router(admin_arabic_pages.router)  # Arabic SEO pages management
app.include_router(bookings.router)
app.include_router(submissions.router)
app.include_router(calculator.router)
app.include_router(brands_products.router)
app.include_router(packages.router)  # Smart home packages
app.include_router(package_inquiry.router)  # Package inquiry submissions
app.include_router(intelligence.router)  # Intelligence builder
app.include_router(ai_recommendations.router)  # AI-powered recommendations
app.include_router(project_builder.router)  # Smart Project Builder (NEW)
app.include_router(smart_home_features.router)  # Smart Home Features & Systems
app.include_router(pricing.router)  # Centralized pricing management
app.include_router(patches.router)  # Patch management system
app.include_router(admin_solutions_services.router)  # Enhanced Solutions/Services admin
app.include_router(ai_chatbot.router)  # AI-powered chatbot
app.include_router(lead_enhancement.router)  # Social proof & lead capture
app.include_router(seo_enhancement.router)  # SEO schema markup
app.include_router(uploads.router)  # File uploads
app.include_router(analytics.router)  # Analytics tracking
app.include_router(sales_intelligence.router)  # Sales intelligence & lead routing
app.include_router(schedule_visit.router)  # Schedule visit booking
app.include_router(smart_recommendations.router)  # Smart AI recommendations
app.include_router(geo_pages.router)  # Geo pages management
app.include_router(tracking_settings.router)  # Tracking pixel settings
app.include_router(locations.router)  # Dynamic location pages
app.include_router(catalogues.router)  # Catalogues
app.include_router(regression_tests.router)  # Nightly regression test results
app.include_router(admin_whatsapp.router)  # WhatsApp/Interakt admin management
app.include_router(product_catalog.router)  # Product catalog

# --- Frontend Rebuild Endpoints ---
_rebuild_status = {"running": False, "last_result": None, "last_time": None, "log": ""}

@app.post("/api/admin/rebuild-frontend", dependencies=[Depends(verify_token)])
async def rebuild_frontend(user: dict = Depends(verify_token)):
    """Trigger a frontend production rebuild"""
    if _rebuild_status["running"]:
        raise HTTPException(status_code=409, detail="A build is already in progress")
    
    _rebuild_status["running"] = True
    _rebuild_status["last_result"] = "building"
    _rebuild_status["log"] = ""
    
    async def do_build():
        try:
            proc = await _asyncio.create_subprocess_exec(
                "bash", "-c", "cd /app/frontend && npx next build 2>&1",
                stdout=_asyncio.subprocess.PIPE,
                stderr=_asyncio.subprocess.STDOUT
            )
            stdout, _ = await proc.communicate()
            log = stdout.decode()[-2000:] if stdout else ""
            
            if proc.returncode == 0:
                # Restart frontend via supervisor
                restart = await _asyncio.create_subprocess_exec(
                    "sudo", "supervisorctl", "restart", "frontend",
                    stdout=_asyncio.subprocess.PIPE, stderr=_asyncio.subprocess.PIPE
                )
                await restart.communicate()
                _rebuild_status["last_result"] = "success"
                _rebuild_status["log"] = log
            else:
                _rebuild_status["last_result"] = "failed"
                _rebuild_status["log"] = log
        except Exception as e:
            _rebuild_status["last_result"] = "failed"
            _rebuild_status["log"] = str(e)
        finally:
            _rebuild_status["running"] = False
            _rebuild_status["last_time"] = datetime.now(timezone.utc).isoformat()
    
    _asyncio.create_task(do_build())
    return {"status": "started", "message": "Frontend rebuild started in background"}

@app.get("/api/admin/rebuild-status", dependencies=[Depends(verify_token)])
async def get_rebuild_status(user: dict = Depends(verify_token)):
    """Check frontend rebuild status"""
    return {
        "running": _rebuild_status["running"],
        "last_result": _rebuild_status["last_result"],
        "last_time": _rebuild_status["last_time"],
        "log": _rebuild_status["log"][-500:] if _rebuild_status["log"] else ""
    }

# Register main API router (remaining endpoints)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    """Initialize admin user on startup"""
    await init_admin()
    # Create weighted text search index for product catalog
    from routes.product_catalog import ensure_search_index
    await ensure_search_index()
    logger.info("✅ Admin initialization complete")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")

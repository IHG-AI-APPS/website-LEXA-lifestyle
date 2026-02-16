"""
Form submission models (Villa Design, Calculator, Contact)
"""
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
from uuid import uuid4


class VillaDesignSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
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


class ArchitectResourceRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
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
    id: str = Field(default_factory=lambda: str(uuid4()))
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
    id: str = Field(default_factory=lambda: str(uuid4()))
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


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
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


class LeadRequest(BaseModel):
    """Generic lead request model - supports both simple leads and developer bulk inquiries"""
    model_config = ConfigDict(extra="ignore")
    # Basic fields (required for simple leads)
    name: Optional[str] = None
    email: EmailStr
    phone: str
    message: Optional[str] = None
    
    # Developer packages fields (optional)
    companyName: Optional[str] = None
    contactName: Optional[str] = None
    projectType: Optional[str] = None
    unitCount: Optional[str] = None
    location: Optional[str] = None
    timeline: Optional[str] = None
    packageInterest: Optional[str] = None
    additionalInfo: Optional[str] = None
    source: Optional[str] = None
    type: Optional[str] = None


class CostCalculatorInput(BaseModel):
    property_type: str
    square_footage: int
    systems: List[str]
    timeline: Optional[str] = None


class CostCalculatorResult(BaseModel):
    estimated_cost_min: int
    estimated_cost_max: int
    timeline_weeks: int
    recommended_solutions: List[str]


class CalculatorSubmissionCreate(BaseModel):
    # Project Details
    project_type: str
    sub_category: str
    total_area: int
    num_rooms: int
    num_floors: int
    construction_stage: str
    
    # Solutions Selected
    selected_solutions: dict
    
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
    id: str = Field(default_factory=lambda: str(uuid4()))
    project_type: str
    sub_category: str
    total_area: int
    num_rooms: int
    num_floors: int
    construction_stage: str
    selected_solutions: dict
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
    cost_breakdown: List[dict]
    
    # Metadata
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class CalculatorQuote(BaseModel):
    total_cost: int
    estimated_timeline_weeks: int
    cost_breakdown: List[dict]
    size_multiplier: float
    retrofit_premium: float

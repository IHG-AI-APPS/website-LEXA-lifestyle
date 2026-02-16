from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

class ProjectTestimony(BaseModel):
    """Client testimony for a project"""
    quote: str
    client_name: str
    client_photo: Optional[str] = None
    client_title: Optional[str] = None

class ProjectBrand(BaseModel):
    """Brand used in project"""
    name: str
    logo: Optional[str] = None
    category: Optional[str] = None

class ProjectProduct(BaseModel):
    """Product used in project"""
    name: str
    category: str
    brand: Optional[str] = None
    image: Optional[str] = None

class ProjectBase(BaseModel):
    """Base project model"""
    model_config = ConfigDict(extra="ignore")
    
    # Basic Info
    id: str
    title: str
    slug: Optional[str] = None
    location: str
    year: str
    type: Optional[str] = "Residential"
    
    # Media
    image: str  # Main hero image
    images: List[str] = Field(default_factory=list)  # Gallery images
    video_url: Optional[str] = None  # YouTube/Vimeo or direct URL
    thumbnail: Optional[str] = None
    
    # Description
    description: str
    challenge: Optional[str] = None
    solution: Optional[str] = None
    approach: Optional[str] = None
    
    # Project Details
    client_name: Optional[str] = None
    consultant: Optional[str] = None
    contractor: Optional[str] = None
    size: Optional[str] = None
    budget_range: Optional[str] = None
    completion_date: Optional[str] = None
    
    # Technical Details
    systems: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    results: Optional[List[str]] = Field(default_factory=list)
    
    # Brands & Products
    brands: List[ProjectBrand] = Field(default_factory=list)
    products: List[ProjectProduct] = Field(default_factory=list)
    
    # Social Proof
    testimony: Optional[ProjectTestimony] = None
    
    # SEO & Metadata
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    
    # Admin
    featured: bool = False
    published: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ProjectCreate(BaseModel):
    """Model for creating a new project"""
    title: str = Field(..., min_length=3, max_length=200)
    slug: Optional[str] = None
    location: str = Field(..., min_length=3)
    year: str = Field(..., min_length=4, max_length=4)
    type: Optional[str] = "Residential"
    
    image: str
    images: List[str] = Field(default_factory=list)
    video_url: Optional[str] = None
    
    description: str = Field(..., min_length=10)
    challenge: Optional[str] = None
    solution: Optional[str] = None
    approach: Optional[str] = None
    
    client_name: Optional[str] = None
    consultant: Optional[str] = None
    contractor: Optional[str] = None
    size: Optional[str] = None
    budget_range: Optional[str] = None
    completion_date: Optional[str] = None
    
    systems: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    results: Optional[List[str]] = Field(default_factory=list)
    
    brands: List[ProjectBrand] = Field(default_factory=list)
    products: List[ProjectProduct] = Field(default_factory=list)
    
    testimony: Optional[ProjectTestimony] = None
    
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    
    featured: bool = False
    published: bool = True

class ProjectUpdate(BaseModel):
    """Model for updating an existing project"""
    title: Optional[str] = None
    slug: Optional[str] = None
    location: Optional[str] = None
    year: Optional[str] = None
    type: Optional[str] = None
    
    image: Optional[str] = None
    images: Optional[List[str]] = None
    video_url: Optional[str] = None
    
    description: Optional[str] = None
    challenge: Optional[str] = None
    solution: Optional[str] = None
    approach: Optional[str] = None
    
    client_name: Optional[str] = None
    consultant: Optional[str] = None
    contractor: Optional[str] = None
    size: Optional[str] = None
    budget_range: Optional[str] = None
    completion_date: Optional[str] = None
    
    systems: Optional[List[str]] = None
    features: Optional[List[str]] = None
    results: Optional[List[str]] = None
    
    brands: Optional[List[ProjectBrand]] = None
    products: Optional[List[ProjectProduct]] = None
    
    testimony: Optional[ProjectTestimony] = None
    
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    
    featured: Optional[bool] = None
    published: Optional[bool] = None

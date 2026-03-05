"""
Product Catalog models for individual products
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from uuid import uuid4
from datetime import datetime, timezone


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    slug: str
    name: str
    brand: str
    category: str  # Main category: Audio, Automation, Electrical, etc.
    sub_category: Optional[str] = None  # Series/sub-category
    description: Optional[str] = ""
    image: str = ""  # Primary product image (local server URL)
    images: List[str] = []  # Additional gallery images
    specifications: List[str] = []
    features: List[str] = []
    related_solutions: List[str] = []
    featured: bool = False
    published: bool = True
    source_url: Optional[str] = None  # Original URL from live site
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class ProductCreate(BaseModel):
    name: str
    brand: str
    category: str
    sub_category: Optional[str] = None
    description: Optional[str] = ""
    image: Optional[str] = ""
    images: List[str] = []
    specifications: List[str] = []
    features: List[str] = []
    related_solutions: List[str] = []
    featured: bool = False
    published: bool = True


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    sub_category: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    specifications: Optional[List[str]] = None
    features: Optional[List[str]] = None
    related_solutions: Optional[List[str]] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None


class ProductListResponse(BaseModel):
    products: List[Product]
    total: int
    page: int
    page_size: int
    total_pages: int

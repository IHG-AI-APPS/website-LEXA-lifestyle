"""
Content models (Solutions, Articles, Projects, Testimonials, Services)
"""
from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import List, Optional
from uuid import uuid4


class Solution(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    category: str
    description: str
    long_description: str
    meta_description: Optional[str] = None
    image: str
    hero_image: Optional[str] = None
    features: List[str]
    process: Optional[List[dict]] = []
    icon: Optional[str] = None
    tags: List[str] = []
    brands: Optional[List[str]] = []
    feature_cards: Optional[List[dict]] = []
    faqs: Optional[List[dict]] = []
    additional_sections: Optional[List[dict]] = []
    # Mega menu fields
    featured: Optional[bool] = False
    popular: Optional[bool] = False
    badge: Optional[str] = None
    mega_menu_category: Optional[str] = None
    mega_menu_order: Optional[int] = 99
    # Enhanced fields for SEO and admin
    priority: int = 100  # Lower = shown first
    tagline: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    key_benefits: List[str] = []  # Key benefits/selling points
    related_products: List = []  # Related product slugs or dicts
    certifications: List[str] = []
    compatible_brands: List[str] = []
    gallery_images: List[str] = []
    # Arabic translations
    title_ar: Optional[str] = None
    description_ar: Optional[str] = None
    long_description_ar: Optional[str] = None
    tagline_ar: Optional[str] = None
    category_ar: Optional[str] = None
    features_ar: List[str] = []
    key_benefits_ar: List[str] = []


class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: Optional[str] = None
    name: str
    title: Optional[str] = None
    description: str
    long_description: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    hero_image: Optional[str] = None
    order: int = 100
    priority: int = 100  # Lower = shown first
    tagline: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    key_features: List[str] = []
    process_steps: List[dict] = []  # Service delivery process
    related_products: List = []  # Related solutions/services slugs
    certifications: List[str] = []
    faqs: List[dict] = []
    gallery_images: List[str] = []  # Inspiration gallery
    brands: List[str] = []  # Partner brands
    feature_cards: List[dict] = []  # Feature category cards
    featured: bool = False
    # Arabic translations
    name_ar: Optional[str] = None
    title_ar: Optional[str] = None
    description_ar: Optional[str] = None
    long_description_ar: Optional[str] = None
    tagline_ar: Optional[str] = None
    key_features_ar: List[str] = []


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    title: str
    slug: Optional[str] = None
    category: Optional[str] = None
    location: str
    year: str
    description: str
    features: Optional[List[str]] = []
    image: Optional[str] = None
    images: Optional[List[str]] = []
    thumbnail: Optional[str] = None
    size: Optional[str] = None
    budget_range: Optional[str] = None
    systems: Optional[List[str]] = []
    type: Optional[str] = None


class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    role: str = ''
    company: Optional[str] = ''
    content: Optional[str] = None  # Can be None, will be populated from 'testimonial' field
    testimonial: Optional[str] = None  # Alternative field name in database
    rating: int = 5
    image: Optional[str] = None
    project_type: Optional[str] = None
    featured: bool = False
    
    @model_validator(mode='after')
    def ensure_content(self):
        # If content is missing but testimonial exists, use testimonial
        if not self.content and self.testimonial:
            self.content = self.testimonial
        # If both are missing, set empty string
        if not self.content:
            self.content = ''
        return self


class Article(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    category: str
    published_date: str
    featured_image: str
    tags: Optional[List[str]] = []
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


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
    priority: int = 100  # Lower number = higher priority (shown first)
    products: List[dict] = []  # Top selling products with name, description, image, price_range
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    long_description: Optional[str] = None  # Extended description for SEO
    certifications: List[str] = []  # e.g., ["CEDIA Certified", "THX Certified"]
    key_features: List[str] = []  # Key brand features/benefits
    gallery_images: List[str] = []  # Inspiration gallery
    feature_cards: List[dict] = []  # Feature category cards
    related_solutions: List[str] = []  # Related solution slugs


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


class Video(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    video_url: str
    thumbnail_url: Optional[str] = None
    duration: Optional[str] = None
    category: str
    tags: List[str] = []
    featured: bool = False
    view_count: int = 0
    published_date: str
    related_service: Optional[str] = None
    related_project: Optional[str] = None
    related_solution: Optional[str] = None
    embed_code: Optional[str] = None

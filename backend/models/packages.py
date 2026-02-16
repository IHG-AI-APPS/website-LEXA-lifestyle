"""
Smart Home Package Models
Property Types, Tiers, and Specialty Rooms
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import uuid4


class SpecialtyRoom(BaseModel):
    """Individual specialty room/feature that can be added"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    slug: str
    name: str
    category: str  # wine-cellar, game-room, spa, etc.
    description: str
    features: List[str]
    typical_size: str  # "200-400 sq ft"
    base_price_aed: int
    image: str
    tags: List[str] = []


class PackageTier(BaseModel):
    """Essential, Enhanced, or High-End tier"""
    tier_level: str  # essential, enhanced, highend
    tier_name: str  # "Essential", "Enhanced", "High-End"
    tier_subtitle: str  # "Smart Living Fundamentals"
    base_price_aed: int
    typical_rooms_count: str  # "8 rooms" or "12+ rooms"
    
    # Core features included
    lighting_features: List[str]
    climate_features: List[str]
    security_features: List[str]
    entertainment_features: List[str]
    additional_features: List[str]
    
    # Specialty rooms included (for high-end tier)
    included_specialty_count: int = 0  # High-end: "Choose 3"
    available_specialty_rooms: List[str] = []  # List of specialty room slugs
    
    # Support level
    support_level: str  # "Standard", "Priority", "White-Glove"
    
    badge: Optional[str] = None  # "Most Popular"
    recommended: bool = False


class PropertyPackage(BaseModel):
    """Complete package for a property type (Villa, Penthouse, etc.)"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    slug: str
    property_type: str  # "luxury-villa", "penthouse", etc.
    title: str  # "Luxury Villas & Mansions"
    subtitle: str  # "5,000+ sq ft | Multi-floor | Staff quarters"
    description: str
    long_description: str
    
    # Typical property specs
    typical_size_range: str  # "5,000-15,000 sq ft"
    typical_features: List[str]  # ["Multi-floor", "Staff quarters", "Pool"]
    
    # Package tiers
    tiers: List[PackageTier]
    
    # Visual
    hero_image: str
    gallery_images: List[str] = []
    
    # SEO
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    
    # Display
    featured: bool = True
    display_order: int = 1

"""
Intelligence Builder Data Models
Pydantic models for the intelligent home builder feature
"""
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import uuid4


class LifestyleSelection(BaseModel):
    """User's lifestyle priority selection"""
    category: str
    priority: int  # 1-6 ranking


class FeatureSelection(BaseModel):
    """Selected smart home feature"""
    feature_id: str
    category: str
    selected: bool = True


class IntelligenceSession(BaseModel):
    """User's intelligence builder session"""
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid4()))
    session_hash: str = Field(default_factory=lambda: str(uuid4())[:8])
    
    # Phase 1: Lifestyle Discovery
    lifestyle_selections: List[LifestyleSelection] = []
    
    # Phase 2: Feature Selection
    selected_features: List[FeatureSelection] = []
    
    # Phase 3: Intelligence Score
    intelligence_score: int = 0
    iq_level: str = ""
    achievements: List[str] = []
    
    # Phase 4: System Recommendations
    recommended_systems: List[Dict[str, Any]] = []
    selected_system: Optional[Dict[str, Any]] = None
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    completed: bool = False
    
    # User info (optional)
    user_email: Optional[EmailStr] = None
    user_name: Optional[str] = None
    user_phone: Optional[str] = None


class IntelligenceFeature(BaseModel):
    """Smart home intelligence feature"""
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid4()))
    slug: str
    title: str
    category: str  # scene_automation, presence_detection, etc.
    icon: str  # Icon name for frontend
    
    short_description: str
    detailed_description: str
    
    # Scoring
    iq_points: int  # Points contributed to IQ score
    scoring_category: str  # automation_coverage, ai_features, energy, wellness, security
    
    # Real-world scenarios
    scenarios: List[Dict[str, str]] = []  # {"room": "Living Room", "scenario": "..."}
    
    # Benefits
    benefits: List[str] = []
    
    # Requirements
    required_devices: List[str] = []
    compatible_systems: List[str] = []
    
    # Lifestyle fit
    lifestyle_tags: List[str] = []  # comfort, security, energy, entertainment, wellness, convenience
    
    # Premium feature flag
    is_premium: bool = False
    
    # Display
    display_order: int = 0
    featured: bool = False


class SystemRecommendation(BaseModel):
    """Control system recommendation"""
    system_id: str
    system_name: str
    match_percentage: int  # % of selected features supported
    iq_potential: int  # Max IQ achievable with this system
    key_strengths: List[str]
    compatible_brands: List[str]
    price_tier: str  # entry, mid, premium
    supports_matter: bool
    supports_thread: bool
    voice_integration: List[str]  # josh_ai, alexa, google, siri


class IntelligenceReport(BaseModel):
    """Generated intelligence report"""
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid4()))
    session_id: str
    session_hash: str
    
    # Summary
    intelligence_score: int
    iq_level: str
    achievements: List[str]
    
    # Selections
    lifestyle_priorities: List[Dict[str, Any]]
    selected_features: List[Dict[str, Any]]
    recommended_system: Dict[str, Any]
    
    # Projections
    projected_energy_savings_percent: int
    projected_annual_savings_aed: int
    wellness_benefits: List[str]
    security_level: str
    
    # Infrastructure
    infrastructure_requirements: List[str]
    
    # Investment
    estimated_cost_min: int
    estimated_cost_max: int
    
    # Metadata
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    pdf_url: Optional[str] = None
    shareable_url: Optional[str] = None


class CalculateScoreRequest(BaseModel):
    """Request to calculate intelligence score"""
    selected_features: List[FeatureSelection]
    lifestyle_selections: List[LifestyleSelection]


class SaveSessionRequest(BaseModel):
    """Request to save session"""
    session: IntelligenceSession


class SendMagicLinkRequest(BaseModel):
    """Request to send magic link"""
    email: EmailStr
    session_hash: str


class GenerateReportRequest(BaseModel):
    """Request to generate report"""
    session_id: str

"""
Smart Project Builder - Data Models
Enhanced feature schema with segment gates, rules, and bundles
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# ============================================================================
# ENHANCED FEATURE MODEL (650+ features with intelligence)
# ============================================================================

class EnhancedFeature(BaseModel):
    """
    Enhanced feature model with full tagging for intelligent resolution
    """
    # Identity & Classification
    feature_id: str = Field(..., description="Stable unique identifier")
    feature_name: str = Field(..., description="Display name")
    feature_description: str = Field(..., description="1-2 line description")
    system_domain: str = Field(..., description="Lighting/HVAC/AV/Security/Network/BMS/etc")
    space_tags: List[str] = Field(default=[], description="Cinema/Boardroom/Living/etc")
    
    # Eligibility Gates
    segments_allowed: List[str] = Field(..., description="Residential/Commercial/Hospitality/etc")
    property_types_allowed: List[str] = Field(..., description="Villa/Apartment/Hotel/Office/etc")
    project_stage_allowed: List[str] = Field(..., description="Concept/Design/Construction/Retrofit")
    min_area_sqft: Optional[int] = Field(None, description="Minimum property size")
    max_area_sqft: Optional[int] = Field(None, description="Maximum property size")
    project_scale: List[str] = Field(default=[], description="Small/Medium/Large/Estate")
    
    # Intent Alignment
    objective_tags: List[str] = Field(..., description="Comfort/Luxury/Security/Energy/etc")
    priority_role_tags: List[str] = Field(default=[], description="Homeowner/Architect/Developer/etc")
    
    # Complexity & Constraints
    complexity: int = Field(..., ge=1, le=5, description="Complexity level 1-5")
    invasiveness: str = Field(..., description="Low/Medium/High retrofit friendliness")
    dependencies_required: List[str] = Field(default=[], description="Required feature IDs or types")
    pre_reqs: List[str] = Field(default=[], description="Technical prerequisites")
    risk_flags: List[str] = Field(default=[], description="Constraints and risks")
    
    # Commercial Logic
    tier: str = Field(..., description="Essential/Premium/Signature")
    bundle_key: Optional[str] = Field(None, description="Bundle group identifier")
    estimated_effort: str = Field(..., description="S/M/L effort band")
    compliance_notes: str = Field(default="", description="UAE-specific requirements")
    
    # Legacy fields (keep for compatibility)
    iq_points: int = Field(default=5, description="Legacy scoring points")
    icon: str = Field(default="Check", description="Icon name")
    scenarios: List[Dict] = Field(default=[], description="Use case scenarios")
    benefits: List[str] = Field(default=[], description="Feature benefits")
    is_premium: bool = Field(default=False, description="Premium flag")
    featured: bool = Field(default=False, description="Featured flag")
    related_solutions: List[str] = Field(default=[], description="Related solution names")
    popularity_score: int = Field(default=1, description="Usage popularity")


# ============================================================================
# BUNDLE MODEL (Groups of features)
# ============================================================================

class Bundle(BaseModel):
    """
    Bundle represents a group of features packaged together
    """
    bundle_id: str = Field(..., description="Unique bundle identifier")
    bundle_name: str = Field(..., description="Display name")
    bundle_description: str = Field(..., description="What this bundle provides")
    segment: str = Field(..., description="Residential/Commercial/etc")
    tier: str = Field(..., description="Essential/Premium/Signature")
    system_domains: List[str] = Field(..., description="Primary system domains")
    feature_ids: List[str] = Field(..., description="Included feature IDs")
    
    # Eligibility
    min_area_sqft: Optional[int] = None
    max_area_sqft: Optional[int] = None
    property_types_allowed: List[str] = Field(default=[])
    project_stage_allowed: List[str] = Field(default=[])
    
    # Pricing & Effort
    estimated_price_range: Optional[str] = Field(None, description="e.g., 15000-25000 AED")
    estimated_effort_days: Optional[str] = Field(None, description="e.g., 5-10 days")
    
    # Marketing
    use_cases: List[str] = Field(default=[], description="Objective tags")
    thumbnail: Optional[str] = Field(None, description="Image URL")
    benefits: List[str] = Field(default=[])
    
    # Metadata
    created_at: Optional[datetime] = None
    is_active: bool = True


# ============================================================================
# RULES ENGINE MODEL
# ============================================================================

class Rule(BaseModel):
    """
    Business rule for intelligent feature resolution
    """
    rule_id: str = Field(..., description="Unique rule identifier")
    rule_type: str = Field(..., description="exclusion/substitution/dependency/warning")
    priority: int = Field(default=100, description="Higher runs first")
    
    # Condition (when to apply)
    condition: Dict[str, Any] = Field(..., description="Matching criteria")
    
    # Action (what to do)
    action: Dict[str, Any] = Field(..., description="Action to take")
    
    # Human-readable
    message: str = Field(..., description="Explanation for user")
    reason: Optional[str] = Field(None, description="Internal reasoning")
    
    # Control
    active: bool = True
    segment: Optional[str] = None  # Filter by segment
    created_at: Optional[datetime] = None


# ============================================================================
# SESSION MODEL (User journey state)
# ============================================================================

class ProjectSession(BaseModel):
    """
    Tracks user's project builder journey
    """
    session_id: str
    
    # Step 1: Project DNA
    segment: Optional[str] = None  # Residential/Commercial/etc
    property_type: Optional[str] = None  # Villa/Apartment/etc
    project_stage: Optional[str] = None  # Concept/Design/etc
    area_sqft: Optional[int] = None
    location: Optional[str] = None
    num_floors: Optional[int] = None
    num_rooms: Optional[int] = None
    project_scale: Optional[str] = None  # Small/Medium/Large/Estate
    
    # Step 2: Objectives
    selected_objectives: List[str] = Field(default=[])
    
    # Step 3: Spaces
    selected_spaces: List[str] = Field(default=[])
    
    # Step 4-5: Selections
    selected_bundle_ids: List[str] = Field(default=[])
    selected_feature_ids: List[str] = Field(default=[])
    rejected_bundle_ids: List[str] = Field(default=[])  # User explicitly rejected
    
    # Step 6: Details
    timeline: Optional[str] = None
    budget_band: Optional[str] = None
    brand_preference: Optional[str] = None
    special_notes: Optional[str] = None
    uploaded_files: List[str] = Field(default=[])
    
    # Contact Info (Step 7)
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    completed: bool = False
    lead_score: Optional[int] = None
    routed_to: Optional[str] = None


# ============================================================================
# REQUEST/RESPONSE MODELS (API Payloads)
# ============================================================================

class InitializeProjectRequest(BaseModel):
    """Step 1: Capture project DNA"""
    segment: str
    property_type: str
    project_stage: str
    area_sqft: int
    location: Optional[str] = None
    num_floors: Optional[int] = None
    num_rooms: Optional[int] = None


class ObjectivesRequest(BaseModel):
    """Step 2: Select objectives"""
    session_id: str
    selected_objectives: List[str]


class ResolveRequest(BaseModel):
    """Step 3-5: Resolve bundles and features"""
    session_id: str
    selected_bundle_ids: List[str]
    selected_space_ids: Optional[List[str]] = []


class SubmitProjectRequest(BaseModel):
    """Step 7: Final submission"""
    session_id: str
    contact_name: str
    contact_email: str
    contact_phone: str
    timeline: Optional[str] = None
    budget_band: Optional[str] = None
    notes: Optional[str] = None


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class BundleRecommendation(BaseModel):
    """Recommended bundle with reasoning"""
    bundle: Bundle
    score: float
    reasoning: str
    why_recommended: List[str]
    dependencies: List[str] = []


class ResolvedSystem(BaseModel):
    """Core system module with features"""
    system_name: str
    system_domain: str
    features: List[EnhancedFeature]
    bundle_info: Optional[Bundle] = None
    total_iq_points: int = 0


class BOQSummary(BaseModel):
    """Bill of Quantities summary"""
    client_summary: Dict[str, Any]
    internal_boq: Dict[str, Any]
    pdf_url: Optional[str] = None


class CRMPayload(BaseModel):
    """Structured payload for CRM integration"""
    # Project DNA
    segment: str
    property_type: str
    project_stage: str
    area_sqft: int
    location: Optional[str]
    
    # User Intent
    objectives: List[str]
    spaces_selected: List[str]
    
    # Technical Selection
    bundles_selected: List[Dict]
    core_systems: List[str]
    enhancements_accepted: List[str]
    
    # Qualification
    budget_band: Optional[str]
    timeline: Optional[str]
    brand_preference: Optional[str]
    uploaded_files: List[str]
    
    # Contact
    contact_name: str
    contact_email: str
    contact_phone: str
    notes: Optional[str]
    
    # Meta
    lead_score: int
    routing_to: str
    source_page: str = "smart-project-builder"
    created_at: datetime

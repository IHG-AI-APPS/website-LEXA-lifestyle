"""
Smart Home Features & Systems API
Provides endpoints for the new project builder flow:
1. Feature selection by priority tier
2. Protocol selection (Wired/Wireless/Hybrid)
3. System recommendation and selection
4. Save project configurations
5. Book consultations
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import json
import os
import logging
import uuid
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from routes.pricing import get_package_tier_pricing_data, get_budget_ranges_data

logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'lexa_db')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[db_name]

router = APIRouter(prefix="/api/smart-home", tags=["Smart Home Features"])

# Load feature data
FEATURES_FILE = os.path.join(os.path.dirname(__file__), "../data/features/smart_home_features.json")

def load_features_data():
    """Load features from JSON file"""
    try:
        with open(FEATURES_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading features: {e}")
        return {"categories": [], "protocols": {}, "systems": []}

# Models
class FeatureSelection(BaseModel):
    feature_id: str
    tier: str  # must_have, should_have, could_have, want_to_have

class ProtocolSelection(BaseModel):
    protocol_type: str  # wired, wireless, hybrid
    selected_protocols: List[str]

class SystemSelection(BaseModel):
    selected_systems: List[str]

class ProjectDetailsModel(BaseModel):
    projectType: Optional[str] = None  # new_build, retrofit, renovation
    propertyType: Optional[str] = None  # villa, apartment, penthouse, townhouse, commercial
    propertySize: Optional[str] = None
    customSize: Optional[int] = None
    bedrooms: Optional[int] = 4
    floors: Optional[int] = 2
    budget: Optional[str] = None  # starter, standard, premium, luxury, ultra
    timeline: Optional[str] = None  # urgent, normal, relaxed, future
    location: Optional[str] = None
    specialRequirements: Optional[str] = None

class ProjectSelections(BaseModel):
    session_id: str
    selected_features: Dict[str, List[str]]  # tier -> list of feature_ids
    protocol_type: Optional[str] = None
    selected_protocols: Optional[List[str]] = []
    selected_systems: Optional[List[str]] = []
    project_details: Optional[ProjectDetailsModel] = None


# ============= FEATURE ENDPOINTS =============

@router.get("/features")
async def get_all_features():
    """Get all features organized by category"""
    data = load_features_data()
    return {
        "total_features": sum(len(cat["features"]) for cat in data["categories"]),
        "categories": data["categories"]
    }

@router.get("/features/by-tier/{tier}")
async def get_features_by_tier(tier: str):
    """Get features recommended for a specific tier"""
    if tier not in ["must_have", "should_have", "could_have", "want_to_have"]:
        raise HTTPException(status_code=400, detail="Invalid tier")
    
    data = load_features_data()
    features_by_category = []
    
    for category in data["categories"]:
        tier_features = [
            f for f in category["features"] 
            if f.get("tier_suggestion") == tier
        ]
        if tier_features:
            features_by_category.append({
                "category_id": category["id"],
                "category_name": category["name"],
                "category_icon": category["icon"],
                "features": sorted(tier_features, key=lambda x: x.get("popularity", 0), reverse=True)
            })
    
    return {
        "tier": tier,
        "categories": features_by_category,
        "total_features": sum(len(cat["features"]) for cat in features_by_category)
    }

@router.get("/features/popular")
async def get_popular_features(limit: int = 20):
    """Get most popular features across all categories"""
    data = load_features_data()
    all_features = []
    
    for category in data["categories"]:
        for feature in category["features"]:
            all_features.append({
                **feature,
                "category_id": category["id"],
                "category_name": category["name"],
                "category_icon": category["icon"]
            })
    
    # Sort by popularity and return top N
    popular = sorted(all_features, key=lambda x: x.get("popularity", 0), reverse=True)[:limit]
    return {"popular_features": popular}

@router.get("/features/search")
async def search_features(q: str):
    """Search features by name or description"""
    data = load_features_data()
    results = []
    q_lower = q.lower()
    
    for category in data["categories"]:
        for feature in category["features"]:
            if q_lower in feature["name"].lower() or q_lower in feature["description"].lower():
                results.append({
                    **feature,
                    "category_id": category["id"],
                    "category_name": category["name"]
                })
    
    return {"query": q, "results": results, "count": len(results)}


# ============= PROTOCOL ENDPOINTS =============

@router.get("/protocols")
async def get_all_protocols():
    """Get all protocol options organized by type"""
    data = load_features_data()
    return {
        "wired": data["protocols"].get("wired", []),
        "wireless": data["protocols"].get("wireless", []),
        "hybrid": data["protocols"].get("hybrid", [])
    }

@router.get("/protocols/{protocol_type}")
async def get_protocols_by_type(protocol_type: str):
    """Get protocols for a specific type (wired, wireless, hybrid)"""
    if protocol_type not in ["wired", "wireless", "hybrid"]:
        raise HTTPException(status_code=400, detail="Invalid protocol type")
    
    data = load_features_data()
    protocols = data["protocols"].get(protocol_type, [])
    
    return {
        "type": protocol_type,
        "protocols": protocols,
        "count": len(protocols)
    }


# ============= SYSTEM ENDPOINTS =============

@router.get("/systems")
async def get_all_systems():
    """Get all control systems"""
    data = load_features_data()
    systems = data.get("systems", [])
    
    # Group by tier
    by_tier = {}
    for system in systems:
        tier = system.get("tier", "other")
        if tier not in by_tier:
            by_tier[tier] = []
        by_tier[tier].append(system)
    
    return {
        "systems": systems,
        "by_tier": by_tier,
        "total": len(systems)
    }

@router.get("/systems/recommend")
async def recommend_systems(
    protocol_type: str = "hybrid",
    selected_protocols: str = "",
    budget_tier: str = "luxury"
):
    """Recommend systems based on selected protocols and budget"""
    data = load_features_data()
    systems = data.get("systems", [])
    
    protocol_list = [p.strip() for p in selected_protocols.split(",") if p.strip()]
    
    recommendations = []
    for system in systems:
        score = 0
        
        # Check protocol compatibility
        compatible_protocols = system.get("compatible_protocols", [])
        matching_protocols = set(protocol_list) & set(compatible_protocols)
        score += len(matching_protocols) * 20
        
        # Check tier match
        system_tier = system.get("tier", "")
        if budget_tier == "luxury" and system_tier in ["luxury", "ultra_luxury", "premium"]:
            score += 30
        elif budget_tier == "premium" and system_tier in ["premium", "luxury"]:
            score += 30
        elif budget_tier == "value" and system_tier in ["value", "smart_value", "budget"]:
            score += 30
        
        if score > 0:
            recommendations.append({
                **system,
                "compatibility_score": score,
                "matching_protocols": list(matching_protocols)
            })
    
    # Sort by score
    recommendations.sort(key=lambda x: x["compatibility_score"], reverse=True)
    
    return {
        "recommendations": recommendations[:5],
        "all_compatible": recommendations
    }


# ============= AI CALCULATION ENDPOINT =============

@router.post("/calculate-package")
async def calculate_package(selections: ProjectSelections):
    """Calculate recommended package based on all selections and project details"""
    
    # Count features by tier
    feature_counts = {
        "must_have": len(selections.selected_features.get("must_have", [])),
        "should_have": len(selections.selected_features.get("should_have", [])),
        "could_have": len(selections.selected_features.get("could_have", [])),
        "want_to_have": len(selections.selected_features.get("want_to_have", []))
    }
    
    total_features = sum(feature_counts.values())
    
    # Get project details
    project = selections.project_details
    
    # Determine complexity based on features AND project details
    complexity = "standard"
    if project:
        # Budget-based complexity
        budget_complexity = {
            "starter": "standard",
            "standard": "standard", 
            "premium": "premium",
            "luxury": "luxury",
            "ultra": "enterprise"
        }.get(project.budget, "standard")
        
        # Feature-based complexity
        if total_features > 50:
            feature_complexity = "enterprise"
        elif total_features > 30:
            feature_complexity = "luxury"
        elif total_features > 15:
            feature_complexity = "premium"
        else:
            feature_complexity = "standard"
        
        # Use the higher of the two
        complexity_order = ["standard", "premium", "luxury", "enterprise"]
        complexity = max(budget_complexity, feature_complexity, 
                        key=lambda x: complexity_order.index(x) if x in complexity_order else 0)
    else:
        if total_features > 50:
            complexity = "enterprise"
        elif total_features > 30:
            complexity = "luxury"
        elif total_features > 15:
            complexity = "premium"
    
    # Get recommended system based on selections
    protocol_type = selections.protocol_type or "hybrid"
    
    # Generate smart AI insights based on project details
    ai_insights = []
    
    if project:
        # Project type insights
        if project.projectType == "new_build":
            ai_insights.append("New build advantage: You can install wired backbone for maximum reliability and future-proofing.")
        elif project.projectType == "retrofit":
            ai_insights.append("For retrofit projects, we recommend wireless/hybrid solutions to minimize construction disruption.")
        elif project.projectType == "renovation":
            ai_insights.append("Renovation gives you flexibility to add wired connections in key areas while using wireless elsewhere.")
        
        # Property size insights
        if project.customSize and project.customSize > 1000:
            ai_insights.append(f"Your {project.customSize} sqm property will benefit from zone-based automation with multiple control points.")
        elif project.bedrooms and project.bedrooms >= 5:
            ai_insights.append(f"With {project.bedrooms} bedrooms, consider individual room climate zones and presence detection.")
        
        # Budget alignment
        budget_labels = {
            "starter": "AED 20-50K",
            "standard": "AED 50-150K",
            "premium": "AED 150-350K", 
            "luxury": "AED 350-700K",
            "ultra": "AED 700K+"
        }
        budget_label = budget_labels.get(project.budget, "your budget")
        ai_insights.append(f"Based on your {budget_label} budget, we've optimized the package recommendations accordingly.")
        
        # Timeline insights
        if project.timeline == "urgent":
            ai_insights.append("For fast delivery, we recommend pre-configured systems with shorter installation times.")
        
        # Location-specific
        if project.location and "Palm" in project.location:
            ai_insights.append("Palm Jumeirah properties often require marine-grade equipment for outdoor installations.")
        elif project.location and "Emirates Hills" in project.location:
            ai_insights.append("Emirates Hills villas typically suit whole-home automation with premium brands like Savant or Control4.")
    else:
        ai_insights.append(f"Based on your {total_features} selected features, we recommend a {complexity}-level installation.")
        ai_insights.append(f"Your choice of {protocol_type} protocol is optimal for your project type.")
    
    # Always add a feature balance insight
    if feature_counts["must_have"] > 20:
        ai_insights.append("You've prioritized many essential features - consider phased implementation for better budget management.")
    elif feature_counts["must_have"] < 5:
        ai_insights.append("Your must-have selection is focused - this allows budget flexibility for premium brands.")
    
    # Fetch dynamic pricing from database
    try:
        package_tier_pricing = await get_package_tier_pricing_data()
        # Convert to budget_pricing format
        budget_pricing = {}
        for tier in package_tier_pricing:
            budget_tier = tier.get("budget_tier")
            def format_price(val):
                if val >= 1000000:
                    return f"AED {val/1000000:.1f}M"
                elif val >= 1000:
                    return f"AED {int(val/1000)}K"
                return f"AED {val}"
            
            budget_pricing[budget_tier] = (
                f"{format_price(tier['essential_min'])}-{format_price(tier['essential_max']).replace('AED ', '')}",
                f"{format_price(tier['premium_min'])}-{format_price(tier['premium_max']).replace('AED ', '')}",
                f"{format_price(tier['ultimate_min'])}-{format_price(tier['ultimate_max']).replace('AED ', '')}"
            )
    except Exception as e:
        logger.warning(f"Failed to fetch package tier pricing, using defaults: {e}")
        budget_pricing = {
            "starter": ("AED 8K-15K", "AED 15K-25K", "AED 25K-40K"),
            "standard": ("AED 20K-40K", "AED 40K-70K", "AED 70K-100K"),
            "premium": ("AED 50K-90K", "AED 90K-150K", "AED 150K-200K"),
            "luxury": ("AED 100K-180K", "AED 180K-280K", "AED 280K-400K"),
            "ultra": ("AED 180K-300K", "AED 300K-500K", "AED 500K+")
        }
    
    # Build dynamic pricing based on budget
    packages = []
    if project and project.budget:
        prices = budget_pricing.get(project.budget, ("AED 20K-60K", "AED 60K-120K", "AED 120K+"))
        
        packages = [
            {
                "name": "Essential",
                "description": "Core features only - Must Have items",
                "features_included": feature_counts["must_have"],
                "price_indicator": prices[0],
                "recommended": complexity == "standard"
            },
            {
                "name": "Premium",
                "description": "Must Have + Should Have features",
                "features_included": feature_counts["must_have"] + feature_counts["should_have"],
                "price_indicator": prices[1],
                "recommended": complexity in ["premium", "luxury"]
            },
            {
                "name": "Ultimate",
                "description": "All selected features included",
                "features_included": total_features,
                "price_indicator": prices[2],
                "recommended": complexity == "enterprise"
            }
        ]
    else:
        packages = [
            {
                "name": "Essential",
                "description": "Core features only - Must Have items",
                "features_included": feature_counts["must_have"],
                "price_indicator": "AED 20K-60K",
                "recommended": complexity == "standard"
            },
            {
                "name": "Premium",
                "description": "Must Have + Should Have features",
                "features_included": feature_counts["must_have"] + feature_counts["should_have"],
                "price_indicator": "AED 60K-120K",
                "recommended": complexity in ["premium", "luxury"]
            },
            {
                "name": "Ultimate",
                "description": "All selected features included",
                "features_included": total_features,
                "price_indicator": "AED 120K+",
                "recommended": complexity == "enterprise"
            }
        ]
    
    # Build project summary for display
    project_summary = {}
    if project:
        project_summary = {
            "project_type": project.projectType,
            "property_type": project.propertyType,
            "size": project.customSize or project.propertySize,
            "bedrooms": project.bedrooms,
            "floors": project.floors,
            "budget": project.budget,
            "timeline": project.timeline,
            "location": project.location
        }
    
    # Build recommendation
    recommendation = {
        "session_id": selections.session_id,
        "summary": {
            "total_features": total_features,
            "feature_breakdown": feature_counts,
            "complexity_level": complexity,
            "protocol_type": protocol_type,
            "selected_protocols": selections.selected_protocols,
            "selected_systems": selections.selected_systems
        },
        "project_summary": project_summary,
        "packages": packages,
        "ai_insights": ai_insights
    }
    
    return recommendation


# ============= SAVE PROJECT ENDPOINTS =============

class SaveProjectRequest(BaseModel):
    session_id: str
    quote_ref: str
    project_details: Optional[Dict[str, Any]] = None
    selected_categories: List[str] = []
    must_have_features: List[str] = []
    should_have_features: List[str] = []
    protocol_type: Optional[str] = None
    selected_protocols: List[str] = []
    selected_systems: List[str] = []
    selected_package: Optional[str] = None
    package_price: Optional[str] = None
    upgrade_features: List[str] = []
    total_upgrade_price: float = 0
    total_features: int = 0

class SaveProjectResponse(BaseModel):
    project_id: str
    quote_ref: str
    message: str
    created_at: str


@router.post("/save-project", response_model=SaveProjectResponse)
async def save_project(request: SaveProjectRequest):
    """Save a completed smart home project configuration to the database"""
    try:
        project_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc)
        
        project_doc = {
            "id": project_id,
            "session_id": request.session_id,
            "quote_ref": request.quote_ref,
            "project_details": request.project_details,
            "selected_categories": request.selected_categories,
            "must_have_features": request.must_have_features,
            "should_have_features": request.should_have_features,
            "protocol_type": request.protocol_type,
            "selected_protocols": request.selected_protocols,
            "selected_systems": request.selected_systems,
            "selected_package": request.selected_package,
            "package_price": request.package_price,
            "upgrade_features": request.upgrade_features,
            "total_upgrade_price": request.total_upgrade_price,
            "total_features": request.total_features,
            "status": "saved",  # saved, consultation_booked, converted
            "created_at": created_at.isoformat(),
            "updated_at": created_at.isoformat()
        }
        
        await db.smart_home_projects.insert_one(project_doc)
        
        logger.info(f"Project saved: {project_id} (Quote: {request.quote_ref})")
        
        return SaveProjectResponse(
            project_id=project_id,
            quote_ref=request.quote_ref,
            message="Project saved successfully",
            created_at=created_at.isoformat()
        )
    except Exception as e:
        logger.error(f"Save project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save project")


@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Get a saved project by ID or quote reference"""
    try:
        project = await db.smart_home_projects.find_one(
            {"$or": [{"id": project_id}, {"quote_ref": project_id}]},
            {"_id": 0}
        )
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return project
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch project")


@router.get("/projects")
async def list_projects(limit: int = 50, status: Optional[str] = None):
    """List saved projects with optional status filter"""
    try:
        query = {}
        if status:
            query["status"] = status
        
        projects = await db.smart_home_projects.find(
            query, 
            {"_id": 0}
        ).sort("created_at", -1).limit(limit).to_list(limit)
        
        return {"projects": projects, "count": len(projects)}
    except Exception as e:
        logger.error(f"List projects error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to list projects")


# ============= CONSULTATION BOOKING ENDPOINTS =============

class BookConsultationRequest(BaseModel):
    # Project reference
    quote_ref: str
    session_id: str
    project_id: Optional[str] = None  # If project was saved first
    
    # Contact details
    name: str
    email: EmailStr
    phone: str
    
    # Booking preferences
    preferred_date: Optional[str] = None
    preferred_time: str = "morning"  # morning, afternoon, evening
    notes: Optional[str] = None
    
    # Project summary for quick reference
    project_type: Optional[str] = None
    property_type: Optional[str] = None
    selected_package: Optional[str] = None
    total_features: int = 0

class BookConsultationResponse(BaseModel):
    booking_id: str
    quote_ref: str
    message: str
    confirmation_number: str
    created_at: str


@router.post("/book-consultation", response_model=BookConsultationResponse)
async def book_consultation(request: BookConsultationRequest):
    """Book a consultation for a smart home project"""
    try:
        booking_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc)
        confirmation_number = f"LEXA-C-{created_at.strftime('%Y%m%d')}-{booking_id[:6].upper()}"
        
        booking_doc = {
            "id": booking_id,
            "quote_ref": request.quote_ref,
            "session_id": request.session_id,
            "project_id": request.project_id,
            "confirmation_number": confirmation_number,
            
            # Contact info
            "name": request.name,
            "email": request.email,
            "phone": request.phone,
            
            # Booking details
            "preferred_date": request.preferred_date,
            "preferred_time": request.preferred_time,
            "notes": request.notes,
            
            # Project summary
            "project_type": request.project_type,
            "property_type": request.property_type,
            "selected_package": request.selected_package,
            "total_features": request.total_features,
            
            # Status tracking
            "status": "pending",  # pending, confirmed, completed, cancelled
            "created_at": created_at.isoformat(),
            "updated_at": created_at.isoformat()
        }
        
        await db.smart_home_consultations.insert_one(booking_doc)
        
        # Update the related project status if it exists
        if request.project_id:
            await db.smart_home_projects.update_one(
                {"id": request.project_id},
                {"$set": {"status": "consultation_booked", "updated_at": created_at.isoformat()}}
            )
        
        logger.info(f"Consultation booked: {booking_id} (Confirmation: {confirmation_number})")
        
        return BookConsultationResponse(
            booking_id=booking_id,
            quote_ref=request.quote_ref,
            message="Consultation booked successfully! Our team will contact you within 24 hours.",
            confirmation_number=confirmation_number,
            created_at=created_at.isoformat()
        )
    except Exception as e:
        logger.error(f"Book consultation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to book consultation")


@router.get("/consultations/{booking_id}")
async def get_consultation(booking_id: str):
    """Get a consultation booking by ID or confirmation number"""
    try:
        consultation = await db.smart_home_consultations.find_one(
            {"$or": [{"id": booking_id}, {"confirmation_number": booking_id}]},
            {"_id": 0}
        )
        
        if not consultation:
            raise HTTPException(status_code=404, detail="Consultation not found")
        
        return consultation
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get consultation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch consultation")


@router.get("/consultations")
async def list_consultations(limit: int = 50, status: Optional[str] = None):
    """List consultation bookings with optional status filter"""
    try:
        query = {}
        if status:
            query["status"] = status
        
        consultations = await db.smart_home_consultations.find(
            query,
            {"_id": 0}
        ).sort("created_at", -1).limit(limit).to_list(limit)
        
        return {"consultations": consultations, "count": len(consultations)}
    except Exception as e:
        logger.error(f"List consultations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to list consultations")

"""
Intelligence Builder API Routes
Handles all endpoints for the intelligent home builder feature
"""
from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import os
import logging
from models.intelligence import (
    IntelligenceSession,
    IntelligenceFeature,
    CalculateScoreRequest,
    SaveSessionRequest,
    GenerateReportRequest,
    SendMagicLinkRequest,
    SystemRecommendation,
    IntelligenceReport
)

router = APIRouter(prefix="/api/intelligence", tags=["intelligence"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


# ===== FEATURE CATALOG =====

@router.get("/features")
async def get_intelligence_features(
    category: Optional[str] = None,
    lifestyle_tag: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get intelligence features catalog with optional filtering"""
    try:
        query = {}
        
        if category:
            query["category"] = category
        if lifestyle_tag:
            query["lifestyle_tags"] = lifestyle_tag
        if featured is not None:
            query["featured"] = featured
        
        features = await db.intelligence_features.find(
            query,
            {"_id": 0}
        ).sort("display_order", 1).to_list(1000)  # Increased from 100 to 1000 to show all features
        
        return {"features": features, "total": len(features)}
    
    except Exception as e:
        logger.error(f"Features fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch features")


@router.get("/features/categories")
async def get_feature_categories():
    """Get all unique feature categories"""
    try:
        categories = await db.intelligence_features.distinct("category")
        
        # Get category metadata
        category_info = {
            "scene_automation": {
                "name": "Scene Automation",
                "icon": "Wand2",
                "description": "Pre-programmed sequences for common activities"
            },
            "presence_detection": {
                "name": "Presence Detection",
                "icon": "Activity",
                "description": "Advanced occupancy sensing technology"
            },
            "circadian_lighting": {
                "name": "Circadian Lighting",
                "icon": "Sun",
                "description": "Health-focused lighting that mimics natural sunlight"
            },
            "voice_control": {
                "name": "Voice Control",
                "icon": "Mic",
                "description": "Natural language voice commands"
            },
            "ai_predictive": {
                "name": "AI & Predictive Intelligence",
                "icon": "Brain",
                "description": "Machine learning that anticipates your needs"
            },
            "zone_control": {
                "name": "Zone-Based Control",
                "icon": "Grid",
                "description": "Independent control per room or area"
            },
            "energy_management": {
                "name": "Energy Management",
                "icon": "Zap",
                "description": "Monitor, optimize, and reduce energy costs"
            },
            "security_intelligence": {
                "name": "Security Intelligence",
                "icon": "ShieldCheck",
                "description": "AI-powered protection and monitoring"
            },
            "climate_control": {
                "name": "Climate Control",
                "icon": "Thermometer",
                "description": "Perfect temperature and air quality everywhere"
            },
            "wellness_environmental": {
                "name": "Wellness & Environment",
                "icon": "Wind",
                "description": "Air quality, water quality, and health monitoring"
            },
            "appliance_coordination": {
                "name": "Smart Appliances",
                "icon": "Package",
                "description": "Intelligent appliance automation and coordination"
            },
            "multi_room_audio": {
                "name": "Multi-Room Audio",
                "icon": "Music",
                "description": "Synchronized whole-home audio experience"
            },
            "entertainment_optimization": {
                "name": "Entertainment",
                "icon": "Gamepad",
                "description": "Gaming, VR, and media optimization"
            },
            "outdoor_automation": {
                "name": "Outdoor & Leisure",
                "icon": "TreePalm",
                "description": "Pool, irrigation, and outdoor living automation"
            },
            "garage_automation": {
                "name": "Smart Garage",
                "icon": "Garage",
                "description": "Intelligent garage and EV charging"
            },
            "access_management": {
                "name": "Access Management",
                "icon": "UserCheck",
                "description": "Visitor, guest, and delivery management"
            }
        }
        
        result = []
        for cat in categories:
            info = category_info.get(cat, {"name": cat, "icon": "Box", "description": ""})
            result.append({
                "category": cat,
                **info
            })
        
        return {"categories": result}
    
    except Exception as e:
        logger.error(f"Categories fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch categories")


# ===== INTELLIGENCE SCORING =====

@router.post("/calculate-score")
async def calculate_intelligence_score(request: CalculateScoreRequest):
    """Calculate IQ score based on selected features and lifestyle priorities"""
    try:
        # Fetch selected features data
        feature_ids = [f.feature_id for f in request.selected_features]
        features = await db.intelligence_features.find(
            {"id": {"$in": feature_ids}},
            {"_id": 0}
        ).to_list(100)
        
        # Calculate total IQ points
        total_points = sum(f.get("iq_points", 0) for f in features)
        
        # Calculate category scores
        category_scores = {
            "automation_coverage": 0,
            "ai_features": 0,
            "energy": 0,
            "wellness": 0,
            "security": 0
        }
        
        for feature in features:
            category = feature.get("scoring_category", "automation_coverage")
            points = feature.get("iq_points", 0)
            category_scores[category] += points
        
        # Determine IQ level
        iq_level = get_iq_level(total_points)
        
        # Generate achievements
        achievements = generate_achievements(category_scores, features, request.lifestyle_selections)
        
        return {
            "intelligence_score": total_points,
            "iq_level": iq_level,
            "category_scores": category_scores,
            "achievements": achievements,
            "max_possible_score": 100
        }
    
    except Exception as e:
        logger.error(f"Score calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to calculate score")


def get_iq_level(score: int) -> str:
    """Determine IQ level from score"""
    if score >= 81:
        return "Orchestrated Living"
    elif score >= 61:
        return "Genius Home"
    elif score >= 41:
        return "Intelligent Home"
    elif score >= 21:
        return "Connected Home"
    else:
        return "Basic Smart Home"


def generate_achievements(category_scores: Dict[str, int], features: List, lifestyle_selections: List) -> List[str]:
    """Generate achievement badges based on selections"""
    achievements = []
    
    # Category-based achievements
    if category_scores.get("energy", 0) >= 20:
        achievements.append("energy_saver")
    if category_scores.get("wellness", 0) >= 15:
        achievements.append("wellness_champion")
    if category_scores.get("security", 0) >= 15:
        achievements.append("security_master")
    if category_scores.get("ai_features", 0) >= 25:
        achievements.append("ai_pioneer")
    if category_scores.get("automation_coverage", 0) >= 30:
        achievements.append("automation_expert")
    
    # Feature-specific achievements
    feature_slugs = [f.get("slug") for f in features]
    
    if "circadian-lighting-system" in feature_slugs:
        achievements.append("wellness_innovator")
    if "mmwave-presence-detection" in feature_slugs:
        achievements.append("privacy_advocate")
    if "ai-behavioral-learning" in feature_slugs:
        achievements.append("future_ready")
    if "energy-analytics-optimization" in feature_slugs:
        achievements.append("eco_warrior")
    
    # Lifestyle alignment achievements
    if len(lifestyle_selections) >= 4:
        achievements.append("lifestyle_designer")
    
    return achievements


# ===== SYSTEM RECOMMENDATIONS =====

@router.post("/recommend-systems")
async def recommend_control_systems(request: CalculateScoreRequest):
    """Recommend control systems based on selected features"""
    try:
        # Fetch selected features
        feature_ids = [f.feature_id for f in request.selected_features]
        features = await db.intelligence_features.find(
            {"id": {"$in": feature_ids}},
            {"_id": 0}
        ).to_list(100)
        
        # Fetch all control systems
        systems = await db.control_systems.find({}, {"_id": 0}).to_list(50)
        
        recommendations = []
        
        for system in systems:
            # Calculate match percentage
            match_percentage = calculate_system_match(system, features)
            
            # Calculate IQ potential
            iq_potential = calculate_iq_potential(system, features)
            
            # Get key strengths
            key_strengths = get_system_strengths(system)
            
            recommendations.append({
                "system_id": system.get("id"),
                "system_name": system.get("name"),
                "system_description": system.get("description"),
                "match_percentage": match_percentage,
                "iq_potential": iq_potential,
                "key_strengths": key_strengths,
                "compatible_brands": system.get("compatibility", {}).get("native_brands", []),
                "price_tier": system.get("price_tier", "mid"),
                "supports_matter": system.get("supports_matter", False),
                "supports_thread": system.get("supports_thread", False),
                "voice_integration": system.get("voice_integration", []),
                "image_url": system.get("image_url", "")
            })
        
        # Sort by match percentage
        recommendations.sort(key=lambda x: x["match_percentage"], reverse=True)
        
        return {"recommendations": recommendations[:5]}  # Top 5 matches
    
    except Exception as e:
        logger.error(f"System recommendation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to recommend systems")


def calculate_system_match(system: Dict, features: List) -> int:
    """Calculate how well system matches selected features"""
    
    compatible_count = 0
    total_features = len(features)
    
    if total_features == 0:
        return 0
    
    # Enhanced matching logic based on feature categories
    system_desc_lower = system.get("description", "").lower()
    
    # Get system capabilities
    system_capabilities = system.get("capabilities", [])
    has_ai = system.get("has_ai", False)
    voice_integration = system.get("voice_integration", [])
    
    for feature in features:
        feature_category = feature.get("category", "")
        feature_devices = feature.get("required_devices", [])
        compatible_systems = feature.get("compatible_systems", [])
        
        # Check direct compatibility
        system_name = system.get("name", "")
        if any(comp_sys in system_name for comp_sys in compatible_systems):
            compatible_count += 1
            continue
        
        # Check by feature category
        if feature_category == "scene_automation":
            # All professional systems support scenes
            compatible_count += 1
        elif feature_category == "voice_control":
            if voice_integration or "voice" in system_desc_lower or "josh" in system_desc_lower:
                compatible_count += 1
        elif feature_category == "ai_predictive":
            if has_ai or "ai" in system_desc_lower or "learning" in system_desc_lower:
                compatible_count += 1
        elif feature_category in ["energy_management", "climate_control"]:
            # Most systems support energy/climate
            compatible_count += 1
        else:
            # Default: Check if any required device matches system capabilities
            if system_capabilities and any(cap in feature_devices for cap in system_capabilities):
                compatible_count += 1
            else:
                # Give partial credit (50%) for basic compatibility
                compatible_count += 0.5
    
    match_percentage = int((compatible_count / total_features) * 100)
    
    # Boost for premium systems with AI features
    if has_ai:
        match_percentage = min(100, match_percentage + 10)
    
    # Ensure minimum 40% match for professional systems
    if match_percentage > 0 and match_percentage < 40:
        match_percentage = 40
    
    return match_percentage
    
    return match_percentage


def calculate_iq_potential(system: Dict, features: List) -> int:
    """Calculate maximum IQ achievable with this system"""
    total_points = sum(f.get("iq_points", 0) for f in features)
    
    # Premium systems can achieve higher potential
    if system.get("tier") == "premium":
        potential = min(100, int(total_points * 1.1))
    else:
        potential = min(100, total_points)
    
    return potential


def get_system_strengths(system: Dict) -> List[str]:
    """Extract key strengths of the system"""
    strengths = []
    
    if system.get("has_ai"):
        strengths.append("AI-Powered Automation")
    if system.get("supports_matter"):
        strengths.append("Matter Protocol Support")
    if "josh_ai" in system.get("voice_integration", []):
        strengths.append("Josh.ai Natural Language")
    if system.get("professional_grade"):
        strengths.append("Professional Installation & Support")
    
    return strengths[:4]  # Top 4 strengths


# ===== SESSION MANAGEMENT =====

@router.post("/sessions")
async def create_session(session: IntelligenceSession):
    """Create new intelligence builder session"""
    try:
        session_dict = session.model_dump()
        session_dict["created_at"] = datetime.now(timezone.utc)
        session_dict["updated_at"] = datetime.now(timezone.utc)
        
        await db.intelligence_sessions.insert_one(session_dict)
        
        return {"session_id": session.id, "session_hash": session.session_hash}
    
    except Exception as e:
        logger.error(f"Session creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create session")


@router.put("/sessions/{session_id}")
async def update_session(session_id: str, session: IntelligenceSession):
    """Update existing session"""
    try:
        session_dict = session.model_dump()
        session_dict["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.intelligence_sessions.update_one(
            {"id": session_id},
            {"$set": session_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"success": True, "session_id": session_id}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Session update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update session")


@router.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """Retrieve session by ID"""
    try:
        session = await db.intelligence_sessions.find_one(
            {"id": session_id},
            {"_id": 0}
        )
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return session
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Session fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch session")


@router.get("/sessions/hash/{session_hash}")
async def get_session_by_hash(session_hash: str):
    """Retrieve session by shareable hash"""
    try:
        session = await db.intelligence_sessions.find_one(
            {"session_hash": session_hash},
            {"_id": 0}
        )
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return session
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Session fetch by hash error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch session")


# ===== REPORT GENERATION =====

@router.post("/reports/generate")
async def generate_intelligence_report(request: GenerateReportRequest):
    """Generate comprehensive intelligence report"""
    try:
        # Fetch session
        session = await db.intelligence_sessions.find_one(
            {"id": request.session_id},
            {"_id": 0}
        )
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Fetch feature details
        feature_ids = [f["feature_id"] for f in session.get("selected_features", [])]
        features = await db.intelligence_features.find(
            {"id": {"$in": feature_ids}},
            {"_id": 0}
        ).to_list(100)
        
        # Calculate projections
        energy_savings = calculate_energy_savings(features)
        wellness_benefits = extract_wellness_benefits(features)
        security_level = assess_security_level(features)
        
        # Infrastructure requirements
        infrastructure = compile_infrastructure_requirements(features)
        
        # Cost estimation
        cost_estimate = estimate_costs(features, session.get("recommended_system"))
        
        # Create report
        report = {
            "id": str(uuid4()),
            "session_id": session["id"],
            "session_hash": session["session_hash"],
            "intelligence_score": session.get("intelligence_score", 0),
            "iq_level": session.get("iq_level", ""),
            "achievements": session.get("achievements", []),
            "lifestyle_priorities": session.get("lifestyle_selections", []),
            "selected_features": features,
            "recommended_system": session.get("selected_system") or session.get("recommended_systems", [{}])[0] if session.get("recommended_systems") else {},
            "projected_energy_savings_percent": energy_savings,
            "projected_annual_savings_aed": int(energy_savings * 150),  # Rough estimate
            "wellness_benefits": wellness_benefits,
            "security_level": security_level,
            "infrastructure_requirements": infrastructure,
            "estimated_cost_min": cost_estimate["min"],
            "estimated_cost_max": cost_estimate["max"],
            "generated_at": datetime.now(timezone.utc),
            "shareable_url": f"/intelligence-report/{session['session_hash']}"
        }
        
        # Save report
        await db.intelligence_reports.insert_one(report)
        
        return report
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Report generation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate report")


def calculate_energy_savings(features: List) -> int:
    """Calculate projected energy savings percentage"""
    energy_features = [f for f in features if f.get("scoring_category") == "energy"]
    ai_features = [f for f in features if f.get("scoring_category") == "ai_features"]
    
    base_savings = len(energy_features) * 5  # 5% per energy feature
    ai_boost = len(ai_features) * 3  # 3% per AI feature
    
    return min(35, base_savings + ai_boost)  # Cap at 35%


def extract_wellness_benefits(features: List) -> List[str]:
    """Extract wellness benefits from features"""
    benefits = set()
    
    for feature in features:
        if feature.get("scoring_category") == "wellness":
            benefits.update(feature.get("benefits", []))
    
    return list(benefits)[:5]  # Top 5 benefits


def assess_security_level(features: List) -> str:
    """Assess overall security level"""
    security_points = sum(
        f.get("iq_points", 0)
        for f in features
        if f.get("scoring_category") == "security"
    )
    
    if security_points >= 15:
        return "Advanced AI-Powered Protection"
    elif security_points >= 10:
        return "Enhanced Security"
    elif security_points >= 5:
        return "Basic Protection"
    else:
        return "Standard"


def compile_infrastructure_requirements(features: List) -> List[str]:
    """Compile infrastructure requirements"""
    requirements = set()
    
    for feature in features:
        if feature.get("is_premium"):
            requirements.add("WiFi 6 mesh network (3-5 access points)")
            requirements.add("Cat6 wiring to key locations")
        
        devices = feature.get("required_devices", [])
        if any("Sensor" in d for d in devices):
            requirements.add("Low-voltage panel for centralized control")
        if any("Thread" in str(feature.get("compatible_systems", []))):
            requirements.add("Thread border router for mesh network")
    
    return list(requirements)


def estimate_costs(features: List, system: Optional[Dict]) -> Dict[str, int]:
    """Estimate investment costs"""
    # Simplified cost estimation
    base_cost_per_feature = 2000  # AED per feature average
    
    feature_count = len(features)
    base_cost = feature_count * base_cost_per_feature
    
    # System cost
    system_cost = 15000  # Average system cost
    if system and system.get("price_tier") == "premium":
        system_cost = 35000
    elif system and system.get("price_tier") == "entry":
        system_cost = 8000
    
    min_cost = base_cost + system_cost
    max_cost = int(min_cost * 1.5)  # 50% variance for customization
    
    return {"min": min_cost, "max": max_cost}


@router.get("/reports/{report_id}")
async def get_report(report_id: str):
    """Retrieve intelligence report"""
    try:
        report = await db.intelligence_reports.find_one(
            {"id": report_id},
            {"_id": 0}
        )
        
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        
        return report
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Report fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch report")


@router.get("/reports/hash/{session_hash}")
async def get_report_by_hash(session_hash: str):
    """Retrieve report by session hash (for shareable links)"""
    try:
        report = await db.intelligence_reports.find_one(
            {"session_hash": session_hash},
            {"_id": 0}
        )
        
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        
        return report
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Report fetch by hash error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch report")


# Add UUID import at the top
from uuid import uuid4


# ===== ADMIN API ENDPOINTS =====

from fastapi import Depends
from utils.auth import verify_admin_token

@router.get("/admin/features")
async def admin_get_all_features(token: dict = Depends(verify_admin_token)):
    """Admin: Get all intelligence features with full details"""
    try:
        features = await db.intelligence_features.find(
            {},
            {"_id": 0}
        ).sort("display_order", 1).to_list(200)
        
        # Get statistics
        categories = await db.intelligence_features.distinct("category")
        featured_count = await db.intelligence_features.count_documents({"featured": True})
        
        return {
            "features": features,
            "total": len(features),
            "categories": categories,
            "featured_count": featured_count,
            "total_iq_points": sum(f.get("iq_points", 0) for f in features)
        }
    
    except Exception as e:
        logger.error(f"Admin features fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch features")


@router.post("/admin/features")
async def admin_create_feature(feature: IntelligenceFeature, token: dict = Depends(verify_admin_token)):
    """Admin: Create new intelligence feature"""
    try:
        feature_dict = feature.model_dump()
        feature_dict["created_at"] = datetime.now(timezone.utc)
        feature_dict["updated_at"] = datetime.now(timezone.utc)
        
        # Check for duplicate slug
        existing = await db.intelligence_features.find_one({"slug": feature_dict["slug"]})
        if existing:
            raise HTTPException(status_code=400, detail="Feature with this slug already exists")
        
        await db.intelligence_features.insert_one(feature_dict)
        
        logger.info(f"Admin {token.get('username')} created feature: {feature.slug}")
        return {"success": True, "feature_id": feature.id, "message": "Feature created successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin feature creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create feature")


@router.put("/admin/features/{feature_id}")
async def admin_update_feature(feature_id: str, feature: IntelligenceFeature, token: dict = Depends(verify_admin_token)):
    """Admin: Update intelligence feature"""
    try:
        feature_dict = feature.model_dump()
        feature_dict["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.intelligence_features.update_one(
            {"id": feature_id},
            {"$set": feature_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Feature not found")
        
        logger.info(f"Admin {token.get('username')} updated feature: {feature_id}")
        return {"success": True, "message": "Feature updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin feature update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update feature")


@router.delete("/admin/features/{feature_id}")
async def admin_delete_feature(feature_id: str, token: dict = Depends(verify_admin_token)):
    """Admin: Delete intelligence feature"""
    try:
        result = await db.intelligence_features.delete_one({"id": feature_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Feature not found")
        
        logger.info(f"Admin {token.get('username')} deleted feature: {feature_id}")
        return {"success": True, "message": "Feature deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin feature deletion error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete feature")


@router.patch("/admin/features/{feature_id}/toggle-featured")
async def admin_toggle_featured(feature_id: str, token: dict = Depends(verify_admin_token)):
    """Admin: Toggle featured status of feature"""
    try:
        feature = await db.intelligence_features.find_one({"id": feature_id}, {"_id": 0})
        if not feature:
            raise HTTPException(status_code=404, detail="Feature not found")
        
        new_featured = not feature.get("featured", False)
        
        await db.intelligence_features.update_one(
            {"id": feature_id},
            {"$set": {"featured": new_featured, "updated_at": datetime.now(timezone.utc)}}
        )
        
        logger.info(f"Admin {token.get('username')} toggled featured for feature: {feature_id}")
        return {"success": True, "featured": new_featured}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin toggle featured error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to toggle featured")


@router.patch("/admin/features/reorder")
async def admin_reorder_features(reorder_data: Dict[str, int], token: dict = Depends(verify_admin_token)):
    """Admin: Update display order of multiple features"""
    try:
        for feature_id, new_order in reorder_data.items():
            await db.intelligence_features.update_one(
                {"id": feature_id},
                {"$set": {"display_order": new_order, "updated_at": datetime.now(timezone.utc)}}
            )
        
        logger.info(f"Admin {token.get('username')} reordered {len(reorder_data)} features")
        return {"success": True, "message": f"Reordered {len(reorder_data)} features"}
    
    except Exception as e:
        logger.error(f"Admin reorder error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to reorder features")


# ===== ADMIN CONTROL SYSTEMS =====

@router.get("/admin/control-systems")
async def admin_get_control_systems(token: dict = Depends(verify_admin_token)):
    """Admin: Get all control systems"""
    try:
        systems = await db.control_systems.find({}, {"_id": 0}).sort("name", 1).to_list(100)
        
        return {
            "systems": systems,
            "total": len(systems)
        }
    
    except Exception as e:
        logger.error(f"Admin systems fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch control systems")


@router.put("/admin/control-systems/{system_id}")
async def admin_update_system(system_id: str, system_data: Dict[str, Any], token: dict = Depends(verify_admin_token)):
    """Admin: Update control system"""
    try:
        system_data["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.control_systems.update_one(
            {"id": system_id},
            {"$set": system_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="System not found")
        
        logger.info(f"Admin {token.get('username')} updated system: {system_id}")
        return {"success": True, "message": "System updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin system update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update system")


@router.get("/admin/sessions")
async def admin_get_sessions(
    limit: int = 50,
    skip: int = 0,
    completed: Optional[bool] = None,
    token: dict = Depends(verify_admin_token)
):
    """Admin: Get all intelligence builder sessions"""
    try:
        query = {}
        if completed is not None:
            query["completed"] = completed
        
        sessions = await db.intelligence_sessions.find(
            query,
            {"_id": 0}
        ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        
        total = await db.intelligence_sessions.count_documents(query)
        
        return {
            "sessions": sessions,
            "total": total,
            "limit": limit,
            "skip": skip
        }
    
    except Exception as e:
        logger.error(f"Admin sessions fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch sessions")


@router.get("/admin/stats")
async def admin_get_intelligence_stats(token: dict = Depends(verify_admin_token)):
    """Admin: Get intelligence builder statistics"""
    try:
        stats = {
            "total_features": await db.intelligence_features.count_documents({}),
            "featured_features": await db.intelligence_features.count_documents({"featured": True}),
            "total_categories": len(await db.intelligence_features.distinct("category")),
            "total_systems": await db.control_systems.count_documents({}),
            "total_sessions": await db.intelligence_sessions.count_documents({}),
            "completed_sessions": await db.intelligence_sessions.count_documents({"completed": True}),
            "total_reports": await db.intelligence_reports.count_documents({})
        }
        
        # Get average IQ score
        sessions = await db.intelligence_sessions.find(
            {"completed": True, "intelligence_score": {"$exists": True}},
            {"intelligence_score": 1, "_id": 0}
        ).to_list(1000)
        
        if sessions:
            avg_score = sum(s.get("intelligence_score", 0) for s in sessions) / len(sessions)
            stats["average_iq_score"] = round(avg_score, 1)
        else:
            stats["average_iq_score"] = 0
        
        return stats
    
    except Exception as e:
        logger.error(f"Admin stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")

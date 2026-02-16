"""
Project Builder Service
Core business logic for project initialization, resolution, and proposal generation
"""

from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)


class ProjectBuilderService:
    """Business logic for project builder operations"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
    
    # ========================================================================
    # OBJECTIVES AND SPACES
    # ========================================================================
    
    def get_objectives_for_segment(self, segment: str) -> List[Dict[str, str]]:
        """Return available objectives based on segment"""
        if segment == "Residential":
            return [
                {"id": "comfort", "name": "Comfort & Convenience", "icon": "Home"},
                {"id": "luxury", "name": "Luxury Ambience", "icon": "Sparkles"},
                {"id": "entertainment", "name": "Entertainment & Media", "icon": "Tv"},
                {"id": "security", "name": "Security & Safety", "icon": "Shield"},
                {"id": "energy", "name": "Energy Efficiency", "icon": "Zap"},
                {"id": "wellness", "name": "Wellness & Lifestyle", "icon": "Heart"},
                {"id": "estate", "name": "Estate Management", "icon": "Building"}
            ]
        elif segment == "Commercial":
            return [
                {"id": "operations", "name": "Operations & Efficiency", "icon": "Settings"},
                {"id": "energy", "name": "Energy Optimization", "icon": "Zap"},
                {"id": "security", "name": "Security & Compliance", "icon": "Shield"},
                {"id": "workplace", "name": "Workplace Experience", "icon": "Users"},
                {"id": "analytics", "name": "Analytics & Insights", "icon": "BarChart"}
            ]
        elif segment == "Hospitality":
            return [
                {"id": "guest", "name": "Guest Experience", "icon": "Smile"},
                {"id": "operations", "name": "Operations & Efficiency", "icon": "Settings"},
                {"id": "energy", "name": "Energy Management", "icon": "Zap"},
                {"id": "security", "name": "Security & Safety", "icon": "Shield"}
            ]
        return []
    
    def get_spaces_for_property(self, property_type: str, segment: str) -> List[Dict[str, str]]:
        """Return relevant spaces based on property type"""
        if segment == "Residential":
            base_spaces = [
                {"id": "living", "name": "Living Areas"},
                {"id": "bedrooms", "name": "Bedrooms"},
                {"id": "kitchen", "name": "Kitchen & Dining"},
                {"id": "bathrooms", "name": "Bathrooms"}
            ]
            
            if property_type in ["Villa", "Penthouse", "Estate"]:
                base_spaces.extend([
                    {"id": "cinema", "name": "Cinema / Media Room"},
                    {"id": "gym", "name": "Gym / Wellness"},
                    {"id": "outdoor", "name": "Outdoor / Pool"},
                    {"id": "parking", "name": "Parking / Garage"}
                ])
            
            return base_spaces
        
        return []
    
    def calculate_project_scale(self, area_sqft: int) -> str:
        """Calculate project scale based on area"""
        if area_sqft < 800:
            return "Small"
        elif area_sqft < 2000:
            return "Medium"
        elif area_sqft < 5000:
            return "Large"
        else:
            return "Estate"
    
    # ========================================================================
    # LEAD SCORING AND ROUTING
    # ========================================================================
    
    def calculate_lead_score(
        self,
        segment: str,
        property_type: str,
        area_sqft: int,
        budget_provided: bool,
        timeline: Optional[str],
        num_bundles: int
    ) -> int:
        """Calculate lead score (0-100)"""
        score = 0
        
        # Segment value
        if segment in ["Commercial", "Hospitality"]:
            score += 20
        elif property_type in ["Estate", "Mansion"]:
            score += 20
        else:
            score += 10
        
        # Area score
        if area_sqft >= 5000:
            score += 15
        elif area_sqft >= 2000:
            score += 10
        else:
            score += 5
        
        # Qualification signals
        if budget_provided:
            score += 15
        if timeline:
            score += 10
        if num_bundles >= 5:
            score += 15
        elif num_bundles >= 3:
            score += 10
        
        # Engagement score
        score += min(15, num_bundles * 3)
        
        return min(100, score)
    
    def determine_routing(
        self,
        segment: str,
        property_type: str,
        area_sqft: int,
        lead_score: int
    ) -> Dict[str, Any]:
        """Determine which team should handle this lead"""
        if segment == "Residential":
            if area_sqft >= 5000 or property_type in ["Estate", "Mansion"]:
                return {
                    "team": "Senior Residential Consultant",
                    "priority": "High",
                    "next_steps": [
                        "Site visit within 48 hours",
                        "Detailed needs analysis",
                        "Experience centre invitation"
                    ]
                }
            else:
                return {
                    "team": "Residential Sales",
                    "priority": "Medium" if lead_score >= 40 else "Standard",
                    "next_steps": [
                        "Follow-up call within 24 hours",
                        "Detailed quotation",
                        "Showroom invitation"
                    ]
                }
        
        elif segment == "Commercial":
            return {
                "team": "Commercial Systems Lead",
                "priority": "High",
                "next_steps": [
                    "Technical consultation",
                    "Site assessment",
                    "Proposal within 5 days"
                ]
            }
        
        elif segment == "Hospitality":
            return {
                "team": "Hospitality Solutions",
                "priority": "High",
                "next_steps": [
                    "Needs discovery call",
                    "Reference site visit",
                    "Custom proposal"
                ]
            }
        
        return {
            "team": "General Inquiry",
            "priority": "Standard",
            "next_steps": ["Follow-up within 48 hours"]
        }
    
    # ========================================================================
    # FEATURE CLASSIFICATION
    # ========================================================================
    
    def classify_feature(
        self,
        feature: Dict[str, Any],
        bundle: Dict[str, Any],
        context: Dict[str, Any]
    ) -> str:
        """
        Classify feature as mandatory/recommended/luxury based on AI logic
        
        Args:
            feature: Feature data
            bundle: Parent bundle data  
            context: Project context
            
        Returns:
            str: 'mandatory', 'recommended', or 'luxury'
        """
        score = bundle.get('score', 0)
        tier = feature.get('tier', 'Essential')
        objectives = context.get('selected_objectives', [])
        property_type = context.get('property_type', '')
        
        # Mandatory criteria
        if score >= 70 and tier == 'Essential':
            return 'mandatory'
        
        # Check objective alignment
        feature_objectives = feature.get('objective_tags', [])
        if any(obj in feature_objectives for obj in objectives):
            if tier == 'Essential' and score >= 50:
                return 'mandatory'
            elif tier in ['Essential', 'Premium'] and score >= 40:
                return 'recommended'
        
        # Property-based classification
        if 'Villa' in property_type or 'Estate' in property_type:
            if tier == 'Premium' and score >= 50:
                return 'recommended'
        
        # Default classification
        if tier == 'Signature' or score < 30:
            return 'luxury'
        elif tier == 'Premium' or score >= 40:
            return 'recommended'
        else:
            return 'luxury'

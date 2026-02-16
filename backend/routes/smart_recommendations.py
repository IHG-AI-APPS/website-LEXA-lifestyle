"""
Smart Recommendations Engine
AI-powered solution recommendations based on user browsing history
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

router = APIRouter(prefix="/api", tags=["Smart Recommendations"])

logger = logging.getLogger(__name__)

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Solution category relationships for smart recommendations
CATEGORY_RELATIONSHIPS = {
    # Residential categories and their related solutions
    "Home Cinema": ["Audio Systems", "Lighting Automation", "Motorized Shades", "Climate Control"],
    "Audio Systems": ["Home Cinema", "HiFi Audio", "Outdoor Living", "Majlis Audio"],
    "Lighting Automation": ["Motorized Shades", "Climate Control", "Home Cinema", "Security"],
    "Climate Control": ["Lighting Automation", "Energy Management", "Motorized Shades"],
    "Motorized Shades": ["Lighting Automation", "Climate Control", "Home Cinema"],
    "Security": ["Access Control", "Surveillance", "Lighting Automation", "Smart Parking"],
    "Access Control": ["Security", "Surveillance", "BMS Automation"],
    "Surveillance": ["Security", "Access Control", "AI Camera Analytics"],
    "Smart Parking": ["Security", "Access Control", "BMS Automation"],
    "Networking": ["Security", "Surveillance", "Home Cinema", "Audio Systems"],
    "Outdoor Living": ["Audio Systems", "Lighting Automation", "Climate Control"],
    
    # Commercial categories
    "Conference Rooms": ["Video Walls", "Audio Systems", "Lighting Automation"],
    "Video Walls": ["Conference Rooms", "Auditoriums", "Retail Automation"],
    "BMS Automation": ["Energy Management", "Climate Control", "Access Control"],
    "Hospitality Automation": ["GRMS Hospitality", "Lighting Automation", "Climate Control"],
    "GRMS Hospitality": ["Hospitality Automation", "Access Control", "Climate Control"],
    "Retail Automation": ["Video Walls", "Lighting Automation", "Security"],
    
    # Specialized categories
    "Yacht Automation": ["Marine Audio", "Marine Video", "Lighting Automation"],
    "Marine Audio": ["Yacht Automation", "Marine Video", "Outdoor Living"],
    "Marine Video": ["Yacht Automation", "Marine Audio"],
    "Majlis Audio": ["Audio Systems", "Cultural Automation", "Lighting Automation"],
    "Cultural Automation": ["Majlis Audio", "Lighting Automation", "Audio Systems"],
}

# Cross-sell opportunity mappings
CROSS_SELL_BUNDLES = {
    "entertainment": {
        "primary": ["Home Cinema", "Audio Systems", "HiFi Audio"],
        "complement": ["Lighting Automation", "Motorized Shades", "Climate Control"],
        "message_en": "Complete your entertainment experience",
        "message_ar": "أكمل تجربة الترفيه الخاصة بك"
    },
    "security": {
        "primary": ["Security", "Surveillance", "Access Control"],
        "complement": ["Smart Parking", "Lighting Automation", "Networking"],
        "message_en": "Enhance your protection",
        "message_ar": "عزز حمايتك"
    },
    "comfort": {
        "primary": ["Climate Control", "Lighting Automation", "Motorized Shades"],
        "complement": ["Audio Systems", "Outdoor Living"],
        "message_en": "Elevate your comfort",
        "message_ar": "ارتقِ براحتك"
    },
    "marine": {
        "primary": ["Yacht Automation", "Marine Audio", "Marine Video"],
        "complement": ["Lighting Automation", "Climate Control"],
        "message_en": "Perfect for your vessel",
        "message_ar": "مثالي ليختك"
    }
}


class ViewedItem(BaseModel):
    id: str
    type: str  # solution, project, service, package
    slug: str
    title: str
    category: Optional[str] = None


class SmartRecommendationsRequest(BaseModel):
    viewed_items: List[ViewedItem]
    limit: int = 4
    language: str = "en"


class RecommendedSolution(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    image: str
    category: str
    reason: str
    confidence: float


@router.post("/smart-recommendations")
async def get_smart_recommendations(request: SmartRecommendationsRequest):
    """
    Get AI-powered smart recommendations based on browsing history
    """
    try:
        if not request.viewed_items:
            return {"recommendations": [], "message": "No browsing history"}
        
        # Extract categories and titles from viewed items
        viewed_categories = []
        viewed_titles = []
        viewed_slugs = set()
        
        for item in request.viewed_items:
            if item.category:
                viewed_categories.append(item.category)
            viewed_titles.append(item.title)
            viewed_slugs.add(item.slug)
        
        # Determine the user's interest cluster
        interest_cluster = determine_interest_cluster(viewed_categories, viewed_titles)
        
        # Get related categories
        related_categories = get_related_categories(viewed_categories)
        
        # Fetch solutions from database
        solutions_collection = db.solutions
        
        # Build query to find related solutions
        query = {
            "slug": {"$nin": list(viewed_slugs)},  # Exclude already viewed
            "$or": [
                {"category": {"$in": related_categories}},
                {"title": {"$in": related_categories}},
                {"tags": {"$in": viewed_categories + related_categories}}
            ]
        }
        
        cursor = solutions_collection.find(query, {"_id": 0}).limit(20)
        candidate_solutions = await cursor.to_list(length=20)
        
        # Score and rank recommendations
        scored_recommendations = []
        for solution in candidate_solutions:
            score = calculate_recommendation_score(
                solution, 
                viewed_categories, 
                viewed_titles, 
                interest_cluster
            )
            
            if score > 0.3:  # Minimum relevance threshold
                reason = generate_recommendation_reason(
                    solution, 
                    viewed_titles, 
                    interest_cluster,
                    request.language
                )
                
                scored_recommendations.append({
                    "id": solution.get("id", solution.get("slug", "")),
                    "slug": solution.get("slug", ""),
                    "title": solution.get("title", ""),
                    "description": solution.get("description", "")[:150] + "..." if len(solution.get("description", "")) > 150 else solution.get("description", ""),
                    "image": solution.get("image", ""),
                    "category": solution.get("category", ""),
                    "reason": reason,
                    "confidence": round(score, 2)
                })
        
        # Sort by confidence score
        scored_recommendations.sort(key=lambda x: x["confidence"], reverse=True)
        
        # Get cross-sell message
        cross_sell_message = get_cross_sell_message(interest_cluster, request.language)
        
        return {
            "recommendations": scored_recommendations[:request.limit],
            "interest_cluster": interest_cluster,
            "message": cross_sell_message,
            "total_found": len(scored_recommendations)
        }
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail=str(e))


def determine_interest_cluster(categories: List[str], titles: List[str]) -> str:
    """Determine the user's primary interest cluster"""
    
    # Count category occurrences
    cluster_scores = {
        "entertainment": 0,
        "security": 0,
        "comfort": 0,
        "marine": 0,
        "commercial": 0
    }
    
    entertainment_keywords = ["cinema", "audio", "hifi", "theater", "entertainment", "media"]
    security_keywords = ["security", "surveillance", "access", "cctv", "alarm", "protection"]
    comfort_keywords = ["climate", "lighting", "shade", "motorized", "hvac", "comfort"]
    marine_keywords = ["yacht", "marine", "boat", "vessel"]
    commercial_keywords = ["conference", "office", "retail", "hospitality", "commercial", "bms"]
    
    all_text = " ".join(categories + titles).lower()
    
    for keyword in entertainment_keywords:
        if keyword in all_text:
            cluster_scores["entertainment"] += 1
    
    for keyword in security_keywords:
        if keyword in all_text:
            cluster_scores["security"] += 1
    
    for keyword in comfort_keywords:
        if keyword in all_text:
            cluster_scores["comfort"] += 1
            
    for keyword in marine_keywords:
        if keyword in all_text:
            cluster_scores["marine"] += 2  # Higher weight for specialized
            
    for keyword in commercial_keywords:
        if keyword in all_text:
            cluster_scores["commercial"] += 1
    
    # Return highest scoring cluster
    return max(cluster_scores, key=cluster_scores.get) if max(cluster_scores.values()) > 0 else "comfort"


def get_related_categories(viewed_categories: List[str]) -> List[str]:
    """Get categories related to what the user has viewed"""
    related = set()
    
    for category in viewed_categories:
        # Direct lookup
        if category in CATEGORY_RELATIONSHIPS:
            related.update(CATEGORY_RELATIONSHIPS[category])
        
        # Fuzzy matching for partial matches
        for key, values in CATEGORY_RELATIONSHIPS.items():
            if category.lower() in key.lower() or key.lower() in category.lower():
                related.update(values)
    
    return list(related)


def calculate_recommendation_score(
    solution: Dict[str, Any], 
    viewed_categories: List[str],
    viewed_titles: List[str],
    interest_cluster: str
) -> float:
    """Calculate relevance score for a recommendation"""
    
    score = 0.0
    solution_title = solution.get("title", "").lower()
    solution_category = solution.get("category", "").lower()
    solution_tags = [t.lower() for t in solution.get("tags", [])]
    
    # Category match bonus
    for cat in viewed_categories:
        if cat.lower() in solution_category or solution_category in cat.lower():
            score += 0.3
        if cat.lower() in solution_tags:
            score += 0.2
    
    # Interest cluster alignment
    cluster_keywords = {
        "entertainment": ["cinema", "audio", "media", "entertainment"],
        "security": ["security", "surveillance", "access", "protection"],
        "comfort": ["climate", "lighting", "shade", "comfort"],
        "marine": ["yacht", "marine", "boat"],
        "commercial": ["conference", "office", "retail", "bms"]
    }
    
    for keyword in cluster_keywords.get(interest_cluster, []):
        if keyword in solution_title or keyword in solution_category:
            score += 0.25
    
    # Related category bonus
    for cat in viewed_categories:
        related = CATEGORY_RELATIONSHIPS.get(cat, [])
        for rel in related:
            if rel.lower() in solution_title or rel.lower() == solution_category:
                score += 0.2
    
    # Cap score at 1.0
    return min(score, 1.0)


def generate_recommendation_reason(
    solution: Dict[str, Any],
    viewed_titles: List[str],
    interest_cluster: str,
    language: str
) -> str:
    """Generate a human-readable reason for the recommendation"""
    
    solution_title = solution.get("title", "")
    
    reasons_en = {
        "entertainment": f"Pairs perfectly with your entertainment setup",
        "security": f"Enhances your security system",
        "comfort": f"Complements your comfort solutions",
        "marine": f"Ideal for your marine setup",
        "commercial": f"Great addition to your commercial space"
    }
    
    reasons_ar = {
        "entertainment": f"يتناسب تماماً مع إعدادات الترفيه الخاصة بك",
        "security": f"يعزز نظام الأمان الخاص بك",
        "comfort": f"يكمل حلول الراحة الخاصة بك",
        "marine": f"مثالي لإعداد يختك",
        "commercial": f"إضافة رائعة لمساحتك التجارية"
    }
    
    if language == "ar":
        return reasons_ar.get(interest_cluster, f"موصى به بناءً على اهتماماتك")
    
    return reasons_en.get(interest_cluster, f"Recommended based on your interests")


def get_cross_sell_message(interest_cluster: str, language: str) -> str:
    """Get cross-sell message for the interest cluster"""
    
    bundle = CROSS_SELL_BUNDLES.get(interest_cluster, CROSS_SELL_BUNDLES["comfort"])
    
    if language == "ar":
        return bundle.get("message_ar", "اكتشف المزيد")
    
    return bundle.get("message_en", "Discover more")

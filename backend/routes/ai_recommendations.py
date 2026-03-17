"""
AI-Powered Feature Recommendation Engine
Analyzes user lifestyle priorities and recommends relevant features
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter()

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')
client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[DB_NAME]


class LifestylePriorities(BaseModel):
    priorities: List[str]  # e.g., ["comfort", "security", "energy", "entertainment"]
    property_type: Optional[str] = "villa"
    budget_range: Optional[str] = "medium"


class AIRecommendation(BaseModel):
    feature_id: str
    feature_title: str
    category: str
    confidence_score: float
    reasoning: str
    iq_points: int


@router.post("/api/intelligence/ai-recommend")
async def get_ai_recommendations(priorities: LifestylePriorities):
    """
    AI-Powered Feature Recommendations
    Analyzes lifestyle priorities and suggests relevant features
    """
    
    features_collection = db.intelligence_features
    
    # Priority to category mapping
    priority_map = {
        "comfort": ["climate", "convenience", "lighting", "shading"],
        "security": ["security"],
        "energy": ["climate", "lighting"],
        "entertainment": ["entertainment", "voice_ai"],
        "wellness": ["wellness", "climate"],
        "convenience": ["convenience", "voice_ai", "lighting"]
    }
    
    # Get relevant categories
    relevant_categories = []
    for priority in priorities.priorities:
        relevant_categories.extend(priority_map.get(priority.lower(), []))
    
    # Remove duplicates
    relevant_categories = list(set(relevant_categories))
    
    # Fetch features from relevant categories
    query = {"category": {"$in": relevant_categories}}
    features = await features_collection.find(query).to_list(1000)
    
    # AI Scoring Algorithm
    recommendations = []
    
    for feature in features:
        # Base confidence from popularity
        base_confidence = min(feature.get('popularity_score', 1) / 50, 0.7)
        
        # Boost for featured features
        if feature.get('featured', False):
            base_confidence += 0.15
        
        # Boost for premium features
        if feature.get('is_premium', False):
            base_confidence += 0.10
        
        # Category match boost
        category_boost = 0.05 * sum(1 for p in priorities.priorities if feature['category'] in priority_map.get(p.lower(), []))
        
        confidence_score = min(base_confidence + category_boost, 1.0)
        
        # Generate reasoning
        reasoning_parts = []
        if feature.get('featured'):
            reasoning_parts.append("Popular choice")
        if feature.get('is_premium'):
            reasoning_parts.append("Premium feature")
        if len(feature.get('related_solutions', [])) > 10:
            reasoning_parts.append(f"Available across {len(feature['related_solutions'])}+ solutions")
        
        reasoning = " • ".join(reasoning_parts) if reasoning_parts else "Recommended for your lifestyle"
        
        recommendations.append({
            "feature_id": feature['id'],
            "feature_title": feature['title'],
            "category": feature['category_name'],
            "confidence_score": round(confidence_score, 2),
            "reasoning": reasoning,
            "iq_points": feature.get('iq_points', 5)
        })
    
    # Sort by confidence score
    recommendations.sort(key=lambda x: x['confidence_score'], reverse=True)
    
    # Return top 50 recommendations
    return {
        "recommendations": recommendations[:50],
        "total_analyzed": len(features),
        "ai_engine": "LEXA Intelligence v2.0",
        "priorities_analyzed": priorities.priorities
    }


@router.get("/api/intelligence/features/stats")
async def get_feature_stats():
    """Get statistics about available features"""
    features_collection = db.intelligence_features
    
    total_features = await features_collection.count_documents({})
    featured_count = await features_collection.count_documents({"featured": True})
    premium_count = await features_collection.count_documents({"is_premium": True})
    
    # Category breakdown
    pipeline = [
        {"$group": {"_id": "$category_name", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    category_breakdown = await features_collection.aggregate(pipeline).to_list(100)
    
    return {
        "total_features": total_features,
        "featured_features": featured_count,
        "premium_features": premium_count,
        "categories": category_breakdown,
        "ai_powered": True,
        "version": "2.0"
    }

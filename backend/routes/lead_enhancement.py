"""
Lead Enhancement APIs
- Social Proof (live notifications)
- Exit Intent Lead Capture with A/B Testing
- Lead Scoring
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone, timedelta
from uuid import uuid4
import os
import random
import logging
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/leads", tags=["lead-enhancement"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

# Default A/B Test Variants for Exit Intent Popup
DEFAULT_VARIANTS = [
    {
        "id": "control",
        "name": "Control - Free Consultation",
        "headline": "Wait! Don't Leave Empty-Handed",
        "subheadline": "Get a FREE Smart Home Consultation",
        "offer_badge": "Worth AED 2,500 — Yours FREE!",
        "benefits": [
            "Personalized smart home design recommendations",
            "Expert advice from certified consultants",
            "Custom budget estimate for your property",
            "No obligation - 100% FREE"
        ],
        "cta_text": "Claim My FREE Consultation",
        "success_message": "Your FREE consultation has been reserved. Our team will contact you within 24 hours.",
        "weight": 50,
        "active": True
    },
    {
        "id": "variant_b",
        "name": "Variant B - Discount Offer",
        "headline": "Exclusive Offer Just For You!",
        "subheadline": "Get 15% OFF Your First Smart Home Project",
        "offer_badge": "Limited Time — Save Up To AED 10,000!",
        "benefits": [
            "15% discount on any smart home package",
            "Free premium consultation included",
            "Priority installation scheduling",
            "Offer expires in 48 hours"
        ],
        "cta_text": "Unlock My 15% Discount",
        "success_message": "Your exclusive 15% discount code has been reserved! Check your email for details.",
        "weight": 25,
        "active": True
    },
    {
        "id": "variant_c",
        "name": "Variant C - Free Guide",
        "headline": "Before You Go...",
        "subheadline": "Download Our FREE Smart Home Planning Guide",
        "offer_badge": "2024 Edition — 50+ Pages of Expert Tips!",
        "benefits": [
            "Complete smart home planning checklist",
            "Budget calculator & cost breakdown",
            "Top 10 automation features for UAE homes",
            "Exclusive vendor recommendations"
        ],
        "cta_text": "Download FREE Guide Now",
        "success_message": "Your guide is on the way! Check your email to download it instantly.",
        "weight": 25,
        "active": True
    }
]

# Dubai area names for social proof
DUBAI_AREAS = [
    "Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "JBR", "Business Bay",
    "Emirates Hills", "Arabian Ranches", "Jumeirah Golf Estates", "DIFC",
    "Jumeirah", "Al Barsha", "Dubai Hills", "Mirdif", "Motor City",
    "Abu Dhabi", "Sharjah", "Ajman", "RAK"
]

# First names for social proof
FIRST_NAMES = [
    "Ahmed", "Mohammed", "Omar", "Khalid", "Rashid", "Saeed", "Hassan",
    "Sarah", "Fatima", "Layla", "Noura", "Aisha", "Mariam", "Dana",
    "John", "Michael", "David", "James", "Robert", "William",
    "Emma", "Sophie", "Olivia", "Chloe", "Anna"
]

# Actions for social proof
ACTIONS = [
    "requested a quote",
    "booked a consultation",
    "started a project",
    "downloaded a brochure",
    "viewed Premium Package",
    "used the Smart Builder",
    "explored Villa Solutions"
]


class ExitIntentLead(BaseModel):
    email: str
    source_page: Optional[str] = None
    offer_type: Optional[str] = "consultation"
    variant_id: Optional[str] = None  # A/B test variant


class ABTestVariant(BaseModel):
    id: str
    name: str
    headline: str
    subheadline: str
    offer_badge: str
    benefits: List[str]
    cta_text: str
    success_message: str
    weight: int = 50
    active: bool = True


class SocialProofEvent(BaseModel):
    name: str
    location: str
    action: str
    time_ago: str


# ===== A/B TESTING ENDPOINTS =====

@router.get("/ab-test/variant")
async def get_ab_test_variant():
    """Get a randomly selected A/B test variant based on weights"""
    try:
        # Get active variants from DB or use defaults
        variants = await db.ab_test_variants.find({"active": True}).to_list(10)
        
        if not variants:
            # Initialize with defaults if none exist
            for variant in DEFAULT_VARIANTS:
                variant["created_at"] = datetime.now(timezone.utc)
                variant["impressions"] = 0
                variant["conversions"] = 0
                await db.ab_test_variants.update_one(
                    {"id": variant["id"]},
                    {"$setOnInsert": variant},
                    upsert=True
                )
            variants = DEFAULT_VARIANTS
        
        # Select variant based on weights
        active_variants = [v for v in variants if v.get("active", True)]
        if not active_variants:
            active_variants = [DEFAULT_VARIANTS[0]]
        
        total_weight = sum(v.get("weight", 50) for v in active_variants)
        rand = random.randint(1, total_weight)
        cumulative = 0
        
        selected_variant = active_variants[0]
        for variant in active_variants:
            cumulative += variant.get("weight", 50)
            if rand <= cumulative:
                selected_variant = variant
                break
        
        # Track impression
        await db.ab_test_variants.update_one(
            {"id": selected_variant["id"]},
            {"$inc": {"impressions": 1}}
        )
        
        # Return variant without internal fields
        return {
            "id": selected_variant["id"],
            "name": selected_variant.get("name", ""),
            "headline": selected_variant["headline"],
            "subheadline": selected_variant["subheadline"],
            "offer_badge": selected_variant["offer_badge"],
            "benefits": selected_variant["benefits"],
            "cta_text": selected_variant["cta_text"],
            "success_message": selected_variant["success_message"]
        }
        
    except Exception as e:
        logger.error(f"Error getting A/B test variant: {e}")
        # Return control variant on error
        return {
            "id": "control",
            "headline": DEFAULT_VARIANTS[0]["headline"],
            "subheadline": DEFAULT_VARIANTS[0]["subheadline"],
            "offer_badge": DEFAULT_VARIANTS[0]["offer_badge"],
            "benefits": DEFAULT_VARIANTS[0]["benefits"],
            "cta_text": DEFAULT_VARIANTS[0]["cta_text"],
            "success_message": DEFAULT_VARIANTS[0]["success_message"]
        }


@router.get("/ab-test/results")
async def get_ab_test_results():
    """Get A/B test results (admin endpoint)"""
    try:
        variants = await db.ab_test_variants.find({}, {"_id": 0}).to_list(20)
        
        if not variants:
            # Return defaults with zero stats
            return {
                "variants": [
                    {**v, "impressions": 0, "conversions": 0, "conversion_rate": 0}
                    for v in DEFAULT_VARIANTS
                ],
                "total_impressions": 0,
                "total_conversions": 0,
                "best_performer": None
            }
        
        # Calculate conversion rates
        for v in variants:
            impressions = v.get("impressions", 0)
            conversions = v.get("conversions", 0)
            v["conversion_rate"] = round((conversions / impressions * 100), 2) if impressions > 0 else 0
        
        # Find best performer
        best = max(variants, key=lambda x: x.get("conversion_rate", 0)) if variants else None
        
        total_impressions = sum(v.get("impressions", 0) for v in variants)
        total_conversions = sum(v.get("conversions", 0) for v in variants)
        
        return {
            "variants": variants,
            "total_impressions": total_impressions,
            "total_conversions": total_conversions,
            "overall_conversion_rate": round((total_conversions / total_impressions * 100), 2) if total_impressions > 0 else 0,
            "best_performer": {
                "id": best["id"],
                "name": best.get("name", ""),
                "conversion_rate": best.get("conversion_rate", 0)
            } if best and best.get("conversion_rate", 0) > 0 else None
        }
        
    except Exception as e:
        logger.error(f"Error getting A/B test results: {e}")
        raise HTTPException(status_code=500, detail="Failed to get A/B test results")


@router.put("/ab-test/variant/{variant_id}")
async def update_ab_test_variant(variant_id: str, variant: ABTestVariant):
    """Update an A/B test variant"""
    try:
        update_data = variant.dict()
        update_data["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.ab_test_variants.update_one(
            {"id": variant_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            # Create new variant
            update_data["created_at"] = datetime.now(timezone.utc)
            update_data["impressions"] = 0
            update_data["conversions"] = 0
            await db.ab_test_variants.insert_one(update_data)
        
        return {"success": True, "message": "Variant updated successfully"}
        
    except Exception as e:
        logger.error(f"Error updating variant: {e}")
        raise HTTPException(status_code=500, detail="Failed to update variant")


@router.post("/ab-test/variant")
async def create_ab_test_variant(variant: ABTestVariant):
    """Create a new A/B test variant"""
    try:
        variant_data = variant.dict()
        variant_data["created_at"] = datetime.now(timezone.utc)
        variant_data["impressions"] = 0
        variant_data["conversions"] = 0
        
        # Check if ID already exists
        existing = await db.ab_test_variants.find_one({"id": variant.id})
        if existing:
            raise HTTPException(status_code=400, detail="Variant ID already exists")
        
        await db.ab_test_variants.insert_one(variant_data)
        return {"success": True, "message": "Variant created successfully", "id": variant.id}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating variant: {e}")
        raise HTTPException(status_code=500, detail="Failed to create variant")


@router.delete("/ab-test/variant/{variant_id}")
async def delete_ab_test_variant(variant_id: str):
    """Delete an A/B test variant"""
    try:
        if variant_id == "control":
            raise HTTPException(status_code=400, detail="Cannot delete control variant")
        
        result = await db.ab_test_variants.delete_one({"id": variant_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Variant not found")
        
        return {"success": True, "message": "Variant deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting variant: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete variant")


@router.post("/ab-test/reset")
async def reset_ab_test_stats():
    """Reset A/B test statistics (start fresh test)"""
    try:
        await db.ab_test_variants.update_many(
            {},
            {"$set": {"impressions": 0, "conversions": 0, "reset_at": datetime.now(timezone.utc)}}
        )
        return {"success": True, "message": "A/B test statistics reset successfully"}
        
    except Exception as e:
        logger.error(f"Error resetting stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to reset statistics")


@router.get("/social-proof")
async def get_social_proof():
    """Get recent activity for social proof notifications"""
    try:
        # Get real recent activities from database
        recent_leads = await db.smart_home_leads.find(
            {"created_at": {"$gte": datetime.now(timezone.utc) - timedelta(hours=24)}},
            {"_id": 0, "contact_name": 1, "emirate": 1, "created_at": 1}
        ).sort("created_at", -1).to_list(5)
        
        recent_consultations = await db.consultations.find(
            {"created_at": {"$gte": datetime.now(timezone.utc) - timedelta(hours=48)}},
            {"_id": 0, "name": 1, "created_at": 1}
        ).sort("created_at", -1).to_list(5)
        
        events = []
        
        # Add real events
        for lead in recent_leads:
            name = lead.get("contact_name", "").split()[0] if lead.get("contact_name") else random.choice(FIRST_NAMES)
            location = lead.get("emirate", random.choice(DUBAI_AREAS))
            time_diff = datetime.now(timezone.utc) - lead.get("created_at", datetime.now(timezone.utc))
            
            if time_diff.total_seconds() < 3600:
                time_ago = f"{int(time_diff.total_seconds() / 60)} minutes ago"
            else:
                time_ago = f"{int(time_diff.total_seconds() / 3600)} hours ago"
            
            events.append({
                "name": name,
                "location": location.replace("_", " ").title() if location else random.choice(DUBAI_AREAS),
                "action": "requested a quote",
                "time_ago": time_ago,
                "real": True
            })
        
        for consultation in recent_consultations:
            name = consultation.get("name", "").split()[0] if consultation.get("name") else random.choice(FIRST_NAMES)
            time_diff = datetime.now(timezone.utc) - consultation.get("created_at", datetime.now(timezone.utc))
            
            if time_diff.total_seconds() < 3600:
                time_ago = f"{int(time_diff.total_seconds() / 60)} minutes ago"
            else:
                time_ago = f"{int(time_diff.total_seconds() / 3600)} hours ago"
            
            events.append({
                "name": name,
                "location": random.choice(DUBAI_AREAS),
                "action": "booked a consultation",
                "time_ago": time_ago,
                "real": True
            })
        
        # If not enough real events, add simulated ones
        while len(events) < 5:
            minutes_ago = random.randint(5, 180)
            events.append({
                "name": random.choice(FIRST_NAMES),
                "location": random.choice(DUBAI_AREAS),
                "action": random.choice(ACTIONS),
                "time_ago": f"{minutes_ago} minutes ago" if minutes_ago < 60 else f"{minutes_ago // 60} hours ago",
                "real": False
            })
        
        # Shuffle and return
        random.shuffle(events)
        return {"events": events[:5], "total_today": len(recent_leads) + random.randint(5, 15)}
        
    except Exception as e:
        logger.error(f"Social proof error: {str(e)}")
        # Return simulated data on error
        events = []
        for _ in range(5):
            minutes_ago = random.randint(5, 180)
            events.append({
                "name": random.choice(FIRST_NAMES),
                "location": random.choice(DUBAI_AREAS),
                "action": random.choice(ACTIONS),
                "time_ago": f"{minutes_ago} minutes ago" if minutes_ago < 60 else f"{minutes_ago // 60} hours ago",
                "real": False
            })
        return {"events": events, "total_today": random.randint(10, 25)}


@router.post("/exit-intent")
async def capture_exit_intent(lead: ExitIntentLead):
    """Capture lead from exit intent popup with A/B test tracking"""
    try:
        lead_data = {
            "id": str(uuid4()),
            "email": lead.email,
            "source": "exit_intent",
            "source_page": lead.source_page,
            "offer_type": lead.offer_type,
            "variant_id": lead.variant_id,
            "status": "new",
            "created_at": datetime.now(timezone.utc)
        }
        
        # Check if email already exists
        existing = await db.exit_intent_leads.find_one({"email": lead.email})
        if existing:
            return {
                "success": True,
                "message": "Thanks! We'll be in touch soon.",
                "already_subscribed": True
            }
        
        await db.exit_intent_leads.insert_one(lead_data)
        
        # Track conversion for A/B test
        if lead.variant_id:
            await db.ab_test_variants.update_one(
                {"id": lead.variant_id},
                {"$inc": {"conversions": 1}}
            )
        
        logger.info(f"Exit intent lead captured: {lead.email}, variant: {lead.variant_id}")
        
        # Get the success message for this variant
        success_message = "Thanks! Your FREE consultation (worth AED 2,500) has been reserved. We'll contact you within 24 hours!"
        if lead.variant_id:
            variant = await db.ab_test_variants.find_one({"id": lead.variant_id})
            if variant:
                success_message = variant.get("success_message", success_message)
        
        return {
            "success": True,
            "message": success_message,
            "lead_id": lead_data["id"]
        }
        
    except Exception as e:
        logger.error(f"Exit intent capture error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to capture lead")


@router.get("/stats")
async def get_lead_stats():
    """Get lead statistics for dashboard"""
    try:
        today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        this_week = today - timedelta(days=7)
        
        # Count leads from different sources
        smart_home_today = await db.smart_home_leads.count_documents({"created_at": {"$gte": today}})
        smart_home_week = await db.smart_home_leads.count_documents({"created_at": {"$gte": this_week}})
        
        consultations_today = await db.consultations.count_documents({"created_at": {"$gte": today}})
        consultations_week = await db.consultations.count_documents({"created_at": {"$gte": this_week}})
        
        exit_intent_today = await db.exit_intent_leads.count_documents({"created_at": {"$gte": today}})
        exit_intent_week = await db.exit_intent_leads.count_documents({"created_at": {"$gte": this_week}})
        
        ai_chat_leads = await db.ai_chat_leads.count_documents({"lead_score": {"$gte": 50}})
        
        return {
            "today": {
                "quotes": smart_home_today,
                "consultations": consultations_today,
                "exit_intent": exit_intent_today,
                "total": smart_home_today + consultations_today + exit_intent_today
            },
            "this_week": {
                "quotes": smart_home_week,
                "consultations": consultations_week,
                "exit_intent": exit_intent_week,
                "total": smart_home_week + consultations_week + exit_intent_week
            },
            "ai_chat_qualified_leads": ai_chat_leads,
            "conversion_tips": [
                "Hot leads from AI chat have 3x higher conversion rate",
                "Exit intent leads respond best to follow-up within 1 hour",
                "Premium budget leads have highest lifetime value"
            ]
        }
        
    except Exception as e:
        logger.error(f"Lead stats error: {str(e)}")
        return {"error": "Failed to fetch stats"}

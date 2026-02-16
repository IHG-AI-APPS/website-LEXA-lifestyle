"""
Migration Script: Transform existing intelligence_features to enhanced schema
Adds new fields while preserving existing data
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import uuid

# MongoDB connection
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')

# Category to System Domain mapping
CATEGORY_TO_DOMAIN = {
    "lighting": "Lighting",
    "climate": "HVAC",
    "security": "Security",
    "entertainment": "AV",
    "convenience": "Automation",
    "voice_ai": "AI Control",
    "outdoor": "Outdoor",
    "wellness": "Wellness",
    "pets": "Pet Care",
    "network": "Network",
    "water": "Water Management",
    "shading": "Shading",
    "appliances": "Appliances",
    "cleaning": "Maintenance",
    "elderly": "Assisted Living"
}

# Category to Objectives mapping
CATEGORY_TO_OBJECTIVES = {
    "lighting": ["Comfort", "Energy", "Luxury"],
    "climate": ["Comfort", "Energy", "Wellness"],
    "security": ["Security", "Safety", "Peace of Mind"],
    "entertainment": ["Entertainment", "Luxury", "Lifestyle"],
    "convenience": ["Convenience", "Comfort", "Efficiency"],
    "voice_ai": ["Convenience", "Luxury", "Innovation"],
    "outdoor": ["Lifestyle", "Entertainment", "Wellness"],
    "wellness": ["Wellness", "Health", "Comfort"],
    "pets": ["Pet Care", "Convenience", "Lifestyle"],
    "network": ["Infrastructure", "Reliability", "Security"],
    "water": ["Sustainability", "Safety", "Efficiency"],
    "shading": ["Comfort", "Energy", "Privacy"],
    "appliances": ["Convenience", "Efficiency", "Lifestyle"],
    "cleaning": ["Convenience", "Hygiene", "Time Saving"],
    "elderly": ["Safety", "Care", "Independence"]
}

# Space tags by category
CATEGORY_TO_SPACES = {
    "lighting": ["Living", "Bedroom", "Kitchen", "Bathroom", "Hallway"],
    "climate": ["Living", "Bedroom", "Office", "CommonAreas"],
    "security": ["Entry", "Perimeter", "Parking", "CommonAreas"],
    "entertainment": ["Living", "Cinema", "MediaRoom", "GameRoom"],
    "convenience": ["All"],
    "voice_ai": ["All"],
    "outdoor": ["Garden", "Pool", "Patio", "Landscape"],
    "wellness": ["Bedroom", "Bathroom", "GymSpa"],
    "pets": ["Living", "Garden", "Entry"],
    "network": ["RackRoom", "All"],
    "water": ["Kitchen", "Bathroom", "Garden"],
    "shading": ["Living", "Bedroom", "Office"],
    "appliances": ["Kitchen", "Laundry"],
    "cleaning": ["All"],
    "elderly": ["Bedroom", "Bathroom", "Living"]
}


def get_complexity_from_category(category: str, is_premium: bool) -> int:
    """Determine complexity based on category and premium status"""
    high_complexity = ["entertainment", "security", "elderly", "wellness"]
    medium_complexity = ["climate", "lighting", "outdoor"]
    
    base = 4 if category in high_complexity else 3 if category in medium_complexity else 2
    return min(5, base + (1 if is_premium else 0))


def get_invasiveness_from_category(category: str, is_premium: bool) -> str:
    """Determine invasiveness level"""
    high_invasive = ["entertainment", "climate", "security"]
    if category in high_invasive and is_premium:
        return "High"
    elif category in high_invasive:
        return "Medium"
    return "Low"


def get_tier_from_premium(is_premium: bool, category: str, title: str) -> str:
    """Determine tier classification"""
    if "signature" in title.lower() or "premium" in title.lower():
        return "Signature"
    elif is_premium or category in ["entertainment", "wellness", "elderly"]:
        return "Premium"
    return "Essential"


def get_min_area_from_feature(title: str, category: str, tier: str) -> int:
    """Determine minimum area requirements"""
    title_lower = title.lower()
    
    # Large space requirements
    if any(word in title_lower for word in ["cinema", "theater", "gym", "pool", "estate"]):
        return 2000
    
    # Medium space requirements
    if tier == "Signature" or category in ["entertainment", "wellness"]:
        return 1200
    
    # Small space OK
    if tier == "Essential":
        return 400
    
    # Default medium
    return 800


def get_property_types_from_area(min_area: int) -> list:
    """Determine allowed property types based on minimum area"""
    if min_area >= 2000:
        return ["Villa", "Penthouse", "Estate", "Mansion"]
    elif min_area >= 1200:
        return ["Villa", "Penthouse", "LuxuryApartment", "Duplex"]
    elif min_area >= 800:
        return ["Villa", "Apartment", "Penthouse", "Duplex"]
    else:
        return ["Studio", "Apartment", "Villa", "Penthouse", "Duplex"]


async def migrate_features():
    """
    Transform existing features to enhanced schema
    """
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Starting feature migration...")
    print(f"Connected to: {DB_NAME}")
    
    # Fetch all existing features
    features = await db.intelligence_features.find({}).to_list(None)
    print(f"📊 Found {len(features)} existing features")
    
    updated_count = 0
    
    for feature in features:
        category = feature.get('category', 'convenience')
        is_premium = feature.get('is_premium', False)
        title = feature.get('title', '')
        
        # Generate new fields
        tier = get_tier_from_premium(is_premium, category, title)
        complexity = get_complexity_from_category(category, is_premium)
        invasiveness = get_invasiveness_from_category(category, is_premium)
        min_area = get_min_area_from_feature(title, category, tier)
        
        # Build update document
        update_doc = {
            # System Domain
            'system_domain': CATEGORY_TO_DOMAIN.get(category, 'General'),
            'space_tags': CATEGORY_TO_SPACES.get(category, ['All']),
            
            # Eligibility Gates
            'segments_allowed': ['Residential'],  # Start with residential only
            'property_types_allowed': get_property_types_from_area(min_area),
            'project_stage_allowed': ['Concept', 'Design', 'Construction', 'Retrofit'] if invasiveness == 'Low' else ['Concept', 'Design', 'Construction'],
            'min_area_sqft': min_area,
            'max_area_sqft': None,
            'project_scale': ['Small', 'Medium', 'Large'] if min_area < 1200 else ['Medium', 'Large', 'Estate'],
            
            # Intent Alignment
            'objective_tags': CATEGORY_TO_OBJECTIVES.get(category, ['Comfort', 'Convenience']),
            'priority_role_tags': ['Homeowner', 'Architect'],
            
            # Complexity & Constraints
            'complexity': complexity,
            'invasiveness': invasiveness,
            'dependencies_required': [],  # Will be populated manually for critical features
            'pre_reqs': [],
            'risk_flags': ['retrofit_constraints'] if invasiveness == 'High' else [],
            
            # Commercial Logic
            'tier': tier,
            'bundle_key': f"BUNDLE-{CATEGORY_TO_DOMAIN.get(category, 'GENERAL').upper()}-{tier.upper()}",
            'estimated_effort': 'L' if complexity >= 4 else 'M' if complexity >= 3 else 'S',
            'compliance_notes': '',
            
            # Ensure feature_id exists (use existing id or create new)
            'feature_id': feature.get('id', str(uuid.uuid4())),
            
            # Keep all existing fields
            'migrated_at': datetime.utcnow()
        }
        
        # Update feature
        await db.intelligence_features.update_one(
            {'_id': feature['_id']},
            {'$set': update_doc}
        )
        updated_count += 1
        
        if updated_count % 100 == 0:
            print(f"  ✓ Processed {updated_count} features...")
    
    print(f"✅ Migration complete! Updated {updated_count} features")
    
    # Create indexes for efficient querying
    print("\n📑 Creating indexes...")
    await db.intelligence_features.create_index([('segments_allowed', 1)])
    await db.intelligence_features.create_index([('property_types_allowed', 1)])
    await db.intelligence_features.create_index([('objective_tags', 1)])
    await db.intelligence_features.create_index([('tier', 1)])
    await db.intelligence_features.create_index([('bundle_key', 1)])
    await db.intelligence_features.create_index([('min_area_sqft', 1)])
    print("✅ Indexes created")
    
    # Sample check
    print("\n🔍 Sample transformed feature:")
    sample = await db.intelligence_features.find_one({'category': 'lighting'})
    if sample:
        print(f"  Feature: {sample.get('title')}")
        print(f"  System Domain: {sample.get('system_domain')}")
        print(f"  Tier: {sample.get('tier')}")
        print(f"  Min Area: {sample.get('min_area_sqft')} sqft")
        print(f"  Objectives: {sample.get('objective_tags')}")
        print(f"  Property Types: {sample.get('property_types_allowed')}")
        print(f"  Invasiveness: {sample.get('invasiveness')}")
        print(f"  Bundle: {sample.get('bundle_key')}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(migrate_features())

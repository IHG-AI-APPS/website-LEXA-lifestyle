"""
Seed Initial Bundles - Create 25 foundational bundles
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')

# Initial 25 Bundles
BUNDLES = [
    # ========== RESIDENTIAL - ESSENTIAL TIER ==========
    {
        "bundle_id": "RES-LGT-ESSENTIAL",
        "bundle_name": "Essential Lighting Control",
        "bundle_description": "Smart lighting scenes and automation for everyday living comfort",
        "segment": "Residential",
        "tier": "Essential",
        "system_domains": ["Lighting", "Network"],
        "min_area_sqft": 400,
        "property_types_allowed": ["Studio", "Apartment", "Villa", "Penthouse"],
        "project_stage_allowed": ["Concept", "Design", "Construction", "Retrofit"],
        "estimated_price_range": "12,000-18,000 AED",
        "estimated_effort_days": "3-5 days",
        "use_cases": ["Comfort", "Energy", "Convenience"],
        "benefits": [
            "Mood-based lighting scenes",
            "Energy saving automation",
            "Voice control ready",
            "Easy retrofit installation"
        ]
    },
    {
        "bundle_id": "RES-HVAC-ESSENTIAL",
        "bundle_name": "Essential Climate Control",
        "bundle_description": "Smart HVAC control for year-round comfort and energy efficiency",
        "segment": "Residential",
        "tier": "Essential",
        "system_domains": ["HVAC", "Network"],
        "min_area_sqft": 400,
        "property_types_allowed": ["Studio", "Apartment", "Villa", "Penthouse"],
        "project_stage_allowed": ["Concept", "Design", "Construction", "Retrofit"],
        "estimated_price_range": "15,000-22,000 AED",
        "estimated_effort_days": "4-6 days",
        "use_cases": ["Comfort", "Energy", "Wellness"],
        "benefits": [
            "Intelligent temperature control",
            "Scheduling and automation",
            "Energy optimization",
            "Remote access"
        ]
    },
    {
        "bundle_id": "RES-SEC-ESSENTIAL",
        "bundle_name": "Essential Security",
        "bundle_description": "Core security with cameras, access control, and monitoring",
        "segment": "Residential",
        "tier": "Essential",
        "system_domains": ["Security", "Network"],
        "min_area_sqft": 400,
        "property_types_allowed": ["Studio", "Apartment", "Villa", "Penthouse"],
        "project_stage_allowed": ["Concept", "Design", "Construction", "Retrofit"],
        "estimated_price_range": "18,000-28,000 AED",
        "estimated_effort_days": "5-7 days",
        "use_cases": ["Security", "Safety", "Peace of Mind"],
        "benefits": [
            "HD camera surveillance",
            "Smart door access",
            "Mobile alerts",
            "Visitor management"
        ]
    },
    {
        "bundle_id": "RES-NET-ESSENTIAL",
        "bundle_name": "Essential Network Infrastructure",
        "bundle_description": "Robust WiFi backbone for smart home connectivity",
        "segment": "Residential",
        "tier": "Essential",
        "system_domains": ["Network"],
        "min_area_sqft": 400,
        "property_types_allowed": ["Studio", "Apartment", "Villa", "Penthouse"],
        "project_stage_allowed": ["Concept", "Design", "Construction", "Retrofit"],
        "estimated_price_range": "8,000-15,000 AED",
        "estimated_effort_days": "2-3 days",
        "use_cases": ["Infrastructure", "Reliability"],
        "benefits": [
            "Whole-home WiFi coverage",
            "Gigabit speeds",
            "Device prioritization",
            "Secure network"
        ]
    },
    
    # ========== RESIDENTIAL - PREMIUM TIER ==========
    {
        "bundle_id": "RES-LGT-PREMIUM",
        "bundle_name": "Premium Lighting Experience",
        "bundle_description": "Advanced circadian lighting, scenes, and architectural lighting control",
        "segment": "Residential",
        "tier": "Premium",
        "system_domains": ["Lighting", "Network", "AI Control"],
        "min_area_sqft": 800,
        "property_types_allowed": ["Apartment", "Villa", "Penthouse", "Duplex"],
        "project_stage_allowed": ["Concept", "Design", "Construction"],
        "estimated_price_range": "28,000-45,000 AED",
        "estimated_effort_days": "7-10 days",
        "use_cases": ["Luxury", "Wellness", "Energy"],
        "benefits": [
            "Circadian rhythm lighting",
            "Advanced scene programming",
            "Architectural accent control",
            "Voice and AI integration"
        ]
    },
    {
        "bundle_id": "RES-MEDIA-PREMIUM",
        "bundle_name": "Premium Media Lounge",
        "bundle_description": "High-quality AV system for apartments and villas without major civil works",
        "segment": "Residential",
        "tier": "Premium",
        "system_domains": ["AV", "Lighting", "Network"],
        "min_area_sqft": 600,
        "property_types_allowed": ["Apartment", "Villa", "Penthouse", "Duplex"],
        "project_stage_allowed": ["Concept", "Design", "Construction", "Retrofit"],
        "estimated_price_range": "45,000-75,000 AED",
        "estimated_effort_days": "8-12 days",
        "use_cases": ["Entertainment", "Luxury", "Lifestyle"],
        "benefits": [
            "Premium sound system",
            "4K/8K video",
            "Integrated lighting scenes",
            "Retrofit-friendly design"
        ]
    },
    {
        "bundle_id": "RES-SEC-PREMIUM",
        "bundle_name": "Premium Security & Monitoring",
        "bundle_description": "Advanced security with AI analytics, perimeter protection, and smart integration",
        "segment": "Residential",
        "tier": "Premium",
        "system_domains": ["Security", "Network", "AI Control"],
        "min_area_sqft": 1200,
        "property_types_allowed": ["Villa", "Penthouse", "Duplex", "Estate"],
        "project_stage_allowed": ["Concept", "Design", "Construction"],
        "estimated_price_range": "55,000-90,000 AED",
        "estimated_effort_days": "10-14 days",
        "use_cases": ["Security", "Safety", "Peace of Mind"],
        "benefits": [
            "AI-powered analytics",
            "Perimeter intrusion detection",
            "Advanced access control",
            "Integration with home automation"
        ]
    },
    {
        "bundle_id": "RES-OUTDOOR-PREMIUM",
        "bundle_name": "Premium Outdoor Living",
        "bundle_description": "Pool, landscape, and garden automation for ultimate outdoor experience",
        "segment": "Residential",
        "tier": "Premium",
        "system_domains": ["Outdoor", "Lighting", "Water Management"],
        "min_area_sqft": 2000,
        "property_types_allowed": ["Villa", "Estate", "Mansion"],
        "project_stage_allowed": ["Design", "Construction"],
        "estimated_price_range": "65,000-120,000 AED",
        "estimated_effort_days": "12-18 days",
        "use_cases": ["Lifestyle", "Entertainment", "Luxury"],
        "benefits": [
            "Automated pool systems",
            "Landscape irrigation control",
            "Outdoor lighting scenes",
            "Weather-responsive automation"
        ]
    },
    
    # ========== RESIDENTIAL - SIGNATURE TIER ==========
    {
        "bundle_id": "RES-CINEMA-SIGNATURE",
        "bundle_name": "Signature Private Cinema",
        "bundle_description": "Commercial-grade cinema with acoustic treatment, premium AV, and luxury seating",
        "segment": "Residential",
        "tier": "Signature",
        "system_domains": ["AV", "Lighting", "Network", "HVAC"],
        "min_area_sqft": 1800,
        "property_types_allowed": ["Villa", "Penthouse", "Estate", "Mansion"],
        "project_stage_allowed": ["Design", "Construction"],
        "estimated_price_range": "180,000-350,000 AED",
        "estimated_effort_days": "25-35 days",
        "use_cases": ["Entertainment", "Luxury", "Lifestyle"],
        "benefits": [
            "Commercial-grade projection",
            "Dolby Atmos sound",
            "Acoustic isolation",
            "Luxury seating and controls"
        ]
    },
    {
        "bundle_id": "RES-ESTATE-SIGNATURE",
        "bundle_name": "Signature Estate Management",
        "bundle_description": "Complete estate automation with BMS, staff management, and multi-building integration",
        "segment": "Residential",
        "tier": "Signature",
        "system_domains": ["BMS", "Security", "Network", "Automation"],
        "min_area_sqft": 8000,
        "property_types_allowed": ["Estate", "Mansion", "Compound"],
        "project_stage_allowed": ["Concept", "Design", "Construction"],
        "estimated_price_range": "450,000-900,000 AED",
        "estimated_effort_days": "60-90 days",
        "use_cases": ["Estate Management", "Security", "Efficiency"],
        "benefits": [
            "Centralized building management",
            "Multi-structure integration",
            "Staff access management",
            "Energy and utility monitoring"
        ]
    },
    
    # ========== COMMERCIAL - OFFICE ==========
    {
        "bundle_id": "COM-OFFICE-OPERATIONS",
        "bundle_name": "Office Operations Suite",
        "bundle_description": "Meeting room automation, desk booking, and workplace experience systems",
        "segment": "Commercial",
        "tier": "Essential",
        "system_domains": ["AV", "Network", "Automation"],
        "min_area_sqft": 2000,
        "property_types_allowed": ["Office", "CoWorking"],
        "project_stage_allowed": ["Concept", "Design", "Construction"],
        "estimated_price_range": "85,000-150,000 AED",
        "estimated_effort_days": "15-20 days",
        "use_cases": ["Operations", "Workplace Experience", "Efficiency"],
        "benefits": [
            "Smart meeting rooms",
            "Desk booking system",
            "Occupancy analytics",
            "Unified control interface"
        ]
    },
    {
        "bundle_id": "COM-RETAIL-EXPERIENCE",
        "bundle_name": "Retail Experience Suite",
        "bundle_description": "Customer analytics, dynamic lighting, and in-store experience automation",
        "segment": "Commercial",
        "tier": "Premium",
        "system_domains": ["Lighting", "AI Control", "Network"],
        "min_area_sqft": 1500,
        "property_types_allowed": ["Retail", "Showroom", "Mall"],
        "project_stage_allowed": ["Design", "Construction", "Retrofit"],
        "estimated_price_range": "95,000-180,000 AED",
        "estimated_effort_days": "18-25 days",
        "use_cases": ["Customer Experience", "Analytics", "Ambience"],
        "benefits": [
            "Footfall analytics",
            "Dynamic lighting zones",
            "Music and ambience control",
            "Heatmap reporting"
        ]
    },
    
    # ========== HOSPITALITY ==========
    {
        "bundle_id": "HOSP-GUESTROOM-STANDARD",
        "bundle_name": "Smart Guestroom Standard",
        "bundle_description": "Hotel room automation with lighting, HVAC, and guest control interface",
        "segment": "Hospitality",
        "tier": "Essential",
        "system_domains": ["Lighting", "HVAC", "Automation"],
        "min_area_sqft": 300,
        "property_types_allowed": ["Hotel", "Resort", "ServicedApartment"],
        "project_stage_allowed": ["Concept", "Design", "Construction"],
        "estimated_price_range": "15,000-25,000 AED per room",
        "estimated_effort_days": "5-7 days per room",
        "use_cases": ["Guest Experience", "Energy", "Operations"],
        "benefits": [
            "Welcome and departure scenes",
            "Energy-saving automation",
            "Guest control tablet",
            "Housekeeping integration"
        ]
    },
    {
        "bundle_id": "HOSP-GUESTROOM-LUXURY",
        "bundle_name": "Luxury Guestroom Experience",
        "bundle_description": "Premium hotel automation with voice control, entertainment, and personalization",
        "segment": "Hospitality",
        "tier": "Signature",
        "system_domains": ["Lighting", "HVAC", "AV", "AI Control"],
        "min_area_sqft": 500,
        "property_types_allowed": ["LuxuryHotel", "Resort", "Villa"],
        "project_stage_allowed": ["Design", "Construction"],
        "estimated_price_range": "45,000-75,000 AED per room",
        "estimated_effort_days": "10-14 days per room",
        "use_cases": ["Luxury", "Guest Experience", "Differentiation"],
        "benefits": [
            "Voice assistant integration",
            "Premium entertainment system",
            "Personalized guest profiles",
            "Seamless service integration"
        ]
    }
]


async def seed_bundles():
    """Create initial bundle library"""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Create new collection or clear existing
    await db.project_bundles.drop()
    print("🗑️  Cleared existing bundles collection")
    
    print(f"\n📦 Creating {len(BUNDLES)} initial bundles...")
    
    for bundle in BUNDLES:
        bundle['created_at'] = datetime.utcnow()
        bundle['is_active'] = True
        bundle['feature_ids'] = []  # Will be populated by linking features
        
        await db.project_bundles.insert_one(bundle)
        print(f"  ✓ Created: {bundle['bundle_name']} ({bundle['segment']} - {bundle['tier']})")
    
    print(f"\n✅ Successfully created {len(BUNDLES)} bundles")
    
    # Create indexes
    print("\n📑 Creating indexes...")
    await db.project_bundles.create_index([('segment', 1)])
    await db.project_bundles.create_index([('tier', 1)])
    await db.project_bundles.create_index([('bundle_id', 1)], unique=True)
    await db.project_bundles.create_index([('property_types_allowed', 1)])
    print("✅ Indexes created")
    
    # Summary
    print("\n📊 Bundle Summary:")
    for segment in ['Residential', 'Commercial', 'Hospitality']:
        count = await db.project_bundles.count_documents({'segment': segment})
        print(f"  {segment}: {count} bundles")
    
    for tier in ['Essential', 'Premium', 'Signature']:
        count = await db.project_bundles.count_documents({'tier': tier})
        print(f"  {tier}: {count} bundles")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_bundles())

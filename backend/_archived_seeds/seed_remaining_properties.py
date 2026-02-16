"""
Seed Remaining Property Types
Penthouses, Apartments, Compounds, Hospitality
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_remaining_property_types():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    property_types = [
        {
            "id": str(uuid4()),
            "slug": "penthouses-sky-homes",
            "property_type": "penthouse",
            "title": "Penthouses & Sky Homes",
            "subtitle": "3,000-8,000 sq ft | High-rise | Panoramic views | Premium finishes",
            "description": "Elevated smart living for luxury penthouses with floor-to-ceiling automation, motorized shades, climate zones, and entertainment systems optimized for high-rise living.",
            "long_description": "Elevate your penthouse experience with intelligent automation designed for high-rise luxury. From sunrise wake-up scenes with automated shades to panoramic evening lighting, every system is optimized for your elevated lifestyle and breathtaking views.",
            
            "typical_size_range": "3,000-8,000 sq ft",
            "typical_features": [
                "Single or multi-level design",
                "3-5 bedrooms with ensuite bathrooms",
                "Panoramic floor-to-ceiling windows",
                "Private elevator access",
                "Rooftop terrace or large balconies",
                "Open-plan living & entertaining spaces",
                "Premium finishes & fixtures",
                "Underground parking (2-4 spaces)"
            ],
            
            "tiers": [
                {
                    "tier_level": "essential",
                    "tier_name": "Essential",
                    "tier_subtitle": "Smart Living Fundamentals",
                    "base_price_aed": 180000,
                    "typical_rooms_count": "6-7 core rooms",
                    "lighting_features": ["Scene control", "Scheduling", "Voice control", "Mobile app", "Presence detection"],
                    "climate_features": ["Multi-zone HVAC (3-4 zones)", "Smart thermostats", "Scheduling", "Energy monitoring"],
                    "security_features": ["Smart locks", "HD cameras (4-6)", "Door/window sensors", "Motion detection", "Mobile alerts"],
                    "entertainment_features": ["Whole-home audio (4-6 zones)", "TV integration", "Streaming support", "Multi-room sync"],
                    "additional_features": ["Voice control (Alexa, Google, Siri)", "WiFi 6 mesh network", "Central control app", "Motorized shades (key rooms)", "1-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Standard Support",
                    "recommended": False
                },
                {
                    "tier_level": "enhanced",
                    "tier_name": "Enhanced",
                    "tier_subtitle": "Intelligent Living",
                    "base_price_aed": 320000,
                    "typical_rooms_count": "Entire penthouse",
                    "lighting_features": ["All Essential features", "Architectural lighting design", "Tunable white (2700K-6500K)", "Circadian rhythm support", "Automated shades (all windows)", "Sunrise/sunset automation"],
                    "climate_features": ["All Essential features", "AI learning algorithms", "Advanced occupancy control", "Weather-aware adjustments", "6-8 independent zones", "Terrace climate integration"],
                    "security_features": ["All Essential features", "AI surveillance (8-10 cameras)", "Facial recognition", "Elevator integration", "Smart detection & alerts", "Access audit trails"],
                    "entertainment_features": ["All Essential features", "Premium home cinema OR audiophile system", "Invisible/architectural speakers", "Terrace audio zones", "IPTV distribution"],
                    "additional_features": ["All Essential features", "Motorized shades (all windows)", "Terrace/balcony automation", "View-optimized lighting", "Guest access management", "Priority 2-year warranty"],
                    "included_specialty_count": 0,
                    "available_specialty_rooms": ["home-bar-club", "executive-office", "wine-room", "audiophile-music-room"],
                    "support_level": "Priority Support",
                    "badge": "Most Popular",
                    "recommended": True
                },
                {
                    "tier_level": "highend",
                    "tier_name": "High-End",
                    "tier_subtitle": "Sky-High Excellence",
                    "base_price_aed": 550000,
                    "typical_rooms_count": "Complete orchestration",
                    "lighting_features": ["All Enhanced features", "Bespoke lighting design", "Full-spectrum tunable LEDs", "Panoramic view optimization", "Rooftop terrace scenes", "Music-sync party modes"],
                    "climate_features": ["All Enhanced features", "Predictive AI climate", "Individual room micro-zones (10+ zones)", "Air quality monitoring (CO2, VOC, PM2.5)", "Automated purification", "Terrace heating/cooling"],
                    "security_features": ["All Enhanced features", "Enterprise-grade AI surveillance (12+ cameras)", "License plate recognition", "Elevator biometric access", "Panic protocols", "24/7 monitoring option"],
                    "entertainment_features": ["All Enhanced features", "Bespoke cinema with Dolby Atmos", "Rooftop entertainment system", "Multi-zone premium audio", "Terrace cinema capability"],
                    "additional_features": ["All Enhanced features", "Choose ANY 2 Specialty Rooms", "Rooftop/terrace full automation", "The Lexa Intelligence Layer", "White-Glove 24/7 support", "5-year comprehensive warranty"],
                    "included_specialty_count": 2,
                    "available_specialty_rooms": ["wine-room", "home-bar-club", "executive-office", "audiophile-music-room", "master-suite-experience", "private-spa"],
                    "support_level": "White-Glove Support",
                    "recommended": False
                }
            ],
            
            "hero_image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85",
            "gallery_images": [],
            "meta_title": "Penthouse Smart Home Automation | Luxury High-Rise Living",
            "meta_description": "Transform your penthouse with intelligent automation. Essential to High-End packages for luxury high-rise homes 3,000-8,000 sq ft.",
            "featured": True,
            "display_order": 2
        },
        {
            "id": str(uuid4()),
            "slug": "luxury-apartments-duplexes",
            "property_type": "apartment",
            "title": "Luxury Apartments & Duplexes",
            "subtitle": "1,500-3,500 sq ft | Multi-level or single floor | Urban luxury",
            "description": "Sophisticated automation for urban luxury living with streamlined integration, elegant controls, and apartment-optimized solutions.",
            "long_description": "Urban luxury meets intelligent living. Our apartment packages are designed for sophisticated city living with discrete automation, elegant controls, and systems optimized for high-end apartment and duplex layouts.",
            
            "typical_size_range": "1,500-3,500 sq ft",
            "typical_features": [
                "2-4 bedrooms",
                "Open-plan living areas",
                "Modern kitchen & appliances",
                "2-3 bathrooms",
                "Balcony or terrace",
                "Parking space(s)",
                "Building amenities access",
                "City or waterfront views"
            ],
            
            "tiers": [
                {
                    "tier_level": "essential",
                    "tier_name": "Essential",
                    "tier_subtitle": "Smart Living Fundamentals",
                    "base_price_aed": 120000,
                    "typical_rooms_count": "5-6 core rooms",
                    "lighting_features": ["Scene control", "Scheduling", "Voice control", "Mobile app"],
                    "climate_features": ["Smart thermostats", "Multi-zone control", "Scheduling", "Energy monitoring"],
                    "security_features": ["Smart door lock", "Door sensor", "HD cameras (2-3)", "Mobile alerts"],
                    "entertainment_features": ["Whole-home audio (3-4 zones)", "TV integration", "Streaming"],
                    "additional_features": ["Voice control", "WiFi mesh network", "Central app", "Motorized shades (living area)", "1-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Standard Support",
                    "recommended": False
                },
                {
                    "tier_level": "enhanced",
                    "tier_name": "Enhanced",
                    "tier_subtitle": "Intelligent Urban Living",
                    "base_price_aed": 210000,
                    "typical_rooms_count": "Entire apartment",
                    "lighting_features": ["All Essential features", "Architectural lighting", "Tunable white", "Circadian rhythm", "Automated shades (all rooms)"],
                    "climate_features": ["All Essential features", "AI learning", "Occupancy-based control", "Weather-aware", "4-5 zones"],
                    "security_features": ["All Essential features", "AI cameras (4-5)", "Smart detection", "Access logs"],
                    "entertainment_features": ["All Essential features", "Premium soundbar OR 5.1 system", "Architectural speakers", "Balcony audio"],
                    "additional_features": ["All Essential features", "Motorized shades (all windows)", "Balcony automation", "Guest access", "Priority 2-year warranty"],
                    "included_specialty_count": 0,
                    "available_specialty_rooms": ["executive-office", "home-gym", "wine-room"],
                    "support_level": "Priority Support",
                    "badge": "Most Popular",
                    "recommended": True
                },
                {
                    "tier_level": "highend",
                    "tier_name": "High-End",
                    "tier_subtitle": "Urban Excellence",
                    "base_price_aed": 380000,
                    "typical_rooms_count": "Complete orchestration",
                    "lighting_features": ["All Enhanced features", "Bespoke design", "Full-spectrum tunable", "View optimization", "Party modes"],
                    "climate_features": ["All Enhanced features", "Predictive AI", "Micro-zones (6-8)", "Air quality monitoring", "Automated purification"],
                    "security_features": ["All Enhanced features", "Enterprise AI (6-8 cameras)", "Facial recognition", "Building integration", "24/7 monitoring"],
                    "entertainment_features": ["All Enhanced features", "Premium cinema OR audiophile system", "Balcony entertainment"],
                    "additional_features": ["All Enhanced features", "Choose ANY 1 Specialty Room", "Balcony full automation", "The Lexa Intelligence Layer", "White-Glove support", "5-year warranty"],
                    "included_specialty_count": 1,
                    "available_specialty_rooms": ["executive-office", "home-gym", "wine-room", "home-bar-club", "master-suite-experience"],
                    "support_level": "White-Glove Support",
                    "recommended": False
                }
            ],
            
            "hero_image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=85",
            "gallery_images": [],
            "meta_title": "Luxury Apartment Smart Home Automation | Urban Living",
            "meta_description": "Intelligent automation for luxury apartments and duplexes. Essential to High-End packages for 1,500-3,500 sq ft properties.",
            "featured": True,
            "display_order": 3
        }
    ]
    
    # Insert/update each property type
    for prop in property_types:
        existing = await db.property_packages.find_one({"slug": prop["slug"]})
        if existing:
            await db.property_packages.update_one(
                {"slug": prop["slug"]},
                {"$set": prop}
            )
            print(f"✅ Updated: {prop['title']}")
        else:
            await db.property_packages.insert_one(prop)
            print(f"✅ Created: {prop['title']}")
    
    # Count total
    total = await db.property_packages.count_documents({})
    print(f"\n📊 Total property packages: {total}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_remaining_property_types())

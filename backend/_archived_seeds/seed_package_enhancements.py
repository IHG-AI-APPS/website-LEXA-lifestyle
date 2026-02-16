"""
Package Enhancement & Optional Add-ons System
Allows customers to customize packages with upgrades, extra devices, and brand selection
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_package_enhancements():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Package enhancements organized by category
    enhancements = [
        # ===== LIGHTING ENHANCEMENTS =====
        {
            "id": str(uuid4()),
            "category": "Lighting",
            "type": "upgrade",
            "name": "Tunable White LED Upgrade",
            "description": "Upgrade from standard warm white to full-spectrum tunable white (2700K-6500K) for all lighting fixtures",
            "base_price_aed": 15000,
            "benefits": [
                "Circadian rhythm support",
                "Adjustable color temperature throughout the day",
                "Better concentration during work hours",
                "Relaxation modes for evening"
            ],
            "applies_to_tiers": ["essential", "enhanced", "basic", "standard"],
            "included_in_tier": "highend",
            "icon": "lightbulb"
        },
        {
            "id": str(uuid4()),
            "category": "Lighting",
            "type": "addon",
            "name": "Outdoor Landscape Lighting",
            "description": "Add automated landscape lighting with scheduling, zones, and scene integration",
            "base_price_aed": 12000,
            "typical_coverage": "Garden paths, architectural highlighting, pool area",
            "benefits": [
                "Dusk-to-dawn automation",
                "Integrated with indoor scenes",
                "Security enhancement",
                "Curb appeal"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "trees"
        },
        {
            "id": str(uuid4()),
            "category": "Lighting",
            "type": "upgrade",
            "name": "Premium Lutron Keypads",
            "description": "Replace standard keypads with Lutron Palladiom designer keypads (metal finish)",
            "base_price_aed": 8000,
            "benefits": [
                "Luxury metal finish (brushed nickel, brass, bronze)",
                "Customizable button engraving",
                "Premium tactile feel",
                "Aesthetic upgrade"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "square"
        },
        
        # ===== SECURITY ENHANCEMENTS =====
        {
            "id": str(uuid4()),
            "category": "Security",
            "type": "addon",
            "name": "Additional Security Cameras (4-pack)",
            "description": "Add 4 more AI-powered security cameras to extend coverage",
            "base_price_aed": 6000,
            "benefits": [
                "Extend coverage to side yards, garage, garden",
                "AI detection for all areas",
                "Unified monitoring",
                "Enhanced security"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "camera"
        },
        {
            "id": str(uuid4()),
            "category": "Security",
            "type": "upgrade",
            "name": "License Plate Recognition Upgrade",
            "description": "Add LPR (License Plate Recognition) to gate cameras",
            "base_price_aed": 8500,
            "benefits": [
                "Automatic gate opening for registered vehicles",
                "Visitor log with vehicle details",
                "Blacklist/whitelist management",
                "Enhanced security for compounds"
            ],
            "applies_to_tiers": ["enhanced", "highend", "standard", "premium"],
            "icon": "shield-check"
        },
        
        # ===== CLIMATE ENHANCEMENTS =====
        {
            "id": str(uuid4()),
            "category": "Climate",
            "type": "addon",
            "name": "Additional HVAC Zones (3-pack)",
            "description": "Add 3 more independent climate control zones",
            "base_price_aed": 9000,
            "benefits": [
                "Individual room temperature control",
                "Energy savings by heating/cooling only occupied rooms",
                "Personalized comfort per family member",
                "Better climate distribution"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "thermometer"
        },
        {
            "id": str(uuid4()),
            "category": "Climate",
            "type": "upgrade",
            "name": "Air Quality Monitoring & Purification",
            "description": "Add CO2, VOC, PM2.5 sensors with automated air purifier integration",
            "base_price_aed": 11000,
            "benefits": [
                "Real-time air quality monitoring",
                "Automatic purifier activation",
                "Health insights and alerts",
                "Allergen reduction"
            ],
            "applies_to_tiers": ["essential", "enhanced", "basic", "standard"],
            "included_in_tier": "highend",
            "icon": "wind"
        },
        
        # ===== ENTERTAINMENT ENHANCEMENTS =====
        {
            "id": str(uuid4()),
            "category": "Entertainment",
            "type": "addon",
            "name": "Garden/Poolside Audio Zone",
            "description": "Extend multi-room audio to outdoor areas with weatherproof speakers",
            "base_price_aed": 5500,
            "benefits": [
                "Seamless indoor-outdoor music",
                "Weatherproof outdoor speakers",
                "Party mode integration",
                "Pool entertaining"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "speaker"
        },
        {
            "id": str(uuid4()),
            "category": "Entertainment",
            "type": "upgrade",
            "name": "Dolby Atmos Cinema Upgrade",
            "description": "Upgrade from 5.1/7.1 surround to full Dolby Atmos with ceiling speakers",
            "base_price_aed": 18000,
            "benefits": [
                "Immersive 3D audio",
                "Ceiling-mounted height speakers",
                "Cinema-grade sound experience",
                "Future-proof audio format"
            ],
            "applies_to_tiers": ["enhanced", "standard", "premium"],
            "included_in_tier": "highend",
            "icon": "film"
        },
        
        # ===== NETWORK ENHANCEMENTS =====
        {
            "id": str(uuid4()),
            "category": "Network",
            "type": "upgrade",
            "name": "WiFi 6E Upgrade (Latest Standard)",
            "description": "Upgrade from WiFi 6 to WiFi 6E for faster speeds and less congestion",
            "base_price_aed": 4500,
            "benefits": [
                "6GHz band support",
                "Lower latency",
                "More simultaneous devices",
                "Future-proof networking"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "wifi"
        },
        {
            "id": str(uuid4()),
            "category": "Network",
            "type": "addon",
            "name": "Wired Ethernet Ports (10-pack)",
            "description": "Add 10 more Gigabit Ethernet ports in strategic locations",
            "base_price_aed": 3000,
            "benefits": [
                "Stable wired connections",
                "Gaming/streaming reliability",
                "Home office connectivity",
                "IoT device stability"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "cable"
        },
        
        # ===== SERVICE UPGRADES =====
        {
            "id": str(uuid4()),
            "category": "Service",
            "type": "upgrade",
            "name": "Extended 5-Year Warranty",
            "description": "Extend warranty from standard 1-2 years to comprehensive 5-year coverage",
            "base_price_aed": 12000,
            "benefits": [
                "5 years parts & labor coverage",
                "Annual system health checks",
                "Software updates included",
                "Priority support"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "shield"
        },
        {
            "id": str(uuid4()),
            "category": "Service",
            "type": "upgrade",
            "name": "White-Glove Annual Support Plan",
            "description": "Add ongoing 24/7 white-glove support and concierge service",
            "base_price_aed": 15000,
            "recurring": "annual",
            "benefits": [
                "24/7 priority support hotline",
                "Quarterly optimization visits",
                "Free system expansions (up to 10% annually)",
                "Dedicated account manager",
                "Remote troubleshooting"
            ],
            "applies_to_tiers": ["essential", "enhanced", "basic", "standard"],
            "included_in_tier": "highend",
            "icon": "headset"
        },
        
        # ===== INSTALLATION UPGRADES =====
        {
            "id": str(uuid4()),
            "category": "Installation",
            "type": "upgrade",
            "name": "Expedited Installation (Priority Scheduling)",
            "description": "Fast-track your project with priority scheduling and dedicated crew",
            "base_price_aed": 20000,
            "benefits": [
                "50% faster installation timeline",
                "Dedicated installation crew",
                "Weekend/evening work available",
                "Priority parts procurement"
            ],
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "icon": "clock"
        }
    ]
    
    # Insert all enhancements
    for enhancement in enhancements:
        existing = await db.package_enhancements.find_one({"name": enhancement["name"]})
        if existing:
            await db.package_enhancements.update_one(
                {"name": enhancement["name"]},
                {"$set": enhancement}
            )
            print(f"✅ Updated: {enhancement['name']}")
        else:
            await db.package_enhancements.insert_one(enhancement)
            print(f"✅ Created: {enhancement['name']}")
    
    print(f"\n📊 Total enhancements/add-ons: {len(enhancements)}")
    
    # Show pricing summary by category
    by_category = {}
    for enh in enhancements:
        cat = enh['category']
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(enh)
    
    print("\n💰 Pricing by Category:")
    for cat, items in by_category.items():
        total = sum(item['base_price_aed'] for item in items)
        print(f"  {cat}: {len(items)} items, Total value: AED {total/1000:.0f}K")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_package_enhancements())

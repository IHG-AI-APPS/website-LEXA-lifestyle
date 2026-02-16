"""
Control Systems / Smart Home Platforms
Seed the master control system options that determine ecosystem compatibility
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_control_systems():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    control_systems = [
        {
            "id": str(uuid4()),
            "slug": "savant",
            "name": "Savant",
            "tagline": "Premium Smart Home Automation",
            "description": "iOS-based professional automation platform offering intuitive control of lighting, climate, entertainment, and security through an elegant interface. Perfect for Apple ecosystem integration.",
            "price_range_aed": [25000, 80000],
            "type": "proprietary",
            "platform": "iOS-based",
            "protocols": ["Zigbee", "Z-Wave", "Bluetooth LE", "WiFi"],
            "best_for": ["Luxury homes", "Apple users", "AV enthusiasts", "Premium integration"],
            "features": [
                "Seamless Apple ecosystem integration",
                "Immersive user interface",
                "Multi-zone audio excellence",
                "Professional-grade AV control",
                "TrueImage video processing",
                "99.1% system uptime"
            ],
            "compatibility": {
                "native_brands": ["Savant", "Sonos", "Lutron", "Sony"],
                "integrations": "300+ devices",
                "max_devices": 300
            },
            "installation": "Professional required",
            "recommended_for_tiers": ["highend", "premium"],
            "featured": True,
            "is_lexa_partner": True
        },
        {
            "id": str(uuid4()),
            "slug": "qbus",
            "name": "Qbus",
            "tagline": "Home Automation Perfected",
            "description": "Belgian-engineered premium automation platform integrating lighting, climate, security, and entertainment. Known for reliability and elegant European design philosophy.",
            "price_range_aed": [20000, 70000],
            "type": "proprietary",
            "platform": "Dedicated controllers",
            "protocols": ["KNX", "DMX", "Modbus", "DALI"],
            "best_for": ["Luxury homes", "European standards", "Complete automation", "Architectural integration"],
            "features": [
                "Belgian engineering excellence",
                "Complete home automation",
                "Professional-grade reliability",
                "Elegant control interfaces",
                "Advanced scene programming",
                "Architectural lighting integration"
            ],
            "compatibility": {
                "native_brands": ["Qbus", "Tridonic", "Lumitronix"],
                "integrations": "KNX ecosystem",
                "max_devices": 500
            },
            "installation": "Professional required",
            "recommended_for_tiers": ["enhanced", "highend", "standard", "premium"],
            "featured": True,
            "is_lexa_partner": True
        },
        {
            "id": str(uuid4()),
            "slug": "control4",
            "name": "Control4",
            "tagline": "Smart Home for Everyone",
            "description": "Industry-leading automation platform with broad device compatibility and robust ecosystem. Offers professional features at more accessible price points with Zigbee and Z-Wave support.",
            "price_range_aed": [10000, 50000],
            "type": "proprietary",
            "platform": "Linux-based",
            "protocols": ["Zigbee", "Z-Wave", "WiFi", "IP"],
            "best_for": ["Most homes", "Broad compatibility", "Scalability", "Value-focused"],
            "features": [
                "Broadest device compatibility (90%+)",
                "150+ brand integrations",
                "Reliable IP-based architecture",
                "Remote access & monitoring",
                "Energy savings (20-30%)",
                "10-year product support"
            ],
            "compatibility": {
                "native_brands": ["Control4", "Sonos", "Nest", "Lutron", "KEF"],
                "integrations": "150+ certified partners",
                "max_devices": 500
            },
            "installation": "Professional required",
            "recommended_for_tiers": ["essential", "enhanced", "basic", "standard"],
            "featured": True,
            "is_lexa_partner": False
        },
        {
            "id": str(uuid4()),
            "slug": "knx",
            "name": "KNX",
            "tagline": "The Worldwide Standard",
            "description": "International wired automation standard used in commercial buildings and high-end residential. Maximum reliability and scalability for large properties with complex requirements.",
            "price_range_aed": [30000, 100000],
            "type": "open_standard",
            "platform": "Distributed intelligence",
            "protocols": ["KNX TP", "KNX IP", "KNX RF"],
            "best_for": ["Large villas", "Commercial", "Maximum reliability", "Complex automation"],
            "features": [
                "Industry-standard protocol",
                "Wired reliability",
                "Unlimited scalability",
                "Manufacturer independence",
                "Future-proof investment",
                "Used in 190 countries"
            ],
            "compatibility": {
                "native_brands": ["Qbus", "Tridonic", "E-electron"],
                "integrations": "500+ manufacturers",
                "max_devices": "Unlimited"
            },
            "installation": "Professional required (KNX certified)",
            "recommended_for_tiers": ["highend", "premium"],
            "featured": True,
            "is_lexa_partner": False
        },
        {
            "id": str(uuid4()),
            "slug": "matter",
            "name": "Matter",
            "tagline": "Universal Smart Home Standard",
            "description": "The newest universal standard enabling seamless interoperability between brands. Future-proof your home with protocol-agnostic control over WiFi, Thread, and Ethernet.",
            "price_range_aed": [5000, 30000],
            "type": "open_standard",
            "platform": "Protocol layer",
            "protocols": ["Matter over WiFi", "Matter over Thread", "Matter over Ethernet"],
            "best_for": ["Future-proofing", "Multi-brand homes", "Flexibility", "2026+ installations"],
            "features": [
                "Universal device compatibility",
                "No vendor lock-in",
                "Local control (works offline)",
                "Strong security (end-to-end encryption)",
                "Growing ecosystem",
                "Simple setup"
            ],
            "compatibility": {
                "native_brands": ["Most 2026 devices", "Apple", "Google", "Amazon"],
                "integrations": "Rapidly expanding",
                "max_devices": 1000
            },
            "installation": "Professional or DIY",
            "recommended_for_tiers": ["essential", "enhanced", "basic", "standard"],
            "featured": True,
            "is_lexa_partner": False
        },
        {
            "id": str(uuid4()),
            "slug": "zigbee",
            "name": "Zigbee",
            "tagline": "Low-Power Wireless Mesh",
            "description": "Popular wireless mesh protocol for sensors, lights, and plugs. Low power consumption, reliable mesh networking, and broad device support make it ideal for most smart homes.",
            "price_range_aed": [3000, 20000],
            "type": "open_standard",
            "platform": "Mesh network",
            "protocols": ["Zigbee 3.0"],
            "best_for": ["Most apartments", "Energy efficiency", "Wireless preference", "Budget-conscious"],
            "features": [
                "Low power consumption",
                "Self-healing mesh network",
                "Months of battery life",
                "Broad device selection",
                "Established ecosystem",
                "Affordable components"
            ],
            "compatibility": {
                "native_brands": ["Lifesmart", "Various manufacturers"],
                "integrations": "Thousands of devices",
                "max_devices": 200
            },
            "installation": "Professional or DIY",
            "recommended_for_tiers": ["essential", "enhanced", "basic", "standard"],
            "featured": False,
            "is_lexa_partner": False
        },
        {
            "id": str(uuid4()),
            "slug": "lifesmart",
            "name": "Lifesmart",
            "tagline": "Smart Living Made Simple",
            "description": "Affordable, reliable smart home platform from China. Offers sensors, switches, and controllers that work with major automation platforms. Great value for developer projects.",
            "price_range_aed": [2000, 15000],
            "type": "proprietary",
            "platform": "Cloud-based",
            "protocols": ["WiFi", "RF", "Zigbee"],
            "best_for": ["Developer apartments", "Budget projects", "Basic automation", "Bulk installations"],
            "features": [
                "Affordable smart home solutions",
                "Reliable operation",
                "Easy setup",
                "Works with major platforms",
                "Good for bulk projects",
                "Cost-effective automation"
            ],
            "compatibility": {
                "native_brands": ["Lifesmart"],
                "integrations": "Major platforms",
                "max_devices": 100
            },
            "installation": "Professional or DIY",
            "recommended_for_tiers": ["essential", "basic"],
            "featured": False,
            "is_lexa_partner": True
        }
    ]
    
    # Insert all control systems
    await db.control_systems.delete_many({})
    for system in control_systems:
        await db.control_systems.insert_one(system)
        partner_badge = "🏢 LEXA Partner" if system.get('is_lexa_partner') else ""
        print(f"✅ Created: {system['name']} ({system['type']}) {partner_badge}")
    
    print(f"\n📊 Total control systems: {len(control_systems)}")
    print(f"💰 Price range: AED 2K - 100K")
    print(f"🏢 LEXA Partners: Savant, Qbus, Lifesmart")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_control_systems())

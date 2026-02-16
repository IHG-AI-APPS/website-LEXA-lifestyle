"""
Seed Smart Home Packages
Property Types with Essential/Enhanced/High-End Tiers
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_packages():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # ===== LUXURY VILLA PACKAGE =====
    luxury_villa = {
        "id": str(uuid4()),
        "slug": "luxury-villas-mansions",
        "property_type": "luxury-villa",
        "title": "Luxury Villas & Mansions",
        "subtitle": "5,000+ sq ft | Multi-floor | Staff quarters | Expansive grounds",
        "description": "Complete smart home orchestration for expansive estates with intelligent integration across all living spaces, outdoor areas, and staff quarters.",
        "long_description": "Transform your villa into an intelligently orchestrated residence where every system works in perfect harmony. From grand entertaining spaces to intimate private retreats, our solutions scale seamlessly across your entire estate while maintaining the discrete luxury your lifestyle demands.",
        
        "typical_size_range": "5,000-15,000 sq ft",
        "typical_features": [
            "Multiple floors (2-4 levels)",
            "8-15 bedrooms",
            "Staff quarters & service areas",
            "Expansive outdoor spaces",
            "Pool & landscaped gardens",
            "Private parking for 6+ vehicles",
            "Entertainment zones",
            "Guest accommodation"
        ],
        
        "tiers": [
            {
                "tier_level": "essential",
                "tier_name": "Essential",
                "tier_subtitle": "Smart Living Fundamentals",
                "base_price_aed": 250000,
                "typical_rooms_count": "8 core rooms",
                
                "lighting_features": [
                    "Scene-based control (Dining, Entertaining, Relaxation, Cinema)",
                    "Scheduling & automation (Dawn simulation, sunset dimming)",
                    "Voice control integration",
                    "Mobile app control",
                    "Basic presence detection"
                ],
                "climate_features": [
                    "Multi-zone HVAC control (4-6 zones)",
                    "Smart thermostats",
                    "Scheduling & geofencing",
                    "Energy monitoring",
                    "Basic occupancy logic"
                ],
                "security_features": [
                    "Smart door locks (4-6 entry points)",
                    "Door & window sensors",
                    "HD security cameras (6-8 cameras)",
                    "Motion detection",
                    "Mobile alerts & remote monitoring",
                    "Basic access logs"
                ],
                "entertainment_features": [
                    "Whole-home audio (6-8 zones)",
                    "TV integration & streaming",
                    "Apple TV / AirPlay support",
                    "Spotify, Tidal integration",
                    "Multi-room sync"
                ],
                "additional_features": [
                    "Voice control (Alexa, Google, Siri)",
                    "Professional WiFi 6 network",
                    "Central control app (iOS & Android)",
                    "Basic automation scenes",
                    "Standard installation & commissioning",
                    "1-year warranty & support"
                ],
                
                "included_specialty_count": 0,
                "support_level": "Standard Support (Business hours, email & phone)",
                "recommended": False
            },
            {
                "tier_level": "enhanced",
                "tier_name": "Enhanced",
                "tier_subtitle": "Intelligent Living",
                "base_price_aed": 450000,
                "typical_rooms_count": "12+ rooms",
                
                "lighting_features": [
                    "Everything in Essential, PLUS:",
                    "Architectural lighting design (cove, accent, art illumination)",
                    "Tunable white (2700K-6500K color temperature)",
                    "Advanced layered scenes",
                    "Circadian rhythm support",
                    "UGR control (glare-free)",
                    "DMX integration for specialty areas",
                    "Automated blinds & shade integration"
                ],
                "climate_features": [
                    "Everything in Essential, PLUS:",
                    "AI-powered learning algorithms",
                    "Advanced occupancy-based control",
                    "Multi-room temperature balancing",
                    "Energy optimization & reporting",
                    "Weather-aware adjustments",
                    "8-10 independent zones"
                ],
                "security_features": [
                    "Everything in Essential, PLUS:",
                    "AI-powered surveillance (12-16 cameras)",
                    "Facial recognition",
                    "Smart detection & event alerts",
                    "Perimeter protection sensors",
                    "Glass break detection",
                    "Advanced access rules & scheduling",
                    "Staff movement tracking",
                    "Audit trails & detailed logs"
                ],
                "entertainment_features": [
                    "Everything in Essential, PLUS:",
                    "Dedicated cinema room with 5.1/7.1 surround sound",
                    "OR High-end 2-channel audiophile system",
                    "Premium invisible/architectural speakers",
                    "Acoustic calibration & tuning",
                    "Outdoor audio (garden, poolside)",
                    "Central IPTV distribution",
                    "Multi-room video"
                ],
                "additional_features": [
                    "All Essential features, PLUS:",
                    "Motorized window treatments (12-20 windows)",
                    "Staff access management & zones",
                    "Guest access control with time limits",
                    "Pool automation (temperature, lighting, pumps)",
                    "Garden irrigation with weather awareness",
                    "Video intercom system",
                    "Mesh WiFi 6E throughout estate",
                    "Priority 2-year warranty & support"
                ],
                
                "included_specialty_count": 0,
                "available_specialty_rooms": [
                    "wine-room", "game-room", "home-office", "home-bar"
                ],
                "support_level": "Priority Support (Extended hours, faster response)",
                "badge": "Most Popular",
                "recommended": True
            },
            {
                "tier_level": "highend",
                "tier_name": "High-End",
                "tier_subtitle": "Orchestrated Excellence",
                "base_price_aed": 800000,
                "typical_rooms_count": "Entire villa orchestrated",
                
                "lighting_features": [
                    "Everything in Enhanced, PLUS:",
                    "Bespoke lighting design consultation",
                    "Full-spectrum tunable LED systems",
                    "Art gallery-grade illumination",
                    "Outdoor landscape lighting automation",
                    "Starlight ceiling integration",
                    "Fiber optic accent lighting",
                    "Music-synchronized party modes"
                ],
                "climate_features": [
                    "Everything in Enhanced, PLUS:",
                    "Predictive AI climate control",
                    "Individual room micro-climate zones (15+ zones)",
                    "Air quality monitoring (CO2, VOC, PM2.5)",
                    "Automated air purification",
                    "Humidity control",
                    "Integration with wellness systems"
                ],
                "security_features": [
                    "Everything in Enhanced, PLUS:",
                    "Enterprise-grade AI surveillance (20+ cameras)",
                    "License plate recognition",
                    "Intrusion detection with auto-response",
                    "Panic room integration",
                    "Biometric access control",
                    "Roof & façade perimeter sensors",
                    "Emergency protocol automation",
                    "24/7 professional monitoring option"
                ],
                "entertainment_features": [
                    "Everything in Enhanced, PLUS:",
                    "Bespoke cinema with Dolby Atmos (9.1-13.1)",
                    "Acoustic treatments & soundproofing",
                    "Themed cinema interiors (starlight ceiling, etc.)",
                    "Premium motorized recliners",
                    "Outdoor cinema setup (poolside/garden)",
                    "Audiophile-grade music room",
                    "Majlis audio experience (cultural tuning)"
                ],
                "additional_features": [
                    "All Enhanced features, PLUS:",
                    "Choose ANY 3 Specialty Rooms (from our catalog)",
                    "Complete outdoor automation (pool, garden, lighting)",
                    "Water leak prevention with auto-shutoff",
                    "Spa & wellness room automation",
                    "Home gym integration",
                    "Professional conferencing system",
                    "Internal communication network",
                    "Master suite luxury experience",
                    "Guest wing independent control",
                    "The Lexa Intelligence Layer (AI orchestration)",
                    "White-Glove 24/7 support with concierge",
                    "Continuous optimization & updates",
                    "5-year comprehensive warranty"
                ],
                
                "included_specialty_count": 3,
                "available_specialty_rooms": [
                    "wine-room", "vault-panic-room", "game-room", "home-bar-club",
                    "executive-office", "private-spa", "home-gym", "childrens-playroom",
                    "master-suite-experience", "guest-wing-control", "pool-automation",
                    "audiophile-music-room"
                ],
                "support_level": "White-Glove Support (24/7 monitoring, concierge service, dedicated account manager)",
                "recommended": False
            }
        ],
        
        "hero_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=85",
        "gallery_images": [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85"
        ],
        
        "meta_title": "Luxury Villa Smart Home Automation | Complete Estate Integration",
        "meta_description": "Transform your villa with intelligent automation. Essential to High-End packages for villas 5,000+ sq ft. Complete lighting, climate, security & entertainment control.",
        
        "featured": True,
        "display_order": 1
    }
    
    # Insert or update
    existing = await db.property_packages.find_one({"slug": luxury_villa["slug"]})
    if existing:
        await db.property_packages.update_one(
            {"slug": luxury_villa["slug"]},
            {"$set": luxury_villa}
        )
        print(f"✅ Updated: {luxury_villa['title']}")
    else:
        await db.property_packages.insert_one(luxury_villa)
        print(f"✅ Created: {luxury_villa['title']}")
    
    print(f"\n📊 Luxury Villa Package seeded with {len(luxury_villa['tiers'])} tiers")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_packages())

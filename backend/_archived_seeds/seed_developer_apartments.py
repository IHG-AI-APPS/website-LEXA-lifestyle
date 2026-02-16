"""
Seed Standard Apartment Packages for Developers
Studio, 1BR, 2BR, 3BR with Basic/Standard/Premium tiers
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_developer_apartment_packages():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Standard Apartments for Developers (Bulk Projects)
    developer_packages = [
        # ===== STUDIO APARTMENTS =====
        {
            "id": str(uuid4()),
            "slug": "developer-studio-apartments",
            "property_type": "developer-studio",
            "title": "Studio Apartments",
            "subtitle": "400-600 sq ft | Developer-ready packages | Bulk pricing available",
            "description": "Smart-enabled studio apartments perfect for developer projects. Pre-wired automation packages that attract modern renters and buyers.",
            "long_description": "Transform your studio apartment development into a smart-enabled project that commands premium pricing. Our developer packages are designed for bulk deployment with consistent quality, fast installation, and proven ROI.",
            "typical_size_range": "400-600 sq ft",
            "typical_features": [
                "Open-plan living area",
                "Compact kitchen",
                "Full bathroom",
                "Balcony (optional)",
                "1-2 residents",
                "Young professionals target market"
            ],
            "tiers": [
                {
                    "tier_level": "basic",
                    "tier_name": "Basic Smart-Ready",
                    "tier_subtitle": "Essential Pre-Wiring",
                    "base_price_aed": 8000,
                    "typical_rooms_count": "Single zone",
                    "lighting_features": [
                        "Smart LED bulbs (6-8 units)",
                        "Single-room scene control",
                        "Mobile app control",
                        "Voice control ready (Alexa/Google)",
                        "Scheduled on/off"
                    ],
                    "climate_features": [
                        "Smart thermostat (1 unit)",
                        "Scheduling & remote control",
                        "Energy monitoring"
                    ],
                    "security_features": [
                        "Smart door lock",
                        "Door sensor",
                        "Mobile alerts"
                    ],
                    "entertainment_features": [
                        "WiFi 5 mesh node",
                        "TV streaming integration"
                    ],
                    "additional_features": [
                        "Basic home hub (Echo/Google Home)",
                        "Central control app",
                        "Developer installation support",
                        "1-year warranty"
                    ],
                    "included_specialty_count": 0,
                    "support_level": "Standard Support",
                    "recommended": False,
                    "bulk_discount": "10% off for 20+ units, 15% off for 50+ units"
                },
                {
                    "tier_level": "standard",
                    "tier_name": "Standard Smart-Enabled",
                    "tier_subtitle": "Complete Automation",
                    "base_price_aed": 15000,
                    "typical_rooms_count": "Full apartment",
                    "lighting_features": [
                        "Smart dimmers & switches (8-10 units)",
                        "Multi-scene control",
                        "Presence detection",
                        "Circadian-friendly scheduling",
                        "Voice control integrated"
                    ],
                    "climate_features": [
                        "Smart thermostat with learning",
                        "Occupancy-based control",
                        "Energy reports & optimization",
                        "Remote control via app"
                    ],
                    "security_features": [
                        "Smart door lock with keypad",
                        "Door & window sensors (3 units)",
                        "HD security camera (1 unit)",
                        "Motion detection",
                        "Building intercom integration"
                    ],
                    "entertainment_features": [
                        "WiFi 6 mesh system",
                        "Multi-room audio capability",
                        "Streaming device integration",
                        "Bluetooth connectivity"
                    ],
                    "additional_features": [
                        "Voice assistants (Alexa & Google)",
                        "Motorized blinds (2 windows)",
                        "Smart plugs (4 units)",
                        "Unified control app",
                        "Professional installation",
                        "2-year warranty"
                    ],
                    "included_specialty_count": 0,
                    "support_level": "Priority Support",
                    "badge": "Most Popular",
                    "recommended": True,
                    "bulk_discount": "12% off for 20+ units, 18% off for 50+ units"
                },
                {
                    "tier_level": "premium",
                    "tier_name": "Premium Smart Living",
                    "tier_subtitle": "Luxury Studio Experience",
                    "base_price_aed": 25000,
                    "typical_rooms_count": "Complete orchestration",
                    "lighting_features": [
                        "Premium smart dimmers (Lutron/KNX)",
                        "Tunable white LED fixtures",
                        "Architectural lighting design",
                        "Scene automation (Morning, Work, Evening, Night)",
                        "Motion-activated pathway lighting",
                        "Smart ceiling fixtures"
                    ],
                    "climate_features": [
                        "AI smart thermostat",
                        "Air quality monitoring (CO2, VOC)",
                        "Automated fan control",
                        "Sleep optimization",
                        "Energy analytics dashboard"
                    ],
                    "security_features": [
                        "Premium smart lock with biometric",
                        "Door, window, & balcony sensors",
                        "HD security camera with AI (interior)",
                        "Video doorbell integration",
                        "Smart safe integration option",
                        "24/7 monitoring ready"
                    ],
                    "entertainment_features": [
                        "WiFi 6E mesh system",
                        "Premium soundbar or in-ceiling speakers",
                        "Multi-room audio with high-res streaming",
                        "Gaming/streaming optimized network",
                        "Mirror TV option"
                    ],
                    "additional_features": [
                        "Motorized blinds (all windows)",
                        "Smart kitchen appliances integration",
                        "Water leak detection",
                        "Premium voice control (Siri/Alexa/Google)",
                        "Scene automation learning AI",
                        "White-glove installation",
                        "3-year premium warranty",
                        "Quarterly system optimization"
                    ],
                    "included_specialty_count": 0,
                    "support_level": "White-Glove Support",
                    "recommended": False,
                    "bulk_discount": "15% off for 20+ units, 20% off for 50+ units"
                }
            ],
            "hero_image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=85",
            "gallery_images": [],
            "meta_title": "Studio Apartment Smart Home Packages | Developer Solutions",
            "meta_description": "Smart-enabled studio apartments for developers. Basic, Standard, Premium packages starting at AED 8K per unit. Bulk discounts available.",
            "featured": True,
            "display_order": 4,
            "is_developer_package": True,
            "bulk_pricing_available": True
        },
        
        # ===== 1-BEDROOM APARTMENTS =====
        {
            "id": str(uuid4()),
            "slug": "developer-1br-apartments",
            "property_type": "developer-1br",
            "title": "1-Bedroom Apartments",
            "subtitle": "600-900 sq ft | Developer-ready packages | Bulk pricing available",
            "description": "Complete smart home packages for 1BR apartments. Pre-configured systems for consistent developer deployment across multiple units.",
            "long_description": "Ideal for developer projects targeting young professionals and couples. Our 1BR packages deliver consistent automation across your development with streamlined installation and proven market appeal.",
            "typical_size_range": "600-900 sq ft",
            "typical_features": [
                "Bedroom + living area",
                "Full kitchen",
                "Bathroom",
                "Balcony",
                "1-2 residents",
                "Professionals/couples market"
            ],
            "tiers": [
                {
                    "tier_level": "basic",
                    "tier_name": "Basic Smart-Ready",
                    "tier_subtitle": "Essential Pre-Wiring",
                    "base_price_aed": 12000,
                    "typical_rooms_count": "2 zones (bedroom + living)",
                    "lighting_features": ["Smart bulbs (10-12 units)", "2-zone control", "Mobile app", "Voice control", "Scheduling"],
                    "climate_features": ["Smart thermostat", "2-zone control option", "Remote access", "Energy monitoring"],
                    "security_features": ["Smart door lock", "Door sensor", "Window sensor (bedroom)", "Mobile alerts"],
                    "entertainment_features": ["WiFi 5 mesh (2 nodes)", "TV integration", "Streaming setup"],
                    "additional_features": ["Voice hub", "Control app", "Developer support", "1-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Standard",
                    "recommended": False,
                    "bulk_discount": "10% off for 20+ units, 15% off for 50+ units"
                },
                {
                    "tier_level": "standard",
                    "tier_name": "Standard Smart-Enabled",
                    "tier_subtitle": "Complete Automation",
                    "base_price_aed": 22000,
                    "typical_rooms_count": "Full apartment",
                    "lighting_features": ["Smart switches (12-15 units)", "Multi-scene control", "Presence detection", "Circadian rhythm", "Voice control"],
                    "climate_features": ["Learning thermostat", "Occupancy-based control", "Energy optimization", "Remote control", "2-zone independent"],
                    "security_features": ["Premium smart lock", "All door/window sensors (4 units)", "HD camera (interior)", "Motion detection", "Intercom integration"],
                    "entertainment_features": ["WiFi 6 mesh", "Whole-home audio (2 zones)", "Streaming integration", "Bluetooth speakers"],
                    "additional_features": ["Motorized blinds (3 windows)", "Smart plugs (6 units)", "Unified app", "Professional install", "2-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Priority",
                    "badge": "Most Popular",
                    "recommended": True,
                    "bulk_discount": "12% off for 20+ units, 18% off for 50+ units"
                },
                {
                    "tier_level": "premium",
                    "tier_name": "Premium Smart Living",
                    "tier_subtitle": "Luxury 1BR Experience",
                    "base_price_aed": 40000,
                    "typical_rooms_count": "Complete luxury automation",
                    "lighting_features": ["Premium switches (Lutron)", "Tunable white LEDs", "Architectural design", "Advanced scenes", "Motion automation", "Balcony lighting"],
                    "climate_features": ["AI thermostat", "Air quality monitoring", "Multi-zone precision", "Sleep optimization", "Analytics dashboard"],
                    "security_features": ["Biometric lock", "All sensors (6 units)", "2 HD AI cameras", "Video doorbell", "Smart safe ready", "24/7 monitoring"],
                    "entertainment_features": ["WiFi 6E mesh", "Premium audio system", "High-res streaming", "Mirror TV option", "Gaming optimized"],
                    "additional_features": ["Motorized blinds (all windows)", "Smart appliances", "Water leak detection", "Premium voice control", "AI learning", "3-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "White-Glove",
                    "recommended": False,
                    "bulk_discount": "15% off for 20+ units, 22% off for 50+ units"
                }
            ],
            "hero_image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=85",
            "gallery_images": [],
            "meta_title": "1BR Apartment Smart Home Packages | Developer Solutions",
            "meta_description": "Smart-enabled 1BR apartments for developers. Basic, Standard, Premium packages starting at AED 12K per unit.",
            "featured": True,
            "display_order": 5,
            "is_developer_package": True,
            "bulk_pricing_available": True
        },
        
        # ===== 2-BEDROOM APARTMENTS =====
        {
            "id": str(uuid4()),
            "slug": "developer-2br-apartments",
            "property_type": "developer-2br",
            "title": "2-Bedroom Apartments",
            "subtitle": "900-1,400 sq ft | Developer-ready packages | Bulk pricing available",
            "description": "Smart home automation for 2BR apartments. Ideal for families and developers seeking premium smart-enabled units.",
            "long_description": "Perfect for family-oriented developments. Our 2BR packages provide comprehensive automation across multiple rooms with independent zone control, enhanced security, and family-friendly features.",
            "typical_size_range": "900-1,400 sq ft",
            "typical_features": [
                "2 bedrooms + living area",
                "Full kitchen & dining",
                "2 bathrooms",
                "Balcony",
                "2-4 residents",
                "Family market"
            ],
            "tiers": [
                {
                    "tier_level": "basic",
                    "tier_name": "Basic Smart-Ready",
                    "tier_subtitle": "Essential Pre-Wiring",
                    "base_price_aed": 18000,
                    "typical_rooms_count": "3 zones",
                    "lighting_features": ["Smart bulbs (15-18 units)", "3-zone control", "Mobile app", "Voice control", "Scheduling", "Night mode"],
                    "climate_features": ["Smart thermostat", "3-zone capability", "Remote access", "Energy monitoring", "Scheduling"],
                    "security_features": ["Smart lock", "Door sensor", "Window sensors (2 bedrooms)", "Motion detector", "Mobile alerts"],
                    "entertainment_features": ["WiFi 5 mesh (3 nodes)", "TV integration", "Streaming setup", "Kids content filtering"],
                    "additional_features": ["Voice hub", "Control app", "Smart plugs (4 units)", "Developer support", "1-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Standard",
                    "recommended": False,
                    "bulk_discount": "10% off for 20+ units, 15% off for 50+ units"
                },
                {
                    "tier_level": "standard",
                    "tier_name": "Standard Smart-Enabled",
                    "tier_subtitle": "Complete Family Automation",
                    "base_price_aed": 35000,
                    "typical_rooms_count": "Full apartment",
                    "lighting_features": ["Smart switches (18-22 units)", "Multi-room scenes", "Presence detection", "Circadian rhythm", "Kids room controls", "Balcony automation"],
                    "climate_features": ["Learning thermostat", "3-zone independent control", "Occupancy-based", "Energy optimization", "Mobile app", "Geofencing"],
                    "security_features": ["Premium smart lock", "All door/window sensors (6 units)", "2 HD cameras", "Motion detectors", "Video intercom", "Building integration"],
                    "entertainment_features": ["WiFi 6 mesh", "3-zone audio system", "Streaming integration", "Kids room audio", "Balcony speakers"],
                    "additional_features": ["Motorized blinds (4 windows)", "Smart plugs (8 units)", "Kitchen appliance integration", "Unified app", "Professional install", "2-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Priority",
                    "badge": "Most Popular",
                    "recommended": True,
                    "bulk_discount": "12% off for 20+ units, 18% off for 50+ units"
                },
                {
                    "tier_level": "premium",
                    "tier_name": "Premium Family Smart Home",
                    "tier_subtitle": "Luxury 2BR Experience",
                    "base_price_aed": 60000,
                    "typical_rooms_count": "Complete luxury automation",
                    "lighting_features": ["Premium switches (Lutron)", "Tunable white all rooms", "Architectural design", "Advanced scenes", "Motion automation", "Night pathways", "Balcony scenes"],
                    "climate_features": ["AI learning thermostat", "4-zone precision (rooms + living)", "Air quality monitoring", "Sleep optimization", "Kids room climate", "Analytics"],
                    "security_features": ["Biometric lock", "All sensors (8 units)", "3 AI cameras", "Video doorbell", "Smart safe", "Kids room monitoring", "24/7 ready"],
                    "entertainment_features": ["WiFi 6E mesh", "Premium audio (4 zones)", "Kids entertainment system", "High-res streaming", "Gaming optimized", "Balcony entertainment"],
                    "additional_features": ["Motorized blinds (all windows)", "Smart kitchen appliances", "Water leak detection", "Premium voice control", "AI learning", "Kids safety features", "3-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "White-Glove",
                    "recommended": False,
                    "bulk_discount": "15% off for 20+ units, 22% off for 50+ units"
                }
            ],
            "hero_image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=85",
            "gallery_images": [],
            "meta_title": "2BR Apartment Smart Home Packages | Developer Solutions",
            "meta_description": "Smart-enabled 2BR apartments for developers. Basic, Standard, Premium packages starting at AED 18K per unit.",
            "featured": True,
            "display_order": 6,
            "is_developer_package": True,
            "bulk_pricing_available": True
        },
        
        # ===== 3-BEDROOM APARTMENTS =====
        {
            "id": str(uuid4()),
            "slug": "developer-3br-apartments",
            "property_type": "developer-3br",
            "title": "3-Bedroom Apartments",
            "subtitle": "1,400-2,000 sq ft | Developer-ready packages | Bulk pricing available",
            "description": "Comprehensive smart home automation for spacious 3BR family apartments. Premium market positioning for developers.",
            "long_description": "Target the premium family market with fully automated 3BR apartments. Our packages deliver complete home automation with family-friendly features, multi-zone control, and impressive market differentiation.",
            "typical_size_range": "1,400-2,000 sq ft",
            "typical_features": [
                "3 bedrooms + living/dining",
                "Full kitchen",
                "2-3 bathrooms",
                "Maid's room option",
                "Balcony/terrace",
                "3-5 residents",
                "Family market"
            ],
            "tiers": [
                {
                    "tier_level": "basic",
                    "tier_name": "Basic Smart-Ready",
                    "tier_subtitle": "Essential Pre-Wiring",
                    "base_price_aed": 28000,
                    "typical_rooms_count": "4 zones",
                    "lighting_features": ["Smart bulbs (20-25 units)", "4-zone control", "Mobile app", "Voice control", "Scheduling", "Kids room controls"],
                    "climate_features": ["Smart thermostat", "4-zone capability", "Remote control", "Energy monitoring", "Family scheduling"],
                    "security_features": ["Smart lock", "Door sensor", "Window sensors (3 bedrooms)", "Motion detector", "Balcony sensor", "Mobile alerts"],
                    "entertainment_features": ["WiFi 5 mesh (4 nodes)", "TV integration (2 rooms)", "Streaming setup", "Kids content filtering"],
                    "additional_features": ["Voice hub", "Control app", "Smart plugs (6 units)", "Developer support", "1-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Standard",
                    "recommended": False,
                    "bulk_discount": "10% off for 20+ units, 15% off for 50+ units"
                },
                {
                    "tier_level": "standard",
                    "tier_name": "Standard Smart-Enabled",
                    "tier_subtitle": "Complete Family Automation",
                    "base_price_aed": 55000,
                    "typical_rooms_count": "Full apartment",
                    "lighting_features": ["Smart switches (25-30 units)", "Room-specific scenes", "Presence detection", "Circadian rhythm", "Kids room automation", "Balcony lighting"],
                    "climate_features": ["Learning thermostat", "4-zone independent", "Occupancy-based", "Energy optimization", "Family profiles", "Sleep scheduling"],
                    "security_features": ["Premium lock", "All sensors (10 units)", "3 HD cameras", "Motion detectors (2 units)", "Video intercom", "Kids room monitoring", "Building integration"],
                    "entertainment_features": ["WiFi 6 mesh", "4-zone audio system", "Master bedroom + kids rooms + living", "Streaming integration", "Parental controls"],
                    "additional_features": ["Motorized blinds (6 windows)", "Smart plugs (12 units)", "Kitchen appliances", "Bathroom mirror defogging", "Professional install", "2-year warranty"],
                    "included_specialty_count": 0,
                    "support_level": "Priority",
                    "badge": "Most Popular",
                    "recommended": True,
                    "bulk_discount": "12% off for 20+ units, 20% off for 50+ units"
                },
                {
                    "tier_level": "premium",
                    "tier_name": "Premium Family Smart Home",
                    "tier_subtitle": "Luxury 3BR Experience",
                    "base_price_aed": 95000,
                    "typical_rooms_count": "Complete orchestration",
                    "lighting_features": ["Premium switches (Lutron)", "Tunable white all rooms", "Architectural design", "Advanced scenes", "Motion automation everywhere", "Master suite luxury lighting", "Kids room smart controls"],
                    "climate_features": ["AI thermostat", "5-zone precision (each bedroom + living + kitchen)", "Air quality monitoring", "Sleep optimization all rooms", "Kids climate control", "Analytics dashboard"],
                    "security_features": ["Biometric lock", "All sensors (12+ units)", "4 AI cameras", "Video doorbell", "Kids room safety monitoring", "Smart safe", "Perimeter protection", "24/7 monitoring"],
                    "entertainment_features": ["WiFi 6E mesh", "Premium 5-zone audio", "Master suite + kids rooms + living + kitchen + balcony", "High-res streaming", "Gaming optimized", "Kids entertainment system", "Mirror TV options"],
                    "additional_features": ["Motorized blinds (all windows)", "Smart kitchen (full integration)", "Water leak detection (all bathrooms)", "Premium voice control", "AI learning", "Kids safety automation", "Maid room integration", "3-year premium warranty"],
                    "included_specialty_count": 0,
                    "support_level": "White-Glove",
                    "recommended": False,
                    "bulk_discount": "15% off for 20+ units, 25% off for 50+ units"
                }
            ],
            "hero_image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=85",
            "gallery_images": [],
            "meta_title": "3BR Apartment Smart Home Packages | Developer Solutions",
            "meta_description": "Smart-enabled 3BR family apartments for developers. Basic, Standard, Premium packages starting at AED 28K per unit.",
            "featured": True,
            "display_order": 7,
            "is_developer_package": True,
            "bulk_pricing_available": True
        }
    ]
    
    # Insert/update each package
    for pkg in developer_packages:
        existing = await db.property_packages.find_one({"slug": pkg["slug"]})
        if existing:
            await db.property_packages.update_one(
                {"slug": pkg["slug"]},
                {"$set": pkg}
            )
            print(f"✅ Updated: {pkg['title']}")
        else:
            await db.property_packages.insert_one(pkg)
            print(f"✅ Created: {pkg['title']}")
    
    # Summary
    print("\n📊 Developer Apartment Packages Summary:")
    print("   Studio: AED 8K-25K per unit")
    print("   1BR: AED 12K-40K per unit")
    print("   2BR: AED 18K-60K per unit")
    print("   3BR: AED 28K-95K per unit")
    print("\n💰 Bulk Discounts: 10-25% off for 20-50+ units")
    
    total = await db.property_packages.count_documents({})
    print(f"\n📈 Total property packages in system: {total}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_developer_apartment_packages())

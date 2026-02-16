"""
Seed Additional Specialty Rooms (High Priority for Dubai/UAE Market)
7 premium solutions: Luxury Garage, Smart Closet, Prayer Room, Cigar Lounge, 
Home Library, Photography Studio, Rooftop Terrace
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_premium_specialty_rooms():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    solutions_collection = db.solutions
    
    premium_rooms = [
        {
            "id": str(uuid4()),
            "slug": "luxury-garage-car-showcase",
            "title": "Luxury Garage & Car Showcase Automation",
            "category": "Luxury",
            "description": "Premium car display with turntable platforms, precision lighting, climate control, and security integration for automotive collectors",
            "long_description": "Transform your garage into a world-class automotive showroom. Our luxury garage automation features motorized turntable displays, museum-quality LED lighting with adjustable color temperature, climate control to preserve vehicle condition, security cameras and sensors, automated doors, and optional glass walls for viewing from inside the home. Perfect for car collectors in Emirates Hills, Palm Jumeirah, and luxury villas across UAE.",
            "meta_description": "Luxury garage automation in Dubai: turntable displays, precision lighting, climate control, and security for car collectors. Transform your garage into an automotive showroom.",
            "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=85",
            "features": [
                "Motorized turntable display platforms",
                "Museum-quality LED lighting with adjustable color temperature",
                "Climate control (20-25°C, low humidity to prevent corrosion)",
                "HD security cameras with night vision",
                "Automated garage door openers",
                "Floor heating & cooling systems",
                "Air filtration to prevent dust accumulation",
                "Glass wall lighting for interior viewing",
                "Battery tender integration for stored vehicles",
                "Mobile app monitoring & control",
                "Motion sensor activation",
                "Integration with home security system"
            ],
            "brands": ["Lutron", "Control4", "Hikvision", "Custom Turntable Systems"],
            "tags": ["luxury", "garage", "car-showcase", "automotive", "collector"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 7,
            "badge": "Luxury",
            "popular": True
        },
        {
            "id": str(uuid4()),
            "slug": "smart-walk-in-closet",
            "title": "Smart Walk-In Closet & Wardrobe Automation",
            "category": "Luxury",
            "description": "Intelligent wardrobe management with automated lighting, climate control, outfit suggestions, jewelry displays, and inventory tracking",
            "long_description": "Elevate your daily routine with a smart walk-in closet. Features include motion-activated LED lighting with color rendering for true fabric colors, climate control to protect delicate fabrics and leather, motorized tie/belt racks, illuminated jewelry displays with security sensors, automated shoe carousel, digital wardrobe inventory with outfit suggestion apps, and full-length smart mirrors with integrated displays. Essential for luxury master suites in Dubai penthouses and villas.",
            "meta_description": "Smart walk-in closet automation in Dubai: climate control, automated lighting, outfit suggestions, and jewelry displays. Luxury wardrobe management for UAE homes.",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85",
            "features": [
                "Motion-activated LED lighting with high CRI (95+)",
                "Climate control (18-22°C, 45-55% humidity)",
                "Motorized tie, belt & accessory racks",
                "Illuminated jewelry display cases with sensors",
                "Automated shoe carousel systems",
                "Digital wardrobe inventory tracking",
                "Outfit suggestion app integration",
                "Full-length smart mirrors with displays",
                "Drawer & safe lighting automation",
                "Fabric & leather preservation monitoring",
                "Security sensors for high-value items",
                "Integration with home automation system"
            ],
            "brands": ["Lutron", "Rev-A-Shelf", "Custom Closet Systems", "Smart Mirror Tech"],
            "tags": ["luxury", "closet", "wardrobe", "fashion", "automation"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 8,
            "badge": "Luxury"
        },
        {
            "id": str(uuid4()),
            "slug": "prayer-room-automation",
            "title": "Prayer Room Automation",
            "category": "Wellness",
            "description": "Culturally sensitive automation with Qibla direction lighting, automated prayer time reminders, ablution monitoring, and Islamic ambience",
            "long_description": "Create a serene space for worship with intelligent prayer room automation. Features include Qibla direction indicator lighting, automated prayer time notifications (Adhan reminders), ablution area monitoring with water temperature control, Islamic calligraphy projection, recitation audio integration, prayer mat sensors, and customizable lighting scenes for different times of day. Designed for Muslim families across UAE, respecting Islamic traditions while incorporating modern convenience.",
            "meta_description": "Smart prayer room automation in UAE: Qibla direction lighting, automated prayer time reminders, ablution monitoring. Culturally sensitive automation for Muslim homes in Dubai.",
            "image": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=85",
            "features": [
                "Qibla direction indicator lighting",
                "Automated prayer time notifications (5 daily prayers)",
                "Customizable Adhan audio alerts",
                "Ablution area water temperature control",
                "Islamic calligraphy projection lighting",
                "Quran recitation audio integration",
                "Prayer mat presence sensors",
                "Dimmable ambient lighting scenes",
                "Fragrance diffusion (oud, musk)",
                "Do Not Disturb mode during prayer",
                "Islamic calendar integration (Ramadan timings)",
                "Voice control in Arabic"
            ],
            "brands": ["Custom Islamic Tech Solutions", "Lutron", "Sonos"],
            "tags": ["prayer", "islamic", "wellness", "cultural", "spiritual"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 9,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "cigar-lounge-automation",
            "title": "Cigar Lounge & Smoking Room Automation",
            "category": "Luxury",
            "description": "Premium cigar lounge with intelligent ventilation, humidity control, mood lighting, humidor monitoring, and air purification",
            "long_description": "Indulge in the art of cigar appreciation with a fully automated lounge. Features include commercial-grade ventilation systems that exhaust smoke while maintaining negative pressure, precision humidor climate control (65-70% humidity, 18-21°C), mood lighting with dimming and color scenes, automated seating with heating, cigar cutter and lighter stations with lighting, and air purification to prevent odor transfer to other rooms. Perfect for luxury villas in Emirates Hills, Arabian Ranches, and exclusive communities.",
            "meta_description": "Luxury cigar lounge automation in Dubai: intelligent ventilation, humidity control, mood lighting, and humidor monitoring. Premium smoking room for UAE villas.",
            "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=85",
            "features": [
                "Commercial-grade ventilation & exhaust systems",
                "Precision humidity control (65-70% for humidor)",
                "Temperature control (18-21°C)",
                "Negative pressure system to prevent odor spread",
                "Mood lighting with dimming & color scenes",
                "Automated leather seating with heating",
                "Humidor monitoring with alerts",
                "Air purification & filtration",
                "Cigar station lighting (cutting, lighting areas)",
                "Audio system integration",
                "Occupancy-based ventilation adjustment",
                "Mobile app control & monitoring"
            ],
            "brands": ["Lutron", "Plasma Air", "Elie Bleu Humidors", "Custom Ventilation"],
            "tags": ["cigar", "lounge", "luxury", "ventilation", "smoking"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 10,
            "badge": "Luxury"
        },
        {
            "id": str(uuid4()),
            "slug": "home-library-study-automation",
            "title": "Home Library & Study Automation",
            "category": "Lifestyle",
            "description": "Intelligent library management with bookshelf lighting, reading scenes, climate control, rare book preservation, and security monitoring",
            "long_description": "Create the perfect environment for reading and reflection. Our home library automation features adjustable bookshelf lighting with museum-quality LEDs, reading zones with tunable white light for different times of day, climate control to preserve rare books and manuscripts, motorized sliding ladders, security sensors for valuable collections, and integration with digital cataloging systems. Different from an executive office—this is your personal sanctuary for literature, learning, and leisure.",
            "meta_description": "Smart home library automation in Dubai: bookshelf lighting, reading scenes, climate control, and rare book preservation. Intelligent study room for UAE luxury homes.",
            "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=85",
            "features": [
                "Adjustable bookshelf LED lighting (no UV damage)",
                "Reading zone tunable white light (3000K-5000K)",
                "Climate control (18-22°C, 45-55% humidity for preservation)",
                "Motorized sliding ladder systems",
                "Security sensors for rare book sections",
                "Digital cataloging system integration",
                "Multiple reading scene presets",
                "Focused task lighting for desks",
                "Ambient indirect lighting for ambience",
                "Do Not Disturb mode integration",
                "Smart window shades to prevent sun damage",
                "Mobile app control"
            ],
            "brands": ["Lutron", "Ketra", "Custom Library Systems", "Rare Book Preservation"],
            "tags": ["library", "study", "reading", "books", "luxury"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 11
        },
        {
            "id": str(uuid4()),
            "slug": "photography-content-studio",
            "title": "Photography & Content Studio Automation",
            "category": "Entertainment",
            "description": "Professional photography space with automated lighting rigs, backdrop systems, equipment climate control, and remote camera control",
            "long_description": "Build your dream photography studio at home. Features include motorized lighting rigs with DMX control for precise positioning, automated backdrop roller systems (multiple backgrounds), climate-controlled equipment storage (cameras, lenses sensitive to humidity), color-calibrated monitor displays, green screen automation, remote camera triggering systems, and cloud storage integration. Perfect for professional photographers, content creators, influencers, and e-commerce product photography in Dubai's thriving digital content market.",
            "meta_description": "Professional photography studio automation in Dubai: automated lighting rigs, backdrop systems, climate control, and remote camera control. Perfect for content creators in UAE.",
            "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=85",
            "features": [
                "Motorized lighting rigs with DMX control",
                "Automated backdrop roller systems (5+ backgrounds)",
                "Climate-controlled equipment storage (45-55% humidity)",
                "Color-calibrated monitor displays",
                "Green screen & chroma key automation",
                "Remote camera triggering systems",
                "Studio flash sync integration",
                "Automated reflector positioning",
                "Cloud storage integration (Adobe Creative Cloud)",
                "Equipment inventory tracking",
                "Scene preset saves (portrait, product, fashion)",
                "Mobile app control"
            ],
            "brands": ["Profoto", "Manfrotto", "Elinchrom", "Custom DMX Systems"],
            "tags": ["photography", "studio", "content-creation", "professional", "automation"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 12,
            "badge": "Trending",
            "popular": True
        },
        {
            "id": str(uuid4()),
            "slug": "rooftop-terrace-automation",
            "title": "Rooftop Terrace & Sky Lounge Automation",
            "category": "Outdoor Living",
            "description": "Intelligent outdoor living with automated heaters, misters, retractable covers, entertainment systems, and weather-responsive controls",
            "long_description": "Maximize your rooftop living in Dubai's perfect climate. Features include infrared heaters for winter evenings, misting systems for summer cooling (reduce temperature by 10°C), motorized retractable pergolas and awnings, weather sensors that automatically close covers during wind/rain, outdoor entertainment systems with weatherproof speakers and TVs, mood lighting with color scenes, and smart irrigation for rooftop gardens. Essential for Dubai apartments, penthouses, and modern villas where rooftop space is prime real estate.",
            "meta_description": "Rooftop terrace automation in Dubai: automated heaters, misters, retractable covers, and weather-responsive controls. Smart outdoor living for UAE penthouses and apartments.",
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85",
            "features": [
                "Infrared heaters for winter evenings",
                "Misting systems for summer cooling (10°C reduction)",
                "Motorized retractable pergolas & awnings",
                "Weather sensors (wind, rain, temperature)",
                "Automated cover deployment in bad weather",
                "Outdoor weatherproof entertainment systems",
                "Weatherproof 4K TV with auto-brightness",
                "LED mood lighting with color scenes",
                "Outdoor kitchen appliance integration",
                "Smart irrigation for rooftop gardens",
                "Fire pit & fireplace automation",
                "Voice control integration"
            ],
            "brands": ["Sunbrella", "Big Ass Fans", "Outdoor AV Specialists", "Lutron"],
            "tags": ["rooftop", "terrace", "outdoor", "penthouse", "sky-lounge"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 13,
            "featured": True,
            "popular": True
        }
    ]
    
    # Insert all new solutions
    result = await solutions_collection.insert_many(premium_rooms)
    print(f"✅ Successfully added {len(result.inserted_ids)} premium specialty rooms:")
    
    for solution in premium_rooms:
        print(f"   - {solution['title']} ({solution['slug']})")
    
    # Print summary by category
    print("\n📊 Summary by Category:")
    categories = {}
    for sol in premium_rooms:
        cat = sol['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    for cat, count in sorted(categories.items()):
        print(f"   {cat}: {count} solutions")
    
    print(f"\n🎯 Total solutions in database: {await solutions_collection.count_documents({})}")
    
    client.close()


if __name__ == "__main__":
    print("🚀 Seeding premium specialty rooms (Dubai/UAE focused)...")
    asyncio.run(seed_premium_specialty_rooms())
    print("✨ Seeding complete!")

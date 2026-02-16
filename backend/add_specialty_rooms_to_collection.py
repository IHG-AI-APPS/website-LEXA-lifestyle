"""
Add 7 Premium Specialty Rooms to specialty_rooms collection
These will appear on /specialty-rooms page
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def add_specialty_rooms():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    specialty_rooms = db.specialty_rooms
    
    new_rooms = [
        {
            "id": str(uuid4()),
            "slug": "luxury-garage-car-showcase",
            "name": "Luxury Garage & Car Showcase",
            "category": "Luxury Amenities",
            "description": "Premium car display with turntable platforms, precision lighting, climate control, and security integration for automotive collectors",
            "long_description": "Transform your garage into a world-class automotive showroom with motorized turntable displays, museum-quality LED lighting, climate control to preserve vehicle condition, HD security cameras, automated doors, and optional glass walls for viewing from inside the home. Perfect for car collectors in Emirates Hills and Palm Jumeirah.",
            "typical_size": "500-2000 sq ft",
            "base_price_aed": 45000,
            "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=85",
            "features": [
                "Motorized turntable display platforms",
                "Museum-quality LED lighting (adjustable color temp)",
                "Climate control (20-25°C, low humidity)",
                "HD security cameras with night vision",
                "Automated garage door openers",
                "Floor heating & cooling systems",
                "Air filtration (dust prevention)",
                "Glass wall lighting for interior viewing",
                "Battery tender integration",
                "Mobile app monitoring & control"
            ],
            "typical_components": [
                "Turntable platform system",
                "Lutron lighting control",
                "HVAC with humidity monitoring",
                "Hikvision 4K security cameras",
                "Control4 automation integration"
            ],
            "integration_with": ["Security Systems", "Climate Control", "Lighting Automation", "Smart Home"],
            "tags": ["luxury", "garage", "car-showcase", "automotive", "collector"]
        },
        {
            "id": str(uuid4()),
            "slug": "smart-walk-in-closet",
            "name": "Smart Walk-In Closet & Wardrobe",
            "category": "Luxury Living",
            "description": "Intelligent wardrobe management with automated lighting, climate control, outfit suggestions, jewelry displays, and inventory tracking",
            "long_description": "Elevate your daily routine with motion-activated LED lighting, climate control for delicate fabrics, motorized tie/belt racks, illuminated jewelry displays with security sensors, automated shoe carousel, digital wardrobe inventory, and full-length smart mirrors. Essential for luxury master suites.",
            "typical_size": "200-800 sq ft",
            "base_price_aed": 35000,
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85",
            "features": [
                "Motion-activated LED lighting (CRI 95+)",
                "Climate control (18-22°C, 45-55% humidity)",
                "Motorized tie, belt & accessory racks",
                "Illuminated jewelry display cases",
                "Automated shoe carousel systems",
                "Digital wardrobe inventory tracking",
                "Outfit suggestion app integration",
                "Full-length smart mirrors",
                "Drawer & safe lighting automation",
                "Security sensors for high-value items"
            ],
            "typical_components": [
                "Lutron lighting & shading",
                "Smart closet hardware systems",
                "Climate monitoring sensors",
                "Smart mirror displays",
                "Motorized accessory systems"
            ],
            "integration_with": ["Lighting Automation", "Climate Control", "Security Systems", "Smart Home"],
            "tags": ["luxury", "closet", "wardrobe", "fashion", "automation"]
        },
        {
            "id": str(uuid4()),
            "slug": "prayer-room-automation",
            "name": "Prayer Room Automation",
            "category": "Wellness",
            "description": "Culturally sensitive automation with Qibla direction lighting, automated prayer time reminders, ablution monitoring, and Islamic ambience",
            "long_description": "Create a serene worship space with Qibla direction indicator lighting, automated prayer time notifications, ablution area water temperature control, Islamic calligraphy projection, Quran recitation audio, prayer mat sensors, and customizable lighting scenes. Designed for Muslim families across UAE.",
            "typical_size": "100-300 sq ft",
            "base_price_aed": 22000,
            "image": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=85",
            "features": [
                "Qibla direction indicator lighting",
                "Automated prayer time notifications (5 daily)",
                "Customizable Adhan audio alerts",
                "Ablution area water temperature control",
                "Islamic calligraphy projection lighting",
                "Quran recitation audio integration",
                "Prayer mat presence sensors",
                "Dimmable ambient lighting scenes",
                "Fragrance diffusion (oud, musk)",
                "Do Not Disturb mode during prayer"
            ],
            "typical_components": [
                "Custom lighting control system",
                "Sonos or similar audio system",
                "Smart water temperature valves",
                "Occupancy sensors",
                "Fragrance diffusion system"
            ],
            "integration_with": ["Lighting Automation", "Audio Systems", "Smart Home", "Climate Control"],
            "tags": ["prayer", "islamic", "wellness", "cultural", "spiritual"]
        },
        {
            "id": str(uuid4()),
            "slug": "cigar-lounge-automation",
            "name": "Cigar Lounge & Smoking Room",
            "category": "Luxury Amenities",
            "description": "Premium cigar lounge with intelligent ventilation, humidity control, mood lighting, humidor monitoring, and air purification",
            "long_description": "Indulge in the art of cigar appreciation with commercial-grade ventilation, precision humidor climate control (65-70% humidity), mood lighting, automated leather seating with heating, and air purification to prevent odor transfer. Perfect for luxury villas in Emirates Hills and Arabian Ranches.",
            "typical_size": "200-500 sq ft",
            "base_price_aed": 48000,
            "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=85",
            "features": [
                "Commercial-grade ventilation & exhaust",
                "Precision humidity control (65-70%)",
                "Temperature control (18-21°C)",
                "Negative pressure system",
                "Mood lighting with dimming & color scenes",
                "Automated leather seating with heating",
                "Humidor monitoring with alerts",
                "Air purification & filtration",
                "Cigar station lighting",
                "Audio system integration"
            ],
            "typical_components": [
                "Custom HVAC with exhaust",
                "Lutron lighting control",
                "Humidor monitoring system",
                "Air purification system",
                "Automated seating controls"
            ],
            "integration_with": ["Climate Control", "Lighting Automation", "Audio Systems", "Smart Home"],
            "tags": ["cigar", "lounge", "luxury", "ventilation", "smoking"]
        },
        {
            "id": str(uuid4()),
            "slug": "home-library-study",
            "name": "Home Library & Study",
            "category": "Productivity",
            "description": "Intelligent library management with bookshelf lighting, reading scenes, climate control, rare book preservation, and security monitoring",
            "long_description": "Create the perfect reading environment with adjustable bookshelf lighting, reading zones with tunable white light, climate control for rare book preservation, motorized sliding ladders, security sensors, and integration with digital cataloging systems. Your personal sanctuary for literature and learning.",
            "typical_size": "200-800 sq ft",
            "base_price_aed": 38000,
            "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=85",
            "features": [
                "Adjustable bookshelf LED lighting (no UV)",
                "Reading zone tunable white light",
                "Climate control for preservation",
                "Motorized sliding ladder systems",
                "Security sensors for rare books",
                "Digital cataloging integration",
                "Multiple reading scene presets",
                "Focused task lighting for desks",
                "Do Not Disturb mode integration",
                "Smart shades (prevent sun damage)"
            ],
            "typical_components": [
                "Lutron or Ketra lighting",
                "Climate monitoring system",
                "Motorized ladder hardware",
                "Security sensors",
                "Smart window shading"
            ],
            "integration_with": ["Lighting Automation", "Climate Control", "Security Systems", "Smart Home"],
            "tags": ["library", "study", "reading", "books", "preservation"]
        },
        {
            "id": str(uuid4()),
            "slug": "photography-content-studio",
            "name": "Photography & Content Studio",
            "category": "Entertainment",
            "description": "Professional photography space with automated lighting rigs, backdrop systems, equipment climate control, and remote camera control",
            "long_description": "Build your dream photography studio with motorized lighting rigs with DMX control, automated backdrop roller systems, climate-controlled equipment storage, color-calibrated monitors, green screen automation, and cloud storage integration. Perfect for professional photographers, content creators, and influencers in Dubai.",
            "typical_size": "300-1000 sq ft",
            "base_price_aed": 52000,
            "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=85",
            "features": [
                "Motorized lighting rigs with DMX control",
                "Automated backdrop roller (5+ backgrounds)",
                "Climate-controlled equipment storage",
                "Color-calibrated monitor displays",
                "Green screen & chroma key automation",
                "Remote camera triggering systems",
                "Studio flash sync integration",
                "Automated reflector positioning",
                "Cloud storage integration",
                "Scene preset saves"
            ],
            "typical_components": [
                "Profoto or Elinchrom lighting",
                "Manfrotto motorized systems",
                "DMX lighting control",
                "Climate monitoring",
                "Remote camera triggers"
            ],
            "integration_with": ["Lighting Automation", "Climate Control", "Smart Home", "Network Infrastructure"],
            "tags": ["photography", "studio", "content-creation", "professional", "dmx"]
        },
        {
            "id": str(uuid4()),
            "slug": "rooftop-terrace-lounge",
            "name": "Rooftop Terrace & Sky Lounge",
            "category": "Outdoor Living",
            "description": "Intelligent outdoor living with automated heaters, misters, retractable covers, entertainment systems, and weather-responsive controls",
            "long_description": "Maximize your rooftop living with infrared heaters for winter, misting systems for summer cooling (reduce temp by 10°C), motorized retractable pergolas, weather sensors, outdoor entertainment systems, mood lighting, and smart irrigation. Essential for Dubai apartments, penthouses, and modern villas.",
            "typical_size": "400-2000 sq ft",
            "base_price_aed": 58000,
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85",
            "features": [
                "Infrared heaters for winter evenings",
                "Misting systems (10°C temp reduction)",
                "Motorized retractable pergolas & awnings",
                "Weather sensors (wind, rain, temp)",
                "Automated cover deployment",
                "Outdoor weatherproof entertainment",
                "Weatherproof 4K TV with auto-brightness",
                "LED mood lighting with color scenes",
                "Outdoor kitchen integration",
                "Smart irrigation for rooftop gardens"
            ],
            "typical_components": [
                "Sunbrella motorized systems",
                "Outdoor AV equipment",
                "Weather monitoring sensors",
                "Lutron outdoor lighting",
                "Misting & heating systems"
            ],
            "integration_with": ["Lighting Automation", "Audio Systems", "Climate Control", "Smart Home"],
            "tags": ["rooftop", "terrace", "outdoor", "penthouse", "sky-lounge"]
        }
    ]
    
    # Insert all new specialty rooms
    result = await specialty_rooms.insert_many(new_rooms)
    print(f"✅ Successfully added {len(result.inserted_ids)} specialty rooms to specialty_rooms collection:")
    
    for room in new_rooms:
        print(f"   - {room['name']} (AED {room['base_price_aed']:,})")
    
    # Print total
    total = await specialty_rooms.count_documents({})
    print(f"\n🎯 Total specialty rooms in collection: {total}")
    
    client.close()


if __name__ == "__main__":
    print("🚀 Adding premium specialty rooms to specialty_rooms collection...")
    asyncio.run(add_specialty_rooms())
    print("✨ Complete!")

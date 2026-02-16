"""
Add 3 Missing High-Intent Specialty Rooms
1. Interactive Media Lounge (casual gaming/streaming/sports)
2. Smart Patio/Outdoor Living (entertainment-focused)
3. Smart Entry/Concierge Foyer (first impression)
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def add_final_specialty_rooms():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Add to both collections
    solutions_collection = db.solutions
    specialty_rooms_collection = db.specialty_rooms
    
    # Data for both collections (solutions collection format)
    solutions_data = [
        {
            "id": str(uuid4()),
            "slug": "interactive-media-lounge",
            "title": "Interactive Media Lounge Automation",
            "category": "Entertainment",
            "description": "Casual entertainment hub with multi-screen gaming, streaming, sports viewing, multi-zone audio, and smart lighting for family and friends",
            "long_description": "Create the ultimate casual entertainment space. More relaxed than a cinema, this media lounge features multiple screens for gaming and streaming, surround sound zones for different activities, automated lighting scenes (movie, gaming, sports, party), voice-controlled media switching, and comfortable casual seating with USB charging. Perfect for families who want a dedicated space for everyday entertainment, game nights, sports viewing parties, and binge-watching sessions. Popular in Dubai villas where families seek versatile entertainment beyond formal home cinemas.",
            "meta_description": "Interactive media lounge automation in Dubai: multi-screen gaming, streaming, sports viewing, and smart controls. Perfect casual entertainment space for UAE villas and apartments.",
            "image": "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=85",
            "features": [
                "Multiple displays for simultaneous viewing",
                "Gaming console integration (PlayStation, Xbox, Nintendo)",
                "Smart streaming hub (Netflix, Disney+, Apple TV)",
                "Multi-zone audio for different activities",
                "Sports mode with stats overlay capability",
                "Automated lighting scenes (movie, game, sports, party)",
                "Voice control for source switching",
                "USB charging stations integrated in seating",
                "Snack bar with beverage fridge automation",
                "Soundproofing to prevent disturbance",
                "Casual comfortable seating with recliners",
                "Mobile app control for all systems"
            ],
            "brands": ["Samsung", "LG", "Sonos", "Control4", "Roku"],
            "tags": ["media-lounge", "gaming", "streaming", "sports", "entertainment", "family"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 14,
            "badge": "Popular",
            "popular": True
        },
        {
            "id": str(uuid4()),
            "slug": "smart-patio-outdoor-entertainment",
            "title": "Smart Patio & Outdoor Entertainment Automation",
            "category": "Outdoor Living",
            "description": "Entertainment-focused outdoor living with multi-zone audio, outdoor cinema, firepit control, weather-responsive lighting, and automated shade systems",
            "long_description": "Transform your patio into a year-round entertainment destination. Features include weatherproof multi-zone audio systems, outdoor cinema projection with motorized screen, automated firepit with safety controls, LED landscape and architectural lighting with color scenes, weather-responsive automation (closes shades during wind, activates misters in heat), outdoor kitchen appliance integration, and comfortable outdoor furniture with heating. Distinct from pool automation—this focuses on creating the ultimate outdoor entertaining space. Essential for Dubai villas where outdoor living is a lifestyle, perfect for hosting gatherings, alfresco dining, and evening relaxation under the stars.",
            "meta_description": "Smart patio and outdoor entertainment automation in Dubai: weatherproof audio, outdoor cinema, firepit control, and weather-responsive systems. Ultimate outdoor living for UAE villas.",
            "image": "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=85",
            "features": [
                "Weatherproof multi-zone audio system",
                "Outdoor cinema with motorized screen & projector",
                "Automated firepit with safety controls",
                "LED landscape & architectural lighting",
                "Color-changing scene presets (dinner, party, romance)",
                "Weather-responsive automation (wind, rain, heat sensors)",
                "Motorized shade & pergola systems",
                "Misting systems for summer cooling",
                "Outdoor heaters for winter comfort",
                "Outdoor kitchen appliance integration",
                "Voice control for all systems",
                "Integration with indoor smart home"
            ],
            "brands": ["Sonance", "Lutron", "Sunbrella", "Bromic", "Seura"],
            "tags": ["patio", "outdoor", "entertainment", "alfresco", "outdoor-cinema", "firepit"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 15,
            "badge": "Trending",
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "smart-entry-concierge-foyer",
            "title": "Smart Entry & Concierge Foyer Automation",
            "category": "Luxury",
            "description": "First impression automation with facial recognition, automated entry sequence, welcome lighting and climate, guest notifications, and concierge-level experience",
            "long_description": "Make a stunning first impression with intelligent entry automation. Features include facial recognition for family members with personalized welcome messages, automated entry sequence (door unlock, lights on, climate adjust, music play), guest detection with host notifications, video intercom with mobile app integration, package detection and alerts, automated shoe cabinet lighting, statement chandelier with arrival lighting scene, and integration with security systems. Perfect for luxury villas in Emirates Hills, Palm Jumeirah, and exclusive communities where first impressions matter. Provides a five-star hotel concierge experience at home, seamlessly welcoming residents and guests while maintaining security.",
            "meta_description": "Smart entry and concierge foyer automation in Dubai: facial recognition, automated welcome sequence, and luxury first impression systems for UAE villas and penthouses.",
            "image": "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=85",
            "features": [
                "Facial recognition for family members",
                "Automated entry sequence (unlock, lights, climate)",
                "Personalized welcome messages on display",
                "Guest detection with host mobile notifications",
                "Video intercom with remote door release",
                "Package detection and delivery alerts",
                "Automated shoe cabinet and closet lighting",
                "Statement chandelier with arrival scene",
                "Climate pre-conditioning before arrival",
                "Music or ambient sound auto-play",
                "Integration with home security system",
                "Smart keypad with temporary guest codes"
            ],
            "brands": ["Control4", "Akuvox", "Lutron", "Ring", "August"],
            "tags": ["entry", "foyer", "concierge", "first-impression", "facial-recognition", "luxury"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 16,
            "badge": "Luxury",
            "featured": True
        }
    ]
    
    # Data for specialty_rooms collection (different schema)
    specialty_rooms_data = [
        {
            "id": str(uuid4()),
            "slug": "interactive-media-lounge",
            "name": "Interactive Media Lounge",
            "category": "Entertainment",
            "description": "Casual entertainment hub with multi-screen gaming, streaming, sports viewing, multi-zone audio, and smart lighting for family and friends",
            "long_description": "More relaxed than a cinema, this media lounge features multiple screens for gaming and streaming, surround sound zones, automated lighting scenes, and voice-controlled media switching. Perfect for families who want everyday entertainment, game nights, and sports viewing parties.",
            "typical_size": "300-800 sq ft",
            "base_price_aed": 42000,
            "image": "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=85",
            "features": [
                "Multiple displays for simultaneous viewing",
                "Gaming console integration (PS5, Xbox, Switch)",
                "Smart streaming hub (all major services)",
                "Multi-zone audio for different activities",
                "Sports mode with stats capability",
                "Automated lighting scenes (movie, game, sports)",
                "Voice control for source switching",
                "USB charging in seating",
                "Snack bar with beverage fridge",
                "Soundproofing"
            ],
            "typical_components": [
                "Samsung or LG displays",
                "Sonos multi-zone audio",
                "Control4 automation hub",
                "Lutron lighting control",
                "Gaming consoles & streaming devices"
            ],
            "integration_with": ["Audio Systems", "Lighting Automation", "Smart Home", "Network Infrastructure"],
            "tags": ["media-lounge", "gaming", "streaming", "sports", "family"]
        },
        {
            "id": str(uuid4()),
            "slug": "smart-patio-outdoor-entertainment",
            "name": "Smart Patio & Outdoor Entertainment",
            "category": "Outdoor Living",
            "description": "Entertainment-focused outdoor living with multi-zone audio, outdoor cinema, firepit control, weather-responsive lighting, and automated shades",
            "long_description": "Transform your patio into a year-round entertainment destination with weatherproof audio, outdoor cinema, automated firepit, weather-responsive systems, and outdoor kitchen integration. Perfect for Dubai outdoor lifestyle and hosting gatherings.",
            "typical_size": "500-2000 sq ft",
            "base_price_aed": 65000,
            "image": "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=85",
            "features": [
                "Weatherproof multi-zone audio",
                "Outdoor cinema with motorized screen",
                "Automated firepit with safety controls",
                "LED landscape & architectural lighting",
                "Color-changing scene presets",
                "Weather-responsive automation",
                "Motorized shade & pergola systems",
                "Misting systems for summer",
                "Outdoor heaters for winter",
                "Outdoor kitchen integration"
            ],
            "typical_components": [
                "Sonance outdoor speakers",
                "Lutron outdoor lighting",
                "Sunbrella motorized shades",
                "Bromic heaters",
                "Weather sensors"
            ],
            "integration_with": ["Audio Systems", "Lighting Automation", "Climate Control", "Smart Home"],
            "tags": ["patio", "outdoor", "entertainment", "alfresco", "cinema"]
        },
        {
            "id": str(uuid4()),
            "slug": "smart-entry-concierge-foyer",
            "name": "Smart Entry & Concierge Foyer",
            "category": "Security & Safety",
            "description": "First impression automation with facial recognition, automated entry sequence, welcome lighting, guest notifications, and concierge-level experience",
            "long_description": "Make a stunning first impression with facial recognition, automated entry sequence, personalized welcomes, guest detection, video intercom, and package alerts. Five-star hotel concierge experience at home for luxury villas.",
            "typical_size": "150-400 sq ft",
            "base_price_aed": 38000,
            "image": "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=85",
            "features": [
                "Facial recognition for family",
                "Automated entry sequence",
                "Personalized welcome messages",
                "Guest detection with notifications",
                "Video intercom with remote release",
                "Package detection alerts",
                "Automated lighting scenes",
                "Statement chandelier control",
                "Climate pre-conditioning",
                "Music auto-play on arrival"
            ],
            "typical_components": [
                "Control4 automation",
                "Akuvox video intercom",
                "Facial recognition camera",
                "Lutron lighting control",
                "Smart door locks"
            ],
            "integration_with": ["Security Systems", "Access Control", "Lighting Automation", "Smart Home"],
            "tags": ["entry", "foyer", "concierge", "facial-recognition", "luxury"]
        }
    ]
    
    # Insert into solutions collection
    result_solutions = await solutions_collection.insert_many(solutions_data)
    print(f"✅ Added {len(result_solutions.inserted_ids)} solutions to solutions collection")
    
    # Insert into specialty_rooms collection
    result_specialty = await specialty_rooms_collection.insert_many(specialty_rooms_data)
    print(f"✅ Added {len(result_specialty.inserted_ids)} specialty rooms to specialty_rooms collection")
    
    # Print summary
    print("\n📊 New Specialty Rooms:")
    for room in specialty_rooms_data:
        print(f"   - {room['name']} (AED {room['base_price_aed']:,})")
    
    # Print totals
    total_solutions = await solutions_collection.count_documents({})
    total_specialty = await specialty_rooms_collection.count_documents({})
    print(f"\n🎯 Total solutions: {total_solutions}")
    print(f"🎯 Total specialty rooms: {total_specialty}")
    
    client.close()


if __name__ == "__main__":
    print("🚀 Adding final 3 specialty rooms...")
    asyncio.run(add_final_specialty_rooms())
    print("✨ Complete!")

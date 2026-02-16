"""
Seed script for Luxury Residential Solutions
Adds: Staff & Access Management, Environmental Intelligence, High-End Audio
"""

import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import uuid

load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_luxury_residential():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    luxury_solutions = [
        {
            "id": str(uuid.uuid4()),
            "slug": "staff-access-management",
            "title": "Staff & Access Management",
            "category": "Residential Solutions",
            "description": "Intelligent access control and staff monitoring for luxury villas",
            "long_description": "Comprehensive staff management system with biometric access control, time tracking, zone restrictions, and real-time monitoring. Ensure security while respecting privacy with smart access management for housekeepers, drivers, gardeners, and contractors.",
            "image": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Biometric Access Control (Fingerprint & Face Recognition)",
                "Time & Attendance Tracking",
                "Zone-Based Access Restrictions",
                "Real-Time Staff Location Monitoring",
                "Temporary Contractor Access",
                "Video Verification at Entry Points",
                "Activity Logs & Audit Trails",
                "Mobile App for Homeowners"
            ],
            "brands": ["Honeywell", "HID Global", "Axis Communications", "Genetec"],
            "tags": ["STAFF MANAGEMENT", "ACCESS CONTROL", "SECURITY", "RESIDENTIAL"],
            "faqs": [
                {
                    "question": "How does biometric access work?",
                    "answer": "Staff members register their fingerprints or facial biometrics during onboarding. The system grants access only to authorized zones based on their role (e.g., housekeeper can access living areas but not master bedroom). Entry/exit times are automatically logged."
                },
                {
                    "question": "Can I give temporary access to contractors?",
                    "answer": "Yes. Generate time-limited access codes or temporary biometric permissions through the mobile app. You can restrict contractors to specific areas and set expiration times. All contractor movements are logged for security."
                },
                {
                    "question": "Is staff privacy respected?",
                    "answer": "Absolutely. The system tracks location only within working hours and authorized zones. Biometric data is encrypted and stored securely. Staff rest areas can be designated as monitoring-free zones."
                }
            ],
            "featured": True,
            "popular": True,
            "badge": "Privacy-First",
            "mega_menu_category": "residential",
            "mega_menu_order": 10
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "environmental-intelligence",
            "title": "Environmental Intelligence",
            "category": "Residential Solutions",
            "description": "AI-powered environmental monitoring and optimization for healthy living",
            "long_description": "Advanced environmental monitoring system tracking air quality, humidity, temperature, VOCs, CO2, and allergens. AI algorithms automatically adjust HVAC, air purifiers, and ventilation to maintain optimal indoor environmental quality for health and comfort.",
            "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Real-Time Air Quality Monitoring (PM2.5, PM10, VOCs)",
                "CO2 & Oxygen Level Tracking",
                "Humidity & Temperature Optimization",
                "Allergen Detection & Alerts",
                "Automated HVAC Adjustment",
                "Air Purifier Integration",
                "UV-C Sanitization Control",
                "Health Insights & Recommendations"
            ],
            "brands": ["Awair", "IQAir", "Honeywell", "Dyson", "Carrier"],
            "tags": ["AIR QUALITY", "HEALTH", "WELLNESS", "RESIDENTIAL"],
            "faqs": [
                {
                    "question": "What does it monitor?",
                    "answer": "The system monitors PM2.5, PM10, VOCs (volatile organic compounds), CO2, oxygen levels, humidity, temperature, and common allergens (dust mites, pollen, mold spores). Sensors are placed in bedrooms, living areas, and HVAC systems."
                },
                {
                    "question": "How does it improve air quality?",
                    "answer": "When sensors detect poor air quality, the system automatically increases HVAC fresh air intake, activates air purifiers, adjusts humidity levels, or triggers UV-C sanitization. You receive mobile alerts with specific recommendations."
                },
                {
                    "question": "Is it beneficial for allergies or asthma?",
                    "answer": "Yes. The system is especially helpful for respiratory conditions. It maintains optimal humidity (40-50%), reduces allergens, monitors CO2 levels, and can create specialized air quality zones in bedrooms for better sleep and breathing."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Health-Focused",
            "mega_menu_category": "residential",
            "mega_menu_order": 11
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "high-end-audio-systems",
            "title": "High-End Audio Systems",
            "category": "Residential Solutions",
            "description": "Audiophile-grade whole-home audio with lossless streaming",
            "long_description": "Premium multi-room audio system delivering audiophile-grade sound throughout your villa. Supports lossless hi-res audio (up to 24-bit/192kHz), integrated with streaming services, vinyl, and CD collections. Invisible speaker installations maintain architectural aesthetics.",
            "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "24-bit/192kHz Hi-Res Audio Support",
                "Multi-Room Synchronized Playback",
                "Invisible In-Wall & In-Ceiling Speakers",
                "Streaming Integration (Tidal, Qobuz, Spotify)",
                "Vinyl Turntable Integration",
                "Dedicated Listening Room Acoustics",
                "Voice Control (Alexa, Google, Siri)",
                "Audiophile-Grade DACs & Amplifiers"
            ],
            "brands": ["Bang & Olufsen", "Sonos", "Bowers & Wilkins", "KEF", "McIntosh"],
            "tags": ["AUDIO", "MUSIC", "LUXURY", "RESIDENTIAL"],
            "faqs": [
                {
                    "question": "What is hi-res audio?",
                    "answer": "Hi-res audio (24-bit/192kHz) offers significantly better quality than CD (16-bit/44.1kHz) or compressed formats like MP3. You hear more detail, wider dynamic range, and more natural sound - especially noticeable with classical music, jazz, and vocals."
                },
                {
                    "question": "Can I play different music in different rooms?",
                    "answer": "Yes. Each room or zone can play different sources independently. You can also group rooms for synchronized playback during parties. Control everything from your phone, tablet, or wall-mounted touchscreens."
                },
                {
                    "question": "Are the speakers visible?",
                    "answer": "Most speakers are architecturally invisible - installed in-wall or in-ceiling with paintable grilles. For dedicated listening rooms, we can install premium visible speakers. Subwoofers are hidden in walls, floors, or custom furniture."
                }
            ],
            "featured": True,
            "popular": True,
            "badge": "Audiophile",
            "mega_menu_category": "residential",
            "mega_menu_order": 12
        }
    ]
    
    print("🔄 Seeding luxury residential solutions...")
    
    for solution in luxury_solutions:
        existing = await db.solutions.find_one({"slug": solution["slug"]})
        
        if existing:
            await db.solutions.update_one(
                {"slug": solution["slug"]},
                {"$set": solution}
            )
            print(f"✅ Updated: {solution['title']}")
        else:
            await db.solutions.insert_one(solution)
            print(f"✅ Created: {solution['title']}")
    
    print(f"\n✨ Successfully seeded {len(luxury_solutions)} luxury residential solutions!")
    
    count = await db.solutions.count_documents({"category": "Residential Solutions"})
    print(f"📊 Total Residential Solutions in database: {count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_luxury_residential())

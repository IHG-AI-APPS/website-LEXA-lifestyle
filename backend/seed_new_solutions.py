"""
Seed script for new luxury solutions from LEXA Luxury-Orchestrated PDF
Adds: Luxury Cinema, Majlis Audio, Staff Management, Environmental Intelligence
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone

async def seed_new_solutions():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['lexa_lifestyle']
    
    new_solutions = [
        {
            "id": "luxury-cinema-solutions",
            "slug": "luxury-cinema-solutions",
            "title": "Luxury Cinema Solutions",
            "name": "Luxury Cinema Solutions",
            "category": "Entertainment",
            "mega_menu_category": "residential",
            "description": "Transform your home into a private cinema with Dolby Atmos, bespoke acoustic design, premium seating, and immersive environments.",
            "icon": "film",
            "featured": True,
            "popular": True,
            "badge": "Premium",
            "hero_title": "Cinema-Grade Entertainment at Home",
            "hero_subtitle": "Experience the magic of cinema in the comfort of your villa with acoustic perfection, premium comfort, and automated elegance.",
            "overview": "Our Luxury Cinema Solutions deliver an unparalleled cinematic experience that rivals the finest theaters. From Dolby Atmos surround sound to starlight ceilings and motorized recliners with heating, cooling, and massage functions, every detail is crafted for the ultimate viewing experience.",
            "long_description": "Transform your private space into a world-class cinema that rivals the finest commercial theaters. Our Luxury Cinema Solutions combine cutting-edge technology with bespoke design to create an entertainment experience that's truly extraordinary. Every element is carefully curated—from the pristine acoustics to the luxurious seating—delivering the magic of cinema in the comfort of your home.",
            "image": "/images/solutions/luxury-cinema.jpg",
            "features": [
                "Dolby Atmos & DTS:X immersive audio with up to 9.4.6 configurations",
                "Professional acoustic treatment including soundproofing, absorption panels, and bass traps",
                "Premium motorized recliners with heating, cooling, massage, and USB charging",
                "4K/8K laser projectors or large-format OLED displays with HDR support",
                "Automated lighting scenes synchronized with content playback",
                "Starlight ceilings and fiber optic ambient lighting for immersive environments",
                "Bespoke theater design matching your villa's interior aesthetic",
                "One-touch 'Cinema Mode' controlling projection, audio, lighting, shading, and climate",
                "Seating capacity from intimate 4-seat rooms to grand 20+ seat theaters"
            ],
            "key_features": [
                "Dolby Atmos & DTS:X immersive audio",
                "Acoustic design with soundproofing and bass management",
                "Premium recliners with heating, cooling, and massage",
                "4K/8K laser projectors or large-format OLED displays",
                "Automated lighting and shading scenes",
                "Starlight ceilings and fiber optic ambient lighting",
                "Bespoke theater design matching your interior aesthetic",
                "One-touch 'Cinema Mode' automation"
            ],
            "benefits": [
                "Private screenings in ultimate comfort",
                "Cinema-quality audio and video without leaving home",
                "Complete immersion with environmental effects",
                "Family entertainment elevated to luxury standard",
                "Increases property value significantly"
            ],
            "ideal_for": "Luxury villas, penthouses, and private compounds with dedicated cinema rooms or multi-purpose entertainment spaces.",
            "price_range": "AED 200,000 - 800,000+",
            "faqs": [
                {
                    "question": "What makes a luxury home cinema different from a regular setup?",
                    "answer": "Our luxury cinemas feature professional-grade acoustic treatment, premium seating with comfort features, immersive audio formats like Dolby Atmos, bespoke design integration, and automated environmental control for a truly cinematic experience."
                },
                {
                    "question": "How long does installation take?",
                    "answer": "A complete luxury cinema installation typically takes 4-8 weeks including acoustic design, construction, equipment installation, calibration, and commissioning. Timeline depends on room size and customization level."
                },
                {
                    "question": "Can you integrate with my existing home automation?",
                    "answer": "Yes, we integrate seamlessly with Control4, Crestron, Savant, and KNX systems, allowing one-touch cinema modes that control projection, audio, lighting, and climate simultaneously."
                },
                {
                    "question": "What seating options are available?",
                    "answer": "We offer premium cinema recliners from leading manufacturers with features including heating, cooling, massage, USB charging, and motorized adjustments. Custom upholstery matching your interior is available."
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "id": "majlis-audio-experience",
            "slug": "majlis-audio-experience",
            "title": "Majlis Audio Experience",
            "name": "Majlis Audio Experience", 
            "category": "Entertainment",
            "mega_menu_category": "residential",
            "description": "Culturally-tuned audio system designed specifically for Majlis spaces, delivering exceptional speech clarity and discreet integration.",
            "icon": "users",
            "featured": False,
            "popular": True,
            "badge": "Cultural",
            "hero_title": "Audio Perfection for Cultural Gatherings",
            "hero_subtitle": "Crystal-clear conversation and background music, acoustically optimized for traditional Majlis spaces.",
            "overview": "The Majlis is the heart of Emirati hospitality. Our specialized audio solution ensures every conversation is heard clearly while maintaining the elegant, unobtrusive aesthetic required in these important spaces.",
            "key_features": [
                "Speech clarity optimization for conversations",
                "Cultural acoustic tuning for Majlis dimensions",
                "Discreet architectural speaker integration",
                "Invisible ceiling or wall-mounted speakers",
                "Background music with automatic speech detection",
                "Zone control for different seating areas",
                "Compatibility with traditional décor and Arabic calligraphy",
                "Voice control in Arabic and English"
            ],
            "benefits": [
                "Enhanced hospitality through perfect acoustics",
                "Clear communication in large gathering spaces",
                "Maintains traditional aesthetic without visible technology",
                "Background music that doesn't interfere with conversation",
                "Respects cultural importance of the Majlis space"
            ],
            "ideal_for": "Traditional Majlis rooms in luxury villas, family compounds, and cultural spaces where gathering and conversation are paramount.",
            "price_range": "AED 50,000 - 150,000",
            "faqs": [
                {
                    "question": "How is Majlis audio different from standard multi-room audio?",
                    "answer": "Majlis audio is specifically tuned for speech clarity and large gathering spaces. The system automatically adjusts when conversation is detected and uses specialized speaker placement for even coverage without visual intrusion."
                },
                {
                    "question": "Can the system blend with traditional Arabic interiors?",
                    "answer": "Absolutely. We specialize in invisible speaker integration that preserves the aesthetic of traditional Majlis design, including ornate ceilings, Arabic calligraphy, and cultural elements."
                },
                {
                    "question": "Does it support Arabic voice control?",
                    "answer": "Yes, the system integrates with Arabic-language voice assistants and can be controlled via Alexa, Google Assistant, or dedicated touchscreens with Arabic interface."
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "id": "staff-access-management",
            "slug": "staff-access-management",
            "title": "Staff & Access Management",
            "name": "Staff & Access Management",
            "category": "Security",
            "mega_menu_category": "commercial",
            "description": "Intelligent role-based access control system managing staff movement, time restrictions, and comprehensive audit trails for operational efficiency.",
            "icon": "users-cog",
            "featured": False,
            "popular": False,
            "badge": "New",
            "hero_title": "Intelligent Staff Management",
            "hero_subtitle": "Control access, monitor movement, and maintain security with our comprehensive staff management system designed for luxury estates.",
            "overview": "Large estates require sophisticated staff management. Our system provides granular control over who accesses which areas, when they can enter, and maintains complete visibility through detailed audit trails—all while respecting privacy and operational efficiency.",
            "key_features": [
                "Role-based access control (Owners, Family, Guests, Staff)",
                "Time-based permission scheduling",
                "Zone restrictions (permitted areas per role)",
                "Movement intelligence and tracking",
                "Comprehensive audit trails with timestamps",
                "Temporary access codes for visitors",
                "Emergency override protocols",
                "Mobile app for real-time monitoring",
                "Integration with intercom and surveillance",
                "Automated alerts for unauthorized access attempts"
            ],
            "benefits": [
                "Enhanced security and accountability",
                "Operational efficiency for household management",
                "Privacy protection for family areas",
                "Clear visibility of staff activity",
                "Compliance with labor regulations",
                "Peace of mind for property owners",
                "Reduced risk of internal security breaches"
            ],
            "ideal_for": "Luxury villas with full-time staff, large family compounds, estates with multiple service personnel, and properties requiring strict access protocols.",
            "price_range": "AED 75,000 - 200,000",
            "faqs": [
                {
                    "question": "How does the Villa Operating Model work?",
                    "answer": "Our system defines four user roles: Owners (full control), Family (personalized zones), Guests (temporary guided access), and Staff (time and zone restricted). Each role has appropriate permissions ensuring security while maintaining operational efficiency."
                },
                {
                    "question": "Can I give temporary access to contractors?",
                    "answer": "Yes, you can create time-limited access codes for contractors, delivery personnel, or temporary staff. These codes automatically expire and can be restricted to specific areas during defined time windows."
                },
                {
                    "question": "What information is captured in audit trails?",
                    "answer": "The system logs every access event including: who, when, where, entry/exit times, and method used (keypad, card, mobile, biometric). Data is encrypted and stored securely with customizable retention periods."
                },
                {
                    "question": "Is this compliant with UAE privacy laws?",
                    "answer": "Yes, our system is designed in compliance with UAE data protection regulations. Staff are informed about monitoring, data is used solely for security purposes, and access logs are securely maintained per legal requirements."
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "id": "environmental-intelligence",
            "slug": "environmental-intelligence",
            "title": "Environmental Intelligence",
            "name": "Environmental Intelligence",
            "category": "Sustainability",
            "mega_menu_category": "specialized",
            "description": "AI-powered environmental monitoring and control including climate optimization, air quality management, leak detection, and garden/pool automation.",
            "icon": "leaf",
            "featured": False,
            "popular": True,
            "badge": "Eco",
            "hero_title": "Intelligent Environmental Control",
            "hero_subtitle": "AI-driven systems that optimize climate, monitor air quality, prevent water damage, and automate outdoor spaces for comfort, efficiency, and sustainability.",
            "overview": "Environmental Intelligence goes beyond basic climate control. Our integrated system learns your preferences, predicts needs, monitors air quality in real-time, prevents costly water damage, and manages gardens and pools automatically—all while reducing energy consumption by up to 35%.",
            "key_features": [
                "Multi-zone climate control with occupancy detection",
                "AI learning algorithms for temperature preferences",
                "Real-time CO2 and VOC air quality monitoring",
                "Automated ventilation response to air quality",
                "Leak detection sensors throughout property",
                "Automatic water shutoff on leak detection",
                "Weather-aware garden irrigation system",
                "Soil moisture sensors for water conservation",
                "Automated pool temperature, filtration, and chemical dosing",
                "Energy usage analytics and optimization",
                "Circadian lighting synchronization (2700K-6500K)",
                "Integration with weather forecasts"
            ],
            "benefits": [
                "25-35% reduction in cooling costs",
                "Healthier indoor air quality automatically maintained",
                "Prevention of millions in water damage",
                "30-50% reduction in water consumption for gardens",
                "Optimal pool conditions year-round",
                "Extended HVAC equipment lifespan",
                "Reduced carbon footprint",
                "Complete peace of mind"
            ],
            "ideal_for": "Any luxury property focused on comfort, efficiency, and sustainability. Especially valuable for large villas with extensive gardens, pools, and multiple climate zones.",
            "price_range": "AED 120,000 - 300,000",
            "faqs": [
                {
                    "question": "How does AI climate control save energy?",
                    "answer": "The system learns your temperature preferences by time and location, detects occupancy to avoid cooling empty rooms, integrates with weather forecasts to pre-cool during cheaper hours, and optimizes HVAC scheduling—typically reducing costs by 25-35%."
                },
                {
                    "question": "What happens when a leak is detected?",
                    "answer": "Leak sensors throughout bathrooms, kitchens, laundry, and mechanical rooms instantly detect water. The system automatically shuts off the main water supply, sends alerts to your phone, notifies emergency contacts, and logs the incident—potentially saving millions in damage."
                },
                {
                    "question": "How does air quality monitoring work?",
                    "answer": "CO2 and VOC (Volatile Organic Compound) sensors continuously monitor air quality. When levels exceed healthy thresholds, the system automatically increases ventilation, adjusts air filtration, and can open windows in suitable weather conditions."
                },
                {
                    "question": "Can the irrigation system handle complex landscaping?",
                    "answer": "Yes, our system supports multiple irrigation zones with independent schedules, integrates weather data to skip watering when rain is forecast, uses soil moisture sensors to prevent overwatering, and can differentiate between lawns, flower beds, and trees for optimal water delivery."
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]
    
    print("Starting seed of new luxury solutions...")
    
    # Insert new solutions
    for solution in new_solutions:
        existing = await db.solutions.find_one({"slug": solution["slug"]})
        if existing:
            print(f"⚠️  Solution '{solution['title']}' already exists, skipping...")
        else:
            await db.solutions.insert_one(solution)
            print(f"✅ Added: {solution['title']}")
    
    # Print summary
    total_solutions = await db.solutions.count_documents({})
    print(f"\n✅ Database now has {total_solutions} total solutions")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_new_solutions())

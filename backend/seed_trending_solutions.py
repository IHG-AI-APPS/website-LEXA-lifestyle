"""
Seed Trending Specialty Rooms & IoT Solutions (2025-2026)
Based on latest smart home trends: podcast rooms, wellness spaces, 
robotic cleaning, odor management, sleep optimization, etc.
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_trending_solutions():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    solutions_collection = db.solutions
    
    trending_solutions = [
        {
            "id": str(uuid4()),
            "slug": "podcast-recording-studio",
            "title": "Podcast & Content Creation Studio",
            "category": "Entertainment",
            "description": "Professional home studio automation with acoustic treatment, lighting control, and streaming integration for content creators",
            "long_description": "Transform your content creation with a fully automated podcast studio. Featuring acoustic optimization, professional microphone systems, dynamic lighting scenes for video podcasts, soundproofing, and seamless integration with streaming platforms. Perfect for podcasters, YouTubers, and remote professionals requiring broadcast-quality production.",
            "meta_description": "Build a professional podcast studio at home with acoustic treatment, automated lighting, and streaming integration. Perfect for content creators and remote professionals in Dubai and UAE.",
            "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=85",
            "features": [
                "Professional acoustic panels & bass traps",
                "Automated lighting scenes for video recording",
                "Multi-microphone audio mixing systems",
                "Soundproofing & noise isolation",
                "Green screen & backdrop automation",
                "Streaming platform integration (YouTube, Twitch, Spotify)",
                "Real-time audio monitoring & processing",
                "Automated recording scheduling",
                "Smart climate control for optimal acoustics",
                "Cable management & equipment organization"
            ],
            "brands": ["Shure", "Rode", "Yamaha", "Elgato", "Sony"],
            "tags": ["podcast", "content-creation", "studio", "entertainment", "professional"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 1,
            "popular": True
        },
        {
            "id": str(uuid4()),
            "slug": "wellness-meditation-room",
            "title": "Wellness & Meditation Room Automation",
            "category": "Wellness",
            "description": "Circadian lighting, air quality monitoring, aromatherapy, and sound therapy for mental wellness and meditation spaces",
            "long_description": "Create a sanctuary for mindfulness and wellness. Our automated wellness rooms feature circadian lighting that adapts to natural rhythms, air purification with real-time quality monitoring, aromatherapy diffusion systems, sound therapy integration (binaural beats, nature sounds), temperature and humidity optimization, and guided meditation app connectivity. Designed to reduce stress, improve sleep quality, and enhance overall wellbeing.",
            "meta_description": "Design your wellness sanctuary with circadian lighting, air quality monitoring, aromatherapy automation, and sound therapy. Perfect for meditation and mental health in UAE homes.",
            "image": "https://images.unsplash.com/photo-1545389336-cf090694435e?q=85",
            "features": [
                "Circadian rhythm lighting (dawn/dusk simulation)",
                "Air quality sensors & automated purification",
                "Smart aromatherapy diffusion system",
                "Sound therapy & binaural beat integration",
                "Temperature & humidity optimization",
                "Meditation timer & session tracking",
                "App-controlled meditation scenes",
                "Voice-activated quiet mode",
                "Natural soundscapes (rain, ocean, forest)",
                "Integration with wellness apps (Calm, Headspace)"
            ],
            "brands": ["Philips Hue", "Dyson", "Sonos", "Nest"],
            "tags": ["wellness", "meditation", "health", "circadian", "air-quality"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 2,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "robotic-cleaning-automation",
            "title": "Robotic Cleaning & Maintenance Automation",
            "category": "Smart Home",
            "description": "Intelligent robotic vacuum, mop, pool, and window cleaning systems with automated scheduling and zone management",
            "long_description": "Never worry about cleaning again. Our comprehensive robotic cleaning ecosystem includes floor vacuuming robots, mopping systems, pool cleaners, window cleaning robots, and lawn maintenance bots—all centrally controlled and scheduled through your smart home system. Features include room-specific scheduling, no-go zones, automatic charging, dirt detection, and integration with home occupancy sensors to clean when you're away.",
            "meta_description": "Automate your home maintenance with robotic vacuum, mop, pool, and window cleaners. Scheduled cleaning with smart zone management for Dubai villas and apartments.",
            "image": "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=85",
            "features": [
                "Multi-floor robotic vacuum systems",
                "Automated mopping with water refill",
                "Pool cleaning robot integration",
                "Window & glass cleaning robots",
                "Lawn mowing robot scheduling",
                "Room-specific cleaning schedules",
                "No-go zone mapping",
                "Occupancy-based smart scheduling",
                "Automatic charging & docking",
                "Dirt detection & spot cleaning",
                "Voice control integration",
                "Remote monitoring & notifications"
            ],
            "brands": ["Roborock", "iRobot Roomba", "Ecovacs", "Dolphin", "Husqvarna"],
            "tags": ["robotic", "cleaning", "automation", "maintenance", "iot"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 10,
            "badge": "Trending"
        },
        {
            "id": str(uuid4()),
            "slug": "air-odor-management",
            "title": "Smart Air Quality & Odor Management",
            "category": "Wellness",
            "description": "Real-time air quality monitoring with automated purification, odor elimination, and fragrance management systems",
            "long_description": "Breathe easier with intelligent air management. Our system continuously monitors PM2.5, VOCs, CO2, humidity, and temperature, automatically activating purifiers, ventilation, or fragrance systems as needed. Advanced odor elimination technology neutralizes pet odors, cooking smells, and smoke. Perfect for UAE's dusty climate and homes with pets or strong cooking traditions.",
            "meta_description": "Smart air quality monitoring and odor management for Dubai homes. Automated purification, odor elimination, and fragrance control with real-time monitoring.",
            "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=85",
            "features": [
                "Real-time air quality monitoring (PM2.5, VOC, CO2)",
                "Automated air purifier activation",
                "Odor detection & elimination technology",
                "Smart fragrance dispenser scheduling",
                "Kitchen exhaust automation",
                "Bathroom ventilation control",
                "Pet area odor management",
                "HVAC integration for fresh air cycles",
                "Allergy & pollen alerts",
                "Mobile app notifications & history",
                "Zone-based air quality control",
                "Filter replacement reminders"
            ],
            "brands": ["Dyson", "Blueair", "Molekule", "Awair", "Pura"],
            "tags": ["air-quality", "odor", "wellness", "health", "purification"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 11,
            "popular": True
        },
        {
            "id": str(uuid4()),
            "slug": "sleep-optimization-bedroom",
            "title": "Sleep Optimization & Bedroom Automation",
            "category": "Wellness",
            "description": "Circadian lighting, climate optimization, white noise, smart mattress integration, and sleep tracking for perfect rest",
            "long_description": "Transform your bedroom into a sleep sanctuary. Our comprehensive sleep optimization system includes circadian lighting that dims gradually before bedtime, temperature and humidity control for ideal sleep conditions (18-20°C), white noise and nature sounds, smart mattress integration for sleep tracking, automated blackout blinds, and wake-up routines with gentle light and sound. Proven to improve sleep quality, reduce insomnia, and boost morning energy levels.",
            "meta_description": "Optimize your sleep with smart bedroom automation: circadian lighting, climate control, white noise, and smart mattress integration. Better rest for Dubai residents.",
            "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85",
            "features": [
                "Circadian sleep/wake lighting automation",
                "Optimal temperature control (18-20°C)",
                "Humidity management (40-60%)",
                "White noise & nature sound library",
                "Smart mattress integration (Sleep Number, Eight Sleep)",
                "Sleep tracking & analytics",
                "Automated blackout blinds",
                "Gentle wake-up light simulation",
                "Do Not Disturb mode (silences notifications)",
                "Blue light filtering in evening",
                "Snoring detection & positional adjustments",
                "Integration with health apps (Apple Health, Fitbit)"
            ],
            "brands": ["Philips Hue", "Eight Sleep", "Sleep Number", "Nest", "Lutron"],
            "tags": ["sleep", "wellness", "bedroom", "circadian", "health"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 12,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "pet-care-automation",
            "title": "Smart Pet Care & Monitoring",
            "category": "Smart Home",
            "description": "Automated feeding, water fountains, litter boxes, pet cameras, and climate control for your furry family members",
            "long_description": "Keep your pets happy and healthy even when you're away. Our smart pet care system includes scheduled automatic feeders with portion control, circulating water fountains, self-cleaning litter boxes, pet cameras with two-way audio and treat dispensers, climate-controlled pet zones, and activity tracking. Perfect for busy professionals and travelers who want to ensure their pets receive consistent care.",
            "meta_description": "Smart pet care automation for Dubai homes: auto feeders, water fountains, litter boxes, pet cameras, and climate control. Monitor and care for pets remotely.",
            "image": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=85",
            "features": [
                "Automated feeding with portion control",
                "Smart water fountain with filtration",
                "Self-cleaning litter box automation",
                "HD pet cameras with night vision",
                "Two-way audio communication",
                "Treat dispenser remote control",
                "Pet activity tracking & monitoring",
                "Temperature control in pet areas",
                "Door sensors for pet safety",
                "Integration with pet health apps",
                "Automated feeding schedule",
                "Low food/water level alerts"
            ],
            "brands": ["Petcube", "SureFlap", "Litter-Robot", "PetSafe", "Furbo"],
            "tags": ["pets", "automation", "monitoring", "care", "iot"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 13,
            "badge": "New"
        },
        {
            "id": str(uuid4()),
            "slug": "home-gym-fitness-automation",
            "title": "Smart Home Gym & Fitness Automation",
            "category": "Wellness",
            "description": "Connected fitness equipment, mirror workouts, climate control, and entertainment integration for home workouts",
            "long_description": "Build your ultimate home gym with smart automation. Features include connected fitness equipment (Peloton, Tonal, Mirror), automated climate control during workouts, entertainment system integration for music and streaming, smart lighting for energy and focus, workout tracking and analytics, and voice-controlled equipment adjustments. Perfect for fitness enthusiasts who want gym-quality experiences at home.",
            "meta_description": "Create a smart home gym in Dubai with connected fitness equipment, climate control, and entertainment integration. Professional workouts at home.",
            "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85",
            "features": [
                "Connected fitness equipment integration",
                "Smart mirror workout displays",
                "Automated climate & ventilation control",
                "High-energy workout lighting scenes",
                "Entertainment system integration",
                "Workout tracking & progress analytics",
                "Voice-controlled equipment adjustments",
                "Heart rate monitor integration",
                "Virtual training class scheduling",
                "Spotify & streaming service connectivity",
                "Water reminder notifications",
                "Post-workout recovery scene (cool-down lighting)"
            ],
            "brands": ["Peloton", "Tonal", "Mirror", "NordicTrack", "Sonos"],
            "tags": ["fitness", "gym", "wellness", "health", "connected"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 3,
            "badge": "Trending"
        },
        {
            "id": str(uuid4()),
            "slug": "art-gallery-display-automation",
            "title": "Art Gallery & Display Automation",
            "category": "Luxury",
            "description": "Museum-quality lighting, climate control, security, and rotating display systems for art collectors",
            "long_description": "Protect and showcase your art collection with professional-grade automation. Features include museum-quality lighting with precise color rendering (CRI 95+), UV protection, temperature and humidity control to prevent damage, security sensors and cameras, motorized display rotation systems, and lighting scenes that highlight specific pieces. Essential for serious collectors and luxury homes with valuable artwork.",
            "meta_description": "Museum-quality art display automation for Dubai collectors: precision lighting, climate control, security, and rotating displays. Protect your investment.",
            "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01fa0fd?q=85",
            "features": [
                "Museum-quality LED lighting (CRI 95+)",
                "UV-filtered illumination",
                "Precise temperature control (18-22°C)",
                "Humidity management (45-55%)",
                "Vibration-isolated display systems",
                "Motorized rotating displays",
                "Security cameras & motion sensors",
                "Lighting scenes per artwork",
                "Automated day/night lighting schedules",
                "Voice-controlled gallery tours",
                "Integration with security systems",
                "Remote monitoring & alerts"
            ],
            "brands": ["Lutron", "Ketra", "SoraaLaser", "Philips Museum"],
            "tags": ["art", "gallery", "luxury", "lighting", "security"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 4,
            "badge": "Luxury"
        },
        {
            "id": str(uuid4()),
            "slug": "wine-cellar-automation",
            "title": "Wine Cellar & Storage Automation",
            "category": "Luxury",
            "description": "Precision climate control, humidity management, inventory tracking, and showcase lighting for wine collectors",
            "long_description": "Preserve your wine investment with professional cellar automation. Maintain precise temperature (12-14°C) and humidity (60-70%) with real-time monitoring and alerts. Features include digital inventory management with barcode scanning, showcase LED lighting without UV damage, door sensors, and mobile app control. Perfect for UAE's extreme climate where proper wine storage is essential.",
            "meta_description": "Smart wine cellar automation in Dubai: precision temperature control, humidity management, inventory tracking, and UV-free lighting. Protect your collection.",
            "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=85",
            "features": [
                "Precision temperature control (±0.5°C)",
                "Humidity management (60-70%)",
                "Dual-zone climate (red & white wines)",
                "UV-free LED showcase lighting",
                "Vibration isolation monitoring",
                "Digital inventory tracking",
                "Barcode scanning integration",
                "Door sensor & security alerts",
                "Mobile app monitoring",
                "Automated ventilation",
                "Temperature history logging",
                "Filter replacement reminders"
            ],
            "brands": ["Wine Guardian", "CellarPro", "WhisperKOOL", "EuroCave"],
            "tags": ["wine", "cellar", "luxury", "climate-control", "inventory"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 5,
            "badge": "Luxury"
        },
        {
            "id": str(uuid4()),
            "slug": "smart-laundry-room",
            "title": "Smart Laundry Room Automation",
            "category": "Smart Home",
            "description": "Connected washers/dryers, automated detergent dispensing, lint monitoring, and completion notifications",
            "long_description": "Transform laundry from chore to convenience. Connected smart washers and dryers notify you when cycles complete, recommend optimal settings for fabric types, and track energy usage. Features include automated detergent/fabric softener dispensing, lint buildup monitoring, remote start/stop via mobile app, and integration with voice assistants. Schedule laundry during off-peak electricity hours to save money.",
            "meta_description": "Smart laundry automation for Dubai homes: connected washers/dryers, auto detergent dispensing, remote control, and energy optimization.",
            "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=85",
            "features": [
                "Smart washer/dryer connectivity",
                "Cycle completion notifications",
                "Remote start/stop control",
                "Fabric type recommendations",
                "Automated detergent dispensing",
                "Fabric softener automation",
                "Lint buildup monitoring",
                "Energy usage tracking",
                "Off-peak scheduling for savings",
                "Voice control integration",
                "Maintenance reminders",
                "Water leak detection"
            ],
            "brands": ["LG ThinQ", "Samsung SmartThings", "Whirlpool", "Bosch"],
            "tags": ["laundry", "smart-home", "automation", "appliances", "energy"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 14,
            "badge": "New"
        },
        {
            "id": str(uuid4()),
            "slug": "smart-nursery-baby-monitoring",
            "title": "Smart Nursery & Baby Monitoring",
            "category": "Wellness",
            "description": "Baby monitors with breathing tracking, temperature control, white noise, night lights, and feeding reminders",
            "long_description": "Give your baby the best start with intelligent nursery automation. Features include HD video monitors with breathing and movement tracking, optimal temperature and humidity control, automated white noise and lullabies, gentle night lights with red wavelength (doesn't disrupt sleep), feeding and diaper change reminders, and smart cribs that rock automatically when baby fusses. Provides peace of mind for new parents.",
            "meta_description": "Smart nursery automation in Dubai: baby monitors with breathing tracking, climate control, white noise, and feeding reminders. Peace of mind for parents.",
            "image": "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=85",
            "features": [
                "HD baby monitor with night vision",
                "Breathing & movement tracking",
                "Temperature & humidity monitoring",
                "Automated white noise machine",
                "Smart lullaby playback",
                "Gentle night light (red wavelength)",
                "Feeding reminder notifications",
                "Diaper change tracking",
                "Smart crib rocking automation",
                "Two-way audio communication",
                "Growth milestone tracking",
                "Integration with parenting apps"
            ],
            "brands": ["Nanit", "Owlet", "Hatch", "SNOO", "Philips Avent"],
            "tags": ["baby", "nursery", "monitoring", "wellness", "parenting"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 15,
            "badge": "New"
        },
        {
            "id": str(uuid4()),
            "slug": "vertical-garden-hydroponics",
            "title": "Vertical Garden & Hydroponics Automation",
            "category": "Sustainability",
            "description": "Automated indoor gardens with lighting, watering, nutrient management, and climate control for fresh produce at home",
            "long_description": "Grow fresh herbs, vegetables, and greens year-round in your Dubai home. Our automated hydroponic systems feature full-spectrum LED grow lights with day/night cycles, automated watering and nutrient delivery, pH and EC monitoring, climate control, and mobile app management. Perfect for UAE where outdoor gardening is challenging. Harvest fresh, pesticide-free produce daily.",
            "meta_description": "Grow fresh produce at home in Dubai with automated hydroponics: smart lighting, watering, nutrients, and climate control. Year-round indoor gardening.",
            "image": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=85",
            "features": [
                "Full-spectrum LED grow lights",
                "Automated day/night light cycles",
                "Smart watering & irrigation",
                "Nutrient solution automation",
                "pH & EC level monitoring",
                "Temperature & humidity control",
                "Mobile app plant management",
                "Growth stage optimization",
                "Harvest reminders",
                "Pest detection alerts",
                "Water level monitoring",
                "Integration with smart home systems"
            ],
            "brands": ["AeroGarden", "Click & Grow", "Rise Gardens", "Lettuce Grow"],
            "tags": ["hydroponics", "garden", "sustainability", "fresh-produce", "automation"],
            "mega_menu_category": "Specialized",
            "mega_menu_order": 6,
            "badge": "Eco"
        },
        {
            "id": str(uuid4()),
            "slug": "electric-vehicle-charging",
            "title": "Smart EV Charging & Management",
            "category": "Smart Home",
            "description": "Intelligent electric vehicle charging with solar integration, off-peak scheduling, and load management",
            "long_description": "Future-proof your home with smart EV charging infrastructure. Features include Level 2 charging stations (up to 11kW), solar panel integration for clean charging, off-peak electricity scheduling to minimize costs, load balancing with home power usage, multiple vehicle support, mobile app monitoring, and integration with home battery storage. Essential for Tesla, Lucid, and other EV owners in UAE.",
            "meta_description": "Smart EV charging for Dubai homes: solar integration, off-peak scheduling, load management, and mobile monitoring. Future-proof electric vehicle infrastructure.",
            "image": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=85",
            "features": [
                "Level 2 fast charging (up to 11kW)",
                "Solar panel integration",
                "Off-peak electricity scheduling",
                "Smart load balancing",
                "Multiple vehicle support",
                "Mobile app monitoring & control",
                "Charging history & analytics",
                "Cost tracking & optimization",
                "Battery storage integration",
                "Voice control activation",
                "Weatherproof outdoor installation",
                "RFID access control"
            ],
            "brands": ["Tesla Wall Connector", "ChargePoint", "JuiceBox", "Wallbox"],
            "tags": ["ev", "charging", "electric-vehicle", "sustainability", "solar"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 16,
            "badge": "Eco"
        },
        {
            "id": str(uuid4()),
            "slug": "smart-kitchen-appliances",
            "title": "Smart Kitchen & Appliance Automation",
            "category": "Smart Home",
            "description": "Connected refrigerators, ovens, coffee makers, and inventory management for modern kitchens",
            "long_description": "Revolutionize your cooking experience with smart kitchen automation. Features include smart refrigerators with internal cameras and inventory tracking, connected ovens with remote preheating and recipe guidance, automated coffee makers that brew on schedule, smart dishwashers with optimal cycle selection, and integration with meal planning apps. Voice control lets you set timers, convert measurements, and find recipes hands-free.",
            "meta_description": "Smart kitchen automation in Dubai: connected refrigerators, ovens, coffee makers, and inventory management. Modern cooking made effortless.",
            "image": "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=85",
            "features": [
                "Smart refrigerator with internal cameras",
                "Automatic grocery inventory tracking",
                "Expiration date notifications",
                "Connected oven remote control",
                "Recipe-guided cooking",
                "Automated coffee maker scheduling",
                "Smart dishwasher cycle optimization",
                "Voice-controlled timers & conversions",
                "Meal planning app integration",
                "Energy usage monitoring",
                "Water leak detection",
                "Maintenance alerts"
            ],
            "brands": ["Samsung Family Hub", "LG ThinQ", "Bosch", "Breville", "GE Appliances"],
            "tags": ["kitchen", "appliances", "smart-home", "cooking", "automation"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 17,
            "badge": "Popular"
        },
        {
            "id": str(uuid4()),
            "slug": "water-management-leak-detection",
            "title": "Smart Water Management & Leak Detection",
            "category": "Smart Home",
            "description": "Water usage monitoring, leak detection, automatic shutoff valves, and conservation optimization",
            "long_description": "Protect your home from water damage and reduce water waste. Our smart water management system monitors usage in real-time, detects leaks instantly (even small drips), automatically shuts off water supply when leaks are detected, tracks consumption patterns, and provides conservation recommendations. Features include smart irrigation controllers, hot water recirculation optimization, and mobile alerts. Essential for UAE homes where water conservation matters.",
            "meta_description": "Smart water management for Dubai homes: leak detection, automatic shutoff, usage monitoring, and conservation. Protect your property and save water.",
            "image": "https://images.unsplash.com/photo-1591461998940-a0b9dddd8f6c?q=85",
            "features": [
                "Real-time water usage monitoring",
                "Leak detection sensors (all fixtures)",
                "Automatic shutoff valve activation",
                "Mobile leak alerts",
                "Usage pattern analysis",
                "Conservation recommendations",
                "Smart irrigation optimization",
                "Hot water recirculation control",
                "Water quality monitoring",
                "Billing cost tracking",
                "Vacation mode (monitors when away)",
                "Integration with smart home system"
            ],
            "brands": ["Flo by Moen", "Phyn", "Buoy", "Rachio", "StreamLabs"],
            "tags": ["water", "leak-detection", "conservation", "smart-home", "sustainability"],
            "mega_menu_category": "Residential",
            "mega_menu_order": 18,
            "badge": "Essential"
        }
    ]
    
    # Insert all new solutions
    result = await solutions_collection.insert_many(trending_solutions)
    print(f"✅ Successfully added {len(result.inserted_ids)} trending solutions:")
    
    for solution in trending_solutions:
        print(f"   - {solution['title']} ({solution['slug']})")
    
    # Print summary by category
    print("\n📊 Summary by Category:")
    categories = {}
    for sol in trending_solutions:
        cat = sol['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    for cat, count in sorted(categories.items()):
        print(f"   {cat}: {count} solutions")
    
    print(f"\n🎯 Total solutions in database: {await solutions_collection.count_documents({})}")
    
    client.close()


if __name__ == "__main__":
    print("🚀 Seeding trending specialty rooms and IoT solutions...")
    asyncio.run(seed_trending_solutions())
    print("✨ Seeding complete!")

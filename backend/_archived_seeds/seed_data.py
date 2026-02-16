"""
Database seeding script for LEXA Lifestyle
Populates MongoDB with initial content for solutions, projects, testimonials, and settings
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# ============= SEED DATA =============

SETTINGS = {
    "key": "site_settings",
    "hero_title": "LUXURY SMART LIVING",
    "hero_subtitle": "Designed & Delivered End-to-End",
    "brands_count": 50,
    "years_experience": 20,
    "projects_count": 1000,
    "experience_center_size": 60000
}

SOLUTIONS = [
    {
        "id": "home-theater",
        "slug": "home-theater",
        "title": "Home Theater",
        "category": "Entertainment",
        "description": "Cinematic experiences with Dolby Atmos immersive audio and 4K/8K visual precision",
        "long_description": "Transform your living space into a private cinema. Our home theater solutions deliver premium audio-visual experiences with Dolby Atmos surround sound, 4K/8K projection systems, and acoustically optimized environments. Every detail is crafted for the ultimate entertainment experience.",
        "image": "/images/solutions/home-theater-1.jpg",
        "features": [
            "Dolby Atmos 7.2.4 channel audio system",
            "4K/8K laser projection with HDR",
            "Acoustic treatment and soundproofing",
            "Automated lighting and seating control",
            "Universal remote control integration",
            "Streaming and media server setup"
        ],
        "brands": ["Sony", "JBL", "Barco", "Crestron", "Lutron"],
        "tags": ["Dolby Atmos", "4K/8K", "Cinema", "Audio"]
    },
    {
        "id": "lighting-automation",
        "slug": "lighting-automation",
        "title": "Lighting Automation",
        "category": "Ambiance",
        "description": "Lutron intelligent lighting control for perfect ambiance and energy efficiency",
        "long_description": "Create the perfect atmosphere for every moment. Our Lutron-powered lighting automation systems provide precise control over your entire lighting environment with programmable scenes, circadian rhythm synchronization, and significant energy savings.",
        "image": "/images/solutions/smart-lighting-1.jpg",
        "features": [
            "Lutron RadioRA 3 wireless control",
            "Programmable lighting scenes",
            "Circadian rhythm synchronization",
            "Motion and occupancy sensing",
            "Energy monitoring and optimization",
            "Voice control integration"
        ],
        "brands": ["Lutron", "Philips Hue", "DALI", "KNX"],
        "tags": ["Lutron", "Scenes", "Dimming", "Energy"]
    },
    {
        "id": "security",
        "slug": "security",
        "title": "Security Systems",
        "category": "Protection",
        "description": "Biometric access control with AI-powered detection and real-time monitoring",
        "long_description": "Protect what matters most with intelligent security. Our comprehensive systems integrate biometric access control, AI-powered threat detection, and 24/7 monitoring to keep your property secure while maintaining seamless access for authorized users.",
        "image": "/images/premium/solutions/penthouse-2.jpg",
        "features": [
            "Biometric fingerprint and facial recognition",
            "AI-powered intruder detection",
            "Smart doorbell with video intercom",
            "24/7 real-time monitoring",
            "Automated emergency alerts",
            "Integration with smart locks"
        ],
        "brands": ["Hikvision", "Axis", "Salto", "Avigilon"],
        "tags": ["Biometric", "AI", "24/7", "Access Control"]
    },
    {
        "id": "climate-control",
        "slug": "climate-control",
        "title": "Climate Control",
        "category": "Comfort",
        "description": "Intelligent HVAC integration for optimal comfort and energy efficiency",
        "long_description": "Experience perfect climate control throughout your home. Our intelligent HVAC systems learn your preferences, adapt to weather conditions, and optimize energy usage while maintaining ideal comfort levels in every room.",
        "image": "/images/premium/solutions/penthouse-3.jpg",
        "features": [
            "Multi-zone temperature control",
            "Smart thermostat with learning algorithms",
            "Air quality monitoring and purification",
            "Integration with weather forecasts",
            "Energy consumption analytics",
            "Remote control and scheduling"
        ],
        "brands": ["Nest", "Ecobee", "Daikin", "Honeywell"],
        "tags": ["HVAC", "Smart", "Energy", "Comfort"]
    },
    {
        "id": "audio-systems",
        "slug": "audio-systems",
        "title": "Whole-Home Audio",
        "category": "Entertainment",
        "description": "Multi-room audio systems with Sonos and premium speakers throughout your space",
        "long_description": "Fill every room with pristine sound. Our whole-home audio solutions deliver synchronized music streaming across all spaces with Sonos multi-room systems, Bang & Olufsen premium speakers, and seamless control from any device.",
        "image": "/images/premium/technology/tech-1.jpg",
        "features": [
            "Sonos multi-room audio system",
            "Premium speaker integration",
            "Streaming service connectivity",
            "Voice control compatibility",
            "Synchronized playback",
            "Outdoor audio zones"
        ],
        "brands": ["Sonos", "Bang & Olufsen", "Bose", "KEF"],
        "tags": ["Sonos", "Multi-room", "Premium", "Streaming"]
    },
    {
        "id": "networking",
        "slug": "networking",
        "title": "Network Infrastructure",
        "category": "Foundation",
        "description": "Enterprise-grade networking for seamless connectivity and reliability",
        "long_description": "Power your smart home with robust connectivity. Our enterprise-grade networking solutions provide fast, secure, and reliable WiFi coverage throughout your property with mesh technology, advanced security, and centralized management.",
        "image": "/images/premium/hero/hero-3.jpg",
        "features": [
            "WiFi 6E mesh network deployment",
            "Enterprise-grade security",
            "Managed network switches",
            "Guest network isolation",
            "Bandwidth prioritization",
            "Remote monitoring and management"
        ],
        "brands": ["Ubiquiti", "Cisco Meraki", "Ruckus", "Aruba"],
        "tags": ["WiFi 6", "Mesh", "Secure", "Enterprise"]
    }
]

PROJECTS = [
    {
        "id": "palm-jumeirah-penthouse",
        "title": "Palm Jumeirah Penthouse",
        "location": "Palm Jumeirah, Dubai",
        "type": "Residential",
        "year": "2024",
        "image": "/images/premium/hero/hero-1.jpg",
        "systems": ["Home Theater", "Lighting", "Security", "Climate", "Audio"],
        "description": "Complete smart home integration for a luxury penthouse with panoramic views. Features include a dedicated home cinema, automated lighting scenes, and centralized control system."
    },
    {
        "id": "downtown-dubai-villa",
        "title": "Downtown Dubai Villa",
        "location": "Downtown Dubai",
        "type": "Villa",
        "year": "2024",
        "image": "/images/premium/hero/hero-2.jpg",
        "systems": ["Lighting", "Security", "Audio", "Networking"],
        "description": "6-bedroom villa equipped with comprehensive automation including multi-zone audio, intelligent security, and Lutron lighting control throughout."
    },
    {
        "id": "emirates-hills-mansion",
        "title": "Emirates Hills Mansion",
        "location": "Emirates Hills, Dubai",
        "type": "Villa",
        "year": "2023",
        "image": "/images/premium/solutions/penthouse-1.jpg",
        "systems": ["Home Theater", "Lighting", "Security", "Climate", "Audio", "Networking"],
        "description": "Prestigious mansion with full integration of all smart systems. Features include two home theaters, 12-zone audio, automated pool controls, and extensive outdoor lighting."
    },
    {
        "id": "business-bay-office",
        "title": "Business Bay Executive Office",
        "location": "Business Bay, Dubai",
        "type": "Commercial",
        "year": "2023",
        "image": "/images/premium/solutions/penthouse-2.jpg",
        "systems": ["Lighting", "Security", "Climate", "Networking"],
        "description": "Modern office space with automated meeting rooms, energy-efficient climate control, and enterprise-grade security systems."
    },
    {
        "id": "jumeirah-beach-residence",
        "title": "JBR Beachfront Apartment",
        "location": "Jumeirah Beach Residence",
        "type": "Residential",
        "year": "2023",
        "image": "/images/premium/solutions/penthouse-3.jpg",
        "systems": ["Lighting", "Audio", "Security"],
        "description": "Luxury apartment with automated shading systems, whole-home audio, and smart security integration for coastal living."
    },
    {
        "id": "arabian-ranches-villa",
        "title": "Arabian Ranches Family Villa",
        "location": "Arabian Ranches, Dubai",
        "type": "Villa",
        "year": "2022",
        "image": "/images/premium/technology/tech-1.jpg",
        "systems": ["Lighting", "Security", "Climate", "Audio"],
        "description": "Family-friendly smart home with child-safe automation, energy monitoring, and comprehensive security for peace of mind."
    }
]

TESTIMONIALS = [
    {
        "id": "testimonial-1",
        "name": "Ahmed Al Maktoum",
        "role": "Property Developer",
        "company": "Emirates Development Group",
        "testimonial": "LEXA transformed our flagship property into a showcase of luxury smart living. The attention to detail and technical expertise is unmatched in Dubai.",
        "rating": 5,
        "image": None
    },
    {
        "id": "testimonial-2",
        "name": "Sarah Johnson",
        "role": "Homeowner",
        "company": None,
        "testimonial": "Living in our LEXA-designed home is an absolute joy. Everything works seamlessly, and the team's support has been exceptional throughout.",
        "rating": 5,
        "image": None
    },
    {
        "id": "testimonial-3",
        "name": "Khalid Rahman",
        "role": "CEO",
        "company": "TechVentures DMCC",
        "testimonial": "Our office automation by LEXA has improved our workplace efficiency significantly. The integration is flawless and the energy savings are remarkable.",
        "rating": 5,
        "image": None
    },
    {
        "id": "testimonial-4",
        "name": "Marina Petrova",
        "role": "Interior Designer",
        "company": "Luxe Interiors",
        "testimonial": "I've collaborated with LEXA on multiple high-end projects. Their ability to integrate technology seamlessly with luxury design is truly impressive.",
        "rating": 5,
        "image": None
    }
]

async def seed_database():
    """Seed the database with initial data"""
    print("🌱 Starting database seeding...")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Clear existing data
        print("🗑️  Clearing existing collections...")
        await db.settings.delete_many({})
        await db.solutions.delete_many({})
        await db.projects.delete_many({})
        await db.testimonials.delete_many({})
        
        # Insert settings
        print("⚙️  Inserting site settings...")
        await db.settings.insert_one(SETTINGS)
        
        # Insert solutions
        print(f"💡 Inserting {len(SOLUTIONS)} solutions...")
        await db.solutions.insert_many(SOLUTIONS)
        
        # Insert projects
        print(f"🏗️  Inserting {len(PROJECTS)} projects...")
        await db.projects.insert_many(PROJECTS)
        
        # Insert testimonials
        print(f"⭐ Inserting {len(TESTIMONIALS)} testimonials...")
        await db.testimonials.insert_many(TESTIMONIALS)
        
        # Verify counts
        settings_count = await db.settings.count_documents({})
        solutions_count = await db.solutions.count_documents({})
        projects_count = await db.projects.count_documents({})
        testimonials_count = await db.testimonials.count_documents({})
        
        print("\n✅ Database seeding completed successfully!")
        print(f"   Settings: {settings_count}")
        print(f"   Solutions: {solutions_count}")
        print(f"   Projects: {projects_count}")
        print(f"   Testimonials: {testimonials_count}")
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())

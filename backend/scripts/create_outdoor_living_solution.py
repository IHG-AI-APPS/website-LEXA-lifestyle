"""
Create Outdoor Living Automation solution in database
"""
import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime, timezone
from uuid import uuid4

sys.path.append(str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")

# Premium Outdoor Living Automation Solution
OUTDOOR_LIVING_SOLUTION = {
    "id": str(uuid4()),
    "slug": "outdoor-automation",
    "title": "Outdoor Living Automation",
    "subtitle": "Transform Your Exterior into a Luxury Oasis",
    "category": "Lifestyle Integration",
    "description": "Elevate your outdoor spaces with seamless automation. Control lighting, audio, climate, and entertainment across gardens, terraces, and poolside areas—all from a single touch.",
    "long_description": "Dubai's luxury properties demand outdoor spaces that rival interior sophistication. LEXA's Outdoor Living Automation transforms gardens, terraces, pool areas, and courtyards into intelligent entertainment and relaxation zones. Weatherproof technology meets elegant design, creating seamless indoor-outdoor living experiences perfect for Emirates Hills villas, Palm Jumeirah penthouses, and Arabian Ranches estates.",
    
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    "thumbnail": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
    "gallery": [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    
    "featured": True,
    "badge": "Premium Lifestyle",
    "icon": "sun",
    
    "features": [
        "Architectural Landscape Lighting",
        "Weatherproof Multi-Zone Audio",
        "Automated Pool & Fountain Control",
        "Outdoor Cinema & Entertainment",
        "Smart Irrigation & Climate Control",
        "Motorized Pergolas & Shading",
        "BBQ Area & Kitchen Automation",
        "Security & Perimeter Monitoring"
    ],
    
    "feature_cards": [
        {
            "title": "Architectural Lighting Design",
            "description": "Transform gardens and facades with programmable LED lighting. Create stunning scenes for entertaining, security, or ambiance—controlled by voice, app, or automatic schedules.",
            "icon": "lightbulb",
            "benefits": [
                "Lumibright & Philips Hue professional-grade fixtures",
                "Pathway, uplighting, and accent illumination",
                "Sunset-triggered automatic activation",
                "Color-changing effects for events",
                "30-40% energy savings with LED + automation"
            ]
        },
        {
            "title": "Premium Outdoor Audio",
            "description": "Concert-quality sound across pools, gardens, and terraces. Weatherproof systems deliver crystal-clear audio that withstands Dubai's extreme climate.",
            "icon": "volume",
            "benefits": [
                "K-Array, Sonos Outdoor, Bose weatherproof speakers",
                "Multi-zone control (pool, garden, patio independently)",
                "Underground burial speakers for invisible audio",
                "Integrates with streaming services & local music",
                "Party mode for synchronized outdoor sound"
            ]
        },
        {
            "title": "Pool & Water Feature Automation",
            "description": "Intelligent control of pools, spas, fountains, and waterfalls. Lighting, heating, and filtration run on optimized schedules, reducing energy costs.",
            "icon": "droplet",
            "benefits": [
                "Automated pool lighting (LED color-changing)",
                "Temperature scheduling for spa & pool",
                "Fountain choreography with music sync",
                "Safety alerts & pool cover automation",
                "Energy-efficient pump scheduling"
            ]
        },
        {
            "title": "Outdoor Cinema Experience",
            "description": "Professional-grade movie nights under the stars. Motorized screens, 4K projectors, and Dolby Atmos audio create resort-level entertainment.",
            "icon": "film",
            "benefits": [
                "Weatherproof 4K laser projectors (Sony, Epson)",
                "Motorized retractable screens (100\"-150\")",
                "Outdoor soundbar or in-ground speaker systems",
                "One-touch 'Movie Mode' automation",
                "Integrated with Control4/Crestron"
            ]
        },
        {
            "title": "Smart Climate & Shading",
            "description": "Automated pergolas, awnings, and misting systems maintain perfect outdoor comfort. Temperature sensors trigger cooling and shading.",
            "icon": "cloud",
            "benefits": [
                "Motorized louvered pergolas (Renson, Gibus)",
                "Automated fabric awnings & screens",
                "Misting systems for 5-10°C cooling",
                "Wind & sun sensors for auto-protection",
                "Schedule-based shading control"
            ]
        },
        {
            "title": "Outdoor Kitchen & BBQ Automation",
            "description": "Professional-grade outdoor kitchens with smart controls. Monitor temperatures, control lighting, and manage appliances from inside.",
            "icon": "flame",
            "benefits": [
                "Smart BBQ grill temperature monitoring",
                "Task lighting automation for cooking areas",
                "Refrigeration & appliance control",
                "Ventilation fan automation",
                "Entertainment system integration"
            ]
        }
    ],
    
    "benefits": [
        {
            "title": "Seamless Indoor-Outdoor Integration",
            "description": "One unified system controls your entire property. Extend your smart home experience to every corner of your outdoor spaces."
        },
        {
            "title": "Dubai-Engineered Durability",
            "description": "All equipment rated for 50°C+ temperatures, high humidity, and UV exposure. Marine-grade waterproofing ensures reliability year-round."
        },
        {
            "title": "Energy Efficiency",
            "description": "Smart scheduling and sensors reduce electricity consumption by 30-40%. Pool pumps, lighting, and irrigation run only when needed."
        },
        {
            "title": "Property Value Enhancement",
            "description": "Premium outdoor automation adds 10-15% to property values in Emirates Hills, Palm Jumeirah, and luxury developments."
        },
        {
            "title": "Entertaining Made Effortless",
            "description": "Host gatherings with one-touch scenes. 'Party Mode' activates lighting, music, fountains, and climate control instantly."
        },
        {
            "title": "Safety & Security",
            "description": "Perimeter lighting, motion sensors, and camera integration create secure outdoor environments with automatic alerts."
        }
    ],
    
    "use_cases": [
        {
            "title": "Emirates Hills Villa",
            "description": "Complete garden automation with 40-zone lighting, 8-zone audio, automated fountains, and outdoor cinema for AED 450,000. System controls 2-acre property including pool, tennis court, and entertaining areas."
        },
        {
            "title": "Palm Jumeirah Penthouse",
            "description": "Rooftop terrace automation with motorized pergola, misting system, weatherproof AV, and mood lighting for AED 180,000. Perfect for year-round entertaining with Dubai Marina views."
        },
        {
            "title": "Arabian Ranches Estate",
            "description": "Family-focused outdoor automation with pool safety systems, garden lighting, BBQ area controls, and play area monitoring for AED 220,000."
        }
    ],
    
    "technical_specs": {
        "lighting": "Lutron, Lumibright, Philips Hue Professional",
        "audio": "K-Array, Sonos Outdoor, Bose, KEF weatherproof",
        "video": "Sony 4K laser projectors, motorized screens",
        "control": "Control4, Crestron, Savant outdoor modules",
        "climate": "Renson pergolas, misting systems, fans",
        "pool": "Pentair, Hayward automation systems",
        "power": "IP67 weatherproof rated components",
        "warranty": "5 years weatherproofing, 3 years equipment"
    },
    
    "brands": [
        "Control4",
        "Crestron",
        "Lutron",
        "K-Array",
        "Sonos",
        "Lumibright",
        "Philips Hue",
        "Sony",
        "Epson",
        "Renson",
        "Pentair"
    ],
    
    "faqs": [
        {
            "question": "Will outdoor equipment survive Dubai's extreme heat and humidity?",
            "answer": "Absolutely. We specify only marine-grade, IP67-rated components designed for temperatures exceeding 50°C. All wiring uses UV-resistant jackets, and speakers/screens feature corrosion-proof materials. Our installations include 5-year weatherproofing warranties and have proven reliability across UAE's harshest conditions."
        },
        {
            "question": "How much does outdoor living automation cost for a Dubai villa?",
            "answer": "Costs vary by property size and features: Basic lighting + audio (2-3 zones): AED 80,000-120,000; Mid-tier automation (pool, lighting, 5+ zones): AED 180,000-280,000; Premium full integration (cinema, pergolas, fountains): AED 350,000-600,000. Emirates Hills and Palm projects average AED 400,000 for comprehensive outdoor automation."
        },
        {
            "question": "Can I add outdoor automation to an existing smart home system?",
            "answer": "Yes. If you have Control4, Crestron, or Savant indoors, we seamlessly expand to outdoor zones. Existing systems integrate with new weatherproof keypads, speakers, and lighting. Retrofit installations typically take 3-4 weeks with minimal disruption to landscaping."
        },
        {
            "question": "What's included in outdoor cinema setup?",
            "answer": "Complete packages include: 4K laser projector (100,000+ hour lifespan), motorized retractable screen (100-150 inches), weatherproof Dolby surround system, outdoor media player, and Control4/Crestron integration. Systems automatically adjust brightness for ambient light and include rain sensors for equipment protection. Packages from AED 95,000."
        },
        {
            "question": "How do you protect equipment during sandstorms?",
            "answer": "All outdoor installations feature automatic protection: motorized screens retract in high winds, speaker covers deploy, and sensitive equipment powers down. Weather station sensors detect sandstorms and trigger protective modes. We also provide sealed equipment cabinets with positive air pressure to prevent dust ingress."
        },
        {
            "question": "Can outdoor systems work without internet?",
            "answer": "Yes. Local Control4/Crestron processors manage all outdoor automation offline. Wall keypads, mobile apps (on local WiFi), and scheduled automations function without internet. Only cloud features (remote access, weather data) require connectivity—core lighting, audio, and pool control always work."
        },
        {
            "question": "What about pool safety for families with children?",
            "answer": "We integrate advanced safety features: perimeter motion sensors with instant alerts, pool gate automation with access logs, underwater pool alarms, emergency stop buttons, and camera surveillance. Systems can notify parents via smartphone if pool area accessed during restricted hours. Safety automation AED 25,000-45,000."
        },
        {
            "question": "How long does installation take for outdoor automation?",
            "answer": "Timelines depend on scope: Basic lighting + audio (2-4 weeks), Full villa automation with pool/cinema (8-12 weeks), Estate-level with fountains/pergolas (12-16 weeks). We coordinate with landscapers and pool contractors, installing conduits during construction to minimize disruption."
        },
        {
            "question": "Do you provide maintenance for outdoor systems?",
            "answer": "Yes. Annual maintenance packages (AED 8,000-15,000/year) include: equipment cleaning and inspection, software updates, seasonal weatherproofing checks, speaker recalibration, lighting adjustments, and priority support. Packages reduce service costs by 40% vs. ad-hoc repairs."
        },
        {
            "question": "Can voice control work outdoors in Arabic and English?",
            "answer": "Yes. Outdoor zones integrate with Alexa and Google Assistant for bilingual voice control. Use Arabic commands like 'شغل أضواء الحديقة' (turn on garden lights) or English 'play music by the pool.' Voice assistants recognize commands from outdoor areas within 15-20 meter range."
        }
    ],
    
    "cta_text": "Transform Your Outdoor Spaces",
    "cta_subtitle": "Schedule a consultation to design your luxury outdoor living experience",
    
    "price_range": "AED 80,000 - 600,000",
    "installation_time": "4-12 weeks",
    "warranty": "5 years weatherproofing",
    
    "seo_title": "Outdoor Living Automation Dubai | Luxury Garden & Pool Smart Systems",
    "seo_description": "Transform outdoor spaces with premium automation. Weatherproof lighting, audio, pool control & outdoor cinema for Emirates Hills, Palm Jumeirah villas. Dubai's #1 outdoor automation specialist.",
    "seo_keywords": [
        "outdoor automation Dubai",
        "garden lighting control",
        "pool automation UAE",
        "outdoor cinema Dubai",
        "weatherproof audio system",
        "smart pergola Dubai",
        "luxury outdoor living",
        "terrace automation Dubai",
        "outdoor entertainment system",
        "garden automation Emirates Hills"
    ],
    
    "created_at": datetime.now(timezone.utc).isoformat(),
    "updated_at": datetime.now(timezone.utc).isoformat()
}


async def create_outdoor_living_solution():
    """Add Outdoor Living Automation solution to database"""
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        
        print("🚀 Creating Outdoor Living Automation solution...")
        
        # Check if already exists
        existing = await db.solutions.find_one({"slug": "outdoor-automation"})
        if existing:
            print("⚠️  Solution 'outdoor-automation' already exists. Updating...")
            await db.solutions.replace_one(
                {"slug": "outdoor-automation"},
                OUTDOOR_LIVING_SOLUTION
            )
            print("✅ Solution updated!")
        else:
            await db.solutions.insert_one(OUTDOOR_LIVING_SOLUTION)
            print("✅ Solution created!")
        
        print("\n📊 Solution Details:")
        print("   Slug: outdoor-automation")
        print(f"   Title: {OUTDOOR_LIVING_SOLUTION['title']}")
        print(f"   Features: {len(OUTDOOR_LIVING_SOLUTION['features'])}")
        print(f"   Feature Cards: {len(OUTDOOR_LIVING_SOLUTION['feature_cards'])}")
        print(f"   FAQs: {len(OUTDOOR_LIVING_SOLUTION['faqs'])}")
        print(f"   Price Range: {OUTDOOR_LIVING_SOLUTION['price_range']}")
        print("\n🌐 URL: https://launch-prep-hub.preview.emergentagent.com/solutions/outdoor-automation")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise


if __name__ == "__main__":
    asyncio.run(create_outdoor_living_solution())

"""
Create Smart Home Automation solution - Flagship page
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

SMART_HOME_SOLUTION = {
    "id": str(uuid4()),
    "slug": "smart-home",
    "title": "Smart Home Automation",
    "subtitle": "The Ultimate Intelligent Living Experience",
    "category": "Complete Home Integration",
    "description": "Transform your entire home into an intelligent ecosystem. Unified control of lighting, climate, security, entertainment, and more—creating the ultimate luxury living experience tailored to Dubai's elite properties.",
    "long_description": "LEXA's Smart Home Automation represents the pinnacle of luxury residential technology in Dubai. From Emirates Hills mega-villas to Downtown penthouses, we create fully integrated intelligent homes where every system works in perfect harmony. Control4 and Crestron systems orchestrate lighting, climate, audio-visual, security, and energy management through intuitive interfaces—smartphone apps, voice commands, elegant wall keypads, or automated scenes. Experience true smart living where technology anticipates your needs, enhances comfort, ensures security, and elevates your lifestyle.",
    
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    "thumbnail": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    "gallery": [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    
    "featured": True,
    "badge": "Flagship Solution",
    "icon": "home",
    
    "features": [
        "Whole-Home Lighting Control",
        "Intelligent Climate Management",
        "Multi-Room Audio & Video",
        "Advanced Security & Surveillance",
        "Voice Control (Arabic & English)",
        "Energy Monitoring & Optimization",
        "Automated Scenes & Schedules",
        "Remote Access & Control"
    ],
    
    "feature_cards": [
        {
            "title": "Unified Lighting Control",
            "description": "Transform every room with intelligent lighting. Lutron and KNX systems create perfect ambiance for any occasion—entertaining, working, relaxing, or sleeping.",
            "icon": "lightbulb",
            "benefits": [
                "Control 100+ lights from single interface",
                "Automated sunrise/sunset scheduling",
                "Mood scenes (Entertain, Relax, Sleep, Away)",
                "Dimming for energy savings (30-40%)",
                "Integration with voice assistants",
                "Elegant wall keypads in every room"
            ]
        },
        {
            "title": "Climate Perfection",
            "description": "Intelligent HVAC control maintains optimal temperature and air quality throughout your home. Zone-based automation adapts to occupancy and time of day.",
            "icon": "thermometer",
            "benefits": [
                "Multi-zone temperature control",
                "Occupancy-based automation",
                "Energy savings up to 35%",
                "Air quality monitoring",
                "Schedule-based optimization",
                "Remote temperature adjustment"
            ]
        },
        {
            "title": "Entertainment Everywhere",
            "description": "Sonos, KEF, and premium AV systems deliver exceptional audio and video throughout your home. Stream music, watch movies, or host multi-room parties effortlessly.",
            "icon": "music",
            "benefits": [
                "16+ zone audio distribution",
                "4K video to every display",
                "Streaming service integration (Spotify, Apple Music)",
                "Party mode for synchronized music",
                "Voice-controlled playback",
                "Premium brands: Sonos, KEF, Bowers & Wilkins"
            ]
        },
        {
            "title": "Total Security Integration",
            "description": "Advanced security systems with smart locks, cameras, sensors, and access control. Monitor and manage your entire property from anywhere in the world.",
            "icon": "shield",
            "benefits": [
                "4K security cameras (Hikvision, Axis)",
                "Smart door locks & access logs",
                "Motion sensors & glass break detectors",
                "Instant mobile alerts",
                "Video doorbell integration",
                "Automated security scenes (Away, Night, Vacation)"
            ]
        },
        {
            "title": "Intelligent Scenes & Automation",
            "description": "Pre-programmed scenarios automate multiple systems with a single command. 'Good Morning' opens blinds, adjusts temperature, starts coffee. 'Away' secures everything.",
            "icon": "zap",
            "benefits": [
                "One-touch scene activation",
                "Time-based automation",
                "Geofencing for arrival/departure",
                "Integration across all systems",
                "Customizable for your lifestyle",
                "Learning AI for pattern optimization"
            ]
        },
        {
            "title": "Voice & App Control",
            "description": "Control everything via smartphone apps (iOS/Android), voice commands (Alexa, Google in Arabic/English), or elegant wall touchscreens.",
            "icon": "smartphone",
            "benefits": [
                "Control4/Crestron mobile apps",
                "Arabic & English voice control",
                "Apple Watch integration",
                "Family member profiles",
                "Remote access from anywhere",
                "Offline control guaranteed"
            ]
        }
    ],
    
    "benefits": [
        {
            "title": "Effortless Daily Living",
            "description": "Your home anticipates your needs. Morning routines, entertainment settings, and security protocols activate automatically based on your schedule and preferences."
        },
        {
            "title": "Significant Energy Savings",
            "description": "Smart automation reduces DEWA bills by 30-40%. Intelligent lighting, climate control, and energy monitoring eliminate waste while maintaining comfort."
        },
        {
            "title": "Enhanced Security & Peace of Mind",
            "description": "24/7 monitoring, instant alerts, and remote access ensure your family and property are always protected—whether you're home, at work, or traveling abroad."
        },
        {
            "title": "Property Value Premium",
            "description": "Smart homes in Emirates Hills and Palm Jumeirah command 15-25% price premiums. Buyers actively seek Control4/Crestron integration in luxury properties."
        },
        {
            "title": "Future-Proof Investment",
            "description": "Modular architecture allows system expansion. Add new rooms, upgrade equipment, or integrate emerging technologies without complete overhauls."
        },
        {
            "title": "Luxury Guest Experience",
            "description": "Impress guests with automated welcome scenes, personalized room settings, and intuitive controls. Your home becomes the talk of Dubai's elite circles."
        }
    ],
    
    "use_cases": [
        {
            "title": "Emirates Hills Mega-Villa",
            "description": "15,000 sq ft automation with 8 zones, 150+ lights, 12-zone audio, home cinema, outdoor living, pool control, and comprehensive security. Investment: AED 850,000. Annual energy savings: AED 45,000."
        },
        {
            "title": "Downtown Dubai Penthouse",
            "description": "4,500 sq ft luxury apartment with floor-to-ceiling window automation, multi-room audio, voice control, and Burj Khalifa view lighting scenes. Investment: AED 320,000. Property value increase: 18%."
        },
        {
            "title": "Palm Jumeirah Villa",
            "description": "8,000 sq ft beachfront property with indoor-outdoor integration, security cameras, climate optimization, and entertainment systems. Investment: AED 580,000. ROI: 3.5 years through energy savings."
        },
        {
            "title": "Arabian Ranches Family Home",
            "description": "6,000 sq ft villa focused on comfort and security—automated lighting, multi-zone climate, kids' room controls, and comprehensive monitoring. Investment: AED 380,000. Perfect for growing families."
        }
    ],
    
    "technical_specs": {
        "automation": "Control4, Crestron, Savant, KNX",
        "lighting": "Lutron HomeWorks/RadioRA, KNX, DALI",
        "audio": "Sonos, KEF, Bowers & Wilkins, Bose",
        "video": "4K distribution, Sony, Samsung displays",
        "security": "Hikvision, Axis cameras, Yale smart locks",
        "climate": "Nest, Ecobee, Honeywell smart thermostats",
        "voice": "Alexa, Google Assistant (Arabic/English)",
        "network": "UniFi, Cisco enterprise WiFi",
        "warranty": "3-5 years full system coverage"
    },
    
    "brands": [
        "Control4",
        "Crestron",
        "Lutron",
        "Sonos",
        "KEF",
        "Bowers & Wilkins",
        "Hikvision",
        "Axis",
        "Yale",
        "Nest",
        "Google",
        "Amazon Alexa"
    ],
    
    "faqs": [
        {
            "question": "What exactly is smart home automation and how does it work?",
            "answer": "Smart home automation integrates all your home systems—lighting, climate, audio/video, security, blinds—into a single unified control platform (Control4, Crestron, or Savant). Instead of separate remotes and switches for each system, you control everything from smartphone apps, voice commands, wall keypads, or automated scenes. For example, 'Good Morning' opens blinds, adjusts temperature, turns on kitchen lights, and plays news—all with one command."
        },
        {
            "question": "How much does complete smart home automation cost in Dubai?",
            "answer": "Costs vary by property size and features: Apartments (1,500-3,000 sqft): AED 120,000-250,000; Villas (4,000-8,000 sqft): AED 300,000-600,000; Luxury estates (10,000+ sqft): AED 700,000-1,500,000. Includes Control4/Crestron, Lutron lighting, multi-room audio, security, installation, and programming. Emirates Hills projects average AED 850,000 for comprehensive automation."
        },
        {
            "question": "Control4 vs Crestron—which system is better for Dubai homes?",
            "answer": "Control4 suits most villas (4,000-8,000 sqft) offering excellent value, reliability, and ease of use. Budget: AED 250,000-500,000. Crestron excels in luxury estates (10,000+ sqft) requiring ultimate customization and scalability. Budget: AED 600,000+. Both perform flawlessly in Dubai's climate. LEXA will recommend the optimal system based on your property size, budget, and customization needs."
        },
        {
            "question": "Can I retrofit smart home automation into existing properties?",
            "answer": "Yes! Wireless technologies (Lutron RadioRA, Control4 wireless) enable retrofit automation without rewiring. We install in occupied homes with minimal disruption. Timeline: 4-6 weeks for apartments, 8-10 weeks for villas. Ideal for properties where extensive cabling isn't feasible. Retrofit costs 20-30% less than wired installations."
        },
        {
            "question": "Will smart home work without internet? What about power outages?",
            "answer": "Yes, professional Control4/Crestron systems work entirely offline for local control—wall switches, keypads, voice commands, and automations function without internet. Only cloud features (remote access, weather) need connectivity. Power: Systems reboot automatically after outages, restoring all settings. UPS backup (optional) maintains operation during brief outages."
        },
        {
            "question": "What are the energy savings with smart home automation?",
            "answer": "Typical savings: 30-40% on DEWA bills through automated climate control (zones unused rooms), intelligent lighting (dimming, occupancy sensors), and scheduled operation. Average Emirates Hills villa saves AED 30,000-50,000 annually. Downtown penthouses save AED 15,000-25,000. ROI: 3-5 years. Systems also extend equipment life by preventing unnecessary operation."
        },
        {
            "question": "Can voice control work in Arabic for smart homes in UAE?",
            "answer": "Yes! Amazon Alexa and Google Assistant fully support Arabic voice commands. Control lights, climate, music, security—everything—in Arabic: 'أطفئ الأنوار' (turn off lights), 'شغل المكيف' (turn on AC). Systems understand Modern Standard Arabic and Gulf dialect. Bilingual homes work seamlessly with mixed English/Arabic commands."
        },
        {
            "question": "How long does smart home installation take in Dubai?",
            "answer": "New construction/renovation: 8-12 weeks (design, wiring, installation, programming). Retrofit/existing homes: 6-8 weeks. Mega-villas (10,000+ sqft): 14-18 weeks. Timeline includes site surveys, design approvals, equipment procurement, installation, and comprehensive testing. We coordinate with contractors to minimize project delays."
        },
        {
            "question": "What maintenance does smart home automation require?",
            "answer": "Minimal. Annual service packages (AED 8,000-15,000) include: software updates, system health checks, automation adjustments, equipment cleaning, and priority support. Systems are designed for 10+ years of reliable operation. Remote diagnostics resolve 60% of issues without site visits. Extended warranties available to 5 years."
        },
        {
            "question": "Can I control my Dubai smart home while traveling abroad?",
            "answer": "Yes. Secure remote access via smartphone apps (iOS/Android) works globally. Monitor security cameras, adjust climate, control lights, receive alerts—from London, Singapore, or anywhere with internet. All connections use bank-grade encryption. Control works over cellular data or WiFi."
        },
        {
            "question": "What happens if Control4/Crestron company goes out of business?",
            "answer": "Both are industry leaders (40+ years combined history) with strong financials. Systems continue working indefinitely—offline control never depends on cloud services. Local programming is stored on in-home processors. Equipment is modular and replaceable. Our 10-year support commitment ensures your investment is protected."
        },
        {
            "question": "How does smart home increase property value in Dubai real estate?",
            "answer": "Smart homes command 15-25% premiums in luxury markets: Emirates Hills villas: +AED 1M-3M value; Palm Jumeirah properties: +AED 800K-2M; Downtown penthouses: +AED 500K-1.5M. Buyers specifically search for 'smart home' and 'Control4' in listings. Properties sell 40% faster. Essential for AED 8M+ luxury segment."
        }
    ],
    
    "cta_text": "Design Your Smart Home",
    "cta_subtitle": "Book a consultation with Dubai's leading smart home specialists",
    
    "price_range": "AED 120,000 - 1,500,000",
    "installation_time": "6-18 weeks",
    "warranty": "3-5 years comprehensive",
    
    "seo_title": "Smart Home Automation Dubai | #1 Control4 & Crestron Dealer UAE",
    "seo_description": "Dubai's premier smart home automation company. Control4 & Crestron experts. 500+ luxury villas automated in Emirates Hills, Palm Jumeirah, Downtown. Book free consultation.",
    "seo_keywords": [
        "smart home automation Dubai",
        "Control4 Dubai",
        "Crestron Dubai",
        "home automation UAE",
        "smart villa Dubai",
        "luxury home automation",
        "automated home Dubai",
        "smart home company Dubai",
        "home automation cost Dubai",
        "best smart home Dubai"
    ],
    
    "created_at": datetime.now(timezone.utc).isoformat(),
    "updated_at": datetime.now(timezone.utc).isoformat()
}


async def create_smart_home_solution():
    """Add Smart Home Automation flagship solution"""
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        
        print("🚀 Creating Smart Home Automation flagship solution...")
        
        existing = await db.solutions.find_one({"slug": "smart-home"})
        if existing:
            print("⚠️  Solution 'smart-home' already exists. Updating...")
            await db.solutions.replace_one(
                {"slug": "smart-home"},
                SMART_HOME_SOLUTION
            )
            print("✅ Solution updated!")
        else:
            await db.solutions.insert_one(SMART_HOME_SOLUTION)
            print("✅ Solution created!")
        
        print("\n📊 Solution Details:")
        print("   Slug: smart-home")
        print(f"   Title: {SMART_HOME_SOLUTION['title']}")
        print(f"   Features: {len(SMART_HOME_SOLUTION['features'])}")
        print(f"   Feature Cards: {len(SMART_HOME_SOLUTION['feature_cards'])}")
        print(f"   FAQs: {len(SMART_HOME_SOLUTION['faqs'])}")
        print(f"   Use Cases: {len(SMART_HOME_SOLUTION['use_cases'])}")
        print(f"   Price Range: {SMART_HOME_SOLUTION['price_range']}")
        print("\n🌐 URL: https://smart-builder-launch.preview.emergentagent.com/solutions/smart-home")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise


if __name__ == "__main__":
    asyncio.run(create_smart_home_solution())

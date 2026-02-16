"""
Comprehensive Services Seeder - All 10 Services with Detailed Content
Based on https://lexalifestyle.com/lexa-services/
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "lexa_lifestyle"

async def seed_all_services():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    services_collection = db.services
    
    # Clear existing services
    result = await services_collection.delete_many({})
    print(f"🗑️  Deleted {result.deleted_count} old services")
    
    services = [
        {
            "id": str(uuid4()),
            "slug": "consultation-design",
            "title": "Consultation & Design",
            "category": "Planning & Strategy",
            "description": "Tailored audits, environment analysis, and use-case scoping",
            "long_description": "Our Consultation & Design services help you plan the perfect smart home or office. We guide you through every step, from selecting devices to designing layouts and planning system integration. Our goal is to create a space that is functional, modern, and tailored to your lifestyle or business needs. We consider your goals, preferences, and budget to design solutions that are both practical and innovative.",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Project requirement assessment",
                "Site survey and feasibility study",
                "Concept and layout design",
                "System specification and equipment selection",
                "Budget planning and consultation",
                "Future-proof upgrade recommendations"
            ],
            "process": [
                "Analyze project requirements and space layout",
                "Create efficient system design",
                "Provide 3D visualizations and demos",
                "Plan for scalability and future upgrades"
            ],
            "icon": "Compass",
            "tags": ["PLANNING", "DESIGN", "CONSULTATION"]
        },
        {
            "id": str(uuid4()),
            "slug": "system-engineering-integration",
            "title": "System Engineering & Integration",
            "category": "Technical Implementation",
            "description": "Technical architecture, cabling, and seamless technology fusion",
            "long_description": "We design and integrate complex technology systems that work together flawlessly. From technical architecture to cabling infrastructure, we ensure all your smart systems communicate seamlessly. Our engineering approach focuses on reliability, performance, and future scalability.",
            "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "System architecture design",
                "Protocol integration and compatibility",
                "Network infrastructure planning",
                "Equipment rack design and installation",
                "Cable management and labeling",
                "System testing and validation"
            ],
            "process": [
                "Design technical architecture",
                "Plan cabling and infrastructure",
                "Integrate all technology systems",
                "Validate system performance"
            ],
            "icon": "Cpu",
            "tags": ["ENGINEERING", "INTEGRATION", "TECHNICAL"]
        },
        {
            "id": str(uuid4()),
            "slug": "wiring",
            "title": "Wiring",
            "category": "Infrastructure",
            "description": "Professional pre-wiring and structured cabling solutions",
            "long_description": "Proper wiring is the foundation of any smart system. We provide professional structured cabling services including CAT6, fiber optic, HDMI, and speaker wire installation. Our clean, organized approach ensures optimal performance and easy maintenance.",
            "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Structured cabling design",
                "CAT6/CAT6A network cabling",
                "Fiber optic installation",
                "HDMI and AV cabling",
                "Speaker wire installation",
                "Cable labeling and documentation"
            ],
            "process": [
                "Plan cable routes and pathways",
                "Install conduits and back boxes",
                "Run and terminate all cables",
                "Test and document infrastructure"
            ],
            "icon": "Cable",
            "tags": ["WIRING", "INFRASTRUCTURE", "CABLING"]
        },
        {
            "id": str(uuid4()),
            "slug": "project-management",
            "title": "Project Management",
            "category": "Execution & Delivery",
            "description": "Turnkey execution from specification through post-handover support",
            "long_description": "Our dedicated project managers oversee every aspect of your installation from start to finish. We coordinate with contractors, manage timelines, handle procurement, and ensure quality at every stage. You get a single point of contact and complete peace of mind.",
            "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Dedicated project coordinator",
                "Timeline and milestone management",
                "Contractor coordination",
                "Procurement and logistics",
                "Quality control and inspections",
                "Post-handover support"
            ],
            "process": [
                "Develop project timeline and milestones",
                "Coordinate with all stakeholders",
                "Manage procurement and installation",
                "Provide post-handover support"
            ],
            "icon": "ClipboardCheck",
            "tags": ["MANAGEMENT", "COORDINATION", "DELIVERY"]
        },
        {
            "id": str(uuid4()),
            "slug": "commissioning-support",
            "title": "Commissioning & Support",
            "category": "Activation & Maintenance",
            "description": "System validation, user training, and lifecycle maintenance",
            "long_description": "We don't just install and leave. Our commissioning process includes complete system testing, optimization, and user training. Our ongoing support ensures your systems continue to perform perfectly with regular maintenance, updates, and 24/7 technical assistance.",
            "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Complete system commissioning",
                "Performance optimization",
                "Comprehensive user training",
                "Documentation and manuals",
                "Ongoing maintenance plans",
                "24/7 technical support"
            ],
            "process": [
                "Test and validate all systems",
                "Optimize performance settings",
                "Train users on system operation",
                "Provide ongoing maintenance and support"
            ],
            "icon": "Settings",
            "tags": ["SUPPORT", "TRAINING", "MAINTENANCE"]
        },
        {
            "id": str(uuid4()),
            "slug": "home-cinema-multi-room-av",
            "title": "Home Cinema & Multi-Room AV",
            "category": "Entertainment",
            "description": "Design, installation, and calibration of immersive media spaces",
            "long_description": "Transform your home into an entertainment paradise. We design and install dedicated home cinemas with acoustic treatments, high-end projection, and immersive audio. Our multi-room AV solutions let you enjoy music and video throughout your property with seamless control.",
            "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Dedicated cinema room design",
                "Acoustic treatment and soundproofing",
                "4K/8K projection systems",
                "Dolby Atmos audio installation",
                "Multi-room audio distribution",
                "Video matrix switching"
            ],
            "process": [
                "Design cinema layout and acoustics",
                "Install projection and audio systems",
                "Calibrate video and audio",
                "Set up multi-room distribution"
            ],
            "icon": "Film",
            "tags": ["CINEMA", "AUDIO", "VIDEO"]
        },
        {
            "id": str(uuid4()),
            "slug": "security-surveillance-systems",
            "title": "Security & Surveillance Systems",
            "category": "Security",
            "description": "Integrated alarm, access control, and remote monitoring",
            "long_description": "Protect your property with advanced security systems. We integrate CCTV, access control, intrusion detection, and alarm systems into a unified platform. Monitor your property from anywhere with remote access and smart notifications.",
            "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "IP CCTV camera installation",
                "Video analytics and AI detection",
                "Access control systems",
                "Intrusion detection alarms",
                "Video intercom integration",
                "Remote monitoring and alerts"
            ],
            "process": [
                "Assess security requirements",
                "Design camera coverage and access points",
                "Install and configure systems",
                "Integrate with smart home automation"
            ],
            "icon": "Shield",
            "tags": ["SECURITY", "SURVEILLANCE", "SAFETY"]
        },
        {
            "id": str(uuid4()),
            "slug": "network-infrastructure-it",
            "title": "Network Infrastructure & IT",
            "category": "Connectivity",
            "description": "High-performance wired and wireless networking for connected homes",
            "long_description": "A robust network is essential for modern smart homes. We design and install enterprise-grade wired and wireless networks with full coverage, high bandwidth, and rock-solid reliability. Our solutions ensure all your devices stay connected with optimal performance.",
            "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Structured network design",
                "Enterprise-grade WiFi systems",
                "Managed switches and routers",
                "Network security configuration",
                "VLAN and guest network setup",
                "Network monitoring and management"
            ],
            "process": [
                "Design network architecture",
                "Install wired and wireless infrastructure",
                "Configure security and VLANs",
                "Test coverage and performance"
            ],
            "icon": "Wifi",
            "tags": ["NETWORK", "IT", "CONNECTIVITY"]
        },
        {
            "id": str(uuid4()),
            "slug": "voice-app-control-integration",
            "title": "Voice & App Control Integration",
            "category": "User Interface",
            "description": "Unified smart system interfaces via voice and mobile platforms",
            "long_description": "Control everything with your voice or smartphone. We integrate your smart systems with Alexa, Google Assistant, Siri, and custom mobile apps. Create a unified control experience that's intuitive and responsive across all your devices.",
            "image": "https://images.unsplash.com/photo-1589254065878-42c9da997008?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Voice assistant integration (Alexa, Google, Siri)",
                "Custom mobile app development",
                "Unified control interfaces",
                "Scene and automation programming",
                "Multi-user profiles",
                "Remote access setup"
            ],
            "process": [
                "Integrate voice assistants",
                "Configure mobile app controls",
                "Program scenes and automations",
                "Train users on voice commands"
            ],
            "icon": "Smartphone",
            "tags": ["VOICE CONTROL", "APP", "INTERFACE"]
        },
        {
            "id": str(uuid4()),
            "slug": "digital-signage-enterprise-av",
            "title": "Digital Signage & Enterprise AV",
            "category": "Commercial Solutions",
            "description": "Custom AV, conferencing, and signage setups for offices and venues",
            "long_description": "Enhance your business with professional AV solutions. From video conferencing rooms to digital signage displays, we create impactful technology experiences for offices, retail spaces, and entertainment venues. Our enterprise solutions boost productivity and engagement.",
            "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Video conferencing room setup",
                "Digital signage installations",
                "Interactive display solutions",
                "Boardroom AV systems",
                "Control room installations",
                "Content management platforms"
            ],
            "process": [
                "Assess business AV requirements",
                "Design professional AV systems",
                "Install displays and conferencing equipment",
                "Configure content management"
            ],
            "icon": "Presentation",
            "tags": ["COMMERCIAL", "AV", "SIGNAGE"]
        }
    ]
    
    # Insert all services
    result = await services_collection.insert_many(services)
    print(f"✅ Successfully inserted {len(result.inserted_ids)} services to {DB_NAME}")
    
    # Verify
    count = await services_collection.count_documents({})
    print(f"📊 Total services in database: {count}")
    
    # Show all service titles
    all_services = await services_collection.find({}, {"title": 1, "_id": 0}).to_list(20)
    print("\n📋 All Services:")
    for i, s in enumerate(all_services, 1):
        print(f"  {i}. {s['title']}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_all_services())

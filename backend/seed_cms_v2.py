"""
CMS Seed Script v2 - Seeds ALL remaining hardcoded page content.
Run: python seed_cms_v2.py
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")

CMS_SECTIONS = {
    # ========== ABOUT PAGE ==========
    "page_about": {
        "hero_title_en": "About LEXA Lifestyle",
        "hero_title_ar": "عن ليكسا لايف ستايل",
        "hero_subtitle_en": "Dubai's Premier Smart Home & AV Integration Company",
        "hero_subtitle_ar": "الشركة الرائدة في دبي لتكامل المنازل الذكية والأنظمة السمعية البصرية",
        "story_en": "Founded in 2005, LEXA Lifestyle has grown to become Dubai's most trusted name in luxury smart home integration. From humble beginnings, we've delivered over 1,000 projects across the UAE and GCC.",
        "story_ar": "تأسست ليكسا لايف ستايل في عام 2005، ونمت لتصبح الاسم الأكثر ثقة في دبي لتكامل المنازل الذكية الفاخرة.",
        "values": [
            {"icon": "Award", "title_en": "Innovation with Purpose", "title_ar": "الابتكار بهدف", "description_en": "We select and integrate technologies that genuinely improve comfort, control, and lifestyle – not gadgets for the sake of it.", "description_ar": "نختار وندمج التقنيات التي تحسّن الراحة والتحكم ونمط الحياة فعلياً"},
            {"icon": "Users", "title_en": "Design-Led Thinking", "title_ar": "التفكير المبني على التصميم", "description_en": "Every solution respects architecture, interiors, and the way our clients actually live in their spaces.", "description_ar": "كل حل يحترم العمارة والديكور الداخلي وطريقة عيش عملائنا في مساحاتهم"},
            {"icon": "Building", "title_en": "Uncompromising Quality", "title_ar": "جودة لا تقبل التنازل", "description_en": "From brands we partner with to the cables behind the walls, we insist on long-term reliability and performance.", "description_ar": "من العلامات التجارية التي نتشارك معها إلى الكابلات خلف الجدران، نصر على الموثوقية"},
            {"icon": "Target", "title_en": "Client-Centric Delivery", "title_ar": "التسليم المرتكز على العميل", "description_en": "We communicate clearly, meet timelines, and stay accountable from concept to completion and beyond.", "description_ar": "نتواصل بوضوح، ونلتزم بالمواعيد، ونتحمل المسؤولية من الفكرة إلى الإنجاز"}
        ],
        "milestones": [
            {"year": "2005", "title_en": "Founded in Dubai", "title_ar": "التأسيس في دبي", "description_en": "Started with a vision to elevate smart living in the UAE"},
            {"year": "2010", "title_en": "Experience Center", "title_ar": "مركز التجربة", "description_en": "Opened 60,000 sq ft showroom showcasing integrated systems"},
            {"year": "2015", "title_en": "500 Projects", "title_ar": "500 مشروع", "description_en": "Milestone achievement across residential and commercial sectors"},
            {"year": "2020", "title_en": "Regional Expansion", "title_ar": "التوسع الإقليمي", "description_en": "Extended services across GCC markets"},
            {"year": "2025", "title_en": "1,000+ Projects", "title_ar": "+1,000 مشروع", "description_en": "Trusted partner for luxury developments and high-end residences"}
        ],
        "partners": ["Crestron", "Lutron", "Control4", "Savant", "Bang & Olufsen", "Sonos", "Bowers & Wilkins", "Nest"]
    },

    # ========== CONTACT PAGE ==========
    "page_contact": {
        "hero_title_en": "Let's Start Your Project",
        "hero_title_ar": "لنبدأ مشروعك",
        "hero_subtitle_en": "Ready to transform your space? Our team is here to help you create the perfect smart home experience.",
        "hero_subtitle_ar": "هل أنت مستعد لتحويل مساحتك؟ فريقنا هنا لمساعدتك في إنشاء تجربة المنزل الذكي المثالية.",
        "address": "Al Quoz 1, Sheikh Zayed Road, 3rd Interchange, Dubai, UAE",
        "map_lat": 25.1416,
        "map_lng": 55.2204,
        "phone": "+971 42 670 470",
        "email": "info@lexalifestyle.com",
        "working_hours_en": "Sun - Thu: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM",
        "working_hours_ar": "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً | السبت: 10:00 صباحاً - 4:00 مساءً",
        "social_links": [
            {"name": "Instagram", "url": "https://www.instagram.com/lexalifestyle.ae/"},
            {"name": "Facebook", "url": "https://www.facebook.com/lexalifestyle.ae/"},
            {"name": "LinkedIn", "url": "https://www.linkedin.com/company/lexalifestyle/"},
            {"name": "YouTube", "url": "https://www.youtube.com/@lexalifestyle"}
        ]
    },

    # ========== CONSULTATION PAGE ==========
    "page_consultation": {
        "hero_title_en": "Book Your Free Consultation",
        "hero_title_ar": "احجز استشارتك المجانية",
        "hero_subtitle_en": "Take the first step towards your smart home transformation. Our consultations are free, no-obligation, and tailored to your needs.",
        "hero_subtitle_ar": "اتخذ الخطوة الأولى نحو تحويل منزلك الذكي.",
        "consultation_types": [
            {"icon": "MapPin", "title": "Free Site Visit", "duration": "60-90 minutes", "description": "Our expert team visits your property for a comprehensive survey", "features": ["Property assessment", "Technical recommendations", "Budget discussion", "Timeline planning"], "cta": "Schedule Site Visit", "popular": True},
            {"icon": "Home", "title": "Experience Center Tour", "duration": "45-60 minutes", "description": "Visit our showroom to see smart home systems in action", "features": ["Live product demonstrations", "Touch and feel devices", "Compare solutions", "Q&A with specialists"], "cta": "Book Center Visit", "popular": False},
            {"icon": "Video", "title": "Video Consultation", "duration": "30 minutes", "description": "Virtual meeting with our smart home experts", "features": ["Screen share capabilities", "Discuss your project", "Get preliminary quotes", "Q&A session"], "cta": "Schedule Video Call", "popular": False}
        ],
        "process_steps": [
            {"number": "01", "icon": "Calendar", "title": "Private Design Session", "description": "Choose your preferred consultation type and select a convenient time slot"},
            {"number": "02", "icon": "FileText", "title": "Discover & Design", "description": "We assess your needs, discuss solutions, and create a tailored proposal"},
            {"number": "03", "icon": "Wrench", "title": "Installation", "description": "Professional installation by certified technicians with minimal disruption"},
            {"number": "04", "icon": "Headphones", "title": "Ongoing Support", "description": "Lifetime support, warranty coverage, and system optimization"}
        ]
    },

    # ========== EXPERIENCE CENTRE PAGE ==========
    "page_experience_centre": {
        "hero_title_en": "LEXA Experience Centre",
        "hero_title_ar": "مركز تجربة ليكسا",
        "hero_subtitle_en": "Step into the future of smart living at our 5,000+ sq ft state-of-the-art showroom in Al Quoz, Dubai.",
        "hero_subtitle_ar": "ادخل مستقبل الحياة الذكية في صالة العرض الحديثة بمساحة 5,000+ قدم مربع في القوز، دبي.",
        "zones": [
            {"id": 1, "name": "Smart Living Room", "description": "Experience integrated lighting, climate, audio, and entertainment control", "features": ["Voice Control", "Scene Automation", "Multi-zone Audio", "Motorized Blinds"], "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"},
            {"id": 2, "name": "Home Cinema Zone", "description": "Immerse yourself in Dolby Atmos surround sound and 4K laser projection", "features": ["Dolby Atmos 7.4.4", "4K Laser Projection", "Acoustic Treatment", "Theater Seating"], "image": "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80"},
            {"id": 3, "name": "Hi-Fi Audio Room", "description": "Listen to the world's finest audio systems in a purpose-built listening room", "features": ["B&W 800 Series", "McIntosh Amplifiers", "Room Correction", "Vinyl Playback"], "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"},
            {"id": 4, "name": "Lighting Design Studio", "description": "See how intelligent lighting transforms spaces throughout the day", "features": ["Circadian Lighting", "Scene Control", "Lutron Palladiom", "Landscape Lighting"], "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"},
            {"id": 5, "name": "Security Command", "description": "Explore AI-powered surveillance and access control systems", "features": ["AI Cameras", "Access Control", "Intercom Systems", "Energy Monitoring"], "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"},
            {"id": 6, "name": "Networking Hub", "description": "Discover enterprise-grade networking for seamless smart home connectivity", "features": ["Wi-Fi 7", "Fiber Distribution", "Rack Systems", "Cybersecurity"], "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"}
        ],
        "visit_info": {
            "address": "Al Quoz 1, Dubai",
            "phone": "+971 42 670 470",
            "hours": "Sun-Thu: 9AM-6PM, Sat: 10AM-4PM",
            "parking": "Free parking available"
        }
    },

    # ========== FOOTER ==========
    "site_footer": {
        "company_description_en": "Dubai's premier luxury smart home & AV integration company. Delivering intelligent living experiences since 2005.",
        "company_description_ar": "الشركة الرائدة في دبي لتكامل المنازل الذكية والأنظمة السمعية البصرية الفاخرة.",
        "phone": "+971 42 670 470",
        "email": "info@lexalifestyle.com",
        "address_en": "Al Quoz 1, Dubai, UAE",
        "address_ar": "القوز 1، دبي، الإمارات",
        "social_links": {
            "instagram": "https://www.instagram.com/lexalifestyle.ae/",
            "facebook": "https://www.facebook.com/lexalifestyle.ae/",
            "linkedin": "https://www.linkedin.com/company/lexalifestyle/",
            "youtube": "https://www.youtube.com/@lexalifestyle"
        }
    },

    # ========== SERVICE: HOME THEATER ==========
    "service_home_theater": {
        "title": "Home Theater Installation Dubai",
        "hero_subtitle": "Dubai's Premier Private Cinema Designers & Installers",
        "features": [
            {"icon": "Projector", "title": "Laser Projection", "desc": "Sony, JVC, Barco 4K & 8K laser projectors with HDR10+"},
            {"icon": "Volume2", "title": "Dolby Atmos", "desc": "Immersive object-based audio with up to 9.4.6 configurations"},
            {"icon": "Monitor", "title": "LED Video Walls", "desc": "Samsung & Sony MicroLED for daylight viewing"},
            {"icon": "Speaker", "title": "JBL Synthesis", "desc": "Reference-grade cinema speakers and subwoofers"}
        ],
        "projects": [
            {"name": "Private IMAX", "type": "21-seat cinema", "location": "Palm Jumeirah"},
            {"name": "Dolby Atmos Suite", "type": "12-seat theater", "location": "Emirates Hills"},
            {"name": "Media Lounge", "type": "Casual viewing", "location": "Dubai Hills"},
            {"name": "Yacht Cinema", "type": "Marine installation", "location": "Dubai Marina"}
        ],
        "faqs": [
            {"q": "How much does a home theater cost in Dubai?", "a": "Home theater installations in Dubai range from AED 80,000 for a quality media room to AED 1,000,000+ for a reference-grade private cinema."},
            {"q": "What is Dolby Atmos and why do I need it?", "a": "Dolby Atmos is an immersive audio technology that places sounds in 3D space, including overhead."},
            {"q": "Do you design acoustically treated cinema rooms?", "a": "Yes, acoustic design is fundamental to our home theater installations."},
            {"q": "What's better: projector or LED video wall?", "a": "Both have merits. 4K laser projectors offer the largest screen sizes at lower cost. LED video walls provide superior brightness."},
            {"q": "Can you install home theaters in existing villas?", "a": "Absolutely. We specialize in retrofitting home theaters into existing Dubai villas."}
        ]
    },

    # ========== SERVICE: SMART LIGHTING ==========
    "service_smart_lighting": {
        "title": "Smart Lighting Systems Dubai",
        "hero_subtitle": "Intelligent Lighting Design & Automation for Luxury Spaces",
        "features": [
            {"icon": "Lightbulb", "title": "Lutron HomeWorks", "desc": "Premium lighting control with precise dimming and scene management"},
            {"icon": "Sun", "title": "Circadian Lighting", "desc": "Tunable white systems that follow your natural rhythm"},
            {"icon": "Palette", "title": "RGBW Color", "desc": "Full spectrum color for mood lighting and architectural accents"},
            {"icon": "Layers", "title": "Landscape Lighting", "desc": "Outdoor and garden lighting with astronomical scheduling"}
        ],
        "projects": [
            {"name": "Villa Lighting", "type": "Full home Lutron", "location": "Emirates Hills"},
            {"name": "Penthouse Scenes", "type": "Smart scene control", "location": "DIFC"},
            {"name": "Garden Design", "type": "Landscape lighting", "location": "Arabian Ranches"},
            {"name": "Office Automation", "type": "Commercial lighting", "location": "Business Bay"}
        ]
    },

    # ========== SERVICE: HOME CINEMA ==========
    "service_home_cinema": {
        "title": "Home Cinema Design Dubai",
        "hero_subtitle": "Bespoke Cinema Room Design for Luxury Residences",
        "features": [
            {"icon": "Film", "title": "Cinema Design", "desc": "Complete cinema room design including seating, acoustics, and aesthetics"},
            {"icon": "Volume2", "title": "Surround Sound", "desc": "Dolby Atmos and DTS:X immersive audio systems"},
            {"icon": "Monitor", "title": "Screen Technology", "desc": "Projectors, LED walls, and motorized screens"},
            {"icon": "Armchair", "title": "Theater Seating", "desc": "Premium reclining cinema seats with custom upholstery"}
        ]
    },

    # ========== SERVICE: LUXURY VILLA AUTOMATION ==========
    "service_luxury_villa_automation": {
        "title": "Luxury Villa Smart Home Automation Dubai",
        "hero_subtitle": "Complete Home Automation for Dubai's Finest Residences",
        "features": [
            {"icon": "Home", "title": "Whole-Home Control", "desc": "Unified control of lighting, climate, audio, security, and blinds"},
            {"icon": "Smartphone", "title": "App Control", "desc": "Control your entire home from your smartphone anywhere in the world"},
            {"icon": "Shield", "title": "Smart Security", "desc": "AI-powered cameras, access control, and intrusion detection"},
            {"icon": "Thermometer", "title": "Climate Control", "desc": "Intelligent HVAC management with zone-based temperature control"}
        ]
    },

    # ========== SERVICE: OUTDOOR AUDIO ==========
    "service_outdoor_audio": {
        "title": "Outdoor Audio Systems Dubai",
        "hero_subtitle": "Premium Outdoor Sound for Gardens, Pools & Entertainment Areas",
        "features": [
            {"icon": "Speaker", "title": "Weatherproof Speakers", "desc": "Marine-grade speakers designed for Dubai's climate"},
            {"icon": "Music", "title": "Multi-Zone Audio", "desc": "Independent audio zones for pool, garden, and terrace"},
            {"icon": "Wifi", "title": "Wireless Streaming", "desc": "AirPlay, Chromecast, and Sonos integration"},
            {"icon": "Volume2", "title": "Subterranean Bass", "desc": "In-ground subwoofers for powerful, invisible bass"}
        ]
    },

    # ========== SERVICE: HIGH-END AUDIO ==========
    "service_high_end_audio": {
        "title": "High-End Audio Systems Dubai",
        "hero_subtitle": "Audiophile-Grade Sound Systems for Discerning Listeners",
        "features": [
            {"icon": "Music", "title": "Hi-Fi Systems", "desc": "Reference-grade audio from B&W, McIntosh, Naim, and Devialet"},
            {"icon": "Speaker", "title": "Speaker Design", "desc": "Custom speaker placement and room acoustic optimization"},
            {"icon": "Radio", "title": "Vinyl & Streaming", "desc": "Turntables, streamers, and DACs for every source"},
            {"icon": "Settings", "title": "Room Correction", "desc": "Dirac Live and Trinnov room correction technology"}
        ]
    },

    # ========== SERVICE: MULTI-ROOM AUDIO ==========
    "service_multi_room_audio": {
        "title": "Multi-Room Audio Systems Dubai",
        "hero_subtitle": "Seamless Music Throughout Your Home",
        "features": [
            {"icon": "Music", "title": "Sonos Ecosystem", "desc": "Whole-home wireless audio with Sonos speakers and amplifiers"},
            {"icon": "Speaker", "title": "In-Ceiling Speakers", "desc": "Invisible audio with premium in-ceiling and in-wall speakers"},
            {"icon": "Layers", "title": "Zone Control", "desc": "Independent music in every room with unified control"},
            {"icon": "Smartphone", "title": "Voice Control", "desc": "Alexa, Google, and Siri integration for hands-free control"}
        ]
    },
}


async def seed():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    seeded = 0
    skipped = 0
    for key, value in CMS_SECTIONS.items():
        existing = await db.settings.find_one({"key": key})
        if existing:
            print(f"  SKIP: '{key}' already exists")
            skipped += 1
            continue
        await db.settings.update_one(
            {"key": key},
            {"$set": {"key": key, "value": value}},
            upsert=True
        )
        print(f"  SEED: '{key}'")
        seeded += 1
    print(f"\nDone: {seeded} seeded, {skipped} skipped")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())

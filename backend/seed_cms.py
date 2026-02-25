"""
CMS Seed Script - Populates all hardcoded content into MongoDB settings collection.
Run once to initialize CMS data: python seed_cms.py
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
    "homepage_hero": {
        "video_clips": [
            "/videos/hero-v3/v3_01_dramatic_entrance.mp4",
            "/videos/hero/01_arrival.mp4",
            "/videos/hero/02_interior_reveal.mp4",
            "/videos/hero/04_living_tech.mp4",
            "/videos/hero/05_cinema_room.mp4",
            "/videos/hero/07_villa_night.mp4"
        ],
        "heading_en": "INTEGRATED LUXURY LIVING",
        "heading_ar": "حياة فاخرة متكاملة",
        "subheading_en": "Designed & delivered end-to-end. Experience Dubai's premier luxury smart home solutions.",
        "subheading_ar": "مصممة ومنفذة من البداية إلى النهاية. اكتشف أرقى حلول المنازل الذكية في دبي.",
        "cta_primary_text_en": "FIND YOUR PERFECT SOLUTION",
        "cta_primary_text_ar": "اعثر على حلك المثالي",
        "cta_primary_link": "/solutions",
        "cta_secondary_text_en": "WHATSAPP US",
        "cta_secondary_text_ar": "تواصل عبر واتساب"
    },
    "homepage_experience_cta": {
        "heading_en": "Experience Smart Living",
        "heading_ar": "اختبر الحياة الذكية",
        "subheading_en": "Visit our 5,000+ sq ft experience centre in Al Quoz, Dubai",
        "subheading_ar": "زوروا مركز تجربتنا بمساحة 5,000+ قدم مربع في القوز، دبي",
        "highlights": [
            {"icon": "Building2", "label": "5,000+ sq ft", "desc": "Showroom"},
            {"icon": "Sparkles", "label": "32+ Brands", "desc": "Live demos"},
            {"icon": "Play", "label": "6 Zones", "desc": "To explore"}
        ],
        "gallery_images": [
            {"src": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", "title": "Smart Home Showcase", "zone": "Main Hall"},
            {"src": "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80", "title": "Home Cinema Experience", "zone": "Theater Zone"},
            {"src": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", "title": "Audio Listening Room", "zone": "Hi-Fi Zone"},
            {"src": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80", "title": "Lighting Design Studio", "zone": "Lighting Zone"},
            {"src": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80", "title": "Security Command Center", "zone": "Security Zone"}
        ],
        "time_slots": ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
        "address": "Al Quoz 1, Dubai",
        "address_detail": "Sheikh Zayed Road, 3rd Interchange",
        "phone": "+971 42 670 470"
    },
    "homepage_calculator_cards": {
        "section_title_en": "Smart Home Tools",
        "section_title_ar": "أدوات المنزل الذكي",
        "featured_tool": {
            "title": "Smart Project Builder",
            "description": "AI-powered consultant-grade system that analyzes your needs and creates intelligent architecture proposals with 650+ features",
            "href": "/project-builder",
            "cta": "Start Building",
            "badge": "NEW",
            "icon": "Brain"
        },
        "tools": [
            {
                "title": "Package Builder",
                "description": "Design your complete smart home package step-by-step with live pricing",
                "href": "/package-builder",
                "cta": "Build Your Package",
                "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",
                "icon": "Package"
            },
            {
                "title": "Specialty Rooms",
                "description": "Explore 22 premium specialty room automation solutions",
                "href": "/specialty-rooms",
                "cta": "Explore Rooms",
                "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85&auto=format&fit=crop",
                "icon": "Sparkles"
            },
            {
                "title": "Cost Calculator",
                "description": "Quick estimate your smart home investment",
                "href": "/calculator",
                "cta": "Calculate Cost",
                "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop",
                "icon": "Calculator"
            },
            {
                "title": "ROI Calculator",
                "description": "Analyze your return on investment over time",
                "href": "/roi-calculator",
                "cta": "Calculate ROI",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
                "icon": "TrendingUp"
            }
        ]
    },
    "homepage_trusted_uae": {
        "technology_partners": [
            {"name": "Control4", "logo": "/partners/control4.png", "type": "Official Dealer"},
            {"name": "Crestron", "logo": "/partners/crestron.png", "type": "Certified Integrator"},
            {"name": "Lutron", "logo": "/partners/lutron.png", "type": "Authorized Partner"},
            {"name": "Sonos", "logo": "/partners/sonos.png", "type": "Installation Partner"},
            {"name": "Samsung", "logo": "/partners/samsung.png", "type": "Pro Partner"},
            {"name": "Sony", "logo": "/partners/sony.png", "type": "AV Partner"}
        ],
        "trusted_by": [
            {"name": "Emaar Properties", "type": "Developer"},
            {"name": "Nakheel", "type": "Developer"},
            {"name": "DAMAC", "type": "Developer"},
            {"name": "Sobha Realty", "type": "Developer"},
            {"name": "Meraas", "type": "Developer"},
            {"name": "Dubai Holding", "type": "Developer"}
        ],
        "certifications": [
            {"name": "Control4 Diamond Dealer", "year": "2024"},
            {"name": "Crestron Certified Programmer", "year": "2024"},
            {"name": "CEDIA Member", "year": "Since 2018"},
            {"name": "KNX Partner", "year": "Certified"}
        ],
        "stats": [
            {"number": "500+", "label": "Villas Automated"},
            {"number": "15+", "label": "Years Experience"},
            {"number": "50+", "label": "Developer Projects"},
            {"number": "98%", "label": "Client Satisfaction"}
        ]
    },
    "careers_positions": {
        "heading_en": "Open Positions",
        "heading_ar": "الوظائف المتاحة",
        "positions": [
            {
                "title": "Smart Home Project Manager",
                "department": "Project Management",
                "location": "Dubai, UAE",
                "type": "Full-time",
                "description": "Lead end-to-end smart home integration projects for luxury villas and penthouses across Dubai.",
                "requirements": ["5+ years project management experience", "Smart home/AV integration background", "PMP certification preferred"]
            },
            {
                "title": "AV System Designer",
                "department": "Engineering",
                "location": "Dubai, UAE",
                "type": "Full-time",
                "description": "Design and engineer audio-visual systems for high-end residential and commercial projects.",
                "requirements": ["3+ years AV design experience", "CTS certification", "Control4/Crestron programming"]
            },
            {
                "title": "Sales Consultant - Smart Home Solutions",
                "department": "Sales",
                "location": "Dubai, UAE",
                "type": "Full-time",
                "description": "Drive sales of luxury smart home solutions to HNWI clients and property developers.",
                "requirements": ["3+ years luxury sales experience", "Technical smart home knowledge", "Strong client relationship skills"]
            }
        ]
    }
}


async def seed_cms():
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
        print(f"  SEED: '{key}' created")
        seeded += 1
    
    print(f"\nDone: {seeded} seeded, {skipped} skipped")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_cms())

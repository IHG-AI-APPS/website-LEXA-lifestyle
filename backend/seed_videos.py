import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

videos = [
    {
        "id": "vid-001",
        "title": "LEXA Experience Centre Tour - Dubai's Premier Smart Home Showroom",
        "description": "Take a virtual tour of our state-of-the-art 5,000 sq ft Experience Centre in Al Quoz, Dubai. See live demonstrations of Control4, Crestron, and Lutron systems.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  # Replace with actual URL
        "thumbnail_url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        "duration": "4:32",
        "category": "gallery",
        "tags": ["showroom", "experience centre", "smart home", "dubai"],
        "featured": True,
        "view_count": 0,
        "published_date": "2025-01-15",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-002",
        "title": "Emirates Hills Villa Automation - Complete Home Integration",
        "description": "Watch how we transformed a 12,000 sq ft Emirates Hills villa with complete Control4 automation, Dolby Atmos home cinema, and integrated security.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "duration": "5:18",
        "category": "case-study",
        "tags": ["villa automation", "emirates hills", "control4", "home cinema"],
        "featured": True,
        "view_count": 0,
        "published_date": "2025-01-10",
        "related_service": "installation",
        "related_project": "proj-emirateshills-001",
        "embed_code": None
    },
    {
        "id": "vid-003",
        "title": "Lutron Lighting Control - Before and After",
        "description": "See the dramatic transformation of a Palm Jumeirah penthouse with Lutron HomeWorks QSX lighting control. One-touch scenes that change everything.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
        "duration": "3:45",
        "category": "service",
        "tags": ["lutron", "lighting control", "smart lighting", "palm jumeirah"],
        "featured": False,
        "view_count": 0,
        "published_date": "2025-01-05",
        "related_service": "installation",
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-004",
        "title": "Client Testimonial: Kris Fade - Radio Presenter",
        "description": "Hear from Kris Fade about his experience with LEXA Lifestyle and how smart home automation transformed his family's lifestyle.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
        "duration": "2:15",
        "category": "testimonial",
        "tags": ["testimonial", "kris fade", "client review"],
        "featured": True,
        "view_count": 0,
        "published_date": "2024-12-20",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-005",
        "title": "Dolby Atmos Home Cinema Installation - Downtown Dubai Penthouse",
        "description": "From empty room to world-class cinema. Watch our team install a complete Dolby Atmos 7.2.4 system with acoustic treatment in just 5 days.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800",
        "duration": "6:02",
        "category": "case-study",
        "tags": ["home cinema", "dolby atmos", "installation", "downtown dubai"],
        "featured": False,
        "view_count": 0,
        "published_date": "2024-12-15",
        "related_service": "home-cinema",
        "related_project": "proj-downtown-cinema-001",
        "embed_code": None
    },
    {
        "id": "vid-006",
        "title": "Smart Home vs Traditional Home: Energy Comparison",
        "description": "Real data from two identical villas - one with LEXA automation, one without. See the actual energy savings and ROI over 12 months.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "duration": "4:10",
        "category": "gallery",
        "tags": ["energy savings", "roi", "smart home benefits"],
        "featured": False,
        "view_count": 0,
        "published_date": "2024-12-10",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-007",
        "title": "Crestron vs Control4: Which System is Right for You?",
        "description": "An honest comparison between Crestron and Control4 automation systems. We integrate both - here's how to choose the right one for your project.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
        "duration": "7:25",
        "category": "gallery",
        "tags": ["crestron", "control4", "comparison", "buyer guide"],
        "featured": True,
        "view_count": 0,
        "published_date": "2024-12-01",
        "related_service": "consulting",
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-008",
        "title": "Multi-Room Audio with Sonos Architecture - Arabian Ranches Villa",
        "description": "See how we distributed pristine audio to 15 zones in an Arabian Ranches villa using Sonos Architecture and in-ceiling speakers.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800",
        "duration": "3:55",
        "category": "service",
        "tags": ["audio systems", "sonos", "multi-room audio"],
        "featured": False,
        "view_count": 0,
        "published_date": "2024-11-20",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-009",
        "title": "Security Systems Integration - Complete Surveillance and Access Control",
        "description": "Comprehensive security integration for a Business Bay commercial space. Hikvision cameras, access control, and alarm systems unified under one platform.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
        "duration": "5:30",
        "category": "service",
        "tags": ["security", "surveillance", "access control", "commercial"],
        "featured": False,
        "view_count": 0,
        "published_date": "2024-11-15",
        "related_service": "security",
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-010",
        "title": "Client Testimonial: Akash Kanjwani - Entrepreneur",
        "description": "Akash shares his experience working with LEXA Lifestyle on his Dubai Marina penthouse automation project.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
        "duration": "2:45",
        "category": "testimonial",
        "tags": ["testimonial", "client review", "dubai marina"],
        "featured": True,
        "view_count": 0,
        "published_date": "2024-11-10",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-011",
        "title": "Smart Home Control: Voice vs App vs Wall Panels",
        "description": "Which control method is best? We compare Amazon Alexa, Control4 app, and dedicated wall keypads for everyday smart home control.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1616469829167-5c7e7f18d3f3?w=800",
        "duration": "4:20",
        "category": "gallery",
        "tags": ["voice control", "smart home", "user interface"],
        "featured": False,
        "view_count": 0,
        "published_date": "2024-11-01",
        "related_service": "voice-control",
        "related_project": None,
        "embed_code": None
    },
    {
        "id": "vid-012",
        "title": "Yacht Automation: Luxury Living on Water",
        "description": "Explore our marine automation capabilities. This 120ft yacht features complete Crestron control, climate, lighting, and entertainment systems.",
        "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
        "duration": "6:15",
        "category": "case-study",
        "tags": ["yacht automation", "marine", "luxury", "crestron"],
        "featured": True,
        "view_count": 0,
        "published_date": "2024-10-20",
        "related_service": None,
        "related_project": None,
        "embed_code": None
    }
]

async def seed_videos():
    """Seed the database with video content"""
    try:
        # Clear existing videos
        await db.videos.delete_many({})
        print("✓ Cleared existing videos")
        
        # Insert new videos
        result = await db.videos.insert_many(videos)
        print(f"✓ Inserted {len(result.inserted_ids)} videos")
        
        # Create indexes
        await db.videos.create_index([("category", 1)])
        await db.videos.create_index([("featured", 1)])
        await db.videos.create_index([("published_date", -1)])
        await db.videos.create_index([("related_service", 1)])
        await db.videos.create_index([("related_project", 1)])
        print("✓ Created video indexes")
        
        print(f"\n✅ Successfully seeded {len(videos)} videos")
        
        # Print summary by category
        categories = {}
        for video in videos:
            cat = video['category']
            categories[cat] = categories.get(cat, 0) + 1
        
        print("\n📊 Videos by category:")
        for category, count in categories.items():
            print(f"  - {category}: {count}")
            
    except Exception as e:
        print(f"❌ Error seeding videos: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_videos())

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

news_articles = [
    {
        "id": "lexa-high-end-smart-home-show-2025",
        "slug": "lexa-high-end-smart-home-show-2025",
        "title": "LEXA Lifestyle Showcases at the High-End Smart Home Show 2025",
        "excerpt": "LEXA Lifestyle proudly showcased its innovative smart living solutions at the High-End Smart Home Show 2025.",
        "content": """LEXA Lifestyle proudly showcased its innovative smart living solutions at the High-End Smart Home Show held on September 26th and 27th at the Radisson Red Hotel, Dubai Silicon Oasis.

Visitors at our booth experienced the future of smart living through our premium range of switches & sockets, high-end audio systems, and advanced home automation solutions designed for modern homes and commercial spaces.

The event brought together industry professionals, architects, interior designers, and homeowners looking to explore cutting-edge technology and luxury automation.

Thank you to everyone who visited our booth. We look forward to bringing world-class smart living solutions to more homes and businesses across the UAE.""",
        "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        "author": "LEXA Team",
        "published_date": "2025-10-06",
        "tags": ["Events", "Smart Home", "Exhibition"],
        "featured": True
    },
    {
        "id": "lexa-top-5-series-launch",
        "slug": "lexa-top-5-series-launch",
        "title": "Lexa Lifestyle Introduces Top 5 Smart Series for Modern Homes",
        "excerpt": "Lexa Lifestyle has unveiled its Top 5 Series of smart switches, sockets, and automation panels.",
        "content": """Lexa Lifestyle has unveiled its Top 5 Series of smart switches, sockets, and automation panels, redefining what modern living means for homeowners in the UAE.

With a combination of style, durability, and advanced automation technology, this new lineup empowers homeowners, architects, and designers to create spaces that are not only functional but also future-ready.

The Top 5 Series Features:
- Premium design with multiple finishes
- KNX-compatible automation integration
- Energy monitoring capabilities
- Customizable lighting scenes
- Voice control compatibility
- Durable construction for long-term reliability

Whether you're building a new villa, renovating your home, or upgrading to smart living, the Top 5 Series brings luxury and intelligence to every space.

Visit our showroom on Sheikh Zayed Road to experience the difference.""",
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "author": "LEXA Team",
        "published_date": "2025-09-19",
        "tags": ["Product Launch", "Smart Switches", "Innovation"],
        "featured": False
    },
    {
        "id": "lexa-smart-home-series-2025",
        "slug": "lexa-smart-home-series-2025",
        "title": "Lexa Lifestyle Launches New Smart Home Series for Modern Living",
        "excerpt": "Lexa Lifestyle has officially announced the launch of its New Smart Home Series.",
        "content": """Lexa Lifestyle has officially announced the launch of its New Smart Home Series, a complete range of smart home essentials designed to make modern living safer, smarter, and more convenient.

This innovative collection brings together the latest in home automation, combining comfort, energy efficiency, and advanced security solutions under one brand.

The Smart Home Series includes:
- Smart Lighting Control Systems
- Climate Control Solutions
- Security & Access Systems
- Energy Management Tools
- Multi-Room Audio Systems
- Automated Shading & Blinds
- Integrated Control Panels

Each product in the series has been carefully selected and tested to meet the highest standards of quality, reliability, and performance.

The launch represents LEXA's commitment to making smart home technology accessible, reliable, and beautifully integrated into modern lifestyles.

For consultations and installations, contact our team or visit our Sheikh Zayed Road experience center.""",
        "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
        "author": "LEXA Team",
        "published_date": "2025-09-17",
        "tags": ["Product Launch", "Smart Home", "Automation"],
        "featured": False
    }
]

async def seed_news():
    print("Seeding news articles...")
    
    # Clear existing news
    await db.news.delete_many({})
    print("Cleared existing news")
    
    # Insert new news
    if news_articles:
        await db.news.insert_many(news_articles)
        print(f"Inserted {len(news_articles)} news articles")
    
    print("News seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_news())

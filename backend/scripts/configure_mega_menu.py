"""
Script to mark solutions as featured/popular for mega menu
"""
import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Solutions configuration for mega menu
MEGA_MENU_CONFIG = {
    "smart-residential-living": {
        "featured": True,
        "popular": True,
        "mega_menu_category": "residential",
        "mega_menu_order": 1,
        "badge": "Popular"
    },
    "themed-home-cinemas": {
        "featured": True,
        "mega_menu_category": "residential",
        "mega_menu_order": 2
    },
    "multi-room-entertainment": {
        "featured": True,
        "mega_menu_category": "residential",
        "mega_menu_order": 3
    },
    "energy-efficient-living": {
        "featured": True,
        "mega_menu_category": "residential",
        "mega_menu_order": 4
    },
    "commercial-collaboration-spaces": {
        "featured": True,
        "mega_menu_category": "commercial",
        "mega_menu_order": 1
    },
    "luxury-hospitality-automation": {
        "featured": True,
        "mega_menu_category": "commercial",
        "mega_menu_order": 2
    },
    "boardrooms-auditoriums": {
        "featured": True,
        "mega_menu_category": "commercial",
        "mega_menu_order": 3
    },
    "security-enhanced-environments": {
        "featured": True,
        "mega_menu_category": "commercial",
        "mega_menu_order": 4
    },
    "yacht-automation": {
        "featured": True,
        "mega_menu_category": "specialized",
        "mega_menu_order": 1,
        "badge": "Premium"
    },
    "mirror-tv": {
        "featured": True,
        "mega_menu_category": "specialized",
        "mega_menu_order": 2
    },
    "outdoor-av-landscape-control": {
        "featured": True,
        "mega_menu_category": "specialized",
        "mega_menu_order": 3
    }
}

async def configure_mega_menu():
    """Configure solutions for mega menu display"""
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        print("Error: MONGO_URL not found in environment")
        return
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]
    
    print("Configuring solutions for mega menu...")
    
    # First, reset all solutions
    await db.solutions.update_many(
        {},
        {"$set": {"featured": False, "popular": False}}
    )
    
    # Then apply mega menu configuration
    for slug, config in MEGA_MENU_CONFIG.items():
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": config}
        )
        
        if result.modified_count > 0 or result.matched_count > 0:
            badge = f" ({config.get('badge')})" if config.get('badge') else ""
            print(f"  ✓ {slug}{badge}")
        else:
            print(f"  ✗ {slug} not found")
    
    # Verify
    featured_count = await db.solutions.count_documents({"featured": True})
    print(f"\n✓ Configuration complete! {featured_count} solutions marked as featured")

if __name__ == "__main__":
    asyncio.run(configure_mega_menu())

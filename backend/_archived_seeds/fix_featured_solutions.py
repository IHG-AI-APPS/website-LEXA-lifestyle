"""
Fix featured status for all main solutions
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_db')

# List of solutions with their mega menu configuration
FEATURED_SOLUTIONS = {
    # Residential
    "smart-residential-living": {"category": "residential", "order": 1},
    "themed-home-cinemas": {"category": "residential", "order": 2},
    "multi-room-entertainment": {"category": "residential", "order": 3},
    "energy-efficient-living": {"category": "residential", "order": 4},
    
    # Commercial/Intelligence
    "commercial-collaboration-spaces": {"category": "commercial", "order": 1},
    "luxury-hospitality-automation": {"category": "commercial", "order": 2},
    "boardrooms-auditoriums": {"category": "commercial", "order": 3},
    "security-enhanced-environments": {"category": "commercial", "order": 4},
    "smart-car-park-lighting": {"category": "commercial", "order": 5},
    "staff-accountability": {"category": "commercial", "order": 6},
    
    # Specialized
    "yacht-automation": {"category": "specialized", "order": 1},
    "mirror-tv": {"category": "specialized", "order": 2},
}

async def fix_featured():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # First, set all to not featured
    await db.solutions.update_many({}, {"$set": {"featured": False}})
    print("✓ Reset all solutions to featured=False")
    
    # Then mark and configure each featured solution
    updated_count = 0
    for slug, config in FEATURED_SOLUTIONS.items():
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": {
                "featured": True,
                "mega_menu_category": config["category"],
                "mega_menu_order": config["order"]
            }}
        )
        if result.modified_count > 0:
            updated_count += 1
            print(f"  ✓ {slug} -> {config['category']}")
    
    print(f"\n✅ Configured {updated_count} featured solutions")
    
    # Verify
    featured_count = await db.solutions.count_documents({"featured": True})
    print(f"📊 Total featured solutions: {featured_count}")
    
    # Show which ones are now featured
    featured_sols = await db.solutions.find(
        {"featured": True}, 
        {"_id": 0, "slug": 1, "title": 1, "mega_menu_category": 1}
    ).to_list(100)
    
    print("\nFeatured solutions by category:")
    for cat in ["residential", "commercial", "specialized"]:
        cat_sols = [s for s in featured_sols if s.get("mega_menu_category") == cat]
        print(f"\n{cat.upper()}: {len(cat_sols)}")
        for sol in cat_sols:
            print(f"  - {sol['slug']}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_featured())

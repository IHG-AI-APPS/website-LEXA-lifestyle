"""
Fix Intelligence Builder Features
1. Mark popular features as featured
2. Update frontend to show all features
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def fix_features():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    features_collection = db.intelligence_features
    
    # Mark top features as featured (popularity_score >= 5)
    result = await features_collection.update_many(
        {"popularity_score": {"$gte": 5}},
        {"$set": {"featured": True}}
    )
    
    print(f"✅ Marked {result.modified_count} features as featured")
    
    # Get counts
    total = await features_collection.count_documents({})
    featured = await features_collection.count_documents({"featured": True})
    
    print(f"📊 Total features: {total}")
    print(f"⭐ Featured features: {featured}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(fix_features())

"""
Expand Home Intelligence Builder with AI-Powered Features
Extract all 693 features from solutions and organize by category
Add AI recommendation engine
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def expand_intelligence_features():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    solutions_collection = db.solutions
    features_collection = db.intelligence_features
    
    # Get all solutions
    all_solutions = await solutions_collection.find({}).to_list(1000)
    
    # Extract and organize all features
    feature_map = {}
    
    for solution in all_solutions:
        category = solution.get('category', 'Smart Home')
        for feature_text in solution.get('features', []):
            if feature_text not in feature_map:
                # Categorize feature
                feature_lower = feature_text.lower()
                
                if any(kw in feature_lower for kw in ['light', 'led', 'dim', 'lum', 'lamp', 'bulb', 'chandelier']):
                    feature_category = 'lighting'
                elif any(kw in feature_lower for kw in ['climate', 'hvac', 'temperature', 'heat', 'cool', 'energy', 'power', 'solar', 'ac']):
                    feature_category = 'climate'
                elif any(kw in feature_lower for kw in ['security', 'camera', 'alarm', 'lock', 'access', 'sensor', 'motion', 'surveil', 'biometric']):
                    feature_category = 'security'
                elif any(kw in feature_lower for kw in ['audio', 'video', 'cinema', 'theater', 'speaker', 'screen', 'projector', 'tv', 'entertainment', 'music', 'streaming', 'dolby']):
                    feature_category = 'entertainment'
                elif any(kw in feature_lower for kw in ['voice', 'alexa', 'google', 'siri', 'ai', 'smart assistant', 'control']):
                    feature_category = 'voice_ai'
                elif any(kw in feature_lower for kw in ['network', 'wifi', 'ethernet', 'connectivity', 'bandwidth', 'internet', '5g', 'mesh', 'router']):
                    feature_category = 'network'
                elif any(kw in feature_lower for kw in ['wellness', 'health', 'air quality', 'water', 'fitness', 'sleep', 'meditation', 'spa']):
                    feature_category = 'wellness'
                elif any(kw in feature_lower for kw in ['blind', 'curtain', 'shade', 'window', 'door', 'motorized']):
                    feature_category = 'shading'
                elif any(kw in feature_lower for kw in ['pool', 'garden', 'outdoor', 'landscape', 'irrigation', 'fountain']):
                    feature_category = 'outdoor'
                else:
                    feature_category = 'convenience'
                
                # Calculate IQ points based on complexity
                iq_points = 5
                if 'ai' in feature_lower or 'smart' in feature_lower or 'automated' in feature_lower:
                    iq_points = 10
                if 'integration' in feature_lower or 'sync' in feature_lower:
                    iq_points = 8
                
                feature_map[feature_text] = {
                    'category': feature_category,
                    'iq_points': iq_points,
                    'solutions': [solution['title']]
                }
            else:
                # Add to solutions list
                if solution['title'] not in feature_map[feature_text]['solutions']:
                    feature_map[feature_text]['solutions'].append(solution['title'])
    
    # Create feature documents
    features_to_insert = []
    
    category_names = {
        'lighting': 'Lighting Control',
        'climate': 'Climate & Energy',
        'security': 'Security & Safety',
        'entertainment': 'Entertainment & AV',
        'voice_ai': 'Voice & AI Control',
        'network': 'Network & Connectivity',
        'wellness': 'Wellness & Health',
        'shading': 'Shading & Blinds',
        'outdoor': 'Outdoor Living',
        'convenience': 'Convenience & Automation'
    }
    
    for idx, (feature_text, data) in enumerate(feature_map.items()):
        feature_doc = {
            "id": str(uuid4()),
            "slug": f"{feature_text.lower().replace(' ', '-').replace('/', '-').replace('(', '').replace(')', '').replace('&', 'and')[:80]}-{idx}",  # Add index for uniqueness
            "title": feature_text,
            "category": data['category'],
            "category_name": category_names.get(data['category'], 'Other'),
            "icon": "Check",
            "short_description": feature_text,
            "detailed_description": f"This feature is available across {len(data['solutions'])} different solutions in our portfolio, providing flexibility and integration.",
            "iq_points": data['iq_points'],
            "scenarios": [
                {
                    "room": "Living Room",
                    "scenario": f"Automated {feature_text.lower()} for comfort and convenience"
                }
            ],
            "benefits": [
                "Enhanced convenience",
                "Energy efficiency",
                "Seamless integration with LEXA Technology"
            ],
            "is_premium": len(data['solutions']) <= 10,  # Rare features are premium
            "featured": len(data['solutions']) >= 20,  # Popular features are featured
            "related_solutions": data['solutions'][:5],  # Top 5 solutions
            "popularity_score": len(data['solutions'])
        }
        
        features_to_insert.append(feature_doc)
    
    # Delete existing features and insert new ones
    await features_collection.delete_many({})
    await features_collection.insert_many(features_to_insert)
    
    print(f"✅ Inserted {len(features_to_insert)} features into intelligence_features collection")
    
    # Print summary by category
    category_counts = {}
    for feature in features_to_insert:
        cat = feature['category_name']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    print("\n📊 Features by Category:")
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"   {cat}: {count} features")
    
    print(f"\n🎯 Total features available in Intelligence Builder: {len(features_to_insert)}")
    
    client.close()


if __name__ == "__main__":
    print("🚀 Expanding Home Intelligence Builder with all solution features...")
    asyncio.run(expand_intelligence_features())
    print("✨ Complete!")

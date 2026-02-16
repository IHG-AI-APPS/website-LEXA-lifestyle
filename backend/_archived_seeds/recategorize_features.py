"""
Recategorize All 693 Features with Intelligent Classification
Fix miscategorization issues and ensure proper grouping
"""

import asyncio
import os
import re
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


def smart_categorize(feature_text: str, solution_category: str = None) -> tuple:
    """
    Intelligently categorize a feature based on keywords and context
    Returns (category_slug, category_name)
    """
    text_lower = feature_text.lower()
    
    # Priority-based categorization (order matters!)
    
    # 1. SECURITY & ACCESS CONTROL
    security_keywords = ['security', 'camera', 'cctv', 'surveillance', 'alarm', 'intrusion', 
                        'motion detection', 'door sensor', 'window sensor', 'panic', 'sos',
                        'biometric', 'fingerprint', 'face recognition', 'access control',
                        'door lock', 'smart lock', 'keypad', 'rfid', 'badge', 'intercom',
                        'perimeter', 'breach', 'monitoring', 'alert']
    if any(kw in text_lower for kw in security_keywords):
        # But exclude if it's clearly climate-related (e.g., "temperature monitoring")
        if not any(kw in text_lower for kw in ['temperature', 'climate', 'hvac', 'ac ', 'heating', 'cooling']):
            return ('security', 'Security & Safety')
    
    # 2. LIGHTING CONTROL
    lighting_keywords = ['light', 'lighting', 'led', 'dimmer', 'dim', 'brightness',
                        'luminaire', 'fixture', 'chandelier', 'downlight', 'spotlight',
                        'lamp', 'bulb', 'illumination', 'daylight', 'lux']
    if any(kw in text_lower for kw in lighting_keywords):
        return ('lighting', 'Lighting Control')
    
    # 3. CLIMATE, HVAC & ENERGY
    climate_keywords = ['climate', 'temperature', 'hvac', 'heating', 'cooling', 'ac ',
                       'air conditioning', 'thermostat', 'heat pump', 'ventilation',
                       'humidity', 'dehumidif', 'fan control', 'airflow']
    energy_keywords = ['energy', 'power', 'solar', 'battery', 'consumption',
                      'efficiency', 'load management', 'kwh', 'watt']
    if any(kw in text_lower for kw in climate_keywords + energy_keywords):
        return ('climate', 'Climate & Energy')
    
    # 4. ENTERTAINMENT & AV
    av_keywords = ['audio', 'video', 'speaker', 'cinema', 'theater', 'theatre',
                  'projector', 'screen', 'tv', 'television', 'display', 'soundbar',
                  'amplifier', 'receiver', 'dolby', 'surround', 'home cinema',
                  'media', 'streaming', 'netflix', 'spotify', 'music', 'sound system',
                  'acoustic treatment', 'soundproof', 'gaming', 'console']
    if any(kw in text_lower for kw in av_keywords):
        return ('entertainment', 'Entertainment & AV')
    
    # 5. SHADING & WINDOW TREATMENTS
    shading_keywords = ['blind', 'shade', 'curtain', 'drape', 'shutter',
                       'motorized window', 'awning', 'pergola', 'skylight']
    if any(kw in text_lower for kw in shading_keywords):
        return ('shading', 'Shading & Blinds')
    
    # 6. VOICE & AI CONTROL
    voice_keywords = ['voice', 'alexa', 'google assistant', 'siri', 'voice control',
                     'voice command', 'ai ', 'artificial intelligence', 'smart assistant']
    if any(kw in text_lower for kw in voice_keywords):
        return ('voice_ai', 'Voice & AI Control')
    
    # 7. NETWORK & CONNECTIVITY
    network_keywords = ['network', 'wifi', 'wi-fi', 'ethernet', 'router', 'mesh',
                       'bandwidth', 'internet', '5g', 'connectivity', 'wireless',
                       'cat6', 'cat7', 'fiber']
    if any(kw in text_lower for kw in network_keywords):
        return ('network', 'Network & Connectivity')
    
    # 8. WELLNESS & HEALTH
    wellness_keywords = ['wellness', 'health', 'air quality', 'air purifi', 'voc',
                        'pm2.5', 'co2', 'sleep', 'meditation', 'yoga', 'fitness',
                        'gym', 'spa', 'sauna', 'steam', 'water quality', 'circadian']
    if any(kw in text_lower for kw in wellness_keywords):
        return ('wellness', 'Wellness & Health')
    
    # 9. OUTDOOR & GARDEN
    outdoor_keywords = ['outdoor', 'garden', 'landscape', 'irrigation', 'sprinkler',
                       'pool', 'fountain', 'lawn', 'pathway', 'driveway', 'patio',
                       'terrace', 'balcony']
    if any(kw in text_lower for kw in outdoor_keywords):
        return ('outdoor', 'Outdoor Living')
    
    # 10. KITCHEN & APPLIANCES
    kitchen_keywords = ['kitchen', 'refrigerator', 'fridge', 'oven', 'dishwasher',
                       'cooktop', 'coffee', 'appliance']
    if any(kw in text_lower for kw in kitchen_keywords):
        return ('appliances', 'Kitchen & Appliances')
    
    # 11. WATER & PLUMBING
    water_keywords = ['water', 'plumbing', 'leak detection', 'leak sensor',
                     'water pressure', 'water heater', 'geyser', 'water tank']
    if any(kw in text_lower for kw in water_keywords):
        # But not if it's irrigation (already categorized as outdoor)
        if 'irrigation' not in text_lower:
            return ('water', 'Water Management')
    
    # 12. PET CARE
    pet_keywords = ['pet', 'dog', 'cat', 'litter', 'pet feeder', 'pet camera']
    if any(kw in text_lower for kw in pet_keywords):
        return ('pets', 'Pet Care')
    
    # 13. ELDERLY CARE
    elderly_keywords = ['elderly', 'senior', 'fall detection', 'emergency call',
                       'medication reminder']
    if any(kw in text_lower for kw in elderly_keywords):
        return ('elderly', 'Elderly Care')
    
    # 14. CLEANING & MAINTENANCE
    cleaning_keywords = ['robotic vacuum', 'robot vacuum', 'roomba', 'mop',
                        'cleaning robot', 'vacuum', 'laundry', 'washing machine', 'dryer']
    if any(kw in text_lower for kw in cleaning_keywords):
        return ('cleaning', 'Cleaning & Maintenance')
    
    # DEFAULT: CONVENIENCE & AUTOMATION
    return ('convenience', 'Convenience & Automation')


async def recategorize_all_features():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    features_collection = db.intelligence_features
    
    # Get all features
    all_features = await features_collection.find({}).to_list(1000)
    
    print(f"📊 Recategorizing {len(all_features)} features...")
    
    updates = []
    category_counts = {}
    
    for feature in all_features:
        old_category = feature.get('category_name', 'Unknown')
        
        # Recategorize
        new_category_slug, new_category_name = smart_categorize(feature['title'])
        
        # Track changes
        if old_category != new_category_name:
            updates.append({
                'id': feature['id'],
                'old': old_category,
                'new': new_category_name
            })
        
        # Update in database
        await features_collection.update_one(
            {'id': feature['id']},
            {
                '$set': {
                    'category': new_category_slug,
                    'category_name': new_category_name
                }
            }
        )
        
        # Count categories
        category_counts[new_category_name] = category_counts.get(new_category_name, 0) + 1
    
    print(f"\n✅ Recategorized {len(updates)} features")
    
    print("\n📊 New Category Distribution:")
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"   {cat}: {count} features")
    
    print("\n🔍 Sample Changes:")
    for change in updates[:20]:
        print(f"   '{change['old']}' → '{change['new']}'")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(recategorize_all_features())

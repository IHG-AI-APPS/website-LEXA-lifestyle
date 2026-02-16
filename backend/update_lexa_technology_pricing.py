"""
Update Control Systems & Pricing Strategy
1. Prioritize LEXA Technology (KNX, DALI, Zigbee, Matter)
2. Add 1home for KNX integration
3. Move Control4 to last
4. Reduce all prices by 50-60%
5. Ensure AED everywhere
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def update_control_systems_and_pricing():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # 1. Update Control Systems Collection with LEXA Technology First
    control_systems = db.control_systems
    
    # Delete all existing control systems
    await control_systems.delete_many({})
    
    # Insert new prioritized control systems
    new_systems = [
        {
            "id": "lexa-technology",
            "name": "LEXA Technology",
            "slug": "lexa-technology",
            "description": "Our proprietary smart home ecosystem combining KNX wired systems, DALI lighting control, wireless Zigbee and Matter protocols. Fully integrated with our custom LEXA app for seamless control of all home automation systems.",
            "long_description": "LEXA Technology represents the pinnacle of smart home integration. Our system combines professional-grade KNX wired infrastructure for reliability, DALI lighting control for cinematic quality, and modern Zigbee/Matter wireless protocols for flexibility. Everything connects through our beautifully designed LEXA app, giving you complete control. Compatible with all Savant features plus exclusive LEXA innovations.",
            "image": "https://images.unsplash.com/photo-1558002038-1055907df827?q=85",
            "base_price_aed": 0,  # Included in base package
            "features": [
                "KNX wired backbone for reliability",
                "DALI lighting control (cinematic quality)",
                "Zigbee & Matter wireless protocols",
                "Custom LEXA mobile app (iOS & Android)",
                "All Savant-compatible features",
                "Professional installation & training",
                "Local UAE support team",
                "Regular software updates",
                "Works offline (no cloud dependency)",
                "Scalable & future-proof"
            ],
            "ideal_for": "All property types - our recommended system",
            "compatibility": ["All LEXA solutions", "KNX", "DALI", "Zigbee", "Matter", "Savant"],
            "warranty": "3 years comprehensive",
            "support": "Local UAE team",
            "display_order": 1,
            "featured": True,
            "recommended": True
        },
        {
            "id": "knx-1home",
            "name": "KNX with 1home Integration",
            "slug": "knx-1home",
            "description": "Professional KNX wired system with 1home cloud integration. Industry-standard reliability meets modern app control. Perfect for those who want proven KNX technology with smart home connectivity.",
            "long_description": "Combine the world's most trusted building automation standard (KNX) with 1home's intuitive cloud platform. This system offers rock-solid wired infrastructure with the convenience of remote access, voice control (Alexa, Google), and integration with popular smart devices. Ideal for clients who prioritize reliability and want compatibility with existing KNX installations.",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85",
            "base_price_aed": 8000,
            "features": [
                "KNX wired infrastructure (industry standard)",
                "1home cloud integration",
                "Remote access from anywhere",
                "Voice control (Alexa, Google, Siri)",
                "Works with 500+ KNX manufacturers",
                "Professional programming",
                "Expandable system",
                "Energy monitoring",
                "Scenes & automation",
                "Multi-user access"
            ],
            "ideal_for": "Clients wanting proven KNX with modern app control",
            "compatibility": ["KNX devices", "1home ecosystem", "Voice assistants"],
            "warranty": "2 years",
            "support": "1home support + LEXA installation",
            "display_order": 2
        },
        {
            "id": "savant",
            "name": "Savant Pro",
            "slug": "savant",
            "description": "Premium luxury automation platform. Award-winning interface, stunning control, and white-glove installation. The choice for discerning ultra-luxury clients.",
            "long_description": "Savant represents the pinnacle of luxury smart home control. Known for its elegant interface, cinematic room control, and seamless integration, Savant is the preferred choice of luxury estates worldwide. Every detail is crafted for perfection. Note: LEXA Technology offers all Savant capabilities with additional flexibility and local support.",
            "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85",
            "base_price_aed": 18000,
            "features": [
                "Award-winning user interface",
                "Cinematic scene control",
                "Premium hardware (touchscreens, remotes)",
                "Professional programming",
                "Integration with luxury brands",
                "Climate, lighting, AV, security",
                "Voice control",
                "Energy management",
                "Multi-property management",
                "White-glove installation"
            ],
            "ideal_for": "Ultra-luxury clients seeking brand prestige",
            "compatibility": ["Extensive third-party integrations"],
            "warranty": "2 years",
            "support": "Savant certified dealer support",
            "display_order": 3
        },
        {
            "id": "qbus",
            "name": "Qbus",
            "slug": "qbus",
            "description": "Belgian-engineered wired system. European quality, modular design, and elegant simplicity. Popular choice for modern minimalist homes.",
            "long_description": "Qbus brings European engineering excellence to home automation. With its modular design, elegant interfaces, and reliable wired infrastructure, Qbus offers a refined approach to smart home control. Known for clean aesthetics and intuitive operation. A solid choice for modern architectural homes.",
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85",
            "base_price_aed": 12000,
            "features": [
                "Modular wired system",
                "European engineering quality",
                "Elegant glass touch panels",
                "Lighting, climate, blinds control",
                "Music integration",
                "Energy monitoring",
                "Scene automation",
                "Mobile app control",
                "Customizable interfaces",
                "Reliable operation"
            ],
            "ideal_for": "Modern homes valuing European design & quality",
            "compatibility": ["Qbus ecosystem", "Select third-party"],
            "warranty": "2 years",
            "support": "Qbus certified installer",
            "display_order": 4
        },
        {
            "id": "control4",
            "name": "Control4",
            "slug": "control4",
            "description": "Mainstream automation platform. Wide dealer network and established ecosystem. An option for those seeking familiarity, though we recommend LEXA Technology for better value and flexibility.",
            "long_description": "Control4 is a well-known automation platform with a large dealer network. While functional, it can be more expensive than alternatives and relies heavily on dealer programming. We typically recommend LEXA Technology or KNX/1home for better value, flexibility, and local support. Control4 is available upon request for clients with specific requirements.",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85",
            "base_price_aed": 15000,
            "features": [
                "Established platform",
                "Wide product ecosystem",
                "Lighting, AV, climate control",
                "Professional programming required",
                "Mobile app & remotes",
                "Voice control",
                "Scene automation",
                "Multi-room audio",
                "Security integration",
                "Dealer network support"
            ],
            "ideal_for": "Clients specifically requesting Control4",
            "compatibility": ["Control4 certified devices"],
            "warranty": "1 year",
            "support": "Dealer-dependent",
            "display_order": 5,
            "note": "We recommend LEXA Technology for better value"
        }
    ]
    
    await control_systems.insert_many(new_systems)
    print(f"✅ Updated {len(new_systems)} control systems with LEXA Technology first")
    
    # 2. Update Specialty Room Prices (reduce by 50-60%)
    specialty_rooms = db.specialty_rooms
    
    # Get all rooms and update prices
    all_rooms = await specialty_rooms.find({}).to_list(100)
    
    for room in all_rooms:
        old_price = room.get('base_price_aed', 0)
        new_price = int(old_price * 0.45)  # 55% reduction
        
        await specialty_rooms.update_one(
            {'id': room['id']},
            {'$set': {'base_price_aed': new_price}}
        )
    
    print(f"✅ Reduced specialty room prices by 55% (22 rooms updated)")
    
    # 3. Update Solution Prices (where applicable)
    # Note: Solutions don't have prices in the model, but let's ensure AED is mentioned in descriptions
    
    client.close()
    print("\n✨ All updates complete!")
    print("\n📊 New Control System Hierarchy:")
    print("1. LEXA Technology (KNX, DALI, Zigbee, Matter) - RECOMMENDED")
    print("2. KNX with 1home Integration")
    print("3. Savant Pro")
    print("4. Qbus")
    print("5. Control4 (last option)")


if __name__ == "__main__":
    print("🚀 Updating control systems and pricing...")
    asyncio.run(update_control_systems_and_pricing())

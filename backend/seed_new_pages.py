"""
Seed script to add Smart Car Park Lighting and AI Staff Accountability pages
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_db')

async def seed_new_pages():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    solutions_collection = db.solutions
    
    # Define the two new solutions
    new_solutions = [
        {
            "id": str(uuid4()),
            "slug": "smart-car-park-lighting",
            "title": "Smart Car Park Lighting System",
            "category": "Commercial Solutions",
            "description": "AI-powered IoT lighting for parking facilities with 83% energy savings",
            "long_description": "Transform your parking facility with AI-powered IoT lighting that delivers up to 83% energy savings and guaranteed ROI. Our intelligent lighting system uses motion sensors, radar detection, and cloud-based analytics to optimize energy consumption while enhancing safety and security.",
            "image": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Up to 83% Energy Savings",
                "66% Cost Reduction Over 5 Years",
                "30%+ Guaranteed ROI",
                "24/7 Remote Monitoring",
                "Motion-Activated Lighting (5-7m radius)",
                "AI + Radar + Cloud Management",
                "Real-time Performance Analytics",
                "Automated Maintenance Alerts"
            ],
            "brands": ["Philips", "Osram", "GE Lighting", "Siemens"],
            "tags": ["ENERGY MANAGEMENT", "COMMERCIAL", "IOT", "AI"],
            "faqs": [
                {
                    "question": "How much can I save with smart car park lighting?",
                    "answer": "Our system delivers up to 83% energy savings compared to traditional lighting, with a typical 66% cost reduction over 5 years and a guaranteed minimum ROI of 30%."
                },
                {
                    "question": "How does motion-activated lighting work?",
                    "answer": "The system uses advanced radar and motion sensors with a 5-7 meter detection radius. Lights automatically brighten when vehicles or pedestrians approach and dim when areas are unoccupied, ensuring safety while maximizing energy efficiency."
                },
                {
                    "question": "Can I monitor the system remotely?",
                    "answer": "Yes. Our cloud-based platform provides 24/7 remote monitoring, real-time analytics, energy consumption reports, and automated maintenance alerts accessible from any device."
                },
                {
                    "question": "What is the typical payback period?",
                    "answer": "Most installations achieve full ROI within 2-3 years through energy savings, reduced maintenance costs, and extended fixture lifespan."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "High ROI",
            "mega_menu_category": "commercial",
            "mega_menu_order": 50
        },
        {
            "id": str(uuid4()),
            "slug": "staff-accountability",
            "title": "AI-Enabled Staff Accountability System",
            "category": "Intelligence Solutions",
            "description": "Operational intelligence platform for luxury hospitality and clubs",
            "long_description": "Move beyond traditional CCTV surveillance to actionable operational intelligence. Our AI-powered system transforms camera feeds into insights that drive efficiency, reduce costs, and enhance service quality in luxury clubs, hotels, and hospitality venues.",
            "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "15-20% Staff Efficiency Gain",
                "8-12% Manpower Optimization",
                "10-18% Energy Cost Reduction",
                "Real-time Operational Visibility",
                "AI-Powered Activity Recognition",
                "Automated Performance Tracking",
                "Heat Map Analytics",
                "Privacy-Compliant Monitoring"
            ],
            "brands": ["Hikvision", "Axis Communications", "Milestone", "Microsoft Azure AI"],
            "tags": ["AI", "INTELLIGENCE", "HOSPITALITY", "ANALYTICS"],
            "faqs": [
                {
                    "question": "How is this different from traditional CCTV?",
                    "answer": "Traditional surveillance only observes. Our system uses AI to analyze activities, track performance metrics, identify inefficiencies, and provide actionable insights that improve operations and service delivery."
                },
                {
                    "question": "Does this violate staff privacy?",
                    "answer": "No. Our system is designed for operational intelligence, not personal surveillance. It tracks activities and workflows, not individuals. All data handling is compliant with privacy regulations and focused on service quality metrics."
                },
                {
                    "question": "What metrics can I track?",
                    "answer": "The system tracks service response times, area coverage, task completion rates, guest interaction quality, equipment usage patterns, and energy consumption tied to operational activities."
                },
                {
                    "question": "How quickly can I see results?",
                    "answer": "Initial baseline metrics are established within 1-2 weeks. Actionable insights begin emerging within 30 days, with full optimization typically achieved within 90 days of deployment."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "AI-Powered",
            "mega_menu_category": "intelligence",
            "mega_menu_order": 10
        }
    ]
    
    # Insert the new solutions
    for solution in new_solutions:
        # Check if already exists
        existing = await solutions_collection.find_one({"slug": solution["slug"]}, {"_id": 0})
        if existing:
            print(f"✓ Solution '{solution['title']}' already exists, updating...")
            await solutions_collection.update_one(
                {"slug": solution["slug"]},
                {"$set": solution}
            )
        else:
            print(f"✓ Adding new solution: {solution['title']}")
            await solutions_collection.insert_one(solution)
    
    print("\n✅ Successfully seeded Smart Car Park Lighting and AI Staff Accountability pages!")
    print(f"   - Smart Car Park Lighting: /solutions/smart-car-park-lighting")
    print(f"   - AI Staff Accountability: /intelligence/staff-accountability")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_new_pages())

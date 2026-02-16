"""
Seed script for Intelligence/Commercial solutions
Adds: Intelligence Loop, Smart Office, Commercial Security, BMS
"""

import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# Load environment
load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_intelligence_solutions():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    intelligence_solutions = [
        {
            "id": str(uuid.uuid4()),
            "slug": "intelligence-loop",
            "title": "Intelligence Loop",
            "category": "Commercial Solutions",
            "description": "Continuous learning system that adapts to building patterns",
            "long_description": "The Intelligence Loop is the brain of your smart building. It continuously monitors, learns, and optimizes building operations based on occupancy patterns, weather conditions, energy usage, and user preferences. Our AI-powered system creates a self-improving ecosystem that gets smarter over time, reducing costs while enhancing comfort and efficiency.",
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "AI-Powered Pattern Recognition",
                "Predictive Maintenance Alerts",
                "Real-time Performance Analytics",
                "Automated System Optimization",
                "Machine Learning Adaptation",
                "Cloud-Based Intelligence Platform",
                "Integration with BMS & IoT Sensors",
                "Energy Consumption Forecasting"
            ],
            "brands": ["Microsoft Azure", "IBM Watson", "Siemens", "Johnson Controls"],
            "tags": ["AI", "INTELLIGENCE", "COMMERCIAL", "IOT"],
            "faqs": [
                {
                    "question": "How does the Intelligence Loop learn?",
                    "answer": "The Intelligence Loop uses machine learning algorithms to analyze historical and real-time data from your building's sensors, occupancy patterns, weather feeds, and energy usage. Over weeks and months, it identifies patterns and correlations, enabling it to predict future needs and automatically optimize operations."
                },
                {
                    "question": "What data does it collect?",
                    "answer": "The system collects anonymized operational data including temperature readings, occupancy levels, energy consumption, equipment runtime, and environmental conditions. All data is encrypted and stored securely in compliance with privacy regulations."
                },
                {
                    "question": "How long until I see results?",
                    "answer": "Initial optimizations begin within the first week as the system establishes baseline patterns. Significant improvements in energy efficiency and comfort typically manifest within 30-60 days as the AI refines its learning models."
                },
                {
                    "question": "Can it integrate with existing BMS?",
                    "answer": "Yes. The Intelligence Loop is designed to work with most major Building Management Systems including Siemens, Johnson Controls, Honeywell, and Schneider Electric. We provide API connections and middleware for seamless integration."
                }
            ],
            "featured": True,
            "popular": True,
            "badge": "AI-Powered",
            "mega_menu_category": "commercial",
            "mega_menu_order": 1
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "smart-office",
            "title": "Smart Office Solutions",
            "category": "Commercial Solutions",
            "description": "AI-powered workplace optimization for productivity and wellbeing",
            "long_description": "Transform your workplace into an intelligent environment that adapts to your team's needs. Our Smart Office Solutions combine occupancy sensing, environmental controls, booking systems, and workplace analytics to create spaces that enhance productivity, collaboration, and employee wellbeing while reducing operational costs.",
            "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Hot Desk & Room Booking Systems",
                "Occupancy-Based Climate Control",
                "Smart Lighting Automation",
                "Workplace Analytics Dashboard",
                "Air Quality Monitoring",
                "Video Conferencing Integration",
                "Mobile App Control",
                "Energy-Efficient Operations"
            ],
            "brands": ["Crestron", "Lutron", "Microsoft Teams", "Zoom", "Poly"],
            "tags": ["SMART OFFICE", "WORKPLACE", "COMMERCIAL", "PRODUCTIVITY"],
            "faqs": [
                {
                    "question": "What is a smart office?",
                    "answer": "A smart office uses IoT sensors, automation, and AI to optimize workspace utilization, environmental comfort, and employee productivity. Features include automated lighting and climate control, intelligent meeting room booking, occupancy analytics, and seamless AV integration."
                },
                {
                    "question": "How does hot desking work?",
                    "answer": "Employees use a mobile app or web portal to view available desks in real-time and reserve them for specific time slots. The system tracks occupancy via sensors, manages desk assignments, and provides analytics on space utilization to help optimize office layout."
                },
                {
                    "question": "Can it improve employee wellbeing?",
                    "answer": "Yes. Smart offices monitor and optimize air quality, lighting levels, temperature, and noise. Studies show that optimized environmental conditions improve focus, reduce fatigue, and enhance overall employee satisfaction and productivity."
                },
                {
                    "question": "What ROI can I expect?",
                    "answer": "Most organizations see 20-30% reduction in energy costs, 15-25% improvement in space utilization, and measurable gains in employee productivity. Payback periods typically range from 18-36 months depending on building size and feature implementation."
                }
            ],
            "featured": True,
            "popular": True,
            "badge": "Trending",
            "mega_menu_category": "commercial",
            "mega_menu_order": 2
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "commercial-security",
            "title": "Commercial Security Intelligence",
            "category": "Commercial Solutions",
            "description": "AI-driven security with predictive threat detection and monitoring",
            "long_description": "Protect your commercial property with intelligent security systems that go beyond traditional surveillance. Our AI-powered platform combines advanced video analytics, access control, intrusion detection, and real-time alerting to provide comprehensive protection. The system learns normal patterns and can identify anomalies, potential threats, and security breaches before they escalate.",
            "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "AI-Powered Video Analytics",
                "Facial Recognition Access Control",
                "Perimeter Intrusion Detection",
                "Real-Time Threat Alerts",
                "24/7 Remote Monitoring",
                "Visitor Management System",
                "Integration with Fire & Life Safety",
                "Cloud Video Storage & Playback"
            ],
            "brands": ["Hikvision", "Axis Communications", "Bosch", "Honeywell", "Genetec"],
            "tags": ["SECURITY", "SURVEILLANCE", "COMMERCIAL", "AI"],
            "faqs": [
                {
                    "question": "How does AI improve security?",
                    "answer": "AI-powered video analytics can detect unusual behavior, identify unauthorized access attempts, recognize license plates, count people, and alert security teams to potential threats in real-time. This reduces false alarms and enables proactive security responses."
                },
                {
                    "question": "Is cloud storage secure?",
                    "answer": "Yes. All video footage is encrypted both in transit and at rest using military-grade encryption. We use secure cloud infrastructure with redundant backups, and access is controlled through multi-factor authentication and role-based permissions."
                },
                {
                    "question": "Can I access cameras remotely?",
                    "answer": "Absolutely. Authorized users can view live and recorded footage from any device via secure web portal or mobile app. The system supports multi-site management, allowing you to monitor multiple locations from a single dashboard."
                },
                {
                    "question": "What happens during power outages?",
                    "answer": "Critical systems are backed by UPS (Uninterruptible Power Supply) and can operate for several hours during outages. Cameras have onboard storage that buffers video locally and syncs to the cloud when connectivity is restored."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Enterprise",
            "mega_menu_category": "commercial",
            "mega_menu_order": 4
        }
    ]
    
    print("🔄 Seeding Intelligence solutions...")
    
    for solution in intelligence_solutions:
        # Check if solution already exists
        existing = await db.solutions.find_one({"slug": solution["slug"]})
        
        if existing:
            # Update existing solution
            await db.solutions.update_one(
                {"slug": solution["slug"]},
                {"$set": solution}
            )
            print(f"✅ Updated: {solution['title']}")
        else:
            # Insert new solution
            await db.solutions.insert_one(solution)
            print(f"✅ Created: {solution['title']}")
    
    print(f"\n✨ Successfully seeded {len(intelligence_solutions)} intelligence solutions!")
    
    # Show current commercial solutions count
    count = await db.solutions.count_documents({"category": "Commercial Solutions"})
    print(f"📊 Total Commercial Solutions in database: {count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_intelligence_solutions())

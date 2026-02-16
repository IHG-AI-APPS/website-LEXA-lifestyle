"""
Seed script for Phase 2: Market Expansion - Building Type Pages
Adds: Healthcare, Education, Industrial, Retail (detailed versions)
"""

import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_phase2_solutions():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    phase2_solutions = [
        {
            "id": str(uuid.uuid4()),
            "slug": "retail-automation",
            "title": "Smart Retail Automation",
            "category": "Commercial Solutions",
            "description": "AI-powered customer analytics and intelligent store management",
            "long_description": "Transform retail operations with customer behavior analytics, smart lighting and climate control, queue management, and real-time inventory tracking. Our retail intelligence platform increases sales by 15-25% while reducing energy costs by 35-45%.",
            "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Customer Foot Traffic Analytics",
                "Heat Mapping & Behavior Tracking",
                "Smart Surveillance & Theft Detection",
                "Occupancy-Based Climate Control",
                "Queue Management System",
                "Digital Signage Integration",
                "Real-Time Inventory Tracking",
                "Sales Optimization Insights"
            ],
            "brands": ["Axis Communications", "Honeywell", "Lutron", "Crestron"],
            "tags": ["RETAIL", "ANALYTICS", "COMMERCIAL"],
            "faqs": [
                {
                    "question": "How does customer analytics improve sales?",
                    "answer": "By tracking foot traffic patterns, dwell times, and heat mapping popular areas, retailers can optimize product placement, staffing levels, and store layout. This data-driven approach typically increases conversion rates by 15-25%."
                },
                {
                    "question": "Is the surveillance system GDPR compliant?",
                    "answer": "Yes. Our analytics use anonymized data and edge processing to ensure privacy compliance. Facial recognition features can be disabled, and all data retention follows local regulations."
                },
                {
                    "question": "What ROI can I expect?",
                    "answer": "Most retail clients see 12-18 month payback periods through combined energy savings (35-45%), theft reduction (50-70%), and sales optimization (15-25% increase)."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Analytics",
            "mega_menu_category": "commercial",
            "mega_menu_order": 5
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "healthcare-automation",
            "title": "Healthcare Facility Automation",
            "category": "Healthcare",
            "description": "Patient-centric intelligent systems for hospitals and clinics",
            "long_description": "Specialized automation for healthcare facilities including patient room environmental controls, nurse call integration, infection control air management, and compliance monitoring. Our systems enhance patient comfort while meeting stringent healthcare regulations.",
            "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Patient Room Environmental Control",
                "Nurse Call System Integration",
                "Infection Control Air Management",
                "Operating Room Automation",
                "Emergency Power Management",
                "Access Control for Restricted Areas",
                "Compliance Monitoring & Reporting",
                "Equipment Asset Tracking"
            ],
            "brands": ["Siemens", "Johnson Controls", "Honeywell", "Philips Healthcare"],
            "tags": ["HEALTHCARE", "PATIENT CARE", "COMPLIANCE"],
            "faqs": [
                {
                    "question": "How does this improve patient outcomes?",
                    "answer": "Precise environmental control, faster nurse response times, and optimized air quality all contribute to better patient comfort and faster recovery. Studies show 15-20% improvement in patient satisfaction scores."
                },
                {
                    "question": "Is it compliant with healthcare regulations?",
                    "answer": "Yes. Our systems meet Joint Commission International (JCI), DOH, and local healthcare facility standards. All installations include compliance documentation and audit trails."
                },
                {
                    "question": "Can it integrate with existing hospital systems?",
                    "answer": "Absolutely. We integrate with major EMR/HIS systems, nurse call platforms, and building management systems through standard protocols like HL7 and BACnet."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Compliant",
            "mega_menu_category": "commercial",
            "mega_menu_order": 6
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "education-automation",
            "title": "Educational Institution Automation",
            "category": "Education",
            "description": "Smart campus solutions for schools and universities",
            "long_description": "Comprehensive automation for educational institutions including smart classrooms with AV integration, campus-wide energy management, security systems with emergency protocols, and occupancy tracking for space optimization.",
            "image": "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Smart Classroom AV Systems",
                "Campus-Wide Energy Management",
                "Student Safety & Security Systems",
                "Occupancy Tracking for Space Optimization",
                "Automated Scheduling Systems",
                "Emergency Notification Integration",
                "Library & Lab Access Control",
                "Sports Facility Automation"
            ],
            "brands": ["Crestron", "Extron", "Lutron", "Honeywell"],
            "tags": ["EDUCATION", "CAMPUS", "LEARNING"],
            "faqs": [
                {
                    "question": "How does this enhance the learning environment?",
                    "answer": "Smart classrooms with one-touch AV control, optimal lighting, and climate create better learning conditions. Studies show 10-15% improvement in student engagement and teacher efficiency."
                },
                {
                    "question": "What about student safety?",
                    "answer": "Our system includes integrated security cameras, access control, emergency lockdown protocols, and instant notification systems. All tied to a central command center for rapid response."
                },
                {
                    "question": "Can parents be notified in emergencies?",
                    "answer": "Yes. Emergency notification system can send instant alerts via SMS, email, and mobile app to parents, staff, and emergency services simultaneously."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Safety",
            "mega_menu_category": "commercial",
            "mega_menu_order": 7
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "industrial-automation",
            "title": "Industrial Facility Automation",
            "category": "Industrial",
            "description": "Safety-focused automation for factories and warehouses",
            "long_description": "Robust industrial automation including equipment monitoring, safety system integration, energy management for high-consumption facilities, and logistics optimization. Built for 24/7 operation in demanding environments.",
            "image": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Equipment Health Monitoring",
                "Predictive Maintenance Alerts",
                "Safety System Integration",
                "Energy Load Management",
                "Warehouse Logistics Optimization",
                "Environmental Compliance Monitoring",
                "Emergency Shutdown Protocols",
                "Real-Time Production Dashboards"
            ],
            "brands": ["Siemens", "Schneider Electric", "Rockwell Automation", "ABB"],
            "tags": ["INDUSTRIAL", "SAFETY", "EFFICIENCY"],
            "faqs": [
                {
                    "question": "How does predictive maintenance work?",
                    "answer": "IoT sensors monitor equipment vibration, temperature, and performance. AI algorithms detect anomalies and predict failures 3-7 days in advance, preventing 70-80% of unplanned downtime."
                },
                {
                    "question": "Is it suitable for harsh environments?",
                    "answer": "Yes. We use industrial-grade components rated for extreme temperatures, dust, moisture, and vibration. All systems meet IP65/IP67 standards for harsh conditions."
                },
                {
                    "question": "What safety certifications do you have?",
                    "answer": "Our systems are SIL-rated and comply with OSHA, ISO 45001, and local industrial safety regulations. All installations include comprehensive safety audits and documentation."
                }
            ],
            "featured": True,
            "popular": False,
            "badge": "Safety First",
            "mega_menu_category": "commercial",
            "mega_menu_order": 8
        }
    ]
    
    print("🔄 Seeding Phase 2 solutions...")
    
    for solution in phase2_solutions:
        existing = await db.solutions.find_one({"slug": solution["slug"]})
        
        if existing:
            await db.solutions.update_one(
                {"slug": solution["slug"]},
                {"$set": solution}
            )
            print(f"✅ Updated: {solution['title']}")
        else:
            await db.solutions.insert_one(solution)
            print(f"✅ Created: {solution['title']}")
    
    print(f"\n✨ Successfully seeded {len(phase2_solutions)} Phase 2 solutions!")
    
    count = await db.solutions.count_documents({"category": {"$in": ["Commercial Solutions", "Healthcare", "Education", "Industrial"]}})
    print(f"📊 Total Commercial/Building Solutions in database: {count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_phase2_solutions())

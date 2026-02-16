"""
Comprehensive Solutions Seeder - All 15 Solutions with Detailed Content
Based on https://lexalifestyle.com/lexa-solutions/
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_db')

async def seed_all_solutions():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    solutions_collection = db.solutions
    
    # Clear existing solutions
    await solutions_collection.delete_many({})
    
    solutions = [
        {
            "id": str(uuid4()),
            "slug": "smart-residential-living",
            "title": "Smart Residential Living",
            "category": "Residential Automation",
            "description": "Unified automation for lighting, climate, entertainment, and access",
            "long_description": "Lexa's Smart Residential Living solution captures the full spectrum of modern, intelligent homes. From everyday convenience to aspirational luxury, this is where integrated automation, smart control, comfort, security, and entertainment converge. We offer whole-home automation: lighting, shading, HVAC, appliances, AV, security, and wellness sensors all working together under one platform.",
            "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Lighting & Climate Control Automation",
                "Smart Security & Surveillance",
                "Voice & App Integration",
                "Home Entertainment Systems",
                "Energy Monitoring & Efficiency",
                "Smart Access & Lifestyle Scenes",
                "Whole-home automation platform",
                "Personalized user profiles",
                "IoT device connectivity",
                "Future-proof architecture"
            ],
            "brands": ["Savant", "Control4", "Crestron", "QBUS", "Akuvox", "Lumibright"],
            "tags": ["AUTOMATION", "RESIDENTIAL", "SMART HOME"]
        },
        {
            "id": str(uuid4()),
            "slug": "commercial-collaboration-spaces",
            "title": "Commercial Collaboration Spaces",
            "category": "Commercial Solutions",
            "description": "Integrated AV, conferencing, and automation for offices",
            "long_description": "Transform your workplace with integrated audio-visual systems, video conferencing, wireless presentation, and environmental controls. Our commercial solutions enhance productivity and collaboration while maintaining professional aesthetics.",
            "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Video Conferencing Systems",
                "Wireless Presentation Solutions",
                "Room Booking & Scheduling",
                "Integrated AV Control",
                "Smart Meeting Rooms",
                "Digital Signage Integration",
                "Climate & Lighting Automation",
                "Unified Communications"
            ],
            "brands": ["Crestron", "Extron", "Polycom", "Zoom Rooms", "Microsoft Teams"],
            "tags": ["COMMERCIAL", "AV", "CONFERENCING"]
        },
        {
            "id": str(uuid4()),
            "slug": "themed-home-cinemas",
            "title": "Themed Home Cinemas",
            "category": "Entertainment",
            "description": "High-fidelity, acoustically optimized home theatre environments",
            "long_description": "For the cinephile, Lexa's Themed Home Cinemas takes film and entertainment to another level. We build dedicated cinema rooms with acoustic treatments, high contrast projection, calibrated lighting (star ceilings, wall washers), multi-channel surround or immersive audio, and automation that controls everything. Optional themes — classic noir, sci-fi, retro, modern luxury — to match aesthetic preferences.",
            "image": "https://images.unsplash.com/photo-1616530940355-351fabd9524b?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Acoustic Design & Soundproofing",
                "Projector & Display Integration",
                "Custom Seating & Ambience Lighting",
                "Dolby Atmos Audio Setup",
                "Voice & App-Based Control",
                "Multi-Purpose Media Room Design",
                "Star ceiling installations",
                "Custom themed interiors",
                "Calibrated audio systems",
                "4K/8K projection systems"
            ],
            "brands": ["Sony", "Bowers & Wilkins", "Magna", "Milan", "Leica", "QBUS", "Lumibright"],
            "tags": ["CINEMA", "ENTERTAINMENT", "AUDIO"]
        },
        {
            "id": str(uuid4()),
            "slug": "luxury-hospitality-automation",
            "title": "Luxury Hospitality Automation",
            "category": "Hospitality",
            "description": "Smart controls for lighting, curtains, AV, and guest preferences",
            "long_description": "Elevate guest experiences with intelligent room automation. Control lighting scenes, climate, curtains, entertainment, and personalized settings. Seamlessly integrate with property management systems for check-in/check-out automation.",
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Guest Room Automation",
                "Personalized Lighting Scenes",
                "Climate Control Integration",
                "In-room Entertainment Systems",
                "Motorized Curtains & Shades",
                "PMS Integration",
                "Energy Management",
                "Guest Preference Memory"
            ],
            "brands": ["Crestron", "Lutron", "Savant", "QBUS"],
            "tags": ["HOSPITALITY", "AUTOMATION", "LUXURY"]
        },
        {
            "id": str(uuid4()),
            "slug": "multi-room-entertainment",
            "title": "Multi-Room Entertainment",
            "category": "Entertainment",
            "description": "Streamlined media sharing across rooms and zones",
            "long_description": "Enjoy your music, movies, and content in every room. Our multi-room entertainment systems deliver synchronized or independent audio/video across your entire property with seamless control from any device.",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Whole-home Audio Distribution",
                "Video Matrix Switching",
                "Streaming Service Integration",
                "Zone-based Control",
                "Synchronized Playback",
                "Independent Room Control",
                "High-fidelity Audio",
                "4K Video Distribution"
            ],
            "brands": ["Sonos", "Control4", "Savant", "K-Array", "Bowers & Wilkins"],
            "tags": ["AUDIO", "ENTERTAINMENT", "MULTI-ZONE"]
        },
        {
            "id": str(uuid4()),
            "slug": "security-enhanced-environments",
            "title": "Security-Enhanced Environments",
            "category": "Security",
            "description": "Automated surveillance, perimeter monitoring, and remote access",
            "long_description": "Comprehensive security solutions including CCTV, access control, intrusion detection, and perimeter monitoring. All integrated with smart automation for alerts, remote monitoring, and intelligent response.",
            "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "IP Camera Systems",
                "Access Control Integration",
                "Intrusion Detection",
                "Perimeter Security",
                "Remote Monitoring",
                "Smart Alerts & Notifications",
                "Video Analytics",
                "24/7 Recording & Backup"
            ],
            "brands": ["Hikvision", "Dahua", "Akuvox", "Axis", "Honeywell"],
            "tags": ["SECURITY", "SURVEILLANCE", "ACCESS CONTROL"]
        },
        {
            "id": str(uuid4()),
            "slug": "energy-efficient-living",
            "title": "Energy-Efficient Living",
            "category": "Sustainability",
            "description": "Eco-conscious automation with sensors and intelligent lighting",
            "long_description": "Reduce energy consumption with smart automation. Occupancy sensors, daylight harvesting, intelligent HVAC control, and real-time energy monitoring help you live sustainably while maintaining comfort.",
            "image": "https://images.unsplash.com/photo-1497440001374-f26997328c1b?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Occupancy-based Automation",
                "Daylight Harvesting",
                "Smart HVAC Optimization",
                "Energy Monitoring Dashboard",
                "Solar Integration",
                "Load Management",
                "Automated Scheduling",
                "Usage Analytics"
            ],
            "brands": ["Lutron", "QBUS", "Nest", "Savant"],
            "tags": ["ENERGY", "SUSTAINABILITY", "GREEN"]
        },
        {
            "id": str(uuid4()),
            "slug": "outdoor-av-landscape-control",
            "title": "Outdoor AV & Landscape Control",
            "category": "Outdoor Living",
            "description": "Poolside sound, lighting zones, and seasonal settings",
            "long_description": "Extend your smart home outdoors with weatherproof audio, landscape lighting control, pool automation, and outdoor entertainment zones. Perfect for patios, gardens, and poolside areas.",
            "image": "https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Weatherproof Audio Systems",
                "Landscape Lighting Control",
                "Pool Automation",
                "Outdoor Cinema Setup",
                "Irrigation Control",
                "Seasonal Programming",
                "Zone-based Control",
                "Weather Integration"
            ],
            "brands": ["K-Array", "Sonos", "Lumibright", "QBUS"],
            "tags": ["OUTDOOR", "AUDIO", "LANDSCAPE"]
        },
        {
            "id": str(uuid4()),
            "slug": "assisted-living-wellness-spaces",
            "title": "Assisted Living & Wellness Spaces",
            "category": "Healthcare",
            "description": "Smart environments for comfort, health, and safety",
            "long_description": "Technology-assisted living spaces designed for elderly care and wellness. Voice control, emergency alerts, health monitoring integration, and intuitive automation for enhanced safety and independence.",
            "image": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Voice-activated Controls",
                "Emergency Alert Systems",
                "Health Monitoring Integration",
                "Fall Detection",
                "Medication Reminders",
                "Remote Family Access",
                "Simple User Interfaces",
                "24/7 Monitoring Support"
            ],
            "brands": ["Savant", "Control4", "Lifesmart", "Akuvox"],
            "tags": ["HEALTHCARE", "WELLNESS", "ACCESSIBILITY"]
        },
        {
            "id": str(uuid4()),
            "slug": "boardrooms-auditoriums",
            "title": "Boardrooms & Auditoriums",
            "category": "Commercial",
            "description": "Customized AV and environmental control for corporate setups",
            "long_description": "Professional AV solutions for corporate boardrooms and auditoriums. High-end displays, conference systems, acoustic design, automated shading, and integrated control for presentations and meetings.",
            "image": "https://images.unsplash.com/photo-1531973576160-7125cd663d86?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Large Format Displays",
                "Professional Audio Systems",
                "Video Conferencing",
                "Automated Lighting Control",
                "Acoustic Treatments",
                "Presentation Switching",
                "Recording Systems",
                "Remote Management"
            ],
            "brands": ["Crestron", "Extron", "Sony", "Bowers & Wilkins"],
            "tags": ["COMMERCIAL", "AV", "CORPORATE"]
        },
        {
            "id": str(uuid4()),
            "slug": "mirror-tv",
            "title": "Mirror TV",
            "category": "Luxury Tech",
            "description": "Hidden displays that transform into elegant mirrors when off",
            "long_description": "Combine luxury and technology with mirror TVs. When off, they appear as elegant mirrors. When on, they deliver stunning 4K picture quality. Perfect for bathrooms, bedrooms, and living spaces.",
            "image": "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Seamless Integration",
                "4K Display Quality",
                "Custom Frame Options",
                "Waterproof Models",
                "Touch Control",
                "Smart Home Integration",
                "Various Size Options",
                "Anti-fog Technology"
            ],
            "brands": ["Samsung", "LG", "Sony", "Lexa Custom"],
            "tags": ["LUXURY", "DISPLAY", "INNOVATION"]
        },
        {
            "id": str(uuid4()),
            "slug": "video-walls",
            "title": "Video Walls",
            "category": "Commercial Display",
            "description": "Large-scale display solutions for impact and engagement",
            "long_description": "Create stunning visual experiences with multi-screen video walls. Perfect for retail, corporate lobbies, control rooms, and entertainment venues. Seamless bezels and 4K resolution for maximum impact.",
            "image": "https://images.unsplash.com/photo-1563770660941-20978e870e26?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Ultra-narrow Bezel Design",
                "4K/8K Resolution",
                "Flexible Configurations",
                "Content Management System",
                "Video Wall Processor",
                "24/7 Operation",
                "Modular Design",
                "Remote Management"
            ],
            "brands": ["Samsung", "LG", "Sony", "Planar"],
            "tags": ["DISPLAY", "COMMERCIAL", "VIDEO WALL"]
        },
        {
            "id": str(uuid4()),
            "slug": "yacht-automation",
            "title": "Yacht Automation",
            "category": "Marine",
            "description": "Intelligent systems for luxury yachts and vessels",
            "long_description": "Bring smart automation to the sea. Control lighting, climate, entertainment, and navigation systems with marine-grade equipment designed for the harsh maritime environment.",
            "image": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Marine-grade Equipment",
                "Integrated Navigation",
                "Climate Control",
                "Entertainment Systems",
                "Lighting Automation",
                "Security Systems",
                "Remote Monitoring",
                "Stabilization Integration"
            ],
            "brands": ["Savant", "Crestron Marine", "Fusion", "K-Array"],
            "tags": ["MARINE", "YACHT", "AUTOMATION"]
        },
        {
            "id": str(uuid4()),
            "slug": "marine-audio",
            "title": "Marine Audio",
            "category": "Marine Entertainment",
            "description": "High-quality audio systems designed for marine environments",
            "long_description": "Weatherproof, corrosion-resistant audio systems for yachts and boats. Crystal-clear sound even in open waters with marine-certified speakers and amplifiers.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Waterproof Speakers",
                "Corrosion-resistant Hardware",
                "High-power Amplifiers",
                "Multi-zone Audio",
                "Bluetooth Connectivity",
                "Satellite Radio Integration",
                "Subwoofer Systems",
                "UV-resistant Materials"
            ],
            "brands": ["K-Array", "Fusion", "JL Audio", "Bowers & Wilkins"],
            "tags": ["MARINE", "AUDIO", "ENTERTAINMENT"]
        },
        {
            "id": str(uuid4()),
            "slug": "marine-video",
            "title": "Marine Video",
            "category": "Marine Entertainment",
            "description": "Display and video systems engineered for maritime use",
            "long_description": "Marine-certified displays and video systems for entertainment and navigation. Built to withstand marine conditions while delivering exceptional picture quality.",
            "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=srgb&fm=jpg&q=85",
            "features": [
                "Marine-certified Displays",
                "Sunlight-readable Screens",
                "Waterproof Construction",
                "Anti-glare Technology",
                "HDMI Distribution",
                "Satellite TV Integration",
                "Navigation Display Integration",
                "Remote Control"
            ],
            "brands": ["Sony", "Samsung", "Fusion", "Garmin"],
            "tags": ["MARINE", "VIDEO", "DISPLAY"]
        }
    ]
    
    # Insert all solutions
    result = await solutions_collection.insert_many(solutions)
    print(f"✅ Successfully inserted {len(result.inserted_ids)} solutions")
    
    # Verify
    count = await solutions_collection.count_documents({})
    print(f"📊 Total solutions in database: {count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_all_solutions())

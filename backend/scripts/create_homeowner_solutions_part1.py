"""
Create all missing homeowner solutions with comprehensive SEO content
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from uuid import uuid4

load_dotenv()

async def create_homeowner_solutions():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME', 'smart_home_db')]
    
    solutions = [
        {
            'id': str(uuid4()),
            'slug': 'home-theater',
            'title': 'Home Theater Systems',
            'subtitle': 'Cinema-Quality Entertainment at Home',
            'category': 'Entertainment',
            'description': 'Transform your living space into a premium cinema with professional home theater systems. Immersive audio, 4K projection, and acoustic design for the ultimate viewing experience.',
            'long_description': 'Experience cinema-quality entertainment in Dubai homes with LEXA\'s premium home theater installations. From Emirates Hills villas to Downtown penthouses, we design and install complete theater systems with 4K/8K projection, Dolby Atmos surround sound, acoustic treatments, tiered seating, and smart lighting control. Every system is custom-designed for your space and viewing preferences.',
            'image': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200',
            'thumbnail': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600',
            'features': [
                '4K/8K Laser Projection',
                'Dolby Atmos Surround Sound',
                'Acoustic Room Treatment',
                'Motorized Projection Screens',
                'Theater Seating & Design',
                'Smart Lighting Control',
                'Source Switching & Control',
                'Streaming Integration'
            ],
            'brands': ['Sony', 'Epson', 'JBL', 'Bowers & Wilkins', 'Control4', 'Lutron'],
            'tags': ['Home Cinema', 'Entertainment', 'Audio Visual'],
            'featured': True,
            'seo_title': 'Home Theater Systems Dubai | Custom Cinema Installation UAE',
            'seo_description': 'Premium home theater installation in Dubai. 4K projection, Dolby Atmos, acoustic design. Transform your villa into a private cinema. Free consultation.',
            'seo_keywords': ['home theater Dubai', 'home cinema UAE', 'Dolby Atmos Dubai', 'custom cinema', 'home theater installation'],
            'price_range': 'AED 80,000 - 500,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'lighting-automation',
            'title': 'Lighting Automation',
            'subtitle': 'Intelligent Illumination Control',
            'category': 'Smart Living',
            'description': 'Smart lighting control for every room in your home. Create scenes, schedules, and automate lights for comfort, security, and energy savings.',
            'long_description': 'LEXA\'s lighting automation systems transform how you control illumination in Dubai homes. Lutron and KNX systems provide whole-home control from smartphones, voice, or elegant wall keypads. Create custom scenes for entertaining, relaxing, or working. Automated schedules adapt to sunrise/sunset. Motion sensors and occupancy detection ensure lights are on when needed, off when not—reducing DEWA bills by 30-40%. Perfect for villas, apartments, and townhouses across Emirates Hills, Palm Jumeirah, and Dubai Marina.',
            'image': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
            'thumbnail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
            'features': [
                'Whole-Home Control',
                'Custom Lighting Scenes',
                'Voice Control Integration',
                'Occupancy Sensors',
                'Automated Schedules',
                'Dimming & Color Control',
                'Energy Monitoring',
                'Remote Access'
            ],
            'brands': ['Lutron', 'KNX', 'Philips Hue', 'LIFX', 'Control4'],
            'tags': ['Lighting', 'Automation', 'Energy Efficiency'],
            'featured': True,
            'seo_title': 'Lighting Automation Dubai | Smart Home Lighting Control UAE',
            'seo_description': 'Smart lighting automation for Dubai homes. Lutron, KNX systems. Control lights via voice, app, or scenes. Save 30-40% on energy. Free consultation.',
            'seo_keywords': ['lighting automation Dubai', 'smart lighting UAE', 'Lutron Dubai', 'home automation lighting', 'automated lighting'],
            'price_range': 'AED 25,000 - 200,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'climate-control',
            'title': 'Climate Control Systems',
            'subtitle': 'Intelligent Temperature & Air Quality',
            'category': 'Comfort',
            'description': 'Smart climate control for optimal comfort and energy efficiency. Zone-based HVAC, air quality monitoring, and automated temperature management.',
            'long_description': 'Dubai\'s extreme climate demands intelligent climate control. LEXA integrates smart thermostats, zone-based HVAC, and air quality monitoring for optimal comfort and efficiency in your home. Systems adapt to occupancy, weather, and your schedule—maintaining perfect temperature while reducing DEWA cooling costs by 30-35%. Monitor and control from anywhere via smartphone. Ideal for villas where different zones need different temperatures, or apartments requiring precision cooling management.',
            'image': 'https://images.unsplash.com/photo-1585128792684-cc3627baa2f7?w=1200',
            'thumbnail': 'https://images.unsplash.com/photo-1585128792684-cc3627baa2f7?w=600',
            'features': [
                'Multi-Zone Control',
                'Smart Thermostats',
                'Air Quality Monitoring',
                'Occupancy-Based Automation',
                'Energy Optimization',
                'Remote Temperature Control',
                'Schedule Management',
                'Weather Integration'
            ],
            'brands': ['Nest', 'Ecobee', 'Honeywell', 'Tado', 'Control4'],
            'tags': ['Climate', 'HVAC', 'Energy Efficiency'],
            'featured': False,
            'seo_title': 'Smart Climate Control Dubai | Home HVAC Automation UAE',
            'seo_description': 'Intelligent climate control for Dubai homes. Zone-based HVAC, smart thermostats, air quality monitoring. Save 30% on cooling costs. Free assessment.',
            'seo_keywords': ['climate control Dubai', 'smart thermostat UAE', 'HVAC automation', 'air quality monitoring Dubai', 'home cooling'],
            'price_range': 'AED 15,000 - 80,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'security',
            'title': 'Home Security Systems',
            'subtitle': 'Complete Protection for Your Family',
            'category': 'Security',
            'description': 'Comprehensive home security with cameras, smart locks, sensors, and 24/7 monitoring. Protect your Dubai home with intelligent security solutions.',
            'long_description': 'LEXA provides comprehensive home security for Dubai villas and apartments. 4K cameras with AI detection, smart locks, motion sensors, glass break detectors, and professional monitoring create multi-layered protection. Mobile alerts keep you informed instantly. Integration with Control4 or Crestron enables automated security scenes—"Away Mode" arms everything, "Night Mode" secures perimeter. From Emirates Hills estates to Marina apartments, we design security tailored to your property and lifestyle.',
            'image': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200',
            'thumbnail': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600',
            'features': [
                '4K Security Cameras',
                'Smart Door Locks',
                'Motion & Glass Break Sensors',
                'Video Doorbell',
                'Mobile Alerts',
                'Professional Monitoring',
                'Automated Security Scenes',
                'Cloud Video Storage'
            ],
            'brands': ['Hikvision', 'Axis', 'Yale', 'Ring', 'Nest', 'Control4'],
            'tags': ['Security', 'Surveillance', 'Smart Home'],
            'featured': True,
            'seo_title': 'Home Security Systems Dubai | Smart Security Solutions UAE',
            'seo_description': 'Professional home security in Dubai. 4K cameras, smart locks, 24/7 monitoring. Protect your family and property. SIRA approved. Free consultation.',
            'seo_keywords': ['home security Dubai', 'security cameras UAE', 'smart locks Dubai', 'home alarm system', 'villa security'],
            'price_range': 'AED 20,000 - 150,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'multi-room-audio',
            'title': 'Multi-Room Audio Systems',
            'subtitle': 'Music Throughout Your Home',
            'category': 'Entertainment',
            'description': 'Distributed audio for every room. Stream music, podcasts, and radio throughout your home with synchronized or independent zone control.',
            'long_description': 'Enjoy premium audio in every room with LEXA\'s multi-room systems. Sonos, KEF, and Bowers & Wilkins speakers deliver exceptional sound quality throughout Dubai homes. Stream Spotify, Apple Music, or local libraries to any room—or sync all zones for whole-home parties. Control via smartphone, voice, or wall keypads. Perfect for entertaining, background music, or focused listening. Systems scale from 4-zone apartments to 16+ zone villas in Emirates Hills and Palm Jumeirah.',
            'image': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200',
            'thumbnail': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600',
            'features': [
                '8-16 Zone Audio',
                'Streaming Service Integration',
                'Whole-Home Sync',
                'Independent Zone Control',
                'Voice Control',
                'In-Wall & Ceiling Speakers',
                'Mobile App Control',
                'Party Mode'
            ],
            'brands': ['Sonos', 'KEF', 'Bowers & Wilkins', 'Bose', 'Control4'],
            'tags': ['Audio', 'Entertainment', 'Music'],
            'featured': False,
            'seo_title': 'Multi-Room Audio Dubai | Whole Home Music Systems UAE',
            'seo_description': 'Premium multi-room audio for Dubai homes. Sonos, KEF, B&W speakers. Stream music to every room. Professional installation. Free consultation.',
            'seo_keywords': ['multi-room audio Dubai', 'Sonos Dubai', 'whole home audio', 'distributed audio system', 'home music system'],
            'price_range': 'AED 30,000 - 150,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        }
    ]
    
    # Insert first batch
    for solution in solutions:
        try:
            await db.solutions.insert_one(solution)
            print(f"✓ Created: {solution['slug']}")
        except Exception as e:
            print(f"✗ Error creating {solution['slug']}: {e}")
    
    print(f"\n✅ Created {len(solutions)} solutions (batch 1/4)")
    client.close()

if __name__ == "__main__":
    asyncio.run(create_homeowner_solutions())

"""
Create remaining homeowner solutions - Batch 2-4
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from uuid import uuid4

load_dotenv()

async def create_remaining_solutions():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME', 'smart_home_db')]
    
    solutions = [
        # Batch 2
        {
            'id': str(uuid4()),
            'slug': 'motorized-blinds-curtains',
            'title': 'Motorized Blinds & Curtains',
            'subtitle': 'Automated Window Treatments',
            'category': 'Smart Living',
            'description': 'Motorized blinds and curtains for convenience, privacy, and energy efficiency. Control via app, voice, or automated schedules.',
            'long_description': 'Motorized window treatments add luxury and convenience to Dubai homes. LEXA installs Somfy and Lutron motorized blinds and curtains that open/close via smartphone, voice commands, or automated schedules. Blackout shades for bedrooms,  sheer curtains for living areas, and outdoor solar screens—all controlled seamlessly. Integration with lighting and climate systems optimizes energy use. Perfect for floor-to-ceiling windows in Downtown penthouses or traditional villa settings.',
            'image': 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200',
            'features': ['Somfy & Lutron Motors', 'Voice Control', 'Scheduled Automation', 'Blackout & Sheer Options', 'Energy Optimization', 'Remote Control', 'Scene Integration', 'Quiet Operation'],
            'brands': ['Somfy', 'Lutron', 'Control4', 'Crestron'],
            'tags': ['Window Treatment', 'Automation', 'Energy Efficiency'],
            'seo_title': 'Motorized Blinds Dubai | Automated Curtains UAE',
            'seo_description': 'Motorized blinds & curtains for Dubai homes. Somfy, Lutron systems. Control via app or voice. Energy efficient. Free consultation.',
            'seo_keywords': ['motorized blinds Dubai', 'automated curtains UAE', 'Somfy Dubai', 'smart blinds', 'window automation'],
            'price_range': 'AED 15,000 - 100,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'voice-control',
            'title': 'Voice Control Systems',
            'subtitle': 'Control Your Home with Voice Commands',
            'category': 'Smart Living',
            'description': 'Integrate Alexa, Google Assistant, or Siri for hands-free home control. Voice commands for lights, climate, entertainment, and security.',
            'long_description': 'Control your entire Dubai smart home with voice commands in English or Arabic. LEXA integrates Amazon Alexa, Google Assistant, and Apple HomeKit for natural voice control of lighting, climate, entertainment, security, and more. "Alexa, good morning" opens blinds, adjusts temperature, and starts coffee. "مرحبا جوجل، وقت النوم" (Hey Google, bedtime) locks doors, dims lights, and arms security. Perfect for families with children, elderly, or anyone who values convenience.',
            'image': 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=1200',
            'features': ['Alexa Integration', 'Google Assistant', 'Apple HomeKit', 'Arabic Voice Support', 'Custom Voice Commands', 'Multi-User Profiles', 'Routine Automation', 'Offline Functionality'],
            'brands': ['Amazon Alexa', 'Google', 'Apple', 'Control4', 'Josh.ai'],
            'tags': ['Voice Control', 'AI', 'Smart Home'],
            'seo_title': 'Voice Control Dubai | Alexa & Google Home Integration UAE',
            'seo_description': 'Voice control for Dubai smart homes. Alexa, Google Assistant, Arabic support. Control everything hands-free. Professional installation.',
            'seo_keywords': ['voice control Dubai', 'Alexa Dubai', 'Google Home UAE', 'Arabic voice control', 'smart home voice'],
            'price_range': 'AED 5,000 - 30,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'home-cinema',
            'title': 'Home Cinema Design',
            'subtitle': 'Dedicated Cinema Rooms',
            'category': 'Entertainment',
            'description': 'Custom-designed dedicated cinema rooms with professional acoustics, seating, and equipment. The ultimate home entertainment experience.',
            'long_description': 'LEXA designs and builds dedicated home cinemas in Dubai villas—complete immersive experiences rivaling commercial theaters. Acoustic treatment, bass traps, fabric wall panels, tiered luxury seating, starlight ceilings, and concealed equipment racks create authentic cinema atmosphere. 4K laser projection, Dolby Atmos with in-ceiling/in-wall speakers, and tactile transducers deliver reference-quality audio-visual performance. Popular in Emirates Hills, Arabian Ranches, and Jumeirah Islands mega-villas.',
            'image': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200',
            'features': ['Acoustic Design & Treatment', 'Tiered Cinema Seating', 'Dolby Atmos Audio', '4K Laser Projection', 'Starlight Ceiling', 'Mood Lighting', 'Equipment Racks', 'Full Blackout'],
            'brands': ['Sony', 'JBL Synthesis', 'Bowers & Wilkins', 'Control4', 'Lutron'],
            'tags': ['Cinema', 'Entertainment', 'Luxury'],
            'featured': True,
            'seo_title': 'Home Cinema Dubai | Dedicated Theater Room Design UAE',
            'seo_description': 'Luxury home cinema design in Dubai. Dolby Atmos, acoustic treatment, custom seating. Professional theater room installation. Free consultation.',
            'seo_keywords': ['home cinema Dubai', 'dedicated theater UAE', 'Dolby Atmos home', 'luxury cinema room', 'private theater'],
            'price_range': 'AED 200,000 - 1,000,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'audio-systems',
            'title': 'Premium Audio Systems',
            'subtitle': 'High-Fidelity Sound for Audiophiles',
            'category': 'Entertainment',
            'description': 'Audiophile-grade stereo and surround sound systems. Premium speakers, amplifiers, and acoustic tuning for discerning listeners.',
            'long_description': 'For music lovers and audiophiles, LEXA designs premium audio systems delivering uncompromising sound quality. Bowers & Wilkins, KEF, McIntosh, and other high-end brands paired with acoustic room treatment and professional calibration. Dedicated listening rooms, living room stereo, or integrated surround systems—each custom-tuned for your space and preferences. Vinyl playback, high-resolution streaming, and multi-source switching via elegant Control4 or Crestron interfaces.',
            'image': 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1200',
            'features': ['Audiophile Speakers', 'High-Resolution Audio', 'Room Acoustic Tuning', 'Vinyl & Streaming', 'McIntosh Amplifiers', 'KEF & B&W Speakers', 'Dedicated Listening Rooms', 'Professional Calibration'],
            'brands': ['Bowers & Wilkins', 'KEF', 'McIntosh', 'Naim', 'Bang & Olufsen'],
            'tags': ['Audio', 'HiFi', 'Entertainment'],
            'seo_title': 'Premium Audio Systems Dubai | Audiophile HiFi UAE',
            'seo_description': 'High-end audio systems for Dubai homes. B&W, KEF, McIntosh. Professional acoustic tuning. Audiophile-grade sound. Free consultation.',
            'seo_keywords': ['premium audio Dubai', 'audiophile systems UAE', 'Bowers Wilkins Dubai', 'KEF speakers', 'high-end audio'],
            'price_range': 'AED 50,000 - 300,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'home-network',
            'title': 'Home Network Infrastructure',
            'subtitle': 'Enterprise-Grade WiFi & Networking',
            'category': 'Technology',
            'description': 'Robust home networking with enterprise WiFi, structured cabling, and network security. Fast, reliable connectivity throughout your property.',
            'long_description': 'Modern Dubai homes demand robust networking. LEXA designs and installs enterprise-grade WiFi using UniFi or Cisco systems—ensuring fast, reliable connectivity in every room, outdoor areas, and even poolside. Structured Cat6/Cat7 cabling, fiber optics, network security, and professional access points eliminate dead zones. Support 50+ devices simultaneously—perfect for smart homes with numerous IoT devices, home offices, streaming, and gaming. Includes guest networks, parental controls, and network monitoring.',
            'image': 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=1200',
            'features': ['Enterprise WiFi (UniFi/Cisco)', 'Whole-Home Coverage', 'Structured Cabling', 'Network Security', 'Guest Networks', 'Parental Controls', 'PoE Access Points', '10Gb Backbone'],
            'brands': ['UniFi', 'Cisco', 'Netgear', 'Ruckus'],
            'tags': ['Networking', 'WiFi', 'Technology'],
            'seo_title': 'Home Network Dubai | Enterprise WiFi Installation UAE',
            'seo_description': 'Professional home networking in Dubai. Enterprise WiFi, structured cabling, full coverage. Fast, reliable connectivity. Free site survey.',
            'seo_keywords': ['home network Dubai', 'WiFi installation UAE', 'UniFi Dubai', 'structured cabling', 'home networking'],
            'price_range': 'AED 20,000 - 80,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        }
    ]
    
    for solution in solutions:
        try:
            await db.solutions.insert_one(solution)
            print(f"✓ Created: {solution['slug']}")
        except Exception as e:
            print(f"✗ Error: {solution['slug']}: {e}")
    
    print(f"\n✅ Batch 2 complete: {len(solutions)} solutions")
    
    # Batch 3
    solutions_batch3 = [
        {
            'id': str(uuid4()),
            'slug': 'networking',
            'title': 'Smart Home Networking',
            'subtitle': 'Foundation for Connected Living',
            'category': 'Technology',
            'description': 'Comprehensive networking solutions for smart homes. Reliable WiFi, wired connections, and network management for all your devices.',
            'long_description': 'Smart home networking is the foundation of reliable automation. LEXA deploys professional networking infrastructure—ensuring Control4, Crestron, security cameras, smart thermostats, and entertainment systems communicate flawlessly. Managed switches, VLANs for security, QoS for streaming, and redundant internet connections guarantee uptime. Remote management allows troubleshooting and updates without site visits. Essential for large Dubai villas with 100+ smart devices.',
            'image': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200',
            'features': ['Managed Network Switches', 'VLAN Segmentation', 'QoS for Streaming', 'Redundant Internet', 'Remote Management', 'Network Monitoring', 'IoT Device Support', 'Cybersecurity'],
            'brands': ['UniFi', 'Cisco', 'Netgear', 'Control4'],
            'tags': ['Networking', 'Infrastructure', 'Technology'],
            'seo_title': 'Smart Home Networking Dubai | IoT Network Infrastructure UAE',
            'seo_description': 'Professional smart home networking in Dubai. Reliable infrastructure for automation, security, AV systems. Expert installation.',
            'seo_keywords': ['smart home network Dubai', 'IoT networking UAE', 'home automation network', 'managed switches Dubai'],
            'price_range': 'AED 25,000 - 100,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'access-control',
            'title': 'Access Control Systems',
            'subtitle': 'Smart Locks & Entry Management',
            'category': 'Security',
            'description': 'Control who enters your home with smart locks, keypads, biometric readers, and access logs. Secure, convenient, and integrated.',
            'long_description': 'LEXA access control systems secure Dubai homes with smart locks, biometric readers, keypads, and keycards. Grant temporary access to guests, cleaners, or contractors via smartphone—with time/date restrictions. Receive alerts when doors open. Integration with home automation enables "Welcome Home" scenes when you unlock. Popular Yale, August, and Schlage smart locks work with Control4/Crestron for unified control. Perfect for villas with multiple entry points, staff access, or vacation homes.',
            'image': 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200',
            'features': ['Smart Door Locks', 'Biometric Readers', 'Keypad Entry', 'Mobile Access Control', 'Temporary Codes', 'Access Logs', 'Remote Locking', 'Scene Integration'],
            'brands': ['Yale', 'August', 'Schlage', 'Assa Abloy', 'Control4'],
            'tags': ['Access Control', 'Security', 'Smart Locks'],
            'seo_title': 'Access Control Dubai | Smart Locks & Entry Systems UAE',
            'seo_description': 'Smart access control for Dubai homes. Yale, August smart locks. Biometric, keypad, mobile access. Secure entry management.',
            'seo_keywords': ['access control Dubai', 'smart locks UAE', 'Yale smart lock', 'biometric entry', 'home access'],
            'price_range': 'AED 10,000 - 50,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'security-surveillance',
            'title': 'Security & Surveillance',
            'subtitle': 'Video Monitoring & Protection',
            'category': 'Security',
            'description': '4K security cameras, video doorbells, and intelligent surveillance. Monitor your property 24/7 from anywhere in the world.',
            'long_description': 'Protect your Dubai home with LEXA advanced surveillance systems. 4K IP cameras with night vision, AI person/vehicle detection, and facial recognition monitor indoor/outdoor areas 24/7. Cloud and local video storage, mobile app access, and instant alerts keep you informed. Integration with smart home enables automated responses—cameras trigger lights or alarms when motion detected. SIRA-approved installations for villas, townhouses, and apartments across Dubai.',
            'image': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200',
            'features': ['4K IP Cameras', 'Night Vision', 'AI Detection', 'Facial Recognition', 'Video Doorbell', 'Cloud Storage', 'Mobile Alerts', 'Smart Home Integration'],
            'brands': ['Hikvision', 'Axis', 'Nest', 'Ring', 'Arlo'],
            'tags': ['Surveillance', 'Security', 'Cameras'],
            'seo_title': 'Security Cameras Dubai | Home Surveillance Systems UAE',
            'seo_description': '4K security cameras for Dubai homes. AI detection, night vision, mobile alerts. SIRA approved. Professional installation.',
            'seo_keywords': ['security cameras Dubai', 'home surveillance UAE', 'CCTV Dubai', '4K cameras', 'video doorbell'],
            'price_range': 'AED 15,000 - 100,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'intercom-video-door-entry',
            'title': 'Video Intercom Systems',
            'subtitle': 'Smart Door Entry & Communication',
            'category': 'Security',
            'description': 'Video intercom for gates, main doors, and internal communication. See and speak with visitors before granting access.',
            'long_description': 'LEXA installs video intercom systems throughout Dubai villas—gate entry, front door, staff quarters, and internal communication. See visitors on touchscreens, smartphones, or tablets before unlocking. Two-way audio communication in English/Arabic. Integration with access control enables QR code visitor access or temporary entry codes. Record video of all visitors for security. Popular in Emirates Hills gated communities and Arabian Ranches compounds where secure entry is essential.',
            'image': 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=1200',
            'features': ['Video Door Entry', 'Gate Intercom', 'Two-Way Audio', 'Mobile App Access', 'Visitor Recording', 'Remote Unlock', 'Multi-Station System', 'Integration Ready'],
            'brands': ['2N', 'Aiphone', 'Comelit', 'Hikvision', 'Control4'],
            'tags': ['Intercom', 'Security', 'Access Control'],
            'seo_title': 'Video Intercom Dubai | Door Entry Systems UAE',
            'seo_description': 'Video intercom systems for Dubai homes. Gate & door entry, mobile access, visitor recording. Professional installation.',
            'seo_keywords': ['video intercom Dubai', 'door entry system UAE', 'gate intercom', 'smart doorbell', 'visitor management'],
            'price_range': 'AED 12,000 - 60,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'outdoor-av-systems',
            'title': 'Outdoor AV Systems',
            'subtitle': 'Entertainment for Outdoor Living',
            'category': 'Outdoor',
            'description': 'Weatherproof audio and video systems for gardens, pools, and terraces. Bring entertainment outdoors with confidence.',
            'long_description': 'Dubai outdoor lifestyle demands weather-resistant entertainment. LEXA installs outdoor AV systems—weatherproof speakers, outdoor TVs, and projection systems for gardens, pool areas, and terraces. Sonance landscape speakers deliver premium audio. SunBrite outdoor TVs withstand heat and humidity. Pergola-mounted screens and projectors create outdoor cinema experiences. Control via smartphone or weatherproof keypads. Perfect for villa entertaining, poolside relaxation, or rooftop gatherings.',
            'image': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
            'features': ['Weatherproof Speakers', 'Outdoor TVs', 'Landscape Audio', 'Pool Area Sound', 'Outdoor Projection', 'UV/Heat Resistant', 'Mobile Control', 'Zone Management'],
            'brands': ['Sonance', 'SunBrite', 'Bose', 'Episode', 'Control4'],
            'tags': ['Outdoor', 'Audio Visual', 'Entertainment'],
            'seo_title': 'Outdoor AV Systems Dubai | Weatherproof Audio Video UAE',
            'seo_description': 'Outdoor audio video for Dubai homes. Weatherproof speakers, outdoor TVs, pool audio. Professional installation for terraces & gardens.',
            'seo_keywords': ['outdoor audio Dubai', 'weatherproof speakers UAE', 'outdoor TV', 'pool audio', 'garden entertainment'],
            'price_range': 'AED 25,000 - 150,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        }
    ]
    
    for solution in solutions_batch3:
        try:
            await db.solutions.insert_one(solution)
            print(f"✓ Created: {solution['slug']}")
        except Exception as e:
            print(f"✗ Error: {solution['slug']}: {e}")
    
    print(f"\n✅ Batch 3 complete: {len(solutions_batch3)} solutions")
    
    # Final batch
    solutions_batch4 = [
        {
            'id': str(uuid4()),
            'slug': 'landscape-lighting-automation',
            'title': 'Landscape Lighting Automation',
            'subtitle': 'Illuminate Your Outdoor Spaces',
            'category': 'Outdoor',
            'description': 'Automated outdoor lighting for gardens, pathways, and architectural features. Enhance beauty, safety, and security.',
            'long_description': 'Transform Dubai villa gardens with LEXA\'s automated landscape lighting. LED uplighting highlights trees and architectural features. Path lights ensure safe navigation. Downlighting creates ambiance for outdoor dining. Automated schedules adapt to sunset times—lights turn on at dusk, off at midnight. Integration with smart home enables security lighting (motion-activated) and entertaining scenes. Energy-efficient LEDs and weatherproof fixtures designed for Dubai\'s climate.',
            'image': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200',
            'features': ['LED Path Lighting', 'Tree & Feature Uplighting', 'Automated Schedules', 'Motion Detection', 'Dusk-to-Dawn Sensors', 'Scene Control', 'Energy Efficient', 'Weather Resistant'],
            'brands': ['Lutron', 'Philips Hue Outdoor', 'FX Luminaire', 'Kichler'],
            'tags': ['Landscape', 'Outdoor', 'Lighting'],
            'seo_title': 'Landscape Lighting Dubai | Garden Lighting Automation UAE',
            'seo_description': 'Automated landscape lighting for Dubai villas. LED path lights, garden uplighting, automated schedules. Professional installation.',
            'seo_keywords': ['landscape lighting Dubai', 'garden lighting UAE', 'outdoor lighting automation', 'LED landscape lights'],
            'price_range': 'AED 20,000 - 100,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'irrigation-automation',
            'title': 'Smart Irrigation Systems',
            'subtitle': 'Intelligent Garden Watering',
            'category': 'Outdoor',
            'description': 'Automated irrigation with weather intelligence and soil sensors. Water your garden efficiently while conserving resources.',
            'long_description': 'Dubai gardens require efficient watering. LEXA smart irrigation systems use weather data, soil moisture sensors, and zone-based control to water gardens intelligently. Rain and humidity sensors prevent unnecessary watering. Smartphone control allows manual overrides. Drip irrigation for flower beds, sprinklers for lawns—each zone optimized. Save 30-50% on water bills compared to traditional timers. Perfect for villa gardens, compounds, and landscaped properties across Emirates Hills, Arabian Ranches, and Springs.',
            'image': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
            'features': ['Zone-Based Control', 'Weather Intelligence', 'Soil Moisture Sensors', 'Mobile App Control', 'Rain Sensors', 'Drip & Sprinkler', 'Water Conservation', 'Schedule Optimization'],
            'brands': ['Rain Bird', 'Hunter', 'Toro', 'Control4', 'Rachio'],
            'tags': ['Irrigation', 'Outdoor', 'Water Conservation'],
            'seo_title': 'Smart Irrigation Dubai | Automated Garden Watering UAE',
            'seo_description': 'Smart irrigation systems for Dubai gardens. Weather-based, soil sensors, zone control. Save 30-50% water. Professional installation.',
            'seo_keywords': ['smart irrigation Dubai', 'automated watering UAE', 'garden irrigation', 'water conservation', 'sprinkler system'],
            'price_range': 'AED 15,000 - 70,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'pool-spa-automation',
            'title': 'Pool & Spa Automation',
            'subtitle': 'Smart Control for Your Pool',
            'category': 'Outdoor',
            'description': 'Automated pool heating, filtration, lighting, and chemical management. Maintain perfect pool conditions effortlessly.',
            'long_description': 'Dubai pool owners love LEXA\'s automation systems. Control pool/spa heating, filtration pumps, underwater lighting, and water features from smartphones. Automated schedules ensure optimal water temperature and circulation. Chemical monitoring systems alert when pH or chlorine needs adjustment. LED color-changing lights create ambiance for evening swimming. Integration with smart home enables "Pool Party" scenes. Energy management reduces pump operation costs. Essential for villas with pools in Palm Jumeirah, Emirates Hills, and Arabian Ranches.',
            'image': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200',
            'features': ['Temperature Control', 'Pump Automation', 'LED Pool Lighting', 'Chemical Monitoring', 'Water Feature Control', 'Energy Management', 'Mobile App Control', 'Scene Integration'],
            'brands': ['Pentair', 'Hayward', 'Jandy', 'Control4'],
            'tags': ['Pool', 'Outdoor', 'Automation'],
            'seo_title': 'Pool Automation Dubai | Smart Pool Control Systems UAE',
            'seo_description': 'Smart pool automation for Dubai villas. Control heating, filtration, lighting, chemicals via app. Energy efficient. Professional installation.',
            'seo_keywords': ['pool automation Dubai', 'smart pool control UAE', 'pool heating system', 'automated pool', 'spa control'],
            'price_range': 'AED 25,000 - 100,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'energy-management',
            'title': 'Energy Management Systems',
            'subtitle': 'Monitor & Reduce Energy Consumption',
            'category': 'Efficiency',
            'description': 'Track and optimize your home\'s energy usage. Reduce DEWA bills through intelligent monitoring and automation.',
            'long_description': 'LEXA energy management systems provide visibility into Dubai home electricity consumption. Real-time monitoring shows usage by circuit—identify energy hogs like AC, pool pumps, or appliances. Automated rules reduce waste: dim lights when rooms empty, adjust AC based on occupancy, schedule pool pumps for off-peak hours. Historical data reveals patterns and savings opportunities. Integration with smart home enables energy-saving scenes. Typical DEWA bill reductions: 25-40%. ROI in 2-3 years for large villas.',
            'image': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200',
            'features': ['Real-Time Monitoring', 'Circuit-Level Tracking', 'Energy Reports', 'Automated Optimization', 'Usage Alerts', 'Peak Demand Management', 'Solar Integration', 'DEWA Bill Analysis'],
            'brands': ['Sense', 'Emporia', 'Control4', 'Crestron'],
            'tags': ['Energy', 'Efficiency', 'Sustainability'],
            'seo_title': 'Energy Management Dubai | Home Energy Monitoring UAE',
            'seo_description': 'Energy management systems for Dubai homes. Monitor DEWA usage, reduce bills by 25-40%. Smart optimization. Professional installation.',
            'seo_keywords': ['energy management Dubai', 'DEWA bill reduction', 'energy monitoring UAE', 'home energy system', 'smart energy'],
            'price_range': 'AED 10,000 - 50,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'smart-home-automation',
            'title': 'Complete Smart Home Automation',
            'subtitle': 'Integrated Control of Everything',
            'category': 'Smart Living',
            'description': 'Comprehensive smart home integration. Control lighting, climate, security, entertainment, and more from a single platform.',
            'long_description': 'LEXA complete smart home automation integrates every system in your Dubai villa or apartment. Control4 or Crestron platforms unify lighting, climate, security, audio/video, blinds, and more into seamless experiences. One touch activates entire scenes: "Good Morning" opens blinds, adjusts temperature, starts coffee. "Away Mode" secures everything. Voice control, smartphone apps, or elegant wall keypads provide intuitive access. Perfect for new construction or retrofit projects across Emirates Hills, Palm Jumeirah, Downtown, and beyond.',
            'image': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
            'features': ['Unified Control Platform', 'Whole-Home Integration', 'Custom Scenes', 'Voice Control', 'Remote Access', 'Energy Optimization', 'Security Integration', 'Scalable System'],
            'brands': ['Control4', 'Crestron', 'Savant', 'Lutron', 'Sonos'],
            'tags': ['Smart Home', 'Automation', 'Integration'],
            'featured': True,
            'seo_title': 'Smart Home Automation Dubai | Complete Home Control UAE',
            'seo_description': 'Complete smart home automation in Dubai. Control4, Crestron. Integrate lighting, climate, security, AV. Professional installation.',
            'seo_keywords': ['smart home Dubai', 'home automation UAE', 'Control4 Dubai', 'Crestron', 'smart villa'],
            'price_range': 'AED 100,000 - 800,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        }
    ]
    
    for solution in solutions_batch4:
        try:
            await db.solutions.insert_one(solution)
            print(f"✓ Created: {solution['slug']}")
        except Exception as e:
            print(f"✗ Error: {solution['slug']}: {e}")
    
    print(f"\n✅ Batch 4 complete: {len(solutions_batch4)} solutions")
    print(f"\n🎉 ALL 20 homeowner solutions created successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_remaining_solutions())

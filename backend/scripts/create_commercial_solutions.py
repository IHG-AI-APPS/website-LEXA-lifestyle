"""
Create missing commercial, developer, and architect solutions
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from uuid import uuid4

load_dotenv()

async def create_solutions():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME', 'smart_home_db')]
    
    solutions = [
        {
            'id': str(uuid4()),
            'slug': 'bms-automation',
            'title': 'Building Management Systems (BMS)',
            'subtitle': 'Centralized Control for Commercial Buildings',
            'category': 'Commercial',
            'description': 'Intelligent building management systems for offices, hotels, and commercial properties. Centralized control of HVAC, lighting, energy, and security systems.',
            'long_description': 'LEXA integrates advanced BMS platforms for Dubai commercial buildings—from DIFC office towers to Palm Jumeirah hotels. Centralized dashboards provide real-time visibility into HVAC, lighting, energy consumption, security, and fire safety. Automated rules optimize operations based on occupancy, time of day, and weather conditions. Integration with existing MEP systems ensures compatibility. Remote monitoring and control enable facility teams to manage multiple properties from anywhere. Reduces operational costs by 25-35% while improving tenant comfort and building performance.',
            'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
            'features': ['Centralized Control Dashboard', 'HVAC Automation', 'Lighting Management', 'Energy Monitoring', 'Fire & Safety Integration', 'Access Control Integration', 'Predictive Maintenance', 'Remote Management'],
            'brands': ['Schneider Electric', 'Siemens', 'Johnson Controls', 'Honeywell', 'Crestron'],
            'tags': ['BMS', 'Building Management', 'Commercial', 'Automation'],
            'seo_title': 'Building Management Systems Dubai | BMS Integration UAE',
            'seo_description': 'Professional BMS solutions for Dubai commercial buildings. HVAC, lighting, energy control. Reduce costs 25-35%. Schneider, Siemens integration.',
            'seo_keywords': ['BMS Dubai', 'building management system UAE', 'building automation', 'HVAC control Dubai', 'commercial automation'],
            'price_range': 'AED 150,000 - 1,000,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'conference-room-av-systems',
            'title': 'Conference Room AV Systems',
            'subtitle': 'Professional Meeting & Collaboration',
            'category': 'Commercial',
            'description': 'Complete audio-visual solutions for meeting rooms. Wireless presentation, video conferencing, room scheduling, and automated control.',
            'long_description': 'Transform Dubai corporate meeting spaces with LEXA conference room AV systems. One-touch control activates displays, video conferencing (Zoom, Teams), wireless presentation, and lighting. 4K displays, ceiling microphone arrays, and premium speakers deliver clear communication. Room scheduling panels outside doors show availability and meeting details. Cable-free tables via wireless HDMI keep spaces clean. Integration with calendaring systems automates room setup. Perfect for offices in DIFC, Business Bay, and Dubai Silicon Oasis. From small huddle rooms to 50-person boardrooms.',
            'image': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200',
            'features': ['Wireless Presentation', 'Video Conferencing', 'One-Touch Control', 'Room Scheduling Panels', 'Premium Audio/Video', 'Cable Management', 'Calendar Integration', 'Remote Support'],
            'brands': ['Crestron', 'Extron', 'Zoom Rooms', 'Microsoft Teams', 'Barco'],
            'tags': ['Conference Room', 'AV Systems', 'Video Conferencing', 'Commercial'],
            'seo_title': 'Conference Room AV Dubai | Meeting Room Technology UAE',
            'seo_description': 'Professional conference room AV systems for Dubai offices. Zoom, Teams integration, wireless presentation. One-touch control. Free consultation.',
            'seo_keywords': ['conference room AV Dubai', 'meeting room technology UAE', 'video conferencing Dubai', 'boardroom AV', 'Crestron Dubai'],
            'price_range': 'AED 30,000 - 200,000 per room',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'workplace-analytics',
            'title': 'Workplace Analytics & Occupancy',
            'subtitle': 'Data-Driven Space Optimization',
            'category': 'Commercial',
            'description': 'IoT sensors and analytics platforms track space utilization, occupancy patterns, and desk booking. Optimize your office layout based on real data.',
            'long_description': 'LEXA workplace analytics systems help Dubai companies optimize office space in the hybrid work era. Occupancy sensors, desk booking systems, and environmental monitoring provide real-time data on how spaces are actually used. Analytics dashboards reveal peak hours, underutilized areas, and meeting room efficiency. Make data-driven decisions: reduce real estate costs, improve desk allocation, right-size office space. Popular with tech companies in Dubai Silicon Oasis and financial firms in DIFC adapting to flexible work models. Integrate with hot-desking platforms and building access control.',
            'image': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
            'features': ['Occupancy Sensors', 'Desk Utilization Tracking', 'Meeting Room Analytics', 'Environmental Monitoring', 'Real-Time Dashboards', 'Historical Reporting', 'Hot Desk Integration', 'Space Planning Tools'],
            'brands': ['Density', 'VergeSense', 'Teem', 'Robin', 'PointGrab'],
            'tags': ['Workplace Analytics', 'Occupancy', 'Space Optimization', 'Commercial'],
            'seo_title': 'Workplace Analytics Dubai | Office Occupancy Tracking UAE',
            'seo_description': 'Office occupancy analytics for Dubai companies. Track space utilization, optimize layouts, reduce costs. Data-driven workspace management.',
            'seo_keywords': ['workplace analytics Dubai', 'office occupancy tracking', 'space utilization UAE', 'hot desking Dubai', 'office optimization'],
            'price_range': 'AED 50,000 - 250,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'grms-hospitality',
            'title': 'Guest Room Management (GRMS)',
            'subtitle': 'Hotel Room Automation & Control',
            'category': 'Hospitality',
            'description': 'Complete hotel room automation: climate, lighting, curtains, door locks, and entertainment. Enhance guest experience while reducing energy costs.',
            'long_description': 'LEXA GRMS solutions transform Dubai hotel rooms into intelligent, responsive environments. Guests control lighting, climate, curtains, and entertainment via bedside tablets or smartphones. Energy-saving mode activates when rooms are vacant—cutting HVAC costs by 30-40%. Integration with property management systems (PMS) automates check-in/check-out processes. Door locks, mini-bar sensors, and DND/MUR indicators enhance operations. Perfect for luxury hotels on Palm Jumeirah, business hotels in DIFC, and boutique properties in Downtown. Systems scale from 20-room boutique hotels to 500+ room resorts.',
            'image': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
            'features': ['Bedside Tablet Control', 'Climate Automation', 'Curtain/Blind Control', 'Smart Door Locks', 'PMS Integration', 'Energy Management', 'Do Not Disturb/Make Up Room', 'Entertainment Systems'],
            'brands': ['Crestron', 'Control4 Hospitality', 'Inncom', 'Honeywell', 'Salto'],
            'tags': ['GRMS', 'Hospitality', 'Hotel Automation', 'Guest Experience'],
            'seo_title': 'Hotel Room Automation Dubai | GRMS Systems UAE',
            'seo_description': 'Guest Room Management Systems for Dubai hotels. Automation, energy savings, enhanced guest experience. Crestron, Control4 integration.',
            'seo_keywords': ['hotel automation Dubai', 'GRMS UAE', 'guest room management', 'hotel technology Dubai', 'hospitality automation'],
            'price_range': 'AED 15,000 - 40,000 per room',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'commercial-collaboration-spaces',
            'title': 'Commercial Collaboration Spaces',
            'subtitle': 'Public Area AV & Digital Signage',
            'category': 'Commercial',
            'description': 'Audio-visual systems for lobbies, lounges, and public areas. Digital signage, background music, and interactive displays for commercial spaces.',
            'long_description': 'LEXA designs AV systems for commercial public spaces across Dubai—hotel lobbies, office reception areas, retail stores, and restaurant dining rooms. Digital signage displays dynamic content: promotions, wayfinding, news, weather. Distributed audio creates ambiance with background music and announcements. Video walls make impactful statements in corporate lobbies. Touch-screen kiosks provide information and wayfinding. Centralized content management allows real-time updates across multiple locations. Integration with building systems enables automated scenes for different times of day. From Business Bay office lobbies to Dubai Mall retail spaces.',
            'image': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
            'features': ['Digital Signage', 'Video Walls', 'Distributed Audio', 'Interactive Kiosks', 'Content Management', 'Wayfinding Displays', 'Background Music', 'Multi-Location Control'],
            'brands': ['Samsung', 'LG', 'BrightSign', 'Sonos', 'QSC'],
            'tags': ['Digital Signage', 'Public Spaces', 'Commercial AV', 'Lobbies'],
            'seo_title': 'Digital Signage Dubai | Commercial AV for Public Spaces UAE',
            'seo_description': 'Digital signage & AV for Dubai commercial spaces. Lobbies, retail, hotels. Content management, video walls, distributed audio.',
            'seo_keywords': ['digital signage Dubai', 'commercial AV UAE', 'video wall Dubai', 'lobby AV', 'retail audio visual'],
            'price_range': 'AED 50,000 - 500,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'ai-camera-staff-analytics',
            'title': 'AI Camera & Staff Analytics',
            'subtitle': 'Intelligent Video Analytics for Business',
            'category': 'Commercial',
            'description': 'AI-powered cameras analyze customer behavior, staff performance, and operational efficiency. Insights for retail, restaurants, and hospitality.',
            'long_description': 'LEXA AI camera analytics transform security cameras into business intelligence tools for Dubai retailers, restaurants, and hotels. Computer vision algorithms count customers, track dwell times, analyze traffic patterns, and monitor queue lengths. Staff performance analytics ensure service standards. Heat maps reveal popular areas and underutilized spaces. Age and gender demographics inform marketing. Integration with POS systems correlates foot traffic with sales. Privacy-compliant analytics do not store faces—only aggregate data. Popular with Dubai Mall retailers, Dubai Marina restaurants, and hospitality venues optimizing operations and guest experience.',
            'image': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200',
            'features': ['Customer Counting', 'Dwell Time Analysis', 'Heat Maps', 'Queue Management', 'Staff Performance', 'Demographics Analysis', 'POS Integration', 'Privacy Compliant'],
            'brands': ['Hikvision', 'Axis', 'Cisco Meraki', 'Verkada', 'OpenEye'],
            'tags': ['AI Analytics', 'Video Analytics', 'Retail', 'Business Intelligence'],
            'seo_title': 'AI Camera Analytics Dubai | Retail Video Intelligence UAE',
            'seo_description': 'AI-powered camera analytics for Dubai businesses. Customer insights, staff monitoring, operational efficiency. Retail, restaurant, hotel solutions.',
            'seo_keywords': ['AI camera analytics Dubai', 'video analytics UAE', 'retail intelligence', 'customer counting Dubai', 'business analytics'],
            'price_range': 'AED 30,000 - 200,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'auditoriums',
            'title': 'Auditorium AV Systems',
            'subtitle': 'Large Venue Audio & Video',
            'category': 'Commercial',
            'description': 'Professional audio-visual systems for auditoriums, theaters, and large meeting spaces. Sound reinforcement, projection, lighting, and control.',
            'long_description': 'LEXA designs auditorium AV systems for Dubai schools, universities, corporate training centers, and cultural venues. Line array speakers and acoustic treatment ensure speech intelligibility and musical clarity for 100-1000+ seats. High-lumen laser projectors or LED video walls deliver sharp visuals. Theatrical lighting creates ambiance and highlights speakers. Wireless microphones, confidence monitors, and recording systems support presentations and performances. Dante audio networking provides flexibility. Control systems unify operation. From Dubai schools to DWTC conference halls, we deliver professional-grade solutions.',
            'image': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
            'features': ['Line Array Audio', 'High-Lumen Projection', 'Theatrical Lighting', 'Wireless Microphones', 'Recording Systems', 'Dante Audio Network', 'Control Systems', 'Acoustic Treatment'],
            'brands': ['JBL Professional', 'QSC', 'Shure', 'Barco', 'ETC'],
            'tags': ['Auditorium', 'Large Venue', 'Professional AV', 'Theaters'],
            'seo_title': 'Auditorium AV Systems Dubai | Theater Sound & Video UAE',
            'seo_description': 'Professional auditorium AV for Dubai venues. Large venue audio, projection, lighting, control. Schools, corporate, cultural spaces.',
            'seo_keywords': ['auditorium AV Dubai', 'theater systems UAE', 'large venue audio', 'conference hall AV', 'professional sound Dubai'],
            'price_range': 'AED 200,000 - 2,000,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'smart-parking',
            'title': 'Smart Parking Systems',
            'subtitle': 'Automated Parking Management',
            'category': 'Commercial',
            'description': 'Intelligent parking solutions with license plate recognition, guidance systems, and automated payment. Optimize parking for offices, hotels, and retail.',
            'long_description': 'LEXA smart parking systems streamline vehicle management for Dubai commercial properties. License plate recognition (LPR) cameras grant automatic access to registered vehicles. Parking guidance sensors direct drivers to available spaces—reducing search time and congestion. Mobile apps enable pre-booking and contactless payment. Integration with building access control provides visitor management. Analytics track occupancy, peak times, and revenue. Electric vehicle charging integration prepares for the future. Perfect for DIFC office towers, Dubai Mall-area retail, and Palm Jumeirah hotel parking. Improves user experience while maximizing parking efficiency.',
            'image': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200',
            'features': ['License Plate Recognition', 'Parking Guidance Sensors', 'Mobile App Booking', 'Contactless Payment', 'EV Charging Integration', 'Occupancy Analytics', 'Visitor Management', 'Revenue Tracking'],
            'brands': ['Skidata', 'Amano', 'T2 Systems', 'ParkWhiz', 'TIBA'],
            'tags': ['Smart Parking', 'Parking Management', 'LPR', 'Commercial'],
            'seo_title': 'Smart Parking Systems Dubai | Automated Parking Management UAE',
            'seo_description': 'Smart parking solutions for Dubai commercial buildings. LPR, guidance systems, mobile payment. Optimize parking operations. Professional installation.',
            'seo_keywords': ['smart parking Dubai', 'parking management UAE', 'license plate recognition Dubai', 'automated parking', 'parking guidance'],
            'price_range': 'AED 100,000 - 800,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'cultural-automation/masjid-automation',
            'title': 'Masjid Automation Systems',
            'subtitle': 'Technology for Places of Worship',
            'category': 'Cultural',
            'description': 'Specialized automation for mosques: prayer time displays, sound systems, lighting control, and climate management. Respectful technology integration.',
            'long_description': 'LEXA provides respectful technology integration for Dubai and UAE mosques. Automated systems aligned with Islamic principles enhance worship experiences. Prayer time displays show accurate Adhan times with automatic audio alerts. Professional sound systems ensure clear recitation throughout prayer halls. Automated lighting creates appropriate ambiance for different prayer times. Climate control maintains comfort during congregational prayers. Wudu area monitoring and energy management reduce operational costs. Integration with Islamic calendar for Ramadan, Eid, and special occasions. From community mosques to grand masjids, we honor tradition while embracing beneficial technology.',
            'image': 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200',
            'features': ['Prayer Time Automation', 'Adhan Sound System', 'Lighting Scenes', 'Climate Control', 'Digital Displays', 'Wudu Monitoring', 'Energy Management', 'Calendar Integration'],
            'brands': ['TOA', 'JBL Commercial', 'Crestron', 'Lutron', 'Philips'],
            'tags': ['Masjid', 'Mosque', 'Cultural', 'Religious Automation'],
            'seo_title': 'Masjid Automation Dubai | Mosque Technology Systems UAE',
            'seo_description': 'Respectful automation for Dubai mosques. Prayer time displays, sound systems, lighting, climate control. Islamic-compliant technology integration.',
            'seo_keywords': ['masjid automation Dubai', 'mosque technology UAE', 'prayer time system', 'Islamic automation', 'mosque sound system'],
            'price_range': 'AED 50,000 - 500,000',
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc)
        },
        {
            'id': str(uuid4()),
            'slug': 'cultural-automation/majlis-automation',
            'title': 'Majlis Automation Systems',
            'subtitle': 'Technology for Traditional Gathering Spaces',
            'category': 'Cultural',
            'description': 'Elegant automation for traditional Arabic majlis spaces. Lighting, climate, audio/video, and service call systems integrated seamlessly.',
            'long_description': 'LEXA designs automation systems that honor the cultural significance of majlis spaces in Emirati homes and palaces. Elegant control panels or smartphone apps manage lighting scenes for different occasions—welcoming guests, formal gatherings, or intimate family time. Climate control ensures comfort for extended gatherings. Concealed audio systems provide music or Quran recitation without visible speakers. Large-format displays for presentations remain hidden when not in use. Service call buttons discreetly summon staff. Custom carpet sensors and motorized partitions adapt spaces. From Emirates Palace to private villas in Al Barsha, we blend tradition with technology.',
            'image': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
            'features': ['Elegant Control Panels', 'Lighting Scenes', 'Climate Management', 'Concealed Audio', 'Hidden Displays', 'Service Call Systems', 'Motorized Partitions', 'Cultural Sensitivity'],
            'brands': ['Control4', 'Crestron', 'Lutron', 'Bose', 'Bang & Olufsen'],
            'tags': ['Majlis', 'Cultural', 'Traditional', 'Arabic Design'],
            'seo_title': 'Majlis Automation Dubai | Traditional Space Technology UAE',
            'seo_description': 'Elegant automation for Dubai majlis spaces. Respectful technology integration for traditional Arabic gathering rooms. Lighting, audio, climate control.',
            'seo_keywords': ['majlis automation Dubai', 'traditional space technology', 'Arabic majlis UAE', 'cultural automation', 'Emirati home technology'],
            'price_range': 'AED 60,000 - 400,000',
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
    
    print(f"\n✅ Created {len(solutions)} commercial/architect/developer solutions!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_solutions())

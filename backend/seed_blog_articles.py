"""
Database seeding script for Blog Articles
Populates MongoDB with blog posts from lexalifestyle.com
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# ============= SEED DATA - BLOG ARTICLES =============

ARTICLES = [
    {
        "id": str(uuid.uuid4()),
        "slug": "lighting-scenes-transform-mood-daily-lifestyle",
        "title": "How Lighting Scenes Transform Mood and Daily Lifestyle",
        "category": "Smart Home",
        "excerpt": "Lighting scenes are pre-set lighting configurations that automatically adjust brightness, color temperature, and intensity to match specific activities or moods.",
        "content": """# How Lighting Scenes Transform Mood and Daily Lifestyle

Lighting scenes are pre-set lighting configurations that automatically adjust brightness, color temperature, and intensity to match specific activities or moods. They play a powerful role in shaping emotions, focus, relaxation, and overall daily comfort.

## What Are Lighting Scenes?

In smart homes and modern spaces, lighting scenes are no longer decorative—they are functional tools that enhance productivity, well-being, and comfort. Whether you're winding down after a long day, hosting a dinner party, or working from home, the right lighting scene can make all the difference.

## Impact on Mood and Daily Life

### Morning Wake-Up Scene
- Gradually increases brightness
- Uses warm white tones to mimic sunrise
- Helps regulate circadian rhythm
- Improves morning energy levels

### Focus and Productivity Scene
- Cool white, high-brightness lighting
- Reduces eye strain during work
- Enhances concentration
- Ideal for home offices and study areas

### Relaxation and Evening Scene
- Warm, dimmed lighting
- Promotes melatonin production
- Reduces stress and anxiety
- Perfect for winding down before bed

### Entertainment Scene
- Customized for movie watching
- Reduces glare on screens
- Creates theater-like ambiance
- Adjusts automatically when content starts

## Benefits for Dubai Homes

In Dubai's luxury properties, lighting scenes offer:
- Energy efficiency (30-40% reduction in consumption)
- Integration with smart home systems
- Voice and app control
- Automated scheduling based on time of day
- Preset scenes for different rooms and activities

## Implementation with Lexa Lifestyle

At Lexa Lifestyle, we design comprehensive lighting automation systems using:
- **KNX and DALI protocols** for professional control
- **Lutron** premium dimming systems
- **Qbus** integrated automation
- Custom scene programming
- Mobile app and voice control

Transform your daily routine with intelligent lighting scenes that adapt to your lifestyle.""",
        "image": "https://lexalifestyle.com/wp-content/uploads/2026/01/13.jpg",
        "author": "Lexa Lifestyle Team",
        "read_time": 5,
        "published_date": "2026-01-05",
        "tags": ["lighting", "smart home", "automation", "wellness", "Dubai"]
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "smart-home-installation-services-dubai",
        "title": "Smart Home Installation Services in Dubai, Abu Dhabi, Riyadh, Doha, and Kuwait",
        "category": "Installation",
        "excerpt": "Smart home technology is rapidly transforming how people live across the Middle East. From luxury villas in Dubai to modern residences in Riyadh and Doha, homeowners are increasingly investing in professional smart home installation services.",
        "content": """# Smart Home Installation Services in Dubai, Abu Dhabi, Riyadh, Doha, and Kuwait

Smart home technology is rapidly transforming how people live across the Middle East. From luxury villas in Dubai to modern residences in Riyadh and Doha, homeowners are increasingly investing in professional smart home installation services to enhance comfort, security, and energy efficiency.

## Why Professional Installation Matters

### Expertise and Reliability
Professional installers ensure all devices are configured correctly, integrated seamlessly, and optimized for performance. Unlike DIY setups, professional installation guarantees:
- Proper network infrastructure
- Device compatibility verification
- Security protocol implementation
- Future-proof system design

### System Integration
A true smart home isn't just individual devices—it's a unified ecosystem where:
- Lighting works with climate control
- Security integrates with access systems
- Entertainment syncs with automated shades
- Energy management optimizes all systems

## Services We Provide

### 1. Consultation and Design
- Site survey and assessment
- System architecture planning
- Equipment selection and specification
- Budget planning and phasing options

### 2. Installation and Integration
- Network infrastructure setup
- Device mounting and wiring
- System programming and configuration
- Integration testing

### 3. Commissioning and Training
- Complete system testing
- User training for all family members
- Documentation and manuals
- Handover and support

## Popular Smart Home Solutions

### Dubai and Abu Dhabi
- Luxury villa automation
- Penthouse smart systems
- Multi-story residential buildings
- Premium hotel and hospitality automation

### Riyadh and GCC
- Large family compounds
- Modern villas with traditional architecture
- Climate-optimized solutions
- Cultural considerations in design

## Technologies We Use

- **Lighting**: KNX, DALI, Lutron, Qbus
- **Audio/Video**: Sonos, Bowers & Wilkins, Sony, Epson
- **Security**: IP cameras, biometric access, smart locks
- **Networking**: WiFi 6E, enterprise-grade infrastructure
- **Integration**: Savant, Control4, custom solutions

## Why Choose Lexa Lifestyle?

With over 20 years of experience across the Middle East:
- Certified installers and engineers
- 1000+ successful installations
- 32+ premium brand partnerships
- 24/7 support and maintenance
- Experience centers in Dubai

Contact us for a free consultation and discover how professional smart home installation can transform your living experience.""",
        "image": "https://lexalifestyle.com/wp-content/uploads/2025/12/14.jpg",
        "author": "Lexa Lifestyle Team",
        "read_time": 7,
        "published_date": "2025-12-31",
        "tags": ["installation", "smart home", "Dubai", "UAE", "GCC", "services"]
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "how-multi-room-audio-works",
        "title": "How Multi-Room Audio Works and Why Modern Homes Need It",
        "category": "Audio Systems",
        "excerpt": "Multi-room audio is a smart sound system that allows you to play music or audio across multiple rooms from a single, centralized platform.",
        "content": """# How Multi-Room Audio Works and Why Modern Homes Need It

Multi-room audio is a smart sound system that allows you to play music or audio across multiple rooms from a single, centralized platform. Each room can play the same audio or different content, all controlled easily from a mobile app, touch panel, or voice assistant.

## How It Works

### Centralized System Architecture
Multi-room audio systems consist of:
1. **Central Hub/Amplifier**: Routes audio to different zones
2. **Network Infrastructure**: WiFi or wired connections
3. **Speakers**: In-ceiling, in-wall, or architectural speakers
4. **Control Interface**: Mobile apps, tablets, or wall panels

### Distribution Methods

**Wireless Systems (Sonos, HEOS)**
- WiFi-based distribution
- Easy installation
- Flexible placement
- App-based control

**Wired Systems (Professional Integration)**
- Cat6 or speaker wire distribution
- Higher audio quality
- More reliable performance
- Ideal for new constructions

## Benefits for Modern Homes

### 1. Whole-Home Entertainment
- Play music throughout the house
- Synchronize audio for parties
- Different content in each room
- Seamless transitions as you move

### 2. Convenience and Control
- Control from anywhere via smartphone
- Voice control integration (Alexa, Google, Siri)
- Automated playlists and scheduling
- Preset scenes for different occasions

### 3. Property Value Enhancement
- Increases home resale value
- Premium feature for luxury properties
- Modern appeal for buyers
- Professional installation quality

### 4. Versatility
- Stream from any source (Spotify, Apple Music, Tidal)
- Connect to TV audio
- Integrate with home theater
- Radio and podcast support

## Popular Solutions

### Sonos
- User-friendly ecosystem
- Wide range of speakers
- Regular software updates
- Easy expansion

### Professional Integration (Russound, Bowers & Wilkins)
- Audiophile-grade quality
- Custom integration
- Architectural speakers
- Centralized control

### Smart Home Integration
- Works with Savant, Control4, Crestron
- Automated scenes
- Integration with lighting and shades
- Energy-efficient operation

## Design Considerations

### Room-by-Room Planning
- **Living Areas**: Powerful floor-standing or in-ceiling speakers
- **Bedrooms**: Discrete in-ceiling speakers
- **Bathrooms**: Moisture-resistant options
- **Outdoor Spaces**: Weather-resistant speakers
- **Home Cinema**: Dedicated theater system

### Network Requirements
- Strong WiFi coverage
- Dedicated network bandwidth
- Quality of Service (QoS) settings
- Wired connections for critical zones

## Why Dubai Homes Love Multi-Room Audio

In Dubai's luxury properties, multi-room audio offers:
- Entertainment for large villas
- Poolside and outdoor audio zones
- Integration with smart home systems
- Support for multiple languages
- Perfect for hosting and entertaining

## Installation by Lexa Lifestyle

Our professional installation includes:
- Complete system design
- Acoustic assessment
- Speaker placement optimization
- Network infrastructure setup
- Programming and calibration
- User training and support

Transform your home into an entertainment paradise with professional multi-room audio installation.""",
        "image": "https://lexalifestyle.com/wp-content/uploads/2025/12/Multi-Room-Audio.jpg",
        "author": "Lexa Lifestyle Team",
        "read_time": 6,
        "published_date": "2025-12-26",
        "tags": ["audio", "multi-room", "Sonos", "entertainment", "smart home"]
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "luxury-smart-automation-systems-dubai",
        "title": "Why Dubai Homeowners Are Switching to Luxury Smart Automation Systems",
        "category": "Automation",
        "excerpt": "Dubai's property market is rapidly evolving, and not just in terms of breathtaking architecture and premium finishes. More homeowners are turning to luxury smart automation systems to elevate their living experience.",
        "content": """# Why Dubai Homeowners Are Switching to Luxury Smart Automation Systems

Dubai's property market is rapidly evolving, and not just in terms of breathtaking architecture and premium finishes. More homeowners are turning to luxury smart automation systems to elevate their living experience. In a city that values innovation, comfort, and efficiency, these systems are becoming standard features in modern villas, apartments, and penthouses.

## The Dubai Smart Home Revolution

### Market Trends
- 65% of luxury properties now include smart features
- Property values increase 5-15% with automation
- Growing demand from international buyers
- Government smart city initiatives

### Why Now?
Dubai's unique position as a technology hub, combined with:
- High disposable incomes
- Tech-savvy population
- Extreme climate requiring efficient cooling
- Security and privacy concerns
- Luxury lifestyle expectations

## Key Benefits for Dubai Homeowners

### 1. Ultimate Convenience
**Single-Touch Control**: One app controls:
- Lighting in all rooms
- Climate and AC zones
- Security cameras
- Entertainment systems
- Window shades
- Pool and outdoor lighting

**Voice Control**: Integration with:
- Amazon Alexa
- Google Assistant
- Apple Siri
- Custom voice commands

### 2. Energy Efficiency
In Dubai's climate, smart automation delivers:
- **30-40% reduction** in energy costs
- Automated AC scheduling
- Smart thermostats with occupancy detection
- Daylight-linked lighting control
- Solar integration and monitoring
- Real-time energy consumption tracking

### 3. Enhanced Security
- 24/7 surveillance monitoring
- Biometric access control
- Automated security scenes
- Remote monitoring from anywhere
- Integration with Dubai Police systems
- Instant mobile alerts

### 4. Lifestyle and Wellness
- Circadian lighting for better sleep
- Automated morning routines
- Entertainment scenes
- Mood-based lighting
- Air quality monitoring
- Water leak detection

## Popular Automation Features

### Climate Control
Dubai's heat makes smart AC essential:
- Zone-based temperature control
- Pre-cooling before arrival
- Energy-saving when away
- Integration with weather forecasts

### Lighting Automation
- Daylight harvesting
- Automated sunset schedules
- Party and entertainment modes
- Security lighting when away
- Energy-efficient LED systems

### Entertainment Integration
- One-touch cinema mode
- Multi-room audio distribution
- Automated screen and projector control
- Integrated streaming services

### Security and Privacy
- Face recognition door access
- Automated gate control
- Visitor management
- Privacy modes for bedrooms
- Automated blinds and curtains

## Technologies We Use

### Premium Platforms
- **Savant**: Apple-inspired luxury control
- **KNX**: European precision engineering
- **Qbus**: Scalable automation
- **Custom Integration**: Tailored solutions

### Brand Partnerships
- Lutron (lighting)
- Sonos (audio)
- Sony/Epson (video)
- Qolsys (security)

## ROI for Dubai Properties

### Immediate Benefits
- Reduced utility bills (AED 5,000-15,000/year)
- Enhanced comfort and convenience
- Improved security

### Long-Term Value
- Increased property value (5-15%)
- Faster sales and higher rentals
- Future-proof technology
- Reduced maintenance costs

## Why Choose Lexa Lifestyle?

As Dubai's leading smart home integrator:
- **20+ years experience** in UAE
- **1000+ installations** across GCC
- **Certified engineers** and technicians
- **24/7 support** and maintenance
- **Experience center** in Al Quoz for live demos
- Partnerships with **32 premium brands**

## Case Studies

### Palm Jumeirah Villa
- 8-bedroom fully automated villa
- 40% energy reduction
- Enhanced security with facial recognition
- ROI in 3 years through energy savings

### Downtown Dubai Penthouse
- Integrated AV and lighting
- Voice control throughout
- Automated entertaining scenes
- Property value increased 12%

Transform your Dubai property with luxury smart automation. Contact Lexa Lifestyle for a consultation and experience center tour.""",
        "image": "https://lexalifestyle.com/wp-content/uploads/2025/12/Why-Dubai-Homeowners-Are-Switching-to-Luxury-Smart-Automation-Systems.jpg",
        "author": "Lexa Lifestyle Team",
        "read_time": 8,
        "published_date": "2025-12-21",
        "tags": ["automation", "luxury", "Dubai", "smart home", "property value"]
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "premium-automation-audio-systems",
        "title": "What Are Premium Automation Audio Systems? A Complete Beginner's Guide",
        "category": "Audio Systems",
        "excerpt": "Premium automation audio systems are advanced sound solutions that combine high-end audio quality with smart home automation.",
        "content": """# What Are Premium Automation Audio Systems? A Complete Beginner's Guide

Premium automation audio systems are advanced sound solutions that combine high-end audio quality with smart home automation. They allow users to control music, volume, zones, and sources seamlessly across an entire home or commercial space using apps, voice commands, or centralized control systems.

## What Makes It "Premium"?

### Audio Quality
- High-fidelity sound reproduction
- Distortion-free amplification
- Audiophile-grade components
- Professional calibration
- Acoustic optimization

### Automation Integration
- Smart home platform connectivity
- Automated scenes and triggers
- Voice control capability
- App-based management
- Scheduling and routines

## Components of a Premium System

### 1. Source Equipment
- **Network Music Players**: Sonos, HEOS, BluOS
- **Streaming Services**: Spotify, Tidal, Apple Music
- **NAS/Media Servers**: Local music library
- **CD Transports**: For physical media
- **Turntables**: Vinyl integration

### 2. Amplification
- **Integrated Amplifiers**: Marantz, Anthem
- **Power Amplifiers**: High-wattage distribution
- **Zone Amplifiers**: Multi-room control
- **Class D Efficiency**: Energy-efficient power

### 3. Speakers
- **Architectural**: In-ceiling, in-wall (KEF, B&W)
- **Floor-Standing**: Premium listening rooms
- **Bookshelf**: Compact spaces
- **Outdoor**: Weather-resistant zones
- **Subwoofers**: Deep bass extension

### 4. Control Systems
- **Mobile Apps**: iOS and Android control
- **Wall Panels**: Touch screen interfaces
- **Voice Control**: Alexa, Google, Siri
- **Remote Controls**: Dedicated devices

## How It Works

### Network Architecture
```
Internet → Router → Switch → Audio Devices
                          ↓
                    Control System
                          ↓
              Speakers in Each Zone
```

### Zone Control
- **Kitchen**: Background music while cooking
- **Living Room**: High-fidelity listening
- **Bedroom**: Gentle wake-up music
- **Bathroom**: Morning playlist
- **Outdoor**: Pool party mode

### Automation Scenarios

**Morning Routine**:
- 7:00 AM: Bedroom speakers play news radio
- Gradual volume increase
- Switches to kitchen at 7:30 AM
- Follows you through the home

**Entertainment Mode**:
- One button activates
- Living room audio system
- Lights dim automatically
- TV audio routes to speakers
- Perfect movie experience

## Benefits for Modern Homes

### Convenience
- Control from anywhere
- Voice commands
- Automated scheduling
- Follow-me audio

### Quality
- Crystal-clear sound
- Professional calibration
- Acoustic treatment
- Premium components

### Value
- Increases property value
- Energy-efficient
- Scalable system
- Future-proof technology

## Popular Brands and Systems

### Wireless Ecosystems
**Sonos**
- Easiest to use
- Wide speaker range
- Regular updates
- Great for beginners

**HEOS by Denon**
- High-quality audio
- Wide compatibility
- Professional integration
- Advanced features

### Professional Integration
**Bowers & Wilkins**
- Audiophile quality
- Architectural speakers
- Custom installation
- Premium finish

**KEF**
- Uni-Q technology
- Modern design
- Excellent imaging
- Wide range

### Control Platforms
- **Savant**: Luxury automation
- **Control4**: Professional integration
- **Crestron**: Enterprise-grade
- **Custom**: Tailored solutions

## Installation Considerations

### Planning Phase
1. Room-by-room audio needs
2. Speaker placement design
3. Network infrastructure
4. Control interface selection
5. Budget allocation

### Professional Installation
- Acoustic assessment
- Wire routing and concealment
- Network optimization
- Speaker calibration
- System programming
- User training

### Dubai-Specific Factors
- Climate considerations
- Network reliability
- Power quality
- Acoustic treatment for marble/glass
- Multi-language support

## Costs and Investment

### Budget Ranges
- **Entry Premium**: AED 50,000-100,000 (3-4 zones)
- **Mid-Range**: AED 100,000-250,000 (whole villa)
- **High-End**: AED 250,000+ (luxury estates)

### What's Included
- Equipment and speakers
- Professional installation
- System programming
- Calibration and tuning
- Training and support
- Warranty coverage

## Maintenance and Support

### Regular Maintenance
- Software updates
- Network optimization
- Speaker cleaning
- System health checks
- Performance tuning

### Lexa Lifestyle Support
- 24/7 technical support
- Remote diagnostics
- On-site service
- Preventive maintenance
- System upgrades

Transform your space with premium automation audio systems. Experience the difference at our Dubai experience center.""",
        "image": "https://lexalifestyle.com/wp-content/uploads/2025/12/What-Are-Premium-Automation-Audio-Systems.jpg",
        "author": "Lexa Lifestyle Team",
        "read_time": 9,
        "published_date": "2025-12-16",
        "tags": ["audio systems", "automation", "premium", "guide", "beginner"]
    }
]

async def seed_database():
    """Seed the database with blog articles"""
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        print("🌱 Starting database seeding for Blog Articles...")
        
        # Clear existing articles (optional - remove this if you want to keep existing)
        # await db.articles.delete_many({})
        # print("✅ Cleared existing articles")
        
        # Insert articles
        if ARTICLES:
            # Check if articles already exist to avoid duplicates
            for article in ARTICLES:
                existing = await db.articles.find_one({"slug": article["slug"]})
                if not existing:
                    await db.articles.insert_one(article)
                    print(f"✅ Added article: {article['title']}")
                else:
                    print(f"⏭️ Skipped (already exists): {article['title']}")
            
            print("🎉 Article seeding completed!")
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())

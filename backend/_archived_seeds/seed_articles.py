"""
Add articles collection to MongoDB with sample content
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

ARTICLES = [
    {
        "id": "smart-home-benefits-2026",
        "slug": "smart-home-benefits-2026",
        "title": "10 Benefits of Smart Home Automation in 2026",
        "category": "Guides",
        "excerpt": "Discover how smart home automation can transform your living space with enhanced comfort, security, and energy efficiency.",
        "content": """Smart home automation has evolved significantly, offering homeowners unprecedented control over their living spaces. Here are the top 10 benefits:

1. **Energy Efficiency**: Smart thermostats and lighting systems can reduce energy consumption by up to 30%.

2. **Enhanced Security**: AI-powered cameras and smart locks provide 24/7 monitoring and instant alerts.

3. **Convenience**: Control your entire home from a single app or voice command.

4. **Increased Property Value**: Homes with smart automation systems sell for 5-10% more on average.

5. **Remote Monitoring**: Check on your home from anywhere in the world.

6. **Customizable Scenes**: Create perfect ambiance for any occasion with one tap.

7. **Predictive Maintenance**: Smart systems can alert you to potential issues before they become problems.

8. **Accessibility**: Voice control and automation make homes more accessible for elderly and disabled residents.

9. **Entertainment**: Seamless integration of audio-visual systems throughout your home.

10. **Future-Proof**: Regular software updates ensure your system stays current with latest technology.""",
        "image": "/images/premium/hero/hero-1.jpg",
        "author": "LEXA Team",
        "read_time": 8,
        "published_date": datetime.now(timezone.utc).isoformat(),
        "tags": ["Smart Home", "Automation", "Benefits", "Guide"]
    },
    {
        "id": "dolby-atmos-home-theater-guide",
        "slug": "dolby-atmos-home-theater-guide",
        "title": "The Ultimate Guide to Dolby Atmos Home Theater",
        "category": "Technology",
        "excerpt": "Everything you need to know about creating a cinematic Dolby Atmos experience in your home.",
        "content": """Dolby Atmos represents the pinnacle of home theater audio technology, offering a truly immersive three-dimensional sound experience.

## What is Dolby Atmos?

Dolby Atmos is an audio format that adds height channels to create a hemisphere of sound around the listener. Unlike traditional surround sound, Atmos treats sounds as individual objects that can be precisely placed and moved in three-dimensional space.

## Key Components

**Ceiling Speakers**: Essential for the overhead sound effects that make Atmos special. Typically requires 2-4 ceiling speakers.

**AV Receiver**: Must support Dolby Atmos decoding. Look for receivers with at least 7.2.4 channel support.

**Content Sources**: 4K Blu-ray players, streaming services like Netflix and Disney+, and gaming consoles all support Atmos.

## Room Considerations

- **Size**: Atmos works best in rooms between 200-400 square feet
- **Ceiling Height**: Ideal ceiling height is 8-12 feet
- **Acoustic Treatment**: Sound absorption panels improve clarity

## Setup Tips

1. Start with a 5.1.2 configuration (5 ear-level, 1 subwoofer, 2 height)
2. Calibrate using your receiver's automatic room correction
3. Invest in quality speakers - the system is only as good as its weakest link

## Cost Expectations

- Entry Level (5.1.2): AED 80,000 - 150,000
- Premium (7.2.4): AED 200,000 - 350,000  
- Reference (9.2.6): AED 500,000+

Contact LEXA for a personalized assessment of your space.""",
        "image": "/images/solutions/home-theater-1.jpg",
        "author": "Technical Team",
        "read_time": 12,
        "published_date": datetime.now(timezone.utc).isoformat(),
        "tags": ["Dolby Atmos", "Home Theater", "Audio", "Guide"]
    },
    {
        "id": "lutron-lighting-scenes",
        "slug": "lutron-lighting-scenes",
        "title": "Creating Perfect Lighting Scenes with Lutron",
        "category": "Tips & Tricks",
        "excerpt": "Master the art of lighting design with Lutron's intelligent control systems.",
        "content": """Lighting sets the mood for every moment in your home. With Lutron automation, you can create perfect scenes for any occasion.

## Understanding Lighting Scenes

A lighting scene is a preset combination of light levels across different fixtures. With one touch, you can transform your entire space.

## Popular Scene Ideas

**Good Morning**: Gradually increase lights to 70% brightness, simulating sunrise.

**Movie Time**: Dim all lights to 5%, perfect for home theater viewing.

**Dinner Party**: Set dining area to 60%, living room to 40%, create warm ambiance.

**Bedtime**: Reduce all lights to 20%, activate pathway lighting to bedroom.

**Away Mode**: Randomly vary lights to simulate occupancy when you're traveling.

## Advanced Features

**Circadian Rhythm**: Automatically adjust color temperature throughout the day to match natural sunlight patterns.

**Geofencing**: Scenes trigger automatically based on your phone's location.

**Integration**: Connect with Alexa, Google Home, or Apple HomeKit for voice control.

## Implementation Tips

- Start with 4-5 essential scenes
- Test different brightness levels at various times of day
- Consider seasonal adjustments
- Program subtle transitions between scenes

Ready to design your perfect lighting? Book a consultation with our lighting specialists.""",
        "image": "/images/solutions/smart-lighting-1.jpg",
        "author": "Design Team",
        "read_time": 6,
        "published_date": datetime.now(timezone.utc).isoformat(),
        "tags": ["Lutron", "Lighting", "Scenes", "Tips"]
    },
    {
        "id": "dubai-smart-home-trends-2026",
        "slug": "dubai-smart-home-trends-2026",
        "title": "Dubai Smart Home Trends for 2026",
        "category": "Trends",
        "excerpt": "Explore the latest smart home trends shaping luxury living in Dubai and the UAE.",
        "content": """Dubai continues to lead the region in smart home adoption. Here are the trends defining 2026:

## 1. AI-Powered Personalization

Homes are learning resident preferences and automatically adjusting settings without manual programming.

## 2. Matter Protocol Adoption

The new universal standard is making it easier to integrate devices from different manufacturers seamlessly.

## 3. Energy Independence

With rising energy costs, more homes are adding solar panels and battery storage, managed by smart systems.

## 4. Wellness Integration

Air quality monitoring, circadian lighting, and temperature optimization for better sleep and health.

## 5. Outdoor Living Automation

Pool automation, outdoor kitchens, and motorized pergolas are becoming standard in villa projects.

## 6. Voice-Free Control

Movement toward gesture control and predictive automation that requires zero interaction.

## 7. Premium Materials

Lutron invisible keypads, architectural speakers, and motorized shades with designer fabrics.

## 8. Integrated Security

Advanced facial recognition, AI threat detection, and integration with building management systems.

## Local Regulations

Dubai Municipality is increasingly requiring smart systems in new luxury developments, particularly for energy monitoring and safety systems.

## What This Means for You

If you're building or renovating, now is the time to future-proof your home with these technologies.""",
        "image": "/images/premium/hero/hero-2.jpg",
        "author": "LEXA Team",
        "read_time": 10,
        "published_date": datetime.now(timezone.utc).isoformat(),
        "tags": ["Dubai", "Trends", "Smart Home", "2026"]
    },
    {
        "id": "home-security-best-practices",
        "slug": "home-security-best-practices",
        "title": "Home Security Best Practices for UAE Residents",
        "category": "Security",
        "excerpt": "Comprehensive guide to protecting your home with modern security systems.",
        "content": """Security is paramount for luxury homeowners. Here's how to implement comprehensive protection:

## Layered Security Approach

**Perimeter**: Smart gates, motion sensors, and outdoor cameras create the first line of defense.

**Entry Points**: Biometric door locks, video doorbells, and window sensors monitor all access points.

**Interior**: Motion detectors and glass break sensors provide secondary protection.

**Monitoring**: 24/7 professional monitoring with instant alerts to your phone and local authorities.

## Technology Selection

**Cameras**: 4K resolution with night vision, wide dynamic range for harsh sunlight.

**AI Detection**: Differentiate between people, vehicles, and animals to reduce false alarms.

**Facial Recognition**: Automatically identify family members, staff, and approved visitors.

**Integration**: Connect security with lighting and audio to deter intruders.

## UAE-Specific Considerations

- **Heat Tolerance**: Equipment must withstand 50°C+ summer temperatures
- **Sandstorm Protection**: Sealed outdoor cameras with regular cleaning protocols  
- **Local Monitoring**: Dubai Police integration for verified alarms

## Privacy & Compliance

Ensure your system complies with UAE data protection laws. Camera placement must respect neighbors' privacy.

## Professional vs DIY

For properties over AED 5M, we recommend professional installation with ongoing maintenance contracts.

## Cost Investment

- **Essential**: AED 50,000 - 100,000
- **Comprehensive**: AED 150,000 - 300,000
- **Enterprise**: AED 500,000+

Schedule a security assessment to identify vulnerabilities.""",
        "image": "/images/premium/solutions/penthouse-2.jpg",
        "author": "Security Team",
        "read_time": 9,
        "published_date": datetime.now(timezone.utc).isoformat(),
        "tags": ["Security", "Safety", "UAE", "Guide"]
    },
]

async def seed_articles():
    """Seed the articles collection"""
    print("🌱 Adding articles to database...")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Clear existing articles
        print("🗑️  Clearing existing articles...")
        await db.articles.delete_many({})
        
        # Insert articles
        print(f"📰 Inserting {len(ARTICLES)} articles...")
        await db.articles.insert_many(ARTICLES)
        
        # Verify
        count = await db.articles.count_documents({})
        print("\n✅ Articles seeded successfully!")
        print(f"   Total articles: {count}")
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_articles())

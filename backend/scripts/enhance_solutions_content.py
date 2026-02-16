"""
Script to enhance solutions with FAQs and rich content from the main website
"""
import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Rich content based on lexalifestyle.com solutions pages
SOLUTION_ENHANCEMENTS = {
    "smart-residential-living": {
        "faqs": [
            {
                "question": "Can I control my entire home from one app?",
                "answer": "Yes, our integrated platform allows total control over lighting, media, and security from a single intuitive app. You can manage your entire home from anywhere, using your smartphone or tablet."
            },
            {
                "question": "Do you provide after-installation support?",
                "answer": "Yes, our team offers continuous monitoring and updates. We provide 24/7 support to ensure your smart home system runs smoothly, with regular software updates and maintenance."
            },
            {
                "question": "Is smart living energy-efficient?",
                "answer": "Absolutely — automation optimizes usage for energy savings. Smart sensors and scheduling ensure lights, climate control, and appliances run only when needed, significantly reducing your energy consumption."
            },
            {
                "question": "Can I expand automation features later?",
                "answer": "Of course, systems are fully scalable for future upgrades. Our smart home platform is designed to grow with your needs, allowing you to add new devices, rooms, and features over time."
            }
        ],
        "additional_sections": [
            {
                "title": "Connected & Comfortable Living",
                "content": "Redefine everyday living with a home that adapts to your lifestyle while keeping you safe and connected. Through lifestyle automation, enjoy ambient lighting scenes, personalized climate control, voice-activated comfort, and integrated kitchen and utility systems that make daily routines seamless. At the same time, a secure and connected home ensures peace of mind with smart access control, remote monitoring, energy dashboards, and integrated alarms—all protected by robust privacy settings and network security."
            }
        ]
    },
    "yacht-automation": {
        "faqs": [
            {
                "question": "What is yacht automation and how does it work?",
                "answer": "Yacht automation integrates multiple onboard systems—lighting, climate, entertainment, navigation, and security—into a single, intelligent platform. Users can control these systems via apps, touch panels, or voice commands for effortless operation."
            },
            {
                "question": "Is the system easy to use for guests or crew?",
                "answer": "Absolutely. Yacht automation is designed with intuitive interfaces, including mobile apps, centralized control panels, and optional voice commands, making it accessible for users of all technical levels."
            },
            {
                "question": "Can yacht automation enhance onboard safety?",
                "answer": "Yes. Automation provides real-time alerts, automated monitoring, and emergency responses, helping prevent accidents and ensuring a secure environment for passengers and crew."
            },
            {
                "question": "Can yacht automation be customized for different vessels?",
                "answer": "Yes. Every yacht installation is tailored to the vessel's size, layout, and specific requirements. Systems are configured to optimize comfort, efficiency, and safety based on the yacht type and owner preferences."
            }
        ],
        "additional_sections": [
            {
                "title": "Luxury & Intelligent Yachting",
                "content": "Yacht automation transforms onboard living into a seamless, intelligent experience where luxury meets convenience. From modern motor yachts to classic sailing vessels, our integrated systems manage lighting, climate, entertainment, and navigation with precision. Every control is designed to enhance comfort, reduce manual effort, and provide intuitive access, so owners and guests can focus on enjoying their time at sea without distraction or complexity."
            }
        ]
    },
    "mirror-tv": {
        "faqs": [
            {
                "question": "How does a Mirror-TV work?",
                "answer": "A Mirror-TV looks and functions like a standard decorative mirror when turned off. Once powered on, a high-brightness display behind the glass becomes visible, creating a seamless transition from reflection to entertainment. The technology ensures clarity without compromising mirror quality."
            },
            {
                "question": "Can a Mirror-TV be installed in any room?",
                "answer": "Yes. Mirror-TVs are suitable for living rooms, bedrooms, lobbies, hotel suites, wellness spaces, and even bathrooms with proper moisture-rated configurations. Each installation is customized to room lighting, viewing angles, and interior design to ensure optimal performance."
            },
            {
                "question": "Will the mirror effect reduce the TV's picture quality?",
                "answer": "No. Premium Mirror-TV panels use specialized glass that balances reflectivity with display brightness. This ensures a crisp, vibrant image when active while still maintaining a true mirror finish when inactive. For brighter rooms, we offer enhanced brightness options to maintain excellent visibility."
            },
            {
                "question": "Are the cables and hardware visible after installation?",
                "answer": "No. All wiring, mounts, and hardware are discreetly concealed inside the wall or behind custom framing. The final result is a clean, minimalist finish that appears as a natural part of the interior design without visible clutter."
            }
        ]
    },
    "themed-home-cinemas": {
        "faqs": [
            {
                "question": "What makes a themed home cinema different from a regular home theater?",
                "answer": "A themed home cinema goes beyond premium audio and video to create an immersive environment. From custom architectural design and acoustic treatments to thematic décor and lighting, every element is crafted to transport you into your favorite cinematic universe."
            },
            {
                "question": "How long does it take to build a themed home cinema?",
                "answer": "The timeline varies based on complexity and customization level. A typical themed cinema project takes 8-16 weeks from initial design to completion, including acoustic engineering, construction, equipment installation, and calibration."
            },
            {
                "question": "Can I change the theme later if I want?",
                "answer": "Yes, we design systems with flexibility in mind. While structural elements remain fixed, lighting scenes, digital artwork, and themed accessories can be updated. We also offer modular design elements that allow theme refreshes without major reconstruction."
            },
            {
                "question": "Do you handle acoustics and soundproofing?",
                "answer": "Absolutely. Acoustic engineering is fundamental to every cinema we build. We implement professional-grade sound isolation, bass management, and room optimization to ensure reference-level audio performance without disturbing other areas of your home."
            }
        ]
    },
    "multi-room-entertainment": {
        "faqs": [
            {
                "question": "Can I play different music in different rooms simultaneously?",
                "answer": "Yes. Multi-room entertainment systems allow you to stream different audio sources to different zones independently. You can have jazz in the living room, news in the kitchen, and children's music in the playroom—all controlled from one app."
            },
            {
                "question": "Will it work with my existing speakers?",
                "answer": "In most cases, yes. Our systems integrate with a wide range of speaker brands and types. We can incorporate your existing high-quality speakers or recommend upgrades where needed for optimal performance."
            },
            {
                "question": "How do I control multi-room audio?",
                "answer": "Control is intuitive through dedicated apps on your smartphone or tablet, wall-mounted keypads, voice commands, or even integration with your smart home system. You can adjust volume, change sources, and group rooms with simple taps or voice instructions."
            },
            {
                "question": "Can I extend the system to outdoor spaces?",
                "answer": "Absolutely. We design weather-resistant audio solutions for patios, pool areas, gardens, and outdoor entertainment spaces. Outdoor zones integrate seamlessly with your indoor multi-room system for consistent control throughout your property."
            }
        ]
    },
    "security-enhanced-environments": {
        "faqs": [
            {
                "question": "What security features are included in an enhanced environment?",
                "answer": "Our security-enhanced environments include 24/7 surveillance cameras with AI analytics, smart access control with biometric options, perimeter monitoring, motion sensors, smart locks, integrated alarm systems, and remote monitoring capabilities—all managed through a unified platform."
            },
            {
                "question": "Can I monitor my home security remotely?",
                "answer": "Yes. Our systems provide real-time alerts and live video feeds accessible from anywhere via secure mobile apps. You'll receive instant notifications of any security events and can review footage, lock/unlock doors, and manage access remotely."
            },
            {
                "question": "How does AI enhance security monitoring?",
                "answer": "AI-powered analytics distinguish between normal activity and potential threats, reducing false alarms. The system can recognize familiar faces, detect unusual behavior patterns, identify package deliveries, and alert you only to genuinely important events."
            },
            {
                "question": "Is my security data kept private and secure?",
                "answer": "Absolutely. We implement enterprise-grade encryption, secure local storage options, and strict privacy protocols. Your footage and data remain under your control, with optional cloud backup using military-grade security standards."
            }
        ]
    },
    "energy-efficient-living": {
        "faqs": [
            {
                "question": "How much can I save with energy-efficient automation?",
                "answer": "Most clients see 20-40% reduction in energy costs through intelligent automation. Savings come from optimized HVAC scheduling, smart lighting that turns off when rooms are unoccupied, automated shade control to reduce heating/cooling loads, and detailed energy monitoring that reveals usage patterns."
            },
            {
                "question": "Does the system work with solar panels?",
                "answer": "Yes. Our energy management systems integrate seamlessly with solar installations, battery storage, and EV chargers. You can monitor solar production, optimize battery charging, and automatically shift high-energy tasks to solar production hours."
            },
            {
                "question": "Will I get reports on my energy usage?",
                "answer": "Absolutely. Detailed dashboards show real-time and historical energy consumption by room, system, and appliance. You'll receive insights and recommendations for further optimization, helping you make informed decisions about your energy use."
            },
            {
                "question": "Can the system detect energy waste automatically?",
                "answer": "Yes. Smart sensors detect when lights, HVAC, or appliances are running unnecessarily and can automatically adjust them. You'll receive alerts about unusual consumption patterns that may indicate equipment malfunctions or inefficiencies."
            }
        ]
    },
    "luxury-hospitality-automation": {
        "faqs": [
            {
                "question": "How does hospitality automation enhance guest experience?",
                "answer": "Automation creates personalized environments for every guest—customized lighting scenes, preferred room temperature, one-touch entertainment, and automated curtains. Guests enjoy hotel-level luxury with intuitive controls that require no technical knowledge."
            },
            {
                "question": "Can guests control their room settings?",
                "answer": "Yes. Guests receive intuitive control via in-room tablets, mobile apps, or voice commands. They can adjust lighting, climate, entertainment, and curtains to their preferences, while property managers retain override capabilities for efficiency and maintenance."
            },
            {
                "question": "Does the system support different guest profiles?",
                "answer": "Absolutely. The system can store guest preferences and automatically configure rooms for returning visitors. Temperature, lighting scenes, entertainment preferences, and even wake-up settings can be recalled instantly, creating a truly personalized experience."
            },
            {
                "question": "How does automation improve operational efficiency?",
                "answer": "Centralized management allows staff to monitor and control all rooms from a single interface. Automated room resets after checkout, occupancy-based energy saving when rooms are vacant, and predictive maintenance alerts all reduce operational costs and improve service quality."
            }
        ]
    }
}

async def enhance_solutions():
    """Add FAQs and additional content to solutions"""
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        print("Error: MONGO_URL not found in environment")
        return
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]
    
    print("Starting solution enhancement...")
    
    for slug, enhancements in SOLUTION_ENHANCEMENTS.items():
        print(f"\nEnhancing {slug}...")
        
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": enhancements}
        )
        
        if result.modified_count > 0:
            print(f"  ✓ Updated {slug}")
        else:
            print(f"  ℹ {slug} not found or already up to date")
    
    print("\n✓ Solution enhancement complete!")
    
    # Verify one solution
    sample = await db.solutions.find_one(
        {"slug": "smart-residential-living"},
        {"_id": 0, "title": 1, "faqs": 1}
    )
    if sample:
        print(f"\nVerification - {sample['title']} has {len(sample.get('faqs', []))} FAQs")

if __name__ == "__main__":
    asyncio.run(enhance_solutions())

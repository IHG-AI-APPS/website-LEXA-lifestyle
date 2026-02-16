"""
Script to add FAQs to remaining solutions
"""
import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Additional solutions FAQs
ADDITIONAL_SOLUTIONS_FAQS = {
    "commercial-collaboration-spaces": {
        "faqs": [
            {
                "question": "What makes a collaboration space 'smart'?",
                "answer": "A smart collaboration space integrates AV systems, wireless presentation, video conferencing, automated lighting, and intelligent room booking into a unified platform. Users can start meetings, share content, and adjust room settings with a single touch or voice command."
            },
            {
                "question": "Can the system work with our existing video conferencing platform?",
                "answer": "Yes. Our systems integrate seamlessly with Microsoft Teams, Zoom, Google Meet, Webex, and other major platforms. We provide one-touch meeting join and camera/microphone auto-switching for effortless collaboration."
            },
            {
                "question": "How do you ensure audio quality in large conference rooms?",
                "answer": "We deploy professional-grade ceiling microphones with acoustic echo cancellation, beamforming technology, and DSP processing. Combined with strategic speaker placement and acoustic treatment, this ensures crystal-clear audio for all participants, both in-room and remote."
            },
            {
                "question": "Can we track room usage and optimize our office space?",
                "answer": "Absolutely. Our systems provide detailed analytics on room utilization, meeting patterns, and occupancy trends. This data helps you optimize space allocation, identify underutilized areas, and make informed decisions about office layout and capacity."
            }
        ]
    },
    "boardrooms-auditoriums": {
        "faqs": [
            {
                "question": "What's the difference between a boardroom and auditorium system?",
                "answer": "Boardroom systems focus on intimate collaboration with high-quality video conferencing, wireless presentation, and subtle automation. Auditorium systems prioritize large-scale presentation, theatrical lighting control, multi-camera production, and distributed audio for audiences of 50-500+ people."
            },
            {
                "question": "Can we record presentations automatically?",
                "answer": "Yes. We implement professional recording systems that capture presenter video, slide content, and audience audio. Recordings can be automatically uploaded to your media server or cloud storage, with optional live streaming to remote participants."
            },
            {
                "question": "How do you handle different types of events?",
                "answer": "Our systems feature scene-based presets for various event types—corporate presentations, panel discussions, performances, town halls, and training sessions. Each preset automatically configures lighting, audio routing, camera positions, and display layouts optimized for that event format."
            },
            {
                "question": "What level of technical expertise is needed to operate the system?",
                "answer": "We design intuitive touch-panel interfaces that require minimal training. For complex events, we offer operator training and optional on-site technical support. Most day-to-day operations (starting presentations, adjusting volume, switching sources) are simple one-touch actions."
            }
        ]
    },
    "outdoor-av-landscape-control": {
        "faqs": [
            {
                "question": "Can outdoor speakers withstand Dubai's extreme weather?",
                "answer": "Absolutely. We specify marine-grade, weatherproof speakers rated for high humidity, dust, UV exposure, and temperature extremes. All installations include proper sealing and protection to ensure years of reliable outdoor performance."
            },
            {
                "question": "How do you control lighting and water features automatically?",
                "answer": "Our landscape automation integrates with lighting control, irrigation systems, and fountain controllers. You can create scenes that coordinate lighting, music, and water features for entertaining, or schedule automatic operation based on time of day and special events."
            },
            {
                "question": "Can I control outdoor systems from inside the house?",
                "answer": "Yes. Outdoor audio, lighting, and irrigation integrate seamlessly with your indoor smart home system. Control everything from a single app, wall keypads, or voice commands—whether you're indoors, outdoors, or away from home."
            },
            {
                "question": "What about pool area safety and automation?",
                "answer": "We implement automated pool lighting, underwater speakers, safety sensors, and integrated controls. Systems can include automatic pool cover operation, water feature scheduling, and safety alerts if sensors detect unexpected activity near the pool."
            }
        ]
    },
    "assisted-living-wellness-spaces": {
        "faqs": [
            {
                "question": "How does automation help elderly or mobility-impaired residents?",
                "answer": "Voice control eliminates the need to reach switches or devices. Automated lighting prevents falls by ensuring paths are always illuminated. Smart medication reminders, emergency call buttons, and activity monitoring provide safety and independence while giving caregivers peace of mind."
            },
            {
                "question": "Can the system detect falls or medical emergencies?",
                "answer": "Yes. We integrate motion sensors, wearable devices, and AI-powered cameras that can detect falls, unusual inactivity, or distress. Alerts are sent immediately to caregivers or family members, ensuring rapid response in emergencies."
            },
            {
                "question": "How do you protect resident privacy with monitoring systems?",
                "answer": "Privacy is paramount. We use AI edge processing that detects anomalies without storing video. Cameras can be placed only in common areas, not bedrooms. All systems include privacy modes, encrypted data transmission, and strict access controls."
            },
            {
                "question": "Can family members monitor their loved ones remotely?",
                "answer": "Yes, with appropriate consent and privacy safeguards. Family members can receive wellness updates, activity summaries, and emergency alerts. Two-way video communication allows virtual visits, and environmental monitoring ensures comfort and safety."
            }
        ]
    },
    "video-walls": {
        "faqs": [
            {
                "question": "What's the difference between LED and LCD video walls?",
                "answer": "LED video walls offer seamless displays with no bezels, higher brightness, and better outdoor/high-ambient-light performance. LCD video walls have thinner bezels (1-5mm), lower cost, and better resolution at smaller sizes. We recommend based on viewing distance, ambient light, and budget."
            },
            {
                "question": "Can a video wall display multiple sources simultaneously?",
                "answer": "Absolutely. Video wall processors allow you to display multiple feeds, windows, and layouts. Show live TV, security cameras, presentations, social media, and data dashboards simultaneously, with fully customizable sizing and positioning."
            },
            {
                "question": "How do you ensure the image looks uniform across all panels?",
                "answer": "Professional video wall systems include color calibration, brightness matching, and bezel compensation to create a seamless image. We perform factory calibration and on-site fine-tuning to ensure perfect uniformity across all displays."
            },
            {
                "question": "What content management options are available?",
                "answer": "We provide content management systems (CMS) that allow scheduled programming, dynamic content, real-time data feeds, and remote control. Update content from anywhere, schedule campaigns, and monitor performance through intuitive web interfaces."
            }
        ]
    },
    "marine-audio": {
        "faqs": [
            {
                "question": "How is marine audio different from regular outdoor speakers?",
                "answer": "Marine audio equipment uses corrosion-resistant materials (titanium tweeters, polymer cones, stainless steel hardware) specifically designed to withstand saltwater, UV exposure, and constant moisture. They deliver high-fidelity sound in challenging acoustic environments with wind and water noise."
            },
            {
                "question": "Can I have different music in different areas of the yacht?",
                "answer": "Yes. Multi-zone marine audio systems allow independent control of music in the salon, flybridge, aft deck, cabins, and engine room. Each zone has individual volume and source selection, controllable via wall panels, apps, or integrated yacht control systems."
            },
            {
                "question": "How do you hide speakers and equipment on a yacht?",
                "answer": "We use ultra-slim in-ceiling speakers, hidden subwoofers, and custom mounting solutions that integrate with yacht interiors. Equipment racks are placed in technical spaces, and all wiring is professionally concealed within walls and overhead panels."
            },
            {
                "question": "Can the system integrate with satellite radio and streaming services?",
                "answer": "Absolutely. Our marine audio systems support satellite radio (SiriusXM), streaming services (Spotify, Tidal, Apple Music), onboard media servers, and traditional sources. Seamless switching between sources is available on any zone."
            }
        ]
    },
    "marine-video": {
        "faqs": [
            {
                "question": "Can we watch satellite TV while at sea?",
                "answer": "Yes. We install stabilized marine satellite TV antennas that maintain signal lock even in rough seas. Systems support multiple receivers for different channels in various cabins, and integrate with your yacht's IPTV distribution for streaming throughout the vessel."
            },
            {
                "question": "How do you distribute video to multiple cabins and decks?",
                "answer": "We implement marine-grade HDMI over IP or HDBaseT distribution systems that deliver 4K video, control signals, and network connectivity over single cables. This allows any source (satellite, streaming, Blu-ray) to be viewed on any TV aboard."
            },
            {
                "question": "Are the TVs and displays waterproof?",
                "answer": "Displays vary by location. For enclosed areas (salon, cabins), we use standard marine TVs with corrosion protection. For exposed areas (flybridge, aft deck), we specify IP-rated waterproof displays designed for direct weather exposure."
            },
            {
                "question": "Can we integrate navigation displays and security cameras?",
                "answer": "Yes. Advanced systems integrate navigation charts, engine data, security cameras, and entertainment into a unified display system. Captains can monitor all critical systems from the helm, while guests enjoy entertainment without seeing technical feeds."
            }
        ]
    }
}

async def add_remaining_faqs():
    """Add FAQs to remaining solutions"""
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        print("Error: MONGO_URL not found in environment")
        return
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]
    
    print("Adding FAQs to remaining solutions...")
    
    for slug, enhancements in ADDITIONAL_SOLUTIONS_FAQS.items():
        print(f"\nEnhancing {slug}...")
        
        result = await db.solutions.update_one(
            {"slug": slug},
            {"$set": enhancements}
        )
        
        if result.modified_count > 0:
            print(f"  ✓ Updated {slug}")
        elif result.matched_count > 0:
            print(f"  ℹ {slug} already up to date")
        else:
            print(f"  ✗ {slug} not found in database")
    
    print("\n✓ Additional FAQs added!")
    
    # Verify total count
    total_with_faqs = await db.solutions.count_documents({'faqs': {'$exists': True, '$ne': []}})
    total_solutions = await db.solutions.count_documents({})
    print(f"\nTotal solutions with FAQs: {total_with_faqs}/{total_solutions}")

if __name__ == "__main__":
    asyncio.run(add_remaining_faqs())

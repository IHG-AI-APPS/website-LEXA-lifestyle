"""
Seed Specialty Room Add-Ons
Wine Room, Game Room, Vault, Bar, Spa, Gym, etc.
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_specialty_rooms():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    specialty_rooms = [
        {
            "id": str(uuid4()),
            "slug": "wine-room",
            "name": "Wine Room / Cellar Automation",
            "category": "Luxury Amenities",
            "description": "Climate-controlled wine storage with precise temperature, humidity monitoring, and intelligent inventory tracking",
            "long_description": "Transform your wine collection into a properly preserved investment. Our wine cellar automation maintains perfect storage conditions (12-14°C, 60-70% humidity) with real-time monitoring, automated alerts, and elegant lighting that showcases your collection without UV damage.",
            "typical_size": "150-500 sq ft",
            "base_price_aed": 45000,
            "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=85",
            "features": [
                "Precise temperature control (±0.5°C accuracy)",
                "Humidity monitoring & management (60-70%)",
                "Dual-zone climate for red & white wines",
                "UV-free LED lighting with dimming",
                "Vibration isolation systems",
                "Digital inventory tracking & cataloging",
                "Mobile app monitoring & alerts",
                "Door sensor & security integration",
                "Glass door anti-condensation heating",
                "Automated ventilation & air circulation"
            ],
            "typical_components": [
                "Specialized HVAC unit",
                "Multiple temperature sensors",
                "Humidity sensors & humidifier",
                "Smart LED lighting strips",
                "Door contact sensors",
                "Control interface panel"
            ],
            "integration_with": ["Climate control", "Security system", "Lighting automation"],
            "tags": ["wine", "cellar", "climate-control", "luxury"]
        },
        {
            "id": str(uuid4()),
            "slug": "vault-panic-room",
            "name": "Vault / Panic Room Automation",
            "category": "Security & Safety",
            "description": "Biometric-secured vault with surveillance integration, emergency protocols, and communications systems",
            "long_description": "Ultimate security for valuables and emergency safety. Biometric access control, reinforced construction, dedicated air supply, emergency communications, and full integration with your home's security ecosystem.",
            "typical_size": "80-200 sq ft",
            "base_price_aed": 85000,
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85",
            "features": [
                "Multi-factor biometric access (fingerprint, retina, PIN)",
                "Reinforced steel door with electronic locks",
                "Dedicated air supply & filtration",
                "Emergency communication system (satellite backup)",
                "Interior surveillance monitoring",
                "Panic button integration",
                "Automated emergency lighting",
                "Climate control (independent system)",
                "Safe deposit integration",
                "Tamper alerts & intrusion detection"
            ],
            "typical_components": [
                "Biometric access panel",
                "Electronic locking mechanism",
                "Air filtration unit",
                "Emergency phone/intercom",
                "Interior camera",
                "Backup power supply"
            ],
            "integration_with": ["Security system", "Access control", "Emergency protocols"],
            "tags": ["security", "vault", "panic-room", "biometric"]
        },
        {
            "id": str(uuid4()),
            "slug": "game-room",
            "name": "Game Room Automation",
            "category": "Entertainment",
            "description": "Immersive gaming environment with multi-screen setups, dynamic lighting, premium audio, and game-sync automation",
            "long_description": "Create the ultimate gaming sanctuary. Multi-console support, racing/flight simulators, VR-ready space, dynamic RGB lighting that syncs with gameplay, surround sound, and motorized screen/projector systems for versatile entertainment.",
            "typical_size": "250-600 sq ft",
            "base_price_aed": 35000,
            "image": "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?q=85",
            "features": [
                "Multi-screen gaming setup (3+ displays)",
                "Console switching hub (PlayStation, Xbox, PC)",
                "VR-ready space with tracking systems",
                "Racing/flight simulator support",
                "Dynamic RGB lighting (game-synchronized)",
                "Surround sound audio system (5.1 or 7.1)",
                "Motorized projection screen",
                "Ambient bias lighting behind displays",
                "Comfortable gaming seating with charging",
                "Cable management & hidden wiring"
            ],
            "typical_components": [
                "3-4 gaming displays",
                "Gaming PC & consoles",
                "Audio receiver & speakers",
                "RGB lighting system (Philips Hue, Nanoleaf)",
                "HDMI matrix switcher",
                "Gaming chairs"
            ],
            "integration_with": ["Entertainment system", "Lighting automation", "Climate control"],
            "tags": ["gaming", "entertainment", "multimedia", "rgb"]
        },
        {
            "id": str(uuid4()),
            "slug": "home-bar-club",
            "name": "Home Bar & Club Experience",
            "category": "Entertainment",
            "description": "Professional bar setup with DMX lighting, music-synced scenes, refrigeration, and party automation presets",
            "long_description": "Bring the nightclub home. Professional-grade bar with DMX lighting effects, music-reactive scenes, motorized bottle displays, under-counter LED strips, integrated sound system, and one-touch party modes that transform the space instantly.",
            "typical_size": "150-400 sq ft",
            "base_price_aed": 40000,
            "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=85",
            "features": [
                "DMX theatrical lighting scenes",
                "Music-synchronized light shows",
                "RGB color-changing LED strips",
                "Motorized bottle display shelving",
                "Under-bar & back-bar LED lighting",
                "Integrated sound system (bar-specific zones)",
                "Wine/beer refrigeration with smart controls",
                "Ice maker automation",
                "Party mode presets (Club, Lounge, Ambient)",
                "Smart glass shelving with edge lighting"
            ],
            "typical_components": [
                "DMX lighting controller",
                "RGB LED strips & fixtures",
                "Audio system with subwoofer",
                "Smart refrigeration units",
                "Motorized shelving",
                "Control touchscreen"
            ],
            "integration_with": ["Entertainment system", "Lighting automation", "Music system"],
            "tags": ["bar", "club", "party", "dmx", "entertainment"]
        },
        {
            "id": str(uuid4()),
            "slug": "executive-office",
            "name": "Executive Home Office & Study",
            "category": "Productivity",
            "description": "Professional workspace with video conferencing, presentation systems, acoustic control, and focus-mode automation",
            "long_description": "Work like headquarters from home. Professional-grade video conferencing (4K cameras, noise-canceling mics), wireless presentation, dual/triple monitor setups, acoustic treatments, circadian lighting for focus, and automated \"Do Not Disturb\" protocols.",
            "typical_size": "180-350 sq ft",
            "base_price_aed": 38000,
            "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85",
            "features": [
                "Professional video conferencing system (Zoom Rooms, Teams)",
                "4K PTZ camera with auto-tracking",
                "Noise-canceling ceiling microphone array",
                "Wireless presentation & screen sharing",
                "Dual/triple monitor setup",
                "Motorized display lift (hidden TV)",
                "Acoustic panels & soundproofing",
                "Circadian lighting for focus & productivity",
                "\"Do Not Disturb\" automation (lights, door lock, signs)",
                "Integrated document camera"
            ],
            "typical_components": [
                "Zoom Rooms kit or equivalent",
                "4K conferencing camera",
                "Microphone array",
                "Display(s) & monitor arms",
                "Acoustic treatments",
                "Smart desk controller"
            ],
            "integration_with": ["Lighting system", "Access control", "Climate control"],
            "tags": ["office", "productivity", "conferencing", "workspace"]
        },
        {
            "id": str(uuid4()),
            "slug": "private-spa",
            "name": "Private Spa & Wellness Room",
            "category": "Wellness",
            "description": "Automated spa experience with steam/sauna controls, chromotherapy lighting, aromatherapy, and relaxation scenes",
            "long_description": "Your personal wellness sanctuary. Automated steam room and sauna controls, chromotherapy (color therapy) lighting, essential oil aromatherapy diffusers, heated floors, rain/waterfall shower controls, and pre-programmed relaxation scenes.",
            "typical_size": "200-500 sq ft",
            "base_price_aed": 55000,
            "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85",
            "features": [
                "Steam room automation (temperature, duration, auto-shutoff)",
                "Sauna control (infrared or traditional)",
                "Chromotherapy LED lighting (color therapy)",
                "Aromatherapy diffuser integration",
                "Heated floor controls",
                "Smart shower system (temperature presets, rain/waterfall modes)",
                "Waterproof speakers for spa music",
                "Relaxation scene presets (Detox, Relax, Energize)",
                "Towel warmer automation",
                "Air quality & humidity monitoring"
            ],
            "typical_components": [
                "Steam generator with controls",
                "Sauna heater & controller",
                "Chromotherapy lighting system",
                "Aromatherapy device",
                "Smart shower controller",
                "Heated floor thermostat"
            ],
            "integration_with": ["Climate control", "Lighting system", "Entertainment system"],
            "tags": ["spa", "wellness", "sauna", "steam", "relaxation"]
        },
        {
            "id": str(uuid4()),
            "slug": "home-gym",
            "name": "Private Gym Automation",
            "category": "Fitness & Wellness",
            "description": "Smart fitness space with climate optimization, entertainment integration, mirror displays, and workout tracking",
            "long_description": "Motivate your fitness goals with smart gym automation. Climate-optimized for workouts, integrated entertainment (music, streaming, YouTube workouts), mirror displays for form checking, equipment usage tracking, and energizing lighting scenes.",
            "typical_size": "250-600 sq ft",
            "base_price_aed": 32000,
            "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85",
            "features": [
                "Workout-optimized climate control (cooler during exercise)",
                "Integrated sound system (motivational playlists)",
                "Large display for workout videos / streaming",
                "Mirror TV displays (form-check while watching)",
                "Energizing RGB lighting scenes",
                "Equipment usage tracking (smart sensors)",
                "Heart rate monitor integration",
                "Workout timer & interval displays",
                "Automated ventilation boost during workouts",
                "Motivational lighting (adaptive intensity)"
            ],
            "typical_components": [
                "Climate control sensors",
                "Ceiling/wall speakers",
                "Smart TV or mirror display",
                "RGB LED strips",
                "Equipment sensors",
                "Control panel"
            ],
            "integration_with": ["Climate control", "Entertainment system", "Lighting automation"],
            "tags": ["fitness", "gym", "wellness", "workout"]
        },
        {
            "id": str(uuid4()),
            "slug": "childrens-playroom",
            "name": "Children's Playroom Automation",
            "category": "Family",
            "description": "Safe, fun automation with parental controls, activity zones, educational content, and kid-friendly interfaces",
            "long_description": "A smart, safe space for your children. Parental controls over content and screen time, activity zones (reading, play, arts & crafts) with dedicated lighting, educational streaming integration, soft RGB night lights, and kid-friendly voice commands.",
            "typical_size": "200-400 sq ft",
            "base_price_aed": 28000,
            "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=85",
            "features": [
                "Parental control system (content filtering, screen time limits)",
                "Activity zone lighting (Reading, Play, Arts, Rest)",
                "Educational content streaming (kid-safe)",
                "Soft RGB night lights & star projectors",
                "Kid-friendly voice commands (simplified)",
                "Automated toy storage lighting",
                "Safety sensors (door open alerts for young kids)",
                "Music & audiobooks integration",
                "Play mode vs Sleep mode automation",
                "Camera feed for parent monitoring (optional)"
            ],
            "typical_components": [
                "Content filtering device",
                "Activity zone lighting",
                "Display with parental controls",
                "RGB night lights",
                "Door sensor",
                "Smart speaker (kid mode)"
            ],
            "integration_with": ["Lighting system", "Entertainment system", "Security system"],
            "tags": ["kids", "children", "playroom", "family", "safety"]
        },
        {
            "id": str(uuid4()),
            "slug": "master-suite-experience",
            "name": "Master Suite Luxury Experience",
            "category": "Luxury Living",
            "description": "Orchestrated master bedroom with wake-up scenes, blackout control, en-suite integration, and climate optimization",
            "long_description": "Your private sanctuary. Gradual wake-up lighting (sunrise simulation), automated blackout shades, climate pre-conditioning, en-suite bathroom integration (heated floors, mirror defog), bedside controls for everything, and romantic evening scenes.",
            "typical_size": "400-800 sq ft (bedroom + en-suite)",
            "base_price_aed": 42000,
            "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85",
            "features": [
                "Sunrise wake-up scene (gradual lighting, shades, temperature)",
                "Automated blackout shades (100% light blocking)",
                "Climate pre-conditioning (cool before sleep, warm before wake)",
                "En-suite bathroom automation (heated floors, mirror defog, towel warmmer)",
                "Bedside scene controls (Reading, Sleep, Romance)",
                "Closet lighting activation (motion-based)",
                "TV lift mechanism or mirror integration",
                "Do Not Disturb mode (locks door, dims lights, silences alerts)",
                "Nighttime path lighting (low-level to bathroom)",
                "Sound masking or white noise integration"
            ],
            "typical_components": [
                "Motorized blackout shades",
                "Climate sensors",
                "Bathroom automation kit",
                "Bedside control panels",
                "Motion sensors",
                "TV lift or mirror TV"
            ],
            "integration_with": ["Lighting system", "Climate control", "Entertainment system", "Security"],
            "tags": ["bedroom", "master-suite", "luxury", "sleep", "wellness"]
        },
        {
            "id": str(uuid4()),
            "slug": "guest-wing-control",
            "name": "Guest Wing Management",
            "category": "Hospitality",
            "description": "Separate guest accommodation with independent HVAC, limited access, welcome automation, and privacy controls",
            "long_description": "Treat guests like royalty while maintaining privacy. Independent climate zones, pre-arrival room preparation (temperature, lights, welcome scene), limited access to only guest areas, digital guest book, and automated checkout procedures.",
            "typical_size": "300-800 sq ft",
            "base_price_aed": 35000,
            "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=85",
            "features": [
                "Independent HVAC zone (guests control their climate)",
                "Limited access control (guest areas only)",
                "Pre-arrival preparation scene (temperature, lights, music)",
                "Welcome automation (lighting path from entry)",
                "Guest-specific WiFi network (secure, separate)",
                "Digital guest book / local recommendations display",
                "Do Not Disturb sign integration",
                "Automated checkout scene (reset room)",
                "Guest bathroom preset (mirror defog, heated floor)",
                "Hospitality mode (simplified controls for guests)"
            ],
            "typical_components": [
                "Separate HVAC zone controls",
                "Access control system",
                "Smart display/tablet",
                "Scene controllers",
                "WiFi access point",
                "Bathroom automation"
            ],
            "integration_with": ["Climate control", "Access control", "Lighting system", "Network"],
            "tags": ["guest", "hospitality", "privacy", "accommodation"]
        },
        {
            "id": str(uuid4()),
            "slug": "pool-garden-automation",
            "name": "Pool & Garden Automation",
            "category": "Outdoor Living",
            "description": "Intelligent outdoor systems with pool temperature, lighting, irrigation, weather-aware scheduling, and water conservation",
            "long_description": "Effortless outdoor luxury. Automated pool heating and filtration, color-changing LED pool lighting, weather-aware garden irrigation, landscape lighting scenes, fountain controls, and water conservation monitoring.",
            "typical_size": "Outdoor areas",
            "base_price_aed": 48000,
            "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=85",
            "features": [
                "Pool temperature control & scheduling",
                "Automated pool filtration & chemical dosing",
                "Color-changing LED pool lighting",
                "Pool cover automation",
                "Weather-aware irrigation system",
                "Multi-zone garden watering",
                "Water flow monitoring & leak detection",
                "Landscape lighting scenes (Dusk, Evening, Party)",
                "Fountain & water feature controls",
                "Outdoor audio integration"
            ],
            "typical_components": [
                "Pool automation controller",
                "Pool LED lights",
                "Irrigation controller",
                "Soil moisture sensors",
                "Water flow sensors",
                "Outdoor lighting controls"
            ],
            "integration_with": ["Lighting system", "Weather data", "Water management"],
            "tags": ["pool", "garden", "irrigation", "outdoor", "landscape"]
        },
        {
            "id": str(uuid4()),
            "slug": "audiophile-music-room",
            "name": "Audiophile Music Room",
            "category": "Entertainment",
            "description": "High-fidelity listening room with acoustic treatments, premium components, pure signal path, and perfect tuning",
            "long_description": "For the true music lover. Dedicated 2-channel audiophile system with acoustic treatments, vibration isolation, power conditioning, premium speakers and amplification, lossless streaming, and professional room calibration for perfect sound.",
            "typical_size": "180-350 sq ft",
            "base_price_aed": 65000,
            "image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=85",
            "features": [
                "High-end 2-channel stereo system",
                "Acoustic panels & bass traps",
                "Vibration-isolated equipment rack",
                "Dedicated power conditioning",
                "Lossless music streaming (Tidal, Qobuz, local FLAC)",
                "Vinyl turntable integration",
                "Tube or solid-state amplifier",
                "Premium speaker placement & calibration",
                "Listening position optimization",
                "Ambient lighting for mood (no harsh lights)"
            ],
            "typical_components": [
                "Premium speakers",
                "High-end amplifier",
                "Music streamer",
                "Acoustic treatments",
                "Equipment rack",
                "Power conditioner"
            ],
            "integration_with": ["Entertainment system", "Lighting system"],
            "tags": ["audiophile", "hifi", "music", "stereo", "acoustics"]
        }
    ]
    
    # Insert all specialty rooms
    for room in specialty_rooms:
        existing = await db.specialty_rooms.find_one({"slug": room["slug"]})
        if existing:
            await db.specialty_rooms.update_one(
                {"slug": room["slug"]},
                {"$set": room}
            )
            print(f"✅ Updated: {room['name']}")
        else:
            await db.specialty_rooms.insert_one(room)
            print(f"✅ Created: {room['name']}")
    
    print(f"\n📊 Total specialty rooms: {len(specialty_rooms)}")
    print(f"💰 Price range: AED {min(r['base_price_aed'] for r in specialty_rooms)/1000:.0f}K - {max(r['base_price_aed'] for r in specialty_rooms)/1000:.0f}K")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_specialty_rooms())

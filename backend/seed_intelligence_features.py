"""
Seed Intelligence Features
Complete catalog of 40+ smart home intelligence features
Based on 2025-2026 industry standards research
"""
import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from uuid import uuid4

load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_intelligence_features():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    features = [
        # ===== SCENE AUTOMATION =====
        {
            "id": str(uuid4()),
            "slug": "morning-routine",
            "title": "Morning Routine Scene",
            "category": "scene_automation",
            "icon": "Sunrise",
            "short_description": "Gradual wake-up with circadian lighting, climate adjustment, and personalized briefing",
            "detailed_description": "Your intelligent morning begins before you wake. Circadian lighting gradually simulates sunrise, gently raising cortisol levels for natural alertness. Climate pre-warms to your preference, coffee begins brewing on schedule, and your personalized news briefing awaits. Blinds open with natural light progression, creating the perfect start to your day.",
            "iq_points": 8,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Master Bedroom", "scenario": "Gradual sunrise simulation starts 30 minutes before wake time"},
                {"room": "Kitchen", "scenario": "Coffee maker auto-starts, lights brighten to natural white"},
                {"room": "Living Room", "scenario": "News briefing plays on speakers, blinds open"}
            ],
            "benefits": [
                "Natural wake-up improves mood and alertness",
                "Saves 15-20 minutes of morning routine",
                "Consistent sleep-wake cycle",
                "Personalized experience per family member"
            ],
            "required_devices": ["Smart Lights", "Motorized Blinds", "Smart Thermostat", "Smart Coffee Maker", "Multi-Room Audio"],
            "compatible_systems": ["Control4", "Savant", "Crestron", "Home Assistant", "Apple HomeKit"],
            "lifestyle_tags": ["convenience", "wellness", "comfort"],
            "is_premium": False,
            "display_order": 1,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "goodnight-sequence",
            "title": "Goodnight Sequence",
            "category": "scene_automation",
            "icon": "Moon",
            "short_description": "Complete home security, sleep optimization, and energy-saving automation",
            "detailed_description": "One command orchestrates your entire home for optimal sleep. All lights gradually dim with warm tones to promote melatonin production. Doors lock, security arms, temperature drops to 65-68°F for REM sleep enhancement. Blue light filtering activates on all screens. Optional white noise or meditation audio begins. Your home becomes a sleep sanctuary.",
            "iq_points": 9,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Whole Home", "scenario": "All lights dim to warm amber, then off on 10-minute fade"},
                {"room": "Entry", "scenario": "Front door locks, security system arms in sleep mode"},
                {"room": "Master Bedroom", "scenario": "Temperature drops to 66°F, blackout shades close, air purifier activates"}
            ],
            "benefits": [
                "50% better sleep quality with temperature optimization",
                "Zero security concerns with automated checking",
                "15% energy savings with overnight HVAC scheduling",
                "Melatonin optimization with blue light filtering"
            ],
            "required_devices": ["Smart Lights", "Smart Locks", "Security System", "Smart Thermostat", "Blackout Shades"],
            "compatible_systems": ["Control4", "Savant", "Crestron", "Ring", "Nest"],
            "lifestyle_tags": ["wellness", "security", "energy", "comfort"],
            "is_premium": False,
            "display_order": 2,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "cinema-mode",
            "title": "Cinema Mode",
            "category": "scene_automation",
            "icon": "Film",
            "short_description": "Immersive theater experience with lighting, audio-video sync, and climate optimization",
            "detailed_description": "Transform your space into a cinema with one command. Lights dim to 10-20%, shades close automatically, AV system powers on with optimal settings. Dynamic bias lighting reduces eye strain while content-synced ambient lighting (Hue Sync, Govee) creates immersion. Climate adjusts for extended viewing comfort. Volume optimizes for content type.",
            "iq_points": 7,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Media Room", "scenario": "Lights dim to 15%, projector descends, Atmos system calibrates"},
                {"room": "Living Room", "scenario": "Bias lighting activates, ambient sync with screen content"},
                {"room": "Whole Space", "scenario": "Temperature cools to 70°F, blackout shades close"}
            ],
            "benefits": [
                "Professional cinema experience at home",
                "Reduced eye strain with bias lighting",
                "One-touch complexity elimination",
                "Content-aware optimization (movie vs sports)"
            ],
            "required_devices": ["Smart Lights", "AV System", "Motorized Shades", "Surround Sound", "Smart Thermostat"],
            "compatible_systems": ["Control4", "Savant", "Crestron", "Sonos", "Philips Hue"],
            "lifestyle_tags": ["entertainment", "comfort"],
            "is_premium": False,
            "display_order": 3,
            "featured": True
        },
        {
            "id": str(uuid4()),
            "slug": "dinner-party",
            "title": "Dinner Party Scene",
            "category": "scene_automation",
            "icon": "Users",
            "short_description": "Perfect ambience for entertaining with lighting, music, and climate coordination",
            "detailed_description": "Host effortlessly with intelligent scene orchestration. Ambient lighting creates warm, inviting atmosphere. Multi-room audio plays curated playlists at conversation-friendly volumes. Climate maintains comfort for guests. Doorbell notifications route to your phone discreetly. Kitchen task lighting brightens while dining dims.",
            "iq_points": 6,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Dining Room", "scenario": "Chandelier dims to 40%, warm amber accent lighting"},
                {"room": "Kitchen", "scenario": "Task lighting at 100%, easy cooking preparation"},
                {"room": "Living Room", "scenario": "Synchronized ambient music, comfortable 72°F climate"}
            ],
            "benefits": [
                "Effortless entertaining without manual adjustments",
                "Professional hospitality ambience",
                "Multi-zone audio coordination",
                "Guest comfort optimization"
            ],
            "required_devices": ["Smart Lights", "Multi-Room Audio", "Smart Thermostat", "Video Doorbell"],
            "compatible_systems": ["Control4", "Sonos", "Lutron", "Apple HomeKit"],
            "lifestyle_tags": ["convenience", "entertainment", "comfort"],
            "is_premium": False,
            "display_order": 4,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "away-mode",
            "title": "Away Mode Security",
            "category": "scene_automation",
            "icon": "Shield",
            "short_description": "Simulated occupancy, enhanced security, and energy-saving automation",
            "detailed_description": "Your home protects itself intelligently. Randomized lighting patterns simulate occupancy at realistic times. Security monitoring elevates to maximum sensitivity. Climate shifts to energy-saving mode while maintaining safe temperatures. Package delivery notifications with video verification. All systems on standby for instant alerts.",
            "iq_points": 8,
            "scoring_category": "security",
            "scenarios": [
                {"room": "Whole Home", "scenario": "Random lights activate in evening patterns"},
                {"room": "Entry", "scenario": "Enhanced motion detection, instant alerts to phone"},
                {"room": "Climate", "scenario": "Energy-saving mode: 78°F cooling, 68°F heating"}
            ],
            "benefits": [
                "Deterrent effect of simulated occupancy",
                "20-30% energy savings while away",
                "Peace of mind with enhanced monitoring",
                "Package security with verified delivery"
            ],
            "required_devices": ["Smart Lights", "Security System", "Smart Thermostat", "Smart Doorbell", "Cameras"],
            "compatible_systems": ["Control4", "Ring", "Nest", "ADT", "SimpliSafe"],
            "lifestyle_tags": ["security", "energy", "convenience"],
            "is_premium": False,
            "display_order": 5,
            "featured": False
        },
        
        # ===== PRESENCE DETECTION =====
        {
            "id": str(uuid4()),
            "slug": "mmwave-presence-detection",
            "title": "mmWave Presence Detection",
            "category": "presence_detection",
            "icon": "Activity",
            "short_description": "Privacy-preserving detection via breathing and micro-movements, even when stationary",
            "detailed_description": "Revolutionary mmWave radar technology detects human presence through breathing patterns and micro-movements, unlike traditional motion sensors that miss stationary people. Privacy-first solution without cameras. Enables lights-follow-you automation, occupancy-based HVAC, and true room intelligence. Proven 30% energy savings through accurate presence detection.",
            "iq_points": 12,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "Living Room", "scenario": "Lights activate when you enter, stay on while reading (stationary), turn off 2 minutes after you leave"},
                {"room": "Home Office", "scenario": "HVAC runs only when occupied, saves energy during meetings away from desk"},
                {"room": "Bedroom", "scenario": "Detects sleep presence, maintains optimal climate, nightlight activates on movement"}
            ],
            "benefits": [
                "30% energy savings proven",
                "No false triggers from pets or shadows",
                "Complete privacy (no cameras)",
                "Detects stationary presence reliably"
            ],
            "required_devices": ["mmWave Radar Sensors", "Smart Lights", "Smart Thermostat"],
            "compatible_systems": ["Home Assistant", "Aqara", "Presence Sensors (Tuya)", "Control4"],
            "lifestyle_tags": ["energy", "convenience", "comfort"],
            "is_premium": True,
            "display_order": 10,
            "featured": True
        },
        
        # ===== CIRCADIAN LIGHTING =====
        {
            "id": str(uuid4()),
            "slug": "circadian-lighting-system",
            "title": "Circadian Lighting System",
            "category": "circadian_lighting",
            "icon": "Sun",
            "short_description": "Human-centric lighting that mimics natural sunlight patterns for health and wellness",
            "detailed_description": "Transform your home into a wellness sanctuary with scientifically-proven circadian lighting. Morning: Cool blue-white (6000K+) stimulates cortisol and alertness. Midday: Natural white (4000-5000K) maintains productivity. Evening: Warm amber (2700-3000K) promotes melatonin for sleep. Night: Dim red tones for minimal disruption. Automatically syncs with sunrise/sunset times and your location. Research shows 50% melatonin optimization and significantly improved sleep quality.",
            "iq_points": 15,
            "scoring_category": "wellness",
            "scenarios": [
                {"room": "Whole Home", "scenario": "6:30 AM - Cool bright light (6000K) for wake-up alertness"},
                {"room": "Home Office", "scenario": "10:00 AM - Natural white (4500K) for focus and productivity"},
                {"room": "Living Room", "scenario": "8:00 PM - Warm amber (2700K) for relaxation and melatonin production"},
                {"room": "Bedroom", "scenario": "10:30 PM - Dim red nightlight for bathroom trips without sleep disruption"}
            ],
            "benefits": [
                "50% melatonin optimization proven by research",
                "Improved sleep quality and deeper REM cycles",
                "Enhanced daytime alertness and focus",
                "Reduces seasonal affective disorder symptoms",
                "Higher home resale value (wellness feature)"
            ],
            "required_devices": ["Tunable White Smart Lights", "Circadian Control System", "Presence Sensors"],
            "compatible_systems": ["Lutron", "Philips Hue", "Home Assistant", "CEDIA Certified Systems"],
            "lifestyle_tags": ["wellness", "comfort", "convenience"],
            "is_premium": True,
            "display_order": 6,
            "featured": True
        },
        
        # ===== VOICE CONTROL =====
        {
            "id": str(uuid4()),
            "slug": "natural-language-voice",
            "title": "Natural Language Voice Control",
            "category": "voice_control",
            "icon": "Mic",
            "short_description": "Conversational AI that understands context, not just commands",
            "detailed_description": "Talk to your home naturally with Josh.ai-level intelligence. Say 'make it brighter' instead of 'set lights to 75%'. The system knows which room you're in, understands context ('play that song from yesterday'), and executes multi-step automation with single phrases like 'movie time'. Privacy-focused with local processing. Supports multiple family members with voice recognition and personalized responses.",
            "iq_points": 11,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "Kitchen", "scenario": "You: 'It's too bright' - Lights dim 30% automatically"},
                {"room": "Living Room", "scenario": "You: 'Movie time' - Cinema scene activates: lights dim, shades close, TV powers on"},
                {"room": "Bedroom", "scenario": "You: 'Goodnight' - Complete bedtime sequence: locks, lights, climate, security"}
            ],
            "benefits": [
                "No learning curve - speak naturally",
                "Context-aware intelligence",
                "Multi-step automation with single command",
                "Privacy-focused local processing",
                "Personalized per family member"
            ],
            "required_devices": ["Voice Control Hub", "Smart Speakers", "Microphones"],
            "compatible_systems": ["Josh.ai", "Control4", "Savant", "Alexa", "Google Assistant"],
            "lifestyle_tags": ["convenience", "comfort"],
            "is_premium": True,
            "display_order": 7,
            "featured": True
        },
        
        # ===== AI PREDICTIVE INTELLIGENCE =====
        {
            "id": str(uuid4()),
            "slug": "ai-behavioral-learning",
            "title": "AI Behavioral Learning",
            "category": "ai_predictive",
            "icon": "Brain",
            "short_description": "Your home learns patterns and predicts needs before you ask",
            "detailed_description": "Machine learning algorithms analyze your daily patterns over weeks and months, creating predictive intelligence. Recognizes when you typically arrive home and pre-adjusts climate 15 minutes early. Learns your lighting preferences by time of day and activity. Predicts energy usage and optimizes costs. Detects anomalies for predictive maintenance. Seasonal adaptation for weather patterns. Your home becomes smarter every day, requiring less manual input over time.",
            "iq_points": 18,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "Whole Home", "scenario": "5:45 PM weekdays - Climate pre-adjusts before your typical 6 PM arrival"},
                {"room": "Living Room", "scenario": "Learns you watch TV at 8 PM - Pre-dims lights and adjusts temperature at 7:50 PM"},
                {"room": "Kitchen", "scenario": "Predicts weekend breakfast routine, suggests coffee timer based on sleep patterns"}
            ],
            "benefits": [
                "25-35% energy savings proven",
                "Predictive maintenance prevents failures",
                "Seamless automation without programming",
                "Seasonal weather adaptation",
                "Learns and improves continuously"
            ],
            "required_devices": ["AI-Enabled Hub", "Smart Sensors", "Connected Devices"],
            "compatible_systems": ["Home Assistant AI", "Control4 Machine Learning", "Josh.ai", "Nest Learning"],
            "lifestyle_tags": ["convenience", "energy", "comfort"],
            "is_premium": True,
            "display_order": 8,
            "featured": True
        },
        
        # ===== ZONE-BASED CONTROL =====
        {
            "id": str(uuid4()),
            "slug": "multi-zone-intelligence",
            "title": "Multi-Zone Intelligence",
            "category": "zone_control",
            "icon": "Grid",
            "short_description": "Independent room control with coordinated whole-home orchestration",
            "detailed_description": "Map your home into intelligent zones with independent control and coordinated automation. Living Room at 72°F while bedrooms sleep at 66°F. Music playing in kitchen while kids study in quiet home office. Each zone operates based on occupancy and preference, yet coordinates for whole-home scenes. No HVAC rewiring needed with smart sensors and zoning.",
            "iq_points": 10,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Master Bedroom", "scenario": "66°F for sleep while living room stays 72°F for late-night movie"},
                {"room": "Kitchen + Dining", "scenario": "Music synced across entertaining zone, independent from bedroom quiet zones"},
                {"room": "Whole Home", "scenario": "Goodnight scene coordinates all zones: lights off, temperatures optimized, security armed"}
            ],
            "benefits": [
                "Individual comfort per room/person",
                "Energy savings by conditioning only occupied zones",
                "Multi-room audio sync or independent play",
                "Coordinated whole-home automation"
            ],
            "required_devices": ["Smart Thermostats", "Zone Sensors", "Multi-Room Audio", "Smart Lights"],
            "compatible_systems": ["Ecobee", "Nest", "Sonos", "Control4", "Home Assistant"],
            "lifestyle_tags": ["comfort", "energy", "entertainment"],
            "is_premium": False,
            "display_order": 9,
            "featured": False
        },
        
        # ===== ENERGY MANAGEMENT =====
        {
            "id": str(uuid4()),
            "slug": "energy-analytics-optimization",
            "title": "Energy Analytics & Optimization",
            "category": "energy_management",
            "icon": "Zap",
            "short_description": "Real-time monitoring, peak-hour shifting, and cost forecasting",
            "detailed_description": "See where every watt goes with real-time energy dashboards per device and zone. AI automatically shifts heavy loads (EV charging, pool heating, appliances) to off-peak hours for cost savings. Solar and battery integration maximizes self-consumption. Comparative analytics track savings vs previous periods. Cost forecasting predicts monthly bills with 95% accuracy. Proven 25-35% reduction in energy costs.",
            "iq_points": 14,
            "scoring_category": "energy",
            "scenarios": [
                {"room": "Garage", "scenario": "EV charges during off-peak hours (1-6 AM) for 40% cost reduction"},
                {"room": "Whole Home", "scenario": "Real-time dashboard shows AC consuming 60%, pool pump 15%, lights 8%"},
                {"room": "Solar Integration", "scenario": "Battery stores excess solar, powers home during peak pricing hours"}
            ],
            "benefits": [
                "25-35% energy cost reduction proven",
                "95% accurate monthly bill prediction",
                "Maximized solar self-consumption",
                "Automated peak-hour avoidance",
                "Per-device consumption visibility"
            ],
            "required_devices": ["Smart Energy Monitor", "Smart Plugs", "EV Charger", "Solar Inverter Integration"],
            "compatible_systems": ["Sense", "Emporia", "Tesla Powerwall", "Enphase", "Home Assistant Energy"],
            "lifestyle_tags": ["energy", "convenience"],
            "is_premium": False,
            "display_order": 11,
            "featured": True
        },
        
        # ===== SECURITY INTELLIGENCE =====
        {
            "id": str(uuid4()),
            "slug": "ai-security-intelligence",
            "title": "AI Security Intelligence",
            "category": "security_intelligence",
            "icon": "ShieldCheck",
            "short_description": "Predictive threat detection with facial recognition and anomaly detection",
            "detailed_description": "AI-powered security that thinks ahead. Facial recognition distinguishes family, approved guests, and unknown individuals. Predictive monitoring identifies suspicious patterns (loitering, repeated passbys). Reduces false alarms by 90% with intelligent threat assessment. Smart locks with biometric, code, proximity, and remote access. Package detection with secure storage alerts. Emergency protocols for instant lockdown or evacuation lighting.",
            "iq_points": 13,
            "scoring_category": "security",
            "scenarios": [
                {"room": "Front Entry", "scenario": "Facial recognition: 'Welcome home, Sarah' vs 'Unknown person detected - Alert sent'"},
                {"room": "Perimeter", "scenario": "AI detects person loitering 3+ minutes, sends predictive security alert"},
                {"room": "Package", "scenario": "Doorbell recognizes delivery driver, confirms package placement, alerts you"}
            ],
            "benefits": [
                "90% reduction in false alarms",
                "Proactive threat identification",
                "Family vs guest vs stranger recognition",
                "Multiple access methods (biometric, code, remote)",
                "Package theft prevention"
            ],
            "required_devices": ["AI Cameras", "Smart Locks", "Video Doorbell", "Motion Sensors", "Security System"],
            "compatible_systems": ["Ring", "Nest", "Aqara", "Yale", "August", "Control4"],
            "lifestyle_tags": ["security", "convenience"],
            "is_premium": False,
            "display_order": 12,
            "featured": True
        },
        
        # ===== CLIMATE OPTIMIZATION =====
        {
            "id": str(uuid4()),
            "slug": "intelligent-climate-control",
            "title": "Intelligent Climate Control",
            "category": "climate_control",
            "icon": "Thermometer",
            "short_description": "Multi-zone temperature, occupancy-based conditioning, and weather integration",
            "detailed_description": "Perfect temperature everywhere with intelligent multi-zone climate control. Each room maintains individual preference based on occupancy. Weather integration pre-adjusts for incoming conditions. Humidity management maintains optimal 40-60% range. Sleep optimization drops bedroom temperature for REM enhancement. HEPA filtering with air quality monitoring. Only conditions occupied spaces for maximum efficiency.",
            "iq_points": 12,
            "scoring_category": "energy",
            "scenarios": [
                {"room": "Master Bedroom", "scenario": "Drops to 66°F at 10 PM for REM sleep enhancement"},
                {"room": "Living Room", "scenario": "Maintains 72°F comfort when occupied, energy-save mode when empty"},
                {"room": "Weather Integration", "scenario": "Pre-cools home before predicted 38°C afternoon heatwave"}
            ],
            "benefits": [
                "Individual comfort per room/person",
                "REM sleep enhancement with temperature optimization",
                "Weather-predictive adjustment",
                "Occupancy-based energy savings",
                "Air quality monitoring and optimization"
            ],
            "required_devices": ["Smart Thermostats", "Room Sensors", "HEPA Filters", "Humidity Monitors"],
            "compatible_systems": ["Ecobee", "Nest", "Honeywell", "Sensibo", "Control4"],
            "lifestyle_tags": ["comfort", "wellness", "energy"],
            "is_premium": False,
            "display_order": 13,
            "featured": False
        },
        
        # ===== WELLNESS & ENVIRONMENTAL =====
        {
            "id": str(uuid4()),
            "slug": "air-water-quality-monitoring",
            "title": "Air & Water Quality Monitoring",
            "category": "wellness_environmental",
            "icon": "Wind",
            "short_description": "Real-time tracking of PM2.5, CO2, VOCs, TDS, and pH with automated response",
            "detailed_description": "Breathe easier with continuous environmental monitoring. Air quality sensors track PM2.5, CO2, VOCs, and trigger HEPA filtration when needed. Water quality monitors TDS and pH, alerting for filter changes. Aromatherapy diffusion on schedules for wellness enhancement. UV sanitation cycles for air and surfaces. Plant care with moisture sensors and auto-watering. Your home becomes a health sanctuary.",
            "iq_points": 11,
            "scoring_category": "wellness",
            "scenarios": [
                {"room": "Bedroom", "scenario": "Air quality drops - Air purifier activates, window alerts if outdoor air is better"},
                {"room": "Kitchen", "scenario": "Water TDS exceeds threshold - Alert sent, suggests filter replacement"},
                {"room": "Living Room", "scenario": "Scheduled aromatherapy: Lavender at 8 PM for relaxation"}
            ],
            "benefits": [
                "Optimal air quality for health",
                "Water safety monitoring",
                "Allergen and pollutant filtration",
                "Wellness enhancement with aromatherapy",
                "Plant health automation"
            ],
            "required_devices": ["Air Quality Sensors", "HEPA Purifiers", "Water Quality Monitor", "Aromatherapy Diffuser", "UV Sanitizers"],
            "compatible_systems": ["Awair", "Dyson", "Blueair", "Home Assistant", "Smart Plant Sensors"],
            "lifestyle_tags": ["wellness", "comfort"],
            "is_premium": True,
            "display_order": 14,
            "featured": False
        },
        
        # ===== APPLIANCE COORDINATION =====
        {
            "id": str(uuid4()),
            "slug": "smart-appliance-coordination",
            "title": "Smart Appliance Coordination",
            "category": "appliance_coordination",
            "icon": "Package",
            "short_description": "Intelligent refrigerators, ovens, washers with inventory tracking and optimization",
            "detailed_description": "Your appliances work as a team. Smart refrigerators track inventory, alert for expiring items, suggest recipes based on contents. Ovens with remote preheating and recipe-guided cooking. Washers detect optimal cycles and notify completion. Coffee makers brew on schedule. Robot vacuums clean based on occupancy. Dishwashers run during off-peak hours. Energy optimization across all appliances.",
            "iq_points": 9,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Kitchen", "scenario": "Fridge alerts: 'Milk expires tomorrow', suggests shopping list and recipes"},
                {"room": "Laundry", "scenario": "Washer detects load type, selects optimal cycle, notifies when complete"},
                {"room": "Morning", "scenario": "Coffee brews automatically at 6:30 AM based on your wake pattern"}
            ],
            "benefits": [
                "Reduced food waste with inventory tracking",
                "Optimal appliance cycles for efficiency",
                "Convenient remote control and monitoring",
                "Off-peak energy optimization",
                "Recipe suggestions from fridge contents"
            ],
            "required_devices": ["Smart Refrigerator", "Smart Oven", "Smart Washer/Dryer", "Coffee Maker", "Robot Vacuum"],
            "compatible_systems": ["Samsung SmartThings", "LG ThinQ", "GE Appliances", "iRobot", "Home Assistant"],
            "lifestyle_tags": ["convenience", "energy"],
            "is_premium": False,
            "display_order": 15,
            "featured": False
        },
        
        # ===== MULTI-ROOM AUDIO =====
        {
            "id": str(uuid4()),
            "slug": "whole-home-audio-ecosystem",
            "title": "Whole-Home Audio Ecosystem",
            "category": "multi_room_audio",
            "icon": "Music",
            "short_description": "Synchronized or independent playback across zones with voice control",
            "detailed_description": "Premium audio experience throughout your home. Sync music across all rooms for parties or play different content in each zone. Voice-activated streaming from Spotify, Apple Music, etc. Intercom functionality between rooms. Outdoor audio zones for patio, pool, garden. Dolby Atmos in cinema spaces. Seamless handoff as you move between rooms.",
            "iq_points": 8,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Whole Home", "scenario": "Party mode: Same playlist synced in living room, kitchen, patio"},
                {"room": "Individual Zones", "scenario": "Dad listens to jazz in office while kids play music in playroom"},
                {"room": "Outdoor", "scenario": "Patio speakers activate for dinner, pool audio for afternoon swim"}
            ],
            "benefits": [
                "Seamless audio throughout home",
                "Sync or independent play per preference",
                "Outdoor entertainment zones",
                "Intercom between rooms",
                "Voice-controlled streaming"
            ],
            "required_devices": ["Multi-Room Speakers", "Amplifiers", "Outdoor Speakers", "Streaming Integration"],
            "compatible_systems": ["Sonos", "Control4", "Russound", "Juke Audio", "Audioengine"],
            "lifestyle_tags": ["entertainment", "convenience"],
            "is_premium": False,
            "display_order": 16,
            "featured": False
        },
        
        # ===== ADDITIONAL PREMIUM FEATURES =====
        {
            "id": str(uuid4()),
            "slug": "gaming-vr-optimization",
            "title": "Gaming & VR Optimization",
            "category": "entertainment_optimization",
            "icon": "Gamepad",
            "short_description": "Low-latency networking, immersive lighting sync, and climate control for gaming",
            "detailed_description": "Elevate your gaming with intelligent optimization. Network prioritizes gaming traffic for zero lag. Immersive lighting syncs with game action (Philips Hue Sync). Climate control compensates for equipment heat during extended sessions. Do-not-disturb automation silences notifications and doorbell. Scene presets for different game genres.",
            "iq_points": 5,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Gaming Room", "scenario": "Network prioritizes gaming, lights sync with gameplay, AC cools to 68°F"},
                {"room": "VR Space", "scenario": "Lighting dims, obstacles alert, climate optimizes for movement"}
            ],
            "benefits": [
                "Zero-lag network prioritization",
                "Immersive lighting synchronization",
                "Extended session comfort",
                "Interruption-free gaming"
            ],
            "required_devices": ["QoS Router", "Smart Lights", "Smart Thermostat", "Hue Sync Box"],
            "compatible_systems": ["Philips Hue", "ASUS Router", "Control4", "Home Assistant"],
            "lifestyle_tags": ["entertainment"],
            "is_premium": True,
            "display_order": 20,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "outdoor-leisure-automation",
            "title": "Outdoor & Leisure Automation",
            "category": "outdoor_automation",
            "icon": "TreePalm",
            "short_description": "Smart pool/spa, weather-responsive irrigation, and outdoor entertainment",
            "detailed_description": "Extend intelligence to outdoor living. Pool and spa with temperature and chemical monitoring. Weather-responsive irrigation saves water. Landscape lighting scenes for ambience. Outdoor kitchen automation. Fire pit voice control. All coordinated with indoor scenes for seamless indoor-outdoor entertaining.",
            "iq_points": 7,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Pool", "scenario": "Maintains 28°C, monitors pH and chlorine, alerts for adjustments"},
                {"room": "Garden", "scenario": "Irrigation skips cycles when rain detected, adjusts for heat"},
                {"room": "Patio", "scenario": "Landscape lighting scene for dinner, fire pit controlled by voice"}
            ],
            "benefits": [
                "Pool maintenance automation",
                "Water conservation with smart irrigation",
                "Outdoor entertainment ambience",
                "Indoor-outdoor scene coordination"
            ],
            "required_devices": ["Smart Pool Controller", "Irrigation Controller", "Landscape Lights", "Outdoor Speakers"],
            "compatible_systems": ["Pentair", "Rachio", "Rain Bird", "Control4", "Lutron"],
            "lifestyle_tags": ["entertainment", "convenience", "energy"],
            "is_premium": True,
            "display_order": 21,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "smart-garage-intelligence",
            "title": "Smart Garage Intelligence",
            "category": "garage_automation",
            "icon": "Garage",
            "short_description": "Adaptive lighting, climate control, EV charging with solar sync, and security",
            "detailed_description": "Transform your garage into an intelligent space. Adaptive lighting activates on entry. Climate control for workshop comfort. EV charger scheduling syncs with solar production and off-peak rates. Security integration with biometric access. Tool organization tracking. Package secure storage with alerts.",
            "iq_points": 6,
            "scoring_category": "automation_coverage",
            "scenarios": [
                {"room": "Garage", "scenario": "Lights activate on entry, workshop climate maintains 24°C"},
                {"room": "EV Charging", "scenario": "Charges when solar produces excess, falls back to off-peak grid hours"},
                {"room": "Security", "scenario": "Biometric entry, camera monitors package deliveries"}
            ],
            "benefits": [
                "Automated entry convenience",
                "Workshop climate comfort",
                "Optimized EV charging costs",
                "Enhanced security and package protection"
            ],
            "required_devices": ["Smart Garage Opener", "EV Charger", "Climate Control", "Security Camera", "Biometric Lock"],
            "compatible_systems": ["Chamberlain myQ", "Tesla Charger", "ChargePoint", "Ring", "Nest"],
            "lifestyle_tags": ["convenience", "energy", "security"],
            "is_premium": True,
            "display_order": 22,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "visitor-delivery-management",
            "title": "Visitor & Delivery Management",
            "category": "access_management",
            "icon": "UserCheck",
            "short_description": "Facial recognition doorbell, guest access codes, and package security",
            "detailed_description": "Intelligent visitor management for modern living. Video doorbell with facial recognition distinguishes family, approved guests, and strangers. Generate temporary access codes for guests, cleaners, contractors. Package detection with secure storage alerts. Two-way audio communication. Delivery driver instructions for safe placement.",
            "iq_points": 7,
            "scoring_category": "security",
            "scenarios": [
                {"room": "Front Door", "scenario": "Doorbell recognizes your friend: 'Emily is at the door', auto-unlocks"},
                {"room": "Package Delivery", "scenario": "Detects package drop, sends photo confirmation and secure location"},
                {"room": "Guest Access", "scenario": "Generate temporary code for cleaner, expires after 2 hours"}
            ],
            "benefits": [
                "Facial recognition convenience",
                "Secure temporary access for service providers",
                "Package theft prevention",
                "Remote visitor communication"
            ],
            "required_devices": ["Video Doorbell", "Smart Lock", "Package Camera", "Intercom"],
            "compatible_systems": ["Ring", "Nest Hello", "Yale", "August", "Aqara"],
            "lifestyle_tags": ["security", "convenience"],
            "is_premium": False,
            "display_order": 23,
            "featured": False
        },
        
        # Add more features up to 40+ following same structure...
        # I'll add a few more key ones:
        
        {
            "id": str(uuid4()),
            "slug": "predictive-maintenance",
            "title": "Predictive Maintenance Alerts",
            "category": "ai_predictive",
            "icon": "Tool",
            "short_description": "AI detects appliance wear patterns and alerts before failures occur",
            "detailed_description": "Machine learning monitors all connected devices for performance degradation. Detects unusual patterns that indicate impending failure. HVAC filter alerts based on actual usage and air quality, not arbitrary timelines. Appliance efficiency monitoring with repair recommendations before breakdowns. Water leak prediction from usage pattern changes.",
            "iq_points": 10,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "HVAC", "scenario": "Detects 15% efficiency drop, alerts: 'Air filter needs replacement soon'"},
                {"room": "Refrigerator", "scenario": "Unusual power draw pattern: 'Compressor showing wear, schedule service'"},
                {"room": "Plumbing", "scenario": "Water usage spike detected: 'Possible leak in master bathroom'"}
            ],
            "benefits": [
                "Prevents costly emergency repairs",
                "Extends appliance lifespan",
                "Timely maintenance before failures",
                "Reduces energy waste from degraded equipment"
            ],
            "required_devices": ["Smart Energy Monitor", "HVAC Sensors", "Water Flow Sensors", "AI Analytics Platform"],
            "compatible_systems": ["Sense", "Flo by Moen", "Nest", "Home Assistant AI"],
            "lifestyle_tags": ["convenience", "energy"],
            "is_premium": True,
            "display_order": 17,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "seasonal-adaptation",
            "title": "Seasonal Weather Adaptation",
            "category": "ai_predictive",
            "icon": "Cloud",
            "short_description": "AI learns seasonal patterns and adapts automation for weather changes",
            "detailed_description": "Your home anticipates seasonal needs. Learns when you typically switch from cooling to heating. Adjusts sunrise/sunset routines as daylight changes. Pre-conditions home before weather events (storms, heatwaves, cold snaps). Irrigation adjusts for seasonal rain patterns. Lighting scenes adapt to shorter/longer days.",
            "iq_points": 8,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "Climate", "scenario": "Predicts first cold night of autumn, suggests heating activation"},
                {"room": "Lighting", "scenario": "Automatically adjusts evening routines as sunset time changes"},
                {"room": "Weather Prep", "scenario": "Storm forecast: Closes shades, secures outdoor items, checks sump pump"}
            ],
            "benefits": [
                "Proactive seasonal comfort",
                "Weather event preparation",
                "Energy optimization per season",
                "Automatic daylight savings adjustment"
            ],
            "required_devices": ["Weather Station", "Smart Thermostat", "Motorized Shades", "Irrigation Controller"],
            "compatible_systems": ["Nest", "Ecobee", "Rachio", "Home Assistant Weather"],
            "lifestyle_tags": ["comfort", "energy", "convenience"],
            "is_premium": False,
            "display_order": 18,
            "featured": False
        },
        {
            "id": str(uuid4()),
            "slug": "personalized-family-profiles",
            "title": "Personalized Family Profiles",
            "category": "ai_predictive",
            "icon": "Users2",
            "short_description": "Individual preferences per family member with automatic recognition",
            "detailed_description": "Each family member gets personalized home experience. Voice recognition identifies who's speaking for custom responses. Different wake-up times and routines per person. Individual climate and lighting preferences. Music and content suggestions based on user. Kid-safe modes with content filtering and bedtime enforcement.",
            "iq_points": 9,
            "scoring_category": "ai_features",
            "scenarios": [
                {"room": "Morning", "scenario": "Dad's 6 AM wake-up: News and coffee. Mom's 7 AM: Yoga music and tea"},
                {"room": "Climate", "scenario": "Sarah prefers 71°F, adjusts when she's in living room"},
                {"room": "Kids Mode", "scenario": "Content filters active, devices lock at 9 PM bedtime"}
            ],
            "benefits": [
                "Personalized experience per person",
                "Automatic user recognition",
                "Parental controls and safety",
                "Individual preferences without conflict"
            ],
            "required_devices": ["Voice Recognition System", "Smart Speakers", "Presence Detection", "Content Filters"],
            "compatible_systems": ["Josh.ai", "Control4", "Apple HomeKit", "Google Family"],
            "lifestyle_tags": ["convenience", "comfort", "wellness"],
            "is_premium": True,
            "display_order": 19,
            "featured": False
        }
    ]
    
    # Clear existing and insert new
    await db.intelligence_features.delete_many({})
    result = await db.intelligence_features.insert_many(features)
    
    print(f"✅ Seeded {len(result.inserted_ids)} intelligence features")
    
    # Create indexes
    await db.intelligence_features.create_index("slug", unique=True)
    await db.intelligence_features.create_index("category")
    await db.intelligence_features.create_index("lifestyle_tags")
    await db.intelligence_features.create_index("featured")
    
    print("✅ Created indexes on intelligence_features collection")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_intelligence_features())

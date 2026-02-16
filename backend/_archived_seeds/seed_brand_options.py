"""
Brand & Product Selection Options
Allows customers to choose specific equipment brands with pricing adjustments
Updated: February 2026 - Expanded to 11 product categories
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from uuid import uuid4

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


async def seed_brand_options():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Brand selection options organized by product category
    brand_options = [
        # ===== AUDIO/SPEAKERS =====
        {
            "id": str(uuid4()),
            "category": "Audio System",
            "product_type": "Multi-Room Speakers",
            "description": "Choose your preferred speaker brand for whole-home audio",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "Sonos",
                    "model": "Sonos Era Series",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Easy setup and control",
                        "Excellent streaming quality",
                        "Wide ecosystem compatibility",
                        "Regular software updates"
                    ],
                    "recommended": True
                },
                {
                    "brand": "KEF",
                    "model": "KEF LSX II LT",
                    "price_adjustment": 8000,  # +8K AED
                    "features": [
                        "Audiophile-grade sound",
                        "Uni-Q driver technology",
                        "Premium build quality",
                        "High-resolution audio support"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Bowers & Wilkins",
                    "model": "Bowers & Wilkins Formation",
                    "price_adjustment": 12000,  # +12K AED
                    "features": [
                        "Studio-quality sound",
                        "Exceptional clarity and precision",
                        "Premium British engineering",
                        "True Sound philosophy"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== LIGHTING CONTROLS =====
        {
            "id": str(uuid4()),
            "category": "Lighting Control",
            "product_type": "Smart Lighting System",
            "description": "Select your lighting control platform",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "Savant",
                    "model": "Savant Lighting",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Premium smart home automation",
                        "Intuitive control interface",
                        "Seamless integration",
                        "Elegant design"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Qbus",
                    "model": "Qbus Home Automation",
                    "price_adjustment": 15000,  # +15K AED
                    "features": [
                        "Belgian engineering excellence",
                        "Complete home automation",
                        "Professional-grade platform",
                        "Advanced scene programming"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Tridonic",
                    "model": "Tridonic LED Control",
                    "price_adjustment": 10000,  # +10K AED
                    "features": [
                        "Intelligent LED drivers",
                        "Global lighting leader",
                        "Austrian precision",
                        "Advanced sensors"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== THERMOSTATS =====
        {
            "id": str(uuid4()),
            "category": "Climate Control",
            "product_type": "Smart Thermostat",
            "description": "Choose your climate control system",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "Ecobee",
                    "model": "Ecobee SmartThermostat",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Built-in voice control",
                        "Remote sensors included",
                        "Energy savings reports",
                        "Smart home integration"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Nest",
                    "model": "Nest Learning Thermostat",
                    "price_adjustment": 1500,  # +1.5K AED
                    "features": [
                        "Auto-learning capabilities",
                        "Premium design",
                        "Google ecosystem integration",
                        "Energy history tracking"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Honeywell",
                    "model": "Honeywell T10 Pro",
                    "price_adjustment": -1000,  # -1K AED (budget option)
                    "features": [
                        "Professional reliability",
                        "RedLINK wireless sensors",
                        "Contractor-trusted brand",
                        "Geofencing support"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== DOOR LOCKS =====
        {
            "id": str(uuid4()),
            "category": "Access Control",
            "product_type": "Smart Door Locks",
            "description": "Select your smart lock system",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "August",
                    "model": "August Wi-Fi Smart Lock",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Easy retrofit installation",
                        "Auto-unlock/lock",
                        "Guest access codes",
                        "Activity log"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Yale",
                    "model": "Yale Assure Lock 2",
                    "price_adjustment": 2500,  # +2.5K AED
                    "features": [
                        "Keypad + touchscreen",
                        "Premium build quality",
                        "Multiple access methods",
                        "Tamper alarm"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Schlage",
                    "model": "Schlage Encode Plus",
                    "price_adjustment": 2000,  # +2K AED
                    "features": [
                        "Built-in WiFi",
                        "Apple Home Key support",
                        "Grade 1 security rating",
                        "Alarm technology"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== SECURITY CAMERAS =====
        {
            "id": str(uuid4()),
            "category": "Security",
            "product_type": "Security Cameras",
            "description": "Choose your security camera system",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "UniFi Protect",
                    "model": "UniFi G4 Series",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "No subscription fees",
                        "Professional NVR system",
                        "4K video quality",
                        "Local storage"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Hikvision",
                    "model": "Hikvision ColorVu Series",
                    "price_adjustment": 5000,  # +5K AED
                    "features": [
                        "24/7 color night vision",
                        "AI-powered detection",
                        "Enterprise-grade reliability",
                        "Advanced analytics"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Arlo",
                    "model": "Arlo Ultra 2",
                    "price_adjustment": -2000,  # -2K AED (wireless option)
                    "features": [
                        "100% wire-free",
                        "4K HDR video",
                        "Color night vision",
                        "Cloud storage options"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== AV RECEIVERS/PROCESSORS =====
        {
            "id": str(uuid4()),
            "category": "Home Theater",
            "product_type": "AV Receiver/Processor",
            "description": "Select your home theater audio/video processor",
            "applies_to_tiers": ["enhanced", "highend", "standard", "premium"],
            "options": [
                {
                    "brand": "Rotel",
                    "model": "Rotel RAP-1580",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Exceptional musicality",
                        "Dolby Atmos & DTS:X",
                        "High-current amplification",
                        "Audiophile performance"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Anthem",
                    "model": "Anthem MRX 740",
                    "price_adjustment": 12000,  # +12K AED
                    "features": [
                        "Anthem Room Correction (ARC)",
                        "Reference-level audio",
                        "Premium components",
                        "Canadian precision engineering"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Marantz",
                    "model": "Marantz Cinema 50",
                    "price_adjustment": 8000,  # +8K AED
                    "features": [
                        "Legendary Marantz sound",
                        "IMAX Enhanced certified",
                        "Because Music Matters",
                        "Warm, musical presentation"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== PROJECTORS =====
        {
            "id": str(uuid4()),
            "category": "Home Theater",
            "product_type": "Home Theater Projector",
            "description": "Choose your cinema projector",
            "applies_to_tiers": ["enhanced", "highend", "premium"],
            "options": [
                {
                    "brand": "Epson",
                    "model": "Epson Pro Cinema LS12000",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "4K PRO-UHD with pixel shift",
                        "Laser light source",
                        "2700 lumens brightness",
                        "Professional-grade projection"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Sony",
                    "model": "Sony VPL-XW7000ES",
                    "price_adjustment": 35000,  # +35K AED
                    "features": [
                        "Native 4K SXRD panels",
                        "Laser light source",
                        "X1 processor for HDR",
                        "Reference cinema quality"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Awol Vision",
                    "model": "Awol Vision LTV-3500",
                    "price_adjustment": 22000,  # +22K AED
                    "features": [
                        "Ultra-short-throw laser",
                        "150-inch image from inches away",
                        "Next-gen home cinema",
                        "Vibrant colors, exceptional brightness"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== MOTORIZED SHADES =====
        {
            "id": str(uuid4()),
            "category": "Window Treatments",
            "product_type": "Motorized Window Shades",
            "description": "Select automated shade system",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "Qbus",
                    "model": "Qbus Shade Integration",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Seamless automation integration",
                        "Belgian engineering",
                        "Complete smart home control",
                        "Reliable operation"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Savant",
                    "model": "Savant Motorized Shades",
                    "price_adjustment": 18000,  # +18K AED
                    "features": [
                        "Premium automation",
                        "Whisper-quiet motors",
                        "Elegant control interface",
                        "Scene integration"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Lifesmart",
                    "model": "Lifesmart Curtain Motor",
                    "price_adjustment": -2000,  # -2K AED (budget option)
                    "features": [
                        "Affordable automation",
                        "Smart home compatible",
                        "Reliable performance",
                        "Easy installation"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== VIDEO DOORBELLS =====
        {
            "id": str(uuid4()),
            "category": "Access Control",
            "product_type": "Video Doorbell & Intercom",
            "description": "Choose your video doorbell system",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "Ring",
                    "model": "Ring Video Doorbell Pro 2",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "1536p HD video",
                        "3D motion detection",
                        "Alexa integration",
                        "Affordable cloud storage"
                    ],
                    "recommended": True
                },
                {
                    "brand": "2N",
                    "model": "2N IP Verso Intercom",
                    "price_adjustment": 8500,  # +8.5K AED
                    "features": [
                        "Professional grade",
                        "Full intercom system",
                        "Access control integration",
                        "Touchscreen display"
                    ],
                    "recommended": False
                },
                {
                    "brand": "DoorBird",
                    "model": "DoorBird D2101V",
                    "price_adjustment": 4500,  # +4.5K AED
                    "features": [
                        "IP video door station",
                        "HD wide-angle camera",
                        "Premium build quality",
                        "Multiple integrations"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== POOL & SPA AUTOMATION =====
        {
            "id": str(uuid4()),
            "category": "Outdoor Living",
            "product_type": "Pool & Spa Control",
            "description": "Automated pool and spa management",
            "applies_to_tiers": ["enhanced", "highend", "premium"],
            "options": [
                {
                    "brand": "Pentair",
                    "model": "Pentair ScreenLogic2",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Pool/spa temperature control",
                        "Pump and filter automation",
                        "Lighting control",
                        "Remote monitoring"
                    ],
                    "recommended": True
                },
                {
                    "brand": "Jandy",
                    "model": "Jandy iAquaLink",
                    "price_adjustment": 5000,  # +5K AED
                    "features": [
                        "Voice control compatible",
                        "Water chemistry monitoring",
                        "Energy management",
                        "Smart scheduling"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Hayward",
                    "model": "Hayward OmniLogic",
                    "price_adjustment": 4000,  # +4K AED
                    "features": [
                        "Touchscreen interface",
                        "Comprehensive automation",
                        "Multi-pool support",
                        "Professional features"
                    ],
                    "recommended": False
                }
            ]
        },
        
        # ===== GARAGE DOOR CONTROLLERS =====
        {
            "id": str(uuid4()),
            "category": "Access Control",
            "product_type": "Garage Door Automation",
            "description": "Smart garage door controller",
            "applies_to_tiers": ["essential", "enhanced", "highend", "basic", "standard", "premium"],
            "options": [
                {
                    "brand": "MyQ",
                    "model": "Chamberlain myQ Smart Hub",
                    "price_adjustment": 0,  # Base price
                    "features": [
                        "Smartphone control",
                        "Works with most openers",
                        "Easy installation",
                        "Smart home integration"
                    ],
                    "recommended": True
                },
                {
                    "brand": "LiftMaster",
                    "model": "LiftMaster 8500W Elite",
                    "price_adjustment": 6000,  # +6K AED
                    "features": [
                        "Wall-mount operator",
                        "Battery backup",
                        "Wi-Fi built-in",
                        "Ultra-quiet operation"
                    ],
                    "recommended": False
                },
                {
                    "brand": "Genie",
                    "model": "Genie Aladdin Connect",
                    "price_adjustment": 2500,  # +2.5K AED
                    "features": [
                        "Real-time monitoring",
                        "Voice control ready",
                        "Guest access codes",
                        "Activity alerts"
                    ],
                    "recommended": False
                }
            ]
        }
    ]
    
    # Insert all brand options
    await db.brand_options.delete_many({})  # Clear existing
    for option in brand_options:
        await db.brand_options.insert_one(option)
        print(f"✅ Created: {option['product_type']}")
    
    print(f"\n📊 Total brand option categories: {len(brand_options)}")
    print("💰 Total customization value range: AED -3K to +119K")
    print(f"🎯 Total brand choices: {sum(len(opt['options']) for opt in brand_options)}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_brand_options())

"""
Database seeding script for Brands and Product Categories
Populates MongoDB with initial content from lexalifestyle.com
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# ============= SEED DATA - BRANDS =============

BRANDS = [
    {
        "id": str(uuid.uuid4()),
        "slug": "bowers-wilkins",
        "name": "Bowers & Wilkins",
        "logo": "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=200&fit=crop&crop=center",
        "description": "Since 1966, Bowers & Wilkins has been at the forefront of high-performance audio innovation. Known for their exceptional clarity and precision, B&W speakers deliver studio-quality sound for the most discerning audiophiles.",
        "website": "https://www.bowerswilkins.com",
        "categories": ["Audio", "Home Cinema"],
        "featured": True,
        "country": "United Kingdom",
        "year_established": "1966",
        "tagline": "True Sound",
        "hero_image": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "sonos",
        "name": "Sonos",
        "logo": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=200&fit=crop",
        "description": "Sonos is the wireless home sound system that fills as many rooms as you want with crystal-clear sound. Stream via WiFi, control with your smartphone, and expand your system over time.",
        "website": "https://www.sonos.com",
        "categories": ["Audio", "Automation"],
        "featured": True,
        "country": "United States",
        "year_established": "2002",
        "tagline": "The Wireless HiFi System",
        "hero_image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "sony",
        "name": "Sony",
        "logo": "https://images.unsplash.com/photo-1625597217365-3f4f4a0f7f9a?w=400&h=200&fit=crop",
        "description": "A global leader in electronics and entertainment, Sony brings cutting-edge technology to home cinema with 4K/8K projectors, premium displays, and immersive audio solutions.",
        "website": "https://www.sony.com",
        "categories": ["Video", "Audio", "Home Cinema"],
        "featured": True,
        "country": "Japan",
        "year_established": "1946",
        "tagline": "BE MOVED",
        "hero_image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "epson",
        "name": "Epson",
        "logo": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=200&fit=crop",
        "description": "Epson is a world leader in projection technology, offering professional-grade home cinema projectors with exceptional brightness, color accuracy, and 4K enhancement.",
        "website": "https://www.epson.com",
        "categories": ["Video", "Home Cinema"],
        "featured": True,
        "country": "Japan",
        "year_established": "1942",
        "tagline": "Exceed Your Vision",
        "hero_image": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "kef",
        "name": "KEF",
        "logo": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=200&fit=crop",
        "description": "KEF is renowned for its innovative Uni-Q driver technology, delivering a more accurate three-dimensional sound image. Their speakers combine acoustic excellence with stunning design.",
        "website": "https://www.kef.com",
        "categories": ["Audio"],
        "featured": True,
        "country": "United Kingdom",
        "year_established": "1961",
        "tagline": "Innovative British Sound",
        "hero_image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "marantz",
        "name": "Marantz",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "For over 60 years, Marantz has been crafting premium AV receivers and amplifiers with exceptional musicality. Their philosophy: 'Because Music Matters.'",
        "website": "https://www.marantz.com",
        "categories": ["Audio", "Home Cinema"],
        "featured": False,
        "country": "United States",
        "year_established": "1953",
        "tagline": "Because Music Matters",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "savant",
        "name": "Savant",
        "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        "description": "Savant is the ultimate smart home and automation system, offering intuitive control of lighting, climate, entertainment, and security through a single, elegant interface.",
        "website": "https://www.savant.com",
        "categories": ["Automation", "Lighting"],
        "featured": True,
        "country": "United States",
        "year_established": "2005",
        "tagline": "Premium Smart Home Automation",
        "hero_image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "qbus",
        "name": "Qbus",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "Qbus is a premium home automation platform that integrates lighting, climate, security, and entertainment into one seamless smart home solution.",
        "website": "https://www.qbus.be",
        "categories": ["Automation", "Lighting", "Electrical"],
        "featured": True,
        "country": "Belgium",
        "year_established": "2004",
        "tagline": "Home Automation Perfected",
        "hero_image": "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "lifesmart",
        "name": "Lifesmart",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Lifesmart provides affordable, reliable smart home solutions including sensors, switches, and controllers that work seamlessly with major automation platforms.",
        "website": "https://www.ilifesmart.com",
        "categories": ["Automation", "Accessories"],
        "featured": False,
        "country": "China",
        "year_established": "2013",
        "tagline": "Smart Living Made Simple",
        "hero_image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "k-array",
        "name": "K-Array",
        "logo": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=200&fit=crop",
        "description": "K-Array specializes in unique, slim-profile speakers that deliver powerful audio performance while remaining virtually invisible in luxury interiors.",
        "website": "https://www.k-array.com",
        "categories": ["Audio"],
        "featured": False,
        "country": "Italy",
        "year_established": "1990",
        "tagline": "Unique Audio Solutions",
        "hero_image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "russound",
        "name": "Russound",
        "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        "description": "Russound is the leading manufacturer of multi-room audio systems, delivering high-quality sound throughout the home with easy integration and control.",
        "website": "https://www.russound.com",
        "categories": ["Audio", "Automation"],
        "featured": False,
        "country": "United States",
        "year_established": "1967",
        "tagline": "Sound Everywhere",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "leica",
        "name": "Leica",
        "logo": "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?w=400&h=200&fit=crop",
        "description": "Leica brings its legendary optical precision to home cinema with premium projectors that deliver unparalleled image quality and cinematic color accuracy.",
        "website": "https://www.leica-camera.com",
        "categories": ["Video"],
        "featured": False,
        "country": "Germany",
        "year_established": "1869",
        "tagline": "Das Wesentliche",
        "hero_image": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "tridonic",
        "name": "Tridonic",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "Tridonic is a global leader in lighting technology, providing intelligent drivers, modules, and sensors for advanced LED lighting control systems.",
        "website": "https://www.tridonic.com",
        "categories": ["Lighting", "Electrical"],
        "featured": False,
        "country": "Austria",
        "year_established": "1946",
        "tagline": "Light for Life",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "lumitronix",
        "name": "Lumitronix",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Lumitronix offers innovative LED lighting solutions for professional and residential applications, combining energy efficiency with stunning visual effects.",
        "website": "https://www.lumitronix.com",
        "categories": ["Lighting"],
        "featured": False,
        "country": "Germany",
        "year_established": "2008",
        "tagline": "Brilliant LED Solutions",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "awol-vision",
        "name": "Awol Vision",
        "logo": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=200&fit=crop",
        "description": "Awol Vision pioneers ultra-short-throw laser projectors, delivering massive 4K images from just inches away with vibrant colors and exceptional brightness.",
        "website": "https://www.awolvision.com",
        "categories": ["Video", "Home Cinema"],
        "featured": False,
        "country": "United States",
        "year_established": "2020",
        "tagline": "Next-Gen Home Cinema",
        "hero_image": "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "anthem",
        "name": "Anthem",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "Anthem produces award-winning AV receivers and processors with Anthem Room Correction (ARC) technology for the ultimate home theater audio experience.",
        "website": "https://www.anthemav.com",
        "categories": ["Audio", "Home Cinema"],
        "featured": False,
        "country": "Canada",
        "year_established": "1971",
        "tagline": "Performance. Precision. Innovation.",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "aavik",
        "name": "Aavik",
        "logo": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=200&fit=crop",
        "description": "Aavik creates ultra-high-end audio electronics with innovative resonance control and noise reduction, delivering pure, uncolored sound reproduction.",
        "website": "https://www.aavik-acoustics.com",
        "categories": ["Audio"],
        "featured": False,
        "country": "Denmark",
        "year_established": "2016",
        "tagline": "Scandinavian Purity",
        "hero_image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "borresen",
        "name": "Børresen Acoustics",
        "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        "description": "Børresen creates ultra-high-performance loudspeakers with revolutionary driver technology and meticulous Danish craftsmanship for the ultimate listening experience.",
        "website": "https://www.borresen.dk",
        "categories": ["Audio"],
        "featured": False,
        "country": "Denmark",
        "year_established": "2017",
        "tagline": "Ultimate Fidelity",
        "hero_image": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "ansuz",
        "name": "Ansuz Acoustics",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "Ansuz specializes in high-end cables, power distributors, and resonance control devices that eliminate noise and enhance audio system performance.",
        "website": "https://www.ansuz-acoustics.com",
        "categories": ["Accessories", "Audio"],
        "featured": False,
        "country": "Denmark",
        "year_established": "2012",
        "tagline": "Noise Elimination Technology",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "artesania-audio",
        "name": "Artesania Audio",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Artesania Audio manufactures premium audio furniture and isolation platforms that combine stunning design with vibration control for optimal sound quality.",
        "website": "https://www.artesaniaaudio.com",
        "categories": ["Furniture", "Accessories"],
        "featured": False,
        "country": "Spain",
        "year_established": "1996",
        "tagline": "The Art of Sound",
        "hero_image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "chamsys",
        "name": "ChamSys",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "ChamSys provides professional lighting control consoles and software for architectural and entertainment applications, offering powerful yet intuitive control.",
        "website": "https://www.chamsyslighting.com",
        "categories": ["Lighting"],
        "featured": False,
        "country": "United Kingdom",
        "year_established": "2003",
        "tagline": "Control Your Light",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "e-electron",
        "name": "E-electron",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "E-electron designs and manufactures intelligent electrical solutions for modern smart homes, including switches, dimmers, and control interfaces.",
        "website": "https://www.e-electron.com",
        "categories": ["Electrical", "Automation"],
        "featured": False,
        "country": "India",
        "year_established": "2010",
        "tagline": "Intelligent Electrical Solutions",
        "hero_image": "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "axxess",
        "name": "Axxess",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Axxess manufactures innovative integration interfaces that enable seamless connectivity between aftermarket and factory systems in audio/video installations.",
        "website": "https://www.axxessinterfaces.com",
        "categories": ["Accessories"],
        "featured": False,
        "country": "United States",
        "year_established": "2003",
        "tagline": "Integration Simplified",
        "hero_image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "nakymatone",
        "name": "Nakymatone",
        "logo": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=200&fit=crop",
        "description": "Nakymatone creates premium acoustic treatment panels and bass traps that optimize room acoustics for the perfect listening and cinema environment.",
        "website": "https://www.nakymatone.com",
        "categories": ["Accessories", "Home Cinema"],
        "featured": False,
        "country": "Japan",
        "year_established": "1994",
        "tagline": "Perfect Acoustics",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "rotel",
        "name": "Rotel",
        "logo": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=200&fit=crop",
        "description": "For over 60 years, Rotel has been designing and manufacturing high-quality audio components that deliver exceptional value and musicality.",
        "website": "https://www.rotel.com",
        "categories": ["Audio"],
        "featured": False,
        "country": "Japan",
        "year_established": "1961",
        "tagline": "Real Hi-Fi",
        "hero_image": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "lumibright",
        "name": "Lumibright",
        "logo": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=200&fit=crop",
        "description": "Lumibright specializes in architectural LED lighting systems with advanced color-changing capabilities and seamless integration with home automation.",
        "website": "https://www.lumibright.com",
        "categories": ["Lighting"],
        "featured": False,
        "country": "United Arab Emirates",
        "year_established": "2015",
        "tagline": "Illuminating Innovation",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "near",
        "name": "NEAR",
        "logo": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=200&fit=crop",
        "description": "NEAR designs custom speakers and sound systems for luxury residential and commercial spaces, combining audiophile-grade performance with bespoke aesthetics.",
        "website": "https://www.near.com",
        "categories": ["Audio", "Home Cinema"],
        "featured": False,
        "country": "United States",
        "year_established": "2005",
        "tagline": "Custom Audio Excellence",
        "hero_image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "magna",
        "name": "Magna",
        "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        "description": "Magna delivers motorized window shades and blinds with whisper-quiet operation and seamless smart home integration for ultimate comfort and privacy.",
        "website": "https://www.magna-shades.com",
        "categories": ["Automation"],
        "featured": False,
        "country": "Netherlands",
        "year_established": "2008",
        "tagline": "Automated Elegance",
        "hero_image": "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "milan",
        "name": "Milan",
        "logo": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=200&fit=crop",
        "description": "Milan creates architectural lighting fixtures that blend Italian design with cutting-edge LED technology for stunning, energy-efficient illumination.",
        "website": "https://www.milan-lighting.com",
        "categories": ["Lighting"],
        "featured": False,
        "country": "Italy",
        "year_established": "1975",
        "tagline": "Italian Lighting Artistry",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "brightluxx",
        "name": "Brightluxx",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Brightluxx provides innovative LED lighting solutions with tunable white technology and RGBW color mixing for dynamic, personalized lighting experiences.",
        "website": "https://www.brightluxx.com",
        "categories": ["Lighting"],
        "featured": False,
        "country": "United States",
        "year_established": "2018",
        "tagline": "Dynamic Lighting Solutions",
        "hero_image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "valerion",
        "name": "Valerion",
        "logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        "description": "Valerion specializes in high-end home automation controllers and touch panels with intuitive interfaces and seamless multi-system integration.",
        "website": "https://www.valerion.com",
        "categories": ["Automation"],
        "featured": False,
        "country": "Germany",
        "year_established": "2012",
        "tagline": "Premium Control Systems",
        "hero_image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=600&fit=crop"
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "lexa-lifestyle",
        "name": "Lexa Lifestyle",
        "logo": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=400&h=200&fit=crop",
        "description": "Lexa Lifestyle is your trusted partner in creating luxury smart homes. We design, integrate, and deliver complete automation solutions tailored to your lifestyle.",
        "website": "https://www.lexalifestyle.com",
        "categories": ["Automation", "Home Cinema", "Lighting", "Audio", "Video"],
        "featured": True,
        "country": "United Arab Emirates",
        "year_established": "2005",
        "tagline": "Where Smart Living Meets Timeless Luxury",
        "hero_image": "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=600&fit=crop"
    }
]

# ============= SEED DATA - PRODUCT CATEGORIES =============

PRODUCT_CATEGORIES = [
    {
        "id": str(uuid.uuid4()),
        "slug": "audio-systems",
        "name": "Audio Systems",
        "description": "Explore the heart of sound with our premium audio collection. From high-fidelity speakers to multi-room audio distribution, experience music as the artist intended with brands like Bowers & Wilkins, KEF, and Sonos.",
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop",
        "icon": "🔊",
        "brands": ["Bowers & Wilkins", "KEF", "Sonos", "Marantz", "Russound", "K-Array", "Aavik", "Børresen Acoustics", "Anthem", "Rotel", "NEAR"],
        "related_solutions": ["home-theater", "audio-distribution"],
        "specifications": [
            "Multi-room audio distribution",
            "High-resolution streaming support",
            "Dolby Atmos & DTS:X compatibility",
            "Wireless & wired connectivity",
            "Voice control integration",
            "Custom acoustic calibration"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "home-cinema",
        "name": "Home Cinema",
        "description": "Turn your living space into a world-class entertainment hub with our home cinema solutions. Premium projectors, immersive audio systems, and automated control deliver the ultimate cinematic experience.",
        "image": "https://images.unsplash.com/photo-1743685889437-210ad44b6c5f?w=1200&h=600&fit=crop",
        "icon": "🎬",
        "brands": ["Sony", "Epson", "Awol Vision", "Leica", "Bowers & Wilkins", "Marantz", "Anthem", "NEAR", "Nakymatone"],
        "related_solutions": ["home-theater"],
        "specifications": [
            "4K/8K laser projection",
            "Dolby Atmos 7.2.4 surround sound",
            "Acoustic treatment & soundproofing",
            "Automated lighting control",
            "Smart seating with recliners",
            "Universal remote integration",
            "Streaming & media server setup"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "lighting",
        "name": "Lighting",
        "description": "Enhance your smart living experience with our advanced lighting solutions. Create the perfect ambiance for every moment with programmable scenes, circadian rhythm sync, and energy-efficient LED technology.",
        "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=600&fit=crop",
        "icon": "💡",
        "brands": ["Qbus", "Tridonic", "Lumitronix", "ChamSys", "Lumibright", "Milan", "Brightluxx", "Savant"],
        "related_solutions": ["lighting-automation"],
        "specifications": [
            "Wireless KNX/DALI control",
            "Programmable lighting scenes",
            "Circadian rhythm synchronization",
            "Motion & occupancy sensing",
            "Tunable white & RGBW color mixing",
            "Energy monitoring",
            "Voice control integration"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "automation",
        "name": "Automation",
        "description": "Simplify your lifestyle with our smart automation systems. Control lighting, climate, security, entertainment, and more through a single, intuitive interface. Experience true smart home living.",
        "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=600&fit=crop",
        "icon": "🏠",
        "brands": ["Savant", "Qbus", "Lifesmart", "Valerion", "E-electron", "Russound", "Magna", "Sonos"],
        "related_solutions": ["lighting-automation", "climate-control", "security"],
        "specifications": [
            "Centralized system control",
            "Scene automation & scheduling",
            "Voice assistant integration",
            "Mobile app control",
            "Geofencing & presence detection",
            "Energy management",
            "Third-party device integration"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "video-solutions",
        "name": "Video Solutions",
        "description": "Bring visuals to life with our advanced video solutions for home cinema and displays. From 4K/8K projectors to ultra-short-throw lasers, experience stunning image quality.",
        "image": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
        "icon": "📺",
        "brands": ["Sony", "Epson", "Awol Vision", "Leica"],
        "related_solutions": ["home-theater"],
        "specifications": [
            "4K/8K resolution support",
            "HDR (HDR10, Dolby Vision)",
            "Ultra-short-throw technology",
            "Laser light source",
            "High brightness (3000+ lumens)",
            "Wide color gamut",
            "Lens shift & keystone correction"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "electrical-solutions",
        "name": "Electrical Solutions",
        "description": "Our electrical solutions are designed to power and control modern lighting and automation systems with precision, reliability, and seamless smart home integration.",
        "image": "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=600&fit=crop",
        "icon": "⚡",
        "brands": ["Qbus", "Tridonic", "E-electron"],
        "related_solutions": ["lighting-automation"],
        "specifications": [
            "Smart switches & dimmers",
            "LED drivers & controllers",
            "Power management systems",
            "Intelligent electrical panels",
            "Wireless communication modules",
            "Energy monitoring",
            "Overcurrent & surge protection"
        ],
        "featured": True
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "accessories",
        "name": "Accessories",
        "description": "Our accessories range is dedicated to high-performance connections, vibration control, acoustic treatment, and integration interfaces that optimize your entire audio-visual system.",
        "image": "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?w=1200&h=600&fit=crop",
        "icon": "🔌",
        "brands": ["Ansuz Acoustics", "Artesania Audio", "Axxess", "Nakymatone", "Lifesmart"],
        "related_solutions": [],
        "specifications": [
            "Premium audio/video cables",
            "Power distributors & conditioners",
            "Vibration isolation platforms",
            "Acoustic treatment panels",
            "Bass traps & diffusers",
            "Integration interfaces",
            "Custom mounting solutions"
        ],
        "featured": False
    },
    {
        "id": str(uuid.uuid4()),
        "slug": "furniture",
        "name": "Furniture",
        "description": "Experience comfort and luxury with our premium home theater recliners and audio furniture, designed for ultimate relaxation while enjoying your entertainment system.",
        "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&h=600&fit=crop",
        "icon": "🛋️",
        "brands": ["Artesania Audio"],
        "related_solutions": ["home-theater"],
        "specifications": [
            "Power reclining seats",
            "Built-in USB charging",
            "LED cup holders",
            "Premium leather upholstery",
            "Acoustic-friendly designs",
            "Custom configurations",
            "Audio equipment racks & stands"
        ],
        "featured": False
    }
]

async def seed_database():
    """Seed the database with brands and product categories"""
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        print("🌱 Starting database seeding for Brands and Products...")
        
        # Clear existing data
        await db.brands.delete_many({})
        await db.product_categories.delete_many({})
        print("✅ Cleared existing brands and products")
        
        # Insert brands
        if BRANDS:
            await db.brands.insert_many(BRANDS)
            print(f"✅ Seeded {len(BRANDS)} brands")
        
        # Insert product categories
        if PRODUCT_CATEGORIES:
            await db.product_categories.insert_many(PRODUCT_CATEGORIES)
            print(f"✅ Seeded {len(PRODUCT_CATEGORIES)} product categories")
        
        print("🎉 Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())

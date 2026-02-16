import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

projects = [
    {
        "id": "rooftop-lounge-dubai",
        "slug": "rooftop-lounge-dubai",
        "title": "Rooftop Lounge",
        "location": "Dubai Marina",
        "type": "Commercial",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "systems": ["Outdoor Audio", "Lighting Control", "Climate Control"],
        "description": "Luxury rooftop entertainment space with integrated AV systems"
    },
    {
        "id": "elegant-workspace",
        "slug": "elegant-workspace",
        "title": "Elegant Workspace",
        "location": "Business Bay",
        "type": "Commercial",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "systems": ["Video Conferencing", "Lighting", "Automation"],
        "description": "Modern office automation with seamless control"
    },
    {
        "id": "urban-penthouse",
        "slug": "urban-penthouse",
        "title": "Urban Penthouse",
        "location": "Downtown Dubai",
        "type": "Residential",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "systems": ["Whole Home Automation", "Security", "Entertainment"],
        "description": "Complete smart home integration in luxury penthouse"
    },
    {
        "id": "classic-living-room",
        "slug": "classic-living-room",
        "title": "Classic Living Room",
        "location": "Palm Jumeirah",
        "type": "Residential",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop",
        "systems": ["Lighting Control", "Audio", "Shading"],
        "description": "Elegant living space with sophisticated automation"
    },
    {
        "id": "luxury-dining",
        "slug": "luxury-dining",
        "title": "Luxury Dining Area",
        "location": "Emirates Hills",
        "type": "Residential",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&h=600&fit=crop",
        "systems": ["Lighting Scenes", "Audio", "Climate Control"],
        "description": "Dining experience enhanced by smart technology"
    },
    {
        "id": "private-cinema",
        "slug": "private-cinema",
        "title": "Private Home Theatre",
        "location": "Arabian Ranches",
        "type": "Residential",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1635942181459-9f9878353df7?w=800&h=600&fit=crop",
        "systems": ["Home Cinema", "Acoustic Treatment", "Seating", "Lighting"],
        "description": "Dolby Atmos cinema with bespoke design"
    },
    {
        "id": "minimalist-hallway",
        "slug": "minimalist-hallway",
        "title": "Minimalist Hallway",
        "location": "Dubai Marina",
        "type": "Residential",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
        "systems": ["Smart Lighting", "Access Control"],
        "description": "Clean design with invisible technology"
    },
    {
        "id": "smart-kitchen",
        "slug": "smart-kitchen",
        "title": "Smart Kitchen Setup",
        "location": "JBR",
        "type": "Residential",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
        "systems": ["Lighting", "Appliance Control", "Voice Assistant"],
        "description": "Modern kitchen with intelligent controls"
    },
    {
        "id": "outdoor-lounge",
        "slug": "outdoor-lounge",
        "title": "Outdoor Lounge",
        "location": "Palm Jumeirah",
        "type": "Residential",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
        "systems": ["Outdoor Audio", "Landscape Lighting", "Weather Control"],
        "description": "Outdoor entertainment with weather-resistant systems"
    },
    {
        "id": "smart-office",
        "slug": "smart-office",
        "title": "Smart Office Setup",
        "location": "DIFC",
        "type": "Commercial",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
        "systems": ["Conference Systems", "Digital Signage", "Access Control"],
        "description": "Corporate office with integrated technology"
    },
    {
        "id": "modern-interior",
        "slug": "modern-interior",
        "title": "Modern Interior Design",
        "location": "City Walk",
        "type": "Residential",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop",
        "systems": ["Lighting Design", "Automation", "Entertainment"],
        "description": "Contemporary design meets smart technology"
    },
    {
        "id": "luxury-villa",
        "slug": "luxury-villa",
        "title": "Luxury Villa Project",
        "location": "Emirates Hills",
        "type": "Villa",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "systems": ["Whole Villa Automation", "Security", "Cinema", "Multi-Room Audio"],
        "description": "Complete villa automation with premium systems"
    }
]

async def seed_projects():
    print("Seeding projects...")
    
    # Seed more projects (don't delete existing)
    existing_count = await db.projects.count_documents({})
    print(f"Existing projects: {existing_count}")
    
    # Insert new projects
    for project in projects:
        existing = await db.projects.find_one({"id": project["id"]})
        if not existing:
            await db.projects.insert_one(project)
            print(f"Added: {project['title']}")
    
    total = await db.projects.count_documents({})
    print(f"Total projects now: {total}")
    print("Project seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_projects())

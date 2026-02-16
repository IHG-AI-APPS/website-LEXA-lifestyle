"""
Script to update existing projects with sample gallery images and enhanced data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

# Sample high-quality images from Unsplash (luxury smart homes)
SAMPLE_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",  # Modern luxury home
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",  # Smart home interior
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",  # Luxury living room
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",  # Modern kitchen
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",  # Home theater
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",  # Luxury bedroom
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",  # Smart lighting
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68",  # Outdoor living
]

SAMPLE_BRANDS = [
    {"name": "Control4", "category": "Home Automation"},
    {"name": "Lutron", "category": "Lighting Control"},
    {"name": "Sony", "category": "Audio/Visual"},
    {"name": "Sonos", "category": "Multi-room Audio"},
    {"name": "Nest", "category": "Climate Control"},
]

SAMPLE_PRODUCTS = [
    {"name": "Control4 EA-5 Controller", "category": "Automation", "brand": "Control4"},
    {"name": "Lutron Homeworks QS", "category": "Lighting", "brand": "Lutron"},
    {"name": "Sony 4K Projector", "category": "Video", "brand": "Sony"},
    {"name": "Sonos Amp", "category": "Audio", "brand": "Sonos"},
    {"name": "Nest Learning Thermostat", "category": "Climate", "brand": "Nest"},
]

async def update_projects():
    # Connect to MongoDB
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'lexalifestyle')
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print(f"🔄 Updating projects in database: {db_name}")
    
    # Get all projects
    projects = await db.projects.find({}, {"_id": 0}).to_list(100)
    
    print(f"Found {len(projects)} projects")
    
    for i, project in enumerate(projects):
        project_id = project.get('id')
        
        # Prepare update data
        update_data = {
            "updated_at": datetime.now(timezone.utc),
            "published": True
        }
        
        # Add main image if missing
        if not project.get('image'):
            update_data['image'] = SAMPLE_IMAGES[0]
        
        # Add gallery images (5-8 images per project)
        if not project.get('images') or len(project.get('images', [])) == 0:
            num_images = 6
            update_data['images'] = SAMPLE_IMAGES[:num_images]
        
        # Add sample brands if missing
        if not project.get('brands') or len(project.get('brands', [])) == 0:
            update_data['brands'] = SAMPLE_BRANDS[:4]
        
        # Add sample products if missing
        if not project.get('products') or len(project.get('products', [])) == 0:
            update_data['products'] = SAMPLE_PRODUCTS
        
        # Add category if missing
        if not project.get('category'):
            update_data['category'] = project.get('type', 'Residential')
        
        # Add SEO metadata if missing
        if not project.get('meta_title'):
            update_data['meta_title'] = f"{project.get('title')} | Smart Home Project in {project.get('location')}"
        
        if not project.get('meta_description'):
            update_data['meta_description'] = f"{project.get('description', '')[:150]}..."
        
        # Update project
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            print(f"✅ Updated: {project.get('title')}")
        else:
            print(f"⏭️  Skipped: {project.get('title')} (already updated)")
    
    print(f"\n🎉 Successfully updated {len(projects)} projects!")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_projects())

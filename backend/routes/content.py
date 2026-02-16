"""
Public content routes (solutions, services, articles, projects, testimonials)
"""
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from models.content import Solution, Service, Project, Testimonial, Article
from utils.cache import cache
import os
import logging

router = APIRouter(prefix="/api", tags=["content"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


@router.get("/solutions", response_model=List[Solution])
async def get_solutions(featured: Optional[bool] = None):
    """Get all solutions, optionally filtered by featured status"""
    try:
        query = {}
        if featured is not None:
            query["featured"] = featured
        
        solutions = await db.solutions.find(query, {"_id": 0}).to_list(1000)
        return solutions
    except Exception as e:
        logger.error(f"Solutions error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch solutions")


@router.get("/solutions/mega-menu")
async def get_solutions_mega_menu():
    """Get solutions organized for mega menu display"""
    try:
        # Get featured solutions
        solutions = await db.solutions.find(
            {"featured": True},
            {"_id": 0, "slug": 1, "title": 1, "description": 1, "category": 1, "badge": 1, 
             "mega_menu_category": 1, "mega_menu_order": 1}
        ).to_list(100)
        
        # Organize by category
        categories = {
            "residential": [],
            "commercial": [],
            "specialized": []
        }
        
        for solution in solutions:
            cat = solution.get("mega_menu_category", "residential")
            if cat in categories:
                categories[cat].append(solution)
        
        # Sort by order
        for cat in categories:
            categories[cat].sort(key=lambda x: x.get("mega_menu_order", 99))
        
        return {
            "categories": categories,
            "featured_solution": solutions[0] if solutions else None
        }
    except Exception as e:
        logger.error(f"Mega menu error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch mega menu data")


@router.get("/solutions/{slug}", response_model=Solution)
async def get_solution(slug: str):
    """Get solution by slug"""
    try:
        solution = await db.solutions.find_one({"slug": slug}, {"_id": 0})
        if not solution:
            raise HTTPException(status_code=404, detail="Solution not found")
        return solution
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Solution error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch solution")


@router.get("/services")
async def get_services():
    """Get all services from database (dynamic)"""
    try:
        # Fetch all active services from database
        services = await db.services.find(
            {"active": {"$ne": False}},  # Only active services
            {"_id": 0}
        ).sort([("priority", 1), ("order", 1)]).to_list(100)
        
        # Map fields for frontend compatibility
        mapped_services = []
        for s in services:
            mapped_services.append({
                "id": s.get("id", s.get("slug", "")),
                "slug": s.get("slug", s.get("id", "")),
                "title": s.get("title", s.get("name", "")),
                "name": s.get("title", s.get("name", "")),
                "category": s.get("category", ""),
                "description": s.get("short_description", s.get("description", "")),
                "features": s.get("key_features", s.get("features", [])),
                "icon": s.get("icon", ""),
                "featured": s.get("featured", False),
                "order": s.get("order", s.get("priority", 100))
            })
        
        return mapped_services
    except Exception as e:
        logger.error(f"Services error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")

@router.get("/services/{service_slug}")
async def get_service_by_slug(service_slug: str):
    """Get a single service by slug"""
    try:
        service = await db.services.find_one({"slug": service_slug}, {"_id": 0})
        if not service:
            raise HTTPException(status_code=404, detail=f"Service '{service_slug}' not found")
        return service
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Service fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch service")


@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
        return projects
    except Exception as e:
        logger.error(f"Projects error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")


@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Get project by ID or slug - returns raw dict for flexibility"""
    try:
        project = await db.projects.find_one(
            {"$or": [{"id": project_id}, {"slug": project_id}]},
            {"_id": 0}
        )
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Backwards compatibility: map gallery to images
        if "gallery" in project and not project.get("images"):
            project["images"] = project["gallery"]
        
        # Ensure image field exists
        if not project.get("image") and project.get("images"):
            project["image"] = project["images"][0]
        
        return project
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Project error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch project")


@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all testimonials"""
    try:
        testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
        return testimonials
    except Exception as e:
        logger.error(f"Testimonials error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")


@router.get("/articles")
async def get_articles(category: Optional[str] = None, limit: Optional[int] = None):
    """Get all articles (dynamic, no cache)"""
    try:
        query = {"status": {"$ne": "draft"}}  # Only published articles
        if category:
            query["category"] = category
        
        cursor = db.articles.find(query, {"_id": 0}).sort([("published_date", -1)])
        if limit:
            cursor = cursor.limit(limit)
        
        articles = await cursor.to_list(1000)
        return articles
    except Exception as e:
        logger.error(f"Articles error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch articles")


@router.get("/specialty-rooms")
async def get_specialty_rooms():
    """Get all specialty rooms (dynamic, no cache)"""
    try:
        rooms = await db.specialty_rooms.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return rooms
    except Exception as e:
        logger.error(f"Specialty rooms error: {str(e)}")


@router.get("/videos")
async def get_videos():
    """Get all videos (dynamic, no cache)"""
    try:
        videos = await db.videos.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return videos
    except Exception as e:
        logger.error(f"Videos error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch videos")

        raise HTTPException(status_code=500, detail="Failed to fetch specialty rooms")



@router.get("/articles/{slug}")
async def get_article(slug: str):
    """Get article by slug"""
    try:
        article = await db.articles.find_one({"slug": slug}, {"_id": 0})
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return article
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Article error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch article")


@router.get("/articles/categories/list")
async def get_article_categories():
    """Get all article categories"""
    try:
        categories = await db.articles.distinct("category")
        return {"categories": categories}
    except Exception as e:
        logger.error(f"Categories error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch categories")


@router.get("/settings")
async def get_settings():
    """Get site settings (with caching)"""
    try:
        cache_key = "settings:site_settings"
        cached_settings = await cache.get(cache_key)
        if cached_settings is not None:
            return cached_settings
        
        settings = await db.settings.find_one({"key": "site_settings"}, {"_id": 0})
        if not settings:
            settings = {
                "hero_title": "LUXURY SMART LIVING",
                "hero_subtitle": "Designed & Delivered End-to-End",
                "brands_count": 50,
                "years_experience": 20,
                "projects_count": 1000,
                "experience_center_size": 60000
            }
        
        await cache.set(cache_key, settings, ttl_seconds=1800)
        return settings
    except Exception as e:
        logger.error(f"Settings error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch settings")

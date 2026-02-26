"""
Admin routes for additional content: testimonials, blog, news, videos, packages, rooms, categories
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from datetime import datetime, timezone
from uuid import uuid4
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from .admin_auth import verify_token

router = APIRouter(prefix="/api/admin", tags=["admin-extended-content"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


# ===== TESTIMONIALS =====

@router.get("/testimonials")
async def get_testimonials(token: dict = Depends(verify_token)):
    """Get all testimonials"""
    try:
        testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
        return {"testimonials": testimonials, "total": len(testimonials)}
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")


@router.post("/testimonials")
async def create_testimonial(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new testimonial"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.testimonials.insert_one(data)
        logger.info(f"Admin {token.get('username')} created testimonial: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create testimonial")


@router.put("/testimonials/{testimonial_id}")
async def update_testimonial(testimonial_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update testimonial"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        logger.info(f"Admin {token.get('username')} updated testimonial: {testimonial_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update testimonial")


@router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, token: dict = Depends(verify_token)):
    """Delete testimonial"""
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        logger.info(f"Admin {token.get('username')} deleted testimonial: {testimonial_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete testimonial")


@router.patch("/testimonials/{testimonial_id}")
async def patch_testimonial(testimonial_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update testimonial (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return {"success": True, "message": "Testimonial patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch testimonial")


# ===== BLOG =====

@router.get("/blog")
async def get_blog_posts(token: dict = Depends(verify_token)):
    """Get all blog posts"""
    try:
        posts = await db.blog.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
        return {"posts": posts, "total": len(posts)}
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")


@router.post("/blog")
async def create_blog_post(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new blog post"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        data["updated_at"] = datetime.now(timezone.utc)
        await db.blog.insert_one(data)
        logger.info(f"Admin {token.get('username')} created blog post: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")


@router.put("/blog/{post_id}")
async def update_blog_post(post_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update blog post"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.blog.update_one({"id": post_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        logger.info(f"Admin {token.get('username')} updated blog post: {post_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update blog post")


@router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, token: dict = Depends(verify_token)):
    """Delete blog post"""
    try:
        result = await db.blog.delete_one({"id": post_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        logger.info(f"Admin {token.get('username')} deleted blog post: {post_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete blog post")


@router.patch("/blog/{post_id}")
async def patch_blog_post(post_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update blog post (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.blog.update_one({"id": post_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return {"success": True, "message": "Blog post patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch blog post")


# ===== NEWS =====

@router.get("/news")
async def get_news(token: dict = Depends(verify_token)):
    """Get all news items"""
    try:
        news = await db.news.find({}, {"_id": 0}).sort("date", -1).to_list(200)
        return {"news": news, "total": len(news)}
    except Exception as e:
        logger.error(f"Error fetching news: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")


@router.post("/news")
async def create_news(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new news item"""
    try:
        # Preserve passed-in ID if provided, otherwise generate new UUID
        if not data.get("id"):
            data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.news.insert_one(data)
        logger.info(f"Admin {token.get('username')} created news: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating news: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create news")


@router.put("/news/{news_id}")
async def update_news(news_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update news item"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.news.update_one({"id": news_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News not found")
        logger.info(f"Admin {token.get('username')} updated news: {news_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating news: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update news")


@router.delete("/news/{news_id}")
async def delete_news(news_id: str, token: dict = Depends(verify_token)):
    """Delete news item"""
    try:
        result = await db.news.delete_one({"id": news_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="News not found")
        logger.info(f"Admin {token.get('username')} deleted news: {news_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting news: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete news")


# ===== VIDEOS =====

@router.get("/videos")
async def get_videos(token: dict = Depends(verify_token)):
    """Get all videos"""
    try:
        videos = await db.videos.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
        return {"videos": videos, "total": len(videos)}
    except Exception as e:
        logger.error(f"Error fetching videos: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch videos")


@router.post("/videos")
async def create_video(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new video"""
    try:
        # Preserve passed-in ID if provided, otherwise generate new UUID
        if not data.get("id"):
            data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.videos.insert_one(data)
        logger.info(f"Admin {token.get('username')} created video: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating video: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create video")


@router.put("/videos/{video_id}")
async def update_video(video_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update video"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.videos.update_one({"id": video_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        logger.info(f"Admin {token.get('username')} updated video: {video_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating video: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update video")


@router.delete("/videos/{video_id}")
async def delete_video(video_id: str, token: dict = Depends(verify_token)):
    """Delete video"""
    try:
        result = await db.videos.delete_one({"id": video_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        logger.info(f"Admin {token.get('username')} deleted video: {video_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting video: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete video")


# ===== LEADS =====

@router.get("/leads")
async def get_all_leads(token: dict = Depends(verify_token)):
    """Get all leads from all sources (aggregated from multiple collections)"""
    try:
        all_leads = []
        
        # 1. General leads collection
        general_leads = await db.leads.find({}, {"_id": 0}).to_list(500)
        for lead in general_leads:
            lead["source"] = lead.get("source", "general")
            lead["status"] = lead.get("status", "new")
            all_leads.append(lead)
        
        # 2. Contact form submissions
        contact_messages = await db.contact_messages.find({}, {"_id": 0}).to_list(500)
        for msg in contact_messages:
            all_leads.append({
                "id": msg.get("id", str(msg.get("timestamp", ""))),
                "name": msg.get("name", "Unknown"),
                "email": msg.get("email", ""),
                "phone": msg.get("phone", ""),
                "message": msg.get("message", ""),
                "source": "contact",
                "type": "contact_form",
                "timestamp": msg.get("timestamp", msg.get("created_at", "")),
                "projectType": msg.get("project_type", ""),
                "companyName": msg.get("company", ""),
                "status": msg.get("status", "new")
            })
        
        # 3. Smart home quiz leads
        smart_home_leads = await db.smart_home_leads.find({}, {"_id": 0}).to_list(500)
        for lead in smart_home_leads:
            all_leads.append({
                "id": lead.get("id", str(lead.get("created_at", ""))),
                "name": lead.get("name", "Unknown"),
                "email": lead.get("email", ""),
                "phone": lead.get("phone", ""),
                "source": "smart-home-quiz",
                "type": "quiz_results",
                "timestamp": lead.get("created_at", lead.get("timestamp", "")),
                "message": f"Property: {lead.get('property_type', 'N/A')}, Budget: {lead.get('budget', 'N/A')}",
                "projectType": lead.get("property_type", ""),
                "status": lead.get("status", "new")
            })
        
        # 4. Exit intent popup leads
        exit_intent_leads = await db.exit_intent_leads.find({}, {"_id": 0}).to_list(500)
        for lead in exit_intent_leads:
            all_leads.append({
                "id": lead.get("id", str(lead.get("created_at", ""))),
                "name": lead.get("name", "Unknown"),
                "email": lead.get("email", ""),
                "phone": lead.get("phone", ""),
                "source": "exit-intent",
                "type": "exit_popup",
                "timestamp": lead.get("created_at", lead.get("timestamp", "")),
                "message": lead.get("interest", ""),
                "status": lead.get("status", "new")
            })
        
        # 5. AI Chat leads (qualified)
        ai_chat_leads = await db.ai_chat_leads.find({"lead_score": {"$gte": 30}}, {"_id": 0}).to_list(500)
        for lead in ai_chat_leads:
            all_leads.append({
                "id": lead.get("session_id", str(lead.get("created_at", ""))),
                "name": lead.get("name", "AI Chat User"),
                "email": lead.get("email", ""),
                "phone": lead.get("phone", ""),
                "source": "ai-chat",
                "type": "chat_qualified",
                "timestamp": lead.get("created_at", lead.get("timestamp", "")),
                "message": f"Lead Score: {lead.get('lead_score', 0)}%, Budget: {lead.get('budget_range', 'N/A')}",
                "status": lead.get("status", "new")
            })
        
        # 6. Consultation requests
        consultations = await db.consultations.find({}, {"_id": 0}).to_list(500)
        for consult in consultations:
            all_leads.append({
                "id": consult.get("id", str(consult.get("timestamp", ""))),
                "name": consult.get("name", "Unknown"),
                "email": consult.get("email", ""),
                "phone": consult.get("phone", ""),
                "source": "consultation",
                "type": "consultation_request",
                "timestamp": consult.get("timestamp", consult.get("created_at", "")),
                "message": consult.get("message", consult.get("requirements", "")),
                "projectType": consult.get("project_type", ""),
                "status": consult.get("status", "new")
            })
        
        # 7. Calculator submissions (with email)
        calc_submissions = await db.calculator_submissions.find(
            {"email": {"$exists": True, "$ne": ""}}, 
            {"_id": 0}
        ).to_list(500)
        for calc in calc_submissions:
            all_leads.append({
                "id": calc.get("id", str(calc.get("timestamp", ""))),
                "name": calc.get("name", "Calculator User"),
                "email": calc.get("email", ""),
                "phone": calc.get("phone", ""),
                "source": "calculator",
                "type": "quote_request",
                "timestamp": calc.get("timestamp", calc.get("created_at", "")),
                "message": f"Project: {calc.get('project_type', 'N/A')}, Budget: AED {calc.get('total_estimate', 0):,}",
                "projectType": calc.get("project_type", ""),
                "status": calc.get("status", "new")
            })
        
        # Sort all leads by timestamp (most recent first)
        def get_timestamp(lead):
            ts = lead.get("timestamp", "")
            if isinstance(ts, str):
                return ts
            return str(ts) if ts else ""
        
        all_leads.sort(key=get_timestamp, reverse=True)
        
        return all_leads
        
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch leads")


@router.get("/leads/{lead_id}")
async def get_lead(lead_id: str, token: dict = Depends(verify_token)):
    """Get a specific lead by ID"""
    try:
        lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        return lead
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch lead")


@router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str, token: dict = Depends(verify_token)):
    """Delete a lead"""
    try:
        result = await db.leads.delete_one({"id": lead_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        logger.info(f"Admin {token.get('username')} deleted lead: {lead_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete lead")


@router.put("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update lead status across different collections"""
    try:
        new_status = data.get("status")
        source = data.get("source", "")
        
        if not new_status:
            raise HTTPException(status_code=400, detail="Status is required")
        
        valid_statuses = ["new", "contacted", "qualified", "converted", "lost"]
        if new_status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        # Determine which collection to update based on source
        collection_map = {
            "contact": "contact_messages",
            "consultation": "consultations",
            "smart-home-quiz": "smart_home_leads",
            "exit-intent": "exit_intent_leads",
            "ai-chat": "ai_chat_leads",
            "calculator": "calculator_submissions",
            "general": "leads",
            "developer-packages": "leads",
            "package-builder": "leads"
        }
        
        collection_name = collection_map.get(source, "leads")
        collection = db[collection_name]
        
        # Try to update by id field first
        result = await collection.update_one(
            {"id": lead_id},
            {"$set": {"status": new_status, "status_updated_at": datetime.now(timezone.utc)}}
        )
        
        # If not found by id, try by session_id (for AI chat leads)
        if result.matched_count == 0 and source == "ai-chat":
            result = await collection.update_one(
                {"session_id": lead_id},
                {"$set": {"status": new_status, "status_updated_at": datetime.now(timezone.utc)}}
            )
        
        # If still not found, try the leads collection as fallback
        if result.matched_count == 0:
            result = await db.leads.update_one(
                {"id": lead_id},
                {"$set": {"status": new_status, "status_updated_at": datetime.now(timezone.utc)}}
            )
        
        logger.info(f"Admin {token.get('username')} updated lead {lead_id} status to: {new_status}")
        return {"success": True, "status": new_status}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update lead status")



# ===== PROPERTY PACKAGES =====

@router.get("/property-packages")
async def get_property_packages(token: dict = Depends(verify_token)):
    """Get all property packages"""
    try:
        packages = await db.property_packages.find({}, {"_id": 0}).to_list(100)
        return {"packages": packages, "total": len(packages)}
    except Exception as e:
        logger.error(f"Error fetching property packages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch property packages")


@router.post("/property-packages")
async def create_property_package(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new property package"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.property_packages.insert_one(data)
        logger.info(f"Admin {token.get('username')} created property package: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating property package: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create property package")


@router.put("/property-packages/{package_id}")
async def update_property_package(package_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update property package"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.property_packages.update_one({"id": package_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        logger.info(f"Admin {token.get('username')} updated package: {package_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating package: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update package")


@router.delete("/property-packages/{package_id}")
async def delete_property_package(package_id: str, token: dict = Depends(verify_token)):
    """Delete property package"""
    try:
        result = await db.property_packages.delete_one({"id": package_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        logger.info(f"Admin {token.get('username')} deleted property package: {package_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting property package: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete property package")


@router.patch("/property-packages/{package_id}")
async def patch_property_package(package_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update property package (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.property_packages.update_one({"id": package_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        return {"success": True, "message": "Property package patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching property package: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch property package")


# ===== PACKAGE ENHANCEMENTS =====

@router.get("/package-enhancements")
async def get_package_enhancements(token: dict = Depends(verify_token)):
    """Get all package enhancements"""
    try:
        enhancements = await db.package_enhancements.find({}, {"_id": 0}).to_list(200)
        return {"enhancements": enhancements, "total": len(enhancements)}
    except Exception as e:
        logger.error(f"Error fetching enhancements: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch enhancements")


@router.post("/package-enhancements")
async def create_enhancement(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new enhancement"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.package_enhancements.insert_one(data)
        logger.info(f"Admin {token.get('username')} created enhancement: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating enhancement: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create enhancement")


@router.put("/package-enhancements/{enhancement_id}")
async def update_enhancement(enhancement_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update enhancement"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.package_enhancements.update_one({"id": enhancement_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Enhancement not found")
        logger.info(f"Admin {token.get('username')} updated enhancement: {enhancement_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating enhancement: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update enhancement")


@router.delete("/package-enhancements/{enhancement_id}")
async def delete_enhancement(enhancement_id: str, token: dict = Depends(verify_token)):
    """Delete enhancement"""
    try:
        result = await db.package_enhancements.delete_one({"id": enhancement_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Enhancement not found")
        logger.info(f"Admin {token.get('username')} deleted enhancement: {enhancement_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting enhancement: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete enhancement")


@router.patch("/package-enhancements/{enhancement_id}")
async def patch_enhancement(enhancement_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update package enhancement (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.package_enhancements.update_one({"id": enhancement_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Enhancement not found")
        return {"success": True, "message": "Enhancement patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching enhancement: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch enhancement")


# ===== SPECIALTY ROOMS =====

@router.get("/specialty-rooms")
async def get_specialty_rooms(token: dict = Depends(verify_token)):
    """Get all specialty rooms"""
    try:
        rooms = await db.specialty_rooms.find({}, {"_id": 0}).to_list(200)
        return {"rooms": rooms, "total": len(rooms)}
    except Exception as e:
        logger.error(f"Error fetching specialty rooms: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch specialty rooms")


@router.post("/specialty-rooms")
async def create_specialty_room(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new specialty room"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.specialty_rooms.insert_one(data)
        logger.info(f"Admin {token.get('username')} created specialty room: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating specialty room: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create specialty room")


@router.put("/specialty-rooms/{room_id}")
async def update_specialty_room(room_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update specialty room"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.specialty_rooms.update_one({"id": room_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Room not found")
        logger.info(f"Admin {token.get('username')} updated specialty room: {room_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating specialty room: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update specialty room")


@router.delete("/specialty-rooms/{room_id}")
async def delete_specialty_room(room_id: str, token: dict = Depends(verify_token)):
    """Delete specialty room"""
    try:
        result = await db.specialty_rooms.delete_one({"id": room_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Room not found")
        logger.info(f"Admin {token.get('username')} deleted specialty room: {room_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting specialty room: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete specialty room")


@router.patch("/specialty-rooms/{room_id}")
async def patch_specialty_room(room_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update specialty room (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.specialty_rooms.update_one({"id": room_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Room not found")
        return {"success": True, "message": "Specialty room patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching specialty room: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch specialty room")


# ===== PRODUCT CATEGORIES =====

@router.get("/product-categories")
async def get_product_categories(token: dict = Depends(verify_token)):
    """Get all product categories"""
    try:
        categories = await db.product_categories.find({}, {"_id": 0}).to_list(100)
        return {"categories": categories, "total": len(categories)}
    except Exception as e:
        logger.error(f"Error fetching product categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product categories")


@router.post("/product-categories")
async def create_product_category(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Create new product category"""
    try:
        data["id"] = str(uuid4())
        data["created_at"] = datetime.now(timezone.utc)
        await db.product_categories.insert_one(data)
        logger.info(f"Admin {token.get('username')} created product category: {data['id']}")
        return {"success": True, "id": data["id"]}
    except Exception as e:
        logger.error(f"Error creating product category: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create product category")


@router.put("/product-categories/{category_id}")
async def update_product_category(category_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update product category"""
    try:
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.product_categories.update_one({"id": category_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Category not found")
        logger.info(f"Admin {token.get('username')} updated product category: {category_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating product category: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update product category")


@router.delete("/product-categories/{category_id}")
async def delete_product_category(category_id: str, token: dict = Depends(verify_token)):
    """Delete product category"""
    try:
        result = await db.product_categories.delete_one({"id": category_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Category not found")
        logger.info(f"Admin {token.get('username')} deleted product category: {category_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting product category: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete product category")


@router.patch("/product-categories/{category_id}")
async def patch_product_category_ext(category_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Partially update product category (only provided fields)"""
    try:
        data.pop("_id", None)
        data.pop("id", None)
        if not data:
            raise HTTPException(status_code=400, detail="No fields to update")
        data["updated_at"] = datetime.now(timezone.utc)
        result = await db.product_categories.update_one({"id": category_id}, {"$set": data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Category not found")
        return {"success": True, "message": "Product category patched successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error patching product category: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to patch product category")



# ===== ARTICLES IMAGE UPDATE =====

@router.put("/articles/{article_id}/image")
async def update_article_image(article_id: str, data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Update article featured image"""
    try:
        featured_image = data.get("featured_image")
        if not featured_image:
            raise HTTPException(status_code=400, detail="featured_image is required")
        
        result = await db.articles.update_one(
            {"id": article_id}, 
            {"$set": {"featured_image": featured_image, "updated_at": datetime.now(timezone.utc)}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Article not found")
        logger.info(f"Admin {token.get('username')} updated article image: {article_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating article image: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update article image")


@router.post("/articles/bulk-update-images")
async def bulk_update_article_images(data: Dict[str, Any], token: dict = Depends(verify_token)):
    """Bulk update article images"""
    try:
        updates = data.get("updates", [])
        if not updates:
            raise HTTPException(status_code=400, detail="No updates provided")
        
        updated_count = 0
        for update in updates:
            article_id = update.get("id")
            featured_image = update.get("featured_image")
            if article_id and featured_image:
                result = await db.articles.update_one(
                    {"id": article_id},
                    {"$set": {"featured_image": featured_image}}
                )
                if result.modified_count > 0:
                    updated_count += 1
        
        logger.info(f"Admin {token.get('username')} bulk updated {updated_count} article images")
        return {"success": True, "updated_count": updated_count}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error bulk updating article images: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to bulk update article images")

"""
WhatsApp / Interakt admin routes — template management, testing, and status
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from services.whatsapp_service import whatsapp_service
from routes.admin_auth import verify_token
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
import logging

router = APIRouter(prefix="/api/admin/whatsapp", tags=["admin-whatsapp"])
logger = logging.getLogger(__name__)

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


class TemplateCreate(BaseModel):
    name: str
    description: str
    body_text: str
    variables: List[str] = []
    status: str = "pending"


class TestMessageRequest(BaseModel):
    country_code: str = "+971"
    phone_number: str
    template_name: str
    body_values: List[str] = []


@router.get("/status")
async def whatsapp_status(user=Depends(verify_token)):
    """Check WhatsApp integration health"""
    enabled = whatsapp_service.enabled
    templates = await db.whatsapp_templates.find({}, {"_id": 0}).to_list(100)
    recent_logs = await db.whatsapp_logs.find(
        {}, {"_id": 0}
    ).sort("sent_at", -1).limit(10).to_list(10)

    return {
        "enabled": enabled,
        "api_url": whatsapp_service.api_url,
        "has_token": bool(whatsapp_service.auth_token),
        "templates": templates,
        "recent_messages": recent_logs,
        "total_sent": await db.whatsapp_logs.count_documents({"status": "success"}),
        "total_failed": await db.whatsapp_logs.count_documents({"status": "error"}),
    }


@router.get("/templates")
async def list_templates(user=Depends(verify_token)):
    """List all WhatsApp message templates"""
    templates = await db.whatsapp_templates.find({}, {"_id": 0}).to_list(100)
    return templates


@router.post("/templates")
async def create_template(template: TemplateCreate, user=Depends(verify_token)):
    """Register a WhatsApp template (must be approved on Interakt dashboard)"""
    existing = await db.whatsapp_templates.find_one({"name": template.name})
    if existing:
        raise HTTPException(status_code=409, detail="Template with this name already exists")

    doc = {
        "name": template.name,
        "description": template.description,
        "body_text": template.body_text,
        "variables": template.variables,
        "status": template.status,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.whatsapp_templates.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.put("/templates/{name}")
async def update_template_status(name: str, status: str, user=Depends(verify_token)):
    """Update template approval status (pending/approved/rejected)"""
    if status not in ["pending", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Status must be pending, approved, or rejected")

    result = await db.whatsapp_templates.update_one(
        {"name": name},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    return {"status": "updated", "name": name, "new_status": status}


@router.delete("/templates/{name}")
async def delete_template(name: str, user=Depends(verify_token)):
    """Delete a WhatsApp template"""
    result = await db.whatsapp_templates.delete_one({"name": name})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    return {"status": "deleted", "name": name}


@router.post("/test")
async def test_whatsapp(req: TestMessageRequest, user=Depends(verify_token)):
    """Send a test WhatsApp message via Interakt"""
    if not whatsapp_service.enabled:
        raise HTTPException(status_code=503, detail="WhatsApp integration not configured. Set INTERAKT_AUTH_TOKEN in .env")

    result = await whatsapp_service.send_template_message(
        country_code=req.country_code,
        phone_number=req.phone_number,
        template_name=req.template_name,
        body_values=req.body_values,
    )

    # Log the attempt
    log_entry = {
        "phone": f"{req.country_code}{req.phone_number}",
        "template": req.template_name,
        "body_values": req.body_values,
        "status": result.get("status", "unknown"),
        "error": result.get("error"),
        "message_id": result.get("message_id"),
        "sent_at": datetime.now(timezone.utc).isoformat(),
        "sent_by": user.get("username", "admin"),
        "is_test": True,
    }
    await db.whatsapp_logs.insert_one(log_entry)
    log_entry.pop("_id", None)

    return {**result, "log": log_entry}


@router.get("/logs")
async def get_logs(limit: int = 50, user=Depends(verify_token)):
    """Get WhatsApp message logs"""
    logs = await db.whatsapp_logs.find(
        {}, {"_id": 0}
    ).sort("sent_at", -1).limit(limit).to_list(limit)
    return logs

"""
Sales Intelligence API
- Unified Lead Pipeline (aggregates all lead sources)
- Lead Scoring Engine
- Lead Routing Rules
- Pipeline Stats & Dashboard Data
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone, timedelta
from uuid import uuid4
import os
import logging
import jwt
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from services.email_service import EmailService

router = APIRouter(prefix="/api/sales-intelligence", tags=["sales-intelligence"])
logger = logging.getLogger(__name__)
security = HTTPBearer()

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "lexa-smart-home-secret-key-2024")
ALGORITHM = "HS256"

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


async def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        if not payload.get("sub"):
            raise HTTPException(status_code=401, detail="Not authenticated")
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Not authenticated")


# ===== SCORING CONFIG =====
SCORE_WEIGHTS = {
    "budget": {
        "500k+": 30, "200k-500k": 25, "100k-200k": 20,
        "50k-100k": 15, "25k-50k": 10, "under-25k": 5
    },
    "timeline": {
        "immediate": 25, "1-3": 20, "3-6": 15, "6-12": 10, "12+": 5
    },
    "property_type": {
        "villa": 15, "penthouse": 15, "mansion": 15,
        "townhouse": 12, "apartment": 8, "commercial": 12, "marine": 10
    },
    "source": {
        "calculator": 15, "consultation": 20, "experience_centre": 25,
        "contact": 10, "exit_intent": 5, "ai_chat": 8, "partner": 12
    },
    "engagement": {
        "multiple_touchpoints": 15, "single_touchpoint": 5
    }
}

PIPELINE_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"]

# Default routing rules
DEFAULT_ROUTING_RULES = [
    {"id": "rule_1", "name": "High-Value Villas", "condition": {"min_score": 70, "source": "any"}, "assign_to": "Senior Consultant", "priority": 1},
    {"id": "rule_2", "name": "Experience Centre Leads", "condition": {"source": "experience_centre"}, "assign_to": "EC Manager", "priority": 2},
    {"id": "rule_3", "name": "Calculator High Budget", "condition": {"source": "calculator", "min_score": 50}, "assign_to": "Project Specialist", "priority": 3},
    {"id": "rule_4", "name": "Consultation Requests", "condition": {"source": "consultation"}, "assign_to": "Consultation Team", "priority": 4},
    {"id": "rule_5", "name": "Default Round-Robin", "condition": {"source": "any"}, "assign_to": "Sales Team", "priority": 99},
]


# ===== MODELS =====
class LeadStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

class LeadAssignment(BaseModel):
    assigned_to: str
    notes: Optional[str] = None

class RoutingRule(BaseModel):
    name: str
    condition: Dict[str, Any]
    assign_to: str
    priority: int = 50


# ===== HELPERS =====
def compute_lead_score(lead: dict) -> dict:
    """Compute lead score based on available data."""
    score = 0
    breakdown = {}

    # Budget score
    budget = lead.get("budget_range") or lead.get("budget") or ""
    budget_str = str(budget).lower().replace(",", "").replace(" ", "")
    budget_score = 0
    if "500" in budget_str and ("k" in budget_str or "000" in budget_str):
        budget_score = 30
    elif "200" in budget_str:
        budget_score = 25
    elif "100" in budget_str:
        budget_score = 20
    elif "50" in budget_str:
        budget_score = 15
    elif "25" in budget_str:
        budget_score = 10
    elif budget_str:
        budget_score = 5
    score += budget_score
    breakdown["budget"] = budget_score

    # Timeline score
    timeline = str(lead.get("timeline") or "").lower()
    timeline_score = 0
    if "immediate" in timeline or "asap" in timeline:
        timeline_score = 25
    elif "1-3" in timeline or "1 to 3" in timeline:
        timeline_score = 20
    elif "3-6" in timeline or "3 to 6" in timeline:
        timeline_score = 15
    elif "6-12" in timeline or "6 to 12" in timeline:
        timeline_score = 10
    elif timeline:
        timeline_score = 5
    score += timeline_score
    breakdown["timeline"] = timeline_score

    # Property type score
    prop_type = str(lead.get("property_type") or lead.get("project_type") or "").lower()
    prop_score = 0
    if "villa" in prop_type or "mansion" in prop_type or "penthouse" in prop_type:
        prop_score = 15
    elif "townhouse" in prop_type or "commercial" in prop_type:
        prop_score = 12
    elif "apartment" in prop_type:
        prop_score = 8
    elif prop_type:
        prop_score = 5
    score += prop_score
    breakdown["property_type"] = prop_score

    # Source score
    source = str(lead.get("source") or "").lower()
    source_score = 0
    if "experience" in source:
        source_score = 25
    elif "consult" in source:
        source_score = 20
    elif "calculator" in source:
        source_score = 15
    elif "partner" in source:
        source_score = 12
    elif "contact" in source:
        source_score = 10
    elif "chat" in source:
        source_score = 8
    else:
        source_score = 5
    score += source_score
    breakdown["source"] = source_score

    # Engagement - bonus for having more data
    filled_fields = sum(1 for v in [
        lead.get("phone"), lead.get("email"), lead.get("message"),
        lead.get("interests"), lead.get("budget_range"),
        lead.get("timeline"), lead.get("property_type")
    ] if v)
    engagement_score = min(15, filled_fields * 3)
    score += engagement_score
    breakdown["engagement"] = engagement_score

    return {"score": min(score, 100), "breakdown": breakdown}


def determine_routing(lead: dict, rules: list) -> str:
    """Determine which team/person to route a lead to."""
    score = lead.get("lead_score", 0)
    source = str(lead.get("source") or "").lower()

    sorted_rules = sorted(rules, key=lambda r: r.get("priority", 99))
    for rule in sorted_rules:
        cond = rule.get("condition", {})
        match = True
        if cond.get("min_score") and score < cond["min_score"]:
            match = False
        if cond.get("source") and cond["source"] != "any" and cond["source"] not in source:
            match = False
        if match:
            return rule.get("assign_to", "Sales Team")

    return "Sales Team"


async def aggregate_all_leads() -> list:
    """Aggregate leads from all sources into a unified pipeline."""
    all_leads = []

    # 1. Direct leads collection
    async for doc in db.leads.find({}, {"_id": 0}):
        doc["source"] = doc.get("source") or "direct"
        doc["source_collection"] = "leads"
        all_leads.append(doc)

    # 2. Contact messages
    async for doc in db.contact_messages.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("name", ""),
            "email": doc.get("email", ""),
            "phone": doc.get("phone", ""),
            "message": doc.get("message", ""),
            "source": "contact_form",
            "source_collection": "contact_messages",
            "property_type": doc.get("subject", ""),
            "timestamp": doc.get("timestamp", ""),
            "status": doc.get("status", "new"),
        })

    # 3. Consultation bookings
    async for doc in db.consultation_bookings.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("name", ""),
            "email": doc.get("email", ""),
            "phone": doc.get("phone", ""),
            "message": doc.get("message", ""),
            "source": "consultation",
            "source_collection": "consultation_bookings",
            "timestamp": doc.get("timestamp", ""),
            "status": doc.get("status", "new"),
        })

    # 4. Experience centre bookings
    async for doc in db.experience_centre_bookings.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("name", ""),
            "email": doc.get("email", ""),
            "phone": doc.get("phone", ""),
            "message": doc.get("message", ""),
            "source": "experience_centre",
            "source_collection": "experience_centre_bookings",
            "interests": doc.get("interests", []),
            "timestamp": doc.get("created_at", ""),
            "status": doc.get("status", "new"),
        })

    # 5. Calculator submissions
    async for doc in db.calculator_submissions.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("contact_name", doc.get("name", "")),
            "email": doc.get("contact_email", doc.get("email", "")),
            "phone": doc.get("contact_phone", doc.get("phone", "")),
            "source": "calculator",
            "source_collection": "calculator_submissions",
            "property_type": doc.get("project_type", ""),
            "budget_range": doc.get("budget_range", ""),
            "timeline": doc.get("timeline", ""),
            "total_cost": doc.get("total_cost"),
            "timestamp": doc.get("timestamp", doc.get("created_at", "")),
            "status": doc.get("status", "new"),
        })

    # 6. Exit intent leads
    async for doc in db.exit_intent_leads.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("name", ""),
            "email": doc.get("email", ""),
            "phone": doc.get("phone", ""),
            "source": "exit_intent",
            "source_collection": "exit_intent_leads",
            "timestamp": doc.get("timestamp", ""),
            "status": doc.get("status", "new"),
        })

    # 7. AI chat leads
    async for doc in db.ai_chat_leads.find({}, {"_id": 0}):
        all_leads.append({
            "id": doc.get("id", str(uuid4())),
            "name": doc.get("name", ""),
            "email": doc.get("email", ""),
            "phone": doc.get("phone", ""),
            "source": "ai_chat",
            "source_collection": "ai_chat_leads",
            "message": doc.get("initial_query", ""),
            "timestamp": doc.get("timestamp", ""),
            "status": doc.get("status", "new"),
        })

    # Score each lead and check for existing pipeline entry
    for lead in all_leads:
        # Check if already in pipeline with score
        pipeline_entry = await db.sales_pipeline.find_one(
            {"lead_id": lead["id"]}, {"_id": 0}
        )
        if pipeline_entry:
            lead["lead_score"] = pipeline_entry.get("lead_score", 0)
            lead["score_breakdown"] = pipeline_entry.get("score_breakdown", {})
            lead["status"] = pipeline_entry.get("status", lead.get("status", "new"))
            lead["assigned_to"] = pipeline_entry.get("assigned_to", "")
            lead["notes"] = pipeline_entry.get("notes", [])
            lead["stage_history"] = pipeline_entry.get("stage_history", [])
        else:
            scoring = compute_lead_score(lead)
            lead["lead_score"] = scoring["score"]
            lead["score_breakdown"] = scoring["breakdown"]
            if not lead.get("assigned_to"):
                rules = await get_routing_rules()
                lead["assigned_to"] = determine_routing(lead, rules)
            lead["notes"] = []
            lead["stage_history"] = []

    # Sort by timestamp descending
    all_leads.sort(key=lambda x: str(x.get("timestamp", "")), reverse=True)
    return all_leads


async def get_routing_rules() -> list:
    """Get routing rules from DB or defaults."""
    rules = []
    async for doc in db.routing_rules.find({}, {"_id": 0}):
        rules.append(doc)
    return rules if rules else DEFAULT_ROUTING_RULES


# ===== ENDPOINTS =====

@router.get("/pipeline")
async def get_pipeline(
    status: Optional[str] = None,
    source: Optional[str] = None,
    min_score: Optional[int] = None,
    assigned_to: Optional[str] = None,
    limit: int = Query(200, ge=1, le=500),
    admin: dict = Depends(verify_admin)
):
    """Get unified lead pipeline with filters."""
    leads = await aggregate_all_leads()

    if status:
        leads = [l for l in leads if l.get("status") == status]
    if source:
        leads = [l for l in leads if source in str(l.get("source", "")).lower()]
    if min_score:
        leads = [l for l in leads if l.get("lead_score", 0) >= min_score]
    if assigned_to:
        leads = [l for l in leads if assigned_to.lower() in str(l.get("assigned_to", "")).lower()]

    return {
        "leads": leads[:limit],
        "total": len(leads),
        "filters_applied": {
            "status": status, "source": source,
            "min_score": min_score, "assigned_to": assigned_to
        }
    }


@router.get("/dashboard-stats")
async def get_dashboard_stats(admin: dict = Depends(verify_admin)):
    """Get dashboard KPIs and pipeline stats."""
    leads = await aggregate_all_leads()
    total = len(leads)

    # Stage counts
    stage_counts = {stage: 0 for stage in PIPELINE_STAGES}
    for lead in leads:
        s = lead.get("status", "new")
        if s in stage_counts:
            stage_counts[s] += 1
        else:
            stage_counts["new"] += 1

    # Score distribution
    hot = sum(1 for l in leads if l.get("lead_score", 0) >= 70)
    warm = sum(1 for l in leads if 40 <= l.get("lead_score", 0) < 70)
    cold = sum(1 for l in leads if l.get("lead_score", 0) < 40)

    # Source breakdown
    source_counts = {}
    for lead in leads:
        src = lead.get("source", "other")
        source_counts[src] = source_counts.get(src, 0) + 1

    # Conversion rate
    won = stage_counts.get("won", 0)
    conversion_rate = round((won / total * 100), 1) if total > 0 else 0

    # Avg score
    avg_score = round(sum(l.get("lead_score", 0) for l in leads) / total, 1) if total > 0 else 0

    # Revenue estimate (based on calculator submissions with total_cost)
    pipeline_value = sum(l.get("total_cost", 0) or 0 for l in leads if l.get("status") not in ["lost"])

    # Recent leads (last 7 days)
    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    recent_count = sum(1 for l in leads if str(l.get("timestamp", "")) >= week_ago)

    # Assigned distribution
    assigned_counts = {}
    for lead in leads:
        a = lead.get("assigned_to", "Unassigned")
        assigned_counts[a] = assigned_counts.get(a, 0) + 1

    return {
        "total_leads": total,
        "conversion_rate": conversion_rate,
        "avg_lead_score": avg_score,
        "pipeline_value": pipeline_value,
        "recent_leads_7d": recent_count,
        "stage_counts": stage_counts,
        "score_distribution": {"hot": hot, "warm": warm, "cold": cold},
        "source_breakdown": source_counts,
        "assigned_distribution": assigned_counts,
        "pipeline_stages": PIPELINE_STAGES,
    }


@router.put("/lead/{lead_id}/status")
async def update_lead_status(
    lead_id: str,
    update: LeadStatusUpdate,
    admin: dict = Depends(verify_admin)
):
    """Update a lead's pipeline status."""
    if update.status not in PIPELINE_STAGES:
        raise HTTPException(400, f"Invalid status. Must be one of: {PIPELINE_STAGES}")

    now = datetime.now(timezone.utc).isoformat()
    pipeline_entry = await db.sales_pipeline.find_one({"lead_id": lead_id})

    stage_entry = {"stage": update.status, "timestamp": now, "by": admin.get("sub", "admin")}
    if update.notes:
        stage_entry["notes"] = update.notes

    if pipeline_entry:
        updates = {
            "$set": {"status": update.status, "updated_at": now},
            "$push": {"stage_history": stage_entry}
        }
        if update.notes:
            updates["$push"]["notes"] = {"text": update.notes, "timestamp": now, "by": admin.get("sub", "admin")}
        await db.sales_pipeline.update_one({"lead_id": lead_id}, updates)
    else:
        await db.sales_pipeline.insert_one({
            "lead_id": lead_id,
            "status": update.status,
            "stage_history": [stage_entry],
            "notes": [{"text": update.notes, "timestamp": now, "by": admin.get("sub", "admin")}] if update.notes else [],
            "created_at": now,
            "updated_at": now,
        })

    return {"success": True, "lead_id": lead_id, "new_status": update.status}


@router.put("/lead/{lead_id}/assign")
async def assign_lead(
    lead_id: str,
    assignment: LeadAssignment,
    admin: dict = Depends(verify_admin)
):
    """Assign a lead to a team member."""
    now = datetime.now(timezone.utc).isoformat()
    pipeline_entry = await db.sales_pipeline.find_one({"lead_id": lead_id})

    if pipeline_entry:
        updates = {"$set": {"assigned_to": assignment.assigned_to, "updated_at": now}}
        if assignment.notes:
            updates["$push"] = {"notes": {"text": f"Assigned to {assignment.assigned_to}: {assignment.notes}", "timestamp": now, "by": admin.get("sub", "admin")}}
        await db.sales_pipeline.update_one({"lead_id": lead_id}, updates)
    else:
        await db.sales_pipeline.insert_one({
            "lead_id": lead_id,
            "assigned_to": assignment.assigned_to,
            "status": "new",
            "stage_history": [],
            "notes": [],
            "created_at": now,
            "updated_at": now,
        })

    return {"success": True, "lead_id": lead_id, "assigned_to": assignment.assigned_to}


@router.put("/lead/{lead_id}/score")
async def rescore_lead(lead_id: str, admin: dict = Depends(verify_admin)):
    """Manually trigger re-scoring for a lead."""
    leads = await aggregate_all_leads()
    lead = next((l for l in leads if l.get("id") == lead_id), None)
    if not lead:
        raise HTTPException(404, "Lead not found")

    scoring = compute_lead_score(lead)
    now = datetime.now(timezone.utc).isoformat()

    await db.sales_pipeline.update_one(
        {"lead_id": lead_id},
        {"$set": {"lead_score": scoring["score"], "score_breakdown": scoring["breakdown"], "updated_at": now}},
        upsert=True
    )
    return {"success": True, "lead_id": lead_id, "score": scoring["score"], "breakdown": scoring["breakdown"]}


@router.get("/routing-rules")
async def get_rules(admin: dict = Depends(verify_admin)):
    """Get current routing rules."""
    rules = await get_routing_rules()
    return {"rules": rules}


@router.post("/routing-rules")
async def create_rule(rule: RoutingRule, admin: dict = Depends(verify_admin)):
    """Create a new routing rule."""
    doc = {
        "id": f"rule_{str(uuid4())[:8]}",
        "name": rule.name,
        "condition": rule.condition,
        "assign_to": rule.assign_to,
        "priority": rule.priority,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.routing_rules.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.delete("/routing-rules/{rule_id}")
async def delete_rule(rule_id: str, admin: dict = Depends(verify_admin)):
    """Delete a routing rule."""
    result = await db.routing_rules.delete_one({"id": rule_id})
    if result.deleted_count == 0:
        raise HTTPException(404, "Rule not found")
    return {"success": True, "deleted": rule_id}


@router.get("/lead/{lead_id}")
async def get_lead_detail(lead_id: str, admin: dict = Depends(verify_admin)):
    """Get detailed lead info with score breakdown and history."""
    leads = await aggregate_all_leads()
    lead = next((l for l in leads if l.get("id") == lead_id), None)
    if not lead:
        raise HTTPException(404, "Lead not found")
    return lead


@router.get("/activity-feed")
async def get_activity_feed(limit: int = Query(20, ge=1, le=100), admin: dict = Depends(verify_admin)):
    """Get recent activity across all leads."""
    activities = []

    async for doc in db.sales_pipeline.find({}, {"_id": 0}).sort("updated_at", -1).limit(limit):
        for entry in doc.get("stage_history", [])[-3:]:
            activities.append({
                "lead_id": doc["lead_id"],
                "action": f"Moved to {entry['stage']}",
                "timestamp": entry["timestamp"],
                "by": entry.get("by", "system"),
            })
        for note in doc.get("notes", [])[-2:]:
            activities.append({
                "lead_id": doc["lead_id"],
                "action": f"Note: {note['text'][:80]}",
                "timestamp": note["timestamp"],
                "by": note.get("by", "admin"),
            })

    activities.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
    return {"activities": activities[:limit]}

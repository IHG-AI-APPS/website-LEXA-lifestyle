"""
AI-Powered Smart Home Consultant Chatbot
Uses GPT to provide intelligent responses, qualify leads, and recommend solutions
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timezone
from uuid import uuid4
import os
import json
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import asyncio

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/ai-chat", tags=["ai-chatbot"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

# Emergent LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# System prompt for LEXA AI Assistant
LEXA_SYSTEM_PROMPT = """You are LEXA AI, an expert smart home consultant for LEXA Lifestyle - Dubai's premier luxury home automation company.

Your role:
1. Answer questions about smart home solutions (lighting, climate, security, entertainment, etc.)
2. Recommend products and packages based on user needs
3. Qualify leads by understanding their project requirements
4. Guide users to book consultations or get quotes

Key information about LEXA:
- Premium smart home automation company in Dubai, UAE
- Partners with top brands: Control4, Savant, Lutron, Crestron, Bang & Olufsen, Sonos
- Services: Consultation, Design, Installation, Maintenance, Support
- Property types: Villas, Apartments, Penthouses, Commercial spaces
- Budget ranges: AED 8K-25K (Essential), AED 25K-70K (Standard), AED 70K-150K (Premium), AED 150K-280K (Luxury), AED 280K+ (Ultra)

When qualifying leads, naturally ask about:
- Property type and size
- Budget range
- Timeline for project
- Must-have features (lighting, security, climate, entertainment)
- Contact information (name, email, phone)

Be conversational, helpful, and professional. Use Dubai/UAE context. Keep responses concise but informative.
If users are ready to proceed, encourage them to:
1. Use our Smart Project Builder at /project-builder/smart
2. Try the Cost Calculator at /calculator
3. Book a free consultation

Always be enthusiastic about smart home technology and its benefits for luxury living."""


class ChatMessage(BaseModel):
    session_id: str
    message: str
    user_info: Optional[dict] = None


class ChatResponse(BaseModel):
    session_id: str
    response: str
    lead_score: Optional[int] = None
    collected_info: Optional[dict] = None


class LeadInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    property_type: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    interests: List[str] = []


def extract_lead_info(messages: list) -> dict:
    """Extract lead information from conversation history"""
    lead_info = {
        "name": None,
        "email": None,
        "phone": None,
        "property_type": None,
        "budget": None,
        "timeline": None,
        "interests": []
    }
    
    full_text = " ".join([m.get("content", "") for m in messages]).lower()
    
    # Simple extraction patterns
    if "@" in full_text:
        import re
        emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', full_text)
        if emails:
            lead_info["email"] = emails[0]
    
    # Phone patterns (UAE)
    import re
    phones = re.findall(r'\+?971[\d\s-]{8,}|\d{10}', full_text)
    if phones:
        lead_info["phone"] = phones[0].replace(" ", "").replace("-", "")
    
    # Property type detection
    property_keywords = {
        "villa": "villa",
        "apartment": "apartment",
        "penthouse": "penthouse",
        "townhouse": "townhouse",
        "mansion": "mansion"
    }
    for keyword, ptype in property_keywords.items():
        if keyword in full_text:
            lead_info["property_type"] = ptype
            break
    
    # Budget detection
    budget_keywords = {
        "essential": "essential",
        "standard": "standard",
        "premium": "premium",
        "luxury": "luxury",
        "ultra": "ultra",
        "8k": "essential",
        "25k": "standard",
        "70k": "premium",
        "150k": "luxury",
        "280k": "ultra"
    }
    for keyword, budget in budget_keywords.items():
        if keyword in full_text:
            lead_info["budget"] = budget
            break
    
    # Interest detection
    interest_keywords = ["lighting", "security", "climate", "entertainment", "audio", "video", "automation", "blinds", "shades", "pool"]
    for interest in interest_keywords:
        if interest in full_text:
            lead_info["interests"].append(interest)
    
    return lead_info


def calculate_lead_score(lead_info: dict, message_count: int) -> int:
    """Calculate lead score based on collected information"""
    score = 0
    
    if lead_info.get("email"):
        score += 25
    if lead_info.get("phone"):
        score += 25
    if lead_info.get("property_type"):
        score += 15
    if lead_info.get("budget"):
        score += 15
    if lead_info.get("timeline"):
        score += 10
    if lead_info.get("interests"):
        score += min(len(lead_info["interests"]) * 2, 10)
    
    # Engagement bonus
    if message_count >= 3:
        score += 5
    if message_count >= 5:
        score += 5
    
    return min(score, 100)


@router.post("/message")
async def send_message(chat: ChatMessage):
    """Send a message to LEXA AI and get a response"""
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        # Get or create session
        session = await db.chat_sessions.find_one({"session_id": chat.session_id})
        
        if not session:
            session = {
                "session_id": chat.session_id,
                "messages": [],
                "lead_info": {},
                "lead_score": 0,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
            await db.chat_sessions.insert_one(session)
        
        messages = session.get("messages", [])
        
        # Add user message to history
        messages.append({
            "role": "user",
            "content": chat.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        # Initialize LLM chat
        llm_chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=chat.session_id,
            system_message=LEXA_SYSTEM_PROMPT
        ).with_model("openai", "gpt-4o-mini")
        
        # Build conversation context
        context_messages = []
        for msg in messages[-10:]:  # Last 10 messages for context
            if msg["role"] == "user":
                context_messages.append(f"User: {msg['content']}")
            else:
                context_messages.append(f"Assistant: {msg['content']}")
        
        # Create message with context
        full_message = "\n".join(context_messages[-8:]) + f"\nUser: {chat.message}"
        user_message = UserMessage(text=full_message)
        
        # Get AI response
        response = await llm_chat.send_message(user_message)
        
        # Add assistant response to history
        messages.append({
            "role": "assistant",
            "content": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        # Extract lead info and calculate score
        lead_info = extract_lead_info(messages)
        lead_score = calculate_lead_score(lead_info, len([m for m in messages if m["role"] == "user"]))
        
        # Update session
        await db.chat_sessions.update_one(
            {"session_id": chat.session_id},
            {
                "$set": {
                    "messages": messages,
                    "lead_info": lead_info,
                    "lead_score": lead_score,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # If lead score is high enough, create/update lead in database
        if lead_score >= 50 and (lead_info.get("email") or lead_info.get("phone")):
            await db.ai_chat_leads.update_one(
                {"session_id": chat.session_id},
                {
                    "$set": {
                        "session_id": chat.session_id,
                        "lead_info": lead_info,
                        "lead_score": lead_score,
                        "message_count": len(messages),
                        "source": "ai_chatbot",
                        "updated_at": datetime.now(timezone.utc)
                    },
                    "$setOnInsert": {
                        "created_at": datetime.now(timezone.utc)
                    }
                },
                upsert=True
            )
        
        return {
            "session_id": chat.session_id,
            "response": response,
            "lead_score": lead_score,
            "collected_info": lead_info
        }
        
    except Exception as e:
        logger.error(f"AI Chat error: {str(e)}")
        # Fallback response
        return {
            "session_id": chat.session_id,
            "response": "I apologize, but I'm having trouble connecting right now. Please try our Smart Project Builder at /project-builder/smart or contact us directly via WhatsApp!",
            "lead_score": 0,
            "collected_info": {}
        }


@router.get("/session/{session_id}")
async def get_session(session_id: str):
    """Get chat session history"""
    session = await db.chat_sessions.find_one(
        {"session_id": session_id},
        {"_id": 0}
    )
    
    if not session:
        return {"session_id": session_id, "messages": [], "lead_score": 0}
    
    return session


@router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    """Clear chat session"""
    await db.chat_sessions.delete_one({"session_id": session_id})
    return {"success": True, "message": "Session cleared"}


@router.get("/leads")
async def get_chat_leads(min_score: int = 0):
    """Get all leads from AI chat (admin)"""
    leads = await db.ai_chat_leads.find(
        {"lead_score": {"$gte": min_score}},
        {"_id": 0}
    ).sort("lead_score", -1).to_list(100)
    
    return {"leads": leads, "total": len(leads)}

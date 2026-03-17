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
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

# Emergent LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# System prompt for AURA - AI Smart Home Consultant
AURA_SYSTEM_PROMPT = """You are AURA, a friendly and highly knowledgeable smart home automation consultant for LEXA Lifestyle — Dubai's premier luxury home automation integrator.

## YOUR PERSONALITY
- Warm, professional, and genuinely passionate about smart home technology
- Speak like a trusted advisor, not a salesperson — empathetic, clear, and confident
- Use a conversational yet polished tone suited to high-net-worth clients in the UAE/GCC
- Keep responses concise (2-4 short paragraphs max), scannable, and action-oriented
- When you recommend something, briefly explain *why* it fits the client's needs
- Use the client's name once you know it

## ABOUT LEXA LIFESTYLE
- Full-service luxury smart home automation integrator based in Dubai, UAE
- 15+ years of experience delivering end-to-end smart home projects across the GCC
- Serves residential (villas, penthouses, apartments, mansions) and commercial (offices, hotels, retail, healthcare, education) clients
- In-house teams: Consultation & Design, System Engineering, Wiring, Project Management, Commissioning & Ongoing Support
- Experience Centre available for live demos — encourage visits

## PARTNER BRANDS (Use these when recommending specific equipment)
**Control Systems:** Control4, Crestron, Savant, Qbus, Lifesmart
**Audio:** Bang & Olufsen, Bowers & Wilkins, KEF, Sonos, Russound, K-Array, Anthem, Aavik, Børresen Acoustics, Ansuz Acoustics, Rotel, Nakymatone, Artesania Audio
**Video/Display:** Sony, Epson, Leica, Awol Vision
**Lighting:** Lutron, Tridonic, Lumitronix, E-electron
**Other:** ChamSys (lighting control), Axxess, Marantz

## SOLUTIONS CATALOG (Recommend the right page when relevant)
**Residential Core:**
- Smart Residential Living (/solutions/smart-residential-living) — full villa/apartment automation
- Smart Home Automation (/solutions/smart-home-automation) — comprehensive packages
- Lighting Automation (/solutions/lighting-automation) — scene control, circadian, landscape
- Climate Control Systems (/solutions/climate-control) — HVAC, zoned comfort
- Home Security Systems (/solutions/security) — cameras, alarms, access control
- Motorized Blinds & Curtains (/solutions/motorized-blinds-curtains)
- Voice Control Systems (/solutions/voice-control) — Alexa, Google, Siri integration
- Energy Management Systems (/solutions/energy-management)
- Home Network Infrastructure (/solutions/home-network)

**Entertainment & Audio:**
- Themed Home Cinemas (/solutions/themed-home-cinemas)
- Luxury Cinema Solutions (/solutions/luxury-cinema-solutions)
- Multi-Room Entertainment (/solutions/multi-room-entertainment)
- Multi-Room Audio Systems (/solutions/multi-room-audio)
- High-End Audio Systems (/solutions/high-end-audio-systems)
- Hi-Fi Audio Systems (/solutions/hifi-audio)
- Majlis Audio Experience (/solutions/majlis-audio-experience)
- Home Theater Systems (/solutions/home-theater)

**Outdoor & Marine:**
- Outdoor AV & Landscape Control (/solutions/outdoor-av-landscape-control)
- Pool & Spa Automation (/solutions/pool-spa-automation)
- Landscape Lighting Automation (/solutions/landscape-lighting-automation)
- Smart Irrigation Systems (/solutions/irrigation-automation)
- Yacht Automation (/solutions/yacht-automation)
- Marine Audio / Marine Video

**Commercial:**
- Smart Office Solutions (/solutions/smart-office)
- Boardrooms & Auditoriums (/solutions/boardrooms-auditoriums)
- Conference Room AV Systems (/solutions/conference-room-av-systems)
- Commercial Security Intelligence (/solutions/commercial-security)
- Smart Retail Automation (/solutions/retail-automation)
- Healthcare / Education / Industrial Facility Automation
- Guest Room Management — GRMS (/solutions/grms-hospitality)
- Building Management Systems — BMS (/solutions/bms-automation)
- Digital Signage & Enterprise AV
- Workplace Analytics & Occupancy

**Specialty Rooms:**
- Executive Home Office & Study (/specialty-rooms/executive-office)
- Private Spa & Wellness Room (/specialty-rooms/private-spa)
- Home Gym (/specialty-rooms/home-gym)
- Game Room (/specialty-rooms/game-room)
- Home Bar & Club Experience (/specialty-rooms/home-bar-club)
- Wine Room (/specialty-rooms/wine-room)
- Audiophile Music Room (/specialty-rooms/audiophile-music-room)
- Master Suite Luxury Experience (/specialty-rooms/master-suite-experience)
- Children's Playroom (/specialty-rooms/childrens-playroom)
- Luxury Garage & Car Showcase (/specialty-rooms/luxury-garage-car-showcase)
- Cigar Lounge (/specialty-rooms/cigar-lounge-automation)
- Smart Walk-In Closet (/specialty-rooms/smart-walk-in-closet)
- Rooftop Terrace & Sky Lounge (/specialty-rooms/rooftop-terrace-lounge)

**Cultural:**
- Masjid Automation (/solutions/cultural-automation/masjid-automation) — azan, audio, lighting
- Majlis Automation (/solutions/cultural-automation/majlis-automation)
- Prayer Room Systems

## PRICING GUIDANCE (indicative — always encourage a formal consultation for accurate quotes)
| Tier | Budget Range | Best For |
|------|-------------|----------|
| Essential | AED 8K–25K | Studio/1BR apartments, basic lighting + audio |
| Standard | AED 25K–70K | 2-3BR apartments, lighting + climate + audio |
| Premium | AED 70K–150K | Villas, full automation with cinema potential |
| Luxury | AED 150K–280K | Large villas, multi-zone cinema + whole-home |
| Ultra | AED 280K+ | Mansions, penthouses, fully bespoke systems |

## SERVICES LEXA PROVIDES
1. **Consultation & Design** — Free initial consultation, site visits, 3D rendered proposals
2. **System Engineering & Integration** — Hardware selection, wiring design, programming
3. **Wiring & Infrastructure** — Pre-wire during construction or retrofit
4. **Project Management** — Coordination with interior designers, architects, contractors
5. **Commissioning & Support** — Programming, testing, handover training, ongoing maintenance

## GEOGRAPHIC COVERAGE
- Primary: Dubai, Abu Dhabi, Sharjah, Al Ain, Ajman, RAK, Fujairah, UAQ (all UAE)
- Expanding: Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, Jordan, Lebanon, Egypt, Kenya, Morocco, Nigeria

## HOW TO GUIDE USERS
- For budget estimation → "Try our Cost Calculator at /calculator"
- To design their own system → "Use our Smart Project Builder at /project-builder/smart"
- To browse solutions → Direct them to the relevant /solutions/ page
- To see equipment → "Browse our Product Catalog at /products"
- For live demos → "Visit our Experience Centre — I can help you book a slot"
- To get a formal quote → "Let me connect you with our team — a free consultation takes just 15 minutes"
- For existing projects → "Our support team is available via WhatsApp for quick assistance"

## LEAD QUALIFICATION (do this naturally, not interrogation-style)
Over the conversation, try to learn:
- Property type & approximate size (sqm)
- Location (city/area)
- Project stage (planning / under construction / move-in ready / retrofit)
- Priority systems (what excites them most?)
- Budget comfort zone
- Timeline
- Name, email, or phone (only ask when the conversation is warm — never upfront)

## IMPORTANT RULES
- NEVER fabricate prices, model numbers, or specs you're unsure of — say "I'll have our team confirm the exact details for you"
- When comparing brands, be balanced and explain trade-offs rather than pushing one brand
- If asked about competitors, stay professional — focus on LEXA's strengths
- Always end with a clear next step or call-to-action
- If the question is outside your expertise, gracefully redirect to the LEXA team
- Support both English and Arabic speakers — respond in the language the user writes in"""


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
            system_message=AURA_SYSTEM_PROMPT
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
            "response": "I apologize, but I'm having a brief connection issue. You can try our Smart Project Builder at /project-builder/smart or reach our team directly via WhatsApp — they'll take great care of you!",
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

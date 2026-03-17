"""
Smart Project Builder - Main API Routes
Complete backend for consultant-grade project resolution
"""

from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
import os
import uuid
import logging

from models.project_builder import (
    InitializeProjectRequest,
    ObjectivesRequest,
    ResolveRequest,
    SubmitProjectRequest,
    ProjectSession
)
from services.resolver_service import ResolverService
from services.rules_engine import RulesEngine
from services.dependency_graph import DependencyGraphService
from services.proposal_generator import ProposalGeneratorService
from services.ai_reasoning_service import get_ai_reasoning_service
from services.boq_pdf_generator import get_pdf_generator
from services.boq_email_service import get_boq_email_service
from services.session_persistence import get_session_persistence_service
from services.crm_integration import get_crm_service
from services.project_builder_service import ProjectBuilderService
from services.analytics_service import get_analytics_service

router = APIRouter(prefix="/api/project-builder", tags=["project-builder"])
logger = logging.getLogger(__name__)

# MongoDB connection
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')
client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[DB_NAME]

# Initialize services
resolver = ResolverService(db)
rules_engine = RulesEngine(db)
dependency_graph = DependencyGraphService(db)
proposal_generator = ProposalGeneratorService(db)
ai_reasoning = get_ai_reasoning_service()
builder_service = ProjectBuilderService(db)
analytics = get_analytics_service(db)


# ============================================================================
# STEP 1: Initialize Project (Capture Project DNA)
# ============================================================================

@router.post("/initialize")
async def initialize_project(request: InitializeProjectRequest):
    """
    Step 1: Capture project DNA and return available objectives
    
    Creates a new project session and determines what objectives and spaces
    are relevant for this specific project type
    """
    try:
        # Create new session
        session_id = str(uuid.uuid4())
        
        # Determine project scale
        scale = builder_service.calculate_project_scale(request.area_sqft)
        
        session = ProjectSession(
            session_id=session_id,
            segment=request.segment,
            property_type=request.property_type,
            project_stage=request.project_stage,
            area_sqft=request.area_sqft,
            location=request.location,
            num_floors=request.num_floors,
            num_rooms=request.num_rooms,
            project_scale=scale,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        # Save session
        await db.project_sessions.insert_one(session.dict())
        
        # Track analytics: Project started
        await analytics.track_funnel_step(
            step_name="project_started",
            step_number=1,
            session_id=session_id,
            metadata={
                "segment": request.segment,
                "property_type": request.property_type,
                "area_sqft": request.area_sqft,
                "project_scale": scale
            }
        )
        
        # Get available objectives based on segment
        objectives = builder_service.get_objectives_for_segment(request.segment)
        
        # Get available spaces based on property type
        spaces = builder_service.get_spaces_for_property(request.property_type, request.segment)
        
        logger.info(f"Initialized project {session_id}: {request.property_type} {request.area_sqft}sqft")
        
        return {
            "session_id": session_id,
            "project_scale": scale,
            "available_objectives": objectives,
            "available_spaces": spaces,
            "message": f"Project initialized: {scale} {request.property_type} ({request.area_sqft} sqft)"
        }
    
    except Exception as e:
        logger.error(f"Initialize error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# STEP 2: Select Objectives
# ============================================================================

@router.post("/objectives")
async def select_objectives(request: ObjectivesRequest):
    """
    Step 2: User selects 2-4 objectives
    Returns preliminary bundle recommendations
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": request.session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update session with objectives
        await db.project_sessions.update_one(
            {"session_id": request.session_id},
            {
                "$set": {
                    "selected_objectives": request.selected_objectives,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # Track analytics: Objectives selected
        await analytics.track_funnel_step(
            step_name="objectives_selected",
            step_number=2,
            session_id=request.session_id,
            metadata={"objectives": request.selected_objectives}
        )
        
        # Get preliminary bundle recommendations
        bundles = await db.project_bundles.find(
            {
                "segment": session['segment'],
                "min_area_sqft": {"$lte": session['area_sqft']},
                "property_types_allowed": session['property_type']
            },
            {"_id": 0}
        ).to_list(20)
        
        # Filter by objectives
        relevant_bundles = []
        for bundle in bundles:
            bundle_use_cases = bundle.get('use_cases', [])
            if any(obj in bundle_use_cases for obj in request.selected_objectives):
                relevant_bundles.append(bundle)
        
        # Categorize by tier
        essential = [b for b in relevant_bundles if b['tier'] == 'Essential']
        premium = [b for b in relevant_bundles if b['tier'] == 'Premium']
        signature = [b for b in relevant_bundles if b['tier'] == 'Signature']
        
        logger.info(f"Objectives selected for {request.session_id}: {request.selected_objectives}")
        
        return {
            "session_id": request.session_id,
            "selected_objectives": request.selected_objectives,
            "recommended_bundles": {
                "essential": essential[:4],
                "premium": premium[:4],
                "signature": signature[:2]
            },
            "message": f"Found {len(relevant_bundles)} relevant bundles for your objectives"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Objectives error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# STEP 2.5: Save Priorities (MoSCoW Framework)
# ============================================================================

@router.post("/priorities")
async def save_priorities(
    session_id: str = Body(...),
    prioritized_needs: Dict[str, List[str]] = Body(...),
    tier_weights: Dict[str, float] = Body(...)
):
    """
    Step 2.5: Save user's prioritization framework
    
    Uses MoSCoW-inspired tiers:
    - must_have: Essential (weight 1.0)
    - should_have: Important (weight 0.75)
    - could_have: Nice to have (weight 0.5)
    - want_to_have: Aspirational (weight 0.25)
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update session with priorities
        await db.project_sessions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "prioritized_needs": prioritized_needs,
                    "tier_weights": tier_weights,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # Track analytics: Priorities set
        await analytics.track_funnel_step(
            step_name="priorities_set",
            step_number=2.5,
            session_id=session_id,
            metadata={
                "must_have_count": len(prioritized_needs.get('must_have', [])),
                "should_have_count": len(prioritized_needs.get('should_have', [])),
                "could_have_count": len(prioritized_needs.get('could_have', [])),
                "want_to_have_count": len(prioritized_needs.get('want_to_have', []))
            }
        )
        
        total_categorized = sum(len(v) for v in prioritized_needs.values())
        
        logger.info(f"Priorities saved for {session_id}: {total_categorized} features categorized")
        
        return {
            "session_id": session_id,
            "prioritized_needs": prioritized_needs,
            "total_categorized": total_categorized,
            "message": f"Priorities saved: {total_categorized} features categorized"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Priorities error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# STEP 3-5: Resolve Full Project (Main Intelligence)
# ============================================================================

@router.post("/resolve")
async def resolve_project(request: ResolveRequest):
    """
    Step 3-5: Complete resolution with AI ranking
    
    This is the CORE intelligence:
    - Filters 693 features → 6-12 bundles
    - Applies business rules
    - Ranks by relevance
    - Auto-resolves dependencies
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": request.session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Run complete resolution
        resolution = await resolver.resolve_project(
            segment=session['segment'],
            property_type=session['property_type'],
            project_stage=session['project_stage'],
            area_sqft=session['area_sqft'],
            selected_objectives=session.get('selected_objectives', []),
            tier_preference=None,  # Let AI decide
            max_bundles=12
        )
        
        # Apply business rules
        project_context = {
            'segment': session['segment'],
            'property_type': session['property_type'],
            'project_stage': session['project_stage'],
            'area_sqft': session['area_sqft'],
            'selected_objectives': session.get('selected_objectives', [])
        }
        
        rules_result = await rules_engine.apply_rules(
            resolution['recommended_bundles'],
            [],  # Features resolved within bundles
            project_context
        )
        
        # Filter out excluded bundles
        excluded_keys = [e['bundle_key'] for e in rules_result['excluded_bundles']]
        filtered_recommended = [
            b for b in resolution['recommended_bundles']
            if b['bundle_key'] not in excluded_keys
        ]
        
        # Add explanations
        explained_bundles = []
        for bundle in filtered_recommended[:8]:  # Top 8 only
            explanation = rules_engine.generate_explanation(
                bundle,
                project_context,
                bundle['score']
            )
            bundle['explanation'] = explanation
            explained_bundles.append(bundle)
        
        # Get substitution suggestions
        substitutions = []
        for sub in rules_result['substituted_bundles']:
            bundle_data = await db.project_bundles.find_one(
                {"bundle_id": sub['suggested_bundle_id']},
                {"_id": 0}
            )
            if bundle_data:
                substitutions.append({
                    **bundle_data,
                    'reason': sub['reason']
                })
        
        # Update session
        await db.project_sessions.update_one(
            {"session_id": request.session_id},
            {
                "$set": {
                    "selected_bundle_ids": request.selected_bundle_ids,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        logger.info(f"Resolved project {request.session_id}: {len(explained_bundles)} bundles")
        
        return {
            "session_id": request.session_id,
            "core_systems": explained_bundles[:6],  # Core 6
            "enhancements": explained_bundles[6:8] + substitutions[:2],  # 2 more + substitutions
            "warnings": rules_result['warnings'],
            "statistics": resolution['statistics'],
            "message": f"Resolved to {len(explained_bundles)} recommended systems"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Resolve error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# STEP 6: Generate BOQ Summary
# ============================================================================

@router.post("/generate-boq")
async def generate_boq(session_id: str = Body(..., embed=True)):
    """
    Step 6: Generate Bill of Quantities summary
    Creates client-facing and internal BOQ documents
    """
    try:
        # Get session with all selections
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get selected proposal type and its systems
        selected_proposal_type = session.get('selected_proposal', 'balanced')
        
        # Get the recommended bundles from resolution
        recommended_bundles = session.get('recommended_bundles', [])
        
        # Filter bundles based on selected proposal
        if selected_proposal_type == 'value':
            # Value: Essential tier only
            bundles = [b for b in recommended_bundles if b.get('tier') == 'Essential']
        elif selected_proposal_type == 'flagship':
            # Flagship: All systems
            bundles = recommended_bundles
        else:  # balanced (default)
            # Balanced: Essential + ~50% Premium
            bundles = recommended_bundles[:6]  # Top 6 systems
        
        # Calculate totals
        total_features = sum(len(b.get('features', [])) for b in bundles)
        
        # Calculate tier breakdown
        tier_breakdown = {}
        for bundle in bundles:
            for feature in bundle.get('features', []):
                tier = feature.get('tier', 'Essential')
                tier_breakdown[tier] = tier_breakdown.get(tier, 0) + 1
        
        # Calculate complexity and timeline
        avg_complexity = sum(b.get('complexity', 5) for b in bundles) / len(bundles) if bundles else 0
        
        if avg_complexity <= 3:
            timeline = "2-4 weeks"
        elif avg_complexity <= 6:
            timeline = "4-8 weeks"
        else:
            timeline = "8-16 weeks"
        
        # Create client summary
        client_summary = {
            "project_overview": {
                "property_type": session['property_type'],
                "area_sqft": session['area_sqft'],
                "project_stage": session['project_stage'],
                "objectives": session.get('selected_objectives', [])
            },
            "selected_systems": [
                {
                    "system_name": b.get('system_domain', 'Unknown'),
                    "tier": b.get('tier', 'Premium'),
                    "complexity": b.get('complexity', 5),
                    "estimated_price": f"AED {b.get('score', 50) * 1000:,.0f} - {b.get('score', 50) * 1500:,.0f}",
                    "key_features": [f.get('feature_name', 'Feature') for f in b.get('features', [])[:3]]
                }
                for b in bundles
            ],
            "tier_breakdown": tier_breakdown,
            "estimated_timeline": timeline,
            "complexity_score": round(avg_complexity, 1),
            "next_steps": [
                "Site survey and detailed measurements",
                "Final system design and engineering",
                "Detailed quotation with itemized pricing",
                "Project timeline and phasing plan"
            ]
        }
        
        # Create internal BOQ skeleton
        internal_boq = {
            "project_id": session_id,
            "proposal_type": selected_proposal_type.upper(),
            "client_info": {
                "contact_name": session.get('contact_name'),
                "contact_email": session.get('contact_email'),
                "contact_phone": session.get('contact_phone')
            },
            "systems": [
                {
                    "system_name": b.get('system_domain', 'Unknown'),
                    "system_domain": b.get('system_domain', 'Unknown'),
                    "features": [
                        {
                            "name": f.get('feature_name', 'Feature'),
                            "tier": f.get('tier', 'Essential'),
                            "complexity": f.get('complexity', 3),
                            "classification": f.get('classification', 'recommended')
                        }
                        for f in b.get('features', [])
                    ],
                    "feature_count": len(b.get('features', [])),
                    "effort_estimate": f"{len(b.get('features', [])) * 15}-{len(b.get('features', [])) * 20} hours",
                    "pricing_notes": f"Based on {len(b.get('features', []))} features",
                    "dependencies": [],  # To be filled by engineer
                    "clarifications_required": []
                }
                for b in bundles
            ],
            "assumptions": [
                "Pricing subject to site survey and final scope confirmation",
                "Excludes civil work, painting, and finishing",
                "Based on LEXA Technology smart home platform",
                "Includes 1-year comprehensive warranty and support"
            ],
            "exclusions": [
                "Furniture, fixtures, and furnishings",
                "Painting, decoration, and interior design",
                "Electrical panel upgrades (if capacity insufficient)",
                "Government approvals, permits, and authority fees"
            ],
            "technical_notes": [
                f"Total systems: {len(bundles)}",
                f"Total features: {total_features}",
                f"Complexity level: {round(avg_complexity, 1)}/10",
                f"Estimated timeline: {timeline}"
            ]
        }
        
        logger.info(f"Generated BOQ for {session_id}")
        
        # Track analytics: BOQ generated
        await analytics.track_conversion(
            conversion_type="boq_generated",
            session_id=session_id,
            metadata={"systems_count": len(bundles), "features_count": total_features}
        )
        
        return {
            "session_id": session_id,
            "client_summary": client_summary,
            "internal_boq": internal_boq,
            "pdf_url": None,  # TODO: Generate PDF
            "message": "BOQ summary generated successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"BOQ generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/generate-boq-pdf")
async def generate_boq_pdf(session_id: str = Body(..., embed=True)):
    """
    Generate downloadable PDF version of BOQ
    Returns: PDF file as streaming response
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # First generate BOQ data
        boq_data = await generate_boq(session_id)
        client_summary = boq_data['client_summary']
        
        # Generate PDF
        pdf_generator = get_pdf_generator()
        pdf_buffer = pdf_generator.generate_client_boq_pdf(client_summary, session_id)
        
        # Save to file for records
        filepath = pdf_generator.save_pdf_to_file(pdf_buffer, session_id)
        logger.info(f"PDF generated: {filepath}")
        
        # Track analytics: PDF downloaded
        await analytics.track_conversion(
            conversion_type="boq_downloaded",
            session_id=session_id
        )
        
        # Return as downloadable file
        pdf_buffer.seek(0)
        
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=LEXA_BOQ_{session_id[:8]}.pdf"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"PDF generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/email-boq")
async def email_boq(
    session_id: str = Body(...),
    recipient_email: str = Body(...),
    recipient_name: str = Body(...)
):
    """
    Email BOQ with PDF attachment to customer
    Returns: Status of email delivery
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Generate BOQ data
        boq_data = await generate_boq(session_id)
        client_summary = boq_data['client_summary']
        
        # Generate PDF
        pdf_generator = get_pdf_generator()
        pdf_buffer = pdf_generator.generate_client_boq_pdf(client_summary, session_id)
        pdf_bytes = pdf_buffer.getvalue()
        
        # Send email with PDF attachment
        email_service = get_boq_email_service()
        result = await email_service.send_boq_email(
            recipient_email=recipient_email,
            recipient_name=recipient_name,
            session_id=session_id,
            client_summary=client_summary,
            pdf_bytes=pdf_bytes
        )
        
        # Update session with email sent flag
        await db.project_sessions.update_one(
            {"session_id": session_id},
            {"$set": {
                "boq_emailed_to": recipient_email,
                "boq_emailed_at": datetime.now(timezone.utc)
            }}
        )
        
        # Track analytics: BOQ emailed
        await analytics.track_conversion(
            conversion_type="boq_emailed",
            session_id=session_id,
            metadata={"recipient": recipient_email}
        )
        
        logger.info(f"BOQ emailed to {recipient_email} for session {session_id}")
        
        return {
            "status": result.get("status"),
            "message": result.get("message"),
            "email_id": result.get("email_id"),
            "recipient": recipient_email
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email BOQ error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# SESSION PERSISTENCE - Save/Resume Functionality
# ============================================================================

@router.post("/generate-resume-link")
async def generate_resume_link(session_id: str = Body(..., embed=True)):
    """
    Generate a unique resume link for the session
    Link valid for 30 days
    """
    try:
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        persistence = get_session_persistence_service(db)
        resume_url = await persistence.generate_resume_link(session_id)
        
        return {
            "session_id": session_id,
            "resume_url": resume_url,
            "expires_in_days": 30,
            "message": "Resume link generated. Save this link to continue later."
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Generate resume link error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/resume/{session_id}")
async def validate_resume_session(session_id: str):
    """
    Validate resume link and return session state
    Frontend calls this when user clicks resume link
    """
    try:
        persistence = get_session_persistence_service(db)
        
        # Validate link
        validation = await persistence.validate_resume_link(session_id)
        
        if not validation['valid']:
            raise HTTPException(
                status_code=400,
                detail=validation['reason']
            )
        
        # Get session state
        state = await persistence.get_session_state(session_id)
        
        return {
            "valid": True,
            "session_state": state,
            "message": "Session restored. Continue where you left off."
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Resume session error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save-progress")
async def save_progress(session_id: str = Body(..., embed=True)):
    """
    Manually save progress (auto-save happens on each step)
    Useful for "Save & Exit" button
    """
    try:
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update last saved timestamp
        await db.project_sessions.update_one(
            {"session_id": session_id},
            {"$set": {
                "manually_saved_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }}
        )
        
        # Generate resume link
        persistence = get_session_persistence_service(db)
        resume_url = await persistence.generate_resume_link(session_id)
        
        return {
            "status": "saved",
            "session_id": session_id,
            "resume_url": resume_url,
            "message": "Progress saved. Use the resume link to continue later."
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Save progress error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# End of email-boq endpoint



# ============================================================================
# STEP 7: Submit to CRM
# ============================================================================

@router.post("/submit")
async def submit_project(request: SubmitProjectRequest):
    """
    Step 7: Final submission with CRM integration
    Calculates lead score and routes to appropriate team
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": request.session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Calculate lead score
        lead_score = builder_service.calculate_lead_score(
            segment=session['segment'],
            property_type=session['property_type'],
            area_sqft=session['area_sqft'],
            budget_provided=request.budget_band is not None,
            timeline=request.timeline,
            num_bundles=len(session.get('selected_bundle_ids', []))
        )
        
        # Determine routing
        routing = builder_service.determine_routing(
            segment=session['segment'],
            property_type=session['property_type'],
            area_sqft=session['area_sqft'],
            lead_score=lead_score
        )
        
        # Update session with final info
        await db.project_sessions.update_one(
            {"session_id": request.session_id},
            {
                "$set": {
                    "contact_name": request.contact_name,
                    "contact_email": request.contact_email,
                    "contact_phone": request.contact_phone,
                    "timeline": request.timeline,
                    "budget_band": request.budget_band,
                    "special_notes": request.notes,
                    "completed": True,
                    "lead_score": lead_score,
                    "routed_to": routing['team'],
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # Create CRM payload
        crm_payload = {
            "lead_id": request.session_id,
            "source": "Smart Project Builder",
            "contact": {
                "name": request.contact_name,
                "email": request.contact_email,
                "phone": request.contact_phone
            },
            "project": {
                "segment": session['segment'],
                "property_type": session['property_type'],
                "area_sqft": session['area_sqft'],
                "stage": session['project_stage'],
                "location": session.get('location'),
                "objectives": session.get('selected_objectives', []),
                "bundles_count": len(session.get('selected_bundle_ids', []))
            },
            "qualification": {
                "lead_score": lead_score,
                "tier": "HOT" if lead_score >= 60 else "WARM" if lead_score >= 40 else "NURTURE",
                "timeline": request.timeline,
                "budget_band": request.budget_band
            },
            "routing": routing,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Send to CRM webhook (async integration)
        crm_service = get_crm_service()
        crm_result = await crm_service.send_lead_to_crm(
            session_data=crm_payload,
            lead_score=lead_score,
            routing=routing
        )
        
        # Track analytics: Project submitted (final conversion)
        await analytics.track_conversion(
            conversion_type="project_submitted",
            session_id=request.session_id,
            value=None,
            metadata={
                "lead_score": lead_score,
                "lead_tier": crm_payload['qualification']['tier'],
                "routed_to": routing['team']
            }
        )
        
        logger.info(f"Submitted project {request.session_id}: Score {lead_score}, CRM: {crm_result['status']}")
        
        return {
            "session_id": request.session_id,
            "lead_score": lead_score,
            "lead_tier": crm_payload['qualification']['tier'],
            "routing": routing,
            "crm_integration": {
                "status": crm_result['status'],
                "message": crm_result.get('message')
            },
            "message": "Project submitted successfully",
            "next_steps": routing['next_steps']
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Submit error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))



# ============================================================================
# NEW ENDPOINTS: Dependency Resolution & Proposal Generation
# ============================================================================

async def _process_resolution_job(
    session_id: str,
    selected_bundle_ids: List[str],
    db: AsyncIOMotorDatabase
):
    """
    Background task to process resolution with AI reasoning
    Updates job status in MongoDB as it progresses
    """
    job_id = session_id  # Use session_id as job_id for simplicity
    
    try:
        # Update job status: started
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {
                "status": "processing",
                "progress": 10,
                "message": "Analyzing project requirements...",
                "updated_at": datetime.now(timezone.utc)
            }},
            upsert=True
        )
        
        # Get session
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            await db.resolution_jobs.update_one(
                {"job_id": job_id},
                {"$set": {
                    "status": "failed",
                    "error": "Session not found",
                    "updated_at": datetime.now(timezone.utc)
                }}
            )
            return
        
        # Run resolution
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {"progress": 20, "message": "Running intelligence filters..."}}
        )
        
        resolution = await resolver.resolve_project(
            segment=session['segment'],
            property_type=session['property_type'],
            project_stage=session['project_stage'],
            area_sqft=session['area_sqft'],
            selected_objectives=session.get('selected_objectives', []),
            tier_preference=None,
            max_bundles=12
        )
        
        # Extract bundle keys
        bundle_keys = [b['bundle_key'] for b in resolution['recommended_bundles'][:8]]
        
        # Resolve dependencies
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {"progress": 35, "message": "Resolving system dependencies..."}}
        )
        
        project_context = {
            'segment': session['segment'],
            'property_type': session['property_type'],
            'project_stage': session['project_stage'],
            'area_sqft': session['area_sqft'],
            'selected_objectives': session.get('selected_objectives', [])
        }
        
        dependency_result = await dependency_graph.resolve_bundles_with_dependencies(
            bundle_keys,
            project_context
        )
        
        # Enrich bundles with AI reasoning (PARALLEL processing for speed)
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {"progress": 50, "message": "Generating AI reasoning..."}}
        )
        
        import asyncio
        
        async def process_single_bundle(bundle: Dict, idx: int, total: int) -> Dict:
            """Process a single bundle with AI reasoning in parallel"""
            try:
                # Generate system-level reasoning
                try:
                    system_reasoning = await ai_reasoning.generate_system_recommendation(
                        bundle['system_domain'],
                        project_context,
                        bundle['score']
                    )
                except Exception as e:
                    logger.warning(f"AI reasoning failed for {bundle['system_domain']}: {str(e)}")
                    system_reasoning = f"{bundle['system_domain']} system recommended based on your project requirements."
                
                # Process features in parallel too
                async def process_feature(i: int, feature: Dict) -> Dict:
                    if i < 3:  # Generate AI reasoning for top 3 features
                        try:
                            feature_reasoning = await ai_reasoning.generate_feature_reasoning(
                                feature,
                                bundle,
                                project_context
                            )
                        except Exception as e:
                            logger.warning(f"Feature reasoning failed: {str(e)}")
                            feature_reasoning = f"{feature.get('feature_name')} enhances your {bundle['system_domain'].lower()} capabilities."
                    else:
                        feature_reasoning = f"{feature.get('feature_name')} provides {feature.get('tier', 'essential').lower()}-tier functionality."
                    
                    return {
                        **feature,
                        'ai_reasoning': feature_reasoning,
                        'classification': builder_service.classify_feature(feature, bundle, project_context)
                    }
                
                # Process all features for this bundle in parallel
                enriched_features = await asyncio.gather(*[
                    process_feature(i, feature)
                    for i, feature in enumerate(bundle['features'][:5])
                ])
                
                # Update progress
                progress = 50 + int(((idx + 1) / total) * 30)
                await db.resolution_jobs.update_one(
                    {"job_id": job_id},
                    {"$set": {
                        "progress": progress,
                        "message": f"Analyzed {bundle['system_domain']} system..."
                    }}
                )
                
                return {
                    **bundle,
                    'features': list(enriched_features),
                    'system_reasoning': system_reasoning
                }
            except Exception as e:
                logger.error(f"Bundle processing failed for {bundle.get('system_domain')}: {str(e)}")
                # Return bundle with fallback reasoning
                return {
                    **bundle,
                    'features': bundle['features'][:5],
                    'system_reasoning': f"{bundle['system_domain']} system recommended for your project."
                }
        
        # Process ALL bundles in parallel (huge speed boost!)
        total_bundles = len(resolution['recommended_bundles'][:8])
        enriched_bundles = await asyncio.gather(*[
            process_single_bundle(bundle, idx, total_bundles)
            for idx, bundle in enumerate(resolution['recommended_bundles'][:8])
        ])
        
        # Generate proposals
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {"progress": 85, "message": "Generating proposals..."}}
        )
        
        proposals = await proposal_generator.generate_proposals(
            enriched_bundles,
            project_context,
            dependency_result['auto_added_features']
        )
        
        # Generate dependency graph visualization data
        systems = list(set(
            b.get('system_domain', 'General') 
            for b in enriched_bundles
        ))
        graph_data = dependency_graph.generate_dependency_graph_data(systems)
        
        # Save results to session
        await db.project_sessions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "selected_bundle_ids": selected_bundle_ids,
                    "recommended_bundles": enriched_bundles,
                    "proposals": proposals,
                    "dependency_graph": graph_data,
                    "resolved_systems": systems,
                    "statistics": resolution['statistics'],
                    "dependencies": {
                        "auto_added_systems": dependency_result['auto_added_systems'],
                        "auto_added_features": dependency_result['auto_added_features'],
                        "warnings": dependency_result['warnings']
                    },
                    "resolved_at": datetime.now(timezone.utc),
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # Mark job as complete
        result_data = {
            "session_id": session_id,
            "recommended_bundles": enriched_bundles,
            "dependencies": {
                "auto_added_systems": dependency_result['auto_added_systems'],
                "auto_added_features": dependency_result['auto_added_features'],
                "warnings": dependency_result['warnings'],
                "conflicts": dependency_result['conflicts']
            },
            "dependency_graph": graph_data,
            "proposals": proposals,
            "statistics": resolution['statistics'],
            "message": f"Resolved to {len(systems)} systems with {len(dependency_result['auto_added_systems'])} dependencies"
        }
        
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {
                "status": "completed",
                "progress": 100,
                "message": "Analysis complete!",
                "result": result_data,
                "completed_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }}
        )
        
        # Track analytics: Intelligence analysis completed
        await analytics.track_funnel_step(
            step_name="intelligence_analysis_completed",
            step_number=3,
            session_id=session_id,
            metadata={
                "systems_count": len(systems),
                "features_count": sum(len(b.get('features', [])) for b in enriched_bundles),
                "proposals_generated": len(proposals)
            }
        )
        
        logger.info(f"Resolution job completed for {session_id}")
        
    except Exception as e:
        logger.error(f"Resolution job failed for {session_id}: {str(e)}")
        await db.resolution_jobs.update_one(
            {"job_id": job_id},
            {"$set": {
                "status": "failed",
                "error": str(e),
                "updated_at": datetime.now(timezone.utc)
            }}
        )


@router.post("/resolve-with-dependencies")
async def resolve_with_dependencies(request: ResolveRequest):
    """
    Enhanced resolution with dependency graph (Async Job-based)
    Immediately returns job_id for status polling
    """
    try:
        # Get session
        session = await db.project_sessions.find_one({"session_id": request.session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Create job record
        job_id = request.session_id
        await db.resolution_jobs.insert_one({
            "job_id": job_id,
            "session_id": request.session_id,
            "status": "queued",
            "progress": 0,
            "message": "Queued for processing...",
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        })
        
        # Start background processing (fire and forget)
        import asyncio
        asyncio.create_task(_process_resolution_job(
            request.session_id,
            request.selected_bundle_ids,
            db
        ))
        
        logger.info(f"Started resolution job for {request.session_id}")
        
        return {
            "job_id": job_id,
            "session_id": request.session_id,
            "status": "queued",
            "message": "Resolution job started. Poll /api/project-builder/job-status/{job_id} for progress.",
            "poll_interval_ms": 2000  # Recommend polling every 2 seconds
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Resolve with dependencies error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/job-status/{job_id}")
async def get_job_status(job_id: str):
    """
    Poll this endpoint to get status of resolution job
    Returns: status (queued/processing/completed/failed), progress (0-100), result (when completed)
    """
    try:
        job = await db.resolution_jobs.find_one({"job_id": job_id}, {"_id": 0})
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        return {
            "job_id": job_id,
            "status": job.get('status'),
            "progress": job.get('progress', 0),
            "message": job.get('message', ''),
            "result": job.get('result') if job.get('status') == 'completed' else None,
            "error": job.get('error') if job.get('status') == 'failed' else None,
            "updated_at": job.get('updated_at')
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Job status error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/dependency-graph")
async def get_dependency_graph(session_id: str):
    """
    Get dependency graph visualization data for a session
    """
    try:
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        systems = session.get('resolved_systems', [])
        if not systems:
            return {
                "nodes": [],
                "edges": [],
                "message": "No systems resolved yet"
            }
        
        graph_data = dependency_graph.generate_dependency_graph_data(systems)
        
        return {
            "session_id": session_id,
            "graph": graph_data,
            "systems_count": len(systems)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Dependency graph error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/select-proposal")
async def select_proposal(
    session_id: str = Body(...),
    proposal_type: str = Body(...)
):
    """
    User selects a proposal (value/balanced/flagship)
    Updates session with final selection
    """
    try:
        if proposal_type not in ['value', 'balanced', 'flagship']:
            raise HTTPException(status_code=400, detail="Invalid proposal type")
        
        session = await db.project_sessions.find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update session
        await db.project_sessions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "selected_proposal": proposal_type,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        
        # Track analytics: Proposal selected
        await analytics.track_funnel_step(
            step_name="proposal_selected",
            step_number=4,
            session_id=session_id,
            metadata={"proposal_type": proposal_type}
        )
        
        logger.info(f"Session {session_id} selected {proposal_type} proposal")
        
        return {
            "session_id": session_id,
            "selected_proposal": proposal_type,
            "message": f"{proposal_type.title()} proposal selected successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Select proposal error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))



# ============================================================================
# ANALYTICS DASHBOARD
# ============================================================================

@router.get("/analytics/overview")
async def get_analytics_overview():
    """
    Get analytics overview for dashboard
    Returns: Conversion metrics, funnel stats, lead quality
    """
    try:
        from datetime import timedelta
        
        # Get date ranges
        now = datetime.now(timezone.utc)
        thirty_days_ago = now - timedelta(days=30)
        seven_days_ago = now - timedelta(days=7)
        
        # Total sessions
        total_sessions = await db.project_sessions.count_documents({})
        sessions_30d = await db.project_sessions.count_documents({
            "created_at": {"$gte": thirty_days_ago}
        })
        sessions_7d = await db.project_sessions.count_documents({
            "created_at": {"$gte": seven_days_ago}
        })
        
        # Completed sessions (submissions)
        completed_sessions = await db.project_sessions.count_documents({
            "completed": True
        })
        completed_30d = await db.project_sessions.count_documents({
            "completed": True,
            "completed_at": {"$gte": thirty_days_ago}
        })
        
        # Lead quality distribution
        hot_leads = await db.project_sessions.count_documents({"lead_tier": "HOT"})
        warm_leads = await db.project_sessions.count_documents({"lead_tier": "WARM"})
        nurture_leads = await db.project_sessions.count_documents({"lead_tier": "NURTURE"})
        
        # Funnel analysis
        funnel_stages = {}
        pipeline = [
            {"$group": {
                "_id": "$current_step",
                "count": {"$sum": 1}
            }}
        ]
        async for stage in db.project_sessions.aggregate(pipeline):
            funnel_stages[stage["_id"] or "unknown"] = stage["count"]
        
        # Segment distribution
        segment_pipeline = [
            {"$group": {
                "_id": "$segment",
                "count": {"$sum": 1}
            }}
        ]
        segments = {}
        async for seg in db.project_sessions.aggregate(segment_pipeline):
            segments[seg["_id"] or "unknown"] = seg["count"]
        
        # Property type distribution
        property_pipeline = [
            {"$group": {
                "_id": "$property_type",
                "count": {"$sum": 1}
            }}
        ]
        property_types = {}
        async for prop in db.project_sessions.aggregate(property_pipeline):
            property_types[prop["_id"] or "unknown"] = prop["count"]
        
        # Proposal selection distribution
        proposal_pipeline = [
            {"$match": {"selected_proposal": {"$exists": True, "$ne": None}}},
            {"$group": {
                "_id": "$selected_proposal",
                "count": {"$sum": 1}
            }}
        ]
        proposals = {}
        async for prop in db.project_sessions.aggregate(proposal_pipeline):
            proposals[prop["_id"] or "unknown"] = prop["count"]
        
        # Conversion rate
        conversion_rate = (completed_sessions / total_sessions * 100) if total_sessions > 0 else 0
        
        return {
            "overview": {
                "total_sessions": total_sessions,
                "sessions_30d": sessions_30d,
                "sessions_7d": sessions_7d,
                "completed_sessions": completed_sessions,
                "completed_30d": completed_30d,
                "conversion_rate": round(conversion_rate, 1)
            },
            "lead_quality": {
                "hot": hot_leads,
                "warm": warm_leads,
                "nurture": nurture_leads
            },
            "funnel_stages": funnel_stages,
            "segments": segments,
            "property_types": property_types,
            "proposal_selections": proposals,
            "generated_at": now.isoformat()
        }
    
    except Exception as e:
        logger.error(f"Analytics overview error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/analytics/sessions")
async def get_analytics_sessions(
    limit: int = 50,
    offset: int = 0,
    status: Optional[str] = None
):
    """
    Get list of sessions with analytics data
    """
    try:
        query = {}
        if status == "completed":
            query["completed"] = True
        elif status == "in_progress":
            query["completed"] = {"$ne": True}
        
        sessions = await db.project_sessions.find(
            query,
            {
                "_id": 0,
                "session_id": 1,
                "segment": 1,
                "property_type": 1,
                "area_sqft": 1,
                "project_stage": 1,
                "selected_proposal": 1,
                "lead_tier": 1,
                "lead_score": 1,
                "completed": 1,
                "created_at": 1,
                "updated_at": 1,
                "contact_name": 1,
                "contact_email": 1
            }
        ).sort("created_at", -1).skip(offset).limit(limit).to_list(limit)
        
        total = await db.project_sessions.count_documents(query)
        
        return {
            "sessions": sessions,
            "total": total,
            "limit": limit,
            "offset": offset
        }
    
    except Exception as e:
        logger.error(f"Analytics sessions error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

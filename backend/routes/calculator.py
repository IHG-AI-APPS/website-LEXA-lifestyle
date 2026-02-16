"""
Calculator API routes (cost calculator, submissions, quotes, ROI)
"""
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from models.submissions import (
    CostCalculatorInput,
    CostCalculatorResult,
    CalculatorSubmission,
    CalculatorSubmissionCreate,
    CalculatorQuote
)
from services.pricing_engine import PricingEngine
from services.email_service import EmailService
from services.pdf_generator import PDFQuoteGenerator
from services.erpnext_service import erpnext_service
from routes.pricing import (
    get_calculator_solutions_data, 
    get_additional_features_data,
    DEFAULT_CALCULATOR_PRICING,
    DEFAULT_ADDITIONAL_FEATURES
)
from datetime import datetime, timezone
import os
import logging
import httpx

router = APIRouter(prefix="/api/calculator", tags=["calculator"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


async def trigger_n8n_webhook(url: str, data: dict):
    """Helper to trigger N8N webhooks"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data, timeout=10.0)
            response.raise_for_status()
            logger.info(f"N8N webhook triggered successfully: {url}")
    except Exception as e:
        logger.error(f"N8N webhook failed: {str(e)}")


def convert_solutions_format(db_solutions_data: dict) -> dict:
    """
    Convert database format to pricing engine format.
    DB format: {"residential": [{"id": "security-access", "levels": [{"id": "basic", "price_min": X}]}]}
    Engine format: {"residential": {"security-access": {"basic": X}}}
    """
    result = {}
    for project_type, solutions in db_solutions_data.items():
        result[project_type] = {}
        for solution in solutions:
            solution_id = solution.get("id")
            if solution_id:
                result[project_type][solution_id] = {}
                for level in solution.get("levels", []):
                    level_id = level.get("id")
                    # Use price_min as the base price for calculations
                    price = level.get("price_min", level.get("price", 0))
                    result[project_type][solution_id][level_id] = price
    return result


def convert_features_format(db_features_data: list) -> dict:
    """
    Convert database format to pricing engine format.
    DB format: [{"id": "voice-control", "price_min": X}]
    Engine format: {"voice-control": X}
    """
    result = {}
    for feature in db_features_data:
        feature_id = feature.get("id")
        # Use price_min as the base price, fallback to price
        price = feature.get("price_min", feature.get("price", 0))
        result[feature_id] = price
    return result


async def get_dynamic_pricing():
    """Fetch pricing data from database and convert to pricing engine format"""
    try:
        solutions_data = await get_calculator_solutions_data()
        additional_data = await get_additional_features_data()
        
        solutions_pricing = convert_solutions_format(solutions_data)
        additional_pricing = convert_features_format(additional_data)
        
        return solutions_pricing, additional_pricing
    except Exception as e:
        logger.warning(f"Failed to fetch dynamic pricing, using defaults: {e}")
        return None, None


@router.post("/cost", response_model=CostCalculatorResult)
async def calculate_cost(input: CostCalculatorInput):
    """Calculate estimated cost for smart home automation"""
    try:
        # Base costs per system - Reduced by 50% for accessibility
        system_costs = {
            "home_theater": 75000,
            "lighting": 40000,
            "security": 50000,
            "climate": 35000,
            "audio": 30000,
            "networking": 20000
        }
        
        # Calculate base cost
        total_min = 0
        total_max = 0
        
        for system in input.systems:
            system_key = system.lower().replace(" ", "_").replace("-", "_")
            base_cost = system_costs.get(system_key, 50000)
            total_min += base_cost
            total_max += base_cost * 1.5
        
        # Square footage multiplier
        if input.square_footage > 5000:
            total_min *= 1.3
            total_max *= 1.3
        elif input.square_footage > 3000:
            total_min *= 1.15
            total_max *= 1.15
        
        # Property type multiplier
        if input.property_type == "villa":
            total_min *= 1.2
            total_max *= 1.2
        elif input.property_type == "commercial":
            total_min *= 1.4
            total_max *= 1.4
        
        # Timeline estimation (weeks)
        timeline = 8 + (len(input.systems) * 2)
        if input.square_footage > 5000:
            timeline += 4
        
        return CostCalculatorResult(
            estimated_cost_min=int(total_min),
            estimated_cost_max=int(total_max),
            timeline_weeks=timeline,
            recommended_solutions=input.systems
        )
    except Exception as e:
        logger.error(f"Calculator error: {str(e)}")
        raise HTTPException(status_code=500, detail="Calculation failed")


@router.post("/submit", response_model=CalculatorSubmission)
async def submit_calculator(input: CalculatorSubmissionCreate):
    """Submit comprehensive calculator form with advanced pricing calculation"""
    try:
        # Fetch dynamic pricing from database
        solutions_pricing, additional_pricing = await get_dynamic_pricing()
        
        # Calculate quote using pricing engine with dynamic pricing
        quote = PricingEngine.calculate_quote(
            project_type=input.project_type,
            sub_category=input.sub_category,
            total_area=input.total_area,
            num_rooms=input.num_rooms,
            num_floors=input.num_floors,
            construction_stage=input.construction_stage,
            selected_solutions=input.selected_solutions,
            additional_features=input.additional_features,
            timeline=input.timeline,
            budget_range=input.budget_range,
            privilege_card=input.privilege_card,
            solutions_pricing=solutions_pricing,
            additional_features_pricing=additional_pricing,
        )
        
        # Create submission document
        submission = CalculatorSubmission(
            **input.model_dump(),
            total_cost=quote["total_cost"],
            estimated_timeline_weeks=quote["estimated_timeline_weeks"],
            cost_breakdown=quote["cost_breakdown"],
        )
        
        # Save to database
        doc = submission.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.calculator_submissions.insert_one(doc)
        
        # Send customer confirmation email
        try:
            await EmailService.send_calculator_confirmation(
                customer_name=submission.contact_name,
                customer_email=submission.contact_email,
                project_type=submission.project_type,
                total_cost=submission.total_cost,
                estimated_timeline=submission.estimated_timeline_weeks,
                cost_breakdown=submission.cost_breakdown,
            )
        except Exception as email_error:
            logger.error(f"Failed to send customer confirmation: {str(email_error)}")
        
        # Send sales team notification
        try:
            sales_email = os.getenv('SALES_EMAIL', 'sales@lexalifestyle.ae')
            await EmailService.send_sales_notification(
                submission_id=submission.id,
                customer_name=submission.contact_name,
                customer_email=submission.contact_email,
                customer_phone=submission.contact_phone,
                project_type=submission.project_type,
                sub_category=submission.sub_category,
                total_area=submission.total_area,
                emirate=submission.emirate,
                city=submission.city or "",
                total_cost=submission.total_cost,
                timeline=submission.timeline,
                budget_range=submission.budget_range,
                selected_solutions=submission.selected_solutions,
                sales_email=sales_email,
            )
        except Exception as email_error:
            logger.error(f"Failed to send sales notification: {str(email_error)}")
        
        # Trigger N8N webhook if configured
        n8n_webhook_url = os.getenv('N8N_CALCULATOR_WEBHOOK_URL')
        if n8n_webhook_url:
            webhook_data = {
                "type": "calculator_submission",
                "id": submission.id,
                "project_type": submission.project_type,
                "total_cost": submission.total_cost,
                "contact_name": submission.contact_name,
                "contact_email": submission.contact_email,
                "contact_phone": submission.contact_phone,
                "emirate": submission.emirate,
                "city": submission.city,
                "timeline": submission.timeline,
                "budget_range": submission.budget_range,
                "timestamp": submission.timestamp.isoformat(),
            }
            await trigger_n8n_webhook(n8n_webhook_url, webhook_data)
        
        # Create lead in ERPNext if configured
        try:
            erpnext_result = await erpnext_service.create_lead(
                submission_id=submission.id,
                contact_name=submission.contact_name,
                contact_email=submission.contact_email,
                contact_phone=submission.contact_phone,
                company=submission.contact_company or "",
                project_type=submission.project_type,
                total_cost=submission.total_cost,
                emirate=submission.emirate,
                notes=f"Project: {submission.project_type} - {submission.sub_category}\nBudget: {submission.budget_range}\nTimeline: {submission.timeline}",
            )
            
            if erpnext_result["status"] == "success":
                logger.info(f"ERPNext lead created: {erpnext_result.get('lead_id')}")
            elif erpnext_result["status"] == "error":
                logger.error(f"ERPNext lead creation failed: {erpnext_result.get('error')}")
        except Exception as erp_error:
            logger.error(f"ERPNext integration error: {str(erp_error)}")
        
        logger.info(f"Calculator submission created: {submission.id}")
        return submission
    except Exception as e:
        logger.error(f"Calculator submission error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to submit calculator: {str(e)}")


@router.post("/quote", response_model=CalculatorQuote)
async def get_calculator_quote(input: CalculatorSubmissionCreate):
    """Get a quote without saving to database (for preview/calculation only)"""
    try:
        # Fetch dynamic pricing from database
        solutions_pricing, additional_pricing = await get_dynamic_pricing()
        
        # Calculate quote using pricing engine with dynamic pricing
        quote = PricingEngine.calculate_quote(
            project_type=input.project_type,
            sub_category=input.sub_category,
            total_area=input.total_area,
            num_rooms=input.num_rooms,
            num_floors=input.num_floors,
            construction_stage=input.construction_stage,
            selected_solutions=input.selected_solutions,
            additional_features=input.additional_features,
            timeline=input.timeline,
            budget_range=input.budget_range,
            privilege_card=input.privilege_card,
            solutions_pricing=solutions_pricing,
            additional_features_pricing=additional_pricing,
        )
        
        return CalculatorQuote(**quote)
    except Exception as e:
        logger.error(f"Quote calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to calculate quote: {str(e)}")


@router.get("/submission/{submission_id}/pdf")
async def download_quote_pdf(submission_id: str):
    """Download PDF quote for a calculator submission"""
    try:
        # Get submission from database
        submission = await db.calculator_submissions.find_one({"id": submission_id}, {"_id": 0})
        
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        # Generate PDF
        pdf_buffer = PDFQuoteGenerator.generate_quote_pdf(
            submission_id=submission['id'],
            project_type=submission['project_type'],
            sub_category=submission['sub_category'],
            total_area=submission['total_area'],
            emirate=submission['emirate'],
            city=submission.get('city', ''),
            contact_name=submission['contact_name'],
            contact_email=submission['contact_email'],
            contact_phone=submission['contact_phone'],
            total_cost=submission['total_cost'],
            estimated_timeline_weeks=submission['estimated_timeline_weeks'],
            cost_breakdown=submission['cost_breakdown'],
            timeline=submission['timeline'],
            budget_range=submission['budget_range'],
            selected_solutions=submission['selected_solutions'],
            additional_features=submission.get('additional_features', []),
        )
        
        # Return PDF as streaming response
        filename = f"LEXA_Quote_{submission_id[:8]}.pdf"
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"PDF generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")


@router.post("/roi")
async def calculate_roi(request: Request):
    """Advanced ROI Calculator - Dubai Optimized with Premium Benefits"""
    try:
        data = await request.json()
        
        # Input parameters
        property_size = data.get("property_size", 3000)
        property_type = data.get("property_type", "Villa")
        num_rooms = data.get("num_rooms", 5)
        selected_systems = data.get("systems", [])
        current_energy_cost = data.get("current_energy_cost", 1500)
        electricity_rate = data.get("electricity_rate", 0.38)
        
        # Dubai-optimized system costs (AED) - More competitive pricing
        system_costs = {
            "Lighting Control": {"equipment": 18000, "installation": 7000, "monthly_savings": 280, "property_value_add": 0.008},
            "Climate Control": {"equipment": 28000, "installation": 12000, "monthly_savings": 520, "property_value_add": 0.012},
            "Security & Access": {"equipment": 22000, "installation": 9000, "monthly_savings": 180, "property_value_add": 0.015},
            "Audio/Visual": {"equipment": 35000, "installation": 15000, "monthly_savings": 50, "property_value_add": 0.010},
            "Shading & Blinds": {"equipment": 16000, "installation": 6000, "monthly_savings": 220, "property_value_add": 0.006},
            "Energy Management": {"equipment": 12000, "installation": 5000, "monthly_savings": 450, "property_value_add": 0.008},
            "Networking": {"equipment": 10000, "installation": 4000, "monthly_savings": 80, "property_value_add": 0.004}
        }
        
        # Property value estimation based on Dubai market (AED per sqft)
        property_values_per_sqft = {
            "Villa": 1800,
            "Apartment": 1400,
            "Penthouse": 2500,
            "Townhouse": 1600,
            "Commercial": 2200
        }
        
        estimated_property_value = property_size * property_values_per_sqft.get(property_type, 1500)
        
        # Calculate total costs and benefits
        total_equipment = 0
        total_installation = 0
        total_monthly_savings = 0
        total_property_value_add_pct = 0
        
        for system in selected_systems:
            if system in system_costs:
                total_equipment += system_costs[system]["equipment"]
                total_installation += system_costs[system]["installation"]
                total_monthly_savings += system_costs[system]["monthly_savings"]
                total_property_value_add_pct += system_costs[system]["property_value_add"]
        
        # Property size adjustments (smaller multiplier for better ROI)
        size_multiplier = 1.0
        if property_size > 5000:
            size_multiplier = 1.15
        elif property_size > 3000:
            size_multiplier = 1.08
        
        # Room-based adjustment (economies of scale)
        room_multiplier = 1.0 + (max(0, num_rooms - 4) * 0.03)
        
        total_equipment = int(total_equipment * size_multiplier * room_multiplier)
        total_installation = int(total_installation * size_multiplier * room_multiplier)
        
        # Calculate totals
        initial_investment = total_equipment + total_installation
        annual_maintenance = int(initial_investment * 0.02)  # Reduced maintenance cost
        annual_savings = total_monthly_savings * 12
        
        # Dubai-specific additional benefits
        property_value_increase = int(estimated_property_value * total_property_value_add_pct)
        rental_premium_monthly = int(estimated_property_value * 0.00015 * len(selected_systems))  # Smart home rental premium
        insurance_savings_annual = int(initial_investment * 0.01) if "Security & Access" in selected_systems else 0
        
        # Total annual benefit including all factors
        total_annual_benefit = annual_savings + (rental_premium_monthly * 12) + insurance_savings_annual
        
        # Calculate ROI timeline with comprehensive benefits
        roi_timeline = []
        for year in [1, 2, 3, 5, 7, 10]:
            cumulative_savings = total_annual_benefit * year
            cumulative_costs = initial_investment + (annual_maintenance * year)
            net_benefit = cumulative_savings - cumulative_costs + property_value_increase
            roi_percentage = (net_benefit / initial_investment) * 100 if initial_investment > 0 else 0
            
            roi_timeline.append({
                "year": year,
                "cumulative_savings": int(cumulative_savings),
                "cumulative_costs": int(cumulative_costs),
                "net_benefit": int(net_benefit),
                "roi_percentage": round(roi_percentage, 1)
            })
        
        # Calculate break-even (faster due to better benefits)
        break_even_years = 0
        net_annual_benefit = total_annual_benefit - annual_maintenance
        if net_annual_benefit > 0:
            break_even_years = initial_investment / net_annual_benefit
        
        # Environmental impact (Dubai-specific factors)
        energy_saved_kwh = (total_monthly_savings / electricity_rate) * 12 if electricity_rate > 0 else 0
        co2_reduction = energy_saved_kwh * 0.45  # Dubai grid carbon intensity
        water_savings = property_size * 0.5 if "Climate Control" in selected_systems else 0  # Liters annual
        
        return {
            "costs": {
                "equipment": total_equipment,
                "installation": total_installation,
                "initial_investment": initial_investment,
                "annual_maintenance": annual_maintenance
            },
            "savings": {
                "monthly": int(total_monthly_savings),
                "annual": int(annual_savings),
                "rental_premium_monthly": rental_premium_monthly,
                "insurance_savings_annual": insurance_savings_annual,
                "total_annual_benefit": int(total_annual_benefit)
            },
            "property_benefits": {
                "estimated_property_value": int(estimated_property_value),
                "value_increase": property_value_increase,
                "value_increase_percentage": round(total_property_value_add_pct * 100, 1)
            },
            "roi_timeline": roi_timeline,
            "break_even_years": round(break_even_years, 1) if break_even_years > 0 else 0,
            "environmental": {
                "energy_saved_kwh_annual": int(energy_saved_kwh),
                "co2_reduction_kg_annual": int(co2_reduction),
                "water_savings_liters_annual": int(water_savings),
                "trees_equivalent": round(co2_reduction / 21, 1)
            },
            "system_breakdown": [
                {
                    "system": system,
                    "equipment_cost": int(system_costs[system]["equipment"] * size_multiplier * room_multiplier),
                    "installation_cost": int(system_costs[system]["installation"] * size_multiplier * room_multiplier),
                    "monthly_savings": system_costs[system]["monthly_savings"],
                    "property_value_add_pct": round(system_costs[system]["property_value_add"] * 100, 1)
                }
                for system in selected_systems if system in system_costs
            ],
            "dubai_insights": {
                "market_trend": "Smart home properties in Dubai command 8-15% higher rental yields",
                "resale_advantage": "Smart-enabled villas sell 20% faster in premium Dubai communities",
                "dewa_savings": f"Estimated DEWA bill reduction: {round((total_monthly_savings/current_energy_cost)*100) if current_energy_cost > 0 else 0}%"
            }
        }
    except Exception as e:
        logger.error(f"ROI Calculator error: {str(e)}")
        raise HTTPException(status_code=500, detail="ROI calculation failed")

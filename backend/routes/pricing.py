"""
Pricing Management API
Centralized pricing configuration that can be edited from admin panel
All prices are stored in MongoDB and fetched dynamically
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/pricing", tags=["pricing"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'lexa_db')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000, connectTimeoutMS=5000)
db = client[db_name]

# ============= MODELS =============

class SolutionLevel(BaseModel):
    id: str
    label: str
    price_min: int
    price_max: int

class Solution(BaseModel):
    id: str
    label: str
    levels: List[SolutionLevel]

class ProjectTypePricing(BaseModel):
    project_type: str
    solutions: List[Solution]

class AdditionalFeature(BaseModel):
    id: str
    label: str
    price_min: int
    price_max: int

class PackageBundle(BaseModel):
    id: str
    name: str
    description: str
    solutions: Dict[str, str]
    features: List[str]
    price_range: str
    best_for: str

class SystemPricing(BaseModel):
    id: str
    name: str
    tier: str
    price_min: int
    price_max: int
    description: str

class BudgetRange(BaseModel):
    id: str
    label: str
    description: str
    min_value: int
    max_value: int

class UpgradeFeature(BaseModel):
    id: str
    label: str
    price: int

class PackageTierPricing(BaseModel):
    budget_tier: str  # starter, standard, premium, luxury, ultra
    essential_min: int
    essential_max: int
    premium_min: int
    premium_max: int
    ultimate_min: int
    ultimate_max: int

# ============= DEFAULT DATA =============

DEFAULT_CALCULATOR_PRICING = {
    "residential": [
        {"id": "security-access", "label": "Security & Access Control", "levels": [
            {"id": "basic", "label": "Basic (Smart Locks + Cameras)", "price_min": 25000, "price_max": 38000},
            {"id": "standard", "label": "Standard (AI Detection + Access Control)", "price_min": 50000, "price_max": 75000},
            {"id": "premium", "label": "Premium (Biometric + Full Integration)", "price_min": 100000, "price_max": 150000}
        ]},
        {"id": "lighting", "label": "Lighting Automation", "levels": [
            {"id": "basic", "label": "Basic (Wireless Smart Lights)", "price_min": 20000, "price_max": 30000},
            {"id": "standard", "label": "Standard (Wired with Scenes)", "price_min": 40000, "price_max": 60000},
            {"id": "premium", "label": "Premium (Lutron HomeWorks)", "price_min": 75000, "price_max": 112000}
        ]},
        {"id": "climate", "label": "Climate Control (HVAC)", "levels": [
            {"id": "basic", "label": "Basic (Smart Thermostats)", "price_min": 18000, "price_max": 27000},
            {"id": "standard", "label": "Standard (Zone Control)", "price_min": 35000, "price_max": 52000},
            {"id": "premium", "label": "Premium (Full HVAC Integration)", "price_min": 60000, "price_max": 90000}
        ]},
        {"id": "entertainment", "label": "Entertainment Systems", "levels": [
            {"id": "basic", "label": "Basic (Multi-Room Audio)", "price_min": 30000, "price_max": 45000},
            {"id": "standard", "label": "Standard (Home Cinema 7.1)", "price_min": 75000, "price_max": 112000},
            {"id": "premium", "label": "Premium (Dolby Atmos 9.2.4)", "price_min": 140000, "price_max": 210000}
        ]},
        {"id": "energy", "label": "Energy Management", "levels": [
            {"id": "basic", "label": "Basic (Monitoring)", "price_min": 12000, "price_max": 18000},
            {"id": "standard", "label": "Standard (Solar Integration)", "price_min": 25000, "price_max": 38000},
            {"id": "premium", "label": "Premium (Full Energy + EV)", "price_min": 50000, "price_max": 75000}
        ]},
        {"id": "shades", "label": "Motorized Shades", "levels": [
            {"id": "basic", "label": "Basic (5-8 Windows)", "price_min": 15000, "price_max": 22000},
            {"id": "standard", "label": "Standard (10-15 Windows)", "price_min": 25000, "price_max": 38000},
            {"id": "premium", "label": "Premium (15+ Windows)", "price_min": 45000, "price_max": 68000}
        ]},
        {"id": "wellness", "label": "Wellness Systems", "levels": [
            {"id": "basic", "label": "Basic (Air Quality Monitoring)", "price_min": 10000, "price_max": 15000},
            {"id": "standard", "label": "Standard (Air + Water Quality)", "price_min": 20000, "price_max": 30000},
            {"id": "premium", "label": "Premium (Full Wellness Suite)", "price_min": 40000, "price_max": 60000}
        ]},
        {"id": "integration", "label": "System Integration Platform", "levels": [
            {"id": "control4", "label": "Control4 Standard", "price_min": 25000, "price_max": 38000},
            {"id": "control4-pro", "label": "Control4 Pro", "price_min": 40000, "price_max": 60000},
            {"id": "crestron", "label": "Crestron", "price_min": 75000, "price_max": 112000}
        ]}
    ],
    "commercial-office": [
        {"id": "hvac", "label": "HVAC Systems", "levels": [
            {"id": "basic", "label": "Basic (Zone Control)", "price_min": 40000, "price_max": 60000},
            {"id": "standard", "label": "Standard (Smart HVAC + CO2)", "price_min": 75000, "price_max": 112000},
            {"id": "premium", "label": "Premium (Predictive + Analytics)", "price_min": 125000, "price_max": 188000}
        ]},
        {"id": "lighting", "label": "Lighting Control", "levels": [
            {"id": "basic", "label": "Basic (Occupancy Sensors)", "price_min": 25000, "price_max": 38000},
            {"id": "standard", "label": "Standard (Daylight Harvesting)", "price_min": 50000, "price_max": 75000},
            {"id": "premium", "label": "Premium (Full Automation)", "price_min": 90000, "price_max": 135000}
        ]},
        {"id": "security-access", "label": "Security & Access Control", "levels": [
            {"id": "basic", "label": "Basic (Card Access)", "price_min": 50000, "price_max": 75000},
            {"id": "standard", "label": "Standard (Badge + Visitor Mgmt)", "price_min": 100000, "price_max": 150000},
            {"id": "enterprise", "label": "Enterprise (Full Integration)", "price_min": 175000, "price_max": 262000}
        ]}
    ]
}

DEFAULT_ADDITIONAL_FEATURES = [
    {"id": "voice-control", "label": "Voice Control Integration (Alexa/Google)", "price_min": 8000, "price_max": 12000},
    {"id": "outdoor-entertainment", "label": "Outdoor Entertainment Area", "price_min": 22000, "price_max": 33000},
    {"id": "pool-spa", "label": "Pool & Spa Automation", "price_min": 18000, "price_max": 27000},
    {"id": "landscape-lighting", "label": "Landscape Lighting", "price_min": 12000, "price_max": 18000},
    {"id": "solar", "label": "Solar/Renewable Integration", "price_min": 25000, "price_max": 38000},
    {"id": "backup-power", "label": "Backup Generator Integration", "price_min": 30000, "price_max": 45000},
    {"id": "ev-charging", "label": "EV Charging Infrastructure", "price_min": 15000, "price_max": 22000},
    {"id": "future-wiring", "label": "Future Expansion Pre-wiring", "price_min": 10000, "price_max": 15000}
]

DEFAULT_PACKAGE_BUNDLES = [
    {"id": "starter-home", "name": "Smart Starter Home", "description": "Essential automation for modern living", 
     "solutions": {"security-access": "basic", "lighting": "basic", "climate": "basic"}, 
     "features": ["voice-control"], "price_range": "AED 50K-80K", "best_for": "Apartments & small homes"},
    {"id": "premium-villa", "name": "Premium Villa Package", "description": "Comprehensive automation for luxury villas",
     "solutions": {"security-access": "standard", "lighting": "standard", "climate": "standard", "entertainment": "standard", "shades": "standard"},
     "features": ["voice-control", "landscape-lighting"], "price_range": "AED 150K-220K", "best_for": "Villas & large homes"},
    {"id": "ultimate-smart", "name": "Ultimate Smart Home", "description": "Full premium automation with all features",
     "solutions": {"security-access": "premium", "lighting": "premium", "climate": "premium", "entertainment": "premium", "energy": "premium", "shades": "premium", "wellness": "premium", "integration": "crestron"},
     "features": ["voice-control", "outdoor-entertainment", "pool-spa", "landscape-lighting", "ev-charging"],
     "price_range": "AED 400K-600K", "best_for": "Luxury villas & mansions"},
    {"id": "smart-office", "name": "Smart Office Essentials", "description": "Efficient automation for modern workspaces",
     "solutions": {"hvac": "standard", "lighting": "standard", "security-access": "standard"},
     "features": [], "price_range": "AED 180K-280K", "best_for": "Offices & commercial spaces"}
]

DEFAULT_SYSTEM_PRICING = [
    {"id": "SAVANT", "name": "Savant", "tier": "ultra_luxury", "price_min": 150000, "price_max": 250000, "description": "Apple of smart homes"},
    {"id": "CONTROL4", "name": "Control4", "tier": "luxury", "price_min": 50000, "price_max": 120000, "description": "Most popular luxury system"},
    {"id": "CRESTRON", "name": "Crestron", "tier": "enterprise", "price_min": 150000, "price_max": 300000, "description": "Enterprise-grade automation"},
    {"id": "LUTRON", "name": "Lutron RadioRA3/HomeWorks", "tier": "luxury", "price_min": 50000, "price_max": 120000, "description": "Best lighting control"},
    {"id": "KNX_NATIVE", "name": "KNX Native", "tier": "premium", "price_min": 30000, "price_max": 80000, "description": "Open standard automation"},
    {"id": "HDL_BUSPRO", "name": "HDL Buspro", "tier": "value", "price_min": 15000, "price_max": 40000, "description": "Value automation"},
    {"id": "TUYA", "name": "Tuya/Smart Life", "tier": "budget", "price_min": 5000, "price_max": 15000, "description": "Mass market smart home"},
    {"id": "HOME_ASSISTANT", "name": "Home Assistant", "tier": "diy", "price_min": 2000, "price_max": 8000, "description": "Open source platform"}
]

DEFAULT_BUDGET_RANGES = [
    {"id": "starter", "label": "AED 8K-25K", "description": "Essential automation", "min_value": 8000, "max_value": 25000},
    {"id": "standard", "label": "AED 25K-70K", "description": "Good coverage", "min_value": 25000, "max_value": 70000},
    {"id": "premium", "label": "AED 70K-150K", "description": "Premium experience", "min_value": 70000, "max_value": 150000},
    {"id": "luxury", "label": "AED 150K-280K", "description": "Luxury automation", "min_value": 150000, "max_value": 280000},
    {"id": "ultra", "label": "AED 280K+", "description": "Ultra luxury / No limit", "min_value": 280000, "max_value": 10000000}
]

DEFAULT_UPGRADE_FEATURES = [
    {"id": "L007", "label": "Color Changing (RGB/RGBW)", "price": 4000},
    {"id": "L010", "label": "Facade Lighting", "price": 7500},
    {"id": "L011", "label": "Pool/Spa Lighting", "price": 6000},
    {"id": "C009", "label": "Underfloor Heating", "price": 12000},
    {"id": "E006", "label": "Dedicated Home Cinema", "price": 18000}
]

DEFAULT_PACKAGE_TIER_PRICING = [
    {"budget_tier": "starter", "essential_min": 8000, "essential_max": 15000, "premium_min": 15000, "premium_max": 25000, "ultimate_min": 25000, "ultimate_max": 40000},
    {"budget_tier": "standard", "essential_min": 20000, "essential_max": 40000, "premium_min": 40000, "premium_max": 70000, "ultimate_min": 70000, "ultimate_max": 100000},
    {"budget_tier": "premium", "essential_min": 50000, "essential_max": 90000, "premium_min": 90000, "premium_max": 150000, "ultimate_min": 150000, "ultimate_max": 200000},
    {"budget_tier": "luxury", "essential_min": 100000, "essential_max": 180000, "premium_min": 180000, "premium_max": 280000, "ultimate_min": 280000, "ultimate_max": 400000},
    {"budget_tier": "ultra", "essential_min": 180000, "essential_max": 300000, "premium_min": 300000, "premium_max": 500000, "ultimate_min": 500000, "ultimate_max": 1000000}
]

# ============= INITIALIZATION =============

async def initialize_pricing_data():
    """Initialize pricing data in MongoDB if not exists"""
    try:
        # Check if pricing data exists
        existing = await db.pricing_config.find_one({"type": "calculator_solutions"})
        if not existing:
            # Insert default data
            await db.pricing_config.insert_many([
                {"type": "calculator_solutions", "data": DEFAULT_CALCULATOR_PRICING, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "additional_features", "data": DEFAULT_ADDITIONAL_FEATURES, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "package_bundles", "data": DEFAULT_PACKAGE_BUNDLES, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "system_pricing", "data": DEFAULT_SYSTEM_PRICING, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "budget_ranges", "data": DEFAULT_BUDGET_RANGES, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "upgrade_features", "data": DEFAULT_UPGRADE_FEATURES, "updated_at": datetime.now(timezone.utc).isoformat()},
                {"type": "package_tier_pricing", "data": DEFAULT_PACKAGE_TIER_PRICING, "updated_at": datetime.now(timezone.utc).isoformat()}
            ])
            logger.info("Initialized default pricing data in MongoDB")
        return True
    except Exception as e:
        logger.error(f"Failed to initialize pricing data: {e}")
        return False

# ============= HELPER FUNCTIONS FOR OTHER MODULES =============

async def get_calculator_solutions_data():
    """Helper function to get calculator solutions for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "calculator_solutions"}, {"_id": 0})
    return doc.get("data", DEFAULT_CALCULATOR_PRICING) if doc else DEFAULT_CALCULATOR_PRICING

async def get_additional_features_data():
    """Helper function to get additional features pricing for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "additional_features"}, {"_id": 0})
    return doc.get("data", DEFAULT_ADDITIONAL_FEATURES) if doc else DEFAULT_ADDITIONAL_FEATURES

async def get_system_pricing_data():
    """Helper function to get system pricing for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "system_pricing"}, {"_id": 0})
    return doc.get("data", DEFAULT_SYSTEM_PRICING) if doc else DEFAULT_SYSTEM_PRICING

async def get_budget_ranges_data():
    """Helper function to get budget ranges for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "budget_ranges"}, {"_id": 0})
    return doc.get("data", DEFAULT_BUDGET_RANGES) if doc else DEFAULT_BUDGET_RANGES

async def get_upgrade_features_data():
    """Helper function to get upgrade features for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "upgrade_features"}, {"_id": 0})
    return doc.get("data", DEFAULT_UPGRADE_FEATURES) if doc else DEFAULT_UPGRADE_FEATURES

async def get_package_tier_pricing_data():
    """Helper function to get package tier pricing for use by other modules"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "package_tier_pricing"}, {"_id": 0})
    return doc.get("data", DEFAULT_PACKAGE_TIER_PRICING) if doc else DEFAULT_PACKAGE_TIER_PRICING

# ============= API ENDPOINTS =============

@router.get("/calculator-solutions")
async def get_calculator_solutions():
    """Get calculator solution pricing for all project types"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "calculator_solutions"}, {"_id": 0})
    return doc.get("data", DEFAULT_CALCULATOR_PRICING) if doc else DEFAULT_CALCULATOR_PRICING

@router.put("/calculator-solutions")
async def update_calculator_solutions(data: Dict[str, Any]):
    """Update calculator solution pricing"""
    await db.pricing_config.update_one(
        {"type": "calculator_solutions"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Calculator solutions pricing updated"}

@router.get("/additional-features")
async def get_additional_features():
    """Get additional features pricing"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "additional_features"}, {"_id": 0})
    return doc.get("data", DEFAULT_ADDITIONAL_FEATURES) if doc else DEFAULT_ADDITIONAL_FEATURES

@router.put("/additional-features")
async def update_additional_features(data: List[Dict[str, Any]]):
    """Update additional features pricing"""
    await db.pricing_config.update_one(
        {"type": "additional_features"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Additional features pricing updated"}

@router.get("/package-bundles")
async def get_package_bundles():
    """Get package bundles"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "package_bundles"}, {"_id": 0})
    return doc.get("data", DEFAULT_PACKAGE_BUNDLES) if doc else DEFAULT_PACKAGE_BUNDLES

@router.put("/package-bundles")
async def update_package_bundles(data: List[Dict[str, Any]]):
    """Update package bundles"""
    await db.pricing_config.update_one(
        {"type": "package_bundles"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Package bundles updated"}

@router.get("/system-pricing")
async def get_system_pricing():
    """Get control system pricing"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "system_pricing"}, {"_id": 0})
    return doc.get("data", DEFAULT_SYSTEM_PRICING) if doc else DEFAULT_SYSTEM_PRICING

@router.put("/system-pricing")
async def update_system_pricing(data: List[Dict[str, Any]]):
    """Update control system pricing"""
    await db.pricing_config.update_one(
        {"type": "system_pricing"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "System pricing updated"}

@router.get("/budget-ranges")
async def get_budget_ranges():
    """Get budget range options"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "budget_ranges"}, {"_id": 0})
    return doc.get("data", DEFAULT_BUDGET_RANGES) if doc else DEFAULT_BUDGET_RANGES

@router.put("/budget-ranges")
async def update_budget_ranges(data: List[Dict[str, Any]]):
    """Update budget ranges"""
    await db.pricing_config.update_one(
        {"type": "budget_ranges"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Budget ranges updated"}

@router.get("/upgrade-features")
async def get_upgrade_features():
    """Get upgrade features pricing (Nice-to-Have upgrades)"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "upgrade_features"}, {"_id": 0})
    return doc.get("data", DEFAULT_UPGRADE_FEATURES) if doc else DEFAULT_UPGRADE_FEATURES

@router.put("/upgrade-features")
async def update_upgrade_features(data: List[Dict[str, Any]]):
    """Update upgrade features pricing"""
    await db.pricing_config.update_one(
        {"type": "upgrade_features"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Upgrade features pricing updated"}

@router.get("/package-tier-pricing")
async def get_package_tier_pricing():
    """Get package tier pricing (Essential/Premium/Ultimate by budget)"""
    await initialize_pricing_data()
    doc = await db.pricing_config.find_one({"type": "package_tier_pricing"}, {"_id": 0})
    return doc.get("data", DEFAULT_PACKAGE_TIER_PRICING) if doc else DEFAULT_PACKAGE_TIER_PRICING

@router.put("/package-tier-pricing")
async def update_package_tier_pricing(data: List[Dict[str, Any]]):
    """Update package tier pricing"""
    await db.pricing_config.update_one(
        {"type": "package_tier_pricing"},
        {"$set": {"data": data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True
    )
    return {"success": True, "message": "Package tier pricing updated"}

@router.get("/all")
async def get_all_pricing():
    """Get all pricing configuration in one call"""
    await initialize_pricing_data()
    
    configs = await db.pricing_config.find({}, {"_id": 0}).to_list(100)
    result = {}
    for config in configs:
        result[config["type"]] = config.get("data", [])
    
    return result

@router.post("/reset-defaults")
async def reset_to_defaults():
    """Reset all pricing to default values"""
    await db.pricing_config.delete_many({})
    await initialize_pricing_data()
    return {"success": True, "message": "All pricing reset to defaults"}

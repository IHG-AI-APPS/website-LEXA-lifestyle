"""
Seed Initial Business Rules - 40 rules for intelligent resolution
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')

# 40 Initial Business Rules
RULES = [
    # ========== EXCLUSION RULES (10) ==========
    {
        "rule_id": "EXC-RES-APT-CINEMA",
        "rule_type": "exclusion",
        "priority": 100,
        "condition": {
            "segment": "Residential",
            "property_type_in": ["Studio", "Apartment"],
            "area_sqft_lt": 1400
        },
        "action": {
            "exclude_domains": ["Cinema"],
            "exclude_bundle_keys": ["RES-CINEMA-SIGNATURE"]
        },
        "message": "Dedicated cinema rooms require larger spaces (1400+ sqft). We'll recommend a premium media setup instead.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "EXC-RETROFIT-HIGH-INVASIVE",
        "rule_type": "exclusion",
        "priority": 95,
        "condition": {
            "project_stage": "Retrofit"
        },
        "action": {
            "exclude_domains": [],  # Applied at feature level
        },
        "message": "Retrofit projects typically avoid high-invasive features. Low-invasive alternatives recommended.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "EXC-STUDIO-MULTIZONE",
        "rule_type": "exclusion",
        "priority": 90,
        "condition": {
            "segment": "Residential",
            "property_type": "Studio",
            "area_sqft_lt": 600
        },
        "action": {
            "exclude_domains": ["Multi-zone HVAC", "Estate Management"]
        },
        "message": "Studio apartments work best with single-zone systems.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "EXC-OFFICE-RESIDENTIAL-FEATURES",
        "rule_type": "exclusion",
        "priority": 85,
        "condition": {
            "segment": "Commercial",
            "property_type_in": ["Office", "CoWorking"]
        },
        "action": {
            "exclude_domains": ["Pet Care", "Wellness", "Outdoor"]
        },
        "message": "Office environments focus on workplace productivity features.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "EXC-SMALL-ESTATE-MGMT",
        "rule_type": "exclusion",
        "priority": 80,
        "condition": {
            "area_sqft_lt": 3000
        },
        "action": {
            "exclude_bundle_keys": ["RES-ESTATE-SIGNATURE"]
        },
        "message": "Estate management systems are designed for properties over 3000 sqft.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "EXC-APARTMENT-OUTDOOR",
        "rule_type": "exclusion",
        "priority": 75,
        "condition": {
            "segment": "Residential",
            "property_type_in": ["Studio", "Apartment"]
        },
        "action": {
            "exclude_domains": ["Pool", "Landscape"]
        },
        "message": "Outdoor automation features typically apply to villas and estates.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "EXC-CONCEPT-STAGE-COMPLEX",
        "rule_type": "exclusion",
        "priority": 70,
        "condition": {
            "project_stage": "Concept"
        },
        "action": {},
        "message": "At concept stage, focus on core systems. Advanced features can be refined in design phase.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "EXC-BUDGET-SIGNATURE",
        "rule_type": "warning",
        "priority": 65,
        "condition": {
            "area_sqft_lt": 2000
        },
        "action": {
            "severity": "info"
        },
        "message": "Signature-tier features are typically cost-effective for larger properties.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "EXC-RETAIL-RESIDENTIAL",
        "rule_type": "exclusion",
        "priority": 60,
        "condition": {
            "segment": "Commercial",
            "property_type": "Retail"
        },
        "action": {
            "exclude_domains": ["Bedroom", "Kitchen", "Bathroom"]
        },
        "message": "Retail spaces focus on customer experience and operations.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "EXC-HOTEL-ESTATE",
        "rule_type": "exclusion",
        "priority": 55,
        "condition": {
            "segment": "Hospitality"
        },
        "action": {
            "exclude_bundle_keys": ["RES-ESTATE-SIGNATURE"]
        },
        "message": "Hospitality uses specialized guest management systems.",
        "segment": "Hospitality",
        "active": True
    },
    
    # ========== SUBSTITUTION RULES (10) ==========
    {
        "rule_id": "SUB-CINEMA-TO-MEDIA",
        "rule_type": "substitution",
        "priority": 100,
        "condition": {
            "segment": "Residential",
            "property_type_in": ["Studio", "Apartment"],
            "area_sqft_lt": 1400
        },
        "action": {
            "suggest_bundles": ["RES-MEDIA-PREMIUM"],
            "reason": "Premium media lounge optimized for apartments without major civil works"
        },
        "message": "Instead of a dedicated cinema, consider our Premium Media Lounge.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-ESTATE-TO-PREMIUM-SEC",
        "rule_type": "substitution",
        "priority": 95,
        "condition": {
            "segment": "Residential",
            "area_sqft_lt": 3000
        },
        "action": {
            "suggest_bundles": ["RES-SEC-PREMIUM"],
            "reason": "Enhanced security without full estate management complexity"
        },
        "message": "Premium security suite provides excellent coverage for your property size.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-OUTDOOR-TO-BALCONY",
        "rule_type": "substitution",
        "priority": 90,
        "condition": {
            "segment": "Residential",
            "property_type": "Apartment",
            "area_sqft_lt": 1500
        },
        "action": {
            "suggest_bundles": ["RES-LGT-PREMIUM"],
            "reason": "Balcony lighting and ambience control"
        },
        "message": "Apartment outdoor spaces benefit from smart lighting and ambience control.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-COMPLEX-TO-ESSENTIAL",
        "rule_type": "substitution",
        "priority": 85,
        "condition": {
            "project_stage": "Retrofit",
            "area_sqft_lt": 1000
        },
        "action": {
            "suggest_bundles": ["RES-LGT-ESSENTIAL", "RES-HVAC-ESSENTIAL"],
            "reason": "Retrofit-friendly essential tier with low invasiveness"
        },
        "message": "Essential tier systems are easier to retrofit and very effective.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-SIGNATURE-TO-PREMIUM",
        "rule_type": "warning",
        "priority": 80,
        "condition": {
            "area_sqft_lt": 1500
        },
        "action": {
            "severity": "info"
        },
        "message": "Premium tier often provides better value-per-sqft for medium properties.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-WELLNESS-TO-COMFORT",
        "rule_type": "substitution",
        "priority": 75,
        "condition": {
            "segment": "Residential",
            "property_type_in": ["Studio", "Apartment"],
            "area_sqft_lt": 800
        },
        "action": {
            "suggest_bundles": ["RES-HVAC-PREMIUM"],
            "reason": "Air quality and climate control for wellness"
        },
        "message": "Climate and air quality control provides excellent wellness benefits.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-MULTI-BUILDING-TO-STANDARD",
        "rule_type": "substitution",
        "priority": 70,
        "condition": {
            "segment": "Residential",
            "area_sqft_lt": 5000
        },
        "action": {
            "suggest_bundles": ["RES-SEC-PREMIUM", "RES-NET-ESSENTIAL"],
            "reason": "Standard security + network covers single buildings effectively"
        },
        "message": "Single-building solutions are more cost-effective at this scale.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-STAFF-TO-SECURITY",
        "rule_type": "substitution",
        "priority": 65,
        "condition": {
            "segment": "Residential",
            "area_sqft_lt": 2500
        },
        "action": {
            "suggest_bundles": ["RES-SEC-ESSENTIAL"],
            "reason": "Essential security includes visitor management"
        },
        "message": "Visitor management included in our security systems.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "SUB-COMMERCIAL-RETAIL",
        "rule_type": "substitution",
        "priority": 60,
        "condition": {
            "segment": "Commercial",
            "property_type": "Office"
        },
        "action": {
            "suggest_bundles": ["COM-OFFICE-OPERATIONS"],
            "reason": "Workplace productivity suite"
        },
        "message": "Office operations suite optimized for workplace environments.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "SUB-HOTEL-STANDARD",
        "rule_type": "substitution",
        "priority": 55,
        "condition": {
            "segment": "Hospitality",
            "property_type": "Hotel"
        },
        "action": {
            "suggest_bundles": ["HOSP-GUESTROOM-STANDARD"],
            "reason": "Standard guestroom automation per room"
        },
        "message": "Standard guestroom automation provides excellent ROI.",
        "segment": "Hospitality",
        "active": True
    },
    
    # ========== DEPENDENCY RULES (10) ==========
    {
        "rule_id": "DEP-CINEMA-REQUIREMENTS",
        "rule_type": "dependency",
        "priority": 100,
        "condition": {
            "selected_space": "Cinema"
        },
        "action": {
            "require_features": ["RES-NET-ESSENTIAL", "RES-LGT-ESSENTIAL"],
            "reason": "Cinema requires network backbone and lighting control"
        },
        "message": "Cinema systems require network infrastructure and lighting integration.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-BOARDROOM-VC",
        "rule_type": "dependency",
        "priority": 95,
        "condition": {
            "selected_space": "Boardroom",
            "selected_domain": "ConferenceAV"
        },
        "action": {
            "require_features": ["COM-NET-QOS", "COM-AUD-ACOUSTIC"],
            "reason": "Reliable conferencing requires network QoS and acoustics"
        },
        "message": "Boardroom video conferencing requires quality network and acoustics.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "DEP-SECURITY-NETWORK",
        "rule_type": "dependency",
        "priority": 90,
        "condition": {
            "segment": "Residential"
        },
        "action": {
            "require_features": [],
            "reason": "Security systems require network foundation"
        },
        "message": "Security features require network infrastructure.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-SMART-HOME-CONTROLLER",
        "rule_type": "dependency",
        "priority": 85,
        "condition": {
            "segment": "Residential"
        },
        "action": {
            "require_features": [],
            "reason": "Smart home requires central controller"
        },
        "message": "Smart home systems need a central control hub.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-MULTIZONE-HVAC",
        "rule_type": "dependency",
        "priority": 80,
        "condition": {
            "area_sqft_gt": 2000
        },
        "action": {
            "require_features": [],
            "reason": "Large properties benefit from zoned climate"
        },
        "message": "Properties over 2000 sqft typically use multi-zone HVAC.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-OUTDOOR-IRRIGATION",
        "rule_type": "dependency",
        "priority": 75,
        "condition": {
            "selected_space": "Garden"
        },
        "action": {
            "require_features": [],
            "reason": "Garden automation includes irrigation"
        },
        "message": "Garden automation includes smart irrigation systems.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-ESTATE-BMS",
        "rule_type": "dependency",
        "priority": 70,
        "condition": {
            "area_sqft_gt": 5000
        },
        "action": {
            "require_features": [],
            "reason": "Large properties need building management"
        },
        "message": "Large estates benefit from centralized building management.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-VOICE-CONTROL",
        "rule_type": "dependency",
        "priority": 65,
        "condition": {
            "segment": "Residential"
        },
        "action": {
            "require_features": [],
            "reason": "Voice control requires compatible devices"
        },
        "message": "Voice control features require compatible smart speakers.",
        "segment": "Residential",
        "active": True
    },
    {
        "rule_id": "DEP-AI-CAMERA-STORAGE",
        "rule_type": "dependency",
        "priority": 60,
        "condition": {
            "selected_domain": "AI Analytics"
        },
        "action": {
            "require_features": [],
            "reason": "AI analytics require edge compute and storage"
        },
        "message": "AI camera analytics require local or cloud storage.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "DEP-HOTEL-MANAGEMENT",
        "rule_type": "dependency",
        "priority": 55,
        "condition": {
            "segment": "Hospitality"
        },
        "action": {
            "require_features": [],
            "reason": "Hotel automation integrates with PMS"
        },
        "message": "Hotel systems integrate with property management systems.",
        "segment": "Hospitality",
        "active": True
    },
    
    # ========== STAGE FEASIBILITY RULES (5) ==========
    {
        "rule_id": "STAGE-RETROFIT-INVASIVE",
        "rule_type": "warning",
        "priority": 100,
        "condition": {
            "project_stage": "Retrofit"
        },
        "action": {
            "severity": "medium"
        },
        "message": "Retrofit projects work best with low-invasive features. High-invasive features may require significant civil work.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "STAGE-CONSTRUCTION-OPTIMAL",
        "rule_type": "warning",
        "priority": 95,
        "condition": {
            "project_stage_in": ["Design", "Construction"]
        },
        "action": {
            "severity": "info"
        },
        "message": "Design and construction phases allow for optimal system integration.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "STAGE-CONCEPT-FLEXIBILITY",
        "rule_type": "warning",
        "priority": 90,
        "condition": {
            "project_stage": "Concept"
        },
        "action": {
            "severity": "info"
        },
        "message": "Concept stage: All options available. Final selection best done during design phase.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "STAGE-RETROFIT-TIMELINE",
        "rule_type": "warning",
        "priority": 85,
        "condition": {
            "project_stage": "Retrofit"
        },
        "action": {
            "severity": "info"
        },
        "message": "Retrofit installations may require phased approach to minimize disruption.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "STAGE-OPERATIONAL-UPGRADE",
        "rule_type": "warning",
        "priority": 80,
        "condition": {
            "project_stage": "Operational"
        },
        "action": {
            "severity": "medium"
        },
        "message": "Operational upgrades require careful planning to avoid service disruption.",
        "segment": None,
        "active": True
    },
    
    # ========== UAE COMPLIANCE RULES (5) ==========
    {
        "rule_id": "UAE-PRIVACY-AI-CAM",
        "rule_type": "warning",
        "priority": 100,
        "condition": {
            "selected_domain": "AI Analytics"
        },
        "action": {
            "severity": "high"
        },
        "message": "AI camera analytics in UAE require: consent management, defined retention policy, and compliant data storage.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "UAE-STAFF-MONITORING",
        "rule_type": "warning",
        "priority": 95,
        "condition": {
            "selected_domain": "Staff Management"
        },
        "action": {
            "severity": "high"
        },
        "message": "Staff monitoring requires UAE labor law compliance: employee notification and privacy policy.",
        "segment": None,
        "active": True
    },
    {
        "rule_id": "UAE-DATA-RESIDENCY",
        "rule_type": "warning",
        "priority": 90,
        "condition": {
            "segment": "Commercial"
        },
        "action": {
            "severity": "medium"
        },
        "message": "Commercial projects may have data residency requirements. Confirm on-premise vs cloud preferences.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "UAE-FIRE-SAFETY",
        "rule_type": "warning",
        "priority": 85,
        "condition": {
            "segment": "Commercial",
            "area_sqft_gt": 5000
        },
        "action": {
            "severity": "high"
        },
        "message": "Large commercial properties require Dubai Civil Defense approved fire safety integration.",
        "segment": "Commercial",
        "active": True
    },
    {
        "rule_id": "UAE-ACCESS-CONTROL",
        "rule_type": "warning",
        "priority": 80,
        "condition": {
            "segment": "Commercial"
        },
        "action": {
            "severity": "medium"
        },
        "message": "Commercial access control systems should align with Dubai Municipality regulations.",
        "segment": "Commercial",
        "active": True
    }
]


async def seed_rules():
    """Create initial rule set"""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Create new collection or clear existing
    await db.project_rules.drop()
    print("🗑️  Cleared existing rules collection")
    
    print(f"\n⚖️  Creating {len(RULES)} initial rules...")
    
    for rule in RULES:
        rule['created_at'] = datetime.utcnow()
        
        await db.project_rules.insert_one(rule)
        print(f"  ✓ Created: {rule['rule_id']} ({rule['rule_type']})")
    
    print(f"\n✅ Successfully created {len(RULES)} rules")
    
    # Create indexes
    print("\n📑 Creating indexes...")
    await db.project_rules.create_index([('rule_id', 1)], unique=True)
    await db.project_rules.create_index([('rule_type', 1)])
    await db.project_rules.create_index([('segment', 1)])
    await db.project_rules.create_index([('active', 1)])
    await db.project_rules.create_index([('priority', -1)])
    print("✅ Indexes created")
    
    # Summary
    print("\n📊 Rules Summary:")
    for rule_type in ['exclusion', 'substitution', 'dependency', 'warning']:
        count = await db.project_rules.count_documents({'rule_type': rule_type})
        print(f"  {rule_type.capitalize()}: {count} rules")
    
    print("\nRules by segment:")
    for segment in ['Residential', 'Commercial', 'Hospitality', None]:
        count = await db.project_rules.count_documents({'segment': segment})
        segment_name = segment if segment else "Global"
        print(f"  {segment_name}: {count} rules")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_rules())

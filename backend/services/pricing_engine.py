"""
Advanced Pricing Engine for LEXA Calculator
Calculates accurate quotes based on project type, area, solutions, and other factors
"""

from typing import Dict, List, Any

# Solutions pricing matrix (matches frontend constants) - All prices reduced by 50%
SOLUTIONS_PRICING = {
    "residential": {
        "security-access": {"basic": 25000, "standard": 50000, "premium": 100000},
        "lighting": {"basic": 20000, "standard": 40000, "premium": 75000},
        "climate": {"basic": 18000, "standard": 35000, "premium": 60000},
        "entertainment": {"basic": 30000, "standard": 75000, "premium": 140000},
        "energy": {"basic": 12000, "standard": 25000, "premium": 50000},
        "shades": {"basic": 15000, "standard": 25000, "premium": 45000},
        "wellness": {"basic": 10000, "standard": 20000, "premium": 40000},
        "integration": {"control4": 25000, "control4-pro": 40000, "crestron": 75000},
    },
    "commercial-office": {
        "hvac": {"basic": 40000, "standard": 75000, "premium": 125000},
        "lighting": {"basic": 25000, "standard": 50000, "premium": 90000},
        "security-access": {"basic": 50000, "standard": 100000, "enterprise": 175000},
        "fire-safety": {"standard": 60000, "premium": 100000},
        "energy-analytics": {"basic": 20000, "standard": 40000, "enterprise": 75000},
        "network": {"standard": 50000, "premium": 90000},
        "meeting-rooms": {"basic": 15000, "standard": 30000, "premium": 60000},
    },
    "hospitality": {
        "guest-room": {"basic": 30000, "standard": 60000, "premium": 100000},
        "energy": {"standard": 75000, "premium": 140000},
        "security-access": {"basic": 45000, "standard": 90000, "premium": 160000},
        "entertainment": {"basic": 25000, "standard": 50000, "premium": 90000},
        "operations": {"standard": 50000, "premium": 90000},
        "common-areas": {"standard": 60000, "premium": 110000},
    },
    "healthcare": {
        "hvac-air": {"standard": 125000, "premium": 225000},
        "lighting": {"standard": 60000, "premium": 110000},
        "security-access": {"standard": 140000, "enterprise": 240000},
        "nurse-call": {"standard": 75000, "premium": 140000},
        "medical-equipment": {"standard": 90000, "premium": 160000},
    },
    "education": {
        "campus-security": {"standard": 100000, "premium": 175000},
        "hvac-energy": {"standard": 90000, "premium": 160000},
        "lighting": {"standard": 50000, "premium": 90000},
        "fire-safety": {"standard": 60000},
        "classroom-tech": {"basic": 25000, "standard": 50000, "premium": 90000},
    },
    "retail": {
        "hvac-refrigeration": {"standard": 100000, "premium": 175000},
        "lighting": {"standard": 60000, "premium": 110000},
        "security": {"standard": 75000, "premium": 140000},
        "customer-experience": {"standard": 40000, "premium": 75000},
        "energy": {"standard": 50000, "premium": 90000},
    },
    "mixed-use": {
        "integrated-systems": {"standard": 150000, "premium": 275000},
        "security-access": {"standard": 125000, "enterprise": 225000},
        "energy": {"standard": 90000, "premium": 160000},
        "hvac-climate": {"standard": 110000, "premium": 200000},
    },
}

# Additional features pricing - All prices reduced by 50%
ADDITIONAL_FEATURES_PRICING = {
    "voice-control": 8000,
    "outdoor-entertainment": 22000,
    "pool-spa": 18000,
    "landscape-lighting": 12000,
    "solar": 25000,
    "backup-generator": 30000,
    "backup-power": 30000,
    "ev-charging": 15000,
    "future-wiring": 10000,
}

# Size multipliers (based on sqft ranges)
def get_size_multiplier(total_area: int) -> float:
    """Calculate size-based pricing multiplier"""
    if total_area < 2000:
        return 1.0
    elif total_area < 5000:
        return 1.1
    elif total_area < 10000:
        return 1.2
    elif total_area < 20000:
        return 1.3
    else:
        return 1.5

# Construction stage multipliers
CONSTRUCTION_STAGE_MULTIPLIERS = {
    "new-construction": 1.0,
    "under-construction": 1.1,
    "renovation": 1.3,
    "retrofit": 1.4,
}

# Timeline estimation (in weeks)
TIMELINE_BASE_WEEKS = {
    "residential": 8,
    "commercial-office": 12,
    "hospitality": 16,
    "healthcare": 20,
    "education": 14,
    "retail": 10,
    "mixed-use": 18,
}


class PricingEngine:
    """Advanced pricing calculation engine"""
    
    @staticmethod
    def calculate_quote(
        project_type: str,
        sub_category: str,
        total_area: int,
        num_rooms: int,
        num_floors: int,
        construction_stage: str,
        selected_solutions: Dict[str, str],
        additional_features: List[str],
        timeline: str,
        budget_range: str,
        privilege_card: str = None,
        solutions_pricing: Dict = None,  # Allow dynamic pricing override
        additional_features_pricing: Dict = None,  # Allow dynamic pricing override
    ) -> Dict[str, Any]:
        """
        Calculate comprehensive quote with cost breakdown
        
        Args:
            solutions_pricing: Optional dict to override SOLUTIONS_PRICING
            additional_features_pricing: Optional dict to override ADDITIONAL_FEATURES_PRICING
        
        Returns:
            Dict with total_cost, estimated_timeline_weeks, cost_breakdown, and multipliers
        """
        
        # Use provided pricing or fall back to hardcoded defaults
        effective_solutions_pricing = solutions_pricing or SOLUTIONS_PRICING
        effective_additional_pricing = additional_features_pricing or ADDITIONAL_FEATURES_PRICING
        
        # Get base pricing for project type
        project_pricing = effective_solutions_pricing.get(project_type, {})
        
        # Calculate base cost from selected solutions
        solutions_cost = 0
        cost_breakdown = []
        
        for solution_id, level_id in selected_solutions.items():
            solution_pricing = project_pricing.get(solution_id, {})
            level_price = solution_pricing.get(level_id, 0)
            
            if level_price > 0:
                solutions_cost += level_price
                cost_breakdown.append({
                    "name": f"{solution_id.replace('-', ' ').title()} - {level_id.title()}",
                    "cost": level_price,
                })
        
        # Add additional features cost
        additional_cost = 0
        for feature_id in additional_features:
            feature_price = effective_additional_pricing.get(feature_id, 0)
            if feature_price > 0:
                additional_cost += feature_price
                cost_breakdown.append({
                    "name": feature_id.replace('-', ' ').title(),
                    "cost": feature_price,
                })
        
        # Apply size multiplier
        size_multiplier = get_size_multiplier(total_area)
        
        # Apply construction stage multiplier
        stage_multiplier = CONSTRUCTION_STAGE_MULTIPLIERS.get(construction_stage, 1.0)
        
        # Calculate total cost
        base_cost = solutions_cost + additional_cost
        total_cost = int(base_cost * size_multiplier * stage_multiplier)
        
        # Add installation and labor (15% of total)
        installation_cost = int(total_cost * 0.15)
        cost_breakdown.append({
            "name": "Installation & Labor",
            "cost": installation_cost,
        })
        
        total_cost += installation_cost
        
        # Apply privilege card discount
        discount_amount = 0
        if privilege_card:
            if privilege_card in ['esaad', 'fazaa']:
                discount_percent = 10
                discount_amount = int(total_cost * (discount_percent / 100))
                total_cost -= discount_amount
                cost_breakdown.append({
                    "name": f"{privilege_card.upper()} Card Discount (-10%)",
                    "cost": -discount_amount,
                })
            elif privilege_card == 'corporate':
                # Corporate discount is negotiable, show placeholder
                cost_breakdown.append({
                    "name": "Corporate Partner Discount (Negotiable)",
                    "cost": 0,
                })
        
        # Estimate timeline
        base_weeks = TIMELINE_BASE_WEEKS.get(project_type, 10)
        
        # Add weeks based on number of solutions
        solution_count = len(selected_solutions)
        additional_weeks = solution_count * 1
        
        # Add weeks for larger properties
        if total_area > 10000:
            additional_weeks += 4
        elif total_area > 5000:
            additional_weeks += 2
        
        # Add weeks for retrofit
        if construction_stage in ["retrofit", "renovation"]:
            additional_weeks += 3
        
        estimated_timeline_weeks = base_weeks + additional_weeks
        
        return {
            "total_cost": total_cost,
            "estimated_timeline_weeks": estimated_timeline_weeks,
            "cost_breakdown": cost_breakdown,
            "size_multiplier": round(size_multiplier, 2),
            "retrofit_premium": round(stage_multiplier, 2),
        }
    
    @staticmethod
    def get_roi_estimate(
        project_type: str,
        selected_solutions: Dict[str, str],
        additional_features: List[str],
        total_cost: int,
        total_area: int,
    ) -> Dict[str, Any]:
        """
        Calculate estimated ROI and energy savings for UAE market
        
        Returns:
            Dict with annual_savings, payback_years, energy_reduction_percent
        """
        
        # Check if energy management is included
        has_energy = "energy" in selected_solutions or "energy-analytics" in selected_solutions
        has_hvac = any(key in selected_solutions for key in ["climate", "hvac", "hvac-air", "hvac-energy", "hvac-climate", "hvac-refrigeration"])
        has_lighting = "lighting" in selected_solutions
        has_solar = "solar" in additional_features
        
        # UAE average energy costs (AED per kWh)
        uae_energy_cost_per_kwh = 0.38  # Average for Dubai/Abu Dhabi
        
        # Estimate annual energy consumption based on area and type
        annual_kwh_base = 0
        if project_type == "residential":
            annual_kwh_base = total_area * 40  # 40 kWh per sqft per year
        elif project_type in ["commercial-office", "retail", "mixed-use"]:
            annual_kwh_base = total_area * 60
        elif project_type in ["hospitality", "healthcare"]:
            annual_kwh_base = total_area * 80
        else:
            annual_kwh_base = total_area * 50
        
        # Calculate energy reduction percentage
        energy_reduction = 0
        if has_energy:
            energy_reduction += 15
        if has_hvac:
            energy_reduction += 20
        if has_lighting:
            energy_reduction += 10
        if has_solar:
            energy_reduction += 30
        
        energy_reduction = min(energy_reduction, 50)  # Cap at 50%
        
        # Calculate annual savings
        kwh_saved = annual_kwh_base * (energy_reduction / 100)
        annual_savings = int(kwh_saved * uae_energy_cost_per_kwh)
        
        # Calculate payback period
        payback_years = 0
        if annual_savings > 0:
            payback_years = round(total_cost / annual_savings, 1)
        
        # Property value increase (smart home premium in UAE)
        property_value_increase_percent = 0
        if project_type == "residential":
            property_value_increase_percent = 8  # 8% average in UAE
        elif project_type in ["commercial-office", "hospitality"]:
            property_value_increase_percent = 5
        
        return {
            "annual_energy_savings_aed": annual_savings,
            "payback_period_years": payback_years,
            "energy_reduction_percent": energy_reduction,
            "property_value_increase_percent": property_value_increase_percent,
            "estimated_annual_kwh_saved": int(kwh_saved),
        }

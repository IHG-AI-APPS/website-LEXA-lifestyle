"""
Rules Engine - Business logic for intelligent recommendations
Handles exclusions, substitutions, dependencies, and warnings
"""

from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)


class RulesEngine:
    """
    Deterministic business rules engine for consultant-grade intelligence
    """
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.rules_cache = []
    
    
    async def load_rules(self, segment: Optional[str] = None):
        """
        Load active rules from database, optionally filtered by segment
        """
        query = {'active': True}
        if segment:
            query['$or'] = [
                {'segment': segment},
                {'segment': None}  # Global rules
            ]
        
        self.rules_cache = await self.db.project_rules.find(
            query,
            {'_id': 0}
        ).sort('priority', -1).to_list(200)
        
        logger.info(f"Loaded {len(self.rules_cache)} active rules")
    
    
    # ========================================================================
    # RULE EXECUTION
    # ========================================================================
    
    async def apply_rules(
        self,
        bundles: List[Dict],
        features: List[Dict],
        project_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Apply all relevant rules to bundles and features
        
        Returns:
            {
                'excluded_bundles': [],
                'substituted_bundles': [],
                'warnings': [],
                'required_dependencies': [],
                'messages': []
            }
        """
        if not self.rules_cache:
            await self.load_rules(project_context.get('segment'))
        
        result = {
            'excluded_bundles': [],
            'substituted_bundles': [],
            'warnings': [],
            'required_dependencies': [],
            'messages': []
        }
        
        for rule in self.rules_cache:
            if self._matches_condition(rule['condition'], project_context):
                self._apply_rule_action(rule, bundles, features, result)
        
        logger.info(f"Applied rules: {len(result['excluded_bundles'])} exclusions, "
                   f"{len(result['warnings'])} warnings, "
                   f"{len(result['substituted_bundles'])} substitutions")
        
        return result
    
    
    def _matches_condition(
        self,
        condition: Dict[str, Any],
        context: Dict[str, Any]
    ) -> bool:
        """
        Check if rule condition matches project context
        """
        for key, expected_value in condition.items():
            # Handle special operators
            if key.endswith('_lt'):
                actual_key = key[:-3]
                if context.get(actual_key, float('inf')) >= expected_value:
                    return False
            elif key.endswith('_gt'):
                actual_key = key[:-3]
                if context.get(actual_key, 0) <= expected_value:
                    return False
            elif key.endswith('_in'):
                actual_key = key[:-3]
                if context.get(actual_key) not in expected_value:
                    return False
            else:
                # Direct match or list contains
                actual_value = context.get(key)
                if isinstance(expected_value, list):
                    if actual_value not in expected_value:
                        return False
                else:
                    if actual_value != expected_value:
                        return False
        
        return True
    
    
    def _apply_rule_action(
        self,
        rule: Dict,
        bundles: List[Dict],
        features: List[Dict],
        result: Dict
    ):
        """
        Execute rule action based on rule type
        """
        rule_type = rule['rule_type']
        action = rule['action']
        
        if rule_type == 'exclusion':
            self._handle_exclusion(action, bundles, result, rule['message'])
        
        elif rule_type == 'substitution':
            self._handle_substitution(action, bundles, result, rule['message'])
        
        elif rule_type == 'dependency':
            self._handle_dependency(action, features, result, rule['message'])
        
        elif rule_type == 'warning':
            self._handle_warning(action, result, rule['message'])
    
    
    def _handle_exclusion(
        self,
        action: Dict,
        bundles: List[Dict],
        result: Dict,
        message: str
    ):
        """
        Exclude domains or bundles
        """
        exclude_domains = action.get('exclude_domains', [])
        exclude_bundle_keys = action.get('exclude_bundle_keys', [])
        
        for bundle in bundles:
            if bundle['system_domain'] in exclude_domains or \
               bundle['bundle_key'] in exclude_bundle_keys:
                result['excluded_bundles'].append({
                    'bundle_key': bundle['bundle_key'],
                    'reason': message
                })
    
    
    def _handle_substitution(
        self,
        action: Dict,
        bundles: List[Dict],
        result: Dict,
        message: str
    ):
        """
        Suggest alternative bundles
        """
        suggest_bundles = action.get('suggest_bundles', [])
        reason = action.get('reason', message)
        
        for bundle_id in suggest_bundles:
            result['substituted_bundles'].append({
                'suggested_bundle_id': bundle_id,
                'reason': reason
            })
    
    
    def _handle_dependency(
        self,
        action: Dict,
        features: List[Dict],
        result: Dict,
        message: str
    ):
        """
        Add required dependencies
        """
        require_features = action.get('require_features', [])
        
        for feature_id in require_features:
            result['required_dependencies'].append({
                'feature_id': feature_id,
                'reason': message
            })
    
    
    def _handle_warning(
        self,
        action: Dict,
        result: Dict,
        message: str
    ):
        """
        Add user-facing warning
        """
        severity = action.get('severity', 'medium')
        result['warnings'].append({
            'message': message,
            'severity': severity
        })
    
    
    # ========================================================================
    # SPECIFIC RULE EVALUATORS (UAE-specific, etc.)
    # ========================================================================
    
    def check_uae_compliance(
        self,
        features: List[Dict],
        project_context: Dict[str, Any]
    ) -> List[Dict]:
        """
        Check UAE-specific compliance requirements
        """
        compliance_issues = []
        
        for feature in features:
            # AI camera privacy check
            if 'AI' in feature.get('system_domain', '') and \
               'camera' in feature.get('feature_name', '').lower():
                compliance_issues.append({
                    'feature_id': feature['feature_id'],
                    'issue_type': 'privacy_consent',
                    'message': 'AI camera analytics requires consent management and data retention policy',
                    'questions_required': [
                        'What is the legal basis for surveillance?',
                        'How long will footage be retained?',
                        'Where will data be stored (on-prem vs cloud)?',
                        'Who will have access to footage?'
                    ]
                })
            
            # Staff monitoring compliance
            if 'staff' in feature.get('feature_name', '').lower():
                compliance_issues.append({
                    'feature_id': feature['feature_id'],
                    'issue_type': 'labor_law',
                    'message': 'Staff monitoring features require UAE labor law compliance',
                    'requirements': [
                        'Employee notification required',
                        'Privacy policy must be in place',
                        'Limited to work areas only'
                    ]
                })
        
        return compliance_issues
    
    
    def generate_explanation(
        self,
        bundle: Dict,
        project_context: Dict[str, Any],
        score: float
    ) -> Dict[str, Any]:
        """
        Generate human-readable explanation for why a bundle was recommended
        """
        reasons = []
        
        # Objective alignment
        if bundle.get('features'):
            matched_objectives = set()
            for feature in bundle['features']:
                for obj in feature.get('objective_tags', []):
                    if obj in project_context.get('selected_objectives', []):
                        matched_objectives.add(obj)
            
            if matched_objectives:
                reasons.append(f"Aligns with your {', '.join(matched_objectives)} objectives")
        
        # Property type fit
        if project_context.get('property_type') in bundle.get('property_types_allowed', []):
            reasons.append(f"Optimized for {project_context['property_type']} properties")
        
        # Tier justification
        tier = bundle.get('tier', 'Essential')
        if tier == 'Essential':
            reasons.append("Essential foundation for smart living")
        elif tier == 'Premium':
            reasons.append("Enhanced experience with premium features")
        elif tier == 'Signature':
            reasons.append("Luxury flagship solution")
        
        # Score interpretation
        if score >= 80:
            recommendation_strength = "Highly Recommended"
        elif score >= 60:
            recommendation_strength = "Recommended"
        else:
            recommendation_strength = "Optional Enhancement"
        
        return {
            'bundle_key': bundle['bundle_key'],
            'recommendation_strength': recommendation_strength,
            'score': round(score, 1),
            'reasons': reasons,
            'why_recommended': f"This bundle scored {round(score, 1)}/100 based on your project requirements",
            'benefits': bundle.get('features', [{}])[0].get('benefits', []) if bundle.get('features') else []
        }

"""
Proposal Generator Service - Create architecture options
Generates Value / Balanced / Flagship proposals based on tier mix
"""

from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)


class ProposalGeneratorService:
    """
    Generates multiple architecture proposals with different tier mixes
    """
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
    
    
    async def generate_proposals(
        self,
        resolved_bundles: List[Dict],
        project_context: Dict[str, Any],
        auto_added_features: List[Dict] = []
    ) -> Dict[str, Any]:
        """
        Generate 3 architecture proposals: Value, Balanced, Flagship
        
        Args:
            resolved_bundles: Bundles from resolver service
            project_context: Project DNA
            auto_added_features: Mandatory dependencies
        
        Returns:
            {
                'value': {...},
                'balanced': {...},
                'flagship': {...},
                'recommendation': 'balanced'
            }
        """
        # Get all features from resolved bundles
        all_features = []
        for bundle in resolved_bundles:
            all_features.extend(bundle.get('features', []))
        
        # Add auto-added mandatory features to all proposals
        mandatory_features = auto_added_features
        
        # Separate features by tier
        essential_features = [f for f in all_features if f.get('tier') == 'Essential']
        premium_features = [f for f in all_features if f.get('tier') == 'Premium']
        signature_features = [f for f in all_features if f.get('tier') == 'Signature']
        
        logger.info(
            f"Feature breakdown: {len(essential_features)} Essential, "
            f"{len(premium_features)} Premium, {len(signature_features)} Signature"
        )
        
        # Generate Value Option (Essential only)
        value_proposal = self._create_value_proposal(
            essential_features,
            mandatory_features,
            project_context
        )
        
        # Generate Balanced Option (Essential + some Premium)
        balanced_proposal = self._create_balanced_proposal(
            essential_features,
            premium_features,
            mandatory_features,
            project_context
        )
        
        # Generate Flagship Option (All tiers)
        flagship_proposal = self._create_flagship_proposal(
            essential_features,
            premium_features,
            signature_features,
            mandatory_features,
            project_context
        )
        
        # Determine default recommendation
        recommendation = self._determine_recommendation(
            project_context,
            value_proposal,
            balanced_proposal,
            flagship_proposal
        )
        
        return {
            'value': value_proposal,
            'balanced': balanced_proposal,
            'flagship': flagship_proposal,
            'recommendation': recommendation,
            'comparison_matrix': self._generate_comparison_matrix(
                value_proposal,
                balanced_proposal,
                flagship_proposal
            )
        }
    
    
    def _create_value_proposal(
        self,
        essential_features: List[Dict],
        mandatory_features: List[Dict],
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Value Option: Essential tier only
        Focus on core functionality, budget-conscious
        """
        all_features = mandatory_features + essential_features
        
        # Group by system domain
        systems = self._group_by_system(all_features)
        
        return {
            'name': 'Value Architecture',
            'tier_mix': 'Essential',
            'tagline': 'Smart Foundation - Core Functionality',
            'description': 'Essential automation systems for comfortable smart living. '
                          'Reliable, proven technology with professional installation.',
            'features': all_features,
            'systems': systems,
            'feature_count': len(all_features),
            'system_count': len(systems),
            'complexity_score': self._calculate_complexity(all_features),
            'effort_estimate': self._estimate_effort(all_features),
            'ideal_for': [
                'Budget-conscious projects',
                'First-time smart home users',
                'Retrofit installations',
                'Small to medium properties'
            ],
            'highlights': [
                f"{len(systems)} integrated systems",
                "Professional-grade equipment",
                "Single control interface",
                "Scalable architecture"
            ],
            'estimated_timeline': self._estimate_timeline(all_features, context),
            'price_indicator': 'AED $$$'  # Placeholder
        }
    
    
    def _create_balanced_proposal(
        self,
        essential_features: List[Dict],
        premium_features: List[Dict],
        mandatory_features: List[Dict],
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Balanced Option: Essential + Premium mix
        Best value proposition for most clients
        """
        # Select top-ranked premium features (around 40-60% of premium)
        selected_premium = self._select_top_features(
            premium_features,
            percentage=0.5
        )
        
        all_features = mandatory_features + essential_features + selected_premium
        systems = self._group_by_system(all_features)
        
        return {
            'name': 'Balanced Architecture',
            'tier_mix': 'Essential + Premium',
            'tagline': 'Intelligent Living - Enhanced Experience',
            'description': 'Comprehensive automation with premium upgrades in key areas. '
                          'Perfect balance of functionality, comfort, and value.',
            'features': all_features,
            'systems': systems,
            'feature_count': len(all_features),
            'system_count': len(systems),
            'complexity_score': self._calculate_complexity(all_features),
            'effort_estimate': self._estimate_effort(all_features),
            'ideal_for': [
                'Luxury residences',
                'Professional property managers',
                'Quality-focused clients',
                'Medium to large properties'
            ],
            'highlights': [
                f"{len(systems)} fully integrated systems",
                "Premium features in living areas",
                "AI-powered automation",
                "Energy optimization",
                "Advanced user experience"
            ],
            'estimated_timeline': self._estimate_timeline(all_features, context),
            'price_indicator': 'AED $$$$$',
            'recommended': True  # Usually the default recommendation
        }
    
    
    def _create_flagship_proposal(
        self,
        essential_features: List[Dict],
        premium_features: List[Dict],
        signature_features: List[Dict],
        mandatory_features: List[Dict],
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Flagship Option: All tiers including Signature
        No-compromise luxury automation
        """
        all_features = (
            mandatory_features + 
            essential_features + 
            premium_features + 
            signature_features
        )
        
        systems = self._group_by_system(all_features)
        
        return {
            'name': 'Flagship Architecture',
            'tier_mix': 'Essential + Premium + Signature',
            'tagline': 'Orchestrated Excellence - Ultimate Experience',
            'description': 'Complete luxury automation with signature features. '
                          'Cutting-edge technology, bespoke integration, white-glove service.',
            'features': all_features,
            'systems': systems,
            'feature_count': len(all_features),
            'system_count': len(systems),
            'complexity_score': self._calculate_complexity(all_features),
            'effort_estimate': self._estimate_effort(all_features),
            'ideal_for': [
                'Ultra-luxury estates',
                'High-net-worth individuals',
                'Signature developments',
                'No-compromise projects'
            ],
            'highlights': [
                f"{len(systems)} fully orchestrated systems",
                "Signature features throughout",
                "Bespoke programming",
                "Predictive AI automation",
                "Concierge-level support",
                "Custom integrations"
            ],
            'estimated_timeline': self._estimate_timeline(all_features, context),
            'price_indicator': 'AED $$$$$$$'
        }
    
    
    # ========================================================================
    # HELPER METHODS
    # ========================================================================
    
    def _group_by_system(self, features: List[Dict]) -> List[Dict]:
        """Group features by system domain"""
        systems = {}
        
        for feature in features:
            domain = feature.get('system_domain', 'General')
            if domain not in systems:
                systems[domain] = {
                    'domain': domain,
                    'features': [],
                    'feature_count': 0
                }
            systems[domain]['features'].append(feature)
            systems[domain]['feature_count'] += 1
        
        return list(systems.values())
    
    
    def _select_top_features(
        self,
        features: List[Dict],
        percentage: float = 0.5
    ) -> List[Dict]:
        """Select top X% of features based on popularity/IQ points"""
        sorted_features = sorted(
            features,
            key=lambda f: (f.get('popularity_score', 1), f.get('iq_points', 5)),
            reverse=True
        )
        
        count = max(1, int(len(features) * percentage))
        return sorted_features[:count]
    
    
    def _calculate_complexity(self, features: List[Dict]) -> int:
        """Calculate overall complexity score (1-10)"""
        if not features:
            return 1
        
        avg_complexity = sum(f.get('complexity', 3) for f in features) / len(features)
        return min(10, max(1, int(avg_complexity * 2)))
    
    
    def _estimate_effort(self, features: List[Dict]) -> str:
        """Estimate implementation effort"""
        total_effort = 0
        effort_map = {'S': 1, 'M': 3, 'L': 5}
        
        for feature in features:
            effort = feature.get('estimated_effort', 'M')
            total_effort += effort_map.get(effort, 3)
        
        if total_effort < 30:
            return 'Low (2-4 weeks)'
        elif total_effort < 60:
            return 'Medium (4-8 weeks)'
        else:
            return 'High (8-16 weeks)'
    
    
    def _estimate_timeline(
        self,
        features: List[Dict],
        context: Dict[str, Any]
    ) -> str:
        """Estimate project timeline"""
        base_weeks = len(features) // 10  # ~10 features per week
        
        # Adjust for project stage
        stage = context.get('project_stage', 'Concept')
        if stage == 'Retrofit':
            base_weeks = int(base_weeks * 1.5)
        
        # Adjust for property scale
        scale = context.get('project_scale', 'Medium')
        if scale == 'Estate':
            base_weeks = int(base_weeks * 1.3)
        
        base_weeks = max(2, base_weeks)
        
        return f"{base_weeks}-{base_weeks + 4} weeks"
    
    
    def _determine_recommendation(
        self,
        context: Dict[str, Any],
        value: Dict,
        balanced: Dict,
        flagship: Dict
    ) -> str:
        """Determine which proposal to recommend by default"""
        property_type = context.get('property_type', '')
        scale = context.get('project_scale', 'Medium')
        
        # Luxury properties → Flagship
        if any(keyword in property_type.lower() for keyword in ['mansion', 'estate', 'penthouse']):
            return 'flagship'
        
        # Large properties → Balanced or Flagship
        if scale in ['Large', 'Estate']:
            return 'balanced'
        
        # Default: Balanced (best value)
        return 'balanced'
    
    
    def _generate_comparison_matrix(
        self,
        value: Dict,
        balanced: Dict,
        flagship: Dict
    ) -> Dict[str, Any]:
        """Generate side-by-side comparison data"""
        return {
            'headers': ['Feature', 'Value', 'Balanced', 'Flagship'],
            'rows': [
                {
                    'feature': 'Feature Count',
                    'value': value['feature_count'],
                    'balanced': balanced['feature_count'],
                    'flagship': flagship['feature_count']
                },
                {
                    'feature': 'System Count',
                    'value': value['system_count'],
                    'balanced': balanced['system_count'],
                    'flagship': flagship['system_count']
                },
                {
                    'feature': 'Complexity',
                    'value': f"{value['complexity_score']}/10",
                    'balanced': f"{balanced['complexity_score']}/10",
                    'flagship': f"{flagship['complexity_score']}/10"
                },
                {
                    'feature': 'Timeline',
                    'value': value['estimated_timeline'],
                    'balanced': balanced['estimated_timeline'],
                    'flagship': flagship['estimated_timeline']
                }
            ]
        }

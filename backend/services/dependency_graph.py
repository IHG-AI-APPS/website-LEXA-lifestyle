"""
Dependency Graph Service - System-level prerequisite resolution
Understands which systems require other systems (e.g., Cinema needs Network)
"""

from typing import List, Dict, Any, Set, Tuple
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)


class DependencyGraphService:
    """
    Manages system-level dependencies and prerequisites
    Ensures that selecting a high-level system auto-includes its requirements
    """
    
    # System dependency rules (Domain → Required Domains)
    SYSTEM_DEPENDENCIES = {
        'Cinema': ['Network', 'Acoustics', 'HVAC'],
        'Home Theater': ['Network', 'Lighting', 'HVAC'],
        'Boardroom AV': ['Network', 'Acoustics', 'Lighting'],
        'Multi-Room Audio': ['Network'],
        'Integrated Security': ['Network'],
        'AI Cameras': ['Network', 'Security'],
        'Smart Lighting': ['Network'],
        'HVAC Control': ['Network'],
        'Access Control': ['Network', 'Security'],
        'Pool Automation': ['Network'],
        'Irrigation': ['Network'],
        'BMS': ['Network'],
        'Energy Management': ['Network']
    }
    
    # Physical prerequisite requirements
    PHYSICAL_REQUIREMENTS = {
        'Cinema': {
            'min_space_sqft': 300,
            'requirements': ['Dedicated room', 'Acoustics treatment', 'Light control'],
            'invasiveness': 'High'
        },
        'Home Theater': {
            'min_space_sqft': 200,
            'requirements': ['AV equipment space', 'Acoustic considerations'],
            'invasiveness': 'Medium'
        },
        'Server Room': {
            'min_space_sqft': 50,
            'requirements': ['Cooling', 'Clean power', 'Physical security'],
            'invasiveness': 'Medium'
        },
        'Rack Room': {
            'min_space_sqft': 30,
            'requirements': ['Equipment rack', 'Ventilation', 'Cable management'],
            'invasiveness': 'Medium'
        }
    }
    
    # System conflicts (mutually exclusive)
    SYSTEM_CONFLICTS = {
        ('Basic Lighting', 'Smart Lighting'): 'Use either basic or smart lighting, not both',
        ('Standalone Security', 'Integrated Security'): 'Choose one security approach'
    }
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self._cache = {}
    
    
    # ========================================================================
    # DEPENDENCY RESOLUTION
    # ========================================================================
    
    def resolve_system_dependencies(
        self,
        system_domain: str
    ) -> Dict[str, Any]:
        """
        Get all dependencies for a given system domain
        
        Returns:
            {
                'required_systems': ['Network', 'Acoustics'],
                'physical_requirements': {...},
                'warnings': []
            }
        """
        result = {
            'required_systems': [],
            'physical_requirements': None,
            'warnings': []
        }
        
        # Check system dependencies
        if system_domain in self.SYSTEM_DEPENDENCIES:
            result['required_systems'] = self.SYSTEM_DEPENDENCIES[system_domain]
        
        # Check physical requirements
        if system_domain in self.PHYSICAL_REQUIREMENTS:
            result['physical_requirements'] = self.PHYSICAL_REQUIREMENTS[system_domain]
        
        return result
    
    
    def calculate_dependency_closure(
        self,
        selected_systems: List[str],
        project_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Given a list of selected systems, calculate the complete dependency closure
        Auto-includes all required systems
        
        Returns:
            {
                'final_systems': [...],  # All systems including dependencies
                'auto_added': [...],     # Systems that were auto-included
                'warnings': [...],       # Space/stage constraints
                'conflicts': [...]       # Conflicting selections
            }
        """
        final_systems = set(selected_systems)
        auto_added = set()
        warnings = []
        conflicts = []
        
        # Iteratively resolve dependencies (depth-first)
        to_process = list(selected_systems)
        processed = set()
        
        while to_process:
            current_system = to_process.pop(0)
            
            if current_system in processed:
                continue
            
            processed.add(current_system)
            
            # Get dependencies for this system
            deps_info = self.resolve_system_dependencies(current_system)
            
            # Add required systems
            for required_system in deps_info['required_systems']:
                if required_system not in final_systems:
                    final_systems.add(required_system)
                    auto_added.add(required_system)
                    to_process.append(required_system)
            
            # Check physical requirements
            if deps_info['physical_requirements']:
                phys_req = deps_info['physical_requirements']
                area_sqft = project_context.get('area_sqft', 0)
                project_stage = project_context.get('project_stage', 'Concept')
                
                # Space constraint
                if area_sqft < phys_req.get('min_space_sqft', 0):
                    warnings.append({
                        'system': current_system,
                        'type': 'space_constraint',
                        'message': f"{current_system} requires minimum {phys_req['min_space_sqft']} sqft. "
                                   f"Your project is {area_sqft} sqft.",
                        'severity': 'high'
                    })
                
                # Retrofit constraint
                if project_stage == 'Retrofit' and phys_req['invasiveness'] == 'High':
                    warnings.append({
                        'system': current_system,
                        'type': 'retrofit_constraint',
                        'message': f"{current_system} requires significant structural work. "
                                   f"Recommended to evaluate feasibility during site survey.",
                        'severity': 'medium'
                    })
        
        # Check for conflicts
        for (sys1, sys2), reason in self.SYSTEM_CONFLICTS.items():
            if sys1 in final_systems and sys2 in final_systems:
                conflicts.append({
                    'systems': [sys1, sys2],
                    'reason': reason
                })
        
        logger.info(
            f"Dependency closure: {len(selected_systems)} selected → "
            f"{len(final_systems)} final ({len(auto_added)} auto-added)"
        )
        
        return {
            'final_systems': sorted(list(final_systems)),
            'auto_added': sorted(list(auto_added)),
            'warnings': warnings,
            'conflicts': conflicts
        }
    
    
    async def resolve_bundles_with_dependencies(
        self,
        bundle_keys: List[str],
        project_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Resolve dependencies for selected bundles
        Returns enriched bundles with dependency information
        """
        # Get all features for selected bundles
        features = await self.db.intelligence_features.find(
            {'bundle_key': {'$in': bundle_keys}},
            {'_id': 0}
        ).to_list(1000)
        
        # Extract system domains
        selected_systems = list(set(f['system_domain'] for f in features))
        
        # Calculate dependency closure
        closure = self.calculate_dependency_closure(selected_systems, project_context)
        
        # Get features for auto-added systems
        auto_added_features = []
        if closure['auto_added']:
            auto_added_features = await self.db.intelligence_features.find(
                {
                    'system_domain': {'$in': closure['auto_added']},
                    'tier': 'Essential'  # Auto-add only essential tier
                },
                {'_id': 0}
            ).to_list(500)
        
        return {
            'original_bundles': bundle_keys,
            'final_systems': closure['final_systems'],
            'auto_added_systems': closure['auto_added'],
            'auto_added_features': auto_added_features,
            'warnings': closure['warnings'],
            'conflicts': closure['conflicts'],
            'total_feature_count': len(features) + len(auto_added_features)
        }
    
    
    # ========================================================================
    # VISUALIZATION HELPERS
    # ========================================================================
    
    def generate_dependency_graph_data(
        self,
        selected_systems: List[str]
    ) -> Dict[str, Any]:
        """
        Generate graph data for frontend visualization (D3.js or React Flow)
        
        Returns:
            {
                'nodes': [{id, label, type, tier}],
                'edges': [{source, target, reason}]
            }
        """
        # Calculate closure
        closure = self.calculate_dependency_closure(
            selected_systems,
            {}  # Empty context for visualization
        )
        
        nodes = []
        edges = []
        
        # Create nodes
        for system in closure['final_systems']:
            node_type = 'auto_added' if system in closure['auto_added'] else 'selected'
            nodes.append({
                'id': system,
                'label': system,
                'type': node_type,
                'required': system in closure['auto_added']
            })
        
        # Create edges (dependencies)
        for system in selected_systems:
            deps = self.SYSTEM_DEPENDENCIES.get(system, [])
            for dep in deps:
                edges.append({
                    'source': system,
                    'target': dep,
                    'reason': f'{system} requires {dep}'
                })
        
        return {
            'nodes': nodes,
            'edges': edges,
            'warnings': closure['warnings'],
            'conflicts': closure['conflicts']
        }
    
    
    def get_explanation(
        self,
        system: str,
        required_systems: List[str]
    ) -> str:
        """
        Generate human-readable explanation for why systems are required
        """
        if not required_systems:
            return f"{system} has no additional requirements."
        
        reasons = []
        for req in required_systems:
            if system == 'Cinema' and req == 'Network':
                reasons.append("Network infrastructure is essential for streaming content and control")
            elif system == 'Cinema' and req == 'Acoustics':
                reasons.append("Professional acoustics ensure optimal sound experience")
            elif system == 'Cinema' and req == 'HVAC':
                reasons.append("Climate control maintains comfort during long viewing sessions")
            elif req == 'Network':
                reasons.append("Network connectivity enables remote control and automation")
            else:
                reasons.append(f"{req} provides essential support")
        
        return f"{system} requires: " + "; ".join(reasons)

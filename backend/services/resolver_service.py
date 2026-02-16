"""
Resolution Service - Core filtering and ranking logic
Transforms 693 features → 6-12 relevant bundles based on project DNA
"""

from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)


class ResolverService:
    """
    Intelligent feature and bundle resolution engine
    """
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
    
    
    # ========================================================================
    # PASS A: HARD GATING - Filter by constraints
    # ========================================================================
    
    async def filter_by_gates(
        self,
        segment: str,
        property_type: str,
        project_stage: str,
        area_sqft: int
    ) -> List[Dict]:
        """
        Pass A: Remove features that don't match hard constraints
        """
        query = {
            'segments_allowed': segment,
            'property_types_allowed': property_type,
            'project_stage_allowed': project_stage,
            'min_area_sqft': {'$lte': area_sqft}
        }
        
        # Also check max area if specified
        or_conditions = [
            {'max_area_sqft': None},
            {'max_area_sqft': {'$gte': area_sqft}}
        ]
        query['$or'] = or_conditions
        
        features = await self.db.intelligence_features.find(
            query,
            {'_id': 0}
        ).to_list(1000)
        
        logger.info(f"Pass A (Gating): {len(features)} features eligible")
        return features
    
    
    # ========================================================================
    # PASS B: OBJECTIVE RELEVANCE - Match intent
    # ========================================================================
    
    def filter_by_objectives(
        self,
        features: List[Dict],
        selected_objectives: List[str]
    ) -> List[Dict]:
        """
        Pass B: Keep only features whose objectives intersect user's goals
        Uses normalized tags for case-insensitive matching
        """
        if not selected_objectives:
            return features
        
        # Normalize user objectives to lowercase
        normalized_user_objectives = [obj.lower() for obj in selected_objectives]
        
        relevant_features = []
        for feature in features:
            # Use normalized tags if available, fallback to original
            feature_objectives = feature.get('objective_tags_normalized', [])
            if not feature_objectives:
                # Fallback: normalize original tags
                feature_objectives = [obj.lower() for obj in feature.get('objective_tags', [])]
            
            # Check if there's any overlap
            if any(obj in feature_objectives for obj in normalized_user_objectives):
                relevant_features.append(feature)
        
        logger.info(f"Pass B (Objectives): {len(relevant_features)} features match objectives")
        return relevant_features
    
    
    # ========================================================================
    # PASS C: DEPENDENCY CLOSURE - Handle requirements
    # ========================================================================
    
    async def resolve_dependencies(
        self,
        features: List[Dict]
    ) -> tuple[List[Dict], List[Dict]]:
        """
        Pass C: Auto-add required dependencies
        Returns: (final_features, auto_added_dependencies)
        """
        feature_ids = {f['feature_id'] for f in features}
        dependencies_to_add = set()
        
        for feature in features:
            deps = feature.get('dependencies_required', [])
            for dep in deps:
                if dep not in feature_ids:
                    dependencies_to_add.add(dep)
        
        # Fetch dependency features
        auto_added = []
        if dependencies_to_add:
            auto_added = await self.db.intelligence_features.find(
                {'feature_id': {'$in': list(dependencies_to_add)}},
                {'_id': 0}
            ).to_list(100)
        
        final_features = features + auto_added
        logger.info(f"Pass C (Dependencies): Added {len(auto_added)} dependency features")
        
        return final_features, auto_added
    
    
    # ========================================================================
    # PASS D: BUNDLE GROUPING - Group into systems
    # ========================================================================
    
    def group_into_bundles(
        self,
        features: List[Dict],
        max_bundles: int = 12
    ) -> Dict[str, List[Dict]]:
        """
        Pass D: Group features by bundle_key into system modules
        """
        bundle_groups = {}
        
        for feature in features:
            bundle_key = feature.get('bundle_key', 'BUNDLE-GENERAL')
            if bundle_key not in bundle_groups:
                bundle_groups[bundle_key] = []
            bundle_groups[bundle_key].append(feature)
        
        logger.info(f"Pass D (Bundling): Grouped into {len(bundle_groups)} bundles")
        return bundle_groups
    
    
    # ========================================================================
    # PASS E: AI RANKING - Score and prioritize
    # ========================================================================
    
    def rank_bundles(
        self,
        bundle_groups: Dict[str, List[Dict]],
        objectives: List[str],
        segment: str,
        property_type: str,
        area_sqft: int,
        tier_preference: Optional[str] = None
    ) -> List[Dict]:
        """
        Pass E: Score and rank bundles based on multiple factors
        Returns sorted list of bundles with scores
        """
        ranked_bundles = []
        
        for bundle_key, features in bundle_groups.items():
            score = self._calculate_bundle_score(
                bundle_key,
                features,
                objectives,
                segment,
                property_type,
                area_sqft,
                tier_preference
            )
            
            ranked_bundles.append({
                'bundle_key': bundle_key,
                'features': features,
                'score': score,
                'feature_count': len(features),
                'total_iq_points': sum(f.get('iq_points', 0) for f in features),
                'system_domain': features[0].get('system_domain', 'General') if features else 'General',
                'tier': features[0].get('tier', 'Essential') if features else 'Essential'
            })
        
        # Sort by score descending
        ranked_bundles.sort(key=lambda x: x['score'], reverse=True)
        
        logger.info(f"Pass E (Ranking): Scored {len(ranked_bundles)} bundles")
        return ranked_bundles
    
    
    def _calculate_bundle_score(
        self,
        bundle_key: str,
        features: List[Dict],
        objectives: List[str],
        segment: str,
        property_type: str,
        area_sqft: int,
        tier_preference: Optional[str]
    ) -> float:
        """
        Calculate relevance score (0-100) for a bundle
        
        Scoring factors:
        - Objective match (0-30 points)
        - Segment/property fit (0-20 points)
        - Area appropriateness (0-15 points)
        - Tier alignment (0-15 points)
        - Popularity (0-10 points)
        - Complexity penalty (0 to -10 points)
        """
        score = 0.0
        
        if not features:
            return 0.0
        
        # 1. Objective match (0-30)
        objective_matches = 0
        for feature in features:
            feature_objectives = feature.get('objective_tags', [])
            if any(obj in feature_objectives for obj in objectives):
                objective_matches += 1
        objective_score = min(30, (objective_matches / len(features)) * 30)
        score += objective_score
        
        # 2. Segment/property fit (0-20)
        perfect_fit_count = 0
        for feature in features:
            if segment in feature.get('segments_allowed', []) and \
               property_type in feature.get('property_types_allowed', []):
                perfect_fit_count += 1
        fit_score = (perfect_fit_count / len(features)) * 20
        score += fit_score
        
        # 3. Area appropriateness (0-15)
        area_fit_count = 0
        for feature in features:
            min_area = feature.get('min_area_sqft', 0)
            max_area = feature.get('max_area_sqft')
            if min_area <= area_sqft and (max_area is None or area_sqft <= max_area):
                area_fit_count += 1
        area_score = (area_fit_count / len(features)) * 15
        score += area_score
        
        # 4. Tier alignment (0-15)
        tier_score = 0
        if tier_preference:
            tier_count = sum(1 for f in features if f.get('tier') == tier_preference)
            tier_score = (tier_count / len(features)) * 15
        else:
            # Default: slight preference for Essential tier (easier to sell)
            essential_count = sum(1 for f in features if f.get('tier') == 'Essential')
            tier_score = (essential_count / len(features)) * 10
        score += tier_score
        
        # 5. Popularity (0-10)
        avg_popularity = sum(f.get('popularity_score', 1) for f in features) / len(features)
        popularity_score = min(10, (avg_popularity / 10) * 10)  # Normalize to 0-10
        score += popularity_score
        
        # 6. Complexity penalty (0 to -10)
        avg_complexity = sum(f.get('complexity', 3) for f in features) / len(features)
        if avg_complexity >= 4:
            score -= 10
        elif avg_complexity >= 3.5:
            score -= 5
        
        # 7. Invasiveness consideration for retrofit
        if any('retrofit' in stage.lower() for f in features for stage in f.get('project_stage_allowed', [])):
            high_invasive_count = sum(1 for f in features if f.get('invasiveness') == 'High')
            if high_invasive_count > len(features) / 2:
                score -= 5  # Penalty for high invasiveness in retrofit
        
        return max(0, min(100, score))  # Clamp to 0-100
    
    
    # ========================================================================
    # MAIN RESOLUTION METHOD - Orchestrates all passes
    # ========================================================================
    
    async def resolve_project(
        self,
        segment: str,
        property_type: str,
        project_stage: str,
        area_sqft: int,
        selected_objectives: List[str],
        tier_preference: Optional[str] = None,
        max_bundles: int = 12
    ) -> Dict[str, Any]:
        """
        Main orchestration: Run all passes and return resolved bundles
        """
        logger.info(f"Starting resolution for {property_type} ({area_sqft} sqft) - {segment}")
        
        # PASS A: Hard gating
        eligible_features = await self.filter_by_gates(
            segment, property_type, project_stage, area_sqft
        )
        
        # PASS B: Objective relevance
        relevant_features = self.filter_by_objectives(
            eligible_features, selected_objectives
        )
        
        # PASS C: Dependency closure
        final_features, auto_dependencies = await self.resolve_dependencies(
            relevant_features
        )
        
        # PASS D: Bundle grouping
        bundle_groups = self.group_into_bundles(final_features, max_bundles)
        
        # PASS E: AI ranking
        ranked_bundles = self.rank_bundles(
            bundle_groups,
            selected_objectives,
            segment,
            property_type,
            area_sqft,
            tier_preference
        )
        
        # Split into recommended and optional
        recommended_bundles = ranked_bundles[:8]
        optional_bundles = ranked_bundles[8:16] if len(ranked_bundles) > 8 else []
        
        return {
            'recommended_bundles': recommended_bundles,
            'optional_bundles': optional_bundles,
            'total_features_in_recommended': sum(b['feature_count'] for b in recommended_bundles),
            'total_features_in_optional': sum(b['feature_count'] for b in optional_bundles),
            'auto_added_dependencies': len(auto_dependencies),
            'statistics': {
                'features_after_gating': len(eligible_features),
                'features_after_objectives': len(relevant_features),
                'features_after_dependencies': len(final_features),
                'total_bundles': len(ranked_bundles),
                'recommended_count': len(recommended_bundles),
                'optional_count': len(optional_bundles)
            }
        }
    
    
    # ========================================================================
    # HELPER METHODS
    # ========================================================================
    
    async def get_bundle_details(self, bundle_ids: List[str]) -> List[Dict]:
        """
        Fetch full bundle information from database
        """
        bundles = await self.db.project_bundles.find(
            {'bundle_id': {'$in': bundle_ids}},
            {'_id': 0}
        ).to_list(100)
        return bundles
    
    
    async def get_features_by_bundle(self, bundle_key: str) -> List[Dict]:
        """
        Get all features belonging to a specific bundle
        """
        features = await self.db.intelligence_features.find(
            {'bundle_key': bundle_key},
            {'_id': 0}
        ).to_list(1000)
        return features

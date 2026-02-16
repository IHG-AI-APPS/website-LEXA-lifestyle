"""
AI Reasoning Service - Generate intelligent explanations for feature recommendations
Uses LLM to create context-aware reasoning for why features are recommended
"""

import os
import logging
from typing import Dict, Any, List
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()
logger = logging.getLogger(__name__)


class AIReasoningService:
    """
    Generates AI-powered reasoning for feature recommendations
    Uses LLM to create personalized explanations based on project context
    """
    
    def __init__(self):
        self.api_key = os.getenv('EMERGENT_LLM_KEY')
        if not self.api_key:
            logger.warning("EMERGENT_LLM_KEY not found. AI reasoning will use fallback logic.")
        
        self.system_prompt = """You are an expert smart home automation consultant for LEXA Lifestyle, 
specializing in luxury residential, commercial, and hospitality automation projects in Dubai/UAE.

Your task is to generate concise, compelling reasoning (2-3 sentences max) for why specific features 
are recommended for a project, based on the project's DNA and objectives.

Guidelines:
- Be specific to the project details (property type, size, objectives)
- Highlight practical benefits and use cases
- Mention dependencies or prerequisites when relevant
- Use professional but accessible language
- Focus on value proposition
- Keep it under 50 words

Output ONLY the reasoning text, no preamble."""
    
    
    async def generate_feature_reasoning(
        self,
        feature: Dict[str, Any],
        bundle: Dict[str, Any],
        project_context: Dict[str, Any]
    ) -> str:
        """
        Generate AI reasoning for a specific feature recommendation
        
        Uses rule-based reasoning for speed - LLM calls are expensive and slow
        
        Args:
            feature: Feature details (name, description, domain, tier)
            bundle: Bundle/system information
            project_context: Project DNA (segment, property_type, area, objectives, stage)
        
        Returns:
            str: Reasoning (2-3 sentences)
        """
        # Use fast rule-based reasoning for features (LLM is too slow for each feature)
        return self._fallback_reasoning(feature, bundle, project_context)
    
    
    async def generate_system_recommendation(
        self,
        system_domain: str,
        project_context: Dict[str, Any],
        score: float
    ) -> str:
        """
        Generate reasoning for why a system domain is recommended
        Uses rule-based reasoning for speed - LLM calls are too slow
        
        Args:
            system_domain: e.g., "Lighting", "Security", "HVAC"
            project_context: Project DNA
            score: Recommendation score (0-100)
        
        Returns:
            str: Reasoning
        """
        # Use fast rule-based reasoning to avoid LLM latency
        return self._fallback_system_reasoning(system_domain, project_context, score)
    
    
    async def generate_dependency_explanation(
        self,
        main_system: str,
        required_systems: List[str],
        project_context: Dict[str, Any]
    ) -> str:
        """
        Generate explanation for why dependencies are required
        
        Args:
            main_system: Primary system being added
            required_systems: List of prerequisite systems
            project_context: Project DNA
        
        Returns:
            str: Explanation of dependency requirements
        """
        try:
            if not self.api_key or not required_systems:
                return f"{main_system} requires {', '.join(required_systems)} as prerequisites for optimal functionality."
            
            prompt = f"""System: {main_system}
Required Dependencies: {', '.join(required_systems)}
Project Type: {project_context.get('property_type')} - {project_context.get('area_sqft')} sqft

Explain concisely (1-2 sentences) why these dependencies are required for {main_system} to work effectively."""
            
            chat = LlmChat(
                api_key=self.api_key,
                session_id=f"dep-{main_system}",
                system_message=self.system_prompt
            ).with_model("openai", "gpt-4o")
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            return response.strip()
            
        except Exception as e:
            logger.error(f"Dependency explanation failed: {str(e)}")
            return f"{main_system} requires {', '.join(required_systems)} for complete functionality."
    
    
    # ========================================================================
    # HELPER METHODS
    # ========================================================================
    
    def _build_feature_prompt(
        self,
        feature: Dict[str, Any],
        bundle: Dict[str, Any],
        project_context: Dict[str, Any]
    ) -> str:
        """Build structured prompt for feature reasoning"""
        return f"""Project Details:
- Type: {project_context.get('property_type')} {project_context.get('segment')}
- Size: {project_context.get('area_sqft')} sqft
- Stage: {project_context.get('project_stage')}
- Objectives: {', '.join(project_context.get('selected_objectives', []))}
- Location: {project_context.get('location', 'Dubai')}

Feature:
- Name: {feature.get('feature_name', 'Unknown')}
- System: {bundle.get('system_domain', 'General')}
- Tier: {feature.get('tier', 'Essential')}
- Complexity: {feature.get('complexity', 3)}/10
- Description: {feature.get('feature_description', feature.get('detailed_description', 'Smart automation feature'))}

Generate concise reasoning (2-3 sentences) for why this feature is recommended for this project."""
    
    
    def _fallback_reasoning(
        self,
        feature: Dict[str, Any],
        bundle: Dict[str, Any],
        project_context: Dict[str, Any]
    ) -> str:
        """Rule-based fallback reasoning when LLM is unavailable"""
        reasons = []
        
        feature_name = feature.get('feature_name', 'This feature')
        system_domain = bundle.get('system_domain', 'automation')
        property_type = project_context.get('property_type', 'property')
        area_sqft = project_context.get('area_sqft', 0)
        objectives = project_context.get('selected_objectives', [])
        tier = feature.get('tier', 'Essential')
        
        # Property-based reasoning
        if 'Villa' in property_type and area_sqft > 3000:
            reasons.append(f"Essential for {area_sqft} sqft {property_type} - provides comprehensive {system_domain.lower()} control across multiple zones")
        elif area_sqft < 1500:
            reasons.append(f"Optimized for compact {property_type} spaces - delivers smart {system_domain.lower()} without complexity")
        else:
            reasons.append(f"Recommended for {property_type} properties - enhances {system_domain.lower()} experience")
        
        # Objective-based reasoning
        if 'comfort' in objectives and system_domain in ['HVAC', 'Lighting', 'Climate']:
            reasons.append("Directly addresses your comfort objective with automated environmental control")
        elif 'security' in objectives and system_domain in ['Security', 'Access Control', 'Surveillance']:
            reasons.append("Critical for comprehensive security as per your stated objectives")
        elif 'luxury' in objectives and tier == 'Signature':
            reasons.append("Signature-tier feature aligns with your luxury ambience goals")
        
        # Stage-based reasoning
        stage = project_context.get('project_stage', '')
        complexity = feature.get('complexity', 3)
        if stage == 'Concept' and complexity >= 4:
            reasons.append("High complexity feature - ideal to plan during concept stage to minimize retrofit costs")
        elif stage == 'Retrofit':
            reasons.append(f"Feasible for retrofit with {feature.get('invasiveness', 'medium')} invasiveness")
        
        # Default if nothing specific
        if not reasons:
            reasons.append(f"{feature_name} provides {tier.lower()}-tier {system_domain.lower()} capabilities based on industry best practices for {property_type} properties")
        
        return ' • '.join(reasons[:2])  # Max 2 points
    
    
    def _fallback_system_reasoning(
        self,
        system_domain: str,
        project_context: Dict[str, Any],
        score: float
    ) -> str:
        """Rule-based system-level reasoning"""
        property_type = project_context.get('property_type', 'property')
        objectives = project_context.get('selected_objectives', [])
        area_sqft = project_context.get('area_sqft', 0)
        
        reasoning_parts = []
        
        # System-specific insights
        system_insights = {
            'Lighting': 'automated lighting control enhances ambience and energy efficiency',
            'HVAC': 'climate control is essential for year-round comfort in Dubai',
            'Security': 'comprehensive security provides peace of mind and property protection',
            'Network': 'robust networking infrastructure is the backbone of all smart systems',
            'AV': 'audio-visual systems transform entertainment and productivity',
            'Automation': 'centralized automation simplifies daily operations'
        }
        
        insight = system_insights.get(system_domain, f'{system_domain} integration adds significant value')
        reasoning_parts.append(f"{system_domain} system recommended with {score:.0f}% relevance - {insight}")
        
        # Objective alignment
        objective_map = {
            'comfort': ['HVAC', 'Lighting', 'Climate', 'Automation'],
            'security': ['Security', 'Access Control', 'Surveillance'],
            'luxury': ['AV', 'Lighting', 'Automation'],
            'energy': ['HVAC', 'Lighting', 'Energy Management']
        }
        
        for obj in objectives:
            if system_domain in objective_map.get(obj, []):
                reasoning_parts.append(f"Aligns with your {obj} objective")
                break
        
        return '. '.join(reasoning_parts) + '.'


# Singleton instance
_ai_reasoning_service = None

def get_ai_reasoning_service() -> AIReasoningService:
    """Get singleton instance of AI reasoning service"""
    global _ai_reasoning_service
    if _ai_reasoning_service is None:
        _ai_reasoning_service = AIReasoningService()
    return _ai_reasoning_service

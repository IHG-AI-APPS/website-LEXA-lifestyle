/**
 * Need Prioritization Framework
 * Guides customers through a consultative process to understand and prioritize their needs
 * Uses MoSCoW-inspired prioritization: Must Have, Should Have, Could Have, Want to Have
 * 
 * RESPONSIVE DESIGN:
 * - Mobile (<768px): Tap-to-select UI with feature selection grid at top
 * - Desktop (>=768px): Drag-and-drop UI with features at bottom
 * Uses CSS-based responsive design for reliability across all browsers
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  Info,
  GripVertical,
  Shield,
  Zap,
  Home,
  Tv,
  Plus,
  X,
  Hand
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

// Prioritization Tiers with clear definitions
const PRIORITY_TIERS = [
  {
    id: 'must_have',
    label: 'Must Have',
    icon: AlertCircle,
    color: 'from-gray-900 to-black',
    bgColor: 'bg-gray-900',
    description: 'Essential features you cannot compromise on',
    examples: 'Core functionality, security, infrastructure',
    guidanceText: 'These are non-negotiable. Your project cannot function without them.'
  },
  {
    id: 'should_have',
    label: 'Should Have',
    icon: CheckCircle2,
    color: 'from-gray-800 to-gray-700',
    bgColor: 'bg-gray-700',
    description: 'Important features that significantly enhance value',
    examples: 'Key conveniences, productivity boosters, comfort',
    guidanceText: 'Important but not critical. Worth including in the primary scope.'
  },
  {
    id: 'could_have',
    label: 'Could Have',
    icon: Star,
    color: 'from-gray-700 to-gray-600',
    bgColor: 'bg-gray-600',
    description: 'Nice enhancements if budget and timeline allow',
    examples: 'Aesthetic upgrades, additional zones, premium finishes',
    guidanceText: 'Desirable but can be phased. Consider for future expansion.'
  },
  {
    id: 'want_to_have',
    label: 'Want to Have',
    icon: Sparkles,
    color: 'from-gray-600 to-gray-500',
    bgColor: 'bg-gray-500',
    description: 'Aspirational features for the ultimate experience',
    examples: 'Luxury additions, cutting-edge tech, unique experiences',
    guidanceText: 'Dream features. Perfect for phased implementation or future upgrades.'
  }
]

interface Feature {
  id: string
  name: string
  domain: string
  icon: any
  description: string
  typical_priority?: string
}

// Sample features to categorize
const SAMPLE_FEATURES: Feature[] = [
  { id: 'lighting_control', name: 'Smart Lighting Control', domain: 'Lighting', icon: Zap, description: 'Centralized control of all lights with scenes and scheduling' },
  { id: 'climate_control', name: 'Climate Control', domain: 'HVAC', icon: Home, description: 'Smart thermostats and zoned temperature management' },
  { id: 'security_cameras', name: 'Security Cameras', domain: 'Security', icon: Shield, description: '24/7 monitoring with motion detection and alerts' },
  { id: 'access_control', name: 'Access Control', domain: 'Security', icon: Shield, description: 'Smart locks, biometric access, visitor management' },
  { id: 'home_theater', name: 'Dedicated Home Theater', domain: 'Entertainment', icon: Tv, description: 'Cinema-grade audio/video with Dolby Atmos' },
  { id: 'multiroom_audio', name: 'Multi-Room Audio', domain: 'Entertainment', icon: Tv, description: 'Synchronized music throughout the property' },
  { id: 'voice_control', name: 'Voice Control', domain: 'Control', icon: Home, description: 'Alexa/Google Assistant integration for hands-free control' },
  { id: 'energy_monitoring', name: 'Energy Monitoring', domain: 'Energy', icon: Zap, description: 'Track and optimize energy consumption' },
  { id: 'motorized_shades', name: 'Motorized Shades', domain: 'Shading', icon: Home, description: 'Automated window treatments with scheduling' },
  { id: 'smart_irrigation', name: 'Smart Irrigation', domain: 'Outdoor', icon: Home, description: 'Weather-based automatic garden watering' }
]

interface NeedPrioritizationProps {
  sessionId: string
  projectData: any
  onComplete: (prioritizedNeeds: any) => void
}

export default function NeedPrioritization({
  sessionId,
  projectData,
  onComplete
}: NeedPrioritizationProps) {
  const [currentStep, setCurrentStep] = useState<'education' | 'categorization' | 'review'>('education')
  const [categorizedFeatures, setCategorizedFeatures] = useState<Record<string, string[]>>({
    must_have: [],
    should_have: [],
    could_have: [],
    want_to_have: []
  })
  const [draggedFeature, setDraggedFeature] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [uncategorized, setUncategorized] = useState<string[]>(
    SAMPLE_FEATURES.map(f => f.id)
  )
  
  // AI Recommendations state
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [loadingAi, setLoadingAi] = useState(false)
  
  // Fetch AI recommendations when entering categorization step
  const fetchAiRecommendations = async () => {
    setLoadingAi(true)
    try {
      // Map project objectives to lifestyle priorities
      const priorityMap: Record<string, string> = {
        'convenience': 'convenience',
        'security': 'security',
        'entertainment': 'entertainment',
        'energy_efficiency': 'energy',
        'comfort': 'comfort',
        'wellness': 'wellness'
      }
      
      const objectives = projectData?.objectives || []
      const priorities = objectives.map((obj: string) => priorityMap[obj] || obj).filter(Boolean)
      
      if (priorities.length === 0) {
        priorities.push('comfort', 'convenience') // Default priorities
      }
      
      const response = await fetch(`${BACKEND_URL}/api/intelligence/ai-recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priorities: priorities.slice(0, 3),
          property_type: projectData?.property_type || 'villa',
          budget_range: 'medium'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setAiRecommendations(data.recommendations || [])
      }
    } catch (error) {
      console.error('Failed to fetch AI recommendations:', error)
    } finally {
      setLoadingAi(false)
    }
  }
  
  // Check if a feature is AI recommended
  const isAiRecommended = (featureName: string) => {
    return aiRecommendations.some(rec => 
      rec.feature_title.toLowerCase().includes(featureName.toLowerCase()) ||
      featureName.toLowerCase().includes(rec.feature_title.toLowerCase().split(' ')[0])
    )
  }

  const handleFeatureDrop = (featureId: string, tierId: string) => {
    // Remove from current category
    const newCategorized = { ...categorizedFeatures }
    Object.keys(newCategorized).forEach(key => {
      newCategorized[key] = newCategorized[key].filter(id => id !== featureId)
    })

    // Add to new category
    newCategorized[tierId] = [...newCategorized[tierId], featureId]
    
    // Remove from uncategorized
    setUncategorized(prev => prev.filter(id => id !== featureId))
    
    setCategorizedFeatures(newCategorized)
    setDraggedFeature(null)
    setSelectedFeature(null)
  }

  // Mobile: Tap feature to select, then tap category to add
  const handleFeatureTap = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null) // Deselect if tapping same feature
    } else {
      setSelectedFeature(featureId)
    }
  }

  const handleTierTap = (tierId: string) => {
    if (selectedFeature) {
      handleFeatureDrop(selectedFeature, tierId)
    }
  }

  const handleRemoveFromCategory = (featureId: string, tierId: string) => {
    const newCategorized = { ...categorizedFeatures }
    newCategorized[tierId] = newCategorized[tierId].filter(id => id !== featureId)
    setCategorizedFeatures(newCategorized)
    setUncategorized(prev => [...prev, featureId])
  }

  const handleContinue = async () => {
    if (currentStep === 'education') {
      setCurrentStep('categorization')
      // Fetch AI recommendations when entering categorization
      fetchAiRecommendations()
    } else if (currentStep === 'categorization') {
      const totalCategorized = Object.values(categorizedFeatures).reduce((sum, arr) => sum + arr.length, 0)
      if (totalCategorized < 3) {
        alert('Please categorize at least 3 features to continue')
        return
      }
      setCurrentStep('review')
    } else {
      // Submit prioritized needs
      const prioritizedData = {
        session_id: sessionId,
        prioritized_needs: categorizedFeatures,
        tier_weights: {
          must_have: 1.0,
          should_have: 0.75,
          could_have: 0.5,
          want_to_have: 0.25
        }
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/project-builder/priorities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prioritizedData)
        })

        if (response.ok) {
          onComplete(prioritizedData)
        }
      } catch (error) {
        console.error('Priority submission error:', error)
        onComplete(prioritizedData) // Continue anyway
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {/* Step 1: Education */}
        {currentStep === 'education' && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10 md:mb-16">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl md:rounded-3xl mb-6 md:mb-8 shadow-2xl"
              >
                <Heart className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </motion.div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Prioritize Your Needs
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mb-3 md:mb-4">
                Understanding What Matters Most
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Not all features are created equal. Let&apos;s help you distinguish between 
                what you absolutely need versus what would be nice to have.
              </p>
            </div>

            {/* Priority Framework Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              {PRIORITY_TIERS.map((tier, index) => {
                const Icon = tier.icon
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white border-2 border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-5 md:p-8 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${tier.color} rounded-xl md:rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                          {tier.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-2 md:mb-3">
                          {tier.description}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-2 md:mb-3">
                          <p className="text-[10px] md:text-xs text-gray-500 font-medium mb-1">EXAMPLES:</p>
                          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{tier.examples}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Info className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] md:text-xs text-gray-500 italic">
                            {tier.guidanceText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Why This Matters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-5 md:p-8 mb-8 md:mb-12"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 dark:text-gray-300" />
                Why This Matters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs md:text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">Budget Optimization</div>
                  <p>Invest where it matters most, save where you can phase later</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">Clear Decision Making</div>
                  <p>Know exactly what to include now vs. what can wait</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">Future-Proof Planning</div>
                  <p>Design with expansion in mind for seamless upgrades</p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 md:px-12 py-5 md:py-6 text-base md:text-lg w-full md:w-auto"
                data-testid="start-prioritization-btn"
              >
                Start Prioritization
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Interactive Categorization */}
        {currentStep === 'categorization' && (
          <motion.div
            key="categorization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title - Different text for mobile vs desktop */}
            <div className="text-center mb-6 md:mb-12">
              {/* Mobile title */}
              <h2 className="md:hidden text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Tap to categorize features
              </h2>
              {/* Desktop title */}
              <h2 className="hidden md:block text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Drag features into categories
              </h2>
              
              {/* Mobile instructions */}
              <p className="md:hidden text-gray-600 dark:text-gray-400 text-sm">
                Tap a feature below, then tap a category to add it
              </p>
              {/* Desktop instructions */}
              <p className="hidden md:block text-gray-600 dark:text-gray-400 text-base">
                Based on your project, drag each feature into the tier that best represents its priority
              </p>
              
              {/* AI Recommendations Banner */}
              {aiRecommendations.length > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-800">
                    <strong>AI Suggestions Active</strong> - Look for ★ badges on recommended features
                  </span>
                </div>
              )}
              
              {/* Selected feature indicator - shows on both */}
              {selectedFeature && (
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Hand className="w-4 h-4" />
                  <span>Selected: {SAMPLE_FEATURES.find(f => f.id === selectedFeature)?.name}</span>
                  <button onClick={() => setSelectedFeature(null)} className="hover:text-blue-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE ONLY: Feature Selection Grid at Top */}
            {uncategorized.length > 0 && (
              <div className="md:hidden bg-white border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                  <Hand className="w-4 h-4 text-blue-600" />
                  <span>Select a Feature</span>
                  <span className="text-xs font-normal text-gray-500">({uncategorized.length} remaining)</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {uncategorized.map((featureId) => {
                    const feature = SAMPLE_FEATURES.find(f => f.id === featureId)
                    if (!feature) return null
                    const FeatureIcon = feature.icon
                    const isSelected = selectedFeature === featureId
                    const aiRec = isAiRecommended(feature.name)

                    return (
                      <button
                        key={featureId}
                        onClick={() => handleFeatureTap(featureId)}
                        data-testid={`feature-${featureId}`}
                        className={`p-3 rounded-xl text-left transition-all relative ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-lg scale-[1.02]' 
                            : aiRec
                              ? 'bg-amber-50 border-2 border-amber-300 hover:border-amber-400'
                              : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 active:scale-95'
                        }`}
                      >
                        {aiRec && !isSelected && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-white" />
                          </span>
                        )}
                        <div className="flex items-center gap-2">
                          <FeatureIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                          <span className="text-xs font-medium truncate">{feature.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                {!selectedFeature && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    👆 Tap a feature, then tap a category below to add it
                  </p>
                )}
              </div>
            )}

            {/* Priority Columns / Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-12">
              {PRIORITY_TIERS.map((tier) => {
                const Icon = tier.icon
                const featuresInTier = categorizedFeatures[tier.id]

                return (
                  <div
                    key={tier.id}
                    onClick={() => handleTierTap(tier.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (draggedFeature) {
                        handleFeatureDrop(draggedFeature, tier.id)
                      }
                    }}
                    data-testid={`tier-${tier.id}`}
                    className={`border-2 border-dashed rounded-xl md:rounded-2xl p-4 md:p-6 min-h-[180px] md:min-h-[400px] transition-all cursor-pointer ${
                      selectedFeature 
                        ? 'border-blue-400 bg-blue-50 hover:bg-blue-100 hover:border-blue-500' 
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                      <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${tier.color} rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-lg truncate">{tier.label}</h3>
                        <p className="text-[10px] md:text-xs text-gray-500">{featuresInTier.length} features</p>
                      </div>
                      {selectedFeature && (
                        <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      {featuresInTier.map((featureId) => {
                        const feature = SAMPLE_FEATURES.find(f => f.id === featureId)
                        if (!feature) return null
                        const FeatureIcon = feature.icon

                        return (
                          <div
                            key={featureId}
                            draggable
                            onDragStart={() => setDraggedFeature(featureId)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl p-2 md:p-4 md:cursor-move hover:shadow-lg transition-shadow group"
                          >
                            <div className="flex items-center gap-2 md:gap-3">
                              {/* Grip icon - desktop only */}
                              <GripVertical className="hidden md:block w-4 h-4 text-gray-400" />
                              <FeatureIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">{feature.name}</div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromCategory(featureId, tier.id)
                                }}
                                className="text-red-500 hover:text-red-700 text-xs transition-opacity flex-shrink-0"
                                data-testid={`remove-${featureId}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {featuresInTier.length === 0 && (
                      <div className="text-center py-6 md:py-12 text-gray-400 text-xs md:text-sm">
                        {selectedFeature ? (
                          <span className="text-blue-600 font-medium">Tap to add here</span>
                        ) : (
                          <>
                            {/* Mobile empty state */}
                            <span className="md:hidden">Select a feature first</span>
                            {/* Desktop empty state */}
                            <span className="hidden md:inline">Drag features here</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* DESKTOP ONLY: Uncategorized Features at bottom */}
            {uncategorized.length > 0 && (
              <div className="hidden md:block bg-white border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-gray-500">Uncategorized Features</span>
                  <span className="text-sm font-normal text-gray-500">({uncategorized.length} remaining)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {uncategorized.map((featureId) => {
                    const feature = SAMPLE_FEATURES.find(f => f.id === featureId)
                    if (!feature) return null
                    const FeatureIcon = feature.icon
                    const aiRec = isAiRecommended(feature.name)

                    return (
                      <div
                        key={featureId}
                        draggable
                        onDragStart={() => setDraggedFeature(featureId)}
                        data-testid={`uncategorized-${featureId}`}
                        className={`relative border rounded-xl p-4 cursor-move hover:shadow-lg transition-all ${
                          aiRec 
                            ? 'bg-amber-50 border-amber-300 hover:bg-amber-100' 
                            : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-white'
                        }`}
                      >
                        {aiRec && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
                            <Star className="w-3 h-3 text-white fill-white" />
                          </span>
                        )}
                        <div className="flex flex-col items-center text-center gap-2">
                          <FeatureIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                          <div className="text-xs font-medium text-gray-900 dark:text-white dark:text-white">{feature.name}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between gap-3">
              <Button
                onClick={() => setCurrentStep('education')}
                variant="outline"
                size="lg"
                className="px-8 order-2 md:order-1"
                data-testid="back-to-education-btn"
              >
                ← Back
              </Button>
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-12 order-1 md:order-2"
                data-testid="review-continue-btn"
              >
                Review & Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {currentStep === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                Your Priority Framework
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Here&apos;s how your needs are prioritized. The AI will use this to optimize your proposals.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {PRIORITY_TIERS.map((tier) => {
                const Icon = tier.icon
                const features = categorizedFeatures[tier.id]
                if (features.length === 0) return null

                return (
                  <div key={tier.id} className="bg-white border-2 border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-5 md:p-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${tier.color} rounded-lg md:rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{tier.label}</h3>
                        <p className="text-xs md:text-sm text-gray-500">{features.length} features</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {features.map((featureId) => {
                        const feature = SAMPLE_FEATURES.find(f => f.id === featureId)
                        if (!feature) return null
                        const FeatureIcon = feature.icon

                        return (
                          <div key={featureId} className="flex items-center gap-2 md:gap-3 bg-gray-50 rounded-lg p-3 md:p-4">
                            <FeatureIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                            <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-white dark:text-white">{feature.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-3">
              <Button
                onClick={() => setCurrentStep('categorization')}
                variant="outline"
                size="lg"
                className="px-8 order-2 md:order-1"
                data-testid="edit-priorities-btn"
              >
                ← Edit Priorities
              </Button>
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-12 order-1 md:order-2"
                data-testid="finalize-btn"
              >
                Finalize & Generate Proposals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

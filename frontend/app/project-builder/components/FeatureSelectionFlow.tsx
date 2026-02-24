/**
 * Sequential Feature Selection Component
 * Guides users through selecting features by priority tier:
 * 1. Must Have → 2. Should Have → 3. Could Have → 4. Want to Have
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  Lightbulb,
  Thermometer,
  Shield,
  Tv,
  Smartphone,
  Zap,
  Trees,
  Heart,
  Wifi,
  Home,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Icon map
const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Thermometer, Shield, Tv, Smartphone, Zap, Trees, Heart, Wifi, Home,
  Blinds: Home, Refrigerator: Home, Sparkles
}

// Tier configuration
const TIERS = [
  {
    id: 'must_have',
    name: 'Must Have',
    description: 'Essential features you cannot live without',
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-600',
    icon: AlertCircle,
    instruction: 'Select the features that are absolutely essential for your project'
  },
  {
    id: 'should_have',
    name: 'Should Have',
    description: 'Important features that add significant value',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500',
    icon: CheckCircle2,
    instruction: 'Select features that are important but not critical'
  },
  {
    id: 'could_have',
    name: 'Could Have',
    description: 'Nice-to-have features if budget allows',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500',
    icon: Star,
    instruction: 'Select features you would like to have if possible'
  },
  {
    id: 'want_to_have',
    name: 'Want to Have',
    description: 'Dream features for the ultimate experience',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500',
    icon: Sparkles,
    instruction: 'Select your dream features and aspirational additions'
  }
]

interface Feature {
  id: string
  name: string
  description: string
  popularity: number
  tier_suggestion: string
  category_id?: string
  category_name?: string
  category_icon?: string
}

interface Category {
  category_id: string
  category_name: string
  category_icon: string
  features: Feature[]
}

interface FeatureSelectionProps {
  sessionId: string
  onComplete: (selections: Record<string, string[]>) => void
  initialSelections?: Record<string, string[]>
}

export default function FeatureSelectionFlow({
  sessionId,
  onComplete,
  initialSelections = {}
}: FeatureSelectionProps) {
  const [currentTierIndex, setCurrentTierIndex] = useState(0)
  const [selections, setSelections] = useState<Record<string, string[]>>(initialSelections)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [popularFeatures, setPopularFeatures] = useState<Feature[]>([])

  const currentTier = TIERS[currentTierIndex]

  // Fetch features for current tier
  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${BACKEND_URL}/api/smart-home/features/by-tier/${currentTier.id}`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        if (response.ok) {
          const data = await response.json()
          setCategories(data.categories || [])
          // Expand first category by default
          if (data.categories?.length > 0) {
            setExpandedCategories(new Set([data.categories[0].category_id]))
          }
        } else {
          setError('Failed to load features. Please refresh.')
        }

        // Fetch popular features for recommendations
        const popularRes = await fetch(`${BACKEND_URL}/api/smart-home/features/popular?limit=10`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        if (popularRes.ok) {
          const popularData = await popularRes.json()
          setPopularFeatures(popularData.popular_features || [])
        }
      } catch (err) {
        console.error('Error fetching features:', err)
        setError('Network error. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [currentTier.id])

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    setSelections(prev => {
      const tierSelections = prev[currentTier.id] || []
      if (tierSelections.includes(featureId)) {
        return {
          ...prev,
          [currentTier.id]: tierSelections.filter(id => id !== featureId)
        }
      } else {
        return {
          ...prev,
          [currentTier.id]: [...tierSelections, featureId]
        }
      }
    })
  }

  // Check if feature is selected
  const isSelected = (featureId: string) => {
    return (selections[currentTier.id] || []).includes(featureId)
  }

  // Check if feature was selected in a previous tier
  const isSelectedInOtherTier = (featureId: string) => {
    return TIERS.some((tier, index) => 
      index !== currentTierIndex && (selections[tier.id] || []).includes(featureId)
    )
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  // Filter features by search
  const filteredCategories = categories.map(cat => ({
    ...cat,
    features: cat.features.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.features.length > 0)

  // Navigation
  const handleNext = () => {
    if (currentTierIndex < TIERS.length - 1) {
      setCurrentTierIndex(currentTierIndex + 1)
      setSearchQuery('')
    } else {
      onComplete(selections)
    }
  }

  const handleBack = () => {
    if (currentTierIndex > 0) {
      setCurrentTierIndex(currentTierIndex - 1)
      setSearchQuery('')
    }
  }

  // Get total selections count
  const getTotalSelections = () => {
    return Object.values(selections).reduce((sum, arr) => sum + arr.length, 0)
  }

  const TierIcon = currentTier.icon

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {TIERS.map((tier, index) => {
            const Icon = tier.icon
            const isActive = index === currentTierIndex
            const isCompleted = index < currentTierIndex
            const selectionCount = (selections[tier.id] || []).length
            
            return (
              <React.Fragment key={tier.id}>
                <div 
                  className={`flex flex-col items-center ${isActive ? 'opacity-100' : 'opacity-60'}`}
                  onClick={() => index < currentTierIndex && setCurrentTierIndex(index)}
                  style={{ cursor: index < currentTierIndex ? 'pointer' : 'default' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive ? `bg-gradient-to-br ${tier.color} text-white shadow-lg scale-110` :
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {tier.name}
                  </span>
                  {selectionCount > 0 && (
                    <span className="text-xs text-gray-400">
                      {selectionCount} selected
                    </span>
                  )}
                </div>
                {index < TIERS.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    index < currentTierIndex ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Current Tier Header */}
      <motion.div
        key={currentTier.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentTier.color} text-white mb-4`}>
          <TierIcon className="w-5 h-5" />
          <span className="font-semibold">{currentTier.name}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Select Your {currentTier.name} Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {currentTier.instruction}
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-3 text-lg"
        />
      </div>

      {/* Popular/Recommended Section */}
      {currentTierIndex === 0 && popularFeatures.length > 0 && !searchQuery && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Most Popular Choices
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularFeatures.slice(0, 8).map(feature => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                disabled={isSelectedInOtherTier(feature.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected(feature.id)
                    ? 'bg-green-500 text-white'
                    : isSelectedInOtherTier(feature.id)
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-400 text-gray-700'
                }`}
              >
                {feature.name}
                <span className="ml-1 text-xs opacity-70">({feature.popularity}%)</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feature Categories */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {filteredCategories.map(category => {
            const IconComponent = ICON_MAP[category.category_icon] || Home
            const isExpanded = expandedCategories.has(category.category_id)
            const selectedInCategory = category.features.filter(f => isSelected(f.id)).length
            
            return (
              <div key={category.category_id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.category_id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentTier.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white">{category.category_name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.features.length} features
                        {selectedInCategory > 0 && (
                          <span className="ml-2 text-green-600">• {selectedInCategory} selected</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Features List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700 dark:border-gray-700"
                    >
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.features.map(feature => {
                          const selected = isSelected(feature.id)
                          const otherTier = isSelectedInOtherTier(feature.id)
                          
                          return (
                            <button
                              key={feature.id}
                              onClick={() => !otherTier && toggleFeature(feature.id)}
                              disabled={otherTier}
                              className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                                selected
                                  ? `bg-gradient-to-r ${currentTier.color} text-white shadow-md`
                                  : otherTier
                                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                                selected ? 'bg-white/20' : 'bg-gray-100'
                              }`}>
                                {selected ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <span className={`w-2 h-2 rounded-full ${
                                    feature.popularity >= 80 ? 'bg-green-500' :
                                    feature.popularity >= 60 ? 'bg-yellow-500' : 'bg-gray-300'
                                  }`} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium truncate">{feature.name}</span>
                                  {feature.popularity >= 85 && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                                      selected ? 'bg-white/20' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm truncate ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                                  {feature.description}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

      {/* Selection Summary */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-gray-700 p-4 -mx-4 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Selected in {currentTier.name}:</span>
            <span className="ml-2 font-bold text-lg">{(selections[currentTier.id] || []).length} features</span>
            <span className="ml-4 text-sm text-gray-400">
              Total: {getTotalSelections()} features
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {currentTierIndex > 0 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className={`bg-gradient-to-r ${currentTier.color} hover:opacity-90 text-white`}
            >
              {currentTierIndex < TIERS.length - 1 ? (
                <>
                  Next: {TIERS[currentTierIndex + 1].name}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Continue to Protocols
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

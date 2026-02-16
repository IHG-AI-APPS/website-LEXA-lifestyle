/**
 * Feature Prioritization Component
 * Step 2: User goes through each category and assigns priority to features
 * Clean, focused UI - one category at a time
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Star,
  Sparkles,
  AlertCircle,
  Lightbulb,
  Thermometer,
  Shield,
  Tv,
  Home,
  Smartphone,
  Zap,
  Trees,
  Heart,
  Wifi,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Icon mapping
const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Thermometer, Shield, Tv, Smartphone, Zap, Trees, Heart, Wifi, Home, Sparkles,
  Blinds: Home, Refrigerator: Home
}

// Priority options
const PRIORITY_OPTIONS = [
  {
    id: 'must_have',
    label: 'Must Have',
    shortLabel: 'Must',
    description: 'Essential - cannot live without',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-500',
    textColor: 'text-red-600',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-500',
    icon: AlertCircle
  },
  {
    id: 'should_have',
    label: 'Should Have',
    shortLabel: 'Should',
    description: 'Important - high value',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-500',
    textColor: 'text-orange-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-500',
    icon: Star
  },
  {
    id: 'nice_to_have',
    label: 'Nice to Have',
    shortLabel: 'Nice',
    description: 'Optional - if budget allows',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-500',
    textColor: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
    icon: Sparkles
  },
  {
    id: 'skip',
    label: 'Skip',
    shortLabel: 'Skip',
    description: 'Not interested',
    color: 'bg-gray-400',
    hoverColor: 'hover:bg-gray-400',
    textColor: 'text-gray-500',
    bgLight: 'bg-gray-50',
    borderColor: 'border-gray-400',
    icon: X
  }
]

interface Feature {
  id: string
  name: string
  description: string
  popularity: number
  tier_suggestion: string
}

interface Category {
  id: string
  name: string
  icon: string
  features: Feature[]
}

export interface FeaturePriority {
  featureId: string
  featureName: string
  categoryId: string
  priority: 'must_have' | 'should_have' | 'nice_to_have' | 'skip'
}

interface FeaturePrioritizationProps {
  selectedCategories: string[]
  onComplete: (priorities: FeaturePriority[]) => void
  onBack: () => void
  initialPriorities?: FeaturePriority[]
}

export default function FeaturePrioritization({
  selectedCategories,
  onComplete,
  onBack,
  initialPriorities = []
}: FeaturePrioritizationProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [priorities, setPriorities] = useState<Map<string, FeaturePriority>>(
    new Map(initialPriorities.map(p => [p.featureId, p]))
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch features for selected categories
  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${BACKEND_URL}/api/smart-home/features`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        if (response.ok) {
          const data = await response.json()
          // Filter to only selected categories
          const filteredCats = data.categories.filter((cat: Category) => 
            selectedCategories.includes(cat.id)
          )
          setCategories(filteredCats)
        } else {
          setError('Failed to load features. Please refresh.')
        }
      } catch (err) {
        console.error('Error fetching features:', err)
        setError('Network error. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [selectedCategories])

  const currentCategory = categories[currentCategoryIndex]

  // Set priority for a feature
  const setPriority = (feature: Feature, priority: 'must_have' | 'should_have' | 'nice_to_have' | 'skip') => {
    setPriorities(prev => {
      const newMap = new Map(prev)
      newMap.set(feature.id, {
        featureId: feature.id,
        featureName: feature.name,
        categoryId: currentCategory.id,
        priority
      })
      return newMap
    })
  }

  // Get priority for a feature
  const getPriority = (featureId: string) => {
    return priorities.get(featureId)?.priority
  }

  // Check if all features in current category are assigned
  const allFeaturesAssigned = () => {
    if (!currentCategory) return false
    return currentCategory.features.every(f => priorities.has(f.id))
  }

  // Navigation
  const goToNextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1)
    } else {
      // Complete
      onComplete(Array.from(priorities.values()))
    }
  }

  const goToPrevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1)
    } else {
      onBack()
    }
  }

  // Quick actions
  const setAllAs = (priority: 'must_have' | 'should_have' | 'nice_to_have' | 'skip') => {
    if (!currentCategory) return
    setPriorities(prev => {
      const newMap = new Map(prev)
      currentCategory.features.forEach(f => {
        newMap.set(f.id, {
          featureId: f.id,
          featureName: f.name,
          categoryId: currentCategory.id,
          priority
        })
      })
      return newMap
    })
  }

  // Calculate summary stats
  const getSummary = () => {
    const all = Array.from(priorities.values())
    return {
      must_have: all.filter(p => p.priority === 'must_have').length,
      should_have: all.filter(p => p.priority === 'should_have').length,
      nice_to_have: all.filter(p => p.priority === 'nice_to_have').length,
      skip: all.filter(p => p.priority === 'skip').length,
      total: all.length
    }
  }

  const summary = getSummary()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-8 mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!currentCategory) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No categories selected. Please go back and select categories.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    )
  }

  const IconComponent = ICON_MAP[currentCategory.icon] || Home

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4"
        >
          <IconComponent className="w-5 h-5" />
          <span className="font-semibold">{currentCategory.name}</span>
          <span className="text-purple-200">({currentCategoryIndex + 1}/{categories.length})</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
        >
          Prioritize Your Features
        </motion.h2>
        <p className="text-gray-600">
          For each feature, select how important it is to you
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <span className="text-sm text-gray-500 mr-2 self-center">Quick:</span>
        {PRIORITY_OPTIONS.map(opt => (
          <Button
            key={opt.id}
            variant="outline"
            size="sm"
            onClick={() => setAllAs(opt.id as any)}
            className={`text-xs ${opt.textColor}`}
          >
            All {opt.shortLabel}
          </Button>
        ))}
      </div>

      {/* Category Progress */}
      <div className="flex items-center gap-2 mb-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className={`h-2 flex-1 rounded-full transition-all ${
              idx < currentCategoryIndex ? 'bg-green-500' :
              idx === currentCategoryIndex ? 'bg-purple-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Features List */}
      <motion.div 
        key={currentCategory.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-3 mb-8"
      >
        {currentCategory.features.map((feature, index) => {
          const currentPriority = getPriority(feature.id)
          const selectedOption = PRIORITY_OPTIONS.find(o => o.id === currentPriority)
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedOption 
                  ? `${selectedOption.bgLight} ${selectedOption.borderColor}` 
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Feature Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                    {feature.popularity >= 85 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{feature.description}</p>
                </div>
                {selectedOption && (
                  <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${selectedOption.color}`}>
                    {selectedOption.label}
                  </div>
                )}
              </div>

              {/* Priority Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {PRIORITY_OPTIONS.map(option => {
                  const isSelected = currentPriority === option.id
                  const Icon = option.icon
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => setPriority(feature, option.id as any)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                        isSelected 
                          ? `${option.color} text-white shadow-md` 
                          : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{option.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="text-sm font-medium text-gray-700 mb-3">Your Selections Summary</div>
        <div className="grid grid-cols-4 gap-3">
          {PRIORITY_OPTIONS.filter(o => o.id !== 'skip').map(opt => (
            <div key={opt.id} className={`p-3 rounded-lg ${opt.bgLight}`}>
              <div className={`text-2xl font-bold ${opt.textColor}`}>
                {summary[opt.id as keyof typeof summary]}
              </div>
              <div className="text-xs text-gray-500">{opt.label}</div>
            </div>
          ))}
          <div className="p-3 rounded-lg bg-gray-100">
            <div className="text-2xl font-bold text-gray-600">{summary.skip}</div>
            <div className="text-xs text-gray-500">Skipped</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={goToPrevCategory}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            {currentCategoryIndex === 0 ? 'Back to Categories' : 'Previous Category'}
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-500">
              {priorities.size} of {categories.reduce((sum, c) => sum + c.features.length, 0)} features assigned
            </div>
          </div>
          
          <Button 
            onClick={goToNextCategory}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
          >
            {currentCategoryIndex < categories.length - 1 ? (
              <>
                Next: {categories[currentCategoryIndex + 1]?.name}
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
  )
}

/**
 * Must-Have Features Selection
 * Step 3: Simple checkbox selection for essential features
 * Shows only top 10-15 features per category - no overwhelming choices
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
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
  Star,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Icon mapping
const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Thermometer, Shield, Tv, Smartphone, Zap, Trees, Heart, Wifi, Home, Sparkles,
  Blinds: Home, Refrigerator: Home
}

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

interface MustHaveSelectionProps {
  selectedCategories: string[]
  onComplete: (selectedFeatures: string[]) => void
  onBack: () => void
  initialSelection?: string[]
}

export default function MustHaveSelection({
  selectedCategories,
  onComplete,
  onBack,
  initialSelection = []
}: MustHaveSelectionProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(initialSelection))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch features for selected categories - only must_have tier
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
          // Filter to selected categories and only must_have features
          const filteredCats = data.categories
            .filter((cat: Category) => selectedCategories.includes(cat.id))
            .map((cat: Category) => ({
              ...cat,
              // Only show must_have features (top essential ones)
              features: cat.features
                .filter((f: Feature) => f.tier_suggestion === 'must_have')
                .slice(0, 10) // Max 10 per category
            }))
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

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(featureId)) {
        newSet.delete(featureId)
      } else {
        newSet.add(featureId)
      }
      return newSet
    })
  }

  const selectAllInCategory = (categoryFeatures: Feature[]) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev)
      categoryFeatures.forEach(f => newSet.add(f.id))
      return newSet
    })
  }

  const handleContinue = () => {
    onComplete(Array.from(selectedFeatures))
  }

  // Calculate total features across all categories
  const totalFeatures = categories.reduce((sum, cat) => sum + cat.features.length, 0)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-100 dark:bg-[#171717] rounded w-1/2 mb-8 mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 dark:bg-[#171717] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white mb-4"
        >
          <Star className="w-5 h-5" />
          <span className="font-semibold">Must-Have Features</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          What Can&apos;t You Live Without?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-zinc-500"
        >
          Select the essential features that are absolute requirements for your smart home.
        </motion.p>
      </div>

      {/* Features by Category */}
      <div className="space-y-8 mb-8">
        {categories.map((category, catIndex) => {
          const IconComponent = ICON_MAP[category.icon] || Home
          const selectedInCategory = category.features.filter(f => selectedFeatures.has(f.id)).length
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + catIndex * 0.05 }}
              className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedInCategory} of {category.features.length} selected
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectAllInCategory(category.features)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Select All
                </Button>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-3">
                {category.features.map((feature) => {
                  const isSelected = selectedFeatures.has(feature.id)
                  
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:border-zinc-700 bg-white'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? 'bg-red-500 text-white' : 'bg-gray-100'
                      }`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{feature.name}</span>
                          {feature.popularity >= 90 && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{feature.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-zinc-800 p-4 -mx-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Categories
          </Button>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-red-600">{selectedFeatures.size}</span>
            <span className="text-gray-500 ml-2">must-have features selected</span>
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={selectedFeatures.size === 0}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 text-white"
          >
            Continue to Should-Have
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

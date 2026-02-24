/**
 * Category Selection Component
 * Step 1: User selects which categories they want to automate
 * This reduces 650+ features to a manageable subset
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
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
  Sparkles,
  ChevronRight,
  Check,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Icon mapping
const ICON_MAP: Record<string, LucideIcon> = {
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
  Sparkles,
  Blinds: Home,
  Refrigerator: Home
}

// Category descriptions for better UX
const CATEGORY_DETAILS: Record<string, { tagline: string; examples: string[] }> = {
  lighting: {
    tagline: 'Control every light in your home',
    examples: ['Scene programming', 'Dimming', 'Motion sensors']
  },
  climate: {
    tagline: 'Perfect temperature everywhere',
    examples: ['AC zones', 'Smart thermostats', 'Air quality']
  },
  security: {
    tagline: 'Protect what matters most',
    examples: ['Smart locks', 'CCTV', 'Alarms']
  },
  entertainment: {
    tagline: 'Immersive audio & video',
    examples: ['Multi-room audio', 'Home theater', 'Streaming']
  },
  shading: {
    tagline: 'Automated blinds & curtains',
    examples: ['Motorized blinds', 'Sun tracking', 'Privacy']
  },
  control: {
    tagline: 'How you interact with your home',
    examples: ['Voice control', 'Touch panels', 'App']
  },
  energy: {
    tagline: 'Smart power management',
    examples: ['Solar', 'EV charging', 'Monitoring']
  },
  outdoor: {
    tagline: 'Garden & exterior automation',
    examples: ['Irrigation', 'Pool control', 'Landscape']
  },
  wellness: {
    tagline: 'Health & comfort features',
    examples: ['Sleep automation', 'Spa control', 'Air quality']
  },
  appliances: {
    tagline: 'Connected kitchen & laundry',
    examples: ['Smart fridge', 'Coffee machine', 'Robot vacuum']
  },
  networking: {
    tagline: 'Infrastructure & connectivity',
    examples: ['WiFi', 'Network security', 'Cabling']
  },
  special: {
    tagline: 'Unique luxury features',
    examples: ['Home office', 'Wine cellar', 'Elevator']
  }
}

interface Category {
  id: string
  name: string
  icon: string
  featureCount: number
}

interface CategorySelectionProps {
  onComplete: (selectedCategories: string[]) => void
  initialSelection?: string[]
}

export default function CategorySelection({
  onComplete,
  initialSelection = []
}: CategorySelectionProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<string[]>(initialSelection)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
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
          const cats = data.categories.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            featureCount: cat.features.length
          }))
          setCategories(cats)
        } else {
          setError('Failed to load categories. Please refresh.')
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Network error. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setSelected(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const selectAll = () => {
    setSelected(categories.map(c => c.id))
  }

  const clearAll = () => {
    setSelected([])
  }

  const handleContinue = () => {
    onComplete(selected)
  }

  // Calculate total features in selected categories
  const totalFeatures = categories
    .filter(c => selected.includes(c.id))
    .reduce((sum, c) => sum + c.featureCount, 0)

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white mb-4"
        >
          <Home className="w-5 h-5" />
          <span className="font-semibold">Step 1: Choose Categories</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
        >
          What Do You Want to Automate?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Select the categories that matter to you. We&apos;ll then help you prioritize 
          features within each category.
        </motion.p>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center gap-4 mb-8">
        <Button variant="outline" size="sm" onClick={selectAll}>
          Select All
        </Button>
        <Button variant="outline" size="sm" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      {/* Category Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <Home className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Unable to Load Categories</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Home className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Categories Available</h3>
          <p className="text-gray-500 mb-4">Please refresh the page.</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category, index) => {
            const IconComponent = ICON_MAP[category.icon] || Home
            const isSelected = selected.includes(category.id)
            const details = CATEGORY_DETAILS[category.id] || { tagline: '', examples: [] }
            
            return (
              <motion.button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300 dark:border-gray-600 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                
                {/* Tagline */}
                <p className="text-xs text-gray-500 mb-2">{details.tagline}</p>
                
                {/* Feature Count */}
                <div className="text-xs font-medium text-gray-400">
                  {category.featureCount} features
                </div>

                {/* Examples (on hover/selected) */}
                {isSelected && details.examples.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-green-200"
                  >
                    <div className="flex flex-wrap gap-1">
                      {details.examples.map((ex, i) => (
                        <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-gray-700 p-4 -mx-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Selected:</span>
            <span className="ml-2 font-bold text-lg">{selected.length} categories</span>
            {selected.length > 0 && (
              <span className="ml-3 text-sm text-gray-400">
                ({totalFeatures} features to review)
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white px-8"
            size="lg"
          >
            Continue to Features
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Nice-to-Have Upgrades Component
 * Step 8: Upsell features AFTER package selection
 * Shows upgrade cards with +AED pricing (fetched from API)
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Plus,
  Gift,
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

// Default upgrade pricing (fallback if API fails)
const DEFAULT_UPGRADE_PRICING: Record<string, number> = {
  // Lighting upgrades
  'L007': 4000,   // Color Changing (RGB/RGBW)
  'L010': 7500,   // Facade Lighting
  'L011': 6000,   // Pool/Spa Lighting
  'L014': 3000,   // Art Lighting
  'L018': 2500,   // Cove Lighting
  // Climate upgrades
  'C008': 9000,   // Fresh Air Ventilation
  'C009': 12000,  // Underfloor Heating
  'C010': 7500,   // Pool/Spa Heating
  'C011': 4000,   // Fireplace Control
  // Entertainment upgrades
  'E006': 18000,  // Dedicated Home Cinema
  'E010': 10000,  // Outdoor Entertainment
  // Security upgrades
  'S011': 4000,   // Biometric Access
  'S015': 6000,   // Safe Room Integration
  // Other upgrades
  'default': 2500
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

interface UpgradeItem {
  feature: Feature
  category: string
  categoryIcon: string
  price: number
}

interface NiceToHaveUpgradesProps {
  selectedCategories: string[]
  mustHaveFeatures: string[]
  shouldHaveFeatures: string[]
  selectedPackage: string
  basePrice: string
  onComplete: (upgrades: string[], totalUpgradePrice: number) => void
  onBack: () => void
  initialSelection?: string[]
}

export default function NiceToHaveUpgrades({
  selectedCategories,
  mustHaveFeatures,
  shouldHaveFeatures,
  selectedPackage,
  basePrice,
  onComplete,
  onBack,
  initialSelection = []
}: NiceToHaveUpgradesProps) {
  const [upgrades, setUpgrades] = useState<UpgradeItem[]>([])
  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(new Set(initialSelection))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [upgradePricing, setUpgradePricing] = useState<Record<string, number>>(DEFAULT_UPGRADE_PRICING)

  // Fetch upgrade pricing from API
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/pricing/upgrade-features`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            const pricing: Record<string, number> = { default: 2500 }
            data.forEach((item: any) => {
              pricing[item.id] = item.price
            })
            setUpgradePricing(pricing)
          }
        }
      } catch (err) {
        console.error('Failed to load upgrade pricing:', err)
      }
    }
    loadPricing()
  }, [])

  // Use dynamic pricing
  const UPGRADE_PRICING = upgradePricing

  // Fetch nice-to-have features
  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true)
      setError(null)
      try {
        // Create set of already selected features inside the effect
        const alreadySelected = new Set([...mustHaveFeatures, ...shouldHaveFeatures])
        
        const response = await fetch(`${BACKEND_URL}/api/smart-home/features`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        if (response.ok) {
          const data = await response.json()
          
          // Get nice-to-have features from selected categories
          const upgradeItems: UpgradeItem[] = []
          
          data.categories
            .filter((cat: Category) => selectedCategories.includes(cat.id))
            .forEach((cat: Category) => {
              cat.features
                .filter((f: Feature) => 
                  (f.tier_suggestion === 'could_have' || f.tier_suggestion === 'want_to_have') &&
                  !alreadySelected.has(f.id)
                )
                .slice(0, 5) // Max 5 per category
                .forEach((f: Feature) => {
                  upgradeItems.push({
                    feature: f,
                    category: cat.name,
                    categoryIcon: cat.icon,
                    price: UPGRADE_PRICING[f.id] || UPGRADE_PRICING.default
                  })
                })
            })
          
          // Sort by popularity
          upgradeItems.sort((a, b) => b.feature.popularity - a.feature.popularity)
          setUpgrades(upgradeItems.slice(0, 15)) // Max 15 total upgrades
        } else {
          setError('Failed to load upgrades. Please refresh.')
        }
      } catch (err) {
        console.error('Error fetching features:', err)
        setError('Network error. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, mustHaveFeatures, shouldHaveFeatures])

  const toggleUpgrade = (featureId: string) => {
    setSelectedUpgrades(prev => {
      const newSet = new Set(prev)
      if (newSet.has(featureId)) {
        newSet.delete(featureId)
      } else {
        newSet.add(featureId)
      }
      return newSet
    })
  }

  // Calculate total upgrade price
  const totalUpgradePrice = upgrades
    .filter(u => selectedUpgrades.has(u.feature.id))
    .reduce((sum, u) => sum + u.price, 0)

  const handleContinue = () => {
    onComplete(Array.from(selectedUpgrades), totalUpgradePrice)
  }

  const handleSkip = () => {
    onComplete([], 0)
  }

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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white mb-4"
        >
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Enhance Your Package</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Nice-to-Have Upgrades
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-zinc-500"
        >
          Add these premium features to your {selectedPackage} package
        </motion.p>
        
        {/* Package Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 inline-flex items-center gap-3 px-5 py-3 bg-gray-100 dark:bg-[#171717] rounded-xl text-sm"
        >
          <div>
            <span className="text-gray-500">Your Package:</span>
            <span className="font-bold text-gray-900 dark:text-white ml-2">{selectedPackage}</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div>
            <span className="text-gray-500">Base Price:</span>
            <span className="font-bold text-gray-900 dark:text-white ml-2">{basePrice}</span>
          </div>
        </motion.div>
      </div>

      {/* Upgrades Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {upgrades.map((upgrade, index) => {
          const isSelected = selectedUpgrades.has(upgrade.feature.id)
          const IconComponent = ICON_MAP[upgrade.categoryIcon] || Home
          
          return (
            <motion.button
              key={upgrade.feature.id}
              onClick={() => toggleUpgrade(upgrade.feature.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-[#C9A962] bg-[#C9A962]/5 shadow-lg'
                  : 'border-gray-200 dark:border-zinc-800 bg-white hover:border-gray-300 dark:border-zinc-700 hover:shadow-md'
              }`}
            >
              {/* Price Badge */}
              <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-sm font-bold ${
                isSelected
                  ? 'bg-[#C9A962]/50 text-white'
                  : 'bg-green-100 text-green-700'
              }`}>
                +AED {upgrade.price.toLocaleString()}
              </div>

              {/* Selection Indicator */}
              <div className={`absolute top-4 left-4 w-6 h-6 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-[#C9A962]/50 text-white' : 'bg-gray-100'
              }`}>
                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 text-gray-400" />}
              </div>

              {/* Content */}
              <div className="ml-8">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{upgrade.category}</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{upgrade.feature.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{upgrade.feature.description}</p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Empty State */}
      {upgrades.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">You&apos;ve already selected all available features!</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-zinc-800 p-4 -mx-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Package
          </Button>
          
          <div className="text-center">
            {selectedUpgrades.size > 0 ? (
              <div>
                <span className="text-sm text-gray-500">Total Upgrades:</span>
                <span className="text-xl font-bold text-[#C9A962] ml-2">
                  +AED {totalUpgradePrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-gray-500">No upgrades selected</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {selectedUpgrades.size === 0 && (
              <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
                Skip upgrades
              </Button>
            )}
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-[#C9A962] to-[#A68B4B] hover:opacity-90 text-white"
            >
              {selectedUpgrades.size > 0 ? 'Finalize Package' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

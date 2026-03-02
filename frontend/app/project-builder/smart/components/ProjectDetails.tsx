/**
 * Project Details Component
 * Step 1: Capture essential project information for AI recommendations
 * - Project Type (New Build / Retrofit / Renovation)
 * - Property Type (Villa / Apartment / Penthouse / Commercial)
 * - Property Size
 * - Budget Range (fetched from API)
 * - Timeline
 * - Location
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Home,
  Building,
  Hotel,
  Store,
  Hammer,
  RefreshCw,
  Sparkles,
  ChevronRight,
  MapPin,
  Calendar,
  Wallet,
  Ruler,
  Users,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Project Types
const PROJECT_TYPES = [
  {
    id: 'new_build',
    name: 'New Build',
    description: 'Building from scratch - maximum flexibility',
    icon: Building2,
    recommendation: 'Wired infrastructure recommended',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'retrofit',
    name: 'Retrofit',
    description: 'Adding smart features to existing property',
    icon: RefreshCw,
    recommendation: 'Wireless/Hybrid recommended',
    color: 'from-[#C9A962] to-cyan-600'
  },
  {
    id: 'renovation',
    name: 'Renovation',
    description: 'Major renovation with some rewiring possible',
    icon: Hammer,
    recommendation: 'Hybrid approach recommended',
    color: 'from-orange-500 to-amber-600'
  }
]

// Property Types
const PROPERTY_TYPES = [
  { id: 'villa', name: 'Villa', icon: Home, sizes: ['Under 500 sqm', '500-1000 sqm', '1000-2000 sqm', '2000+ sqm'] },
  { id: 'apartment', name: 'Apartment', icon: Building, sizes: ['Under 100 sqm', '100-200 sqm', '200-400 sqm', '400+ sqm'] },
  { id: 'penthouse', name: 'Penthouse', icon: Hotel, sizes: ['Under 300 sqm', '300-500 sqm', '500-800 sqm', '800+ sqm'] },
  { id: 'townhouse', name: 'Townhouse', icon: Building2, sizes: ['Under 300 sqm', '300-500 sqm', '500-800 sqm', '800+ sqm'] },
  { id: 'commercial', name: 'Commercial', icon: Store, sizes: ['Under 500 sqm', '500-1000 sqm', '1000-5000 sqm', '5000+ sqm'] }
]

// Default Budget Ranges (fallback if API fails)
const DEFAULT_BUDGET_RANGES = [
  { id: 'starter', label: 'AED 8K - 25K', description: 'Essential automation', tier: 'budget' },
  { id: 'standard', label: 'AED 25K - 70K', description: 'Good coverage', tier: 'standard' },
  { id: 'premium', label: 'AED 70K - 150K', description: 'Premium experience', tier: 'premium' },
  { id: 'luxury', label: 'AED 150K - 280K', description: 'Luxury automation', tier: 'luxury' },
  { id: 'ultra', label: 'AED 280K+', description: 'Ultra luxury / No limit', tier: 'ultra' }
]

// Timeline Options
const TIMELINE_OPTIONS = [
  { id: 'urgent', label: 'ASAP (1-2 months)', description: 'Rush project' },
  { id: 'normal', label: '3-6 months', description: 'Standard timeline' },
  { id: 'relaxed', label: '6-12 months', description: 'Planned ahead' },
  { id: 'future', label: '12+ months', description: 'Future planning' }
]

// UAE Locations
const LOCATIONS = [
  'Dubai - Palm Jumeirah',
  'Dubai - Emirates Hills',
  'Dubai - Downtown',
  'Dubai - JBR/Marina',
  'Dubai - Arabian Ranches',
  'Dubai - Other',
  'Abu Dhabi - Saadiyat Island',
  'Abu Dhabi - Yas Island',
  'Abu Dhabi - Other',
  'Sharjah',
  'Other UAE',
  'International'
]

export interface ProjectDetails {
  projectType: string
  propertyType: string
  propertySize: string
  customSize?: number
  bedrooms: number
  floors: number
  budget: string
  timeline: string
  location: string
  specialRequirements: string
}

interface ProjectDetailsProps {
  onComplete: (details: ProjectDetails) => void
  initialDetails?: Partial<ProjectDetails>
}

export default function ProjectDetailsForm({
  onComplete,
  initialDetails = {}
}: ProjectDetailsProps) {
  const [projectType, setProjectType] = useState(initialDetails.projectType || '')
  const [propertyType, setPropertyType] = useState(initialDetails.propertyType || '')
  const [propertySize, setPropertySize] = useState(initialDetails.propertySize || '')
  const [customSize, setCustomSize] = useState<number | undefined>(initialDetails.customSize)
  const [bedrooms, setBedrooms] = useState(initialDetails.bedrooms || 4)
  const [floors, setFloors] = useState(initialDetails.floors || 2)
  const [budget, setBudget] = useState(initialDetails.budget || '')
  const [timeline, setTimeline] = useState(initialDetails.timeline || '')
  const [location, setLocation] = useState(initialDetails.location || '')
  const [specialRequirements, setSpecialRequirements] = useState(initialDetails.specialRequirements || '')

  // Dynamic budget ranges from API
  const [budgetRanges, setBudgetRanges] = useState(DEFAULT_BUDGET_RANGES)

  // Fetch budget ranges from API
  useEffect(() => {
    const loadBudgetRanges = async () => {
      try {
        const response = await fetch(`${API_URL}/api/pricing/budget-ranges`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            // Transform API format to component format
            setBudgetRanges(data.map((r: any) => ({
              id: r.id,
              label: r.label,
              description: r.description,
              tier: r.id // Use id as tier
            })))
          }
        }
      } catch (error) {
        console.error('Failed to load budget ranges:', error)
      }
    }
    loadBudgetRanges()
  }, [])

  const selectedPropertyType = PROPERTY_TYPES.find(p => p.id === propertyType)

  const canContinue = projectType && propertyType && propertySize && budget && timeline && location

  // Use budgetRanges instead of BUDGET_RANGES
  const BUDGET_RANGES = budgetRanges

  const handleContinue = () => {
    onComplete({
      projectType,
      propertyType,
      propertySize,
      customSize,
      bedrooms,
      floors,
      budget,
      timeline,
      location,
      specialRequirements
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white mb-4"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Step 1: Tell Us About Your Project</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
        >
          Let&apos;s Understand Your Project
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          This helps our AI recommend the perfect smart home solution tailored to your needs.
        </motion.p>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Project Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-gray-500" />
            Project Type
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {PROJECT_TYPES.map((type) => {
              const Icon = type.icon
              const isSelected = projectType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{type.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  <p className="text-xs text-indigo-600 mt-2 font-medium">{type.recommendation}</p>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 absolute top-3 right-3" />
                  )}
                </button>
              )
            })}
          </div>
        </motion.section>

        {/* Property Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-gray-500" />
            Property Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PROPERTY_TYPES.map((type) => {
              const Icon = type.icon
              const isSelected = propertyType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setPropertyType(type.id)
                    setPropertySize('')
                  }}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-indigo-600' : 'text-gray-700'}`}>
                    {type.name}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.section>

        {/* Property Size */}
        {selectedPropertyType && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-gray-500" />
              Property Size
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedPropertyType.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setPropertySize(size)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    propertySize === size
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className={`text-sm font-medium ${propertySize === size ? 'text-indigo-600' : 'text-gray-700'}`}>
                    {size}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <label className="text-sm text-gray-500">Or enter exact size:</label>
              <Input
                type="number"
                placeholder="e.g., 850"
                value={customSize || ''}
                onChange={(e) => setCustomSize(parseInt(e.target.value) || undefined)}
                className="w-32"
              />
              <span className="text-sm text-gray-500">sqm</span>
            </div>
          </motion.section>
        )}

        {/* Bedrooms & Floors */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              Bedrooms
            </h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setBedrooms(typeof num === 'number' ? num : 7)}
                  className={`w-12 h-12 rounded-lg border-2 font-bold transition-all ${
                    bedrooms === (typeof num === 'number' ? num : 7)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 dark:border-gray-700 bg-white text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-500" />
              Floors
            </h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, '5+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setFloors(typeof num === 'number' ? num : 5)}
                  className={`w-12 h-12 rounded-lg border-2 font-bold transition-all ${
                    floors === (typeof num === 'number' ? num : 5)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 dark:border-gray-700 bg-white text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Budget */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-gray-500" />
            Budget Range
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {BUDGET_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => setBudget(range.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  budget === range.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`font-bold ${budget === range.id ? 'text-green-600' : 'text-gray-900'}`}>
                  {range.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">{range.description}</div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Project Timeline
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIMELINE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setTimeline(option.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  timeline === option.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`font-bold text-sm ${timeline === option.id ? 'text-amber-600' : 'text-gray-900'}`}>
                  {option.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Location */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            Location
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  location === loc
                    ? 'border-[#C9A962] bg-[#C9A962]/5 text-[#C9A962]'
                    : 'border-gray-200 dark:border-gray-700 bg-white text-gray-700 dark:text-gray-300 hover:border-gray-300'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Special Requirements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Special Requirements (Optional)</h3>
          <textarea
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="E.g., Home theater room, wine cellar automation, yacht dock integration, specific brand preferences..."
            className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            rows={3}
          />
        </motion.section>
      </div>

      {/* Link to Calculator */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-50 to-[#C9A962]/5 border border-[#C9A962]/20 rounded-xl p-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#8A7035] mb-1">Need a Quick Estimate?</h3>
              <p className="text-sm text-[#C9A962]">
                Our Industry Calculator provides instant quotes by project type with fewer steps
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/calculator'}
              variant="outline"
              className="border-[#C9A962]/30 text-[#C9A962] hover:bg-[#C9A962]/10 px-6 py-2 whitespace-nowrap"
            >
              Try Quick Calculator →
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-gray-700 p-4 -mx-4 mt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {!canContinue && (
              <span className="text-amber-600">Please complete all required fields</span>
            )}
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={!canContinue}
            className="bg-gradient-to-r from-[#C9A962] to-[#A68B4B] hover:opacity-90 text-white px-8"
            size="lg"
          >
            Continue to Categories
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

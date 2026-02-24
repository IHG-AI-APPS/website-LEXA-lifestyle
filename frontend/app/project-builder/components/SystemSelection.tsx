/**
 * System Selection Component
 * Recommends control systems based on selected features and protocols
 * Shows compatibility scores and helps users choose the right system
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Star,
  Award,
  Zap,
  Crown,
  Sparkles,
  ThumbsUp,
  DollarSign,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Tier icons and colors
const TIER_CONFIG: Record<string, { icon: typeof Crown; color: string; label: string }> = {
  ultra_luxury: { icon: Crown, color: 'from-yellow-500 to-amber-600', label: 'Ultra Luxury' },
  luxury: { icon: Award, color: 'from-purple-500 to-purple-600', label: 'Luxury' },
  enterprise: { icon: Zap, color: 'from-blue-600 to-blue-700', label: 'Enterprise' },
  premium: { icon: Star, color: 'from-emerald-500 to-emerald-600', label: 'Premium' },
  commercial: { icon: Zap, color: 'from-gray-600 to-gray-700', label: 'Commercial' },
  value: { icon: ThumbsUp, color: 'from-green-500 to-green-600', label: 'Value' },
  smart_value: { icon: Sparkles, color: 'from-teal-500 to-teal-600', label: 'Smart Value' },
  custom: { icon: Sparkles, color: 'from-indigo-500 to-indigo-600', label: 'Custom' },
  modern: { icon: Zap, color: 'from-cyan-500 to-cyan-600', label: 'Modern' },
  budget: { icon: DollarSign, color: 'from-lime-500 to-lime-600', label: 'Budget' },
  diy: { icon: Sparkles, color: 'from-orange-500 to-orange-600', label: 'DIY' }
}

interface System {
  id: string
  name: string
  tier: string
  price_range: string
  description: string
  compatible_protocols: string[]
  strengths: string[]
  best_for: string[]
  compatibility_score?: number
  matching_protocols?: string[]
}

interface SystemSelectionProps {
  sessionId: string
  protocolType: string
  selectedProtocols: string[]
  selectedFeatures: Record<string, string[]>
  onComplete: (selectedSystems: string[]) => void
  onBack: () => void
  initialSystems?: string[]
}

export default function SystemSelection({
  sessionId,
  protocolType,
  selectedProtocols,
  selectedFeatures,
  onComplete,
  onBack,
  initialSystems = []
}: SystemSelectionProps) {
  const [systems, setSystems] = useState<System[]>([])
  const [selectedSystems, setSelectedSystems] = useState<string[]>(initialSystems)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<System[]>([])

  // Fetch and rank systems
  useEffect(() => {
    const fetchSystems = async () => {
      setLoading(true)
      setError(null)
      try {
        // Get all systems first (most important)
        const allResponse = await fetch(`${BACKEND_URL}/api/smart-home/systems`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
          }
        })
        if (allResponse.ok) {
          const allData = await allResponse.json()
          setSystems(allData.systems || [])
        } else {
          console.error('Failed to fetch systems:', allResponse.status)
          setError('Failed to load control systems')
        }

        // Get recommendations based on protocols (optional enhancement)
        if (selectedProtocols.length > 0) {
          const recResponse = await fetch(
            `${BACKEND_URL}/api/smart-home/systems/recommend?protocol_type=${protocolType}&selected_protocols=${selectedProtocols.join(',')}`,
            {
              cache: 'no-store',
              headers: {
                'Accept': 'application/json',
              }
            }
          )
          if (recResponse.ok) {
            const recData = await recResponse.json()
            setRecommendations(recData.recommendations || [])
          }
        }
      } catch (err) {
        console.error('Error fetching systems:', err)
        setError('Network error. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchSystems()
  }, [protocolType, selectedProtocols])

  const toggleSystem = (systemId: string) => {
    setSelectedSystems(prev => 
      prev.includes(systemId)
        ? prev.filter(id => id !== systemId)
        : [...prev, systemId]
    )
  }

  const handleContinue = () => {
    onComplete(selectedSystems)
  }

  // Get total feature count
  const totalFeatures = Object.values(selectedFeatures).reduce((sum, arr) => sum + arr.length, 0)

  // Determine budget tier from features
  const getBudgetTier = () => {
    if (totalFeatures > 40) return 'enterprise'
    if (totalFeatures > 25) return 'luxury'
    if (totalFeatures > 15) return 'premium'
    return 'value'
  }

  const budgetTier = getBudgetTier()

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-4">
          <Award className="w-5 h-5" />
          <span className="font-semibold">System Selection</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Choose Your Control System
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Based on your {totalFeatures} selected features and {selectedProtocols.length} protocols, 
          we&apos;ve ranked the best systems for your project.
        </p>
      </div>

      {/* Selection Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{totalFeatures}</div>
            <div className="text-sm text-gray-500">Features Selected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{selectedProtocols.length}</div>
            <div className="text-sm text-gray-500">Protocols Chosen</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{protocolType}</div>
            <div className="text-sm text-gray-500">Infrastructure Type</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <Settings className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Unable to Load Systems</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mx-auto"
          >
            Refresh Page
          </Button>
        </div>
      ) : systems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Settings className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Systems Available</h3>
          <p className="text-gray-500 mb-4">Please try refreshing the page.</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mx-auto"
          >
            Refresh Page
          </Button>
        </div>
      ) : (
        <>
          {/* Top Recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                Recommended for You
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.slice(0, 3).map((system, index) => {
                  const isSelected = selectedSystems.includes(system.id)
                  const tierConfig = TIER_CONFIG[system.tier] || TIER_CONFIG.premium
                  const TierIcon = tierConfig.icon

                  return (
                    <motion.button
                      key={system.id}
                      onClick={() => toggleSystem(system.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-500/20'
                          : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-400 hover:shadow-md'
                      }`}
                    >
                      {/* Recommended Badge */}
                      {index === 0 && (
                        <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                          BEST MATCH
                        </div>
                      )}

                      {/* Selection Indicator */}
                      <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-green-500 text-white' : 'bg-gray-100'
                      }`}>
                        {isSelected && <Check className="w-5 h-5" />}
                      </div>

                      {/* Tier Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${tierConfig.color} text-white text-xs font-semibold mb-3`}>
                        <TierIcon className="w-3.5 h-3.5" />
                        {tierConfig.label}
                      </div>

                      {/* System Name */}
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{system.name}</h4>
                      
                      {/* Price Range */}
                      <div className="text-sm text-gray-500 mb-3">{system.price_range}</div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{system.description}</p>

                      {/* Compatibility Score */}
                      {system.compatibility_score && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                              style={{ width: `${Math.min(system.compatibility_score, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            {system.compatibility_score}%
                          </span>
                        </div>
                      )}

                      {/* Strengths */}
                      <div className="space-y-1.5">
                        {system.strengths.slice(0, 3).map((strength, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* All Systems */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">All Systems</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems
                .filter(s => !recommendations.slice(0, 3).find(r => r.id === s.id))
                .map((system) => {
                  const isSelected = selectedSystems.includes(system.id)
                  const tierConfig = TIER_CONFIG[system.tier] || TIER_CONFIG.premium
                  const TierIcon = tierConfig.icon

                  return (
                    <motion.button
                      key={system.id}
                      onClick={() => toggleSystem(system.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-400 hover:shadow-md'
                      }`}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-green-500 text-white' : 'bg-gray-100'
                      }`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>

                      {/* Tier Badge */}
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${tierConfig.color} text-white text-xs font-semibold mb-3`}>
                        <TierIcon className="w-3 h-3" />
                        {tierConfig.label}
                      </div>

                      {/* System Name */}
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{system.name}</h4>
                      
                      {/* Price Range */}
                      <div className="text-sm text-gray-500 mb-2">{system.price_range}</div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{system.description}</p>

                      {/* Best For */}
                      <div className="text-xs text-gray-400">
                        Best for: {system.best_for.slice(0, 2).join(', ')}
                      </div>
                    </motion.button>
                  )
                })}
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 dark:border-gray-700 p-4 -mx-4 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Selected systems:</span>
            <span className="ml-2 font-bold text-lg">{selectedSystems.length}</span>
            {selectedSystems.length > 0 && (
              <span className="ml-2 text-sm text-gray-400">
                ({systems.filter(s => selectedSystems.includes(s.id)).map(s => s.name).join(', ')})
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Protocols
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={selectedSystems.length === 0}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white"
            >
              Generate AI Recommendation
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

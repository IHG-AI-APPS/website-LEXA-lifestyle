'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, TrendingUp, Star, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

interface ProposalComparisonProps {
  sessionId: string
  resolutionData: any
  onSelect: (data: any) => void
}

const TIER_ICONS = {
  value: TrendingUp,
  balanced: Star,
  flagship: Crown
}

export default function ProposalComparison({ sessionId, resolutionData, onSelect }: ProposalComparisonProps) {
  const [selectedProposal, setSelectedProposal] = useState<string>('balanced')
  const [hoveredProposal, setHoveredProposal] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const proposals = resolutionData?.proposals

  const handleSelect = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/project-builder/select-proposal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          proposal_type: selectedProposal
        })
      })

      const data = await response.json()
      onSelect({
        type: selectedProposal,
        proposal: proposals[selectedProposal]
      })
    } catch (error) {
      console.error('Proposal selection error:', error)
      alert('Failed to select proposal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!proposals) return null

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Proposals</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            Three Options • Compare • Select
          </p>
          <p className="text-gray-600 text-sm">
            Each proposal is tailored to your project requirements
          </p>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {['value', 'balanced', 'flagship'].map((type) => {
            const proposal = proposals[type]
            const isSelected = selectedProposal === type
            const isHovered = hoveredProposal === type
            const isRecommended = type === 'balanced'
            const TierIcon = TIER_ICONS[type as keyof typeof TIER_ICONS]

            return (
              <motion.button
                key={type}
                onClick={() => setSelectedProposal(type)}
                onMouseEnter={() => setHoveredProposal(type)}
                onMouseLeave={() => setHoveredProposal(null)}
                className={`relative p-8 text-left transition-all duration-500 bg-white dark:bg-gray-800 border ${
                  isSelected
                    ? 'border-blue-600 shadow-xl scale-105 z-10'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                whileHover={{ y: -4 }}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs uppercase tracking-widest font-medium rounded-full">
                      Recommended
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </motion.div>
                )}

                {/* Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <TierIcon className={`w-8 h-8 ${
                    isSelected ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>

                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {proposal.name}
                  </h3>
                  <p className="text-xs text-blue-600 uppercase tracking-widest mb-3 font-medium">
                    {proposal.tier_mix}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {proposal.tagline}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Systems</span>
                    <span className="text-gray-900 dark:text-white font-mono font-medium">{proposal.system_count}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Features</span>
                    <span className="text-gray-900 dark:text-white font-mono font-medium">{proposal.feature_count}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Complexity</span>
                    <span className="text-gray-900 dark:text-white font-mono font-medium">{proposal.complexity_score}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Timeline</span>
                    <span className="text-gray-900 dark:text-white font-mono font-medium">{proposal.estimated_timeline}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {proposal.highlights?.slice(0, 3).map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Interactive Comparison Matrix */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 p-8 mb-12">
          <h3 className="text-sm font-medium mb-6 uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-gray-600 uppercase tracking-widest font-medium">Feature</th>
                  <th className="text-center py-3 text-gray-600 uppercase tracking-widest font-medium">Value</th>
                  <th className="text-center py-3 text-blue-600 uppercase tracking-widest font-medium">Balanced</th>
                  <th className="text-center py-3 text-gray-600 uppercase tracking-widest font-medium">Flagship</th>
                </tr>
              </thead>
              <tbody>
                {proposals.comparison_matrix?.rows?.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-3 text-center text-gray-900 dark:text-white font-mono">{row.value}</td>
                    <td className="py-3 text-center text-blue-600 font-mono font-medium">{row.balanced}</td>
                    <td className="py-3 text-center text-gray-900 dark:text-white font-mono">{row.flagship}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Continue */}
        <div className="text-center">
          <Button
            onClick={handleSelect}
            disabled={loading}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
          >
            {loading ? 'Processing...' : `Select ${selectedProposal.charAt(0).toUpperCase() + selectedProposal.slice(1)} Architecture`}
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-gray-600 mt-4">
            You&apos;ve selected the <span className="font-medium text-gray-900 dark:text-white dark:text-white">{selectedProposal}</span> option
          </p>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Shield, Tv, Heart, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

interface ObjectiveSelectorProps {
  sessionId: string
  onComplete: (data: any) => void
}

const OBJECTIVE_ICONS: Record<string, any> = {
  comfort: Home,
  luxury: Sparkles,
  entertainment: Tv,
  security: Shield,
  energy: Zap,
  wellness: Heart
}

export default function ObjectiveSelector({ sessionId, onComplete }: ObjectiveSelectorProps) {
  const [objectives, setObjectives] = useState<any[]>([])
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setObjectives([
      { id: 'comfort', name: 'Comfort & Convenience', icon: 'Home' },
      { id: 'luxury', name: 'Luxury Ambience', icon: 'Sparkles' },
      { id: 'entertainment', name: 'Entertainment & Media', icon: 'Tv' },
      { id: 'security', name: 'Security & Safety', icon: 'Shield' },
      { id: 'energy', name: 'Energy Efficiency', icon: 'Zap' },
      { id: 'wellness', name: 'Wellness & Lifestyle', icon: 'Heart' }
    ])
  }, [])

  const toggleObjective = (objectiveId: string) => {
    if (selectedObjectives.includes(objectiveId)) {
      setSelectedObjectives(selectedObjectives.filter(id => id !== objectiveId))
    } else {
      setSelectedObjectives([...selectedObjectives, objectiveId])
    }
  }

  const handleContinue = async () => {
    if (selectedObjectives.length === 0) {
      alert('Please select at least one objective')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/project-builder/objectives`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          selected_objectives: selectedObjectives
        })
      })

      const data = await response.json()
      onComplete(selectedObjectives)
    } catch (error) {
      console.error('Objectives submission error:', error)
      alert('Failed to submit objectives. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Priorities</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            What matters most to you?
          </p>
          <p className="text-gray-600 text-sm">
            Select 2-4 objectives. The intelligence engine will prioritize accordingly.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {objectives.map((objective, index) => {
            const Icon = OBJECTIVE_ICONS[objective.id] || Home
            const isSelected = selectedObjectives.includes(objective.id)

            return (
              <motion.button
                key={objective.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onClick={() => toggleObjective(objective.id)}
                className={`relative p-8 text-left transition-all duration-300 group bg-white dark:bg-gray-800 border ${
                  isSelected
                    ? 'border-blue-600 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
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
                <div className={`mb-6 transition-colors duration-300 ${
                  isSelected ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  <Icon className="w-10 h-10" />
                </div>

                {/* Label */}
                <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                  isSelected ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {objective.name}
                </h3>

                {/* Selection Badge */}
                {isSelected && (
                  <div className="text-xs text-blue-600 uppercase tracking-widest mt-4 font-medium">
                    Selected
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Counter & Continue */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-6">
            {selectedObjectives.length > 0 ? (
              <span>
                <span className="text-blue-600 font-semibold font-mono">{selectedObjectives.length}</span> objective{selectedObjectives.length > 1 ? 's' : ''} selected
              </span>
            ) : (
              <span className="text-gray-500">Select at least one objective to continue</span>
            )}
          </div>

          {selectedObjectives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={handleContinue}
                disabled={loading}
                className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
              >
                {loading ? 'Processing...' : 'Analyze Requirements'}
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

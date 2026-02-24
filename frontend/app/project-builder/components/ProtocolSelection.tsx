/**
 * Protocol Selection Component
 * Step after feature selection - choose Wired, Wireless, or Hybrid
 * Then select specific protocols within that category
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cable,
  Wifi,
  Shuffle,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
  XCircle,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Protocol type configuration
const PROTOCOL_TYPES = [
  {
    id: 'wired',
    name: 'Wired',
    icon: Cable,
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-600',
    description: 'Most reliable, best for new construction',
    pros: ['Maximum reliability', 'No interference', 'Fastest response', 'Future-proof'],
    cons: ['Requires cabling', 'Higher installation cost', 'Less flexible for changes'],
    best_for: 'New builds, renovations, maximum reliability needs'
  },
  {
    id: 'wireless',
    name: 'Wireless',
    icon: Wifi,
    color: 'from-green-600 to-green-700',
    bgColor: 'bg-green-600',
    description: 'Flexible installation, great for retrofits',
    pros: ['Easy installation', 'No wiring needed', 'Easy to expand', 'Lower upfront cost'],
    cons: ['Potential interference', 'Battery replacement', 'Range limitations'],
    best_for: 'Retrofits, rentals, quick installations'
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    icon: Shuffle,
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-600',
    description: 'Best of both worlds - wired backbone with wireless flexibility',
    pros: ['Balanced approach', 'Flexible deployment', 'Reliable core systems', 'Easy expansion'],
    cons: ['More complex planning', 'Multiple technologies to manage'],
    best_for: 'Most luxury projects, mixed new/existing spaces'
  }
]

interface Protocol {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  best_for: string[]
}

interface ProtocolSelectionProps {
  sessionId: string
  onComplete: (protocolType: string, selectedProtocols: string[]) => void
  onBack: () => void
  initialType?: string
  initialProtocols?: string[]
}

export default function ProtocolSelection({
  sessionId,
  onComplete,
  onBack,
  initialType = '',
  initialProtocols = []
}: ProtocolSelectionProps) {
  const [step, setStep] = useState<'type' | 'protocols'>(initialType ? 'protocols' : 'type')
  const [selectedType, setSelectedType] = useState(initialType)
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(initialProtocols)
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch protocols when type is selected
  useEffect(() => {
    if (selectedType && step === 'protocols') {
      fetchProtocols()
    }
  }, [selectedType, step])

  const fetchProtocols = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BACKEND_URL}/api/smart-home/protocols/${selectedType}`, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProtocols(data.protocols || [])
      } else {
        setError('Failed to load protocols. Please refresh.')
      }
    } catch (err) {
      console.error('Error fetching protocols:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setSelectedProtocols([])
    setStep('protocols')
  }

  const toggleProtocol = (protocolId: string) => {
    setSelectedProtocols(prev => 
      prev.includes(protocolId)
        ? prev.filter(id => id !== protocolId)
        : [...prev, protocolId]
    )
  }

  const handleContinue = () => {
    onComplete(selectedType, selectedProtocols)
  }

  const selectedTypeConfig = PROTOCOL_TYPES.find(t => t.id === selectedType)

  return (
    <div className="max-w-5xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {/* Step 1: Choose Protocol Type */}
        {step === 'type' && (
          <motion.div
            key="type-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white mb-4">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Protocol Selection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Choose Your Infrastructure Type
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This determines how your smart home devices will communicate. Choose based on your property type and installation preferences.
              </p>
            </div>

            {/* Protocol Type Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {PROTOCOL_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-400 bg-white text-left transition-all hover:shadow-xl group"
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{type.description}</p>

                    {/* Pros */}
                    <div className="space-y-2 mb-4">
                      {type.pros.slice(0, 3).map((pro, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                        </div>
                      ))}
                    </div>

                    {/* Best For */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Best for:</span>
                      <p className="text-sm text-gray-700 mt-1">{type.best_for}</p>
                    </div>

                    {/* Selection Arrow */}
                    <div className="absolute top-6 right-6">
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Back Button */}
            <div className="flex justify-start">
              <Button variant="outline" onClick={onBack}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Features
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Specific Protocols */}
        {step === 'protocols' && selectedTypeConfig && (
          <motion.div
            key="protocol-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedTypeConfig.color} text-white mb-4`}>
                <selectedTypeConfig.icon className="w-5 h-5" />
                <span className="font-semibold">{selectedTypeConfig.name} Protocols</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Select Your Preferred Protocols
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose one or more protocols. We recommend selecting protocols that best match your needs - we&apos;ll recommend compatible systems next.
              </p>
            </div>

            {/* Protocols Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {protocols.map((protocol) => {
                  const isSelected = selectedProtocols.includes(protocol.id)
                  
                  return (
                    <motion.button
                      key={protocol.id}
                      onClick={() => toggleProtocol(protocol.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? `border-transparent bg-gradient-to-br ${selectedTypeConfig.color} text-white shadow-lg`
                          : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-md'
                      }`}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>

                      {/* Protocol Name */}
                      <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {protocol.name}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-sm mb-4 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                        {protocol.description}
                      </p>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                            Pros
                          </span>
                          <ul className="mt-1 space-y-1">
                            {protocol.pros.slice(0, 2).map((pro, i) => (
                              <li key={i} className={`text-xs flex items-start gap-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                                <CheckCircle2 className={`w-3 h-3 mt-0.5 flex-shrink-0 ${isSelected ? 'text-white/60' : 'text-green-500'}`} />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                            Cons
                          </span>
                          <ul className="mt-1 space-y-1">
                            {protocol.cons.slice(0, 2).map((con, i) => (
                              <li key={i} className={`text-xs flex items-start gap-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                                <XCircle className={`w-3 h-3 mt-0.5 flex-shrink-0 ${isSelected ? 'text-white/60' : 'text-red-400'}`} />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Best For */}
                      <div className={`mt-4 pt-3 border-t ${isSelected ? 'border-white/20' : 'border-gray-100'}`}>
                        <span className={`text-xs ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>Best for: </span>
                        <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                          {protocol.best_for.join(', ')}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Selected protocols:</span>
                  <span className="ml-2 font-bold">{selectedProtocols.length}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => setStep('type')}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Change Type
                  </Button>
                  <Button 
                    onClick={handleContinue}
                    disabled={selectedProtocols.length === 0}
                    className={`bg-gradient-to-r ${selectedTypeConfig.color} hover:opacity-90 text-white`}
                  >
                    Continue to Systems
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

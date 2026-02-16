'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calculator, CheckCircle2, Clock, TrendingUp } from 'lucide-react'
import { calculateCost, type CostCalculatorInput, type CostCalculatorResult } from '@/lib/api'

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'commercial', label: 'Commercial', icon: '🏢' },
]

const SYSTEMS = [
  { value: 'home_theater', label: 'Home Theater', description: 'Dolby Atmos cinema experience' },
  { value: 'lighting', label: 'Lighting Automation', description: 'Lutron intelligent control' },
  { value: 'security', label: 'Security Systems', description: 'Biometric access control' },
  { value: 'climate', label: 'Climate Control', description: 'Smart HVAC integration' },
  { value: 'audio', label: 'Whole-Home Audio', description: 'Multi-room Sonos audio' },
  { value: 'networking', label: 'Network Infrastructure', description: 'WiFi 6E mesh network' },
]

export default function CostCalculatorPage() {
  const searchParams = useSearchParams()
  const [propertyType, setPropertyType] = useState<string>('')
  const [squareFootage, setSquareFootage] = useState<string>('')
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const [result, setResult] = useState<CostCalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string>('')

  // Pre-fill from URL params
  useEffect(() => {
    const propertyTypeParam = searchParams.get('propertyType')
    const areaParam = searchParams.get('area')
    const systemParam = searchParams.get('system')

    if (propertyTypeParam) {
      // Map homepage values to calculator values
      let mappedType = 'villa'
      if (propertyTypeParam.includes('apartment') || propertyTypeParam.includes('bed')) {
        mappedType = 'apartment'
      } else if (propertyTypeParam === 'commercial') {
        mappedType = 'commercial'
      }
      setPropertyType(mappedType)
    }

    if (areaParam) {
      setSquareFootage(areaParam)
    }

    if (systemParam) {
      // Map homepage system values to calculator system values
      const systemMap: Record<string, string> = {
        'home-theater': 'home_theater',
        'lighting': 'lighting',
        'security': 'security',
        'climate': 'climate',
        'audio': 'audio',
        'networking': 'networking',
        'all': 'home_theater', // Default to home theater
      }
      const mappedSystem = systemMap[systemParam] || 'home_theater'
      setSelectedSystems([mappedSystem])
    }
  }, [searchParams])

  const toggleSystem = (system: string) => {
    setSelectedSystems(prev =>
      prev.includes(system)
        ? prev.filter(s => s !== system)
        : [...prev, system]
    )
  }

  const handleCalculate = async () => {
    // Validation
    if (!propertyType) {
      setError('Please select a property type')
      return
    }
    if (!squareFootage || parseInt(squareFootage) <= 0) {
      setError('Please enter a valid square footage')
      return
    }
    if (selectedSystems.length === 0) {
      setError('Please select at least one system')
      return
    }

    setError('')
    setIsCalculating(true)

    try {
      const input: CostCalculatorInput = {
        property_type: propertyType,
        square_footage: parseInt(squareFootage),
        systems: selectedSystems,
      }

      const calculationResult = await calculateCost(input)
      setResult(calculationResult)
    } catch (err) {
      setError('Failed to calculate estimate. Please try again.')
      console.error('Calculation error:', err)
    } finally {
      setIsCalculating(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-charcoal text-white rounded-full">
                <Calculator size={32} strokeWidth={2} />
              </div>
              
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                Project Estimator
              </span>
              
              <h1 className="text-7xl sm:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                COST
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">CALCULATOR</span>
              </h1>
              
              <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mx-auto mb-8" />
              
              <p className="text-xl text-gray-600 font-normal">
                Get an instant estimate for your smart living project.
                <br className="hidden sm:block" />
                Transparent pricing, no hidden costs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left - Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="space-y-10">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium tracking-wide uppercase mb-4">
                      1. Property Type *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setPropertyType(type.value)}
                          className={`p-6 border-2 transition-all duration-300 ${
                            propertyType === type.value
                              ? 'border-charcoal bg-gray-50'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-4xl mb-3">{type.icon}</div>
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Square Footage */}
                  <div>
                    <label className="block text-sm font-medium tracking-wide uppercase mb-4">
                      2. Square Footage *
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 3000"
                      value={squareFootage}
                      onChange={(e) => setSquareFootage(e.target.value)}
                      className="text-lg py-6"
                    />
                    <p className="text-xs text-gray-500 mt-2">Enter the total area in square feet</p>
                  </div>

                  {/* Systems Selection */}
                  <div>
                    <label className="block text-sm font-medium tracking-wide uppercase mb-4">
                      3. Select Systems * ({selectedSystems.length} selected)
                    </label>
                    <div className="space-y-3">
                      {SYSTEMS.map((system) => (
                        <button
                          key={system.value}
                          onClick={() => toggleSystem(system.value)}
                          className={`w-full p-5 border-2 text-left transition-all duration-300 ${
                            selectedSystems.includes(system.value)
                              ? 'border-charcoal bg-gray-50'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 flex-shrink-0 ${
                              selectedSystems.includes(system.value) ? 'text-charcoal' : 'text-gray-300'
                            }`}>
                              <CheckCircle2 size={24} strokeWidth={2} />
                            </div>
                            <div>
                              <div className="font-medium mb-1">{system.label}</div>
                              <div className="text-sm text-gray-600">{system.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Calculate Button */}
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    size="lg"
                    className="w-full bg-charcoal hover:bg-charcoal-light text-white py-7 text-base"
                  >
                    {isCalculating ? 'CALCULATING...' : 'CALCULATE ESTIMATE'}
                  </Button>
                </div>
              </motion.div>

              {/* Right - Results */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                {result ? (
                  <div className="sticky top-24 glass border border-gray-200 p-8 space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Your Estimate</h3>
                      <p className="text-sm text-gray-600">
                        Based on {selectedSystems.length} systems for a {squareFootage} sq ft {propertyType}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Cost Range */}
                      <div className="pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="text-charcoal" size={20} />
                          <span className="text-xs tracking-wider uppercase text-gray-500">Investment Range</span>
                        </div>
                        <div className="text-4xl font-semibold mb-2">
                          {formatCurrency(result.estimated_cost_min)}
                        </div>
                        <div className="text-lg text-gray-600">
                          to {formatCurrency(result.estimated_cost_max)}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="text-charcoal" size={20} />
                          <span className="text-xs tracking-wider uppercase text-gray-500">Timeline</span>
                        </div>
                        <div className="text-3xl font-semibold">
                          {result.timeline_weeks} weeks
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          From design to completion
                        </div>
                      </div>

                      {/* Selected Systems */}
                      <div>
                        <div className="text-xs tracking-wider uppercase text-gray-500 mb-3">
                          Included Systems
                        </div>
                        <div className="space-y-2">
                          {SYSTEMS.filter(s => selectedSystems.includes(s.value)).map((system) => (
                            <div key={system.value} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 size={16} className="text-charcoal" />
                              <span>{system.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        Ready to bring your vision to life? Book a free consultation with our experts.
                      </p>
                      <Button
                        onClick={() => window.location.href = '/contact'}
                        className="w-full border border-charcoal hover:bg-charcoal hover:text-white transition-all"
                        variant="outline"
                      >
                        BOOK CONSULTATION
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="sticky top-24 glass border border-gray-200 p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Calculator size={48} className="mx-auto" strokeWidth={1} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Your Estimate</h3>
                    <p className="text-sm text-gray-600">
                      Fill out the form to see your personalized cost estimate and project timeline.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
            <p>
              * This is an estimated range based on typical installations. Final pricing will be determined after a detailed site assessment and consultation. Prices are in AED and exclude VAT.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

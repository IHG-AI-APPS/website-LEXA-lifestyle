'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Film,
  Ruler,
  Users,
  Speaker,
  Lightbulb,
  Armchair,
  Sparkles,
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

interface ConfigState {
  roomSize: string
  seatingCapacity: string
  screenSize: string
  audioSystem: string
  seatingType: string
  lighting: string[]
  acoustics: string
  budget: string
  name: string
  email: string
  phone: string
  notes: string
}

export default function CinemaConfiguratorPage() {
  const cms = useCms('page_cinema_configurator', null)

  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<ConfigState>({
    roomSize: '',
    seatingCapacity: '',
    screenSize: '',
    audioSystem: '',
    seatingType: '',
    lighting: [],
    acoustics: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [estimatedCost, setEstimatedCost] = useState(0)

  const totalSteps = 6

  const calculateEstimate = () => {
    let cost = 0
    
    // Base cost by room size
    if (config.roomSize === 'small') cost += 150000
    else if (config.roomSize === 'medium') cost += 250000
    else if (config.roomSize === 'large') cost += 400000
    
    // Audio system
    if (config.audioSystem === '5.1') cost += 50000
    else if (config.audioSystem === '7.1') cost += 80000
    else if (config.audioSystem === 'atmos') cost += 150000
    
    // Seating
    const seats = parseInt(config.seatingCapacity) || 6
    if (config.seatingType === 'premium') cost += seats * 8000
    else if (config.seatingType === 'luxury') cost += seats * 15000
    else if (config.seatingType === 'bespoke') cost += seats * 25000
    
    // Lighting features
    cost += config.lighting.length * 15000
    
    // Acoustics
    if (config.acoustics === 'professional') cost += 80000
    
    setEstimatedCost(cost)
  }

  const handleNext = () => {
    if (step === 5) calculateEstimate()
    setStep(step + 1)
  }

  const handleBack = () => setStep(step - 1)

  const handleSubmit = async () => {
    // Submit to backend
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    try {
      await fetch(`${API_URL}/api/cinema-configurator/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, estimatedCost })
      })
      alert('Thank you! Our cinema design team will contact you within 24 hours.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-8 py-24 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Film className="w-16 h-16 mx-auto mb-4 text-[#E8DCC8]" />
          <h1 className="text-5xl font-bold mb-4">Cinema Configurator</h1>
          <p className="text-xl text-gray-400">
            Design your perfect home cinema in 6 simple steps
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                  index + 1 <= step ? 'bg-[#E8DCC8]' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Ruler className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Room Dimensions</h2>
              </div>
              
              <p className="text-gray-400 mb-8">Select your available room size</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'small', label: 'Small Cinema', size: '200-300 sq ft', desc: '4-6 seats ideal' },
                  { id: 'medium', label: 'Medium Cinema', size: '300-500 sq ft', desc: '6-10 seats ideal' },
                  { id: 'large', label: 'Large Cinema', size: '500+ sq ft', desc: '10+ seats' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setConfig({ ...config, roomSize: option.id })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      config.roomSize === option.id
                        ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{option.label}</h3>
                    <p className="text-[#E8DCC8] text-sm mb-1">{option.size}</p>
                    <p className="text-gray-500 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Seating & Screen</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Number of Seats</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[4, 6, 8, 10, 12, 14, 16, '18+'].map((seats) => (
                      <button
                        key={seats}
                        onClick={() => setConfig({ ...config, seatingCapacity: seats.toString() })}
                        className={`p-4 rounded-lg border-2 font-bold transition-all ${
                          config.seatingCapacity === seats.toString()
                            ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {seats}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Screen Size Preference</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { id: '120', label: '120 inch', desc: 'Compact rooms' },
                      { id: '150', label: '150 inch', desc: 'Most popular' },
                      { id: '180', label: '180+ inch', desc: 'Ultimate experience' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setConfig({ ...config, screenSize: option.id })}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          config.screenSize === option.id
                            ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <p className="font-bold">{option.label}</p>
                        <p className="text-sm text-gray-500">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Speaker className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Audio System</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: '5.1', label: '5.1 Surround', desc: 'Essential cinema sound', price: '+AED 50,000' },
                  { id: '7.1', label: '7.1 Surround', desc: 'Enhanced immersion', price: '+AED 80,000' },
                  { id: 'atmos', label: 'Dolby Atmos', desc: '3D overhead audio', price: '+AED 150,000' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setConfig({ ...config, audioSystem: option.id })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      config.audioSystem === option.id
                        ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-gray-400 mb-2">{option.desc}</p>
                    <p className="text-[#E8DCC8] font-semibold">{option.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Armchair className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Theatre Seating</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'premium', label: 'Premium Recliners', desc: 'Motorized recline, USB charging', price: 'AED 8,000/seat' },
                  { id: 'luxury', label: 'Luxury Recliners', desc: 'Heating, cooling, massage', price: 'AED 15,000/seat' },
                  { id: 'bespoke', label: 'Bespoke Seating', desc: 'Custom leather, branding', price: 'AED 25,000/seat' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setConfig({ ...config, seatingType: option.id })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      config.seatingType === option.id
                        ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-gray-400 mb-2">{option.desc}</p>
                    <p className="text-[#E8DCC8] font-semibold">{option.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Lighting & Acoustics</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Lighting Features (Select Multiple)</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: 'starlight', label: 'Starlight Ceiling', price: '+AED 25,000' },
                      { id: 'pathway', label: 'LED Pathway Lighting', price: '+AED 15,000' },
                      { id: 'sconce', label: 'Wall Sconces', price: '+AED 10,000' },
                      { id: 'rgb', label: 'RGB Accent Lighting', price: '+AED 18,000' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          const current = config.lighting
                          setConfig({
                            ...config,
                            lighting: current.includes(option.id)
                              ? current.filter(l => l !== option.id)
                              : [...current, option.id]
                          })
                        }}
                        className={`p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${
                          config.lighting.includes(option.id)
                            ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{option.label}</p>
                          <p className="text-sm text-[#E8DCC8]">{option.price}</p>
                        </div>
                        {config.lighting.includes(option.id) && (
                          <CheckCircle2 className="w-6 h-6 text-[#E8DCC8]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Acoustic Treatment</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: 'basic', label: 'Basic Treatment', desc: 'Wall panels, bass traps', price: 'Included' },
                      { id: 'professional', label: 'Professional Treatment', desc: 'Full acoustic engineering', price: '+AED 80,000' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setConfig({ ...config, acoustics: option.id })}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          config.acoustics === option.id
                            ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <p className="font-bold">{option.label}</p>
                        <p className="text-sm text-gray-400 mb-1">{option.desc}</p>
                        <p className="text-[#E8DCC8] text-sm font-semibold">{option.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-[#E8DCC8]" />
                <h2 className="text-3xl font-bold">Your Cinema Estimate</h2>
              </div>

              <div className="bg-gradient-to-br from-[#E8DCC8]/20 to-[#E8DCC8]/5 rounded-xl p-8 mb-8 border border-[#E8DCC8]/30">
                <p className="text-sm text-gray-400 mb-2">Estimated Investment</p>
                <p className="text-5xl font-bold text-[#E8DCC8] mb-4">
                  AED {estimatedCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  This is a preliminary estimate. Final pricing will be provided after site visit.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xl mb-4">Get Your Detailed Quote</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
                <Input
                  placeholder="Phone Number"
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  className="bg-black/50 border-gray-700 text-white"
                />
                <Textarea
                  placeholder="Additional notes or requirements..."
                  value={config.notes}
                  onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                  rows={4}
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={step === 1}
            variant="outline"
            size="lg"
            className="border-gray-600 text-white hover:bg-gray-800 disabled:opacity-30"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Button>
          
          {step < 6 ? (
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-[#E8DCC8] hover:bg-[#B5952F] text-white"
            >
              Next Step
              <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-[#E8DCC8] hover:bg-[#B5952F] text-white px-12"
            >
              Submit Request
              <Sparkles className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

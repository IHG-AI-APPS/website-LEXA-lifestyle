'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calculator, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Home,
  Building2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Shield,
  Music,
  Sun,
  Wifi,
  Camera,
  Lock,
  Wind,
  Tv,
  Radio
} from 'lucide-react'

// Enhanced system options with detailed features
const SYSTEMS = [
  {
    value: 'home_theater',
    label: 'Home Theater & Cinema',
    icon: Tv,
    description: 'Dolby Atmos, 4K projection, acoustic treatment',
    basePrice: 150000,
    features: [
      { name: 'Basic (5.1 Surround)', price: 80000 },
      { name: 'Standard (7.1 Atmos)', price: 150000 },
      { name: 'Premium (9.2.4 Atmos)', price: 280000 }
    ]
  },
  {
    value: 'lighting',
    label: 'Smart Lighting Control',
    icon: Sun,
    description: 'Lutron, scenes, occupancy sensors, circadian rhythm',
    basePrice: 80000,
    features: [
      { name: 'Basic (Wireless)', price: 40000 },
      { name: 'Standard (Wired Control)', price: 80000 },
      { name: 'Premium (Lutron HomeWorks)', price: 150000 }
    ]
  },
  {
    value: 'security',
    label: 'Security & Surveillance',
    icon: Shield,
    description: 'HD cameras, biometric access, alarm integration',
    basePrice: 100000,
    features: [
      { name: 'Basic (4 Cameras)', price: 50000 },
      { name: 'Standard (8-12 Cameras)', price: 100000 },
      { name: 'Premium (16+ Cameras + Analytics)', price: 200000 }
    ]
  },
  {
    value: 'climate',
    label: 'Climate Control',
    icon: Wind,
    description: 'Multi-zone HVAC, smart thermostats, energy management',
    basePrice: 70000,
    features: [
      { name: 'Basic (Smart Thermostats)', price: 35000 },
      { name: 'Standard (Zoned Control)', price: 70000 },
      { name: 'Premium (Full Integration)', price: 120000 }
    ]
  },
  {
    value: 'audio',
    label: 'Whole-Home Audio',
    icon: Music,
    description: 'Multi-room Sonos, in-ceiling speakers, outdoor audio',
    basePrice: 60000,
    features: [
      { name: 'Basic (3-5 Zones)', price: 35000 },
      { name: 'Standard (6-10 Zones)', price: 60000 },
      { name: 'Premium (10+ Zones)', price: 100000 }
    ]
  },
  {
    value: 'networking',
    label: 'Network Infrastructure',
    icon: Wifi,
    description: 'WiFi 6E mesh, POE switches, structured cabling',
    basePrice: 40000,
    features: [
      { name: 'Basic (Consumer WiFi)', price: 15000 },
      { name: 'Standard (Enterprise WiFi)', price: 40000 },
      { name: 'Premium (Full Infrastructure)', price: 80000 }
    ]
  },
  {
    value: 'shades',
    label: 'Motorized Shades',
    icon: Zap,
    description: 'Automated blinds, curtains, blackout control',
    basePrice: 50000,
    features: [
      { name: 'Basic (5-8 Windows)', price: 30000 },
      { name: 'Standard (10-15 Windows)', price: 50000 },
      { name: 'Premium (15+ Windows)', price: 90000 }
    ]
  },
  {
    value: 'access',
    label: 'Access Control',
    icon: Lock,
    description: 'Smart locks, biometric entry, gate automation',
    basePrice: 45000,
    features: [
      { name: 'Basic (Smart Locks)', price: 20000 },
      { name: 'Standard (Access Control)', price: 45000 },
      { name: 'Premium (Full Biometric)', price: 85000 }
    ]
  },
  {
    value: 'intercom',
    label: 'Video Intercom',
    icon: Camera,
    description: 'Video doorbell, multi-unit intercom, gate entry',
    basePrice: 35000,
    features: [
      { name: 'Basic (Video Doorbell)', price: 15000 },
      { name: 'Standard (Multi-Unit)', price: 35000 },
      { name: 'Premium (Full System)', price: 65000 }
    ]
  },
  {
    value: 'integration',
    label: 'System Integration',
    icon: Radio,
    description: 'Control4, Crestron, KNX - unified control platform',
    basePrice: 80000,
    features: [
      { name: 'Control4 (Standard)', price: 50000 },
      { name: 'Control4 (Pro)', price: 80000 },
      { name: 'Crestron (Enterprise)', price: 150000 }
    ]
  }
]

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment', icon: Building2, multiplier: 0.8 },
  { value: 'villa', label: 'Villa', icon: Home, multiplier: 1.2 },
  { value: 'commercial', label: 'Commercial', icon: Building2, multiplier: 1.4 }
]

const ADDITIONAL_FEATURES = [
  { id: 'voice', label: 'Voice Control (Alexa/Google)', price: 15000 },
  { id: 'outdoor', label: 'Outdoor Entertainment', price: 45000 },
  { id: 'pool', label: 'Pool & Spa Automation', price: 35000 },
  { id: 'landscape', label: 'Landscape Lighting', price: 25000 },
  { id: 'solar', label: 'Solar Integration', price: 50000 },
  { id: 'backup', label: 'Backup Power System', price: 60000 },
  { id: 'future', label: 'Future Expansion Wiring', price: 20000 }
]

export default function AdvancedCalculatorPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  
  // Form data
  const [propertyType, setPropertyType] = useState('')
  const [squareFootage, setSquareFootage] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [constructionStage, setConstructionStage] = useState('')
  const [selectedSystems, setSelectedSystems] = useState<Record<string, string>>({})
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [timeline, setTimeline] = useState('')
  const [budget, setBudget] = useState('')
  
  // Results
  const [totalCost, setTotalCost] = useState(0)
  const [breakdown, setBreakdown] = useState<any[]>([])
  const [estimatedTimeline, setEstimatedTimeline] = useState(0)

  // Pre-fill from URL params
  useEffect(() => {
    const propertyTypeParam = searchParams.get('propertyType')
    const areaParam = searchParams.get('area')
    const systemParam = searchParams.get('system')

    if (propertyTypeParam) {
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
      const systemMap: Record<string, string> = {
        'home-theater': 'home_theater',
        'lighting': 'lighting',
        'security': 'security',
        'climate': 'climate',
        'audio': 'audio',
        'networking': 'networking'
      }
      const mappedSystem = systemMap[systemParam]
      if (mappedSystem) {
        setSelectedSystems({ [mappedSystem]: 'standard' })
      }
    }
  }, [searchParams])

  const calculateTotal = useCallback(() => {
    let total = 0
    const items: any[] = []
    
    // Property type multiplier
    const propertyMultiplier = PROPERTY_TYPES.find(p => p.value === propertyType)?.multiplier || 1
    
    // Size multiplier
    const size = parseInt(squareFootage) || 0
    const sizeMultiplier = size > 5000 ? 1.3 : size > 3000 ? 1.15 : 1
    
    // Systems cost
    Object.entries(selectedSystems).forEach(([systemKey, level]) => {
      const system = SYSTEMS.find(s => s.value === systemKey)
      if (system && level) {
        const feature = system.features.find(f => f.name.toLowerCase().includes(level))
        const systemCost = (feature?.price || system.basePrice) * propertyMultiplier * sizeMultiplier
        total += systemCost
        items.push({
          name: `${system.label} (${level})`,
          cost: systemCost
        })
      }
    })
    
    // Additional features
    additionalFeatures.forEach(featureId => {
      const feature = ADDITIONAL_FEATURES.find(f => f.id === featureId)
      if (feature) {
        total += feature.price
        items.push({
          name: feature.label,
          cost: feature.price
        })
      }
    })
    
    // Construction stage adjustment
    if (constructionStage === 'existing') {
      const retrofitCost = total * 0.2
      total += retrofitCost
      items.push({
        name: 'Retrofit Installation Premium',
        cost: retrofitCost
      })
    }
    
    // Timeline estimation (weeks)
    const systemCount = Object.keys(selectedSystems).length
    const baseTimeline = 8
    const timelineCalc = baseTimeline + (systemCount * 2) + (size > 5000 ? 4 : 0)
    
    setTotalCost(total)
    setBreakdown(items)
    setEstimatedTimeline(timelineCalc)
  }, [propertyType, squareFootage, selectedSystems, additionalFeatures, constructionStage])

  useEffect(() => {
    if (step === 5) {
      calculateTotal()
    }
  }, [step, calculateTotal])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const nextStep = () => setStep(Math.min(step + 1, 5))
  const prevStep = () => setStep(Math.max(step - 1, 1))

  const canProceed = () => {
    if (step === 1) return propertyType && squareFootage && bedrooms && constructionStage
    if (step === 2) return Object.keys(selectedSystems).length > 0
    if (step === 3) return true
    if (step === 4) return true
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Calculator size={28} strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              SMART HOME CALCULATOR
            </h1>
            
            <p className="text-xl text-gray-300">
              Get a detailed estimate for your luxury smart home project
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto py-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    s === step ? 'bg-black text-white scale-110' : 
                    s < step ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {s < step ? <CheckCircle2 size={20} /> : s}
                  </div>
                  {s < 5 && (
                    <div className={`h-1 flex-1 mx-2 transition-all ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 px-2">
              <span className="text-xs font-medium text-gray-600">Property</span>
              <span className="text-xs font-medium text-gray-600">Systems</span>
              <span className="text-xs font-medium text-gray-600">Level</span>
              <span className="text-xs font-medium text-gray-600">Extras</span>
              <span className="text-xs font-medium text-gray-600">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {/* STEP 1: Property Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-6">Tell us about your property</h2>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
                      Property Type *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setPropertyType(type.value)}
                          className={`p-6 border-2 rounded-lg transition-all ${
                            propertyType === type.value
                              ? 'border-black bg-gray-50 shadow-lg'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <type.icon className="w-12 h-12 mx-auto mb-3" />
                          <div className="font-semibold">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Square Footage */}
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
                      Total Area (sq ft) *
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={squareFootage}
                      onChange={(e) => setSquareFootage(e.target.value)}
                      className="text-lg py-6"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
                      Number of Bedrooms/Zones *
                    </label>
                    <div className="grid grid-cols-6 gap-3">
                      {['1', '2', '3', '4', '5', '6+'].map((num) => (
                        <button
                          key={num}
                          onClick={() => setBedrooms(num)}
                          className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                            bedrooms === num
                              ? 'border-black bg-gray-50'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Construction Stage */}
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
                      Construction Stage *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'new', label: 'New Build', desc: 'Under construction' },
                        { value: 'renovation', label: 'Renovation', desc: 'Major remodel' },
                        { value: 'existing', label: 'Existing', desc: 'Retrofit installation' }
                      ].map((stage) => (
                        <button
                          key={stage.value}
                          onClick={() => setConstructionStage(stage.value)}
                          className={`p-5 border-2 rounded-lg text-left transition-all ${
                            constructionStage === stage.value
                              ? 'border-black bg-gray-50'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-semibold mb-1">{stage.label}</div>
                          <div className="text-sm text-gray-600">{stage.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: System Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6">
                    Select Systems ({Object.keys(selectedSystems).length} selected)
                  </h2>

                  <div className="space-y-4">
                    {SYSTEMS.map((system) => (
                      <div
                        key={system.value}
                        className={`border-2 rounded-lg overflow-hidden transition-all ${
                          selectedSystems[system.value]
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => {
                            const newSystems = { ...selectedSystems }
                            if (newSystems[system.value]) {
                              delete newSystems[system.value]
                            } else {
                              newSystems[system.value] = 'standard'
                            }
                            setSelectedSystems(newSystems)
                          }}
                          className="w-full p-5 text-left flex items-start gap-4"
                        >
                          <div className={`mt-1 ${selectedSystems[system.value] ? 'text-black' : 'text-gray-300'}`}>
                            <system.icon size={28} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{system.label}</div>
                            <div className="text-sm text-gray-600">{system.description}</div>
                            <div className="text-sm font-medium text-gray-500 mt-2">
                              Starting from {formatCurrency(system.features[0].price)}
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Feature Levels */}
              {step === 3 && Object.keys(selectedSystems).length > 0 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-6">Choose feature level for each system</h2>

                  {Object.keys(selectedSystems).map((systemKey) => {
                    const system = SYSTEMS.find(s => s.value === systemKey)
                    if (!system) return null

                    return (
                      <div key={systemKey} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <system.icon size={24} />
                          <h3 className="text-xl font-semibold">{system.label}</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {system.features.map((feature) => {
                            const level = feature.name.split(' ')[0].toLowerCase()
                            return (
                              <button
                                key={feature.name}
                                onClick={() => setSelectedSystems({
                                  ...selectedSystems,
                                  [systemKey]: level
                                })}
                                className={`p-5 border-2 rounded-lg text-left transition-all ${
                                  selectedSystems[systemKey] === level
                                    ? 'border-black bg-gray-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                              >
                                <div className="font-semibold mb-2">{feature.name}</div>
                                <div className="text-2xl font-bold text-gray-900">
                                  {formatCurrency(feature.price)}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}

              {/* STEP 4: Additional Features */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6">
                    Additional Features ({additionalFeatures.length} selected)
                  </h2>

                  <p className="text-gray-600 mb-6">
                    Enhance your smart home with these optional features (optional)
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {ADDITIONAL_FEATURES.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => {
                          setAdditionalFeatures(prev =>
                            prev.includes(feature.id)
                              ? prev.filter(f => f !== feature.id)
                              : [...prev, feature.id]
                          )
                        }}
                        className={`p-5 border-2 rounded-lg text-left transition-all ${
                          additionalFeatures.includes(feature.id)
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-semibold">{feature.label}</div>
                          {additionalFeatures.includes(feature.id) && (
                            <CheckCircle2 size={20} className="text-green-500" />
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-700">
                          +{formatCurrency(feature.price)}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Timeline & Budget */}
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Preferred Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-2months">1-2 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Budget Range (Optional)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg"
                      >
                        <option value="">Select budget</option>
                        <option value="under-200k">Under AED 200,000</option>
                        <option value="200k-500k">AED 200,000 - 500,000</option>
                        <option value="500k-1m">AED 500,000 - 1,000,000</option>
                        <option value="1m-plus">AED 1,000,000+</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Results */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                      <Sparkles size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-4xl font-bold mb-3">Your Custom Estimate</h2>
                    <p className="text-gray-600">Based on your selections, here&apos;s what your project will cost</p>
                  </div>

                  {/* Total Cost Card */}
                  <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-8 mb-6">
                    <div className="text-center">
                      <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Estimated Total Investment</div>
                      <div className="text-5xl font-bold mb-4">{formatCurrency(totalCost)}</div>
                      <div className="flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          <span>{estimatedTimeline} weeks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={18} />
                          <span>{Object.keys(selectedSystems).length} systems</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Cost Breakdown</h3>
                    <div className="space-y-3">
                      {breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="font-semibold">{formatCurrency(item.cost)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3">Next Steps</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Book a free consultation with our smart home experts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Site survey and detailed proposal within 3-5 business days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Flexible payment plans and financing options available</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 justify-center pt-6">
                    <Button
                      size="lg"
                      className="bg-black text-white px-8 py-6 text-lg hover:bg-gray-800"
                    >
                      Book Free Consultation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-black px-8 py-6 text-lg"
                      onClick={() => window.print()}
                    >
                      Download PDF Quote
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between items-center mt-12 pt-8 border-t">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={prevStep}
                    className="px-6"
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    Back
                  </Button>
                ) : <div />}

                <Button
                  size="lg"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-black text-white px-8 disabled:opacity-50"
                >
                  {step === 4 ? 'View Estimate' : 'Continue'}
                  <ChevronRight size={20} className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

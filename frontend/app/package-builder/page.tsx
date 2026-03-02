'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Building2, Hotel, Check, ArrowRight, ArrowLeft, Sparkles, Star } from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import LifestyleQuizMini from '@/components/quiz/LifestyleQuizMini'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const propertyIcons = {
  'luxury-villas-mansions': Home,
  'penthouses-sky-homes': Building2,
  'luxury-apartments-duplexes': Hotel,
  'developer-studio-apartments': Building2,
  'developer-1br-apartments': Building2,
  'developer-2br-apartments': Hotel,
  'developer-3br-apartments': Hotel
}

export default function PackageBuilderPage() {
  const cms = useCms('page_package_builder', null)

  const searchParams = useSearchParams()
  const preSelectedProperty = searchParams.get('property')
  const preSelectedTier = searchParams.get('tier')
  
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState<any>(null)
  const [selectedTier, setSelectedTier] = useState<any>(null)
  const [selectedControlSystem, setSelectedControlSystem] = useState<any>(null)
  const [selectedEnhancements, setSelectedEnhancements] = useState<any[]>([])
  const [selectedBrands, setSelectedBrands] = useState<Record<string, any>>({})
  const [selectedRooms, setSelectedRooms] = useState<any[]>([])
  
  const [propertyTypes, setPropertyTypes] = useState<any[]>([])
  const [controlSystems, setControlSystems] = useState<any[]>([])
  const [enhancements, setEnhancements] = useState<any>({})
  const [brandOptions, setBrandOptions] = useState<any[]>([])
  const [specialtyRooms, setSpecialtyRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  
  // AI Recommendations state
  const [showQuiz, setShowQuiz] = useState(true)
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  // Check if enhancement is AI recommended
  const isRecommended = (featureTitle: string) => {
    return aiRecommendations.some(rec => 
      rec.feature_title.toLowerCase().includes(featureTitle.toLowerCase()) ||
      featureTitle.toLowerCase().includes(rec.feature_title.toLowerCase())
    )
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  // Handle pre-selection from URL params
  useEffect(() => {
    if (!initialized && propertyTypes.length > 0 && preSelectedProperty) {
      const property = propertyTypes.find(p => p.slug === preSelectedProperty)
      if (property) {
        // Auto-select the property
        selectPropertyType(property.slug).then(() => {
          setInitialized(true)
        })
      }
    }
  }, [propertyTypes, preSelectedProperty, initialized])
  
  // Auto-select tier after property is loaded
  useEffect(() => {
    if (initialized && propertyType && preSelectedTier && step === 2) {
      const tier = propertyType.tiers?.find((t: any) => t.tier_level === preSelectedTier)
      if (tier) {
        setSelectedTier(tier)
        // Move to next step (control system selection)
        setTimeout(() => setStep(3), 500)
      }
    }
  }, [initialized, propertyType, preSelectedTier, step])

  const fetchData = async () => {
    try {
      const [packagesRes, roomsRes, enhancementsRes, brandsRes, systemsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/packages/property-types`),
        fetch(`${BACKEND_URL}/api/packages/specialty-rooms`),
        fetch(`${BACKEND_URL}/api/packages/enhancements`),
        fetch(`${BACKEND_URL}/api/packages/brand-options`),
        fetch(`${BACKEND_URL}/api/packages/control-systems`)
      ])
      
      const packagesData = await packagesRes.json()
      const roomsData = await roomsRes.json()
      const enhancementsData = await enhancementsRes.json()
      const brandsData = await brandsRes.json()
      const systemsData = await systemsRes.json()
      
      setPropertyTypes(packagesData.packages || [])
      setSpecialtyRooms(roomsData.specialty_rooms || [])
      setEnhancements(enhancementsData.by_category || {})
      setBrandOptions(brandsData.brand_options || [])
      setControlSystems(systemsData.control_systems || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to load data:', error)
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    let total = selectedTier?.base_price_aed || 0
    
    // Add enhancements
    selectedEnhancements.forEach(enhancement => {
      total += enhancement.base_price_aed
    })
    
    // Add brand adjustments
    Object.values(selectedBrands).forEach((brand: any) => {
      total += brand.price_adjustment || 0
    })
    
    // Add specialty rooms (excluding included ones)
    const includedCount = selectedTier?.included_specialty_count || 0
    const paidRooms = selectedRooms.slice(includedCount)
    
    paidRooms.forEach(room => {
      total += room.base_price_aed
    })
    
    return total
  }

  const selectPropertyType = async (slug: string) => {
    const response = await fetch(`${BACKEND_URL}/api/packages/property-types/${slug}`)
    const data = await response.json()
    setPropertyType(data)
    setSelectedTier(null)
    setSelectedEnhancements([])
    setSelectedBrands({})
    setSelectedRooms([])
    setStep(2)
  }

  const selectTier = (tier: any) => {
    setSelectedTier(tier)
    setStep(3)
  }

  const selectControlSystem = (system: any) => {
    setSelectedControlSystem(system)
    setStep(4)
  }

  const toggleEnhancement = (enhancement: any) => {
    const isSelected = selectedEnhancements.find(e => e.id === enhancement.id)
    if (isSelected) {
      setSelectedEnhancements(selectedEnhancements.filter(e => e.id !== enhancement.id))
    } else {
      setSelectedEnhancements([...selectedEnhancements, enhancement])
    }
  }

  const selectBrand = (categoryId: string, option: any) => {
    setSelectedBrands({
      ...selectedBrands,
      [categoryId]: option
    })
  }

  const toggleRoom = (room: any) => {
    const isSelected = selectedRooms.find(r => r.slug === room.slug)
    if (isSelected) {
      setSelectedRooms(selectedRooms.filter(r => r.slug !== room.slug))
    } else {
      setSelectedRooms([...selectedRooms, room])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse max-w-5xl mx-auto">
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Below main navigation */}
      <div className="border-b bg-white sticky top-16 sm:top-18 md:top-20 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link href="/packages" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white">
              ← Back to Packages
            </Link>
            
            {selectedTier && (
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Estimated Total</p>
                <p className="text-2xl font-bold text-[#C9A962]">
                  AED {(calculateTotal() / 1000).toFixed(0)}K
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Property Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Build Your Smart Home Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
                Step 1: Select your property type
              </p>
              
              {/* AI Lifestyle Quiz */}
              {showQuiz && !preSelectedProperty && (
                <LifestyleQuizMini
                  onComplete={(recs) => {
                    setAiRecommendations(recs)
                    setShowQuiz(false)
                  }}
                  onSkip={() => setShowQuiz(false)}
                />
              )}
              
              {/* AI Recommendations Badge */}
              {aiRecommendations.length > 0 && (
                <div className="bg-[#C9A962]/5 border border-[#C9A962]/20 rounded-xl p-4 mb-8 flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#C9A962] fill-blue-600" />
                  <span className="text-sm text-[#B8983F]">
                    <strong>{aiRecommendations.length}</strong> personalized feature recommendations ready! 
                    Look for the <Star className="h-4 w-4 inline text-amber-500 fill-amber-500" /> badge on matching enhancements.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {propertyTypes.map((property) => {
                  const Icon = propertyIcons[property.slug] || Home
                  return (
                    <button
                      key={property.slug}
                      onClick={() => selectPropertyType(property.slug)}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-64">
                        <SafeImage
                          src={property.hero_image}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <Icon className="h-10 w-10 text-white mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                        <p className="text-sm text-gray-200">{property.subtitle}</p>
                        <div className="mt-4 flex items-center text-white font-medium">
                          Select <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Tier Selection */}
          {step === 2 && propertyType && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <button
                onClick={() => setStep(1)}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Change property type
              </button>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Choose Your Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">
                Step 2: {propertyType.title}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {propertyType.tiers?.map((tier: any) => (
                  <div
                    key={tier.tier_level}
                    className={`relative rounded-2xl border-2 p-8 transition-all ${
                      tier.recommended 
                        ? 'border-[#C9A962] shadow-2xl scale-105' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-[#C9A962]'
                    }`}
                  >
                    {tier.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A962]/50 text-white text-sm font-bold rounded-full">
                        {tier.badge}
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.tier_name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.tier_subtitle}</p>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white dark:text-white">
                          {(tier.base_price_aed / 1000).toFixed(0)}K
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">AED</span>
                      </div>
                      <p className="text-sm text-gray-500">{tier.typical_rooms_count}</p>
                    </div>

                    {tier.included_specialty_count > 0 && (
                      <div className="p-4 bg-amber-50 rounded-lg mb-6">
                        <p className="text-sm font-bold text-amber-900 text-center">
                          + Choose {tier.included_specialty_count} Specialty Rooms FREE
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => selectTier(tier)}
                      className={`w-full py-4 rounded-lg font-bold transition-all ${
                        tier.recommended
                          ? 'bg-[#C9A962]/50 text-white hover:bg-[#C9A962] shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200'
                      }`}
                    >
                      Select {tier.tier_name}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Control System Selection */}
          {step === 3 && selectedTier && (
            <motion.div
              key="step3-control"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <button
                onClick={() => setStep(2)}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Change tier
              </button>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Choose Your Control System
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 text-center">
                Step 3: Select the automation platform
              </p>
              <p className="text-sm text-gray-500 mb-8 text-center">
                Your control system determines compatibility and ecosystem
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {controlSystems
                  .filter((sys: any) => 
                    sys.recommended_for_tiers?.includes(selectedTier.tier_level)
                  )
                  .map((system: any) => (
                    <div
                      key={system.id}
                      onClick={() => selectControlSystem(system)}
                      className="group relative rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:border-[#C9A962] hover:shadow-xl transition-all bg-white"
                    >
                      {system.featured && (
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#C9A962] text-white text-xs font-bold rounded-full">
                          Popular
                        </div>
                      )}
                      
                      {system.is_lexa_partner && (
                        <div className="absolute -top-3 right-6 px-3 py-1 bg-black text-white text-xs font-bold rounded-full">
                          LEXA Partner
                        </div>
                      )}

                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#C9A962] transition-colors">
                          {system.name}
                        </h3>
                        <p className="text-sm text-[#C9A962] font-semibold mb-3">
                          {system.tagline}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {system.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            system.type === 'proprietary' 
                              ? 'bg-[#C9A962]/10 text-[#A68B4B]' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {system.type === 'proprietary' ? 'Proprietary' : 'Open Standard'}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Best For</p>
                          <div className="flex flex-wrap gap-1">
                            {system.best_for?.slice(0, 2).map((use: string, idx: number) => (
                              <span key={idx} className="text-xs text-gray-700 dark:text-gray-300 dark:text-gray-300">
                                {use}{idx < 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Key Features</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {system.features?.slice(0, 3).map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1">
                                <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
                        <p className="text-xs text-gray-500 mb-1">Price Range</p>
                        <p className="font-bold text-gray-900 dark:text-white dark:text-white">
                          {system.price_range_aed ? (
                            <>AED {(system.price_range_aed[0] / 1000).toFixed(0)}K - {(system.price_range_aed[1] / 1000).toFixed(0)}K</>
                          ) : (
                            <>Contact for pricing</>
                          )}
                        </p>
                      </div>

                      <button className="mt-4 w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 group-hover:bg-[#C9A962] text-gray-900 dark:text-white group-hover:text-white rounded-lg font-bold transition-all">
                        Select {system.name}
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Enhancements & Add-ons */}
          {step === 4 && selectedTier && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <button
                onClick={() => setStep(3)}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Change control system
              </button>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Customize Your Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 text-center">
                Step 4: Add optional enhancements and upgrades
              </p>
              <p className="text-sm text-gray-500 mb-8 text-center">
                {selectedEnhancements.length > 0 
                  ? `${selectedEnhancements.length} enhancement${selectedEnhancements.length > 1 ? 's' : ''} selected` 
                  : 'All enhancements are optional - skip if not needed'}
              </p>

              <div className="space-y-8 mb-12">
                {Object.entries(enhancements).map(([category, items]: [string, any]) => {
                  // Filter items applicable to selected tier
                  const applicableItems = items.filter((item: any) => {
                    const tierLevel = selectedTier.tier_level
                    return item.applies_to_tiers?.includes(tierLevel) && 
                           item.included_in_tier !== tierLevel
                  })

                  if (applicableItems.length === 0) return null

                  return (
                    <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        {category}
                        <span className="text-sm font-normal text-gray-500">
                          ({applicableItems.length} options)
                        </span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {applicableItems.map((item: any) => {
                          const isSelected = selectedEnhancements.find(e => e.id === item.id)
                          const isAiRecommended = isRecommended(item.name)
                          
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleEnhancement(item)}
                              className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-[#C9A962] bg-[#C9A962]/5 shadow-lg' 
                                  : isAiRecommended
                                    ? 'border-amber-300 bg-amber-50/50 hover:border-amber-400'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                              }`}
                            >
                              {/* AI Recommended Badge */}
                              {isAiRecommended && !isSelected && (
                                <div className="absolute -top-2 -right-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                                  <Star className="h-3 w-3 fill-white" />
                                  AI Pick
                                </div>
                              )}
                              
                              {isSelected && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#C9A962] rounded-full flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}

                              <div className="mb-3">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-bold text-gray-900 dark:text-white flex-1 pr-8">
                                    {item.name}
                                  </h4>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                  {item.description}
                                </p>

                                {item.benefits && item.benefits.length > 0 && (
                                  <ul className="text-xs text-gray-500 space-y-1 mb-3">
                                    {item.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-1">
                                        <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  item.type === 'upgrade' 
                                    ? 'bg-[#C9A962]/10 text-[#A68B4B]' 
                                    : 'bg-[#C9A962]/10 text-[#C9A962]'
                                }`}>
                                  {item.type === 'upgrade' ? 'Upgrade' : 'Add-on'}
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white dark:text-white">
                                  +AED {(item.base_price_aed / 1000).toFixed(0)}K
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setStep(5)}
                  className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 font-bold text-lg"
                >
                  Skip Enhancements
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-12 py-4 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8983F] font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  Continue to Brand Selection
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Brand/Product Selection */}
          {step === 5 && selectedTier && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <button
                onClick={() => setStep(4)}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to enhancements
              </button>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Choose Your Brands
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 text-center">
                Step 5: Select preferred equipment brands
              </p>
              {selectedControlSystem && (
                <p className="text-sm text-[#C9A962] font-semibold mb-2 text-center">
                  Showing brands compatible with {selectedControlSystem.name}
                </p>
              )}
              <p className="text-sm text-gray-500 mb-8 text-center">
                {Object.keys(selectedBrands).length > 0 
                  ? `${Object.keys(selectedBrands).length} brand${Object.keys(selectedBrands).length > 1 ? 's' : ''} customized` 
                  : 'Default brands included - customize for premium options'}
              </p>

              <div className="space-y-8 mb-12">
                {brandOptions
                  .filter((category: any) => {
                    // Filter by tier
                    if (!category.applies_to_tiers?.includes(selectedTier.tier_level)) {
                      return false
                    }
                    
                    // Filter by control system compatibility
                    if (selectedControlSystem) {
                      const compatibleBrands = selectedControlSystem.compatibility?.native_brands || []
                      // Check if any option in this category has a compatible brand
                      const hasCompatibleOption = category.options?.some((option: any) => 
                        compatibleBrands.includes(option.brand)
                      )
                      return hasCompatibleOption
                    }
                    
                    return true
                  })
                  .map((category: any) => {
                    // Filter options within category to show only compatible brands
                    const compatibleBrands = selectedControlSystem?.compatibility?.native_brands || []
                    const filteredOptions = selectedControlSystem 
                      ? category.options.filter((option: any) => compatibleBrands.includes(option.brand))
                      : category.options
                    const selectedOption = selectedBrands[category.id]
                    const defaultOption = category.options?.[0] || null
                    
                    return (
                      <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {category.product_type}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {filteredOptions.map((option: any, idx: number) => {
                            const isSelected = selectedOption?.brand === option.brand || 
                                             (!selectedOption && idx === 0)
                            const priceLabel = option.price_adjustment === 0 
                              ? 'Included' 
                              : option.price_adjustment > 0 
                                ? `+AED ${(option.price_adjustment / 1000).toFixed(1)}K`
                                : `AED ${(option.price_adjustment / 1000).toFixed(1)}K`
                            
                            return (
                              <div
                                key={option.brand}
                                onClick={() => selectBrand(category.id, option)}
                                className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-[#C9A962] bg-[#C9A962]/5 shadow-lg' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#C9A962] rounded-full flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}

                                {option.recommended && (
                                  <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                    Recommended
                                  </div>
                                )}

                                <div className="mb-4">
                                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                    {option.brand}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.model}</p>

                                  <ul className="text-xs text-gray-500 space-y-1">
                                    {option.features.slice(0, 3).map((feature: string, fidx: number) => (
                                      <li key={fidx} className="flex items-start gap-1">
                                        <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                                  <span className={`font-bold text-lg ${
                                    option.price_adjustment === 0 
                                      ? 'text-green-600' 
                                      : option.price_adjustment > 0 
                                        ? 'text-gray-900'
                                        : 'text-[#C9A962]'
                                  }`}>
                                    {priceLabel}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setStep(6)}
                  className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 font-bold text-lg"
                >
                  Use Default Brands
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="px-12 py-4 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8983F] font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  Continue to Specialty Rooms
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Specialty Rooms */}
          {step === 6 && selectedTier && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <button
                onClick={() => setStep(5)}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white dark:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to brand selection
              </button>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Add Specialty Rooms
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 text-center">
                Step 6: Customize your package
              </p>
              {selectedTier.included_specialty_count > 0 && (
                <p className="text-green-600 font-bold mb-8 text-center text-xl">
                  First {selectedTier.included_specialty_count} room(s) included at no extra cost!
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {specialtyRooms.slice(0, 12).map((room, index) => {
                  const isSelected = selectedRooms.find(r => r.slug === room.slug)
                  const selectionIndex = selectedRooms.findIndex(r => r.slug === room.slug)
                  const isIncluded = selectionIndex !== -1 && selectionIndex < (selectedTier.included_specialty_count || 0)
                  
                  return (
                    <div
                      key={room.slug}
                      onClick={() => toggleRoom(room)}
                      className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#C9A962] bg-[#C9A962]/5 shadow-lg' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {isSelected && (
                        <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                          isIncluded ? 'bg-green-500' : 'bg-[#C9A962]'
                        }`}>
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      )}

                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                        <SafeImage
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{room.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{room.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isIncluded ? 'text-green-600' : 'text-gray-900'}`}>
                          {isIncluded ? 'Included FREE' : `+AED ${(room.base_price_aed / 1000).toFixed(0)}K`}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setStep(7)}
                  className="px-12 py-5 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8983F] font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  Continue to Summary
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 7: Summary & Contact */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Your Custom Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">
                Review and request your quote
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Summary */}
                <div>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Property Type</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">{propertyType?.title}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Package Tier</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">{selectedTier?.tier_name}</p>
                      <p className="text-lg text-[#C9A962] font-semibold">
                        AED {(selectedTier?.base_price_aed / 1000).toFixed(0)}K
                      </p>
                    </div>

                    {selectedControlSystem && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Control System</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">{selectedControlSystem?.name}</p>
                        <p className="text-xs text-gray-500">{selectedControlSystem?.tagline}</p>
                      </div>
                    )}

                    {selectedEnhancements.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Enhancements & Upgrades ({selectedEnhancements.length})
                        </p>
                        {selectedEnhancements.map((enhancement) => (
                          <div key={enhancement.id} className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{enhancement.name}</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">
                              +AED {(enhancement.base_price_aed / 1000).toFixed(0)}K
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {Object.keys(selectedBrands).length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Brand Customizations ({Object.keys(selectedBrands).length})
                        </p>
                        {Object.values(selectedBrands).map((brand: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{brand.brand} - {brand.model}</span>
                            <span className={`text-sm font-bold ${
                              brand.price_adjustment === 0 ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {brand.price_adjustment === 0 
                                ? 'Included' 
                                : brand.price_adjustment > 0
                                  ? `+AED ${(brand.price_adjustment / 1000).toFixed(1)}K`
                                  : `AED ${(brand.price_adjustment / 1000).toFixed(1)}K`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedRooms.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Specialty Rooms ({selectedRooms.length})
                        </p>
                        {selectedRooms.map((room, idx) => {
                          const isIncluded = idx < (selectedTier?.included_specialty_count || 0)
                          return (
                            <div key={room.slug} className="flex justify-between items-center py-2">
                              <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{room.name}</span>
                              <span className={`text-sm font-bold ${isIncluded ? 'text-green-600' : 'text-gray-900'}`}>
                                {isIncluded ? 'Included' : `+AED ${(room.base_price_aed / 1000).toFixed(0)}K`}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <div className="pt-6 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">Total Estimate</p>
                        <p className="text-3xl font-bold text-[#C9A962]">
                          AED {(calculateTotal() / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        * Final price subject to site survey and specific requirements
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#C9A962] focus:border-transparent text-lg"
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#C9A962] focus:border-transparent text-lg"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#C9A962] focus:border-transparent text-lg"
                        placeholder="+971 50 123 4567"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Project Timeline & Notes
                      </label>
                      <textarea
                        value={contactInfo.message}
                        onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                        rows={5}
                        className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#C9A962] focus:border-transparent text-lg"
                        placeholder="Tell us about your project timeline, specific requirements, or any questions..."
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
                          alert('Please fill in all required fields')
                          return
                        }
                        
                        try {
                          const response = await fetch(`${BACKEND_URL}/api/package-inquiry/submit`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              customer_name: contactInfo.name,
                              customer_email: contactInfo.email,
                              customer_phone: contactInfo.phone,
                              property_type: propertyType?.title,
                              package_tier: selectedTier?.tier_name,
                              base_price: selectedTier?.base_price_aed,
                              enhancements: selectedEnhancements.map(e => ({
                                id: e.id,
                                name: e.name,
                                category: e.category,
                                type: e.type,
                                price: e.base_price_aed
                              })),
                              brand_selections: Object.values(selectedBrands).map((b: any) => ({
                                brand: b.brand,
                                model: b.model,
                                price_adjustment: b.price_adjustment
                              })),
                              specialty_rooms: selectedRooms.map(r => ({
                                slug: r.slug,
                                name: r.name,
                                price: r.base_price_aed
                              })),
                              included_rooms_count: selectedTier?.included_specialty_count || 0,
                              total_price: calculateTotal(),
                              message: contactInfo.message,
                              source_page: "Package Builder (/package-builder)"
                            })
                          })
                          
                          if (response.ok) {
                            setStep(8)
                          } else {
                            alert('Failed to submit. Please try again.')
                          }
                        } catch (error) {
                          console.error('Submit error:', error)
                          alert('Failed to submit. Please try again.')
                        }
                      }}
                      disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                      className="w-full py-5 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8983F] font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl"
                    >
                      Request Custom Quote
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Our team will contact you within 24 hours with a detailed quote
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 8: Success */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="h-16 w-16 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quote Request Submitted! 🎉
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Thank you for choosing LEXA. Our team will review your custom package and contact you within 24 hours with a detailed quote.
              </p>

              <div className="bg-[#C9A962]/5 rounded-2xl p-8 mb-8">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Your Selected Package</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{propertyType?.title}</p>
                <p className="text-2xl font-bold text-[#C9A962]">{selectedTier?.tier_name} Tier</p>
                <div className="mt-4 pt-4 border-t border-[#C9A962]/20">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Estimated Investment</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white dark:text-white">AED {(calculateTotal() / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/packages'}
                  className="px-8 py-4 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8983F] font-bold text-lg shadow-lg"
                >
                  View All Packages
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 font-bold text-lg"
                >
                  Calculate Another Quote
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-8">
                <p className="text-xs text-gray-500 text-center max-w-2xl mx-auto">
                  * All prices shown are indicative estimates based on typical configurations. 
                  Final pricing depends on property specifications, brand selection, and installation complexity. 
                  Contact us for a detailed, customized quotation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Disclaimer */}
      <PricingDisclaimer variant="light" />
    </div>
  )
}

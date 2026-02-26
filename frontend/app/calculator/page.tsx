'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import { 
  Calculator, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Calendar,
  Save,
  Loader2
} from 'lucide-react'
import { submitCalculator } from '@/lib/calculator-api'
import dynamic from 'next/dynamic'
import { useCms } from '@/hooks/useCms'
import {
  PROJECT_TYPES,
  SOLUTIONS_MATRIX,
  ADDITIONAL_FEATURES,
  CONTROL_PLATFORMS,
  SECURITY_BRANDS,
  LIGHTING_BRANDS,
  LOCATIONS,
  DEFAULT_BUNDLES
} from '@/lib/calculator-data'

const BookingModal = dynamic(() => import('@/components/modals/BookingModal'), { ssr: false })
const TabbyWidget = dynamic(() => import('@/components/TabbyWidget'), { ssr: false })
const RelatedPagesNav = dynamic(() => import('@/components/navigation/RelatedPagesNav'), { ssr: false })
const FloorPlanUploader = dynamic(() => import('@/components/FloorPlanUploader'), { ssr: false })

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function IndustryCalculatorPage() {
  const cms = useCms('page_calculator', null)

  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  
  // Step 1: Project Type
  const [projectType, setProjectType] = useState('')
  
  // Step 2: Sub-category
  const [subCategory, setSubCategory] = useState('')
  
  // Step 3: Project Details
  const [squareFootage, setSquareFootage] = useState('')
  const [numRooms, setNumRooms] = useState('')
  const [numFloors, setNumFloors] = useState('')
  const [constructionStage, setConstructionStage] = useState('')
  
  // Step 4: Solutions
  const [selectedSolutions, setSelectedSolutions] = useState<Record<string, string>>({})
  
  // Step 5: Feature levels (handled in step 4)
  
  // Step 6: Brands
  const [controlPlatform, setControlPlatform] = useState('')
  const [securityBrand, setSecurityBrand] = useState('')
  const [lightingBrand, setLightingBrand] = useState('')
  
  // Step 7: Timeline & Budget
  const [timeline, setTimeline] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  
  // Step 8: Location & Contact
  const [emirate, setEmirate] = useState('')
  const [city, setCity] = useState('')
  const [propertyName, setPropertyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactCompany, setContactCompany] = useState('')
  const [contactRole, setContactRole] = useState('')

  // Privilege card discount
  const [privilegeCard, setPrivilegeCard] = useState('')
  
  // Floor plan
  const [floorPlanImage, setFloorPlanImage] = useState('')
  const [floorPlanAnnotations, setFloorPlanAnnotations] = useState<any[]>([])
  
  // Step 9: Additional Features
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  
  // Results
  const [totalCost, setTotalCost] = useState(0)
  const [breakdown, setBreakdown] = useState<any[]>([])
  const [estimatedTimeline, setEstimatedTimeline] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submissionId, setSubmissionId] = useState('')
  const [showBookingModal, setShowBookingModal] = useState(false)

  // NEW: Enhancement states
  const [liveEstimate, setLiveEstimate] = useState({ min: 0, max: 0 })
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [savedProjectName, setSavedProjectName] = useState('')
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  // Dynamic pricing from API
  const [pricingLoading, setPricingLoading] = useState(true)
  const [dynamicSolutions, setDynamicSolutions] = useState<Record<string, any[]>>({})
  const [dynamicAdditionalFeatures, setDynamicAdditionalFeatures] = useState<any[]>([])
  const [dynamicPackageBundles, setDynamicPackageBundles] = useState<any[]>([])

  // Load pricing from API on mount
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const [solutionsRes, featuresRes, bundlesRes] = await Promise.all([
          fetch(`${API_URL}/api/pricing/calculator-solutions`),
          fetch(`${API_URL}/api/pricing/additional-features`),
          fetch(`${API_URL}/api/pricing/package-bundles`)
        ])
        
        if (solutionsRes.ok) {
          const data = await solutionsRes.json()
          setDynamicSolutions(data)
        }
        if (featuresRes.ok) {
          const data = await featuresRes.json()
          setDynamicAdditionalFeatures(data)
        }
        if (bundlesRes.ok) {
          const data = await bundlesRes.json()
          setDynamicPackageBundles(data)
        }
      } catch (error) {
        console.error('Failed to load pricing:', error)
      } finally {
        setPricingLoading(false)
      }
    }
    loadPricing()
  }, [])

  // Use dynamic pricing if available, otherwise fall back to hardcoded
  const currentSolutions = useMemo(() => {
    if (dynamicSolutions[projectType] && dynamicSolutions[projectType].length > 0) {
      // Transform API format to component format
      return dynamicSolutions[projectType].map((sol: any) => ({
        ...sol,
        levels: sol.levels.map((lvl: any) => ({
          ...lvl,
          price: lvl.price_min // Use min price for display, show range in UI
        }))
      }))
    }
    // Fall back to hardcoded SOLUTIONS_MATRIX
    return SOLUTIONS_MATRIX[projectType as keyof typeof SOLUTIONS_MATRIX] || []
  }, [projectType, dynamicSolutions])

  const currentAdditionalFeatures = useMemo(() => {
    if (dynamicAdditionalFeatures.length > 0) {
      return dynamicAdditionalFeatures.map((f: any) => ({
        ...f,
        price: f.price_min // Use min price
      }))
    }
    return ADDITIONAL_FEATURES
  }, [dynamicAdditionalFeatures])

  // Package bundles from API or fallback
  const PACKAGE_BUNDLES: Record<string, { 
    name: string, 
    description: string, 
    solutions: Record<string, string>,
    features: string[],
    priceRange: string,
    bestFor: string 
  }> = useMemo(() => {
    if (dynamicPackageBundles.length > 0) {
      const bundles: Record<string, any> = {}
      dynamicPackageBundles.forEach((b: any) => {
        bundles[b.id] = {
          name: b.name,
          description: b.description,
          solutions: b.solutions,
          features: b.features,
          priceRange: b.price_range,
          bestFor: b.best_for
        }
      })
      return bundles
    }
    // Fallback to imported defaults
    return DEFAULT_BUNDLES
  }, [dynamicPackageBundles])

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedProgress = localStorage.getItem('lexa_calculator_progress')
    setHasSavedProgress(!!savedProgress)
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress)
        if (data.projectType) setProjectType(data.projectType)
        if (data.subCategory) setSubCategory(data.subCategory)
        if (data.squareFootage) setSquareFootage(data.squareFootage)
        if (data.numRooms) setNumRooms(data.numRooms)
        if (data.numFloors) setNumFloors(data.numFloors)
        if (data.constructionStage) setConstructionStage(data.constructionStage)
        if (data.selectedSolutions) setSelectedSolutions(data.selectedSolutions)
        if (data.timeline) setTimeline(data.timeline)
        if (data.budgetRange) setBudgetRange(data.budgetRange)
        if (data.additionalFeatures) setAdditionalFeatures(data.additionalFeatures)
        if (data.step && data.step > 1) setStep(data.step)
      } catch (e) {
        console.error('Failed to load saved progress:', e)
      }
    }
  }, [])

  // Save progress on changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (step > 1) {
      const progressData = {
        projectType, subCategory, squareFootage, numRooms, numFloors,
        constructionStage, selectedSolutions, timeline, budgetRange,
        additionalFeatures, step, savedAt: new Date().toISOString()
      }
      localStorage.setItem('lexa_calculator_progress', JSON.stringify(progressData))
    }
  }, [projectType, subCategory, squareFootage, numRooms, numFloors, constructionStage, selectedSolutions, timeline, budgetRange, additionalFeatures, step])

  const currentProjectType = PROJECT_TYPES.find(pt => pt.id === projectType)

  const calculateTotal = useCallback(() => {
    let total = 0
    const items: any[] = []
    
    // Size multiplier
    const size = parseInt(squareFootage) || 0
    const sizeMultiplier = size > 10000 ? 1.4 : size > 5000 ? 1.3 : size > 3000 ? 1.15 : 1
    
    // Solutions cost
    Object.entries(selectedSolutions).forEach(([solutionId, level]) => {
      const solution = currentSolutions.find(s => s.id === solutionId)
      if (solution && level) {
        const levelData = solution.levels.find(l => l.id === level)
        const systemCost = (levelData?.price || solution.basePrice) * sizeMultiplier
        total += systemCost
        items.push({
          name: `${solution.label} (${levelData?.label || level})`,
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
    if (constructionStage === 'retrofit') {
      const retrofitCost = total * 0.25
      total += retrofitCost
      items.push({
        name: 'Retrofit Installation Premium',
        cost: retrofitCost
      })
    }
    
    // Timeline estimation
    const systemCount = Object.keys(selectedSolutions).length
    const baseTimeline = projectType === 'residential' ? 12 : projectType === 'commercial-office' ? 16 : 20
    const timelineCalc = baseTimeline + (systemCount * 2) + (size > 10000 ? 8 : size > 5000 ? 4 : 0)
    
    setTotalCost(total)
    setBreakdown(items)
    setEstimatedTimeline(timelineCalc)
  }, [squareFootage, selectedSolutions, currentSolutions, additionalFeatures, constructionStage, projectType])

  useEffect(() => {
    if (step === 10) {
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

  // NEW: Format price as range (e.g., "AED 50K-75K")
  const formatPriceRange = (basePrice: number) => {
    const minPrice = basePrice
    const maxPrice = Math.round(basePrice * 1.5)
    
    const formatK = (n: number) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
      if (n >= 1000) return `${Math.round(n / 1000)}K`
      return n.toString()
    }
    
    return `AED ${formatK(minPrice)}-${formatK(maxPrice)}`
  }

  // NEW: Calculate live estimate as user selects solutions
  const calculateLiveEstimate = useCallback(() => {
    if (!projectType || Object.keys(selectedSolutions).length === 0) {
      setLiveEstimate({ min: 0, max: 0 })
      return
    }

    const projectSolutions = SOLUTIONS_MATRIX[projectType as keyof typeof SOLUTIONS_MATRIX] || []
    let baseTotal = 0

    for (const [solutionId, levelId] of Object.entries(selectedSolutions)) {
      const solution = projectSolutions.find((s: any) => s.id === solutionId)
      if (solution) {
        const level = solution.levels.find((l: any) => l.id === levelId)
        if (level) {
          baseTotal += level.price
        }
      }
    }

    // Add additional features
    for (const featureId of additionalFeatures) {
      const feature = ADDITIONAL_FEATURES.find(f => f.id === featureId)
      if (feature) {
        baseTotal += feature.price
      }
    }

    // Apply area multiplier
    const area = parseInt(squareFootage) || 0
    let areaMultiplier = 1.0
    if (area > 10000) areaMultiplier = 1.3
    else if (area > 5000) areaMultiplier = 1.2
    else if (area > 2000) areaMultiplier = 1.1

    // Apply construction stage multiplier
    let stageMultiplier = 1.0
    if (constructionStage === 'retrofit') stageMultiplier = 1.4
    else if (constructionStage === 'renovation') stageMultiplier = 1.3
    else if (constructionStage === 'under-construction') stageMultiplier = 1.1

    const minEstimate = Math.round(baseTotal * areaMultiplier * stageMultiplier)
    const maxEstimate = Math.round(minEstimate * 1.5)

    setLiveEstimate({ min: minEstimate, max: maxEstimate })
  }, [projectType, selectedSolutions, additionalFeatures, squareFootage, constructionStage])

  // Update live estimate when relevant values change
  useEffect(() => {
    calculateLiveEstimate()
  }, [calculateLiveEstimate])

  // NEW: Check if estimate fits within selected budget
  const getBudgetFitStatus = () => {
    if (!budgetRange || liveEstimate.min === 0) return { status: 'unknown', percent: 0 }
    
    const budgetRanges: Record<string, { min: number, max: number }> = {
      'under-50k': { min: 0, max: 50000 },
      '50k-100k': { min: 50000, max: 100000 },
      '100k-250k': { min: 100000, max: 250000 },
      '250k-500k': { min: 250000, max: 500000 },
      '500k+': { min: 500000, max: 2000000 },
      'no-say': { min: 0, max: 10000000 }
    }
    
    const budget = budgetRanges[budgetRange]
    if (!budget) return { status: 'unknown', percent: 0 }
    
    const avgEstimate = (liveEstimate.min + liveEstimate.max) / 2
    const percent = Math.min(100, Math.round((avgEstimate / budget.max) * 100))
    
    if (avgEstimate <= budget.max) {
      return { status: 'fits', percent }
    } else if (avgEstimate <= budget.max * 1.2) {
      return { status: 'slightly-over', percent: Math.min(100, percent) }
    } else {
      return { status: 'over', percent: 100 }
    }
  }

  // NEW: Apply bundle to selections
  const applyBundle = (bundleId: string) => {
    const bundle = PACKAGE_BUNDLES[bundleId]
    if (!bundle) return
    
    setSelectedBundle(bundleId)
    setSelectedSolutions(bundle.solutions)
    setAdditionalFeatures(bundle.features)
  }

  // NEW: Clear saved progress
  const clearSavedProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lexa_calculator_progress')
    }
    setHasSavedProgress(false)
    setStep(1)
    setProjectType('')
    setSubCategory('')
    setSquareFootage('')
    setNumRooms('')
    setNumFloors('')
    setConstructionStage('')
    setSelectedSolutions({})
    setTimeline('')
    setBudgetRange('')
    setAdditionalFeatures([])
    setSelectedBundle(null)
  }

  const nextStep = async () => {
    // If moving from step 9 to 10, submit to backend
    if (step === 9) {
      setSubmitting(true)
      setSubmitError('')
      
      try {
        const submissionData = {
          project_type: projectType,
          sub_category: subCategory,
          total_area: parseInt(squareFootage),
          num_rooms: parseInt(numRooms),
          num_floors: parseInt(numFloors),
          construction_stage: constructionStage,
          selected_solutions: selectedSolutions,
          control_platform: controlPlatform,
          security_brand: securityBrand,
          lighting_system: lightingBrand,
          timeline: timeline,
          budget_range: budgetRange,
          emirate: emirate,
          city: city,
          property_name: propertyName,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          contact_company: contactCompany,
          contact_role: contactRole,
          additional_features: additionalFeatures,
          privilege_card: privilegeCard,
        }
        
        const response = await submitCalculator(submissionData)
        
        // Track calculator submission
        const { trackCalculatorEvent } = await import('@/hooks/useAnalytics')
        await trackCalculatorEvent('submit', step, projectType, response.total_cost, {
          sub_category: subCategory,
          square_footage: squareFootage,
          num_rooms: numRooms
        })
        
        // Update state with real backend data
        setTotalCost(response.total_cost)
        setBreakdown(response.cost_breakdown)
        setEstimatedTimeline(response.estimated_timeline_weeks)
        setSubmissionId(response.id)
        
        setStep(10)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error: any) {
        const { trackCalculatorEvent } = await import('@/hooks/useAnalytics')
        await trackCalculatorEvent('submit', step, projectType, 0, { error: true })
        setSubmitError(error.message || 'Failed to submit calculator. Please try again.')
        console.error('Calculator submission error:', error)
      } finally {
        setSubmitting(false)
      }
    } else {
      setStep(Math.min(step + 1, 10))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const prevStep = () => {
    setStep(Math.max(step - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const canProceed = () => {
    if (step === 1) return projectType !== ''
    if (step === 2) return subCategory !== ''
    if (step === 3) return squareFootage && numRooms && constructionStage
    if (step === 4) return Object.keys(selectedSolutions).length > 0
    if (step === 5) return true // Brands optional
    if (step === 6) return timeline && budgetRange
    if (step === 7) return emirate && contactName && contactEmail && contactPhone
    if (step === 8) return true // Additional features optional
    return true
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
              PROJECT CALCULATOR
            </h1>
            
            <p className="text-xl text-gray-300">
              Industry-standard estimation tool for smart building automation
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar - Below main navigation */}
      <div className="bg-white border-b sticky top-16 sm:top-18 md:top-20 z-40">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto py-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    s === step ? 'bg-black text-white scale-110' : 
                    s < step ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {s < step ? <CheckCircle2 size={16} /> : s}
                  </div>
                  {s < 10 && (
                    <div className={`h-1 flex-1 mx-1 transition-all ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="hidden sm:flex justify-between mt-2 px-1">
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Type</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Sub</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Details</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Solutions</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Brands</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Timeline</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Location</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Extras</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Review</span>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">Results</span>
            </div>
            {/* Mobile: Show current step name only */}
            <div className="sm:hidden text-center mt-2">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">
                Step {step} of 10: {['Project Type', 'Sub Category', 'Property Details', 'Solutions', 'Brands', 'Timeline', 'Location', 'Extras', 'Review', 'Results'][step - 1]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {/* STEP 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Resume Saved Progress Banner */}
                  {hasSavedProgress && projectType === '' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Save className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">You have saved progress</div>
                          <div className="text-sm text-blue-700">Continue where you left off</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearSavedProgress}
                          className="text-blue-700 border-blue-300"
                        >
                          Start Fresh
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (typeof window === 'undefined') return
                            const saved = localStorage.getItem('lexa_calculator_progress')
                            if (saved) {
                              const data = JSON.parse(saved)
                              if (data.projectType) setProjectType(data.projectType)
                              if (data.subCategory) setSubCategory(data.subCategory)
                              if (data.squareFootage) setSquareFootage(data.squareFootage)
                              if (data.numRooms) setNumRooms(data.numRooms)
                              if (data.numFloors) setNumFloors(data.numFloors)
                              if (data.constructionStage) setConstructionStage(data.constructionStage)
                              if (data.selectedSolutions) setSelectedSolutions(data.selectedSolutions)
                              if (data.timeline) setTimeline(data.timeline)
                              if (data.budgetRange) setBudgetRange(data.budgetRange)
                              if (data.additionalFeatures) setAdditionalFeatures(data.additionalFeatures)
                              if (data.step) setStep(data.step)
                            }
                          }}
                          className="bg-blue-600 text-white"
                        >
                          Resume Progress
                        </Button>
                      </div>
                    </div>
                  )}

                  <h2 className="text-3xl font-bold mb-8">Select Your Project Type</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`p-6 border-2 rounded-lg transition-all text-left ${
                          projectType === type.id
                            ? 'border-black bg-gray-50 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <type.icon className="w-10 h-10 mb-3" />
                        <div className="font-semibold text-lg mb-1">{type.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{type.description}</div>
                      </button>
                    ))}
                  </div>

                  {/* Link to Smart Project Builder */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-purple-900 mb-1">Looking for Feature-by-Feature Selection?</h3>
                          <p className="text-sm text-purple-700">
                            Our Smart Project Builder offers detailed Must-Have, Should-Have, and Nice-to-Have feature selection
                          </p>
                        </div>
                        <Button
                          onClick={() => window.location.href = '/project-builder/smart'}
                          variant="outline"
                          className="border-purple-300 text-purple-700 hover:bg-purple-100 px-6 py-2 whitespace-nowrap"
                        >
                          Try Smart Builder →
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Sub-Category */}
              {step === 2 && currentProjectType && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-8">Select {currentProjectType.label} Type</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProjectType.subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSubCategory(sub.id)}
                        className={`p-6 border-2 rounded-lg transition-all text-left ${
                          subCategory === sub.id
                            ? 'border-black bg-gray-50 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold text-lg">{sub.label}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Project Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-8">Project Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
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

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Number of Rooms/Zones *
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 8"
                        value={numRooms}
                        onChange={(e) => setNumRooms(e.target.value)}
                        className="text-lg py-6"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Number of Floors
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 2"
                        value={numFloors}
                        onChange={(e) => setNumFloors(e.target.value)}
                        className="text-lg py-6"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Construction Stage *
                      </label>
                      <select
                        value={constructionStage}
                        onChange={(e) => setConstructionStage(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg text-base focus:outline-none focus:border-black"
                      >
                        <option value="">Select stage</option>
                        <option value="new">New Construction</option>
                        <option value="renovation">Major Renovation</option>
                        <option value="retrofit">Retrofit / Existing Property</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Solutions Selection */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-2">
                    Select Solutions ({Object.keys(selectedSolutions).length} selected)
                  </h2>

                  {/* Live Estimate Preview */}
                  {liveEstimate.min > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">Live Estimate</div>
                          <div className="text-2xl font-bold text-green-800">
                            AED {Math.round(liveEstimate.min / 1000)}K - {Math.round(liveEstimate.max / 1000)}K
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-green-600">Updates as you select</div>
                          {budgetRange && budgetRange !== 'no-say' && (
                            <div className={`text-sm font-medium mt-1 ${
                              getBudgetFitStatus().status === 'fits' ? 'text-green-600' :
                              getBudgetFitStatus().status === 'slightly-over' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {getBudgetFitStatus().status === 'fits' ? '✓ Within budget' :
                               getBudgetFitStatus().status === 'slightly-over' ? '⚠ Slightly over budget' : '✗ Over budget'}
                            </div>
                          )}
                        </div>
                      </div>
                      {budgetRange && budgetRange !== 'no-say' && (
                        <div className="mt-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                getBudgetFitStatus().status === 'fits' ? 'bg-green-500' :
                                getBudgetFitStatus().status === 'slightly-over' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${getBudgetFitStatus().percent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Package Bundles - Quick Select */}
                  {projectType === 'residential' && Object.keys(selectedSolutions).length === 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xl">⚡</span> Quick Start Packages
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Recommended</span>
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(PACKAGE_BUNDLES)
                          .filter(([id]) => id !== 'smart-office')
                          .map(([id, bundle]) => (
                          <button
                            key={id}
                            onClick={() => applyBundle(id)}
                            className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-lg ${
                              selectedBundle === id ? 'border-black bg-gray-50' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                            }`}
                          >
                            <div className="font-bold text-lg mb-1">{bundle.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{bundle.description}</div>
                            <div className="text-xl font-bold text-green-600 mb-2">{bundle.priceRange}</div>
                            <div className="text-xs text-gray-500">Best for: {bundle.bestFor}</div>
                          </button>
                        ))}
                      </div>
                      <div className="text-center mt-3 text-sm text-gray-500">
                        Or customize your selection below ↓
                      </div>
                    </div>
                  )}

                  {/* Commercial bundles */}
                  {projectType === 'commercial-office' && Object.keys(selectedSolutions).length === 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xl">⚡</span> Quick Start Package
                      </h3>
                      <button
                        onClick={() => applyBundle('smart-office')}
                        className={`w-full p-4 border-2 rounded-xl text-left transition-all hover:shadow-lg ${
                          selectedBundle === 'smart-office' ? 'border-black bg-gray-50' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-lg mb-1">{PACKAGE_BUNDLES['smart-office'].name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{PACKAGE_BUNDLES['smart-office'].description}</div>
                            <div className="text-xs text-gray-500">Best for: {PACKAGE_BUNDLES['smart-office'].bestFor}</div>
                          </div>
                          <div className="text-xl font-bold text-green-600">{PACKAGE_BUNDLES['smart-office'].priceRange}</div>
                        </div>
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {currentSolutions.map((solution) => (
                      <div
                        key={solution.id}
                        className={`border-2 rounded-lg overflow-hidden transition-all ${
                          selectedSolutions[solution.id]
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{solution.label}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Starting from {formatPriceRange(solution.levels[0].price)}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={!!selectedSolutions[solution.id]}
                              onChange={(e) => {
                                const newSolutions = { ...selectedSolutions }
                                if (e.target.checked) {
                                  newSolutions[solution.id] = solution.levels[0].id
                                } else {
                                  delete newSolutions[solution.id]
                                }
                                setSelectedSolutions(newSolutions)
                                setSelectedBundle(null) // Clear bundle when manually selecting
                              }}
                              className="w-6 h-6 mt-1"
                            />
                          </div>

                          {selectedSolutions[solution.id] && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t">
                              {solution.levels.map((level) => (
                                <button
                                  key={level.id}
                                  onClick={() => {
                                    setSelectedSolutions({
                                      ...selectedSolutions,
                                      [solution.id]: level.id
                                    })
                                    setSelectedBundle(null)
                                  }}
                                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                                    selectedSolutions[solution.id] === level.id
                                      ? 'border-black bg-white dark:bg-gray-800 shadow-md'
                                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                                  }`}
                                >
                                  <div className="font-semibold text-sm mb-2">{level.label}</div>
                                  <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">
                                    {formatPriceRange(level.price)}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Brand Preferences */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-6">Brand & Protocol Preferences</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Optional: Select your preferred brands or skip this step</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Control Platform
                      </label>
                      <select
                        value={controlPlatform}
                        onChange={(e) => setControlPlatform(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">Select platform</option>
                        {CONTROL_PLATFORMS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Security Brand
                      </label>
                      <select
                        value={securityBrand}
                        onChange={(e) => setSecurityBrand(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">Select brand</option>
                        {SECURITY_BRANDS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Lighting System
                      </label>
                      <select
                        value={lightingBrand}
                        onChange={(e) => setLightingBrand(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">Select system</option>
                        {LIGHTING_BRANDS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Timeline & Budget */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-8">Timeline & Budget</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Desired Timeline *
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (Less than 2 months)</option>
                        <option value="3-6">3-6 months</option>
                        <option value="6-12">6-12 months</option>
                        <option value="12+">12+ months / Phased</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Budget Range *
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-50k">Under AED 50K</option>
                        <option value="50k-100k">AED 50K - 100K</option>
                        <option value="100k-250k">AED 100K - 250K</option>
                        <option value="250k-500k">AED 250K - 500K</option>
                        <option value="500k+">AED 500K+</option>
                        <option value="no-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {/* Privilege Card Section */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-semibold mb-4">Special Discounts</h3>
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                        Government Privilege Card (Optional)
                      </label>
                      <select
                        value={privilegeCard}
                        onChange={(e) => setPrivilegeCard(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                      >
                        <option value="">None</option>
                        <option value="esaad">Esaad Card (10% Discount)</option>
                        <option value="fazaa">Fazaa Card (10% Discount)</option>
                        <option value="corporate">Corporate Partner (Negotiable)</option>
                      </select>
                      {privilegeCard && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Discount will be applied to your final quote
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 7: Location & Contact */}
              {step === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold mb-8">Location & Contact Details</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                          Emirate *
                        </label>
                        <select
                          value={emirate}
                          onChange={(e) => {
                            setEmirate(e.target.value)
                            setCity('')
                          }}
                          className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                        >
                          <option value="">Select emirate</option>
                          {Object.keys(LOCATIONS).map(em => (
                            <option key={em} value={em}>{em}</option>
                          ))}
                        </select>
                      </div>

                      {emirate && (
                        <div>
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            City/Area
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                          >
                            <option value="">Select city/area</option>
                            {LOCATIONS[emirate as keyof typeof LOCATIONS]?.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                          Property Name / Address (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="Building or property name"
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                          className="text-base py-3"
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6 mt-8">
                      <h3 className="text-xl font-semibold mb-4">Your Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="text-base py-3"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            Email *
                          </label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="text-base py-3"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            Phone *
                          </label>
                          <Input
                            type="tel"
                            placeholder="+971 XX XXX XXXX"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="text-base py-3"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            Company (Optional)
                          </label>
                          <Input
                            type="text"
                            placeholder="Company name"
                            value={contactCompany}
                            onChange={(e) => setContactCompany(e.target.value)}
                            className="text-base py-3"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                            Your Role
                          </label>
                          <select
                            value={contactRole}
                            onChange={(e) => setContactRole(e.target.value)}
                            className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
                          >
                            <option value="">Select your role</option>
                            <option value="owner">Property Owner</option>
                            <option value="developer">Developer</option>
                            <option value="architect">Architect / Designer</option>
                            <option value="facility-manager">Facility Manager</option>
                            <option value="contractor">Contractor</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 8: Additional Features */}
              {step === 8 && (
                <motion.div
                  key="step8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6">
                    Additional Features ({additionalFeatures.length} selected)
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Optional: Enhance your smart home with these features or skip to see results
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-semibold flex-1">{feature.label}</div>
                          {additionalFeatures.includes(feature.id) && (
                            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-700 dark:text-gray-300 dark:text-gray-300">
                          +{formatCurrency(feature.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Floor Plan Upload */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-semibold mb-2">Upload Floor Plan (Optional)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Mark exact locations where you want smart devices installed</p>
                    <FloorPlanUploader
                      onSave={(imageUrl, annotations) => {
                        setFloorPlanImage(imageUrl)
                        setFloorPlanAnnotations(annotations)
                      }}
                      initialImage={floorPlanImage}
                      initialAnnotations={floorPlanAnnotations}
                    />
                  </div>

                </motion.div>
              )}

              {/* STEP 9: Review */}
              {step === 9 && (
                <motion.div
                  key="step9"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6">Review Your Selections</h2>

                  <div className="bg-gray-50 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">Project Type</div>
                      <div className="text-lg">{currentProjectType?.label} - {subCategory}</div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">Area</div>
                      <div className="text-lg">{squareFootage} sq ft • {numRooms} rooms</div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">Selected Solutions</div>
                      <div className="text-lg">{Object.keys(selectedSolutions).length} systems selected</div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">Timeline</div>
                      <div className="text-lg">{timeline}</div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">Location</div>
                      <div className="text-lg">{emirate}{city ? `, ${city}` : ''}</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Ready to see your estimate?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Click &quot;View Results&quot; to see your detailed project estimate with itemized breakdown, timeline, and next steps.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 10: Results */}
              {step === 10 && (
                <motion.div
                  key="step10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Success Message */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                    <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">Submission Successful!</h3>
                    <p className="text-green-700">
                      We&apos;ve received your request and sent a confirmation email to <strong>{contactEmail}</strong>
                    </p>
                    {submissionId && (
                      <p className="text-sm text-green-600 mt-2">
                        Reference ID: <code className="bg-green-100 px-2 py-1 rounded">{submissionId}</code>
                      </p>
                    )}
                  </div>

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                      <Sparkles size={32} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-3">Your Custom Estimate</h2>
                    <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Based on your selections, here&apos;s your detailed project estimate</p>
                  </div>

                  {/* Total Cost Card */}
                  <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-8 mb-6">
                    <div className="text-center">
                      <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Estimated Total Investment</div>
                      <div className="text-5xl font-bold mb-4">{formatCurrency(totalCost)}</div>
                      <div className="flex items-center justify-center gap-8 text-sm">
                        <div>
                          <span className="text-gray-400">Timeline:</span> <span className="font-semibold">{estimatedTimeline} weeks</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Systems:</span> <span className="font-semibold">{Object.keys(selectedSolutions).length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Cost Breakdown</h3>
                    <div className="space-y-3">
                      {breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800">
                          <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{item.name}</span>
                          <span className={`font-semibold ${item.cost < 0 ? 'text-green-600' : ''}`}>{formatCurrency(item.cost)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financing Options */}
                  <div className="mb-6">
                    <TabbyWidget totalAmount={totalCost} />
                  </div>

                  {/* Next Steps */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3">Next Steps</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Our team will contact you within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Free site survey and detailed proposal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Flexible payment plans available</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-4">
                    <div className="flex gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-black text-white px-8 py-6 text-lg hover:bg-gray-800"
                        onClick={() => {
                          if (submissionId) {
                            const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
                            window.open(`${API_URL}/api/calculator/submission/${submissionId}/pdf`, '_blank')
                          }
                        }}
                        disabled={!submissionId}
                      >
                        Download PDF Quote
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-black px-8 py-6 text-lg"
                        onClick={() => {
                          setStep(1)
                          setSubmissionId('')
                          setSubmitError('')
                        }}
                      >
                        Start New Estimate
                      </Button>
                    </div>
                    
                    {/* WhatsApp Share */}
                    <div className="text-center space-y-3">
                      <Button
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 w-full md:w-auto"
                        onClick={() => {
                          const message = `Hi LEXA! I just received my smart home quote (ID: ${submissionId?.slice(0, 8)}) for AED ${totalCost.toLocaleString()}. I'd like to discuss the next steps.`
                          const whatsappUrl = `https://wa.me/00971554452224?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, '_blank')
                        }}
                      >
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Get Quote on WhatsApp
                      </Button>
                      
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 w-full md:w-auto"
                        onClick={() => setShowBookingModal(true)}
                      >
                        <Calendar className="w-6 h-6 mr-2" />
                        Schedule Site Visit
                      </Button>
                      
                      <p className="text-sm text-gray-500">Get personalized assistance from our team</p>
                    </div>
                  </div>

                  {/* Link to Smart Project Builder */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 mt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-purple-900 mb-1">Want More Control?</h3>
                        <p className="text-sm text-purple-700">
                          Try our Smart Project Builder for a detailed, feature-by-feature customization experience
                        </p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/project-builder/smart'}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 whitespace-nowrap"
                      >
                        Open Smart Builder →
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 10 && (
              <div className="space-y-4">
                {/* Error message */}
                {submitError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-700 font-semibold">{submitError}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-12 pt-8 border-t">
                  {step > 1 ? (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={prevStep}
                      className="px-6"
                      disabled={submitting}
                    >
                      <ChevronLeft size={20} className="mr-2" />
                      Back
                    </Button>
                  ) : <div />}

                  <Button
                    size="lg"
                    onClick={nextStep}
                    disabled={!canProceed() || submitting}
                    className="bg-black text-white px-8 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {step === 9 ? 'Submit & View Results' : 'Continue'}
                        <ChevronRight size={20} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        submissionId={submissionId}
        customerName={contactName}
        customerEmail={contactEmail}
      />

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'Solutions Overview',
            description: 'Explore all our smart home and automation solutions.',
            href: '/solutions',
            category: 'Explore'
          },
          {
            title: 'Projects Portfolio',
            description: 'See real installations and get inspired.',
            href: '/projects',
            category: 'Our Work'
          },
          {
            title: 'Experience Centre',
            description: 'Visit our showroom to see technology in action.',
            href: '/experience-centre',
            category: 'Visit Us'
          }
        ]}
        title="Continue Your Journey"
        subtitle="Explore more about LEXA's smart living solutions"
      />

      {/* Pricing Disclaimer */}
      <PricingDisclaimer variant="light" />
    </div>
  )
}

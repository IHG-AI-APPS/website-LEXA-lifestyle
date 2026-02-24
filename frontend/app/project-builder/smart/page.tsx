/**
 * Smart Project Builder - Streamlined Flow
 * Step 1: Project Details - Property info, budget, timeline
 * Step 2: Category Selection - What to automate
 * Step 3: Must-Have Features - Essential requirements (simple checkboxes)
 * Step 4: Should-Have Features - Important features
 * Step 5: Protocol Selection - Wired/Wireless/Hybrid
 * Step 6: System Selection - Control systems
 * Step 7: AI Package - Get personalized recommendation
 * Step 8: Nice-to-Have Upgrades - Upsell after package (with +AED pricing)
 * Step 9: Final Summary - Complete overview and booking
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Wifi,
  Settings,
  CheckCircle2,
  Grid3X3,
  Home,
  ClipboardList,
  Star,
  TrendingUp,
  Gift,
  Package,
  FileCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectDetailsForm, { ProjectDetails } from './components/ProjectDetails'
import CategorySelection from './components/CategorySelection'
import MustHaveSelection from './components/MustHaveSelection'
import ShouldHaveSelection from './components/ShouldHaveSelection'
import ProtocolSelection from '../components/ProtocolSelection'
import SystemSelection from '../components/SystemSelection'
import AIRecommendation from '../components/AIRecommendation'
import NiceToHaveUpgrades from './components/NiceToHaveUpgrades'
import FinalSummary from './components/FinalSummary'

// Step configuration - 9 steps
const BUILDER_STEPS = [
  {
    id: 'project',
    label: 'Project',
    description: 'Tell us about your property',
    icon: ClipboardList,
    color: 'from-slate-500 to-slate-600'
  },
  {
    id: 'categories',
    label: 'Categories',
    description: 'What do you want to automate?',
    icon: Grid3X3,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'must_have',
    label: 'Must-Have',
    description: 'Essential features',
    icon: Star,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'should_have',
    label: 'Should-Have',
    description: 'Important features',
    icon: TrendingUp,
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'protocols',
    label: 'Protocol',
    description: 'Infrastructure type',
    icon: Wifi,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'systems',
    label: 'Systems',
    description: 'Control systems',
    icon: Settings,
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'package',
    label: 'Package',
    description: 'AI recommendation',
    icon: Package,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'upgrades',
    label: 'Upgrades',
    description: 'Nice-to-have extras',
    icon: Gift,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'summary',
    label: 'Summary',
    description: 'Complete overview',
    icon: FileCheck,
    color: 'from-green-500 to-emerald-500'
  }
]

export default function SmartBuilderFlow() {
  const [currentStep, setCurrentStep] = useState('project')
  const [sessionId] = useState(() => `smart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  
  // State for all selections
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mustHaveFeatures, setMustHaveFeatures] = useState<string[]>([])
  const [shouldHaveFeatures, setShouldHaveFeatures] = useState<string[]>([])
  const [protocolType, setProtocolType] = useState('')
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([])
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const [selectedPackage, setSelectedPackage] = useState('')
  const [packagePrice, setPackagePrice] = useState('')
  const [upgradeFeatures, setUpgradeFeatures] = useState<string[]>([])
  const [totalUpgradePrice, setTotalUpgradePrice] = useState(0)

  // Get current step index
  const currentStepIndex = BUILDER_STEPS.findIndex(s => s.id === currentStep)

  // Convert features to the format expected by downstream components
  const getSelectedFeaturesByTier = () => ({
    must_have: mustHaveFeatures,
    should_have: shouldHaveFeatures,
    could_have: upgradeFeatures,
    want_to_have: []
  })

  // Handlers
  const handleProjectDetailsComplete = (details: ProjectDetails) => {
    setProjectDetails(details)
    setCurrentStep('categories')
  }

  const handleCategoriesComplete = (categories: string[]) => {
    setSelectedCategories(categories)
    setCurrentStep('must_have')
  }

  const handleMustHaveComplete = (features: string[]) => {
    setMustHaveFeatures(features)
    setCurrentStep('should_have')
  }

  const handleShouldHaveComplete = (features: string[]) => {
    setShouldHaveFeatures(features)
    setCurrentStep('protocols')
  }

  const handleProtocolsComplete = (type: string, protocols: string[]) => {
    setProtocolType(type)
    setSelectedProtocols(protocols)
    setCurrentStep('systems')
  }

  const handleSystemsComplete = (systems: string[]) => {
    setSelectedSystems(systems)
    setCurrentStep('package')
  }

  const handlePackageComplete = (pkg: string, price?: string) => {
    setSelectedPackage(pkg)
    if (price) setPackagePrice(price)
    setCurrentStep('upgrades')
  }

  const handleUpgradesComplete = (upgrades: string[], upgradePrice: number) => {
    setUpgradeFeatures(upgrades)
    setTotalUpgradePrice(upgradePrice)
    setCurrentStep('summary')
  }

  const handleStartNew = () => {
    // Reset all state and start fresh
    setCurrentStep('project')
    setProjectDetails(null)
    setSelectedCategories([])
    setMustHaveFeatures([])
    setShouldHaveFeatures([])
    setProtocolType('')
    setSelectedProtocols([])
    setSelectedSystems([])
    setSelectedPackage('')
    setPackagePrice('')
    setUpgradeFeatures([])
    setTotalUpgradePrice(0)
  }

  // Navigation
  const goBack = () => {
    const steps = BUILDER_STEPS.map(s => s.id)
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Header - Below main navigation */}
      <div className="bg-white border-b border-gray-200 dark:border-gray-700 sticky top-16 sm:top-18 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Desktop Progress - Compact */}
          <div className="hidden lg:flex items-center justify-between">
            {BUILDER_STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted ? '#10B981' : isActive ? '#000' : '#E5E7EB'
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isActive ? 'ring-4 ring-gray-200' : ''
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </motion.div>
                    <span className={`mt-1 text-xs font-medium text-center ${
                      isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  
                  {index < BUILDER_STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 bg-gray-200 rounded">
                      <motion.div
                        animate={{ width: index < currentStepIndex ? '100%' : '0%' }}
                        className="h-full bg-green-500 rounded"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Progress */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {(() => {
                  const currentStepData = BUILDER_STEPS[currentStepIndex]
                  const Icon = currentStepData.icon
                  return (
                    <>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentStepData.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">
                          Step {currentStepIndex + 1} of {BUILDER_STEPS.length}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white dark:text-white">
                          {currentStepData.label}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/project-builder'}
                className="text-gray-500"
              >
                <Home className="w-4 h-4" />
              </Button>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${((currentStepIndex + 1) / BUILDER_STEPS.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-gray-800 to-black rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentStep === 'project' && (
              <ProjectDetailsForm
                onComplete={handleProjectDetailsComplete}
                initialDetails={projectDetails || undefined}
              />
            )}

            {currentStep === 'categories' && (
              <CategorySelection
                onComplete={handleCategoriesComplete}
                initialSelection={selectedCategories}
              />
            )}

            {currentStep === 'must_have' && (
              <MustHaveSelection
                selectedCategories={selectedCategories}
                onComplete={handleMustHaveComplete}
                onBack={() => setCurrentStep('categories')}
                initialSelection={mustHaveFeatures}
              />
            )}

            {currentStep === 'should_have' && (
              <ShouldHaveSelection
                selectedCategories={selectedCategories}
                mustHaveFeatures={mustHaveFeatures}
                onComplete={handleShouldHaveComplete}
                onBack={() => setCurrentStep('must_have')}
                initialSelection={shouldHaveFeatures}
              />
            )}

            {currentStep === 'protocols' && (
              <ProtocolSelection
                sessionId={sessionId}
                onComplete={handleProtocolsComplete}
                onBack={goBack}
                initialType={protocolType}
                initialProtocols={selectedProtocols}
              />
            )}

            {currentStep === 'systems' && (
              <SystemSelection
                sessionId={sessionId}
                protocolType={protocolType}
                selectedProtocols={selectedProtocols}
                selectedFeatures={getSelectedFeaturesByTier()}
                onComplete={handleSystemsComplete}
                onBack={goBack}
                initialSystems={selectedSystems}
              />
            )}

            {currentStep === 'package' && (
              <AIRecommendation
                sessionId={sessionId}
                selectedFeatures={getSelectedFeaturesByTier()}
                protocolType={protocolType}
                selectedProtocols={selectedProtocols}
                selectedSystems={selectedSystems}
                onComplete={(pkg) => handlePackageComplete(pkg, '')}
                onBack={goBack}
                projectDetails={projectDetails}
              />
            )}

            {currentStep === 'upgrades' && (
              <NiceToHaveUpgrades
                selectedCategories={selectedCategories}
                mustHaveFeatures={mustHaveFeatures}
                shouldHaveFeatures={shouldHaveFeatures}
                selectedPackage={selectedPackage}
                basePrice={packagePrice || 'Contact for pricing'}
                onComplete={handleUpgradesComplete}
                onBack={() => setCurrentStep('package')}
                initialSelection={upgradeFeatures}
              />
            )}

            {currentStep === 'summary' && (
              <FinalSummary
                sessionId={sessionId}
                projectDetails={projectDetails}
                selectedCategories={selectedCategories}
                mustHaveFeatures={mustHaveFeatures}
                shouldHaveFeatures={shouldHaveFeatures}
                protocolType={protocolType}
                selectedProtocols={selectedProtocols}
                selectedSystems={selectedSystems}
                selectedPackage={selectedPackage}
                packagePrice={packagePrice || 'Contact for pricing'}
                upgradeFeatures={upgradeFeatures}
                totalUpgradePrice={totalUpgradePrice}
                onBack={() => setCurrentStep('upgrades')}
                onStartNew={handleStartNew}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Home, 
  Sparkles, 
  Calendar, 
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Check,
  Film,
  Lightbulb,
  Shield,
  Cpu,
  Music,
  Wind,
  Camera,
  Lock
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

export default function VillaDesignerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    property_type: '',
    property_size: '',
    lifestyle_goals: [] as string[],
    timeline: '',
    budget_range: '',
    name: '',
    email: '',
    phone: ''
  })

  const propertyTypes = [
    { id: 'villa', label: 'Private Villa', icon: Home },
    { id: 'penthouse', label: 'Luxury Penthouse', icon: Sparkles },
    { id: 'palace', label: 'Palace / Estate', icon: Home },
    { id: 'yacht', label: 'Superyacht', icon: Home }
  ]

  const propertySizes = [
    { id: 'medium', label: '5,000 - 10,000 sq ft', range: '5,000 - 10,000' },
    { id: 'large', label: '10,000 - 20,000 sq ft', range: '10,000 - 20,000' },
    { id: 'estate', label: '20,000+ sq ft', range: '20,000+' }
  ]

  const lifestyleGoals = [
    { id: 'cinema', label: 'Private Cinema', icon: Film, color: 'from-purple-500 to-pink-500' },
    { id: 'lighting', label: 'Smart Lighting', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
    { id: 'security', label: 'Security Systems', icon: Shield, color: 'from-blue-500 to-cyan-500' },
    { id: 'automation', label: 'Full Automation', icon: Cpu, color: 'from-green-500 to-teal-500' },
    { id: 'audio', label: 'Multi-Room Audio', icon: Music, color: 'from-red-500 to-pink-500' },
    { id: 'climate', label: 'Climate Control', icon: Wind, color: 'from-cyan-500 to-blue-500' },
    { id: 'surveillance', label: 'CCTV & Surveillance', icon: Camera, color: 'from-gray-500 to-slate-600' },
    { id: 'access', label: 'Access Control', icon: Lock, color: 'from-indigo-500 to-purple-500' }
  ]

  const timelines = [
    { id: 'immediate', label: 'Immediate (0-3 months)' },
    { id: 'planning', label: 'Planning Phase (3-6 months)' },
    { id: 'future', label: 'Future Project (6+ months)' }
  ]

  const budgetRanges = [
    { id: 'tier1', label: 'AED 500K - 1M' },
    { id: 'tier2', label: 'AED 1M - 2M' },
    { id: 'tier3', label: 'AED 2M - 5M' },
    { id: 'tier4', label: 'AED 5M+' }
  ]

  const toggleLifestyleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      lifestyle_goals: prev.lifestyle_goals.includes(goalId)
        ? prev.lifestyle_goals.filter(g => g !== goalId)
        : [...prev.lifestyle_goals, goalId]
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/villa-designer/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsComplete(true)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.property_type && formData.property_size
  const isStep2Valid = formData.lifestyle_goals.length > 0
  const isStep3Valid = formData.timeline && formData.budget_range && formData.name && formData.email && formData.phone

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Thank You, {formData.name}!
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Your system concept will be prepared within 24 hours.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 font-medium mb-2">What&apos;s Next?</p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Our luxury design team will review your requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>We&apos;ll prepare a bespoke system concept tailored to your villa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>A senior consultant will reach out within 24 hours</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => window.location.href = '/'}
              >
                Return to Homepage
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black"
                onClick={() => window.location.href = '/calculator'}
              >
                Explore Calculator
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Design My Villa
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Bespoke smart home systems for discerning clients
          </p>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step === currentStep
                      ? 'bg-white text-black scale-110'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step < currentStep ? <Check size={20} /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-400">
            Step {currentStep} of 3
          </p>
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Property Details</h2>
              <p className="text-gray-400 mb-8">Tell us about your property</p>

              {/* Property Type */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                  Property Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, property_type: type.id })}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.property_type === type.id
                          ? 'border-white bg-white/10 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <type.icon size={32} className="mx-auto mb-2" />
                      <p className="text-sm font-medium">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Size */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                  Property Size
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {propertySizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setFormData({ ...formData, property_size: size.range })}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.property_size === size.range
                          ? 'border-white bg-white/10 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <p className="text-base font-semibold">{size.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className="bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                >
                  Next Step
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Lifestyle Goals</h2>
              <p className="text-gray-400 mb-8">Select all that interest you</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {lifestyleGoals.map((goal) => {
                  const isSelected = formData.lifestyle_goals.includes(goal.id)
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleLifestyleGoal(goal.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-white bg-white/10 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                      <goal.icon size={32} className="mx-auto mb-2" />
                      <p className="text-sm font-medium">{goal.label}</p>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className="bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                >
                  Next Step
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Timeline & Budget</h2>
              <p className="text-gray-400 mb-8">Complete your request</p>

              {/* Timeline */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                  Project Timeline
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline.id}
                      onClick={() => setFormData({ ...formData, timeline: timeline.label })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.timeline === timeline.label
                          ? 'border-white bg-white/10 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <p className="text-sm font-medium">{timeline.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                  Investment Range
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() => setFormData({ ...formData, budget_range: budget.label })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.budget_range === budget.label
                          ? 'border-white bg-white/10 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <p className="text-sm font-medium">{budget.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!isStep3Valid || isSubmitting}
                  className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <Check className="ml-2" size={20} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Home, 
  Shield, 
  Zap, 
  Music, 
  Heart, 
  Smartphone,
  CheckCircle2,
  Brain,
  Star,
  Building2,
  Mail,
  Send,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface LifestylePriority {
  id: string
  name: string
  icon: any
  description: string
  color: string
}

interface AIRecommendation {
  feature_id: string
  feature_title: string
  category: string
  confidence_score: number
  reasoning: string
  iq_points: number
}

const lifestylePriorities: LifestylePriority[] = [
  { 
    id: 'comfort', 
    name: 'Ultimate Comfort', 
    icon: Home, 
    description: 'Climate control, automated blinds, perfect ambiance',
    color: 'blue'
  },
  { 
    id: 'security', 
    name: 'Peace of Mind', 
    icon: Shield, 
    description: 'Advanced security, surveillance, access control',
    color: 'emerald'
  },
  { 
    id: 'energy', 
    name: 'Energy Efficiency', 
    icon: Zap, 
    description: 'Smart energy management, cost savings, sustainability',
    color: 'amber'
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment', 
    icon: Music, 
    description: 'Multi-room audio, home cinema, immersive experiences',
    color: 'gold'
  },
  { 
    id: 'wellness', 
    name: 'Health & Wellness', 
    icon: Heart, 
    description: 'Air quality, circadian lighting, sleep optimization',
    color: 'rose'
  },
  { 
    id: 'convenience', 
    name: 'Smart Convenience', 
    icon: Smartphone, 
    description: 'Voice control, one-touch scenes, effortless living',
    color: 'cyan'
  }
]

const propertyTypes = [
  { id: 'villa', name: 'Villa / Mansion', icon: Home },
  { id: 'apartment', name: 'Apartment / Penthouse', icon: Building2 },
  { id: 'townhouse', name: 'Townhouse', icon: Home }
]

const budgetRanges = [
  { id: 'starter', name: 'Starter', range: 'AED 15,000 - 50,000' },
  { id: 'medium', name: 'Mid-Range', range: 'AED 50,000 - 150,000' },
  { id: 'premium', name: 'Premium', range: 'AED 150,000 - 500,000' },
  { id: 'luxury', name: 'Ultra Luxury', range: 'AED 500,000+' }
]

export default function SmartHomeQuizPage() {
  const cms = useCms('page_smart_home_quiz', null)

  const [step, setStep] = useState(1)
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [propertyType, setPropertyType] = useState<string>('')
  const [budgetRange, setBudgetRange] = useState<string>('')
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [totalAnalyzed, setTotalAnalyzed] = useState(0)
  
  // Save results state
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const [saveName, setSaveName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const togglePriority = (id: string) => {
    if (selectedPriorities.includes(id)) {
      setSelectedPriorities(selectedPriorities.filter(p => p !== id))
    } else if (selectedPriorities.length < 3) {
      setSelectedPriorities([...selectedPriorities, id])
    }
  }

  const getAIRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/intelligence/ai-recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priorities: selectedPriorities,
          property_type: propertyType,
          budget_range: budgetRange
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
        setTotalAnalyzed(data.total_analyzed || 0)
      }
    } catch (error) {
      console.error('Failed to get recommendations:', error)
    } finally {
      setLoading(false)
      setStep(4)
    }
  }

  const saveResults = async () => {
    if (!saveEmail) return
    setSaving(true)
    try {
      // Save to leads API
      const response = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveName || 'Quiz User',
          email: saveEmail,
          phone: '',
          source: 'smart-home-quiz',
          type: 'quiz_results',
          message: `Quiz Results - Priorities: ${selectedPriorities.join(', ')}. Property: ${propertyType}. Budget: ${budgetRange}. Top recommendations: ${recommendations.slice(0, 5).map(r => r.feature_title).join(', ')}`
        })
      })
      
      if (response.ok) {
        setSaved(true)
        setTimeout(() => {
          setShowSaveModal(false)
          setSaved(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to save results:', error)
    } finally {
      setSaving(false)
    }
  }

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-600' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-600' },
      purple: { bg: 'bg-[#C9A962]/5', border: 'border-[#C9A962]', text: 'text-[#C9A962]' },
      rose: { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-600' },
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600' }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white pt-24 pb-12">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=50)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
              AI-Powered Recommendations
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white mb-4">
              Find Your Perfect<br />
              <span className="text-[#C9A962]">Smart Home</span>
            </h1>
            <p className="text-base text-gray-300 max-w-2xl mx-auto">
              Answer a few questions and our AI will recommend the best smart home features for your lifestyle
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress */}
      <div className="container mx-auto max-w-4xl px-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                s < step ? 'bg-blue-600 text-white' :
                s === step ? 'bg-blue-600 text-white ring-4 ring-blue-200' :
                'bg-gray-200 text-gray-500'
              }`}>
                {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              {s < 4 && <div className={`w-16 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 max-w-md mx-auto">
          <span>Priorities</span>
          <span>Property</span>
          <span>Budget</span>
          <span>Results</span>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* Step 1: Lifestyle Priorities */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What matters most to you?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Select up to 3 priorities for your smart home</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {lifestylePriorities.map((priority) => {
                  const Icon = priority.icon
                  const isSelected = selectedPriorities.includes(priority.id)
                  const colors = getColorClasses(priority.color, isSelected)
                  
                  return (
                    <button
                      key={priority.id}
                      onClick={() => togglePriority(priority.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? `${colors.bg} ${colors.border} shadow-md` 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:border-gray-600 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isSelected ? colors.bg : 'bg-gray-100'}`}>
                          <Icon className={`h-6 w-6 ${isSelected ? colors.text : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-bold ${isSelected ? colors.text : 'text-gray-900'}`}>
                              {priority.name}
                            </h3>
                            {isSelected && <CheckCircle2 className={`h-5 w-5 ${colors.text}`} />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{priority.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {selectedPriorities.length}/3 selected
                </span>
                <Button
                  onClick={() => setStep(2)}
                  disabled={selectedPriorities.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Property Type */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What type of property?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">This helps us tailor recommendations to your space</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {propertyTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = propertyType === type.id
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => setPropertyType(type.id)}
                      className={`p-6 rounded-xl border-2 text-center transition-all ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 shadow-md' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-10 w-10 mx-auto mb-3 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      <h3 className={`font-bold ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                        {type.name}
                      </h3>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!propertyType}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What's your budget range?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">We'll recommend features that fit your investment</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {budgetRanges.map((budget) => {
                  const isSelected = budgetRange === budget.id
                  
                  return (
                    <button
                      key={budget.id}
                      onClick={() => setBudgetRange(budget.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 shadow-md' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <h3 className={`font-bold text-lg ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                        {budget.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{budget.range}</p>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={getAIRecommendations}
                  disabled={!budgetRange || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get My Recommendations
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Results Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Your AI Recommendations</h2>
                    <p className="text-blue-100">Analyzed {totalAnalyzed} features based on your preferences</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedPriorities.map((p) => {
                    const priority = lifestylePriorities.find(lp => lp.id === p)
                    return (
                      <span key={p} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {priority?.name}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Top {Math.min(recommendations.length, 10)} Recommended Features
                </h3>
                
                <div className="space-y-4 mb-8">
                  {recommendations.slice(0, 10).map((rec, index) => (
                    <motion.div
                      key={rec.feature_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white dark:text-white">{rec.feature_title}</h4>
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {rec.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{rec.reasoning}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-bold">{Math.round(rec.confidence_score * 100)}%</span>
                        </div>
                        <span className="text-xs text-gray-500">+{rec.iq_points} IQ</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Ready to bring your smart home to life?</h4>
                  
                  {/* Save Results Button */}
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white rounded-xl hover:from-[#A68B4B] hover:to-[#A68B4B] transition-all shadow-lg"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">Save My Results</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Email me a copy</span>
                  </button>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/package-builder" className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6">
                        Build Your Package
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/project-builder/start" className="flex-1">
                      <Button variant="outline" className="w-full py-6 border-2">
                        Start AI Project Builder
                        <Brain className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Or <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link> for a personalized consultation
                  </p>
                </div>
              </div>

              {/* Save Results Modal */}
              <AnimatePresence>
                {showSaveModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowSaveModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {saved ? (
                        <div className="text-center py-8">
                          <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Results Saved!</h3>
                          <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Check your email for your personalized recommendations.</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <Mail className="h-5 w-5 text-[#C9A962]" />
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Save Your Results</h3>
                            </div>
                            <button
                              onClick={() => setShowSaveModal(false)}
                              className="p-1 hover:bg-gray-100 dark:bg-gray-800 rounded-full"
                            >
                              <X className="h-5 w-5 text-gray-500" />
                            </button>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We'll save your quiz results and send you a summary with your top {recommendations.length} recommended features.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name (optional)</label>
                              <input
                                type="text"
                                value={saveName}
                                onChange={(e) => setSaveName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                              <input
                                type="email"
                                required
                                value={saveEmail}
                                onChange={(e) => setSaveEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>
                          
                          <Button
                            onClick={saveResults}
                            disabled={!saveEmail || saving}
                            className="w-full mt-6 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] hover:from-[#A68B4B] hover:to-[#A68B4B] py-6"
                          >
                            {saving ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5" />
                                Save & Email Results
                              </>
                            )}
                          </Button>
                          
                          <p className="text-xs text-gray-500 text-center mt-4">
                            By saving, you agree to receive your results and occasional smart home tips. Unsubscribe anytime.
                          </p>
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Restart */}
              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep(1)
                    setSelectedPriorities([])
                    setPropertyType('')
                    setBudgetRange('')
                    setRecommendations([])
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

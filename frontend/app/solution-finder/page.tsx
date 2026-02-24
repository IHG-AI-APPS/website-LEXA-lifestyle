'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'
import { getSolutions, type Solution } from '@/lib/api'
import { useEffect } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'

interface QuizQuestion {
  id: string
  question: string
  subtitle?: string
  answers: {
    value: string
    label: string
    icon?: string
    description?: string
  }[]
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'property_type',
    question: 'What type of property?',
    subtitle: 'This helps us understand your space',
    answers: [
      { value: 'apartment', label: 'Apartment', icon: '🏢', description: 'Modern urban living' },
      { value: 'villa', label: 'Villa', icon: '🏡', description: 'Spacious luxury home' },
      { value: 'mansion', label: 'Mansion', icon: '🏰', description: 'Premium estate' },
      { value: 'commercial', label: 'Commercial', icon: '🏢', description: 'Office or retail space' },
    ],
  },
  {
    id: 'primary_goal',
    question: 'What matters most to you?',
    subtitle: 'Choose your top priority',
    answers: [
      { value: 'entertainment', label: 'Entertainment', icon: '🎬', description: 'Cinema, audio, immersive experiences' },
      { value: 'security', label: 'Security & Safety', icon: '🔒', description: 'Protection and peace of mind' },
      { value: 'comfort', label: 'Comfort & Ambiance', icon: '✨', description: 'Perfect environment control' },
      { value: 'efficiency', label: 'Efficiency', icon: '⚡', description: 'Energy savings and automation' },
      { value: 'all', label: 'Complete Integration', icon: '🎯', description: 'Everything working together' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'How would you describe your lifestyle?',
    subtitle: 'This helps us personalize recommendations',
    answers: [
      { value: 'family', label: 'Family Focused', icon: '👨‍👩‍👧‍👦', description: 'Comfort, safety, and convenience' },
      { value: 'professional', label: 'Busy Professional', icon: '💼', description: 'Efficiency and remote work needs' },
      { value: 'entertainer', label: 'Social Entertainer', icon: '🎉', description: 'Hosting and impressive experiences' },
      { value: 'tech_enthusiast', label: 'Tech Enthusiast', icon: '🤖', description: 'Latest tech and automation' },
    ],
  },
  {
    id: 'budget',
    question: "What's your investment range?",
    subtitle: 'Transparent pricing, no hidden costs',
    answers: [
      { value: 'entry', label: 'AED 200K - 400K', description: 'Essential systems' },
      { value: 'mid', label: 'AED 400K - 700K', description: 'Premium integration' },
      { value: 'premium', label: 'AED 700K - 1M', description: 'Luxury experience' },
      { value: 'ultra', label: 'AED 1M+', description: 'Ultimate smart living' },
    ],
  },
  {
    id: 'timeline',
    question: 'When are you planning to start?',
    subtitle: 'Helps us prepare the right resources',
    answers: [
      { value: 'immediate', label: 'Ready Now', description: 'Start within 1-2 weeks' },
      { value: 'soon', label: '1-3 Months', description: 'Planning and preparation' },
      { value: 'planning', label: '3-6 Months', description: 'Early planning stage' },
      { value: 'future', label: '6+ Months', description: 'Long-term vision' },
    ],
  },
]

interface QuizResult {
  solution: Solution
  score: number
  matchReasons: string[]
}

export default function SolutionFinderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [recommendations, setRecommendations] = useState<QuizResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load solutions from API
    getSolutions()
      .then(data => {
        setSolutions(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load solutions:', err)
        setIsLoading(false)
      })
  }, [])

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResults()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateResults = () => {
    const results: QuizResult[] = solutions.map(solution => {
      let score = 0
      const matchReasons: string[] = []

      // Match based on primary goal
      const goal = answers.primary_goal
      if (goal === 'entertainment' && (solution.category === 'Entertainment' || solution.slug.includes('theater') || solution.slug.includes('audio'))) {
        score += 30
        matchReasons.push('Perfect for entertainment')
      }
      if (goal === 'security' && solution.slug.includes('security')) {
        score += 30
        matchReasons.push('Enhanced security features')
      }
      if (goal === 'comfort' && (solution.slug.includes('lighting') || solution.slug.includes('climate'))) {
        score += 30
        matchReasons.push('Optimizes comfort and ambiance')
      }
      if (goal === 'efficiency' && (solution.slug.includes('lighting') || solution.slug.includes('climate'))) {
        score += 25
        matchReasons.push('Energy efficient')
      }
      if (goal === 'all') {
        score += 15
        matchReasons.push('Essential for complete integration')
      }

      // Match based on lifestyle
      const lifestyle = answers.lifestyle
      if (lifestyle === 'family' && (solution.slug.includes('security') || solution.slug.includes('lighting'))) {
        score += 20
        matchReasons.push('Great for families')
      }
      if (lifestyle === 'entertainer' && (solution.slug.includes('theater') || solution.slug.includes('audio') || solution.slug.includes('lighting'))) {
        score += 25
        matchReasons.push('Impress your guests')
      }
      if (lifestyle === 'professional' && (solution.slug.includes('networking') || solution.slug.includes('climate'))) {
        score += 20
        matchReasons.push('Supports productivity')
      }
      if (lifestyle === 'tech_enthusiast') {
        score += 15
        matchReasons.push('Cutting-edge technology')
      }

      // Budget considerations
      const budget = answers.budget
      if (budget === 'ultra' || budget === 'premium') {
        score += 10 // All solutions are relevant for premium budgets
      }

      // Property type considerations
      const propertyType = answers.property_type
      if (propertyType === 'mansion' || propertyType === 'villa') {
        if (solution.slug.includes('theater') || solution.slug.includes('audio')) {
          score += 15
          matchReasons.push('Perfect for large spaces')
        }
      }
      if (propertyType === 'commercial' && solution.slug.includes('networking')) {
        score += 25
        matchReasons.push('Essential for business')
      }

      // Base relevance for essential systems
      if (solution.slug.includes('networking')) {
        score += 10 // Networking is always important
      }

      return {
        solution,
        score,
        matchReasons: matchReasons.slice(0, 2), // Top 2 reasons
      }
    })

    // Sort by score and take top 4
    const topRecommendations = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    setRecommendations(topRecommendations)
    setShowResults(true)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setRecommendations([])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading quiz...</div>
      </div>
    )
  }

  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const currentAnswer = answers[currentQuestion?.id]
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-white pt-20">
      {!showResults ? (
        <>
          {/* Header */}
          <section className="py-12 bg-gray-50 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="text-charcoal" size={24} />
                      <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">
                        Solution Finder
                      </span>
                    </div>
                    <h1 className="text-3xl font-semibold">
                      Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                    </h1>
                  </div>
                  {currentStep > 0 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="border-gray-300"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </Button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-charcoal"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Question */}
          <section className="py-20">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] leading-tight mb-4">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.subtitle && (
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                        {currentQuestion.subtitle}
                      </p>
                    )}

                    {/* Answers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentQuestion.answers.map((answer) => (
                        <button
                          key={answer.value}
                          onClick={() => handleAnswer(currentQuestion.id, answer.value)}
                          className={`p-6 border-2 text-left transition-all duration-300 ${
                            currentAnswer === answer.value
                              ? 'border-charcoal bg-gray-50'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {answer.icon && (
                              <div className="text-4xl">{answer.icon}</div>
                            )}
                            <div className="flex-1">
                              <div className="font-medium text-lg mb-1">{answer.label}</div>
                              {answer.description && (
                                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{answer.description}</div>
                              )}
                            </div>
                            {currentAnswer === answer.value && (
                              <CheckCircle2 className="text-charcoal flex-shrink-0" size={24} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    {currentAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12"
                      >
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-7"
                        >
                          {currentStep < QUIZ_QUESTIONS.length - 1 ? (
                            <>
                              Next Question
                              <ArrowRight size={20} className="ml-2" />
                            </>
                          ) : (
                            <>
                              See My Recommendations
                              <Sparkles size={20} className="ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results Page */
        <>
          {/* Results Header */}
          <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-charcoal text-white rounded-full">
                    <Sparkles size={32} strokeWidth={2} />
                  </div>

                  <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                    YOUR PERFECT
                    <br />
                    <span className="text-transparent bg-clip-text metallic-gradient">SOLUTIONS</span>
                  </h1>

                  <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mx-auto mb-8" />

                  <p className="text-xl text-gray-600 dark:text-gray-400 font-normal max-w-2xl mx-auto">
                    Based on your answers, here are the smart living solutions we recommend for you.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section className="py-20">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.solution.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Link href={`/solutions/${rec.solution.slug}`}>
                        <div className="group border-2 border-gray-200 hover:border-charcoal transition-all duration-300 overflow-hidden">
                          {/* Image */}
                          <div className="relative h-64 overflow-hidden">
                            <SafeImage
                              src={rec.solution.image}
                              alt={rec.solution.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%]"
                            />
                            {index === 0 && (
                              <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-white text-xs tracking-wider uppercase">
                                Top Match
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
                              {rec.solution.category}
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">
                              {rec.solution.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {rec.solution.description}
                            </p>

                            {/* Match Reasons */}
                            {rec.matchReasons.length > 0 && (
                              <div className="space-y-2 mb-4">
                                {rec.matchReasons.map((reason, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm text-charcoal">
                                    <CheckCircle2 size={16} />
                                    <span>{reason}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {rec.solution.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs font-mono text-gray-400">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center space-y-6"
                >
                  <div className="glass border border-gray-200 p-8">
                    <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Book a free consultation with our experts to discuss your personalized smart living solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-charcoal hover:bg-charcoal-light text-white px-10 py-6"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Private Design Session
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-gray-300 px-10 py-6"
                        onClick={handleRestart}
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

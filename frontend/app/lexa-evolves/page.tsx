'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Sparkles,
  TrendingUp,
  Brain,
  Users,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function LexaEvolvesPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const evolutionStages = [
    {
      stage: 'Foundation',
      title: 'Your Smart Home Journey Begins',
      description: 'Start with core automation - lighting, climate, security. Build the foundation that will grow with you.',
      features: ['Smart lighting control', 'Climate automation', 'Basic security', 'Voice control'],
      investment: 'AED 50K - 150K'
    },
    {
      stage: 'Enhancement',
      title: 'Expanding Intelligence',
      description: 'Add advanced features as your needs evolve. Entertainment, audio, enhanced security.',
      features: ['Multi-room audio', 'Home cinema', 'Advanced security', 'Energy monitoring'],
      investment: 'AED 100K - 300K'
    },
    {
      stage: 'Integration',
      title: 'Unified Ecosystem',
      description: 'Everything works together seamlessly. Predictive automation, learning algorithms.',
      features: ['AI predictions', 'Unified control', 'Scene automation', 'Wellness integration'],
      investment: 'AED 200K - 500K'
    },
    {
      stage: 'Transformation',
      title: 'Living Intelligence',
      description: 'Your home anticipates needs, optimizes itself, and continuously improves.',
      features: ['Digital twin', 'Full AI automation', 'Predictive maintenance', 'Lifestyle adaptation'],
      investment: 'AED 500K+'
    }
  ]

  const evolutionBenefits = [
    {
      icon: TrendingUp,
      title: 'Incremental Investment',
      description: 'Spread costs over time rather than massive upfront investment. Upgrade as your budget allows.'
    },
    {
      icon: Brain,
      title: 'Learning System',
      description: 'Each addition makes your entire system smarter. AI learns from new devices and patterns.'
    },
    {
      icon: Shield,
      title: 'Future-Proof Design',
      description: 'Architecture designed for expansion. New technologies integrate seamlessly into existing systems.'
    },
    {
      icon: Users,
      title: 'Lifestyle Adaptation',
      description: 'Evolve your home as your family grows, needs change, and new technologies emerge.'
    }
  ]

  const timeline = [
    { year: 'Year 1', focus: 'Core Automation', savings: '20% energy savings' },
    { year: 'Year 2', focus: 'Entertainment & Audio', savings: '30% energy savings' },
    { year: 'Year 3', focus: 'AI Integration', savings: '35% energy savings' },
    { year: 'Year 5', focus: 'Full Intelligence', savings: '40% energy savings + predictive maintenance' }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-violet-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Evolution Philosophy
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                LEXA<br />
                <span className="text-gray-300">Evolves</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Your smart home grows with you. Start with the essentials, expand at your pace, and evolve into a fully intelligent living environment. No rip-and-replace, just continuous enhancement.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] dark:text-white hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Start Your Journey
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Evolution Stages */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-white dark:text-white">
                Four Stages of Evolution
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your smart home journey, from foundation to full intelligence
              </p>
            </motion.div>

            <div className="space-y-8">
              {evolutionStages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-violet-600 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-violet-600">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white dark:text-white">{stage.title}</h3>
                        <span className="text-sm font-semibold text-violet-600 px-3 py-1 bg-violet-50">
                          {stage.stage}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{stage.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {stage.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                        Investment: {stage.investment}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white dark:text-white">
                Why Evolution Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {evolutionBenefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-8 border-l-4 border-violet-600"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-violet-100">
                        <Icon className="h-6 w-6 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white dark:text-white">{benefit.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white dark:text-white">
                Typical Evolution Timeline
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {timeline.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 text-center border-2 border-gray-200 dark:border-gray-700 dark:border-gray-700"
                >
                  <div className="text-3xl font-bold text-violet-600 mb-2">{milestone.year}</div>
                  <div className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">{milestone.focus}</div>
                  <div className="text-sm text-green-600 font-semibold">{milestone.savings}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-violet-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Sparkles className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Start Your Evolution Today
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Begin with what matters most to you. Expand at your pace. Evolve into full intelligence.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] dark:text-white hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Plan Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Hotel,
  Smartphone,
  Thermometer,
  Sun,
  Tv,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function HospitalityAutomationPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const features = [
    {
      icon: Smartphone,
      title: 'Guest Room Control',
      description: 'Intuitive in-room tablets and mobile apps for lighting, climate, curtains, and entertainment control.'
    },
    {
      icon: Thermometer,
      title: 'Personalized Climate',
      description: 'AI-learning thermostats that remember guest preferences and auto-adjust for optimal comfort.'
    },
    {
      icon: Sun,
      title: 'Automated Shading',
      description: 'Motorized curtains and blinds with schedule-based and occupancy-triggered operation.'
    },
    {
      icon: Tv,
      title: 'Entertainment Systems',
      description: 'Integrated IPTV, streaming services, and casting with personalized content recommendations.'
    },
    {
      icon: Shield,
      title: 'Guest Privacy & Security',
      description: 'Smart locks, do-not-disturb sensors, and secure mobile check-in/check-out.'
    },
    {
      icon: Users,
      title: 'Staff Efficiency Tools',
      description: 'Real-time room status, maintenance alerts, and housekeeping optimization dashboard.'
    }
  ]

  const benefits = [
    { metric: '4.8/5', label: 'Average Guest Satisfaction', icon: Star },
    { metric: '35%', label: 'Energy Cost Reduction', icon: DollarSign },
    { metric: '25%', label: 'Staff Efficiency Gain', icon: TrendingUp },
    { metric: '50%', label: 'Faster Room Turnover', icon: CheckCircle2 }
  ]

  const guestJourney = [
    {
      phase: 'Pre-Arrival',
      features: ['Mobile check-in', 'Room preference selection', 'Digital concierge']
    },
    {
      phase: 'Check-In',
      features: ['Keyless entry via mobile', 'Automated welcome scene', 'Temperature pre-set']
    },
    {
      phase: 'During Stay',
      features: ['Personalized room control', 'Voice assistant integration', 'Room service ordering']
    },
    {
      phase: 'Check-Out',
      features: ['Express mobile checkout', 'Automatic billing', 'Feedback collection']
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <Hotel className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Hotels & Resorts
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Luxury Hospitality<br />
                <span className="text-gray-300">Automation</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Elevate guest experiences with intelligent room automation. From personalized climate control to seamless check-in, deliver 5-star comfort while optimizing operations and reducing costs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Schedule Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    Download Brochure
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A]">
                Complete Guest Experience Platform
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Every touchpoint optimized for comfort, convenience, and memorable stays
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-gray-50">
                        <Icon className="h-6 w-6 text-[#1A1A1A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A]">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Guest Journey */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Seamless Guest Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Intelligent automation at every stage of the guest experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guestJourney.map((stage, index) => (
                <motion.div
                  key={stage.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 border-l-4 border-[#1A1A1A]"
                >
                  <div className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    Phase {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">{stage.phase}</h3>
                  <ul className="space-y-2">
                    {stage.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Proven Results for Hospitality
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real impact on guest satisfaction and operational efficiency
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white border-2 border-gray-200"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4 text-[#1A1A1A]" />
                    <div className="text-4xl font-bold mb-2 text-[#1A1A1A]">{benefit.metric}</div>
                    <div className="text-sm text-gray-600">{benefit.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Hotel className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Elevate Guest Experiences?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule a personalized demo and see how automation transforms hospitality operations.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Schedule Demo
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

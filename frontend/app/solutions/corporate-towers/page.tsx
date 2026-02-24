'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Eye,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SafeImage from '@/components/ui/SafeImage'

export default function CorporateTowersPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const features = [
    {
      icon: Users,
      title: 'Smart Workspace Management',
      description: 'Hot desk booking, occupancy tracking, and intelligent space allocation based on real-time usage patterns.'
    },
    {
      icon: Zap,
      title: 'Energy Optimization',
      description: 'AI-powered HVAC and lighting control that reduces energy consumption by 30-40% while maintaining comfort.'
    },
    {
      icon: Shield,
      title: 'Integrated Security',
      description: 'Unified access control, visitor management, and AI surveillance across all building zones.'
    },
    {
      icon: Eye,
      title: 'Workplace Analytics',
      description: 'Real-time insights on space utilization, employee patterns, and environmental quality metrics.'
    },
    {
      icon: BarChart3,
      title: 'BMS Integration',
      description: 'Centralized building management with predictive maintenance and automated system optimization.'
    },
    {
      icon: Clock,
      title: 'Automated Operations',
      description: 'Schedule-based automation for lighting, climate, elevators, and after-hours security protocols.'
    }
  ]

  const benefits = [
    { metric: '30-40%', label: 'Energy Cost Reduction', icon: DollarSign },
    { metric: '25%', label: 'Space Utilization Improvement', icon: TrendingUp },
    { metric: '50%', label: 'Maintenance Cost Savings', icon: Zap },
    { metric: '99.9%', label: 'System Uptime', icon: CheckCircle2 }
  ]

  const caseStudy = {
    title: 'Downtown Dubai Corporate Tower',
    stats: [
      { value: '45%', label: 'Energy savings in first year' },
      { value: 'AED 2.1M', label: 'Annual operational savings' },
      { value: '18 months', label: 'ROI payback period' },
      { value: '500+', label: 'Employees benefiting' }
    ]
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-[#1A1A1A] to-gray-800 text-white py-20 sm:py-32 overflow-hidden">
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
                <Building2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Corporate & Office Buildings
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Intelligent Corporate<br />
                <span className="text-gray-300">Towers & Office Spaces</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transform your corporate tower into a smart, efficient, and sustainable workspace. Our integrated intelligence platform optimizes operations, enhances employee experience, and delivers measurable ROI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Schedule Assessment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    Download Case Study
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Complete Building Intelligence
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed specifically for corporate towers and office buildings
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
                    className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-gray-50 dark:bg-gray-800">
                        <Icon className="h-6 w-6 text-[#1A1A1A] dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-white">
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

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Measurable Business Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real results from our corporate tower implementations across the UAE
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
                    className="text-center p-6 bg-gray-50 dark:bg-gray-800"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4 text-[#1A1A1A] dark:text-white" />
                    <div className="text-4xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{benefit.metric}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{benefit.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Case Study</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {caseStudy.title}
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  A 30-story corporate tower in downtown Dubai implemented our complete intelligence platform, transforming operations and delivering exceptional ROI within the first year.
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Get Similar Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {caseStudy.stats.map((stat, index) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Building2 className="h-16 w-16 mx-auto mb-6 text-[#1A1A1A] dark:text-white" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Ready to Transform Your Corporate Tower?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Schedule a free assessment and discover how much you can save with building intelligence.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Schedule Free Assessment
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

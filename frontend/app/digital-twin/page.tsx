'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Box,
  Brain,
  TrendingUp,
  Zap,
  Eye,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Cpu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function DigitalTwinPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const capabilities = [
    {
      icon: Box,
      title: 'Real-Time 3D Model',
      description: 'Live digital replica of your building with real-time data from every system, sensor, and space.'
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting of energy consumption, equipment failures, and maintenance needs.'
    },
    {
      icon: Eye,
      title: 'Scenario Simulation',
      description: 'Test changes virtually before implementing - from HVAC adjustments to space reconfigurations.'
    },
    {
      icon: RefreshCw,
      title: 'Continuous Learning',
      description: 'System learns from historical data and external factors to optimize operations automatically.'
    },
    {
      icon: BarChart3,
      title: 'Performance Monitoring',
      description: 'Track KPIs, benchmark against standards, and identify improvement opportunities instantly.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Early warning system for potential issues, compliance violations, or security threats.'
    }
  ]

  const benefits = [
    { metric: '30%', label: 'Operational Cost Reduction', icon: TrendingUp },
    { metric: '70%', label: 'Faster Issue Resolution', icon: Zap },
    { metric: '50%', label: 'Reduced Downtime', icon: CheckCircle2 },
    { metric: '3-7 Days', label: 'Failure Prediction', icon: Brain }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <Cpu className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Advanced Concept
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Living<br />
                <span className="text-gray-300">Digital Twin</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                A real-time virtual replica of your building that learns, predicts, and optimizes. Experience the future of building management with AI-powered simulation and predictive analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Schedule Virtual Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    Request Whitepaper
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Next-Generation Building Intelligence
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                More than visualization - a living, learning system that continuously optimizes your building
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-50 to-blue-50">
                        <Icon className="h-6 w-6 text-[#1A1A1A] dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-white">
                          {capability.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Quantifiable Business Value
              </h2>
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
                    className="text-center p-6 bg-gray-50 border-2 border-gray-200 dark:border-gray-700"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4 text-[#1A1A1A] dark:text-white" />
                    <div className="text-4xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{benefit.metric}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-cyan-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Cpu className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Experience Your Building&apos;s Digital Twin?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule an interactive demo and see your building transformed into an intelligent, self-optimizing system.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Schedule Virtual Demo
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

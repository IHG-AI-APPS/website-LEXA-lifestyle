'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  DollarSign,
  TrendingDown,
  AlertCircle,
  Clock,
  Wrench,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function HiddenCostsPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const hiddenCosts = [
    {
      icon: Wrench,
      title: 'Reactive Maintenance',
      without: 'AED 50,000 - 150,000/year in emergency repairs',
      with: 'AED 15,000 - 40,000/year with predictive maintenance',
      savings: 'Up to 70% reduction'
    },
    {
      icon: Zap,
      title: 'Energy Waste',
      without: 'AED 80,000 - 200,000/year from inefficient operations',
      with: 'AED 50,000 - 120,000/year with intelligent automation',
      savings: '30-40% energy cost reduction'
    },
    {
      icon: Clock,
      title: 'System Downtime',
      without: 'AED 30,000 - 100,000/year in lost comfort and productivity',
      with: 'Minimal downtime with 24/7 monitoring',
      savings: '90% reduction in outages'
    },
    {
      icon: TrendingDown,
      title: 'Property Depreciation',
      without: '5-10% faster depreciation without smart features',
      with: '10-15% premium valuation with smart certification',
      savings: 'Long-term asset protection'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Cost Analysis
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hidden Costs of<br />
                <span className="text-gray-300">No Intelligence</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                The real expense is not implementing smart building technology—it&apos;s the ongoing costs of reactive maintenance, energy waste, system failures, and property depreciation.
              </p>
              
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Calculate Your Savings
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Hidden Costs */}
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
                The True Cost of Doing Nothing
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Annual costs for typical luxury villa without building intelligence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hiddenCosts.map((cost, index) => {
                const Icon = cost.icon
                return (
                  <motion.div
                    key={cost.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border-2 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-red-50">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{cost.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Without Intelligence:</div>
                          <div className="text-sm font-semibold text-gray-700">{cost.without}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500 mb-1">With Intelligence:</div>
                          <div className="text-sm font-semibold text-gray-700">{cost.with}</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="inline-block px-3 py-1 bg-green-50 text-green-800 text-sm font-semibold">
                          💰 {cost.savings}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-red-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <DollarSign className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Stop Paying for Hidden Costs
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a free assessment and discover exactly how much you&apos;re losing without building intelligence.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Calculate Your Savings
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

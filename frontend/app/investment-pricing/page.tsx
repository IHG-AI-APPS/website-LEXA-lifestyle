'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Clock,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'

export default function InvestmentPricingPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const pricingTiers = [
    {
      name: 'Essential',
      subtitle: 'Perfect for small offices',
      price: 'From AED 50,000',
      description: 'Core automation for spaces up to 3,000 sq ft',
      features: [
        'Smart Lighting Control',
        'Climate Management',
        'Basic Access Control',
        'Energy Monitoring Dashboard',
        'Mobile App Control',
        '1-Year Warranty'
      ],
      ideal: 'Small offices, clinics, boutiques',
      roi: '18-24 months'
    },
    {
      name: 'Professional',
      subtitle: 'For growing businesses',
      price: 'From AED 150,000',
      description: 'Comprehensive intelligence for spaces up to 10,000 sq ft',
      features: [
        'Complete BMS Integration',
        'Smart HVAC & Lighting',
        'Advanced Security Systems',
        'Workplace Analytics',
        'Predictive Maintenance',
        'Integration Support',
        '2-Year Warranty',
        '24/7 Technical Support'
      ],
      ideal: 'Medium offices, retail spaces, hotels',
      roi: '12-18 months',
      popular: true
    },
    {
      name: 'Enterprise',
      subtitle: 'For large facilities',
      price: 'Custom Quote',
      description: 'Full digital twin and AI-powered optimization',
      features: [
        'Living Digital Twin Platform',
        'AI-Powered Optimization',
        'Multi-Site Management',
        'Custom Integration',
        'Dedicated Account Manager',
        'SLA Guarantees',
        '3-Year Warranty',
        'Priority Support'
      ],
      ideal: 'Corporate towers, hospitals, campuses',
      roi: '12-15 months'
    }
  ]

  const investmentBreakdown = [
    {
      category: 'Hardware & Equipment',
      percentage: '40-50%',
      items: ['Sensors, controllers, smart devices', 'Networking equipment', 'Display panels and interfaces']
    },
    {
      category: 'Installation & Integration',
      percentage: '25-35%',
      items: ['Professional installation', 'System integration', 'Testing and commissioning']
    },
    {
      category: 'Software & Licensing',
      percentage: '15-20%',
      items: ['Platform licenses', 'Cloud services', 'Mobile applications']
    },
    {
      category: 'Training & Documentation',
      percentage: '5-10%',
      items: ['Staff training', 'System documentation', 'Support materials']
    }
  ]

  const roiFactors = [
    {
      icon: Zap,
      title: 'Energy Savings',
      description: '25-40% reduction in energy costs through intelligent automation and optimization',
      typical: 'AED 50,000 - 200,000/year'
    },
    {
      icon: TrendingUp,
      title: 'Operational Efficiency',
      description: '20-30% improvement in staff productivity and reduced manual operations',
      typical: 'AED 30,000 - 150,000/year'
    },
    {
      icon: Shield,
      title: 'Maintenance Reduction',
      description: '40-60% decrease in reactive maintenance through predictive alerts',
      typical: 'AED 20,000 - 100,000/year'
    },
    {
      icon: Award,
      title: 'Property Value',
      description: '10-15% increase in property valuation with smart building certification',
      typical: 'Long-term asset appreciation'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <DollarSign className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Investment & ROI
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Investment.<br />
                <span className="text-gray-300">Measurable Returns.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transparent pricing, flexible payment options, and proven ROI. Invest in building intelligence that pays for itself through energy savings and operational efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Get Custom Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/calculator">
                    Calculate ROI
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Tiers */}
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
                Investment Packages
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Scalable solutions designed to fit your space and budget
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`bg-white p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    tier.popular ? 'border-[#1A1A1A] shadow-xl scale-105' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-1 text-[#1A1A1A] dark:text-white">{tier.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tier.subtitle}</p>
                  <div className="text-3xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{tier.price}</div>
                  <p className="text-sm text-gray-600 mb-6">{tier.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="text-sm text-gray-600 mb-1">Ideal for:</div>
                    <div className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{tier.ideal}</div>
                  </div>

                  <div className="bg-gray-50 p-3 mb-6">
                    <div className="text-xs text-gray-600 mb-1">Typical ROI Period:</div>
                    <div className="text-lg font-bold text-[#1A1A1A] dark:text-white">{tier.roi}</div>
                  </div>

                  <Button
                    onClick={() => setShowConsultationForm(true)}
                    className={`w-full ${
                      tier.popular
                        ? 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-[#1A1A1A]'
                    }`}
                  >
                    Get Detailed Quote
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Breakdown */}
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
                Investment Breakdown
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transparent cost structure for smart building implementation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {investmentBreakdown.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 border-l-4 border-[#1A1A1A]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{item.category}</h3>
                    <span className="text-2xl font-bold text-[#1A1A1A] dark:text-white">{item.percentage}</span>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((subItem) => (
                      <li key={subItem} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="h-4 w-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                        <span>{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Factors */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                How You Earn Returns
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four key areas where building intelligence delivers measurable value
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {roiFactors.map((factor, index) => {
                const Icon = factor.icon
                return (
                  <motion.div
                    key={factor.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800">
                        <Icon className="h-6 w-6 text-[#1A1A1A] dark:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{factor.title}</h3>
                        <p className="text-gray-600 mb-3">{factor.description}</p>
                        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-sm font-semibold">
                          {factor.typical}
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
        <section className="py-20 bg-gradient-to-br from-emerald-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Calculator className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Calculate Your ROI?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a detailed quote tailored to your facility and see exactly how much you&apos;ll save.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Request Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/calculator">
                    <Calculator className="mr-2 h-4 w-4" />
                    Use ROI Calculator
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer */}
        <PricingDisclaimer variant="dark" />
      </div>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </>
  )
}

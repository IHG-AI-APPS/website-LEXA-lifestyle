'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Cpu,
  Zap,
  TrendingUp,
  Leaf,
  Building2,
  Shield,
  BarChart3,
  Activity,
  Database,
  Layers,
  CheckCircle2,
  ArrowRight,
  Award,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function EnterprisePerformanceOSPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [selectedUseCase, setSelectedUseCase] = useState('offices')

  const architectureLayers = [
    {
      number: 1,
      title: 'Core Infrastructure',
      icon: Database,
      color: 'blue',
      features: [
        'IoT Gateways - Secure data collection',
        'Edge Controllers - Local processing',
        'Data Ingestion - Real-time capture',
        'HVAC Integration',
        'Lighting Systems',
        'Smart Metering'
      ]
    },
    {
      number: 2,
      title: 'Performance Intelligence',
      icon: Zap,
      color: 'orange',
      features: [
        'Energy Optimization - Real-time efficiency',
        'HVAC Efficiency - Climate optimization',
        'Smart Lighting - Adaptive control',
        'Peak Demand - Load management',
        'Demand Response - Grid integration',
        'Carbon Tracking - Real-time emissions'
      ]
    },
    {
      number: 3,
      title: 'Asset & Operations Intelligence',
      icon: Activity,
      color: 'purple',
      features: [
        'Predictive Maintenance - Anticipate needs',
        'Equipment Health - Real-time monitoring',
        'Lifecycle Tracking - Performance history',
        'Fault Detection - Auto identification',
        'Work Order Automation',
        'Spare Parts Optimization'
      ]
    },
    {
      number: 4,
      title: 'ESG & WELL Intelligence',
      icon: Leaf,
      color: 'green',
      features: [
        'Live Dashboards - Real-time ESG metrics',
        'Wellness Analytics - WELL-aligned monitoring',
        'Board-Ready Reports - Audit-grade docs',
        'Carbon Accounting - Auto emissions tracking',
        'Certification Support - LEED, WELL, Estidama',
        'Stakeholder Reporting - Investor-grade'
      ]
    }
  ]

  const useCases = [
    {
      id: 'offices',
      name: 'Grade A Offices',
      icon: Building2,
      benefits: [
        { label: 'Energy Optimization', value: '25-35% cost reduction' },
        { label: 'Tenant Satisfaction', value: 'Premium experience' },
        { label: 'ESG Reporting', value: 'Automated compliance' },
        { label: 'Asset Value', value: 'Enhanced valuation' },
        { label: 'Operational Excellence', value: 'Predictive maintenance' },
        { label: 'Market Differentiation', value: 'Competitive advantage' }
      ]
    },
    {
      id: 'government',
      name: 'Government Buildings',
      icon: Shield,
      benefits: [
        { label: 'Portfolio Monitoring', value: 'Centralized oversight' },
        { label: 'Compliance Assurance', value: 'Regulatory adherence' },
        { label: 'Budget Optimization', value: 'Cost control' },
        { label: 'Public Accountability', value: 'Transparent reporting' },
        { label: 'Sustainability Goals', value: 'Net Zero alignment' },
        { label: 'Citizen Services', value: 'Enhanced facility performance' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Facilities',
      icon: Activity,
      benefits: [
        { label: 'Critical Uptime', value: '24/7 reliability' },
        { label: 'Infection Control', value: 'Air quality monitoring' },
        { label: 'Energy Resilience', value: 'Backup system intelligence' },
        { label: 'Compliance Tracking', value: 'Healthcare standards' },
        { label: 'Patient Comfort', value: 'Optimal healing environment' },
        { label: 'Operational Continuity', value: 'Predictive maintenance' }
      ]
    },
    {
      id: 'campus',
      name: 'Educational Campuses',
      icon: Target,
      benefits: [
        { label: 'Multi-Building Optimization', value: 'Unified intelligence' },
        { label: 'Student Comfort', value: 'Enhanced learning' },
        { label: 'Research Continuity', value: 'Critical system reliability' },
        { label: 'Operational Efficiency', value: 'Cross-campus coordination' },
        { label: 'Sustainability Education', value: 'Live performance data' },
        { label: 'Budget Management', value: 'Resource optimization' }
      ]
    },
    {
      id: 'mixeduse',
      name: 'Mixed-Use Developments',
      icon: Layers,
      benefits: [
        { label: 'Unified Intelligence', value: 'Seamless operations' },
        { label: 'Zone Optimization', value: 'Efficient patterns' },
        { label: 'Tenant Diversity', value: 'Multi-stakeholder satisfaction' },
        { label: 'Revenue Maximization', value: 'Optimized costs' },
        { label: 'Brand Experience', value: 'Consistent quality' },
        { label: 'Asset Complexity', value: 'Simplified management' }
      ]
    }
  ]

  const provenResults = [
    {
      metric: '25-35%',
      label: 'Energy Reduction',
      detail: 'Industry benchmark for smart building systems',
      icon: Zap
    },
    {
      metric: 'Up to 40%',
      label: 'Maintenance Cost Savings',
      detail: 'Through predictive maintenance capabilities',
      icon: TrendingUp
    },
    {
      metric: '18-24mo',
      label: 'Typical ROI Period',
      detail: 'Based on energy savings alone',
      icon: BarChart3
    },
    {
      metric: '15-20%',
      label: 'Property Value Premium',
      detail: 'Smart-enabled buildings command higher valuations',
      icon: Award
    }
  ]

  const investmentTiers = [
    {
      name: 'Starter',
      size: '50,000 - 150,000 sq ft',
      investment: 'AED 150K - 300K',
      includes: [
        'Core infrastructure',
        'Energy optimization',
        'Basic dashboards',
        'Standard support'
      ]
    },
    {
      name: 'Professional',
      size: '150,000 - 500,000 sq ft',
      investment: 'AED 300K - 800K',
      includes: [
        'Full performance intelligence',
        'Predictive maintenance',
        'ESG reporting',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      size: '500,000+ sq ft or multi-site',
      investment: 'Custom Pricing',
      includes: [
        'Complete platform',
        'Dedicated support',
        'Custom integrations',
        'Performance guarantees'
      ]
    }
  ]

  const selectedCase = useCases.find(uc => uc.id === selectedUseCase) || useCases[0]
  const SelectedIcon = selectedCase.icon

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 sm:py-32 overflow-hidden">
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
                  Enterprise Platform
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Intelligent Building<br />
                <span className="text-blue-400">Performance OS</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transform UAE buildings into intelligent performance assets. Beyond automation—a complete operating system for energy optimization, predictive maintenance, and ESG compliance.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { value: '25-35%', label: 'Energy Savings' },
                  { value: '40%', label: 'Less Reactive Maintenance' },
                  { value: '18-24mo', label: 'Typical ROI' },
                  { value: '8 Weeks', label: 'Implementation' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Request Enterprise Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="#architecture">
                    Explore Platform
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4-Layer Architecture */}
        <section id="architecture" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white dark:text-white">
                Four-Layer Architecture
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Complete building intelligence from infrastructure to ESG reporting
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {architectureLayers.map((layer, index) => {
                const Icon = layer.icon
                return (
                  <motion.div
                    key={layer.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-4 bg-${layer.color}-100`}>
                        <Icon className={`h-8 w-8 text-${layer.color}-600`} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-500 mb-1">LAYER {layer.number}</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{layer.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {layer.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Enterprise Use Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white dark:text-white">
                Enterprise Use Cases
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Designed for diverse building portfolios across the UAE
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {useCases.map((useCase) => {
                const Icon = useCase.icon
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setSelectedUseCase(useCase.id)}
                    className={`px-6 py-3 border-2 font-semibold transition-all flex items-center gap-2 ${
                      selectedUseCase === useCase.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 dark:border-gray-700 bg-white text-gray-700 dark:text-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {useCase.name}
                  </button>
                )
              })}
            </div>

            <motion.div
              key={selectedUseCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 lg:p-12 border-2 border-blue-200"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-100">
                  <SelectedIcon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">{selectedCase.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCase.benefits.map((benefit) => (
                  <div key={benefit.label} className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.label}</div>
                    <div className="text-sm text-blue-600 font-semibold">{benefit.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proven Results */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 mb-4">
                <Award className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Industry-Leading Performance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Expected Performance Benchmarks
              </h2>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                Based on industry standards for intelligent building management systems in the UAE climate
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {provenResults.map((result, index) => {
                const Icon = result.icon
                return (
                  <motion.div
                    key={result.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <Icon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <div className="text-4xl font-bold mb-2">{result.metric}</div>
                    <div className="text-lg font-semibold mb-2">{result.label}</div>
                    <div className="text-sm text-gray-400">{result.detail}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Investment Tiers */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white dark:text-white">
                Enterprise Investment Tiers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Scalable solutions for every building size
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {investmentTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`bg-white dark:bg-gray-800 p-8 border-2 transition-all hover:shadow-xl ${
                    tier.popular ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white dark:text-white">{tier.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.size}</div>
                  <div className="text-3xl font-bold text-blue-600 mb-6">{tier.investment}</div>
                  
                  <div className="space-y-3 mb-8">
                    {tier.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowConsultationForm(true)}
                    className={`w-full ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Request Quote
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Typical ROI:</strong> 18-24 months through energy savings alone
              </p>
              <p className="text-sm text-gray-500">
                Pilot-first approach available • Phased commitment • No vendor lock-in
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
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
                Ready to Transform Your Building Performance?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Schedule an enterprise demo and discover how LEXA Performance OS can optimize your operations, reduce costs, and automate ESG compliance.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Request Enterprise Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-xs text-gray-500 text-center">
              * Performance metrics shown are industry benchmarks and expected outcomes based on typical implementations of intelligent building management systems. 
              Actual results may vary depending on building specifications, existing infrastructure, usage patterns, and environmental factors. 
              Contact us for a customized assessment of your building&apos;s potential.
            </p>
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

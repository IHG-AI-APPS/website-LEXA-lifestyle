'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield,
  Clock,
  Wrench,
  Zap,
  Phone,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'

export default function AMCPackagesPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const amcPackages = [
    {
      name: 'Basic Care',
      subtitle: 'Essential maintenance',
      price: 'From AED 5,000/year',
      description: 'Annual preventive maintenance and basic support',
      features: [
        '2 Preventive Maintenance Visits/Year',
        'System Health Check',
        'Software Updates',
        'Email & Phone Support (Business Hours)',
        'Remote Diagnostics',
        'Annual Performance Report'
      ],
      response: '48-hour response time',
      ideal: 'Small installations, residential'
    },
    {
      name: 'Professional Care',
      subtitle: 'Recommended for businesses',
      price: 'From AED 15,000/year',
      description: 'Quarterly maintenance with priority support',
      features: [
        '4 Preventive Maintenance Visits/Year',
        'Priority Technical Support',
        'Predictive Maintenance Alerts',
        'System Optimization',
        'Spare Parts Discount (15%)',
        '24/7 Emergency Hotline',
        'Quarterly Performance Reports',
        'Free Minor Repairs'
      ],
      response: '24-hour response time',
      ideal: 'Commercial offices, retail',
      popular: true
    },
    {
      name: 'Enterprise Care',
      subtitle: 'Maximum uptime guarantee',
      price: 'From AED 35,000/year',
      description: 'Comprehensive coverage with SLA guarantees',
      features: [
        'Monthly Preventive Maintenance',
        'Dedicated Account Manager',
        '99.5% Uptime SLA',
        'Predictive Analytics & Optimization',
        'Spare Parts Included',
        '24/7 Priority Support',
        'On-Site Engineer (4 hours response)',
        'System Training Sessions',
        'Monthly Performance Dashboards'
      ],
      response: '4-hour on-site response',
      ideal: 'Large facilities, critical operations'
    }
  ]

  const whatsIncluded = [
    {
      icon: Wrench,
      title: 'Preventive Maintenance',
      items: [
        'System inspection and cleaning',
        'Sensor calibration',
        'Controller firmware updates',
        'Cable and connection checks',
        'Performance optimization'
      ]
    },
    {
      icon: Phone,
      title: 'Technical Support',
      items: [
        'Remote diagnostics',
        'Troubleshooting assistance',
        'System configuration help',
        'User training support',
        'Emergency response'
      ]
    },
    {
      icon: Zap,
      title: 'System Optimization',
      items: [
        'Energy usage analysis',
        'Schedule fine-tuning',
        'Integration improvements',
        'Performance benchmarking',
        'Efficiency recommendations'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Predictive Monitoring',
      items: [
        ' 24/7 system monitoring',
        'Anomaly detection',
        'Failure prediction alerts',
        'Proactive issue resolution',
        'Health trend analysis'
      ]
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'System Reliability',
      description: '99%+ uptime with proactive maintenance',
      stat: '99%'
    },
    {
      icon: TrendingUp,
      title: 'Cost Savings',
      description: '40-60% lower maintenance costs vs reactive repairs',
      stat: '50%'
    },
    {
      icon: Clock,
      title: 'Extended Lifespan',
      description: '30% longer equipment life with regular care',
      stat: '+30%'
    },
    {
      icon: Award,
      title: 'Priority Service',
      description: 'Fast response times and dedicated support',
      stat: '4-hr'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <Shield className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Annual Maintenance Contracts
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Protect Your<br />
                <span className="text-gray-300">Investment</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Keep your smart building running at peak performance with comprehensive annual maintenance contracts. Proactive care that prevents costly breakdowns and maximizes system lifespan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Get AMC Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    Compare Packages
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AMC Packages */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Annual Maintenance Packages
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose the right level of care for your smart building
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {amcPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`bg-white dark:bg-gray-800 p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    pkg.popular ? 'border-[#1A1A1A] shadow-xl scale-105' : 'border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider mb-4">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-1 text-[#1A1A1A] dark:text-white">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{pkg.subtitle}</p>
                  <div className="text-3xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{pkg.price}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-3 mb-4">
                    <div className="text-xs text-blue-600 mb-1">Response Time:</div>
                    <div className="text-sm font-bold text-blue-900">{pkg.response}</div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ideal for:</div>
                    <div className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{pkg.ideal}</div>
                  </div>

                  <Button
                    onClick={() => setShowConsultationForm(true)}
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-[#1A1A1A]'
                    }`}
                  >
                    Select Package
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#1A1A1A] dark:text-white">
                What&apos;s Included in AMC
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive care covering all aspects of your smart building system
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whatsIncluded.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-6 border-l-4 border-[#1A1A1A]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white">
                        <Icon className="h-6 w-6 text-[#1A1A1A] dark:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                          <CheckCircle2 className="h-4 w-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Why Choose Our AMC
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white border-2 border-gray-200 dark:border-gray-700 dark:border-gray-700"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4 text-[#1A1A1A] dark:text-white" />
                    <div className="text-4xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{benefit.stat}</div>
                    <div className="text-sm font-semibold mb-2 text-[#1A1A1A] dark:text-white">{benefit.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Shield className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Protect Your Investment?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a custom AMC quote tailored to your facility&apos;s needs and ensure maximum uptime.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Get AMC Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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

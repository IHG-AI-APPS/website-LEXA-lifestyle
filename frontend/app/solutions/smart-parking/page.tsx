'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Car,
  Smartphone,
  CreditCard,
  Navigation,
  Camera,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function SmartParkingPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const features = [
    {
      icon: Camera,
      title: 'License Plate Recognition',
      description: 'Automatic vehicle identification with 99.9% accuracy for seamless entry and exit without barriers or tickets.'
    },
    {
      icon: MapPin,
      title: 'Occupancy Sensors',
      description: 'Real-time bay-level occupancy tracking using IoT sensors for accurate availability data.'
    },
    {
      icon: Navigation,
      title: 'Smart Guidance System',
      description: 'LED indicators and digital signage guide drivers to available spots, reducing search time by 70%.'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Integration',
      description: 'Find, reserve, and pay for parking spots through iOS/Android apps with real-time availability.'
    },
    {
      icon: CreditCard,
      title: 'Automated Payment',
      description: 'Contactless payment via credit card, mobile wallet, or pre-registered accounts with automatic billing.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights on usage patterns, revenue, peak times, and occupancy trends.'
    }
  ]

  const benefits = [
    { metric: '70%', label: 'Reduced Search Time', icon: Clock },
    { metric: '40%', label: 'Increased Revenue', icon: DollarSign },
    { metric: '60%', label: 'Less CO2 Emissions', icon: TrendingUp },
    { metric: '99.9%', label: 'Recognition Accuracy', icon: CheckCircle2 }
  ]

  const useCases = [
    {
      title: 'Shopping Malls',
      description: 'Enhance customer experience with easy parking and loyalty program integration',
      icon: '🛍️'
    },
    {
      title: 'Corporate Towers',
      description: 'Employee parking management with reserved spots and visitor allocation',
      icon: '🏢'
    },
    {
      title: 'Airports',
      description: 'Long-term and short-term parking with shuttle integration and online booking',
      icon: '✈️'
    },
    {
      title: 'Hospitals',
      description: 'Priority parking for emergency vehicles and accessible spots for patients',
      icon: '🏥'
    },
    {
      title: 'Hotels',
      description: 'Valet management and guest reservation system with seamless check-in',
      icon: '🏨'
    },
    {
      title: 'Residential',
      description: 'Resident permits, visitor parking, and security integration for communities',
      icon: '🏘️'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
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
                <Car className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Parking Intelligence
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Parking<br />
                <span className="text-gray-300">Solutions</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transform parking chaos into seamless efficiency. Our AI-powered parking management system eliminates search time, maximizes revenue, and delivers exceptional user experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Request Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    Calculate ROI
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Complete Parking Intelligence
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                End-to-end solution from entry to payment with real-time monitoring and analytics
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
                Measurable Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real results from smart parking implementations
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
                    <div className="text-sm text-gray-600">{benefit.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
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
                Perfect For Any Facility
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Flexible solutions adapted to your specific parking needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A] dark:text-white">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Car className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Eliminate Parking Hassles?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule a demo and see how smart parking can transform your facility.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Request Demo
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

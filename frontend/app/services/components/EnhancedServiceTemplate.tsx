/**
 * Enhanced Service Page Template
 * Rich, visually impressive service pages with graphical representations
 * Maintains LEXA's design philosophy
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import RelatedServices from '../components/RelatedServices'
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Shield, 
  Award,
  Users,
  TrendingUp,
  Zap,
  Target,
  LucideIcon
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface ServiceFeature {
  icon: LucideIcon
  title: string
  description: string
  stats?: string
}

interface ProcessStep {
  step: string
  title: string
  description: string
  duration?: string
}

interface ValueProposition {
  metric: string
  value: string
  label: string
}

interface EnhancedServicePageProps {
  service: {
    slug: string
    title: string
    subtitle: string
    description: string
    heroImage?: string
  }
  features: ServiceFeature[]
  process: ProcessStep[]
  valueProps: ValueProposition[]
  deliverables?: string[]
  faqs?: Array<{ question: string; answer: string }>
}

export default function EnhancedServicePage({
  service,
  features,
  process,
  valueProps,
  deliverables = [],
  faqs = []
}: EnhancedServicePageProps) {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [allServices, setAllServices] = useState<any[]>([])
  const [activeStep, setActiveStep] = useState<number | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/services`)
        if (response.ok) {
          const data = await response.json()
          setAllServices(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width with Image */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image */}
        {service.heroImage ? (
          <SafeImage
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
              SERVICES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
              {service.subtitle}
            </p>
            <Button
              size="lg"
              onClick={() => setShowConsultationForm(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions - Stats Bar */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {prop.value}
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  {prop.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {service.description}
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid - Graphical Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2 block">
                What We Deliver
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Comprehensive Service Features
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-gray-300">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats */}
                  {feature.stats && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs font-semibold text-gray-700">
                        {feature.stats}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline - Visual Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2 block">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How We Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A proven methodology refined over years of experience
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      {step.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{step.duration}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-gray-700 to-gray-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables - What You Get */}
      {deliverables.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2 block">
                    Deliverables
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    What You&apos;ll Receive
                  </h2>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-white transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-6 w-6 text-gray-700" />
                    </div>
                    <span className="text-base text-gray-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Book a free consultation to discuss your project requirements
            </p>
            <Button
              size="lg"
              onClick={() => setShowConsultationForm(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {allServices.length > 0 && (
        <RelatedServices services={allServices} currentSlug={service.slug} />
      )}

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}

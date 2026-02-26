'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Briefcase, Users, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

export default function CommercialPage() {
  const cms = useCms('page_persona_commercial', null) as any

  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const benefits = [
    {
      icon: Briefcase,
      title: 'Enterprise-Grade',
      description: 'Commercial-grade systems built for 24/7 operation and mission-critical reliability.'
    },
    {
      icon: Users,
      title: 'Employee Productivity',
      description: 'Optimize workspace environments for comfort, collaboration, and performance.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Access control, surveillance, and data security meeting regulatory requirements.'
    },
    {
      icon: TrendingUp,
      title: 'Operational Efficiency',
      description: 'Reduce energy costs, streamline operations, and improve facility management.'
    },
  ]

  const solutions = [
    {
      category: 'Office & Workplace',
      items: [
        { name: 'Conference Room AV', slug: 'conference-room-av-systems', description: 'Integrated video conferencing' },
        { name: 'Workplace Analytics', slug: 'workplace-analytics', description: 'Space utilization & occupancy' },
        { name: 'Smart Office Automation', slug: 'bms-automation', description: 'Lighting, climate, scheduling' }
      ]
    },
    {
      category: 'Hospitality',
      items: [
        { name: 'Guest Room Management (GRMS)', slug: 'grms-hospitality', description: 'Hotel room automation' },
        { name: 'Lobby & Public Area AV', slug: 'commercial-collaboration-spaces', description: 'Digital signage & sound' },
        { name: 'Back-of-House Systems', slug: 'bms-automation', description: 'Operations automation' }
      ]
    },
    {
      category: 'Retail & Restaurants',
      items: [
        { name: 'AI Camera Analytics', slug: 'ai-camera-staff-analytics', description: 'Customer insights & security' },
        { name: 'Digital Signage', slug: 'commercial-collaboration-spaces', description: 'Dynamic content displays' },
        { name: 'Ambiance Control', slug: 'lighting-automation', description: 'Lighting & audio scenes' }
      ]
    },
    {
      category: 'Cultural & Worship',
      items: [
        { name: 'Masjid Automation', slug: 'cultural-automation/masjid-automation', description: 'Prayer time integration' },
        { name: 'Majlis Systems', slug: 'cultural-automation/majlis-automation', description: 'Traditional space automation' },
        { name: 'Auditorium AV', slug: 'auditoriums', description: 'Large venue audio/video' }
      ]
    },
    {
      category: 'Building Management',
      items: [
        { name: 'BMS Integration', slug: 'bms-automation', description: 'Centralized building control' },
        { name: 'Energy Management', slug: 'energy-management', description: 'Consumption monitoring' },
        { name: 'Smart Parking', slug: 'smart-parking', description: 'Automated parking systems' }
      ]
    },
    {
      category: 'Security & Access',
      items: [
        { name: 'Access Control', slug: 'access-control', description: 'Employee & visitor management' },
        { name: 'CCTV & Surveillance', slug: 'security-surveillance', description: 'AI-powered monitoring' },
        { name: 'Perimeter Security', slug: 'security-surveillance', description: 'Intrusion detection' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                  For Commercial & Enterprise
                </span>
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                  INTELLIGENT
                  <br />
                  <span className="text-transparent bg-clip-text metallic-gradient">WORKSPACES</span>
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed mb-10">
                  Enterprise automation for offices, hotels, retail, and commercial buildings. Enhance operations, reduce costs, and improve experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-charcoal hover:bg-charcoal-light text-white"
                    onClick={() => setShowConsultationForm(true)}
                  >
                    Commercial Consultation
                  </Button>
                  <Link href="/experience-centre">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border border-gray-300 dark:border-gray-600 hover:border-charcoal w-full"
                    >
                      Visit Showroom
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px]"
              >
                <SafeImage
                  src="/images/premium/solutions/penthouse-3.jpg"
                  alt="Commercial space"
                  fill
                  className="object-cover grayscale-[20%]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-semibold mb-4">Commercial Automation Benefits</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Drive efficiency, security, and employee satisfaction with intelligent building systems
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                      <Icon size={32} className="text-charcoal" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-semibold mb-4">Commercial Solutions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Industry-specific automation for every commercial environment
              </p>
            </motion.div>

            <div className="space-y-12">
              {solutions.map((category, catIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-charcoal">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={item.slug}
                        href={`/solutions/${item.slug}`}
                        className="group block"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-charcoal transition-all hover:shadow-lg"
                        >
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-charcoal transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                          <div className="flex items-center text-sm text-charcoal font-medium">
                            Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Builder CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider">Plan Your Project</p>
              </div>
              <h2 className="text-5xl font-heading font-bold mb-6">Interactive Project Builder</h2>
              <p className="text-2xl text-white/90 mb-4">
                Design your commercial automation system with instant pricing
              </p>
              <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
                Select office automation, conference rooms, security, access control, and more. Get detailed proposals with ROI calculations for your commercial project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/home-intelligence-builder">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 px-8 py-6 text-lg font-semibold shadow-2xl"
                  >
                    Launch Project Builder
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <p className="text-sm text-white/70">✓ Free to use  ✓ Instant pricing  ✓ Commercial solutions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold mb-6">Transform Your Commercial Space</h2>
              <p className="text-xl text-white/80 mb-10">
                Schedule a consultation with our commercial solutions team to discuss your project.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800"
                onClick={() => setShowConsultationForm(true)}
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
        defaultPersona="commercial"
      />
    </div>
  )
}

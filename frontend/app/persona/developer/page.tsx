'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Building, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function DeveloperPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const benefits = [
    {
      icon: Building,
      title: 'Turnkey Solutions',
      description: 'Complete smart home packages for multiple units. Consistent quality, predictable timelines.'
    },
    {
      icon: TrendingUp,
      title: 'Market Differentiation',
      description: 'Stand out with premium technology. Command higher prices, sell faster.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Coordination with construction schedules. No delays, no surprises.'
    },
    {
      icon: CheckCircle,
      title: 'Volume Pricing',
      description: 'Competitive rates for multiple properties. Dedicated project management.'
    },
  ]

  const solutions = [
    {
      category: 'Multi-Unit Systems',
      items: [
        { name: 'Villa Development Automation', slug: 'smart-home-automation', description: 'Standardized smart villa packages' },
        { name: 'Apartment Building Systems', slug: 'smart-home-automation', description: 'Multi-tenant automation' },
        { name: 'Townhouse Integration', slug: 'smart-home-automation', description: 'Mid-rise residential' }
      ]
    },
    {
      category: 'Building Management',
      items: [
        { name: 'BMS Integration', slug: 'bms-automation', description: 'Centralized building control' },
        { name: 'Energy Management', slug: 'energy-management', description: 'Reduce operational costs' },
        { name: 'Smart Parking', slug: 'smart-parking', description: 'Automated parking systems' }
      ]
    },
    {
      category: 'Amenities & Common Areas',
      items: [
        { name: 'Clubhouse AV Systems', slug: 'conference-room-av-systems', description: 'Entertainment & meeting spaces' },
        { name: 'Gym Automation', slug: 'smart-home-automation', description: 'Fitness center integration' },
        { name: 'Pool & Landscape', slug: 'pool-spa-automation', description: 'Outdoor amenity control' }
      ]
    },
    {
      category: 'Security & Access',
      items: [
        { name: 'Gate & Perimeter Security', slug: 'access-control', description: 'Community access control' },
        { name: 'CCTV & Surveillance', slug: 'security-surveillance', description: 'Multi-building monitoring' },
        { name: 'Resident Access Management', slug: 'access-control', description: 'Biometric & card systems' }
      ]
    },
    {
      category: 'Premium Offerings',
      items: [
        { name: 'Smart-Ready Villas', slug: 'smart-home-automation', description: 'Pre-wired for automation' },
        { name: 'Luxury Home Cinema', slug: 'home-cinema', description: 'Premium entertainment packages' },
        { name: 'Integrated AV', slug: 'multi-room-audio', description: 'Whole-home audio/video' }
      ]
    },
    {
      category: 'Developer Resources',
      items: [
        { name: 'Developer Toolkit', slug: '/partners/developers', description: 'Specs, pricing, timelines' },
        { name: 'Volume Pricing Guide', slug: '/partners/developers', description: '10+, 50+, 100+ unit pricing' },
        { name: 'Project Management', slug: '/partners/developers', description: 'Dedicated support team' }
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
                  For Developers
                </span>
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                  SMART
                  <br />
                  <span className="text-transparent bg-clip-text metallic-gradient">DEVELOPMENTS</span>
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />
                <p className="text-xl text-gray-600 font-normal leading-relaxed mb-10">
                  Turn-key automation for luxury developments. Scale your projects with consistent quality and on-time delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/partners/developers">
                    <Button
                      size="lg"
                      className="bg-charcoal hover:bg-charcoal-light text-white w-full"
                    >
                      Download Toolkit
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-gray-300 hover:border-charcoal"
                    onClick={() => setShowConsultationForm(true)}
                  >
                    Discuss Project
                  </Button>
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
                  alt="Luxury development"
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
              <h2 className="text-4xl font-semibold mb-4">Why Developers Choose LEXA</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Reliable partner for projects of any scale. From boutique developments to master communities.
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                      <Icon size={32} className="text-charcoal" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
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
              <h2 className="text-4xl font-semibold mb-4">Solutions for Development Projects</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive automation for residential, commercial, and mixed-use developments
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
                          className="bg-white p-6 border border-gray-200 hover:border-charcoal transition-all hover:shadow-lg"
                        >
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-charcoal transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
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
                <p className="text-sm font-semibold uppercase tracking-wider">Plan Your Development</p>
              </div>
              <h2 className="text-5xl font-heading font-bold mb-6">Multi-Unit Project Builder</h2>
              <p className="text-2xl text-white/90 mb-4">
                Calculate automation costs for your entire development
              </p>
              <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
                Plan smart home packages for villas, apartments, or townhouses. Get volume pricing and detailed specifications for your development project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/home-intelligence-builder">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-2xl"
                  >
                    Launch Project Builder
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <p className="text-sm text-white/70">✓ Free to use  ✓ Volume pricing  ✓ Multi-unit support</p>
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
              <h2 className="text-4xl font-semibold mb-6">Ready to Elevate Your Development?</h2>
              <p className="text-xl text-white/80 mb-10">
                Download our developer toolkit with volume pricing, technical specs, and project timelines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/partners/developers">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Get Developer Toolkit
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black"
                  onClick={() => setShowConsultationForm(true)}
                >
                  Schedule Discussion
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
        defaultPersona="developer"
      />
    </div>
  )
}

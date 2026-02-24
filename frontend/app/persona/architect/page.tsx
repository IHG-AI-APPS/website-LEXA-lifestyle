'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Ruler, Palette, Layers, FileText, ArrowRight } from 'lucide-react'

export default function ArchitectPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const benefits = [
    {
      icon: Ruler,
      title: 'Design Integration',
      description: 'Seamless automation that complements your architectural vision, not compromises it.'
    },
    {
      icon: Palette,
      title: 'Aesthetic Control',
      description: 'Hidden technology. Visible elegance. Invisible speakers, concealed wiring, integrated panels.'
    },
    {
      icon: Layers,
      title: 'MEP Coordination',
      description: 'Early-stage collaboration prevents costly mid-project redesigns and timeline delays.'
    },
    {
      icon: FileText,
      title: 'Technical Support',
      description: 'CAD blocks, spec sheets, and coordination drawings for seamless project integration.'
    },
  ]

  const solutions = [
    {
      category: 'Lighting Design Integration',
      items: [
        { name: 'Architectural Lighting Control', slug: 'lighting-automation', description: 'Lutron, KNX, Crestron systems' },
        { name: 'Circadian Lighting', slug: 'lighting-automation', description: 'Human-centric design' },
        { name: 'Facade & Landscape Lighting', slug: 'landscape-lighting-automation', description: 'Exterior automation' }
      ]
    },
    {
      category: 'Acoustic & AV Design',
      items: [
        { name: 'Home Cinema Design', slug: 'home-cinema', description: 'Reference-grade theaters' },
        { name: 'Acoustic Treatment', slug: 'home-cinema', description: 'Sound isolation & tuning' },
        { name: 'Invisible Audio', slug: 'multi-room-audio', description: 'In-ceiling & architectural speakers' }
      ]
    },
    {
      category: 'Smart Building Integration',
      items: [
        { name: 'Building Management Systems', slug: 'bms-automation', description: 'Commercial BMS integration' },
        { name: 'Energy Management', slug: 'energy-management', description: 'LEED & sustainability' },
        { name: 'Climate Control', slug: 'climate-control', description: 'Zone-based HVAC automation' }
      ]
    },
    {
      category: 'Security & Access',
      items: [
        { name: 'Access Control Systems', slug: 'access-control', description: 'Biometric & card systems' },
        { name: 'Video Surveillance', slug: 'security-surveillance', description: 'AI camera integration' },
        { name: 'Perimeter Security', slug: 'security-surveillance', description: 'Gate & fence automation' }
      ]
    },
    {
      category: 'Residential Automation',
      items: [
        { name: 'Villa Automation', slug: 'smart-home-automation', description: 'Whole-home systems' },
        { name: 'Penthouse Systems', slug: 'smart-home-automation', description: 'High-rise integration' },
        { name: 'Motorized Shading', slug: 'motorized-blinds-curtains', description: 'Solar control & privacy' }
      ]
    },
    {
      category: 'Technical Resources',
      items: [
        { name: 'CAD Block Library', slug: '/partners/architects', description: 'AutoCAD & Revit families' },
        { name: 'Specification Sheets', slug: '/partners/architects', description: 'Technical documentation' },
        { name: 'Coordination Services', slug: '/partners/architects', description: 'MEP integration support' }
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
                  For Architects & Designers
                </span>
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                  DESIGN
                  <br />
                  <span className="text-transparent bg-clip-text metallic-gradient">WITH INTELLIGENCE</span>
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed mb-10">
                  Integrate smart technology that enhances your design vision. From concept to completion, we collaborate to deliver spaces where technology disappears.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/partners/architects">
                    <Button
                      size="lg"
                      className="bg-charcoal hover:bg-charcoal-light text-white w-full"
                    >
                      Download Resources
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-gray-300 hover:border-charcoal"
                    onClick={() => setShowConsultationForm(true)}
                  >
                    Technical Consultation
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
                  alt="Architectural design"
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
              <h2 className="text-4xl font-semibold mb-4">Why Partner with LEXA?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We support design teams from schematic design through construction documentation
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
              <h2 className="text-4xl font-semibold mb-4">Solutions for Architectural Projects</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Complete systems integration for residential and commercial projects
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
                          className="bg-white dark:bg-gray-800 p-6 border border-gray-200 hover:border-charcoal transition-all hover:shadow-lg"
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
                <p className="text-sm font-semibold uppercase tracking-wider">Design Tool</p>
              </div>
              <h2 className="text-5xl font-heading font-bold mb-6">Specify Smart Systems</h2>
              <p className="text-2xl text-white/90 mb-4">
                Use our builder to plan automation for your architectural projects
              </p>
              <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
                Select lighting control, AV systems, climate automation, and security. Generate technical specifications and budget estimates for client presentations.
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
                <p className="text-sm text-white/70">✓ Free to use  ✓ Technical specs  ✓ Budget estimates</p>
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
              <h2 className="text-4xl font-semibold mb-6">Ready to Collaborate?</h2>
              <p className="text-xl text-white/80 mb-10">
                Download our CAD block library, spec sheets, and schedule a technical coordination call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/partners/architects">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Access Resources
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black"
                  onClick={() => setShowConsultationForm(true)}
                >
                  Schedule Call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
        defaultPersona="architect"
      />
    </div>
  )
}

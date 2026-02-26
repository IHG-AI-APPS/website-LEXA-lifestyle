'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Home, Shield, Lightbulb, Smartphone, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

export default function HomeownerPage() {
  const cms = useCms('page_persona_homeowner', null) as any

  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const benefits = [
    {
      icon: Home,
      title: 'Seamless Living',
      description: 'Control everything from a single interface - lighting, climate, entertainment, security.'
    },
    {
      icon: Shield,
      title: 'Peace of Mind',
      description: 'Real-time monitoring and alerts. Know your home is secure, even when you\'re away.'
    },
    {
      icon: Lightbulb,
      title: 'Energy Efficiency',
      description: 'Intelligent automation reduces energy consumption by up to 30%.'
    },
    {
      icon: Smartphone,
      title: 'Intuitive Control',
      description: 'Simple, elegant interfaces that anyone can use. No technical expertise required.'
    },
  ]

  const solutions = [
    {
      category: 'Lighting & Atmosphere',
      items: [
        { name: 'Lighting Control', slug: 'lighting-automation', description: 'Automated scene-based control' },
        { name: 'Motorized Shades', slug: 'motorized-blinds-curtains', description: 'Sun tracking & privacy' },
        { name: 'Outdoor Lighting', slug: 'landscape-lighting-automation', description: 'Garden & pool lighting' }
      ]
    },
    {
      category: 'Climate & Comfort',
      items: [
        { name: 'Climate Control', slug: 'climate-control', description: 'Smart HVAC & thermostats' },
        { name: 'Energy Management', slug: 'energy-management', description: 'Monitor & optimize usage' },
        { name: 'Air Quality', slug: 'environmental-intelligence', description: 'Fresh air systems' }
      ]
    },
    {
      category: 'Entertainment',
      items: [
        { name: 'Home Cinema', slug: 'home-cinema', description: 'Private theater experience' },
        { name: 'Multi-Room Audio', slug: 'multi-room-audio', description: 'Whole-home music' },
        { name: 'Media Rooms', slug: 'home-theater', description: 'Family entertainment' }
      ]
    },
    {
      category: 'Security & Safety',
      items: [
        { name: 'Security Systems', slug: 'security-surveillance', description: 'Cameras & monitoring' },
        { name: 'Access Control', slug: 'access-control', description: 'Smart locks & gates' },
        { name: 'Video Intercom', slug: 'intercom-video-door-entry', description: 'See who\'s at door' }
      ]
    },
    {
      category: 'Outdoor Living',
      items: [
        { name: 'Pool Automation', slug: 'pool-spa-automation', description: 'Temperature & lighting' },
        { name: 'Garden Systems', slug: 'irrigation-automation', description: 'Smart watering' },
        { name: 'Outdoor Entertainment', slug: 'outdoor-av-systems', description: 'Patio audio & screens' }
      ]
    },
    {
      category: 'Smart Features',
      items: [
        { name: 'Voice Control', slug: 'voice-control', description: 'Alexa & Google Assistant' },
        { name: 'Whole Home Automation', slug: 'smart-home-automation', description: 'Complete integration' },
        { name: 'Network Infrastructure', slug: 'home-network', description: 'Reliable connectivity' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                  For Homeowners
                </span>
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                  YOUR HOME,
                  <br />
                  <span className="text-[#C9A962]">ELEVATED</span>
                </h1>
                <div className="h-px w-24 bg-[#C9A962]/30 mb-8" />
                <p className="text-base text-gray-300 leading-relaxed mb-10">
                  Transform your villa or apartment into an intelligent sanctuary. 
                  One-touch control for lighting, climate, entertainment, and security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-[#C9A962] hover:bg-[#C9A962]/90 text-gray-900 font-semibold"
                    onClick={() => setShowConsultationForm(true)}
                  >
                    Private Design Session
                  </Button>
                  <Link href="/experience-centre">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 w-full"
                    >
                      Visit Experience Centre
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
                  src="/images/premium/hero/hero-1.jpg"
                  alt="Luxury home interior"
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
              <h2 className="text-4xl font-semibold mb-4">Why Smart Home Automation?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Enhance comfort, security, and efficiency in your home
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
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"  
            >
              <h2 className="text-4xl font-semibold mb-4">Explore Our Solutions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Comprehensive smart home systems tailored for luxury living
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
              <h2 className="text-5xl font-heading font-bold mb-6">Build Your Custom Smart Home</h2>
              <p className="text-2xl text-white/90 mb-4">
                Use our interactive Project Builder to design your ideal smart home
              </p>
              <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
                Select features, get instant pricing, and receive a detailed proposal. Plan everything from lighting and security to entertainment and climate control—all in one place.
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
                <p className="text-sm text-white/70">✓ Free to use  ✓ Instant pricing  ✓ No obligation</p>
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
              <h2 className="text-4xl font-semibold mb-6">Ready to Transform Your Home?</h2>
              <p className="text-xl text-white/80 mb-10">
                Schedule a consultation with our smart home experts and discover the possibilities.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800"
                onClick={() => setShowConsultationForm(true)}
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}

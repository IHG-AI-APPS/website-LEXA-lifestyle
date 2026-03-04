'use client'

import { useState, useEffect } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import PersonaModal from './PersonaModal'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { motion } from 'framer-motion'
import { getSettings, type SiteSettings } from '@/lib/api'

export default function Hero() {
  const [showPersonaModal, setShowPersonaModal] = useState(false)
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    // Fetch site settings
    getSettings()
      .then(setSettings)
      .catch(err => console.error('Failed to load settings:', err))

    // Check for persona modal
    const hasSeenModal = localStorage.getItem('lexa_persona_modal_seen')
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowPersonaModal(true)
        localStorage.setItem('lexa_persona_modal_seen', 'true')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <section className="relative min-h-screen flex items-center bg-white grain" data-testid="hero-section">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(192, 192, 192, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(192, 192, 192, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-8 lg:px-16 py-32">
          {/* Full Width Layout */}
          <div className="max-w-7xl mx-auto">
            {/* Top Section - Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20"
            >
              <div className="mb-6">
                <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium">
                  Dubai / Premium Integration
                </span>
              </div>

              <h1 className="text-[clamp(4rem,12vw,14rem)] font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                LUXURY
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">SMART</span>
                <br />
                LIVING
              </h1>

              <div className="flex items-center gap-8 mb-12">
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent" />
                <p className="text-xl text-gray-600 dark:text-zinc-500 font-light max-w-2xl">
                  Seamlessly integrated. Architecturally refined.
                  <br className="hidden sm:block" />
                  Crestron · Lutron · Control4 · Savant
                </p>
              </div>

              {/* CTA Group */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-charcoal hover:bg-charcoal-light text-white border-0 px-10 py-7 text-sm font-medium tracking-wide transition-all duration-300"
                  onClick={() => setShowConsultationForm(true)}
                  data-testid="hero-book-consultation-btn"
                >
                  Private Design Session
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-gray-300 dark:border-zinc-700 hover:border-charcoal hover:bg-gray-50 text-charcoal px-10 py-7 text-sm font-medium tracking-wide transition-all duration-300"
                  onClick={() => window.location.href = '/solution-finder'}
                  data-testid="hero-quiz-btn"
                >
                  Find Your Solution
                </Button>
              </div>
            </motion.div>

            {/* Bottom Section - Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
            >
              {/* Large Image */}
              <div className="lg:col-span-2 relative h-[500px] lg:h-[600px] overflow-hidden group">
                <SafeImage
                  src="/images/premium/hero/hero-1.jpg"
                  alt="Luxury smart living"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%]"
                  quality={95}
                />
                {/* Platinum overlay corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-platinum/30 to-transparent" />
              </div>

              {/* Small Image + Stats */}
              <div className="space-y-6">
                <div className="relative h-[240px] lg:h-[280px] overflow-hidden group">
                  <SafeImage
                    src="/images/premium/hero/hero-2.jpg"
                    alt="Smart automation"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%]"
                    quality={95}
                  />
                </div>

                {/* Stats Card */}
                <div className="glass border border-gray-200 dark:border-zinc-800 p-8 space-y-6">
                  <div>
                    <div className="text-5xl font-semibold mb-1 tracking-tight">
                      {settings?.brands_count || 50}+
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gray-500">Premium Brands</div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-platinum/50 to-transparent" />
                  <div>
                    <div className="text-5xl font-semibold mb-1 tracking-tight">
                      {settings?.projects_count || 1000}+
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gray-500">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Info Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap gap-12 text-sm text-gray-500"
            >
              <div>
                <div className="text-xs tracking-wider uppercase mb-1">Experience</div>
                <div className="font-medium text-charcoal">{settings?.years_experience || 20}+ Years</div>
              </div>
              <div>
                <div className="text-xs tracking-wider uppercase mb-1">Support</div>
                <div className="font-medium text-charcoal">24/7 Available</div>
              </div>
              <div>
                <div className="text-xs tracking-wider uppercase mb-1">Center</div>
                <div className="font-medium text-charcoal">
                  {settings?.experience_center_size?.toLocaleString() || '60,000'} sq ft
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PersonaModal isOpen={showPersonaModal} onClose={() => setShowPersonaModal(false)} />
      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </>
  )
}

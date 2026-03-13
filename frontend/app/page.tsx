'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroCurator from '@/components/gallery/HeroCurator'
import PersonaModal from '@/components/sections/PersonaModal'

const Noop = () => null

// Dynamically import components for code splitting
const BrandMarquee = dynamic(() => import('@/components/gallery/BrandMarquee').catch(() => ({ default: Noop })), {
  ssr: false
})
const TetrisProjects = dynamic(() => import('@/components/gallery/TetrisProjects').catch(() => ({ default: Noop })))
const SolutionsBentoGrid = dynamic(() => import('@/components/homepage/SolutionsBentoGrid').catch(() => ({ default: Noop })), {
  ssr: false
})
const ExperienceCentreCTA = dynamic(() => import('@/components/homepage/ExperienceCentreCTA').catch(() => ({ default: Noop })))

// Value Proposition Section - Minimal and impactful
function ValueProposition() {
  return (
    <section className="bg-[#050505] py-24 md:py-32 lg:py-40" data-testid="value-proposition">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#C9A962] mb-6 block">
              The Invisible Technology
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-8">
              Luxury automation that{' '}
              <span className="text-[#C9A962]">disappears</span> into your lifestyle
            </h2>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-10">
              From cinematic entertainment to intelligent climate control, we craft bespoke smart home experiences for Dubai&apos;s most distinguished residences.
            </p>
            <Link 
              href="/solutions"
              className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors"
              data-testid="explore-solutions-link"
            >
              Explore Our Solutions
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '500+', label: 'Villas Automated' },
              { number: '15+', label: 'Years Experience' },
              { number: '50+', label: 'Developer Projects' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, idx) => (
              <div 
                key={stat.label}
                className="bg-[#111] border border-white/5 p-6 md:p-8"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-light text-[#C9A962] mb-2">
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Simple Brand Trust Section
function BrandTrust() {
  return (
    <section className="bg-[#0A0A0A] py-10 md:py-12 border-y border-white/5" data-testid="brand-trust">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between gap-8 mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Official Technology Partners
          </span>
          <Link 
            href="/brands" 
            className="text-[10px] uppercase tracking-[0.2em] text-[#C9A962] hover:text-white transition-colors"
          >
            View All Brands
          </Link>
        </div>
      </div>
      <BrandMarquee />
    </section>
  )
}

export default function HomePage() {
  const [showPersonaModal, setShowPersonaModal] = useState(false)

  return (
    <div className="bg-[#050505]" style={{ minHeight: '100vh' }} data-testid="homepage">
      {/* Hero - Full viewport with video */}
      <HeroCurator onPersonaClick={() => setShowPersonaModal(true)} />
      
      {/* Brand Trust - Minimal logo marquee */}
      <BrandTrust />
      
      {/* Value Proposition - Statement section */}
      <ValueProposition />
      
      {/* Featured Projects - 4 key projects */}
      <TetrisProjects />
      
      {/* Solutions Overview - Simplified grid */}
      <SolutionsBentoGrid />
      
      {/* CTA - Experience Centre */}
      <ExperienceCentreCTA />
      
      {/* Persona Modal */}
      <PersonaModal 
        isOpen={showPersonaModal} 
        onClose={() => setShowPersonaModal(false)}
      />
    </div>
  )
}

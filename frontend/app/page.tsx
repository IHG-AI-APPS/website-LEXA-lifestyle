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
const CalculatorCardsSection = dynamic(() => import('@/components/homepage/CalculatorCardsSection').catch(() => ({ default: Noop })), {
  ssr: false
})
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').catch(() => ({ default: Noop })), {
  ssr: false
})
const ExperienceCentreCTA = dynamic(() => import('@/components/homepage/ExperienceCentreCTA').catch(() => ({ default: Noop })))
const BrandPartners = dynamic(() => import('@/components/homepage/BrandPartners').catch(() => ({ default: Noop })), {
  ssr: false
})

// Animation variants for smooth entrance effects
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

// Value Proposition Section - Minimal and impactful
function ValueProposition() {
  return (
    <section className="bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden" data-testid="value-proposition">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#C9A962] mb-6 block"
            >
              The Invisible Technology
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-8"
            >
              Luxury automation that{' '}
              <span className="text-[#C9A962]">disappears</span> into your lifestyle
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-10"
            >
              From cinematic entertainment to intelligent climate control, we craft bespoke smart home experiences for Dubai&apos;s most distinguished residences.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                href="/solutions"
                className="group inline-flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors"
                data-testid="explore-solutions-link"
              >
                Explore Our Solutions
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-5 md:gap-6"
          >
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '30+', label: 'Developer Projects' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                variants={scaleIn}
                className="bg-[#111] border border-white/5 p-6 md:p-8 hover:border-[#C9A962]/20 transition-colors duration-500"
              >
                <motion.div 
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-[#C9A962] mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Simple Brand Trust Section with fade animation
function BrandTrust() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0A0A0A] py-8 md:py-10 border-y border-white/5" 
      data-testid="brand-trust"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-8 mb-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Official Technology Partners
          </span>
          <Link 
            href="/brands" 
            className="text-[10px] uppercase tracking-[0.2em] text-[#C9A962] hover:text-white transition-colors"
          >
            View All Brands
          </Link>
        </motion.div>
      </div>
      <BrandMarquee />
    </motion.section>
  )
}

// Section Wrapper with smooth entrance animation
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut" as const
      }}
      className={className}
    >
      {children}
    </motion.div>
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
      
      {/* Brand Partners - Grid of partner brands */}
      <BrandPartners />
      
      {/* Value Proposition - Statement section */}
      <ValueProposition />
      
      {/* Featured Projects - 4 key projects */}
      <AnimatedSection>
        <TetrisProjects />
      </AnimatedSection>
      
      {/* Solutions Overview - Simplified grid */}
      <AnimatedSection delay={0.1}>
        <SolutionsBentoGrid />
      </AnimatedSection>
      
      {/* Smart Tools - Calculator cards */}
      <AnimatedSection delay={0.1}>
        <CalculatorCardsSection />
      </AnimatedSection>
      
      {/* Testimonials - Social proof */}
      <AnimatedSection delay={0.1}>
        <Testimonials />
      </AnimatedSection>
      
      {/* CTA - Experience Centre */}
      <AnimatedSection delay={0.1}>
        <ExperienceCentreCTA />
      </AnimatedSection>
      
      {/* Persona Modal */}
      <PersonaModal 
        isOpen={showPersonaModal} 
        onClose={() => setShowPersonaModal(false)}
      />
    </div>
  )
}

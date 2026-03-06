'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'

const HERO_IMG = 'https://files.ihgbrands.com/lexa/migrated/96c7721cf6ca3415.webp'

const showcases = [
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/083ddbd93fdf1883.webp',
    label: 'Lighting Design',
    title: 'Design With Light',
    description: 'Integrate scene-based lighting seamlessly into your architectural vision. From concept to commissioning.',
    links: [
      { name: 'Lighting Control', href: '/solutions/lighting-automation' },
      { name: 'Consultation & Design', href: '/services/consultation-design' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/026172905abb74cf.webp',
    label: 'AV Integration',
    title: 'Invisible Technology',
    description: 'Hidden speakers, concealed screens, and architectural AV solutions that preserve your design intent.',
    links: [
      { name: 'Home Cinema', href: '/solutions/home-cinema' },
      { name: 'System Engineering', href: '/services/system-engineering-integration' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/43ed51fed9c48ea2.webp',
    label: 'Smart Systems',
    title: 'Unified Control',
    description: 'One platform for lighting, HVAC, security, and AV. Clean interfaces that complement your interiors.',
    links: [
      { name: 'Smart Automation', href: '/solutions/smart-home-automation' },
      { name: 'Network Infrastructure', href: '/solutions/home-network' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/75bc3731c4191546.webp',
    label: 'Outdoor Spaces',
    title: 'Landscape Intelligence',
    description: 'Smart irrigation, landscape lighting, and pool automation that extends the design language outdoors.',
    links: [
      { name: 'Landscape Lighting', href: '/solutions/landscape-lighting-automation' },
      { name: 'Pool Automation', href: '/solutions/pool-spa-automation' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ArchitectPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="architect-page">
      {/* ── Fullscreen Hero ── */}
      <section className="relative h-[85vh] w-full overflow-hidden" data-testid="architect-hero">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Architectural design studio" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full items-end px-6 sm:px-10 lg:px-20 pb-16 lg:pb-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A962]" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A962]/80 font-medium">For Architects & Designers</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Design<br />Without Limits
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
              We integrate smart systems into your architectural vision — not the other way around. Your design leads, technology follows.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
              <button onClick={() => setShowForm(true)} data-testid="architect-cta-consult" className="group flex items-center gap-2 h-11 px-6 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
                Partner With Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/brands" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">Our Brands</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Showcase Sections ── */}
      {showcases.map((item, i) => {
        const isReversed = i % 2 === 1
        return (
          <section key={item.label} className="relative" data-testid={`showcase-${i}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`relative h-[50vh] lg:h-auto ${isReversed ? 'lg:order-2' : ''}`}>
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              </motion.div>
              <div className={`flex items-center ${isReversed ? 'lg:order-1' : ''}`}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 max-w-lg">
                  <motion.span variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-[#C9A962] font-semibold">{item.label}</motion.span>
                  <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">{item.title}</motion.h2>
                  <motion.p variants={fadeUp} className="mt-4 text-sm text-white/50 leading-relaxed">{item.description}</motion.p>
                  <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                    {item.links.map(link => (
                      <Link key={link.href} href={link.href} className="group flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-white/60 hover:text-[#C9A962] transition-colors border border-white/10 hover:border-[#C9A962]/30 px-4 py-2">
                        {link.name} <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Design studio" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#050505]/70" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="relative z-10 text-center px-6 max-w-2xl">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Let&apos;s Collaborate</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/50">We work alongside architects from schematic design through to handover.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="group flex items-center gap-2 h-12 px-8 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
              Start a Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/projects" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">View Our Work</Link>
          </motion.div>
        </motion.div>
      </section>

      <ConsultationForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}

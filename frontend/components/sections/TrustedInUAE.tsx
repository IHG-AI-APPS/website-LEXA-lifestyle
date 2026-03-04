'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const DEFAULT_DATA = {
  technology_partners: [
    { name: 'Control4', type: 'Official Dealer' },
    { name: 'Crestron', type: 'Certified Integrator' },
    { name: 'Lutron', type: 'Authorized Partner' },
    { name: 'Sonos', type: 'Installation Partner' },
    { name: 'Samsung', type: 'Pro Partner' },
    { name: 'Sony', type: 'AV Partner' },
  ],
  trusted_by: [
    { name: 'Emaar', type: 'Developer' },
    { name: 'Nakheel', type: 'Developer' },
    { name: 'DAMAC', type: 'Developer' },
    { name: 'Sobha Realty', type: 'Developer' },
    { name: 'Meraas', type: 'Developer' },
    { name: 'Dubai Holding', type: 'Developer' },
  ],
  certifications: [
    { name: 'Control4 Diamond Dealer', year: '2024' },
    { name: 'Crestron Certified Programmer', year: '2024' },
    { name: 'CEDIA Member', year: 'Since 2018' },
    { name: 'KNX Partner', year: 'Certified' },
  ],
  stats: [
    { number: '500+', label: 'Villas Automated' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Developer Projects' },
    { number: '98%', label: 'Client Satisfaction' },
  ],
}

interface TrustedInUAEProps {
  variant?: 'full' | 'compact' | 'logos-only'
  showStats?: boolean
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TrustedInUAE({
  variant = 'full',
  showStats = true,
  className = '',
}: TrustedInUAEProps) {
  const [partnerData, setPartnerData] = useState(DEFAULT_DATA)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_trusted_uae`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.value) setPartnerData({ ...DEFAULT_DATA, ...d.value })
      })
      .catch(() => {})
  }, [])

  if (variant === 'logos-only') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] mb-6 text-zinc-500">Official Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {partnerData.technology_partners.slice(0, 4).map((p, i) => (
              <motion.span key={p.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-lg font-bold tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors">
                {p.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <section className={`py-12 bg-[#050505] ${className}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A962] font-semibold">Trusted Across UAE</span>
            <h3 className="text-2xl font-bold mt-2 text-white">500+ Luxury Homes Automated</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {partnerData.stats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="text-center">
                <div className="text-3xl font-light text-[#C9A962]">{s.number}</div>
                <div className="text-xs mt-1 text-zinc-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerData.technology_partners.map((p, i) => (
              <motion.span key={p.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-sm font-bold tracking-[0.15em] uppercase text-white/30 hover:text-white/70 transition-colors">
                {p.name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full variant
  return (
    <section className={`py-16 md:py-20 bg-[#050505] ${className}`} data-testid="trusted-section">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-7xl">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-14">
          <motion.span variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-[#C9A962] font-semibold">
            Why Dubai Trusts LEXA
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mt-3 text-white">
            The UAE&apos;s Premier Smart Home Partner
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-sm max-w-xl mx-auto text-zinc-500">
            Trusted by leading developers, architects, and homeowners across Dubai, Abu Dhabi, and the GCC.
          </motion.p>
        </motion.div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {partnerData.stats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} className="text-center py-6 border border-zinc-800/50 bg-[#0A0A0A]" data-testid={`stat-${i}`}>
                <div className="text-3xl md:text-4xl font-light text-[#C9A962]">{s.number}</div>
                <div className="text-xs mt-2 text-zinc-500 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Technology Partners */}
        <div className="mb-14">
          <h3 className="text-center text-[10px] uppercase tracking-[0.2em] mb-8 text-zinc-500">Official Technology Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerData.technology_partners.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="group flex flex-col items-center justify-center py-6 px-3 border border-zinc-800/50 bg-[#0A0A0A] hover:border-[#C9A962]/20 transition-colors" data-testid={`partner-${i}`}>
                <span className="text-lg font-bold tracking-[0.1em] uppercase text-white/50 group-hover:text-white transition-colors">{p.name}</span>
                <span className="text-[9px] mt-2 text-[#C9A962]/60 uppercase tracking-wider">{p.type}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted by Developers */}
        <div className="mb-14">
          <h3 className="text-center text-[10px] uppercase tracking-[0.2em] mb-8 text-zinc-500">Trusted by Leading UAE Developers</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {partnerData.trusted_by.map((c, i) => (
              <motion.span key={c.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="text-base font-bold tracking-[0.15em] uppercase text-white/30 hover:text-white/80 transition-colors cursor-default" data-testid={`client-${i}`}>
                {c.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="py-8 px-6 border border-zinc-800/50 bg-[#0A0A0A]">
          <h3 className="text-center text-[10px] uppercase tracking-[0.2em] mb-6 text-zinc-500">Certifications & Accreditations</h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {partnerData.certifications.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
                <span className="text-xs font-medium text-white">{c.name}</span>
                <span className="text-[10px] text-zinc-600">({c.year})</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

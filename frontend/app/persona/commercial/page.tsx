'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'

const HERO_IMG = 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/e464b2668ce2aac141d830c32df593eff70f7b4f5697874b9ecce5c382aa2e09.png'

const showcases = [
  {
    image: 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/2b760b43cd3f6e5a3ccdb6ecb49bd12ad5e536a08a4739c705f5749495d92bd9.png',
    label: 'Hospitality',
    title: 'Guest Experience',
    description: 'Smart room automation, intelligent lighting, and climate control that elevate the guest journey from check-in to check-out.',
    links: [
      { name: 'Lighting Control', href: '/solutions/lighting-automation' },
      { name: 'Climate Control', href: '/solutions/climate-control' },
    ],
  },
  {
    image: 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/6fa45225683f61aba71458062924256e7eec1058d92c4ae334f474c0f58c30a6.png',
    label: 'Corporate',
    title: 'Intelligent Workspaces',
    description: 'Boardroom AV, meeting room automation, and digital signage for productive, modern work environments.',
    links: [
      { name: 'Commercial AV', href: '/solutions/home-theater' },
      { name: 'Smart Automation', href: '/solutions/smart-home-automation' },
    ],
  },
  {
    image: 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/0fc00c111ed94684d005e986b1be25964e14babf4f51cf609f6d39f8918e96a2.png',
    label: 'Retail & F&B',
    title: 'Atmosphere On Demand',
    description: 'Background music, mood lighting, and digital displays that create memorable brand experiences.',
    links: [
      { name: 'Multi-Zone Audio', href: '/solutions/multi-room-audio' },
      { name: 'Security', href: '/solutions/security-surveillance' },
    ],
  },
  {
    image: 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/8aa01c5e657737d456924397ccac796d22ab20e2bc69224c8a17c64e22485d35.png',
    label: 'Infrastructure',
    title: 'Enterprise Grade',
    description: 'Robust network infrastructure, centralized management, and scalable systems built for commercial demands.',
    links: [
      { name: 'Network Infrastructure', href: '/solutions/home-network' },
      { name: 'Energy Management', href: '/solutions/energy-management' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function CommercialPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="commercial-page">
      <section className="relative h-[85vh] w-full overflow-hidden" data-testid="commercial-hero">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Luxury commercial interior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full items-end px-6 sm:px-10 lg:px-20 pb-16 lg:pb-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A962]" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A962]/80 font-medium">For Commercial</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Spaces That<br />Perform
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
              Hotels, offices, restaurants, and retail — intelligent automation that enhances every commercial experience.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
              <button onClick={() => setShowForm(true)} data-testid="commercial-cta-consult" className="group flex items-center gap-2 h-11 px-6 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
                Request Proposal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/projects" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">Case Studies</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

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

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Commercial space" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#050505]/70" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="relative z-10 text-center px-6 max-w-2xl">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Transform Your Space</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/50">From concept to commissioning — commercial automation at any scale.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="group flex items-center gap-2 h-12 px-8 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
              Get a Proposal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/experience-centre" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">Visit Showroom</Link>
          </motion.div>
        </motion.div>
      </section>

      <ConsultationForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}

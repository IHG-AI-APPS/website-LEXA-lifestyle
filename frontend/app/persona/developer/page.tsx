'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'

const HERO_IMG = 'https://files.ihgbrands.com/lexa/migrated/1750c8ba4687e5e7.png'

const showcases = [
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/ff63df2cbb04eccb.png',
    label: 'Villa Automation',
    title: 'Premium Specs, Standard',
    description: 'Pre-wire and automate entire villa communities. Smart home as a standard feature, not an upgrade.',
    links: [
      { name: 'Villa Automation', href: '/solutions/luxury-villa-automation' },
      { name: 'Project Management', href: '/services/project-management' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/083ddbd93fdf1883.png',
    label: 'Lighting & AV',
    title: 'Differentiate Your Product',
    description: 'Smart lighting, cinema rooms, and whole-home audio that elevate your development above competitors.',
    links: [
      { name: 'Lighting Control', href: '/solutions/lighting-automation' },
      { name: 'Home Cinema', href: '/solutions/home-cinema' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/43ed51fed9c48ea2.png',
    label: 'Security & Infrastructure',
    title: 'Built-In Intelligence',
    description: 'Enterprise-grade network infrastructure, CCTV, and access control — integrated from ground-up.',
    links: [
      { name: 'Security Systems', href: '/solutions/security-surveillance' },
      { name: 'Network Infrastructure', href: '/solutions/home-network' },
    ],
  },
  {
    image: 'https://files.ihgbrands.com/lexa/migrated/75bc3731c4191546.png',
    label: 'Outdoor & Landscape',
    title: 'Complete Lifestyle Package',
    description: 'Pool automation, landscape lighting, and outdoor entertainment systems for the full luxury experience.',
    links: [
      { name: 'Pool Automation', href: '/solutions/pool-spa-automation' },
      { name: 'Landscape Lighting', href: '/solutions/landscape-lighting-automation' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function DeveloperPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="developer-page">
      <section className="relative h-[85vh] w-full overflow-hidden" data-testid="developer-hero">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Luxury villa development" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        </div>
        <div className="relative z-10 flex h-full items-end px-6 sm:px-10 lg:px-20 pb-16 lg:pb-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A962]" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A962]/80 font-medium">For Developers</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Build<br />Smarter
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
              Smart home integration at scale. From villa communities to luxury towers — technology that adds measurable value to your development.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
              <button onClick={() => setShowForm(true)} data-testid="developer-cta-consult" className="group flex items-center gap-2 h-11 px-6 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
                Developer Partnership <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/projects" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">Our Projects</Link>
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
          <img src={HERO_IMG} alt="Villa development" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#050505]/70" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="relative z-10 text-center px-6 max-w-2xl">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Scale With Confidence</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-white/50">From single villas to 200+ unit communities — we deliver on time and on spec.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="group flex items-center gap-2 h-12 px-8 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors">
              Discuss Your Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/experience-centre" className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A962] transition-colors">Visit Showroom</Link>
          </motion.div>
        </motion.div>
      </section>

      <ConsultationForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}

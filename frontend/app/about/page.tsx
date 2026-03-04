'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import TeamSection from '@/components/sections/TeamSection'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Award, Users, Building, Target, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

const ICON_MAP: Record<string, any> = { Award, Users, Building, Target }

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const cmsData = useCms<any>('page_about', null)

  const values = cmsData?.values?.length ? cmsData.values.map((v: any) => ({ icon: ICON_MAP[v.icon] || Award, title: language === 'ar' ? v.title_ar : v.title_en, description: language === 'ar' ? v.description_ar : v.description_en })) : [
    { icon: Award, title: 'Innovation with Purpose', description: 'We select and integrate technologies that genuinely improve comfort, control, and lifestyle.' },
    { icon: Users, title: 'Design-Led Thinking', description: 'Every solution respects architecture, interiors, and the way our clients live in their spaces.' },
    { icon: Building, title: 'Uncompromising Quality', description: 'From brands we partner with to the cables behind the walls, we insist on long-term reliability.' },
    { icon: Target, title: 'Client-Centric Delivery', description: 'We communicate clearly, meet timelines, and stay accountable from concept to completion.' },
  ]

  const milestones = cmsData?.milestones?.length ? cmsData.milestones.map((m: any) => ({ year: m.year, title: language === 'ar' ? m.title_ar : m.title_en, description: language === 'ar' ? (m.description_ar || m.description_en) : m.description_en })) : [
    { year: '2005', title: 'Founded in Dubai', description: 'Started with a vision to elevate smart living in the UAE' },
    { year: '2010', title: 'Experience Center', description: 'Opened 60,000 sq ft showroom showcasing integrated systems' },
    { year: '2015', title: '500 Projects', description: 'Milestone achievement across residential and commercial sectors' },
    { year: '2020', title: 'Regional Expansion', description: 'Extended services across GCC markets' },
    { year: '2025', title: '1,000+ Projects', description: 'Trusted partner for luxury developments and high-end residences' },
  ]

  const partners = cmsData?.partners?.length ? cmsData.partners : ['Crestron', 'Lutron', 'Control4', 'Savant', 'Bang & Olufsen', 'Sonos', 'Bowers & Wilkins', 'Nest']

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="about-page">
      {/* Hero — Center Aligned with Background Image */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white pt-12 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SafeImage src="https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/68c828f25b0cc3122f3c65c09ee7c970b0bec9800e1bf159e31833ccf16e406f.png" alt="LEXA Lifestyle" fill className="object-cover opacity-40" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="about-badge">
                {language === 'ar' ? 'عن ليكسا' : 'About LEXA'}
              </span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="about-title">
                Designed for Excellence
              </h1>
              <p className="hero-animate-desc text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
                At Lexa Lifestyle, we believe luxury is defined by seamless experiences, intelligent design, and refined living. Based in Dubai, we specialize in high-end audio-visual systems, smart home automation, and bespoke lifestyle solutions.
              </p>
              <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta">
                  Start Your Project <ArrowRight className="ml-2" size={18} />
                </Button>
                <Link href="/experience-centre">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Visit Showroom</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-gray-50 dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {[{ value: '1,000+', label: 'Projects Delivered' }, { value: '20+', label: 'Years Experience' }, { value: '32+', label: 'Brand Partners' }, { value: '4.9/5', label: 'Client Rating' }].map((stat, i) => (
              <div key={i}><p className="text-2xl font-bold text-[#C9A962]">{stat.value}</p><p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="values-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Principles</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-gray-50 dark:bg-[#0A0A0A] rounded-xl p-7 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow group text-center">
                    <div className="w-14 h-14 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 mx-auto group-hover:bg-[#C9A962] transition-colors">
                      <Icon className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={24} />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-500 leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-16 lg:py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white" data-testid="journey-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Journey</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-10">Two Decades of Innovation</h2>
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-8 items-start border-b border-gray-800 pb-8">
                  <span className="text-3xl font-bold text-[#C9A962] min-w-[80px]">{milestone.year}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="partners-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Certified Partners</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Brand Partners</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partners.map((brand: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.04 }} className="group">
                  <Link href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                    className="flex flex-col items-center justify-center p-5 h-24 rounded-xl bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-zinc-800 hover:border-[#C9A962]/60 hover:shadow-md transition-all">
                    <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#C9A962] transition-colors">{brand}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Partner</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Work With Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Let&apos;s Build Something Extraordinary</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Start your smart home journey with Dubai&apos;s most trusted automation partner.</p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-button">
                Start Your Project
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

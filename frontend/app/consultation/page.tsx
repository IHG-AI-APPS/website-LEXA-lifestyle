'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import BookingModal from '@/components/modals/BookingModal'
import Link from 'next/link'
import { Calendar, CheckCircle2, Clock, Home, FileText, Wrench, Headphones, Shield, Award, Phone, MapPin, Video, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const ICON_MAP: Record<string, any> = { Calendar, MapPin, Home, Video, FileText, Wrench, Headphones, CheckCircle2, Clock }

export default function ConsultationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const cms = useCms('page_consultation', null) as any

  const consultationTypes = cms?.consultation_types?.length ? cms.consultation_types.map((t: any) => ({ icon: ICON_MAP[t.icon] || MapPin, title: t.title, duration: t.duration, description: t.description, features: t.features || [], cta: t.cta, popular: t.popular || false })) : [
    { icon: MapPin, title: 'Free Site Visit', duration: '60-90 minutes', description: 'Our expert team visits your property for a comprehensive survey', features: ['Property assessment', 'Technical recommendations', 'Budget discussion', 'Timeline planning'], cta: 'Schedule Site Visit', popular: true },
    { icon: Home, title: 'Experience Center Tour', duration: '45-60 minutes', description: 'Visit our showroom to see smart home systems in action', features: ['Live product demonstrations', 'Touch and feel devices', 'Compare solutions', 'Q&A with specialists'], cta: 'Book Center Visit', popular: false },
    { icon: Video, title: 'Video Consultation', duration: '30 minutes', description: 'Virtual meeting with our smart home experts', features: ['Screen share capabilities', 'Discuss your project', 'Get preliminary quotes', 'Q&A session'], cta: 'Schedule Video Call', popular: false }
  ]

  const processSteps = [
    { number: '01', icon: Calendar, title: 'Private Design Session', description: 'Choose your preferred consultation type and select a convenient time slot' },
    { number: '02', icon: FileText, title: 'Discover & Design', description: 'We assess your needs, discuss solutions, and create a tailored proposal' },
    { number: '03', icon: Wrench, title: 'Installation', description: 'Professional installation by certified technicians with minimal disruption' },
    { number: '04', icon: Headphones, title: 'Ongoing Support', description: 'Lifetime support, warranty coverage, and system optimization' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="consultation-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=50" alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Free Consultation</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="consultation-title">Book Your Free Consultation</h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">Every LEXA project begins with a conversation. Choose how you&apos;d like to connect with our smart home experts.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowBookingModal(true)} data-testid="hero-cta">
              Book Now <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="consultation-types">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Choose Your Format</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Consultation Options</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {consultationTypes.map((type: any, i: number) => {
                const Icon = type.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`relative rounded-2xl border-2 bg-white dark:bg-gray-900 p-8 ${type.popular ? 'border-[#C9A962] shadow-xl' : 'border-gray-200 dark:border-gray-700'} transition-all hover:shadow-lg`}>
                    {type.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#C9A962] text-gray-900 text-xs font-bold rounded-full">Most Popular</div>}
                    <div className="w-12 h-12 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5">
                      <Icon className="text-white dark:text-gray-900" size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{type.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#C9A962] mb-3"><Clock size={14} />{type.duration}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{type.description}</p>
                    <ul className="space-y-2 mb-6">
                      {type.features.map((feat: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{feat}</li>
                      ))}
                    </ul>
                    <Button className={`w-full font-semibold ${type.popular ? 'bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200'}`} onClick={() => setShowBookingModal(true)}>
                      {type.cta} <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="process-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Simple Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center mb-4 mx-auto border-2 border-[#C9A962]/30">
                      <span className="text-[#C9A962] font-bold text-lg">{step.number}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[{ value: '100%', label: 'Free Consultation' }, { value: '500+', label: 'Projects Delivered' }, { value: '24/7', label: 'Support Available' }, { value: '4.9/5', label: 'Client Rating' }].map((stat, i) => (
              <div key={i}><p className="text-2xl font-bold text-[#C9A962]">{stat.value}</p><p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-gray-900 dark:text-white">Let&apos;s Discuss Your Project</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">No obligation, no pressure. Just expert advice tailored to your property.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowBookingModal(true)} data-testid="cta-book">
                Book Free Consultation
              </Button>
              <a href="tel:+971503267227"><Button size="lg" variant="outline" className="border-gray-300 dark:border-gray-700 px-8"><Phone className="mr-2" size={16} /> Call Now</Button></a>
            </div>
          </div>
        </div>
      </section>

      {showBookingModal && <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />}
    </div>
  )
}

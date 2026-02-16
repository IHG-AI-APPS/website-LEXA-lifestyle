'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/conversion/TrustBar'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import {
  CheckCircle2,
  X,
  ArrowRight,
  Film,
  Users,
  Building2,
  Ruler
} from 'lucide-react'

export default function LuxuryHomeCinemaDubaiPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1673512703111-c38c42a1f1a3"
            alt="Luxury Home Cinema Dubai"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 content-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-tight mb-6 md:mb-8">
              Luxury Home Cinema<br />
              <span className="text-[#E8DCC8]">in Dubai</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 mb-4 md:mb-6 max-w-4xl mx-auto font-light">
              Private Cinematic Experiences. Designed, Engineered & Delivered End-to-End.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your villa or penthouse into a true private cinema — engineered with professional acoustics, architectural lighting, premium seating, AV systems, networking, and intelligent controls.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'}`, '_blank')}
                className="w-full sm:w-auto bg-[#E8DCC8] hover:bg-[#B5952F] text-white rounded-none px-8 py-5 md:px-12 md:py-7 text-xs sm:text-sm font-bold uppercase tracking-widest"
              >
                WhatsApp for Instant Concept
              </Button>
              <Link href="/consultation" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-5 md:px-12 md:py-7 text-xs sm:text-sm font-bold uppercase tracking-widest"
                >
                  Book Private Design Session
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-12 md:py-16 bg-[#121212]">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-[#E8DCC8] mb-6 md:mb-8 text-center">Who This Is For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Users, title: 'Villa & Penthouse Owners', desc: 'Dedicated cinema spaces with architectural integration' },
                { icon: Ruler, title: 'Architects & Interior Designers', desc: 'Technical coordination for luxury developments' },
                { icon: Building2, title: 'Developers & Hospitality Projects', desc: 'Show villa cinemas, hotel entertainment suites' }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E8DCC8]/20 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8DCC8]" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS WE SOLVE */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#0A0A0A]">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">Common Problems We Solve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { problem: 'Poor sound clarity and echo', impact: 'Dialogue unintelligible, no cinematic immersion' },
                { problem: 'Wrong screen size or viewing angles', impact: 'Image too small or viewing position uncomfortable' },
                { problem: 'Messy wiring and exposed equipment', impact: 'Cables visible, equipment racks ruining aesthetics' },
                { problem: 'Generic lighting ruining cinema ambience', impact: 'Cannot create theater atmosphere, light bleed' },
                { problem: 'Multiple remotes and complicated controls', impact: 'Family cannot operate, constant tech support needed' },
                { problem: 'No long-term support after installation', impact: 'Installer disappears, no AMC, equipment fails' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-4 border-l-4 border-red-500/50 bg-[#121212] p-6 rounded-r-xl"
                >
                  <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.problem}</h3>
                    <p className="text-sm text-zinc-400">{item.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT LEXA DELIVERS */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#121212]">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">What LEXA Delivers</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                'Civil + Acoustic construction',
                'Cinema lighting scenes',
                'Dolby Atmos surround sound',
                'Projection / LED cinema displays',
                'Luxury seating & furnishings',
                'AV networking & IT backbone',
                'One-touch control via app or touch panel',
                'Full commissioning & documentation',
                'AMC and after-sales support'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#E8DCC8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR TECHNICAL PROCESS */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#0A0A0A]">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-4 text-center">Our Technical Process</h2>
            <p className="text-center text-zinc-400 mb-16">Every cinema is engineered — not assembled.</p>
            
            <div className="grid md:grid-cols-7 gap-4">
              {[
                { title: 'Discovery' },
                { title: 'Acoustic Design' },
                { title: 'Civil Works' },
                { title: 'AV Installation' },
                { title: 'Calibration' },
                { title: 'User Training' },
                { title: 'Ongoing Support' }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-[#E8DCC8]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#E8DCC8] font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-300">{phase.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar variant="inline" />

      {/* WHY CLIENTS CHOOSE LEXA */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#121212]">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">Why Clients Choose LEXA</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'UAE-based integration team',
                'Dedicated Experience Centre',
                'Design-first engineering',
                'Clean installation standards',
                'One partner across all systems',
                'Long-term AMC support'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#E8DCC8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* READY TO BUILD YOUR CINEMA */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#E8DCC8] via-[#B5952F] to-[#E8DCC8]">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Ready to Build Your Cinema?
            </h2>
            <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
              Get your personalized cinema concept within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'}?text=${encodeURIComponent('Hi LEXA! I want a cinema concept within 24 hours.')}`, '_blank')}
                className="bg-black text-white hover:bg-black/90 rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
              >
                WhatsApp Concept
              </Button>
              <Link href="/consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  Schedule Site Visit
                </Button>
              </Link>
              <Link href="/experience-centre">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  Visit Experience Centre
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'Experience Centre',
            description: 'Visit our Dubai showroom to experience cinema systems live.',
            href: '/experience-centre',
            category: 'Visit Us'
          },
          {
            title: 'High-Fidelity Audio',
            description: 'Audiophile-grade listening rooms and music systems.',
            href: '/solutions/hifi-audio',
            category: 'Related Solution'
          },
          {
            title: 'Smart Residential Living',
            description: 'Integrate your cinema with whole-home automation.',
            href: '/solutions/smart-home',
            category: 'Related Solution'
          },
          {
            title: 'Projects Portfolio',
            description: 'Browse our luxury cinema installations.',
            href: '/projects',
            category: 'Our Work'
          },
          {
            title: 'Cinema Configurator',
            description: 'Get instant pricing for your home theater project.',
            href: '/cinema-configurator',
            category: 'Quick Quote'
          },
          {
            title: 'Full Calculator',
            description: 'Estimate costs for your complete smart home.',
            href: '/calculator',
            category: 'Tools'
          }
        ]}
        title="Explore More Solutions"
        subtitle="Discover how LEXA can transform your entire home"
      />

      <TrustBar variant="sticky" />
    </div>
  )
}

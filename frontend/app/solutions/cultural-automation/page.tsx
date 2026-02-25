'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/conversion/TrustBar'
import {
import { useCms } from '@/hooks/useCms'
  Moon,
  Building2,
  Radio,
  CheckCircle2,
  ArrowRight,
  Clock,
  Volume2,
  Lightbulb,
  Home,
  Users
} from 'lucide-react'

export default function CulturalAutomationPage() {
  const cms = useCms('page_solutions_cultural_automation', null)

  const solutions = [
    {
      icon: Moon,
      title: 'Masjid & Mosque Automation',
      description: 'Automated Azan scheduling, prayer timing systems, multi-zone audio, intelligent lighting, and climate control for mosques and Islamic centers.',
      link: '/solutions/cultural-automation/masjid-automation',
      badge: 'Most Popular',
      features: ['Automated Azan', 'Multi-Zone Audio', 'Smart Lighting', 'Climate Control']
    },
    {
      icon: Home,
      title: 'Majlis & Cultural Spaces',
      description: 'Traditional meeting rooms with modern automation for lighting scenes, climate control, motorized curtains, and integrated entertainment.',
      link: '/solutions/cultural-automation/majlis-automation',
      features: ['Lighting Scenes', 'Motorized Curtains', 'Audio System', 'Privacy Control']
    },
    {
      icon: Radio,
      title: 'Prayer Room Systems',
      description: 'Commercial building prayer facilities with Qibla indicators, LED timing displays, audio alerts, and occupancy management.',
      link: '/solutions/cultural-automation/prayer-room-systems',
      features: ['Qibla Display', 'Prayer Times', 'Audio Alerts', 'Occupancy Sensors']
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1590073844006-33fa9c818a2c"
            alt="Cultural Automation"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-6 rounded-full bg-[#E8DCC8] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Cultural & Islamic Spaces
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
              CULTURAL SPACE
              <br />
              <span className="text-[#E8DCC8]">AUTOMATION</span>
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-300 mb-4 max-w-4xl mx-auto font-light">
              Technology Serving Culture with Respect and Precision.
            </p>
            <p className="text-lg text-zinc-400 mb-12 max-w-3xl mx-auto">
              Intelligent automation for mosques, majlis, prayer rooms, and cultural centers designed with sensitivity to sacred spaces.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/consultation">
                <Button
                  size="lg"
                  className="bg-[#E8DCC8] hover:bg-[#B5952F] text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  Request Cultural Automation
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium mb-4">Our Cultural Space Solutions</h2>
            <p className="text-zinc-400">Specialized systems for every cultural need</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              return (
                <Link key={index} href={solution.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="group relative border-2 border-zinc-800 hover:border-[#E8DCC8] bg-[#0A0A0A] p-8 rounded-xl transition-all h-full"
                  >
                    {solution.badge && (
                      <div className="absolute top-4 right-4 rounded-full bg-[#E8DCC8] px-3 py-1 text-xs font-bold uppercase">
                        {solution.badge}
                      </div>
                    )}
                    <div className="w-16 h-16 bg-[#E8DCC8]/20 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#E8DCC8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#E8DCC8] transition-colors">{solution.title}</h3>
                    <p className="text-zinc-400 mb-6 leading-relaxed">{solution.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#E8DCC8] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center gap-2 text-[#E8DCC8] font-bold text-sm group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose LEXA for Cultural Spaces */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">Why Cultural Spaces Trust LEXA</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: 'Precision Timing', desc: 'GPS-accurate prayer time calculations' },
                { icon: Volume2, title: 'Clear Audio', desc: 'Professional PA systems for clarity' },
                { icon: Lightbulb, title: 'Respectful Design', desc: 'Discreet installation, sensitive to sacred spaces' },
                { icon: Moon, title: 'Islamic Expertise', desc: 'Understanding of cultural requirements' },
                { icon: CheckCircle2, title: 'Proven Reliability', desc: '99.9% uptime, systems that work' },
                { icon: Users, title: 'Local Support', desc: 'UAE-based team, Arabic-speaking engineers' }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-[#E8DCC8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#E8DCC8]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium mb-16">Trusted Across the UAE</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: '150+', label: 'Cultural Spaces' },
                { number: '99.9%', label: 'System Accuracy' },
                { number: '15+', label: 'Years in UAE' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-5xl font-bold text-[#E8DCC8] mb-2">{stat.number}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[#E8DCC8] via-[#B5952F] to-[#E8DCC8]">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Ready to Enhance Your Cultural Space?
            </h2>
            <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
              Get a detailed proposal for your mosque, majlis, or prayer facility
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/consultation">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90 rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  Request Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  Schedule Site Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar variant="sticky" />
    </div>
  )
}

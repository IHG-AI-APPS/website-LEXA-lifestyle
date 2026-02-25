'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, Users, Award, MapPin, Mail, ArrowRight, ChevronDown, ChevronUp, Lightbulb, Film, Speaker, Shield, Home, Waves, GraduationCap, Heart, TrendingUp, Clock, CheckCircle2, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

const expertiseAreas = [
  { icon: Home, title: 'Smart Home Automation', description: 'Control4, Crestron, Savant system design and programming', skills: ['System Design', 'Programming', 'Integration', 'Commissioning'] },
  { icon: Lightbulb, title: 'Lighting Control', description: 'Lutron, Ketra, Philips Dynalite lighting design and installation', skills: ['Lutron RadioRA 3', 'Homeworks QSX', 'Circadian Design', 'DMX'] },
  { icon: Film, title: 'Home Cinema & AV', description: 'Private cinema design, Dolby Atmos, ISF calibration', skills: ['Acoustic Design', 'Video Calibration', 'Dolby Atmos', 'Projection'] },
  { icon: Speaker, title: 'High-End Audio', description: 'Premium HiFi systems, multi-room audio, architectural speakers', skills: ['B&W', 'McIntosh', 'Sonance', 'KEF', 'System Tuning'] },
  { icon: Shield, title: 'Security & Access', description: 'CCTV, access control, alarm systems, remote monitoring', skills: ['IP Cameras', 'Biometrics', 'Intercom', 'Monitoring'] },
  { icon: Waves, title: 'Marine & Outdoor', description: 'Yacht automation, outdoor entertainment, pool systems', skills: ['Marine Grade', 'Weather-Proof', 'Landscape Audio', 'Pool Control'] },
]

const benefits = [
  { icon: TrendingUp, title: 'Career Growth', desc: 'Clear progression paths and continuous learning' },
  { icon: GraduationCap, title: 'Training & Certifications', desc: 'Manufacturer training paid by company' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance' },
  { icon: Clock, title: 'Work-Life Balance', desc: 'Flexible schedules and generous leave' },
]

const openPositions = [
  { title: 'Smart Home Programmer', type: 'Full-time', location: 'Dubai', experience: '3-5 years', department: 'Technical', description: 'Design and program Control4, Crestron, and Savant automation systems for luxury residential projects across UAE.' },
  { title: 'AV Installation Technician', type: 'Full-time', location: 'Dubai', experience: '2-4 years', department: 'Installation', description: 'Install and commission high-end audio-visual systems in luxury residences, commercial spaces, and marine vessels.' },
  { title: 'Project Manager - Smart Home', type: 'Full-time', location: 'Dubai', experience: '5-8 years', department: 'Management', description: 'Manage end-to-end delivery of smart home and AV projects from design through to handover and support.' },
  { title: 'Sales Engineer', type: 'Full-time', location: 'Dubai / Abu Dhabi', experience: '3-5 years', department: 'Sales', description: 'Drive revenue growth through consultative selling of smart home and AV solutions to HNW clients.' },
]

export default function WorkWithUsPage() {
  const cms = useCms('page_work_with_us', null)
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="work-with-us-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Careers at LEXA</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight" data-testid="careers-title">Join the Team Shaping the Future of Smart Living</h1>
            <p className="text-base text-gray-300 max-w-lg leading-relaxed mb-8">We&apos;re building the most talented smart home team in the Middle East. If you&apos;re passionate about technology and luxury living, we want to hear from you.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" asChild>
              <a href="#positions">View Open Positions <ArrowRight className="ml-2" size={18} /></a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="expertise-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Disciplines</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Areas of Expertise</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area, i) => {
                const Icon = area.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-7 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                    <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                      <Icon className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{area.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, j) => (<span key={j} className="px-2 py-1 bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">{skill}</span>))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why Join LEXA</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Perks & Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-center p-5">
                    <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center mb-3 mx-auto border-2 border-[#C9A962]/30">
                      <Icon className="text-[#C9A962]" size={20} />
                    </div>
                    <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{b.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="positions-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Join Us</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Open Positions</h2>
            </div>
            <div className="space-y-4">
              {openPositions.map((job, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden" data-testid={`job-card-${i}`}>
                  <button onClick={() => setExpandedJob(expandedJob === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{job.experience}</span>
                      </div>
                    </div>
                    {expandedJob === i ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {expandedJob === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{job.description}</p>
                        <Button size="sm" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" asChild>
                          <a href={`mailto:careers@lexalifestyle.com?subject=Application: ${job.title}`}>Apply Now <ArrowRight className="ml-2" size={14} /></a>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Don&apos;t See Your Role?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Send Us Your CV</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">We&apos;re always looking for talented individuals. Send your CV and we&apos;ll keep you in mind.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
              <a href="mailto:careers@lexalifestyle.com">Email Your CV <ArrowRight className="ml-2" size={18} /></a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

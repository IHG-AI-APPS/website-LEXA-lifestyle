'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Award, Shield, FileCheck, CheckCircle2, GraduationCap, ClipboardCheck, Settings, BookOpen, Users, Star, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCms } from '@/hooks/useCms'

export default function CertificationStandardPage() {
  const cms = useCms('page_certification_standard', null) as any

  const standards = [
    { icon: FileCheck, title: 'Installation Standards', description: 'Rigorous 47-point installation protocol ensuring consistent quality', items: ['Pre-installation site verification', 'Cable management to TIA/EIA-568 standards', 'Equipment mounting per manufacturer specs', 'System integration testing protocols', 'Final quality inspection checklist'] },
    { icon: ClipboardCheck, title: 'QA Checklist', description: 'Multi-stage quality assurance with documented verification', items: ['Pre-installation equipment inspection', 'In-progress milestone reviews', 'Functional testing at 50% completion', 'Full system commissioning tests', 'Post-installation performance audit'] },
    { icon: Settings, title: 'AMC Framework', description: 'Comprehensive Annual Maintenance Contract with proactive care', items: ['Quarterly preventive maintenance visits', 'Software updates and security patches', 'Performance optimization & tuning', 'Priority support with 4-hour response', 'Annual system health report'] },
    { icon: BookOpen, title: 'Documentation Standard', description: 'Complete technical documentation for every installation', items: ['As-built CAD drawings', 'Network topology diagrams', 'Equipment specifications & warranties', 'Programming logic & scenes', 'Maintenance schedules & procedures'] },
    { icon: GraduationCap, title: 'Training Process', description: 'Comprehensive user training ensuring confidence', items: ['On-site system walkthrough (2-3 hours)', 'User interface training for all residents', 'Common scenarios practice sessions', 'Emergency procedures & troubleshooting', 'Training video library access'] },
    { icon: Users, title: 'Handover Process', description: 'Structured 5-phase handover ensuring seamless transition', items: ['System demonstration & acceptance', 'Documentation package delivery', 'Warranty registration & activation', 'Support team introduction', '30-day follow-up optimization visit'] },
  ]

  const certifications = [
    { name: 'Control4 Certified Professional', level: 'Platinum' },
    { name: 'Crestron Diamond Dealer', level: 'Diamond' },
    { name: 'Lutron Palladiom Certified', level: 'Elite' },
    { name: 'Savant Authorized Dealer', level: 'Premier' },
    { name: 'KNX Certified Partner', level: 'Professional' },
    { name: 'CEDIA Member', level: 'Member Since 2015' },
  ]

  const qaMetrics = [
    { metric: 'Installation Quality Score', value: '99.2%' },
    { metric: 'First-Time Acceptance Rate', value: '97.8%' },
    { metric: 'Customer Satisfaction (NPS)', value: '94/100' },
    { metric: 'On-Time Completion', value: '96.5%' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="certification-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Quality Assured</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="certification-title">LEXA Certified Integration Standard</h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto mb-8">The UAE&apos;s only smart home integrator with documented engineering standards, manufacturer certifications, and quality-assured processes.</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Shield size={16} className="text-green-400" /><span>ISO 9001 Processes</span></div>
              <div className="flex items-center gap-2"><Award size={16} className="text-[#C9A962]" /><span>6 Certifications</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /><span>500+ Projects</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* QA Metrics */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {qaMetrics.map((m, i) => (
              <div key={i}><p className="text-2xl font-bold text-[#C9A962]">{m.value}</p><p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{m.metric}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="standards-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Processes</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Engineering Standards</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((std, i) => {
                const Icon = std.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                    <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                    <div className="p-7">
                      <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                        <Icon className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                      </div>
                      <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{std.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{std.description}</p>
                      <ul className="space-y-2">
                        {std.items.map((item, j) => (<li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{item}</li>))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="certifications-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Credentials</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Manufacturer Certifications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="text-[#C9A962]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-xs text-[#C9A962] font-medium">{cert.level}</p>
                  </div>
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
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Experience the Difference</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Ready for Certified Quality?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Experience the LEXA standard — from consultation to installation to lifetime support.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
                <Link href="/consultation">Book Consultation <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link href="/experience-centre">Visit Showroom</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import Link from 'next/link'
import { Search, Pencil, Wrench, Code, Headphones, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const phases = [
  { number: '01', icon: Search, title: 'Discovery & Consultation', duration: '1-2 Weeks', description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and technical requirements.', activities: ['Initial discovery call to discuss your project', 'Comprehensive site survey and assessment', 'Requirements documentation and scoping', 'Budget analysis and feasibility study', 'Preliminary recommendations and proposal'], deliverables: ['Site survey report', 'Requirements document', 'Initial proposal with budget range'] },
  { number: '02', icon: Pencil, title: 'Design & Planning', duration: '2-4 Weeks', description: 'Our design team creates a bespoke system architecture tailored to your space and needs.', activities: ['Detailed system architecture design', 'Equipment selection and specification', 'CAD drawings and technical documentation', '3D visualization and mockups', 'Coordination with architects and designers'], deliverables: ['System design documentation', 'CAD drawings', 'Equipment specifications', '3D renders'] },
  { number: '03', icon: Wrench, title: 'Installation', duration: '4-8 Weeks', description: 'Professional installation with meticulous attention to detail and quality.', activities: ['Pre-installation site preparation', 'Structured cabling and infrastructure', 'Equipment mounting and integration', 'Cable management and concealment', 'Quality control inspections'], deliverables: ['Installed equipment', 'Cable infrastructure', 'Interim testing reports'] },
  { number: '04', icon: Code, title: 'Programming & Integration', duration: '2-3 Weeks', description: 'Custom programming for seamless system integration and intuitive control.', activities: ['System configuration and programming', 'User interface customization', 'Scene and automation setup', 'Cross-system integration testing', 'Performance optimization'], deliverables: ['Configured system', 'Custom UI', 'Automation scenes', 'Test reports'] },
  { number: '05', icon: Headphones, title: 'Training & Handover', duration: '1 Week', description: 'Comprehensive training and support to ensure you get the most from your system.', activities: ['Comprehensive user training sessions', 'Documentation and user guides', 'Warranty activation and registration', 'Support plan enrollment', 'Final quality assurance'], deliverables: ['User documentation', 'Training completion', 'Warranty certificates', 'Support plan'] },
]

export default function ProcessPage() {
  const cms = useCms('page_process', null) as any
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const iconMap: Record<string, any> = { Search, Pencil, Wrench, Code, Headphones }
  const processPhases = (cms?.phases || phases).map((p: any, i: number) => ({ ...p, icon: iconMap[p.icon] || phases[i]?.icon || Search, number: p.number || String(i + 1).padStart(2, '0') }))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="process-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">{cms?.hero_badge || 'Our Process'}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight" data-testid="process-title">{cms?.hero_title || 'From Vision to Reality'}</h1>
            <p className="text-base text-gray-300 max-w-lg leading-relaxed mb-8">A proven methodology refined over 1,000+ projects. Structured phases with clear milestones, transparent communication, and predictable outcomes.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta">
              Start Your Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Phases */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="phases-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-16">
            {processPhases.map((phase: any, index: number) => {
              const Icon = phase.icon
              return (
                <motion.div key={phase.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="relative">
                  {/* Phase Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white dark:text-gray-900" size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">{phase.number}</span>
                        <span className="px-3 py-1 rounded-full bg-[#C9A962]/10 text-[#C9A962] text-xs font-semibold uppercase tracking-widest">{phase.duration}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{phase.description}</p>
                    </div>
                  </div>

                  {/* Phase Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-0 lg:ml-[88px]">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-4 block">Key Activities</span>
                      <ul className="space-y-3">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-4 block">Deliverables</span>
                      <ul className="space-y-2">
                        {phase.deliverables.map((d, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-[#C9A962]/40 pl-4 py-1">{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index < phases.length - 1 && <div className="h-px bg-gray-200 dark:bg-gray-800 mt-12" />}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">How We Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Our Principles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Transparency', desc: 'Clear communication and documentation at every stage. No surprises.' },
                { title: 'Quality', desc: 'Uncompromising standards from design through installation and support.' },
                { title: 'Timeline', desc: 'Coordinated scheduling and milestone tracking to meet your deadlines.' },
                { title: 'Partnership', desc: 'Long-term relationship focused on your success, not just project completion.' },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
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
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Let&apos;s Begin Your Project</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">From concept to completion, we&apos;ll guide you every step of the way.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-button">
                Book Free Consultation
              </Button>
              <Link href="/contact"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">Contact Us</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

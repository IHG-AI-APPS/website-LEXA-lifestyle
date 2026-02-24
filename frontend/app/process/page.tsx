'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import { Search, Pencil, Wrench, Code, Headphones, CheckCircle } from 'lucide-react'

export default function ProcessPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const phases = [
    {
      number: '01',
      icon: Search,
      title: 'Discovery & Consultation',
      duration: '1-2 Weeks',
      description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and technical requirements.',
      activities: [
        'Initial discovery call to discuss your project',
        'Comprehensive site survey and assessment',
        'Requirements documentation and scoping',
        'Budget analysis and feasibility study',
        'Preliminary recommendations and proposal'
      ],
      deliverables: ['Site survey report', 'Requirements document', 'Initial proposal with budget range']
    },
    {
      number: '02',
      icon: Pencil,
      title: 'Design & Planning',
      duration: '2-4 Weeks',
      description: 'Our design team creates a bespoke system architecture tailored to your space and needs.',
      activities: [
        'Detailed system architecture design',
        'Equipment selection and specification',
        'CAD drawings and technical documentation',
        '3D visualization and mockups',
        'Coordination with architects and designers'
      ],
      deliverables: ['System design documentation', 'CAD drawings', 'Equipment specifications', '3D renders']
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Installation',
      duration: '4-8 Weeks',
      description: 'Professional installation with meticulous attention to detail and quality.',
      activities: [
        'Pre-installation site preparation',
        'Structured cabling and infrastructure',
        'Equipment mounting and integration',
        'Cable management and concealment',
        'Quality control inspections'
      ],
      deliverables: ['Installed equipment', 'Cable infrastructure', 'Interim testing reports']
    },
    {
      number: '04',
      icon: Code,
      title: 'Programming & Integration',
      duration: '2-3 Weeks',
      description: 'Custom programming for seamless system integration and intuitive control.',
      activities: [
        'System configuration and programming',
        'User interface customization',
        'Scene and automation setup',
        'Cross-system integration testing',
        'Performance optimization'
      ],
      deliverables: ['Configured system', 'Custom UI', 'Automation scenes', 'Test reports']
    },
    {
      number: '05',
      icon: Headphones,
      title: 'Training & Handover',
      duration: '1 Week',
      description: 'Comprehensive training and support to ensure you get the most from your system.',
      activities: [
        'Comprehensive user training sessions',
        'Documentation and user guides',
        'Warranty activation and registration',
        'Support plan enrollment',
        'Final quality assurance'
      ],
      deliverables: ['User documentation', 'Training completion', 'Warranty certificates', 'Support plan']
    },
  ]

  const principles = [
    {
      title: 'Transparency',
      description: 'Clear communication and documentation at every stage. No surprises.'
    },
    {
      title: 'Quality',
      description: 'Uncompromising standards from design through installation and support.'
    },
    {
      title: 'Timeline',
      description: 'Coordinated scheduling and milestone tracking to meet your deadlines.'
    },
    {
      title: 'Partnership',
      description: 'Long-term relationship focused on your success, not just project completion.'
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                Our Process
              </span>
              <h1 className="text-7xl sm:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                FROM VISION
                <br />
                TO
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">REALITY</span>
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8" />
              <p className="text-xl text-gray-600 font-normal leading-relaxed">
                A proven methodology refined over 1,000+ projects. Structured phases with clear milestones, transparent communication, and predictable outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Phases */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-24">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                  {/* Phase Header */}
                  <div className="lg:col-span-12">
                    <div className="flex items-start gap-8 mb-8">
                      <div className="w-20 h-20 border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <Icon size={36} className="text-charcoal" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-3xl font-semibold text-gray-300">{phase.number}</span>
                          <span className="text-xs tracking-wider uppercase text-gray-400 border border-gray-300 px-3 py-1">
                            {phase.duration}
                          </span>
                        </div>
                        <h3 className="text-4xl font-semibold mb-4">{phase.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phase Details */}
                  <div className="lg:col-span-7">
                    <h4 className="text-xs tracking-wider uppercase text-gray-400 mb-4">Key Activities</h4>
                    <ul className="space-y-3">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                          <CheckCircle size={18} className="text-charcoal mt-1 flex-shrink-0" strokeWidth={1.5} />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5">
                    <h4 className="text-xs tracking-wider uppercase text-gray-400 mb-4">Deliverables</h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable) => (
                        <li key={deliverable} className="text-gray-600 border-l-2 border-gray-300 pl-4 py-1">
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl font-semibold text-white mb-6">Our Principles</h2>
              <p className="text-lg text-gray-400 font-normal max-w-2xl">
                What guides us through every project phase.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border border-gray-800 p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold mb-6">Typical Project Timeline</h2>
              <p className="text-xl text-gray-600 font-normal mb-10">
                Most residential projects complete in 10-18 weeks from consultation to handover.
              </p>
              <p className="text-base text-gray-500 mb-10">
                Timeline varies based on project scope, property size, and coordination with construction schedules.
              </p>
              <Button
                size="lg"
                className="bg-charcoal hover:bg-charcoal-light text-white px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'Experience Centre',
            description: 'Visit our Dubai showroom and experience our solutions live.',
            href: '/experience-centre',
            category: 'Visit Us'
          },
          {
            title: 'Solutions Overview',
            description: 'Explore our complete range of smart home solutions.',
            href: '/solutions',
            category: 'What We Offer'
          },
          {
            title: 'Projects Portfolio',
            description: 'See our completed luxury installations across the UAE.',
            href: '/projects',
            category: 'Our Work'
          }
        ]}
        title="Next Steps"
        subtitle="Ready to start your smart living journey?"
      />

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}

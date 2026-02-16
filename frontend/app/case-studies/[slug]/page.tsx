'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import type { Project } from '@/lib/api'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  useEffect(() => {
    if (slug) {
      fetch(`${BACKEND_URL}/api/case-studies/${slug}`)
        .then(res => res.json())
        .then(data => {
          setProject(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to load case study:', err)
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) {
    return <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="text-gray-400">Loading case study...</div>
    </div>
  }

  if (!project) {
    return <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
      <div className="text-gray-600">Case study not found</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/projects" className="inline-flex items-center gap-2 text-gray-600 hover:text-charcoal mb-8">
              <ArrowLeft size={20} />
              Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                  Case Study
                </span>
                <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] mb-6">
                  {project.title}
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-6" />
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">Location</div>
                    <div className="text-base font-medium">{project.location}</div>
                  </div>
                  <div>
                    <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">Year</div>
                    <div className="text-base font-medium">{project.year}</div>
                  </div>
                  <div>
                    <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">Type</div>
                    <div className="text-base font-medium">{project.type}</div>
                  </div>
                  {project.timeline && (
                    <div>
                      <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">Timeline</div>
                      <div className="text-base font-medium">{project.timeline}</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.systems && project.systems.length > 0 && project.systems.map((system) => (
                    <span key={system} className="px-3 py-1 bg-charcoal text-white text-xs">
                      {system}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale-[20%]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      {project.challenge && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold mb-6">The Challenge</h2>
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Solution */}
      {project.solution_details && (
        <section className="py-20 bg-charcoal">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold text-white mb-6">Our Solution</h2>
                <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">
                  {project.solution_details}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs */}
      {project.technical_specs && project.technical_specs.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold mb-8">Technical Specifications</h2>
                <div className="space-y-4">
                  {project.technical_specs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-charcoal mt-1 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-gray-600">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Outcome */}
      {project.outcome && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold mb-6">The Outcome</h2>
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                  {project.outcome}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonial */}
      {project.client_testimonial && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-2xl font-normal text-gray-700 mb-8 italic">
                  &quot;{project.client_testimonial}&quot;
                </p>
                {project.client_name && (
                  <div>
                    <div className="font-semibold">{project.client_name}</div>
                    {project.client_role && (
                      <div className="text-sm text-gray-600">{project.client_role}</div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-semibold mb-12 text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative h-[400px]"
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover grayscale-[20%]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold mb-6">Ready for Your Project?</h2>
              <p className="text-xl text-gray-600 font-normal mb-10">
                Let&apos;s discuss how we can transform your space.
              </p>
              <Button
                size="lg"
                className="bg-charcoal hover:bg-charcoal-light text-white px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                Schedule Private Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}

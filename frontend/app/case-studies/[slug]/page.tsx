'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { CheckCircle2, ArrowRight, ArrowLeft, MapPin, Calendar, Ruler, Phone } from 'lucide-react'
import type { Project } from '@/lib/api'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

export default function CaseStudyPage() {
  const cms = useCms('page_case_studies_detail', null)
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`${BACKEND_URL}/api/case-studies/${slug}`)
      .then(res => res.json())
      .then(data => { setProject(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="h-[480px] bg-gray-200" />
          <div className="container mx-auto px-8 py-12"><div className="h-10 bg-gray-200 rounded w-1/2 mb-4" /></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4" data-testid="not-found-title">Case Study Not Found</h1>
        <p className="text-gray-600 mb-8">The case study you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/projects"><Button variant="outline">View All Projects</Button></Link>
      </div>
    )
  }

  const gallery = (project as any).gallery || project.images || []
  const techSpecs = (project as any).technical_specs || project.features || []
  const systems = project.systems || []

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="case-study-detail-page">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors" data-testid="back-link">
                <ArrowLeft className="h-4 w-4" /> Back to Projects
              </Link>
              <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="project-type">
                Case Study
              </span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="project-title">
                {project.title}
              </h1>
              <p className="text-base text-gray-300 mb-6 max-w-lg leading-relaxed">{project.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C9A962]" />
                  <div><p className="text-xs text-gray-400">Location</p><p className="text-sm font-medium">{project.location}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#C9A962]" />
                  <div><p className="text-xs text-gray-400">Year</p><p className="text-sm font-medium">{project.year}</p></div>
                </div>
                {project.size && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-[#C9A962]" />
                    <div><p className="text-xs text-gray-400">Size</p><p className="text-sm font-medium">{project.size}</p></div>
                  </div>
                )}
                {(project as any).type && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-[#C9A962]" />
                    <div><p className="text-xs text-gray-400">Type</p><p className="text-sm font-medium">{(project as any).type}</p></div>
                  </div>
                )}
              </div>

              {systems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {systems.map((system) => (
                    <span key={system} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">{system}</span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={project.image} alt={project.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      {(project as any).challenge && (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">The Challenge</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Project Requirements</h2>
              <p className="text-base text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{(project as any).challenge}</p>
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {(project as any).solution_details && (
        <section className="py-16 lg:py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Approach</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6">The LEXA Solution</h2>
              <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">{(project as any).solution_details}</p>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs */}
      {techSpecs.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]" data-testid="tech-specs-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Technical Details</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Systems Installed</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
                {techSpecs.map((spec: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-[#050505] border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-zinc-400">{spec}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Outcome */}
      {(project as any).outcome && (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">The Result</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Project Outcome</h2>
              <p className="text-base text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{(project as any).outcome}</p>
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonial */}
      {(project as any).client_testimonial && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-4 block">Client Feedback</span>
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-zinc-400 italic mb-6 leading-relaxed">
                &quot;{(project as any).client_testimonial}&quot;
              </p>
              {(project as any).client_name && (
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{(project as any).client_name}</p>
                  {(project as any).client_role && <p className="text-sm text-gray-500">{(project as any).client_role}</p>}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="gallery-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Visual Tour</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Project Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((image: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                      <SafeImage src={image} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Ready for Your Project?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let&apos;s discuss how we can transform your space with intelligent automation.</p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-get-quote">
                Schedule Consultation
              </Button>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">View More Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

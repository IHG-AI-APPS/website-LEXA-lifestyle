'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { getProjects, type Project } from '@/lib/api'
import { useCms } from '@/hooks/useCms'
import { MapPin, Layers } from 'lucide-react'
import QuickViewModal from '@/components/QuickViewModal'

export default function ProjectsPage() {
  const cms = useCms('page_projects_listing', null)

  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState<Project[]>([])
  const [quickViewItem, setQuickViewItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const filters = ['all', 'Residential', 'Commercial', 'Villa']

  useEffect(() => {
    getProjects()
      .then(data => {
        const projectsWithDefaults = (Array.isArray(data) ? data : []).map((p: any) => ({
          ...p,
          title: p.title || '',
          slug: p.slug || '',
          type: p.type || 'Residential',
          location: p.location || '',
          year: p.year || '',
          image: p.image || '',
          description: p.description || '',
          systems: p.systems || []
        }))
        setProjects(projectsWithDefaults)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load projects:', err)
        setProjects([])
        setLoading(false)
      })
  }, [])

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter)

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="projects-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=50)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
              Portfolio
            </span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="projects-title">
              OUR PROJECTS
            </h1>
            <p className="hero-animate-desc text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
              A comprehensive showcase of our luxury smart living installations across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase()}`}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-full ${
                  filter === f
                    ? 'bg-[#C9A962] text-white'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#C9A962]/50 hover:text-[#C9A962]'
                }`}
              >
                {f === 'all' ? 'All Projects' : f}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4" data-testid="projects-count">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#050505]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                className="group"
                data-testid={`project-card-${index}`}
              >
                <Link href={`/projects/${project.slug || project.id}`}>
                  <div className="relative h-[320px] sm:h-[360px] overflow-hidden rounded-lg mb-5">
                    <SafeImage
                      src={project.image || project.images?.[0] || '/images/placeholder-project.jpg'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs tracking-wider uppercase rounded-full">
                      {project.year}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A962]/90 backdrop-blur-sm text-white text-xs tracking-wider uppercase rounded-full">
                      {project.type || 'Residential'}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#C9A962] transition-colors" data-testid={`project-title-${index}`}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <MapPin size={14} className="text-[#C9A962]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.systems?.slice(0, 4).map((system: string) => (
                      <span key={system} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-white/10">
                        {system}
                      </span>
                    ))}
                    {(project.systems?.length || 0) > 4 && (
                      <span className="text-xs px-2 py-1 text-[#C9A962]">
                        +{project.systems!.length - 4} more
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Layers className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Let us design and deliver a bespoke smart home tailored to your lifestyle.
          </p>
          <Link
            href="/consultation"
            className="inline-block px-8 py-3 bg-[#C9A962] text-white font-medium rounded-full hover:bg-[#B8983F] transition-colors"
            data-testid="projects-cta"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

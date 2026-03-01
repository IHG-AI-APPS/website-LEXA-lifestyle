'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { getProjects, type Project } from '@/lib/api'
import { useCms } from '@/hooks/useCms'

export default function ProjectsPage() {
  const cms = useCms('page_projects_listing', null)

  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const filters = ['all', 'Residential', 'Commercial', 'Villa']

  useEffect(() => {
    getProjects()
      .then(data => {
        // Ensure all projects have proper defaults for safe rendering
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
      <div className="min-h-screen bg-[#F9F9F7] dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] dark:bg-[#050505] pt-20">
      {/* Header - Centered */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-12 md:py-16 lg:py-20">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=50" alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
              Portfolio
            </span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight">
              OUR PROJECTS
            </h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
              A comprehensive showcase of our luxury smart living installations across the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 md:py-8 bg-white border-b border-black/10">
        <div className="content-container">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-300 rounded-none ${
                  filter === f
                    ? 'bg-[#1A1A1A] text-white'
                    : 'border border-black/20 text-[#1A1A1A] dark:text-white hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <Link href={`/projects/${project.slug || project.id}`}>
                  <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden mb-4 md:mb-6">
                    <SafeImage
                      src={project.image || project.images?.[0] || '/images/placeholder-project.jpg'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1A1A1A] dark:text-white text-xs tracking-wider uppercase">
                      {project.year}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl md:text-2xl font-normal text-[#1A1A1A] dark:text-white mb-2 group-hover:text-[#9F8B65] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#4A4A4A] mb-3 uppercase tracking-wider">{project.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.systems?.map((system: string) => (
                      <span key={system} className="text-xs text-[#9F8B65] uppercase tracking-wider">
                        {system}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

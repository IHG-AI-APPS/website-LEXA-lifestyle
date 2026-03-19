'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: string
  slug: string
  title: string
  location: string
  type: string
  image: string
}

export default function TetrisProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`)
        const data = await response.json()
        // Take first 4 projects for the grid
        setProjects(data.slice(0, 4))
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-[#050505] py-24 md:py-32" data-testid="tetris-projects-loading">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[320px] animate-pulse bg-gray-200 dark:bg-[#111] border border-gray-200 dark:border-white/5" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 dark:bg-[#050505] py-24 md:py-32" data-testid="featured-projects">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#C9A962] mb-4">Our Portfolio</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <Link 
              href="/projects"
              className="hidden md:flex items-center gap-2 text-gray-500 dark:text-white/60 text-sm uppercase tracking-[0.15em] hover:text-[#C9A962] transition-colors"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="min-w-[80vw] snap-center flex-shrink-0"
              >
                <Link href={`/projects/${project.slug || project.id}`} className="group relative block h-[260px] overflow-hidden rounded-2xl">
                  <SafeImage
                    src={project.image || 'https://files.ihgbrands.com/lexa/migrated/162fd60e556d6189.webp'}
                    alt={project.title}
                    fill
                    sizes="80vw"
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
                    <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white/70 font-sans">
                      <span>{project.type}</span>
                      <span className="text-[#C9A962]">&bull;</span>
                      <span>{project.location}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              gridClass="col-span-1"
              index={index}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Link 
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9A962] transition-all hover:gap-4"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, gridClass, index }: { project: Project; gridClass: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative overflow-hidden ${gridClass} h-[320px]`}
    >
      <Link href={`/projects/${project.slug || project.id}`}>
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden">
          <SafeImage
            src={project.image || 'https://files.ihgbrands.com/lexa/migrated/162fd60e556d6189.webp'}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            quality={75}
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />
        </div>

        {/* Text Overlay - Fixed Font */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
          <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 font-sans">
            <span>{project.type}</span>
            <span>•</span>
            <span>{project.location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

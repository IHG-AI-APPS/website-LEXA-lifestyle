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
      <section className="bg-gray-50 dark:bg-[#050505] py-10 md:py-12" data-testid="tetris-projects-loading">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[380px] animate-pulse bg-gray-100 dark:bg-neutral-900 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 dark:bg-[#050505] py-10 md:py-12">
      <div className="content-container">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A962] mb-3">OUR PORTFOLIO</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
            Featured Projects
          </h2>
          <p className="text-base text-gray-600 dark:text-neutral-400 max-w-xl mx-auto">
            A curated collection of distinguished projects across the region.
          </p>
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
                    src={project.image || 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/f50336749d63e39e010d02db9c43eee9a19c0d799c1e9c0c91e84a4f2b8eb347.png'}
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              gridClass="col-span-1"
              index={index}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
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
            src={project.image || 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/f50336749d63e39e010d02db9c43eee9a19c0d799c1e9c0c91e84a4f2b8eb347.png'}
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

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
      <section className="bg-[#F9F9F7] dark:bg-[#0a0f1a] py-10 md:py-12">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[380px] animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F9F9F7] dark:bg-[#0a0f1a] py-10 md:py-12">
      <div className="content-container">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:text-left"
        >
          <div className="section-label mb-3 dark:text-gray-400">OUR PORTFOLIO</div>
          <h2 className="h2 text-[#1A1A1A] dark:text-white dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-base text-[#4A4A4A] dark:text-gray-300 max-w-xl">
            A curated collection of distinguished projects across the region.
          </p>
        </motion.div>

        {/* Uniform 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#1A1A1A] dark:text-white dark:text-white transition-all hover:gap-4"
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
          <motion.img
            src={project.image || 'https://images.unsplash.com/photo-1697137663650-f0f95349aed3?crop=entropy&cs=srgb&fm=jpg&q=85'}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
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

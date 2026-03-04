'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function FeaturedWorks() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`)
        const data = await response.json()
        setProjects(data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-[#F9F9F7]">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="section-label mb-4">PORTFOLIO</div>
          <h2 className="h2 text-[#1A1A1A] dark:text-white mb-6">Featured Works</h2>
          <p className="text-base text-gray-600 dark:text-zinc-500 max-w-2xl">
            Showcasing our finest luxury smart living installations across the region.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden h-[350px]"
            >
              <Link href={`/projects/${project.slug || project.id}`}>
                <SafeImage
                  src={project.image || 'https://images.unsplash.com/photo-1697137663650-f0f95349aed3?crop=entropy&cs=srgb&fm=jpg&q=85'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="h3 text-white mb-2 group-hover:text-[#E8DCC8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">{project.location}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#E8DCC8]">View Project</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#1A1A1A] dark:text-white hover:text-[#E8DCC8] transition-colors">
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

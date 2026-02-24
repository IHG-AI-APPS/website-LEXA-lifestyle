'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProjects, type Project } from '@/lib/api'

export default function SignatureProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects()
      .then(data => {
        // Get 3 featured/best projects
        const featured = data.filter((p: any) => 
          ['luxury-villa', 'private-cinema', 'urban-penthouse'].includes(p.slug)
        ).slice(0, 3)
        setProjects(featured.length > 0 ? featured : data.slice(0, 3))
      })
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium block mb-6">
            Featured Installations
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6">
            SIGNATURE PROJECTS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400">
            Exceptional spaces where technology becomes invisible, effortless, and unforgettable.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative h-[600px] overflow-hidden group ${
                index % 2 === 1 ? 'lg:col-start-2' : ''
              }`}>
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="space-y-6">
                  {project.location && (
                    <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
                      {project.location}
                    </span>
                  )}
                  <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  {project.systems && project.systems.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.systems.slice(0, 4).map((system: string) => (
                        <span key={system} className="text-xs px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 dark:text-gray-400">
                          {system}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all font-medium uppercase tracking-wider text-sm"
                  >
                    View Project
                    <ArrowRight size={16} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-24"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Explore All Projects
            <ArrowRight size={20} strokeWidth={3} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

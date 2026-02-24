'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { getProjects, type Project } from '@/lib/api'
import { ArrowRight } from 'lucide-react'

export default function FeaturedWorks() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data.slice(0, 6)))
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16">
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 font-bold block mb-6">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black mb-6">
            FEATURED WORKS
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            A curated selection of exceptional installations and events chosen for their high-quality value, originality, and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-80 overflow-hidden bg-gray-200 mb-4">
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-heading font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.location && (
                    <p className="text-sm text-gray-300 mt-1">{project.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-transparent border border-gray-300 text-black px-8 py-4 font-medium uppercase tracking-widest hover:border-black transition-colors"
          >
            View All Projects
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}

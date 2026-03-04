'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { getSolutions, type Solution } from '@/lib/api'

export default function SolutionsPreview() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSolutions()
      .then(data => {
        // Show only first 3 solutions
        setSolutions(data.slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load solutions:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="relative py-32 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center text-gray-400">Loading solutions...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-32 bg-white" data-testid="solutions-preview-section">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
              Integrated Solutions
            </span>
            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] leading-[0.9] mb-6">
              DESIGNED FOR
              <br />
              <span className="text-transparent bg-clip-text metallic-gradient">PERFECTION</span>
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent" />
          </motion.div>

          {/* Solutions Grid */}
          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link href={`/solutions/${solution.slug}`}>
                  <div className="group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Image */}
                      <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                          <SafeImage
                            src={solution.image}
                            alt={solution.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                            quality={95}
                          />
                          {/* Corner accent */}
                          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-platinum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} flex flex-col justify-center`}>
                        <div className="space-y-6">
                          {/* Tags */}
                          <div className="flex gap-4">
                            {solution.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Subtitle */}
                          <div className="text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
                            {solution.category}
                          </div>

                          {/* Title */}
                          <h3 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] leading-tight">
                            {solution.title}
                          </h3>

                          {/* Line */}
                          <div className="h-px w-16 bg-gradient-to-r from-platinum to-transparent" />

                          {/* Description */}
                          <p className="text-lg text-gray-600 dark:text-zinc-500 leading-relaxed font-light max-w-md">
                            {solution.description}
                          </p>

                          {/* Arrow */}
                          <div className="flex items-center gap-3 text-charcoal group-hover:gap-5 transition-all duration-300">
                            <span className="text-sm font-medium">Explore Solution</span>
                            <ArrowUpRight size={20} strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="/solutions"
              className="inline-block px-10 py-5 border border-gray-300 dark:border-zinc-700 hover:border-charcoal hover:bg-gray-50 text-charcoal text-sm font-medium tracking-wide transition-all duration-300"
            >
              View All Solutions
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

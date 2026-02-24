'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '32+', label: 'Premium Brands' },
  { value: '15+', label: 'Years Experience' },
  { value: '5', label: 'Markets' },
  { value: '1000+', label: 'Satisfied Customers' },
  { value: '60K+', label: 'Facilities (Sq. ft.)' },
]

export default function StatsLight() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-gray-50 border-y border-gray-200 dark:border-gray-700 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 mb-3">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

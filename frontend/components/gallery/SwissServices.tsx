'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  title?: string
  description: string
  icon?: string
  image?: string
}

export default function SwissServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`)
        const data = await response.json()
        setServices(data.slice(0, 6)) // Show first 6 services
      } catch (error) {
        console.error('Error fetching services:', error)
        // Fallback to empty array, or could show error message
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl">
        {/* Compact Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-10 text-center md:text-left"
        >
          <div className="section-label mb-3">WHAT WE DO</div>
          <h2 className="h2 text-[#1A1A1A]">
            Our Services
          </h2>
        </motion.div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-[#F9F9F7] p-6 transition-all hover:bg-[#1A1A1A]"
            >
              <Link href="/services" className="block">
                <span className="font-mono text-sm text-[#1A1A1A] opacity-30 group-hover:text-white/40 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="h4 text-[#1A1A1A] mt-3 mb-2 group-hover:text-white transition-colors">
                  {service.name || service.title}
                </h3>
                <p className="text-sm text-[#4A4A4A] group-hover:text-white/70 transition-colors">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

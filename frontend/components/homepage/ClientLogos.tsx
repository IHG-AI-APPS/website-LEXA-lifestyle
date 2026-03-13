'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'

export default function ClientLogos() {
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`)
        const data = await response.json()
        setBrands(data)
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }
    fetchBrands()
  }, [])

  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="section-label mb-4">TRUSTED PARTNERS</div>
          <h2 className="h2 text-[#1A1A1A] dark:text-white">Who We Work With</h2>
        </motion.div>
      </div>

      <div className="relative mt-12">
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -50 * brands.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 transition-all relative w-[120px] h-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo || 'https://via.placeholder.com/120x60?text=' + brand.name}
                alt={brand.name}
                className="w-full h-full object-contain opacity-60 transition-opacity hover:opacity-100 brand-logo-white"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

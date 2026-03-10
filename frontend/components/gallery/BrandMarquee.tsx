'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'

interface Brand {
  id: string
  name: string
  logo: string
}

export default function BrandMarquee() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`)
        const data = await response.json()
        setBrands(data.slice(0, 12))
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }

    fetchBrands()
  }, [])

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="bg-[#F9F9F7] py-10 md:py-12">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="section-label mb-4">TRUSTED BY</div>
          <h2 className="h2 text-[#1A1A1A] dark:text-white">Premium Partners</h2>
        </motion.div>

        {/* Marquee - Contained within content area */}
        <div className="relative overflow-hidden mt-12">
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -50 * brands.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 grayscale transition-all hover:grayscale-0 relative w-[120px] h-16"
              >
                <SafeImage
                  src={brand.logo || 'https://via.placeholder.com/120x60?text=Brand'}
                  alt={brand.name}
                  fill
                  className="object-contain opacity-60 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'

interface Brand {
  id: string
  name: string
  logo: string
  is_partner?: boolean
}

export default function BrandMarquee() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Fetch only partner brands for the homepage marquee
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands?is_partner=true`)
        const data = await response.json()
        setBrands(data)
      } catch (error) {
        console.error('Error fetching partner brands:', error)
      }
    }

    fetchBrands()
  }, [])

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  return (
    <div className="relative overflow-hidden py-6">
      <motion.div
        className="flex gap-20 items-center"
        animate={{
          x: [0, -100 * brands.length],
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
            className="flex-shrink-0 transition-all relative w-[140px] h-14"
          >
            <img
              src={brand.logo || 'https://via.placeholder.com/140x60?text=Brand'}
              alt={brand.name}
              className="w-full h-full object-contain opacity-40 transition-opacity hover:opacity-80 brand-logo-white"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

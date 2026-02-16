'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'

interface Brand {
  id: string
  name: string
  logo: string
}

export default function BrandCarousel() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`)
      .then(res => res.json())
      .then(data => {
        setBrands(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load brands:', err)
        setLoading(false)
      })
  }, [])

  // Duplicate brands for infinite effect
  const duplicatedBrands = [...brands, ...brands]

  if (loading) {
    return (
      <section className="py-24 bg-lexa-surface border-y border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <span className="text-gray-400">Loading brands...</span>
        </div>
      </section>
    )
  }

  if (brands.length === 0) return null

  return (
    <section className="py-24 bg-white border-y border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-16">
        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 font-bold block mb-6">
          Our Partners
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black">
          BRANDS WE LOVE
        </h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        <div className="flex gap-12 animate-marquee hover:pause">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 w-32 h-24 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <SafeImage
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

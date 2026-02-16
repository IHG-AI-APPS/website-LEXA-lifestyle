'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CuratedBrands() {
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    // Fetch top/featured brands
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`)
      .then(res => res.json())
      .then(data => {
        // Select top 10 brands (you can mark as featured in DB later)
        const featured = data.filter((b: any) => 
          ['sonos', 'b-w', 'kef', 'savant', 'lutron', 'control4', 'bang-olufsen', 'epson', 'sony', 'leica'].some(slug => b.slug.includes(slug))
        ).slice(0, 10)
        setBrands(featured.length >= 6 ? featured : data.slice(0, 10))
      })
      .catch(err => console.error('Failed to load brands:', err))
  }, [])

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium block mb-6">
            Authorized Integrators
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6">
            WORLD-CLASS BRANDS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the world&apos;s leading audio, automation, and technology brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors font-medium uppercase tracking-wider text-sm"
          >
            View All 32 Brands
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

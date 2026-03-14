'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  is_partner?: boolean
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function BrandPartners() {
  const [partners, setPartners] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands?is_partner=true`)
        const data = await response.json()
        setPartners(data)
      } catch (error) {
        console.error('Error fetching brand partners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (loading || partners.length === 0) {
    return null
  }

  return (
    <section className="bg-[#F8F8F8] dark:bg-[#0A0A0A] py-20 md:py-28" data-testid="brand-partners">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">
            Brand Partners
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={fadeInUp}
            >
              <Link
                href={`/brands/${partner.slug}`}
                className="group block bg-white dark:bg-[#151515] rounded-2xl p-6 md:p-8 text-center hover:shadow-lg dark:hover:shadow-none dark:hover:bg-[#1A1A1A] transition-all duration-300 h-full min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center"
              >
                {/* Logo or Name */}
                {partner.logo ? (
                  <div className="w-full h-16 md:h-20 mb-4 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain dark:brightness-0 dark:invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] dark:text-white mb-2 group-hover:text-[#C9A962] transition-colors">
                    {partner.name}
                  </h3>
                )}
                
                {/* Partner Label */}
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 mt-auto">
                  Partner
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 md:mt-12"
        >
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#C9A962] hover:text-[#1A1A1A] dark:hover:text-white transition-colors font-medium"
          >
            View All Brands
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

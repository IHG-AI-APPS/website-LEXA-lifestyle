'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { TrendingUp, Award, Globe, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  icon: string
  value: number
  suffix: string
  label: string
}

const iconMap: { [key: string]: any } = {
  Award,
  TrendingUp,
  Globe,
  Users,
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, suffix])

  return <div ref={ref} className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-b from-[#C9A962] to-[#8a7035] mb-2" />
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings/homepage_stats`)
        const data = await response.json()
        setStats(data.value || [])
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback to default stats
        setStats([
          { icon: 'Award', value: 1000, suffix: '+', label: 'Premium Brands' },
          { icon: 'TrendingUp', value: 15, suffix: '+', label: 'Years Experience' },
          { icon: 'Globe', value: 50, suffix: '+', label: 'Markets Served' },
          { icon: 'Users', value: 1000, suffix: 's', label: 'Satisfied Customers' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-8 md:py-10 bg-gray-50 dark:bg-[#050505] border-y border-gray-200 dark:border-white/5">
        <div className="content-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 dark:bg-neutral-900 animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-8 md:py-10 bg-gray-50 dark:bg-[#050505] border-y border-gray-200 dark:border-white/5">
      <div className="content-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Award
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-3 sm:mb-4 text-[#C9A962] transition-colors group-hover:text-[#E8DCC8]" />
                </motion.div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-500 uppercase tracking-[0.2em] transition-colors group-hover:text-gray-900 dark:group-hover:text-neutral-300">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

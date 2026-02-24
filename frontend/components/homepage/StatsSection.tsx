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

  return <div ref={ref} className="h2 text-[#1A1A1A] dark:text-white dark:text-white mb-2" />
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
      <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="text-center dark:text-gray-400">Loading...</div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-8 md:py-10 bg-white dark:bg-gray-900">
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
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-3 sm:mb-4 text-[#E8DCC8] transition-colors group-hover:text-[#B8942F]" />
                </motion.div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 uppercase tracking-wider transition-colors group-hover:text-[#1A1A1A] dark:text-white dark:group-hover:text-white">
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

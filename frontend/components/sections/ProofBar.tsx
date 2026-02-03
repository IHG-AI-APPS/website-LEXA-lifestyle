'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
}

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentCount = Math.floor(progress * (end - startValue) + startValue)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-5xl sm:text-6xl font-bold text-lexa-gold">
      {count}{suffix}
    </div>
  )
}

export default function ProofBar() {
  const stats = [
    { value: 50, suffix: '+', label: 'Global Brands', description: 'Trusted Technology Partners' },
    { value: 20, suffix: '+', label: 'Years Experience', description: 'Industry Leadership' },
    { value: 1000, suffix: '+', label: 'Customers', description: 'Satisfied Clients' },
  ]

  return (
    <section className="py-20 bg-lexa-black" data-testid="proof-bar-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <Counter end={stat.value} suffix={stat.suffix} />
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{stat.label}</h3>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
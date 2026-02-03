'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function SolutionsPreview() {
  const solutions = [
    {
      title: 'Home Theater',
      description: 'Immersive cinema experiences with cutting-edge audio-visual technology',
      image: '/images/solutions/home-theater-1.jpg',
      href: '/solutions/home-theater',
    },
    {
      title: 'Lighting Automation',
      description: 'Intelligent lighting control for ambiance, energy efficiency, and convenience',
      image: '/images/solutions/smart-lighting-1.jpg',
      href: '/solutions/lighting-automation',
    },
    {
      title: 'Smart Security',
      description: 'Comprehensive security systems with real-time monitoring and control',
      image: '/images/solutions/modern-penthouse-2.jpg',
      href: '/solutions/security',
    },
  ]

  return (
    <section className="py-24 bg-lexa-white" data-testid="solutions-preview-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-lexa-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            SOLUTIONS FOR LUXURY LIVING
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Built as one integrated system, not disconnected gadgets
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Link href={solution.href}>
                <Card className="group overflow-hidden h-full hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-lexa-black mb-3 group-hover:text-lexa-gold transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{solution.description}</p>
                    <div className="flex items-center text-lexa-gold font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>LEARN MORE</span>
                      <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href="/solutions"
            className="inline-block px-8 py-3 border-2 border-lexa-black text-lexa-black font-semibold uppercase text-sm hover:bg-lexa-black hover:text-white transition-all duration-200"
          >
            VIEW ALL SOLUTIONS
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
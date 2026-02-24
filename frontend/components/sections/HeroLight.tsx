'use client'

import { useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroLight() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            {/* Eyebrow */}
            <div className="mb-8">
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500 font-bold">
                Dubai / Premium Integration
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(3rem,10vw,10rem)] font-heading font-bold tracking-[-0.04em] leading-[0.9] mb-12">
              <span className="text-black">WHERE</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
                SMART LIVING
              </span>
              <br />
              <span className="text-black">MEETS</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
                TIMELESS LUXURY
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-start gap-8 mb-12 max-w-3xl">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-gray-400 to-transparent mt-3" />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Experience the pinnacle of smart home automation. From luxury villas to premium developments, we create spaces where technology becomes invisible, effortless, and unforgettable.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                Private Design Session
                <ArrowRight size={18} strokeWidth={3} />
              </Link>
              <Link href="/solutions" className="inline-flex items-center gap-3 bg-transparent border border-gray-300 text-black px-8 py-4 font-medium uppercase tracking-widest text-sm hover:border-black transition-colors">
                Explore Solutions
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Experience</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-black">15+ Years</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Premium Brands</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-black">32+</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Projects</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-black">1,000+</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Experience Center</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-black">60,000 sq ft</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

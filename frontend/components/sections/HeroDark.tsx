'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroDark() {
  return (
    <section className="relative min-h-screen flex items-center bg-lexa-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl" />

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
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-bold">
                Dubai / Premium Integration
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(3rem,10vw,10rem)] font-heading font-bold tracking-[-0.04em] leading-[0.9] mb-12">
              <span className="text-white">WHERE</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                SMART LIVING
              </span>
              <br />
              <span className="text-white">MEETS</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                TIMELESS LUXURY
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-start gap-8 mb-12 max-w-3xl">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-white/40 to-transparent mt-3" />
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                Experience the pinnacle of smart home automation. From luxury villas to premium developments, we create spaces where technology becomes invisible, effortless, and unforgettable.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                Private Design Session
                <ArrowRight size={18} strokeWidth={3} />
              </button>
              <button className="inline-flex items-center gap-3 bg-transparent border border-white/20 text-white px-8 py-4 font-medium uppercase tracking-widest text-sm hover:border-white transition-colors">
                Explore Solutions
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10"
          >
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Experience</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-white">15+ Years</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Premium Brands</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-white">32+</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Projects</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-white">1,000+</div>
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase mb-2 text-gray-500">Experience Center</div>
              <div className="text-xl md:text-2xl font-heading font-semibold text-white">60,000 sq ft</div>
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
        <div className="flex flex-col items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

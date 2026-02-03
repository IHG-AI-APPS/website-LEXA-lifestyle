'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PersonaModal from './PersonaModal'
import { motion } from 'framer-motion'

export default function Hero() {
  const [showPersonaModal, setShowPersonaModal] = useState(false)

  useEffect(() => {
    // Show persona modal after 2 seconds on first visit
    const hasSeenModal = localStorage.getItem('lexa_persona_modal_seen')
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowPersonaModal(true)
        localStorage.setItem('lexa_persona_modal_seen', 'true')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/dubai-villa-luxury-1.jpg"
            alt="Luxury villa in Dubai with smart home automation"
            fill
            priority
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              LUXURY SMART LIVING
            </h1>
            <p className="text-xl sm:text-2xl text-lexa-gold mb-4 font-light tracking-wide">
              Designed & Delivered End-to-End
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your space with integrated smart home solutions. From concept to completion,
              we deliver unparalleled luxury living experiences in Dubai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" data-testid="hero-explore-btn">
                EXPLORE SOLUTIONS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-lexa-black"
                onClick={() => setShowPersonaModal(true)}
                data-testid="hero-persona-selector-btn"
              >
                WHO ARE YOU?
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Persona Modal */}
      <PersonaModal
        isOpen={showPersonaModal}
        onClose={() => setShowPersonaModal(false)}
      />
    </>
  )
}
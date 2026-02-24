'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Film,
  Speaker,
  Palette,
  Armchair,
  Lightbulb,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Award,
  Star,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function LuxuryCinemaPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const features = [
    {
      icon: Film,
      title: 'Reference-Grade Projection',
      description: '4K/8K laser projectors with HDR, delivering cinema-quality visuals in your private theater.'
    },
    {
      icon: Speaker,
      title: 'Dolby Atmos Audio',
      description: 'Immersive 3D sound with ceiling speakers, creating a true cinematic audio experience.'
    },
    {
      icon: Palette,
      title: 'Themed Interior Design',
      description: 'Custom cinema themes from Art Deco to modern minimalist, crafted by award-winning designers.'
    },
    {
      icon: Armchair,
      title: 'Luxury Seating',
      description: 'Italian leather recliners with heating, cooling, and massage functions for ultimate comfort.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Lighting Control',
      description: 'Automated lighting scenes that dim perfectly for movie time and illuminate for intervals.'
    },
    {
      icon: Gauge,
      title: 'Acoustic Optimization',
      description: 'Professional acoustic treatment ensuring reference-level sound with no distortion.'
    }
  ]

  const themes = [
    { name: 'Classic Hollywood', description: 'Art Deco elegance with gold accents and velvet curtains' },
    { name: 'Modern Minimalist', description: 'Clean lines, premium materials, sophisticated technology' },
    { name: 'IMAX Experience', description: 'Stadium seating with massive screen and commercial-grade projection' },
    { name: 'Vintage Luxury', description: 'Restored classic cinema style with modern technology' },
    { name: 'Space Explorer', description: 'Futuristic sci-fi theme with LED accents and ambient lighting' },
    { name: 'Royal Theater', description: 'Ornate baroque styling with premium fabrics and crystal fixtures' }
  ]

  const specifications = [
    { label: 'Screen Size', value: '120-300 inches', icon: Film },
    { label: 'Audio Channels', value: 'Up to 15.2 Atmos', icon: Speaker },
    { label: 'Seating Capacity', value: '6-20 guests', icon: Armchair },
    { label: 'Investment Range', value: 'AED 200K - 1M+', icon: TrendingUp }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Film className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Private Cinema Solutions
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Luxury Home<br />
                <span className="text-gray-300">Cinema Experience</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transform your villa into a private cinema with reference-grade projection, Dolby Atmos audio, and bespoke interior design. Experience movies the way directors intended.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Design Your Cinema
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/experience-centre">
                    Visit Experience Centre
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Cinema-Grade Technology
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Every element engineered for the ultimate viewing experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-50 to-pink-50">
                        <Icon className="h-6 w-6 text-[#1A1A1A] dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cinema Themes */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Bespoke Cinema Themes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from curated themes or create your custom design
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 border-l-4 border-purple-600"
                >
                  <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{theme.name}</h3>
                  <p className="text-gray-600 text-sm">{theme.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-gradient-to-br from-purple-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Technical Specifications
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {specifications.map((spec, index) => {
                const Icon = spec.icon
                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">{spec.value}</div>
                    <div className="text-sm text-gray-300">{spec.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Film className="h-16 w-16 mx-auto mb-6 text-[#1A1A1A] dark:text-white" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Ready to Create Your Private Cinema?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Schedule a consultation with our cinema design experts and experience reference-grade entertainment.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </>
  )
}

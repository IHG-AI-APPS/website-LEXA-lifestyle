'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Volume2,
  Music,
  Radio,
  Mic,
  Settings,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function MajlisAudioPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const features = [
    {
      icon: Volume2,
      title: 'Distributed Audio System',
      description: 'Crystal-clear sound throughout the majlis with strategically placed speakers for even coverage.'
    },
    {
      icon: Music,
      title: 'High-Fidelity Acoustics',
      description: 'Premium speakers delivering audiophile-grade sound for traditional music and conversations.'
    },
    {
      icon: Radio,
      title: 'Multi-Source Integration',
      description: 'Connect traditional radio, streaming services, and local audio sources seamlessly.'
    },
    {
      icon: Mic,
      title: 'Wireless Microphones',
      description: 'Professional-grade wireless mics for speeches, recitations, and gatherings.'
    },
    {
      icon: Settings,
      title: 'Acoustic Treatment',
      description: 'Custom acoustic panels maintaining traditional aesthetics while optimizing sound quality.'
    },
    {
      icon: Smartphone,
      title: 'Smart Control',
      description: 'Intuitive app control for volume, source selection, and preset scenes.'
    }
  ]

  const useCases = [
    'Traditional Arabic music playback',
    'Quran recitation with optimal clarity',
    'Live speeches and presentations',
    'Background ambiance for gatherings',
    'Conference call integration',
    'Multi-room audio sync'
  ]

  const benefits = [
    { metric: '100%', label: 'Room Coverage', icon: Volume2 },
    { metric: '24 bit', label: 'Audio Resolution', icon: Music },
    { metric: '8 Sources', label: 'Input Options', icon: Radio },
    { metric: '4 Zones', label: 'Independent Control', icon: Settings }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
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
                <Music className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Cultural Audio Solutions
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Majlis Audio<br />
                <span className="text-gray-300">Experience</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Preserve cultural authenticity while embracing modern audio technology. Perfect acoustics for traditional gatherings, Quran recitation, and Arabic music in your majlis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Request Design
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/experience-centre">
                    Experience Demo
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A]">
                Premium Audio Solution
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Designed specifically for traditional Arabic gathering spaces
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
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-amber-50 to-orange-50">
                        <Icon className="h-6 w-6 text-[#1A1A1A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A]">
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

        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1A1A1A]">
                  Perfect for Traditional Gatherings
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our majlis audio systems respect cultural values while delivering modern performance. Discreet installation maintains traditional aesthetics.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{useCase}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="bg-gray-50 p-6 text-center border-2 border-gray-200">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-[#1A1A1A]" />
                      <div className="text-3xl font-bold mb-2 text-[#1A1A1A]">{benefit.metric}</div>
                      <div className="text-sm text-gray-600">{benefit.label}</div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Music className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Elevate Your Majlis Experience
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule a consultation with our audio specialists to design the perfect system for your majlis.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
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

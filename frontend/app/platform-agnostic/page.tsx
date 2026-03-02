'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Boxes,
  Workflow,
  GitBranch,
  Shield,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useCms } from '@/hooks/useCms'

export default function PlatformAgnosticPage() {
  const cms = useCms('page_platform_agnostic', null) as any

  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const benefits = [
    {
      icon: Shield,
      title: 'No Vendor Lock-In',
      description: 'Freedom to choose and switch between brands and systems without being trapped by proprietary technology.',
      example: 'Replace Crestron with Control4 without rebuilding your entire system'
    },
    {
      icon: RefreshCw,
      title: 'Future-Proof Investment',
      description: 'Easily integrate new technologies as they emerge without replacing your entire infrastructure.',
      example: 'Add new AI features or devices without system overhaul'
    },
    {
      icon: TrendingUp,
      title: 'Best-of-Breed Selection',
      description: 'Choose the absolute best product for each function rather than settling for single-vendor compromises.',
      example: 'Lutron lighting + Sonos audio + Nest thermostats working together'
    },
    {
      icon: Award,
      title: 'Long-Term Value',
      description: 'Systems that evolve and improve over time rather than becoming obsolete.',
      example: '10+ year lifecycle with continuous upgrades vs 3-5 year replacement'
    }
  ]

  const integrationLayers = [
    {
      layer: 'Hardware Layer',
      description: 'Any device, any brand',
      examples: ['Crestron', 'Control4', 'Lutron', 'Sonos', 'Nest', 'Ring', 'Philips Hue']
    },
    {
      layer: 'Protocol Layer',
      description: 'Universal communication',
      examples: ['IP/Ethernet', 'Zigbee', 'Z-Wave', 'KNX', 'BACnet', 'MQTT', 'API']
    },
    {
      layer: 'Integration Layer',
      description: 'Seamless orchestration',
      examples: ['Home Assistant', 'Node-RED', 'Custom Middleware', 'Cloud Integration']
    },
    {
      layer: 'Control Layer',
      description: 'Unified interface',
      examples: ['Mobile Apps', 'Voice Control', 'Touch Panels', 'Web Dashboard']
    }
  ]

  const comparison = [
    {
      aspect: 'Brand Flexibility',
      proprietary: 'Single vendor only',
      agnostic: 'Any brand, mix and match'
    },
    {
      aspect: 'Upgrade Path',
      proprietary: 'Replace entire system',
      agnostic: 'Incremental upgrades'
    },
    {
      aspect: 'Technology Choice',
      proprietary: 'Limited to vendor catalog',
      agnostic: 'Best-of-breed selection'
    },
    {
      aspect: 'System Lifespan',
      proprietary: '3-5 years obsolescence',
      agnostic: '10+ years evolving'
    },
    {
      aspect: 'Total Cost',
      proprietary: 'Higher long-term',
      agnostic: 'Lower over lifecycle'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="platform-agnostic-page">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Architecture Philosophy</span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="platform-agnostic-title">
                Platform Agnostic Architecture
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto">
                Freedom from vendor lock-in. Build smart homes that integrate any technology, from any brand, without compromise.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 px-8 font-semibold"
              >
                Learn Our Approach
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
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
                Why Platform Agnostic Matters
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The advantages of open architecture over proprietary systems
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-[#1A1A1A] transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-indigo-50">
                        <Icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{benefit.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{benefit.description}</p>
                        <div className="bg-indigo-50 p-3 border-l-4 border-indigo-600">
                          <div className="text-xs text-indigo-600 font-semibold mb-1">Example:</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{benefit.example}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Integration Layers */}
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
                Four-Layer Integration Architecture
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                How we create unified systems from diverse technologies
              </p>
            </motion.div>

            <div className="space-y-6">
              {integrationLayers.map((layer, index) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 border-l-4 border-indigo-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{layer.layer}</h3>
                    <span className="text-sm text-gray-500">Layer {index + 1}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.examples.map((example) => (
                      <span key={example} className="px-3 py-1 bg-white text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {example}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">
                Platform Agnostic vs Proprietary
              </h2>
            </motion.div>

            <div className="bg-white border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 font-semibold text-sm">
                <div className="p-4 border-r border-gray-200 dark:border-gray-700">Aspect</div>
                <div className="p-4 border-r border-gray-200 dark:border-gray-700 text-center">Proprietary Systems</div>
                <div className="p-4 text-center">Platform Agnostic</div>
              </div>
              {comparison.map((row, index) => (
                <div key={row.aspect} className={`grid grid-cols-3 border-t border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">{row.aspect}</div>
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700 text-center text-red-600 text-sm">{row.proprietary}</div>
                  <div className="p-4 text-center text-green-600 font-semibold text-sm">{row.agnostic}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 to-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Boxes className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Build Your Future-Proof Smart Home
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the freedom of platform agnostic architecture. No lock-in, unlimited choices.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:bg-gray-800 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
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

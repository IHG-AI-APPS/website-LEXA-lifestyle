'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Wifi, Lightbulb, Volume2, Video, Shield, Cpu, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function IntegrationsPage() {
  const platforms = [
    {
      category: 'Control Systems',
      icon: Cpu,
      description: 'Professional automation platforms for luxury residences',
      brands: [
        { name: 'Control4', tier: 'Primary' },
        { name: 'Crestron', tier: 'Enterprise' },
        { name: 'Savant', tier: 'Premium' },
        { name: 'KNX', tier: 'Building-Scale' },
        { name: 'Lutron', tier: 'Lighting Expert' }
      ]
    },
    {
      category: 'Audio Systems',
      icon: Volume2,
      description: 'High-fidelity audio and whole-home music distribution',
      brands: [
        { name: 'Sonos', tier: 'Wireless' },
        { name: 'Bowers & Wilkins', tier: 'Audiophile' },
        { name: 'KEF', tier: 'Reference' },
        { name: 'K-ARRAY', tier: 'Architectural' },
        { name: 'Russound', tier: 'Multi-Room' },
        { name: 'Rotel', tier: 'Hi-Fi' },
        { name: 'Anthem', tier: 'Cinema' },
        { name: 'Marantz', tier: 'Premium' }
      ]
    },
    {
      category: 'Video & Display',
      icon: Video,
      description: '4K/8K projection and display systems',
      brands: [
        { name: 'Sony', tier: '8K Leader' },
        { name: 'Epson', tier: 'Projection' },
        { name: 'B&O', tier: 'Design' },
        { name: 'AWOL Vision', tier: 'Laser TV' },
        { name: 'Samsung', tier: 'Display' },
        { name: 'LG', tier: 'OLED' }
      ]
    },
    {
      category: 'Lighting Control',
      icon: Lightbulb,
      description: 'Intelligent lighting and shading systems',
      brands: [
        { name: 'Lutron', tier: 'Industry Leader' },
        { name: 'KNX', tier: 'Open Standard' },
        { name: 'DALI', tier: 'Digital Protocol' },
        { name: 'DMX', tier: 'Entertainment' },
        { name: 'Philips Hue', tier: 'Smart Color' },
        { name: 'Tridonic', tier: 'Professional' }
      ]
    },
    {
      category: 'Network & Connectivity',
      icon: Wifi,
      description: 'Enterprise-grade networking for smart homes',
      brands: [
        { name: 'Ubiquiti', tier: 'Pro Network' },
        { name: 'Cisco', tier: 'Enterprise' },
        { name: 'Ruckus', tier: 'High-Density' },
        { name: 'Aruba', tier: 'Managed' },
        { name: 'Wi-Fi 6/6E', tier: 'Protocol' }
      ]
    },
    {
      category: 'Security & Surveillance',
      icon: Shield,
      description: 'AI-powered security and access control',
      brands: [
        { name: 'Hikvision', tier: 'IP Cameras' },
        { name: 'Axis', tier: 'Premium' },
        { name: 'Dahua', tier: 'Smart Detection' },
        { name: 'Yale', tier: 'Smart Locks' },
        { name: 'Schlage', tier: 'Access Control' },
        { name: 'Honeywell', tier: 'Integrated' }
      ]
    },
    {
      category: 'Voice & AI',
      icon: Smartphone,
      description: 'Natural language control and AI assistants',
      brands: [
        { name: 'Amazon Alexa', tier: 'Voice Assistant' },
        { name: 'Google Assistant', tier: 'AI-Powered' },
        { name: 'Apple Siri / HomeKit', tier: 'Ecosystem' },
        { name: 'Josh.ai', tier: 'Luxury Private' }
      ]
    }
  ]

  const protocols = [
    {
      name: 'Matter',
      description: 'Universal smart home standard for cross-brand compatibility',
      status: 'Latest 2025'
    },
    {
      name: 'Thread',
      description: 'Low-power IPv6 mesh network for Matter devices',
      status: 'Industry Standard'
    },
    {
      name: 'Zigbee',
      description: 'Low-power mesh protocol (65,000 devices per network)',
      status: 'Established'
    },
    {
      name: 'Z-Wave',
      description: 'Sub-GHz wireless for reliable smart home control',
      status: 'Proven'
    },
    {
      name: 'KNX',
      description: 'Open global standard for building automation',
      status: 'Professional'
    },
    {
      name: 'DALI',
      description: 'Digital lighting control with addressable fixtures',
      status: 'Lighting Standard'
    },
    {
      name: 'DMX',
      description: 'Entertainment lighting with 512 channels per universe',
      status: 'Theatrical/Architectural'
    },
    {
      name: 'Wi-Fi 6/7',
      description: 'High-speed wireless with 6GHz band support',
      status: 'Current Gen'
    }
  ]

  const benefits = [
    {
      title: 'Platform Agnostic',
      description: 'No vendor lock-in. Choose best-in-class equipment from any manufacturer.'
    },
    {
      title: 'Future-Proof',
      description: 'New devices and technologies integrate seamlessly as they emerge.'
    },
    {
      title: 'Best of Breed',
      description: 'Select premium brands for each category based on your priorities.'
    },
    {
      title: 'Unified Control',
      description: 'One interface controls everything, regardless of underlying platforms.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
              Technology Partners
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8">
              PLATFORM
              <br />
              <span className="text-transparent bg-clip-text metallic-gradient">AGNOSTIC ARCHITECTURE</span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8 mx-auto" />
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              LEXA integrates with the world&apos;s leading smart home platforms, protocols, and brands. 
              Choose best-in-class equipment from any manufacturer—we orchestrate it all into one unified experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-4" strokeWidth={2} />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compatible Platforms & Brands</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              World-class technology partners across every category
            </p>
          </motion.div>

          <div className="space-y-12">
            {platforms.map((platform, index) => {
              const Icon = platform.icon
              return (
                <motion.div
                  key={platform.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 hover:border-gray-400 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-black rounded-lg">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{platform.category}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{platform.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {platform.brands.map((brand) => (
                      <div
                        key={brand.name}
                        className="bg-gray-50 p-4 border border-gray-200 dark:border-gray-700 hover:border-black transition-colors"
                      >
                        <div className="font-semibold mb-1">{brand.name}</div>
                        <div className="text-xs text-gray-500">{brand.tier}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Protocols</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From latest 2025 standards to proven professional protocols
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protocols.map((protocol, index) => (
              <motion.div
                key={protocol.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{protocol.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                    {protocol.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{protocol.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Choice. Our Expertise.
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Select your preferred brands and platforms. We integrate everything seamlessly 
              under one unified control system. No compromises. No vendor lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
              >
                Discuss Your Integration
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
              >
                View Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

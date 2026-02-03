'use client'

import { motion } from 'framer-motion'
import { Search, Pencil, Wrench, Code, Headphones } from 'lucide-react'

export default function Workflow() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'DISCOVERY',
      description: 'Understand your vision, lifestyle, and technical requirements through detailed consultation',
    },
    {
      number: '02',
      icon: Pencil,
      title: 'DESIGN',
      description: 'Create bespoke system architecture tailored to your space and needs',
    },
    {
      number: '03',
      icon: Wrench,
      title: 'INSTALLATION',
      description: 'Professional installation with clean cable management and attention to detail',
    },
    {
      number: '04',
      icon: Code,
      title: 'PROGRAMMING',
      description: 'Custom programming for seamless integration and intuitive control',
    },
    {
      number: '05',
      icon: Headphones,
      title: 'SUPPORT',
      description: 'Ongoing maintenance, training, and technical support',
    },
  ]

  return (
    <section className="py-24 bg-white" data-testid="workflow-section">
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
            OUR PROJECT WORKFLOW
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Clear steps. Predictable outcomes.
          </motion.p>
        </div>

        {/* Desktop Workflow - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gray-300" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Icon Circle */}
                    <div className="w-32 h-32 bg-lexa-gold rounded-full flex items-center justify-center mb-6 relative z-10">
                      <Icon size={48} className="text-lexa-black" />
                    </div>

                    {/* Number */}
                    <div className="text-sm font-bold text-lexa-gold mb-2">{step.number}</div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-lexa-black mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Workflow - Vertical */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="flex gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-20 h-20 bg-lexa-gold rounded-full flex items-center justify-center">
                  <Icon size={32} className="text-lexa-black" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="text-sm font-bold text-lexa-gold mb-1">{step.number}</div>
                  <h3 className="text-xl font-bold text-lexa-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
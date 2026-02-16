'use client'

import { motion } from 'framer-motion'

export default function Workflow() {
  const steps = [
    { 
      number: '01', 
      title: 'Discovery', 
      description: 'Comprehensive consultation to understand your vision and technical requirements'
    },
    { 
      number: '02', 
      title: 'Design', 
      description: 'Bespoke system architecture with 3D visualization and detailed planning'
    },
    { 
      number: '03', 
      title: 'Installation', 
      description: 'Professional installation with military-grade cable management'
    },
    { 
      number: '04', 
      title: 'Programming', 
      description: 'Custom programming for seamless integration and intuitive control'
    },
    { 
      number: '05', 
      title: 'Support', 
      description: 'Dedicated 24/7 support, training, and ongoing maintenance'
    },
  ]

  return (
    <section className="relative py-32 bg-gray-50" data-testid="workflow-section">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
              Our Process
            </span>
            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] leading-[0.9] mb-6">
              SEAMLESS
              <br />
              <span className="text-transparent bg-clip-text metallic-gradient">DELIVERY</span>
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent" />
          </motion.div>

          {/* Steps Grid - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Number Circle */}
                <div className="relative mb-8">
                  <div className="w-full aspect-square border border-gray-300 group-hover:border-charcoal transition-colors duration-300 flex items-center justify-center">
                    <span className="text-5xl font-semibold tracking-tight group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </span>
                  </div>
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 left-full w-8 h-px bg-gray-300 hidden lg:block" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Steps List - Mobile/Tablet */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                {/* Number */}
                <div className="flex-shrink-0 w-20 h-20 border border-gray-300 flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-tight">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Every project follows our proven methodology, ensuring predictable outcomes and exceptional results.
            </p>
            <button className="px-10 py-5 border border-gray-300 hover:border-charcoal hover:bg-gray-100 text-charcoal text-sm font-medium tracking-wide transition-all duration-300">
              Learn More About Our Process
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

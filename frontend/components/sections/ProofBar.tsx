'use client'

import { motion } from 'framer-motion'

export default function ProofBar() {
  const brands = [
    'CRESTRON',
    'LUTRON',
    'CONTROL4',
    'SAVANT',
    'SONOS',
    'BANG & OLUFSEN',
  ]

  return (
    <section className="relative py-32 bg-charcoal" data-testid="proof-bar-section">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left - Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-500 font-medium mb-8 block">
                Premium Partners
              </span>
              
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] text-white mb-8">
                TRUSTED
                <br />
                BY THE
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">BEST</span>
              </h2>

              <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />

              <p className="text-lg text-gray-400 leading-relaxed font-light max-w-md">
                Dubai&apos;s most discerning clientele choose LEXA for uncompromising
                quality and seamless integration.
              </p>
            </motion.div>

            {/* Right - Brand List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {brands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-6 py-6 border-b border-gray-800 group-hover:border-gray-700 transition-colors duration-300">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono tracking-wider w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl font-medium text-white tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                      {brand}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

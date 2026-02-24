'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function FinalCTA() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  return (
    <>
      <section className="relative py-32 bg-charcoal overflow-hidden" data-testid="final-cta-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-xs tracking-[0.5em] uppercase text-gray-500 font-medium mb-8 block">
                  Get Started
                </span>

                <h2 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] text-white mb-8">
                  READY TO
                  <br />
                  <span className="text-transparent bg-clip-text metallic-gradient">TRANSFORM</span>
                </h2>

                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />

                <p className="text-xl text-gray-400 leading-relaxed font-light mb-12 max-w-lg">
                  Let&apos;s discuss your vision and create a tailored smart living solution.
                </p>

                {/* Contact Info */}
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
                    <Phone className="text-platinum" size={20} strokeWidth={2} />
                    <div>
                      <div className="text-xs tracking-wider uppercase text-gray-500 mb-1">Call</div>
                      <a href="tel:+971554452224" className="text-lg font-medium text-white hover:text-platinum transition-colors">
                        +971 55 445 2224
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
                    <Mail className="text-platinum" size={20} strokeWidth={2} />
                    <div>
                      <div className="text-xs tracking-wider uppercase text-gray-500 mb-1">Email</div>
                      <a href="mailto:sales@lexalifestyle.com" className="text-lg font-medium text-white hover:text-platinum transition-colors">
                        sales@lexalifestyle.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
                    <MapPin className="text-platinum" size={20} strokeWidth={2} />
                    <div>
                      <div className="text-xs tracking-wider uppercase text-gray-500 mb-1">Visit</div>
                      <p className="text-lg font-medium text-white">Al Quoz 1, Dubai, UAE</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 dark:bg-gray-800 text-charcoal border-0 px-10 py-6 text-sm font-medium tracking-wide transition-all duration-300"
                    onClick={() => setShowConsultationForm(true)}
                    data-testid="cta-book-consultation-btn"
                  >
                    Villa Technology Review
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-white px-10 py-6 text-sm font-medium tracking-wide transition-all duration-300"
                    onClick={() => window.location.href = '/calculator'}
                    data-testid="cta-calculator-btn"
                  >
                    Cost Calculator
                  </Button>
                </div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative h-[500px] lg:h-[600px] overflow-hidden"
              >
                <SafeImage
                  src="/images/premium/technology/tech-1.jpg"
                  alt="LEXA Experience Center"
                  fill
                  className="object-cover grayscale-[20%]"
                  quality={95}
                />
                {/* Platinum corner accent */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-platinum/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </>
  )
}

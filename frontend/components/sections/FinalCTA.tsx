'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-lexa-black" data-testid="final-cta-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            READY TO TRANSFORM YOUR SPACE?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss your vision and create a tailored solution for your luxury living experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setShowConsultationForm(true)}
              data-testid="cta-book-consultation-btn"
            >
              BOOK A CONSULTATION
            </Button>
            <Link href="/company/experience-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-lexa-black"
                data-testid="cta-visit-experience-center-btn"
              >
                VISIT OUR EXPERIENCE CENTER
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-gray-400">
            <p className="mb-2">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <a
                href="tel:+971554452224"
                className="hover:text-lexa-gold transition-colors"
              >
                +971 55 445 2224
              </a>
              <span className="hidden sm:inline">|</span>
              <a
                href="mailto:sales@lexalifestyle.com"
                className="hover:text-lexa-gold transition-colors"
              >
                sales@lexalifestyle.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </section>
  )
}
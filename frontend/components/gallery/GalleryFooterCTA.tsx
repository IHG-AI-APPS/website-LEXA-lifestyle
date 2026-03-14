'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export default function GalleryFooterCTA() {
  const { settings } = useSiteSettings()

  const phoneClean = settings.contact_phone.replace(/\s/g, '')
  const whatsappClean = settings.social_whatsapp?.replace(/[^0-9]/g, '') || ''

  return (
    <section className="bg-[#F9F9F7] py-10 md:py-12 lg:py-14">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1A1A1A] p-6 sm:p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8DCC8]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E8DCC8]/5 rounded-full blur-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side - CTA */}
              <div className="text-center lg:text-left">
                <div className="section-label text-[#E8DCC8] mb-4">GET IN TOUCH</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight">
                  LET&apos;S TALK
                </h2>
                <p className="text-sm sm:text-base text-white/80 mb-6 max-w-md mx-auto lg:mx-0">
                  Ready to transform your space into a smart luxury sanctuary? 
                  Schedule a consultation with our experts.
                </p>
                <Link href="/contact" className="block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#E8DCC8] text-[#1A1A1A] dark:text-white uppercase tracking-widest hover:bg-[#E8DCC8]/90 rounded-none px-8 py-4 sm:px-10 sm:py-5 text-xs sm:text-sm font-bold transition-all"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Right Side - Contact Info Box */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8">
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-6 uppercase tracking-wider text-center lg:text-left">
                  Contact Information
                </h3>
                
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center group-hover:bg-[#E8DCC8]/20 transition-colors">
                      <Phone className="h-5 w-5 text-[#E8DCC8]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1.5">Phone</div>
                      <a href={`tel:${phoneClean}`} className="text-white text-sm sm:text-base hover:text-[#E8DCC8] transition-colors block">
                        {settings.contact_phone}
                      </a>
                      {whatsappClean && (
                        <div className="text-white/40 text-xs sm:text-sm mt-1">WhatsApp: {settings.social_whatsapp}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center group-hover:bg-[#E8DCC8]/20 transition-colors">
                      <Mail className="h-5 w-5 text-[#E8DCC8]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1.5">Email</div>
                      <a href={`mailto:${settings.contact_email}`} className="text-white text-sm sm:text-base hover:text-[#E8DCC8] transition-colors break-all">
                        {settings.contact_email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center group-hover:bg-[#E8DCC8]/20 transition-colors">
                      <MapPin className="h-5 w-5 text-[#E8DCC8]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1.5">Address</div>
                      <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {settings.contact_address}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center group-hover:bg-[#E8DCC8]/20 transition-colors">
                      <Clock className="h-5 w-5 text-[#E8DCC8]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1.5">Hours</div>
                      <p className="text-white text-sm sm:text-base">
                        {settings.business_hours_weekday || 'Sat-Thu: 9AM-6PM'}<br />
                        {settings.business_hours_friday || 'Fri: 10AM-4PM'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Home, Building2, Waves, Shield, Music, Sun, 
  Thermometer, Tv, Phone, ArrowRight, CheckCircle,
  MapPin, Clock, Star
} from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import BookingModal from '@/components/modals/BookingModal'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function JBRClient() {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const systems = [
    { icon: Sun, title: 'Lighting Control', desc: 'Ocean-view optimized lighting scenes' },
    { icon: Music, title: 'Multi-Room Audio', desc: 'Waterproof speakers for balconies' },
    { icon: Shield, title: 'Security Systems', desc: 'HD cameras & smart locks' },
    { icon: Thermometer, title: 'Climate Control', desc: 'Energy-efficient AC automation' },
    { icon: Tv, title: 'Entertainment', desc: '4K displays & streaming' },
    { icon: Waves, title: 'Smart Shading', desc: 'Automated blinds for sea views' },
  ]

  const benefits = [
    'Coastal-optimized equipment with corrosion resistance',
    'Integrate with building systems where available',
    'Energy management for high-rise efficiency',
    'Multi-zone audio for open-plan living',
    'Remote access while traveling',
    '24/7 support with rapid response',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[#0a0f1a] via-[#1a1a2e] to-[#0a0f1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-[#C9A962]" size={20} />
              <span className="text-[#C9A962] uppercase tracking-widest text-sm">JBR Dubai</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Smart Home Automation<br />
              <span className="text-[#C9A962]">Jumeirah Beach Residence</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your JBR beachfront apartment into a connected smart home. 
              Coastal-grade systems designed for Dubai's premium beach lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#C9A962] hover:bg-[#b8954f] text-black"
                onClick={() => setShowBookingModal(true)}
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/consultation">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why JBR Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Smart Home Solutions for JBR Living
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              JBR's beachfront towers require specialized automation solutions that withstand 
              coastal conditions while maximizing your stunning ocean views.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <system.icon className="text-[#C9A962] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Why Choose LEXA for JBR?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                With over 15 years of experience in Dubai's premium properties, 
                we understand the unique requirements of beachfront high-rise living.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
                alt="JBR Beachfront View"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready for Smart JBR Living?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a free consultation and discover how we can transform your 
            JBR apartment into an intelligent beachfront home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#C9A962] hover:bg-[#b8954f] text-black"
              onClick={() => setShowBookingModal(true)}
            >
              Schedule Free Visit
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="tel:+97141234567">
                <Phone className="mr-2" size={18} />
                Call +971 4 123 4567
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}

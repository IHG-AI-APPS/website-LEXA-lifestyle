'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Home, Building2, Waves, Shield, Music, Sun, 
  Thermometer, Tv, Phone, ArrowRight, CheckCircle,
  MapPin, Clock, Star, Anchor
} from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import BookingModal from '@/components/modals/BookingModal'

export default function DubaiMarinaClient() {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const systems = [
    { icon: Sun, title: 'Lighting Design', desc: 'Yacht-view optimized lighting scenes' },
    { icon: Music, title: 'Whole-Home Audio', desc: 'Multi-zone streaming systems' },
    { icon: Shield, title: 'Smart Security', desc: 'Video intercoms & access control' },
    { icon: Thermometer, title: 'Climate Control', desc: 'Zoned AC with energy monitoring' },
    { icon: Tv, title: 'Home Cinema', desc: 'Dedicated theater or living room setup' },
    { icon: Anchor, title: 'Marina Integration', desc: 'Control systems from your yacht' },
  ]

  const towers = [
    'Marina Gate',
    'Cayan Tower',
    'Princess Tower',
    'Marina Heights',
    'Iris Blue',
    'Trident Grand',
    '23 Marina',
    'Elite Residence',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[#0a0f1a] via-[#1a1a2e] to-[#0a0f1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-[#C9A962]" size={20} />
              <span className="text-[#C9A962] uppercase tracking-widest text-sm">Dubai Marina</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Smart Home Automation<br />
              <span className="text-[#C9A962]">Dubai Marina</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Elevate your Dubai Marina penthouse or apartment with intelligent automation. 
              Experience seamless control of lighting, climate, security, and entertainment.
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
                <Link href="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Smart Systems for Marina Living
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dubai Marina's iconic towers deserve the finest automation technology. 
              We specialize in high-rise smart home installations.
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
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <system.icon className="text-[#C9A962] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Towers We Serve */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
            Towers We Serve in Dubai Marina
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {towers.map((tower, index) => (
              <span 
                key={index}
                className="px-6 py-3 bg-gray-100 rounded-full text-gray-700 font-medium"
              >
                {tower}
              </span>
            ))}
            <span className="px-6 py-3 bg-[#C9A962] rounded-full text-black font-medium">
              + All Marina Towers
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Transform Your Marina Home
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of Dubai Marina residents enjoying smart home living. 
            Book your free consultation today.
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

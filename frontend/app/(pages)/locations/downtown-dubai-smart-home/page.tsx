'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Home, DollarSign, Clock } from 'lucide-react'

export default function DowntownDubaiPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin size={16} />
                <span>Downtown Dubai</span>
              </div>
              <h1 className="h1 uppercase mb-6">SMART HOME AUTOMATION DOWNTOWN DUBAI</h1>
              <p className="text-xl text-gray-600 mb-8">LEXA Lifestyle specializes in luxury apartment and penthouse automation in Downtown Dubai. Over 200 properties automated in Burj Khalifa, Address residences, and surrounding towers.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="h2 uppercase mb-12">DOWNTOWN DUBAI SMART HOME SOLUTIONS</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Retrofit Expertise</h3>
                <p className="text-gray-600 mb-4">Specialized in finished apartment automation:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Minimal disruption to existing finishes</li>
                  <li>✓ Wireless solutions where needed</li>
                  <li>✓ Strategic cable routing</li>
                  <li>✓ Works with building management regulations</li>
                  <li>✓ Quick installation (3-5 weeks)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Popular Packages</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Penthouse Premium</div>
                    <div className="text-sm text-gray-600">4,500 sq ft | AED 320,000</div>
                    <div className="text-sm text-gray-500">Control4, Lutron, Multi-room Audio, Smart Security</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Apartment Essentials</div>
                    <div className="text-sm text-gray-600">2,200 sq ft | AED 120,000</div>
                    <div className="text-sm text-gray-500">Lighting Control, Climate, Voice Control, Security</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Entertainment Focus</div>
                    <div className="text-sm text-gray-600">Any Size | AED 85,000+</div>
                    <div className="text-sm text-gray-500">Sonos Audio, Smart TV Integration, Lighting Scenes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Home className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-gray-600">Downtown Properties Automated</div>
              </div>
              <div className="text-center">
                <DollarSign className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">AED 150K</div>
                <div className="text-gray-600">Average Apartment Project</div>
              </div>
              <div className="text-center">
                <Clock className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">3-5 Weeks</div>
                <div className="text-gray-600">Installation Timeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">AUTOMATE YOUR DOWNTOWN DUBAI HOME</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get a custom quote for your Burj Khalifa, Address, or Downtown apartment. Free consultation and system demonstration.</p>
          <Link href="/contact" className="inline-block bg-white text-gray-900 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors">Schedule Consultation</Link>
        </div>
      </section>
    </div>
  )
}
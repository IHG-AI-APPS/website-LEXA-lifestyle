'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Home, DollarSign, Clock } from 'lucide-react'

export default function PalmJumeirahPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin size={16} />
                <span>Palm Jumeirah, Dubai</span>
              </div>
              <h1 className="h1 uppercase mb-6">SMART HOME AUTOMATION PALM JUMEIRAH DUBAI</h1>
              <p className="text-xl text-gray-600 mb-8">LEXA Lifestyle transforms Palm Jumeirah villas with integrated smart living. Expert in beachfront properties, outdoor automation, and luxury entertainment systems.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="h2 uppercase mb-12">PALM JUMEIRAH AUTOMATION EXPERTISE</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Beachfront Specialization</h3>
                <p className="text-gray-600 mb-4">Palm properties need special considerations:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Salt-air resistant outdoor equipment</li>
                  <li>✓ Beach-facing shade automation</li>
                  <li>✓ Outdoor entertainment systems</li>
                  <li>✓ Pool and spa automation</li>
                  <li>✓ Weather-rated speakers and screens</li>
                  <li>✓ Robust WiFi for large properties</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Featured Projects</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Signature Villa</div>
                    <div className="text-sm text-gray-600">9,000 sq ft | AED 680,000</div>
                    <div className="text-sm text-gray-500">Full Crestron, Theater, Outdoor AV, Pool Automation</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Garden Homes</div>
                    <div className="text-sm text-gray-600">5,500 sq ft | AED 420,000</div>
                    <div className="text-sm text-gray-500">Control4, Lutron, Sonos, Smart Security</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Apartment Tower</div>
                    <div className="text-sm text-gray-600">3,200 sq ft | AED 210,000</div>
                    <div className="text-sm text-gray-500">Smart Living Package with Sea Views</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Home className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">120+</div>
                <div className="text-gray-600">Palm Properties Completed</div>
              </div>
              <div className="text-center">
                <DollarSign className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">AED 450K</div>
                <div className="text-gray-600">Average Villa Investment</div>
              </div>
              <div className="text-center">
                <Clock className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">8-12 Weeks</div>
                <div className="text-gray-600">Typical Timeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">TRANSFORM YOUR PALM JUMEIRAH PROPERTY</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Expert automation for Signature Villas, Garden Homes, and Shoreline Apartments. Schedule your free consultation today.</p>
          <Link href="/contact" className="inline-block bg-white text-gray-900 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors">Private Design Session</Link>
        </div>
      </section>
    </div>
  )
}
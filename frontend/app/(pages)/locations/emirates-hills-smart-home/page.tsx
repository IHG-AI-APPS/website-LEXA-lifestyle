'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Home, DollarSign, Clock } from 'lucide-react'

export default function EmiratesHillsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPin size={16} />
                <span>Emirates Hills, Dubai</span>
              </div>
              <h1 className="h1 uppercase mb-6">SMART HOME AUTOMATION EMIRATES HILLS DUBAI</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">LEXA Lifestyle is Emirates Hills&apos; trusted smart home partner. Over 150 luxury villas automated with Control4, Crestron, and Lutron systems.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="h2 uppercase mb-12">WHY EMIRATES HILLS HOMEOWNERS CHOOSE LEXA</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
              <h3 className="h3 uppercase mb-4">LOCAL EXPERTISE</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">We understand Emirates Hills properties intimately:</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 dark:text-gray-400">
                  <li>✓ Experience with 10,000-20,000 sq ft villas</li>
                  <li>✓ Network infrastructure for multi-floor properties</li>
                  <li>✓ Integration with existing architectural features</li>
                  <li>✓ Outdoor automation (pools, gardens, gates)</li>
                  <li>✓ Multi-car garage automation</li>
                </ul>
              </div>

              <div>
                <h3 className="h3 uppercase mb-4">TYPICAL PROJECTS</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Complete Villa Integration</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">12,000 sq ft | AED 850,000</div>
                    <div className="text-sm text-gray-500">Crestron, Lutron, Dolby Atmos Theater, Multi-room Audio</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Premium Control4 System</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">8,500 sq ft | AED 520,000</div>
                    <div className="text-sm text-gray-500">Lighting, Climate, Security, Entertainment</div>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <div className="font-semibold">Home Theater Addition</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Cinema Room | AED 320,000</div>
                    <div className="text-sm text-gray-500">Sony Projector, Dolby Atmos 9.2.4, Acoustic Treatment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg mb-16">
              <h3 className="h3 uppercase mb-6">SERVICES FOR EMIRATES HILLS PROPERTIES</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="font-semibold mb-2">Whole-Home Automation</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Control4 or Crestron systems controlling lighting, climate, shades, security, and entertainment</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Lutron Lighting</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Keypads, dimmers, and architectural lighting control throughout villa</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Home Theaters</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Dedicated cinema rooms with Dolby Atmos surround sound</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Multi-Room Audio</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Sonos, KEF, or Control4 audio in every room and outdoor areas</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Security Integration</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">CCTV, access control, smart locks, and alarm systems</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Network Infrastructure</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Enterprise-grade networking for reliable smart home operation</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <Home className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Emirates Hills Villas Completed</div>
              </div>
              <div className="text-center">
                <DollarSign className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">AED 350K+</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Average Project Investment</div>
              </div>
              <div className="text-center">
                <Clock className="inline-block mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">10-14 Weeks</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Typical Installation Timeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">TRANSFORM YOUR EMIRATES HILLS VILLA</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Schedule a consultation to discuss your smart home vision. We&apos;ll visit your property and create a customized proposal.</p>
          <Link href="/contact" className="inline-block bg-white text-gray-900 dark:text-white px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors">Book Free Consultation</Link>
          <p className="text-sm text-gray-400 mt-6">Serving Emirates Hills | Arabian Ranches | Jumeirah Islands | Palm Jumeirah</p>
        </div>
      </section>
    </div>
  )
}
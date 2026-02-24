'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const zones = [
  { name: 'THE LINE', type: 'Linear Smart City', status: 'Pioneering' },
  { name: 'Oxagon', type: 'Industrial Innovation', status: 'Advanced' },
  { name: 'Trojena', type: 'Mountain Resort', status: 'Premium' },
  { name: 'Sindalah', type: 'Luxury Island', status: 'Ultra-Luxury' },
]

export default function NEOMClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-purple-300 mb-4">
            <MapPin className="w-5 h-5" /><span>NEOM, Saudi Arabia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Living<br /><span className="text-purple-400">NEOM</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mb-8">
            The future of living starts here. LEXA brings next-generation smart home technology to NEOM - THE LINE, Oxagon, Trojena.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Future-Ready Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: 'Vision', label: '2030 Partner' }, { value: '100%', label: 'Sustainable' }, { value: 'AI', label: 'Powered' }, { value: 'First', label: 'Movers' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-purple-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">NEOM Zones We Serve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {zones.map((z, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{z.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{z.type}</p>
                <span className="inline-block mt-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">{z.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Be Part of NEOM Smart Future</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold">
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

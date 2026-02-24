'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const communities = [
  { name: 'Al Malqa', type: 'Luxury Villas', projects: '40+' },
  { name: 'Al Nakheel', type: 'Premium Compounds', projects: '35+' },
  { name: 'Hittin', type: 'Modern Villas', projects: '30+' },
  { name: 'Diplomatic Quarter', type: 'Embassy Residences', projects: '25+' },
  { name: 'KAFD', type: 'Luxury Apartments', projects: '20+' },
]

export default function RiyadhClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-green-300 mb-4">
            <MapPin className="w-5 h-5" /><span>Riyadh, Saudi Arabia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Home Automation<br /><span className="text-green-400">Riyadh</span>
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Vision 2030 ready smart living for Riyadh finest properties. From Al Malqa villas to KAFD penthouses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '150+', label: 'Riyadh Projects' }, { value: '15+', label: 'Years Experience' }, { value: '24/7', label: 'Support' }, { value: '100%', label: 'Saudi Compliant' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-green-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Riyadh Communities We Serve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{c.type}</p>
                <span className="inline-block mt-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">{c.projects}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-green-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Riyadh?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const communities = [
  { name: 'New Cairo', type: 'Gated Communities', projects: '45+' },
  { name: 'Maadi', type: 'Luxury Villas', projects: '35+' },
  { name: 'Zamalek', type: 'Premium Apartments', projects: '25+' },
  { name: 'Sheikh Zayed City', type: 'Modern Compounds', projects: '30+' },
  { name: '6th of October', type: 'Smart Compounds', projects: '20+' },
]

export default function CairoClient() {
  const cms = useCms('page_geo_egypt_cairo_smart_homes', null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-amber-200 mb-4">
            <MapPin className="w-5 h-5" /><span>Cairo, Egypt</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Home Automation<br /><span className="text-yellow-300">Cairo</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mb-8">
            Egypt premier smart living. From New Cairo compounds to Zamalek penthouses, LEXA delivers intelligent luxury to the land of the Pharaohs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '120+', label: 'Egypt Projects' }, { value: '15+', label: 'Years' }, { value: 'Premium', label: 'Brands' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-amber-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Cairo Communities We Serve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{c.type}</p>
                <span className="inline-block mt-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">{c.projects}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-amber-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Cairo?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-amber-800 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const communities = [
  { name: 'Abdoun', type: 'Luxury Villas', projects: '30+' },
  { name: 'Dabouq', type: 'Hillside Estates', projects: '25+' },
  { name: 'Sweifieh', type: 'Modern Apartments', projects: '20+' },
  { name: 'Deir Ghbar', type: 'Premium Residences', projects: '15+' },
]

export default function AmmanClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-red-900 via-rose-800 to-red-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-red-200 mb-4">
            <MapPin className="w-5 h-5" /><span>Amman, Jordan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Home Automation<br /><span className="text-rose-300">Amman</span>
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mb-8">
            Jordan premier smart living. From Abdoun hillside villas to Dabouq estates, LEXA brings intelligent luxury to the White City.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '60+', label: 'Jordan Projects' }, { value: '15+', label: 'Years' }, { value: 'Premium', label: 'Brands' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-red-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Amman Communities We Serve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{c.type} - {c.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-red-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Jordan?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-red-900 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

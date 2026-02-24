'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const communities = [
  { name: 'Obhur', type: 'Beachfront Villas', projects: '35+' },
  { name: 'Al Shati', type: 'Luxury Compounds', projects: '30+' },
  { name: 'Al Rawdah', type: 'Premium Villas', projects: '25+' },
  { name: 'Jeddah Corniche', type: 'Waterfront Living', projects: '20+' },
]

export default function JeddahClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-300 mb-4">
            <MapPin className="w-5 h-5" /><span>Jeddah, Saudi Arabia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Home Automation<br /><span className="text-cyan-400">Jeddah</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Red Sea coastal smart living. From Obhur beachfront villas to Al Shati compounds, LEXA delivers intelligent luxury.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '100+', label: 'Jeddah Projects' }, { value: '15+', label: 'Years' }, { value: 'Coastal', label: 'Experts' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Jeddah Communities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{c.type} - {c.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Jeddah?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

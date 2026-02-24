'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const communities = [
  { name: 'Karen', type: 'Garden Estates', projects: '30+' },
  { name: 'Runda', type: 'Luxury Villas', projects: '25+' },
  { name: 'Westlands', type: 'Modern High-Rise', projects: '20+' },
  { name: 'Muthaiga', type: 'Diplomatic Residences', projects: '15+' },
]

export default function NairobiClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-red-800 via-orange-700 to-yellow-700">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-red-200 mb-4">
            <MapPin className="w-5 h-5" /><span>Nairobi, Kenya</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Home Automation<br /><span className="text-yellow-300">Nairobi</span>
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mb-8">
            East Africa smart living hub. From Karen garden estates to Runda luxury villas, LEXA delivers intelligent living to the Safari Capital.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '60+', label: 'Kenya Projects' }, { value: '10+', label: 'Years' }, { value: 'Regional', label: 'Hub' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Nairobi Communities We Serve</h2>
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
      <section className="py-16 bg-red-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Kenya?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-red-800 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

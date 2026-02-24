'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const communities = [
  { name: 'The Pearl Qatar', type: 'Luxury Island', projects: '50+' },
  { name: 'West Bay', type: 'High-Rise Living', projects: '40+' },
  { name: 'Lusail City', type: 'Smart City', projects: '35+' },
  { name: 'Al Dafna', type: 'Business District', projects: '25+' },
]

const faqs = [
  { q: 'What is the cost of smart home in Doha?', a: 'Smart home systems in Qatar range from QAR 75,000 for apartments to QAR 500,000+ for Pearl Qatar villas.' },
  { q: 'Do you serve Lusail City projects?', a: 'Yes, we are active in Lusail with smart city integration for the new developments and FIFA legacy properties.' },
]

export default function DohaClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 bg-gradient-to-br from-maroon-900 via-red-900 to-rose-900" style={{background: 'linear-gradient(to bottom right, #7B1113, #8B0000, #722F37)'}}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-red-300 mb-4">
            <MapPin className="w-5 h-5" /><span>Doha, Qatar</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Home Automation<br /><span className="text-red-300">Doha</span>
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mb-8">
            Qatar luxury living redefined. From The Pearl to Lusail City, LEXA delivers world-class smart home solutions for Doha discerning homeowners.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-white hover:bg-red-50 text-red-900 px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '120+', label: 'Qatar Projects' }, { value: '15+', label: 'Years' }, { value: 'World Cup', label: 'Legacy' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-red-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Doha Communities We Serve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{c.type} • {c.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" style={{background: '#7B1113'}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Smart Living in Qatar?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-red-900 px-8 py-4 rounded-lg font-semibold">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

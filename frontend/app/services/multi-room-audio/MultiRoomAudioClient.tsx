'use client'
import React from 'react'
import Link from 'next/link'
import { Music2, Speaker, Radio, Waves, ArrowRight, Volume2 } from 'lucide-react'
import Script from 'next/script'

const solutions = [
  { icon: Speaker, title: 'Invisible Speakers', desc: 'Sonance Invisible Series, Amina - audio without visible speakers' },
  { icon: Waves, title: 'Outdoor Audio', desc: 'Weather-proof garden, pool and terrace sound systems' },
  { icon: Radio, title: 'Streaming Integration', desc: 'Spotify, Apple Music, Tidal throughout your home' },
  { icon: Volume2, title: 'Zone Control', desc: 'Independent audio in every room with centralized control' },
]

const brands = [
  { name: 'Sonos', specialty: 'Wireless multi-room' },
  { name: 'Sonance', specialty: 'Architectural audio' },
  { name: 'KEF Ci', specialty: 'Custom installation' },
  { name: 'Bowers & Wilkins CI', specialty: 'Premium in-wall' },
  { name: 'Origin Acoustics', specialty: 'Outdoor specialists' },
  { name: 'Amina', specialty: 'Invisible speakers' },
]

const faqs = [
  {
    q: 'What is multi-room audio and how does it work?',
    a: 'Multi-room audio lets you play music in any or all rooms of your home from a single source. Using wired or wireless speakers connected to a central system, you can stream different music to different rooms, or sync the entire home. Control is via app, touch panels, or voice commands.'
  },
  {
    q: 'How much does multi-room audio cost in Dubai?',
    a: 'Multi-room audio systems in Dubai range from AED 15,000 for a basic 4-zone Sonos setup to AED 200,000+ for whole-villa distributed audio with architectural speakers. Most popular villa installations average AED 40,000-80,000 for 8-12 zones with quality speakers.'
  },
  {
    q: 'Can you hide speakers completely?',
    a: 'Yes, we specialize in invisible audio solutions. Brands like Amina and Sonance Invisible mount behind drywall or plaster, becoming completely invisible while delivering excellent sound. We also offer in-ceiling, in-wall, and disguised speakers for minimal visual impact.'
  },
  {
    q: 'Do you install outdoor audio for pools and gardens?',
    a: 'Absolutely. Outdoor audio is one of our specialties in Dubai. We use weather-proof speakers from Origin Acoustics and Sonance designed to handle UAE\'s extreme heat. From subtle garden bollards to powerful pool-side systems, we create outdoor entertainment zones that last.'
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Multi-Room Audio Installation Dubai",
  "description": "Whole-home distributed audio systems for Dubai villas and apartments. Sonos, Sonance, KEF specialists.",
  "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE"],
  "serviceType": "Multi-Room Audio Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
}

export default function MultiRoomAudioClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-300 mb-4">
            <Music2 className="w-5 h-5" />
            <span>Whole-Home Audio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Multi-Room Audio Systems<br />
            <span className="text-blue-400">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Fill every room with music. LEXA designs and installs seamless multi-room audio systems - from invisible speakers to powerful outdoor sound, all controlled from your phone.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Design My System <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '500+', label: 'Audio Zones' },
              { value: 'Sonos', label: 'Pro Installer' },
              { value: 'Outdoor', label: 'Specialists' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Audio Solutions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Premium Audio Brands</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {brands.map((b, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{b.name}</h3>
                <p className="text-blue-600 dark:text-blue-400">{b.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Multi-Room Audio FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Whole-Home Sound?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold">
            Get Audio Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

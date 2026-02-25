'use client'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Sun, Waves, TreePine, Volume2, ArrowRight, ThermometerSun, Droplets, MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'
import { useCms } from '@/hooks/useCms'

const solutions = [
  { icon: Waves, title: 'Pool Audio', desc: 'Underwater speakers and poolside systems' },
  { icon: TreePine, title: 'Garden Sound', desc: 'Landscape speakers hidden in rocks and planters' },
  { icon: Sun, title: 'Terrace Systems', desc: 'Rooftop and balcony entertainment' },
  { icon: Volume2, title: 'Outdoor Cinema', desc: 'Al fresco movie nights with surround sound' },
]

const features = [
  { icon: ThermometerSun, title: 'Heat Resistant', desc: 'Built for Dubai 50°C summers' },
  { icon: Droplets, title: 'IP67 Rated', desc: 'Waterproof and dustproof' },
]

const brands = [
  { name: 'Origin Acoustics', specialty: 'Landscape series' },
  { name: 'Sonance', specialty: 'Garden series' },
  { name: 'Monitor Audio', specialty: 'Climate series' },
  { name: 'James Loudspeaker', specialty: 'Architectural outdoor' },
]

const faqs = [
  { 
    q: 'Can outdoor speakers survive Dubai summers?', 
    a: 'Yes, we only install speakers rated for extreme heat (up to 70°C) and UV resistance. Brands like Origin Acoustics, Sonance, and James Loudspeaker are specifically designed for harsh climates. All speakers feature marine-grade components and come with 5-10 year warranties even in UAE conditions.' 
  },
  { 
    q: 'How much do outdoor audio systems cost in Dubai?', 
    a: 'Outdoor audio ranges from AED 15,000 for basic patio systems (4 speakers) to AED 150,000+ for comprehensive garden, pool, and terrace coverage with buried subwoofers. Most villa installations average AED 30,000-60,000 for 8-12 zones covering pool area, garden, and outdoor dining spaces.' 
  },
  { 
    q: 'Can you install speakers around the pool?', 
    a: 'Absolutely. We specialize in pool-area audio including underwater speakers, in-ground subwoofers, and weather-sealed poolside systems. All equipment is IP67+ rated for splash and submersion. We also install speakers in pool houses, cabanas, and around water features.' 
  },
  { 
    q: 'Can you retrofit outdoor audio to an existing garden?', 
    a: 'Yes, outdoor audio is one of the easiest retrofits. Landscape speakers hide in planters, rocks, and garden beds. We run weather-resistant cabling underground or along fence lines. Most outdoor audio retrofits complete in 2-4 weeks with minimal landscaping disruption.' 
  },
  { 
    q: 'How long does outdoor audio installation take?', 
    a: 'Basic patio systems take 2-3 days. Full garden and pool coverage takes 1-2 weeks. Large estates with multiple zones take 3-4 weeks. Timing depends on landscaping coordination and buried cable requirements. We schedule around your outdoor events.' 
  },
  { 
    q: 'What warranty comes with outdoor audio systems?', 
    a: 'Outdoor speakers from our recommended brands carry 5-10 year warranties specifically covering UAE climate conditions. Installation workmanship is warranted for 2 years. We offer maintenance packages including annual speaker cleaning, connection checks, and software updates from AED 3,000/year.' 
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Outdoor Audio Installation Dubai",
  "description": "Professional outdoor audio systems for Dubai gardens, pools, and terraces. Weather-proof speakers designed for UAE climate.",
  "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"],
  "serviceType": "Outdoor Audio Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
}

export default function OutdoorAudioClient() {
  const cms = useCms('service_outdoor_audio', null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-green-800 via-teal-700 to-cyan-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 mb-4">
            <Sun className="w-5 h-5" /><span>Outdoor Entertainment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Outdoor Audio Systems<br /><span className="text-teal-300">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Extend your entertainment outdoors. LEXA installs weather-proof audio systems for Dubai gardens, pools, and terraces - built to withstand extreme heat and deliver exceptional sound.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Design My System <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.outdoorAudio || 'Hi LEXA, I\'m interested in outdoor audio for my villa in Dubai.', 'outdoor_audio_page', 'outdoor_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-lg font-semibold">
              Visit Showroom
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '200+', label: 'Outdoor Installs' }, { value: 'IP67', label: 'Rated Equipment' }, { value: '10 Year', label: 'Warranty' }, { value: '50°C+', label: 'Heat Tested' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-green-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Outdoor Audio Solutions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <s.icon className="w-10 h-10 text-teal-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Outdoor Audio Brands</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {brands.map((b, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{b.name}</h3>
                <p className="text-teal-600 dark:text-teal-400">{b.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Outdoor Audio FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Outdoor Entertainment?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-teal-800 px-8 py-4 rounded-lg font-semibold">
            Get Outdoor Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

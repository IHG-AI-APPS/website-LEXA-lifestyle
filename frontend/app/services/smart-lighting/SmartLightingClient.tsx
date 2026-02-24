'use client'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Lightbulb, Sun, Moon, Blinds, ArrowRight, Palette, Clock, Smartphone, MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

const solutions = [
  { icon: Lightbulb, title: 'Scene Lighting', desc: 'One-touch scenes for dining, entertaining, relaxing' },
  { icon: Sun, title: 'Circadian Rhythm', desc: 'Human-centric lighting that follows natural daylight' },
  { icon: Blinds, title: 'Automated Shades', desc: 'Lutron, Somfy motorized blinds and curtains' },
  { icon: Moon, title: 'Night Modes', desc: 'Pathway lighting and sleep-friendly settings' },
]

const brands = [
  { name: 'Lutron', products: 'RadioRA 3, Homeworks QSX, Caseta' },
  { name: 'Ketra', products: 'Tunable LED, Natural Light' },
  { name: 'Philips Dynalite', products: 'Commercial-grade control' },
  { name: 'Somfy', products: 'Motorized blinds & curtains' },
]

const faqs = [
  { 
    q: 'What is the best smart lighting system for Dubai villas?', 
    a: 'Lutron RadioRA 3 or Homeworks QSX are ideal for Dubai villas. They offer reliable wireless control, work with any LED fixtures, and integrate with Control4/Crestron. For ultimate color tuning and human-centric lighting, Ketra provides natural light matching throughout the day. We recommend the system based on your villa size and budget.' 
  },
  { 
    q: 'How much does smart lighting cost in Dubai?', 
    a: 'Smart lighting ranges from AED 30,000 for a basic 3-bedroom apartment to AED 300,000+ for a fully automated villa with motorized blinds. Most 5-bedroom villas average AED 80,000-150,000 for complete lighting and shade control including dimmers, keypads, and automated blinds throughout.' 
  },
  { 
    q: 'Can you retrofit smart lighting into an existing villa?', 
    a: 'Yes, Lutron RadioRA 3 is specifically designed for retrofits. Wireless dimmers replace existing switches without new wiring. Motorized blind motors attach to existing tracks. Most retrofit projects complete in 1-2 weeks with zero painting or patching required.' 
  },
  { 
    q: 'What is circadian lighting?', 
    a: 'Circadian lighting automatically adjusts color temperature throughout the day - energizing blue-white in the morning, warm amber in the evening. This supports natural sleep patterns and is especially valuable in Dubai where indoor time is high during summer. Ketra and Lutron Ketra-enabled systems provide the best circadian performance.' 
  },
  { 
    q: 'Can you automate existing curtains and blinds?', 
    a: 'Yes, we can motorize most existing curtains and blinds using Somfy or Lutron motors. For new installations, we recommend Lutron Palladiom or Sivoia shades for seamless integration with your lighting system. Automation can be triggered by time, sunrise/sunset, or manual control.' 
  },
  { 
    q: 'How long does smart lighting installation take?', 
    a: 'New construction integration happens alongside electrical work. Retrofit projects take 1-2 weeks for a typical villa. Large estates with extensive shade automation take 3-4 weeks. We provide detailed timelines during consultation and work around your schedule.' 
  },
  { 
    q: 'What warranty do you offer on smart lighting?', 
    a: 'Lutron products carry industry-leading warranties: RadioRA 3 has 8 years, Homeworks QSX has lifetime warranty on processors. Motorized shades have 5-year drive warranties. Our installation workmanship is warranted for 2 years. We offer annual maintenance packages from AED 4,000/year.' 
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Lighting Installation Dubai",
  "description": "Intelligent lighting systems for Dubai homes. Lutron, Ketra, automated blinds and circadian lighting specialists.",
  "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"],
  "serviceType": "Smart Lighting Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
}

export default function SmartLightingClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-yellow-700 via-amber-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-yellow-200 mb-4">
            <Lightbulb className="w-5 h-5" /><span>Intelligent Illumination</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Lighting Systems<br /><span className="text-yellow-300">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl mb-8">
            Transform your home with intelligent lighting. LEXA designs and installs Lutron, Ketra, and automated shade systems that enhance your lifestyle and wellbeing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Design My Lighting <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.smartLighting || 'Hi LEXA, I\'m interested in smart lighting for my property in Dubai.', 'smart_lighting_page', 'lighting_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 rounded-lg font-semibold">
              Visit Showroom
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[{ value: '400+', label: 'Lighting Projects' }, { value: 'Lutron', label: 'Platinum Dealer' }, { value: 'Ketra', label: 'Certified' }, { value: 'Circadian', label: 'Specialists' }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-yellow-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Smart Lighting Solutions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <s.icon className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Premium Lighting Brands</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {brands.map((b, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{b.name}</h3>
                <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">{b.products}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Smart Lighting FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Intelligent Lighting?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold">
            Get Lighting Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

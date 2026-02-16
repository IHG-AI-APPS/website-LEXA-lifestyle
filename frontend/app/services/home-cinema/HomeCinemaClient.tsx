'use client'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Film, Armchair, Volume2, Eye, ArrowRight, MessageCircle } from 'lucide-react'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

const elements = [
  { icon: Eye, title: 'Visual Excellence', desc: 'Sony, JVC laser projection or Samsung MicroLED' },
  { icon: Volume2, title: 'Immersive Audio', desc: 'Dolby Atmos with JBL Synthesis or Trinnov' },
  { icon: Armchair, title: 'Luxury Seating', desc: 'Fortress, Cineak, D-BOX motion seats' },
  { icon: Film, title: 'Acoustic Design', desc: 'Professional room treatment' },
]

const faqs = [
  { 
    q: 'How much does a home cinema cost in Dubai?', 
    a: 'Home cinema installations in Dubai range from AED 100,000 for a quality media room to AED 800,000+ for a dedicated screening room with acoustic treatment. Most villa cinemas cost AED 200,000-400,000 for a complete setup including 4K laser projection, Dolby Atmos audio, luxury seating, and professional acoustic treatment.' 
  },
  { 
    q: 'How big should a home cinema room be?', 
    a: 'Ideal home cinema rooms are 20-35 square meters for 6-12 seats, providing optimal viewing distances and acoustic performance. However, we design cinemas from compact 15sqm media rooms to expansive 80sqm private screening rooms. The key factors are ceiling height (minimum 2.8m recommended), room proportions, and seating layout.' 
  },
  { 
    q: 'Can you retrofit a home cinema into an existing villa?', 
    a: 'Yes, we specialize in converting existing spaces into home cinemas. Basements, spare bedrooms, majlis rooms, and even garages can be transformed. We handle acoustic isolation, light control, electrical upgrades, and ventilation. Most retrofit projects complete in 8-12 weeks with minimal disruption to your home.' 
  },
  { 
    q: 'What cinema seating do you recommend?', 
    a: 'We install premium cinema seating from Fortress, Cineak, and Salamander. Options include heated seats, USB charging, motorized headrests, cup holders, and full recline. For the ultimate experience, D-BOX motion seats synchronize with on-screen action. Seating is customized to your room layout and aesthetic preferences.' 
  },
  { 
    q: 'How long does home cinema installation take?', 
    a: 'Timeline depends on complexity: Media room conversions take 4-6 weeks. Dedicated cinemas with acoustic treatment take 10-14 weeks. Custom builds with structural work take 12-20 weeks. We provide detailed project timelines during consultation and coordinate with your contractors if needed.' 
  },
  { 
    q: 'What warranty do you provide on home cinema installations?', 
    a: 'All LEXA home cinema installations include a 2-year workmanship warranty covering installation and integration. Equipment carries manufacturer warranties (typically 2-5 years). We offer extended AMC packages with 24/7 support, annual calibration, and priority service from AED 8,000/year.' 
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Home Cinema Design Dubai",
  "description": "Bespoke home cinema design and installation in Dubai. Private screening rooms with 4K laser projection, Dolby Atmos audio, luxury seating, and acoustic treatment.",
  "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"],
  "serviceType": "Home Cinema Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
}

export default function HomeCinemaClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-slate-300 mb-4">
            <Film className="w-5 h-5" />
            <span>Private Cinema Specialists</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Home Cinema Design<br /><span className="text-slate-400">Dubai & UAE</span></h1>
          <p className="text-xl text-slate-200 max-w-2xl mb-8">Your personal screening room awaits. Bespoke home cinemas that rival commercial theaters with 4K laser projection, Dolby Atmos, and luxury seating.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2">Design My Cinema <ArrowRight className="w-5 h-5" /></Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.homeCinema || 'Hi LEXA, I\'m interested in a home cinema for my property in Dubai.', 'home_cinema_page', 'cinema_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold">
              Visit Showroom
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '100+', label: 'Cinemas Built' },
              { value: 'Dolby', label: 'Atmos Certified' },
              { value: 'ISF', label: 'Calibrators' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Cinema Elements</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {elements.map((e, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <e.icon className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{e.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Home Cinema FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Private Cinema?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-slate-800 px-8 py-4 rounded-lg font-semibold">Start Project <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  )
}

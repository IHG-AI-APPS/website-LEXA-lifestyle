'use client'
import React from 'react'
import Link from 'next/link'
import { Home, Lightbulb, Shield, Thermometer, ArrowRight, Smartphone, Sun, Lock, MessageCircle } from 'lucide-react'
import Script from 'next/script'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

const systems = [
  { icon: Lightbulb, title: 'Intelligent Lighting', desc: 'Lutron, Ketra circadian lighting with scene control and automated blinds' },
  { icon: Thermometer, title: 'Climate Control', desc: 'Precision HVAC integration for Dubai\'s extreme temperatures' },
  { icon: Shield, title: 'Security & Access', desc: 'Biometric entry, CCTV, alarm integration with remote monitoring' },
  { icon: Smartphone, title: 'Unified Control', desc: 'Control4, Crestron - one app for your entire villa' },
]

const communities = [
  { name: 'Emirates Hills', villas: '50+', specialty: 'Mega-villa integration' },
  { name: 'Palm Jumeirah', villas: '80+', specialty: 'Signature & frond villas' },
  { name: 'Dubai Hills Estate', villas: '60+', specialty: 'Modern smart villas' },
  { name: 'District One', villas: '40+', specialty: 'Crystal Lagoons villas' },
  { name: 'Al Barari', villas: '30+', specialty: 'Eco-luxury automation' },
  { name: 'Jumeirah Bay Island', villas: '25+', specialty: 'Ultra-luxury estates' },
]

const faqs = [
  {
    q: 'What smart home system is best for luxury villas in Dubai?',
    a: 'For luxury villas in Dubai, we recommend Control4 or Crestron as the central automation platform. Control4 offers excellent value with intuitive interfaces, while Crestron provides ultimate customization for mega-villas. Both integrate seamlessly with Lutron lighting, premium AV, and security systems.'
  },
  {
    q: 'How much does villa automation cost in Dubai?',
    a: 'Luxury villa automation in Dubai typically ranges from AED 150,000 for comprehensive 4-bedroom villa systems to AED 1,000,000+ for Emirates Hills mega-villas. Most premium villas (6-8 bedrooms) average AED 300,000-500,000 for full automation including lighting, climate, AV, and security.'
  },
  {
    q: 'Can you retrofit smart systems into existing Dubai villas?',
    a: 'Yes, we specialize in retrofitting smart home technology into existing villas without major construction. Using wireless protocols, surface-mount solutions, and strategic wiring, we can transform any villa into a smart home. We\'ve retrofitted over 200 existing Dubai villas.'
  },
  {
    q: 'What luxury smart gadgets do you recommend for villas?',
    a: 'Beyond core automation, we recommend: Lutron Palladiom shades for automated blinds, Savant or Josh.ai for voice control, Miele/Gaggenau smart kitchen appliances, Kohler smart bathroom fixtures, and Seura vanishing TV mirrors. These luxury touches elevate the smart villa experience.'
  },
  {
    q: 'Do you provide ongoing support and maintenance?',
    a: 'Absolutely. Every villa automation project includes our Premium Support package with 24/7 remote monitoring, same-day response for emergencies, quarterly system health checks, and software updates. We maintain over 300 luxury villas across Dubai and Abu Dhabi.'
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Luxury Villa Smart Home Automation Dubai",
  "description": "Premium smart home automation for luxury villas in Dubai. Control4, Crestron, Lutron integration specialists serving Emirates Hills, Palm Jumeirah, and Dubai's finest communities.",
  "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE"],
  "serviceType": "Luxury Villa Automation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
}

export default function LuxuryVillaClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-amber-200 mb-4">
            <Home className="w-5 h-5" />
            <span>Luxury Villa Specialists</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Luxury Villa Automation<br />
            <span className="text-yellow-300">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mb-8">
            Transform your villa into an intelligent sanctuary. LEXA delivers bespoke smart home solutions for Dubai's most prestigious addresses - from Palm Jumeirah to Emirates Hills.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Villa Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.luxuryVilla, 'luxury_villa_page', 'villa_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 rounded-lg font-semibold">
              Visit Showroom
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '300+', label: 'Luxury Villas' },
              { value: '15+', label: 'Years Experience' },
              { value: 'Control4', label: 'Platinum Dealer' },
              { value: '24/7', label: 'Villa Support' },
            ].map((stat, i) => (
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Villa Smart Systems</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {systems.map((s, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white dark:text-white">Dubai Communities We Serve</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-12">Trusted by villa owners across Dubai's most exclusive addresses</p>
          <div className="grid md:grid-cols-3 gap-6">
            {communities.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{c.name}</h3>
                <p className="text-amber-600 dark:text-amber-400 font-medium">{c.villas} Villas Automated</p>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mt-2">{c.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Villa Automation FAQ</h2>
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

      <section className="py-16 bg-amber-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate Your Villa?</h2>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold">
            Book Villa Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

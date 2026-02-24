'use client'
import React from 'react'
import Link from 'next/link'
import { Music, Award, Headphones, Speaker, ArrowRight, CheckCircle, Star, MessageCircle } from 'lucide-react'
import Script from 'next/script'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

const brands = [
  { name: 'Bowers & Wilkins', type: 'British Excellence', specialty: '800 Series Diamond' },
  { name: 'McIntosh', type: 'American Legend', specialty: 'Tube Amplifiers' },
  { name: 'Focal', type: 'French Precision', specialty: 'Utopia Series' },
  { name: 'KEF', type: 'Reference Audio', specialty: 'Blade Series' },
  { name: 'Bang & Olufsen', type: 'Danish Design', specialty: 'Beosound Theatre' },
  { name: 'Naim Audio', type: 'British HiFi', specialty: 'Statement Series' },
]

const services = [
  { icon: Speaker, title: 'Stereo Systems', desc: 'Two-channel audiophile setups with premium DACs and amplification' },
  { icon: Headphones, title: 'Listening Rooms', desc: 'Acoustically treated dedicated spaces for pure audio enjoyment' },
  { icon: Music, title: 'Vinyl & Streaming', desc: 'High-resolution streaming and turntable integration' },
  { icon: Award, title: 'Custom Installation', desc: 'Architectural speakers and invisible audio solutions' },
]

const faqs = [
  {
    q: 'What high-end audio brands do you install in Dubai?',
    a: 'We are authorized dealers and installers for the world\'s finest audio brands including Bowers & Wilkins, McIntosh, Focal, KEF Reference, Bang & Olufsen, Naim Audio, Mark Levinson, and Sonus Faber. We specialize in complete system design from source to speakers.'
  },
  {
    q: 'How much does a high-end audio system cost in UAE?',
    a: 'Premium HiFi systems in Dubai typically range from AED 50,000 for entry audiophile setups to AED 500,000+ for reference-grade listening rooms. We offer systems at every level, with our most popular villa installations averaging AED 150,000-300,000.'
  },
  {
    q: 'Do you design dedicated listening rooms?',
    a: 'Yes, we specialize in creating acoustically optimized listening rooms. This includes room analysis, acoustic treatment, equipment selection, and calibration. We work with leading acoustic consultants to deliver reference-quality sound.'
  },
  {
    q: 'Can you integrate vinyl turntables with modern streaming?',
    a: 'Absolutely. We design hybrid systems that seamlessly blend analog vinyl playback with high-resolution digital streaming from services like Tidal, Qobuz, and Roon. Our systems support up to 24-bit/192kHz streaming.'
  },
  {
    q: 'Do you service Palm Jumeirah and Emirates Hills?',
    a: 'Yes, we have extensive experience installing high-end audio systems in Dubai\'s most prestigious communities including Palm Jumeirah, Emirates Hills, Dubai Hills Estate, and Jumeirah Bay Island. We also serve Abu Dhabi, Sharjah, and across the GCC.'
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "High-End Audio Installation Dubai",
  "description": "Premium high-fidelity audio system design and installation in Dubai and UAE. Authorized dealer for Bowers & Wilkins, McIntosh, Focal, KEF, Bang & Olufsen.",
  "provider": {
    "@type": "Organization",
    "name": "LEXA Lifestyle",
    "url": "https://lexalifestyle.com"
  },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"],
  "serviceType": "High-End Audio Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
}

export default function HighEndAudioClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-purple-300 mb-4">
            <Music className="w-5 h-5" />
            <span>Premium Audio Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            High-End Audio Systems<br />
            <span className="text-purple-400">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mb-8">
            Experience music as the artist intended. LEXA brings the world's finest audio brands to Dubai's most discerning audiophiles. From intimate listening rooms to whole-home audio excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Free Audio Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.highEndAudio, 'high_end_audio_page', 'audio_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-semibold">
              Visit Our Showroom
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '200+', label: 'HiFi Installations' },
              { value: '15+', label: 'Premium Brands' },
              { value: 'Certified', label: 'Installers' },
              { value: '5 Star', label: 'Service' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-purple-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white dark:text-white">
            World-Class Audio Brands We Install
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Authorized dealer and installer for the world's most prestigious high-fidelity audio manufacturers
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {brands.map((brand, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{brand.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{brand.type}</p>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mt-2">Specialty: {brand.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">
            High-End Audio Services
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">
            High-End Audio FAQ
          </h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Audio Excellence?
          </h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Schedule a private listening session at our Dubai showroom or request a home consultation.
          </p>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all">
            Book Your Session <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

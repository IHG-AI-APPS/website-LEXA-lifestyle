'use client'
import React from 'react'
import Link from 'next/link'
import { Film, Monitor, Speaker, Star, ArrowRight, Volume2, Projector, MessageCircle } from 'lucide-react'
import Script from 'next/script'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

const features = [
  { icon: Projector, title: 'Laser Projection', desc: 'Sony, JVC, Barco 4K & 8K laser projectors with HDR10+' },
  { icon: Volume2, title: 'Dolby Atmos', desc: 'Immersive object-based audio with up to 9.4.6 configurations' },
  { icon: Monitor, title: 'LED Video Walls', desc: 'Samsung & Sony MicroLED for daylight viewing' },
  { icon: Speaker, title: 'JBL Synthesis', desc: 'Reference-grade cinema speakers and subwoofers' },
]

const projects = [
  { name: 'Private IMAX', type: '21-seat cinema', location: 'Palm Jumeirah' },
  { name: 'Dolby Atmos Suite', type: '12-seat theater', location: 'Emirates Hills' },
  { name: 'Media Lounge', type: 'Casual viewing', location: 'Dubai Hills' },
  { name: 'Yacht Cinema', type: 'Marine installation', location: 'Dubai Marina' },
]

const faqs = [
  {
    q: 'How much does a home theater cost in Dubai?',
    a: 'Home theater installations in Dubai range from AED 80,000 for a quality media room to AED 1,000,000+ for a reference-grade private cinema. Our most popular villa theaters typically cost AED 200,000-400,000 including acoustic treatment, Dolby Atmos audio, and 4K laser projection.'
  },
  {
    q: 'What is Dolby Atmos and why do I need it?',
    a: 'Dolby Atmos is an immersive audio technology that places sounds in 3D space, including overhead. Instead of channels, it uses audio objects that move around you. For home theaters, this creates a cinema-quality experience with sound that matches the action on screen perfectly.'
  },
  {
    q: 'Do you design acoustically treated cinema rooms?',
    a: 'Yes, acoustic design is fundamental to our home theater installations. We use professional acoustic modeling software and work with acoustic panels, bass traps, and diffusers to create rooms that rival commercial cinemas. Every surface is optimized for the perfect sound.'
  },
  {
    q: 'What\'s better: projector or LED video wall?',
    a: 'Both have merits. 4K laser projectors offer the largest screen sizes (100-200 inches) at lower cost and authentic cinema feel. LED video walls (Samsung The Wall, Sony Crystal LED) provide superior brightness for rooms with ambient light but cost significantly more. We help you choose based on your room and viewing habits.'
  },
  {
    q: 'Can you install home theaters in existing villas?',
    a: 'Absolutely. We specialize in retrofitting home theaters into existing Dubai villas. This includes converting spare rooms, basements, or majlis areas into dedicated cinemas. We handle everything from structural modifications to acoustic treatment and equipment installation.'
  },
]

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Home Theater Installation Dubai",
  "description": "Luxury home theater and private cinema design and installation in Dubai. Dolby Atmos, 4K laser projection, acoustic treatment specialists.",
  "provider": {
    "@type": "Organization",
    "name": "LEXA Lifestyle",
    "url": "https://lexalifestyle.com"
  },
  "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"],
  "serviceType": "Home Theater Installation"
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
}

export default function HomeTheaterClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-red-300 mb-4">
            <Film className="w-5 h-5" />
            <span>Private Cinema Specialists</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Home Theater Installation<br />
            <span className="text-red-400">Dubai & UAE</span>
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mb-8">
            Transform your villa into a private cinema. LEXA delivers Hollywood-grade home theaters with Dolby Atmos, 4K laser projection, and acoustic perfection to Dubai's finest homes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/consultation" className="bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
              Design My Theater <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => openWhatsApp(whatsAppMessages.services.homeTheater, 'home_theater_page', 'theater_quote')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Quote
            </button>
            <Link href="/experience-centre" className="border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 rounded-lg font-semibold">
              Experience Our Demo Room
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '150+', label: 'Cinemas Built' },
              { value: 'Dolby', label: 'Atmos Certified' },
              { value: 'ISF', label: 'Calibrators' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Home Theater Technology</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Featured Theater Projects</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">{p.name}</h3>
                <p className="text-red-600 dark:text-red-400">{p.type}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{p.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white dark:text-white">Home Theater FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Private Cinema?</h2>
          <p className="text-red-200 mb-8 max-w-2xl mx-auto">
            Experience our Dolby Atmos demo theater or schedule a villa consultation.
          </p>
          <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-red-900 px-8 py-4 rounded-lg font-semibold">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

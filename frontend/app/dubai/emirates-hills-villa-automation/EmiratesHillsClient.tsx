'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Lightbulb, Film, Shield, Thermometer, Music, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const communities = [
  { name: 'Emirates Hills Villas', type: 'Golf course estates', price: 'AED 30M+' },
  { name: 'Sector E', type: 'Premium lake views', price: 'AED 40M+' },
  { name: 'Sector W', type: 'Signature mansions', price: 'AED 50M+' },
  { name: 'Sector P', type: 'Private estates', price: 'AED 35M+' },
  { name: 'Sector R', type: 'Renovated classics', price: 'AED 25M+' },
  { name: 'Sector L', type: 'Lake-facing luxury', price: 'AED 45M+' },
]

const faqs = [
  { question: 'How much does Emirates Hills villa automation cost?', answer: 'Emirates Hills automation ranges from AED 400,000 for standard systems to AED 2,000,000+ for ultra-luxury estates. Average investment is AED 600,000-900,000 for comprehensive whole-home automation including lighting, climate, AV, and security.' },
  { question: 'Can you retrofit smart systems in older Emirates Hills villas?', answer: 'Yes, many Emirates Hills villas were built before smart home technology was standard. LEXA specializes in retrofitting using wireless Lutron and Control4 systems, upgrading classic villas to modern smart homes without major renovation.' },
  { question: 'What maintenance do Emirates Hills smart homes require?', answer: 'Emirates Hills smart homes benefit from quarterly maintenance visits. LEXA AMC packages from AED 15,000/year include preventive maintenance, software updates, 24/7 support, and priority service response within 4 hours.' },
  { question: 'How do you handle Emirates Hills security requirements?', answer: 'We coordinate with Emirates Hills security for all installations. Our teams are pre-approved, and we manage access permits, ensuring seamless project execution while respecting community protocols.' },
]

export default function EmiratesHillsClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920" alt="Emirates Hills Villa" fill className="object-cover" priority />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Dubai, UAE</span></div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Villa Automation<br /><span className="text-[#C9A962]">Emirates Hills</span></h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Intelligent living for Dubai&apos;s most prestigious address. LEXA delivers world-class automation for Emirates Hills estates.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20villa%20in%20Emirates%20Hills." target="_blank">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white' : 'border-gray-900'}`} asChild><Link href="/experience-centre">Visit Showroom</Link></Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-3xl font-bold text-[#C9A962]">80+</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Emirates Hills Projects</div></div>
              <div><div className="text-3xl font-bold text-[#C9A962]">15yr</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Community Experience</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Emirates Hills Sectors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communities.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.name}</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.type}</p>
                <div className="text-[#C9A962] font-semibold">{c.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Emirates Hills Smart Home FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Automate Your Emirates Hills Villa?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] px-8 rounded-xl" asChild><a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white rounded-xl" asChild><a href="https://wa.me/971501234567" target="_blank">WhatsApp Us</a></Button>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "LEXA - Emirates Hills Smart Homes", "areaServed": ["Emirates Hills"], "priceRange": "AED 400,000 - 2,000,000+" })}} />
    </div>
  )
}

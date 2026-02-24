'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Phone, MapPin, ArrowRight, Waves, Mountain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const areas = [
  { name: 'Al Aqah Beach', type: 'Resort villas', price: 'AED 1.5M+' },
  { name: 'Dibba', type: 'Coastal retreats', price: 'AED 800K+' },
  { name: 'Fujairah City', type: 'Urban properties', price: 'AED 600K+' },
  { name: 'Kalba', type: 'Mangrove area', price: 'AED 500K+' },
  { name: 'Khor Fakkan', type: 'Harbor views', price: 'AED 700K+' },
]

const faqs = [
  { question: 'Do you service Fujairah\'s remote areas?', answer: 'Yes, LEXA covers all of Fujairah including Al Aqah, Dibba, and mountain areas. We have dedicated East Coast technicians for prompt service.' },
  { question: 'What about vacation home automation?', answer: 'Fujairah is popular for weekend homes. Our systems offer remote monitoring, climate pre-conditioning, and security—perfect for occasional use.' },
  { question: 'How much does Fujairah automation cost?', answer: 'Starting from AED 40,000 for apartments to AED 150,000+ for beach villas. Competitive pricing for East Coast properties.' },
]

export default function FujairahClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920" alt="Fujairah Beach" fill className="object-cover" priority />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Fujairah, UAE</span></div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Homes<br /><span className="text-[#C9A962]">Fujairah</span></h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>East Coast smart living. From Al Aqah beach villas to mountain retreats, LEXA brings automation to Fujairah&apos;s stunning landscapes.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20property%20in%20Fujairah." target="_blank">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white' : 'border-gray-900'}`} asChild><Link href="/experience-centre">Visit Showroom</Link></Button>
            </div>
            <div className="flex gap-6 mt-12">
              <div className="flex items-center gap-2"><Waves className="h-6 w-6 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Beach Properties</span></div>
              <div className="flex items-center gap-2"><Mountain className="h-6 w-6 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mountain Retreats</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Fujairah Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {areas.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{a.name}</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{a.type}</p>
                <div className="text-[#C9A962] font-semibold">{a.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Fujairah FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm`}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready for Fujairah Smart Living?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] px-8 rounded-xl" asChild><a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white rounded-xl" asChild><a href="https://wa.me/971501234567" target="_blank">WhatsApp Us</a></Button>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "LEXA - Fujairah Smart Homes", "areaServed": ["Fujairah", "Al Aqah", "Dibba"], "priceRange": "AED 40,000 - 150,000+" })}} />
    </div>
  )
}

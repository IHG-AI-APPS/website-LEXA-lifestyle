'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const areas = [
  { name: 'UAQ Marina', type: 'Waterfront community', price: 'AED 600K+' },
  { name: 'Al Salamah', type: 'Residential villas', price: 'AED 800K+' },
  { name: 'Old Town', type: 'Traditional area', price: 'AED 500K+' },
  { name: 'Al Raas', type: 'Central district', price: 'AED 400K+' },
]

const faqs = [
  { question: 'Do you service Umm Al Quwain?', answer: 'Yes, LEXA provides full smart home services in UAQ including installation, programming, and ongoing maintenance support.' },
  { question: 'What\'s the starting cost for UAQ?', answer: 'UAQ offers great value. Smart home packages start from AED 25,000 for basic automation, making intelligent living accessible.' },
  { question: 'How quickly can you install?', answer: 'Most UAQ installations complete in 1-3 weeks depending on scope. We coordinate around your schedule for minimal disruption.' },
]

export default function UAQClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920" alt="Umm Al Quwain" fill className="object-cover" priority />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Umm Al Quwain, UAE</span></div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Home Automation<br /><span className="text-[#C9A962]">Umm Al Quwain</span></h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Affordable smart living for UAQ. Premium automation technology accessible for every home and budget.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20property%20in%20Umm%20Al%20Quwain." target="_blank">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white' : 'border-gray-900'}`} asChild><Link href="/experience-centre">Visit Showroom</Link></Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-3xl font-bold text-[#C9A962]">25K</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Starting From</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>UAQ Areas</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>UAQ FAQs</h2>
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready for UAQ Smart Living?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] px-8 rounded-xl" asChild><a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white rounded-xl" asChild><a href="https://wa.me/971501234567" target="_blank">WhatsApp Us</a></Button>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "LEXA - UAQ Smart Homes", "areaServed": ["Umm Al Quwain"], "priceRange": "AED 25,000+" })}} />
    </div>
  )
}

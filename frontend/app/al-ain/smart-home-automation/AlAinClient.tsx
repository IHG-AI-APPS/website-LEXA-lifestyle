'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Phone, MapPin, ArrowRight, TreeDeciduous, Home, Lightbulb, Shield, Thermometer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { useCms } from '@/hooks/useCms'

const communities = [
  { name: 'Al Ain Oasis', type: 'Heritage area villas', price: 'AED 2M+' },
  { name: 'Zakher', type: 'Premium residential', price: 'AED 1.5M+' },
  { name: 'Al Jimi', type: 'Family community', price: 'AED 1M+' },
  { name: 'Al Muwaiji', type: 'Modern villas', price: 'AED 1.2M+' },
  { name: 'Al Towayya', type: 'Established area', price: 'AED 800K+' },
  { name: 'Al Mutarad', type: 'Central location', price: 'AED 900K+' },
]

const services = [
  { icon: Lightbulb, title: 'Smart Lighting', description: 'Energy-efficient systems for Al Ain\'s sunny climate' },
  { icon: Thermometer, title: 'Climate Control', description: 'Desert-optimized cooling automation' },
  { icon: Shield, title: 'Security Systems', description: 'Comprehensive villa protection' },
  { icon: Home, title: 'Whole-Home Control', description: 'Control4 integration for seamless living' },
]

const faqs = [
  { question: 'How much does Al Ain villa automation cost?', answer: 'Al Ain automation ranges from AED 60,000 for standard villas to AED 250,000+ for large properties. Most Al Ain homes invest AED 80,000-150,000 for comprehensive automation.' },
  { question: 'Do you have local support in Al Ain?', answer: 'Yes, LEXA has Al Ain-based technicians providing same-day response. We understand the Garden City\'s unique requirements and property styles.' },
  { question: 'Can automation help with Al Ain\'s desert climate?', answer: 'Absolutely. Smart climate control significantly reduces ADDC bills by optimizing AC usage. Automated blinds block heat gain. Typical savings: 30-40% on cooling costs.' },
  { question: 'What about traditional Al Ain villas?', answer: 'We specialize in retrofitting traditional Al Ain properties with modern automation. Wireless systems integrate seamlessly without affecting heritage architecture.' },
  { question: 'Do you serve Al Ain\'s farming areas?', answer: 'Yes, we cover all Al Ain areas including agricultural zones. Systems can include irrigation automation, greenhouse climate control, and remote property monitoring.' },
  { question: 'What maintenance do you offer?', answer: 'LEXA offers Al Ain-dedicated maintenance from AED 5,000/year. Includes quarterly visits, software updates, 24/7 remote support, and priority emergency response.' },
]

export default function AlAinClient() {
  const cms = useCms('page_geo_al_ain_smart_home_automation', null)

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920" alt="Al Ain Garden City" fill className="object-cover" priority />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Al Ain, Abu Dhabi, UAE</span></div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Home Automation<br /><span className="text-[#C9A962]">Al Ain</span></h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>The Garden City&apos;s trusted smart home partner. From Al Ain Oasis heritage villas to modern Zakher properties, LEXA delivers intelligent living for every Al Ain home.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20villa%20in%20Al%20Ain%20and%20interested%20in%20smart%20home%20automation." target="_blank">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white' : 'border-gray-900'}`} asChild><Link href="/experience-centre">Visit Showroom</Link></Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-3xl font-bold text-[#C9A962]">40+</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Al Ain Projects</div></div>
              <div className="flex items-center gap-2"><TreeDeciduous className="h-8 w-8 text-[#C9A962]" /><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Garden City Experts</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Al Ain Communities We Serve</h2>
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

      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Al Ain Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <s.icon className="h-10 w-10 text-[#C9A962] mx-auto mb-4" />
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Al Ain Smart Home FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Automate Your Al Ain Home?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">Schedule a free consultation with our Al Ain smart home specialists. We&apos;ll visit your property and provide a detailed proposal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] hover:bg-gray-100 dark:bg-gray-800 px-8 rounded-xl" asChild><a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call +971 4 267 0470</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#C9A962] rounded-xl" asChild><a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20need%20smart%20home%20automation%20for%20my%20Al%20Ain%20property." target="_blank">WhatsApp Us</a></Button>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "LEXA Lifestyle - Al Ain Smart Homes", "description": "Al Ain's trusted smart home automation partner serving the Garden City.", "address": { "@type": "PostalAddress", "addressLocality": "Al Ain", "addressRegion": "Abu Dhabi", "addressCountry": "AE" }, "areaServed": ["Al Ain", "Al Ain Oasis", "Zakher", "Al Jimi", "Al Muwaiji"], "priceRange": "AED 60,000 - 250,000+", "telephone": "+971-42-670-470" })}} />
    </div>
  )
}

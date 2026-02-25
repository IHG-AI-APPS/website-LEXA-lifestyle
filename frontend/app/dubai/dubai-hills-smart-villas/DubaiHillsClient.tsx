'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Phone, MapPin, ArrowRight, Home, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { useCms } from '@/hooks/useCms'

const communities = [
  { name: 'Fairways Villas', type: 'Golf course frontage', price: 'AED 8M+' },
  { name: 'Grove Villas', type: 'Park-facing family homes', price: 'AED 5M+' },
  { name: 'Maple Townhouses', type: 'Modern family living', price: 'AED 3M+' },
  { name: 'Club Villas', type: 'Exclusive golf community', price: 'AED 12M+' },
  { name: 'Sidra Villas', type: 'Contemporary design', price: 'AED 6M+' },
  { name: 'Parkway Vistas', type: 'Central park views', price: 'AED 4M+' },
]

const faqs = [
  { question: 'How much does Dubai Hills villa automation cost?', answer: 'Dubai Hills automation ranges from AED 80,000 for townhouses to AED 400,000+ for Club Villas. Standard 4-5 bedroom villas typically invest AED 120,000-200,000 for comprehensive home automation.' },
  { question: 'Is Dubai Hills automation family-friendly?', answer: 'Absolutely! We design systems with families in mind: child-safe controls, easy-to-use interfaces, homework lighting modes, bedtime routines, and parental controls for media systems.' },
  { question: 'Can you integrate with Dubai Hills community features?', answer: 'Yes, we integrate with community access systems, golf club reservations displays, and can monitor community security feeds on your home system.' },
  { question: 'What about outdoor automation for Dubai Hills gardens?', answer: 'We specialize in outdoor automation: landscape lighting, irrigation control, pool/spa automation, outdoor audio, and BBQ area systems—all controllable from one app.' },
]

export default function DubaiHillsClient() {
  const cms = useCms('page_geo_dubai_dubai_hills_smart_villas', null)

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920" alt="Dubai Hills Villa" fill className="object-cover" priority />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-[#C9A962]" /><span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Dubai, UAE</span></div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Villas<br /><span className="text-[#C9A962]">Dubai Hills Estate</span></h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Family-focused automation for Dubai&apos;s premier golf community. LEXA delivers smart living designed for modern family life.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20villa%20in%20Dubai%20Hills%20Estate." target="_blank">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white' : 'border-gray-900'}`} asChild><Link href="/experience-centre">Visit Showroom</Link></Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-3xl font-bold text-[#C9A962]">120+</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Hills Projects</div></div>
              <div><div className="text-3xl font-bold text-[#C9A962]"><Users className="h-8 w-8" /></div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Family Focused</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dubai Hills Communities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communities.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Home className="h-8 w-8 text-[#C9A962] mb-3" />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.name}</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.type}</p>
                <div className="text-[#C9A962] font-semibold">{c.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dubai Hills Smart Home FAQs</h2>
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Automate Your Dubai Hills Villa?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] px-8 rounded-xl" asChild><a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call Now</a></Button>
            <Button size="lg" variant="outline" className="border-white text-white rounded-xl" asChild><a href="https://wa.me/971501234567" target="_blank">WhatsApp Us</a></Button>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "LEXA - Dubai Hills Smart Homes", "areaServed": ["Dubai Hills Estate"], "priceRange": "AED 80,000 - 400,000+" })}} />
    </div>
  )
}

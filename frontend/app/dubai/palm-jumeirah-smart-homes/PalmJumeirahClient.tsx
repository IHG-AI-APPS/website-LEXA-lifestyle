'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Home, Lightbulb, Film, Shield, Thermometer, Music, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const communities = [
  { name: 'Signature Villas', type: 'Ultra-luxury beachfront', price: 'AED 50M+' },
  { name: 'Garden Homes', type: 'Premium waterfront villas', price: 'AED 25M+' },
  { name: 'Frond Villas', type: 'Private beach access', price: 'AED 15M+' },
  { name: 'Shoreline Apartments', type: 'Luxury high-rise living', price: 'AED 3M+' },
  { name: 'Palm Tower', type: 'Iconic residences', price: 'AED 5M+' },
  { name: 'FIVE Palm', type: 'Branded residences', price: 'AED 4M+' },
]

const services = [
  { icon: Lightbulb, title: 'Lutron Lighting Design', description: 'Beachfront lighting scenes, UV-protected outdoor systems' },
  { icon: Thermometer, title: 'Climate Control', description: 'Sea-facing humidity management & efficient cooling' },
  { icon: Film, title: 'Home Cinema', description: 'Dolby Atmos theaters with Dubai skyline views' },
  { icon: Shield, title: 'Security Systems', description: 'Marine-grade cameras, yacht dock monitoring' },
  { icon: Music, title: 'Indoor-Outdoor Audio', description: 'Pool, beach, garden zones with Sonos & KEF' },
  { icon: Home, title: 'Whole-Home Control', description: 'Control4 & Crestron for seamless island living' },
]

const faqs = [
  {
    question: 'How much does smart home automation cost on Palm Jumeirah?',
    answer: 'Palm Jumeirah automation ranges from AED 150,000 for apartments to AED 1,500,000+ for Signature Villas. Frond villas typically invest AED 300,000-500,000. Garden Homes average AED 400,000-700,000. LEXA provides complimentary consultations.'
  },
  {
    question: 'Can you retrofit smart systems in existing Palm Jumeirah villas?',
    answer: 'Yes, LEXA specializes in Palm Jumeirah retrofits. Using wireless Lutron RadioRA 3 and Control4, we upgrade villas without major construction. Most retrofits complete in 8-12 weeks with minimal disruption to your lifestyle.'
  },
  {
    question: 'What brands work best for Palm Jumeirah\'s coastal environment?',
    answer: 'For Palm\'s salt-air exposure, we use marine-grade equipment: Lutron (corrosion-resistant), Coastal-rated Sonance speakers, Axis cameras with marine housing, and Control4 with enhanced protection. All backed by extended warranties.'
  },
  {
    question: 'Do you provide maintenance for Palm Jumeirah smart homes?',
    answer: 'Yes, LEXA offers Palm Jumeirah-dedicated maintenance with same-day response. Our AMC includes quarterly inspections (critical for coastal homes), salt-air equipment checks, software updates, and 24/7 emergency support. Plans from AED 12,000/year.'
  },
  {
    question: 'Can smart homes integrate with Palm Jumeirah marina systems?',
    answer: 'Absolutely. We integrate yacht dock cameras, marina lighting, and boat lift controls into your home automation. Monitor your yacht from anywhere, automate dock lighting, and receive alerts—all from one Control4 interface.'
  },
  {
    question: 'How long does full villa automation take on Palm Jumeirah?',
    answer: 'Timelines vary: Apartments (3-4 weeks), Frond villas (10-14 weeks), Garden Homes (12-16 weeks), Signature Villas (16-24 weeks). LEXA manages all coordination with Palm security and your contractors.'
  },
]

export default function PalmJumeirahClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
            alt="Palm Jumeirah Dubai"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[#C9A962]" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Dubai, UAE</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Smart Home Automation
              <br />
              <span className="text-[#C9A962]">Palm Jumeirah</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Premium automation for Dubai&apos;s iconic island. From Signature Villas to Frond homes, 
              LEXA delivers world-class smart living for Palm Jumeirah residents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#B8994D] text-white font-semibold px-8 rounded-xl" asChild>
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20property%20on%20Palm%20Jumeirah%20and%20interested%20in%20smart%20home%20automation." target="_blank" rel="noopener noreferrer">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className={`rounded-xl ${isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white'}`} asChild>
                <Link href="/experience-centre">Visit Showroom</Link>
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-3xl font-bold text-[#C9A962]">150+</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Palm Projects</div></div>
              <div><div className="text-3xl font-bold text-[#C9A962]">15yr</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Island Experience</div></div>
              <div><div className="text-3xl font-bold text-[#C9A962]">4hr</div><div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Response Time</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communities */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Palm Jumeirah Communities</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expert smart home installation across Palm Jumeirah&apos;s exclusive addresses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communities.map((community, index) => (
              <motion.div key={community.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${isDark ? 'bg-gray-800 border-gray-700 hover:border-[#C9A962]' : 'bg-white border-gray-200 hover:border-[#C9A962]'}`}>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{community.name}</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{community.type}</p>
                <div className="text-[#C9A962] font-semibold">{community.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Solutions for Palm Living</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Coastal-optimized automation for Palm Jumeirah&apos;s unique island lifestyle</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <service.icon className="h-10 w-10 text-[#C9A962] mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Palm Jumeirah Smart Home FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Automate Your Palm Jumeirah Home?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">Schedule a free consultation with our Palm Jumeirah smart home specialists.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#C9A962] hover:bg-gray-100 font-semibold px-8 rounded-xl" asChild>
              <a href="tel:+97142670470"><Phone className="mr-2 h-5 w-5" />Call +971 4 267 0470</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#C9A962] rounded-xl" asChild>
              <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20need%20smart%20home%20automation%20for%20my%20Palm%20Jumeirah%20property." target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "LEXA Lifestyle - Palm Jumeirah Smart Homes",
        "description": "Premium smart home automation for Palm Jumeirah villas and residences.",
        "address": { "@type": "PostalAddress", "addressLocality": "Palm Jumeirah", "addressRegion": "Dubai", "addressCountry": "AE" },
        "areaServed": ["Palm Jumeirah", "Signature Villas", "Garden Homes", "Frond Villas", "Shoreline Apartments"],
        "priceRange": "AED 150,000 - 1,500,000+", "telephone": "+971-42-670-470"
      })}} />
    </div>
  )
}

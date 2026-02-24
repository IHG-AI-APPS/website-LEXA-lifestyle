'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Home, Lightbulb, Film, Shield, Thermometer, Music, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const communities = [
  { name: 'Yas Acres', type: 'Golf course villas & townhouses', price: 'AED 3M+' },
  { name: 'West Yas', type: 'Waterfront luxury villas', price: 'AED 8M+' },
  { name: 'Yas Bay', type: 'Premium waterfront apartments', price: 'AED 2M+' },
  { name: 'Mayan', type: 'Resort-style residences', price: 'AED 1.5M+' },
  { name: 'Waters Edge', type: 'Contemporary townhouses', price: 'AED 2.5M+' },
  { name: 'Ansam', type: 'Family apartments', price: 'AED 1M+' },
]

const services = [
  { icon: Lightbulb, title: 'Smart Lighting Control', description: 'Lutron systems with outdoor entertainment lighting for F1 viewing' },
  { icon: Thermometer, title: 'Climate Automation', description: 'Energy-efficient cooling with zone control for large villas' },
  { icon: Film, title: 'Sports & Entertainment', description: 'Dedicated F1 viewing rooms, outdoor screens, surround sound' },
  { icon: Shield, title: 'Security Integration', description: 'Smart locks, video doorbell, perimeter cameras' },
  { icon: Music, title: 'Multi-Room Audio', description: 'Pool, garden, and indoor zones with Sonos & KEF' },
  { icon: Home, title: 'Complete Automation', description: 'Control4 whole-home integration for seamless living' },
]

const faqs = [
  {
    question: 'What does smart home automation cost in Yas Acres?',
    answer: 'Yas Acres smart home costs range from AED 80,000 for townhouses to AED 250,000+ for large villas. Golf course villas with full automation including outdoor entertainment typically invest AED 150,000-200,000. LEXA offers flexible packages for all budgets.'
  },
  {
    question: 'Can you retrofit smart home systems in existing Yas Island properties?',
    answer: 'Yes, LEXA specializes in wireless retrofit solutions for existing Yas properties. Using Lutron RadioRA 3 and Control4 wireless, we upgrade homes without rewiring. Most Yas Acres retrofits complete in 4-6 weeks with minimal disruption.'
  },
  {
    question: 'Do you offer F1 viewing room setups for Yas Island homes?',
    answer: 'Absolutely! Given Yas Island\'s proximity to the F1 circuit, we\'ve designed many dedicated F1 viewing rooms. Packages include large-format displays, Dolby Atmos sound, automated lighting scenes, and outdoor viewing areas with weather-resistant equipment.'
  },
  {
    question: 'What smart home maintenance packages do you offer for Yas Island?',
    answer: 'LEXA provides dedicated Yas Island support with 4-hour response time. Annual maintenance packages from AED 5,000 include quarterly checkups, software updates, 24/7 remote support, and priority emergency service.'
  },
  {
    question: 'How do smart homes handle Yas Island\'s entertainment lifestyle?',
    answer: 'We design systems for entertainment: one-touch party modes, outdoor speaker zones for pool areas, automated blinds for F1 weekend viewing, and integration with streaming services. Perfect for Yas\'s active social lifestyle.'
  },
  {
    question: 'Which smart home system is best for Yas Bay apartments?',
    answer: 'For Yas Bay apartments, we recommend Control4 for its excellent value and app-based control. Packages from AED 60,000 include lighting, climate, blinds, and multi-room audio. Perfect for the modern waterfront lifestyle.'
  },
]

export default function YasIslandClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920"
            alt="Yas Island Modern Villa"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent' : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent'}`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[#C9A962]" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Abu Dhabi, UAE</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Smart Home Automation
              <br />
              <span className="text-[#C9A962]">Yas Island</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Premium automation for Abu Dhabi&apos;s entertainment island. From Yas Acres golf villas to 
              West Yas waterfront estates, LEXA delivers smart living for active lifestyles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-white font-semibold px-8 rounded-xl"
                asChild
              >
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20property%20on%20Yas%20Island%20and%20interested%20in%20smart%20home%20automation." target="_blank" rel="noopener noreferrer">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className={`rounded-xl ${isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white'}`}
                asChild
              >
                <Link href="/experience-centre">Visit Showroom</Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">30+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Yas Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">F1</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Viewing Experts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">4hr</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communities We Serve */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Yas Island Communities
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Smart home expertise across Yas Island&apos;s diverse residential offerings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communities.map((community, index) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:border-[#C9A962]' 
                    : 'bg-white border-gray-200 hover:border-[#C9A962]'
                }`}
              >
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Smart Solutions for Yas Living
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Entertainment-focused automation designed for Yas Island&apos;s active lifestyle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
              >
                <service.icon className="h-10 w-10 text-[#C9A962] mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Yas Island Smart Home FAQs
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Yas Island Home?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our Yas Island smart home specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-[#C9A962] hover:bg-gray-100 font-semibold px-8 rounded-xl"
              asChild
            >
              <a href="tel:+97142670470">
                <Phone className="mr-2 h-5 w-5" />
                Call +971 4 267 0470
              </a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A962] rounded-xl"
              asChild
            >
              <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20need%20smart%20home%20automation%20for%20my%20Yas%20Island%20property." target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "LEXA Lifestyle - Yas Island Smart Homes",
            "description": "Smart home automation specialists for Yas Island properties including Yas Acres, West Yas, and Yas Bay.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Yas Island",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "areaServed": ["Yas Island", "Yas Acres", "West Yas", "Yas Bay", "Mayan", "Waters Edge"],
            "priceRange": "AED 60,000 - 250,000+",
            "telephone": "+971-42-670-470"
          })
        }}
      />
    </div>
  )
}

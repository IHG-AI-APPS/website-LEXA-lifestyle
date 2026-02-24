'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Home, Lightbulb, Film, Shield, Thermometer, Music, Phone, MapPin, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const communities = [
  { name: 'Saadiyat Beach Villas', type: 'Beachfront luxury villas', price: 'AED 15M+' },
  { name: 'Saadiyat Reserve', type: 'Nature-integrated estates', price: 'AED 25M+' },
  { name: 'Mamsha Al Saadiyat', type: 'Waterfront residences', price: 'AED 5M+' },
  { name: 'Louvre Abu Dhabi District', type: 'Cultural quarter homes', price: 'AED 8M+' },
  { name: 'Nurai Island', type: 'Private island villas', price: 'AED 30M+' },
  { name: 'Saadiyat Grove', type: 'Family community villas', price: 'AED 10M+' },
]

const services = [
  { icon: Lightbulb, title: 'Lutron Lighting Design', description: 'Circadian lighting for beach homes, UV-protected outdoor systems' },
  { icon: Thermometer, title: 'Coastal Climate Control', description: 'Humidity management & energy-efficient cooling for island living' },
  { icon: Film, title: 'Private Cinema Suites', description: 'Dolby Atmos theaters with acoustic treatment for open-plan villas' },
  { icon: Shield, title: 'Estate Security', description: 'Perimeter protection, marine-grade cameras, smart access' },
  { icon: Music, title: 'Indoor-Outdoor Audio', description: 'Weather-resistant speakers, pool audio, garden zones' },
  { icon: Home, title: 'Whole-Villa Automation', description: 'Control4 & Crestron integration for seamless living' },
]

const faqs = [
  {
    question: 'How much does smart home automation cost in Saadiyat Island?',
    answer: 'Saadiyat Island smart home costs range from AED 150,000 for Mamsha apartments to AED 800,000+ for beachfront villas. Saadiyat Reserve estates with full automation typically invest AED 400,000-600,000. LEXA provides detailed proposals after site assessment.'
  },
  {
    question: 'Can you automate existing villas in Saadiyat Beach?',
    answer: 'Yes, LEXA specializes in retrofit automation for existing Saadiyat villas. Using wireless Lutron RadioRA 3 and Control4, we upgrade homes with minimal disruption. Most Saadiyat Beach Villa retrofits complete in 6-8 weeks.'
  },
  {
    question: 'What smart home brands work best for Saadiyat\'s coastal climate?',
    answer: 'For Saadiyat\'s humid coastal environment, we recommend marine-grade equipment: Lutron for lighting (salt-air resistant), Sonance for outdoor audio, and Axis cameras with coastal housing. All equipment includes enhanced corrosion protection.'
  },
  {
    question: 'Do you provide smart home maintenance on Saadiyat Island?',
    answer: 'Yes, LEXA offers dedicated Saadiyat Island maintenance with 4-hour response time. Our AMC packages include quarterly preventive visits, 24/7 remote support, and priority emergency service. Annual plans from AED 8,000.'
  },
  {
    question: 'Can smart automation reduce electricity bills for Saadiyat villas?',
    answer: 'Absolutely. Saadiyat villas with intelligent climate and lighting control save 30-40% on ADDC bills. Automated blinds reduce cooling load, and smart AC scheduling optimizes energy use. Typical annual savings: AED 25,000-50,000 for large villas.'
  },
  {
    question: 'How long does full villa automation take on Saadiyat Island?',
    answer: 'Timeline depends on villa size: Mamsha apartments (3-4 weeks), standard Saadiyat villas (8-10 weeks), Saadiyat Reserve estates (12-16 weeks). LEXA coordinates with your interior designer and contractor for seamless integration.'
  },
]

export default function SaadiyatIslandClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920"
            alt="Saadiyat Island Luxury Villa"
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
              <span className="text-[#C9A962]">Saadiyat Island</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Premium automation for Abu Dhabi&apos;s cultural district. From Louvre-adjacent villas to 
              Saadiyat Beach estates, LEXA delivers world-class smart living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-white font-semibold px-8 rounded-xl"
                asChild
              >
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20a%20villa%20on%20Saadiyat%20Island%20and%20interested%20in%20smart%20home%20automation." target="_blank" rel="noopener noreferrer">
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
                <div className="text-3xl font-bold text-[#C9A962]">45+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Saadiyat Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">8yr</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Island Experience</div>
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
              Saadiyat Island Communities
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Expert smart home installation across Saadiyat&apos;s most prestigious addresses
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
                    : 'bg-white border-gray-200 dark:border-gray-700 hover:border-[#C9A962]'
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
              Smart Solutions for Saadiyat Living
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Coastal-optimized automation designed for Saadiyat&apos;s unique island environment
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
              Saadiyat Island Smart Home FAQs
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
            Ready to Automate Your Saadiyat Villa?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our Saadiyat Island smart home specialists.
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
              <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20need%20smart%20home%20automation%20for%20my%20Saadiyat%20Island%20property." target="_blank" rel="noopener noreferrer">
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
            "name": "LEXA Lifestyle - Saadiyat Island Smart Homes",
            "description": "Premium smart home automation for Saadiyat Island villas and residences in Abu Dhabi.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Saadiyat Island",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "areaServed": ["Saadiyat Island", "Saadiyat Beach", "Saadiyat Reserve", "Mamsha Al Saadiyat", "Nurai Island"],
            "priceRange": "AED 150,000 - 800,000+",
            "telephone": "+971-42-670-470"
          })
        }}
      />
    </div>
  )
}

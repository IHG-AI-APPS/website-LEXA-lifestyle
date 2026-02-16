'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Home, Lightbulb, Film, Shield, Thermometer, Music, Phone, MapPin, ArrowRight, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const buildings = [
  { name: 'Sun & Sky Towers', type: 'Iconic twin towers', units: '60+ automated' },
  { name: 'Marina Square', type: 'Waterfront living', units: '45+ automated' },
  { name: 'Shams Abu Dhabi', type: 'Mixed-use development', units: '80+ automated' },
  { name: 'Gate Towers', type: 'Landmark residences', units: '35+ automated' },
  { name: 'Tala Tower', type: 'Premium apartments', units: '25+ automated' },
  { name: 'The Arc', type: 'Curved architectural icon', units: '20+ automated' },
]

const services = [
  { icon: Lightbulb, title: 'Apartment Lighting', description: 'Lutron Caseta & RadioRA for high-rise living, no rewiring needed' },
  { icon: Thermometer, title: 'Climate Control', description: 'Smart AC integration with building HVAC systems' },
  { icon: Film, title: 'Media Rooms', description: 'Compact home theater solutions for apartment living' },
  { icon: Shield, title: 'Smart Security', description: 'Video doorbell, smart locks, intercom integration' },
  { icon: Music, title: 'Audio Systems', description: 'Sonos & in-ceiling speakers for open-plan apartments' },
  { icon: Building, title: 'Building Integration', description: 'Work with building management for seamless access' },
]

const faqs = [
  {
    question: 'How much does apartment automation cost on Al Reem Island?',
    answer: 'Al Reem Island apartment automation ranges from AED 40,000 for studios to AED 150,000+ for penthouses. Standard 2-3 bedroom apartments typically invest AED 60,000-90,000 for full automation including lighting, climate, blinds, and audio.'
  },
  {
    question: 'Can you install smart home systems in Al Reem high-rises?',
    answer: 'Yes, LEXA specializes in high-rise installations on Al Reem Island. We use wireless solutions (Lutron Caseta, Control4) that don\'t require building permission for rewiring. We coordinate with building management for any required approvals.'
  },
  {
    question: 'Do you work with Al Reem Island building management?',
    answer: 'Yes, we have established relationships with major Al Reem building managers. We handle NOC applications, coordinate with security for access, and ensure all installations comply with building regulations.'
  },
  {
    question: 'What smart home system is best for Al Reem apartments?',
    answer: 'For Al Reem apartments, we recommend Control4 for comprehensive automation or Lutron Caseta for lighting-focused systems. Both are wireless, apartment-friendly, and provide excellent smartphone control. Packages from AED 40,000.'
  },
  {
    question: 'How long does apartment automation take on Al Reem Island?',
    answer: 'Most Al Reem apartment installations complete in 2-3 weeks: NOC approval (3-5 days), installation (1-2 weeks), programming and handover (2-3 days). We schedule around your availability and building access rules.'
  },
  {
    question: 'Can smart homes integrate with Al Reem building intercoms?',
    answer: 'Yes, we integrate with most Al Reem building intercom systems. Video feeds can display on your TV or tablet when visitors arrive. Smart locks can be released remotely through your Control4 app.'
  },
]

export default function AlReemIslandClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920"
            alt="Al Reem Island Skyline"
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
              <span className="text-[#C9A962]">Al Reem Island</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              High-rise smart living specialists. From Sun Tower penthouses to Marina Square apartments, 
              LEXA delivers wireless automation solutions designed for Abu Dhabi&apos;s urban lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-white font-semibold px-8 rounded-xl"
                asChild
              >
                <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20have%20an%20apartment%20on%20Al%20Reem%20Island%20and%20interested%20in%20smart%20home%20automation." target="_blank" rel="noopener noreferrer">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className={`rounded-xl ${isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}
                asChild
              >
                <Link href="/experience-centre">Visit Showroom</Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">60+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Reem Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">15+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Buildings Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">Same Day</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Buildings We Serve */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Al Reem Island Buildings
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Proven experience across Al Reem&apos;s iconic residential towers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {buildings.map((building, index) => (
              <motion.div
                key={building.name}
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
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{building.name}</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{building.type}</p>
                <div className="text-[#C9A962] font-semibold">{building.units}</div>
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
              Apartment-Optimized Solutions
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Wireless smart home systems designed for high-rise living
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
              Al Reem Island Smart Home FAQs
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
            Ready to Automate Your Al Reem Apartment?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our Al Reem Island smart home specialists.
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
              <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%20need%20smart%20home%20automation%20for%20my%20Al%20Reem%20Island%20apartment." target="_blank" rel="noopener noreferrer">
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
            "name": "LEXA Lifestyle - Al Reem Island Smart Homes",
            "description": "Smart home automation specialists for Al Reem Island apartments and penthouses in Abu Dhabi.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Al Reem Island",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "areaServed": ["Al Reem Island", "Sun Tower", "Sky Tower", "Marina Square", "Shams Abu Dhabi", "Gate Towers"],
            "priceRange": "AED 40,000 - 150,000+",
            "telephone": "+971-42-670-470"
          })
        }}
      />
    </div>
  )
}

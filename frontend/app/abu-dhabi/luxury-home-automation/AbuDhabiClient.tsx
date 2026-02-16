'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { 
  Home, Lightbulb, Film, Shield, Thermometer, Music, 
  Phone, MapPin, CheckCircle, ArrowRight, Building2, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useState } from 'react'
import TrustedInUAE from '@/components/sections/TrustedInUAE'

const abuDhabiAreas = [
  { name: 'Saadiyat Island', description: 'Cultural district luxury villas', projects: '45+' },
  { name: 'Yas Island', description: 'Waterfront smart homes', projects: '30+' },
  { name: 'Al Reem Island', description: 'High-rise penthouse automation', projects: '60+' },
  { name: 'Al Raha Beach', description: 'Beachfront villa integration', projects: '25+' },
  { name: 'Khalifa City', description: 'Family villa automation', projects: '40+' },
  { name: 'Mohammed Bin Zayed City', description: 'Modern smart living', projects: '35+' },
]

const services = [
  { icon: Lightbulb, title: 'Intelligent Lighting', description: 'Lutron & KNX systems for Abu Dhabi climate' },
  { icon: Thermometer, title: 'Climate Control', description: 'Energy-efficient AC automation' },
  { icon: Film, title: 'Home Cinema', description: 'Dolby Atmos theaters for desert acoustics' },
  { icon: Shield, title: 'Security Systems', description: 'Integrated CCTV & access control' },
  { icon: Music, title: 'Multi-Room Audio', description: 'Sonos & architectural speakers' },
  { icon: Home, title: 'Whole-Home Control', description: 'Control4 & Crestron integration' },
]

const faqs = [
  {
    question: 'How much does smart home automation cost in Abu Dhabi?',
    answer: 'Smart home automation in Abu Dhabi ranges from AED 80,000 for apartments to AED 500,000+ for luxury villas on Saadiyat Island. Cost depends on property size, automation scope, and brand selection (Control4, Crestron, Lutron). LEXA provides free consultations and detailed quotes.'
  },
  {
    question: 'Can you retrofit smart home systems in existing Abu Dhabi villas?',
    answer: 'Yes, LEXA specializes in wireless retrofit solutions for existing Abu Dhabi properties. Using Lutron RadioRA 3 and Control4 wireless, we can automate your villa with minimal disruption. Ideal for Saadiyat and Yas Island renovations.'
  },
  {
    question: 'What is the installation timeline for Abu Dhabi projects?',
    answer: 'Typical installation timelines: Apartments (2-3 weeks), Standard villas (4-6 weeks), Luxury villas on Saadiyat/Yas (8-12 weeks). LEXA coordinates with Abu Dhabi Municipality requirements and your contractor\'s schedule.'
  },
  {
    question: 'Do you provide maintenance services in Abu Dhabi?',
    answer: 'Yes, LEXA offers comprehensive AMC packages for Abu Dhabi clients including 24/7 emergency support, quarterly preventive maintenance, software updates, and remote diagnostics. Response time for Saadiyat and Yas Island: within 4 hours.'
  },
  {
    question: 'Which smart home brands do you recommend for Abu Dhabi climate?',
    answer: 'For Abu Dhabi\'s hot climate, we recommend Control4 for whole-home automation, Lutron for lighting (excellent heat resistance), and proper AC integration. All systems are tested for UAE conditions with enhanced surge protection.'
  },
  {
    question: 'Can smart home automation reduce electricity bills in Abu Dhabi?',
    answer: 'Yes, properly designed automation reduces ADDC bills by 25-35%. Smart climate control, automated blinds, and lighting schedules optimize energy use. Saadiyat Island villa clients typically save AED 15,000-30,000 annually.'
  },
]

export default function AbuDhabiLuxuryAutomationClient() {
  const [showConsultation, setShowConsultation] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
            alt="Abu Dhabi Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-[#C9A962]/20 text-[#C9A962] text-sm font-medium rounded-full mb-6">
              Abu Dhabi&apos;s Premier Smart Home Partner
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Luxury Home Automation
              <br />
              <span className="text-[#C9A962]">Abu Dhabi</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              From Saadiyat Island villas to Yas Island waterfront homes, LEXA delivers 
              world-class smart home solutions tailored for Abu Dhabi&apos;s luxury lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-black font-semibold px-8"
                onClick={() => setShowConsultation(true)}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/experience-centre">Visit Experience Centre</Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">200+</div>
                <div className="text-sm text-gray-400">Abu Dhabi Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A962]">4hr</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Abu Dhabi Areas We Serve
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expert smart home installation across Abu Dhabi&apos;s most prestigious communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {abuDhabiAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{area.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{area.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#C9A962]">{area.projects}</div>
                    <div className="text-xs text-gray-500">projects</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Home Solutions for Abu Dhabi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive automation services designed for Abu Dhabi&apos;s unique climate and lifestyle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <service.icon className="h-10 w-10 text-[#C9A962] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustedInUAE variant="compact" />

      {/* FAQ Section - SEO Optimized */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Home Abu Dhabi FAQs
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Common questions about home automation in Abu Dhabi
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Abu Dhabi Home?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our Abu Dhabi smart home experts. 
            We&apos;ll visit your property and provide a detailed proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#C9A962] hover:bg-[#B8994D] text-black font-semibold px-8"
              onClick={() => setShowConsultation(true)}
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Free Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <a href="https://wa.me/971501234567?text=Hi%20LEXA%2C%20I%27m%20interested%20in%20smart%20home%20automation%20for%20my%20Abu%20Dhabi%20property." target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      {showConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Abu Dhabi Consultation</h3>
                <button 
                  onClick={() => setShowConsultation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ConsultationForm isOpen={showConsultation} onClose={() => setShowConsultation(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "LEXA Lifestyle - Smart Home Abu Dhabi",
            "description": "Abu Dhabi's premier smart home automation company serving Saadiyat Island, Yas Island, and Al Reem Island.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Abu Dhabi",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "areaServed": ["Abu Dhabi", "Saadiyat Island", "Yas Island", "Al Reem Island", "Al Raha Beach"],
            "priceRange": "AED 80,000 - 500,000+",
            "telephone": "+971-42-670-470"
          })
        }}
      />
    </div>
  )
}

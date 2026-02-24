'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Home,
  Smartphone,
  Zap,
  Shield,
  Star,
  Crown,
  CheckCircle2,
  ArrowRight,
  Wifi,
  TrendingUp,
  Info,
  Building2,
  Users,
  Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'

export default function SmartApartmentPackagesPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [selectedSize, setSelectedSize] = useState('studio')

  const apartmentSizes = [
    { id: 'studio', name: 'Studio', icon: '🏠' },
    { id: '1br', name: '1 Bedroom', icon: '🛏️' },
    { id: '2br', name: '2 Bedroom', icon: '🏡' },
    { id: '3br', name: '3 Bedroom', icon: '🏘️' },
    { id: '4br', name: '4 Bedroom', icon: '🏰' },
    { id: 'duplex', name: 'Duplex', icon: '🏛️' }
  ]

  // Static color map for Tailwind JIT compatibility
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' }
  }

  const packages = [
    {
      tier: 'Basic',
      icon: Smartphone,
      color: 'blue',
      tagline: 'Simple Control',
      description: 'App-based control with essential smart functionality',
      pricing: {
        studio: 3000,
        '1br': 4000,
        '2br': 5600,
        '3br': 7000,
        '4br': 9000,
        duplex: 11000
      },
      features: [
        'Smart lighting control (all rooms)',
        'Smart switches for lights & fans',
        'Standard scenes (Home, Away, Night)',
        'Mobile app control (iOS & Android)',
        'Voice assistant compatibility',
        '3-year warranty'
      ],
      warranty: '3 Years',
      ideal: 'Singles & young professionals'
    },
    {
      tier: 'Advanced',
      icon: Zap,
      color: 'orange',
      tagline: 'Hands-Free Comfort',
      description: 'Automation reacts to motion, time, and occupancy',
      pricing: {
        studio: 4400,
        '1br': 6000,
        '2br': 8400,
        '3br': 11000,
        '4br': 14000,
        duplex: 17000
      },
      features: [
        'Everything in Basic',
        'Motion sensors',
        'Door/window sensors',
        'Climate control (smart AC/thermostat)',
        'Smart schedules (automated routines)',
        '3-year warranty'
      ],
      warranty: '3 Years',
      ideal: 'Couples & small families'
    },
    {
      tier: 'Gold',
      icon: Star,
      color: 'amber',
      tagline: 'Intelligent Lifestyle',
      description: 'Comfort, privacy, and energy intelligence',
      pricing: {
        studio: 7000,
        '1br': 9000,
        '2br': 13000,
        '3br': 17000,
        '4br': 22000,
        duplex: 27000
      },
      features: [
        'Everything in Advanced',
        'Motorised curtains',
        'Environmental sensors (temp & humidity)',
        'Energy insights & monitoring',
        'Lifestyle scenes (Morning, Movie, Sleep)',
        'Premium switches & panels',
        '5-year warranty'
      ],
      warranty: '5 Years',
      ideal: 'Growing families',
      popular: true
    },
    {
      tier: 'Platinum',
      icon: Crown,
      color: 'purple',
      tagline: 'Predictive Luxury',
      description: 'AI-driven automation with concierge-grade experience',
      pricing: {
        studio: 11000,
        '1br': 14000,
        '2br': 19000,
        '3br': 25000,
        '4br': 32000,
        duplex: 39000
      },
      features: [
        'Everything in Gold',
        'Smart door lock access control',
        'Touch panels with Alexa',
        'AI-driven automation',
        'Role-based access (Owner/Family/Guest)',
        'Remote monitoring & diagnostics',
        'Presence simulation',
        '5-year warranty'
      ],
      warranty: '5 Years',
      ideal: 'Luxury seekers'
    }
  ]

  const ecosystems = [
    {
      name: 'Lexa Wireless (Zigbee)',
      description: 'Proven reliability, instant response, cost-effective',
      features: ['Minimal interference', 'Low latency', 'Excellent value'],
      bestFor: 'Volume deployments'
    },
    {
      name: 'LifeSmart Ecosystem',
      description: 'Design aesthetics with scene-based intelligence',
      features: ['Premium design', 'Lifestyle automation', 'Pattern learning'],
      bestFor: 'Design-conscious buyers'
    },
    {
      name: 'Matter Ecosystem',
      description: 'Future-proof, works with Apple, Google, Alexa',
      features: ['HomeKit compatible', 'Google Ready', 'Alexa enabled'],
      bestFor: 'Multi-platform users'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 mb-6">
                <Home className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Smart Apartment Packages
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Smart Living for<br />
                <span className="text-blue-600">Every Apartment</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Wireless-first smart home packages designed for apartments. From studios to duplexes, transform your space without rewiring. Starting from AED 3,000.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  Get Your Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="#packages">
                    Compare Packages
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Apartment Size Selector */}
        <section id="packages" className="py-12 bg-white border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Select Your Apartment Size</h2>
              <p className="text-gray-600">Choose your apartment type to see tailored pricing</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {apartmentSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`px-6 py-3 border-2 font-semibold transition-all ${
                    selectedSize === size.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <span className="mr-2">{size.icon}</span>
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Package Comparison */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => {
                const Icon = pkg.icon
                return (
                  <motion.div
                    key={pkg.tier}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`bg-white border-2 transition-all hover:shadow-xl relative ${
                      pkg.popular ? 'border-amber-500 shadow-lg scale-105' : 'border-gray-200'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold uppercase">
                        Most Popular
                      </div>
                    )}
                    <div className="p-6">
                      <div className={`inline-flex p-3 ${colorMap[pkg.color]?.bg || 'bg-gray-100'} mb-4`}>
                        <Icon className={`h-8 w-8 ${colorMap[pkg.color]?.text || 'text-gray-600'}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-1 text-gray-900">{pkg.tier}</h3>
                      <p className="text-sm text-gray-500 mb-4">{pkg.tagline}</p>
                      
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-gray-900 mb-1">
                          AED {pkg.pricing[selectedSize as keyof typeof pkg.pricing].toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">Starting price</div>
                      </div>

                      <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>

                      <div className="space-y-3 mb-6">
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="text-xs text-gray-500">Ideal for:</div>
                        <div className="text-sm font-semibold text-gray-700">{pkg.ideal}</div>
                      </div>

                      <Button
                        onClick={() => setShowConsultationForm(true)}
                        className={`w-full ${
                          pkg.popular
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        Get Quote
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Ecosystems */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                Choose Your Ecosystem
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                All packages support three leading smart home ecosystems
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ecosystems.map((eco, index) => (
                <motion.div
                  key={eco.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 border-l-4 border-blue-600"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Wifi className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">{eco.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{eco.description}</p>
                  <div className="space-y-2 mb-4">
                    {eco.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-blue-600">Best for: {eco.bestFor}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                Why Choose LEXA Apartment Packages?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Wifi, title: 'Wireless-First', desc: 'No rewiring needed. Install in hours, not days.' },
                { icon: TrendingUp, title: 'Scalable Design', desc: 'Start with Basic, upgrade to Platinum anytime.' },
                { icon: Shield, title: 'Up to 5-Year Warranty', desc: 'Premium packages include extended warranty coverage.' }
              ].map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 text-center"
                  >
                    <Icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Developer Packages Teaser */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 mb-6">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  For Developers & Property Managers
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bulk Packages for<br />
                <span className="text-amber-400">Multi-Unit Projects</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Special pricing for real estate developers and property management companies. 
                Transform entire buildings with smart home technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Building2, title: '10+ Units', desc: 'Volume discounts for residential towers & communities' },
                { icon: Users, title: 'Dedicated Team', desc: 'Project manager & priority installation crews' },
                { icon: Percent, title: 'Custom Pricing', desc: 'Tailored packages based on project scope' }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 p-6 text-center"
                  >
                    <Icon className="h-10 w-10 mx-auto mb-4 text-amber-400" />
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                asChild
                className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                <Link href="/packages/developer-packages">
                  Explore Developer Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Home className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Upgrade Your Apartment?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Get a personalized quote based on your apartment size and automation needs.
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Disclaimer */}
        <PricingDisclaimer variant="minimal" className="bg-gray-50 dark:bg-gray-800" />
      </div>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </>
  )
}

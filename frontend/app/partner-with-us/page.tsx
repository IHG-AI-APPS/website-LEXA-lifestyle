'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  Zap,
  Shield,
  HeadphonesIcon,
  Package,
  Percent,
  BookOpen,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { useCms } from '@/hooks/useCms'

const partnerTypes = [
  {
    id: 'dealer',
    title: 'Authorized Dealer',
    description: 'Retail and install smart home solutions to end customers',
    icon: Building2,
    benefits: ['Product training', 'Marketing support', 'Lead referrals']
  },
  {
    id: 'distributor',
    title: 'Regional Distributor',
    description: 'Distribute our brands across your territory',
    icon: Globe,
    benefits: ['Exclusive territory rights', 'Volume pricing', 'Inventory support']
  },
  {
    id: 'integrator',
    title: 'System Integrator',
    description: 'Design and implement enterprise smart building solutions',
    icon: Zap,
    benefits: ['Technical certification', 'Project support', 'Co-bidding opportunities']
  },
  {
    id: 'contractor',
    title: 'Electrical Contractor',
    description: 'Add smart home services to your electrical business',
    icon: Shield,
    benefits: ['Installation training', 'Preferred pricing', 'Warranty support']
  }
]

const brands = [
  { name: 'Control4', logo: '/brands/control4.png' },
  { name: 'Crestron', logo: '/brands/crestron.png' },
  { name: 'Lutron', logo: '/brands/lutron.png' },
  { name: 'Sonos', logo: '/brands/sonos.png' },
  { name: 'Samsung', logo: '/brands/samsung.png' },
  { name: 'Sony', logo: '/brands/sony.png' },
]

const benefits = [
  {
    icon: Percent,
    title: 'Competitive Margins',
    description: 'Industry-leading dealer margins on all product lines'
  },
  {
    icon: BookOpen,
    title: 'Training & Certification',
    description: 'Free product training and manufacturer certifications'
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: '24/7 technical support and project assistance'
  },
  {
    icon: Package,
    title: 'Inventory Access',
    description: 'Priority access to stock across GCC warehouses'
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation',
    description: 'Qualified leads from our marketing campaigns'
  },
  {
    icon: Award,
    title: 'Co-Marketing',
    description: 'Joint marketing funds and promotional support'
  }
]

const gccCountries = [
  'United Arab Emirates',
  'Saudi Arabia', 
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman'
]

export default function PartnerWithUsPage() {
  const cms = useCms('page_partner_with_us', null)

  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    partnerType: '',
    currentBusiness: '',
    message: '',
    website: '' // Honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) return // Honeypot check
    
    setIsSubmitting(true)
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const response = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          partnerType: selectedType,
          source: 'partner-page',
          type: 'b2b_partner'
        })
      })
      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#1A1A1A] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <SafeImage
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Partner showroom"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        
        <div className="relative container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-[#E8DCC8]/20 border border-[#E8DCC8]/30 text-[#E8DCC8] text-xs uppercase tracking-widest mb-6">
              B2B Partnership Program
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              Become a LEXA Authorized 
              <span className="text-[#E8DCC8]"> Dealer or Distributor</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              Join the GCC&apos;s leading smart home distribution network. Access premium brands, 
              competitive margins, and dedicated support to grow your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-[#E8DCC8] text-[#1A1A1A] dark:text-white hover:bg-[#E8DCC8]/90 rounded-none px-8"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-none px-8"
                asChild
              >
                <Link href="/contact">Contact Sales Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#E8DCC8] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white dark:text-white">150+</div>
              <div className="text-sm text-[#1A1A1A]/70">Active Partners</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white dark:text-white">6</div>
              <div className="text-sm text-[#1A1A1A]/70">GCC Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white dark:text-white">32+</div>
              <div className="text-sm text-[#1A1A1A]/70">Premium Brands</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white dark:text-white">15+</div>
              <div className="text-sm text-[#1A1A1A]/70">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the partnership model that fits your business. We support dealers, 
              distributors, integrators, and contractors across the GCC region.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedType(type.id)
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`p-6 bg-white dark:bg-gray-800 rounded-xl cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedType === type.id ? 'border-[#E8DCC8] shadow-lg' : 'border-transparent'
                }`}
              >
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-[#E8DCC8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Partner With LEXA?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              As the GCC&apos;s premier smart home distributor, we provide everything you need 
              to succeed in the rapidly growing home automation market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-[#E8DCC8]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-[#1A1A1A] dark:text-white dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Distribute */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Premium Brands We Distribute
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Access the world&apos;s leading smart home and AV brands with authorized dealer pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="text-center">
                <div className="text-white/80 text-lg font-semibold">{brand.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              And 26+ more premium brands including Bowers & Wilkins, McIntosh, KEF, Savant, KNX, and more
            </p>
          </div>
        </div>
      </section>

      {/* GCC Coverage */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Expanding Across the GCC
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We&apos;re actively seeking qualified partners in all GCC countries. Whether you&apos;re 
                an established AV integrator or an electrical contractor looking to add smart home 
                services, we have a partnership program for you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {gccCountries.map((country, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Territory Opportunities</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white dark:text-white">Saudi Arabia - NEOM & Riyadh</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">High demand for Vision 2030 smart city projects</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white dark:text-white">Qatar - Lusail & The Pearl</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Luxury residential developments seeking partners</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white dark:text-white">Kuwait & Bahrain</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Growing market with limited competition</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Apply to Become a Partner
            </h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
              Fill out the form below and our partnership team will contact you within 48 hours.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for your interest in partnering with LEXA. Our team will review your 
                application and contact you within 48 business hours.
              </p>
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </motion.div>
          ) : (
            <form aria-label="Form" onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
              {/* Partner Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Partnership Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {partnerTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        selectedType === type.id 
                          ? 'border-[#E8DCC8] bg-[#E8DCC8]/10' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm text-gray-900 dark:text-white dark:text-white">{type.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <Input
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <Input
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Your full name"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="business@company.com"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone *
                  </label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971..."
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white dark:text-white"
                  >
                    <option value="">Select country</option>
                    {gccCountries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Your city"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Business Description
                </label>
                <textarea
                  value={formData.currentBusiness}
                  onChange={(e) => setFormData({ ...formData, currentBusiness: e.target.value })}
                  placeholder="Tell us about your current business, experience, and why you want to partner with LEXA..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm">
                  There was an error submitting your application. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || !selectedType}
                className="w-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white rounded-lg py-6 text-base"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Partnership Application
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy. We&apos;ll never share 
                your information with third parties.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What are the requirements to become a LEXA dealer?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                We look for partners with relevant experience in electrical, AV, or home automation. 
                You&apos;ll need a valid trade license, showroom or office space, and commitment to 
                completing our product training program.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What brands can I sell as a LEXA partner?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Partners get access to our full portfolio including Control4, Crestron, Lutron, 
                Sonos, Samsung, Sony, Bowers & Wilkins, McIntosh, KEF, and 20+ more premium brands.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Do you offer exclusive territories?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Yes, for qualifying distributors we offer exclusive territory rights in specific 
                regions. This is evaluated based on your business plan, investment capability, 
                and market potential.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What support do partners receive?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                All partners receive product training, technical support, marketing materials, 
                lead referrals, co-marketing funds, and access to our Experience Centre for 
                client demonstrations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                How long does the application process take?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                We review all applications within 48 hours. The full onboarding process, including 
                training and certification, typically takes 2-4 weeks depending on your chosen 
                partnership level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-white/70 mb-8">
            Join 150+ partners across the GCC who trust LEXA for their smart home distribution needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#E8DCC8] text-[#1A1A1A] dark:text-white hover:bg-[#E8DCC8]/90 rounded-none px-8"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-none px-8"
              asChild
            >
              <a href="tel:+97142670470">Call +971 4 267 0470</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

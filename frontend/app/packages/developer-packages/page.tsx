'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Building2,
  Users,
  Percent,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Zap,
  Award,
  FileText,
  Headphones,
  TrendingUp,
  Home,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'

export default function DeveloperPackagesPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: '',
    unitCount: '',
    location: '',
    timeline: '',
    packageInterest: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'developer-packages',
          type: 'bulk_inquiry'
        })
      })
      
      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const developerBenefits = [
    {
      icon: Percent,
      title: 'Volume Discounts',
      description: 'Significant savings on bulk orders. The more units, the better the pricing.',
      highlight: 'Up to 35% savings'
    },
    {
      icon: Users,
      title: 'Dedicated Project Manager',
      description: 'Single point of contact for your entire project from planning to handover.',
      highlight: 'Assigned team'
    },
    {
      icon: Clock,
      title: 'Priority Installation',
      description: 'Dedicated crews ensure timely completion aligned with your construction schedule.',
      highlight: 'Fast turnaround'
    },
    {
      icon: FileText,
      title: 'Pre-Wiring Consultation',
      description: 'Expert guidance during construction phase for optimal smart home integration.',
      highlight: 'New builds'
    },
    {
      icon: Shield,
      title: 'Extended Warranty',
      description: 'Up to 5-year comprehensive warranty on all installations for peace of mind.',
      highlight: '5-year coverage'
    },
    {
      icon: Headphones,
      title: 'Priority Support & SLA',
      description: '24/7 dedicated support line with guaranteed response times.',
      highlight: '4-hour SLA'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Support',
      description: 'Co-branded marketing materials to promote smart homes as a selling point.',
      highlight: 'Sales boost'
    },
    {
      icon: Award,
      title: 'Compliance Assured',
      description: 'Full compliance with Dubai Municipality, DEWA, and Civil Defence requirements.',
      highlight: 'UAE certified'
    }
  ]

  const projectTypes = [
    { value: 'residential-tower', label: 'Residential Tower' },
    { value: 'villa-community', label: 'Villa Community' },
    { value: 'mixed-use', label: 'Mixed-Use Development' },
    { value: 'serviced-apartments', label: 'Serviced Apartments' },
    { value: 'hotel-hospitality', label: 'Hotel / Hospitality' },
    { value: 'retrofit-existing', label: 'Retrofit (Existing Building)' },
    { value: 'property-management', label: 'Property Management Portfolio' }
  ]

  const unitRanges = [
    { value: '10-25', label: '10-25 Units' },
    { value: '26-50', label: '26-50 Units' },
    { value: '51-100', label: '51-100 Units' },
    { value: '101-250', label: '101-250 Units' },
    { value: '251-500', label: '251-500 Units' },
    { value: '500+', label: '500+ Units' }
  ]

  const timelines = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: '12-plus', label: '12+ Months (Planning Phase)' }
  ]

  const dubaiLocations = [
    { value: 'dubai-marina', label: 'Dubai Marina' },
    { value: 'downtown-dubai', label: 'Downtown Dubai' },
    { value: 'palm-jumeirah', label: 'Palm Jumeirah' },
    { value: 'jbr', label: 'JBR' },
    { value: 'business-bay', label: 'Business Bay' },
    { value: 'dubai-hills', label: 'Dubai Hills Estate' },
    { value: 'arabian-ranches', label: 'Arabian Ranches' },
    { value: 'emirates-hills', label: 'Emirates Hills' },
    { value: 'jumeirah', label: 'Jumeirah' },
    { value: 'al-barsha', label: 'Al Barsha' },
    { value: 'dubai-south', label: 'Dubai South' },
    { value: 'dubai-creek', label: 'Dubai Creek Harbour' },
    { value: 'meydan', label: 'Meydan' },
    { value: 'damac-hills', label: 'DAMAC Hills' },
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'other-uae', label: 'Other UAE Location' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 mb-6">
              <Building2 className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Developer & Property Manager Packages
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bulk Smart Home<br />
              <span className="text-amber-400">Solutions for Developers</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transform entire residential towers, villa communities, and managed properties with smart home technology. 
              Special pricing and dedicated support for multi-unit projects across Dubai and UAE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                <a href="#inquiry-form">
                  Request Developer Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                <a href="https://wa.me/97142670470?text=Hi%2C%20I%27m%20interested%20in%20bulk%20smart%20home%20packages%20for%20developers" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-amber-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Units Installed' },
              { value: '50+', label: 'Developer Projects' },
              { value: '15+', label: 'Years Experience' },
              { value: '100%', label: 'Handover Success' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-sm text-black/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Why Developers Choose LEXA
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive benefits designed for large-scale smart home deployments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developerBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex p-3 bg-amber-100 mb-4">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                    {benefit.highlight}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Package Tiers Overview */}
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
              Scalable Package Options
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From basic automation to luxury smart living - packages for every project tier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                tier: 'Basic', 
                tagline: 'Essential Automation',
                features: ['Smart lighting', 'App control', 'Voice ready', '3-year warranty'],
                ideal: 'Affordable housing'
              },
              { 
                tier: 'Advanced', 
                tagline: 'Sensor-Driven',
                features: ['Motion sensors', 'Climate control', 'Automated scenes', '3-year warranty'],
                ideal: 'Mid-market residences'
              },
              { 
                tier: 'Gold', 
                tagline: 'Premium Living',
                features: ['Motorized curtains', 'Energy monitoring', 'Premium panels', '5-year warranty'],
                ideal: 'Premium developments',
                popular: true
              },
              { 
                tier: 'Platinum', 
                tagline: 'Luxury Experience',
                features: ['AI automation', 'Access control', 'Touch panels', '5-year warranty'],
                ideal: 'Ultra-luxury projects'
              }
            ].map((pkg, index) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`bg-white border-2 p-6 relative ${
                  pkg.popular ? 'border-amber-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{pkg.tier}</h3>
                <p className="text-sm text-gray-500 mb-4">{pkg.tagline}</p>
                <div className="space-y-2 mb-4">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs text-gray-500">Ideal for:</div>
                  <div className="text-sm font-semibold text-gray-700">{pkg.ideal}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              All packages include bulk pricing discounts. Contact us for customized quotes.
            </p>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-2 border-gray-300"
            >
              <Link href="/packages/smart-apartment-packages">
                View Individual Package Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Request Developer Pricing
              </h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and our developer relations team will contact you within 24 hours with a customized proposal.
              </p>

              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/30 p-8 text-center">
                  <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-400" />
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300">
                    Your inquiry has been received. Our developer relations team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="" className="bg-slate-800">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-slate-800">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Number of Units *</label>
                      <select
                        required
                        value={formData.unitCount}
                        onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="" className="bg-slate-800">Select unit range</option>
                        {unitRanges.map((range) => (
                          <option key={range.value} value={range.value} className="bg-slate-800">
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Location *</label>
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="" className="bg-slate-800">Select location</option>
                        {dubaiLocations.map((loc) => (
                          <option key={loc.value} value={loc.value} className="bg-slate-800">
                            {loc.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Timeline *</label>
                      <select
                        required
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="" className="bg-slate-800">Select timeline</option>
                        {timelines.map((tl) => (
                          <option key={tl.value} value={tl.value} className="bg-slate-800">
                            {tl.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Package Interest</label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="" className="bg-slate-800">Select preferred package tier</option>
                      <option value="basic" className="bg-slate-800">Basic - Essential Automation</option>
                      <option value="advanced" className="bg-slate-800">Advanced - Sensor-Driven</option>
                      <option value="gold" className="bg-slate-800">Gold - Premium Living</option>
                      <option value="platinum" className="bg-slate-800">Platinum - Luxury Experience</option>
                      <option value="mixed" className="bg-slate-800">Mixed Tiers (Different units)</option>
                      <option value="custom" className="bg-slate-800">Custom Requirements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                      placeholder="Tell us more about your project requirements, special needs, or questions..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6 text-sm font-semibold uppercase tracking-wider disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:pl-12"
            >
              <h3 className="text-2xl font-bold mb-6">Prefer to Talk?</h3>
              
              <div className="space-y-6 mb-12">
                <a 
                  href="tel:+97142670470"
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="p-3 bg-amber-500/20">
                    <Phone className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us Directly</div>
                    <div className="text-lg font-semibold">+971 4 267 0470</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/97142670470?text=Hi%2C%20I%27m%20interested%20in%20bulk%20smart%20home%20packages%20for%20developers.%20Project%20details%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                >
                  <div className="p-3 bg-green-500/20">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">WhatsApp Business</div>
                    <div className="text-lg font-semibold">Chat with Sales Team</div>
                  </div>
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <h4 className="text-lg font-bold mb-4">What Happens Next?</h4>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Review', desc: 'Our team reviews your project requirements' },
                    { step: '2', title: 'Consultation', desc: 'Schedule a call to discuss your needs' },
                    { step: '3', title: 'Proposal', desc: 'Receive a customized pricing proposal' },
                    { step: '4', title: 'Site Visit', desc: 'On-site assessment for accurate scope' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-500 text-black font-bold flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="h-5 w-5 text-amber-400" />
                  <span className="font-bold">Trusted by Leading Developers</span>
                </div>
                <p className="text-sm text-gray-400">
                  We've partnered with major developers across Dubai including projects in Dubai Marina, 
                  Downtown Dubai, Palm Jumeirah, and Dubai Hills Estate.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Disclaimer */}
      <PricingDisclaimer variant="dark" />
    </div>
  )
}

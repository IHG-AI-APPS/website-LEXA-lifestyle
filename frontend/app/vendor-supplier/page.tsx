'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  FileCheck, 
  Clock, 
  Shield,
  CheckCircle,
  ArrowRight,
  Upload,
  Building2,
  Truck,
  Wrench,
  Cpu,
  Speaker,
  Lightbulb,
  Lock,
  Thermometer,
  Send,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'

const productCategories = [
  { id: 'automation', name: 'Home Automation Systems', icon: Cpu, description: 'Control systems, hubs, processors' },
  { id: 'audio', name: 'Audio & Video Equipment', icon: Speaker, description: 'Speakers, amplifiers, displays, projectors' },
  { id: 'lighting', name: 'Lighting Control', icon: Lightbulb, description: 'Smart switches, dimmers, fixtures' },
  { id: 'security', name: 'Security Systems', icon: Lock, description: 'Cameras, access control, alarms' },
  { id: 'hvac', name: 'Climate Control', icon: Thermometer, description: 'Smart thermostats, HVAC integration' },
  { id: 'networking', name: 'Networking & Infrastructure', icon: Building2, description: 'Structured cabling, racks, WiFi' },
  { id: 'installation', name: 'Installation Materials', icon: Wrench, description: 'Cables, connectors, mounting hardware' },
  { id: 'services', name: 'Professional Services', icon: Truck, description: 'Logistics, calibration, maintenance' }
]

const requirements = [
  {
    icon: FileCheck,
    title: 'Valid Trade License',
    description: 'Active business license in your country of operation'
  },
  {
    icon: Shield,
    title: 'Product Certifications',
    description: 'CE, UL, or relevant safety certifications for your products'
  },
  {
    icon: Package,
    title: 'Minimum Order Quantities',
    description: 'Ability to fulfill MOQ requirements for GCC distribution'
  },
  {
    icon: Clock,
    title: 'Reliable Lead Times',
    description: 'Consistent delivery schedules and inventory availability'
  }
]

const processSteps = [
  {
    step: 1,
    title: 'Submit Application',
    description: 'Complete the vendor registration form with company and product details'
  },
  {
    step: 2,
    title: 'Documentation Review',
    description: 'Our procurement team reviews your credentials and product catalog'
  },
  {
    step: 3,
    title: 'Product Evaluation',
    description: 'Sample testing and quality assessment at our Experience Centre'
  },
  {
    step: 4,
    title: 'Commercial Negotiation',
    description: 'Pricing, terms, and partnership agreement finalization'
  },
  {
    step: 5,
    title: 'Onboarding',
    description: 'System integration, training, and first order placement'
  }
]

const lookingFor = [
  'Innovative smart home products with strong brand recognition',
  'Competitive pricing with healthy dealer margins',
  'Reliable warranty and after-sales support',
  'Marketing collateral and training resources',
  'GCC-ready products (voltage, language, certifications)',
  'Exclusive or semi-exclusive distribution opportunities'
]

export default function VendorSupplierPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    website: '',
    productCategories: [] as string[],
    brandNames: '',
    existingMarkets: '',
    message: '',
    honeypot: '' // Honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return // Honeypot check
    
    setIsSubmitting(true)
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const response = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productCategories: selectedCategories,
          source: 'vendor-supplier-page',
          type: 'vendor_supplier'
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
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt="Warehouse distribution"
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
              Vendor & Supplier Portal
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              Become a LEXA 
              <span className="text-[#E8DCC8]"> Approved Vendor</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              We&apos;re always looking for innovative brands and quality suppliers to expand our 
              smart home portfolio. Join our network and access the growing GCC market.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-[#E8DCC8] text-[#1A1A1A] hover:bg-[#E8DCC8]/90 rounded-none px-8"
                onClick={() => document.getElementById('vendor-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Register as Vendor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-none px-8"
                asChild
              >
                <a href="mailto:procurement@lexalifestyle.com">Email Procurement Team</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                What We Look For in Vendors
              </h2>
              <p className="text-gray-600 mb-8">
                LEXA partners with leading global brands and innovative manufacturers. We evaluate 
                vendors based on product quality, market positioning, and partnership potential.
              </p>
              <ul className="space-y-4">
                {lookingFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Current Sourcing Priorities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <div className="font-semibold text-gray-900">High Priority</div>
                    <div className="text-sm text-gray-600">AI-powered automation systems, Voice control platforms</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900">Medium Priority</div>
                    <div className="text-sm text-gray-600">Outdoor audio, Motorized shading, EV charging</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900">Open Categories</div>
                    <div className="text-sm text-gray-600">Smart appliances, Wellness tech, Energy management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Categories We Source
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the categories that match your product offering. We evaluate vendors 
              across all smart home and AV integration categories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleCategory(category.id)}
                className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
                  selectedCategories.includes(category.id)
                    ? 'border-[#E8DCC8] bg-[#E8DCC8]/10 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  selectedCategories.includes(category.id) ? 'bg-[#1A1A1A]' : 'bg-gray-100'
                }`}>
                  <category.icon className={`h-5 w-5 ${
                    selectedCategories.includes(category.id) ? 'text-[#E8DCC8]' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Vendor Requirements
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              To ensure quality and reliability, we have baseline requirements for all vendor partnerships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-[#E8DCC8]/20 rounded-lg flex items-center justify-center mb-4">
                  <req.icon className="h-6 w-6 text-[#E8DCC8]" />
                </div>
                <h3 className="font-bold text-white mb-2">{req.title}</h3>
                <p className="text-sm text-white/60">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Vendor Onboarding Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our structured evaluation process ensures we partner with vendors who meet our 
              quality standards and can serve the GCC market effectively.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
            
            <div className="space-y-8 md:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <div className="flex items-center gap-3 mb-2 md:justify-start">
                        <span className="w-8 h-8 bg-[#E8DCC8] text-[#1A1A1A] rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </span>
                        <h3 className="font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 md:ml-11">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-[#E8DCC8] rounded-full absolute left-1/2 -translate-x-1/2" 
                       style={{ top: `${(index * 20) + 10}%` }} />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Typical evaluation timeline: <span className="font-semibold">4-8 weeks</span> from application to first order
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="vendor-form" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Vendor Registration Form
            </h2>
            <p className="text-gray-600">
              Complete the form below to start the vendor evaluation process. Our procurement 
              team will review your submission within 5 business days.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in becoming a LEXA vendor. Our procurement team will 
                review your submission and contact you within 5 business days.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Please check your email for a confirmation message with next steps.
              </p>
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
              {/* Company Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website
                    </label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.example.com"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title
                    </label>
                    <Input
                      placeholder="e.g., Sales Director"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country of Operation *
                  </label>
                  <Input
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., United States, Germany, China"
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Product Information</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Categories * <span className="font-normal text-gray-500">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {productCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-3 border-2 rounded-lg text-left transition-all text-sm ${
                          selectedCategories.includes(cat.id)
                            ? 'border-[#E8DCC8] bg-[#E8DCC8]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <cat.icon className={`h-4 w-4 mb-1 ${
                          selectedCategories.includes(cat.id) ? 'text-[#1A1A1A]' : 'text-gray-400'
                        }`} />
                        <div className="font-medium text-gray-900 text-xs">{cat.name}</div>
                      </button>
                    ))}
                  </div>
                  {selectedCategories.length === 0 && (
                    <p className="text-amber-600 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Please select at least one category
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand Names *
                    </label>
                    <Input
                      required
                      value={formData.brandNames}
                      onChange={(e) => setFormData({ ...formData, brandNames: e.target.value })}
                      placeholder="List your brand names"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Markets
                    </label>
                    <Input
                      value={formData.existingMarkets}
                      onChange={(e) => setFormData({ ...formData, existingMarkets: e.target.value })}
                      placeholder="e.g., Europe, North America, Asia"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your products, competitive advantages, and why you'd be a good fit for LEXA..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 resize-none"
                />
              </div>

              {/* Document Upload Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Upload className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Documents to Prepare</h4>
                    <p className="text-sm text-blue-700">
                      After submitting this form, you&apos;ll receive an email with instructions to upload:
                      product catalog, price list, certifications, and company profile.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm">
                  There was an error submitting your registration. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || selectedCategories.length === 0}
                className="w-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white rounded-lg py-6 text-base"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Vendor Registration
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and vendor terms. 
                All information is kept confidential.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Vendor FAQs
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                What volume do you typically order?
              </h3>
              <p className="text-gray-600">
                Order volumes vary by product category and brand. Initial orders typically range from 
                $10,000-$50,000 depending on the product line, with regular reorders based on demand.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                Do you require exclusivity for the GCC region?
              </h3>
              <p className="text-gray-600">
                We prefer exclusive or semi-exclusive arrangements for new brands, but we evaluate 
                each opportunity individually. Strong existing distribution in the region may also 
                be considered.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                What certifications are required for GCC markets?
              </h3>
              <p className="text-gray-600">
                Products should have CE marking at minimum. UAE market may require ESMA compliance 
                for certain categories. Saudi Arabia requires SASO certification. We can guide you 
                through specific requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                How long does the evaluation process take?
              </h3>
              <p className="text-gray-600">
                From initial application to partnership agreement, the process typically takes 4-8 weeks. 
                This includes documentation review, sample testing, and commercial negotiations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                Do you provide marketing support for vendor brands?
              </h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive marketing support including product displays at our Experience 
                Centre, digital marketing campaigns, dealer training, and co-branded marketing materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Expand into the GCC Market?
          </h2>
          <p className="text-white/70 mb-8">
            Join the leading smart home brands already partnering with LEXA across the Gulf region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#E8DCC8] text-[#1A1A1A] hover:bg-[#E8DCC8]/90 rounded-none px-8"
              onClick={() => document.getElementById('vendor-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-none px-8"
              asChild
            >
              <a href="mailto:procurement@lexalifestyle.com">procurement@lexalifestyle.com</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

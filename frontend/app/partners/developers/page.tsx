'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Download, FileText, Building2, Users, Clock, TrendingUp, ArrowRight, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DeveloperToolkitPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [emailGateData, setEmailGateData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_scale: 'boutique',
    units_count: 0,
    resource_type: 'full_toolkit',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleEmailGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${BACKEND_URL}/api/developers/toolkit-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailGateData)
      })

      if (!response.ok) throw new Error('Failed to submit request')

      setSubmitStatus('success')
      // Trigger download after successful submission
      setTimeout(() => {
        window.location.href = '/downloads/developer/LEXA_Developer_Toolkit_2025.pdf'
        setShowEmailGate(false)
        setEmailGateData({
          name: '',
          email: '',
          phone: '',
          company: '',
          project_scale: 'boutique',
          units_count: 0,
          resource_type: 'full_toolkit',
          timeline: '',
          message: ''
        })
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resources = [
    {
      icon: FileText,
      title: 'Technical Specifications',
      description: 'Complete system specs, wiring diagrams, and installation requirements for all LEXA solutions.',
      fileCount: '100+ docs'
    },
    {
      icon: Building2,
      title: 'Project Planning Templates',
      description: 'Timeline templates, budget calculators, and phasing guides for multi-unit developments.',
      fileCount: '25+ templates'
    },
    {
      icon: Users,
      title: 'Volume Pricing Guide',
      description: 'Transparent pricing structure for 10+, 50+, and 100+ unit projects with negotiated rates.',
      fileCount: 'Price matrix'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Checklist',
      description: 'UAE building codes, DEWA requirements, and smart home certifications for luxury developments.',
      fileCount: 'UAE compliant'
    }
  ]

  const partnerTiers = [
    { tier: 'Project Partner', units: '10-49 units', discount: '8%', benefits: ['Dedicated PM', 'Priority scheduling'] },
    { tier: 'Development Partner', units: '50-99 units', discount: '12%', benefits: ['On-site team', 'Custom showroom'] },
    { tier: 'Strategic Partner', units: '100+ units', discount: '18%', benefits: ['Exclusive territory', 'Co-branding', 'Revenue share'] },
  ]

  const benefits = [
    {
      stat: '30%',
      label: 'Faster Sales Velocity',
      desc: 'Smart-enabled units sell 30% faster than comparable non-smart properties in Dubai.'
    },
    {
      stat: '15-25%',
      label: 'Price Premium',
      desc: 'Command higher per-sqft prices with integrated automation in Palm Jumeirah & Emirates Hills.'
    },
    {
      stat: '100%',
      label: 'On-Time Delivery',
      desc: 'Coordination with MEP contractors ensures zero delays. Our track record speaks for itself.'
    }
  ]

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Luxury development"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60' 
              : 'bg-gradient-to-t from-white via-white/80 to-white/40'
          }`} />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`inline-block mb-6 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] ${
              isDark 
                ? 'bg-[#C9A962]/20 text-[#C9A962]' 
                : 'bg-[#C9A962] text-white'
            }`}>
              For Real Estate Developers
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Smart Developments,
              <br />
              <span className="text-[#C9A962]">Delivered at Scale</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Turn-key automation for luxury developments. Consistent quality, predictable timelines, competitive rates.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B5952F] text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                onClick={() => setShowEmailGate(true)}
              >
                <Download className="mr-2" size={20} />
                Download Toolkit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                onClick={() => setShowProjectForm(true)}
              >
                Discuss Project
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What&apos;s in the <span className="text-[#C9A962]">Developer Toolkit</span>
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Everything you need to integrate LEXA automation into your development—from initial planning to handover.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-8 rounded-2xl border transition-all hover:shadow-lg ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 hover:border-[#C9A962]' 
                        : 'bg-white border-gray-200 hover:border-[#C9A962]'
                    }`}
                  >
                    <Icon size={40} className="text-[#C9A962] mb-4" strokeWidth={1.5} />
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{resource.title}</h3>
                    <p className={`leading-relaxed mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{resource.description}</p>
                    <p className="text-sm text-[#C9A962] font-medium">{resource.fileCount}</p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B5952F] text-white rounded-none px-12 py-6"
                onClick={() => setShowEmailGate(true)}
              >
                <Download className="mr-2" />
                Get Full Toolkit (PDF)
              </Button>
              <p className={`text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Free download • No credit card required</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY DEVELOPERS CHOOSE LEXA */}
      <section className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                The <span className="text-[#C9A962]">LEXA Advantage</span>
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Data-driven results from real developments across Dubai and Abu Dhabi.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center p-8 rounded-2xl border ${
                    isDark 
                      ? "bg-gray-800/50 border-gray-700" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-4xl font-bold text-[#C9A962] mb-4">{benefit.stat}</div>
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{benefit.label}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER TIERS */}
      <section className={`py-20 ${isDark ? "bg-gray-800/30" : "bg-[#C9A962]/5"}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-[#C9A962]">Volume Partner</span> Program
              </h2>
              <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Better rates and dedicated support as your projects scale
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {partnerTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl border text-center ${
                    index === 2 
                      ? 'bg-[#C9A962] border-[#C9A962] text-white' 
                      : isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${
                    index === 2 ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                  }`}>{tier.tier}</h3>
                  <p className={`text-sm mb-4 ${
                    index === 2 ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>{tier.units}</p>
                  <div className={`text-4xl font-bold mb-4 ${
                    index === 2 ? 'text-white' : 'text-[#C9A962]'
                  }`}>{tier.discount}</div>
                  <p className={`text-sm mb-6 ${
                    index === 2 ? 'text-white/70' : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>Volume discount</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className={`text-sm flex items-center gap-2 justify-center ${
                        index === 2 ? 'text-white/90' : isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <CheckCircle size={16} className={index === 2 ? 'text-white' : 'text-[#C9A962]'} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INTAKE CTA */}
      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Discuss Your Development?
              </h2>
              <p className="text-lg text-black/80 mb-10">
                Share your project scope, and we&apos;ll provide a custom proposal with timeline and pricing.
              </p>
              <Button
                size="lg"
                className="bg-black hover:bg-black/90 text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                onClick={() => setShowProjectForm(true)}
              >
                Submit Project Brief
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EMAIL GATE MODAL */}
      {showEmailGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowEmailGate(false)} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowEmailGate(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-black mb-2">
                DOWNLOAD DEVELOPER TOOLKIT
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your details to receive the complete toolkit PDF via email and instant download.
              </p>

              {submitStatus === 'success' ? (
                <div className="py-12 text-center">
                  <div className="text-6xl mb-4 text-[#C9A962]">✓</div>
                  <h3 className="text-2xl font-bold text-[#C9A962] mb-2">Download Starting...</h3>
                  <p className="text-gray-600">
                    Check your email for the toolkit. Download will begin automatically.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailGateSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <Input
                        required
                        value={emailGateData.name}
                        onChange={(e) => setEmailGateData({ ...emailGateData, name: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                      <Input
                        required
                        value={emailGateData.company}
                        onChange={(e) => setEmailGateData({ ...emailGateData, company: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={emailGateData.email}
                        onChange={(e) => setEmailGateData({ ...emailGateData, email: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <Input
                        required
                        value={emailGateData.phone}
                        onChange={(e) => setEmailGateData({ ...emailGateData, phone: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Project Scale *</label>
                      <select
                        required
                        value={emailGateData.project_scale}
                        onChange={(e) => setEmailGateData({ ...emailGateData, project_scale: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="boutique">Boutique (1-10 units)</option>
                        <option value="mid-scale">Mid-Scale (10-50 units)</option>
                        <option value="large-scale">Large-Scale (50-100 units)</option>
                        <option value="master-community">Master Community (100+ units)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Units</label>
                      <Input
                        type="number"
                        value={emailGateData.units_count || ''}
                        onChange={(e) => setEmailGateData({ ...emailGateData, units_count: parseInt(e.target.value) || 0 })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Timeline *</label>
                    <select
                      required
                      value={emailGateData.timeline}
                      onChange={(e) => setEmailGateData({ ...emailGateData, timeline: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select timeline...</option>
                      <option value="immediate">Immediate (Next 3 months)</option>
                      <option value="short-term">Short-term (3-6 months)</option>
                      <option value="mid-term">Mid-term (6-12 months)</option>
                      <option value="long-term">Long-term (12+ months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                    <Textarea
                      value={emailGateData.message}
                      onChange={(e) => setEmailGateData({ ...emailGateData, message: e.target.value })}
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded">
                      Failed to submit. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-black/90 text-white py-6 text-sm font-bold uppercase tracking-widest"
                  >
                    {isSubmitting ? 'Sending...' : 'Download Toolkit'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* PROJECT FORM MODAL - Placeholder */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowProjectForm(false)} />
          <div className="relative bg-white max-w-2xl w-full p-12 text-center">
            <button onClick={() => setShowProjectForm(false)} className="absolute top-4 right-4 text-gray-600 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">Project Intake Form</h2>
            <p className="text-gray-600 mb-6">Comprehensive project brief form will be implemented in the next phase.</p>
            <p className="text-sm text-gray-500">For now, please contact us directly at developers@lexa.ae</p>
          </div>
        </div>
      )}
    </div>
  )
}

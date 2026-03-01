'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Users, TrendingUp, Award, CheckCircle2, ArrowRight, Globe, Zap, Shield, HeadphonesIcon, Package, Percent, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const partnerTypes = [
  { id: 'dealer', title: 'Authorized Dealer', description: 'Retail and install smart home solutions to end customers', icon: Building2, benefits: ['Product training', 'Marketing support', 'Lead referrals'] },
  { id: 'distributor', title: 'Regional Distributor', description: 'Distribute our brands across your territory', icon: Globe, benefits: ['Exclusive territory rights', 'Volume pricing', 'Inventory support'] },
  { id: 'integrator', title: 'System Integrator', description: 'Design and implement enterprise smart building solutions', icon: Zap, benefits: ['Technical certification', 'Project support', 'Co-bidding opportunities'] },
  { id: 'contractor', title: 'MEP Contractor', description: 'Subcontract for smart home infrastructure on projects', icon: Shield, benefits: ['Pre-wire specifications', 'Technical guidance', 'Project referrals'] },
]

const partnerBenefits = [
  { icon: Package, title: 'Product Access', desc: 'Access to premium brands at partner pricing with priority allocation.' },
  { icon: HeadphonesIcon, title: 'Technical Support', desc: 'Dedicated support line for partners with escalation to engineering team.' },
  { icon: Percent, title: 'Competitive Margins', desc: 'Attractive partner pricing and volume-based incentive programs.' },
  { icon: TrendingUp, title: 'Marketing Support', desc: 'Co-branded marketing materials, lead sharing, and showroom access.' },
]

export default function PartnerWithUsPage() {
  const cms = useCms('page_partner_with_us', null) as any
  const [selectedType, setSelectedType] = useState('dealer')
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', type: 'dealer', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/submissions/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: 'partner_page', subject: `Partnership Inquiry: ${formData.type}` }) })
      if (!res.ok) throw new Error('Failed')
      setSubmitStatus('success')
    } catch { setSubmitStatus('error') }
    finally { setIsSubmitting(false) }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="partner-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Partnership</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="partner-title">Partner With LEXA</h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">Join one of the UAE&apos;s most trusted smart home integrators. Grow your business with premium products, training, and support.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" asChild>
              <a href="#apply">Apply Now <ArrowRight className="ml-2" size={18} /></a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="partner-types-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Partnership Models</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">How You Can Partner</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerTypes.map((type, i) => {
                const Icon = type.icon
                return (
                  <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    onClick={() => { setSelectedType(type.id); setFormData(p => ({ ...p, type: type.id })) }}
                    className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${selectedType === type.id ? 'border-[#C9A962] shadow-lg bg-[#C9A962]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                    <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-4">
                      <Icon className="text-white dark:text-gray-900" size={20} />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{type.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.benefits.map((b, j) => (<li key={j} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 size={12} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{b}</li>))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why Partner</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Partner Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerBenefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-center p-6 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center mb-3 mx-auto border-2 border-[#C9A962]/30">
                      <Icon className="text-[#C9A962]" size={20} />
                    </div>
                    <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{b.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="application-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Apply Now</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Partnership Application</h2>
            </div>

            {submitStatus === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our partnerships team will review and contact you within 3 business days.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="partner-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Company</label><Input value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Company name" required data-testid="partner-company" /></div>
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Contact Name</label><Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Full name" required data-testid="partner-name" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label><Input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="your@company.com" required data-testid="partner-email" /></div>
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone</label><Input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="+971 50 XXX XXXX" data-testid="partner-phone" /></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Partnership Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {partnerTypes.map(t => (
                      <button key={t.id} type="button" onClick={() => setFormData(p => ({ ...p, type: t.id }))}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors ${formData.type === t.id ? 'bg-[#C9A962] text-gray-900 border-[#C9A962]' : 'border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/50'}`}>{t.title}</button>
                    ))}
                  </div>
                </div>
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Message</label><Textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your company and partnership goals..." rows={4} /></div>
                <Button type="submit" size="lg" className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" disabled={isSubmitting} data-testid="partner-submit">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send className="ml-2" size={16} />
                </Button>
                {submitStatus === 'error' && <p className="text-sm text-red-500 text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Let&apos;s Discuss Partnership</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Contact our partnerships team for any questions about our partner programs.</p>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
              <a href="mailto:partnerships@lexalifestyle.com">Email Partnerships Team</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

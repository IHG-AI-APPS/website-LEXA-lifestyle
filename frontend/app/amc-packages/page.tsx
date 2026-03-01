'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Clock, Wrench, Zap, Phone, CheckCircle2, ArrowRight, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import { useCms } from '@/hooks/useCms'

const amcPackages = [
  { name: 'Basic Care', subtitle: 'Essential maintenance', price: 'From AED 5,000/year', description: 'Annual preventive maintenance and basic support', features: ['2 Preventive Maintenance Visits/Year', 'System Health Check', 'Software Updates', 'Email & Phone Support (Business Hours)', 'Remote Diagnostics', 'Annual Performance Report'], response: '48-hour response time', ideal: 'Small installations, residential', recommended: false },
  { name: 'Professional Care', subtitle: 'Recommended for businesses', price: 'From AED 15,000/year', description: 'Quarterly maintenance with priority support', features: ['4 Preventive Maintenance Visits/Year', 'Priority Technical Support', 'Predictive Maintenance Alerts', 'System Optimization', 'Spare Parts Discount (15%)', '24/7 Emergency Hotline', 'Quarterly Performance Reports', 'Free Minor Repairs'], response: '24-hour response time', ideal: 'Medium installations, commercial', recommended: true },
  { name: 'Enterprise Care', subtitle: 'For large-scale projects', price: 'From AED 35,000/year', description: 'Dedicated support with VIP service levels', features: ['Monthly Preventive Maintenance', 'Dedicated Account Manager', '24/7 VIP Support Hotline', 'Predictive AI Monitoring', 'Spare Parts Discount (25%)', 'Free All Repairs (Parts & Labor)', 'Monthly Performance Reports', 'System Upgrade Consultation', 'Priority Scheduling'], response: '4-hour response time', ideal: 'Large estates, commercial', recommended: false },
]

export default function AMCPackagesPage() {
  const cms = useCms('page_amc_packages', null) as any
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="amc-packages-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">After-Sales Support</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="amc-title">Annual Maintenance Contracts</h1>
            <p className="text-base text-gray-300 max-w-lg leading-relaxed mb-8">Protect your investment with comprehensive maintenance and support plans designed for smart home systems.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta">
              Get AMC Quote <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why AMC */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why Maintain</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Why You Need an AMC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Prevent Failures', desc: 'Regular maintenance catches issues before they become costly breakdowns.' },
                { icon: Clock, title: 'Priority Response', desc: 'Skip the queue with guaranteed response times for AMC clients.' },
                { icon: Wrench, title: 'Expert Service', desc: 'Certified technicians who know your system inside and out.' },
                { icon: Zap, title: 'Peak Performance', desc: 'Optimized systems run better, consume less energy, and last longer.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group text-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-4 mx-auto group-hover:bg-[#C9A962] transition-colors">
                      <Icon className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* AMC Tiers */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900" data-testid="amc-tiers-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Choose Your Plan</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">AMC Packages</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {amcPackages.map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 bg-white dark:bg-gray-950 ${pkg.recommended ? 'border-[#C9A962] shadow-xl lg:scale-105' : 'border-gray-200 dark:border-gray-700'} transition-all`}>
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A962] text-gray-900 text-sm font-bold rounded-full z-10">Recommended</div>
                )}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{pkg.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{pkg.subtitle}</p>
                    <p className="text-2xl font-bold text-[#C9A962]">{pkg.price}</p>
                    <p className="text-xs text-gray-400 mt-2">{pkg.response}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{feat}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mb-6">Ideal for: {pkg.ideal}</p>
                  <Button className={`w-full font-semibold ${pkg.recommended ? 'bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200'}`} onClick={() => setShowConsultationForm(true)} data-testid={`amc-select-${i}`}>
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Protect Your Investment</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Ready to Secure Your System?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get a customized AMC proposal for your smart home system.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-button">
              Request AMC Quote
            </Button>
          </div>
        </div>
      </section>

      <PricingDisclaimer variant="light" />
      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

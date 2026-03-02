'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DollarSign, TrendingUp, Shield, Zap, CheckCircle2, ArrowRight, Calculator, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import { useCms } from '@/hooks/useCms'

export default function InvestmentPricingPage() {
  const cms = useCms('page_investment_pricing', null) as any
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const pricingTiers = [
    { name: 'Essential', subtitle: 'Perfect for small offices', price: 'From AED 50,000', description: 'Core automation for spaces up to 3,000 sq ft', features: ['Smart Lighting Control', 'Climate Management', 'Basic Access Control', 'Energy Monitoring Dashboard', 'Mobile App Control', '1-Year Warranty'], ideal: 'Small offices, clinics, boutiques', roi: '18-24 months' },
    { name: 'Professional', subtitle: 'For growing businesses', price: 'From AED 150,000', description: 'Comprehensive intelligence for spaces up to 10,000 sq ft', features: ['Complete BMS Integration', 'Smart HVAC & Lighting', 'Advanced Security Systems', 'Workplace Analytics', 'Predictive Maintenance', '2-Year Warranty', '24/7 Technical Support'], ideal: 'Medium offices, retail spaces, hotels', roi: '12-18 months', popular: true },
    { name: 'Enterprise', subtitle: 'For large facilities', price: 'Custom Quote', description: 'Full digital twin and AI-powered optimization', features: ['Living Digital Twin Platform', 'AI-Powered Optimization', 'Multi-Site Management', 'Custom Integration', 'Dedicated Account Manager', '3-Year Warranty', 'Priority Support'], ideal: 'Corporate towers, hospitals, campuses', roi: '12-15 months' },
  ]

  const roiFactors = [
    { icon: Zap, title: 'Energy Savings', desc: '25-40% reduction in energy costs through intelligent automation', value: 'AED 50K-200K/year' },
    { icon: TrendingUp, title: 'Operational Efficiency', desc: '20-30% improvement in staff productivity', value: 'AED 30K-150K/year' },
    { icon: Shield, title: 'Maintenance Reduction', desc: '40-60% decrease in reactive maintenance', value: 'AED 20K-100K/year' },
    { icon: Award, title: 'Property Value', desc: '10-15% increase in property valuation', value: 'Long-term appreciation' },
  ]

  const breakdown = [
    { category: 'Hardware & Equipment', pct: '40-50%', items: ['Sensors, controllers, smart devices', 'Networking equipment', 'Display panels and interfaces'] },
    { category: 'Installation & Integration', pct: '25-35%', items: ['Professional installation', 'System integration', 'Testing and commissioning'] },
    { category: 'Software & Licensing', pct: '15-20%', items: ['Platform licenses', 'Cloud services', 'Mobile applications'] },
    { category: 'Training & Documentation', pct: '5-10%', items: ['Staff training', 'System documentation', 'Support materials'] },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="pricing-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Smart Investment</span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="pricing-title">Investment & Pricing</h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">Transparent pricing for smart building solutions. Typical ROI within 12-24 months through energy savings and operational efficiency.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)}>
                Get Custom Quote <ArrowRight className="ml-2" size={18} />
              </Button>
              <Link href="/calculator"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10"><Calculator className="mr-2" size={16} /> ROI Calculator</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950" data-testid="pricing-tiers">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Choose Your Level</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Commercial Packages</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {pricingTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 bg-white dark:bg-gray-900 ${tier.popular ? 'border-[#C9A962] shadow-xl lg:scale-105' : 'border-gray-200 dark:border-gray-700'}`}>
                {tier.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A962] text-gray-900 text-sm font-bold rounded-full z-10">Most Popular</div>}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{tier.subtitle}</p>
                    <p className="text-2xl font-bold text-[#C9A962]">{tier.price}</p>
                    <p className="text-xs text-gray-400 mt-2">ROI: {tier.roi}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 text-center">{tier.description}</p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feat, j) => (<li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{feat}</li>))}
                  </ul>
                  <p className="text-xs text-gray-500 mb-5">Ideal for: {tier.ideal}</p>
                  <Button className={`w-full font-semibold ${tier.popular ? 'bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200'}`} onClick={() => setShowConsultationForm(true)}>
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Factors */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="roi-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Return on Investment</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">How You Save</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roiFactors.map((factor, i) => {
                const Icon = factor.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                    <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-4 group-hover:bg-[#C9A962] transition-colors">
                      <Icon className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                    </div>
                    <h3 className="text-base font-bold mb-1 text-gray-900 dark:text-white">{factor.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{factor.desc}</p>
                    <p className="text-xs font-semibold text-[#C9A962]">{factor.value}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Transparency</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Investment Breakdown</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {breakdown.map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{item.category}</h3>
                    <span className="text-lg font-bold text-[#C9A962]">{item.pct}</span>
                  </div>
                  <ul className="space-y-1">{item.items.map((sub, j) => (<li key={j} className="text-xs text-gray-500 pl-3 border-l-2 border-[#C9A962]/30">{sub}</li>))}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Invest?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Get Your Custom Proposal</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Every project is unique. Let us create a tailored investment proposal for your space.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-button">
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      <PricingDisclaimer variant="light" />
      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

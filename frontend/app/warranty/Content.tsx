'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const fallback = {
  hero_badge: 'Your Protection',
  hero_title: 'Warranty & Service Policy',
  hero_description: 'Comprehensive warranty coverage on all products and installations from LEXA Lifestyle.',
  warranty_items: [
    { title: 'Premium Brands', description: 'Manufacturer warranty ranging from 1-5 years depending on the brand and product' },
    { title: 'Installation Work', description: '12-month warranty on all installation and integration services' },
    { title: 'Cabling & Infrastructure', description: '24-month warranty on structured cabling and network infrastructure' },
    { title: 'Programming & Config', description: '12-month warranty on all system programming and configuration' },
  ],
  extended_warranty_text: 'LEXA offers extended warranty options through our Annual Maintenance Contracts (AMC). AMC clients receive extended coverage, priority support, and preventive maintenance visits to ensure their systems perform optimally year after year.',
  exclusions: [
    'Physical damage caused by misuse or accidents',
    'Damage from power surges without proper surge protection',
    'Unauthorized modifications to installed systems',
    'Natural wear and tear beyond warranty periods',
    'Issues caused by third-party modifications',
  ],
  claim_steps: [
    { num: '01', title: 'Contact Support', description: 'Reach out via phone, email, or WhatsApp' },
    { num: '02', title: 'Assessment', description: 'Our team will diagnose the issue remotely or on-site' },
    { num: '03', title: 'Resolution', description: 'Covered repairs or replacements at no additional cost' },
  ],
  cta_badge: 'Need Support?',
  cta_title: "We're Here to Help",
  cta_description: 'Contact our support team or explore our AMC packages for extended coverage.',
}

export default function WarrantyContent() {
  const cms = useCms('page_warranty', fallback)

  const badge = cms?.hero_badge || fallback.hero_badge
  const title = cms?.hero_title || fallback.hero_title
  const desc = cms?.hero_description || fallback.hero_description
  const items = cms?.warranty_items?.length ? cms.warranty_items : fallback.warranty_items
  const extText = cms?.extended_warranty_text || fallback.extended_warranty_text
  const exclusions = cms?.exclusions?.length ? cms.exclusions : fallback.exclusions
  const steps = cms?.claim_steps?.length ? cms.claim_steps : fallback.claim_steps
  const ctaBadge = cms?.cta_badge || fallback.cta_badge
  const ctaTitle = cms?.cta_title || fallback.cta_title
  const ctaDesc = cms?.cta_description || fallback.cta_description

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="warranty-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">{badge}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="warranty-title">{title}</h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto">{desc}</p>
          </div>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Coverage</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Product Warranty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="h-5 w-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                  <div><h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3><p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p></div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Extended Warranty</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{extText}</p>

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Warranty Exclusions</h2>
            <div className="space-y-3 mb-12">
              {exclusions.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-gray-400 mt-0.5">-</span><span>{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How to Claim Warranty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {steps.map((step: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                  <span className="text-2xl font-bold text-[#C9A962]">{step.num}</span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-2 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">{ctaBadge}</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">{ctaTitle}</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link href="/amc-packages">View AMC Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

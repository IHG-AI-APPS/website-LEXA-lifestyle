import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle2, ArrowRight, Phone, Clock, Wrench } from 'lucide-react'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_warranty', {
    title: 'Warranty & Service Policy | LEXA Lifestyle',
    description: 'Warranty terms and service policies for LEXA Lifestyle products and installations',
  })
}

export default function WarrantyPage() {
  const warrantyItems = [
    { title: 'Premium Brands', desc: 'Manufacturer warranty ranging from 1-5 years depending on the brand and product' },
    { title: 'Installation Work', desc: '12-month warranty on all installation and integration services' },
    { title: 'Cabling & Infrastructure', desc: '24-month warranty on structured cabling and network infrastructure' },
    { title: 'Programming & Config', desc: '12-month warranty on all system programming and configuration' },
  ]

  const exclusions = [
    'Physical damage caused by misuse or accidents',
    'Damage from power surges without proper surge protection',
    'Unauthorized modifications to installed systems',
    'Natural wear and tear beyond warranty periods',
    'Issues caused by third-party modifications',
  ]

  return (
    <>
      <CmsReg />
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="warranty-page">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Your Protection</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="warranty-title">Warranty & Service Policy</h1>
              <p className="text-base text-gray-300 max-w-lg mx-auto">Comprehensive warranty coverage on all products and installations from LEXA Lifestyle.</p>
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
                {warrantyItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <div><h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3><p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p></div>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Extended Warranty</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                LEXA offers extended warranty options through our Annual Maintenance Contracts (AMC). AMC clients receive extended coverage, priority support, and preventive maintenance visits to ensure their systems perform optimally year after year.
              </p>

              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Warranty Exclusions</h2>
              <div className="space-y-3 mb-12">
                {exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-gray-400 mt-0.5">-</span><span>{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How to Claim Warranty</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[
                  { num: '01', title: 'Contact Support', desc: 'Reach out via phone, email, or WhatsApp' },
                  { num: '02', title: 'Assessment', desc: 'Our team will diagnose the issue remotely or on-site' },
                  { num: '03', title: 'Resolution', desc: 'Covered repairs or replacements at no additional cost' },
                ].map((step, i) => (
                  <div key={i} className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                    <span className="text-2xl font-bold text-[#C9A962]">{step.num}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-2 mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-500">{step.desc}</p>
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
              <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Need Support?</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">We&apos;re Here to Help</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Contact our support team or explore our AMC packages for extended coverage.</p>
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
    </>
  )
}

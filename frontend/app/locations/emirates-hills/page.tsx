import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, CheckCircle2 } from 'lucide-react'
import TrustSignals from '@/components/TrustSignals'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_locations_emirates_hills', {
  title: 'Smart Home Automation Emirates Hills | Ultra-Luxury Villa Integration Dubai',
  description: 'Bespoke automation for Emirates Hills villas. KNX, Crestron ultra-luxury installations.',
  keywords: 'smart home Emirates Hills, ultra-luxury automation Dubai',
})
}

export default function EmiratesHillsPage() {
  const features = [
    'Ultra-luxury villa specialists',
    'Estate-wide integration (15,000+ sq ft)',
    'Multi-building coordination',
    'Golf course view automation',
    'VIP-level security systems',
    'Dedicated 24/7 concierge support'
  ]

  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={20} />
              <span>Emirates Hills, Dubai</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Smart Home Automation<br />Emirates Hills
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Bespoke automation for Dubai&apos;s most exclusive gated community. Premium KNX and Crestron installations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Private Design Session
                </Button>
              </Link>
              <Link href="/villa-designer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Design My Villa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">
              Emirates Hills Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Popular Solutions for Emirates Hills */}
            <h2 className="text-3xl font-bold mb-8 mt-16">Popular Solutions for Emirates Hills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Luxury Home Cinema', link: '/solutions/luxury-home-cinema-dubai', desc: 'Dolby Atmos private theaters' },
                { title: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', desc: 'Complete villa automation' },
                { title: 'Security Systems', link: '/solutions/security', desc: 'Estate-grade protection' },
                { title: 'Lighting Control', link: '/solutions/lighting-automation', desc: 'Lutron whole-home lighting' },
                { title: 'HiFi Audio', link: '/solutions/hifi-audio', desc: 'Audiophile listening rooms' },
                { title: 'Outdoor Living', link: '/solutions/outdoor-living', desc: 'Garden entertainment' }
              ].map((solution, index) => (
                <Link key={index} href={solution.link}>
                  <div className="border border-gray-200 dark:border-gray-700 hover:border-black p-6 rounded-lg transition-all group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-black transition-colors">{solution.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{solution.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready for Emirates Hills Excellence?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a private villa technology review
            </p>
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                Schedule Site Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, CheckCircle2 } from 'lucide-react'
import TrustSignals from '@/components/TrustSignals'

export const metadata: Metadata = {
  title: 'Smart Home Automation Palm Jumeirah | Luxury Villa Integration Dubai',
  description: 'Premium smart home automation for Palm Jumeirah villas. KNX, Control4, Crestron systems. 24/7 support.',
  keywords: 'smart home Palm Jumeirah, villa automation Palm, luxury automation Dubai',
}

export default function PalmJumeirahPage() {
  const features = [
    'Beachfront villa automation specialists',
    'Salt-air resistant systems',
    'Outdoor entertainment integration',
    'Pool and garden automation',
    'Yacht integration capabilities',
    'Premium security for waterfront properties'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={20} />
              <span>Palm Jumeirah, Dubai</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Smart Home Automation<br />Palm Jumeirah
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Luxury villa automation for Dubai&apos;s iconic island. Specialized systems for beachfront properties with 24/7 local support.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                  Private Design Session
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Get Pricing
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
              Palm Jumeirah Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Popular Solutions for Palm Jumeirah */}
            <h2 className="text-3xl font-bold mb-8 mt-16">Popular Solutions for Palm Jumeirah Villas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Home Cinema', link: '/solutions/home-cinema', desc: 'Private theaters with ocean views' },
                { title: 'Outdoor Living', link: '/solutions/outdoor-living', description: 'Beachfront entertainment' },
                { title: 'Security & Surveillance', link: '/solutions/security', desc: 'Waterfront property protection' },
                { title: 'Lighting Automation', link: '/solutions/lighting-automation', desc: 'Sunset-aware scenes' },
                { title: 'Marine Audio', link: '/solutions/marine-audio', desc: 'Yacht integration' },
                { title: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', desc: 'Complete villa automation' }
              ].map((solution, index) => (
                <Link key={index} href={solution.link}>
                  <div className="border border-gray-200 hover:border-black p-6 rounded-lg transition-all group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-black transition-colors">{solution.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{solution.desc}</p>
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
              Ready to Automate Your Palm Jumeirah Villa?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a private design session for your property
            </p>
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                Villa Technology Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

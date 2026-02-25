import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import TrustSignals from '@/components/TrustSignals'
import CmsReg from './CmsReg'

export const metadata: Metadata = {
  title: 'Smart Home Automation Sharjah | Affordable Villa Integration UAE',
  description: 'Quality automation for Sharjah villas at competitive prices.',
}

export default function SharjahPage() {
  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={20} />
              <span>Sharjah, UAE</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Smart Home Automation<br />Sharjah
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <TrustSignals />
    </div>
    </>
  )
}

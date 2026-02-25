import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, CheckCircle2 } from 'lucide-react'
import TrustSignals from '@/components/TrustSignals'
import AbuDhabiPageCms from './AbuDhabiPageCms'

export const metadata: Metadata = {
  title: 'Smart Home Automation Abu Dhabi | Luxury Villa Integration UAE Capital',
  description: 'Premium smart home automation in Abu Dhabi. Saadiyat Island, Yas Island specialists.',
  keywords: 'smart home Abu Dhabi, villa automation Abu Dhabi, Saadiyat automation',
}

export default function AbuDhabiPage() {
  const features = [
    'Abu Dhabi villa and palace specialists',
    'Saadiyat and Yas Island experience',
    'Government project compliance',
    'Arabic and international support',
    'Dedicated Abu Dhabi service team',
    'Capital city availability'
  ]

  return (
    <AbuDhabiPageCms>
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={20} />
              <span>Abu Dhabi, UAE</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Smart Home Automation<br />Abu Dhabi
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Luxury automation for UAE&apos;s capital. Serving Saadiyat Island, Yas Island, and premium communities.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
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
              Abu Dhabi Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
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
              Ready for Abu Dhabi Excellence?
            </h2>
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

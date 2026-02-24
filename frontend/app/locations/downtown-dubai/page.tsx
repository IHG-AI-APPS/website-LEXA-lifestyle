import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, CheckCircle2 } from 'lucide-react'
import TrustSignals from '@/components/TrustSignals'

export const metadata: Metadata = {
  title: 'Smart Home Automation Downtown Dubai | Penthouse Integration',
  description: 'Premium automation for Downtown Dubai penthouses. Burj Khalifa, Opera District specialists.',
}

export default function DowntownPage() {
  const features = [
    'Penthouse automation specialists',
    'High-rise technology integration',
    'Burj Khalifa & Opera District expertise',
    'Corporate office AV systems',
    'Business district infrastructure',
    'Executive boardroom solutions'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={20} />
              <span>Downtown Dubai</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Penthouse Automation<br />Downtown Dubai
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Smart technology for Dubai&apos;s business heart. Specialized in penthouses, corporate offices, and luxury high-rises.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
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
              Downtown Dubai Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Popular Solutions for Downtown Dubai */}
            <h2 className="text-3xl font-bold mb-8 mt-16">Popular Solutions for Downtown Dubai</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Conference Room AV', link: '/solutions/conference-room-av-systems', desc: 'Corporate boardrooms' },
                { title: 'BMS Systems', link: '/solutions/bms-automation', desc: 'Building management' },
                { title: 'Smart Parking', link: '/solutions/smart-parking', desc: 'Tower parking solutions' },
                { title: 'Home Cinema', link: '/solutions/home-cinema', desc: 'Penthouse theaters' },
                { title: 'Access Control', link: '/solutions/access-control', desc: 'High-rise security' },
                { title: 'Video Walls', link: '/solutions/video-walls', desc: 'Lobby displays' }
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
    </div>
  )
}

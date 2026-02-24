import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'
import { getEmirateSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Smart Home Automation Sharjah | Home Automation Company UAE | LEXA',
  description: 'Leading smart home automation in Sharjah. Serving Al Majaz, Al Qasimia, Muwailih, and all Sharjah communities. Official Control4 & Crestron dealer in UAE.',
  keywords: ['smart home Sharjah', 'home automation Sharjah', 'Control4 Sharjah', 'Crestron Sharjah', 'villa automation Sharjah', 'أتمتة المنزل الشارقة'],
  alternates: {
    canonical: 'https://lexalifestyle.com/uae/sharjah'
  }
}

const sharjahData = {
  name: 'Sharjah',
  nameAr: 'الشارقة',
  description: 'Professional smart home automation services in Sharjah, UAE. Serving Al Majaz, Al Qasimia, Muwailih, and all major residential areas.',
  coordinates: { lat: 25.3463, lng: 55.4209 },
  majorAreas: [
    'Al Majaz',
    'Al Qasimia',
    'Muwailih',
    'Al Nahda',
    'Al Khan',
    'Al Taawun',
    'Al Mamzar',
    'University City'
  ],
  projectCount: 80,
  avgProjectValue: 'AED 180,000'
}

export default function SharjahPage() {
  const schema = getEmirateSchema(sharjahData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">
                Smart Home Automation in Sharjah
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                أتمتة المنزل الذكي في الشارقة - Premium home automation solutions in Sharjah
              </p>
              <div className="flex gap-4">
                <Link href="/contact" className="px-8 py-3 bg-[#E8DCC8] text-black font-semibold rounded-lg hover:bg-[#d4c8b4] transition">
                  Get Free Consultation
                </Link>
                <Link href="/calculator" className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition">
                  Calculate Cost
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{sharjahData.projectCount}+</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Homes Automated in Sharjah</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{sharjahData.avgProjectValue}</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Average Project Value</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Areas We Serve in Sharjah</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sharjahData.majorAreas.map((area) => (
                <div key={area} className="p-4 border border-gray-200 rounded-lg hover:border-[#E8DCC8] transition flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#E8DCC8]" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services in Sharjah</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Villa Automation"
                description="Complete smart home solutions for Sharjah villas in Al Majaz, Muwailih, and premium communities."
              />
              <ServiceCard 
                title="Apartment Automation"
                description="Smart solutions for apartments in Al Khan, Al Nahda, and other Sharjah residential areas."
              />
              <ServiceCard 
                title="Lighting & Climate Control"
                description="Energy-efficient Lutron lighting and intelligent HVAC automation for Sharjah homes."
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Automate Your Sharjah Home?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact LEXA Lifestyle for a free consultation and quote for your Sharjah property
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="tel:+971426704270" className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-[#E8DCC8]" />
                +971-42-670-470
              </a>
              <a href="mailto:sales@lexalifestyle.com" className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-[#E8DCC8]" />
                sales@lexalifestyle.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{description}</p>
    </div>
  )
}

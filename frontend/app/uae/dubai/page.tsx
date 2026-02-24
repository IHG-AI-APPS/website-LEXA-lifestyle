import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'
import { getEmirateSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Smart Home Automation Dubai | #1 Home Automation Company | LEXA',
  description: 'Dubai\'s leading smart home automation company. Serving Emirates Hills, Downtown, Palm Jumeirah, Marina, Arabian Ranches. Control4 & Crestron dealer. 300+ Dubai villas automated.',
  keywords: ['smart home Dubai', 'home automation Dubai', 'Control4 Dubai', 'Crestron Dubai', 'villa automation Dubai', 'smart home Emirates Hills', 'أتمتة المنزل دبي'],
  alternates: {
    canonical: 'https://lexalifestyle.com/uae/dubai'
  }
}

const dubaiData = {
  name: 'Dubai',
  nameAr: 'دبي',
  description: 'Premium smart home automation services in Dubai, UAE. Serving Emirates Hills, Downtown, Palm Jumeirah, Dubai Marina, and all major residential communities.',
  coordinates: { lat: 25.2048, lng: 55.2708 },
  majorAreas: [
    'Emirates Hills',
    'Downtown Dubai',
    'Palm Jumeirah',
    'Dubai Marina',
    'Arabian Ranches',
    'Jumeirah',
    'Business Bay',
    'Dubai Hills Estate',
    'The Springs',
    'The Meadows'
  ],
  projectCount: 300,
  avgProjectValue: 'AED 250,000'
}

export default function DubaiPage() {
  const schema = getEmirateSchema(dubaiData)

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
                Smart Home Automation in Dubai
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                أتمتة المنزل الذكي في دبي - Dubai&apos;s #1 luxury home automation company
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
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{dubaiData.projectCount}+</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Villas Automated in Dubai</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{dubaiData.avgProjectValue}</div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Areas We Serve in Dubai</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {dubaiData.majorAreas.map((area) => (
                <div key={area} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#E8DCC8] transition flex items-center gap-2">
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services in Dubai</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Villa Automation"
                description="Complete smart home solutions for Dubai villas in Emirates Hills, Arabian Ranches, and other premium communities."
              />
              <ServiceCard 
                title="Penthouse Automation"
                description="Luxury apartment automation for Downtown Dubai, Dubai Marina, and Palm Jumeirah penthouses."
              />
              <ServiceCard 
                title="Home Cinema Installation"
                description="Dolby Atmos home theaters with premium audio-visual integration."
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Automate Your Dubai Home?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact LEXA Lifestyle for a free consultation and quote for your Dubai property
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
    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{description}</p>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'
import { getEmirateSchema } from '@/lib/seo'
import CmsReg from './CmsReg'

export const metadata: Metadata = {
  title: 'Smart Home Automation Ajman | Home Automation Company UAE | LEXA',
  description: 'Expert smart home automation in Ajman. Serving Al Nuaimiya, Al Rashidiya, and all Ajman communities. Professional Control4 & Crestron integration in UAE.',
  keywords: ['smart home Ajman', 'home automation Ajman', 'Control4 Ajman', 'Crestron Ajman', 'villa automation Ajman', 'أتمتة المنزل عجمان'],
  alternates: {
    canonical: 'https://lexalifestyle.com/uae/ajman'
  }
}

const ajmanData = {
  name: 'Ajman',
  nameAr: 'عجمان',
  description: 'Professional smart home automation services in Ajman, UAE. Serving Al Nuaimiya, Al Rashidiya, Al Jurf, and all major residential areas.',
  coordinates: { lat: 25.4052, lng: 55.5136 },
  majorAreas: [
    'Al Nuaimiya',
    'Al Rashidiya',
    'Al Jurf',
    'Al Rawda',
    'Al Hamidiya',
    'Al Zahra'
  ],
  projectCount: 45,
  avgProjectValue: 'AED 150,000'
}

export default function AjmanPage() {
  const schema = getEmirateSchema(ajmanData)

  return (
        <CmsReg />
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
                Smart Home Automation in Ajman
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                أتمتة المنزل الذكي في عجمان - Professional home automation solutions in Ajman
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
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{ajmanData.projectCount}+</div>
                <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Homes Automated in Ajman</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#E8DCC8] mb-2">{ajmanData.avgProjectValue}</div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Areas We Serve in Ajman</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ajmanData.majorAreas.map((area) => (
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services in Ajman</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Villa Automation"
                description="Complete smart home solutions for Ajman villas with Control4 and Crestron systems."
              />
              <ServiceCard 
                title="Apartment Solutions"
                description="Affordable smart home packages for apartments in Al Nuaimiya and other areas."
              />
              <ServiceCard 
                title="Security Systems"
                description="Integrated security cameras, access control, and smart monitoring for Ajman homes."
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Automate Your Ajman Home?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact LEXA Lifestyle for a free consultation and quote for your Ajman property
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

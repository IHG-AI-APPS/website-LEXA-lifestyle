import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { getEmirateSchema } from '@/lib/seo'
import CmsReg from './CmsReg'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_uae_abu_dhabi', {
  title: 'Smart Home Automation Abu Dhabi | Home Automation Company | LEXA',
  description: 'Abu Dhabi\'s premier smart home automation company. Serving Saadiyat Island, Yas Island, Al Reem, Khalifa City. Control4 & Crestron dealer. Expert villa automation.',
  keywords: ['smart home Abu Dhabi', 'home automation Abu Dhabi', 'Control4 Abu Dhabi', 'villa automation Abu Dhabi', 'أتمتة المنزل أبوظبي'],
  alternates: {
    canonical: 'https://lexalifestyle.com/uae/abu-dhabi'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
  }
})
}

const abuDhabiData = {
  name: 'Abu Dhabi',
  nameAr: 'أبوظبي',
  description: 'Premium smart home automation services in Abu Dhabi, UAE. Serving Saadiyat Island, Yas Island, Al Reem Island, and all major residential areas.',
  coordinates: { lat: 24.4539, lng: 54.3773 },
  majorAreas: [
    'Saadiyat Island',
    'Yas Island',
    'Al Reem Island',
    'Khalifa City',
    'Al Reef',
    'Reem Island',
    'Corniche',
    'Al Raha Beach'
  ],
  projectCount: 150,
  avgProjectValue: 'AED 280,000'
}

export default function AbuDhabiPage() {
  const schema = getEmirateSchema(abuDhabiData)

  return (
        <>
      <CmsReg />
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="min-h-screen bg-white">
        <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-5xl font-bold mb-4">Smart Home Automation in Abu Dhabi</h1>
            <p className="text-xl text-gray-300 mb-6">أتمتة المنزل الذكي في أبوظبي - Premier home automation solutions</p>
            <div className="flex gap-4">
              <Link href="/contact" className="px-8 py-3 bg-[#E8DCC8] text-black font-semibold rounded-lg">Get Free Consultation</Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Areas We Serve in Abu Dhabi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {abuDhabiData.majorAreas.map((area) => (
                <div key={area} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#E8DCC8] transition flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#E8DCC8]" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
    </>
  )
}

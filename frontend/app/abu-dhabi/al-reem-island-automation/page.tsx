import { Metadata } from 'next'
import AlReemIslandClient from './AlReemIslandClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_abu_dhabi_al_reem_island_automation', {
  title: 'Smart Home Automation Al Reem Island | Apartment & Penthouse Solutions | LEXA',
  description: 'Al Reem Island\'s premier smart home automation company. Expert Control4 integration for high-rise apartments, penthouses & waterfront residences. Smart living specialists.',
  keywords: 'smart home Al Reem Island, home automation Reem Island, Control4 Abu Dhabi, penthouse automation, apartment smart home, Sun Tower automation, Sky Tower smart home',
  openGraph: {
    title: 'Smart Home Automation Al Reem Island | LEXA Lifestyle',
    description: 'Al Reem Island\'s trusted smart home partner. Premium automation for apartments and penthouses.',
    url: 'https://lexalifestyle.com/abu-dhabi/al-reem-island-automation',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/abu-dhabi/al-reem-island-automation',
  },
})
}

export default function AlReemIslandPage() {
  return <AlReemIslandClient />
}

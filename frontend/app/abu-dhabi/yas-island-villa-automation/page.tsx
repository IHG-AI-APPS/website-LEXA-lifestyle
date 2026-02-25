import { Metadata } from 'next'
import YasIslandClient from './YasIslandClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_abu_dhabi_yas_island_villa_automation', {
  title: 'Smart Home Automation Yas Island | Villa & Apartment Solutions | LEXA',
  description: 'Yas Island\'s leading smart home automation company. Expert Control4 & Crestron integration for Yas Acres, West Yas, Yas Bay residences. Waterfront villa specialists.',
  keywords: 'smart home Yas Island, home automation Yas Island, Yas Acres automation, West Yas smart home, Yas Bay penthouse, Control4 Yas Island, villa automation Abu Dhabi',
  openGraph: {
    title: 'Smart Home Automation Yas Island | LEXA Lifestyle',
    description: 'Yas Island\'s trusted smart home partner. Premium automation for Yas Acres, West Yas, and Yas Bay properties.',
    url: 'https://lexalifestyle.com/abu-dhabi/yas-island-villa-automation',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/abu-dhabi/yas-island-villa-automation',
  },
})
}

export default function YasIslandPage() {
  return <YasIslandClient />
}

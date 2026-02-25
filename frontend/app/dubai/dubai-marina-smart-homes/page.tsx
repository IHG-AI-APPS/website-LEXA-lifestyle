import { Metadata } from 'next'
import DubaiMarinaClient from './DubaiMarinaClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_dubai_dubai_marina_smart_homes', {
  title: 'Smart Home Automation Dubai Marina | High-Rise Luxury | LEXA',
  description: 'Expert smart home automation for Dubai Marina towers. Premium lighting, audio, and security systems for high-rise luxury living. Control4 & Crestron specialists.',
  keywords: 'smart home Dubai Marina, home automation Dubai Marina, smart apartment Marina, high-rise automation Dubai, Marina smart living',
  openGraph: {
    title: 'Smart Home Automation Dubai Marina | LEXA Lifestyle',
    description: 'Premium smart home solutions for Dubai Marina high-rise living.',
    url: 'https://lexalifestyle.com/dubai/dubai-marina-smart-homes',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/dubai/dubai-marina-smart-homes',
  },
})
}

export default function DubaiMarinaPage() {
  return <DubaiMarinaClient />
}

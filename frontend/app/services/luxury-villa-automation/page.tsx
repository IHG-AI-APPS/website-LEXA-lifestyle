import { Metadata } from 'next'
import LuxuryVillaClient from './LuxuryVillaClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_luxury_villa_automation', {
  title: 'Luxury Villa Smart Home Automation Dubai | Control4 & Crestron | LEXA',
  description: 'Dubai\'s premier luxury villa automation specialists. Control4, Crestron, Lutron for Emirates Hills, Palm Jumeirah villas. Lighting, climate, security, AV integration. 15+ years experience.',
  keywords: 'luxury villa automation Dubai, smart home villa UAE, Control4 Dubai, Crestron villa, Emirates Hills smart home, Palm Jumeirah automation, high-end home automation, villa smart systems Dubai, luxury smart gadgets UAE, premium home technology',
  openGraph: {
    title: 'Luxury Villa Smart Home Automation Dubai',
    description: 'Dubai\'s leading luxury villa smart home integrators. Control4, Crestron, Lutron specialists.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/services/luxury-villa-automation',
  },
})
}

export default function LuxuryVillaPage() {
  return <LuxuryVillaClient />
}

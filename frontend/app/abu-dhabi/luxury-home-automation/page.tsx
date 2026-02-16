import { Metadata } from 'next'
import AbuDhabiLuxuryAutomationClient from './AbuDhabiClient'

export const metadata: Metadata = {
  title: 'Luxury Home Automation Abu Dhabi | Smart Villa Solutions | LEXA',
  description: 'Abu Dhabi\'s premier smart home automation company. Expert Control4 & Crestron integration for Saadiyat Island, Yas Island, Al Reem Island villas. 15+ years UAE experience.',
  keywords: 'smart home Abu Dhabi, home automation Abu Dhabi, Control4 Abu Dhabi, Crestron Abu Dhabi, villa automation Saadiyat, smart home Yas Island, luxury automation UAE, home theater Abu Dhabi',
  openGraph: {
    title: 'Luxury Home Automation Abu Dhabi | LEXA Lifestyle',
    description: 'Abu Dhabi\'s trusted smart home partner. Serving Saadiyat Island, Yas Island, Al Reem Island with premium automation solutions.',
    url: 'https://lexalifestyle.com/abu-dhabi/luxury-home-automation',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/abu-dhabi/luxury-home-automation',
  },
}

export default function AbuDhabiLuxuryAutomationPage() {
  return <AbuDhabiLuxuryAutomationClient />
}

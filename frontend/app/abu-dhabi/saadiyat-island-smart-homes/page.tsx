import { Metadata } from 'next'
import SaadiyatIslandClient from './SaadiyatIslandClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Saadiyat Island | Luxury Villa Solutions | LEXA',
  description: 'Saadiyat Island\'s trusted smart home automation experts. Premium Control4 & Crestron integration for cultural district villas, beachfront properties & luxury estates. Free consultation.',
  keywords: 'smart home Saadiyat Island, home automation Saadiyat, Control4 Saadiyat Island, villa automation Abu Dhabi, smart villa Saadiyat, luxury home technology, Louvre district smart homes',
  openGraph: {
    title: 'Smart Home Automation Saadiyat Island | LEXA Lifestyle',
    description: 'Premium smart home solutions for Saadiyat Island\'s most exclusive properties. Cultural district expertise.',
    url: 'https://lexalifestyle.com/abu-dhabi/saadiyat-island-smart-homes',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/abu-dhabi/saadiyat-island-smart-homes',
  },
}

export default function SaadiyatIslandPage() {
  return <SaadiyatIslandClient />
}

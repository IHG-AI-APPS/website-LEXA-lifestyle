import { Metadata } from 'next'
import SharjahClient from './SharjahClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Sharjah | Villa & Apartment Solutions | LEXA',
  description: 'Sharjah\'s trusted smart home automation company. Expert Control4 & Crestron integration for Al Zahia, Tilal City, Aljada villas. Professional installation & maintenance.',
  keywords: 'smart home Sharjah, home automation Sharjah, Control4 Sharjah, villa automation Sharjah, Al Zahia smart home, Tilal City automation',
  openGraph: {
    title: 'Smart Home Automation Sharjah | LEXA Lifestyle',
    description: 'Sharjah\'s premier smart home partner for villas and apartments.',
    url: 'https://lexalifestyle.com/sharjah/smart-home-automation',
  },
  alternates: { canonical: 'https://lexalifestyle.com/sharjah/smart-home-automation' },
}

export default function SharjahPage() { return <SharjahClient /> }

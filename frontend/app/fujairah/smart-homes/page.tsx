import { Metadata } from 'next'
import FujairahClient from './FujairahClient'

export const metadata: Metadata = {
  title: 'Smart Homes Fujairah | Home Automation Solutions | LEXA',
  description: 'Fujairah smart home automation. Coastal villa specialists serving Al Aqah, Dibba, Fujairah City. Mountain & beach property automation experts.',
  keywords: 'smart home Fujairah, home automation Fujairah, Al Aqah villa automation, Dibba smart home, East Coast UAE automation',
  openGraph: { title: 'Smart Homes Fujairah | LEXA', url: 'https://lexalifestyle.com/fujairah/smart-homes' },
  alternates: { canonical: 'https://lexalifestyle.com/fujairah/smart-homes' },
}

export default function FujairahPage() { return <FujairahClient /> }

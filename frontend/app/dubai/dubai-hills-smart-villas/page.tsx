import { Metadata } from 'next'
import DubaiHillsClient from './DubaiHillsClient'

export const metadata: Metadata = {
  title: 'Dubai Hills Smart Villas | Home Automation Solutions | LEXA',
  description: 'Dubai Hills Estate smart home automation. Family villas with intelligent living. Golf course community specialists with 10+ years experience.',
  keywords: 'smart home Dubai Hills, villa automation Dubai Hills Estate, Control4 Dubai Hills, family smart home Dubai',
  openGraph: { title: 'Dubai Hills Smart Villas | LEXA', url: 'https://lexalifestyle.com/dubai/dubai-hills-smart-villas' },
  alternates: { canonical: 'https://lexalifestyle.com/dubai/dubai-hills-smart-villas' },
}

export default function DubaiHillsPage() { return <DubaiHillsClient /> }

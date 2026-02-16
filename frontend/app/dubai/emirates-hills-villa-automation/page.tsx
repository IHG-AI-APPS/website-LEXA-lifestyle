import { Metadata } from 'next'
import EmiratesHillsClient from './EmiratesHillsClient'

export const metadata: Metadata = {
  title: 'Emirates Hills Villa Automation | Smart Home Solutions | LEXA',
  description: 'Emirates Hills smart home specialists. Luxury villa automation with Control4, Crestron, Lutron. Golf course views with intelligent living. 15+ years Dubai experience.',
  keywords: 'smart home Emirates Hills, villa automation Emirates Hills, Control4 Emirates Hills, Crestron Dubai, luxury home automation',
  openGraph: {
    title: 'Emirates Hills Villa Automation | LEXA Lifestyle',
    description: 'Premium smart home solutions for Emirates Hills luxury villas.',
    url: 'https://lexalifestyle.com/dubai/emirates-hills-villa-automation',
  },
  alternates: { canonical: 'https://lexalifestyle.com/dubai/emirates-hills-villa-automation' },
}

export default function EmiratesHillsPage() {
  return <EmiratesHillsClient />
}

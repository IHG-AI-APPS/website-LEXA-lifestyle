import { Metadata } from 'next'
import DubaiHillsClient from './DubaiHillsClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_dubai_dubai_hills_smart_villas', {
  title: 'Dubai Hills Smart Villas | Home Automation Solutions | LEXA',
  description: 'Dubai Hills Estate smart home automation. Family villas with intelligent living. Golf course community specialists with 10+ years experience.',
  keywords: 'smart home Dubai Hills, villa automation Dubai Hills Estate, Control4 Dubai Hills, family smart home Dubai',
  openGraph: { title: 'Dubai Hills Smart Villas | LEXA', url: 'https://lexalifestyle.com/dubai/dubai-hills-smart-villas' },
  alternates: { canonical: 'https://lexalifestyle.com/dubai/dubai-hills-smart-villas' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function DubaiHillsPage() { return <DubaiHillsClient /> }

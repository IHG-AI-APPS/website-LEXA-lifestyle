import { Metadata } from 'next'
import FujairahClient from './FujairahClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_fujairah_smart_homes', {
  title: 'Smart Homes Fujairah | Home Automation Solutions | LEXA',
  description: 'Fujairah smart home automation. Coastal villa specialists serving Al Aqah, Dibba, Fujairah City. Mountain & beach property automation experts.',
  keywords: 'smart home Fujairah, home automation Fujairah, Al Aqah villa automation, Dibba smart home, East Coast UAE automation',
  openGraph: { title: 'Smart Homes Fujairah | LEXA', url: 'https://lexalifestyle.com/fujairah/smart-homes' },
  alternates: { canonical: 'https://lexalifestyle.com/fujairah/smart-homes' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function FujairahPage() { return <FujairahClient /> }

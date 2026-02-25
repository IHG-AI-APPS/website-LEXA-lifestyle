import { Metadata } from 'next'
import JeddahClient from './JeddahClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_saudi_arabia_jeddah_home_automation', {
  title: 'Home Automation Jeddah | LEXA - Red Sea Smart Living',
  description: 'Jeddah home automation experts. Obhur, Al Shati villas. Coastal solutions.',
  keywords: 'smart home Jeddah, home automation Jeddah',
})
}

export default function JeddahPage() {
  return <JeddahClient />
}

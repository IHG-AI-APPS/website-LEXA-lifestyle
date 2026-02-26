import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import SupportContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_support', {
    title: '24/7 Smart Home Support UAE | Emergency Automation Service Dubai',
    description: '24/7 emergency smart home support across UAE.',
    keywords: '24/7 smart home support UAE, emergency automation Dubai',
  })
}

export default function EmergencySupportPage() {
  return <SupportContent />
}

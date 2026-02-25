import { Metadata } from 'next'
import MuscatClient from './MuscatClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_oman_muscat_home_automation', {
  title: 'Home Automation Muscat | LEXA - Oman Smart Living',
  description: 'Muscat home automation experts. Al Mouj, Qurum, Shatti Al Qurum villas. Control4, Crestron for Oman luxury properties.',
  keywords: 'smart home Muscat, home automation Oman, Control4 Muscat, villa automation Oman',
})
}

export default function MuscatPage() {
  return <MuscatClient />
}

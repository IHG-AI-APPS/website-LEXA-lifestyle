import { Metadata } from 'next'
import NairobiClient from './NairobiClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_kenya_nairobi_home_automation', {
  title: 'Home Automation Nairobi | LEXA - Kenya Smart Living',
  description: 'Nairobi home automation experts. Karen, Runda, Westlands villas. Control4, Crestron for Kenya luxury properties.',
  keywords: 'smart home Nairobi, home automation Kenya, Control4 Nairobi, villa automation Kenya',
})
}

export default function NairobiPage() {
  return <NairobiClient />
}

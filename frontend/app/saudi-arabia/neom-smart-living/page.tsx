import { Metadata } from 'next'
import NEOMClient from './NEOMClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_saudi_arabia_neom_smart_living', {
  title: 'Smart Living NEOM | LEXA - Future City Automation',
  description: 'NEOM future city automation. THE LINE, Oxagon, Trojena integration.',
  keywords: 'smart home NEOM, NEOM automation, THE LINE',
})
}

export default function NEOMPage() {
  return <NEOMClient />
}

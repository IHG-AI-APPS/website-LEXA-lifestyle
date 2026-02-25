import { Metadata } from 'next'
import BeirutClient from './BeirutClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_lebanon_beirut_smart_homes', {
  title: 'Smart Home Automation Beirut | LEXA - Lebanon Luxury Living',
  description: 'Beirut smart home experts. Achrafieh, Verdun, Rabieh villas. Control4, Crestron for Lebanon luxury properties.',
  keywords: 'smart home Beirut, home automation Lebanon, Control4 Beirut, villa automation Lebanon',
})
}

export default function BeirutPage() {
  return <BeirutClient />
}

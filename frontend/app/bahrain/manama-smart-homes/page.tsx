import { Metadata } from 'next'
import ManamaClient from './ManamaClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_bahrain_manama_smart_homes', {
  title: 'Smart Home Automation Manama | LEXA - Bahrain Luxury Living',
  description: 'Manama smart home experts. Amwaj Islands, Seef, Riffa villas. Control4, Crestron for Bahrain luxury properties.',
  keywords: 'smart home Bahrain, home automation Manama, Control4 Bahrain, villa automation Bahrain',
})
}

export default function ManamaPage() {
  return <ManamaClient />
}

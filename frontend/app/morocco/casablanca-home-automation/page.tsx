import { Metadata } from 'next'
import CasablancaClient from './CasablancaClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_morocco_casablanca_home_automation', {
  title: 'Home Automation Casablanca | LEXA - Morocco Smart Living',
  description: 'Casablanca home automation experts. Anfa, Ain Diab, CIL villas. Control4, Crestron for Morocco luxury properties.',
  keywords: 'smart home Casablanca, home automation Morocco, Control4 Casablanca, villa automation Morocco',
})
}

export default function CasablancaPage() {
  return <CasablancaClient />
}

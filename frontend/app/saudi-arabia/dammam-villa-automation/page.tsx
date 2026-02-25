import { Metadata } from 'next'
import DammamClient from './DammamClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_saudi_arabia_dammam_villa_automation', {
  title: 'Villa Automation Dammam | LEXA - Eastern Province',
  description: 'Dammam, Al Khobar smart home experts. Eastern Province villas.',
  keywords: 'smart home Dammam, home automation Al Khobar',
})
}

export default function DammamPage() {
  return <DammamClient />
}

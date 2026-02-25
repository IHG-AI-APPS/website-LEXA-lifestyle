import { Metadata } from 'next'
import RAKClient from './RAKClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_ras_al_khaimah_villa_automation', {
  title: 'Villa Automation Ras Al Khaimah | Smart Home Solutions | LEXA',
  description: 'Ras Al Khaimah smart home specialists. Luxury villa automation for Al Hamra, Mina Al Arab, Al Marjan Island. Mountain & beach property experts.',
  keywords: 'smart home Ras Al Khaimah, RAK home automation, Al Hamra villa automation, Mina Al Arab smart home, Al Marjan Island automation',
  openGraph: { title: 'Villa Automation Ras Al Khaimah | LEXA', url: 'https://lexalifestyle.com/ras-al-khaimah/villa-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/ras-al-khaimah/villa-automation' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function RAKPage() { return <RAKClient /> }

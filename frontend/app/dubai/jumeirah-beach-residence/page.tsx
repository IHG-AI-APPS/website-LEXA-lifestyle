import { Metadata } from 'next'
import JBRClient from './JBRClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_dubai_jumeirah_beach_residence', {
  title: 'Smart Home Automation JBR Dubai | Beachfront Living | LEXA',
  description: 'Smart home automation for Jumeirah Beach Residence apartments. Expert audio, lighting & security systems for beachfront living. Premium Control4 solutions.',
  keywords: 'smart home JBR, home automation JBR Dubai, smart apartment JBR, beachfront smart home, JBR automation',
  openGraph: {
    title: 'Smart Home Automation JBR Dubai | LEXA Lifestyle',
    description: 'Premium smart home solutions for JBR beachfront properties.',
    url: 'https://lexalifestyle.com/dubai/jumeirah-beach-residence',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/dubai/jumeirah-beach-residence',
  },
})
}

export default function JBRPage() {
  return <JBRClient />
}

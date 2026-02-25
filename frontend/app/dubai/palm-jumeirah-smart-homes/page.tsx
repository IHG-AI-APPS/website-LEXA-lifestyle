import { Metadata } from 'next'
import PalmJumeirahClient from './PalmJumeirahClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_dubai_palm_jumeirah_smart_homes', {
  title: 'Smart Home Automation Palm Jumeirah | Luxury Villa Solutions | LEXA',
  description: 'Palm Jumeirah\'s premier smart home automation company. Expert Control4 & Crestron integration for signature villas, frond villas & apartments. 15+ years Dubai experience.',
  keywords: 'smart home Palm Jumeirah, home automation Palm Jumeirah, Control4 Palm Jumeirah, villa automation Dubai, smart villa Palm, luxury home technology Dubai',
  openGraph: {
    title: 'Smart Home Automation Palm Jumeirah | LEXA Lifestyle',
    description: 'Premium smart home solutions for Palm Jumeirah\'s most exclusive properties.',
    url: 'https://lexalifestyle.com/dubai/palm-jumeirah-smart-homes',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/dubai/palm-jumeirah-smart-homes',
  },
})
}

export default function PalmJumeirahPage() {
  return <PalmJumeirahClient />
}

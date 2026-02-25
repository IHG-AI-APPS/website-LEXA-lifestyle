import { Metadata } from 'next'
import SmartLightingClient from './SmartLightingClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_smart_lighting', {
  title: 'Smart Lighting Systems Dubai | Lutron & Ketra | LEXA',
  description: 'Dubai smart lighting specialists. Lutron RadioRA, Ketra, DALI systems. Circadian lighting, automated blinds, scene control for villas and penthouses. Human-centric lighting design.',
  keywords: 'smart lighting Dubai, Lutron Dubai, Ketra lighting UAE, automated blinds, circadian lighting, lighting control system, home lighting automation, dimmer systems Dubai, motorized shades',
  openGraph: {
    title: 'Smart Lighting Systems Dubai | Lutron & Ketra Specialists',
    description: 'Premium smart lighting and automated shade systems for Dubai homes.',
    type: 'website',
  },
  alternates: { canonical: 'https://lexalifestyle.com/services/smart-lighting' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function SmartLightingPage() {
  return <SmartLightingClient />
}

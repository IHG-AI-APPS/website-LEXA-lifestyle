import { Metadata } from 'next'
import HighEndAudioClient from './HighEndAudioClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_high_end_audio', {
  title: 'High-End Audio Systems Dubai & UAE | Premium HiFi Installation | LEXA',
  description: 'Dubai\'s premier high-end audio specialists. Bowers & Wilkins, McIntosh, Focal, KEF Reference, Bang & Olufsen installation. Luxury HiFi systems for villas, penthouses & yachts. Free consultation.',
  keywords: 'high end audio Dubai, premium HiFi UAE, Bowers Wilkins Dubai, McIntosh dealer UAE, luxury audio systems, audiophile installation Dubai, Bang Olufsen Dubai, KEF Reference UAE, Focal Utopia Dubai, high fidelity audio Emirates',
  openGraph: {
    title: 'High-End Audio Systems Dubai | Premium HiFi Installation',
    description: 'Dubai\'s leading high-end audio installers. Bowers & Wilkins, McIntosh, Focal specialists.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/services/high-end-audio',
  },
})
}

export default function HighEndAudioPage() {
  return <HighEndAudioClient />
}

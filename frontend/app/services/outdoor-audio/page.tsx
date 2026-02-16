import { Metadata } from 'next'
import OutdoorAudioClient from './OutdoorAudioClient'

export const metadata: Metadata = {
  title: 'Outdoor Audio Systems Dubai | Garden & Pool Speakers | LEXA',
  description: 'Dubai outdoor audio specialists. Weather-proof garden speakers, pool-side sound, terrace audio. Origin Acoustics, Sonance outdoor. Heat-resistant systems for UAE climate.',
  keywords: 'outdoor audio Dubai, garden speakers UAE, pool speakers Dubai, terrace sound system, weather proof speakers, outdoor entertainment Dubai, patio audio, landscape speakers UAE',
  openGraph: {
    title: 'Outdoor Audio Systems Dubai | Pool & Garden Sound',
    description: 'Weather-proof outdoor audio systems designed for Dubai climate.',
    type: 'website',
  },
  alternates: { canonical: 'https://lexalifestyle.com/services/outdoor-audio' },
}

export default function OutdoorAudioPage() {
  return <OutdoorAudioClient />
}

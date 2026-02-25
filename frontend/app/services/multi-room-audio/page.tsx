import { Metadata } from 'next'
import MultiRoomAudioClient from './MultiRoomAudioClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_multi_room_audio', {
  title: 'Multi-Room Audio Systems Dubai | Whole-Home Sound | LEXA',
  description: 'Dubai\'s multi-room audio specialists. Sonos, Bowers & Wilkins, Sonance, KEF whole-home audio. Distributed sound for villas, apartments & yachts. Invisible speakers, outdoor audio.',
  keywords: 'multi-room audio Dubai, whole home audio UAE, distributed audio system, Sonos installation Dubai, invisible speakers UAE, outdoor audio Dubai, multi-zone audio, wireless speakers villa, KEF Ci Dubai, Bowers Wilkins CI',
  openGraph: {
    title: 'Multi-Room Audio Systems Dubai | Whole-Home Sound',
    description: 'Dubai\'s leading multi-room audio installers. Sonos, Sonance, KEF whole-home solutions.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/services/multi-room-audio',
  },
})
}

export default function MultiRoomAudioPage() {
  return <MultiRoomAudioClient />
}

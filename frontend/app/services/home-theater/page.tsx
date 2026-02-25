import { Metadata } from 'next'
import HomeTheaterClient from './HomeTheaterClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_home_theater', {
  title: 'Home Theater Installation Dubai | Luxury Cinema Room Design | LEXA',
  description: 'Dubai\'s premier home theater designers. Dolby Atmos, IMAX Enhanced, 4K/8K laser projection. Custom cinema rooms for villas & penthouses. Sony, JBL Synthesis, Trinnov experts.',
  keywords: 'home theater Dubai, home cinema UAE, Dolby Atmos installation Dubai, private cinema room, luxury home theater Emirates, 4K projector Dubai, JBL Synthesis UAE, cinema room design, media room Dubai, Trinnov processor',
  openGraph: {
    title: 'Home Theater Installation Dubai | Private Cinema Design',
    description: 'Dubai\'s leading home theater installers. Dolby Atmos, 4K laser projection, acoustic design.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/services/home-theater',
  },
})
}

export default function HomeTheaterPage() {
  return <HomeTheaterClient />
}

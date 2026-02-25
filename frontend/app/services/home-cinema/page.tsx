import { Metadata } from 'next'
import HomeCinemaClient from './HomeCinemaClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_home_cinema', {
  title: 'Home Cinema Design Dubai | Private Cinema Room Installation | LEXA',
  description: 'Custom home cinema design Dubai. Dedicated cinema rooms, media lounges, screening rooms. Acoustic design, premium seating, 4K projection. Emirates Hills, Palm Jumeirah specialists.',
  keywords: 'home cinema Dubai, private cinema room UAE, cinema room design, dedicated theater room, screening room Dubai, media room installation, cinema seating Dubai, acoustic cinema design, luxury cinema room Emirates',
  openGraph: {
    title: 'Home Cinema Design Dubai | Private Screening Rooms',
    description: 'Custom home cinema design and installation for Dubai luxury homes.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: 'https://lexalifestyle.com/services/home-cinema',
  },
})
}

export default function HomeCinemaPage() {
  return <HomeCinemaClient />
}

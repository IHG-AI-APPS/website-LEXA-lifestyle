import { Metadata } from 'next'
import SharjahGeoClient from './SharjahGeoClient'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_uae_sharjah', {
    title: 'Smart Home Automation Sharjah | Home Automation Company UAE | LEXA',
    description: 'Leading smart home automation in Sharjah. Serving Al Majaz, Al Qasimia, Muwailih, and all Sharjah communities. Official Control4 & Crestron dealer.',
    keywords: ['smart home Sharjah', 'home automation Sharjah', 'Control4 Sharjah', 'villa automation Sharjah'],
    alternates: {
      canonical: 'https://lexalifestyle.com/uae/sharjah'
    }
  })
}

export default function SharjahPage() {
  return (
    <>
      <CmsReg />
      <SharjahGeoClient />
    </>
  )
}

import { Metadata } from 'next'
import AbuDhabiGeoClient from './AbuDhabiGeoClient'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_uae_abu_dhabi', {
    title: 'Smart Home Automation Abu Dhabi | Home Automation Company | LEXA',
    description: 'Abu Dhabi\'s premier smart home automation company. Serving Saadiyat Island, Yas Island, Al Reem, Khalifa City. Control4 & Crestron dealer.',
    keywords: ['smart home Abu Dhabi', 'home automation Abu Dhabi', 'Control4 Abu Dhabi', 'villa automation Abu Dhabi'],
    alternates: {
      canonical: 'https://lexalifestyle.com/uae/abu-dhabi'
    }
  })
}

export default function AbuDhabiPage() {
  return (
    <>
      <CmsReg />
      <AbuDhabiGeoClient />
    </>
  )
}

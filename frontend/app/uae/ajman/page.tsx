import { Metadata } from 'next'
import AjmanGeoClient from './AjmanGeoClient'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_uae_ajman', {
    title: 'Smart Home Automation Ajman | Home Automation Company UAE | LEXA',
    description: 'Expert smart home automation in Ajman. Serving Al Nuaimiya, Al Rashidiya, and all Ajman communities. Professional Control4 & Crestron integration.',
    keywords: ['smart home Ajman', 'home automation Ajman', 'Control4 Ajman', 'villa automation Ajman'],
    alternates: {
      canonical: 'https://lexalifestyle.com/uae/ajman'
    }
  })
}

export default function AjmanPage() {
  return (
    <>
      <CmsReg />
      <AjmanGeoClient />
    </>
  )
}

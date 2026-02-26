import { Metadata } from 'next'
import DubaiGeoClient from './DubaiGeoClient'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_uae_dubai', {
    title: 'Smart Home Automation Dubai | #1 Home Automation Company | LEXA',
    description: 'Dubai\'s leading smart home automation company. Serving Emirates Hills, Downtown, Palm Jumeirah, Marina, Arabian Ranches. Control4 & Crestron dealer. 300+ Dubai villas automated.',
    keywords: ['smart home Dubai', 'home automation Dubai', 'Control4 Dubai', 'Crestron Dubai', 'villa automation Dubai'],
    alternates: {
      canonical: 'https://lexalifestyle.com/uae/dubai'
    }
  })
}

export default function DubaiPage() {
  return (
    <>
      <CmsReg />
      <DubaiGeoClient />
    </>
  )
}

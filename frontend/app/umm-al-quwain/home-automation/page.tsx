import { Metadata } from 'next'
import UAQClient from './UAQClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_umm_al_quwain_home_automation', {
  title: 'Home Automation Umm Al Quwain | Smart Home Solutions | LEXA',
  description: 'Umm Al Quwain smart home automation. Affordable solutions for UAQ Marina, Al Salamah, and residential areas. Professional installation.',
  keywords: 'smart home Umm Al Quwain, UAQ home automation, UAQ Marina smart home, affordable automation UAE',
  openGraph: { title: 'Home Automation Umm Al Quwain | LEXA', url: 'https://lexalifestyle.com/umm-al-quwain/home-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/umm-al-quwain/home-automation' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function UAQPage() { return <UAQClient /> }

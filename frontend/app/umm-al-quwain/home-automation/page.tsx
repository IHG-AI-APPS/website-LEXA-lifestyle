import { Metadata } from 'next'
import UAQClient from './UAQClient'

export const metadata: Metadata = {
  title: 'Home Automation Umm Al Quwain | Smart Home Solutions | LEXA',
  description: 'Umm Al Quwain smart home automation. Affordable solutions for UAQ Marina, Al Salamah, and residential areas. Professional installation.',
  keywords: 'smart home Umm Al Quwain, UAQ home automation, UAQ Marina smart home, affordable automation UAE',
  openGraph: { title: 'Home Automation Umm Al Quwain | LEXA', url: 'https://lexalifestyle.com/umm-al-quwain/home-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/umm-al-quwain/home-automation' },
}

export default function UAQPage() { return <UAQClient /> }

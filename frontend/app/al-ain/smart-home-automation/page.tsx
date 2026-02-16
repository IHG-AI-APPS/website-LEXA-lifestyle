import { Metadata } from 'next'
import AlAinClient from './AlAinClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Al Ain | Garden City Solutions | LEXA',
  description: 'Al Ain smart home automation experts. Serving Al Ain Oasis, Zakher, Al Jimi, Al Muwaiji. The Garden City\'s trusted home technology partner.',
  keywords: 'smart home Al Ain, home automation Al Ain, Al Ain Oasis smart home, Zakher villa automation, Garden City UAE smart living',
  openGraph: {
    title: 'Smart Home Automation Al Ain | LEXA Lifestyle',
    description: 'Al Ain\'s trusted smart home partner. Premium automation for the Garden City.',
    url: 'https://lexalifestyle.com/al-ain/smart-home-automation',
  },
  alternates: { canonical: 'https://lexalifestyle.com/al-ain/smart-home-automation' },
}

export default function AlAinPage() { return <AlAinClient /> }

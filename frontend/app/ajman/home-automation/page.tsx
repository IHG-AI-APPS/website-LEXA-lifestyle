import { Metadata } from 'next'
import AjmanClient from './AjmanClient'

export const metadata: Metadata = {
  title: 'Home Automation Ajman | Smart Home Solutions | LEXA',
  description: 'Ajman smart home automation experts. Affordable luxury automation for Al Zorah, Ajman Corniche, Emirates City. Professional installation & support.',
  keywords: 'smart home Ajman, home automation Ajman, Al Zorah smart home, Ajman Corniche automation, affordable smart home UAE',
  openGraph: { title: 'Home Automation Ajman | LEXA', url: 'https://lexalifestyle.com/ajman/home-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/ajman/home-automation' },
}

export default function AjmanPage() { return <AjmanClient /> }

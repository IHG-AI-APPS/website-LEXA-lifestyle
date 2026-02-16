import { Metadata } from 'next'
import DohaClient from './DohaClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Doha | LEXA - Qatar Luxury Living',
  description: 'Doha premier smart home automation. The Pearl, West Bay, Lusail villas. Control4, Crestron experts for Qatar luxury properties.',
  keywords: 'smart home Doha, home automation Qatar, Control4 Doha, villa automation Qatar',
}

export default function DohaPage() {
  return <DohaClient />
}

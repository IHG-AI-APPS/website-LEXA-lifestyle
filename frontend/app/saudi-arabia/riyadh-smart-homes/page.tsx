import { Metadata } from 'next'
import RiyadhClient from './RiyadhClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Riyadh | LEXA - Vision 2030 Ready',
  description: 'Riyadh premier smart home automation. Al Malqa, Al Nakheel, Hittin villas. Vision 2030 smart living.',
  keywords: 'smart home Riyadh, home automation Riyadh, Control4 Riyadh',
}

export default function RiyadhSmartHomesPage() {
  return <RiyadhClient />
}

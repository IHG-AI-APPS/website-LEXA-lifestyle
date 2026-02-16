import { Metadata } from 'next'
import ManamaClient from './ManamaClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Manama | LEXA - Bahrain Luxury Living',
  description: 'Manama smart home experts. Amwaj Islands, Seef, Riffa villas. Control4, Crestron for Bahrain luxury properties.',
  keywords: 'smart home Bahrain, home automation Manama, Control4 Bahrain, villa automation Bahrain',
}

export default function ManamaPage() {
  return <ManamaClient />
}

import { Metadata } from 'next'
import LagosClient from './LagosClient'

export const metadata: Metadata = {
  title: 'Smart Home Automation Lagos | LEXA - Nigeria Luxury Living',
  description: 'Lagos smart home experts. Ikoyi, Victoria Island, Lekki villas. Control4, Crestron for Nigeria luxury properties.',
  keywords: 'smart home Lagos, home automation Nigeria, Control4 Lagos, villa automation Nigeria',
}

export default function LagosPage() {
  return <LagosClient />
}

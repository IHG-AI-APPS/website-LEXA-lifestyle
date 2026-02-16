import { Metadata } from 'next'
import NEOMClient from './NEOMClient'

export const metadata: Metadata = {
  title: 'Smart Living NEOM | LEXA - Future City Automation',
  description: 'NEOM future city automation. THE LINE, Oxagon, Trojena integration.',
  keywords: 'smart home NEOM, NEOM automation, THE LINE',
}

export default function NEOMPage() {
  return <NEOMClient />
}

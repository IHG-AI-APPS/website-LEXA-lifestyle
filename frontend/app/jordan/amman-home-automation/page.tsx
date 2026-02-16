import { Metadata } from 'next'
import AmmanClient from './AmmanClient'

export const metadata: Metadata = {
  title: 'Home Automation Amman | LEXA - Jordan Smart Living',
  description: 'Amman home automation experts. Abdoun, Dabouq, Sweifieh villas. Control4, Crestron for Jordan luxury properties.',
  keywords: 'smart home Amman, home automation Jordan, Control4 Amman, villa automation Jordan',
}

export default function AmmanPage() {
  return <AmmanClient />
}

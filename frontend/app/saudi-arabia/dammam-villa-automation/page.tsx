import { Metadata } from 'next'
import DammamClient from './DammamClient'

export const metadata: Metadata = {
  title: 'Villa Automation Dammam | LEXA - Eastern Province',
  description: 'Dammam, Al Khobar smart home experts. Eastern Province villas.',
  keywords: 'smart home Dammam, home automation Al Khobar',
}

export default function DammamPage() {
  return <DammamClient />
}

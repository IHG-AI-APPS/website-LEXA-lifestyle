import { Metadata } from 'next'
import NairobiClient from './NairobiClient'

export const metadata: Metadata = {
  title: 'Home Automation Nairobi | LEXA - Kenya Smart Living',
  description: 'Nairobi home automation experts. Karen, Runda, Westlands villas. Control4, Crestron for Kenya luxury properties.',
  keywords: 'smart home Nairobi, home automation Kenya, Control4 Nairobi, villa automation Kenya',
}

export default function NairobiPage() {
  return <NairobiClient />
}

import { Metadata } from 'next'
import JeddahClient from './JeddahClient'

export const metadata: Metadata = {
  title: 'Home Automation Jeddah | LEXA - Red Sea Smart Living',
  description: 'Jeddah home automation experts. Obhur, Al Shati villas. Coastal solutions.',
  keywords: 'smart home Jeddah, home automation Jeddah',
}

export default function JeddahPage() {
  return <JeddahClient />
}

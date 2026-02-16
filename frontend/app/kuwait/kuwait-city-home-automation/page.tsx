import { Metadata } from 'next'
import KuwaitClient from './KuwaitClient'

export const metadata: Metadata = {
  title: 'Home Automation Kuwait City | LEXA - Kuwait Smart Living',
  description: 'Kuwait City premier home automation. Salmiya, Mishref, Sabah Al Salem villas. Control4, Crestron experts for Kuwait luxury homes.',
  keywords: 'smart home Kuwait, home automation Kuwait City, Control4 Kuwait, villa automation Kuwait',
}

export default function KuwaitPage() {
  return <KuwaitClient />
}

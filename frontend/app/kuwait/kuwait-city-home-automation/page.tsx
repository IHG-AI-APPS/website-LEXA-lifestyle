import { Metadata } from 'next'
import KuwaitClient from './KuwaitClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_kuwait_kuwait_city_home_automation', {
  title: 'Home Automation Kuwait City | LEXA - Kuwait Smart Living',
  description: 'Kuwait City premier home automation. Salmiya, Mishref, Sabah Al Salem villas. Control4, Crestron experts for Kuwait luxury homes.',
  keywords: 'smart home Kuwait, home automation Kuwait City, Control4 Kuwait, villa automation Kuwait',
})
}

export default function KuwaitPage() {
  return <KuwaitClient />
}

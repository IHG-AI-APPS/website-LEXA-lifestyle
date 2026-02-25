import { Metadata } from 'next'
import DowntownDubaiClient from './DowntownDubaiClient'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_dubai_downtown_dubai_penthouse_automation', {
  title: 'Downtown Dubai Penthouse Automation | Smart Home Solutions | LEXA',
  description: 'Downtown Dubai smart home experts. Penthouse & apartment automation near Burj Khalifa. High-rise specialists with 15+ years experience.',
  keywords: 'smart home Downtown Dubai, penthouse automation Dubai, Burj Khalifa smart home, Control4 Downtown Dubai',
  openGraph: { title: 'Downtown Dubai Penthouse Automation | LEXA', url: 'https://lexalifestyle.com/dubai/downtown-dubai-penthouse-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/dubai/downtown-dubai-penthouse-automation' },
})
}
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export default function DowntownDubaiPage() { return <DowntownDubaiClient /> }

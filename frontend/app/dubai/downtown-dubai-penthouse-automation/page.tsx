import { Metadata } from 'next'
import DowntownDubaiClient from './DowntownDubaiClient'

export const metadata: Metadata = {
  title: 'Downtown Dubai Penthouse Automation | Smart Home Solutions | LEXA',
  description: 'Downtown Dubai smart home experts. Penthouse & apartment automation near Burj Khalifa. High-rise specialists with 15+ years experience.',
  keywords: 'smart home Downtown Dubai, penthouse automation Dubai, Burj Khalifa smart home, Control4 Downtown Dubai',
  openGraph: { title: 'Downtown Dubai Penthouse Automation | LEXA', url: 'https://lexalifestyle.com/dubai/downtown-dubai-penthouse-automation' },
  alternates: { canonical: 'https://lexalifestyle.com/dubai/downtown-dubai-penthouse-automation' },
}

export default function DowntownDubaiPage() { return <DowntownDubaiClient /> }

import { Metadata } from 'next'
import CairoClient from './CairoClient'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_egypt_cairo_smart_homes', {
  title: 'Smart Home Automation Cairo | LEXA - Egypt Luxury Living',
  description: 'Cairo premier smart home automation. New Cairo, Maadi, Zamalek villas. Control4, Crestron experts for Egypt luxury properties.',
  keywords: 'smart home Cairo, home automation Egypt, Control4 Cairo, villa automation Egypt',
})
}

export default function CairoPage() {
  return <CairoClient />
}

import type { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import CareersContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_careers', {
    title: 'Careers | LEXA Lifestyle',
    description: 'Join the LEXA Lifestyle team and shape the future of smart living in Dubai'
  })
}

export default function CareersPage() {
  return <CareersContent />
}

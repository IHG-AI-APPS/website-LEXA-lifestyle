import type { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import PrivacyContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_privacy', {
    title: 'Privacy Policy | LEXA Lifestyle',
    description: 'Privacy policy and data protection at LEXA Lifestyle'
  })
}

export default function PrivacyPage() {
  return <PrivacyContent />
}

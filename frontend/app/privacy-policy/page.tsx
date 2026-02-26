import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import PrivacyPolicyContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_privacy_policy', {
    title: 'Privacy Policy | LEXA Lifestyle',
    description: 'LEXA Lifestyle Privacy Policy - How we collect, use, and protect your personal information.',
    robots: 'index, follow',
  })
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}

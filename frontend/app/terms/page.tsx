import type { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import TermsContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_terms', {
    title: 'Terms & Conditions | LEXA Lifestyle',
    description: 'Terms and conditions for LEXA Lifestyle services and products'
  })
}

export default function TermsPage() {
  return <TermsContent />
}

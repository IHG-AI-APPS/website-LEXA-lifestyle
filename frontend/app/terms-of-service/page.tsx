import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import TermsOfServiceContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_terms_of_service', {
    title: 'Terms of Service | LEXA Lifestyle',
    description: 'LEXA Lifestyle Terms of Service - Terms and conditions for using our smart home automation services.',
    robots: 'index, follow',
  })
}

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />
}

import type { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import WarrantyContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_warranty', {
    title: 'Warranty & Service Policy | LEXA Lifestyle',
    description: 'Warranty terms and service policies for LEXA Lifestyle products and installations',
  })
}

export default function WarrantyPage() {
  return <WarrantyContent />
}

import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import DeveloperToolkitContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_developer_toolkit', {
    title: 'Developer Partner Toolkit | LEXA Lifestyle',
    description: 'Exclusive resources for real estate developers. Smart-ready certification, marketing materials, and technical documentation.',
  })
}

export default function DeveloperToolkitPage() {
  return <DeveloperToolkitContent />
}

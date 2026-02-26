import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import MediaContent from './Content'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_media', {
    title: 'Media Gallery | LEXA Lifestyle',
    description: 'Watch our smart home automation projects, client testimonials, and product demonstrations.',
  })
}

export default function MediaGalleryPage() {
  return <MediaContent />
}

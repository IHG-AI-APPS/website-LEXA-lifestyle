import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { generateArticleSchema } from '@/lib/seo'
import CmsReg from './CmsReg'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_blog', {
  title: 'Smart Home Automation Guide Dubai 2025 | Complete Installation Guide',
  description: 'Ultimate guide to smart home automation in Dubai. Learn about Control4, Crestron, costs, installation process, and ROI. Expert insights from 500+ Dubai villa projects.',
  keywords: ['smart home guide Dubai', 'home automation tutorial', 'Control4 installation', 'Dubai smart home cost'],
  alternates: {
    canonical: 'https://brands-fix.preview.emergentagent.com/blog/smart-home-guide-dubai-2025'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
  }
})
}

const articleData = {
  title: 'The Complete Smart Home Automation Guide for Dubai Homeowners 2025',
  description: 'Everything you need to know about smart home automation in Dubai, from choosing the right system to installation and maintenance.',
  slug: 'smart-home-guide-dubai-2025',
  publishDate: '2025-01-15',
  modifiedDate: '2025-02-06',
  author: 'LEXA Lifestyle Experts',
  image: 'https://brands-fix.preview.emergentagent.com/blog-smart-home.jpg',
  category: 'Smart Home Guides'
}

export default function BlogArticlePage() {
  const schema = generateArticleSchema(articleData)

  return (
        <>
      <CmsReg />
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gradient-to-br from-black to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E8DCC8] mb-6 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                January 15, 2025
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {articleData.author}
              </span>
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                {articleData.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{articleData.title}</h1>
            <p className="text-xl text-gray-300">{articleData.description}</p>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              With over 500 completed projects across Dubai, Abu Dhabi, and the UAE, LEXA Lifestyle shares expert insights on smart home automation in 2025.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-4">Understanding Smart Home Technology</h2>
            <p>
              Smart home automation has evolved from a luxury feature to an essential component of modern Dubai properties. Today&apos;s systems offer unprecedented control, energy efficiency, and security - all crucial factors in the UAE market.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-4">Choosing the Right System</h2>
            <p>
              The three main platforms dominating Dubai&apos;s smart home market are Control4, Crestron, and KNX. Each has distinct advantages depending on your property type, budget, and requirements.
            </p>
            
            {/* Additional article content would go here */}
            
            <div className="mt-12 p-8 bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Get Expert Guidance</h3>
              <p className="text-gray-300 mb-6">
                Schedule a consultation with LEXA&apos;s smart home experts to discuss your Dubai property automation
              </p>
              <Link href="/contact" className="inline-block px-8 py-3 bg-[#E8DCC8] text-black font-semibold rounded-lg hover:bg-[#d4c8b4] transition">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
    </>
  )
}

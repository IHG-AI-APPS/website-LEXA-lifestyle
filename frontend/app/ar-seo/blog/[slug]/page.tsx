import { Metadata } from 'next'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { Phone, Mail, MapPin, CheckCircle, ArrowLeft, Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import CmsReg from './CmsReg'

interface ArabicPageData {
  slug: string
  title: string
  meta_title: string
  meta_description: string
  meta_keywords: string[]
  canonical_url: string
  english_alternate_url?: string
  page_type: string
  hero_title: string
  hero_subtitle: string
  hero_description?: string
  content_sections: any[]
  cta_text?: string
  cta_url?: string
  published: boolean
}

async function getArabicPage(slug: string): Promise<ArabicPageData | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const response = await fetch(`${backendUrl}/api/admin/arabic-pages/public/${slug}`, {
      cache: 'no-store' // For now, disable caching to always get fresh data
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching Arabic page:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getArabicPage(`blog/${params.slug}`)
  
  if (!page) {
    return {
      title: 'Page Not Found'
    }
  }
  
  const fallback: Metadata = {
    title: page.meta_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
    alternates: {
      canonical: page.canonical_url,
      ...(page.english_alternate_url && {
        languages: {
          'en-AE': page.english_alternate_url,
          'ar-AE': page.canonical_url
        }
      })
    }
  }
  
  return generateCmsMetadata(`seo_ar_blog_${params.slug.replace(/-/g, '_')}`, fallback)
}

export default async function DynamicArabicPage({ params }: { params: { slug: string } }) {
  const page = await getArabicPage(`blog/${params.slug}`)
  
  if (!page || !page.published) {
    notFound()
  }
  
  const isBlogPost = page.page_type === 'blog'
  
  return (
        <>
      <CmsReg />
    <div dir="rtl" lang="ar" className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      {/* Simple Header */}
      <header className="border-b py-4 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <Link href="/">
            <SafeImage src="https://files.ihgbrands.com/lexa/site/lexa-black.webp" alt="LEXA Lifestyle" width={120} height={48} className="h-10 md:h-12 w-auto dark:invert" style={{ width: 'auto', height: 'auto' }} />
          </Link>
          <div className="flex gap-4 items-center">
            {page.english_alternate_url && (
              <a href={page.english_alternate_url} className="text-sm text-gray-600 dark:text-zinc-500 hover:text-gray-900 dark:text-white flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                English
              </a>
            )}
            <span className="text-sm font-bold text-gray-900 dark:text-white">العربية</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 text-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8DCC8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8DCC8] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          {isBlogPost && (
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString('ar-AE')}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                فريق LEXA Lifestyle
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {page.hero_title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            {page.hero_subtitle}
          </p>
          {page.hero_description && (
            <p className="text-base md:text-lg mb-8 text-gray-400">
              {page.hero_description}
            </p>
          )}
          
          {!isBlogPost && page.cta_text && page.cta_url && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={page.cta_url} 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E8DCC8] text-black font-bold rounded-lg hover:bg-[#d4c8b4] transition text-lg"
              >
                {page.cta_text}
              </a>
              <a 
                href="tel:+971426704270" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition text-lg"
              >
                <Phone className="ml-2 h-5 w-5" />
                اتصل الآن
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Content Sections */}
      {page.content_sections && page.content_sections.length > 0 && (
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {page.content_sections.map((section, index) => (
              <div key={index} className="mb-12">
                {section.type === 'stats' && section.stats && (
                  <div className="bg-gray-50 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                      {section.stats.map((stat: any, idx: number) => (
                        <div key={idx}>
                          <div className="text-5xl font-bold text-[#E8DCC8] mb-2">{stat.value}</div>
                          <div className="text-gray-700 dark:text-zinc-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {section.type === 'text' && (
                  <article className="text-right">
                    {section.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">{section.title}</h2>
                    )}
                    {section.content && (
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-zinc-400">{section.content}</p>
                    )}
                  </article>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      {!isBlogPost && (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لتحويل منزلك إلى منزل ذكي؟
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              احجز استشارة مجانية مع خبرائنا اليوم واحصل على عرض أسعار مخصص لمنزلك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E8DCC8] text-black font-bold rounded-lg hover:bg-[#d4c8b4] transition text-lg"
              >
                احجز الآن
              </a>
              <a 
                href="https://wa.me/971426704270" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white font-bold rounded-lg hover:bg-white hover:text-black transition text-lg"
              >
                واتساب
              </a>
              <a 
                href="tel:+971426704270" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white font-bold rounded-lg hover:bg-white hover:text-black transition text-lg"
              >
                <Phone className="ml-2 h-5 w-5" />
                اتصل: 470-670-42-971+
              </a>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:sales@lexalifestyle.com" className="hover:text-white">sales@lexalifestyle.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Al Quoz 1, Sheikh Zayed Road, Dubai</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-gray-600 dark:text-zinc-500">© 2025 LEXA Lifestyle - Dubai, UAE</p>
          <div className="flex gap-4 justify-center text-sm">
            <a href="/" className="text-[#E8DCC8] hover:underline flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              View English Site
            </a>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

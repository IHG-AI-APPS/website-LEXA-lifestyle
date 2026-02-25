import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSolution, getSolutions, getProjects } from '@/lib/api'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import SolutionClient from './SolutionClient'
import CmsReg from './CmsReg'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const solution = await getSolution(params.slug)
    
    const fallback: Metadata = {
      title: solution.meta_description 
        ? `${solution.title} | LEXA Lifestyle` 
        : `${solution.title} - ${solution.description} | LEXA Lifestyle`,
      description: solution.meta_description || solution.description,
      keywords: solution.tags.join(', '),
      openGraph: {
        title: solution.title,
        description: solution.meta_description || solution.description,
        images: [solution.image],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: solution.title,
        description: solution.meta_description || solution.description,
        images: [solution.image],
      },
    }

    return generateCmsMetadata(`seo_solutions_${params.slug.replace(/-/g, '_')}`, fallback)
  } catch (error) {
    return {
      title: 'Solution Not Found | LEXA Lifestyle',
      description: 'The solution you are looking for could not be found.',
    }
  }
}

// Generate static params for all solutions (optional, for static generation)
export async function generateStaticParams() {
  try {
    const solutions = await getSolutions()
    return solutions.map((solution) => ({
      slug: solution.slug,
    }))
  } catch (error) {
    return []
  }
}

// Generate FAQ Schema for Google Rich Results
function generateFAQSchema(solution: any) {
  if (!solution.faqs || solution.faqs.length === 0) return null
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": solution.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Generate Service Schema for Google Rich Results
function generateServiceSchema(solution: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": solution.title,
    "name": `${solution.title} - LEXA Lifestyle`,
    "description": solution.meta_description || solution.description,
    "provider": {
      "@type": "Organization",
      "name": "LEXA Lifestyle",
      "url": "https://lexalifestyle.com",
      "logo": "https://lexalifestyle.com/lexa-logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "image": solution.image
  }
}

// Main Server Component
export default async function SolutionPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch solution data
    const solution = await getSolution(params.slug)
    
    // Fetch related projects
    const allProjects = await getProjects()
    const relatedProjects = allProjects
      .filter(project => 
        project.systems.some(system => 
          system.toLowerCase().includes(solution.title.split(' ')[0].toLowerCase())
        )
      )
      .slice(0, 3)
    
    // Fetch other solutions
    const allSolutions = await getSolutions()
    const otherSolutions = allSolutions
      .filter(s => s.slug !== params.slug)
      .slice(0, 4)
    
    // Generate structured data
    const faqSchema = generateFAQSchema(solution)
    const serviceSchema = generateServiceSchema(solution)
    
    return (
            <>
      <CmsReg />
      <>
        {/* FAQ Schema.org Structured Data */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        
        {/* Service Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        
        <SolutionClient
          solution={solution}
          relatedProjects={relatedProjects}
          otherSolutions={otherSolutions}
        />
      </>
      </>
    )
  } catch (error) {
    console.error('Error loading solution:', error)
    notFound()
  }
}

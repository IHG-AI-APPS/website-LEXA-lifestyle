import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSolution, getSolutions, getProjects } from '@/lib/api'
import SolutionClient from './SolutionClient'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const solution = await getSolution(params.slug)
    
    return {
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
    
    return (
      <SolutionClient
        solution={solution}
        relatedProjects={relatedProjects}
        otherSolutions={otherSolutions}
      />
    )
  } catch (error) {
    console.error('Error loading solution:', error)
    notFound()
  }
}

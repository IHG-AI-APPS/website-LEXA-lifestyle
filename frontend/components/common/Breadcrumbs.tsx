'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/seo'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show on homepage
  if (pathname === '/') return null
  
  // Generate breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbItems = [
    { name: 'Home', url: 'https://smart-builder-launch.preview.emergentagent.com' }
  ]
  
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbItems.push({
      name,
      url: `https://smart-builder-launch.preview.emergentagent.com${currentPath}`
    })
  })
  
  const schema = generateBreadcrumbSchema(breadcrumbItems)
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="flex items-center text-gray-600 hover:text-[#E8DCC8] transition">
                <Home className="h-4 w-4" />
              </Link>
            </li>
            {pathSegments.map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 1).join('/')}`
              const name = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              const isLast = index === pathSegments.length - 1
              
              return (
                <li key={path} className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  {isLast ? (
                    <span className="text-[#E8DCC8] font-medium">{name}</span>
                  ) : (
                    <Link href={path} className="text-gray-600 hover:text-[#E8DCC8] transition">
                      {name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}

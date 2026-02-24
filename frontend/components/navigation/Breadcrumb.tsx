'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import Script from 'next/script'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

// Helper function to generate breadcrumb label from path segment
function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Breadcrumb({ items, className = '', showHome = true }: BreadcrumbProps) {
  const pathname = usePathname()
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbs(pathname)
  
  // Generate JSON-LD schema for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      ...(showHome ? [{
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://lexalifestyle.com/'
      }] : []),
      ...breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        'position': showHome ? index + 2 : index + 1,
        'name': item.label,
        'item': `https://lexalifestyle.com${item.href}`
      }))
    ]
  }
  
  if (breadcrumbItems.length === 0 && !showHome) return null
  
  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {/* Home Link */}
          {showHome && (
            <li className="flex items-center">
              <Link 
                href="/" 
                className="text-gray-500 hover:text-[#C9A962] transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only">Home</span>
              </Link>
              {breadcrumbItems.length > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </li>
          )}
          
          {/* Breadcrumb Items */}
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1
            
            return (
              <li key={item.href} className="flex items-center">
                {isLast ? (
                  <span className="text-[#1A1A1A] dark:text-white font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      href={item.href}
                      className="text-gray-500 hover:text-[#C9A962] transition-colors"
                    >
                      {item.label}
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// Helper function to auto-generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === '/') return []
  
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []
  let currentPath = ''
  
  // Map of custom labels for specific paths
  const labelMap: Record<string, string> = {
    'about': 'About Us',
    'services': 'Services',
    'solutions': 'Solutions',
    'projects': 'Projects',
    'products': 'Products',
    'brands': 'Brands',
    'contact': 'Contact',
    'blog': 'Blog',
    'news': 'News',
    'calculator': 'Smart Home Calculator',
    'roi-calculator': 'ROI Calculator',
    'cinema-configurator': 'Cinema Configurator',
    'experience-centre': 'Experience Centre',
    'consultation': 'Book Consultation',
    'locations': 'Locations',
    'persona': 'For You',
    'support': 'Support',
    'warranty': 'Warranty',
    'careers': 'Careers',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
    'architects': 'For Architects',
    'developers': 'For Developers',
    'contractors': 'For Contractors',
    'homeowner': 'For Homeowners',
    'lighting-automation': 'Lighting Automation',
    'climate-control': 'Climate Control',
    'home-cinema': 'Home Cinema',
    'home-theater': 'Home Theater',
    'audio-systems': 'Audio Systems',
    'motorized-shades': 'Motorized Shades',
    'networking': 'Networking',
    'emirates-hills': 'Emirates Hills',
    'palm-jumeirah': 'Palm Jumeirah',
    'downtown-dubai': 'Downtown Dubai',
    'dubai-hills': 'Dubai Hills',
    'abu-dhabi': 'Abu Dhabi',
    'sharjah': 'Sharjah',
  }
  
  for (const segment of segments) {
    // Skip admin paths
    if (segment === 'admin') break
    
    currentPath += `/${segment}`
    items.push({
      label: labelMap[segment] || formatLabel(segment),
      href: currentPath
    })
  }
  
  return items
}

// Compact breadcrumb for mobile
export function CompactBreadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname()
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbs(pathname)
  
  if (breadcrumbItems.length === 0) return null
  
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]
  const parentItem = breadcrumbItems.length > 1 ? breadcrumbItems[breadcrumbItems.length - 2] : null
  
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <div className="flex items-center gap-2">
        {parentItem ? (
          <Link 
            href={parentItem.href}
            className="text-gray-500 hover:text-[#C9A962] transition-colors flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to {parentItem.label}</span>
          </Link>
        ) : (
          <Link 
            href="/"
            className="text-gray-500 hover:text-[#C9A962] transition-colors flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Home</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

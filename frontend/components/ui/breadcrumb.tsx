import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  dark?: boolean
}

export function Breadcrumb({ items, dark = false }: BreadcrumbProps) {
  const textColor = dark ? 'text-gray-400' : 'text-gray-600'
  const hoverColor = dark ? 'hover:text-white' : 'hover:text-charcoal'
  const activeColor = dark ? 'text-white' : 'text-charcoal'
  const chevronColor = dark ? 'text-gray-500' : 'text-gray-400'
  
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${textColor} py-4`}>
      <Link href="/" className={`${hoverColor} transition-colors flex items-center`}>
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} className={chevronColor} />
          {item.href ? (
            <Link href={item.href} className={`${hoverColor} transition-colors`}>
              {item.label}
            </Link>
          ) : (
            <span className={`${activeColor} font-medium`}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

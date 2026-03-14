'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  type: 'solution' | 'service' | 'brand' | 'project'
  title: string
  slug: string
  description?: string
}

export default function FooterSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search function with debounce
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const debounceTimer = setTimeout(async () => {
      setLoading(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''
        
        // Fetch from multiple endpoints in parallel
        const [solutionsRes, servicesRes, brandsRes, projectsRes] = await Promise.all([
          fetch(`${apiUrl}/api/solutions`).catch(() => null),
          fetch(`${apiUrl}/api/services`).catch(() => null),
          fetch(`${apiUrl}/api/brands`).catch(() => null),
          fetch(`${apiUrl}/api/projects`).catch(() => null),
        ])

        const searchResults: SearchResult[] = []
        const searchLower = query.toLowerCase()

        // Process solutions
        if (solutionsRes?.ok) {
          const solutions = await solutionsRes.json()
          const solutionsArray = Array.isArray(solutions) ? solutions : solutions.solutions || []
          solutionsArray.forEach((item: any) => {
            if (
              item.title?.toLowerCase().includes(searchLower) ||
              item.description?.toLowerCase().includes(searchLower)
            ) {
              searchResults.push({
                type: 'solution',
                title: item.title,
                slug: item.slug,
                description: item.description?.slice(0, 80)
              })
            }
          })
        }

        // Process services
        if (servicesRes?.ok) {
          const services = await servicesRes.json()
          const servicesArray = Array.isArray(services) ? services : services.services || []
          servicesArray.forEach((item: any) => {
            if (
              item.title?.toLowerCase().includes(searchLower) ||
              item.description?.toLowerCase().includes(searchLower)
            ) {
              searchResults.push({
                type: 'service',
                title: item.title,
                slug: item.slug,
                description: item.description?.slice(0, 80)
              })
            }
          })
        }

        // Process brands
        if (brandsRes?.ok) {
          const brands = await brandsRes.json()
          const brandsArray = Array.isArray(brands) ? brands : brands.brands || []
          brandsArray.forEach((item: any) => {
            if (
              item.name?.toLowerCase().includes(searchLower) ||
              item.description?.toLowerCase().includes(searchLower)
            ) {
              searchResults.push({
                type: 'brand',
                title: item.name,
                slug: item.slug,
                description: item.description?.slice(0, 80)
              })
            }
          })
        }

        // Process projects
        if (projectsRes?.ok) {
          const projects = await projectsRes.json()
          const projectsArray = Array.isArray(projects) ? projects : projects.projects || []
          projectsArray.forEach((item: any) => {
            if (
              item.title?.toLowerCase().includes(searchLower) ||
              item.description?.toLowerCase().includes(searchLower) ||
              item.location?.toLowerCase().includes(searchLower)
            ) {
              searchResults.push({
                type: 'project',
                title: item.title,
                slug: item.slug,
                description: item.location || item.description?.slice(0, 80)
              })
            }
          })
        }

        // Limit results
        setResults(searchResults.slice(0, 8))
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      solution: 'Solution',
      service: 'Service',
      brand: 'Brand',
      project: 'Project'
    }
    return labels[type] || type
  }

  const getTypeHref = (type: string, slug: string) => {
    const paths: Record<string, string> = {
      solution: `/solutions/${slug}`,
      service: `/services/${slug}`,
      brand: `/brands/${slug}`,
      project: `/projects/${slug}`
    }
    return paths[type] || `/${slug}`
  }

  const handleResultClick = () => {
    setQuery('')
    setIsOpen(false)
    setResults([])
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search solutions, services, brands..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 focus:ring-1 focus:ring-[#C9A962]/30 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.length >= 2 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl overflow-hidden max-h-80 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                <div className="inline-block w-4 h-4 border-2 border-gray-600 border-t-[#C9A962] rounded-full animate-spin mr-2"></div>
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <Link
                    key={`${result.type}-${result.slug}-${index}`}
                    href={getTypeHref(result.type, result.slug)}
                    onClick={handleResultClick}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-white/10 text-gray-400 rounded">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-white group-hover:text-[#C9A962] transition-colors truncate">
                        {result.title}
                      </h4>
                      {result.description && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {result.description}...
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 dark:text-zinc-500 group-hover:text-[#C9A962] transition-colors flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found for &quot;{query}&quot;
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

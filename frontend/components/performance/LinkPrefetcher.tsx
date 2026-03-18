'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Priority routes to prefetch immediately
const HIGH_PRIORITY_ROUTES = [
  '/services',
  '/solutions',
  '/contact',
  '/calculator',
  '/consultation',
]

// Routes to prefetch on scroll or idle
const SECONDARY_ROUTES = [
  '/about',
  '/projects',
  '/products',
  '/brands',
  '/experience-centre',
  '/blog',
]

/**
 * Link Prefetcher Component
 * Automatically prefetches important routes for instant navigation
 */
export default function LinkPrefetcher() {
  const router = useRouter()
  const pathname = usePathname()
  const prefetchedRoutes = useRef<Set<string>>(new Set())
  
  // Prefetch a single route
  const prefetchRoute = useCallback((route: string) => {
    if (prefetchedRoutes.current.has(route) || route === pathname) return
    
    try {
      router.prefetch(route)
      prefetchedRoutes.current.add(route)
    } catch (error) {
      // Silently fail - prefetching is best-effort
    }
  }, [router, pathname])
  
  // Prefetch high priority routes immediately
  useEffect(() => {
    // Use requestIdleCallback for non-blocking prefetch
    const prefetchHighPriority = () => {
      HIGH_PRIORITY_ROUTES.forEach(route => {
        if (route !== pathname) {
          prefetchRoute(route)
        }
      })
    }
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchHighPriority, { timeout: 2000 })
    } else {
      setTimeout(prefetchHighPriority, 1000)
    }
  }, [pathname, prefetchRoute])
  
  // Prefetch secondary routes on idle
  useEffect(() => {
    const prefetchSecondary = () => {
      SECONDARY_ROUTES.forEach(route => {
        if (route !== pathname) {
          prefetchRoute(route)
        }
      })
    }
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchSecondary, { timeout: 5000 })
    } else {
      setTimeout(prefetchSecondary, 3000)
    }
  }, [pathname, prefetchRoute])
  
  // Prefetch links on hover/touch
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element
      // Safety check: ensure target has the closest method (is a proper Element)
      if (!target || typeof target.closest !== 'function') return
      
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement | null
      
      if (link) {
        const href = link.getAttribute('href')
        if (href && !href.startsWith('/lexa_admin@2026') && !href.startsWith('/api')) {
          prefetchRoute(href)
        }
      }
    }
    
    // Use event delegation for efficiency
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true, passive: true })
    document.addEventListener('touchstart', handleMouseEnter as any, { capture: true, passive: true })
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
      document.removeEventListener('touchstart', handleMouseEnter as any, { capture: true })
    }
  }, [prefetchRoute])
  
  return null
}

/**
 * Smart Image Loading Component
 * Provides progressive loading with blur placeholder
 */
export function useProgressiveImage(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc)

  useEffect(() => {
    const img = new Image()
    img.src = highQualitySrc
    img.onload = () => setSrc(highQualitySrc)
  }, [highQualitySrc])

  return { src, isLoading: src === lowQualitySrc }
}

import { useState } from 'react'

/**
 * Intersection Observer Hook for lazy loading
 */
export function useLazyLoad(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '100px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return

  // Fonts are handled by next/font - no manual preloading needed
  const fonts: { href: string; type: string }[] = []

  fonts.forEach(({ href, type }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = 'font'
    link.type = type
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

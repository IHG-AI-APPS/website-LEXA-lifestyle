import { useEffect } from 'react'
import { useRouter } from 'next/router'

const criticalRoutes = [
  '/solutions',
  '/package-builder',
  '/calculator',
  '/roi-calculator',
  '/specialty-rooms',
  '/projects'
]

export function usePrefetch() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical routes on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route)
        })
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route)
        })
      }, 1000)
    }
  }, [router])
}

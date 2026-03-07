'use client'

import { useEffect, createContext, useContext, useRef, useCallback } from 'react'
import Lenis from 'lenis'

interface SmoothScrollContextType {
  scrollToTop: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ scrollToTop: () => {} })

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      // Fallback for when Lenis isn't ready
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    
    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

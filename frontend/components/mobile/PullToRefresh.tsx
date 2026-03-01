'use client'

import { useRef, useState, useCallback, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface PullToRefreshProps {
  children: ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
}

export default function PullToRefresh({ children, onRefresh, threshold = 80 }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [pulling, setPulling] = useState(false)
  const touchStartY = useRef(0)
  const pullDistance = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const opacity = useTransform(pullDistance, [0, threshold], [0, 1])
  const scale = useTransform(pullDistance, [0, threshold], [0.5, 1])
  const rotate = useTransform(pullDistance, [0, threshold * 2], [0, 360])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY
      setPulling(true)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pulling || refreshing) return
    const currentY = e.touches[0].clientY
    const diff = Math.max(0, currentY - touchStartY.current)
    // Rubber-band effect
    const dampened = diff * 0.4
    pullDistance.set(dampened)
  }, [pulling, refreshing, pullDistance])

  const handleTouchEnd = useCallback(async () => {
    if (!pulling) return
    const currentPull = pullDistance.get()

    if (currentPull >= threshold && !refreshing) {
      setRefreshing(true)
      animate(pullDistance, threshold * 0.6, { type: 'spring', stiffness: 300 })
      try {
        await onRefresh()
      } finally {
        setRefreshing(false)
      }
    }

    animate(pullDistance, 0, { type: 'spring', stiffness: 300, damping: 25 })
    setPulling(false)
  }, [pulling, pullDistance, threshold, refreshing, onRefresh])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Only active on touch devices
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: true })
    el.addEventListener('touchend', handleTouchEnd)

    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div ref={containerRef} className="relative" data-testid="pull-to-refresh">
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-[60] pointer-events-none"
        style={{ height: pullDistance }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          style={{ opacity, scale }}
        >
          {refreshing ? (
            <Loader2 className="w-6 h-6 text-[#C9A962] animate-spin" />
          ) : (
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-[#C9A962] border-t-transparent"
              style={{ rotate }}
            />
          )}
          <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">
            {refreshing ? 'Refreshing' : 'Pull to refresh'}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: pullDistance }}>
        {children}
      </motion.div>
    </div>
  )
}

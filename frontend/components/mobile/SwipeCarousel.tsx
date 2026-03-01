'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface SwipeCarouselProps {
  children: ReactNode[]
  className?: string
  cardWidth?: number
  gap?: number
  showDots?: boolean
  showPeek?: boolean
}

export default function SwipeCarousel({
  children,
  className = '',
  cardWidth = 300,
  gap = 16,
  showDots = true,
  showPeek = true
}: SwipeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalItems = children.length

  const peekWidth = showPeek ? 40 : 0
  const effectiveCardWidth = cardWidth + gap

  const handleDragEnd = useCallback((_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    let newIndex = activeIndex
    if (offset < -50 || velocity < -300) {
      newIndex = Math.min(activeIndex + 1, totalItems - 1)
    } else if (offset > 50 || velocity > 300) {
      newIndex = Math.max(activeIndex - 1, 0)
    }

    setActiveIndex(newIndex)
    animate(x, -newIndex * effectiveCardWidth, {
      type: 'spring',
      stiffness: 300,
      damping: 30
    })
  }, [activeIndex, totalItems, effectiveCardWidth, x])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
    animate(x, -index * effectiveCardWidth, {
      type: 'spring',
      stiffness: 300,
      damping: 30
    })
  }, [effectiveCardWidth, x])

  // Progress bar
  const progress = useTransform(
    x,
    [0, -(totalItems - 1) * effectiveCardWidth],
    [0, 100]
  )

  if (totalItems === 0) return null

  return (
    <div className={`relative ${className}`} data-testid="swipe-carousel">
      {/* Cards container */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap: `${gap}px`, paddingLeft: '16px', paddingRight: `${peekWidth}px` }}
          drag="x"
          dragConstraints={{
            left: -(totalItems - 1) * effectiveCardWidth,
            right: 0
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {children.map((child, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress bar + dots */}
      {showDots && totalItems > 1 && (
        <div className="mt-6 px-4 flex items-center gap-4">
          {/* Gold progress bar */}
          <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#C9A962] rounded-full"
              style={{ width: progress.get() ? `${progress.get()}%` : `${(activeIndex / (totalItems - 1)) * 100}%` }}
              animate={{ width: `${((activeIndex + 1) / totalItems) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Counter */}
          <span className="text-xs text-white/50 font-medium tabular-nums min-w-[40px] text-right">
            {activeIndex + 1}/{totalItems}
          </span>
        </div>
      )}
    </div>
  )
}

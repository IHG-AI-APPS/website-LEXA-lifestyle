'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'image'
  width?: string | number
  height?: string | number
  count?: number
  animation?: 'pulse' | 'wave' | 'none'
}

/**
 * Skeleton Loading Component
 * Provides visual feedback during content loading
 */
export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 rounded'
  
  const variantClasses = {
    text: 'h-4 rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
    image: 'rounded-xl aspect-video'
  }
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: ''
  }
  
  const style = {
    width: width,
    height: height
  }
  
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  ))
  
  return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>
}

/**
 * Card Skeleton for loading cards
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm ${className}`}>
      <Skeleton variant="image" className="w-full h-48" />
      <div className="p-6 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" count={2} />
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="rectangular" width={80} height={32} />
        </div>
      </div>
    </div>
  )
}

/**
 * Grid Skeleton for loading grids
 */
export function GridSkeleton({ 
  count = 6, 
  columns = 3,
  className = '' 
}: { 
  count?: number
  columns?: number
  className?: string 
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4">
        <Skeleton variant="text" width={200} height={12} />
        <Skeleton variant="text" width={400} height={48} className="max-w-full" />
        <Skeleton variant="text" width={500} height={20} className="max-w-full" />
        <div className="flex gap-4 mt-4">
          <Skeleton variant="rectangular" width={150} height={48} />
          <Skeleton variant="rectangular" width={150} height={48} />
        </div>
      </div>
    </div>
  )
}

/**
 * Table Skeleton for admin pages
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 p-4">
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="text" width={`${Math.random() * 20 + 10}%`} height={16} />
          ))}
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="flex gap-4 items-center">
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  variant="text" 
                  width={`${Math.random() * 20 + 10}%`} 
                  height={14}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Page Loading Transition
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Inline Loading Spinner
 */
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3'
  }
  
  return (
    <div 
      className={`${sizeClasses[size]} border-gray-200 dark:border-gray-700 border-t-[#C9A962] rounded-full animate-spin ${className}`}
    />
  )
}

/**
 * Full Page Loading Overlay
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-100 dark:border-gray-800 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
        <p className="text-gray-400 text-sm font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  )
}

// CSS for wave animation (add to globals.css)
// .skeleton-wave {
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//   background-size: 200% 100%;
//   animation: wave 1.5s ease-in-out infinite;
// }
// @keyframes wave {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }

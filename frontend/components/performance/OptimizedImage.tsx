'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  lowQualitySrc?: string
  showSkeleton?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  hoverEffect?: 'zoom' | 'brightness' | 'none'
}

// Default blur placeholder - tiny grey image
const DEFAULT_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

// Default fallback image
const DEFAULT_FALLBACK = '/images/placeholder.jpg'

/**
 * Optimized Image Component
 * - Lazy loading with intersection observer
 * - Blur placeholder while loading
 * - Error fallback
 * - Smooth transitions
 * - Hover effects
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  lowQualitySrc,
  showSkeleton = true,
  aspectRatio = 'auto',
  hoverEffect = 'none',
  className,
  fill,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection observer for lazy loading
  useEffect(() => {
    const element = imageRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  }

  const hoverClasses = {
    zoom: 'group-hover:scale-105 transition-transform duration-500',
    brightness: 'group-hover:brightness-110 transition-all duration-300',
    none: ''
  }

  const imageSrc = hasError ? fallbackSrc : src

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800 group',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Skeleton loader */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Image */}
      {isInView && (
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          className={cn(
            'object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hoverClasses[hoverEffect]
          )}
          placeholder="blur"
          blurDataURL={lowQualitySrc || DEFAULT_BLUR}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true)
            setIsLoaded(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}

/**
 * Background Image with optimization
 */
export function OptimizedBackgroundImage({
  src,
  alt = '',
  children,
  overlay = true,
  overlayOpacity = 0.5,
  className = '',
  priority = false
}: {
  src: string
  alt?: string
  children?: React.ReactNode
  overlay?: boolean
  overlayOpacity?: number
  className?: string
  priority?: boolean
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          'object-cover transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{ opacity: isLoaded ? overlayOpacity : 0.8 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * Gallery Image with lightbox-ready optimization
 */
export function GalleryImage({
  src,
  alt,
  onClick,
  className = ''
}: {
  src: string
  alt: string
  onClick?: () => void
  className?: string
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      aspectRatio="video"
      hoverEffect="zoom"
      className={cn(
        'cursor-pointer rounded-lg overflow-hidden',
        className
      )}
      onClick={onClick}
    />
  )
}

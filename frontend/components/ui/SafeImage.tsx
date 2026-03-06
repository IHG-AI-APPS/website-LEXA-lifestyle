'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

/**
 * SafeImage - A wrapper around Next.js Image component that handles:
 * - Dynamic/user-uploaded images from any source
 * - Fallback images when loading fails
 * - Proper error handling to prevent page crashes
 * 
 * Use this component for any dynamically loaded images (from database, user uploads, etc.)
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/solutions/smart-lighting-1.jpg',
  className,
  ...props
}: SafeImageProps & { className?: string }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Sync state when src prop changes (e.g., theme/route change)
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setLoaded(false)
  }, [src])

  // Validate and normalize the image source
  const getValidSrc = (source: string | typeof src): string => {
    if (!source) return fallbackSrc
    
    // If it's a StaticImageData object, return as-is (handled by Next.js)
    if (typeof source === 'object') return source as unknown as string
    
    // If it's a relative path starting with /, it's a local image
    if (source.startsWith('/')) return source
    
    // If it's a data URL, return as-is
    if (source.startsWith('data:')) return source
    
    // If it's already a full URL, return as-is
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return source
    }
    
    // For any other case, assume it's a relative path
    return `/${source}`
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  const validSrc = getValidSrc(imgSrc)
  const isCdn = typeof validSrc === 'string' && validSrc.includes('files.ihgbrands.com')

  // Auto-upgrade to WebP URL for CDN images (PNG/JPG → WebP)
  const optimizedSrc = isCdn && typeof validSrc === 'string'
    ? validSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    : validSrc

  return (
    <Image
      {...props}
      src={optimizedSrc}
      alt={alt}
      unoptimized={isCdn}
      loading={props.priority ? undefined : 'lazy'}
      className={`${className || ''} ${loaded ? '' : 'opacity-0'}`}
      style={{
        ...props.style,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: loaded ? 1 : 0,
        filter: loaded ? 'blur(0)' : 'blur(4px)',
      }}
      sizes={props.sizes || (props.fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined)}
      onError={() => {
        // If WebP fails, fallback to original URL, then to fallback image
        if (!hasError && optimizedSrc !== validSrc) {
          setImgSrc(validSrc as string)
        } else if (!hasError) {
          setHasError(true)
          setImgSrc(fallbackSrc)
        }
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}

/**
 * For cases where Next.js Image optimization isn't needed
 * (e.g., very small icons, dynamically generated images)
 */
export function UnoptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/solutions/smart-lighting-1.jpg',
  className,
  style,
  ...props
}: SafeImageProps & { className?: string; style?: React.CSSProperties }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      unoptimized
    />
  )
}

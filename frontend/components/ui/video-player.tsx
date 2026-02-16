'use client'

import { useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Play, X } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
  duration?: string
  className?: string
}

export default function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  duration,
  className = ''
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Extract video ID from YouTube/Vimeo URLs
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return url // Direct video URL
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  return (
    <>
      {/* Video Thumbnail */}
      <div 
        className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
        onClick={handlePlay}
      >
        <SafeImage 
          src={thumbnailUrl} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center 
                         transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium">
            {duration}
          </div>
        )}
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-medium text-sm line-clamp-2">{title}</h3>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

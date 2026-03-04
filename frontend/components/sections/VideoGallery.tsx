'use client'

import { useEffect, useState, useCallback } from 'react'
import VideoPlayer from '@/components/ui/video-player'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Video {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string | null
  duration: string | null
  category: string
  tags: string[]
  featured: boolean
  view_count: number
  published_date: string
  related_service: string | null
  related_project: string | null
}

interface VideoGalleryProps {
  category?: string
  relatedService?: string
  relatedProject?: string
  featured?: boolean
  limit?: number
  title?: string
  description?: string
  cols?: 2 | 3 | 4
}

export default function VideoGallery({
  category,
  relatedService,
  relatedProject,
  featured,
  limit = 12,
  title = 'Video Gallery',
  description,
  cols = 3
}: VideoGalleryProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVideos = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (relatedService) params.append('related_service', relatedService)
      if (relatedProject) params.append('related_project', relatedProject)
      if (featured !== undefined) params.append('featured', String(featured))
      params.append('limit', String(limit))

      const response = await fetch(`${API_URL}/api/videos?${params}`)
      if (response.ok) {
        const data = await response.json()
        setVideos(data)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }, [category, relatedService, relatedProject, featured, limit])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
              {[...Array(cols)].map((_, i) => (
                <div key={i} className="aspect-video bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return null
  }

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }[cols]

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-zinc-500 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Video Grid */}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {videos.map((video) => (
            <div key={video.id} className="group">
              <VideoPlayer
                videoUrl={video.video_url}
                thumbnailUrl={video.thumbnail_url || 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/f50336749d63e39e010d02db9c43eee9a19c0d799c1e9c0c91e84a4f2b8eb347.png'}
                title={video.title}
                duration={video.duration || undefined}
                className="aspect-video"
              />
              <div className="mt-3">
                <p className="text-sm text-gray-500 capitalize mb-1">{video.category.replace('-', ' ')}</p>
                <p className="text-sm text-gray-600 dark:text-zinc-500 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

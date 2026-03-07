'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Play, Video, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface VideoItem {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail: string
  category: string
  duration: string
  featured: boolean
  order: number
  created_at: string
}

const defaultFormData = {
  title: '',
  description: '',
  video_url: '',
  thumbnail: '',
  category: 'project-showcase',
  duration: '',
  featured: false,
  order: 0
}

export default function VideosAdmin() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/videos`)
      if (response.ok) {
        const data = await response.json()
        const rawVideos = Array.isArray(data) ? data : data.videos || []
        // Ensure all videos have proper defaults
        const videosWithDefaults = rawVideos.map((v: any) => ({
          ...v,
          title: v.title || '',
          description: v.description || '',
          video_url: v.video_url || '',
          thumbnail: v.thumbnail || '',
          category: v.category || 'project-showcase',
          duration: v.duration || '',
          featured: v.featured || false,
          related_solution: v.related_solution || ''
        }))
        setVideos(videosWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load videos')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingId 
        ? `${API_URL}/api/admin/videos/${editingId}`
        : `${API_URL}/api/admin/videos`
      
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'Video updated!' : 'Video added!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchVideos()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save video')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (video: VideoItem) => {
    setFormData({
      title: video.title || '',
      description: video.description || '',
      video_url: video.video_url || '',
      thumbnail: video.thumbnail || '',
      category: video.category || 'project-showcase',
      duration: video.duration || '',
      featured: video.featured || false,
      order: video.order || 0
    })
    setEditingId(video.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/videos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Video deleted!')
        fetchVideos()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete')
    }
  }

  // Extract YouTube thumbnail from URL
  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
    }
    return ''
  }

  const handleVideoUrlChange = (url: string) => {
    const thumbnail = getYouTubeThumbnail(url)
    setFormData({
      ...formData,
      video_url: url,
      thumbnail: formData.thumbnail || thumbnail
    })
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-48 bg-gray-100 rounded"></div>
            <div className="h-48 bg-gray-100 rounded"></div>
            <div className="h-48 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Videos Management</h1>
          <p className="text-gray-600 text-sm mt-1">Manage video content and showcases</p>
        </div>
        <Button 
          onClick={() => {
            setFormData(defaultFormData)
            setEditingId(null)
            setShowForm(true)
          }}
          className="bg-[#1A1A1A] hover:bg-[#2A2A2A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{videos.length}</div>
          <div className="text-sm text-gray-500">Total Videos</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-amber-600">
            {videos.filter(v => v.featured).length}
          </div>
          <div className="text-sm text-gray-500">Featured</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {Array.from(new Set(videos.map(v => v.category))).length}
          </div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg border overflow-hidden group">
            <div className="aspect-video bg-gray-100 relative">
              {video.thumbnail ? (
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={video.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <Play className="w-6 h-6 text-gray-900 ml-1" />
                </a>
              </div>
              {video.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs rounded">
                  Featured
                </span>
              )}
              {video.duration && (
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {video.category}
                </span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(video)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(video.id)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            No videos yet. Click "Add Video" to create one.
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Video' : 'Add Video'}
        size="lg"
      >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video URL *</label>
                <Input
                  required
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  YouTube, Vimeo, or direct video URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the video"
                  rows={3}
                />
              </div>

              <ImageUpload
                value={formData.thumbnail}
                onChange={(url) => setFormData({ ...formData, thumbnail: url })}
                label="Thumbnail Image"
                category="videos"
                showPreview={true}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="project-showcase">Project Showcase</option>
                    <option value="product-demo">Product Demo</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="event">Event</option>
                    <option value="company">Company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 3:45"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm">Featured video</label>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Order:</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={saving} className="bg-[#1A1A1A] hover:bg-[#2A2A2A]">
                  {saving ? 'Saving...' : (editingId ? 'Update Video' : 'Add Video')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
      </Modal>
    </div>
  )
}

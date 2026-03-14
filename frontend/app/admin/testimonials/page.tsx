'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  testimonial: string
  rating: number
  image: string | null
  project_type?: string
  featured?: boolean
  // Video fields
  is_video?: boolean
  video_url?: string
  video_thumbnail?: string
  video_duration?: string
  location?: string
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_URL}/api/testimonials`)
      
      if (response.ok) {
        const data = await response.json()
        const rawTestimonials = Array.isArray(data) ? data : data.testimonials || []
        // Ensure all testimonials have proper defaults
        const testimonialsWithDefaults = rawTestimonials.map((t: any) => ({
          ...t,
          name: t.name || '',
          role: t.role || '',
          company: t.company || '',
          content: t.content || '',
          rating: t.rating || 5,
          image: t.image || '',
          project_type: t.project_type || '',
          featured: t.featured || false,
          is_video: t.is_video || false,
          video_url: t.video_url || '',
          video_thumbnail: t.video_thumbnail || '',
          video_duration: t.video_duration || '',
          location: t.location || ''
        }))
        setTestimonials(testimonialsWithDefaults)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch(`${API_URL}/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        toast.success('Testimonial deleted!')
        fetchTestimonials()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast.error('Failed to delete')
    }
  }

  const saveItem = async (data: Testimonial) => {
    try {
      const token = localStorage.getItem('admin_token')
      
      const url = data.id && data.id !== 'new' 
        ? `${API_URL}/api/admin/testimonials/${data.id}`
        : `${API_URL}/api/admin/testimonials`
      
      const method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success(data.id === 'new' ? 'Testimonial created!' : 'Testimonial updated!')
        fetchTestimonials()
        setEditingItem(null)
        setShowAddModal(false)
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
      toast.error('Failed to save')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div><div className="space-y-3"><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div></div></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Testimonials Management</h1>
            <p className="text-gray-600">Manage customer testimonials displayed on homepage</p>
          </div>
          <Button
            onClick={() => {
              setEditingItem({ id: 'new', name: '', role: '', company: '', testimonial: '', rating: 5, image: null })
              setShowAddModal(true)
            }}
            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        <div className="bg-white p-6 border-2 border-gray-200 mb-4">
          <div className="text-2xl font-bold text-[#1A1A1A] mb-1">{testimonials.length}</div>
          <div className="text-sm text-gray-600">Total Testimonials</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white border-2 border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.role} at {item.company}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">&ldquo;{item.testimonial}&rdquo;</p>
            </div>
          ))}
        </div>

        <Modal
          isOpen={editingItem !== null || showAddModal}
          onClose={() => { setEditingItem(null); setShowAddModal(false); }}
          title={editingItem?.id === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}
          size="lg"
        >
              {editingItem && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <Input
                      value={editingItem.role}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input
                      value={editingItem.company}
                      onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Testimonial</label>
                    <textarea
                      value={editingItem.testimonial}
                      onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                      className="w-full h-32 p-3 border-2 border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={editingItem.rating}
                      onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
                      className="w-full h-10 px-3 border-2 border-gray-200"
                    >
                      {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <ImageUpload
                    value={editingItem.image || ''}
                    onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                    label="Profile Photo (optional)"
                    category="testimonials"
                    showPreview={true}
                  />
                  
                  {/* Video Testimonial Section */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="is_video"
                        checked={editingItem.is_video || false}
                        onChange={(e) => setEditingItem({ ...editingItem, is_video: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="is_video" className="text-sm font-medium text-[#C9A962]">Video Testimonial</label>
                    </div>
                    
                    {editingItem.is_video && (
                      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium mb-2">Video URL (YouTube, Vimeo, or direct)</label>
                          <Input
                            value={editingItem.video_url || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, video_url: e.target.value })}
                            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                          />
                        </div>
                        <ImageUpload
                          value={editingItem.video_thumbnail || ''}
                          onChange={(url) => setEditingItem({ ...editingItem, video_thumbnail: url })}
                          label="Video Thumbnail"
                          category="testimonials"
                          showPreview={true}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <Input
                              value={editingItem.video_duration || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, video_duration: e.target.value })}
                              placeholder="2:30"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <Input
                              value={editingItem.location || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                              placeholder="Palm Jumeirah, Dubai"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => saveItem(editingItem)}
                    className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Testimonial
                  </Button>
                </div>
              )}
        </Modal>
      </div>
    </div>
  )
}

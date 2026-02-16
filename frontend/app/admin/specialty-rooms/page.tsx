'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, DoorOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload, MultiImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SpecialtyRoom {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  icon: string
  image: string
  gallery: string[]
  category: string
  features: string[]
  price_range: string
  order: number
  active: boolean
}

const defaultFormData = {
  name: '',
  slug: '',
  description: '',
  short_description: '',
  icon: '🏠',
  image: '',
  gallery: [] as string[],
  category: 'entertainment',
  features: [] as string[],
  price_range: '',
  order: 0,
  active: true
}

const categories = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'wellness', label: 'Wellness & Spa' },
  { value: 'utility', label: 'Utility' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'luxury', label: 'Luxury' }
]

export default function SpecialtyRoomsAdmin() {
  const [rooms, setRooms] = useState<SpecialtyRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/api/specialty-rooms`)
      if (response.ok) {
        const data = await response.json()
        const rawRooms = Array.isArray(data) ? data : data.rooms || []
        // Ensure all rooms have proper defaults
        const roomsWithDefaults = rawRooms.map((r: any) => ({
          ...r,
          name: r.name || '',
          slug: r.slug || '',
          description: r.description || '',
          short_description: r.short_description || '',
          icon: r.icon || '🏠',
          image: r.image || '',
          gallery: r.gallery || [],
          category: r.category || 'entertainment',
          key_features: r.key_features || [],
          compatible_systems: r.compatible_systems || [],
          ideal_for: r.ideal_for || [],
          starting_price: r.starting_price || 0,
          active: r.active !== false,
          order: r.order || 0
        }))
        setRooms(roomsWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load specialty rooms')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingId 
        ? `${API_URL}/api/admin/specialty-rooms/${editingId}`
        : `${API_URL}/api/admin/specialty-rooms`
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'Room updated!' : 'Room created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchRooms()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save room')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (room: SpecialtyRoom) => {
    setFormData({
      name: room.name || '',
      slug: room.slug || '',
      description: room.description || '',
      short_description: room.short_description || '',
      icon: room.icon || '🏠',
      image: room.image || '',
      gallery: room.gallery || [],
      category: room.category || 'entertainment',
      features: room.features || [],
      price_range: room.price_range || '',
      order: room.order || 0,
      active: room.active !== false
    })
    setEditingId(room.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this specialty room?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/specialty-rooms/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Room deleted!')
        fetchRooms()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const filteredRooms = rooms.filter(room =>
    room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded"></div>
            ))}
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
          <h1 className="text-2xl font-bold text-gray-900">Specialty Rooms</h1>
          <p className="text-gray-600 text-sm mt-1">Manage specialty room types for the package builder</p>
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
          Add Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
          <div className="text-sm text-gray-500">Total Rooms</div>
        </div>
        {categories.slice(0, 3).map(cat => (
          <div key={cat.value} className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">
              {rooms.filter(r => r.category === cat.value).length}
            </div>
            <div className="text-sm text-gray-500">{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg border overflow-hidden group">
            <div className="aspect-video bg-gray-100 relative">
              {room.image ? (
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {room.icon || '🏠'}
                </div>
              )}
              <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded capitalize">
                {room.category}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{room.icon}</span>
                <h3 className="font-medium text-gray-900">{room.name}</h3>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {room.short_description || room.description}
              </p>
              {room.price_range && (
                <p className="text-sm font-medium text-gray-900 mb-3">{room.price_range}</p>
              )}
              <div className="flex items-center justify-between pt-3 border-t">
                <span className={`px-2 py-0.5 text-xs rounded ${
                  room.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {room.active !== false ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(room)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(room.id)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredRooms.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            No specialty rooms found. Click "Add Room" to create one.
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-white rounded-lg w-full max-w-3xl mx-4 my-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {editingId ? 'Edit Specialty Room' : 'Add Specialty Room'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      name: e.target.value,
                      slug: editingId ? formData.slug : generateSlug(e.target.value)
                    })}
                    placeholder="Room name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="room-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🎬"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <Input
                    value={formData.price_range}
                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                    placeholder="AED 50,000 - 150,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <Input
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief description for cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                <Textarea
                  value={formData.features.join('\n')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features: e.target.value.split('\n').filter(f => f.trim())
                  })}
                  placeholder="4K Projector&#10;Dolby Atmos Sound&#10;Acoustic Treatment"
                  rows={4}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Main Image"
                category="specialty-rooms"
                showPreview={true}
              />

              <MultiImageUpload
                values={formData.gallery}
                onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                label="Gallery Images"
                category="specialty-rooms"
                maxImages={10}
              />

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="active" className="text-sm">Active</label>
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
                  {saving ? 'Saving...' : (editingId ? 'Update Room' : 'Create Room')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

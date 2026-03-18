'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface PropertyPackage {
  id: string
  property_type: string
  slug: string
  description: string
  rooms: number
  base_price: number
  min_sqft: number
  max_sqft: number
  included_rooms: string[]
  features: string[]
  image: string
  icon: string
  popular: boolean
  order: number
  active: boolean
}

const defaultFormData: Partial<PropertyPackage> = {
  property_type: '',
  slug: '',
  description: '',
  rooms: 1,
  base_price: 0,
  min_sqft: 0,
  max_sqft: 0,
  included_rooms: [],
  features: [],
  image: '',
  icon: '🏠',
  popular: false,
  order: 0,
  active: true
}

export default function PropertyPackagesAdmin() {
  const [packages, setPackages] = useState<PropertyPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PropertyPackage>>(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/property-packages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        const rawPackages = data.packages || []
        // Ensure all packages have proper defaults
        const packagesWithDefaults = rawPackages.map((p: any) => ({
          ...p,
          property_type: p.property_type || '',
          slug: p.slug || '',
          description: p.description || '',
          rooms: p.rooms || 1,
          base_price: p.base_price || 0,
          min_sqft: p.min_sqft || 0,
          max_sqft: p.max_sqft || 0,
          included_rooms: p.included_rooms || [],
          features: p.features || [],
          image: p.image || '',
          icon: p.icon || '🏠',
          popular: p.popular || false,
          order: p.order || 0,
          active: p.active !== false
        }))
        setPackages(packagesWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load packages')
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
        ? `${API_URL}/api/admin/property-packages/${editingId}`
        : `${API_URL}/api/admin/property-packages`
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'Package updated!' : 'Package created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchPackages()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save package')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (pkg: PropertyPackage) => {
    setFormData({
      property_type: pkg.property_type || '',
      slug: pkg.slug || '',
      description: pkg.description || '',
      rooms: pkg.rooms || 1,
      base_price: pkg.base_price || 0,
      min_sqft: pkg.min_sqft || 0,
      max_sqft: pkg.max_sqft || 0,
      included_rooms: pkg.included_rooms || [],
      features: pkg.features || [],
      image: pkg.image || '',
      icon: pkg.icon || '🏠',
      popular: pkg.popular || false,
      order: pkg.order || 0,
      active: pkg.active !== false
    })
    setEditingId(pkg.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property package?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/property-packages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Package deleted!')
        fetchPackages()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const filteredPackages = packages.filter(pkg =>
    pkg.property_type?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Property Packages</h1>
          <p className="text-gray-600 text-sm mt-1">Manage property types and pricing for the package builder</p>
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
          Add Package
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{packages.length}</div>
          <div className="text-sm text-gray-500">Property Types</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-amber-600">
            {packages.filter(p => p.popular).length}
          </div>
          <div className="text-sm text-gray-500">Popular</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {packages.filter(p => p.active !== false).length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            AED {Math.min(...packages.map(p => p.base_price || 0).filter(p => p > 0)).toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-500">Starting Price</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            {pkg.image && (
              <div className="h-32 bg-gray-100">
                <img src={pkg.image} alt={pkg.property_type} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                    {pkg.icon || '🏠'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                      {pkg.property_type}
                      {pkg.popular && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">Popular</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{pkg.rooms} Rooms</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {pkg.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
              )}

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Base Price</div>
                  <div className="text-lg font-bold text-[#1A1A1A]">AED {pkg.base_price?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Min Area</div>
                  <div className="text-lg font-bold text-[#1A1A1A]">{pkg.min_sqft} sqft</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Max Area</div>
                  <div className="text-lg font-bold text-[#1A1A1A]">{pkg.max_sqft} sqft</div>
                </div>
              </div>

              {pkg.included_rooms && pkg.included_rooms.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 mb-2">Included Rooms</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.included_rooms.map((room: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">{room}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded ${
                  pkg.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {pkg.active !== false ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-gray-400">Order: {pkg.order || 0}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredPackages.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No property packages found. Click "Add Package" to create one.
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Property Package' : 'Add Property Package'}
        size="lg"
      >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Property Type *</label>
                  <Input
                    required
                    value={formData.property_type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      property_type: e.target.value,
                      slug: editingId ? formData.slug : generateSlug(e.target.value)
                    })}
                    placeholder="e.g., Studio Apartment"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="studio-apartment"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this property package"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rooms *</label>
                  <Input
                    type="number"
                    required
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Base Price (AED) *</label>
                  <Input
                    type="number"
                    required
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Min Sqft</label>
                  <Input
                    type="number"
                    value={formData.min_sqft}
                    onChange={(e) => setFormData({ ...formData, min_sqft: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Sqft</label>
                  <Input
                    type="number"
                    value={formData.max_sqft}
                    onChange={(e) => setFormData({ ...formData, max_sqft: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🏠"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Included Rooms (one per line)</label>
                <Textarea
                  value={formData.included_rooms?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    included_rooms: e.target.value.split('\n').filter(r => r.trim())
                  })}
                  placeholder="Living Room&#10;Master Bedroom&#10;Kitchen"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                <Textarea
                  value={formData.features?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features: e.target.value.split('\n').filter(f => f.trim())
                  })}
                  placeholder="Smart Lighting&#10;Climate Control&#10;Security System"
                  rows={4}
                />
              </div>

              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Package Image"
                category="property-packages"
                showPreview={true}
              />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="popular" className="text-sm">Mark as Popular</label>
                </div>
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
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={saving} className="bg-[#1A1A1A] hover:bg-[#2A2A2A]">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : (editingId ? 'Update Package' : 'Create Package')}
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

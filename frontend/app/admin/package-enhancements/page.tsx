'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Sparkles, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Enhancement {
  id: string
  name: string
  description: string
  category: string
  price: number
  icon: string
  image: string
  features: string[]
  popular: boolean
  order: number
  active: boolean
}

const defaultFormData = {
  name: '',
  description: '',
  category: 'automation',
  price: 0,
  icon: '✨',
  image: '',
  features: [] as string[],
  popular: false,
  order: 0,
  active: true
}

const categories = [
  { value: 'automation', label: 'Automation' },
  { value: 'security', label: 'Security' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'climate', label: 'Climate Control' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'audio', label: 'Audio/Visual' }
]

export default function PackageEnhancementsAdmin() {
  const [enhancements, setEnhancements] = useState<Enhancement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchEnhancements()
  }, [])

  const fetchEnhancements = async () => {
    try {
      const response = await fetch(`${API_URL}/api/package-enhancements`)
      if (response.ok) {
        const data = await response.json()
        setEnhancements(Array.isArray(data) ? data : data.enhancements || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load enhancements')
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
        ? `${API_URL}/api/admin/package-enhancements/${editingId}`
        : `${API_URL}/api/admin/package-enhancements`
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'Enhancement updated!' : 'Enhancement created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchEnhancements()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save enhancement')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: Enhancement) => {
    setFormData({
      name: item.name || '',
      description: item.description || '',
      category: item.category || 'automation',
      price: item.price || 0,
      icon: item.icon || '✨',
      image: item.image || '',
      features: item.features || [],
      popular: item.popular || false,
      order: item.order || 0,
      active: item.active !== false
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enhancement?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/package-enhancements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Enhancement deleted!')
        fetchEnhancements()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const filteredEnhancements = enhancements.filter(item =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Package Enhancements</h1>
          <p className="text-gray-600 text-sm mt-1">Manage add-ons and upgrades for packages</p>
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
          Add Enhancement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{enhancements.length}</div>
          <div className="text-sm text-gray-500">Total Enhancements</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-amber-600">
            {enhancements.filter(e => e.popular).length}
          </div>
          <div className="text-sm text-gray-500">Popular</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {enhancements.filter(e => e.active !== false).length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {Array.from(new Set(enhancements.map(e => e.category))).length}
          </div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search enhancements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Enhancement</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEnhancements.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xl">
                        {item.icon || '✨'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {item.name}
                        {item.popular && (
                          <span className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">Popular</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded capitalize">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">
                  AED {item.price?.toLocaleString() || 0}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-1.5 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEnhancements.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  No enhancements found. Click "Add Enhancement" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="flex min-h-full items-start justify-center py-8 px-4">
            <div className="relative bg-white rounded-lg w-full max-w-2xl">
              <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
                <h2 className="text-lg font-semibold">
                  {editingId ? 'Edit Enhancement' : 'Add Enhancement'}
                </h2>
                <button onClick={() => setShowForm(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enhancement name"
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this enhancement"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (AED) *</label>
                  <Input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="✨"
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
                <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                <Textarea
                  value={formData.features.join('\n')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features: e.target.value.split('\n').filter(f => f.trim())
                  })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Enhancement Image"
                category="enhancements"
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
                  {saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

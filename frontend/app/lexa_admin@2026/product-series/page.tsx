'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layers, Search, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface ProductSeries {
  id: string
  name: string
  slug: string
  description: string
  brand: string
  category: string
  image: string
  featured: boolean
  active: boolean
  order: number
  created_at?: string
  updated_at?: string
}

interface FilterOption {
  name: string
  count: number
}

const defaultFormData: Partial<ProductSeries> = {
  name: '',
  slug: '',
  description: '',
  brand: '',
  category: '',
  image: '',
  featured: false,
  active: true,
  order: 0
}

export default function ProductSeriesAdmin() {
  const [seriesList, setSeriesList] = useState<ProductSeries[]>([])
  const [catalogSeries, setCatalogSeries] = useState<FilterOption[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ProductSeries>>(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)
  
  // Options for dropdowns
  const [brands, setBrands] = useState<{name: string, id: string}[]>([])
  const [categories, setCategories] = useState<{name: string, id: string}[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [seriesRes, catalogRes, brandsRes, catsRes] = await Promise.all([
        fetch(`${API_URL}/api/product-series`),
        fetch(`${API_URL}/api/catalog/series`),
        fetch(`${API_URL}/api/brands`),
        fetch(`${API_URL}/api/products`)
      ])
      
      if (seriesRes.ok) {
        const data = await seriesRes.json()
        setSeriesList(Array.isArray(data) ? data : [])
      }
      
      if (catalogRes.ok) {
        const data = await catalogRes.json()
        setCatalogSeries(Array.isArray(data) ? data : [])
      }
      
      if (brandsRes.ok) {
        const data = await brandsRes.json()
        setBrands((data || []).map((b: any) => ({ name: b.name, id: b.id })))
      }
      
      if (catsRes.ok) {
        const data = await catsRes.json()
        setCategories((data || []).map((c: any) => ({ name: c.name, id: c.id })))
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load data')
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
        ? `${API_URL}/api/admin/product-series/${editingId}`
        : `${API_URL}/api/admin/product-series`
      
      const payload = {
        ...formData,
        id: editingId || `series-${Date.now()}`
      }

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast.success(editingId ? 'Series updated!' : 'Series created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save series')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (series: ProductSeries) => {
    setFormData({
      name: series.name || '',
      slug: series.slug || '',
      description: series.description || '',
      brand: series.brand || '',
      category: series.category || '',
      image: series.image || '',
      featured: series.featured || false,
      active: series.active !== false,
      order: series.order || 0
    })
    setEditingId(series.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this series?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/product-series/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Series deleted!')
        fetchData()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  // Get series that exist in catalog but not defined in admin
  const undefinedSeries = catalogSeries.filter(
    cs => !seriesList.some(s => s.name === cs.name)
  )

  const filteredSeries = seriesList.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 dark:bg-zinc-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Series</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage product series and sub-categories ({seriesList.length} defined, {catalogSeries.length} in use)
          </p>
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
          Add Series
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{seriesList.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Defined Series</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{catalogSeries.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">In Use (from products)</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
            {seriesList.filter(s => s.featured).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Featured</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{undefinedSeries.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Undefined (in products)</div>
        </div>
      </div>

      {/* Undefined Series Alert */}
      {undefinedSeries.length > 0 && (
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
            Series in products but not defined ({undefinedSeries.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {undefinedSeries.slice(0, 10).map(s => (
              <button
                key={s.name}
                onClick={() => {
                  setFormData({ ...defaultFormData, name: s.name, slug: generateSlug(s.name) })
                  setEditingId(null)
                  setShowForm(true)
                }}
                className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors"
              >
                {s.name} ({s.count}) +
              </button>
            ))}
            {undefinedSeries.length > 10 && (
              <span className="px-2 py-1 text-xs text-orange-600 dark:text-orange-400">
                +{undefinedSeries.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search series by name or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Series Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Series</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-zinc-700">
              {filteredSeries.map((series) => {
                const catalogMatch = catalogSeries.find(c => c.name === series.name)
                return (
                  <tr key={series.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {series.image ? (
                          <img src={series.image} alt={series.name} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded flex items-center justify-center">
                            <Layers className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{series.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">/{series.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{series.brand || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{series.category || '-'}</td>
                    <td className="px-6 py-4">
                      {catalogMatch ? (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                          {catalogMatch.count} products
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">No products</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {series.active !== false ? (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">Active</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Inactive</span>
                        )}
                        {series.featured && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => handleEdit(series)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button 
                          onClick={() => handleDelete(series.id)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredSeries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No series found. Click "Add Series" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Series' : 'Add Series'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Series Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: editingId ? formData.slug : generateSlug(e.target.value)
                })}
                placeholder="e.g., Aavik C Series"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="aavik-c-series"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Brand</label>
              <select
                value={formData.brand || ''}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full h-10 px-3 text-sm border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
              >
                <option value="">Select Brand (optional)</option>
                {brands.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Category</label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 text-sm border border-gray-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
              >
                <option value="">Select Category (optional)</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <ImageUpload
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Series Image"
            category="series"
            showPreview={true}
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Series description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Display Order</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex flex-col gap-3 pt-6">
              <div className="flex items-center">
                <Checkbox
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                />
                <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Active</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Featured Series</label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t dark:border-zinc-700">
            <Button type="submit" disabled={saving} className="bg-[#1A1A1A] hover:bg-[#2A2A2A]">
              {saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}
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

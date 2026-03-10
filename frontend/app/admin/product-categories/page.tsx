'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layers, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
  icon?: string
  brands: string[]
  related_solutions: string[]
  specifications: string[]
  featured: boolean
}

const defaultFormData: Partial<ProductCategory> = {
  slug: '',
  name: '',
  description: '',
  icon: '',
  image: '',
  brands: [],
  related_solutions: [],
  specifications: [],
  featured: false
}

export default function ProductCategoriesAdmin() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ProductCategory>>(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      // Fetch from /api/products which returns product categories
      const response = await fetch(`${API_URL}/api/products`)
      if (response.ok) {
        const data = await response.json()
        // Ensure proper defaults for all categories
        const categoriesWithDefaults = (Array.isArray(data) ? data : []).map((cat: any) => ({
          ...cat,
          brands: cat.brands || [],
          related_solutions: cat.related_solutions || [],
          specifications: cat.specifications || [],
          featured: cat.featured || false
        }))
        setCategories(categoriesWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load product categories')
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
        ? `${API_URL}/api/admin/products/${editingId}`
        : `${API_URL}/api/admin/products`
      
      const payload = {
        ...formData,
        id: editingId || `cat-${Date.now()}`
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
        toast.success(editingId ? 'Category updated!' : 'Category created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (category: ProductCategory) => {
    setFormData({
      slug: category.slug || '',
      name: category.name || '',
      description: category.description || '',
      icon: category.icon || '',
      image: category.image || '',
      brands: category.brands || [],
      related_solutions: category.related_solutions || [],
      specifications: category.specifications || [],
      featured: category.featured || false
    })
    setEditingId(category.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Category deleted!')
        fetchCategories()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleArrayInput = (field: 'brands' | 'related_solutions' | 'specifications', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Categories</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Organize products into categories ({categories.length} categories)</p>
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
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Categories</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
            {categories.filter(c => c.featured).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Featured</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {categories.reduce((acc, c) => acc + (c.brands?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Brands Listed</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-700 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              {category.image ? (
                <img src={category.image} alt={category.name} className="w-12 h-12 rounded object-cover" />
              ) : (
                <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded flex items-center justify-center">
                  {category.icon ? (
                    <span className="text-2xl">{category.icon}</span>
                  ) : (
                    <Layers className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{category.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">/{category.slug}</p>
              </div>
              {category.featured && (
                <span className="px-2 py-0.5 text-xs rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                  Featured
                </span>
              )}
            </div>
            {category.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{category.description}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">{category.brands?.length || 0} brands</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{category.specifications?.length || 0} specs</span>
            </div>
            <div className="mt-3 pt-3 border-t dark:border-zinc-700 flex justify-end gap-2">
              <button 
                onClick={() => handleEdit(category)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
              >
                <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button 
                onClick={() => handleDelete(category.id)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
            No categories found. Click "Add Category" to create one.
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Category' : 'Add Category'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Category Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: editingId ? formData.slug : generateSlug(e.target.value)
                })}
                placeholder="e.g., Audio Systems"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="audio-systems"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Icon (Emoji)</label>
            <Input
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🔊"
            />
          </div>

          <ImageUpload
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Category Image"
            category="products"
            showPreview={true}
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Description *</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Brands (comma-separated)</label>
            <Textarea
              value={formData.brands?.join(', ')}
              onChange={(e) => handleArrayInput('brands', e.target.value)}
              placeholder="Sonos, KEF, Bowers & Wilkins"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Related Solutions (slugs, comma-separated)</label>
            <Input
              value={formData.related_solutions?.join(', ')}
              onChange={(e) => handleArrayInput('related_solutions', e.target.value)}
              placeholder="home-theater, audio-distribution"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Specifications (comma-separated)</label>
            <Textarea
              value={formData.specifications?.join(', ')}
              onChange={(e) => handleArrayInput('specifications', e.target.value)}
              placeholder="Multi-room audio, High-resolution streaming, Dolby Atmos"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-900 dark:text-white">Featured Category</label>
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

'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  brand_slug?: string
  category: string
  sub_category?: string
  description: string
  image: string
  images: string[]
  specifications: string[]
  features: string[]
  related_solutions: string[]
  featured: boolean
  published: boolean
  created_at?: string
  updated_at?: string
}

const defaultFormData: Partial<Product> = {
  name: '',
  brand: '',
  category: '',
  sub_category: '',
  description: '',
  image: '',
  images: [],
  specifications: [],
  features: [],
  related_solutions: [],
  featured: false,
  published: true
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [saving, setSaving] = useState(false)
  const pageSize = 20

  useEffect(() => {
    loadProducts()
  }, [currentPage, searchQuery])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        page_size: pageSize.toString()
      })
      if (searchQuery) params.append('search', searchQuery)
      
      const response = await fetch(`${BACKEND_URL}/api/catalog/products?${params}`)
      const data = await response.json()
      setProducts(data.products || [])
      setTotalPages(data.total_pages || 1)
      setTotalProducts(data.total || 0)
    } catch (err) {
      console.error('Failed to load products:', err)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      ...product,
      images: product.images || [],
      specifications: product.specifications || [],
      features: product.features || [],
      related_solutions: product.related_solutions || []
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData(defaultFormData)
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const url = editingId 
        ? `${BACKEND_URL}/api/catalog/products/${editingId}`
        : `${BACKEND_URL}/api/catalog/products`
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'Product updated!' : 'Product created!')
        await loadProducts()
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save product')
      }
    } catch (err) {
      console.error('Failed to save product:', err)
      toast.error('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${BACKEND_URL}/api/catalog/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success('Product deleted!')
        await loadProducts()
      } else {
        toast.error('Failed to delete product')
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
      toast.error('Failed to delete product')
    }
  }

  const handleArrayInput = (field: 'images' | 'specifications' | 'features' | 'related_solutions', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split('\n').map(item => item.trim()).filter(Boolean)
    })
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  if (loading && products.length === 0) {
    return <div className="p-8">Loading products...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Products Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Manage your product catalog ({totalProducts} products)</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#1A1A1A] hover:bg-[#2A2A2A]">
          <Plus className="mr-2" size={20} />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search products by name, brand..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-10"
        />
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit Product' : 'Add Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand *</label>
              <Input
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
                placeholder="Brand name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Audio, Lighting, Security"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sub Category / Series</label>
              <Input
                value={formData.sub_category || ''}
                onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                placeholder="e.g., Soundbar, Ceiling Speaker"
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Main Product Image"
            category="products"
            showPreview={true}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specifications (one per line)</label>
            <Textarea
              value={formData.specifications?.join('\n')}
              onChange={(e) => handleArrayInput('specifications', e.target.value)}
              placeholder="e.g., Dimensions: 100x50x30mm&#10;Weight: 2.5kg&#10;Power: 100W"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Features (one per line)</label>
            <Textarea
              value={formData.features?.join('\n')}
              onChange={(e) => handleArrayInput('features', e.target.value)}
              placeholder="e.g., Voice control compatible&#10;Multi-room audio&#10;High-resolution streaming"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Product</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
              />
              <label htmlFor="published" className="text-sm font-medium">Published</label>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-zinc-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100 dark:bg-zinc-700 flex-shrink-0">
                        {product.image ? (
                          <SafeImage src={product.image} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">/{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{product.brand}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                    {product.sub_category && <span className="text-xs"> / {product.sub_category}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {product.published ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">Published</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">Draft</span>
                      )}
                      {product.featured && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    {searchQuery ? 'No products found matching your search.' : 'No products yet. Click "Add Product" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t dark:border-zinc-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages} ({totalProducts} products)
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createProduct, updateProduct, deleteProduct } from '@/lib/adminApi'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

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

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ProductCategory>>({
    id: '',
    slug: '',
    name: '',
    description: '',
    image: '',
    icon: '',
    brands: [],
    related_solutions: [],
    specifications: [],
    featured: false
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`)
      const data = await response.json()
      // Ensure all products have proper defaults
      const productsWithDefaults = data.map((p: any) => ({
        ...p,
        slug: p.slug || '',
        name: p.name || '',
        description: p.description || '',
        image: p.image || '',
        icon: p.icon || '',
        brands: p.brands || [],
        related_solutions: p.related_solutions || [],
        specifications: p.specifications || [],
        featured: p.featured || false
      }))
      setProducts(productsWithDefaults)
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: ProductCategory) => {
    setFormData({
      ...product,
      slug: product.slug || '',
      name: product.name || '',
      description: product.description || '',
      image: product.image || '',
      icon: product.icon || '',
      brands: product.brands || [],
      related_solutions: product.related_solutions || [],
      specifications: product.specifications || [],
      featured: product.featured || false
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData({
      id: Date.now().toString(),
      slug: '',
      name: '',
      description: '',
      image: '',
      icon: '',
      brands: [],
      related_solutions: [],
      specifications: [],
      featured: false
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateProduct(editingId, formData)
      } else {
        await createProduct(formData)
      }
      await loadProducts()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save product:', err)
      alert('Failed to save product category')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product category?')) return
    try {
      await deleteProduct(id)
      await loadProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
      alert('Failed to delete product category')
    }
  }

  const handleArrayInput = (field: 'brands' | 'related_solutions' | 'specifications', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Product Categories Management</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2" size={20} />
          Add Category
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{editingId ? 'Edit Product Category' : 'Add Category'}</h2>
              <button onClick={() => setShowForm(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        name: e.target.value, 
                        slug: generateSlug(e.target.value) 
                      })
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Category Image *"
                category="products"
                showPreview={true}
              />

              <div>
                <label className="block text-sm font-medium mb-1">Icon (Emoji)</label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🔊"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Brands (comma-separated)</label>
                <Textarea
                  value={formData.brands?.join(', ')}
                  onChange={(e) => handleArrayInput('brands', e.target.value)}
                  placeholder="Sonos, KEF, Bowers & Wilkins"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Related Solutions (slugs, comma-separated)</label>
                <Input
                  value={formData.related_solutions?.join(', ')}
                  onChange={(e) => handleArrayInput('related_solutions', e.target.value)}
                  placeholder="home-theater, audio-distribution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Specifications (comma-separated)</label>
                <Textarea
                  value={formData.specifications?.join(', ')}
                  onChange={(e) => handleArrayInput('specifications', e.target.value)}
                  placeholder="Multi-room audio, High-resolution streaming, Dolby Atmos"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Category</label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brands</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
                        <SafeImage src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {product.icon && <span className="text-xl">{product.icon}</span>}
                          <div className="font-medium">{product.name}</div>
                        </div>
                        <div className="text-sm text-gray-500">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.brands.length} brands</td>
                  <td className="px-6 py-4 text-sm">{product.specifications.length} specs</td>
                  <td className="px-6 py-4">
                    {product.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

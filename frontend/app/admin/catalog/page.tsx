'use client'

import { useEffect, useState, useCallback } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, X, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createCatalogProduct, updateCatalogProduct, deleteCatalogProduct } from '@/lib/adminApi'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface CatalogProduct {
  id: string
  slug: string
  name: string
  brand: string
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
  brand_slug?: string
}

const EMPTY_FORM: Partial<CatalogProduct> = {
  name: '', brand: '', category: '', sub_category: '', description: '',
  image: '', images: [], specifications: [], features: [],
  related_solutions: [], featured: false, published: true,
}

const CATEGORIES = ['Audio', 'Automation', 'Electrical', 'Home Cinema', 'Lighting', 'Video', 'Accessories', 'Furniture']

export default function CatalogAdminPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [brands, setBrands] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<CatalogProduct>>(EMPTY_FORM)
  const [specsText, setSpecsText] = useState('')
  const [featuresText, setFeaturesText] = useState('')

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString(), page_size: '20', sort: 'name_asc' })
      if (search) params.set('search', search)
      if (filterCategory) params.set('category', filterCategory)
      if (filterBrand) params.set('brand', filterBrand)
      const res = await fetch(`${API}/catalog/products?${params}`)
      const data = await res.json()
      setProducts(data.products || [])
      setTotal(data.total || 0)
      setTotalPages(data.total_pages || 1)
    } catch {
      toast.error('Failed to load products')
    }
    setLoading(false)
  }, [page, search, filterCategory, filterBrand])

  useEffect(() => { loadProducts() }, [loadProducts])

  useEffect(() => {
    fetch(`${API}/catalog/brands`).then(r => r.json()).then(d => setBrands(d.map((b: { name: string }) => b.name))).catch(() => {})
  }, [])

  useEffect(() => { setPage(1) }, [search, filterCategory, filterBrand])

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleAdd = () => {
    setFormData({ ...EMPTY_FORM })
    setSpecsText('')
    setFeaturesText('')
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (product: CatalogProduct) => {
    setFormData({ ...product })
    setSpecsText((product.specifications || []).join('\n'))
    setFeaturesText((product.features || []).join('\n'))
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await deleteCatalogProduct(id)
      toast.success('Product deleted')
      loadProducts()
    } catch {
      toast.error('Failed to delete product')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      slug: formData.slug || generateSlug(formData.name || ''),
      specifications: specsText.split('\n').map(s => s.trim()).filter(Boolean),
      features: featuresText.split('\n').map(s => s.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await updateCatalogProduct(editingId, payload)
        toast.success('Product updated')
      } else {
        await createCatalogProduct(payload)
        toast.success('Product created')
      }
      setShowForm(false)
      loadProducts()
    } catch {
      toast.error('Failed to save product')
    }
  }

  const resolveImg = (img: string) => {
    if (!img) return ''
    return img.startsWith('http') ? img : `${BACKEND_URL}${img}`
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold" data-testid="catalog-admin-title">Product Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">{total} products in catalog</p>
        </div>
        <Button onClick={handleAdd} data-testid="add-product-btn">
          <Plus className="mr-2" size={16} /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            data-testid="admin-search"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white"
          data-testid="admin-filter-category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white"
          data-testid="admin-filter-brand"
        >
          <option value="">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-16">Image</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Brand</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Series</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Data</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-4 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
                ))
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No products found</td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50" data-testid={`product-row-${p.slug}`}>
                  <td className="px-4 py-2">
                    <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {p.image ? (
                        <SafeImage src={resolveImg(p.image)} alt={p.name} fill className="object-contain p-1" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">N/A</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium text-gray-900 line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-400 md:hidden">{p.brand} &middot; {p.category}</div>
                  </td>
                  <td className="px-4 py-2 text-gray-600 hidden md:table-cell">{p.brand}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{p.category}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs hidden lg:table-cell">{p.sub_category || '—'}</td>
                  <td className="px-4 py-2 text-xs text-gray-400 hidden lg:table-cell">
                    {p.description ? 'D' : '—'}{p.specifications?.length ? ` S${p.specifications.length}` : ''}{p.features?.length ? ` F${p.features.length}` : ''}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(p)} data-testid={`edit-${p.slug}`}>
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id, p.name)} className="text-red-500 hover:text-red-700" data-testid={`delete-${p.slug}`}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <span className="text-xs text-gray-500">Page {page} of {totalPages} ({total} total)</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft size={14} />
              </Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold" data-testid="form-title">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name *</label>
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: editingId ? formData.slug : generateSlug(e.target.value) })}
                      required
                      data-testid="form-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      data-testid="form-slug"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand *</label>
                    <Input
                      value={formData.brand || ''}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                      list="brand-list"
                      data-testid="form-brand"
                    />
                    <datalist id="brand-list">
                      {brands.map(b => <option key={b} value={b} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      required
                      data-testid="form-category"
                    >
                      <option value="">Select...</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Series / Sub-category</label>
                    <Input
                      value={formData.sub_category || ''}
                      onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                      placeholder="e.g., Michi Series"
                      data-testid="form-sub-category"
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Image</h3>
                <ImageUpload
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Product Image"
                  category="products"
                  showPreview={true}
                />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Content</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Product description..."
                    data-testid="form-description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Specifications (one per line, use Key: Value format)</label>
                  <Textarea
                    value={specsText}
                    onChange={(e) => setSpecsText(e.target.value)}
                    rows={5}
                    placeholder={"Power: 125W per channel\nFrequency: 10Hz - 100kHz\nDimensions: 485 x 195mm"}
                    data-testid="form-specs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Key Features (one per line)</label>
                  <Textarea
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    rows={4}
                    placeholder={"125W per channel Class-D amplifier\nAirPlay 2 and Spotify Connect built-in"}
                    data-testid="form-features"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={formData.featured || false} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={formData.published !== false} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="rounded" />
                  Published
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" data-testid="form-submit">{editingId ? 'Save Changes' : 'Create Product'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

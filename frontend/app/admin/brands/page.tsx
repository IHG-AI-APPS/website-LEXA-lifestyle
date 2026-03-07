'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, X, GripVertical, Save, Package, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createBrand, updateBrand, deleteBrand } from '@/lib/adminApi'
import { toast } from 'sonner'
import { ImageUpload, MultiImageUpload } from '@/components/admin/ImageUpload'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Product {
  name: string
  description: string
  image: string
  price_range?: string
}

interface Brand {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  website?: string
  categories: string[]
  featured: boolean
  country?: string
  year_established?: string
  tagline?: string
  hero_image?: string
  priority: number
  products: Product[]
  seo_title?: string
  seo_description?: string
  long_description?: string
  certifications: string[]
  key_features: string[]
  gallery_images: string[]
  feature_cards: FeatureCard[]
  related_solutions: string[]
}

interface FeatureCard {
  title: string
  description: string
  benefits: string[]
}

export default function BrandsAdminPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [hasOrderChanges, setHasOrderChanges] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState(false)
  const [formData, setFormData] = useState<Partial<Brand>>({
    id: '',
    slug: '',
    name: '',
    logo: '',
    description: '',
    website: '',
    categories: [],
    featured: false,
    country: '',
    year_established: '',
    tagline: '',
    hero_image: '',
    priority: 100,
    products: [],
    seo_title: '',
    seo_description: '',
    long_description: '',
    certifications: [],
    key_features: [],
    gallery_images: [],
    feature_cards: [],
    related_solutions: []
  })

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/brands`)
      const data = await response.json()
      // Ensure each brand has all fields with proper defaults
      const brandsWithDefaults = data.map((b: any, index: number) => ({
        ...b,
        priority: b.priority ?? index * 10,
        slug: b.slug || '',
        name: b.name || '',
        logo: b.logo || '',
        description: b.description || '',
        long_description: b.long_description || '',
        website: b.website || '',
        categories: b.categories || [],
        featured: b.featured || false,
        country: b.country || '',
        year_established: b.year_established || '',
        tagline: b.tagline || '',
        hero_image: b.hero_image || '',
        products: b.products || [],
        certifications: b.certifications || [],
        key_features: b.key_features || [],
        gallery_images: b.gallery_images || [],
        feature_cards: b.feature_cards || [],
        related_solutions: b.related_solutions || [],
        seo_title: b.seo_title || '',
        seo_description: b.seo_description || ''
      }))
      setBrands(brandsWithDefaults)
    } catch (err) {
      console.error('Failed to load brands:', err)
      toast.error('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (brand: Brand) => {
    setFormData({
      ...brand,
      slug: brand.slug || '',
      name: brand.name || '',
      logo: brand.logo || '',
      description: brand.description || '',
      long_description: brand.long_description || '',
      website: brand.website || '',
      categories: brand.categories || [],
      featured: brand.featured || false,
      country: brand.country || '',
      year_established: brand.year_established || '',
      tagline: brand.tagline || '',
      hero_image: brand.hero_image || '',
      products: brand.products || [],
      certifications: brand.certifications || [],
      key_features: brand.key_features || [],
      gallery_images: brand.gallery_images || [],
      feature_cards: brand.feature_cards || [],
      related_solutions: brand.related_solutions || [],
      seo_title: brand.seo_title || '',
      seo_description: brand.seo_description || ''
    })
    setEditingId(brand.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    const maxPriority = Math.max(...brands.map(b => b.priority || 0), 0)
    setFormData({
      id: Date.now().toString(),
      slug: '',
      name: '',
      logo: '',
      description: '',
      website: '',
      categories: [],
      featured: false,
      country: '',
      year_established: '',
      tagline: '',
      hero_image: '',
      priority: maxPriority + 10,
      products: [],
      seo_title: '',
      seo_description: '',
      long_description: '',
      certifications: [],
      key_features: [],
      gallery_images: [],
      feature_cards: [],
      related_solutions: []
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateBrand(editingId, formData)
        toast.success('Brand updated successfully')
      } else {
        await createBrand(formData)
        toast.success('Brand created successfully')
      }
      await loadBrands()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save brand:', err)
      toast.error('Failed to save brand')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return
    try {
      await deleteBrand(id)
      toast.success('Brand deleted successfully')
      await loadBrands()
    } catch (err) {
      console.error('Failed to delete brand:', err)
      toast.error('Failed to delete brand')
    }
  }

  const handleArrayInput = (field: 'categories' | 'certifications' | 'key_features', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  // Move brand up in priority
  const moveBrandUp = (index: number) => {
    if (index === 0) return
    const newBrands = [...brands]
    const temp = newBrands[index].priority
    newBrands[index].priority = newBrands[index - 1].priority
    newBrands[index - 1].priority = temp
    newBrands.sort((a, b) => a.priority - b.priority)
    setBrands(newBrands)
    setHasOrderChanges(true)
  }

  // Move brand down in priority
  const moveBrandDown = (index: number) => {
    if (index === brands.length - 1) return
    const newBrands = [...brands]
    const temp = newBrands[index].priority
    newBrands[index].priority = newBrands[index + 1].priority
    newBrands[index + 1].priority = temp
    newBrands.sort((a, b) => a.priority - b.priority)
    setBrands(newBrands)
    setHasOrderChanges(true)
  }

  // Save brand order
  const saveOrder = async () => {
    setSavingOrder(true)
    try {
      const priorities = brands.map((b, i) => ({ id: b.id, priority: i * 10 }))
      const response = await fetch(`${BACKEND_URL}/api/brands/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(priorities)
      })
      if (response.ok) {
        toast.success('Brand order saved successfully')
        setHasOrderChanges(false)
        await loadBrands()
      } else {
        toast.error('Failed to save brand order')
      }
    } catch (err) {
      console.error('Failed to save order:', err)
      toast.error('Failed to save brand order')
    } finally {
      setSavingOrder(false)
    }
  }

  // Product management
  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...(formData.products || []), { name: '', description: '', image: '', price_range: '' }]
    })
  }

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const newProducts = [...(formData.products || [])]
    newProducts[index] = { ...newProducts[index], [field]: value }
    setFormData({ ...formData, products: newProducts })
  }

  const removeProduct = (index: number) => {
    const newProducts = (formData.products || []).filter((_, i) => i !== index)
    setFormData({ ...formData, products: newProducts })
  }

  // Feature card management
  const addFeatureCard = () => {
    setFormData({
      ...formData,
      feature_cards: [...(formData.feature_cards || []), { title: '', description: '', benefits: [] }]
    })
  }

  const updateFeatureCard = (index: number, field: keyof FeatureCard, value: any) => {
    const cards = [...(formData.feature_cards || [])]
    cards[index] = { ...cards[index], [field]: value }
    setFormData({ ...formData, feature_cards: cards })
  }

  const removeFeatureCard = (index: number) => {
    setFormData({ ...formData, feature_cards: (formData.feature_cards || []).filter((_, i) => i !== index) })
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Brands Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage brand logos, details, products & display order</p>
        </div>
        <div className="flex gap-2">
          {hasOrderChanges && (
            <Button onClick={saveOrder} disabled={savingOrder} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2" size={16} />
              {savingOrder ? 'Saving...' : 'Save Order'}
            </Button>
          )}
          <Button onClick={handleAdd}>
            <Plus className="mr-2" size={20} />
            Add Brand
          </Button>
        </div>
      </div>

      {/* Order Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Use the up/down arrows to change brand display order. Changes are saved when you click &quot;Save Order&quot;.
          Brands with lower priority numbers appear first on the website.
        </p>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-semibold">{editingId ? 'Edit Brand' : 'Add Brand'}</h2>
                <button onClick={() => setShowForm(false)}>
                  <X size={24} />
                </button>
              </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand Name *</label>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ImageUpload
                    value={formData.logo || ''}
                    onChange={(url) => setFormData({ ...formData, logo: url })}
                    label="Brand Logo *"
                    category="logos"
                    showPreview={true}
                  />
                  <ImageUpload
                    value={formData.hero_image || ''}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                    label="Hero Image"
                    category="brands"
                    showPreview={true}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Tagline</label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g., The Ultimate in Home Automation"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Short Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                    placeholder="Brief description for listing pages"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Long Description (SEO)</label>
                  <Textarea
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    rows={5}
                    placeholder="Detailed description for brand page - helps with SEO"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Brand Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <Input
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g., USA, Germany"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year Established</label>
                    <Input
                      value={formData.year_established}
                      onChange={(e) => setFormData({ ...formData, year_established: e.target.value })}
                      placeholder="e.g., 1985"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Categories (comma-separated)</label>
                    <Input
                      value={formData.categories?.join(', ')}
                      onChange={(e) => handleArrayInput('categories', e.target.value)}
                      placeholder="Audio, Video, Lighting, Control"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Certifications (comma-separated)</label>
                    <Input
                      value={formData.certifications?.join(', ')}
                      onChange={(e) => handleArrayInput('certifications', e.target.value)}
                      placeholder="CEDIA, THX, Dolby Atmos"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Key Features (comma-separated)</label>
                  <Input
                    value={formData.key_features?.join(', ')}
                    onChange={(e) => handleArrayInput('key_features', e.target.value)}
                    placeholder="Premium Audio, Smart Integration, 10-Year Warranty"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Brand (shown prominently)</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Priority</label>
                    <Input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 100 })}
                      placeholder="Lower = shown first"
                    />
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Title</label>
                    <Input
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="e.g., Savant Home Automation Dubai | Official Dealer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      placeholder="Meta description for search engines (150-160 characters)"
                    />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Package size={20} />
                    Top Selling Products
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                    <Plus size={16} className="mr-1" /> Add Product
                  </Button>
                </div>
                
                {(formData.products || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No products added. Add top-selling products for better SEO.</p>
                ) : (
                  <div className="space-y-4">
                    {(formData.products || []).map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-600">Product #{index + 1}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeProduct(index)} className="text-red-600 h-6">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Product Name *</label>
                            <Input
                              value={product.name}
                              onChange={(e) => updateProduct(index, 'name', e.target.value)}
                              placeholder="e.g., Savant Pro Remote"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Price Range</label>
                            <Input
                              value={product.price_range}
                              onChange={(e) => updateProduct(index, 'price_range', e.target.value)}
                              placeholder="e.g., AED 2,500 - 4,000"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Image URL</label>
                            <Input
                              value={product.image}
                              onChange={(e) => updateProduct(index, 'image', e.target.value)}
                              placeholder="https://..."
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Description</label>
                            <Input
                              value={product.description}
                              onChange={(e) => updateProduct(index, 'description', e.target.value)}
                              placeholder="Brief product description"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Feature Cards */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Feature Cards</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addFeatureCard}>
                    <Plus size={16} className="mr-1" /> Add Card
                  </Button>
                </div>
                {(formData.feature_cards || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No feature cards. Add cards to highlight brand capabilities on the detail page.</p>
                ) : (
                  <div className="space-y-4">
                    {(formData.feature_cards || []).map((card, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-600">Card #{index + 1}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFeatureCard(index)} className="text-red-600 h-6">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Title *</label>
                            <Input value={card.title} onChange={(e) => updateFeatureCard(index, 'title', e.target.value)} placeholder="e.g., Smart Lighting" className="text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Benefits (comma-separated)</label>
                            <Input value={card.benefits?.join(', ') || ''} onChange={(e) => updateFeatureCard(index, 'benefits', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} placeholder="Benefit 1, Benefit 2" className="text-sm" />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block text-xs font-medium mb-1">Description</label>
                          <Input value={card.description} onChange={(e) => updateFeatureCard(index, 'description', e.target.value)} placeholder="Describe this feature category" className="text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="border-b pb-6">
                <h3 className="font-semibold text-lg mb-4">Gallery / Inspiration Images</h3>
                <MultiImageUpload
                  values={formData.gallery_images || []}
                  onChange={(urls) => setFormData({ ...formData, gallery_images: urls })}
                  label="Brand Gallery"
                  category="brands"
                  maxImages={10}
                />
              </div>

              {/* Related Solutions */}
              <div className="pb-6">
                <h3 className="font-semibold text-lg mb-4">Related Solutions</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Solution Slugs (comma-separated)</label>
                  <Input
                    value={formData.related_solutions?.join(', ')}
                    onChange={(e) => setFormData({ ...formData, related_solutions: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })}
                    placeholder="smart-lighting, home-cinema, home-automation"
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter solution slugs that use this brand. These will appear in the &quot;Solutions We Deploy&quot; section.</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-white py-4">
                <Button type="submit" className="flex-1">{editingId ? 'Update Brand' : 'Create Brand'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}

      {/* Brands List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-16">Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Categories</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {brands.map((brand, index) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-2 py-4">
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveBrandUp(index)}
                        disabled={index === 0}
                      >
                        <ChevronUp size={14} />
                      </Button>
                      <span className="text-xs text-gray-400 text-center">{brand.priority}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveBrandDown(index)}
                        disabled={index === brands.length - 1}
                      >
                        <ChevronDown size={14} />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded">
                        <SafeImage src={brand.logo} alt={brand.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-gray-500">{brand.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {brand.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="px-2 py-1 bg-gray-100 text-xs rounded">{cat}</span>
                      ))}
                      {brand.categories.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">+{brand.categories.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm">{brand.products?.length || 0} products</span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {brand.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(brand)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(brand.id)}>
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

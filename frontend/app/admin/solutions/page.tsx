'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp, Save, Search, Package, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  getSolutionsFull, 
  createSolutionFull, 
  updateSolutionFull, 
  deleteSolutionFull,
  reorderSolutions 
} from '@/lib/adminApi'
import { toast } from 'sonner'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface FeatureCard {
  title: string
  description: string
  benefits: string[]
}

interface Solution {
  id: string
  slug: string
  title: string
  category: string
  description: string
  long_description: string
  meta_description?: string
  image: string
  hero_image?: string
  features: string[]
  process?: object[]
  icon?: string
  tags: string[]
  brands: string[]
  gallery_images: string[]
  feature_cards: FeatureCard[]
  faqs?: object[]
  additional_sections?: object[]
  featured?: boolean
  popular?: boolean
  badge?: string
  mega_menu_category?: string
  mega_menu_order?: number
  priority: number
  tagline?: string
  seo_title?: string
  seo_description?: string
  key_benefits: string[]
  related_products: string[]
  certifications: string[]
  compatible_brands: string[]
  // Arabic translations
  title_ar?: string
  description_ar?: string
  long_description_ar?: string
  tagline_ar?: string
  category_ar?: string
  features_ar?: string[]
  key_benefits_ar?: string[]
}

const emptySolution: Partial<Solution> = {
  id: '',
  slug: '',
  title: '',
  category: '',
  description: '',
  long_description: '',
  meta_description: '',
  image: '',
  hero_image: '',
  features: [],
  process: [],
  icon: '',
  tags: [],
  brands: [],
  gallery_images: [],
  feature_cards: [],
  faqs: [],
  additional_sections: [],
  featured: false,
  popular: false,
  badge: '',
  mega_menu_category: 'residential',
  mega_menu_order: 99,
  priority: 100,
  tagline: '',
  seo_title: '',
  seo_description: '',
  key_benefits: [],
  related_products: [],
  certifications: [],
  compatible_brands: [],
  // Arabic translations
  title_ar: '',
  description_ar: '',
  long_description_ar: '',
  tagline_ar: '',
  category_ar: '',
  features_ar: [],
  key_benefits_ar: []
}

export default function SolutionsAdminPage() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [hasOrderChanges, setHasOrderChanges] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState<Partial<Solution>>(emptySolution)

  useEffect(() => {
    loadSolutions()
  }, [])

  const loadSolutions = async () => {
    try {
      const data = await getSolutionsFull()
      const solutionsWithDefaults = (data.solutions || []).map((s: any, index: number) => ({
        ...s,
        priority: s.priority ?? index * 10,
        // Ensure all array fields have defaults
        features: s.features || [],
        key_benefits: s.key_benefits || [],
        related_products: s.related_products || [],
        certifications: s.certifications || [],
        compatible_brands: s.compatible_brands || [],
        tags: s.tags || [],
        brands: s.brands || [],
        process: s.process || [],
        feature_cards: s.feature_cards || [],
        faqs: s.faqs || [],
        additional_sections: s.additional_sections || [],
        // Ensure all text fields have defaults
        long_description: s.long_description || '',
        meta_description: s.meta_description || '',
        tagline: s.tagline || '',
        seo_title: s.seo_title || '',
        seo_description: s.seo_description || '',
        image: s.image || '',
        hero_image: s.hero_image || '',
        icon: s.icon || '',
        badge: s.badge || '',
        mega_menu_category: s.mega_menu_category || 'residential',
        mega_menu_order: s.mega_menu_order ?? 99,
        featured: s.featured || false,
        popular: s.popular || false,
        // Arabic fields
        title_ar: s.title_ar || '',
        description_ar: s.description_ar || '',
        long_description_ar: s.long_description_ar || '',
        tagline_ar: s.tagline_ar || '',
        category_ar: s.category_ar || '',
        features_ar: s.features_ar || [],
        key_benefits_ar: s.key_benefits_ar || []
      }))
      setSolutions(solutionsWithDefaults)
    } catch (err) {
      console.error('Failed to load solutions:', err)
      toast.error('Failed to load solutions')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (solution: Solution) => {
    setFormData({
      ...solution,
      // Ensure all array fields have defaults
      features: solution.features || [],
      key_benefits: solution.key_benefits || [],
      related_products: solution.related_products || [],
      certifications: solution.certifications || [],
      compatible_brands: solution.compatible_brands || [],
      tags: solution.tags || [],
      brands: solution.brands || [],
      gallery_images: solution.gallery_images || [],
      process: solution.process || [],
      feature_cards: solution.feature_cards || [],
      faqs: solution.faqs || [],
      additional_sections: solution.additional_sections || [],
      // Ensure all text fields have defaults
      long_description: solution.long_description || '',
      meta_description: solution.meta_description || '',
      tagline: solution.tagline || '',
      seo_title: solution.seo_title || '',
      seo_description: solution.seo_description || '',
      image: solution.image || '',
      hero_image: solution.hero_image || '',
      icon: solution.icon || '',
      badge: solution.badge || '',
      mega_menu_category: solution.mega_menu_category || 'residential',
      mega_menu_order: solution.mega_menu_order ?? 99,
      featured: solution.featured || false,
      popular: solution.popular || false,
      // Arabic fields
      title_ar: solution.title_ar || '',
      description_ar: solution.description_ar || '',
      long_description_ar: solution.long_description_ar || '',
      tagline_ar: solution.tagline_ar || '',
      category_ar: solution.category_ar || '',
      features_ar: solution.features_ar || [],
      key_benefits_ar: solution.key_benefits_ar || []
    })
    setEditingId(solution.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    const maxPriority = Math.max(...solutions.map(s => s.priority || 0), 0)
    setFormData({
      ...emptySolution,
      id: Date.now().toString(),
      priority: maxPriority + 10
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateSolutionFull(editingId, formData)
        toast.success('Solution updated successfully')
      } else {
        await createSolutionFull(formData)
        toast.success('Solution created successfully')
      }
      await loadSolutions()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save solution:', err)
      toast.error('Failed to save solution')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return
    try {
      await deleteSolutionFull(id)
      toast.success('Solution deleted successfully')
      await loadSolutions()
    } catch (err) {
      console.error('Failed to delete solution:', err)
      toast.error('Failed to delete solution')
    }
  }

  const handleArrayInput = (field: keyof Solution, value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const moveSolutionUp = (index: number) => {
    if (index === 0) return
    const newSolutions = [...solutions]
    const temp = newSolutions[index].priority
    newSolutions[index].priority = newSolutions[index - 1].priority
    newSolutions[index - 1].priority = temp
    newSolutions.sort((a, b) => a.priority - b.priority)
    setSolutions(newSolutions)
    setHasOrderChanges(true)
  }

  const moveSolutionDown = (index: number) => {
    if (index === solutions.length - 1) return
    const newSolutions = [...solutions]
    const temp = newSolutions[index].priority
    newSolutions[index].priority = newSolutions[index + 1].priority
    newSolutions[index + 1].priority = temp
    newSolutions.sort((a, b) => a.priority - b.priority)
    setSolutions(newSolutions)
    setHasOrderChanges(true)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    try {
      const items = solutions.map((s, i) => ({ id: s.id, priority: i * 10 }))
      await reorderSolutions(items)
      toast.success('Solution order saved successfully')
      setHasOrderChanges(false)
      await loadSolutions()
    } catch (err) {
      console.error('Failed to save order:', err)
      toast.error('Failed to save solution order')
    } finally {
      setSavingOrder(false)
    }
  }

  // Gallery image management
  const addGalleryImage = () => {
    setFormData({ ...formData, gallery_images: [...(formData.gallery_images || []), ''] })
  }
  const updateGalleryImage = (index: number, value: string) => {
    const imgs = [...(formData.gallery_images || [])]
    imgs[index] = value
    setFormData({ ...formData, gallery_images: imgs })
  }
  const removeGalleryImage = (index: number) => {
    setFormData({ ...formData, gallery_images: (formData.gallery_images || []).filter((_, i) => i !== index) })
  }

  // Feature card management
  const addFeatureCard = () => {
    setFormData({ ...formData, feature_cards: [...(formData.feature_cards || []), { title: '', description: '', benefits: [] } as FeatureCard] })
  }
  const updateFeatureCard = (index: number, field: string, value: any) => {
    const cards = [...(formData.feature_cards || [])] as FeatureCard[]
    cards[index] = { ...cards[index], [field]: value }
    setFormData({ ...formData, feature_cards: cards })
  }
  const removeFeatureCard = (index: number) => {
    setFormData({ ...formData, feature_cards: (formData.feature_cards || []).filter((_, i) => i !== index) })
  }

  // Related products (slug-based)
  const addRelatedProduct = () => {
    setFormData({ ...formData, related_products: [...(formData.related_products || []), ''] })
  }
  const updateRelatedProduct = (index: number, value: string) => {
    const prods = [...(formData.related_products || [])] as string[]
    prods[index] = value
    setFormData({ ...formData, related_products: prods })
  }
  const removeRelatedProduct = (index: number) => {
    setFormData({ ...formData, related_products: (formData.related_products || []).filter((_, i) => i !== index) })
  }

  const filteredSolutions = solutions.filter(solution =>
    solution.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    solution.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    solution.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="p-8 text-center">Loading solutions...</div>
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Solutions Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage smart living solutions with SEO, ordering & content</p>
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
            Add Solution
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search solutions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Total Solutions</p>
          <p className="text-2xl font-bold">{solutions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Featured</p>
          <p className="text-2xl font-bold">{solutions.filter(s => s.featured).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">With Products</p>
          <p className="text-2xl font-bold">{solutions.filter(s => s.related_products?.length).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Categories</p>
          <p className="text-2xl font-bold">{new Set(solutions.map(s => s.category)).size}</p>
        </div>
      </div>

      {/* Order Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Use the up/down arrows to change solution display order. Lower priority numbers appear first on the website.
        </p>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-semibold">{editingId ? 'Edit Solution' : 'Add Solution'}</h2>
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
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      })}
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      placeholder="e.g., Automation, Entertainment, Security"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <Input
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Short compelling tagline"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ImageUpload
                    value={formData.image || ''}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Solution Image *"
                    category="solutions"
                    showPreview={true}
                  />
                  <ImageUpload
                    value={formData.hero_image || ''}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                    label="Hero Image"
                    category="solutions"
                    showPreview={true}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Short Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    required
                    placeholder="Brief description for listings"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Long Description</label>
                  <Textarea
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    rows={4}
                    placeholder="Detailed description for the solution page - helps with SEO"
                  />
                </div>
              </div>

              {/* Features & Benefits */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Features & Benefits</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Features (comma-separated)</label>
                    <Input
                      value={formData.features?.join(', ')}
                      onChange={(e) => handleArrayInput('features', e.target.value)}
                      placeholder="Voice control, App integration, Energy monitoring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Key Benefits (comma-separated)</label>
                    <Input
                      value={formData.key_benefits?.join(', ')}
                      onChange={(e) => handleArrayInput('key_benefits', e.target.value)}
                      placeholder="Save up to 30% on energy, 24/7 control"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                    <Input
                      value={formData.tags?.join(', ')}
                      onChange={(e) => handleArrayInput('tags', e.target.value)}
                      placeholder="smart home, automation, luxury"
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Compatible Brands (comma-separated)</label>
                    <Input
                      value={formData.compatible_brands?.join(', ')}
                      onChange={(e) => handleArrayInput('compatible_brands', e.target.value)}
                      placeholder="Savant, Control4, Lutron"
                    />
                  </div>
                </div>
              </div>

              {/* Arabic Translations */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <span className="text-2xl">🇦🇪</span>
                  Arabic Translations (العربية)
                </h3>
                <p className="text-sm text-gray-500 mb-4">Add Arabic content for bilingual website support. Leave empty to use English content.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title (العنوان)</label>
                      <Input
                        value={formData.title_ar}
                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                        placeholder="عنوان الحل بالعربية"
                        dir="rtl"
                        className="text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category (الفئة)</label>
                      <Input
                        value={formData.category_ar}
                        onChange={(e) => setFormData({ ...formData, category_ar: e.target.value })}
                        placeholder="فئة الحل بالعربية"
                        dir="rtl"
                        className="text-right"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline (الشعار)</label>
                    <Input
                      value={formData.tagline_ar}
                      onChange={(e) => setFormData({ ...formData, tagline_ar: e.target.value })}
                      placeholder="شعار قصير بالعربية"
                      dir="rtl"
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description (الوصف المختصر)</label>
                    <Textarea
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      rows={2}
                      placeholder="وصف مختصر بالعربية"
                      dir="rtl"
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Long Description (الوصف التفصيلي)</label>
                    <Textarea
                      value={formData.long_description_ar}
                      onChange={(e) => setFormData({ ...formData, long_description_ar: e.target.value })}
                      rows={4}
                      placeholder="وصف تفصيلي بالعربية"
                      dir="rtl"
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Features (المميزات) - comma-separated</label>
                    <Input
                      value={formData.features_ar?.join(', ')}
                      onChange={(e) => handleArrayInput('features_ar', e.target.value)}
                      placeholder="ميزة 1، ميزة 2، ميزة 3"
                      dir="rtl"
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Key Benefits (الفوائد الرئيسية) - comma-separated</label>
                    <Input
                      value={formData.key_benefits_ar?.join(', ')}
                      onChange={(e) => handleArrayInput('key_benefits_ar', e.target.value)}
                      placeholder="فائدة 1، فائدة 2، فائدة 3"
                      dir="rtl"
                      className="text-right"
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
                      placeholder="e.g., Smart Home Automation Dubai | Complete Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description (Meta)</label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      placeholder="Meta description for search engines (150-160 characters)"
                    />
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Display Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData({ ...formData, popular: checked as boolean })}
                    />
                    <label htmlFor="popular" className="text-sm font-medium">Popular</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <Input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 100 })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Badge</label>
                    <Input
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g., New, Popular"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mega Menu Category</label>
                    <select
                      value={formData.mega_menu_category}
                      onChange={(e) => setFormData({ ...formData, mega_menu_category: e.target.value })}
                      className="w-full h-10 px-3 border border-gray-200 rounded-md"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="specialized">Specialized</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Menu Order</label>
                    <Input
                      type="number"
                      value={formData.mega_menu_order}
                      onChange={(e) => setFormData({ ...formData, mega_menu_order: parseInt(e.target.value) || 99 })}
                    />
                  </div>
                </div>
              </div>

              {/* Related Products */}
              <div className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Package size={20} />
                    Related Products
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                    <Plus size={16} className="mr-1" /> Add Product
                  </Button>
                </div>
                
                {(formData.related_products || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No products added. Add related products for better SEO.</p>
                ) : (
                  <div className="space-y-4">
                    {(formData.related_products || []).map((product, index) => (
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

              <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-white py-4">
                <Button type="submit" className="flex-1">{editingId ? 'Update Solution' : 'Create Solution'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Solutions List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-16">Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSolutions.map((solution, index) => (
                <tr key={solution.id} className="hover:bg-gray-50">
                  <td className="px-2 py-4">
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveSolutionUp(index)}
                        disabled={index === 0}
                      >
                        <ChevronUp size={14} />
                      </Button>
                      <span className="text-xs text-gray-400 text-center">{solution.priority}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveSolutionDown(index)}
                        disabled={index === filteredSolutions.length - 1}
                      >
                        <ChevronDown size={14} />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {solution.image && (
                        <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded">
                          <SafeImage src={solution.image} alt={solution.title} fill className="object-cover rounded" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{solution.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{solution.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">{solution.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm">{solution.related_products?.length || 0} products</span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {solution.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded flex items-center gap-1">
                          <Star size={10} /> Featured
                        </span>
                      )}
                      {solution.popular && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Popular</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => window.open(`/solutions/${solution.slug}`, '_blank')}>
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(solution)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(solution.id)}>
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

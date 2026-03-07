'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp, Save, Search, Package, Star, Eye, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  getServicesFull, 
  createServiceFull, 
  updateServiceFull, 
  deleteServiceFull,
  reorderServices 
} from '@/lib/adminApi'
import { toast } from 'sonner'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface ProcessStep {
  title: string
  description: string
  icon?: string
}

interface FAQ {
  question: string
  answer: string
}

interface FeatureCard {
  title: string
  description: string
  benefits: string[]
}

interface Service {
  id: string
  slug?: string
  name?: string
  title?: string
  description: string
  long_description?: string
  icon?: string
  image?: string
  hero_image?: string
  order: number
  priority: number
  tagline?: string
  seo_title?: string
  seo_description?: string
  key_features: string[]
  process_steps: ProcessStep[]
  related_products: string[]
  certifications: string[]
  faqs: FAQ[]
  featured: boolean
  brands: string[]
  gallery_images: string[]
  feature_cards: FeatureCard[]
  // Arabic translations
  name_ar?: string
  title_ar?: string
  description_ar?: string
  long_description_ar?: string
  tagline_ar?: string
  key_features_ar?: string[]
}

const emptyService: Partial<Service> = {
  id: '',
  slug: '',
  name: '',
  title: '',
  description: '',
  long_description: '',
  icon: '',
  image: '',
  hero_image: '',
  order: 100,
  priority: 100,
  tagline: '',
  seo_title: '',
  seo_description: '',
  key_features: [],
  process_steps: [],
  related_products: [],
  certifications: [],
  faqs: [],
  featured: false,
  brands: [],
  gallery_images: [],
  feature_cards: [],
  // Arabic translations
  name_ar: '',
  title_ar: '',
  description_ar: '',
  long_description_ar: '',
  tagline_ar: '',
  key_features_ar: []
}

// Helper to get display name
const getDisplayName = (service: Partial<Service>) => service.name || service.title || 'Unnamed Service'

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [hasOrderChanges, setHasOrderChanges] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState<Partial<Service>>(emptyService)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await getServicesFull()
      const servicesWithDefaults = (data.services || []).map((s: any, index: number) => ({
        ...s,
        priority: s.priority ?? s.order ?? index * 10,
        // Handle both old field names and new field names
        key_features: s.key_features?.length ? s.key_features : (s.features || []),
        process_steps: s.process_steps?.length ? s.process_steps : (s.process || []),
        related_products: s.related_products || [],
        certifications: s.certifications || [],
        faqs: s.faqs?.length ? s.faqs : (s.faq || []),
        // Include all other fields for proper editing
        long_description: s.long_description || '',
        tagline: s.tagline || '',
        seo_title: s.seo_title || '',
        seo_description: s.seo_description || '',
        image: s.image || '',
        hero_image: s.hero_image || '',
        icon: s.icon || '',
        featured: s.featured || false,
        // Arabic fields
        name_ar: s.name_ar || '',
        title_ar: s.title_ar || '',
        description_ar: s.description_ar || '',
        long_description_ar: s.long_description_ar || '',
        tagline_ar: s.tagline_ar || '',
        key_features_ar: s.key_features_ar || []
      }))
      setServices(servicesWithDefaults.sort((a: Service, b: Service) => a.priority - b.priority))
    } catch (err) {
      console.error('Failed to load services:', err)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      ...service,
      // Handle both old field names and new field names
      key_features: service.key_features?.length ? service.key_features : ((service as any).features || []),
      process_steps: service.process_steps?.length ? service.process_steps : ((service as any).process || []),
      related_products: service.related_products || [],
      certifications: service.certifications || [],
      faqs: service.faqs?.length ? service.faqs : ((service as any).faq || []),
      // New enrichment fields
      brands: (service as any).brands || [],
      gallery_images: (service as any).gallery_images || [],
      feature_cards: (service as any).feature_cards || [],
      // Ensure all text fields are included
      long_description: service.long_description || '',
      tagline: service.tagline || '',
      seo_title: service.seo_title || '',
      seo_description: service.seo_description || '',
      image: service.image || '',
      hero_image: service.hero_image || '',
      icon: service.icon || '',
      // Arabic fields
      name_ar: service.name_ar || '',
      title_ar: service.title_ar || '',
      description_ar: service.description_ar || '',
      long_description_ar: service.long_description_ar || '',
      tagline_ar: service.tagline_ar || '',
      key_features_ar: service.key_features_ar || []
    })
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    const maxPriority = Math.max(...services.map(s => s.priority || 0), 0)
    setFormData({
      ...emptyService,
      id: Date.now().toString(),
      priority: maxPriority + 10,
      order: maxPriority + 10
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateServiceFull(editingId, formData)
        toast.success('Service updated successfully')
      } else {
        await createServiceFull(formData)
        toast.success('Service created successfully')
      }
      await loadServices()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save service:', err)
      toast.error('Failed to save service')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await deleteServiceFull(id)
      toast.success('Service deleted successfully')
      await loadServices()
    } catch (err) {
      console.error('Failed to delete service:', err)
      toast.error('Failed to delete service')
    }
  }

  const handleArrayInput = (field: keyof Service, value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const moveServiceUp = (index: number) => {
    if (index === 0) return
    const newServices = [...services]
    const temp = newServices[index].priority
    newServices[index].priority = newServices[index - 1].priority
    newServices[index - 1].priority = temp
    newServices.sort((a, b) => a.priority - b.priority)
    setServices(newServices)
    setHasOrderChanges(true)
  }

  const moveServiceDown = (index: number) => {
    if (index === services.length - 1) return
    const newServices = [...services]
    const temp = newServices[index].priority
    newServices[index].priority = newServices[index + 1].priority
    newServices[index + 1].priority = temp
    newServices.sort((a, b) => a.priority - b.priority)
    setServices(newServices)
    setHasOrderChanges(true)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    try {
      const items = services.map((s, i) => ({ id: s.id, priority: i * 10 }))
      await reorderServices(items)
      toast.success('Service order saved successfully')
      setHasOrderChanges(false)
      await loadServices()
    } catch (err) {
      console.error('Failed to save order:', err)
      toast.error('Failed to save service order')
    } finally {
      setSavingOrder(false)
    }
  }

  // Process steps management
  const addProcessStep = () => {
    setFormData({
      ...formData,
      process_steps: [...(formData.process_steps || []), { title: '', description: '', icon: '' }]
    })
  }

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    const newSteps = [...(formData.process_steps || [])]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setFormData({ ...formData, process_steps: newSteps })
  }

  const removeProcessStep = (index: number) => {
    const newSteps = (formData.process_steps || []).filter((_, i) => i !== index)
    setFormData({ ...formData, process_steps: newSteps })
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

  // FAQ management
  const addFAQ = () => {
    setFormData({
      ...formData,
      faqs: [...(formData.faqs || []), { question: '', answer: '' }]
    })
  }

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const newFAQs = [...(formData.faqs || [])]
    newFAQs[index] = { ...newFAQs[index], [field]: value }
    setFormData({ ...formData, faqs: newFAQs })
  }

  const removeFAQ = (index: number) => {
    const newFAQs = (formData.faqs || []).filter((_, i) => i !== index)
    setFormData({ ...formData, faqs: newFAQs })
  }

  const filteredServices = services.filter(service =>
    getDisplayName(service).toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="p-8 text-center">Loading services...</div>
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Services Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage services with SEO, process steps & FAQs</p>
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
            Add Service
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Total Services</p>
          <p className="text-2xl font-bold">{services.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">Featured</p>
          <p className="text-2xl font-bold">{services.filter(s => s.featured).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">With FAQs</p>
          <p className="text-2xl font-bold">{services.filter(s => s.faqs?.length).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-600">With Process</p>
          <p className="text-2xl font-bold">{services.filter(s => s.process_steps?.length).length}</p>
        </div>
      </div>

      {/* Order Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> The first 6 services appear on the homepage. Use up/down arrows to reorder.
        </p>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-semibold">{editingId ? 'Edit Service' : 'Add Service'}</h2>
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
                    <label className="block text-sm font-medium mb-1">Service Title *</label>
                    <Input
                      value={formData.title || formData.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        title: e.target.value,
                        name: e.target.value,
                        slug: generateSlug(e.target.value)
                      })}
                      required
                      placeholder="e.g., Smart Home Design & Consultation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated from title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <Input
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Short compelling tagline"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon Name (Lucide)</label>
                    <Input
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., Home, Lightbulb, Shield"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ImageUpload
                    value={formData.image || ''}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Service Image"
                    category="services"
                    showPreview={true}
                  />
                  <ImageUpload
                    value={formData.hero_image || ''}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                    label="Hero Image"
                    category="services"
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
                    placeholder="Detailed description for the service page"
                  />
                </div>
              </div>

              {/* Features & Certifications */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Features & Certifications</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Key Features (comma-separated)</label>
                    <Input
                      value={formData.key_features?.join(', ')}
                      onChange={(e) => handleArrayInput('key_features', e.target.value)}
                      placeholder="Free consultation, 5-year warranty, 24/7 support"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Certifications (comma-separated)</label>
                    <Input
                      value={formData.certifications?.join(', ')}
                      onChange={(e) => handleArrayInput('certifications', e.target.value)}
                      placeholder="CEDIA Certified, THX Certified"
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
                      <label className="block text-sm font-medium mb-1">Name (الاسم)</label>
                      <Input
                        value={formData.name_ar}
                        onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                        placeholder="اسم الخدمة بالعربية"
                        dir="rtl"
                        className="text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title (العنوان)</label>
                      <Input
                        value={formData.title_ar}
                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                        placeholder="عنوان الخدمة بالعربية"
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
                    <label className="block text-sm font-medium mb-1">Key Features (المميزات الرئيسية) - comma-separated</label>
                    <Input
                      value={formData.key_features_ar?.join(', ')}
                      onChange={(e) => handleArrayInput('key_features_ar', e.target.value)}
                      placeholder="ميزة 1، ميزة 2، ميزة 3"
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
                      placeholder="e.g., Professional Smart Home Design Dubai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      placeholder="Meta description for search engines (150-160 chars)"
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
                    <label htmlFor="featured" className="text-sm font-medium">Featured Service</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <Input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 100 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Order</label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 100 })}
                    />
                  </div>
                </div>
              </div>

              {/* Process Steps */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <GripVertical size={20} />
                    Service Process Steps
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addProcessStep}>
                    <Plus size={16} className="mr-1" /> Add Step
                  </Button>
                </div>
                
                {(formData.process_steps || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No process steps defined.</p>
                ) : (
                  <div className="space-y-4">
                    {(formData.process_steps || []).map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-600">Step #{index + 1}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeProcessStep(index)} className="text-red-600 h-6">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Step Title *</label>
                            <Input
                              value={step.title}
                              onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                              placeholder="e.g., Consultation"
                              className="text-sm"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium mb-1">Description</label>
                            <Input
                              value={step.description}
                              onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                              placeholder="Brief step description"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAQs */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">FAQs</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
                    <Plus size={16} className="mr-1" /> Add FAQ
                  </Button>
                </div>
                
                {(formData.faqs || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No FAQs added.</p>
                ) : (
                  <div className="space-y-4">
                    {(formData.faqs || []).map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-600">FAQ #{index + 1}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFAQ(index)} className="text-red-600 h-6">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Question *</label>
                            <Input
                              value={faq.question}
                              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                              placeholder="e.g., How long does installation take?"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Answer *</label>
                            <Textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                              placeholder="Answer to the question"
                              rows={2}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4 text-lg">Brands (Service Page)</h3>
                <Input
                  value={(formData.brands || []).join(', ')}
                  onChange={(e) => handleArrayInput('brands' as any, e.target.value)}
                  placeholder="Crestron, Control4, Lutron, Sonos"
                />
                <p className="text-xs text-gray-400 mt-1">Brands shown in the &quot;Brands We Work With&quot; section</p>
              </div>

              {/* Gallery Images */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Gallery Images (Inspirations)</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addGalleryImage}>
                    <Plus size={16} className="mr-1" /> Add Image URL
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mb-3">Image URLs for the Inspirations gallery. First image is featured.</p>
                {(formData.gallery_images || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No gallery images.</p>
                ) : (
                  <div className="space-y-2">
                    {(formData.gallery_images || []).map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {url && <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden"><SafeImage src={url} alt="" fill className="object-cover" /></div>}
                        <Input value={url} onChange={(e) => updateGalleryImage(index, e.target.value)} placeholder="https://..." className="text-sm flex-1" />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeGalleryImage(index)} className="text-red-600 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Feature Cards */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Feature Cards (What You Get)</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addFeatureCard}>
                    <Plus size={16} className="mr-1" /> Add Card
                  </Button>
                </div>
                {(formData.feature_cards || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No feature cards.</p>
                ) : (
                  <div className="space-y-4">
                    {((formData.feature_cards || []) as FeatureCard[]).map((card, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-600">Card #{index + 1}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFeatureCard(index)} className="text-red-600 h-6"><Trash2 size={14} /></Button>
                        </div>
                        <div className="space-y-3">
                          <div><label className="block text-xs font-medium mb-1">Title *</label><Input value={card.title} onChange={(e) => updateFeatureCard(index, 'title', e.target.value)} placeholder="e.g., Site Assessment" className="text-sm" /></div>
                          <div><label className="block text-xs font-medium mb-1">Description</label><Textarea value={card.description} onChange={(e) => updateFeatureCard(index, 'description', e.target.value)} rows={2} className="text-sm" /></div>
                          <div><label className="block text-xs font-medium mb-1">Benefits (comma-separated)</label><Input value={(card.benefits || []).join(', ')} onChange={(e) => updateFeatureCard(index, 'benefits', e.target.value.split(',').map(b => b.trim()).filter(Boolean))} className="text-sm" /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Solutions */}
              <div className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Package size={20} /> Related Solutions
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addRelatedProduct}>
                    <Plus size={16} className="mr-1" /> Add Solution
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mb-3">Solution slugs shown as &quot;Solutions We Deploy&quot; image cards.</p>
                {(formData.related_products || []).length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No related solutions.</p>
                ) : (
                  <div className="space-y-2">
                    {(formData.related_products || []).map((slug, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={typeof slug === 'string' ? slug : ''} onChange={(e) => updateRelatedProduct(index, e.target.value)} placeholder="e.g., smart-home, lighting-automation" className="text-sm flex-1" />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRelatedProduct(index)} className="text-red-600 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-white py-4">
                <Button type="submit" className="flex-1">{editingId ? 'Update Service' : 'Create Service'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-16">Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Features</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">FAQs</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredServices.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-2 py-4">
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveServiceUp(index)}
                        disabled={index === 0}
                      >
                        <ChevronUp size={14} />
                      </Button>
                      <span className="text-xs text-gray-400 text-center">{service.priority}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => moveServiceDown(index)}
                        disabled={index === filteredServices.length - 1}
                      >
                        <ChevronDown size={14} />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium">{getDisplayName(service)}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{service.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm">{service.key_features?.length || 0} features</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm">{service.faqs?.length || 0} FAQs</span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {service.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded flex items-center gap-1 w-fit">
                        <Star size={10} /> Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(service.id)}>
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

      {/* Homepage Preview */}
      <div className="mt-8 bg-white rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold">Homepage Preview (First 6 Services)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
            >
              <div className="h-12 w-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                {service.icon ? service.icon.slice(0, 2).toUpperCase() : 'SV'}
              </div>
              <h3 className="font-semibold text-lg mb-2">{getDisplayName(service)}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

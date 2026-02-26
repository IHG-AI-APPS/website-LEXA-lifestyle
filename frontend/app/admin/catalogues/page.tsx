'use client'

import { useState, useEffect, useRef } from 'react'
import { getCatalogues, createCatalogue, updateCatalogue, deleteCatalogue } from '@/lib/adminApi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, X, Upload, FileText, BookOpen, ExternalLink } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface CatalogueForm {
  id: string
  slug: string
  title: string
  description: string
  category: string
  pdf_url: string
  thumbnail: string
  page_count: number
  brand_slug: string
  featured: boolean
  priority: number
  published: boolean
}

const CATEGORIES = [
  { value: 'company-profile', label: 'Company Profile' },
  { value: 'pre-qualification', label: 'Pre-Qualification' },
  { value: 'brand-catalogues', label: 'Brand Catalogues' },
]

const defaultForm: CatalogueForm = {
  id: '',
  slug: '',
  title: '',
  description: '',
  category: 'company-profile',
  pdf_url: '',
  thumbnail: '',
  page_count: 0,
  brand_slug: '',
  featured: false,
  priority: 100,
  published: true,
}

export default function AdminCataloguesPage() {
  const [catalogues, setCatalogues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<CatalogueForm>({ ...defaultForm })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadCatalogues = async () => {
    try {
      const data = await getCatalogues()
      setCatalogues(data)
    } catch (e) {
      console.error('Failed to load catalogues', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCatalogues() }, [])

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleAdd = () => {
    setFormData({ ...defaultForm })
    setIsEditing(false)
    setShowForm(true)
  }

  const handleEdit = (cat: any) => {
    setFormData({
      id: cat.id || '',
      slug: cat.slug || '',
      title: cat.title || '',
      description: cat.description || '',
      category: cat.category || 'company-profile',
      pdf_url: cat.pdf_url || '',
      thumbnail: cat.thumbnail || '',
      page_count: cat.page_count || 0,
      brand_slug: cat.brand_slug || '',
      featured: cat.featured || false,
      priority: cat.priority ?? 100,
      published: cat.published !== false,
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this catalogue?')) return
    try {
      await deleteCatalogue(id)
      await loadCatalogues()
    } catch (e) {
      alert('Failed to delete')
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed')
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('category', 'catalogues')
      const res = await fetch(`${BACKEND_URL}/api/uploads/pdf`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setFormData(prev => ({
        ...prev,
        pdf_url: data.url,
        slug: prev.slug || generateSlug(file.name.replace('.pdf', '')),
        title: prev.title || file.name.replace('.pdf', '').replace(/[-_]/g, ' ')
      }))
    } catch (e) {
      alert('PDF upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim()) return alert('Title is required')
    if (!formData.pdf_url.trim()) return alert('PDF file is required')
    if (!formData.slug.trim()) formData.slug = generateSlug(formData.title)

    setSaving(true)
    try {
      if (isEditing) {
        await updateCatalogue(formData.id, formData)
      } else {
        await createCatalogue(formData)
      }
      setShowForm(false)
      await loadCatalogues()
    } catch (e) {
      alert('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" data-testid="admin-catalogues-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catalogues</h1>
          <p className="text-sm text-gray-500">Manage PDF catalogues and documents</p>
        </div>
        <Button onClick={handleAdd} data-testid="add-catalogue-btn">
          <Plus size={16} className="mr-1" /> Add Catalogue
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : catalogues.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-2">No catalogues yet</p>
          <Button variant="outline" onClick={handleAdd} size="sm">
            <Plus size={14} className="mr-1" /> Add your first catalogue
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" data-testid="catalogues-table">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Pages</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Preview</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catalogues.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50" data-testid={`catalogue-row-${cat.slug}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                        <FileText size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cat.title}</p>
                        <p className="text-xs text-gray-400">/{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {CATEGORIES.find(c => c.value === cat.category)?.label || cat.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${cat.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {cat.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{cat.page_count || '-'}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`/catalogues/${cat.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
                    >
                      View <ExternalLink size={10} />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(cat)} data-testid={`edit-${cat.slug}`}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-700" data-testid={`delete-${cat.slug}`}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="catalogue-form-modal">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold">{isEditing ? 'Edit Catalogue' : 'Add New Catalogue'}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X size={18} /></Button>
            </div>

            <div className="p-6 space-y-5">
              {/* PDF Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50">
                {formData.pdf_url ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <FileText size={20} className="text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">PDF uploaded</p>
                        <p className="text-xs text-gray-400 truncate max-w-[250px]">{formData.pdf_url}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      Replace
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload a PDF catalogue</p>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} data-testid="upload-pdf-btn">
                      {uploading ? 'Uploading...' : 'Choose PDF'}
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">Max 50MB</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handlePdfUpload} className="hidden" data-testid="pdf-file-input" />
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setFormData({ ...formData, title, slug: isEditing ? formData.slug : generateSlug(title) })
                    }}
                    placeholder="e.g., LEXA Company Profile 2026"
                    data-testid="catalogue-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="lexa-company-profile-2026"
                    data-testid="catalogue-slug-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this document"
                  data-testid="catalogue-desc-input"
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    data-testid="catalogue-category-select"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand Slug (optional)</label>
                  <Input
                    value={formData.brand_slug || ''}
                    onChange={(e) => setFormData({ ...formData, brand_slug: e.target.value })}
                    placeholder="e.g., lutron (for brand catalogues)"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
                <ImageUpload
                  value={formData.thumbnail}
                  onChange={(url) => setFormData({ ...formData, thumbnail: url })}
                  label="Cover"
                  category="catalogues"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Page Count</label>
                  <Input
                    type="number"
                    value={formData.page_count || ''}
                    onChange={(e) => setFormData({ ...formData, page_count: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <Input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 100 })}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="rounded" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded" />
                    Featured
                  </label>
                </div>
              </div>

              {/* Save */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={handleSave} disabled={saving} className="flex-1" data-testid="save-catalogue-btn">
                  {saving ? 'Saving...' : isEditing ? 'Update Catalogue' : 'Create Catalogue'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ContentSection {
  type: string
  title?: string
  content?: string
  stats?: { value: string; label: string }[]
}

export default function EditArabicPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    english_alternate_url: '',
    page_type: 'landing',
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    cta_text: 'احصل على استشارة مجانية',
    cta_url: '/contact',
    published: true,
    priority: 0.8
  })
  
  const [contentSections, setContentSections] = useState<ContentSection[]>([])

  useEffect(() => {
    fetchPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      const slug = decodeURIComponent(params.slug)
      
      const response = await fetch(`${backendUrl}/api/admin/arabic-pages/${slug}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        const page = data.data
        
        setFormData({
          slug: page.slug,
          title: page.title,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords.join(', '),
          canonical_url: page.canonical_url,
          english_alternate_url: page.english_alternate_url || '',
          page_type: page.page_type,
          hero_title: page.hero_title,
          hero_subtitle: page.hero_subtitle,
          hero_description: page.hero_description || '',
          cta_text: page.cta_text || 'احصل على استشارة مجانية',
          cta_url: page.cta_url || '/contact',
          published: page.published,
          priority: page.priority
        })
        
        setContentSections(page.content_sections || [])
      } else {
        alert('❌ Failed to load page')
        router.push('/lexa_admin@2026/arabic-pages')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error loading page')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const addContentSection = (type: string) => {
    const newSection: ContentSection = { type }
    if (type === 'text') {
      newSection.title = ''
      newSection.content = ''
    } else if (type === 'stats') {
      newSection.stats = [
        { value: '', label: '' },
        { value: '', label: '' },
        { value: '', label: '' }
      ]
    }
    setContentSections([...contentSections, newSection])
  }

  const updateSection = (index: number, field: string, value: any) => {
    const updated = [...contentSections]
    updated[index] = { ...updated[index], [field]: value }
    setContentSections(updated)
  }

  const updateStat = (sectionIndex: number, statIndex: number, field: string, value: string) => {
    const updated = [...contentSections]
    if (updated[sectionIndex].stats) {
      updated[sectionIndex].stats![statIndex] = {
        ...updated[sectionIndex].stats![statIndex],
        [field]: value
      }
      setContentSections(updated)
    }
  }

  const removeSection = (index: number) => {
    setContentSections(contentSections.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

      const payload = {
        title: formData.title,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords.split(',').map(k => k.trim()).filter(k => k),
        canonical_url: formData.canonical_url,
        english_alternate_url: formData.english_alternate_url || null,
        page_type: formData.page_type,
        hero_title: formData.hero_title,
        hero_subtitle: formData.hero_subtitle,
        hero_description: formData.hero_description || null,
        content_sections: contentSections,
        cta_text: formData.cta_text,
        cta_url: formData.cta_url,
        published: formData.published,
        priority: parseFloat(formData.priority.toString())
      }

      const response = await fetch(`${backendUrl}/api/admin/arabic-pages/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        alert('✅ Page updated successfully!')
        router.push('/lexa_admin@2026/arabic-pages')
      } else {
        const error = await response.json()
        alert(`❌ Error: ${error.detail || 'Failed to update page'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error updating page')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                <div className="h-10 bg-gray-100 rounded"></div>
                <div className="h-32 bg-gray-100 rounded"></div>
                <div className="h-10 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/lexa_admin@2026/arabic-pages" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Arabic Pages
            </Link>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Edit Arabic Page</h1>
            <p className="text-gray-600 mt-1">Editing: <span className="font-mono text-sm">{formData.slug}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Slug cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Page Type *</label>
                <select
                  name="page_type"
                  value={formData.page_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="landing">Landing Page</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Title (Arabic) *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">SEO Metadata</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title *</label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Meta Description *</label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Canonical URL *</label>
                  <input
                    type="url"
                    name="canonical_url"
                    value={formData.canonical_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">English Alternate URL</label>
                  <input
                    type="url"
                    name="english_alternate_url"
                    value={formData.english_alternate_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sitemap Priority</label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min="0"
                  max="1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Hero Title *</label>
                <input
                  type="text"
                  name="hero_title"
                  value={formData.hero_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Hero Subtitle *</label>
                <input
                  type="text"
                  name="hero_subtitle"
                  value={formData.hero_subtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Hero Description</label>
                <textarea
                  name="hero_description"
                  value={formData.hero_description}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Content Sections</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addContentSection('text')}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  + Text Section
                </button>
                <button
                  type="button"
                  onClick={() => addContentSection('stats')}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  + Stats Section
                </button>
              </div>
            </div>

            {contentSections.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No content sections. Click buttons above to add.</p>
            ) : (
              <div className="space-y-4">
                {contentSections.map((section, index) => (
                  <div key={index} className="border border-gray-300 rounded p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-sm uppercase">{section.type} Section</span>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {section.type === 'text' && (
                      <>
                        <input
                          type="text"
                          value={section.title || ''}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="عنوان القسم"
                          className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                          dir="rtl"
                        />
                        <textarea
                          value={section.content || ''}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          placeholder="محتوى النص..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          dir="rtl"
                        />
                      </>
                    )}

                    {section.type === 'stats' && section.stats && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {section.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="border border-gray-200 rounded p-3">
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStat(index, statIndex, 'value', e.target.value)}
                              placeholder="500+"
                              className="w-full px-2 py-1 border border-gray-300 rounded mb-2 text-center font-bold"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateStat(index, statIndex, 'label', e.target.value)}
                              placeholder="المشاريع"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              dir="rtl"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Call-to-Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                <input
                  type="text"
                  name="cta_text"
                  value={formData.cta_text}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CTA Button URL</label>
                <input
                  type="text"
                  name="cta_url"
                  value={formData.cta_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Publish Settings */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Publish Settings</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Link href="/lexa_admin@2026/arabic-pages">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

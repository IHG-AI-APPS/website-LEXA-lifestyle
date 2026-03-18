'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Save, Plus, Search, Globe, CheckCircle, AlertCircle,
  Tag, Link as LinkIcon, Image as ImageIcon, BarChart3, Eye
} from 'lucide-react'

interface MetaTag {
  page_id: string
  page_name?: string
  title: string
  description: string
  keywords: string[]
  og_title?: string
  og_description?: string
  og_image?: string
  canonical_url?: string
  robots?: string
  updated_at?: string
}

export default function MetaTagsEditor() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedPage, setSelectedPage] = useState<MetaTag | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchMetaTags()
  }, [])

  const fetchMetaTags = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/meta-tags`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      const data = await response.json()
      setMetaTags(data)
    } catch (error) {
      console.error('Error fetching meta tags:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveMetaTags = async (pageId: string, metaData: Partial<MetaTag>) => {
    setSaving(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/meta-tags/${pageId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(metaData)
        }
      )

      if (response.ok) {
        await fetchMetaTags()
        setSelectedPage(null)
        alert('Meta tags saved successfully!')
      } else {
        alert('Failed to save meta tags')
      }
    } catch (error) {
      console.error('Error saving meta tags:', error)
      alert('Error saving meta tags')
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPage) {
      saveMetaTags(selectedPage.page_id, selectedPage)
    }
  }

  const filteredPages = metaTags.filter(page =>
    page.page_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Common pages that should have meta tags
  const commonPages = [
    { id: 'homepage', name: 'Homepage', path: '/' },
    { id: 'about', name: 'About Us', path: '/about' },
    { id: 'services', name: 'Services', path: '/services' },
    { id: 'projects', name: 'Projects', path: '/projects' },
    { id: 'blog', name: 'Blog', path: '/blog' },
    { id: 'contact', name: 'Contact', path: '/contact' },
    { id: 'experience-centre', name: 'Experience Centre', path: '/experience-centre' }
  ]

  const getCharCount = (text: string | undefined, max: number) => {
    const length = text?.length || 0
    const color = length > max ? 'text-red-600' : length > max * 0.9 ? 'text-yellow-600' : 'text-gray-600'
    return <span className={`text-sm ${color}`}>{length}/{max}</span>
  }

  if (loading) {
    return <div className="p-8">Loading meta tags...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meta Tags Editor</h1>
              <p className="text-gray-600 mt-2">Manage SEO meta tags for all pages</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Page
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pages</p>
                <p className="text-2xl font-bold">{metaTags.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Optimized</p>
                <p className="text-2xl font-bold">
                  {metaTags.filter(p => p.title && p.description && p.title.length <= 60 && p.description.length <= 160).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Need Attention</p>
                <p className="text-2xl font-bold">
                  {metaTags.filter(p => !p.title || !p.description || p.title.length > 60 || p.description.length > 160).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">With OG Tags</p>
                <p className="text-2xl font-bold">
                  {metaTags.filter(p => p.og_title && p.og_image).length}
                </p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Pages List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pages List */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Pages</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredPages.map((page) => (
                <motion.div
                  key={page.page_id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedPage(page)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPage?.page_id === page.page_id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{page.page_id}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{page.title || 'No title set'}</p>
                    </div>
                    {page.title && page.description && page.title.length <= 60 && page.description.length <= 160 ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}

              {filteredPages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No pages found. Add a new page to get started.
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {selectedPage ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Edit Meta Tags</h2>
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </motion.button>
                </div>

                {/* Page ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page ID
                  </label>
                  <input
                    type="text"
                    value={selectedPage.page_id}
                    disabled
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Meta Title *
                    </label>
                    {getCharCount(selectedPage.title, 60)}
                  </div>
                  <input
                    type="text"
                    value={selectedPage.title || ''}
                    onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                    placeholder="Page Title - Brand Name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength={70}
                  />
                  <p className="text-xs text-gray-500 mt-1">Optimal: 50-60 characters</p>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Meta Description *
                    </label>
                    {getCharCount(selectedPage.description, 160)}
                  </div>
                  <textarea
                    value={selectedPage.description || ''}
                    onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                    placeholder="Compelling description that encourages clicks..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength={170}
                  />
                  <p className="text-xs text-gray-500 mt-1">Optimal: 150-160 characters</p>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={selectedPage.keywords?.join(', ') || ''}
                    onChange={(e) => setSelectedPage({ 
                      ...selectedPage, 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    })}
                    placeholder="smart home, automation, dubai"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={selectedPage.canonical_url || ''}
                    onChange={(e) => setSelectedPage({ ...selectedPage, canonical_url: e.target.value })}
                    placeholder="https://lexalifestyle.com/page"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Robots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Robots
                  </label>
                  <select
                    value={selectedPage.robots || 'index,follow'}
                    onChange={(e) => setSelectedPage({ ...selectedPage, robots: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="index,follow">Index, Follow (Default)</option>
                    <option value="noindex,follow">No Index, Follow</option>
                    <option value="index,nofollow">Index, No Follow</option>
                    <option value="noindex,nofollow">No Index, No Follow</option>
                  </select>
                </div>

                {/* Open Graph */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Open Graph (Social Media)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Title
                      </label>
                      <input
                        type="text"
                        value={selectedPage.og_title || ''}
                        onChange={(e) => setSelectedPage({ ...selectedPage, og_title: e.target.value })}
                        placeholder="Leave empty to use meta title"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                      </label>
                      <textarea
                        value={selectedPage.og_description || ''}
                        onChange={(e) => setSelectedPage({ ...selectedPage, og_description: e.target.value })}
                        placeholder="Leave empty to use meta description"
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Image URL
                      </label>
                      <input
                        type="url"
                        value={selectedPage.og_image || ''}
                        onChange={(e) => setSelectedPage({ ...selectedPage, og_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Select a page to edit meta tags</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Add Common Pages */}
        {metaTags.length === 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Start: Add Common Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {commonPages.map((page) => (
                <motion.button
                  key={page.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedPage({
                      page_id: page.id,
                      page_name: page.name,
                      title: '',
                      description: '',
                      keywords: [],
                      robots: 'index,follow'
                    })
                  }}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left"
                >
                  <p className="font-medium text-sm">{page.name}</p>
                  <p className="text-xs text-gray-500">{page.path}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

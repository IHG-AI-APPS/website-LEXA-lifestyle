'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Globe, FileText, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ArabicPage {
  slug: string
  title: string
  meta_title: string
  page_type: string
  published: boolean
  priority: number
  created_at: string
  updated_at: string
}

export default function ArabicPagesAdmin() {
  const [pages, setPages] = useState<ArabicPage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'landing' | 'blog'>('all')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/admin/arabic-pages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setPages(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (slug: string) => {
    if (!confirm(`حذف الصفحة العربية '${slug}'؟`)) return
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      await fetch(`${backendUrl}/api/admin/arabic-pages/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchPages()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredPages = pages.filter(page => {
    if (filter === 'all') return true
    return page.page_type === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div><div className="space-y-3"><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div></div></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Arabic SEO Pages</h1>
            <p className="text-gray-600">Manage Arabic language landing pages and blog posts</p>
          </div>
          <Link href="/admin/arabic-pages/create">
            <Button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Arabic Page
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-2xl font-bold text-[#1A1A1A] mb-1">{pages.length}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-2xl font-bold text-[#1A1A1A] mb-1">
              {pages.filter(p => p.page_type === 'landing').length}
            </div>
            <div className="text-sm text-gray-600">Landing Pages</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-2xl font-bold text-[#1A1A1A] mb-1">
              {pages.filter(p => p.page_type === 'blog').length}
            </div>
            <div className="text-sm text-gray-600">Blog Posts</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {pages.filter(p => p.published).length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-medium ${
              filter === 'all'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({pages.length})
          </button>
          <button
            onClick={() => setFilter('landing')}
            className={`px-4 py-2 font-medium ${
              filter === 'landing'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Landing Pages ({pages.filter(p => p.page_type === 'landing').length})
          </button>
          <button
            onClick={() => setFilter('blog')}
            className={`px-4 py-2 font-medium ${
              filter === 'blog'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Blog Posts ({pages.filter(p => p.page_type === 'blog').length})
          </button>
        </div>

        {/* Pages Table */}
        <div className="bg-white border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Page
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No Arabic pages found
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[#1A1A1A]">{page.title}</div>
                      <div className="text-xs text-gray-500 mt-1 font-mono">/ar-seo/{page.slug}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        page.page_type === 'blog' 
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {page.page_type === 'blog' ? <FileText className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                        {page.page_type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        page.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {page.published ? '✓ Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {page.priority}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {page.updated_at ? new Date(page.updated_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <a
                          href={`/ar-seo/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-gray-100 rounded"
                          title="View page"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </a>
                        <Link href={`/admin/arabic-pages/edit/${page.slug}`}>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                        </Link>
                        <button
                          onClick={() => deletePage(page.slug)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ About Arabic Pages</h3>
          <p className="text-sm text-blue-800 mb-2">
            These pages are dynamically generated from the database and automatically included in the sitemap.
            All pages support RTL (right-to-left) layout and are SEO-optimized for Arabic search queries.
          </p>
          <p className="text-sm text-blue-800">
            <strong>Page Types:</strong> Landing pages are for locations/services, Blog posts are for content marketing.
          </p>
        </div>
      </div>
    </div>
  )
}

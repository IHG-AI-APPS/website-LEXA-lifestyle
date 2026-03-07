'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  published: boolean
  created_at: string
}

const defaultFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'company-news',
  author: 'LEXA Team',
  published: true
}

export default function NewsAdmin() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/news?limit=100`)
      if (response.ok) {
        const data = await response.json()
        const rawNews = Array.isArray(data) ? data : data.news || []
        // Ensure all news items have proper defaults
        const newsWithDefaults = rawNews.map((n: any) => ({
          ...n,
          title: n.title || '',
          slug: n.slug || '',
          excerpt: n.excerpt || '',
          content: n.content || '',
          image: n.image || '',
          category: n.category || 'company-news',
          author: n.author || 'LEXA Team',
          published: n.published !== false
        }))
        setNews(newsWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load news')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingId ? formData.slug : generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingId 
        ? `${API_URL}/api/admin/news/${editingId}`
        : `${API_URL}/api/admin/news`
      
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingId ? 'News updated!' : 'News created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(defaultFormData)
        fetchNews()
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save news')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: NewsItem) => {
    setFormData({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || '',
      content: item.content || '',
      image: item.image || '',
      category: item.category || 'company-news',
      author: item.author || 'LEXA Team',
      published: item.published !== false
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('News deleted!')
        fetchNews()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete')
    }
  }

  const filteredNews = news.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 text-sm mt-1">Manage company news and announcements</p>
        </div>
        <Button 
          onClick={() => {
            setFormData(defaultFormData)
            setEditingId(null)
            setShowForm(true)
          }}
          className="bg-[#1A1A1A] hover:bg-[#2A2A2A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{news.length}</div>
          <div className="text-sm text-gray-500">Total News Items</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {news.filter(n => n.published !== false).length}
          </div>
          <div className="text-sm text-gray-500">Published</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* News Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">News</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredNews.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">/{item.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    {item.category || 'General'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.published !== false
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.published !== false ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <a
                      href={`/news/${item.slug}`}
                      target="_blank"
                      className="p-1.5 hover:bg-gray-100 rounded"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </a>
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-1.5 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredNews.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  {searchQuery ? 'No news items match your search' : 'No news items yet. Click "Add News" to create one.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'Edit News' : 'Create News'}
        size="xl"
      >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter news title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <Textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the news content here"
                  rows={10}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Featured Image"
                category="news"
                showPreview={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="company-news">Company News</option>
                    <option value="product-launch">Product Launch</option>
                    <option value="event">Event</option>
                    <option value="partnership">Partnership</option>
                    <option value="award">Award</option>
                    <option value="press-release">Press Release</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm">Publish immediately</label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={saving} className="bg-[#1A1A1A] hover:bg-[#2A2A2A]">
                  {saving ? 'Saving...' : (editingId ? 'Update News' : 'Create News')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
      </Modal>
    </div>
  )
}

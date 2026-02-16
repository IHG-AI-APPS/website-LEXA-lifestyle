'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getArticles, type Article } from '@/lib/api'
import { createArticle, updateArticle, deleteArticle } from '@/lib/adminApi'
import { ImageUpload } from '@/components/admin/ImageUpload'

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Article>>({
    id: '',
    slug: '',
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    read_time: 5,
    published_date: new Date().toISOString().split('T')[0],
    tags: []
  })

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const data = await getArticles()
      // Ensure all articles have proper defaults
      const articlesWithDefaults = data.map((a: any) => ({
        ...a,
        slug: a.slug || '',
        title: a.title || '',
        category: a.category || '',
        excerpt: a.excerpt || '',
        content: a.content || '',
        image: a.image || '',
        author: a.author || 'LEXA Team',
        read_time: a.read_time || 5,
        published_date: a.published_date || new Date().toISOString().split('T')[0],
        tags: a.tags || []
      }))
      setArticles(articlesWithDefaults)
    } catch (err) {
      console.error('Failed to load articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (article: Article) => {
    setFormData({
      ...article,
      slug: article.slug || '',
      title: article.title || '',
      category: article.category || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      image: article.image || '',
      author: article.author || 'LEXA Team',
      read_time: article.read_time || 5,
      published_date: article.published_date || new Date().toISOString().split('T')[0],
      tags: article.tags || []
    })
    setEditingId(article.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData({
      id: Date.now().toString(),
      slug: '',
      title: '',
      category: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'LEXA Team',
      read_time: 5,
      published_date: new Date().toISOString().split('T')[0],
      tags: []
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateArticle(editingId, formData as Article)
      } else {
        await createArticle(formData as Article)
      }
      await loadArticles()
      setShowForm(false)
    } catch (err) {
      console.error('Failed to save article:', err)
      alert('Failed to save article')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      await deleteArticle(id)
      await loadArticles()
    } catch (err) {
      console.error('Failed to delete article:', err)
      alert('Failed to delete article')
    }
  }

  const handleArrayInput = (value: string) => {
    setFormData({
      ...formData,
      tags: value.split(',').map(item => item.trim()).filter(Boolean)
    })
  }

  if (loading) {
    return <div className="text-center py-20">Loading articles...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Articles</h1>
          <p className="text-gray-600">Manage blog content and resources</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-charcoal hover:bg-charcoal-light text-white"
        >
          <Plus size={20} className="mr-2" />
          Add Article
        </Button>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{article.title}</div>
                  <div className="text-sm text-gray-600 line-clamp-1">{article.excerpt}</div>
                </td>
                <td className="px-6 py-4 text-sm">{article.category}</td>
                <td className="px-6 py-4 text-sm">{article.author}</td>
                <td className="px-6 py-4 text-sm">{article.published_date}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button 
                    onClick={() => handleEdit(article)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Edit size={16} className="inline" />
                  </button>
                  <button 
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {editingId ? 'Edit Article' : 'Add Article'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <Input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <Input
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Smart Home, Automation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt *</label>
                <textarea
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <textarea
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 font-mono text-sm"
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Markdown supported"
                />
              </div>

              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Featured Image *"
                category="articles"
                showPreview={true}
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author *</label>
                  <Input
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Read Time (min) *</label>
                  <Input
                    required
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Published Date *</label>
                  <Input
                    required
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <Input
                  value={formData.tags?.join(', ')}
                  onChange={(e) => handleArrayInput(e.target.value)}
                  placeholder="e.g., smart home, automation, technology"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-charcoal hover:bg-charcoal-light text-white flex-1">
                  {editingId ? 'Update' : 'Create'} Article
                </Button>
                <Button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

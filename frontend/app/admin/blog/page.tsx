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

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  featured_image?: string
  category: string
  author: string
  tags: string[]
  published: boolean
  created_at: string
}

const getDefaultFormData = () => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  featured_image: '',
  category: 'smart-home',
  author: 'LEXA Team',
  tags: [] as string[],
  published: true,
  read_time: 5,
  published_date: new Date().toISOString().split('T')[0]
})

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(getDefaultFormData())
  const [searchQuery, setSearchQuery] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/articles?limit=100`)
      if (response.ok) {
        const data = await response.json()
        // Ensure all posts have proper defaults
        const postsWithDefaults = data.map((p: any) => ({
          ...p,
          title: p.title || '',
          slug: p.slug || '',
          excerpt: p.excerpt || '',
          content: p.content || '',
          image: p.image || p.featured_image || '',
          featured_image: p.featured_image || p.image || '',
          category: p.category || 'smart-home',
          author: p.author || 'LEXA Team',
          tags: p.tags || [],
          published: p.published !== false
        }))
        setPosts(postsWithDefaults)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load blog posts')
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
        ? `${API_URL}/api/admin/articles/${editingId}`
        : `${API_URL}/api/admin/articles`
      
      const method = editingId ? 'PUT' : 'POST'
      
      // Ensure slug is generated if empty
      const slug = formData.slug || generateSlug(formData.title) || `blog-${Date.now()}`
      const articleId = editingId || `blog-${Date.now()}`
      
      const payload = {
        id: articleId,
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt || '',
        content: formData.content,
        image: formData.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        category: formData.category || 'smart-home',
        author: formData.author || 'LEXA Team',
        tags: formData.tags || [],
        read_time: formData.read_time || 5,
        published_date: formData.published_date || new Date().toISOString().split('T')[0]
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast.success(editingId ? 'Blog post updated!' : 'Blog post created!')
        setShowForm(false)
        setEditingId(null)
        setFormData(getDefaultFormData())
        await fetchPosts()
      } else {
        const error = await response.json()
        console.error('API Error:', error)
        toast.error(error.detail || 'Failed to save')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      image: post.image || post.featured_image || '',
      featured_image: post.featured_image || post.image || '',
      category: post.category || 'smart-home',
      author: post.author || 'LEXA Team',
      tags: post.tags || [],
      published: post.published !== false,
      read_time: (post as any).read_time || 5,
      published_date: (post as any).published_date || new Date().toISOString().split('T')[0]
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        toast.success('Blog post deleted!')
        fetchPosts()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete')
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 dark:bg-zinc-800 rounded"></div>
            <div className="h-12 bg-gray-100 dark:bg-zinc-800 rounded"></div>
            <div className="h-12 bg-gray-100 dark:bg-zinc-800 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-gray-600 dark:text-zinc-400 text-sm mt-1">Create and manage blog posts</p>
        </div>
        <Button 
          onClick={() => {
            setFormData(getDefaultFormData())
            setEditingId(null)
            setShowForm(true)
          }}
          className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
          <div className="text-sm text-gray-500 dark:text-zinc-400">Total Posts</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-800">
          <div className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.published !== false).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-zinc-400">Published</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border dark:border-zinc-800">
          <div className="text-2xl font-bold text-amber-600">
            {posts.filter(p => p.published === false).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-zinc-400">Drafts</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-300 uppercase">Post</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-300 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-300 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-300 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-zinc-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {(post.image || post.featured_image) && (
                      <img 
                        src={post.image || post.featured_image} 
                        alt={post.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-500">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded">
                    {post.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    post.published !== false
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}>
                    {post.published !== false ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-zinc-400">
                  {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
                    </a>
                    <button 
                      onClick={() => handleEdit(post)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500 dark:text-zinc-500">
                  {searchQuery ? 'No posts match your search' : 'No blog posts yet. Click "Add Blog Post" to create one.'}
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
        title={editingId ? 'Edit Blog Post' : 'Create Blog Post'}
        size="xl"
      >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Title *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the blog post"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Content *</label>
                <Textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here (supports Markdown)"
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url, featured_image: url })}
                label="Featured Image"
                category="blog"
                showPreview={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value="smart-home">Smart Home</option>
                    <option value="automation">Automation</option>
                    <option value="lighting">Lighting</option>
                    <option value="security">Security</option>
                    <option value="audio-video">Audio/Video</option>
                    <option value="climate">Climate Control</option>
                    <option value="news">News</option>
                    <option value="guides">Guides</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">Tags (comma separated)</label>
                  <Input
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    placeholder="smart home, automation, tips"
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
                <label htmlFor="published" className="text-sm text-gray-700 dark:text-zinc-300">Publish immediately</label>
              </div>

              <div className="flex gap-3 pt-4 border-t dark:border-zinc-800">
                <Button type="submit" disabled={saving} className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white">
                  {saving ? 'Saving...' : (editingId ? 'Update Post' : 'Create Post')}
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

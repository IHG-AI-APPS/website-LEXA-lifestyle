'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Plus, Pencil, Trash2, Globe, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

interface GeoPage {
  id: string
  slug: string
  title: string
  meta_description: string
  meta_keywords: string
  region: string
  area_name: string
  hero_headline: string
  hero_subheadline: string
  active: boolean
  created_at?: string
  updated_at?: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function GeoPageAdmin() {
  const [geoPages, setGeoPages] = useState<GeoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<GeoPage | null>(null)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    meta_description: '',
    meta_keywords: '',
    region: 'dubai',
    area_name: '',
    hero_headline: '',
    hero_subheadline: '',
    active: true
  })

  useEffect(() => {
    fetchGeoPages()
  }, [])

  const fetchGeoPages = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/geo-pages`)
      const data = await res.json()
      setGeoPages(data.geo_pages || [])
    } catch (error) {
      console.error('Error fetching geo pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const seedDefaults = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/geo-pages/seed-defaults`, { method: 'POST' })
      const data = await res.json()
      alert(data.message)
      fetchGeoPages()
    } catch (error) {
      console.error('Error seeding defaults:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingPage 
        ? `${BACKEND_URL}/api/geo-pages/${editingPage.id}`
        : `${BACKEND_URL}/api/geo-pages`
      
      const res = await fetch(url, {
        method: editingPage ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setShowForm(false)
        setEditingPage(null)
        resetForm()
        fetchGeoPages()
      }
    } catch (error) {
      console.error('Error saving geo page:', error)
    }
  }

  const handleEdit = (page: GeoPage) => {
    setEditingPage(page)
    setFormData({
      slug: page.slug,
      title: page.title,
      meta_description: page.meta_description,
      meta_keywords: page.meta_keywords || '',
      region: page.region,
      area_name: page.area_name,
      hero_headline: page.hero_headline,
      hero_subheadline: page.hero_subheadline,
      active: page.active
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this geo page?')) return
    try {
      await fetch(`${BACKEND_URL}/api/geo-pages/${id}`, { method: 'DELETE' })
      fetchGeoPages()
    } catch (error) {
      console.error('Error deleting geo page:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      meta_description: '',
      meta_keywords: '',
      region: 'dubai',
      area_name: '',
      hero_headline: '',
      hero_subheadline: '',
      active: true
    })
  }

  const dubaiPages = geoPages.filter(p => p.region === 'dubai')
  const abuDhabiPages = geoPages.filter(p => p.region === 'abu-dhabi')

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-[#C9A962]" />
            Geo Pages Management
          </h1>
          <p className="text-gray-500 mt-1">Manage location-specific landing pages for SEO</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={seedDefaults}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Seed Defaults
          </Button>
          <Button onClick={() => { resetForm(); setEditingPage(null); setShowForm(true); }} className="bg-[#C9A962] hover:bg-[#B8994D]">
            <Plus className="h-4 w-4 mr-2" />
            Add Geo Page
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-[#C9A962]">{geoPages.length}</div>
          <div className="text-gray-500">Total Geo Pages</div>
        </div>
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{dubaiPages.length}</div>
          <div className="text-gray-500">Dubai Pages</div>
        </div>
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-green-600">{abuDhabiPages.length}</div>
          <div className="text-gray-500">Abu Dhabi Pages</div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingPage ? 'Edit' : 'Add'} Geo Page</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Region *</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="dubai">Dubai</option>
                    <option value="abu-dhabi">Abu Dhabi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Area Name *</label>
                  <Input
                    value={formData.area_name}
                    onChange={(e) => setFormData({ ...formData, area_name: e.target.value })}
                    placeholder="e.g., Palm Jumeirah"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL Slug *</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., dubai/palm-jumeirah-smart-homes"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Page Title (SEO) *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Smart Home Automation Palm Jumeirah | LEXA"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description *</label>
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO description for search results..."
                  rows={2}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Meta Keywords</label>
                <Input
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="smart home, automation, palm jumeirah"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Hero Headline *</label>
                <Input
                  value={formData.hero_headline}
                  onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                  placeholder="Smart Home Automation Palm Jumeirah"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Hero Subheadline</label>
                <Textarea
                  value={formData.hero_subheadline}
                  onChange={(e) => setFormData({ ...formData, hero_subheadline: e.target.value })}
                  placeholder="Premium automation for Dubai's iconic island..."
                  rows={2}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="active" className="text-sm">Active (visible on site)</label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#C9A962] hover:bg-[#B8994D]">
                  {editingPage ? 'Update' : 'Create'} Page
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pages List */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : geoPages.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Geo Pages Yet</h3>
          <p className="text-gray-500 mb-4">Click &quot;Seed Defaults&quot; to create initial pages or add them manually.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Dubai Pages */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              Dubai ({dubaiPages.length})
            </h2>
            <div className="grid gap-4">
              {dubaiPages.map(page => (
                <div key={page.id} className="bg-white rounded-xl p-5 border shadow-sm flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{page.area_name}</h3>
                      {page.active ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{page.meta_description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abu Dhabi Pages */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              Abu Dhabi ({abuDhabiPages.length})
            </h2>
            <div className="grid gap-4">
              {abuDhabiPages.map(page => (
                <div key={page.id} className="bg-white rounded-xl p-5 border shadow-sm flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{page.area_name}</h3>
                      {page.active ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{page.meta_description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

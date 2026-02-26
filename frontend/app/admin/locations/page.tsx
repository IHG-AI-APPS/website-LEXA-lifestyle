'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Pencil, Save, ArrowLeft, X, Search, Plus } from 'lucide-react'
import { toast } from 'sonner'

const API = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Location {
  slug: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  content: string
  hero_image: string
  gallery_images: string[]
  map_embed: string
  operating_hours: string
  features: string[]
  seo_title: string
  seo_description: string
  display_order: number
}

export default function LocationsAdmin() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Location | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchLocations() }, [])

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API}/api/locations`)
      const data = await res.json()
      setLocations(data.locations || [])
    } catch {
      toast.error('Failed to load locations')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/locations/${editing.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      })
      if (res.ok) {
        toast.success(`${editing.name} updated`)
        fetchLocations()
        setEditing(null)
      } else {
        toast.error('Failed to save')
      }
    } catch {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const filtered = locations.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.city?.toLowerCase().includes(search.toLowerCase())
  )

  if (editing) {
    return (
      <div className="p-6 max-w-4xl mx-auto" data-testid="location-edit-form">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{editing.name}</h1>
              <p className="text-xs text-gray-500">/{editing.slug}</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-[#C9A962] hover:bg-[#B8994D]" data-testid="save-location">
            <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Basic Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Name</label>
                <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">City</label>
                <Input value={editing.city || ''} onChange={e => setEditing({ ...editing, city: e.target.value })} /></div>
            </div>
            <div><label className="block text-xs text-gray-500 mb-1">Address</label>
              <Input value={editing.address || ''} onChange={e => setEditing({ ...editing, address: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Phone</label>
                <Input value={editing.phone || ''} onChange={e => setEditing({ ...editing, phone: e.target.value })} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Email</label>
                <Input value={editing.email || ''} onChange={e => setEditing({ ...editing, email: e.target.value })} /></div>
            </div>
            <div><label className="block text-xs text-gray-500 mb-1">Operating Hours</label>
              <Input value={editing.operating_hours || ''} onChange={e => setEditing({ ...editing, operating_hours: e.target.value })} /></div>
          </div>

          <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Content</h3>
            <div><label className="block text-xs text-gray-500 mb-1">Page Content</label>
              <Textarea value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} rows={6} /></div>
            <div><label className="block text-xs text-gray-500 mb-1">Hero Image URL</label>
              <Input value={editing.hero_image || ''} onChange={e => setEditing({ ...editing, hero_image: e.target.value })} /></div>
            <div><label className="block text-xs text-gray-500 mb-1">Map Embed Code</label>
              <Textarea value={editing.map_embed || ''} onChange={e => setEditing({ ...editing, map_embed: e.target.value })} rows={3} /></div>
          </div>

          <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Features (one per line)</h3>
            <Textarea
              value={(editing.features || []).join('\n')}
              onChange={e => setEditing({ ...editing, features: e.target.value.split('\n').filter(f => f.trim()) })}
              rows={4}
              placeholder="Free parking&#10;Showroom&#10;Demo rooms"
            />
          </div>

          <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">SEO</h3>
            <div><label className="block text-xs text-gray-500 mb-1">SEO Title</label>
              <Input value={editing.seo_title || ''} onChange={e => setEditing({ ...editing, seo_title: e.target.value })} /></div>
            <div><label className="block text-xs text-gray-500 mb-1">SEO Description</label>
              <Textarea value={editing.seo_description || ''} onChange={e => setEditing({ ...editing, seo_description: e.target.value })} rows={2} /></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" data-testid="locations-admin-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#C9A962]" /> Locations Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{locations.length} showroom & office locations</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search locations..." className="pl-10" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(loc => (
            <div key={loc.slug} className="bg-white rounded-lg p-4 border hover:border-[#C9A962]/40 transition-colors flex items-center justify-between group">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{loc.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{loc.address || loc.city}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing({ ...loc })}
                className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

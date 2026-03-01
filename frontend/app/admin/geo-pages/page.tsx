'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Plus, Pencil, Trash2, Globe, CheckCircle, Search, ArrowLeft, Save, X, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'

const API = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Community { name: string; type: string; price?: string; projects?: string }
interface Service { icon: string; title: string; description: string }
interface FAQ { question: string; answer: string }
interface Stat { value: string; label: string }

interface GeoPage {
  slug: string
  locationName: string
  region: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroImage?: string
  stats: Stat[]
  communities: Community[]
  services?: Service[]
  faqs?: FAQ[]
  ctaTitle: string
  ctaSubtitle?: string
  active?: boolean
}

export default function GeoPageAdmin() {
  const [pages, setPages] = useState<GeoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<GeoPage | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchPages() }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch(`${API}/api/geo-pages`)
      const data = await res.json()
      // Fetch full data for each page
      const fullPages = await Promise.all(
        (data.geo_pages || []).map(async (p: any) => {
          const r = await fetch(`${API}/api/geo-pages/slug/${p.slug}`)
          return r.ok ? r.json() : p
        })
      )
      setPages(fullPages)
    } catch (e) {
      toast.error('Failed to load geo pages')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/geo-pages/slug/${editing.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      })
      if (res.ok) {
        toast.success(`${editing.locationName} updated successfully`)
        setPages(prev => prev.map(p => p.slug === editing.slug ? editing : p))
        setEditing(null)
      } else {
        toast.error('Failed to save')
      }
    } catch (e) {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const filtered = pages.filter(p =>
    !search || p.locationName.toLowerCase().includes(search.toLowerCase()) ||
    p.region.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const regions = Array.from(new Set(pages.map(p => p.region))).sort()

  if (editing) return <EditForm page={editing} setPage={setEditing} onSave={handleSave} onCancel={() => setEditing(null)} saving={saving} />

  return (
    <div className="p-6 max-w-7xl mx-auto" data-testid="geo-admin-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#C9A962]" />
            Geo Pages Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{pages.length} location pages — all content editable from CMS</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by location, region, or slug..."
          className="pl-10"
          data-testid="geo-search"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border">
          <div className="text-2xl font-bold text-[#C9A962]">{pages.length}</div>
          <div className="text-xs text-gray-500">Total Pages</div>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <div className="text-2xl font-bold text-blue-600">{pages.filter(p => p.region.includes('Dubai')).length}</div>
          <div className="text-xs text-gray-500">Dubai</div>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <div className="text-2xl font-bold text-green-600">{pages.filter(p => p.region.includes('Abu Dhabi')).length}</div>
          <div className="text-xs text-gray-500">Abu Dhabi</div>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <div className="text-2xl font-bold text-purple-600">{pages.filter(p => !p.region.includes('Dubai') && !p.region.includes('Abu Dhabi') && !p.region.includes('UAE')).length}</div>
          <div className="text-xs text-gray-500">International</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading geo pages...</div>
      ) : (
        <div className="space-y-6">
          {regions.map(region => {
            const regionPages = filtered.filter(p => p.region === region)
            if (regionPages.length === 0) return null
            return (
              <div key={region}>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> {region} ({regionPages.length})
                </h2>
                <div className="grid gap-2">
                  {regionPages.map(page => (
                    <div key={page.slug} className="bg-white rounded-lg p-4 border hover:border-[#C9A962]/40 transition-colors flex items-center justify-between group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{page.locationName}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{page.communities?.length || 0} communities</span>
                          {page.services && page.services.length > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{page.services.length} services</span>
                          )}
                          {page.faqs && page.faqs.length > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600">{page.faqs.length} FAQs</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">/{page.slug}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditing({ ...page })}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`edit-${page.slug.replace(/\//g, '-')}`}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ====== EDIT FORM ====== */
function EditForm({ page, setPage, onSave, onCancel, saving }: {
  page: GeoPage
  setPage: (p: GeoPage | null) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
}) {
  const update = (field: string, value: any) => setPage({ ...page, [field]: value } as any)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ hero: true, communities: true })
  const toggle = (s: string) => setOpenSections(p => ({ ...p, [s]: !p[s] }))

  return (
    <div className="p-6 max-w-4xl mx-auto" data-testid="geo-edit-form">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">{page.locationName}</h1>
            <p className="text-xs text-gray-500">/{page.slug}</p>
          </div>
        </div>
        <Button onClick={onSave} disabled={saving} className="bg-[#C9A962] hover:bg-[#B8994D]" data-testid="save-geo-page">
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Hero Section */}
        <Section title="Hero Section" open={openSections.hero} toggle={() => toggle('hero')}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location Name" value={page.locationName} onChange={v => update('locationName', v)} />
            <Field label="Region" value={page.region} onChange={v => update('region', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Hero Title" value={page.heroTitle} onChange={v => update('heroTitle', v)} />
            <Field label="Hero Highlight (Gold Text)" value={page.heroHighlight} onChange={v => update('heroHighlight', v)} />
          </div>
          <Field label="Hero Description" value={page.heroDescription} onChange={v => update('heroDescription', v)} textarea />
          <Field label="Hero Image URL" value={page.heroImage || ''} onChange={v => update('heroImage', v)} placeholder="https://images.unsplash.com/..." />
        </Section>

        {/* Stats */}
        <Section title={`Stats (${page.stats?.length || 0})`} open={openSections.stats} toggle={() => toggle('stats')}>
          {(page.stats || []).map((stat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input value={stat.value} onChange={e => {
                const s = [...(page.stats || [])]; s[i] = { ...s[i], value: e.target.value }; update('stats', s)
              }} placeholder="Value" className="w-28" />
              <Input value={stat.label} onChange={e => {
                const s = [...(page.stats || [])]; s[i] = { ...s[i], label: e.target.value }; update('stats', s)
              }} placeholder="Label" className="flex-1" />
              <Button variant="ghost" size="sm" onClick={() => update('stats', (page.stats || []).filter((_: any, j: number) => j !== i))}>
                <X className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => update('stats', [...(page.stats || []), { value: '', label: '' }])}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Stat
          </Button>
        </Section>

        {/* Communities */}
        <Section title={`Communities (${page.communities?.length || 0})`} open={openSections.communities} toggle={() => toggle('communities')}>
          {(page.communities || []).map((c, i) => (
            <div key={i} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
              <Input value={c.name} onChange={e => {
                const a = [...(page.communities || [])]; a[i] = { ...a[i], name: e.target.value }; update('communities', a)
              }} placeholder="Name" className="flex-1" />
              <Input value={c.type} onChange={e => {
                const a = [...(page.communities || [])]; a[i] = { ...a[i], type: e.target.value }; update('communities', a)
              }} placeholder="Type" className="flex-1" />
              <Input value={c.price || c.projects || ''} onChange={e => {
                const a = [...(page.communities || [])]; 
                const val = e.target.value;
                if (a[i].price !== undefined) a[i] = { ...a[i], price: val }
                else a[i] = { ...a[i], projects: val }
                update('communities', a)
              }} placeholder="Price/Projects" className="w-28" />
              <Button variant="ghost" size="sm" onClick={() => update('communities', (page.communities || []).filter((_: any, j: number) => j !== i))}>
                <X className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => update('communities', [...(page.communities || []), { name: '', type: '', price: '' }])}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Community
          </Button>
        </Section>

        {/* Services */}
        <Section title={`Services (${page.services?.length || 0})`} open={openSections.services} toggle={() => toggle('services')}>
          {(page.services || []).map((s, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="flex gap-2 items-center">
                <Input value={s.title} onChange={e => {
                  const a = [...(page.services || [])]; a[i] = { ...a[i], title: e.target.value }; update('services', a)
                }} placeholder="Title" className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => update('services', (page.services || []).filter((_: any, j: number) => j !== i))}>
                  <X className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
              <Input value={s.description} onChange={e => {
                const a = [...(page.services || [])]; a[i] = { ...a[i], description: e.target.value }; update('services', a)
              }} placeholder="Description" />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => update('services', [...(page.services || []), { icon: 'Home', title: '', description: '' }])}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Service
          </Button>
        </Section>

        {/* FAQs */}
        <Section title={`FAQs (${page.faqs?.length || 0})`} open={openSections.faqs} toggle={() => toggle('faqs')}>
          {(page.faqs || []).map((f, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="flex gap-2 items-center">
                <Input value={f.question} onChange={e => {
                  const a = [...(page.faqs || [])]; a[i] = { ...a[i], question: e.target.value }; update('faqs', a)
                }} placeholder="Question" className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => update('faqs', (page.faqs || []).filter((_: any, j: number) => j !== i))}>
                  <X className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
              <Textarea value={f.answer} onChange={e => {
                const a = [...(page.faqs || [])]; a[i] = { ...a[i], answer: e.target.value }; update('faqs', a)
              }} placeholder="Answer" rows={2} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => update('faqs', [...(page.faqs || []), { question: '', answer: '' }])}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add FAQ
          </Button>
        </Section>

        {/* CTA */}
        <Section title="Call to Action" open={openSections.cta} toggle={() => toggle('cta')}>
          <Field label="CTA Title" value={page.ctaTitle} onChange={v => update('ctaTitle', v)} />
          <Field label="CTA Subtitle" value={page.ctaSubtitle || ''} onChange={v => update('ctaSubtitle', v)} />
        </Section>
      </div>
    </div>
  )
}

/* ====== HELPERS ====== */
function Section({ title, open, toggle, children }: { title: string; open?: boolean; toggle: () => void; children: React.ReactNode }) {
  const isOpen = open !== false
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  )
}

function Field({ label, value, onChange, textarea, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {textarea ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  )
}

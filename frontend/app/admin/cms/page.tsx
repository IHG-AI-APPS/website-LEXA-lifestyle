'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, RefreshCw, ChevronDown, ChevronRight, Plus, Trash2, GripVertical, Video, Type, Image, List, MapPin, Briefcase, Users, Award, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface CMSSection {
  key: string
  label: string
  icon: any
  description: string
}

const CMS_SECTIONS: CMSSection[] = [
  { key: 'homepage_hero', label: 'Homepage Hero', icon: Video, description: 'Hero video clips, heading, subtitle, CTA buttons' },
  { key: 'homepage_experience_cta', label: 'Experience Centre CTA', icon: MapPin, description: 'Gallery images, highlights, time slots, address' },
  { key: 'homepage_calculator_cards', label: 'Smart Home Tools', icon: Settings2, description: 'Featured tool and calculator cards on homepage' },
  { key: 'homepage_trusted_uae', label: 'Partners & Trust', icon: Award, description: 'Technology partners, developers, certifications, stats' },
  { key: 'careers_positions', label: 'Career Positions', icon: Briefcase, description: 'Open positions on Work With Us page' },
]

function ArrayEditor({ items, onChange, fields }: { items: any[], onChange: (items: any[]) => void, fields: { key: string, label: string, type?: string }[] }) {
  const addItem = () => {
    const newItem: any = {}
    fields.forEach(f => { newItem[f.key] = f.type === 'array' ? [] : '' })
    onChange([...items, newItem])
  }
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx))
  const updateItem = (idx: number, key: string, value: any) => {
    const updated = [...items]
    updated[idx] = { ...updated[idx], [key]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <GripVertical className="h-4 w-4 mt-2 text-gray-400 flex-shrink-0" />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
            {fields.map(field => (
              field.type === 'array' ? (
                <div key={field.key} className="col-span-full">
                  <label className="text-xs text-gray-500 dark:text-gray-400">{field.label} (comma-separated)</label>
                  <Input
                    value={Array.isArray(item[field.key]) ? item[field.key].join(', ') : ''}
                    onChange={e => updateItem(idx, field.key, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                    className="text-sm"
                  />
                </div>
              ) : field.type === 'textarea' ? (
                <div key={field.key} className="col-span-full">
                  <label className="text-xs text-gray-500 dark:text-gray-400">{field.label}</label>
                  <textarea
                    value={item[field.key] || ''}
                    onChange={e => updateItem(idx, field.key, e.target.value)}
                    className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    rows={2}
                  />
                </div>
              ) : (
                <div key={field.key}>
                  <label className="text-xs text-gray-500 dark:text-gray-400">{field.label}</label>
                  <Input
                    value={item[field.key] || ''}
                    onChange={e => updateItem(idx, field.key, e.target.value)}
                    className="text-sm"
                  />
                </div>
              )
            ))}
          </div>
          <button onClick={() => removeItem(idx)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" data-testid={`remove-item-${idx}`}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} data-testid="add-item-btn">
        <Plus className="h-3 w-3 mr-1" /> Add Item
      </Button>
    </div>
  )
}

function SectionEditor({ sectionKey, data, onSave }: { sectionKey: string, data: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState<any>(data || {})

  useEffect(() => { setFormData(data || {}) }, [data])

  const updateField = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  const renderFields = () => {
    switch (sectionKey) {
      case 'homepage_hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Video Clips (one URL per line)</label>
              <textarea
                value={(formData.video_clips || []).join('\n')}
                onChange={e => updateField('video_clips', e.target.value.split('\n').filter(Boolean))}
                className="w-full text-sm p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                rows={6}
                data-testid="hero-video-clips"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (English)</label>
                <Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} data-testid="hero-heading-en" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (Arabic)</label>
                <Input value={formData.heading_ar || ''} onChange={e => updateField('heading_ar', e.target.value)} dir="rtl" data-testid="hero-heading-ar" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (English)</label>
                <textarea value={formData.subheading_en || ''} onChange={e => updateField('subheading_en', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} data-testid="hero-subheading-en" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (Arabic)</label>
                <textarea value={formData.subheading_ar || ''} onChange={e => updateField('subheading_ar', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} dir="rtl" data-testid="hero-subheading-ar" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CTA Primary Text (EN)</label>
                <Input value={formData.cta_primary_text_en || ''} onChange={e => updateField('cta_primary_text_en', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CTA Primary Link</label>
                <Input value={formData.cta_primary_link || ''} onChange={e => updateField('cta_primary_link', e.target.value)} />
              </div>
            </div>
          </div>
        )

      case 'homepage_experience_cta':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (English)</label>
                <Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (English)</label>
                <Input value={formData.subheading_en || ''} onChange={e => updateField('subheading_en', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label>
                <Input value={formData.address || ''} onChange={e => updateField('address', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label>
                <Input value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time Slots (comma-separated)</label>
              <Input value={(formData.time_slots || []).join(', ')} onChange={e => updateField('time_slots', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Highlights</label>
              <ArrayEditor items={formData.highlights || []} onChange={v => updateField('highlights', v)} fields={[
                { key: 'icon', label: 'Icon (Lucide name)' },
                { key: 'label', label: 'Label' },
                { key: 'desc', label: 'Description' }
              ]} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Gallery Images</label>
              <ArrayEditor items={formData.gallery_images || []} onChange={v => updateField('gallery_images', v)} fields={[
                { key: 'src', label: 'Image URL' },
                { key: 'title', label: 'Title' },
                { key: 'zone', label: 'Zone' }
              ]} />
            </div>
          </div>
        )

      case 'homepage_calculator_cards':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Featured Tool</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div><label className="text-xs text-gray-500 dark:text-gray-400">Title</label><Input value={formData.featured_tool?.title || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, title: e.target.value })} /></div>
              <div><label className="text-xs text-gray-500 dark:text-gray-400">Link</label><Input value={formData.featured_tool?.href || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, href: e.target.value })} /></div>
              <div className="col-span-full"><label className="text-xs text-gray-500 dark:text-gray-400">Description</label><textarea value={formData.featured_tool?.description || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, description: e.target.value })} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
              <div><label className="text-xs text-gray-500 dark:text-gray-400">CTA Text</label><Input value={formData.featured_tool?.cta || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, cta: e.target.value })} /></div>
              <div><label className="text-xs text-gray-500 dark:text-gray-400">Badge</label><Input value={formData.featured_tool?.badge || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, badge: e.target.value })} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tool Cards</h4>
            <ArrayEditor items={formData.tools || []} onChange={v => updateField('tools', v)} fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
              { key: 'href', label: 'Link' },
              { key: 'cta', label: 'CTA Text' },
              { key: 'image', label: 'Image URL' },
              { key: 'icon', label: 'Icon (Lucide)' }
            ]} />
          </div>
        )

      case 'homepage_trusted_uae':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Technology Partners</h4>
              <ArrayEditor items={formData.technology_partners || []} onChange={v => updateField('technology_partners', v)} fields={[
                { key: 'name', label: 'Name' },
                { key: 'logo', label: 'Logo URL' },
                { key: 'type', label: 'Partner Type' }
              ]} />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Trusted By (Developers)</h4>
              <ArrayEditor items={formData.trusted_by || []} onChange={v => updateField('trusted_by', v)} fields={[
                { key: 'name', label: 'Name' },
                { key: 'type', label: 'Type' }
              ]} />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Certifications</h4>
              <ArrayEditor items={formData.certifications || []} onChange={v => updateField('certifications', v)} fields={[
                { key: 'name', label: 'Certification' },
                { key: 'year', label: 'Year/Status' }
              ]} />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Stats</h4>
              <ArrayEditor items={formData.stats || []} onChange={v => updateField('stats', v)} fields={[
                { key: 'number', label: 'Number' },
                { key: 'label', label: 'Label' }
              ]} />
            </div>
          </div>
        )

      case 'careers_positions':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (English)</label>
                <Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (Arabic)</label>
                <Input value={formData.heading_ar || ''} onChange={e => updateField('heading_ar', e.target.value)} dir="rtl" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Open Positions</h4>
            <ArrayEditor items={formData.positions || []} onChange={v => updateField('positions', v)} fields={[
              { key: 'title', label: 'Job Title' },
              { key: 'department', label: 'Department' },
              { key: 'location', label: 'Location' },
              { key: 'type', label: 'Type (Full-time/Part-time)' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'requirements', label: 'Requirements', type: 'array' }
            ]} />
          </div>
        )

      default:
        return (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      {renderFields()}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={() => onSave(formData)} data-testid={`save-${sectionKey}`}>
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  )
}

export default function CMSPage() {
  const [sections, setSections] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(CMS_SECTIONS[0].key)

  const fetchSections = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const keys = CMS_SECTIONS.map(s => s.key).join(',')
      const res = await fetch(`${BACKEND_URL}/api/cms/sections?keys=${keys}`)
      const data = await res.json()
      setSections(data)
    } catch (err) {
      toast.error('Failed to load CMS data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  const handleSave = async (key: string, data: any) => {
    setSaving(key)
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch(`${BACKEND_URL}/api/admin/content/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ value: data })
      })
      if (res.ok) {
        toast.success(`"${CMS_SECTIONS.find(s => s.key === key)?.label}" saved successfully`)
        setSections(prev => ({ ...prev, [key]: data }))
      } else {
        toast.error('Save failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6" data-testid="cms-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CMS / Page Content</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all dynamic content across the website</p>
        </div>
        <Button variant="outline" onClick={fetchSections} data-testid="refresh-cms">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="space-y-3">
        {CMS_SECTIONS.map(section => {
          const Icon = section.icon
          const isExpanded = expanded === section.key
          return (
            <div key={section.key} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden" data-testid={`cms-section-${section.key}`}>
              <button
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setExpanded(isExpanded ? null : section.key)}
                data-testid={`toggle-${section.key}`}
              >
                <Icon className="h-5 w-5 text-[#C9A962] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.label}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                </div>
                {saving === section.key && <RefreshCw className="h-4 w-4 animate-spin text-[#C9A962]" />}
                {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <SectionEditor
                    sectionKey={section.key}
                    data={sections[section.key] || {}}
                    onSave={(data) => handleSave(section.key, data)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

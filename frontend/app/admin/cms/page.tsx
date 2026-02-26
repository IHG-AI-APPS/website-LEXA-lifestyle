'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, RefreshCw, ChevronDown, ChevronRight, Plus, Trash2, GripVertical, Search, Globe, Building2, Layout, Film, Lightbulb, Home, Speaker, Video, Type, Image, List, MapPin, Briefcase, Users, Award, Settings2, Calendar, FileText, Layers, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface CMSSection {
  key: string
  label: string
  icon: any
  description: string
  category: string
}

const CMS_SECTIONS: CMSSection[] = [
  // Global SEO
  { key: 'seo_global', label: 'Global SEO Settings', icon: Globe, category: 'seo', description: 'Default meta title, description, OG image, keywords' },
  { key: 'seo_homepage', label: 'Homepage SEO', icon: Home, category: 'seo', description: 'Homepage title, description, OG tags' },
  ...([
    'about', 'contact', 'consultation', 'experience-centre', 'careers', 'blog',
    'solutions', 'services', 'projects', 'products', 'brands', 'packages',
    'testimonials', 'news', 'resources', 'faq', 'support', 'warranty',
    'privacy-policy', 'terms-of-service', 'calculator', 'work-with-us',
    'partner-with-us', 'vendor-supplier',
  ] as string[]).map(slug => ({
    key: `seo_${slug.replace(/-/g, '_')}`,
    label: `SEO: ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: Globe,
    category: 'seo',
    description: `Meta title, description, OG tags for /${slug}`
  })),
  // Homepage
  { key: 'homepage_hero', label: 'Homepage Hero', icon: Video, category: 'homepage', description: 'Hero video clips, heading, subtitle, CTA buttons' },
  { key: 'homepage_experience_cta', label: 'Experience Centre CTA', icon: MapPin, category: 'homepage', description: 'Gallery images, highlights, time slots, address' },
  { key: 'homepage_calculator_cards', label: 'Smart Home Tools', icon: Settings2, category: 'homepage', description: 'Featured tool and calculator cards on homepage' },
  { key: 'homepage_trusted_uae', label: 'Partners & Trust', icon: Award, category: 'homepage', description: 'Technology partners, developers, certifications, stats' },
  // Core Pages
  { key: 'page_about', label: 'About Page', icon: Users, category: 'pages', description: 'Company story, values, milestones, partners' },
  { key: 'page_contact', label: 'Contact Page', icon: MapPin, category: 'pages', description: 'Address, phone, email, social links, map coordinates' },
  { key: 'page_consultation', label: 'Consultation Page', icon: Calendar, category: 'pages', description: 'Consultation types, process steps' },
  { key: 'page_experience_centre', label: 'Experience Centre Page', icon: Building2, category: 'pages', description: 'Zones, features, visit info' },
  { key: 'site_footer', label: 'Footer', icon: Layout, category: 'pages', description: 'Company description, social links' },
  { key: 'careers_positions', label: 'Career Positions', icon: Briefcase, category: 'pages', description: 'Open positions on Work With Us page' },
  { key: 'page_why_lexa', label: 'Why LEXA Page', icon: Award, category: 'pages', description: 'Advantages, comparisons, stats — why choose LEXA' },
  { key: 'page_big_homes_break_smart', label: 'Big Homes Break Smart', icon: Home, category: 'pages', description: 'Industry insight: problems, hidden costs, LEXA comparison' },
  { key: 'page_villa_operating_model', label: 'Villa Operating Model', icon: Users, category: 'pages', description: 'Roles (Owner, Family, Guest, Staff), access rules, benefits' },
  { key: 'page_integrations', label: 'Integrations & Partners', icon: Layers, category: 'pages', description: 'Platform categories, brand lists, tier labels' },
  { key: 'page_case_studies', label: 'Case Studies Listing', icon: FileText, category: 'pages', description: 'Case study cards with location, budget, features, results' },
  { key: 'page_glossary', label: 'Glossary Page', icon: Type, category: 'pages', description: 'Hero text, badge, description for glossary page' },
  // Services
  { key: 'service_home_theater', label: 'Service: Home Theater', icon: Film, category: 'services', description: 'Features, projects, FAQs' },
  { key: 'service_smart_lighting', label: 'Service: Smart Lighting', icon: Lightbulb, category: 'services', description: 'Features, projects' },
  { key: 'service_home_cinema', label: 'Service: Home Cinema', icon: Film, category: 'services', description: 'Features, projects' },
  { key: 'service_luxury_villa_automation', label: 'Service: Villa Automation', icon: Home, category: 'services', description: 'Features, projects' },
  { key: 'service_outdoor_audio', label: 'Service: Outdoor Audio', icon: Speaker, category: 'services', description: 'Features, projects' },
  { key: 'service_high_end_audio', label: 'Service: High-End Audio', icon: Speaker, category: 'services', description: 'Features, projects' },
  { key: 'service_multi_room_audio', label: 'Service: Multi-Room Audio', icon: Speaker, category: 'services', description: 'Features, projects' },
  // Solution Pages (SeoLandingPageTemplate-based)
  ...([
    'access-control', 'ai-camera-staff-analytics', 'audio-rooms-studios', 'audio-systems',
    'auditoriums', 'bms-automation', 'climate-control', 'conference-room-av-systems',
    'conference-rooms', 'custom-iot-automation', 'energy-management', 'grms-hospitality',
    'hifi-audio', 'home-cinema', 'home-theater', 'lighting-automation', 'marine-audio',
    'marine-video', 'mirror-tv', 'motorized-shades', 'networking', 'outdoor-living',
    'security', 'smart-gadgets-accessories', 'smart-lifestyle', 'surveillance',
    'video-walls', 'workplace-analytics', 'yacht-automation',
    'cultural-automation_church-automation', 'cultural-automation_majlis-automation',
    'cultural-automation_masjid-automation', 'cultural-automation_prayer-room-systems',
    'cultural-automation_temple-automation', 'cultural-automation_yacht-automation',
  ] as string[]).map(slug => ({
    key: `page_solutions_${slug}`,
    label: `Solution: ${slug.replace(/-/g, ' ').replace(/_/g, ' > ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: Layers,
    category: 'solutions',
    description: `Hero, audience, problems, deliverables, process, pricing, trust signals, conversion CTA`
  })),
  // Non-template solution pages
  ...([
    'corporate-towers', 'hospitality-automation', 'smart-parking',
    'majlis-audio-experience', 'retail-automation', 'luxury-cinema-solutions',
    'ai-staff-accountability', 'smart-car-park-lighting'
  ] as string[]).map(slug => ({
    key: `page_solutions_${slug}`,
    label: `Solution: ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: Layers,
    category: 'solutions',
    description: `Full page content`
  })),
  // Geo/Location Pages
  ...([
    'dubai_palm-jumeirah', 'dubai_emirates-hills', 'dubai_dubai-hills',
    'dubai_dubai-marina', 'dubai_downtown-penthouse', 'dubai_jumeirah-beach',
    'abu-dhabi_luxury', 'abu-dhabi_al-reem', 'abu-dhabi_saadiyat', 'abu-dhabi_yas-island',
    'saudi_riyadh', 'saudi_jeddah', 'saudi_dammam', 'saudi_neom',
    'qatar_doha', 'bahrain_manama', 'oman_muscat', 'kuwait_kuwait-city',
    'jordan_amman', 'lebanon_beirut', 'egypt_cairo', 'morocco_casablanca',
    'kenya_nairobi', 'nigeria_lagos',
    'uae_dubai', 'uae_abu-dhabi', 'uae_sharjah', 'uae_ajman',
    'sharjah_smart-home', 'ajman_home-automation', 'al-ain_smart-home',
    'fujairah_smart-homes', 'ras-al-khaimah_villa', 'umm-al-quwain_home',
    'locations_palm-jumeirah', 'locations_emirates-hills', 'locations_downtown-dubai',
    'locations_dubai-hills', 'locations_jumeirah-golf', 'locations_abu-dhabi', 'locations_sharjah',
  ] as string[]).map(slug => ({
    key: `page_geo_${slug}`,
    label: `Location: ${slug.replace(/-/g, ' ').replace(/_/g, ' - ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: Globe,
    category: 'geo',
    description: `Location page content, communities, services, FAQs`
  })),
  // Misc Content Pages
  ...([
    'careers', 'warranty', 'privacy-policy', 'terms-of-service', 'faq', 'process',
    'support', 'media', 'company', 'amc-packages', 'architects', 'contractors',
    'developers', 'certification-standard', 'developer-partner-toolkit',
    'enterprise-platform', 'hidden-costs', 'investment-pricing', 'platform-agnostic',
    'why-lexa', 'case-studies', 'glossary', 'integrations', 'villa-operating-model',
    'big-homes-break-smart', 'partner-with-us', 'lexa-evolves', 'digital-twin',
    'vendor-supplier', 'villa-designer', 'virtual-showroom', 'visualize-3d',
    'work-with-us', 'developer-toolkit', 'privacy', 'terms',
    'luxury-home-cinema-dubai', 'calculator', 'analytics', 'dashboard',
  ] as string[]).map(slug => ({
    key: `page_${slug}`,
    label: `Page: ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: FileText,
    category: 'misc',
    description: `Full page content`
  })),
  // Listing Pages
  ...([
    'blog', 'brands', 'products', 'projects', 'services', 'solutions',
    'news', 'intelligence', 'packages', 'resources', 'specialty-rooms', 'testimonials',
  ] as string[]).map(slug => ({
    key: `page_${slug}_listing`,
    label: `Listing: ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: List,
    category: 'listings',
    description: `${slug} listing page headings and labels`
  })),
  // Dynamic Detail Pages (labels/chrome)
  ...([
    { key: 'page_blog_detail', label: 'Blog Post Template' },
    { key: 'page_brands_detail', label: 'Brand Detail Template' },
    { key: 'page_case_studies_detail', label: 'Case Study Detail' },
    { key: 'page_intelligence_detail', label: 'Intelligence Detail' },
    { key: 'page_news_detail', label: 'News Article Template' },
    { key: 'page_packages_detail', label: 'Package Detail Template' },
    { key: 'page_products_detail', label: 'Product Detail Template' },
    { key: 'page_projects_detail', label: 'Project Detail Template' },
    { key: 'page_resources_detail', label: 'Resource Detail Template' },
    { key: 'page_services_detail', label: 'Service Detail Template' },
    { key: 'page_solutions_detail', label: 'Solution Detail Template' },
    { key: 'page_specialty_rooms_detail', label: 'Specialty Room Detail' },
    { key: 'page_ar_seo_detail', label: 'Arabic SEO Page Template' },
    { key: 'page_ar_seo_blog_detail', label: 'Arabic Blog Template' },
  ] as { key: string, label: string }[]).map(item => ({
    key: item.key,
    label: `Detail: ${item.label}`,
    icon: FileText,
    category: 'detail_templates',
    description: `Labels, headings, and chrome for detail pages`
  })),
  // Interactive Tools
  ...([
    { key: 'page_project_builder', label: 'Project Builder' },
    { key: 'page_project_builder_start', label: 'Project Builder Start' },
    { key: 'page_project_builder_smart', label: 'Smart Builder' },
    { key: 'page_project_builder_resume', label: 'Project Builder Resume' },
    { key: 'page_experience_centre', label: 'Experience Centre' },
    { key: 'page_intelligence_staff_accountability', label: 'Staff Accountability' },
    { key: 'page_packages_developer', label: 'Developer Packages' },
    { key: 'page_packages_smart_apartment', label: 'Smart Apartment Packages' },
    { key: 'page_solutions_cultural_automation', label: 'Cultural Automation Hub' },
    { key: 'page_solutions_cultural_marine_yacht', label: 'Marine & Yacht Automation' },
    { key: 'page_blog_smart_home_guide_2025', label: 'Smart Home Guide 2025' },
    { key: 'page_guide_install_smart_home', label: 'Installation Guide' },
    { key: 'page_resource_architect_guide', label: 'Architect Automation Guide' },
    { key: 'page_resource_best_automation_uae', label: 'Best Home Automation UAE' },
    { key: 'page_resource_knx_vs_control4', label: 'KNX vs Control4' },
    { key: 'page_resource_smart_home_cost', label: 'Smart Home Cost Dubai' },
  ] as { key: string, label: string }[]).map(item => ({
    key: item.key,
    label: `Tool/Content: ${item.label}`,
    icon: Settings2,
    category: 'tools_content',
    description: `Content and labels for this page`
  })),
  // Location Pages (server component wrappers)
  ...([
    { key: 'page_locations_abu_dhabi', label: 'Locations: Abu Dhabi' },
    { key: 'page_locations_downtown_dubai', label: 'Locations: Downtown Dubai' },
    { key: 'page_locations_dubai_hills', label: 'Locations: Dubai Hills' },
    { key: 'page_locations_emirates_hills', label: 'Locations: Emirates Hills' },
    { key: 'page_locations_jumeirah_golf', label: 'Locations: Jumeirah Golf Estates' },
    { key: 'page_locations_palm_jumeirah', label: 'Locations: Palm Jumeirah' },
    { key: 'page_locations_sharjah', label: 'Locations: Sharjah' },
    { key: 'page_uae_abu_dhabi', label: 'UAE: Abu Dhabi' },
    { key: 'page_uae_ajman', label: 'UAE: Ajman' },
    { key: 'page_uae_dubai', label: 'UAE: Dubai' },
    { key: 'page_uae_sharjah', label: 'UAE: Sharjah' },
  ] as { key: string, label: string }[]).map(item => ({
    key: item.key,
    label: item.label,
    icon: Globe,
    category: 'geo',
    description: `Location page content`
  })),
  // Persona Pages
  ...(['architect', 'commercial', 'developer', 'homeowner'] as string[]).map(slug => ({
    key: `page_persona_${slug}`,
    label: `Persona: ${slug.replace(/\b\w/g, c => c.toUpperCase())}`,
    icon: Users,
    category: 'personas',
    description: `Persona landing page content`
  })),
]

const CATEGORIES = [
  { id: 'seo', label: 'SEO', icon: Globe },
  { id: 'homepage', label: 'Homepage', icon: Home },
  { id: 'pages', label: 'Core Pages', icon: Layout },
  { id: 'services', label: 'Services', icon: Settings2 },
  { id: 'solutions', label: 'Solutions', icon: Layers },
  { id: 'geo', label: 'Locations', icon: Globe },
  { id: 'listings', label: 'Listing Pages', icon: List },
  { id: 'detail_templates', label: 'Detail Templates', icon: FileText },
  { id: 'tools_content', label: 'Tools & Content', icon: Settings2 },
  { id: 'misc', label: 'Other Pages', icon: FileText },
  { id: 'personas', label: 'Personas', icon: Users },
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

// Generic SeoLandingPage Section Editor (for solution template pages)
function SeoTemplateEditor({ data, onSave }: { data: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState<any>(data || {})
  useEffect(() => { setFormData(data || {}) }, [data])
  const update = (key: string, value: any) => setFormData((prev: any) => ({ ...prev, [key]: value }))
  const updateNested = (parent: string, key: string, value: any) => setFormData((prev: any) => ({ ...prev, [parent]: { ...prev[parent], [key]: value } }))

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Badge</label><Input value={formData.hero?.badge || ''} onChange={e => updateNested('hero', 'badge', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">Title</label><Input value={formData.hero?.title || ''} onChange={e => updateNested('hero', 'title', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">Title Highlight</label><Input value={formData.hero?.titleHighlight || ''} onChange={e => updateNested('hero', 'titleHighlight', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">Image URL</label><Input value={formData.hero?.image || ''} onChange={e => updateNested('hero', 'image', e.target.value)} /></div>
          <div className="col-span-full"><label className="text-xs text-gray-500">Subtitle</label><Input value={formData.hero?.subtitle || ''} onChange={e => updateNested('hero', 'subtitle', e.target.value)} /></div>
          <div className="col-span-full"><label className="text-xs text-gray-500">Description</label><textarea value={formData.hero?.description || ''} onChange={e => updateNested('hero', 'description', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
          <div><label className="text-xs text-gray-500">Primary CTA Text</label><Input value={formData.hero?.primaryCTA?.text || ''} onChange={e => update('hero', { ...formData.hero, primaryCTA: { ...formData.hero?.primaryCTA, text: e.target.value } })} /></div>
          <div><label className="text-xs text-gray-500">Primary CTA Link</label><Input value={formData.hero?.primaryCTA?.href || ''} onChange={e => update('hero', { ...formData.hero, primaryCTA: { ...formData.hero?.primaryCTA, href: e.target.value } })} /></div>
        </div>
      </div>

      {/* Audience */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Target Audience</h4>
        <label className="text-xs text-gray-500">Audience items (comma-separated)</label>
        <Input value={(formData.audience || []).join(', ')} onChange={e => update('audience', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} />
      </div>

      {/* Problems */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Problems Section</h4>
        <div className="mb-3"><label className="text-xs text-gray-500">Section Title</label><Input value={formData.problems?.title || ''} onChange={e => update('problems', { ...formData.problems, title: e.target.value })} /></div>
        <ArrayEditor items={formData.problems?.items || []} onChange={v => update('problems', { ...formData.problems, items: v })} fields={[
          { key: 'problem', label: 'Problem' }, { key: 'impact', label: 'Impact' }
        ]} />
      </div>

      {/* Deliverables */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Deliverables</h4>
        <div className="mb-3"><label className="text-xs text-gray-500">Section Title</label><Input value={formData.deliverables?.title || ''} onChange={e => update('deliverables', { ...formData.deliverables, title: e.target.value })} /></div>
        <ArrayEditor items={formData.deliverables?.items || []} onChange={v => update('deliverables', { ...formData.deliverables, items: v })} fields={[
          { key: 'icon', label: 'Icon (Lucide name)' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description' }
        ]} />
      </div>

      {/* Process */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Process Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="text-xs text-gray-500">Title</label><Input value={formData.process?.title || ''} onChange={e => update('process', { ...formData.process, title: e.target.value })} /></div>
          <div><label className="text-xs text-gray-500">Subtitle</label><Input value={formData.process?.subtitle || ''} onChange={e => update('process', { ...formData.process, subtitle: e.target.value })} /></div>
        </div>
        <ArrayEditor items={formData.process?.steps || []} onChange={v => update('process', { ...formData.process, steps: v })} fields={[
          { key: 'step', label: 'Step #' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description' }
        ]} />
      </div>

      {/* Section 6 (Pricing/Custom) */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Section 6 (Pricing/Packages)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div><label className="text-xs text-gray-500">Type</label><select value={formData.section6?.type || 'pricing'} onChange={e => update('section6', { ...formData.section6, type: e.target.value })} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"><option value="pricing">Pricing</option><option value="projects">Projects</option><option value="custom">Custom</option></select></div>
          <div><label className="text-xs text-gray-500">Title</label><Input value={formData.section6?.title || ''} onChange={e => update('section6', { ...formData.section6, title: e.target.value })} /></div>
          <div><label className="text-xs text-gray-500">Subtitle</label><Input value={formData.section6?.subtitle || ''} onChange={e => update('section6', { ...formData.section6, subtitle: e.target.value })} /></div>
        </div>
        <ArrayEditor items={formData.section6?.items || []} onChange={v => update('section6', { ...formData.section6, items: v })} fields={[
          { key: 'name', label: 'Name' }, { key: 'price', label: 'Price' }, { key: 'subtitle', label: 'Subtitle' }, { key: 'features', label: 'Features', type: 'array' }
        ]} />
      </div>

      {/* Trust Signals */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Trust Signals</h4>
        <ArrayEditor items={formData.trustSignals?.stats || []} onChange={v => update('trustSignals', { ...formData.trustSignals, stats: v })} fields={[
          { key: 'number', label: 'Number/Value' }, { key: 'label', label: 'Label' }
        ]} />
      </div>

      {/* Conversion CTA */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Conversion CTA</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Title</label><Input value={formData.conversion?.title || ''} onChange={e => update('conversion', { ...formData.conversion, title: e.target.value })} /></div>
          <div><label className="text-xs text-gray-500">Subtitle</label><Input value={formData.conversion?.subtitle || ''} onChange={e => update('conversion', { ...formData.conversion, subtitle: e.target.value })} /></div>
          <div><label className="text-xs text-gray-500">Primary CTA Text</label><Input value={formData.conversion?.primaryCTA?.text || ''} onChange={e => update('conversion', { ...formData.conversion, primaryCTA: { ...formData.conversion?.primaryCTA, text: e.target.value } })} /></div>
          <div><label className="text-xs text-gray-500">Primary CTA Link</label><Input value={formData.conversion?.primaryCTA?.href || ''} onChange={e => update('conversion', { ...formData.conversion, primaryCTA: { ...formData.conversion?.primaryCTA, href: e.target.value } })} /></div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={() => onSave(formData)} data-testid="save-template-page"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
      </div>
    </div>
  )
}

// Generic JSON Editor for any page type
function GenericPageEditor({ data, onSave }: { data: any, onSave: (data: any) => void }) {
  const [jsonStr, setJsonStr] = useState(JSON.stringify(data || {}, null, 2))
  const [error, setError] = useState('')
  useEffect(() => { setJsonStr(JSON.stringify(data || {}, null, 2)) }, [data])

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonStr)
      setError('')
      onSave(parsed)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">Edit the page content as JSON. Changes will override the default hardcoded content.</p>
      <textarea
        value={jsonStr}
        onChange={e => { setJsonStr(e.target.value); setError('') }}
        className="w-full font-mono text-sm p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        rows={20}
        spellCheck={false}
        data-testid="json-editor"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} data-testid="save-json-page"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
      </div>
    </div>
  )
}

// Structured editors for known page types
function SectionEditor({ sectionKey, data, onSave }: { sectionKey: string, data: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState<any>(data || {})
  useEffect(() => { setFormData(data || {}) }, [data])
  const updateField = (key: string, value: any) => setFormData((prev: any) => ({ ...prev, [key]: value }))

  // Solution template pages get the structured SeoTemplate editor
  if (sectionKey.startsWith('page_solutions_')) {
    return <SeoTemplateEditor data={data} onSave={onSave} />
  }

  // Geo/Location pages get a structured editor
  if (sectionKey.startsWith('page_geo_')) {
    return <GeoPageEditor data={data} onSave={onSave} />
  }

  // SEO pages get a dedicated SEO editor
  if (sectionKey.startsWith('seo_')) {
    return <SeoMetaEditor data={data} onSave={onSave} pageKey={sectionKey} />
  }

  const renderFields = () => {
    switch (sectionKey) {
      case 'homepage_hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Video Clips (one URL per line)</label>
              <textarea value={(formData.video_clips || []).join('\n')} onChange={e => updateField('video_clips', e.target.value.split('\n').filter(Boolean))} className="w-full text-sm p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono" rows={6} data-testid="hero-video-clips" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (EN)</label><Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} data-testid="hero-heading-en" /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (AR)</label><Input value={formData.heading_ar || ''} onChange={e => updateField('heading_ar', e.target.value)} dir="rtl" data-testid="hero-heading-ar" /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (EN)</label><textarea value={formData.subheading_en || ''} onChange={e => updateField('subheading_en', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (AR)</label><textarea value={formData.subheading_ar || ''} onChange={e => updateField('subheading_ar', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} dir="rtl" /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CTA Primary Text</label><Input value={formData.cta_primary_text_en || ''} onChange={e => updateField('cta_primary_text_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CTA Primary Link</label><Input value={formData.cta_primary_link || ''} onChange={e => updateField('cta_primary_link', e.target.value)} /></div>
            </div>
          </div>
        )
      case 'homepage_experience_cta':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (EN)</label><Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subheading (EN)</label><Input value={formData.subheading_en || ''} onChange={e => updateField('subheading_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label><Input value={formData.address || ''} onChange={e => updateField('address', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label><Input value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)} /></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time Slots (comma-separated)</label>
              <Input value={(formData.time_slots || []).join(', ')} onChange={e => updateField('time_slots', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} />
            </div>
            <div><label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Highlights</label><ArrayEditor items={formData.highlights || []} onChange={v => updateField('highlights', v)} fields={[{ key: 'icon', label: 'Icon' }, { key: 'label', label: 'Label' }, { key: 'desc', label: 'Description' }]} /></div>
            <div><label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Gallery Images</label><ArrayEditor items={formData.gallery_images || []} onChange={v => updateField('gallery_images', v)} fields={[{ key: 'src', label: 'Image URL' }, { key: 'title', label: 'Title' }, { key: 'zone', label: 'Zone' }]} /></div>
          </div>
        )
      case 'homepage_calculator_cards':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Featured Tool</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div><label className="text-xs text-gray-500">Title</label><Input value={formData.featured_tool?.title || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, title: e.target.value })} /></div>
              <div><label className="text-xs text-gray-500">Link</label><Input value={formData.featured_tool?.href || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, href: e.target.value })} /></div>
              <div className="col-span-full"><label className="text-xs text-gray-500">Description</label><textarea value={formData.featured_tool?.description || ''} onChange={e => updateField('featured_tool', { ...formData.featured_tool, description: e.target.value })} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tool Cards</h4>
            <ArrayEditor items={formData.tools || []} onChange={v => updateField('tools', v)} fields={[{ key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }, { key: 'href', label: 'Link' }, { key: 'cta', label: 'CTA' }, { key: 'image', label: 'Image URL' }]} />
          </div>
        )
      case 'homepage_trusted_uae':
        return (
          <div className="space-y-6">
            <div><h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Technology Partners</h4><ArrayEditor items={formData.technology_partners || []} onChange={v => updateField('technology_partners', v)} fields={[{ key: 'name', label: 'Name' }, { key: 'logo', label: 'Logo URL' }, { key: 'type', label: 'Partner Type' }]} /></div>
            <div><h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Trusted By</h4><ArrayEditor items={formData.trusted_by || []} onChange={v => updateField('trusted_by', v)} fields={[{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }]} /></div>
            <div><h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Certifications</h4><ArrayEditor items={formData.certifications || []} onChange={v => updateField('certifications', v)} fields={[{ key: 'name', label: 'Certification' }, { key: 'year', label: 'Year' }]} /></div>
            <div><h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Stats</h4><ArrayEditor items={formData.stats || []} onChange={v => updateField('stats', v)} fields={[{ key: 'number', label: 'Number' }, { key: 'label', label: 'Label' }]} /></div>
          </div>
        )
      case 'page_about':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Title (EN)</label><Input value={formData.hero_title_en || ''} onChange={e => updateField('hero_title_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Title (AR)</label><Input value={formData.hero_title_ar || ''} onChange={e => updateField('hero_title_ar', e.target.value)} dir="rtl" /></div>
              <div className="col-span-full"><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Story (EN)</label><textarea value={formData.story_en || ''} onChange={e => updateField('story_en', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={3} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Values</h4>
            <ArrayEditor items={formData.values || []} onChange={v => updateField('values', v)} fields={[{ key: 'icon', label: 'Icon' }, { key: 'title_en', label: 'Title' }, { key: 'description_en', label: 'Description', type: 'textarea' }]} />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Milestones</h4>
            <ArrayEditor items={formData.milestones || []} onChange={v => updateField('milestones', v)} fields={[{ key: 'year', label: 'Year' }, { key: 'title_en', label: 'Title' }, { key: 'description_en', label: 'Description' }]} />
          </div>
        )
      case 'page_contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Title (EN)</label><Input value={formData.hero_title_en || ''} onChange={e => updateField('hero_title_en', e.target.value)} /></div>
              <div className="col-span-full"><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label><Input value={formData.address || ''} onChange={e => updateField('address', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label><Input value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label><Input value={formData.email || ''} onChange={e => updateField('email', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Map Lat</label><Input type="number" step="0.0001" value={formData.map_lat || ''} onChange={e => updateField('map_lat', parseFloat(e.target.value))} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Map Lng</label><Input type="number" step="0.0001" value={formData.map_lng || ''} onChange={e => updateField('map_lng', parseFloat(e.target.value))} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Social Links</h4>
            <ArrayEditor items={formData.social_links || []} onChange={v => updateField('social_links', v)} fields={[{ key: 'name', label: 'Platform' }, { key: 'url', label: 'URL' }]} />
          </div>
        )
      case 'page_consultation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Title</label><Input value={formData.hero_title_en || ''} onChange={e => updateField('hero_title_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Subtitle</label><Input value={formData.hero_subtitle_en || ''} onChange={e => updateField('hero_subtitle_en', e.target.value)} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Consultation Types</h4>
            <ArrayEditor items={formData.consultation_types || []} onChange={v => updateField('consultation_types', v)} fields={[{ key: 'icon', label: 'Icon' }, { key: 'title', label: 'Title' }, { key: 'duration', label: 'Duration' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'cta', label: 'CTA' }, { key: 'features', label: 'Features', type: 'array' }]} />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Process Steps</h4>
            <ArrayEditor items={formData.process_steps || []} onChange={v => updateField('process_steps', v)} fields={[{ key: 'number', label: '#' }, { key: 'icon', label: 'Icon' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }]} />
          </div>
        )
      case 'page_experience_centre':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Title</label><Input value={formData.hero_title_en || ''} onChange={e => updateField('hero_title_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Subtitle</label><Input value={formData.hero_subtitle_en || ''} onChange={e => updateField('hero_subtitle_en', e.target.value)} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Zones</h4>
            <ArrayEditor items={formData.zones || []} onChange={v => updateField('zones', v)} fields={[{ key: 'name', label: 'Zone' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'image', label: 'Image' }, { key: 'features', label: 'Features', type: 'array' }]} />
          </div>
        )
      case 'site_footer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full"><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label><textarea value={formData.company_description_en || ''} onChange={e => updateField('company_description_en', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label><Input value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label><Input value={formData.email || ''} onChange={e => updateField('email', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Instagram</label><Input value={formData.social_links?.instagram || ''} onChange={e => updateField('social_links', { ...formData.social_links, instagram: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Facebook</label><Input value={formData.social_links?.facebook || ''} onChange={e => updateField('social_links', { ...formData.social_links, facebook: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">LinkedIn</label><Input value={formData.social_links?.linkedin || ''} onChange={e => updateField('social_links', { ...formData.social_links, linkedin: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">YouTube</label><Input value={formData.social_links?.youtube || ''} onChange={e => updateField('social_links', { ...formData.social_links, youtube: e.target.value })} /></div>
            </div>
          </div>
        )
      case 'careers_positions':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (EN)</label><Input value={formData.heading_en || ''} onChange={e => updateField('heading_en', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Heading (AR)</label><Input value={formData.heading_ar || ''} onChange={e => updateField('heading_ar', e.target.value)} dir="rtl" /></div>
            </div>
            <ArrayEditor items={formData.positions || []} onChange={v => updateField('positions', v)} fields={[{ key: 'title', label: 'Title' }, { key: 'department', label: 'Department' }, { key: 'location', label: 'Location' }, { key: 'type', label: 'Type' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'requirements', label: 'Requirements', type: 'array' }]} />
          </div>
        )
      default:
        // Service pages
        if (sectionKey.startsWith('service_')) {
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label><Input value={formData.title || ''} onChange={e => updateField('title', e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hero Subtitle</label><Input value={formData.hero_subtitle || ''} onChange={e => updateField('hero_subtitle', e.target.value)} /></div>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Features</h4>
              <ArrayEditor items={formData.features || []} onChange={v => updateField('features', v)} fields={[{ key: 'icon', label: 'Icon' }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description' }]} />
              {formData.faqs && (<><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">FAQs</h4><ArrayEditor items={formData.faqs || []} onChange={v => updateField('faqs', v)} fields={[{ key: 'q', label: 'Question' }, { key: 'a', label: 'Answer', type: 'textarea' }]} /></>)}
            </div>
          )
        }
        // Generic fallback (misc/persona pages) - JSON editor
        return <GenericPageEditor data={data} onSave={onSave} />
    }
  }

  return (
    <div className="space-y-4">
      {renderFields()}
      {!sectionKey.startsWith('page_solutions_') && !sectionKey.startsWith('page_geo_') && !sectionKey.startsWith('page_') && (
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => onSave(formData)} data-testid={`save-${sectionKey}`}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
        </div>
      )}
      {(sectionKey.startsWith('page_') && !sectionKey.startsWith('page_solutions_') && !sectionKey.startsWith('page_geo_') && !sectionKey.startsWith('page_about') && !sectionKey.startsWith('page_contact') && !sectionKey.startsWith('page_consultation') && !sectionKey.startsWith('page_experience')) && (
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => onSave(formData)} data-testid={`save-${sectionKey}`}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
        </div>
      )}
      {(sectionKey === 'page_about' || sectionKey === 'page_contact' || sectionKey === 'page_consultation' || sectionKey === 'page_experience_centre' || sectionKey === 'site_footer' || sectionKey === 'careers_positions' || sectionKey.startsWith('homepage_') || sectionKey.startsWith('service_')) && (
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => onSave(formData)} data-testid={`save-${sectionKey}`}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
        </div>
      )}
    </div>
  )
}

// Geo/Location Page Editor

// SEO Metadata Editor
function charCountColor(len: number, min: number, max: number) {
  if (len === 0) return 'text-gray-400'
  if (len < min) return 'text-amber-500'
  if (len > max) return 'text-red-500'
  return 'text-emerald-500'
}

function SeoMetaEditor({ data, onSave, pageKey }: { data: any, onSave: (data: any) => void, pageKey: string }) {
  const [formData, setFormData] = useState<any>(data || {})
  const [previewTab, setPreviewTab] = useState<'google' | 'social'>('google')
  useEffect(() => { setFormData(data || {}) }, [data])
  const update = (key: string, value: any) => setFormData((prev: any) => ({ ...prev, [key]: value }))

  const isGlobal = pageKey === 'seo_global'

  // Derive page URL from key
  const pageSlug = pageKey.replace(/^seo_/, '').replace(/_/g, '-')
  const pageUrl = isGlobal ? 'lexalifestyle.com' : `lexalifestyle.com/${pageSlug === 'homepage' ? '' : pageSlug}`

  // Preview values
  const previewTitle = formData.title || 'Page Title | LEXA Smart Home'
  const previewDesc = formData.description || 'A compelling description of this page for search engine results...'
  const previewOgTitle = formData.og_title || previewTitle
  const previewOgDesc = formData.og_description || previewDesc
  const previewOgImage = formData.og_image || ''

  const titleLen = (formData.title || '').length
  const descLen = (formData.description || '').length

  return (
    <div className="space-y-4">
      {/* Live Preview */}
      <div className="border border-[#C9A962]/30 rounded-lg overflow-hidden" data-testid="seo-preview-card">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setPreviewTab('google')}
            className={`flex-1 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${previewTab === 'google' ? 'bg-white dark:bg-gray-900 text-[#C9A962] border-b-2 border-[#C9A962]' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            data-testid="preview-tab-google"
          >
            Google Preview
          </button>
          <button
            onClick={() => setPreviewTab('social')}
            className={`flex-1 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${previewTab === 'social' ? 'bg-white dark:bg-gray-900 text-[#C9A962] border-b-2 border-[#C9A962]' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            data-testid="preview-tab-social"
          >
            Social Card Preview
          </button>
        </div>

        {previewTab === 'google' && (
          <div className="p-4 bg-white dark:bg-gray-900" data-testid="google-serp-preview">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">Search Result Preview</p>
            <div className="max-w-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5 truncate">{pageUrl}</p>
              <h3 className="text-lg text-blue-700 dark:text-blue-400 font-normal leading-snug mb-0.5 line-clamp-1 cursor-pointer hover:underline">
                {previewTitle.length > 60 ? previewTitle.slice(0, 60) + '...' : previewTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {previewDesc.length > 160 ? previewDesc.slice(0, 160) + '...' : previewDesc}
              </p>
            </div>
            <div className="mt-3 flex gap-4 text-xs">
              <span className={charCountColor(titleLen, 30, 60)}>
                Title: {titleLen}/60 {titleLen > 60 ? '(too long)' : titleLen > 0 && titleLen < 30 ? '(too short)' : titleLen > 0 ? '(good)' : ''}
              </span>
              <span className={charCountColor(descLen, 70, 160)}>
                Desc: {descLen}/160 {descLen > 160 ? '(too long)' : descLen > 0 && descLen < 70 ? '(too short)' : descLen > 0 ? '(good)' : ''}
              </span>
            </div>
          </div>
        )}

        {previewTab === 'social' && (
          <div className="p-4 bg-white dark:bg-gray-900" data-testid="social-card-preview">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">Social Card Preview</p>
            <div className="max-w-md border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {previewOgImage ? (
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 relative">
                  <img src={previewOgImage} alt="OG" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs pointer-events-none">
                    {!previewOgImage && 'No image set'}
                  </div>
                </div>
              ) : (
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Image className="h-8 w-8 mx-auto mb-1 opacity-40" />
                    <p className="text-xs">No OG image set</p>
                  </div>
                </div>
              )}
              <div className="p-3 bg-gray-50 dark:bg-gray-800">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{pageUrl}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-1">{previewOgTitle}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{previewOgDesc}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Meta Tags</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="col-span-full">
            <label className="text-xs text-gray-500">Meta Title{isGlobal ? ' (default for all pages)' : ''}</label>
            <Input value={formData.title || ''} onChange={e => update('title', e.target.value)} placeholder="Page Title | LEXA Smart Home" data-testid="seo-title" />
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${titleLen === 0 ? 'w-0' : titleLen <= 60 ? 'bg-emerald-400' : 'bg-red-400'}`} style={{ width: `${Math.min((titleLen / 60) * 100, 100)}%` }} />
              </div>
              <p className={`text-xs ${charCountColor(titleLen, 30, 60)}`}>{titleLen}/60</p>
            </div>
          </div>
          <div className="col-span-full">
            <label className="text-xs text-gray-500">Meta Description</label>
            <textarea value={formData.description || ''} onChange={e => update('description', e.target.value)} placeholder="A compelling description for search results..." className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} data-testid="seo-description" />
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${descLen === 0 ? 'w-0' : descLen <= 160 ? 'bg-emerald-400' : 'bg-red-400'}`} style={{ width: `${Math.min((descLen / 160) * 100, 100)}%` }} />
              </div>
              <p className={`text-xs ${charCountColor(descLen, 70, 160)}`}>{descLen}/160</p>
            </div>
          </div>
          <div className="col-span-full">
            <label className="text-xs text-gray-500">Keywords (comma-separated)</label>
            <Input value={formData.keywords || ''} onChange={e => update('keywords', e.target.value)} placeholder="smart home dubai, home automation, luxury villa" data-testid="seo-keywords" />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Open Graph (Social Sharing)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="col-span-full"><label className="text-xs text-gray-500">OG Title (defaults to Meta Title)</label><Input value={formData.og_title || ''} onChange={e => update('og_title', e.target.value)} /></div>
          <div className="col-span-full"><label className="text-xs text-gray-500">OG Description</label><textarea value={formData.og_description || ''} onChange={e => update('og_description', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
          <div><label className="text-xs text-gray-500">OG Image URL</label><Input value={formData.og_image || ''} onChange={e => update('og_image', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">OG Type</label><Input value={formData.og_type || 'website'} onChange={e => update('og_type', e.target.value)} /></div>
        </div>
      </div>

      {isGlobal && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Global Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500">Site Name</label><Input value={formData.site_name || ''} onChange={e => update('site_name', e.target.value)} /></div>
            <div><label className="text-xs text-gray-500">Canonical Domain</label><Input value={formData.canonical_domain || ''} onChange={e => update('canonical_domain', e.target.value)} placeholder="https://lexasmarthome.com" /></div>
            <div><label className="text-xs text-gray-500">Default OG Image</label><Input value={formData.default_og_image || ''} onChange={e => update('default_og_image', e.target.value)} /></div>
            <div><label className="text-xs text-gray-500">Twitter Handle</label><Input value={formData.twitter_handle || ''} onChange={e => update('twitter_handle', e.target.value)} placeholder="@lexasmarthome" /></div>
            <div className="col-span-full"><label className="text-xs text-gray-500">Google Verification Code</label><Input value={formData.google_verification || ''} onChange={e => update('google_verification', e.target.value)} /></div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Advanced</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Canonical URL Override</label><Input value={formData.canonical_url || ''} onChange={e => update('canonical_url', e.target.value)} placeholder="Leave empty for auto-generated" /></div>
          <div>
            <label className="text-xs text-gray-500">Robots</label>
            <select value={formData.robots || 'index, follow'} onChange={e => update('robots', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              <option value="index, follow">Index, Follow (default)</option>
              <option value="noindex, follow">No Index, Follow</option>
              <option value="index, nofollow">Index, No Follow</option>
              <option value="noindex, nofollow">No Index, No Follow</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={() => onSave(formData)} data-testid="save-seo"><Save className="h-4 w-4 mr-2" /> Save SEO Settings</Button>
      </div>
    </div>
  )
}

function GeoPageEditor({ data, onSave }: { data: any, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState<any>(data || {})
  useEffect(() => { setFormData(data || {}) }, [data])
  const update = (key: string, value: any) => setFormData((prev: any) => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Page Header</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Location Name</label><Input value={formData.name || ''} onChange={e => update('name', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">Region</label><Input value={formData.region || ''} onChange={e => update('region', e.target.value)} /></div>
          <div className="col-span-full"><label className="text-xs text-gray-500">Description</label><textarea value={formData.description || ''} onChange={e => update('description', e.target.value)} className="w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" rows={2} /></div>
          <div><label className="text-xs text-gray-500">Hero Image</label><Input value={formData.hero_image || ''} onChange={e => update('hero_image', e.target.value)} /></div>
          <div><label className="text-xs text-gray-500">Hero Title</label><Input value={formData.hero_title || ''} onChange={e => update('hero_title', e.target.value)} /></div>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Communities/Areas</h4>
        <ArrayEditor items={formData.communities || []} onChange={v => update('communities', v)} fields={[
          { key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'price', label: 'Price Range' }
        ]} />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Services Offered</h4>
        <ArrayEditor items={formData.services || []} onChange={v => update('services', v)} fields={[
          { key: 'icon', label: 'Icon' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }
        ]} />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">FAQs</h4>
        <ArrayEditor items={formData.faqs || []} onChange={v => update('faqs', v)} fields={[
          { key: 'question', label: 'Question' }, { key: 'answer', label: 'Answer', type: 'textarea' }
        ]} />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-bold mb-3 text-[#C9A962]">Stats</h4>
        <ArrayEditor items={formData.stats || []} onChange={v => update('stats', v)} fields={[
          { key: 'number', label: 'Number' }, { key: 'label', label: 'Label' }
        ]} />
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={() => onSave(formData)} data-testid="save-geo-page"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
      </div>
    </div>
  )
}

export default function CMSPage() {
  const [sections, setSections] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('homepage')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchSections = useCallback(async () => {
    try {
      const filteredSections = CMS_SECTIONS.filter(s => s.category === activeCategory)
      const keys = filteredSections.map(s => s.key).join(',')
      if (!keys) { setLoading(false); return }
      const res = await fetch(`${BACKEND_URL}/api/cms/sections?keys=${keys}`)
      const data = await res.json()
      setSections(prev => ({ ...prev, ...data }))
    } catch {
      toast.error('Failed to load CMS data')
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  useEffect(() => { setLoading(true); fetchSections() }, [fetchSections])

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
        toast.success('Saved successfully')
        setSections(prev => ({ ...prev, [key]: data }))
      } else {
        toast.error('Save failed')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(null)
    }
  }

  // Seed all solution pages by visiting each URL to trigger auto-seed
  const [seeding, setSeeding] = useState(false)
  const handleSeedAll = async () => {
    setSeeding(true)
    const solutionSections = CMS_SECTIONS.filter(s => s.category === activeCategory && !sections[s.key])
    if (solutionSections.length === 0) {
      toast.info('All sections already have CMS data')
      setSeeding(false)
      return
    }

    toast.info(`Seeding ${solutionSections.length} pages... This opens pages in hidden frames to extract content.`)
    
    // Map CMS keys to page URLs
    const keyToUrl: Record<string, string> = {}
    for (const s of solutionSections) {
      if (s.key.startsWith('page_solutions_')) {
        const slug = s.key.replace('page_solutions_', '').replace(/_/g, '/')
        keyToUrl[s.key] = `/solutions/${slug.replace(/-/g, '-')}`
      } else if (s.key.startsWith('page_geo_')) {
        continue // Geo pages need page visit - skip for now
      }
    }

    let seeded = 0
    // Open each solution page in a hidden iframe to trigger auto-seed
    for (const [key, url] of Object.entries(keyToUrl)) {
      try {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        document.body.appendChild(iframe)
        // Wait for page to load and auto-seed
        await new Promise(resolve => setTimeout(resolve, 2500))
        document.body.removeChild(iframe)
        seeded++
      } catch { /* continue */ }
    }

    toast.success(`Seeded ${seeded} solution pages. Refreshing...`)
    setSeeding(false)
    setLoading(true)
    fetchSections()
  }

  const filteredSections = CMS_SECTIONS.filter(s => {
    const matchesCategory = s.category === activeCategory
    const matchesSearch = !searchQuery || s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.key.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = CMS_SECTIONS.length

  return (
    <div className="space-y-6" data-testid="cms-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all {totalPages} dynamic content sections across the website</p>
        </div>
        <div className="flex gap-2">
          {(activeCategory === 'solutions') && (
            <Button variant="outline" onClick={handleSeedAll} disabled={seeding} data-testid="seed-all-btn" className="text-[#C9A962] border-[#C9A962] hover:bg-[#C9A962]/10">
              {seeding ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
              {seeding ? 'Seeding...' : 'Seed from Current'}
            </Button>
          )}
          <Button variant="outline" onClick={() => { setLoading(true); fetchSections() }} data-testid="refresh-cms">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
        {CATEGORIES.map(cat => {
          const count = CMS_SECTIONS.filter(s => s.category === cat.id).length
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setExpanded(null) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-[#C9A962] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              data-testid={`tab-${cat.id}`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
              <span className="text-xs opacity-75">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search sections..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="cms-search"
        />
      </div>

      {/* Section List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSections.length === 0 && (
            <p className="text-center text-gray-500 py-8">No sections found</p>
          )}
          {filteredSections.map(section => {
            const Icon = section.icon
            const isExpanded = expanded === section.key
            const hasData = sections[section.key] != null
            return (
              <div key={section.key} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden" data-testid={`cms-section-${section.key}`}>
                <button
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : section.key)}
                  data-testid={`toggle-${section.key}`}
                >
                  <Icon className="h-5 w-5 text-[#C9A962] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{section.label}</h3>
                      {hasData && <span className="inline-block w-2 h-2 rounded-full bg-green-500 flex-shrink-0" title="Has CMS data" />}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{section.description}</p>
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
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Save, Upload, Globe, Image, Link2, Mail, Phone, MapPin, FileImage, Video, Type, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SiteSettings {
  // Logos
  header_logo_light: string
  header_logo_dark: string
  footer_logo_light: string
  footer_logo_dark: string
  favicon: string
  // Social Media
  social_facebook: string
  social_instagram: string
  social_twitter: string
  social_linkedin: string
  social_youtube: string
  social_tiktok: string
  social_whatsapp: string
  // Contact
  contact_email: string
  contact_phone: string
  contact_address: string
  // Homepage Hero
  hero_title: string
  hero_subtitle: string
  hero_video_url: string
  hero_image: string
  hero_cta_text: string
  hero_cta_link: string
  // SEO
  site_name: string
  site_description: string
  // Homepage Sections
  featured_projects_title: string
  featured_projects_subtitle: string
  about_section_title: string
  about_section_content: string
  about_section_image: string
}

const defaultSettings: SiteSettings = {
  header_logo_light: '',
  header_logo_dark: '',
  footer_logo_light: '',
  footer_logo_dark: '',
  favicon: '',
  social_facebook: '',
  social_instagram: '',
  social_twitter: '',
  social_linkedin: '',
  social_youtube: '',
  social_tiktok: '',
  social_whatsapp: '',
  contact_email: '',
  contact_phone: '',
  contact_address: '',
  hero_title: '',
  hero_subtitle: '',
  hero_video_url: '',
  hero_image: '',
  hero_cta_text: '',
  hero_cta_link: '',
  site_name: '',
  site_description: '',
  featured_projects_title: '',
  featured_projects_subtitle: '',
  about_section_title: '',
  about_section_content: '',
  about_section_image: ''
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'logos' | 'social' | 'contact' | 'homepage' | 'seo'>('logos')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/site-settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...defaultSettings, ...data })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/site-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Settings saved successfully!')
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const tabs = [
    { id: 'logos', label: 'Logos & Favicon', icon: Image },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'homepage', label: 'Homepage', icon: Type },
    { id: 'seo', label: 'SEO', icon: Link2 }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600 mt-1">Manage your website's global settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          data-testid="save-settings-btn"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Logos & Favicon Tab */}
        {activeTab === 'logos' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Logos & Favicon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Logo (Light/White) - For dark backgrounds
                </label>
                <input
                  type="text"
                  value={settings.header_logo_light}
                  onChange={(e) => handleChange('header_logo_light', e.target.value)}
                  placeholder="https://example.com/logo-white.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="header-logo-light"
                />
                {settings.header_logo_light && (
                  <div className="mt-2 p-4 bg-gray-800 rounded-lg">
                    <img src={settings.header_logo_light} alt="Light Logo Preview" className="h-12 object-contain" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Logo (Dark/Black) - For light backgrounds
                </label>
                <input
                  type="text"
                  value={settings.header_logo_dark}
                  onChange={(e) => handleChange('header_logo_dark', e.target.value)}
                  placeholder="https://example.com/logo-dark.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="header-logo-dark"
                />
                {settings.header_logo_dark && (
                  <div className="mt-2 p-4 bg-white border rounded-lg">
                    <img src={settings.header_logo_dark} alt="Dark Logo Preview" className="h-12 object-contain" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Footer Logo (Light/White)
                </label>
                <input
                  type="text"
                  value={settings.footer_logo_light}
                  onChange={(e) => handleChange('footer_logo_light', e.target.value)}
                  placeholder="https://example.com/footer-logo-white.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="footer-logo-light"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Footer Logo (Dark/Black)
                </label>
                <input
                  type="text"
                  value={settings.footer_logo_dark}
                  onChange={(e) => handleChange('footer_logo_dark', e.target.value)}
                  placeholder="https://example.com/footer-logo-dark.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="footer-logo-dark"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileImage size={16} className="inline mr-2" />
                  Favicon URL
                </label>
                <input
                  type="text"
                  value={settings.favicon}
                  onChange={(e) => handleChange('favicon', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="favicon"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 32x32 or 64x64 pixels, .ico or .png format</p>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={settings.social_facebook}
                  onChange={(e) => handleChange('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-facebook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-instagram"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter / X</label>
                <input
                  type="url"
                  value={settings.social_twitter}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-twitter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={settings.social_linkedin}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-linkedin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <input
                  type="url"
                  value={settings.social_youtube}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-youtube"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                <input
                  type="url"
                  value={settings.social_tiktok}
                  onChange={(e) => handleChange('social_tiktok', e.target.value)}
                  placeholder="https://tiktok.com/@yourpage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-tiktok"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.social_whatsapp}
                  onChange={(e) => handleChange('social_whatsapp', e.target.value)}
                  placeholder="+971501234567 (include country code)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="social-whatsapp"
                />
                <p className="text-xs text-gray-500 mt-1">Enter full phone number with country code for WhatsApp chat link</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="info@yourcompany.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="contact-email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="+971 4 XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="contact-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Address
                </label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
                  placeholder="Enter your business address"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  data-testid="contact-address"
                />
              </div>
            </div>
          </div>
        )}

        {/* Homepage Tab */}
        {activeTab === 'homepage' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Homepage Content</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Hero Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={settings.hero_title}
                      onChange={(e) => handleChange('hero_title', e.target.value)}
                      placeholder="Transform Your Space Into an Intelligent Sanctuary"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-testid="hero-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                    <textarea
                      value={settings.hero_subtitle}
                      onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                      placeholder="Experience the future of luxury living..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      data-testid="hero-subtitle"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Video size={16} className="inline mr-2" />
                        Hero Video URL
                      </label>
                      <input
                        type="url"
                        value={settings.hero_video_url}
                        onChange={(e) => handleChange('hero_video_url', e.target.value)}
                        placeholder="https://example.com/hero-video.mp4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        data-testid="hero-video-url"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Image size={16} className="inline mr-2" />
                        Hero Background Image
                      </label>
                      <input
                        type="url"
                        value={settings.hero_image}
                        onChange={(e) => handleChange('hero_image', e.target.value)}
                        placeholder="https://example.com/hero-bg.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        data-testid="hero-image"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={settings.hero_cta_text}
                        onChange={(e) => handleChange('hero_cta_text', e.target.value)}
                        placeholder="Explore Solutions"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        data-testid="hero-cta-text"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Link</label>
                      <input
                        type="text"
                        value={settings.hero_cta_link}
                        onChange={(e) => handleChange('hero_cta_link', e.target.value)}
                        placeholder="/solutions"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        data-testid="hero-cta-link"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Featured Projects Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={settings.featured_projects_title}
                      onChange={(e) => handleChange('featured_projects_title', e.target.value)}
                      placeholder="Our Portfolio"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-testid="featured-projects-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.featured_projects_subtitle}
                      onChange={(e) => handleChange('featured_projects_subtitle', e.target.value)}
                      placeholder="Explore our latest smart home transformations"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-testid="featured-projects-subtitle"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">About Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={settings.about_section_title}
                      onChange={(e) => handleChange('about_section_title', e.target.value)}
                      placeholder="About LEXA"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-testid="about-section-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Content</label>
                    <textarea
                      value={settings.about_section_content}
                      onChange={(e) => handleChange('about_section_content', e.target.value)}
                      placeholder="Enter about section content..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      data-testid="about-section-content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Image URL</label>
                    <input
                      type="url"
                      value={settings.about_section_image}
                      onChange={(e) => handleChange('about_section_image', e.target.value)}
                      placeholder="https://example.com/about-image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-testid="about-section-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="LEXA Lifestyle"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="site-name"
                />
                <p className="text-xs text-gray-500 mt-1">Used in browser tab titles and search results</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  placeholder="Premium Smart Home Automation Solutions"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  data-testid="site-description"
                />
                <p className="text-xs text-gray-500 mt-1">Used in search engine results (keep under 160 characters)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

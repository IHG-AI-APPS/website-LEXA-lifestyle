'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, Upload, Globe, Image, Link2, Mail, Phone, MapPin, FileImage, Video, Type, Loader2, X, Check, Play, Film } from 'lucide-react'
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
  contact_phone_secondary: string
  contact_address: string
  hr_email: string
  google_maps_embed: string
  // Business Hours
  business_hours_weekday: string
  business_hours_friday: string
  business_hours_sunday: string
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
  contact_phone_secondary: '',
  contact_address: '',
  hr_email: '',
  google_maps_embed: '',
  business_hours_weekday: 'Sat-Thu: 9AM-6PM',
  business_hours_friday: 'Fri: 10AM-4PM',
  business_hours_sunday: 'Sun: Closed',
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

// Image Upload Component
function ImageUploader({ 
  value, 
  onChange, 
  label, 
  category = 'logos',
  previewBg = 'light'
}: { 
  value: string
  onChange: (url: string) => void
  label: string
  category?: string
  previewBg?: 'light' | 'dark'
}) {
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload an image (JPG, PNG, GIF, WebP, SVG)')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 10MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      const response = await fetch(`${API_URL}/api/uploads/image`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        onChange(data.url)
        toast.success('Image uploaded successfully!')
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">{label}</label>
      
      {/* Preview */}
      {value && (
        <div className={`relative inline-block p-4 rounded-lg ${previewBg === 'dark' ? 'bg-gray-800' : 'bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-zinc-700'}`}>
          <img 
            src={value} 
            alt="Preview" 
            className="h-16 max-w-[200px] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.png'
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Upload Options */}
      <div className="flex flex-wrap gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 dark:bg-[#C9A962] text-white dark:text-black rounded-lg hover:bg-blue-700 dark:hover:bg-[#B8984F] disabled:opacity-50 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} />
              Upload Image
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#171717] transition-colors"
        >
          <Link2 size={16} />
          {showUrlInput ? 'Hide URL Input' : 'Enter URL'}
        </button>
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.png"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
        />
      )}
    </div>
  )
}

// Video Upload Component with Preview
function VideoUploader({ 
  value, 
  onChange, 
  label 
}: { 
  value: string
  onChange: (url: string) => void
  label: string
}) {
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Handle video metadata loaded
  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(formatDuration(videoRef.current.duration))
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a video (MP4, WebM, MOV)')
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video too large. Maximum size is 100MB')
      return
    }

    // Show file info
    setSelectedFile({ name: file.name, size: formatFileSize(file.size) })

    setUploading(true)
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', 'videos')

      // Simulated progress (actual progress requires XHR)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch(`${API_URL}/api/uploads/video`, {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        onChange(data.url)
        toast.success('Video uploaded successfully!')
      } else {
        const error = await response.json()
        toast.error(error.detail || 'Failed to upload video')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload video')
    } finally {
      setUploading(false)
      setUploadProgress(0)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setVideoDuration('')
  }

  const getVideoThumbnail = (url: string) => {
    // For video URLs, we'll use the video element itself for preview
    return url
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">{label}</label>
      
      {/* Video Preview */}
      {value && (
        <div className="relative bg-gray-900 dark:bg-black rounded-lg overflow-hidden">
          <video 
            ref={videoRef}
            src={value}
            className="w-full max-h-[300px] object-contain"
            controls
            preload="metadata"
            onLoadedMetadata={handleVideoLoaded}
            data-testid="hero-video-preview"
          >
            Your browser does not support the video tag.
          </video>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            data-testid="remove-video-btn"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
              <Play size={12} />
              Current Hero Video
            </span>
            {videoDuration && (
              <span className="px-2 py-1 bg-[#C9A962]/90 text-black text-xs rounded-full font-medium" data-testid="video-duration">
                {videoDuration}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          {selectedFile && (
            <div className="text-sm text-gray-700 dark:text-zinc-300 font-medium">
              {selectedFile.name} ({selectedFile.size})
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
            <Loader2 size={16} className="animate-spin" />
            Uploading video... {uploadProgress}%
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
            <div 
              className="bg-blue-600 dark:bg-[#C9A962] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Upload Options */}
      {!uploading && (
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="video-file-input"
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 text-xs bg-blue-600 dark:bg-[#C9A962] text-white dark:text-black rounded-lg hover:bg-blue-700 dark:hover:bg-[#B8984F] disabled:opacity-50 transition-colors font-medium"
            data-testid="upload-video-btn"
          >
            <Film size={16} />
            Upload Video
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#171717] transition-colors font-medium"
            data-testid="toggle-url-input-btn"
          >
            <Link2 size={16} />
            {showUrlInput ? 'Hide URL Input' : 'Enter URL'}
          </button>
        </div>
      )}

      {/* URL Input */}
      {showUrlInput && !uploading && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/hero-video.mp4"
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
          data-testid="video-url-input"
        />
      )}

      {/* Help text */}
      <p className="text-xs text-gray-500 dark:text-zinc-400">
        Supported formats: MP4, WebM, MOV. Max size: 100MB. For best results, use H.264 encoded MP4.
      </p>
    </div>
  )
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
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        // Merge with defaults to ensure all fields exist
        setSettings(prev => ({ ...defaultSettings, ...data }))
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
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-[#C9A962]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h1>
          <p className="text-gray-600 dark:text-zinc-400 mt-1">Manage your website's global settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-[#C9A962] text-white dark:text-black rounded-lg hover:bg-blue-700 dark:hover:bg-[#B8984F] disabled:opacity-50 transition-colors"
          data-testid="save-settings-btn"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-zinc-700">
        <nav className="flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 dark:border-[#C9A962] text-blue-600 dark:text-[#C9A962]'
                  : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white'
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
      <div className="bg-white dark:bg-[#171717] rounded-lg shadow dark:shadow-none dark:border dark:border-zinc-800 p-6">
        {/* Logos & Favicon Tab */}
        {activeTab === 'logos' && (
          <div className="space-y-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Logos & Favicon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader
                value={settings.header_logo_light}
                onChange={(url) => handleChange('header_logo_light', url)}
                label="Header Logo (Light/White) - For dark backgrounds"
                category="logos"
                previewBg="dark"
              />

              <ImageUploader
                value={settings.header_logo_dark}
                onChange={(url) => handleChange('header_logo_dark', url)}
                label="Header Logo (Dark/Black) - For light backgrounds"
                category="logos"
                previewBg="light"
              />

              <ImageUploader
                value={settings.footer_logo_light}
                onChange={(url) => handleChange('footer_logo_light', url)}
                label="Footer Logo (Light/White)"
                category="logos"
                previewBg="dark"
              />

              <ImageUploader
                value={settings.footer_logo_dark}
                onChange={(url) => handleChange('footer_logo_dark', url)}
                label="Footer Logo (Dark/Black)"
                category="logos"
                previewBg="light"
              />
            </div>

            <div className="pt-4 border-t dark:border-zinc-700">
              <ImageUploader
                value={settings.favicon}
                onChange={(url) => handleChange('favicon', url)}
                label="Favicon (32x32 or 64x64 pixels, .ico or .png)"
                category="logos"
                previewBg="light"
              />
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Media Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Facebook</label>
                <input
                  type="url"
                  value={settings.social_facebook}
                  onChange={(e) => handleChange('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-facebook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Instagram</label>
                <input
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-instagram"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Twitter / X</label>
                <input
                  type="url"
                  value={settings.social_twitter}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/yourpage"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-twitter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={settings.social_linkedin}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-linkedin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">YouTube</label>
                <input
                  type="url"
                  value={settings.social_youtube}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-youtube"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">TikTok</label>
                <input
                  type="url"
                  value={settings.social_tiktok}
                  onChange={(e) => handleChange('social_tiktok', e.target.value)}
                  placeholder="https://tiktok.com/@yourpage"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-tiktok"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.social_whatsapp}
                  onChange={(e) => handleChange('social_whatsapp', e.target.value)}
                  placeholder="+971501234567 (include country code)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="social-whatsapp"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Enter full phone number with country code for WhatsApp chat link</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Company Email (General Inquiries)
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="info@yourcompany.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="contact-email"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Used for general contact forms and inquiries</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  HR Email (Careers/Jobs)
                </label>
                <input
                  type="email"
                  value={settings.hr_email}
                  onChange={(e) => handleChange('hr_email', e.target.value)}
                  placeholder="careers@yourcompany.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="hr-email"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Used for job applications and career inquiries</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Primary Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="+971 50 326 7228"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="contact-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Secondary Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.contact_phone_secondary}
                  onChange={(e) => handleChange('contact_phone_secondary', e.target.value)}
                  placeholder="+971 4 123 4567"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="contact-phone-secondary"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Optional secondary contact number (e.g., landline or alternate mobile)</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Address
                </label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
                  placeholder="Enter your business address"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent resize-none bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="contact-address"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Google Maps Embed Code
                </label>
                <textarea
                  value={settings.google_maps_embed}
                  onChange={(e) => handleChange('google_maps_embed', e.target.value)}
                  placeholder='Paste the Google Maps embed URL here (e.g., https://www.google.com/maps/embed?pb=...)'
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  data-testid="google-maps-embed"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                  Get the embed URL from Google Maps: Share → Embed a map → Copy the src URL from the iframe code
                </p>
                {settings.google_maps_embed && (
                  <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                    <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 border-b">Map Preview</p>
                    <iframe
                      src={settings.google_maps_embed}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Preview"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Business Hours Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Weekday Hours (Sat-Thu)
                  </label>
                  <input
                    type="text"
                    value={settings.business_hours_weekday}
                    onChange={(e) => handleChange('business_hours_weekday', e.target.value)}
                    placeholder="Sat-Thu: 9AM-6PM"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    data-testid="business-hours-weekday"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Friday Hours
                  </label>
                  <input
                    type="text"
                    value={settings.business_hours_friday}
                    onChange={(e) => handleChange('business_hours_friday', e.target.value)}
                    placeholder="Fri: 10AM-4PM"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    data-testid="business-hours-friday"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Sunday Hours
                  </label>
                  <input
                    type="text"
                    value={settings.business_hours_sunday}
                    onChange={(e) => handleChange('business_hours_sunday', e.target.value)}
                    placeholder="Sun: Closed"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    data-testid="business-hours-sunday"
                  />
                </div>
              </div>
              
              {/* Preview */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-[#0A0A0A] rounded-lg border border-gray-200 dark:border-zinc-700">
                <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-2">Preview</p>
                <div className="text-gray-900 dark:text-white">
                  <p className="text-sm">{settings.business_hours_weekday || 'Sat-Thu: 9AM-6PM'}</p>
                  <p className="text-sm">{settings.business_hours_friday || 'Fri: 10AM-4PM'}</p>
                  <p className="text-sm">{settings.business_hours_sunday || 'Sun: Closed'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Homepage Tab */}
        {activeTab === 'homepage' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Homepage Content</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Hero Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={settings.hero_title}
                      onChange={(e) => handleChange('hero_title', e.target.value)}
                      placeholder="Transform Your Space Into an Intelligent Sanctuary"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="hero-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Hero Subtitle</label>
                    <textarea
                      value={settings.hero_subtitle}
                      onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                      placeholder="Experience the future of luxury living..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent resize-none bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="hero-subtitle"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <VideoUploader
                      value={settings.hero_video_url}
                      onChange={(url) => handleChange('hero_video_url', url)}
                      label="Hero Video"
                    />

                    <ImageUploader
                      value={settings.hero_image}
                      onChange={(url) => handleChange('hero_image', url)}
                      label="Hero Background Image (Fallback)"
                      category="hero"
                      previewBg="dark"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={settings.hero_cta_text}
                        onChange={(e) => handleChange('hero_cta_text', e.target.value)}
                        placeholder="Explore Solutions"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                        data-testid="hero-cta-text"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">CTA Button Link</label>
                      <input
                        type="text"
                        value={settings.hero_cta_link}
                        onChange={(e) => handleChange('hero_cta_link', e.target.value)}
                        placeholder="/solutions"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={settings.featured_projects_title}
                      onChange={(e) => handleChange('featured_projects_title', e.target.value)}
                      placeholder="Our Portfolio"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="featured-projects-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.featured_projects_subtitle}
                      onChange={(e) => handleChange('featured_projects_subtitle', e.target.value)}
                      placeholder="Explore our latest smart home transformations"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="featured-projects-subtitle"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">About Section</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={settings.about_section_title}
                      onChange={(e) => handleChange('about_section_title', e.target.value)}
                      placeholder="About LEXA"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="about-section-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Section Content</label>
                    <textarea
                      value={settings.about_section_content}
                      onChange={(e) => handleChange('about_section_content', e.target.value)}
                      placeholder="Enter about section content..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent resize-none bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                      data-testid="about-section-content"
                    />
                  </div>

                  <ImageUploader
                    value={settings.about_section_image}
                    onChange={(url) => handleChange('about_section_image', url)}
                    label="About Section Image"
                    category="images"
                    previewBg="light"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SEO Settings</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="LEXA Lifestyle"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="site-name"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Used in browser tab titles and search results</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Site Description</label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  placeholder="Premium Smart Home Automation Solutions"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C9A962] focus:border-transparent resize-none bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                  data-testid="site-description"
                />
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Used in search engine results (keep under 160 characters)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

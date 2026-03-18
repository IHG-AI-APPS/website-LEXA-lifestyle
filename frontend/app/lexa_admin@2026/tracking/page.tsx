'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, Save, AlertCircle, CheckCircle2, RefreshCw,
  ExternalLink, Info
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface TrackingSettings {
  ga4_measurement_id: string
  google_ads_id: string
  google_ads_conversion_label: string
  meta_pixel_id: string
  linkedin_partner_id: string
  tiktok_pixel_id: string
  twitter_pixel_id: string
  snapchat_pixel_id: string
}

const defaultSettings: TrackingSettings = {
  ga4_measurement_id: '',
  google_ads_id: '',
  google_ads_conversion_label: '',
  meta_pixel_id: '',
  linkedin_partner_id: '',
  tiktok_pixel_id: '',
  twitter_pixel_id: '',
  snapchat_pixel_id: '',
}

const trackingPlatforms = [
  {
    key: 'ga4_measurement_id',
    name: 'Google Analytics 4',
    description: 'Track website traffic, user behavior, and conversions',
    placeholder: 'G-XXXXXXXXXX',
    helpUrl: 'https://support.google.com/analytics/answer/9539598',
    icon: '📊',
    color: 'bg-orange-500',
  },
  {
    key: 'google_ads_id',
    name: 'Google Ads',
    description: 'Track conversions from Google Ads campaigns',
    placeholder: 'AW-XXXXXXXXX',
    helpUrl: 'https://support.google.com/google-ads/answer/6095821',
    icon: '🎯',
    color: 'bg-blue-500',
  },
  {
    key: 'google_ads_conversion_label',
    name: 'Google Ads Conversion Label',
    description: 'Conversion tracking label for specific actions',
    placeholder: 'AbC123xyz',
    helpUrl: 'https://support.google.com/google-ads/answer/6095821',
    icon: '🏷️',
    color: 'bg-blue-400',
  },
  {
    key: 'meta_pixel_id',
    name: 'Meta (Facebook) Pixel',
    description: 'Track conversions from Facebook & Instagram ads',
    placeholder: '1234567890123456',
    helpUrl: 'https://www.facebook.com/business/help/952192354843755',
    icon: '📘',
    color: 'bg-blue-600',
  },
  {
    key: 'linkedin_partner_id',
    name: 'LinkedIn Insight Tag',
    description: 'Track conversions from LinkedIn ads and audience insights',
    placeholder: '123456',
    helpUrl: 'https://www.linkedin.com/help/lms/answer/a418880',
    icon: '💼',
    color: 'bg-sky-700',
  },
  {
    key: 'tiktok_pixel_id',
    name: 'TikTok Pixel',
    description: 'Track conversions from TikTok advertising',
    placeholder: 'XXXXXXXXXXXXXXXXXX',
    helpUrl: 'https://ads.tiktok.com/help/article?aid=10021',
    icon: '🎵',
    color: 'bg-black',
  },
  {
    key: 'twitter_pixel_id',
    name: 'Twitter (X) Pixel',
    description: 'Track conversions from Twitter/X ads',
    placeholder: 'XXXXX',
    helpUrl: 'https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html',
    icon: '🐦',
    color: 'bg-gray-800',
  },
  {
    key: 'snapchat_pixel_id',
    name: 'Snapchat Pixel',
    description: 'Track conversions from Snapchat advertising',
    placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    helpUrl: 'https://businesshelp.snapchat.com/s/article/snap-pixel-about',
    icon: '👻',
    color: 'bg-yellow-400',
  },
]

export default function TrackingSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<TrackingSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Get token from localStorage - layout already verified auth
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
      fetchSettings(storedToken)
    } else {
      // If no token, wait a bit for layout auth to complete
      const timer = setTimeout(() => {
        const delayedToken = localStorage.getItem('adminToken')
        if (delayedToken) {
          setToken(delayedToken)
          fetchSettings(delayedToken)
        } else {
          setLoading(false)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSettings = async (authToken: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/tracking/settings`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/lexa_admin@2026/login')
        return
      }
      
      const data = await response.json()
      if (data.settings) {
        setSettings({ ...defaultSettings, ...data.settings })
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      setMessage({ type: 'error', text: 'Failed to load tracking settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!token) return
    
    setSaving(true)
    setMessage(null)
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/tracking/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      })
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/lexa_admin@2026/login')
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Tracking settings saved successfully! Changes will take effect on next page load.' })
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save settings' })
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      setMessage({ type: 'error', text: 'Failed to save tracking settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value.trim() }))
  }

  const getActiveCount = () => {
    return Object.values(settings).filter(v => v && v.trim() !== '').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-[#C9A962]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#C9A962]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tracking & Analytics</h1>
                <p className="text-sm text-gray-500">Manage your tracking pixels and analytics IDs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {getActiveCount()} of {trackingPlatforms.length} active
              </span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#C9A962] hover:bg-[#B8994D] disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How to use tracking pixels:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Enter your tracking IDs in the fields below</li>
              <li>Click "Save Changes" to activate tracking</li>
              <li>Pixels will automatically load on all pages</li>
              <li>Conversions (form submissions, consultations) are tracked automatically</li>
            </ul>
          </div>
        </div>

        {/* Tracking Platforms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {trackingPlatforms.map((platform) => (
            <div
              key={platform.key}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-xl`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    <p className="text-xs text-gray-500">{platform.description}</p>
                  </div>
                </div>
                <a
                  href={platform.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C9A962] transition-colors"
                  title="Setup guide"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={settings[platform.key as keyof TrackingSettings] || ''}
                  onChange={(e) => handleInputChange(platform.key, e.target.value)}
                  placeholder={platform.placeholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A962]/20 focus:border-[#C9A962] outline-none transition-all font-mono text-sm"
                />
                {settings[platform.key as keyof TrackingSettings] && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Changes take effect immediately after saving. Test your tracking using browser developer tools or platform debuggers.</p>
        </div>
      </div>
    </div>
  )
}

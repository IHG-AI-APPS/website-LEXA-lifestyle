'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  FolderKanban, 
  FileText, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Tag,
  Box,
  Settings,
  Activity,
  Clock,
  Search,
  Brain,
  Cpu,
  Star,
  Newspaper,
  Video,
  Home,
  Sparkles,
  DoorOpen,
  Layers,
  Globe,
  Zap,
  DollarSign,
  Users,
  HelpCircle,
  Navigation,
  User,
  ChevronDown,
  BarChart3,
  FlaskConical,
  MapPin,
  TrendingUp
} from 'lucide-react'
import { verifyToken, logout } from '@/lib/adminApi'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Sales Intelligence', href: '/admin/sales-dashboard', icon: TrendingUp },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Tracking Pixels', href: '/admin/tracking', icon: Activity },
  { name: 'A/B Testing', href: '/admin/ab-testing', icon: FlaskConical },
  { name: 'Pricing Management', href: '/admin/pricing', icon: DollarSign },
  { name: 'All Leads', href: '/admin/leads', icon: Users },
  { name: 'Smart Home Leads', href: '/admin/smart-home-leads', icon: Zap },
  { name: 'Solutions', href: '/admin/solutions', icon: Package },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Brands', href: '/admin/brands', icon: Tag },
  { name: 'Products', href: '/admin/products', icon: Box },
  { name: 'Product Categories', href: '/admin/product-categories', icon: Layers },
  { name: 'Intelligence Features', href: '/admin/intelligence-features', icon: Brain },
  { name: 'Control Systems', href: '/admin/intelligence-systems', icon: Cpu },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { name: 'Videos', href: '/admin/videos', icon: Video },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Mega Menu', href: '/admin/mega-menu', icon: Navigation },
  { name: 'Property Packages', href: '/admin/property-packages', icon: Home },
  { name: 'Package Enhancements', href: '/admin/package-enhancements', icon: Sparkles },
  { name: 'Specialty Rooms', href: '/admin/specialty-rooms', icon: DoorOpen },
  { name: 'Arabic Pages', href: '/admin/arabic-pages', icon: Globe },
  { name: 'Geo Pages (SEO)', href: '/admin/geo-pages', icon: MapPin },
  { name: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
  { name: 'SEO Tools', href: '/admin/seo', icon: Search },
  { name: 'Activity Logs', href: '/admin/logs', icon: Clock },
  { name: 'CMS / Page Content', href: '/admin/cms', icon: FileText },
  { name: 'System Health', href: '/admin/system', icon: Activity },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }
      
      // Verify token for all other admin pages
      const isValid = await verifyToken()
      if (!isValid) {
        router.push('/admin/login')
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">LEXA Admin</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation - SCROLLABLE */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors
                    ${isActive 
                      ? 'bg-white text-charcoal' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Admin Profile & Logout */}
          <div className="p-3 border-t border-gray-700 flex-shrink-0">
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-3 py-2.5 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <ChevronDown size={16} className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {profileOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <Link 
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="text-sm text-gray-600">
              <a href="/" target="_blank" className="hover:text-charcoal transition-colors">
                View Website →
              </a>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

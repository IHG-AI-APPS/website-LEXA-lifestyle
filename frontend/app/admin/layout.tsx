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
  ChevronRight,
  BarChart3,
  FlaskConical,
  MapPin,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  MessageCircle,
  ShoppingBag,
  ImageIcon,
  UsersRound,
  Briefcase,
  Sun,
  Moon
} from 'lucide-react'
import { verifyToken, logout } from '@/lib/adminApi'
import { useTheme } from '@/contexts/ThemeContext'

// Grouped navigation structure
const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Sales Intelligence', href: '/admin/sales-dashboard', icon: TrendingUp },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Leads & CRM',
    items: [
      { name: 'All Leads', href: '/admin/leads', icon: Users },
      { name: 'Smart Home Leads', href: '/admin/smart-home-leads', icon: Zap },
      { name: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
      { name: 'WhatsApp', href: '/admin/whatsapp', icon: MessageCircle },
    ]
  },
  {
    title: 'Content',
    items: [
      { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
      { name: 'Project Settings', href: '/admin/project-settings', icon: Settings },
      { name: 'Articles', href: '/admin/articles', icon: FileText },
      { name: 'Blog', href: '/admin/blog', icon: FileText },
      { name: 'News', href: '/admin/news', icon: Newspaper },
      { name: 'Videos', href: '/admin/videos', icon: Video },
      { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
      { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    ]
  },
  {
    title: 'Products & Services',
    items: [
      { name: 'Solutions', href: '/admin/solutions', icon: Package },
      { name: 'Services', href: '/admin/services', icon: Settings },
      { name: 'Brands', href: '/admin/brands', icon: Tag },
      { name: 'Products', href: '/admin/products', icon: Box },
      { name: 'Product Categories', href: '/admin/product-categories', icon: Layers },
      { name: 'Product Series', href: '/admin/product-series', icon: Layers },
      { name: 'Catalogues', href: '/admin/catalogues', icon: BookOpen },
      { name: 'Product Catalog', href: '/admin/catalog', icon: ShoppingBag },
    ]
  },
  {
    title: 'Smart Home Systems',
    items: [
      { name: 'Intelligence Features', href: '/admin/intelligence-features', icon: Brain },
      { name: 'Control Systems', href: '/admin/intelligence-systems', icon: Cpu },
      { name: 'Property Packages', href: '/admin/property-packages', icon: Home },
      { name: 'Package Enhancements', href: '/admin/package-enhancements', icon: Sparkles },
      { name: 'Specialty Rooms', href: '/admin/specialty-rooms', icon: DoorOpen },
      { name: 'Pricing Management', href: '/admin/pricing', icon: DollarSign },
    ]
  },
  {
    title: 'Website',
    items: [
      { name: 'Site Settings', href: '/admin/site-settings', icon: Settings },
      { name: 'Homepage Stats', href: '/admin/stats-settings', icon: TrendingUp },
      { name: 'Team Members', href: '/admin/team-members', icon: UsersRound },
      { name: 'Careers/Jobs', href: '/admin/careers', icon: Briefcase },
      { name: 'Mega Menu', href: '/admin/mega-menu', icon: Navigation },
      { name: 'CMS / Page Content', href: '/admin/cms', icon: FileText },
      { name: 'File Manager', href: '/admin/images', icon: ImageIcon },
    ]
  },
  {
    title: 'SEO & Localization',
    items: [
      { name: 'SEO Tools', href: '/admin/seo', icon: Search },
      { name: 'Geo Pages (SEO)', href: '/admin/geo-pages', icon: MapPin },
      { name: 'Locations', href: '/admin/locations', icon: MapPin },
      { name: 'Arabic Pages', href: '/admin/arabic-pages', icon: Globe },
    ]
  },
  {
    title: 'Marketing & Testing',
    items: [
      { name: 'A/B Testing', href: '/admin/ab-testing', icon: FlaskConical },
      { name: 'Tracking Pixels', href: '/admin/tracking', icon: Activity },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Activity Logs', href: '/admin/logs', icon: Clock },
      { name: 'System Health', href: '/admin/system', icon: Activity },
      { name: 'API Test Results', href: '/admin/test-results', icon: ShieldCheck },
    ]
  },
]

// Flatten for backward compatibility
const navigation = navigationGroups.flatMap(g => g.items)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const { theme, toggleTheme } = useTheme()

  const toggleGroup = (title: string) => {
    setCollapsedGroups(prev => ({ ...prev, [title]: !prev[title] }))
  }

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

          {/* Navigation - SCROLLABLE with Groups */}
          <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {navigationGroups.map((group) => {
              const isCollapsed = collapsedGroups[group.title]
              const hasActiveItem = group.items.some(item => pathname === item.href)
              
              return (
                <div key={group.title} className="mb-1">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className={`
                      flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider
                      ${hasActiveItem ? 'text-gold' : 'text-gray-500'}
                      hover:text-gray-300 transition-colors
                    `}
                  >
                    <span>{group.title}</span>
                    <ChevronRight 
                      size={14} 
                      className={`transition-transform duration-200 ${!isCollapsed ? 'rotate-90' : ''}`}
                    />
                  </button>
                  
                  {/* Group Items */}
                  {!isCollapsed && (
                    <div className="space-y-0.5 mt-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`
                              flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ml-1
                              ${isActive 
                                ? 'bg-white text-charcoal' 
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              }
                            `}
                          >
                            <Icon size={16} />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
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
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
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
        <div className="sticky top-0 z-30 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-700 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              {/* Theme Toggle in Top Bar */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-400"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <a href="/" target="_blank" className="hover:text-charcoal dark:hover:text-white transition-colors">
                  View Website →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-gray-50 dark:bg-[#050505] min-h-[calc(100vh-65px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

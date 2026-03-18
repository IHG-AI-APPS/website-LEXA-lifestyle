'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Package, 
  FolderKanban, 
  FileText, 
  Star, 
  MessageSquare, 
  Mail,
  ArrowRight,
  Wrench
} from 'lucide-react'
import { getAdminStats } from '@/lib/adminApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(err => console.error('Failed to load stats:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>
  }

  const cards = [
    {
      title: 'Solutions',
      count: stats?.solutions_count || 0,
      icon: Package,
      href: '/lexa_admin@2026/solutions',
      color: 'bg-blue-500'
    },
    {
      title: 'Projects',
      count: stats?.projects_count || 0,
      icon: FolderKanban,
      href: '/lexa_admin@2026/projects',
      color: 'bg-purple-500'
    },
    {
      title: 'Articles',
      count: stats?.articles_count || 0,
      icon: FileText,
      href: '/lexa_admin@2026/articles',
      color: 'bg-green-500'
    },
    {
      title: 'Brands',
      count: stats?.brands_count || 0,
      icon: Star,
      href: '/lexa_admin@2026/brands',
      color: 'bg-yellow-500'
    },
    {
      title: 'Consultations',
      count: stats?.consultations_count || 0,
      icon: MessageSquare,
      href: '/lexa_admin@2026/submissions',
      color: 'bg-red-500'
    },
    {
      title: 'Patch System',
      count: '🔧',
      icon: Wrench,
      href: '/lexa_admin@2026/patches',
      color: 'bg-orange-500'
    },
    {
      title: 'Settings',
      count: '⚙️',
      icon: Mail,
      href: '/lexa_admin@2026/settings',
      color: 'bg-indigo-500'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your LEXA Lifestyle website</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Link href={card.href}>
                <div className="bg-white p-6 border border-gray-200 hover:border-charcoal transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${card.color} text-white rounded`}>
                      <Icon size={24} />
                    </div>
                    <ArrowRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-charcoal group-hover:translate-x-1 transition-all" 
                    />
                  </div>
                  <div className="text-3xl font-semibold mb-1">{card.count}</div>
                  <div className="text-sm text-gray-600">{card.title}</div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/lexa_admin@2026/solutions"
            className="px-4 py-3 border-2 border-gray-200 hover:border-charcoal transition-colors text-center"
          >
            <Package size={24} className="mx-auto mb-2" />
            <div className="font-medium">Manage Solutions</div>
          </Link>
          <Link
            href="/lexa_admin@2026/projects"
            className="px-4 py-3 border-2 border-gray-200 hover:border-charcoal transition-colors text-center"
          >
            <FolderKanban size={24} className="mx-auto mb-2" />
            <div className="font-medium">Manage Projects</div>
          </Link>
          <Link
            href="/lexa_admin@2026/articles"
            className="px-4 py-3 border-2 border-gray-200 hover:border-charcoal transition-colors text-center"
          >
            <FileText size={24} className="mx-auto mb-2" />
            <div className="font-medium">Manage Articles</div>
          </Link>
          <Link
            href="/lexa_admin@2026/submissions"
            className="px-4 py-3 border-2 border-gray-200 hover:border-charcoal transition-colors text-center"
          >
            <MessageSquare size={24} className="mx-auto mb-2" />
            <div className="font-medium">View Submissions</div>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200">
        <h3 className="font-semibold mb-2">💡 Getting Started</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Use the sidebar to navigate between different management sections</li>
          <li>• All changes are saved instantly to the database</li>
          <li>• View form submissions to see incoming leads</li>
          <li>• Changes reflect immediately on the live website</li>
        </ul>
      </div>
    </div>
  )
}

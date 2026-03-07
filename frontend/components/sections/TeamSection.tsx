'use client'

import { useEffect, useState } from 'react'
import SafeImage from '@/components/ui/SafeImage'

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  linkedin?: string
  order: number
  is_active: boolean
}

// Fallback data if API fails
const fallbackTeamMembers: TeamMember[] = [
  { id: '1', name: 'Althaf Ali', role: 'Co-Founder', image: 'https://files.ihgbrands.com/lexa/migrated/28b67688c620f88d.webp', order: 0, is_active: true },
  { id: '2', name: 'Munir Taher', role: 'Co-Founder', image: 'https://files.ihgbrands.com/lexa/migrated/ec9afb366796afe8.webp', order: 1, is_active: true },
  { id: '3', name: 'Shahnawaz Sheikh', role: 'Business Head', image: 'https://files.ihgbrands.com/lexa/migrated/04cfad6343e74c55.webp', order: 2, is_active: true },
  { id: '4', name: 'Mohammad Salih', role: 'Project Head', image: 'https://files.ihgbrands.com/lexa/migrated/c53459892ffdeaf4.webp', order: 3, is_active: true },
  { id: '5', name: 'Sri Harish', role: 'Junior Automation Engineer', image: 'https://files.ihgbrands.com/lexa/migrated/a7f8e411c92d5554.webp', order: 4, is_active: true },
  { id: '6', name: 'Maria Ralota', role: 'Admin & Sales Coordinator', image: 'https://files.ihgbrands.com/lexa/migrated/aaa77e6aff30338c.webp', order: 5, is_active: true },
  { id: '7', name: 'Shibili Zahir', role: 'Operations Executive', image: 'https://files.ihgbrands.com/lexa/migrated/1ba1b4da39f32a90.webp', order: 6, is_active: true },
]

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(fallbackTeamMembers)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/team-members`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            setTeamMembers(data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch team members:', error)
        // Use fallback data
      } finally {
        setLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 dark:text-zinc-500 font-medium mb-6 block">
              Meet the Team
            </span>
            <h2 className="text-5xl font-semibold mb-6 text-gray-900 dark:text-white">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 font-light max-w-2xl mx-auto">
              Get to know the minds behind our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="relative h-80 overflow-hidden mb-4 bg-gray-200 dark:bg-zinc-800 rounded-lg">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

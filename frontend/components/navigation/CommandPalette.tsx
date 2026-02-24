'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Home,
  Wrench,
  FolderOpen,
  Phone,
  Lightbulb,
  Shield,
  Thermometer,
  Music,
  Calculator,
  FileText,
  Settings,
  HelpCircle,
  ExternalLink,
  Zap,
  Building2,
  Layers
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  action: () => void
  keywords?: string[]
  category: 'navigation' | 'solutions' | 'services' | 'tools' | 'help'
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  // Toggle command palette with keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = useCallback((path: string) => {
    setOpen(false)
    router.push(path)
  }, [router])

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => navigate('/'),
      keywords: ['home', 'main', 'start'],
      category: 'navigation'
    },
    {
      id: 'dashboard',
      title: 'My Projects Dashboard',
      description: 'View and manage your saved projects',
      icon: <FolderOpen className="w-4 h-4" />,
      action: () => navigate('/dashboard'),
      keywords: ['dashboard', 'my projects', 'saved', 'history'],
      category: 'navigation'
    },
    {
      id: 'project-builder',
      title: 'Smart Project Builder',
      description: 'Build your smart home project',
      icon: <Wrench className="w-4 h-4" />,
      action: () => navigate('/project-builder'),
      keywords: ['builder', 'project', 'create', 'new'],
      category: 'navigation'
    },
    {
      id: 'projects',
      title: 'Projects Portfolio',
      description: 'View completed projects',
      icon: <FolderOpen className="w-4 h-4" />,
      action: () => navigate('/projects'),
      keywords: ['projects', 'portfolio', 'gallery', 'work'],
      category: 'navigation'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: <Phone className="w-4 h-4" />,
      action: () => navigate('/contact'),
      keywords: ['contact', 'call', 'email', 'support'],
      category: 'navigation'
    },
    {
      id: 'experience-center',
      title: 'Experience Center',
      description: 'Visit our showroom',
      icon: <Building2 className="w-4 h-4" />,
      action: () => navigate('/experience-center'),
      keywords: ['experience', 'showroom', 'visit', 'demo'],
      category: 'navigation'
    },

    // Solutions
    {
      id: 'lighting',
      title: 'Lighting Solutions',
      description: 'Smart lighting automation',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => navigate('/solutions/lighting'),
      keywords: ['lighting', 'lights', 'bulbs', 'automation'],
      category: 'solutions'
    },
    {
      id: 'security',
      title: 'Security Solutions',
      description: 'Home security systems',
      icon: <Shield className="w-4 h-4" />,
      action: () => navigate('/solutions/security'),
      keywords: ['security', 'cameras', 'alarm', 'protection'],
      category: 'solutions'
    },
    {
      id: 'climate',
      title: 'Climate Control',
      description: 'HVAC automation',
      icon: <Thermometer className="w-4 h-4" />,
      action: () => navigate('/solutions/climate'),
      keywords: ['climate', 'hvac', 'temperature', 'ac', 'heating'],
      category: 'solutions'
    },
    {
      id: 'entertainment',
      title: 'Entertainment Systems',
      description: 'Home theater & audio',
      icon: <Music className="w-4 h-4" />,
      action: () => navigate('/solutions/entertainment'),
      keywords: ['entertainment', 'audio', 'theater', 'music', 'tv'],
      category: 'solutions'
    },
    {
      id: 'energy',
      title: 'Energy Management',
      description: 'Solar & power optimization',
      icon: <Zap className="w-4 h-4" />,
      action: () => navigate('/solutions/energy'),
      keywords: ['energy', 'solar', 'power', 'efficiency'],
      category: 'solutions'
    },

    // Services
    {
      id: 'design-service',
      title: 'Consultation & Design',
      description: 'Professional system design',
      icon: <Layers className="w-4 h-4" />,
      action: () => navigate('/services/consultation-design'),
      keywords: ['design', 'planning', 'architecture', 'consultation'],
      category: 'services'
    },
    {
      id: 'engineering-service',
      title: 'System Engineering & Integration',
      description: 'Professional engineering & integration',
      icon: <Wrench className="w-4 h-4" />,
      action: () => navigate('/services/system-engineering-integration'),
      keywords: ['engineering', 'integration', 'system'],
      category: 'services'
    },
    {
      id: 'wiring-service',
      title: 'Wiring & Infrastructure',
      description: 'Professional wiring installation',
      icon: <Wrench className="w-4 h-4" />,
      action: () => navigate('/services/wiring'),
      keywords: ['wiring', 'installation', 'setup', 'install'],
      category: 'services'
    },
    {
      id: 'home-cinema-service',
      title: 'Home Cinema & Multi-Room AV',
      description: 'Home theater & audio systems',
      icon: <Layers className="w-4 h-4" />,
      action: () => navigate('/services/home-cinema-multi-room-av'),
      keywords: ['cinema', 'theater', 'audio', 'av'],
      category: 'services'
    },
    {
      id: 'security-service',
      title: 'Security & Surveillance',
      description: 'Security systems installation',
      icon: <Settings className="w-4 h-4" />,
      action: () => navigate('/services/security-surveillance-systems'),
      keywords: ['security', 'surveillance', 'cctv', 'cameras'],
      category: 'services'
    },
    {
      id: 'network-service',
      title: 'Network Infrastructure & IT',
      description: 'Network & IT solutions',
      icon: <Layers className="w-4 h-4" />,
      action: () => navigate('/services/network-infrastructure-it'),
      keywords: ['network', 'wifi', 'it', 'infrastructure'],
      category: 'services'
    },
    {
      id: 'voice-control-service',
      title: 'Voice & App Control Integration',
      description: 'Voice control & smart app integration',
      icon: <Settings className="w-4 h-4" />,
      action: () => navigate('/services/voice-app-control-integration'),
      keywords: ['voice', 'alexa', 'google', 'app', 'control'],
      category: 'services'
    },
    {
      id: 'digital-signage-service',
      title: 'Digital Signage & Enterprise AV',
      description: 'Commercial AV solutions',
      icon: <Layers className="w-4 h-4" />,
      action: () => navigate('/services/digital-signage-enterprise-av'),
      keywords: ['signage', 'enterprise', 'commercial', 'display'],
      category: 'services'
    },
    {
      id: 'project-management-service',
      title: 'Project Management',
      description: 'End-to-end project management',
      icon: <Settings className="w-4 h-4" />,
      action: () => navigate('/services/project-management'),
      keywords: ['project', 'management', 'coordination'],
      category: 'services'
    },
    {
      id: 'support-service',
      title: 'Commissioning & Support',
      description: 'Ongoing maintenance & support',
      icon: <Settings className="w-4 h-4" />,
      action: () => navigate('/services/commissioning-support'),
      keywords: ['support', 'maintenance', 'amc', 'help', 'commissioning'],
      category: 'services'
    },

    // Tools
    {
      id: 'calculator',
      title: 'Price Calculator',
      description: 'Estimate your project cost',
      icon: <Calculator className="w-4 h-4" />,
      action: () => navigate('/calculator'),
      keywords: ['calculator', 'price', 'cost', 'estimate', 'quote'],
      category: 'tools'
    },
    {
      id: 'cinema-configurator',
      title: 'Cinema Configurator',
      description: 'Design your home theater',
      icon: <FileText className="w-4 h-4" />,
      action: () => navigate('/cinema-configurator'),
      keywords: ['cinema', 'theater', 'configurator', 'movie'],
      category: 'tools'
    },

    // Help
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Frequently asked questions',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => navigate('/faq'),
      keywords: ['faq', 'questions', 'help', 'answers'],
      category: 'help'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Chat with us on WhatsApp',
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => window.open('https://wa.me/971501234567', '_blank'),
      keywords: ['whatsapp', 'chat', 'message'],
      category: 'help'
    },
  ]

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords?.some((k) => k.includes(searchLower))
    )
  })

  const groupedCommands = {
    navigation: filteredCommands.filter((c) => c.category === 'navigation'),
    solutions: filteredCommands.filter((c) => c.category === 'solutions'),
    services: filteredCommands.filter((c) => c.category === 'services'),
    tools: filteredCommands.filter((c) => c.category === 'tools'),
    help: filteredCommands.filter((c) => c.category === 'help'),
  }

  return (
    <>
      {/* Trigger Button - shown in header */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        data-testid="command-palette-trigger"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
            >
              <Command
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden"
                loop
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search pages, solutions, tools..."
                    className="flex-1 text-base outline-none placeholder:text-gray-400 bg-transparent dark:text-white"
                    data-testid="command-palette-input"
                  />
                  <kbd className="px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 rounded">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500">
                    No results found.
                  </Command.Empty>

                  {groupedCommands.navigation.length > 0 && (
                    <Command.Group heading="Navigation" className="mb-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Navigation
                      </div>
                      {groupedCommands.navigation.map((command) => (
                        <Command.Item
                          key={command.id}
                          value={command.title}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                          data-testid={`command-${command.id}`}
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 dark:text-gray-400">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-gray-500">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {groupedCommands.solutions.length > 0 && (
                    <Command.Group heading="Solutions" className="mb-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Solutions
                      </div>
                      {groupedCommands.solutions.map((command) => (
                        <Command.Item
                          key={command.id}
                          value={command.title}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {groupedCommands.services.length > 0 && (
                    <Command.Group heading="Services" className="mb-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Services
                      </div>
                      {groupedCommands.services.map((command) => (
                        <Command.Item
                          key={command.id}
                          value={command.title}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {groupedCommands.tools.length > 0 && (
                    <Command.Group heading="Tools" className="mb-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Tools
                      </div>
                      {groupedCommands.tools.map((command) => (
                        <Command.Item
                          key={command.id}
                          value={command.title}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {groupedCommands.help.length > 0 && (
                    <Command.Group heading="Help" className="mb-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Help
                      </div>
                      {groupedCommands.help.map((command) => (
                        <Command.Item
                          key={command.id}
                          value={command.title}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:bg-gray-800 dark:data-[selected=true]:bg-gray-800"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-gray-500">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}
                </Command.List>

                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border rounded">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border rounded">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span>Powered by LEXA</span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

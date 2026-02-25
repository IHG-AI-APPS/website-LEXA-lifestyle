'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/conversion/TrustBar'
import { 
  CheckCircle2, X, ArrowRight, LucideIcon,
  // Icons used in SEO landing pages - add more as needed
  Volume2, Clock, Sun, Wind, BookOpen, Sparkles, Shield, Zap, Home, Tv,
  Camera, Lock, Thermometer, Music, Film, Wifi, Eye, Bell, Settings,
  Monitor, Smartphone, Palette, Lightbulb, Power, Cloud, Server,
  Globe, Users, Building, Car, Anchor, Waves, Heart, Star, Award,
  Target, TrendingUp, BarChart, PieChart, Activity, Cpu, Database,
  FileText, MessageSquare, Phone, Mail, Calendar, MapPin, Navigation,
  Play, Pause, SkipForward, Radio, Speaker, Headphones, Mic, Video,
  Image as ImageIcon, Layers, Grid, Layout, Box, Package, Truck,
  CreditCard, DollarSign, Percent, Gift, ShoppingCart, Tag, Bookmark,
  Flag, AlertCircle, Info, HelpCircle, CheckCircle, XCircle, AlertTriangle,
  RefreshCw, RotateCw, Download, Upload, Share, Copy, Clipboard, Edit,
  Trash, Plus, Minus, Search, Filter, SortAsc, SortDesc, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, ArrowUp, ArrowDown, ArrowLeft,
  ExternalLink, Link as LinkIcon, Maximize, Minimize, Move, Crop,
  Scissors, Wand2, Paintbrush, Droplet, Feather, Leaf, TreePine, Flower2,
  Sunrise, Sunset, Moon, CloudRain, Snowflake, Umbrella, Wind as WindIcon,
  Compass, Map, Route, Plane, Train, Bus, Bike, Footprints,
  Utensils, Coffee, Wine, Beer, Pizza, Apple, Carrot, Egg,
  Bed, Sofa, Lamp, DoorOpen, Key, Fingerprint, ScanFace, QrCode,
  Bluetooth, Cast, Airplay, Gamepad, Joystick, Dice1, Trophy, Medal,
  Dumbbell, Timer, Hourglass, Watch, AlarmClock, BellRing, Vibrate,
  Battery, BatteryCharging, Plug, Cable, Usb, HardDrive, MemoryStick
} from 'lucide-react'
import RelatedSolutions from '@/app/solutions/components/RelatedSolutions'
import { useCms, isCmsEmpty, seedCmsDefaults } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

// Icon map for resolving icon names to components
// This allows Server Components to pass icon names as strings
const ICON_MAP: Record<string, LucideIcon> = {
  Volume2, Clock, Sun, Wind, BookOpen, Sparkles, Shield, Zap, Home, Tv,
  Camera, Lock, Thermometer, Music, Film, Wifi, Eye, Bell, Settings,
  Monitor, Smartphone, Palette, Lightbulb, Power, Cloud, Server,
  Globe, Users, Building, Car, Anchor, Waves, Heart, Star, Award,
  Target, TrendingUp, BarChart, PieChart, Activity, Cpu, Database,
  FileText, MessageSquare, Phone, Mail, Calendar, MapPin, Navigation,
  Play, Pause, SkipForward, Radio, Speaker, Headphones, Mic, Video,
  Image: ImageIcon, Layers, Grid, Layout, Box, Package, Truck,
  CreditCard, DollarSign, Percent, Gift, ShoppingCart, Tag, Bookmark,
  Flag, AlertCircle, Info, HelpCircle, CheckCircle, XCircle, AlertTriangle,
  RefreshCw, RotateCw, Download, Upload, Share, Copy, Clipboard, Edit,
  Trash, Plus, Minus, Search, Filter, SortAsc, SortDesc, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, ArrowUp, ArrowDown, ArrowLeft,
  ArrowRight, ExternalLink, Link: LinkIcon, Maximize, Minimize, Move, Crop,
  Scissors, Wand2, Paintbrush, Droplet, Feather, Leaf, TreePine, Flower2,
  Sunrise, Sunset, Moon, CloudRain, Snowflake, Umbrella,
  Compass, Map, Route, Plane, Train, Bus, Bike, Footprints,
  Utensils, Coffee, Wine, Beer, Pizza, Apple, Carrot, Egg,
  Bed, Sofa, Lamp, DoorOpen, Key, Fingerprint, ScanFace, QrCode,
  Bluetooth, Cast, Airplay, Gamepad, Joystick, Dice1, Trophy, Medal,
  Dumbbell, Timer, Hourglass, Watch, AlarmClock, BellRing, Vibrate,
  Battery, BatteryCharging, Plug, Cable, Usb, HardDrive, MemoryStick,
  X, CheckCircle2
}

// Helper to resolve icon - accepts either string name or LucideIcon component
function resolveIcon(icon: string | LucideIcon): LucideIcon {
  if (typeof icon === 'string') {
    return ICON_MAP[icon] || CheckCircle2
  }
  return icon
}

export interface SeoLandingPageProps {
  // CMS key for dynamic content override
  cmsKey?: string
  // Hero Section
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    description: string
    image: string
    primaryCTA: {
      text: string
      href: string
    }
    secondaryCTA?: {
      text: string
      href: string
    }
  }
  
  // Target Audience
  audience: string[]
  
  // Problems Section
  problems: {
    title?: string
    items: Array<{
      problem: string
      impact: string
    }>
  }
  
  // Deliverables/Solutions
  deliverables: {
    title?: string
    items: Array<{
      icon: string | LucideIcon  // Accepts icon name as string OR component
      title: string
      desc: string
    }>
  }
  
  // Internal Linking (Optional)
  relatedPersonas?: Array<{
    name: string
    link: string
    description: string
  }>
  
  relatedSolutions?: Array<{
    name: string
    link: string
    description: string
  }>
  
  geoPages?: Array<{
    name: string
    link: string
    badge?: string
  }>
  
  // Process
  process: {
    title?: string
    subtitle?: string
    steps: Array<{
      step: string
      title: string
      desc: string
    }>
  }
  
  // Section 6: Either Pricing or Projects
  section6?: {
    type: 'pricing' | 'projects' | 'custom'
    title: string
    subtitle?: string
    items: Array<any>
  }
  
  // Trust Signals
  trustSignals: {
    title?: string
    stats: Array<{
      number: string
      label: string
    }>
  }
  
  // Final Conversion
  conversion: {
    title: string
    subtitle: string
    primaryCTA: {
      text: string
      href: string
    }
    secondaryCTA?: {
      text: string
      href: string
    }
  }
}

export default function SeoLandingPageTemplate({
  cmsKey,
  hero: heroProp,
  audience: audienceProp,
  problems: problemsProp,
  deliverables: deliverablesProp,
  process: processProp,
  section6: section6Prop,
  trustSignals: trustSignalsProp,
  conversion: conversionProp,
  relatedPersonas: relatedPersonasProp,
  relatedSolutions: relatedSolutionsProp,
  geoPages: geoPagesProp
}: SeoLandingPageProps) {
  // CMS override: fetch dynamic content if cmsKey provided
  const cmsRaw = useCms(cmsKey || '_noop_', null)
  const cms = cmsKey ? cmsRaw : null

  // Section-level overrides: CMS data takes priority over hardcoded props
  const hero = cms?.hero || heroProp
  const audience = cms?.audience || audienceProp
  const problems = cms?.problems || problemsProp
  const deliverables = cms?.deliverables || deliverablesProp
  const process = cms?.process || processProp
  const section6 = cms?.section6 || section6Prop
  const trustSignals = cms?.trustSignals || trustSignalsProp
  const conversion = cms?.conversion || conversionProp
  const relatedPersonas = cms?.relatedPersonas || relatedPersonasProp
  const relatedSolutions = cms?.relatedSolutions || relatedSolutionsProp
  const geoPages = cms?.geoPages || geoPagesProp

  const [allSolutions, setAllSolutions] = useState<any[]>([])
  
  useEffect(() => {
    // Fetch all solutions for RelatedSolutions component
    async function fetchSolutions() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/solutions`)
        if (response.ok) {
          const data = await response.json()
          setAllSolutions(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch solutions:', error)
      }
    }
    fetchSolutions()
  }, [])
  
  // Extract slug from current URL for filtering
  const currentSlug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || '' : ''
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* 1. HERO */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={hero.image}
            alt={hero.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-6 rounded-full bg-[#E8DCC8] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              {hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
              {hero.title}
              <br />
              <span className="text-[#E8DCC8]">{hero.titleHighlight}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-300 mb-4 max-w-4xl mx-auto font-light">
              {hero.subtitle}
            </p>
            <p className="text-lg text-zinc-400 mb-12 max-w-3xl mx-auto">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={hero.primaryCTA.href}>
                <Button
                  size="lg"
                  className="bg-[#E8DCC8] hover:bg-[#B5952F] text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  {hero.primaryCTA.text}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              {hero.secondaryCTA && (
                <Link href={hero.secondaryCTA.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                  >
                    {hero.secondaryCTA.text}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHO THIS IS FOR */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-[#E8DCC8] mb-6">Who We Serve</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {audience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#E8DCC8] flex-shrink-0 mt-1" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMON PROBLEMS */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">
              {problems.title || 'Common Problems'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {problems.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 border-l-4 border-red-500/50 bg-[#121212] p-6 rounded-r-xl"
                >
                  <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.problem}</h3>
                    <p className="text-sm text-zinc-400">{item.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT LEXA DELIVERS */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center">
              {deliverables.title || 'What LEXA Delivers'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deliverables.items.map((item, index) => {
                const Icon = resolveIcon(item.icon)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-[#E8DCC8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#E8DCC8]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-4 text-center">
              {process.title || 'Our Process'}
            </h2>
            {process.subtitle && (
              <p className="text-center text-zinc-400 mb-16">{process.subtitle}</p>
            )}
            
            <div className="grid md:grid-cols-4 gap-8">
              {process.steps.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-7xl font-bold text-[#E8DCC8]/10 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#E8DCC8]">{phase.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar variant="inline" />

      {/* 6. SECTION 6 - Customizable */}
      {section6 && (
        <section className="py-24 bg-[#121212]">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium mb-4">{section6.title}</h2>
              {section6.subtitle && <p className="text-zinc-400">{section6.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {section6.items.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${item.featured ? 'border-2 border-[#E8DCC8] scale-105' : 'border border-zinc-800'} bg-[#0A0A0A] p-8 rounded-xl`}
                >
                  {item.featured && (
                    <div className="inline-block mb-4 rounded-full bg-[#E8DCC8] px-3 py-1 text-xs font-bold uppercase">
                      {item.badge || 'Featured'}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{item.name || item.title}</h3>
                  {item.price && <p className="text-3xl font-bold text-[#E8DCC8] mb-6">{item.price}</p>}
                  {item.subtitle && <p className="text-sm text-zinc-500 mb-6">{item.subtitle}</p>}
                  {item.features && (
                    <ul className="space-y-3">
                      {item.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-[#E8DCC8] flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. TRUST SIGNALS */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium mb-16">
              {trustSignals.title || 'Trusted in the UAE'}
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {trustSignals.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-5xl font-bold text-[#E8DCC8] mb-2">{stat.number}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* INTERNAL LINKING SECTIONS */}
      {(relatedPersonas || relatedSolutions || geoPages) && (
        <section className="py-24 bg-[#121212]">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              
              {/* Related Personas */}
              {relatedPersonas && relatedPersonas.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl md:text-4xl font-medium mb-8 text-center">Perfect For</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPersonas.map((persona, index) => (
                      <Link key={index} href={persona.link}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group border border-zinc-800 hover:border-[#E8DCC8] bg-[#0A0A0A] p-6 rounded-xl transition-all"
                        >
                          <h3 className="text-lg font-bold mb-2 group-hover:text-[#E8DCC8] transition-colors">{persona.name}</h3>
                          <p className="text-sm text-zinc-400 mb-4">{persona.description}</p>
                          <div className="flex items-center gap-2 text-[#E8DCC8] text-sm font-bold">
                            Explore Solutions
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related Solutions */}
              {relatedSolutions && relatedSolutions.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl md:text-4xl font-medium mb-8 text-center">You May Also Need</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedSolutions.map((solution, index) => (
                      <Link key={index} href={solution.link}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group border border-zinc-800 hover:border-[#E8DCC8] bg-[#0A0A0A] p-6 rounded-xl transition-all"
                        >
                          <h3 className="text-lg font-bold mb-2 group-hover:text-[#E8DCC8] transition-colors">{solution.name}</h3>
                          <p className="text-sm text-zinc-400 mb-4">{solution.description}</p>
                          <div className="flex items-center gap-2 text-[#E8DCC8] text-sm font-bold">
                            Learn More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Geo Pages */}
              {geoPages && geoPages.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-4xl font-medium mb-8 text-center">Serving Your Area</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {geoPages.map((geo, index) => (
                      <Link key={index} href={geo.link}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative border border-zinc-800 hover:border-[#E8DCC8] bg-[#0A0A0A] px-6 py-4 rounded-lg transition-all"
                        >
                          {geo.badge && (
                            <span className="absolute -top-2 -right-2 bg-[#E8DCC8] text-black text-xs font-bold px-2 py-1 rounded">
                              {geo.badge}
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="font-bold group-hover:text-[#E8DCC8] transition-colors">{geo.name}</span>
                            <ArrowRight className="w-4 h-4 text-[#E8DCC8] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </section>
      )}


      {/* 8. CONVERSION */}
      <section className="py-24 bg-gradient-to-br from-[#E8DCC8] via-[#B5952F] to-[#E8DCC8]">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              {conversion.title}
            </h2>
            <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
              {conversion.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={conversion.primaryCTA.href}>
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90 rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                >
                  {conversion.primaryCTA.text}
                </Button>
              </Link>
              {conversion.secondaryCTA && (
                <Link href={conversion.secondaryCTA.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-black text-black hover:bg-black hover:text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest"
                  >
                    {conversion.secondaryCTA.text}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Solutions Component */}
      {allSolutions.length > 0 && (
        <RelatedSolutions solutions={allSolutions} currentSlug={currentSlug} />
      )}

      <TrustBar variant="sticky" />
    </div>
  )
}

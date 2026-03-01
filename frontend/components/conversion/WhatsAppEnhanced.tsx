'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Globe, Film, Building2, Moon, Home, ArrowRight, Zap, HardHat, Eye, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppEnhanced() {
  const [isOpen, setIsOpen] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const pathname = usePathname()
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'
  
  // Enhanced context-aware script selection
  const getContextualScripts = () => {
    if (pathname?.includes('cinema') || pathname?.includes('home-theater')) {
      return 'cinema'
    } else if (pathname?.includes('cultural') || pathname?.includes('masjid') || pathname?.includes('majlis') || pathname?.includes('prayer')) {
      return 'cultural'
    } else if (pathname?.includes('conference') || pathname?.includes('bms') || pathname?.includes('workplace') || pathname?.includes('parking') || pathname?.includes('auditorium')) {
      return 'commercial'
    } else if (pathname?.includes('yacht') || pathname?.includes('marine')) {
      return 'marine'
    } else if (pathname?.includes('hotel') || pathname?.includes('hospitality') || pathname?.includes('grms')) {
      return 'hospitality'
    } else if (pathname?.includes('security') || pathname?.includes('surveillance') || pathname?.includes('access-control')) {
      return 'security'
    } else if (pathname?.includes('lighting') || pathname?.includes('audio') || pathname?.includes('smart-lifestyle')) {
      return 'luxury_living'
    }
    return 'general'
  }
  
  const scriptTemplates = {
    cinema: {
      en: [
        {
          icon: Zap,
          title: '⚡ 24h Cinema Concept',
          highlight: 'Get renders + quote in 24 hours',
          message: `Hi LEXA! I want a cinema concept within 24 hours.\n\n📍 Villa location: ___\n📐 Room size: ___ sqm\n💺 Seats needed: ___\n💰 Budget range: AED ___\n\nPlease include 3D renders and equipment list.`
        },
        {
          icon: Eye,
          title: '🏢 Visit Experience Centre',
          highlight: 'See cinema systems in person',
          message: `Hi LEXA! I'd like to book a visit to your Experience Centre to see cinema systems.\n\n📅 Preferred date: ___\n⏰ Preferred time: ___\n👥 Number of people: ___\n\nLooking forward to the demo!`
        },
        {
          icon: Film,
          title: 'Detailed Cinema Quote',
          highlight: 'Full proposal with options',
          message: `Hi LEXA! I need a comprehensive cinema proposal.\n\n🏡 Property: (Villa/Apartment/Penthouse)\n📍 Location: ___\n📐 Room: ___ sqm\n🎬 Preferred system: (Projector/TV/Both)\n💺 Seating: ___ people\n🔊 Audio: (Atmos/7.1/5.1)\n💰 Budget: AED ___`
        }
      ],
      ar: [
        {
          icon: Zap,
          title: '⚡ مفهوم سينما في 24 ساعة',
          highlight: 'احصل على تصاميم وعرض أسعار',
          message: `مرحباً LEXA! أريد مفهوم سينما خلال 24 ساعة.\n\n📍 موقع الفيلا: ___\n📐 حجم الغرفة: ___ متر مربع\n💺 عدد المقاعد: ___\n💰 الميزانية: درهم ___\n\nيرجى تضمين تصاميم 3D وقائمة المعدات.`
        }
      ]
    },
    
    commercial: {
      en: [
        {
          icon: Building2,
          title: '🏢 Enterprise Solution',
          highlight: 'Multi-site, turnkey projects',
          message: `Hi LEXA! We need an enterprise AV/automation solution.\n\n🏢 Project type: ___\n📍 Location(s): ___\n📊 Number of sites: ___\n👥 Stakeholders: ___\n⏱ Timeline: ___\n📋 Systems needed: ___`
        },
        {
          icon: HardHat,
          title: '🏗 Site Visit & Assessment',
          highlight: 'Free technical assessment',
          message: `Hi LEXA! We need a site visit and technical assessment.\n\n📍 Site location: ___\n📅 Preferred visit date: ___\n🏢 Facility type: ___\n📋 Systems to evaluate: ___\n\nLooking forward to your expert assessment!`
        },
        {
          icon: Sparkles,
          title: 'Multi-Site Rollout',
          highlight: 'Standardized deployment',
          message: `Hi LEXA! We're planning a multi-site rollout.\n\n🏢 Number of locations: ___\n📍 Cities: ___\n📋 Standard systems: ___\n⏱ Deployment timeline: ___\n💼 Project manager contact: ___`
        }
      ],
      ar: [
        {
          icon: Building2,
          title: '🏢 حل المؤسسات',
          highlight: 'مشاريع متعددة المواقع',
          message: `مرحباً LEXA! نحتاج حل AV/أتمتة للمؤسسات.\n\n🏢 نوع المشروع: ___\n📍 الموقع: ___\n📊 عدد المواقع: ___\n⏱ الجدول الزمني: ___`
        }
      ]
    },
    
    cultural: {
      en: [
        {
          icon: Moon,
          title: '🕌 Masjid Automation',
          highlight: 'Prayer times + audio',
          message: `Hi LEXA! We need masjid automation systems.\n\n🕌 Masjid name: ___\n📍 Location: ___\n📐 Prayer hall size: ___ sqm\n👥 Capacity: ___ people\n📋 Systems needed:\n  • Automated Azan? (Yes/No)\n  • Audio system? (Yes/No)\n  • Climate control? (Yes/No)\n  • Lighting? (Yes/No)`
        },
        {
          icon: Home,
          title: 'Majlis Automation',
          highlight: 'Elegant smart control',
          message: `Hi LEXA! I need majlis automation.\n\n🏠 Property type: ___\n📐 Majlis size: ___ sqm\n📋 Requirements:\n  • Lighting scenes? (Yes/No)\n  • Motorized curtains? (Yes/No)\n  • Audio system? (Yes/No)\n  • Climate control? (Yes/No)`
        }
      ],
      ar: [
        {
          icon: Moon,
          title: '🕌 أتمتة المسجد',
          highlight: 'أوقات الصلاة + الصوت',
          message: `مرحباً LEXA! نحتاج أنظمة أتمتة للمسجد.\n\n🕌 اسم المسجد: ___\n📍 الموقع: ___\n📐 حجم قاعة الصلاة: ___ متر مربع\n👥 السعة: ___ شخص`
        }
      ]
    },
    
    marine: {
      en: [
        {
          icon: Film,
          title: '⚓ Yacht Entertainment',
          highlight: 'Marine-grade AV systems',
          message: `Hi LEXA! I need entertainment systems for my yacht.\n\n⚓ Vessel type: (Motor Yacht/Sailing/Superyacht)\n📏 Length: ___ ft\n📋 Systems needed:\n  • Marine audio\n  • Satellite TV\n  • Network/WiFi\n  • Cinema\n📍 Current location: ___`
        },
        {
          icon: HardHat,
          title: 'Yacht Survey & Quote',
          highlight: 'On-vessel assessment',
          message: `Hi LEXA! I need a yacht survey and quote.\n\n⚓ Vessel name: ___\n📏 Length: ___ ft\n📍 Marina location: ___\n📅 Available for survey: ___\n📋 Systems of interest: ___`
        }
      ],
      ar: [
        {
          icon: Film,
          title: '⚓ ترفيه اليخوت',
          highlight: 'أنظمة بحرية',
          message: `مرحباً LEXA! أحتاج أنظمة ترفيه ليختي.\n\n⚓ نوع السفينة: ___\n📏 الطول: ___ قدم\n📋 الأنظمة المطلوبة: ___`
        }
      ]
    },
    
    hospitality: {
      en: [
        {
          icon: Building2,
          title: '🏨 Hotel Automation',
          highlight: 'GRMS + IPTV + Energy',
          message: `Hi LEXA! We need hotel automation solutions.\n\n🏨 Hotel name: ___\n📍 Location: ___\n🛏 Number of rooms: ___\n⭐ Star rating: ___\n📋 Systems needed:\n  • GRMS\n  • IPTV\n  • Energy management\n  • PMS integration`
        }
      ],
      ar: [
        {
          icon: Building2,
          title: '🏨 أتمتة الفنادق',
          highlight: 'إدارة الغرف والترفيه',
          message: `مرحباً LEXA! نحتاج حلول أتمتة للفندق.\n\n🏨 اسم الفندق: ___\n🛏 عدد الغرف: ___\n📋 الأنظمة المطلوبة: ___`
        }
      ]
    },
    
    security: {
      en: [
        {
          icon: Eye,
          title: '🛡 Security Assessment',
          highlight: 'Free vulnerability audit',
          message: `Hi LEXA! I need a security system assessment.\n\n📍 Property location: ___\n🏠 Type: (Villa/Commercial/Facility)\n📐 Size: ___ sqm\n📋 Current security:\n  • Cameras? (Yes/No)\n  • Alarms? (Yes/No)\n  • Access control? (Yes/No)\n🎯 Main concerns: ___`
        },
        {
          icon: Building2,
          title: 'Complete Security Upgrade',
          highlight: 'Cameras + Access + Alarms',
          message: `Hi LEXA! I need a complete security system.\n\n📍 Property: ___\n📐 Coverage area: ___ sqm\n📹 Cameras needed: ~___ units\n🔐 Access control points: ___\n💰 Budget range: AED ___`
        }
      ],
      ar: [
        {
          icon: Eye,
          title: '🛡 تقييم أمني',
          highlight: 'تدقيق مجاني',
          message: `مرحباً LEXA! أحتاج تقييم نظام أمني.\n\n📍 موقع العقار: ___\n🏠 النوع: ___\n📋 الأنظمة الحالية: ___`
        }
      ]
    },
    
    luxury_living: {
      en: [
        {
          icon: Home,
          title: '✨ Smart Home Design',
          highlight: 'Complete automation',
          message: `Hi LEXA! I want a complete smart home.\n\n🏠 Property type: ___\n📍 Location: ___\n📐 Size: ___ sqm\n📋 Systems interested in:\n  • Lighting automation\n  • Multi-room audio\n  • Climate control\n  • Security & cameras\n  • Motorized shades\n  • Home cinema\n💰 Budget: AED ___`
        },
        {
          icon: Zap,
          title: '⚡ Fast Track Design',
          highlight: 'Concept in 48 hours',
          message: `Hi LEXA! I need a smart home concept fast.\n\n🏠 Property: ___\n📍 Location: ___\n⏱ Project stage: (Design/Construction/Move-in ready)\n📋 Priority systems: ___\n📅 Need proposal by: ___`
        }
      ],
      ar: [
        {
          icon: Home,
          title: '✨ تصميم منزل ذكي',
          highlight: 'أتمتة كاملة',
          message: `مرحباً LEXA! أريد منزل ذكي كامل.\n\n🏠 نوع العقار: ___\n📐 الحجم: ___ متر مربع\n📋 الأنظمة المهتمة بها: ___`
        }
      ]
    },
    
    general: {
      en: [
        {
          icon: Zap,
          title: '⚡ Quick Consultation',
          highlight: 'Get expert advice fast',
          message: `Hi LEXA! I need a quick consultation.\n\n📋 I'm interested in: ___\n📍 Location: ___\n💰 Budget range: AED ___\n📅 Timeline: ___\n\nLooking forward to discussing!`
        },
        {
          icon: Home,
          title: 'Smart Villa Project',
          highlight: 'Complete automation',
          message: `Hi LEXA! I'm planning a smart villa.\n\n📍 Location: ___\n📐 Villa size: ___ sqm\n🏗 Stage: (Design/Construction/Ready)\n📋 Interested systems:\n  • Home cinema\n  • Lighting automation\n  • Security\n  • Audio\n  • Other: ___`
        },
        {
          icon: Eye,
          title: '🏢 Visit Experience Centre',
          highlight: 'See live demonstrations',
          message: `Hi LEXA! I'd like to visit your Experience Centre.\n\n📅 Preferred date: ___\n⏰ Preferred time: ___\n👥 Number of visitors: ___\n🎯 Systems to see: ___`
        },
        {
          icon: Building2,
          title: 'Commercial/Enterprise',
          highlight: 'Business solutions',
          message: `Hi LEXA! We need automation for our facility.\n\n🏢 Facility type: ___\n📍 Location: ___\n📋 Systems needed: ___\n⏱ Timeline: ___\n💼 Contact person: ___`
        }
      ],
      ar: [
        {
          icon: Home,
          title: 'مشروع فيلا ذكية',
          highlight: 'أتمتة كاملة',
          message: `مرحباً LEXA! أخطط لفيلا ذكية.\n\n📍 الموقع: ___\n📐 حجم الفيلا: ___ متر مربع\n🏗 المرحلة: ___\n📋 الأنظمة المهتمة: ___`
        },
        {
          icon: Eye,
          title: '🏢 زيارة مركز التجربة',
          highlight: 'شاهد العروض الحية',
          message: `مرحباً LEXA! أود زيارة مركز التجربة.\n\n📅 التاريخ المفضل: ___\n⏰ الوقت المفضل: ___\n👥 عدد الزوار: ___`
        }
      ]
    }
  }
  
  const context = getContextualScripts()
  const currentScripts = isArabic 
    ? scriptTemplates[context]?.ar || scriptTemplates.general.ar
    : scriptTemplates[context]?.en || scriptTemplates.general.en
  
  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Button — desktop only, mobile uses MobileQuickActions FAB */}
      <motion.button
        data-testid="whatsapp-button"
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.4)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </motion.button>

      {/* Enhanced Script Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-2 left-2 sm:left-auto sm:right-6 z-50 sm:w-[420px] overflow-hidden rounded-2xl border-2 border-[#E8DCC8]/30 bg-gradient-to-br from-[#0A0A0A] via-[#121212] to-[#0A0A0A] shadow-2xl"
            >
              {/* Header */}
              <div className="border-b border-white/10 bg-[#25D366] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Quick Connect</h3>
                    <p className="text-xs text-green-100">Choose your conversation starter</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsArabic(!isArabic)
                      }}
                      className="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-1 text-xs transition-all hover:bg-white/30"
                    >
                      <Globe size={14} />
                      {isArabic ? 'EN' : 'عربي'}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-1 transition-colors hover:bg-white/20"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Templates */}
              <div className="max-h-96 space-y-2 overflow-y-auto p-4">
                {currentScripts.map((script, index) => {
                  const Icon = script.icon
                  return (
                    <button
                      key={index}
                      onClick={() => openWhatsApp(script.message)}
                      className="group w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-[#E8DCC8] hover:bg-[#E8DCC8]/10"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-[#E8DCC8]" />
                        <div className="flex-1">
                          <h4 className="mb-1 text-sm font-bold text-white">{script.title}</h4>
                          {script.highlight && (
                            <p className="mb-1 text-xs text-[#E8DCC8]">{script.highlight}</p>
                          )}
                          <p className="text-xs leading-relaxed text-gray-400 line-clamp-2">
                            {script.message.split('\n')[0]}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-[#E8DCC8] group-hover:opacity-100" />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Direct Chat Option */}
              <div className="border-t border-white/10 bg-white/5 p-4">
                <button
                  onClick={() => openWhatsApp('')}
                  className="w-full rounded-xl bg-[#25D366] py-3 font-bold text-white transition-all hover:bg-[#20BD5C]"
                >
                  {isArabic ? 'فتح محادثة واتساب' : 'Open WhatsApp Chat'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

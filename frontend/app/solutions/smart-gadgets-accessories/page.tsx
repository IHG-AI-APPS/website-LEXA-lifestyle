'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import { internalLinking } from '@/lib/internal-linking-data'

export default function SmartGadgetsAccessoriesPage() {
  const links = internalLinking['smart-gadgets-accessories']
  
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_smart-gadgets-accessories"
      cmsKey="page_solutions_smart-gadgets-accessories"
      hero={{
        badge: "Smart Home Products",
        title: "SMART GADGETS",
        titleHighlight: "& ACCESSORIES",
        subtitle: "Smart Locks. Sensors. Controllers. Connected Devices.",
        description: "Premium smart home gadgets and accessories including smart locks, sensors, controllers, and IoT devices for automated living.",
        image: "https://images.unsplash.com/photo-1558089687-e1cd2f93eb5b",
        primaryCTA: {
          text: "Browse Smart Products",
          href: "/consultation"
        }
      }}
      audience={['Homeowners', 'Renters', 'Tech Enthusiasts', 'DIY Smart Home']}
      problems={{
        items: [
          { problem: 'Incompatible Devices', impact: 'Gadgets don\'t work together, multiple apps' },
          { problem: 'Poor Quality', impact: 'Cheap imports fail quickly, no support' },
          { problem: 'Installation Complexity', impact: 'Don\'t know how to install or configure' },
          { problem: 'No Local Support', impact: 'Ordered online, broken, can\'t return or get help' },
          { problem: 'Security Concerns', impact: 'Devices connecting to unknown servers' },
          { problem: 'Limited Selection', impact: 'Can\'t find specific smart devices in UAE' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Shield', title: 'Premium Brands', desc: 'Authorized dealer for top smart home brands' },
          { icon: 'Home', title: 'Smart Locks', desc: 'Yale, August, Aqara - keyless entry solutions' },
          { icon: 'Zap', title: 'Sensors & Switches', desc: 'Motion, door/window, temperature, smart switches' },
          { icon: 'Wifi', title: 'Controllers & Hubs', desc: 'Zigbee, Z-Wave, Matter compatible hubs' },
          { icon: 'Watch', title: 'Wearables & Tags', desc: 'NFC tags, smart buttons, presence detection' },
          { icon: 'Smartphone', title: 'Setup & Support', desc: 'Professional installation, configuration, UAE warranty' }
        ]
      }}
      process={{
        title: "Our Smart Gadget Service",
        subtitle: "From selection to installation",
        steps: [
          { step: '01', title: 'Consultation', desc: 'Understand needs, compatibility check, product selection' },
          { step: '02', title: 'Supply', desc: 'Genuine products, UAE warranty, fast delivery' },
          { step: '03', title: 'Installation', desc: 'Professional setup, network configuration, testing' },
          { step: '04', title: 'Training', desc: 'Usage guide, app setup, ongoing support' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Popular Smart Gadgets',
        items: [
          { name: 'Smart Locks', features: ['Yale Smart Locks', 'Aqara Locks', 'Fingerprint Access', 'Mobile App Control', 'UAE Support'] },
          { name: 'Sensors & Switches', features: ['Motion Sensors', 'Door/Window', 'Smart Switches', 'Zigbee Devices', 'Matter Compatible'] },
          { name: 'Controllers', features: ['Zigbee Hubs', 'Z-Wave Gateways', 'IR Blasters', 'Scene Controllers', 'Voice Control'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '500+', label: 'Devices Sold' },
          { number: 'Authorized', label: 'Dealer' },
          { number: 'UAE', label: 'Warranty' },
          { number: 'Local', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Need Smart Home Gadgets?",
        subtitle: "Browse our catalog or get personalized recommendations",
        primaryCTA: {
          text: "Browse Smart Products",
          href: "/products"
        },
        secondaryCTA: {
          text: "Get Recommendations",
          href: "/consultation"
        }
      }}
      relatedPersonas={links.relatedPersonas}
      relatedSolutions={links.relatedSolutions}
      geoPages={links.geoPages}
    />
  )
}

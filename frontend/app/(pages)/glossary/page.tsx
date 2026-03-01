'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useCms } from '@/hooks/useCms'

const glossaryTerms = [
  {
    letter: 'A',
    terms: [
      { term: 'Access Control', definition: 'Security system managing entry to buildings using smart locks, keypads, biometric scanners, or mobile credentials. Modern systems integrate with home automation for comprehensive security.' },
      { term: 'Acoustic Modeling', definition: 'Professional computer simulation of sound behavior in a space before construction. Predicts reflections, standing waves, and frequency response to optimize speaker placement, room dimensions, and treatment materials for perfect audio performance in home theaters and Majlis spaces.' },
      { term: 'Acoustic Treatment', definition: 'Materials and techniques used to optimize sound quality in home theaters, including absorption panels, bass traps, and diffusers to eliminate echoes and improve audio clarity.' },
      { term: 'Air Quality Monitoring', definition: 'Real-time measurement of indoor air parameters including CO2 (carbon dioxide), VOCs (volatile organic compounds), particulate matter (PM2.5), humidity, and temperature. Smart systems automatically adjust ventilation, filtration, and HVAC when thresholds are exceeded, maintaining optimal health and comfort.' },
      { term: 'Architectural Integration', definition: 'Design-phase planning where technology infrastructure is seamlessly incorporated into building architecture. Includes hidden wiring pathways, built-in speaker placement, motorized screen pockets, and equipment room planning—ensuring technology enhances rather than detracts from interior aesthetics.' },
      { term: 'Alexa', definition: 'Amazon\'s voice assistant for controlling smart home devices using Arabic or English voice commands in UAE homes. Integrates with Control4, Crestron, and Savant systems.' },
      { term: 'Audio Distribution', definition: 'System allowing music to play in multiple rooms simultaneously from centralized sources like Sonos or Control4. Supports independent source selection and volume control per zone.' },
      { term: 'Automation Scene', definition: 'Pre-programmed smart home setting that controls multiple devices with one command (e.g., "Movie Time" dims lights, closes shades, turns on projector).' },
      { term: 'AV Receiver', definition: 'Central hub processing audio and video signals, switching between sources, and amplifying sound for speakers. Supports formats like Dolby Atmos and DTS:X.' }
    ]
  },
  {
    letter: 'B',
    terms: [
      { term: 'Biometric Access Control', definition: 'Authentication system using unique biological traits like fingerprints, facial recognition, iris scans, or voice patterns to authorize entry. AI-enhanced systems in 2025 offer touchless, multimodal verification.' },
      { term: 'Backbone Network', definition: 'High-speed central network infrastructure connecting all smart home subsystems. Typically uses fiber optic or Cat7 cabling for maximum reliability and bandwidth.' },
      { term: 'Bass Management', definition: 'AV system configuration that redirects low-frequency sounds below 80Hz to dedicated subwoofer(s) while protecting smaller speakers from damaging bass frequencies. Critical for balanced home theater audio. Professional calibration includes crossover tuning, phase alignment, and room correction for even bass distribution across all seating positions.' }
    ]
  },
  {
    letter: 'C',
    terms: [
      { term: 'Cat6 / Cat7 Cable', definition: 'Ethernet structured cabling standards. Cat6 supports Gigabit speeds up to 100m for most smart home devices. Cat7 offers 10Gbps with superior shielding for high-bandwidth automation in larger properties.' },
      { term: 'Control4', definition: 'Leading whole-home automation platform popular in UAE for controlling lighting, climate, security, and entertainment. EA-series controllers handle 24-250 devices with 150+ integrations. Price range: AED 150,000-400,000 for villas.' },
      { term: 'Crestron', definition: 'Premium enterprise-grade home automation system for ultra-luxury properties over 8,000 sq ft. Features DM NVX video-over-IP, 4-Series processors (300 commands/sec), and unlimited scalability. Known for ultimate customization. Cost: AED 500,000-2,000,000+.' },
      { term: 'Climate Control', definition: 'Automated HVAC management that adjusts temperature based on occupancy, time of day, and weather. Reduces Dubai cooling costs by 25-35%. Integrates with smart thermostats like Nest and Ecobee.' },
      { term: 'CCTV', definition: 'Closed-Circuit Television security cameras providing 24/7 surveillance with remote viewing via smartphone apps.' },
      { term: 'Codec', definition: 'Coder-decoder technology for compressing and decompressing audio/video files. Common formats include Dolby Digital, DTS, H.264, and HEVC for efficient streaming and storage.' },
      { term: 'Center Channel', definition: 'Primary speaker in home theater positioned at screen center for dialogue and on-screen effects. Critical for clear vocal reproduction.' },
      { term: 'Commissioning', definition: 'Professional phase following installation where systems undergo precision calibration, testing, and optimization. Includes acoustic tuning, network performance validation, automation scene programming, user training, and comprehensive system documentation. Transforms an installed system into a finely-tuned, user-adopted solution.' }
    ]
  },
  {
    letter: 'D',
    terms: [
      { term: 'DALI', definition: 'Digital Addressable Lighting Interface - professional lighting control protocol allowing individual control of each fixture with dimming precision. Ideal for architectural lighting in luxury homes.' },
      { term: 'Dolby Atmos', definition: 'Advanced surround sound technology creating immersive 3D audio in home theaters using ceiling-mounted or upward-firing speakers. Supports up to 128 audio tracks and 64 speaker feeds with object-based spatial audio. Home configurations like 7.1.4 deliver cinema-grade experiences.' },
      { term: 'Dolby Vision', definition: 'Premium HDR (High Dynamic Range) format that optimizes picture quality scene-by-scene, enhancing contrast, brightness, and color depth. Adapts to TV capabilities and room lighting conditions.' },
      { term: 'DMX', definition: 'Digital Multiplex - lighting control protocol commonly used for architectural and entertainment lighting. Allows control of up to 512 channels per universe for complex lighting designs.' },
      { term: 'DVR', definition: 'Digital Video Recorder - hardware system recording analog CCTV camera footage to digital storage. Legacy technology being replaced by NVR for IP camera systems.' },
      { term: 'DTS:X', definition: 'Object-based surround sound format competing with Dolby Atmos, providing immersive 3D audio without predefined speaker layouts.' }
    ]
  },
  {
    letter: 'E',
    terms: [
      { term: 'Energy Optimization', definition: 'AI-driven system learning usage patterns to minimize energy consumption without sacrificing comfort. Analyzes historical data, weather forecasts, occupancy, and utility rates to pre-cool during off-peak hours, avoid conditioning unoccupied zones, and optimize HVAC scheduling—typically achieving 25-35% cost reduction in Dubai climate.' },
      { term: 'EQ (Equalization)', definition: 'Audio frequency adjustment to optimize sound for room acoustics. Professional calibration balances bass, midrange, and treble for optimal listening experience.' },
      { term: '8K Resolution', definition: 'Ultra-high-definition video format with 7680x4320 pixels (~33 megapixels). Requires HDMI 2.1 connectivity and offers four times the detail of 4K for large-format displays and projectors.' }
    ]
  },
  {
    letter: 'F',
    terms: [
      { term: 'Fiber Optic Cabling', definition: 'High-speed data transmission using light through glass fibers. Enables long-distance network runs without signal loss or electromagnetic interference. Essential for backbone connections in expansive properties.' },
      { term: 'Fingerprint Scanner', definition: 'Biometric device reading unique fingerprint patterns for access control. Modern systems use capacitive or optical sensors with anti-spoofing technology.' }
    ]
  },
  {
    letter: 'G',
    terms: [
      { term: 'Google Assistant', definition: 'Google\'s AI voice assistant for smart home control, supporting Arabic and English. Integrates with Nest products and major automation platforms.' },
      { term: 'Gateway', definition: 'Device connecting different protocols or networks, enabling communication between incompatible smart home systems (e.g., Zigbee to Wi-Fi).' }
    ]
  },
  {
    letter: 'H',
    terms: [
      { term: 'HDR (High Dynamic Range)', definition: 'Video technology expanding contrast range between darkest and brightest parts of image. Formats include HDR10, HDR10+, Dolby Vision, and HLG for enhanced picture quality with deeper blacks and brighter highlights.' },
      { term: 'HDMI', definition: 'High-Definition Multimedia Interface - single-cable digital connection transmitting video (up to 8K), audio (up to 8 channels), and control signals. HDMI 2.1 supports 8K@60Hz and features like eARC, VRR, and ALLM.' },
      { term: 'HDMI-CEC', definition: 'Consumer Electronics Control protocol enabling device control through HDMI connection. Allows one remote to control TV, receiver, and players simultaneously.' },
      { term: 'Home Theater', definition: 'Dedicated cinema room with projector/large screen, surround sound (5.1 to 9.4.6 configurations), acoustic treatment, and automated lighting/shading. Professional designs include bass management, room calibration, and immersive audio formats.' },
      { term: 'HVAC', definition: 'Heating, Ventilation, and Air Conditioning systems. Smart HVAC control is essential in UAE for managing cooling costs through automated scheduling, occupancy detection, and weather integration.' },
      { term: 'Hub', definition: 'Central device connecting and controlling all smart home components (Control4, Crestron, SmartThings, etc.). Processes automation rules and manages device communication.' }
    ]
  },
  {
    letter: 'I',
    terms: [
      { term: 'Installed vs Adopted', definition: 'Critical distinction in smart home success. "Installed" means equipment is physically present but unused. "Adopted" means systems are intuitive, reliable, and actively used daily. LEXA focuses on adoption through unified interfaces, continuous optimization, and user-centric design—not just installation.' },
      { term: 'Integration', definition: 'Process of connecting different smart home systems to work together seamlessly under unified control. Professional integration ensures all subsystems (lighting, AV, climate, security) communicate effectively.' },
      { term: 'Intelligence Layer', definition: 'AI orchestration system connecting all smart home subsystems to enable cross-platform learning, predictive automation, and unified control. Unlike fragmented installations, the Intelligence Layer allows lighting to respond to security events, climate to adjust based on occupancy, and all systems to learn from patterns—creating a home that truly understands itself.' },
      { term: 'Intercom', definition: 'Communication system allowing audio/video conversations between rooms or with visitors at gate/door. Modern systems integrate with mobile devices for remote access.' },
      { term: 'IP Camera', definition: 'Network-connected security camera transmitting video over Internet Protocol networks. Offers high-definition recording, remote viewing, motion detection, and integration with NVR systems for centralized management.' },
      { term: 'IoT (Internet of Things)', definition: 'Network of physical devices embedded with sensors and connectivity, enabling data exchange and remote control. Foundation of modern smart home ecosystems.' }
    ]
  },
  {
    letter: 'J',
    terms: [
      { term: 'Josh.ai', definition: 'Privacy-focused voice control platform designed specifically for luxury smart homes. Processes commands locally without cloud dependency, supporting natural language and multi-room control.' }
    ]
  },
  {
    letter: 'K',
    terms: [
      { term: 'KNX', definition: 'Global open standard for home and building automation, popular in UAE luxury properties for lighting, climate, and security integration. Uses dedicated wiring or wireless/powerline hybrids for reliable, future-proof installations. Supports building-scale scalability with low-latency performance.' },
      { term: 'Keypad', definition: 'Wall-mounted control panel with programmable buttons for activating scenes or controlling devices. Modern keypads feature LED backlighting, customizable engraving, and touchscreen options.' }
    ]
  },
  {
    letter: 'L',
    terms: [
      { term: 'Leak Detection', definition: 'Water damage prevention system using sensors in bathrooms, kitchens, laundry rooms, pool equipment areas, and mechanical rooms to detect leaks instantly. Smart systems automatically shut off main water supply, send mobile alerts, notify emergency contacts, and log incidents—preventing catastrophic damage that can cost AED 500K-2M in structural repairs and lost property.' },
      { term: 'Lexa Evolves', definition: 'LEXA\'s commitment to continuous improvement where systems become smarter over time through AI learning, regular software updates, and proactive optimization. Unlike traditional installations that depreciate, LEXA systems appreciate in value and functionality—growing intelligence that adapts to changing needs and emerging technologies.' },
      { term: 'Lutron', definition: 'World leader in lighting control and motorized shading systems with proven reliability and extensive color/style options. Seamlessly integrates with Control4, Crestron, and Savant. Known for smooth LED dimming, energy efficiency, and elegant keypads. Popular choice for luxury Dubai villas.' },
      { term: 'LED', definition: 'Light Emitting Diode - energy-efficient lighting technology used throughout modern smart homes. Offers 50,000+ hour lifespan, instant-on performance, and compatibility with smart dimmers.' },
      { term: 'Lighting Scene', definition: 'Pre-set lighting configuration (brightness, color, zones) activated by button, app, voice, or automation trigger. Examples: "Welcome Home," "Dinner," "Movie Time," "Goodnight."' },
      { term: 'LFE (Low-Frequency Effects)', definition: 'Dedicated subwoofer channel in surround sound systems handling deep bass (31.5-120 Hz). Critical for impactful home theater experiences with explosions and rumble effects.' }
    ]
  },
  {
    letter: 'M',
    terms: [
      { term: 'Majlis', definition: 'Traditional Arabic reception room serving as the heart of Emirati hospitality and family gatherings. Culturally significant space requiring specialized audio/visual solutions that maintain elegant aesthetics while ensuring speech clarity for conversations—typically featuring invisible speaker integration compatible with ornate ceilings and traditional décor.' },
      { term: 'Majlis Audio', definition: 'Culturally-tuned audio system specifically designed for traditional gathering spaces. Optimizes speech intelligibility for conversations while providing discreet background music that automatically adjusts when conversation is detected. Features architecturally invisible speakers, zone control for different seating areas, and cultural aesthetic preservation.' },
      { term: 'Matter', definition: 'Unified smart home standard launched 2022 enabling cross-brand compatibility. Works with Thread protocol for secure, low-power mesh networking. Ensures devices from different manufacturers work together seamlessly.' },
      { term: 'Mesh Network', definition: 'Wireless network topology where devices connect to multiple nodes, creating redundant pathways for reliable coverage. Essential for Wi-Fi systems in large villas and properties with multiple floors.' },
      { term: 'Multi-Room Audio', definition: 'System distributing music to different rooms with independent control of source and volume per zone. Supports streaming services, local libraries, and synchronized or independent playback across up to 24+ zones.' },
      { term: 'Motorized Shades', definition: 'Automated window treatments from Lutron, Somfy, or Magna that adjust based on time, sun position, or manual control. Integrated with climate systems to reduce cooling costs and protect furnishings.' },
      { term: 'Motion Sensor', definition: 'Device detecting movement using PIR (passive infrared), microwave, or dual-technology to trigger lights, security alerts, or automation scenes. Advanced models distinguish between pets and humans.' }
    ]
  },
  {
    letter: 'N',
    terms: [
      { term: 'Network Switch', definition: 'Hardware connecting smart home devices via Ethernet for reliable communication. Managed PoE switches recommended for large systems, offering VLAN segmentation, QoS prioritization, and centralized device power delivery.' },
      { term: 'NAS (Network Attached Storage)', definition: 'Centralized media server storing music, movies, photos, and security footage. Provides RAID redundancy and remote access for whole-home media distribution.' },
      { term: 'NVR (Network Video Recorder)', definition: 'Device recording video from IP cameras over network, storing high-definition footage centrally. Offers advanced features like motion detection, facial recognition, and mobile app access for playback and live viewing.' }
    ]
  },
  {
    letter: 'O',
    terms: [
      { term: 'Occupancy Detection', definition: 'AI-powered sensing technology determining room presence using multiple inputs: PIR sensors, ultrasonic waves, CO2 levels, camera-based presence detection, and smart device connectivity. Enables intelligent automation like cooling only occupied zones, pathway lighting following movement, and security alerts when presence detected during away mode—critical for energy optimization and convenience.' },
      { term: 'OLED', definition: 'Organic Light-Emitting Diode display technology with self-emissive pixels for perfect blacks, infinite contrast ratios, and wide viewing angles. Ideal for HDR content in home theaters.' },
      { term: 'Orchestration', definition: 'LEXA\'s approach to smart home integration where all systems work in harmony under unified intelligence, versus traditional fragmented "installations" using 15+ disconnected apps. Orchestration enables cross-system automation (security arming triggers lighting scenes), predictive behavior (pre-cooling before arrival), and single-interface control—transforming complexity into simplicity.' }
    ]
  },
  {
    letter: 'P',
    terms: [
      { term: 'Platform Agnostic', definition: 'LEXA\'s philosophy of no vendor lock-in—integrating best-in-class equipment from any manufacturer (Control4, Crestron, Savant, KNX, Lutron, Sonos, etc.) into unified experience. Clients choose premium brands per category based on priorities while LEXA orchestrates everything into single control interface. Ensures future-proof flexibility and prevents dependency on single vendor\'s ecosystem.' },
      { term: 'PoE (Power over Ethernet)', definition: 'IEEE 802.3af/at standard delivering both data and electrical power (up to 30W per port) through single network cable. Eliminates separate power supplies for cameras, access points, keypads, and touchscreens. Simplifies installations and enables centralized UPS backup.' },
      { term: 'PoE Switch', definition: 'Managed network switch providing PoE to connected devices. Features include VLAN segmentation, QoS for traffic prioritization, real-time device monitoring, and fiber uplinks for long-distance connections.' },
      { term: 'Perimeter Detection', definition: 'Security system monitoring property boundaries before intrusion reaches buildings. Technologies include: garden motion sensors, façade contact switches, balcony glass-break detectors, roof beam sensors, thermal imaging cameras, and AI video analytics identifying human/vehicle approach. Creates defensive security layers with early warning alerts.' },
      { term: 'Predictive Maintenance', definition: 'AI-driven system monitoring equipment health to predict failures before they occur. Analyzes performance patterns (HVAC efficiency degradation, unusual network latency, camera offline patterns) and sends proactive alerts for maintenance—preventing system downtime, extending equipment life, and avoiding emergency repair costs. Part of LEXA\'s white-glove support approach.' },
      { term: 'Proactive Monitoring', definition: 'Continuous 24/7 oversight of smart home systems by LEXA support team, identifying and resolving issues before clients notice. Unlike reactive support (waiting for user to report problems), proactive monitoring catches network degradation, device failures, security vulnerabilities, and performance issues—often fixing remotely without client involvement. Core element of white-glove service.' },
      { term: 'Protocol', definition: 'Communication language smart devices use to interact. Common protocols: KNX (wired/building-scale), Z-Wave (mesh/reliable), Zigbee (low-power mesh), Wi-Fi, Thread (Matter-compatible), and proprietary systems like Control4/Crestron.' },
      { term: 'Projector', definition: '4K/8K video projection device for large-format home theaters. Popular brands: Sony, Epson, JVC. Key features: laser light source, HDR support, lens shift, and 3000+ lumens brightness.' }
    ]
  },
  {
    letter: 'Q',
    terms: [
      { term: 'QoS (Quality of Service)', definition: 'Network traffic prioritization ensuring critical smart home communications (security cameras, automation commands) receive bandwidth over less time-sensitive data like file downloads.' }
    ]
  },
  {
    letter: 'R',
    terms: [
      { term: 'RAID', definition: 'Redundant Array of Independent Disks - data storage technology using multiple drives for redundancy and performance. RAID 5/6 configurations protect against drive failures in NAS systems.' },
      { term: 'Remote Access', definition: 'Ability to control smart home from anywhere via smartphone app over secure internet connection. Features include live camera viewing, climate adjustment, lighting control, and security system management.' },
      { term: 'RGB / RGBW', definition: 'Red, Green, Blue (+ White) color-changing LED lighting allowing millions of color combinations. RGBW adds dedicated white LEDs for pure white light alongside colors.' },
      { term: 'Role-Based Access', definition: 'Security model assigning permissions by user role rather than individuals. LEXA\'s Villa Operating Model defines four roles: Owners (unrestricted access), Family (personalized zones), Guests (temporary guided access), and Staff (time/zone restricted with audit trails). More sophisticated than traditional individual user accounts—adapts to how luxury estates actually operate.' },
      { term: 'Router', definition: 'Network device managing internet connection and communication between smart home devices. Mesh routers recommended for large properties to ensure seamless coverage.' }
    ]
  },
  {
    letter: 'S',
    terms: [
      { term: 'Savant', definition: 'Luxury smart home automation platform known for elegant interfaces, premium AV focus, and Apple ecosystem integration. Features BluBridge AV receivers with Dolby Atmos, TrueImage 16K upscaling, and energy management with 20% better power efficiency. Pro 2.0 controllers handle 150 commands/sec on 4GB RAM.' },
      { term: 'Sonos', definition: 'Premium wireless multi-room audio system popular in UAE homes for music streaming. Supports major services, voice control, and seamless whole-home synchronization without dedicated wiring.' },
      { term: 'Smart Lock', definition: 'Electronic door lock controlled via smartphone, keypad, biometrics, or voice. Features include auto-lock, activity logs, temporary access codes, and integration with home automation. Brands: Yale, Schlage, August, Danalock.' },
      { term: 'Scene', definition: 'Automated combination of multiple device actions triggered by single command, schedule, or condition. Examples: "Good Morning" opens shades, adjusts temperature, starts coffee maker.' },
      { term: 'Staff Movement Intelligence', definition: 'Advanced access control tracking household staff location and activity throughout property. Features include: time-based access permissions (e.g., 7 AM-5 PM), zone restrictions (permitted areas only), real-time movement logs, entry/exit timestamps, and comprehensive audit trails. Ensures operational efficiency while maintaining security and accountability—critical for large estates with multiple service personnel.' },
      { term: 'Structured Cabling', definition: 'Organized network infrastructure using Cat6/Cat7 Ethernet and fiber optic cables. Provides reliable, high-speed connectivity for smart home devices with future-proof bandwidth capacity.' },
      { term: 'Subwoofer', definition: 'Specialized speaker reproducing low-frequency sounds (20-120 Hz) for deep bass in home theaters. Multiple subs recommended for even bass distribution in large rooms.' },
      { term: 'Surround Sound', definition: 'Multi-channel audio system creating immersive sound field. Configurations: 5.1 (5 speakers + sub), 7.1, 7.2.4 (height channels for Atmos), up to 9.4.6 for reference theaters.' },
      { term: 'System Calibration', definition: 'Professional precision tuning phase where installed equipment is optimized for specific environment. Includes: acoustic measurement and EQ adjustment, speaker timing/phase alignment, video display color calibration, network performance optimization, lighting scene fine-tuning, and automation logic refinement. Transforms generic installation into custom-tuned system maximizing performance for exact space and user preferences.' }
    ]
  },
  {
    letter: 'T',
    terms: [
      { term: 'Thermal Imaging', definition: 'Infrared camera technology detecting heat signatures for surveillance. Identifies intruders, monitors perimeter security, and works in complete darkness or adverse weather conditions.' },
      { term: 'Thread', definition: 'Low-power IPv6-based mesh networking protocol for Matter-compatible smart home devices. Offers reliable, secure communication with self-healing network capabilities.' },
      { term: 'Touchscreen', definition: 'Wall-mounted or portable display for controlling smart home systems. Available in 7-15 inch sizes with customizable interfaces. Modern units feature PoE power and real-time status updates.' },
      { term: 'Thermostat', definition: 'Device controlling heating/cooling with smart features like learning algorithms, geofencing, and remote access. Popular brands: Nest (learning), Ecobee (room sensors), Control4/Crestron (integrated).' }
    ]
  },
  {
    letter: 'U',
    terms: [
      { term: 'Unified Control', definition: 'Single interface managing all smart home systems regardless of underlying platforms or manufacturers. Core LEXA principle—one app/touchscreen controls lighting (Lutron), AV (Savant), climate (Nest), security (Axis), network (Ubiquiti), and more. Eliminates the "15-app chaos" of fragmented installations, enabling true orchestration and cross-system automation.' },
      { term: 'UPS (Uninterruptible Power Supply)', definition: 'Battery backup system providing continuous power during outages. Critical for network equipment, security cameras, and automation hubs. Protects against data loss and maintains system operation.' },
      { term: 'Upscaling', definition: 'Video processing technique converting lower-resolution content to higher resolution (e.g., 1080p to 4K). Advanced processors use AI for enhanced detail and reduced artifacts.' }
    ]
  },
  {
    letter: 'V',
    terms: [
      { term: 'Villa Operating Model', definition: 'LEXA\'s four-tier role-based access framework designed for luxury estates: (1) Owners - unrestricted control with analytics, (2) Family - personalized profiles and independent zones, (3) Guests - temporary guided access with simplified controls, (4) Staff - time/zone restricted with movement tracking and audit trails. Enables appropriate access for each user type while maintaining security, privacy, and operational efficiency.' },
      { term: 'VLAN (Virtual Local Area Network)', definition: 'Network segmentation technique isolating smart home traffic by function (cameras, automation, guest devices) for enhanced security and performance. Configured on managed switches with VLAN IDs and QoS priority.' },
      { term: 'Voice Control', definition: 'Operating smart home using voice commands via Alexa, Google Assistant, Siri, or Josh.ai. Supports Arabic and English language with natural conversation capabilities. Integrates with all major automation platforms.' },
      { term: 'Video Doorbell', definition: 'Smart doorbell with HD camera, two-way audio, and motion detection. Allows remote viewing and communication with visitors via smartphone. Features include night vision, package detection, and cloud recording.' },
      { term: 'VRR (Variable Refresh Rate)', definition: 'Display technology synchronizing screen refresh with content frame rate, eliminating tearing and stuttering. Essential for gaming and smooth video playback via HDMI 2.1.' }
    ]
  },
  {
    letter: 'W',
    terms: [
      { term: 'White-Glove Support', definition: 'LEXA\'s premium 24/7 concierge-level service model featuring proactive monitoring (identifying issues before clients notice), predictive maintenance (preventing failures), instant response team, continuous system optimization, and personalized training. Unlike traditional reactive support requiring user to report problems, white-glove service maintains perfect operation through prevention and anticipation—ensuring "luxury doesn\'t troubleshoot."' },
      { term: 'Wi-Fi 6 / 6E', definition: 'Latest wireless standard (802.11ax) offering improved speeds, capacity, and efficiency. Wi-Fi 6E adds 6GHz band for reduced interference. Mesh systems recommended for comprehensive villa coverage with seamless roaming.' },
      { term: 'Whole-Home Audio', definition: 'Integrated audio system playing music throughout entire property with zone control. Supports streaming services, local media, and synchronized playback across all areas. Professional systems offer 24+ independent zones.' },
      { term: 'Wired Network', definition: 'Ethernet-based connectivity using Cat6/Cat7/fiber cabling. Provides superior reliability, speed, and security compared to wireless for critical devices like cameras, NVRs, and automation processors.' }
    ]
  },
  {
    letter: 'Z',
    terms: [
      { term: 'Z-Wave', definition: 'Wireless communication protocol for smart home devices operating on sub-GHz frequencies (908.42 MHz in US, 868.42 MHz in EU) for better wall penetration and reduced interference. Creates self-healing mesh networks with up to 232 devices per controller. More reliable than Wi-Fi for home automation with lower power consumption.' },
      { term: 'Zigbee', definition: 'Low-power IEEE 802.15.4 wireless mesh protocol supporting up to 65,000 devices per network. Common in lighting, sensors, and smart home products from Philips Hue, Samsung SmartThings, and Amazon Echo. Battery-powered devices can last years on single charge.' },
      { term: 'Zone', definition: 'Defined area in smart home with independent control of lighting, audio, climate, and shading. Examples: living room, master bedroom, pool area. Professional systems support 50+ zones for granular control and energy management.' },
      { term: 'Zone Amplifier', definition: 'Multi-channel amplifier powering speakers in different rooms/zones independently. Allows volume control and source selection per zone in distributed audio systems.' }
    ]
  }
]

export default function GlossaryPage() {
  const cms = useCms('page_glossary', null) as any

  const [searchTerm, setSearchTerm] = useState('')

  const terms = cms?.glossary_terms || glossaryTerms
  const filteredTerms = terms.map((section: any) => ({
    ...section,
    terms: section.terms.filter((item: any) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter((section: any) => section.terms.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 border-b">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                {cms?.hero_badge || 'Knowledge Base'}
              </span>
              <h1 className="h1 uppercase mb-6">
                {cms?.hero_title || 'SMART HOME GLOSSARY'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {cms?.hero_description || 'Complete guide to smart home automation terminology for UAE homeowners. Understanding these terms will help you make informed decisions about your luxury smart home project in Dubai.'}
              </p>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            {filteredTerms.map((section, sectionIndex) => (
              <motion.div
                key={section.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-gray-900">
                  <span className="text-6xl font-bold text-gray-900 dark:text-white dark:text-white">{section.letter}</span>
                </div>

                <div className="space-y-8">
                  {section.terms.map((item, index) => (
                    <div key={index} className="group">
                      <h3 className="text-2xl uppercase font-semibold text-gray-900 dark:text-white mb-2">
                        {item.term}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredTerms.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">No terms found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">HAVE QUESTIONS?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our smart home experts in Dubai are here to help you understand and choose the right automation solutions for your property.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-gray-900 dark:text-white px-8 py-4 text-lg font-semibold hover:bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            Schedule Consultation
          </a>
        </div>
      </section>
    </div>
  )
}

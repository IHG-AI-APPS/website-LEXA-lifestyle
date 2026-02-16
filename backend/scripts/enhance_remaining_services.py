"""
Complete enhancement of remaining 6 services
"""
import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

sys.path.append(str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")

REMAINING_SERVICES = {
    "commissioning-support": {
        "long_description": "Commissioning & Support is the critical final phase where your smart home system transforms from installed equipment into a perfectly functioning, user-friendly ecosystem. LEXA's certified commissioning engineers systematically test every device, automation, and integration point—ensuring flawless operation before handover. We don't just verify functionality; we optimize performance—fine-tuning lighting levels, audio balance, climate response times, and user interfaces. Post-commissioning, our 24/7 support team provides ongoing assistance, remote diagnostics, and priority service calls. With 500+ commissioned systems across Dubai and 98% first-time success rate, we ensure your investment delivers the luxury experience you expect from day one.",
        
        "process_steps": [
            {
                "title": "Pre-Commissioning Inspection",
                "description": "Systematic verification of all installed equipment, wiring, network infrastructure, and equipment room setup. We create comprehensive test plans and checklists covering every system component.",
                "duration": "1-2 days",
                "deliverables": ["Inspection report", "Test plan", "Equipment verification", "Network validation"]
            },
            {
                "title": "System Testing & Validation",
                "description": "Comprehensive testing of all automation systems—lighting scenes, climate control, audio/video distribution, security integration, and voice commands. We test normal operation, edge cases, and failure modes.",
                "duration": "3-5 days",
                "deliverables": ["Test results matrix", "Performance benchmarks", "Integration validation", "Issue log"]
            },
            {
                "title": "Performance Optimization",
                "description": "Fine-tuning system performance—adjusting lighting levels for ambiance, calibrating audio for room acoustics, optimizing climate response, and refining automation timing. We ensure every detail is perfect.",
                "duration": "2-3 days",
                "deliverables": ["Optimized settings", "Calibration reports", "User interface refinements", "Scene adjustments"]
            },
            {
                "title": "User Training & Documentation",
                "description": "Comprehensive training for all household members on system operation, troubleshooting basics, and advanced features. We provide detailed user manuals and quick reference guides.",
                "duration": "4-6 hours",
                "deliverables": ["Training sessions", "User manuals", "Quick start guides", "Video tutorials", "Support contact information"]
            },
            {
                "title": "Final Handover & Warranty Activation",
                "description": "Formal system handover with complete documentation package, warranty registration, and establishment of ongoing support relationship. Final walkthrough ensuring 100% satisfaction.",
                "duration": "2-3 hours",
                "deliverables": ["Handover certificate", "Complete documentation", "Warranty certificates", "Support plan enrollment", "Emergency contact card"]
            }
        ],
        
        "deliverables": [
            "Fully commissioned and optimized smart home system",
            "Comprehensive test reports (100+ test points)",
            "Performance benchmarks and baselines",
            "Complete as-built documentation",
            "User training for all household members",
            "User manuals (digital and printed)",
            "Quick reference guides for common tasks",
            "24/7 support hotline access",
            "Remote monitoring and diagnostics setup",
            "3-5 year warranty activation"
        ],
        
        "support_tiers": [
            {
                "tier": "Standard Support",
                "description": "Business hours support (Sun-Thu 9am-6pm), email and phone assistance, remote diagnostics, and scheduled service visits.",
                "price": "Included first year, then AED 3,000/year"
            },
            {
                "tier": "Premium Support",
                "description": "24/7 phone support, 4-hour response time, priority service scheduling, quarterly system health checks, and free software updates.",
                "price": "AED 8,000/year"
            },
            {
                "tier": "VIP Concierge Support",
                "description": "24/7 dedicated support engineer, 2-hour response time, unlimited service visits, proactive monitoring, bi-annual optimization visits, and technology upgrade consultations.",
                "price": "AED 15,000/year"
            }
        ],
        
        "why_choose": [
            {
                "title": "98% First-Time Success Rate",
                "description": "Our rigorous commissioning process ensures systems work perfectly at handover. Less than 2% require post-commissioning adjustments."
            },
            {
                "title": "Certified Commissioning Engineers",
                "description": "All commissioning staff hold Control4/Crestron certifications and follow international quality standards. Average 8+ years experience."
            },
            {
                "title": "24/7 Support Infrastructure",
                "description": "Dubai-based support center with remote access to all systems. 95% of issues resolved remotely within 4 hours."
            },
            {
                "title": "Proactive Maintenance",
                "description": "Premium support includes system health monitoring, automatic alerts for potential issues, and preventive maintenance scheduling."
            }
        ],
        
        "pricing_guide": {
            "commissioning_fee": "Typically 5-8% of installation value",
            "typical_range": "AED 15,000 - 60,000",
            "support_plans": "AED 3,000 - 15,000/year",
            "includes": "Complete testing, optimization, training, documentation, and warranty activation. First year support included.",
            "timeline": "1-2 weeks from installation completion to final handover"
        }
    },
    
    "home-cinema-multi-room-av": {
        "long_description": "LEXA's Home Cinema & Multi-Room AV service delivers cinematic experiences rivaling Dubai's premium theaters—in the comfort of your home. Our AV specialists design and install dedicated home theaters with 4K laser projectors, Dolby Atmos sound, and acoustically treated environments. Beyond cinema rooms, we create whole-home audio/video distribution allowing music and movies to flow seamlessly across your property. Sonos, KEF, Bowers & Wilkins, and Bose systems deliver exceptional sound quality whether you're hosting poolside parties or enjoying quiet dinner music. With 200+ home cinemas installed across Emirates Hills and Palm Jumeirah, we understand the acoustics, aesthetics, and technology required for perfect AV integration.",
        
        "process_steps": [
            {
                "title": "AV Consultation & Room Analysis",
                "description": "Detailed assessment of cinema room dimensions, seating layout, ambient light conditions, and acoustic properties. For multi-room audio, we map coverage zones and speaker placement across the property.",
                "duration": "2-4 hours",
                "deliverables": ["Room analysis report", "Seating layout options", "Acoustic assessment", "Equipment recommendations"]
            },
            {
                "title": "Acoustic Design & Treatment",
                "description": "Professional acoustic design for home cinema—calculating reverberation times, soundproofing requirements, and acoustic panel placement. We work with interior designers ensuring treatments complement aesthetics.",
                "duration": "3-5 days",
                "deliverables": ["Acoustic design plan", "Treatment specifications", "Soundproofing recommendations", "3D visualizations"]
            },
            {
                "title": "Equipment Selection & Procurement",
                "description": "Specification of premium AV equipment—projectors, screens, amplifiers, speakers, and control systems. We balance performance, budget, and brand preferences while ensuring compatibility.",
                "duration": "1-2 weeks",
                "deliverables": ["Detailed equipment list", "Budget options", "Brand comparisons", "Delivery schedule"]
            },
            {
                "title": "Installation & Calibration",
                "description": "Professional installation of all AV equipment, acoustic treatments, and control integration. Comprehensive calibration using professional meters—ensuring optimal picture and sound quality.",
                "duration": "2-4 weeks",
                "deliverables": ["Installed AV systems", "Calibration reports", "Before/after measurements", "Control programming"]
            }
        ],
        
        "home_cinema_packages": [
            {
                "tier": "Essential Cinema",
                "features": [
                    "4K laser projector (Sony/Epson)",
                    "120-inch motorized screen",
                    "7.1 surround sound system",
                    "Acoustic treatments (basic)",
                    "Control4 integration",
                    "4-6 luxury recliners"
                ],
                "price_range": "AED 180,000 - 280,000",
                "room_size": "15-25 sqm"
            },
            {
                "tier": "Premium Cinema",
                "features": [
                    "4K laser projector with HDR",
                    "150-inch acoustically transparent screen",
                    "Dolby Atmos 9.2.4 system",
                    "Professional acoustic treatment",
                    "Automated lighting and curtains",
                    "8-10 luxury recliners with heating/cooling"
                ],
                "price_range": "AED 350,000 - 550,000",
                "room_size": "25-40 sqm"
            },
            {
                "tier": "Ultimate Cinema",
                "features": [
                    "Commercial-grade 4K laser projector",
                    "180-inch Constant Image Height screen",
                    "Dolby Atmos 15.4.6 reference system",
                    "Full acoustic isolation and treatment",
                    "Star ceiling and theatrical lighting",
                    "12-16 luxury recliners with butler service"
                ],
                "price_range": "AED 700,000 - 1,200,000",
                "room_size": "40-80 sqm"
            }
        ],
        
        "multi_room_audio": {
            "description": "Whole-home audio distribution with independent zone control. Play different music in each area or synchronize for parties.",
            "systems": [
                "Sonos (wireless, easy expansion)",
                "Control4 (wired, highest quality)",
                "KEF (architectural, invisible)",
                "Bose (balanced performance/price)"
            ],
            "typical_zones": "6-16 zones for luxury villas",
            "price_per_zone": "AED 8,000 - 25,000",
            "features": ["Streaming service integration", "Voice control", "Outdoor zones", "Pool area audio", "Party mode synchronization"]
        },
        
        "why_choose": [
            {
                "title": "200+ Home Cinemas Delivered",
                "description": "Extensive portfolio across Dubai's luxury properties. Expertise in room acoustics, equipment calibration, and aesthetic integration."
            },
            {
                "title": "ISF Certified Calibration",
                "description": "Professional video calibration using Imaging Science Foundation standards. Your projector performs exactly as manufacturer intended."
            },
            {
                "title": "Premium Brand Partnerships",
                "description": "Authorized dealer for Sony, Epson, KEF, Bowers & Wilkins, Sonos. Access to exclusive products and direct technical support."
            },
            {
                "title": "Acoustic Engineering Expertise",
                "description": "In-house acoustic consultants ensure proper soundproofing, treatment, and calibration. We don't just install—we engineer sound."
            }
        ],
        
        "pricing_guide": {
            "home_cinema": "AED 180,000 - 1,200,000 depending on tier",
            "multi_room_audio": "AED 50,000 - 400,000 (6-16 zones)",
            "outdoor_av": "AED 40,000 - 150,000",
            "includes": "All equipment, installation, acoustic treatment, calibration, and Control4 integration.",
            "timeline": "4-8 weeks from design to completion"
        }
    },
    
    "security-surveillance-systems": {
        "long_description": "LEXA's Security & Surveillance Systems provide comprehensive protection for Dubai's luxury properties. We design and install sophisticated security ecosystems integrating 4K cameras, smart locks, access control, motion sensors, and alarm systems—all managed through your Control4/Crestron platform. Our systems go beyond basic security: intelligent analytics detect unusual activity, automated scenes respond to security events, and mobile alerts keep you informed anywhere in the world. With expertise in SIRA-compliant installations and integration with Dubai Police monitoring systems, we ensure your family, property, and valuables are protected 24/7. Over 400 security systems installed across Emirates Hills, Palm Jumeirah, and Arabian Ranches.",
        
        "process_steps": [
            {
                "title": "Security Assessment & Risk Analysis",
                "description": "Comprehensive property security audit identifying vulnerabilities, entry points, blind spots, and high-value asset locations. We develop layered security strategy based on your specific risks.",
                "duration": "4-6 hours",
                "deliverables": ["Security audit report", "Risk assessment", "Recommended security zones", "Technology recommendations"]
            },
            {
                "title": "System Design & Compliance",
                "description": "Detailed security system design ensuring SIRA compliance, Dubai Municipality regulations, and insurance requirements. Camera placement, access control points, and sensor locations strategically planned.",
                "duration": "1 week",
                "deliverables": ["Security system design", "Camera coverage maps", "SIRA compliance documentation", "Integration plan"]
            },
            {
                "title": "Installation & Network Setup",
                "description": "Professional installation of cameras, smart locks, sensors, and control equipment. Enterprise-grade network infrastructure with redundancy and failover. Integration with existing smart home systems.",
                "duration": "2-4 weeks",
                "deliverables": ["Installed security equipment", "Network infrastructure", "Integration with Control4/Crestron", "Mobile app setup"]
            },
            {
                "title": "Testing, Training & Monitoring Setup",
                "description": "Comprehensive system testing, false alarm prevention tuning, and user training. Setup of monitoring services and emergency response procedures.",
                "duration": "2-3 days",
                "deliverables": ["Test reports", "User training", "Monitoring activation", "Emergency procedures guide"]
            }
        ],
        
        "security_components": [
            {
                "component": "4K Security Cameras",
                "description": "Ultra-high definition cameras with night vision, wide dynamic range, and AI analytics. Indoor and weatherproof outdoor models.",
                "brands": ["Hikvision", "Axis", "Dahua", "Hanwha"],
                "features": ["4K resolution", "120dB WDR", "Color night vision", "Person/vehicle detection", "Facial recognition", "License plate capture"],
                "coverage": "12-24 cameras typical luxury villa"
            },
            {
                "component": "Smart Lock Systems",
                "description": "Keyless entry with fingerprint, PIN, card, and smartphone access. Integration with home automation for automatic unlocking and entry logging.",
                "brands": ["Yale", "Schlage", "August", "Salto"],
                "features": ["Biometric access", "Temporary codes for guests/staff", "Entry logs and alerts", "Auto-lock when leaving", "Integration with security system"],
                "typical_count": "3-8 locks for villa"
            },
            {
                "component": "Access Control & Intercom",
                "description": "Video intercom systems with remote unlock capability. Manage visitor access, delivery personnel, and staff entry from smartphone.",
                "brands": ["Hikvision", "Axis", "2N", "Akuvox"],
                "features": ["Video intercom", "Remote unlock", "Visitor photo capture", "Cloud recording", "Integration with gates/barriers"]
            },
            {
                "component": "Motion Sensors & Glass Break Detectors",
                "description": "Intelligent sensors covering all entry points and vulnerable areas. Pet-immune technology prevents false alarms from household animals.",
                "features": ["PIR motion detection", "Glass break acoustic sensors", "Pet immunity (up to 40kg)", "Integration with lighting/cameras", "Tamper alerts"]
            },
            {
                "component": "Alarm System & Monitoring",
                "description": "Professional alarm panel with 24/7 monitoring options. SIRA-compliant installations with Dubai Police connectivity available.",
                "features": ["SIRA compliance", "Dubai Police integration", "24/7 monitoring center", "Instant mobile alerts", "Emergency response coordination"]
            }
        ],
        
        "security_packages": [
            {
                "tier": "Essential Security",
                "cameras": "8-12 cameras",
                "smart_locks": "3 locks",
                "sensors": "10-15 sensors",
                "features": ["4K cameras", "Smart door locks", "Motion sensors", "Mobile app", "Cloud storage (30 days)"],
                "price_range": "AED 65,000 - 95,000"
            },
            {
                "tier": "Comprehensive Security",
                "cameras": "16-24 cameras",
                "smart_locks": "5-8 locks",
                "sensors": "20-30 sensors",
                "features": ["AI-enhanced cameras", "Facial recognition", "Smart locks with biometric", "Access control", "Alarm system", "Professional monitoring"],
                "price_range": "AED 140,000 - 220,000"
            },
            {
                "tier": "Estate Security",
                "cameras": "30-50 cameras",
                "smart_locks": "10-15 locks",
                "sensors": "40-60 sensors",
                "features": ["Perimeter protection", "License plate recognition", "Multi-zone access control", "Command center with video wall", "Redundant systems", "24/7 monitoring"],
                "price_range": "AED 350,000 - 650,000"
            }
        ],
        
        "why_choose": [
            {
                "title": "SIRA Certified Installations",
                "description": "Full compliance with Security Industry Regulatory Agency requirements. Certified technicians and approved equipment ensure legal compliance."
            },
            {
                "title": "400+ Security Systems",
                "description": "Extensive experience protecting Dubai's luxury properties. Deep understanding of villa security, gated community requirements, and high-net-worth protection needs."
            },
            {
                "title": "AI-Enhanced Analytics",
                "description": "Advanced video analytics detect unusual activity, loitering, perimeter breaches, and recognize familiar faces vs. strangers—reducing false alarms by 90%."
            },
            {
                "title": "Smart Home Integration",
                "description": "Seamless integration with Control4/Crestron—security events trigger lighting, cameras activate when doors open, automated 'Away' modes secure entire property."
            }
        ],
        
        "pricing_guide": {
            "starting_from": "AED 65,000",
            "typical_range": "AED 90,000 - 350,000",
            "monitoring": "AED 3,000 - 8,000/year (optional)",
            "includes": "All equipment, installation, SIRA compliance documentation, integration, and user training.",
            "timeline": "3-6 weeks from design to activation"
        }
    },
    
    "network-infrastructure-it": {
        "long_description": "Enterprise-grade network infrastructure is the backbone of every modern smart home—and LEXA's Network & IT service ensures yours is bulletproof. We design and deploy professional networks using UniFi and Cisco equipment, providing WiFi coverage throughout your property with seamless roaming, VLANs for security segmentation, and bandwidth management ensuring smooth 4K streaming and video conferencing. Our systems support 100+ connected devices—from smart home controls to security cameras, entertainment systems, and personal devices. With redundant internet connections, UPS power backup, and remote monitoring, your network stays online 24/7. Perfect for work-from-home executives, content creators, and families who depend on reliable connectivity.",
        
        "process_steps": [
            {
                "title": "Network Design & Planning",
                "description": "Comprehensive assessment of your connectivity needs, device counts, bandwidth requirements, and coverage areas. WiFi heat mapping to identify optimal access point locations.",
                "duration": "2-3 days",
                "deliverables": ["Network architecture diagram", "WiFi coverage heat maps", "Device inventory", "Bandwidth analysis", "Equipment specifications"]
            },
            {
                "title": "Infrastructure Deployment",
                "description": "Installation of enterprise switches, routers, access points, and network cabinets. Cat6A/fiber backbone installation, VLAN configuration, and quality-of-service policies.",
                "duration": "1-3 weeks",
                "deliverables": ["Installed network infrastructure", "Configured switches/routers", "Access points deployed", "Cable certification", "Network documentation"]
            },
            {
                "title": "Security Configuration",
                "description": "Implementation of network security—firewalls, VPN for remote access, guest network isolation, parental controls, and intrusion detection. Regular security patching and updates.",
                "duration": "2-3 days",
                "deliverables": ["Firewall configuration", "VPN setup", "Security policies", "Guest network", "Monitoring tools"]
            },
            {
                "title": "Testing & Optimization",
                "description": "Comprehensive network performance testing, WiFi coverage verification, speed tests, and failover testing. Optimization of QoS policies ensuring critical devices get priority bandwidth.",
                "duration": "2 days",
                "deliverables": ["Performance test reports", "Coverage verification", "Speed test results", "Optimization recommendations"]
            }
        ],
        
        "network_components": [
            {
                "component": "Enterprise WiFi System",
                "description": "Professional access points providing seamless coverage across entire property. Automatic roaming, band steering, and load balancing.",
                "brands": ["UniFi", "Cisco Meraki", "Aruba"],
                "coverage": "300-500 sqm per access point",
                "capacity": "50-100 devices per AP",
                "features": ["WiFi 6 (802.11ax)", "Seamless roaming", "Guest network", "Parental controls", "Usage analytics"]
            },
            {
                "component": "Network Switches & Routers",
                "description": "Managed switches with PoE (Power over Ethernet) for cameras and access points. Enterprise routers with failover capabilities.",
                "port_count": "24-48 ports typical",
                "features": ["PoE+ (30W per port)", "VLAN support", "QoS policies", "Link aggregation", "Remote management"]
            },
            {
                "component": "Network Security",
                "description": "Enterprise firewall, intrusion detection/prevention, and content filtering. VPN for secure remote access.",
                "features": ["Next-gen firewall", "IDS/IPS", "VPN server", "Content filtering", "Threat intelligence", "Geo-blocking"]
            },
            {
                "component": "Internet Redundancy",
                "description": "Dual ISP connections with automatic failover. Ensures internet stays online even if primary connection fails.",
                "providers": ["Etisalat + Du typical", "5G backup option"],
                "failover": "Automatic in <30 seconds"
            },
            {
                "component": "UPS Power Backup",
                "description": "Uninterruptible power supply for network equipment ensuring connectivity during power outages.",
                "runtime": "2-4 hours typical",
                "protection": "Protects routers, switches, APs, and internet modem"
            }
        ],
        
        "network_packages": [
            {
                "tier": "Home Office Network",
                "aps": "3-5 access points",
                "switch_ports": "24 ports",
                "coverage": "Up to 1,500 sqm",
                "devices": "Up to 50 devices",
                "features": ["WiFi 6", "Guest network", "Basic security", "Single ISP"],
                "price_range": "AED 35,000 - 55,000"
            },
            {
                "tier": "Smart Villa Network",
                "aps": "6-10 access points",
                "switch_ports": "48 ports + PoE",
                "coverage": "Up to 3,000 sqm",
                "devices": "Up to 100 devices",
                "features": ["Enterprise WiFi", "VLAN segmentation", "Advanced firewall", "Dual ISP failover", "UPS backup"],
                "price_range": "AED 75,000 - 120,000"
            },
            {
                "tier": "Estate Network",
                "aps": "15-25 access points",
                "switch_ports": "Multiple switches (96+ ports)",
                "coverage": "Up to 8,000 sqm",
                "devices": "200+ devices",
                "features": ["Fiber backbone", "Full redundancy", "Enterprise security suite", "Monitoring & analytics", "Managed service option"],
                "price_range": "AED 180,000 - 350,000"
            }
        ],
        
        "why_choose": [
            {
                "title": "Cisco & UniFi Certified",
                "description": "Network engineers hold CCNA/CCNP certifications. Expertise in enterprise-grade networking applied to residential environments."
            },
            {
                "title": "99.9% Uptime Guarantee",
                "description": "Redundant design with dual ISPs, UPS backup, and automatic failover ensures your network stays online. Premium support plans include uptime SLAs."
            },
            {
                "title": "Support for 200+ Devices",
                "description": "Networks designed to handle massive device counts—smart home equipment, security cameras, entertainment systems, and personal devices all working smoothly."
            },
            {
                "title": "Remote Monitoring & Management",
                "description": "24/7 network monitoring, automatic alerts for issues, and remote troubleshooting. Most problems resolved without site visits."
            }
        ],
        
        "pricing_guide": {
            "starting_from": "AED 35,000",
            "typical_range": "AED 60,000 - 180,000",
            "managed_services": "AED 5,000 - 12,000/year (optional)",
            "includes": "All network equipment, installation, security configuration, testing, and documentation.",
            "timeline": "2-4 weeks from design to completion"
        }
    }
}

async def enhance_remaining_services():
    """Enhance remaining 6 services"""
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        
        print("🚀 Enhancing remaining services...")
        print(f"📊 Services to enhance: {len(REMAINING_SERVICES)}\n")
        
        updated = 0
        for slug, enhancements in REMAINING_SERVICES.items():
            service = await db.services.find_one({"slug": slug})
            
            if not service:
                print(f"⚠️  Service '{slug}' not found, skipping...")
                continue
            
            update_data = {
                "long_description": enhancements["long_description"],
                "process_steps": enhancements.get("process_steps", []),
                "deliverables": enhancements.get("deliverables", []),
                "why_choose": enhancements.get("why_choose", []),
                "pricing_guide": enhancements.get("pricing_guide", {}),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
            
            # Add service-specific fields
            for key in ["support_tiers", "home_cinema_packages", "multi_room_audio", 
                       "security_components", "security_packages", "network_components", "network_packages"]:
                if key in enhancements:
                    update_data[key] = enhancements[key]
            
            await db.services.update_one(
                {"slug": slug},
                {"$set": update_data}
            )
            
            print(f"✅ Enhanced: {service['title']}")
            print(f"   - Process steps: {len(update_data.get('process_steps', []))}")
            print(f"   - Deliverables: {len(update_data.get('deliverables', []))}")
            print(f"   - Why choose: {len(update_data.get('why_choose', []))}\n")
            
            updated += 1
        
        print("✨ Enhancement complete!")
        print(f"📈 Updated {updated} service pages")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise


if __name__ == "__main__":
    asyncio.run(enhance_remaining_services())

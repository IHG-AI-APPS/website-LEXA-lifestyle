// Enrich Property Packages with feature_cards, faqs, brands
const db = db.getSiblingDB(process.env.DB_NAME || 'lexa_lifestyle');

const packageEnrichments = {
  "luxury-villas-mansions": {
    feature_cards: [
      { title: "Whole-Home Orchestration", description: "Unified control across every floor, wing, and outdoor space — lighting, climate, AV, security — from a single interface.", benefits: ["Multi-zone climate control", "Centralized lighting scenes", "Staff and guest mode automation"] },
      { title: "Private Cinema & Entertainment", description: "Dedicated cinema rooms, distributed audio, and outdoor entertainment zones designed for immersive luxury experiences.", benefits: ["Dolby Atmos home theaters", "Multi-room audio distribution", "Outdoor AV with weather protection"] },
      { title: "Estate Security & Privacy", description: "Enterprise-grade security with AI cameras, biometric access, perimeter monitoring, and discreet panic systems.", benefits: ["AI-powered CCTV analytics", "Biometric door access", "Perimeter intrusion detection"] }
    ],
    faqs: [
      { question: "What smart systems are included in a villa package?", answer: "Our villa packages include lighting automation, climate control, security & surveillance, home entertainment (cinema, multi-room audio), motorized shades, and centralized control via touchscreens and mobile apps." },
      { question: "Can the system be expanded later?", answer: "Absolutely. All our systems are modular and future-proof. You can add specialty rooms, outdoor automation, or additional zones at any time without rewiring." },
      { question: "How long does installation take for a villa?", answer: "Typical villa installations take 4-8 weeks depending on scope. We coordinate with your interior designer and contractor to ensure seamless integration." },
      { question: "Do you support KNX, Control4, and Crestron?", answer: "Yes, we are certified integrators for all major platforms including KNX, Control4, Crestron, Lutron, and Savant. We recommend the best system based on your requirements." }
    ],
    brands: ["Control4", "Crestron", "Lutron", "Sonos", "Samsung", "Sony", "Hikvision", "KNX", "Savant", "Clipsal"]
  },
  "penthouses-sky-homes": {
    feature_cards: [
      { title: "Sky-High Automation", description: "Panoramic views demand intelligent shading, lighting, and climate that adapt to sun position and time of day.", benefits: ["Automated motorized blinds", "Sun-tracking light scenes", "Floor-to-ceiling glass integration"] },
      { title: "Premium Entertainment", description: "Luxury audio-visual systems designed for open-plan living with invisible speakers and concealed displays.", benefits: ["Invisible in-ceiling speakers", "Motorized TV lifts", "Multi-zone audio streaming"] },
      { title: "Smart Security & Access", description: "Elevator integration, visitor management, and smart locks tailored for high-rise luxury living.", benefits: ["Elevator floor access control", "Video intercom systems", "Digital smart locks"] }
    ],
    faqs: [
      { question: "Can smart systems work with floor-to-ceiling windows?", answer: "Yes. We specialize in motorized shading solutions for large glass facades, including automated blinds that respond to sunlight intensity and time of day." },
      { question: "How do you handle penthouse elevator integration?", answer: "We integrate with building elevator systems to provide private floor access control, visitor authentication, and seamless arrival experiences." },
      { question: "Is there a wireless option for retrofit penthouses?", answer: "Yes. We offer wireless solutions using Lutron RadioRA, Control4, and Z-Wave that require minimal structural changes — ideal for existing penthouses." }
    ],
    brands: ["Lutron", "Control4", "Sonos", "Bang & Olufsen", "Samsung", "Axis", "Dahua", "Crestron"]
  },
  "luxury-apartments-duplexes": {
    feature_cards: [
      { title: "Space-Optimized Automation", description: "Smart systems designed for efficient apartment living — maximizing comfort without complex infrastructure.", benefits: ["Compact control panels", "Space-saving in-wall speakers", "Efficient lighting zoning"] },
      { title: "Connected Living", description: "Seamless integration of entertainment, climate, and security into your daily routines.", benefits: ["One-touch scene control", "Voice assistant integration", "Automated energy management"] },
      { title: "Elegant Security", description: "Discreet yet powerful security systems with smart locks, cameras, and visitor management.", benefits: ["Smart video doorbell", "Discrete IP cameras", "Remote access monitoring"] }
    ],
    faqs: [
      { question: "What's the difference between apartment and villa packages?", answer: "Apartment packages are optimized for compact spaces with fewer zones but the same premium technology. They focus on efficiency and seamless integration without the complexity of multi-floor systems." },
      { question: "Do I need to modify my apartment for installation?", answer: "Most apartment solutions use wireless or minimally invasive technology. We work within existing infrastructure to deliver maximum automation with minimum disruption." },
      { question: "Can I control everything from my phone?", answer: "Yes. Every package includes a mobile app that gives you full control of lighting, climate, security, and entertainment from anywhere in the world." }
    ],
    brands: ["Control4", "Sonos", "Lutron", "Philips Hue", "Samsung", "Ring", "Nest", "Apple HomeKit"]
  },
  "developer-studio-apartments": {
    feature_cards: [
      { title: "Studio Essentials", description: "Core smart features that transform compact spaces — lighting scenes, climate control, and security basics.", benefits: ["Pre-programmed light scenes", "Smart thermostat control", "Compact security system"] },
      { title: "Developer Bulk Solutions", description: "Standardized packages optimized for multi-unit deployment with consistent quality across all units.", benefits: ["Scalable across buildings", "Centralized management", "Uniform quality standards"] },
      { title: "Resident Experience", description: "Modern amenities that attract tenants and increase property value with minimal per-unit investment.", benefits: ["App-based unit control", "Energy monitoring", "Smart access systems"] }
    ],
    faqs: [
      { question: "What's included in the studio apartment package?", answer: "Essential smart lighting (mood scenes), climate control, smart lock, and a basic security camera — all controlled via a mobile app." },
      { question: "What volume discounts are available?", answer: "We offer 15-25% discounts for projects of 10+ units. Contact us for a custom multi-unit pricing proposal." }
    ],
    brands: ["Tuya", "Sonoff", "Philips Hue", "Yale", "Ring", "Nest"]
  },
  "developer-1br-apartments": {
    feature_cards: [
      { title: "Comfort Automation", description: "Smart lighting and climate designed for one-bedroom living — bedroom and living room zones with independent control.", benefits: ["Bedroom sleep scenes", "Living room entertainment mode", "Automated morning routines"] },
      { title: "Smart Security", description: "Comprehensive entry security with smart lock, video doorbell, and optional indoor camera.", benefits: ["Keyless smart lock entry", "Video intercom system", "Remote visitor management"] },
      { title: "Energy Intelligence", description: "Smart monitoring and automated schedules that reduce energy consumption and utility costs.", benefits: ["Real-time energy dashboard", "Automated AC scheduling", "Occupancy-based lighting"] }
    ],
    faqs: [
      { question: "Can residents customize their smart home after handover?", answer: "Yes. Our systems are designed to be resident-friendly with easy customization through the mobile app. Additional features can be added anytime." },
      { question: "How does the bulk pricing work for developers?", answer: "We provide tiered pricing based on unit count. The more units, the better the per-unit rate. We also handle all installation logistics." }
    ],
    brands: ["Control4", "Sonoff", "Philips Hue", "Yale", "Ring", "Google Nest"]
  },
  "developer-2br-apartments": {
    feature_cards: [
      { title: "Multi-Zone Living", description: "Independent zone control for bedrooms, living areas, and kitchen — each family member gets their preferred settings.", benefits: ["Per-room temperature control", "Individual lighting preferences", "Quiet hours automation"] },
      { title: "Family Entertainment", description: "Distributed audio and smart TV integration for seamless entertainment across living spaces.", benefits: ["Multi-room audio system", "Smart TV integration", "Voice-controlled content"] },
      { title: "Complete Security", description: "Full-coverage security with cameras, sensors, and smart access designed for family safety.", benefits: ["Motion-detecting cameras", "Window/door sensors", "Childproofing automation"] }
    ],
    faqs: [
      { question: "What makes the 2BR package different from the 1BR?", answer: "The 2BR package includes additional zone controls for the second bedroom, expanded security coverage, and multi-room audio capability. It's designed for families with more diverse automation needs." },
      { question: "Is the system child-friendly?", answer: "Absolutely. We include features like automated night lights, restricted access controls, and simplified interfaces that are safe for families with children." }
    ],
    brands: ["Control4", "Sonos", "Lutron Caseta", "Yale", "Hikvision", "Google Nest"]
  },
  "developer-3br-apartments": {
    feature_cards: [
      { title: "Premium Family Living", description: "Comprehensive automation across all bedrooms, living areas, and utility spaces for the ultimate family experience.", benefits: ["5+ independent climate zones", "Personalized room scenes", "Master suite automation"] },
      { title: "Entertainment Hub", description: "Home theater capability, distributed audio, and gaming-ready infrastructure for modern family entertainment.", benefits: ["Home cinema setup", "Whole-home audio", "Gaming room integration"] },
      { title: "Advanced Security", description: "Enterprise-level security with AI cameras, multiple access points, and comprehensive monitoring.", benefits: ["AI-powered surveillance", "Multiple entry smart locks", "24/7 monitoring options"] }
    ],
    faqs: [
      { question: "Can each bedroom have different settings?", answer: "Yes. Each bedroom operates as an independent zone with its own climate, lighting, and entertainment controls. Family members can set personal preferences through the app." },
      { question: "Does this package include home cinema capabilities?", answer: "The Enhanced and High-End tiers include home cinema-ready living rooms with projector support, surround sound, and automated blackout blinds." }
    ],
    brands: ["Control4", "Crestron", "Sonos", "Lutron", "Samsung", "Hikvision", "Yale", "Google Nest"]
  }
};

let updated = 0;
for (const [slug, data] of Object.entries(packageEnrichments)) {
  const result = db.property_packages.updateOne(
    { slug: slug },
    { $set: data }
  );
  if (result.modifiedCount > 0) updated++;
  print(`Updated ${slug}: ${result.modifiedCount > 0 ? 'OK' : 'no change'}`);
}
print(`\nTotal packages enriched: ${updated}/7`);

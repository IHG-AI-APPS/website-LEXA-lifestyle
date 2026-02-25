// Seed locations collection with content from static pages
const db = db.getSiblingDB(process.env.DB_NAME || 'lexa_lifestyle');

// Drop existing if any
db.locations.drop();

const locations = [
  {
    id: "loc-palm-jumeirah",
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    title: "Smart Home Automation Palm Jumeirah",
    region: "Dubai",
    description: "Luxury villa automation for Dubai's iconic island. Specialized systems for beachfront properties with 24/7 local support.",
    long_description: "Palm Jumeirah represents the pinnacle of luxury waterfront living in Dubai. Our smart home solutions are specifically engineered for the unique challenges and opportunities of island properties — salt-air resistant systems, outdoor entertainment integration, and yacht connectivity. With over 50 successful installations across fronds and the crescent, LEXA is the trusted automation partner for Palm Jumeirah residents.",
    hero_image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=1920",
    features: [
      "Beachfront villa automation specialists",
      "Salt-air resistant systems",
      "Outdoor entertainment integration",
      "Pool and garden automation",
      "Yacht integration capabilities",
      "Premium security for waterfront properties"
    ],
    related_solutions: ["home-cinema", "outdoor-living", "security", "lighting-automation", "marine-audio", "smart-lifestyle"],
    feature_cards: [
      { title: "Waterfront Living", description: "Systems engineered for the marine environment with corrosion-resistant components and UV-stable outdoor solutions.", benefits: ["Marine-grade equipment", "Salt-air protection", "Outdoor-rated automation"] },
      { title: "Villa Entertainment", description: "Luxury entertainment suites with ocean views, rooftop cinemas, and pool-side audio systems.", benefits: ["Beachfront cinema rooms", "Pool-side audio", "Rooftop entertainment"] },
      { title: "Island Security", description: "Comprehensive security for waterfront properties including marine access, CCTV, and smart perimeters.", benefits: ["Marine perimeter detection", "AI-powered cameras", "Smart gate access"] }
    ],
    faqs: [
      { question: "Do your systems withstand the salt air on Palm Jumeirah?", answer: "Yes. We exclusively use marine-grade and IP-rated equipment for exterior installations. All outdoor speakers, cameras, and control points are specifically rated for coastal environments." },
      { question: "Can you integrate with my yacht systems?", answer: "Absolutely. We provide seamless connectivity between your villa and yacht automation systems, allowing unified control of both environments from a single app." },
      { question: "How many Palm Jumeirah villas have you automated?", answer: "We have completed over 50 installations across Palm Jumeirah, including villas on the fronds, apartments on the trunk, and signature properties on the crescent." },
      { question: "Do you provide same-day support for Palm Jumeirah?", answer: "Yes. Our dedicated Palm Jumeirah service team provides same-day response for priority support tickets, with a local technician available within 2 hours." }
    ],
    brands: ["Crestron", "Control4", "Lutron", "Sonos", "Axis", "Hikvision", "Samsung"],
    seo_title: "Smart Home Automation Palm Jumeirah | Luxury Villa Integration Dubai",
    seo_description: "Premium smart home automation for Palm Jumeirah villas. KNX, Control4, Crestron systems. 24/7 support.",
    display_order: 1
  },
  {
    id: "loc-emirates-hills",
    slug: "emirates-hills",
    name: "Emirates Hills",
    title: "Smart Home Automation Emirates Hills",
    region: "Dubai",
    description: "Bespoke automation for Dubai's most exclusive gated community. Premium KNX and Crestron installations for ultra-luxury estates.",
    long_description: "Emirates Hills is home to Dubai's most discerning homeowners, with villas ranging from 15,000 to 50,000+ sq ft. Our team specializes in the complex multi-building orchestration required for these expansive estates — coordinating staff quarters, guest houses, pool houses, and main residences into a single intelligent ecosystem. We are the preferred automation partner for Emirates Hills' most prestigious addresses.",
    hero_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=85&w=1920",
    features: [
      "Ultra-luxury villa specialists",
      "Estate-wide integration (15,000+ sq ft)",
      "Multi-building coordination",
      "Golf course view automation",
      "VIP-level security systems",
      "Dedicated 24/7 concierge support"
    ],
    related_solutions: ["smart-residential-living", "home-cinema", "security", "lighting-automation", "climate-control", "smart-lifestyle"],
    feature_cards: [
      { title: "Estate Orchestration", description: "Unified control across main villa, guest house, staff quarters, and outdoor facilities — all from one interface.", benefits: ["Multi-building integration", "Staff quarter automation", "Guest house control"] },
      { title: "Ultra-Luxury Cinema", description: "Reference-grade home theaters with Dolby Atmos, 4K laser projection, and acoustic room treatment.", benefits: ["Dolby Atmos 9.4.6", "4K laser projection", "Acoustic engineering"] },
      { title: "Estate Security", description: "Enterprise-grade security with AI analytics, license plate recognition, and 24/7 monitoring integration.", benefits: ["AI perimeter detection", "License plate recognition", "Panic room systems"] }
    ],
    faqs: [
      { question: "Can you automate a 30,000+ sq ft estate?", answer: "Yes. We have extensive experience with large estates in Emirates Hills. Our systems scale seamlessly across multiple buildings, floors, and outdoor zones using enterprise-grade networking infrastructure." },
      { question: "Do you work with Crestron and KNX?", answer: "We are certified Crestron and KNX integrators. For Emirates Hills estates, we typically recommend Crestron for its enterprise-level control capabilities and reliability at scale." },
      { question: "Can you coordinate with my architect and interior designer?", answer: "Absolutely. Early coordination is key for ultra-luxury projects. We integrate with your design team from day one to ensure seamless blending of technology with aesthetics." }
    ],
    brands: ["Crestron", "KNX", "Lutron", "Savant", "Bang & Olufsen", "Axis", "Sony", "Samsung"],
    seo_title: "Smart Home Automation Emirates Hills | Ultra-Luxury Villa Integration Dubai",
    seo_description: "Bespoke automation for Emirates Hills villas. KNX, Crestron ultra-luxury installations.",
    display_order: 2
  },
  {
    id: "loc-downtown-dubai",
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    title: "Smart Home Automation Downtown Dubai",
    region: "Dubai",
    description: "Sophisticated penthouse and apartment automation for Dubai's urban center. Seamless integration with high-rise living.",
    long_description: "Downtown Dubai's iconic skyline demands smart home solutions that complement modern high-rise living. From Burj Khalifa residences to Boulevard Point penthouses, we specialize in maximizing comfort and convenience within the architectural constraints of tower living. Our wireless-first approach ensures minimal disruption while delivering premium automation experiences.",
    hero_image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=85&w=1920",
    features: [
      "High-rise penthouse specialists",
      "Wireless-first solutions",
      "Panoramic view shading control",
      "Building integration (HVAC, access)",
      "Smart concierge systems",
      "Minimal disruption installation"
    ],
    related_solutions: ["smart-residential-living", "lighting-automation", "motorized-shades", "climate-control", "security", "audio-systems"],
    feature_cards: [
      { title: "Tower Living", description: "Automation designed for high-rise environments — building integration, wireless control, and minimal infrastructure.", benefits: ["Building HVAC integration", "Wireless system design", "Non-invasive installation"] },
      { title: "Panoramic Views", description: "Automated shading that responds to sun position, time of day, and your preferences for Burj views.", benefits: ["Sun-tracking blinds", "Automated scene transitions", "Glare-free living"] },
      { title: "Urban Security", description: "Smart access, visitor management, and monitoring tailored for premium apartment and penthouse living.", benefits: ["Building access integration", "Video intercom", "Package delivery alerts"] }
    ],
    faqs: [
      { question: "Can smart homes be installed in existing apartments?", answer: "Yes. Our wireless solutions (Lutron, Control4) can be installed in existing apartments with minimal disruption — no rewiring needed." },
      { question: "Do you integrate with building management systems?", answer: "We integrate with most Downtown Dubai building BMS systems for centralized HVAC, access control, and intercom functionality." }
    ],
    brands: ["Control4", "Lutron", "Sonos", "Samsung", "Ring", "Nest", "Apple HomeKit"],
    seo_title: "Smart Home Automation Downtown Dubai | Penthouse & Apartment Integration",
    seo_description: "Smart home automation for Downtown Dubai penthouses and apartments. Wireless solutions, panoramic view control.",
    display_order: 3
  },
  {
    id: "loc-dubai-hills",
    slug: "dubai-hills",
    name: "Dubai Hills Estate",
    title: "Smart Home Automation Dubai Hills Estate",
    region: "Dubai",
    description: "Family-friendly smart home automation for Dubai Hills Estate villas. Modern, reliable, and beautifully integrated.",
    long_description: "Dubai Hills Estate represents modern family living at its finest. Our automation solutions are designed for the contemporary villa lifestyle — child-friendly interfaces, garden and pool automation, and energy-efficient systems that keep your family comfortable year-round. From 3-bedroom homes to expansive mansions, we tailor every system to your family's needs.",
    hero_image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1920",
    features: [
      "Family-friendly smart home design",
      "Garden and pool automation",
      "Child-safe system interfaces",
      "Energy-efficient climate control",
      "Home office automation",
      "Reliable WiFi for modern families"
    ],
    related_solutions: ["smart-residential-living", "lighting-automation", "climate-control", "security", "outdoor-living", "networking"],
    feature_cards: [
      { title: "Family Living", description: "Systems designed for real family life — simple interfaces, child safety features, and room-by-room personalization.", benefits: ["Kid-friendly controls", "Homework lighting scenes", "Bedtime automation"] },
      { title: "Garden & Outdoors", description: "Smart irrigation, pool heating, outdoor lighting, and BBQ area automation for the Dubai Hills lifestyle.", benefits: ["Automated irrigation", "Pool temperature control", "Outdoor entertainment"] },
      { title: "Energy Smart", description: "Intelligent climate and lighting that reduce energy costs while keeping every room at the perfect temperature.", benefits: ["30% energy savings", "Solar integration ready", "Smart scheduling"] }
    ],
    faqs: [
      { question: "Are smart homes suitable for families with young children?", answer: "Absolutely. We design child-safe interfaces, automatic night lights, room monitoring, and simple controls that even kids can use safely." },
      { question: "Can I automate my garden irrigation?", answer: "Yes. We integrate smart irrigation with weather data to optimize watering schedules, saving water and keeping your garden healthy." }
    ],
    brands: ["Control4", "Sonos", "Lutron Caseta", "Philips Hue", "Ring", "Nest", "Daikin"],
    seo_title: "Smart Home Automation Dubai Hills | Family Villa Integration",
    seo_description: "Family-friendly automation for Dubai Hills Estate villas.",
    display_order: 4
  },
  {
    id: "loc-jumeirah-golf-estates",
    slug: "jumeirah-golf-estates",
    name: "Jumeirah Golf Estates",
    title: "Smart Home Automation Jumeirah Golf Estates",
    region: "Dubai",
    description: "Premium villa automation for Jumeirah Golf Estates. Golf course living with intelligent home technology.",
    long_description: "Jumeirah Golf Estates combines world-class golf with luxury residential living. Our automation solutions enhance this unique lifestyle with golf-course-view optimization, outdoor entertainment systems, and whole-home integration that matches the premium standard of JGE communities. From Earth to Fire, we serve all JGE neighborhoods.",
    hero_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1920",
    features: [
      "Golf estate villa specialists",
      "Course-view optimization",
      "Outdoor entertainment systems",
      "Community integration",
      "Premium networking",
      "Landscape lighting automation"
    ],
    related_solutions: ["smart-residential-living", "outdoor-living", "lighting-automation", "audio-systems", "security", "climate-control"],
    feature_cards: [
      { title: "Golf Estate Living", description: "Automation that enhances the golf lifestyle — from course-view shading to outdoor entertaining spaces.", benefits: ["View-optimized shading", "Outdoor AV systems", "Landscape lighting"] },
      { title: "Whole-Home Control", description: "Unified smart home systems covering lighting, climate, audio, and security across all living spaces.", benefits: ["Single-app control", "Voice automation", "Scene management"] },
      { title: "Premium Networking", description: "Enterprise-grade WiFi covering villa interiors, gardens, and pool areas for seamless connectivity.", benefits: ["Full outdoor coverage", "100+ device support", "Streaming-grade WiFi"] }
    ],
    faqs: [
      { question: "Do you serve all JGE sub-communities?", answer: "Yes. We work across all Jumeirah Golf Estates communities including Earth, Fire, Flame, and Lime Tree Valley." },
      { question: "Can outdoor systems withstand Dubai's heat?", answer: "All our outdoor installations use heat-rated and UV-resistant equipment designed specifically for the Gulf climate." }
    ],
    brands: ["Control4", "Sonos", "Lutron", "Samsung", "Hikvision", "Cisco Meraki"],
    seo_title: "Smart Home Automation Jumeirah Golf Estates | Premium Villa Integration",
    seo_description: "Premium villa automation for Jumeirah Golf Estates. Golf course living with intelligent technology.",
    display_order: 5
  },
  {
    id: "loc-abu-dhabi",
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    title: "Smart Home Automation Abu Dhabi",
    region: "Abu Dhabi",
    description: "Premium smart home solutions across Abu Dhabi. From Saadiyat Island villas to Al Reem Island towers, we cover the capital.",
    long_description: "Abu Dhabi's diverse residential landscape demands versatile automation expertise. From the cultural district of Saadiyat Island to the modern towers of Al Reem and the waterfront luxury of Yas Island, LEXA delivers premium smart home solutions across the entire emirate. Our Abu Dhabi team provides local expertise, rapid response times, and deep understanding of the capital's unique architectural styles.",
    hero_image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=85&w=1920",
    features: [
      "Abu Dhabi-wide coverage",
      "Saadiyat Island specialists",
      "Al Reem Island high-rise experts",
      "Yas Island waterfront automation",
      "Arabic-heritage design integration",
      "Local support team in Abu Dhabi"
    ],
    related_solutions: ["smart-residential-living", "lighting-automation", "climate-control", "security", "home-cinema", "smart-lifestyle"],
    feature_cards: [
      { title: "Capital Coverage", description: "Dedicated Abu Dhabi team covering all major communities — Saadiyat, Al Reem, Yas Island, and beyond.", benefits: ["Same-day service", "Local warehouse", "Abu Dhabi showroom"] },
      { title: "Heritage & Modern", description: "Solutions that respect traditional Arabic design while integrating cutting-edge smart technology.", benefits: ["Concealed technology", "Heritage-sensitive design", "Modern control interfaces"] },
      { title: "Climate Mastery", description: "Advanced climate control optimized for Abu Dhabi's extreme temperatures and unique architectural features.", benefits: ["Desert-optimized HVAC", "Solar glare management", "Energy efficiency"] }
    ],
    faqs: [
      { question: "Do you have a physical presence in Abu Dhabi?", answer: "Yes. We have a dedicated Abu Dhabi team with local warehouse and service center, ensuring rapid response times and same-day support." },
      { question: "Can you work with Arabic-style villa architecture?", answer: "Absolutely. We have extensive experience integrating modern automation into traditional Arabic architectural styles, with concealed technology that preserves the aesthetic integrity." }
    ],
    brands: ["Crestron", "Control4", "KNX", "Lutron", "Sonos", "Axis", "Samsung", "Daikin"],
    seo_title: "Smart Home Automation Abu Dhabi | Villa & Apartment Integration",
    seo_description: "Premium smart home solutions across Abu Dhabi. Saadiyat Island, Al Reem, Yas Island coverage.",
    display_order: 6
  },
  {
    id: "loc-sharjah",
    slug: "sharjah",
    name: "Sharjah",
    title: "Smart Home Automation Sharjah",
    region: "Sharjah",
    description: "Affordable yet premium smart home solutions for Sharjah residences. Value-driven automation without compromise.",
    long_description: "Sharjah's growing residential communities deserve smart home technology that's both premium and value-driven. We offer cost-effective automation packages that don't compromise on quality — from Al Mamzar villas to University City apartments. Our Sharjah solutions focus on practical automation that enhances daily living, improves security, and reduces energy costs.",
    hero_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=85&w=1920",
    features: [
      "Cost-effective premium automation",
      "Al Mamzar & Al Nahda coverage",
      "University City solutions",
      "Family villa packages",
      "Energy cost reduction focus",
      "Arabic interface support"
    ],
    related_solutions: ["smart-residential-living", "lighting-automation", "security", "climate-control", "networking", "smart-lifestyle"],
    feature_cards: [
      { title: "Value-Driven Smart Home", description: "Premium automation at competitive pricing — delivering the best value for Sharjah homeowners.", benefits: ["Competitive pricing", "No compromise on quality", "Scalable systems"] },
      { title: "Family Security", description: "Comprehensive security packages designed for Sharjah family homes with monitoring and smart access.", benefits: ["Smart CCTV systems", "Mobile monitoring", "Smart door locks"] },
      { title: "Energy Savings", description: "Smart climate and lighting systems that significantly reduce monthly utility bills.", benefits: ["AC scheduling optimization", "Lighting efficiency", "Usage monitoring"] }
    ],
    faqs: [
      { question: "Are your Sharjah packages more affordable?", answer: "We offer competitive packages optimized for Sharjah's market. Our Essential tier starts from AED 5,000 for apartments, providing core smart home features at accessible pricing." },
      { question: "Do you provide Arabic language interfaces?", answer: "Yes. All our control apps and touchscreen interfaces support full Arabic language, including right-to-left layouts." }
    ],
    brands: ["Control4", "Sonoff", "Philips Hue", "Yale", "Hikvision", "Google Nest", "Tuya"],
    seo_title: "Smart Home Automation Sharjah | Affordable Premium Integration",
    seo_description: "Affordable yet premium smart home solutions for Sharjah residences.",
    display_order: 7
  }
];

db.locations.insertMany(locations);
print(`Seeded ${locations.length} locations successfully`);

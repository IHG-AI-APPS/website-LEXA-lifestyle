// Enrich Specialty Rooms with feature_cards, faqs, brands, related_solutions
const db = db.getSiblingDB(process.env.DB_NAME || 'lexa_lifestyle');

// Category-based enrichments
const categoryData = {
  "Entertainment": {
    brands: ["Control4", "Sonos", "Samsung", "Sony", "JBL", "Bose"],
    related_solutions: ["home-cinema", "audio-systems", "smart-lifestyle"],
    faqs: [
      { question: "What entertainment systems can be integrated?", answer: "We integrate 4K/8K projectors, Dolby Atmos audio, multi-room streaming, gaming systems, and motorized screen solutions — all controlled from a single app." },
      { question: "How much does a specialty entertainment room cost?", answer: "Entertainment rooms range from AED 15,000 to AED 150,000+ depending on the equipment, acoustic treatment, and level of automation required." },
      { question: "Can I add this to an existing room?", answer: "Yes. Most entertainment automation can be retrofitted into existing spaces. We assess acoustics, lighting, and infrastructure during a free consultation." }
    ]
  },
  "Wellness": {
    brands: ["Lutron", "Crestron", "Daikin", "Grohe", "Kohler", "Philips"],
    related_solutions: ["climate-control", "lighting-automation", "smart-lifestyle"],
    faqs: [
      { question: "What wellness features can be automated?", answer: "Spa rooms, saunas, steam rooms, pools, gyms, and meditation spaces — with automated temperature, lighting scenes, aromatherapy, and music." },
      { question: "How does automation improve wellness?", answer: "Circadian lighting supports sleep-wake cycles, automated climate maintains perfect comfort, and one-touch spa scenes eliminate manual adjustments — creating a true luxury wellness experience." },
      { question: "Can pools and jacuzzis be automated?", answer: "Yes. We automate water temperature, filtration schedules, lighting (including underwater), heating, and cover systems — all controllable remotely." }
    ]
  },
  "Lifestyle": {
    brands: ["Control4", "Crestron", "Sub-Zero", "Wolf", "Samsung", "LG"],
    related_solutions: ["smart-lifestyle", "lighting-automation", "climate-control"],
    faqs: [
      { question: "What lifestyle spaces can be automated?", answer: "Wine cellars, bars, game rooms, reading rooms, dressing rooms, and more — with climate control, lighting scenes, and entertainment integration tailored to each space." },
      { question: "How is a wine cellar automated?", answer: "Smart wine cellar automation includes precise temperature and humidity control, UV-filtered lighting, inventory management, and alerts for any environmental changes." },
      { question: "Can I customize scenes for different occasions?", answer: "Absolutely. Every room can have unlimited custom scenes — party mode, relaxation, reading, entertaining — activated by touch, voice, or schedule." }
    ]
  },
  "Security": {
    brands: ["Axis", "Hikvision", "Dahua", "Control4", "2N", "Paxton"],
    related_solutions: ["security", "surveillance", "access-control"],
    faqs: [
      { question: "What security features are included?", answer: "Biometric access, reinforced doors, AI cameras, panic buttons, safe room communication, and integration with monitoring services." },
      { question: "Can a panic room be integrated into the smart home?", answer: "Yes. Safe rooms include independent communication, backup power, camera feeds, and silent alerts — all seamlessly integrated into the main security system." }
    ]
  },
  "Professional": {
    brands: ["Crestron", "Poly", "Shure", "Samsung", "LG", "Epson"],
    related_solutions: ["conference-room-av-systems", "networking", "smart-lifestyle"],
    faqs: [
      { question: "What professional spaces can be automated?", answer: "Home offices, recording studios, video production rooms, and conference spaces — with professional AV, acoustic treatment, lighting, and network infrastructure." },
      { question: "Can I do video conferencing from my home office?", answer: "Yes. We install professional-grade video conferencing with 4K cameras, directional microphones, display integration, and automated lighting for the perfect on-camera appearance." }
    ]
  },
  "Utility": {
    brands: ["Control4", "Schneider Electric", "ABB", "Siemens", "Samsung"],
    related_solutions: ["energy-management", "networking", "smart-lifestyle"],
    faqs: [
      { question: "What utility spaces can be automated?", answer: "Laundry rooms, server rooms, storage, garages, and technical spaces — with smart appliance control, climate monitoring, and security." },
      { question: "Why automate a laundry room?", answer: "Smart laundry automation includes appliance notifications, ventilation control, water leak detection, and scheduling — saving time and preventing damage." }
    ]
  }
};

// Per-room feature cards based on room type
const roomFeatureCards = {
  "game-room": [
    { title: "Immersive Gaming Setup", description: "Multi-screen displays, racing simulators, and VR-ready spaces with dynamic RGB lighting.", benefits: ["Multi-console switching", "Game-synced RGB lighting", "Immersive surround sound"] },
    { title: "Social Entertainment", description: "Tournament-ready setups with streaming capability and comfortable gaming furniture integration.", benefits: ["Stream-ready configuration", "Multiplayer optimization", "Spectator displays"] },
    { title: "Environment Control", description: "Automated climate, soundproofing, and lighting optimized for extended gaming sessions.", benefits: ["Anti-fatigue lighting", "Sound isolation", "Optimal temperature control"] }
  ],
  "home-cinema": [
    { title: "Theater-Grade AV", description: "4K laser projectors, Dolby Atmos 7.2.4 audio, and acoustic room treatment for cinema perfection.", benefits: ["4K HDR projection", "Dolby Atmos immersion", "Acoustic panel treatment"] },
    { title: "Automated Experience", description: "One-button cinema mode: lights dim, blinds close, projector starts, audio calibrates.", benefits: ["Automated scene transitions", "Motorized masking screens", "Ambient lighting control"] },
    { title: "Premium Seating", description: "Tiered seating with built-in haptics, cup holders, and personal controls for each seat.", benefits: ["D-BOX motion seats", "Personal lighting zones", "Integrated controls"] }
  ],
  "wine-cellar": [
    { title: "Precision Climate", description: "Temperature and humidity maintained within ±0.5°C for optimal wine storage conditions.", benefits: ["Dual-zone temperature", "Humidity stabilization", "UV-filtered lighting"] },
    { title: "Smart Inventory", description: "Digital inventory management with barcode scanning, tasting notes, and consumption tracking.", benefits: ["Wine database integration", "Drinking window alerts", "Guest recommendation engine"] },
    { title: "Ambient Experience", description: "Customizable lighting scenes and music for wine tasting events and private enjoyment.", benefits: ["Tasting event scenes", "Display accent lighting", "Background music zones"] }
  ]
};

// Default feature cards for rooms without specific ones
const defaultFeatureCards = [
  { title: "Smart Environment", description: "Intelligent climate, lighting, and audio optimized specifically for this room's unique purpose.", benefits: ["Purpose-built automation", "Customizable scenes", "Energy-efficient operation"] },
  { title: "Seamless Control", description: "Integrated control via touchscreens, mobile app, and voice — unified with your whole-home system.", benefits: ["Unified app control", "Voice activation", "Wall panel access"] },
  { title: "Premium Integration", description: "Professional-grade equipment installed by certified technicians with ongoing support.", benefits: ["Certified installation", "Premium components", "AMC support included"] }
];

// Apply enrichments
let updated = 0;
const rooms = db.specialty_rooms.find({}).toArray();

rooms.forEach(room => {
  const catData = categoryData[room.category] || categoryData["Lifestyle"];
  const featureCards = roomFeatureCards[room.slug] || defaultFeatureCards;
  
  const result = db.specialty_rooms.updateOne(
    { slug: room.slug },
    { 
      $set: { 
        feature_cards: featureCards,
        faqs: catData.faqs,
        brands: catData.brands,
        related_solutions: catData.related_solutions
      } 
    }
  );
  if (result.modifiedCount > 0) updated++;
  print(`Updated ${room.slug} (${room.category}): ${result.modifiedCount > 0 ? 'OK' : 'no change'}`);
});

print(`\nTotal specialty rooms enriched: ${updated}/22`);

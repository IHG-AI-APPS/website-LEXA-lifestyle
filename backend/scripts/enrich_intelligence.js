// Enrich Intelligence Features with feature_cards and faqs (by category)
const db = db.getSiblingDB(process.env.DB_NAME || 'lexa_lifestyle');

// Enrichment templates per category
const categoryEnrichments = {
  "lighting": {
    feature_cards: [
      { title: "Circadian Rhythm Lighting", description: "Lights that automatically adjust color temperature throughout the day to support your natural sleep-wake cycle.", benefits: ["Warm tones in evening", "Energizing daylight mode", "Automated transitions"] },
      { title: "Scene Automation", description: "Pre-programmed lighting scenes for every activity — dining, movie night, entertaining, and relaxation.", benefits: ["One-touch scene activation", "Voice-controlled scenes", "Scheduled automation"] },
      { title: "Energy Optimization", description: "Smart dimming, occupancy sensing, and daylight harvesting that reduce energy consumption by up to 40%.", benefits: ["Occupancy-based dimming", "Daylight harvesting", "Real-time energy tracking"] }
    ],
    faqs: [
      { question: "What types of smart lighting systems do you install?", answer: "We install KNX, Lutron, Control4, DALI, and Philips Hue systems. The choice depends on your property type, existing infrastructure, and desired level of control." },
      { question: "Can smart lighting be retrofitted into existing homes?", answer: "Yes. Wireless solutions like Lutron Caseta and Philips Hue can be installed without rewiring. For new builds, we recommend wired systems for maximum reliability." },
      { question: "How much energy can smart lighting save?", answer: "Smart lighting with occupancy sensors and daylight harvesting typically reduces lighting energy costs by 30-40% compared to traditional systems." }
    ]
  },
  "security": {
    feature_cards: [
      { title: "AI-Powered Surveillance", description: "Advanced cameras with facial recognition, object detection, and behavioral analysis for proactive security.", benefits: ["Facial recognition alerts", "Vehicle detection", "Behavioral anomaly detection"] },
      { title: "Access Control", description: "Multi-layered access with biometrics, smart locks, and visitor management for complete entry security.", benefits: ["Biometric fingerprint access", "Remote lock management", "Visitor pre-authorization"] },
      { title: "24/7 Monitoring", description: "Always-on monitoring with instant alerts, cloud recording, and integration with emergency services.", benefits: ["Real-time push notifications", "Cloud video storage", "Emergency response integration"] }
    ],
    faqs: [
      { question: "Do your security cameras use AI?", answer: "Yes. Our IP cameras feature AI analytics including facial recognition, vehicle detection, intrusion detection, and behavioral anomaly alerts — reducing false alarms by up to 90%." },
      { question: "Can I monitor my home remotely?", answer: "Absolutely. All security systems include mobile app access for live viewing, playback, alert management, and remote lock control from anywhere in the world." },
      { question: "What happens during a power outage?", answer: "All our security systems include UPS backup power, ensuring continuous operation during power outages. Critical systems can run for 4-8 hours on battery." }
    ]
  },
  "climate": {
    feature_cards: [
      { title: "Zone-Based Climate Control", description: "Independent temperature management for every room — each space maintains its perfect comfort level.", benefits: ["Per-room temperature settings", "Automated zone scheduling", "Energy-efficient operation"] },
      { title: "Predictive Climate AI", description: "Machine learning algorithms that anticipate your preferences and pre-condition spaces before you arrive.", benefits: ["Arrival pre-conditioning", "Weather-adaptive control", "Learning schedule patterns"] },
      { title: "Indoor Air Quality", description: "Continuous monitoring and management of CO2, humidity, VOCs, and particulate matter for healthy living.", benefits: ["Real-time IAQ dashboard", "Automated ventilation", "Humidity optimization"] }
    ],
    faqs: [
      { question: "Can smart climate control work with my existing AC?", answer: "Yes. We integrate with all major AC brands including Daikin, Carrier, Trane, and Mitsubishi. Smart thermostats and IR blasters can control existing split and ducted systems." },
      { question: "How much can I save on cooling costs?", answer: "In Dubai's climate, smart climate control typically saves 25-35% on cooling costs through occupancy-based control, scheduling, and optimal temperature management." }
    ]
  },
  "voice_ai": {
    feature_cards: [
      { title: "Multi-Platform Voice Control", description: "Seamless integration with Alexa, Google Assistant, and Siri for natural voice-based home management.", benefits: ["All major voice platforms", "Custom voice commands", "Multi-language support"] },
      { title: "AI Automation Engine", description: "Intelligent automation that learns your routines and proactively adjusts your home environment.", benefits: ["Behavioral learning", "Predictive automation", "Context-aware responses"] },
      { title: "Conversational Control", description: "Natural language processing for complex multi-system commands in a single voice instruction.", benefits: ["Multi-action commands", "Room-aware context", "Guest-friendly interface"] }
    ],
    faqs: [
      { question: "Which voice assistants do you support?", answer: "We support Amazon Alexa, Google Assistant, and Apple Siri/HomeKit. Multi-assistant setups are possible for different rooms or family member preferences." },
      { question: "Is voice control secure?", answer: "Yes. All voice processing happens locally where possible, with encrypted cloud connections for remote commands. Privacy mode can disable voice listening in sensitive areas." }
    ]
  },
  "entertainment": {
    feature_cards: [
      { title: "Home Cinema Excellence", description: "Dedicated cinema rooms with 4K/8K projectors, Dolby Atmos sound, and automated environment control.", benefits: ["4K laser projectors", "Dolby Atmos surround", "Automated blackout scenes"] },
      { title: "Multi-Room Audio", description: "Distributed audio systems that stream music to every room with independent zone control.", benefits: ["Whole-home streaming", "Independent zone volumes", "Outdoor speaker systems"] },
      { title: "Gaming & Immersive", description: "Gaming-optimized setups with low-latency displays, RGB lighting sync, and immersive audio.", benefits: ["Gaming-mode automation", "RGB lighting sync", "Low-latency AV switching"] }
    ],
    faqs: [
      { question: "What's the difference between a media room and a dedicated cinema?", answer: "A media room is a multi-purpose space with high-quality AV, while a dedicated cinema features acoustic treatment, tiered seating, a projection system, and full light control for a true theater experience." },
      { question: "Can I stream from any device to any room?", answer: "Yes. Our multi-room audio systems support AirPlay, Chromecast, Spotify Connect, and HDMI distribution, allowing any source to play in any room." }
    ]
  },
  "network": {
    feature_cards: [
      { title: "Enterprise-Grade WiFi", description: "Commercial-grade wireless coverage that eliminates dead zones and supports 100+ connected devices.", benefits: ["Full property coverage", "100+ device capacity", "Seamless roaming"] },
      { title: "Network Security", description: "Firewall, VLAN segmentation, and IoT isolation that protect your smart home from cyber threats.", benefits: ["IoT device isolation", "Intrusion prevention", "Encrypted communications"] },
      { title: "Remote Management", description: "Cloud-based network monitoring and management for instant troubleshooting and optimization.", benefits: ["Real-time health monitoring", "Remote diagnostics", "Automatic updates"] }
    ],
    faqs: [
      { question: "Why do smart homes need enterprise-grade networking?", answer: "A smart home with 50-200+ IoT devices needs robust networking to ensure reliability. Consumer-grade routers cannot handle the bandwidth, device count, and security requirements of a fully automated home." },
      { question: "Do you provide ongoing network support?", answer: "Yes. Our AMC packages include 24/7 network monitoring, firmware updates, security patches, and priority support for any connectivity issues." }
    ]
  },
  "convenience": {
    feature_cards: [
      { title: "Automated Routines", description: "Morning wake-up, departure, arrival, and bedtime routines that orchestrate multiple systems automatically.", benefits: ["One-button departure mode", "Automated wake-up sequence", "Goodnight scene"] },
      { title: "Smart Scheduling", description: "Time-based and event-triggered automation for blinds, irrigation, appliances, and more.", benefits: ["Calendar-based triggers", "Sunrise/sunset automation", "Geofencing triggers"] },
      { title: "Centralized Control", description: "One app, one interface — manage everything from lighting to security from your phone or wall panel.", benefits: ["Unified mobile app", "Wall-mounted touchscreens", "Apple Watch control"] }
    ],
    faqs: [
      { question: "Can the system run automatically without my input?", answer: "Yes. Once configured, the system runs fully automated routines based on time, occupancy, location, and sensor data. You only intervene when you want to override." },
      { question: "What if the internet goes down?", answer: "All our automation systems include local processing. Scenes, schedules, and sensor-based automation continue to work without internet. Remote access requires connectivity." }
    ]
  },
  "wellness": {
    feature_cards: [
      { title: "Circadian Wellness", description: "Lighting and climate systems that support your body's natural rhythms for better sleep and energy.", benefits: ["Sleep-promoting evening light", "Energizing morning scenes", "Melatonin-friendly warmth"] },
      { title: "Air & Water Quality", description: "Continuous monitoring of indoor air quality, water filtration status, and humidity levels.", benefits: ["CO2 level monitoring", "VOC detection alerts", "Optimal humidity control"] },
      { title: "Spa & Relaxation", description: "Automated spa environments with chromotherapy lighting, aromatherapy, and temperature control.", benefits: ["Chromotherapy integration", "Automated spa scenes", "Temperature-perfect bathrooms"] }
    ],
    faqs: [
      { question: "How does smart lighting improve wellness?", answer: "Circadian lighting mimics natural daylight patterns — cool blue tones during the day for alertness and warm amber tones in the evening to promote melatonin production and better sleep." },
      { question: "Can you automate a home spa or sauna?", answer: "Yes. We integrate steam rooms, saunas, jacuzzis, and spa lighting into the smart home system for one-touch spa experiences with pre-set temperatures and lighting scenes." }
    ]
  }
};

// Default enrichment for categories not specifically defined
const defaultEnrichment = {
  feature_cards: [
    { title: "Smart Integration", description: "Seamless integration with your existing home systems for unified control and automation.", benefits: ["Single-app control", "Cross-system automation", "Easy customization"] },
    { title: "Energy Efficiency", description: "Intelligent monitoring and optimization that reduces energy consumption and costs.", benefits: ["Real-time monitoring", "Automated scheduling", "Usage analytics"] },
    { title: "Premium Experience", description: "Luxury-grade technology that enhances your daily living experience.", benefits: ["Intuitive interfaces", "Voice control ready", "Future-proof design"] }
  ],
  faqs: [
    { question: "How does this feature integrate with my existing systems?", answer: "All our intelligence features are designed to integrate seamlessly with major automation platforms including Control4, Crestron, KNX, and Lutron. We ensure compatibility during the design phase." },
    { question: "What ongoing support is available?", answer: "We offer comprehensive AMC packages with 24/7 support, remote diagnostics, firmware updates, and priority on-site service across the UAE." }
  ]
};

// Apply enrichments by category
const categories = db.intelligence_features.distinct("category");
let totalUpdated = 0;

categories.forEach(cat => {
  const enrichment = categoryEnrichments[cat] || defaultEnrichment;
  const result = db.intelligence_features.updateMany(
    { category: cat, feature_cards: { $exists: false } },
    { $set: { feature_cards: enrichment.feature_cards, faqs: enrichment.faqs } }
  );
  totalUpdated += result.modifiedCount;
  print(`Category "${cat}": enriched ${result.modifiedCount} features`);
});

print(`\nTotal intelligence features enriched: ${totalUpdated}`);

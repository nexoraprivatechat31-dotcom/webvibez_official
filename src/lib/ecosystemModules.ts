export interface AppEcosystemModule {
  id: string;
  moduleNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  metricLabel: string;
  metricValue: string;
  ctaText: string;
  screenKey: "chat" | "college" | "stories" | "feed" | "call" | "vault" | "watch" | "admin";
  accentColor?: string;
}

export const ENZOCHAT_ECOSYSTEM_MODULES: AppEcosystemModule[] = [
  {
    id: "module-01",
    moduleNumber: "01 / 08",
    badge: "Live Engine",
    title: "Real-Time Messaging & Dynamic Chat",
    subtitle: "Sub-Millisecond Encrypted Communication & Dynamic Chat Matrix",
    description: "A lightning-fast conversation engine powered by raw WebSockets, persistent MMKV offline outbox, real-time read receipts, and zero-jank FlashList rendering.",
    capabilities: [
      "Sub-12ms Raw WebSocket Delivery & Persistent Offline Outbox",
      "In-Chat Interactive Polls, Music Cards & Custom Sticker Packs",
      "3-Tier Disappearing Messages (Fixed, View-Once, After-View)"
    ],
    metricLabel: "Real-Time Latency",
    metricValue: "< 12ms",
    ctaText: "Explore Chat Engine",
    screenKey: "chat",
    accentColor: "#0066FF"
  },
  {
    id: "module-02",
    moduleNumber: "02 / 08",
    badge: "Exclusive Campus",
    title: "My College Campus Hub & Peer Directory",
    subtitle: "Campus-Isolated WhatsApp Communities & Student Phonebook",
    description: "An exclusive, verified campus ecosystem featuring a 4-tier branch & year hierarchy, student peer phonebook with skill discovery, and campus-isolated group messaging.",
    capabilities: [
      "4-Tier College Group Hierarchy (Main, Branch, Year Batches, Lounges)",
      "Verified Student Phonebook with Skill Search & Direct 1-Tap Chat",
      "Zero Campus Clutter — 100% Strict Campus Isolation for Students"
    ],
    metricLabel: "Campus Engagement",
    metricValue: "98.4%",
    ctaText: "View Campus Hub",
    screenKey: "college",
    accentColor: "#8B00FF"
  },
  {
    id: "module-03",
    moduleNumber: "03 / 08",
    badge: "Visual Canvas",
    title: "Ephemeral Stories & Interactive Canvas",
    subtitle: "Full-Bleed 60 FPS Visual Stories with Dynamic Overlays",
    description: "A rich media ephemeral storytelling system with normalized 0.0–1.0 coordinate sticker rendering, interactive polls, quizzes, SVG drawing, and fluid gesture navigation.",
    capabilities: [
      "60 FPS Full-Bleed Viewer with Tap Navigation & Hold-to-Pause",
      "Interactive Widgets (Polls, Sliders, Music Stickers, Quizzes)",
      "Multi-Source Friend Story Resolution & Dynamic Duration Sync"
    ],
    metricLabel: "Story Completion",
    metricValue: "94.8%",
    ctaText: "Experience Stories",
    screenKey: "stories",
    accentColor: "#EC4899"
  },
  {
    id: "module-04",
    moduleNumber: "04 / 08",
    badge: "Discovery Feed",
    title: "Social Feed & Infinite Discovery",
    subtitle: "Zero-Frame-Drop Content Network & Smart Media Feed",
    description: "A curated social feed engineered with @shopify/flash-list for smooth 60 FPS infinite scrolling, multi-ratio media carousels, smart user mentions, and real-time engagement telemetry.",
    capabilities: [
      "Zero-Jank 60 FPS Infinite FlashList with Memory Pruning",
      "Rich Media Carousels, Video Feeds & Instant Interaction Sync",
      "Real-Time Post Analytics, Saves & Smart Tagging Engine"
    ],
    metricLabel: "UI Performance",
    metricValue: "60 FPS Locked",
    ctaText: "Browse Social Feed",
    screenKey: "feed",
    accentColor: "#00E5A3"
  },
  {
    id: "module-05",
    moduleNumber: "05 / 08",
    badge: "Hardware WebRTC",
    title: "Ultra-HD Voice & Video Matrix",
    subtitle: "Low-Latency Calling with Native Hardware Audio Routing",
    description: "Enterprise-grade crystal-clear voice and video calling backed by WebRTC peer routing, proximity screen detection, and native Bluetooth/SCO hardware audio switching.",
    capabilities: [
      "Low-Latency WebRTC Multi-Party Video & Voice Conferencing",
      "Native CallAudioRoutingService (Bluetooth SCO / Speaker / Earpiece)",
      "Hardware Proximity Sensor Integration & Auto-Recovery Engine"
    ],
    metricLabel: "Call Reliability",
    metricValue: "99.8%",
    ctaText: "Launch Voice & Video",
    screenKey: "call",
    accentColor: "#38BDF8"
  },
  {
    id: "module-06",
    moduleNumber: "06 / 08",
    badge: "Military Security",
    title: "Zero-Knowledge Encrypted Private Vault",
    subtitle: "Hardware-Backed Client-Side AES-256 Storage & Steganography",
    description: "A zero-knowledge secure enclosure protected by native PBKDF2 key derivation, biometric pattern locks, and client-side AES-GCM encryption for private media and secret chats.",
    capabilities: [
      "Hardware-Accelerated Client-Side AES-256-GCM Encryption",
      "Biometric Pattern Lock, PIN Access & Steganographic Camouflage",
      "Encrypted Local Storage via Native SQLite & MMKV Secure Layer"
    ],
    metricLabel: "Plaintext Exposure",
    metricValue: "0.00%",
    ctaText: "Unlock Secure Vault",
    screenKey: "vault",
    accentColor: "#F59E0B"
  },
  {
    id: "module-07",
    moduleNumber: "07 / 08",
    badge: "Synchronized Live",
    title: "Watch Party & Synchronized Live Media",
    subtitle: "Frame-Accurate Shared Media Theater with Floating Reactions",
    description: "A shared social viewing experience allowing users to stream video together in real-time with sub-50ms websocket synchronization and interactive floating reaction overlays.",
    capabilities: [
      "Sub-50ms Real-Time Playback State Machine Synchronization",
      "Live Floating Emoji Reactions & Real-Time Group Side-Chat",
      "Picture-in-Picture (PiP) Support & Adaptive Buffer Management"
    ],
    metricLabel: "Sync Accuracy",
    metricValue: "< 35ms Drift",
    ctaText: "Start Watch Party",
    screenKey: "watch",
    accentColor: "#A855F7"
  },
  {
    id: "module-08",
    moduleNumber: "08 / 08",
    badge: "Autonomous AI",
    title: "EnzoChatOS & Administrative Command",
    subtitle: "Autonomous Operations Agents & Real-Time Control Cockpit",
    description: "An autonomous operations engine powered by a multi-LLM fallback matrix (DeepSeek / Groq / Gemini), automated student verification lightbox, and live server telemetry.",
    capabilities: [
      "Autonomous AI Ops (Verification, Moderation, Automated Crons)",
      "Web Admin Cockpit with 1-Tap Verification Lightbox Inspection",
      "Multi-LLM Autonomous Agent Pipeline with Instant Fallbacks"
    ],
    metricLabel: "Automation Uptime",
    metricValue: "99.9%",
    ctaText: "Access Admin Cockpit",
    screenKey: "admin",
    accentColor: "#06B6D4"
  }
];

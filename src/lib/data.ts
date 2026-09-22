export interface ShowcaseScreen {
  id: string;
  number: string;
  badge?: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  highlights: string[];
  stats: { label: string; value: string };
  ctaText?: string;
  screenKey?: "chat" | "college" | "stories" | "feed" | "call" | "vault" | "watch" | "admin";
}

export const SHOWCASE_SCREENS: ShowcaseScreen[] = [
  {
    id: "module-01",
    number: "01",
    badge: "Live Engine",
    title: "Real-Time Messaging & Dynamic Chat",
    tagline: "Sub-Millisecond Encrypted Communication & Dynamic Chat Matrix",
    description: "A lightning-fast conversation engine powered by raw WebSockets, persistent MMKV offline outbox, real-time read receipts, and zero-jank FlashList rendering.",
    accentColor: "#0066FF",
    highlights: [
      "Sub-12ms Raw WebSocket Delivery & Persistent Offline Outbox",
      "In-Chat Interactive Polls, Music Cards & Custom Sticker Packs",
      "3-Tier Disappearing Messages (Fixed, View-Once, After-View)"
    ],
    stats: { label: "Real-Time Latency", value: "< 12ms" },
    ctaText: "Explore Chat Engine",
    screenKey: "chat"
  },
  {
    id: "module-02",
    number: "02",
    badge: "Exclusive Campus",
    title: "My College Campus Hub & Peer Directory",
    tagline: "Campus-Isolated WhatsApp Communities & Student Phonebook",
    description: "An exclusive, verified campus ecosystem featuring a 4-tier branch & year hierarchy, student peer phonebook with skill discovery, and campus-isolated group messaging.",
    accentColor: "#8B00FF",
    highlights: [
      "4-Tier College Group Hierarchy (Main, Branch, Year Batches, Lounges)",
      "Verified Student Phonebook with Skill Search & Direct 1-Tap Chat",
      "Zero Campus Clutter — 100% Strict Campus Isolation for Students"
    ],
    stats: { label: "Campus Engagement", value: "98.4%" },
    ctaText: "View Campus Hub",
    screenKey: "college"
  },
  {
    id: "module-03",
    number: "03",
    badge: "Visual Canvas",
    title: "Ephemeral Stories & Interactive Canvas",
    tagline: "Full-Bleed 60 FPS Visual Stories with Dynamic Overlays",
    description: "A rich media ephemeral storytelling system with normalized 0.0–1.0 coordinate sticker rendering, interactive polls, quizzes, SVG drawing, and fluid gesture navigation.",
    accentColor: "#EC4899",
    highlights: [
      "60 FPS Full-Bleed Viewer with Tap Navigation & Hold-to-Pause",
      "Interactive Widgets (Polls, Sliders, Music Stickers, Quizzes)",
      "Multi-Source Friend Story Resolution & Dynamic Duration Sync"
    ],
    stats: { label: "Story Completion", value: "94.8%" },
    ctaText: "Experience Stories",
    screenKey: "stories"
  },
  {
    id: "module-04",
    number: "04",
    badge: "Discovery Feed",
    title: "Social Feed & Infinite Discovery",
    tagline: "Zero-Frame-Drop Content Network & Smart Media Feed",
    description: "A curated social feed engineered with @shopify/flash-list for smooth 60 FPS infinite scrolling, multi-ratio media carousels, smart user mentions, and real-time engagement telemetry.",
    accentColor: "#00E5A3",
    highlights: [
      "Zero-Jank 60 FPS Infinite FlashList with Memory Pruning",
      "Rich Media Carousels, Video Feeds & Instant Interaction Sync",
      "Real-Time Post Analytics, Saves & Smart Tagging Engine"
    ],
    stats: { label: "UI Performance", value: "60 FPS Locked" },
    ctaText: "Browse Social Feed",
    screenKey: "feed"
  },
  {
    id: "module-05",
    number: "05",
    badge: "Hardware WebRTC",
    title: "Ultra-HD Voice & Video Matrix",
    tagline: "Low-Latency Calling with Native Hardware Audio Routing",
    description: "Enterprise-grade crystal-clear voice and video calling backed by WebRTC peer routing, proximity screen detection, and native Bluetooth/SCO hardware audio switching.",
    accentColor: "#38BDF8",
    highlights: [
      "Low-Latency WebRTC Multi-Party Video & Voice Conferencing",
      "Native CallAudioRoutingService (Bluetooth SCO / Speaker / Earpiece)",
      "Hardware Proximity Sensor Integration & Auto-Recovery Engine"
    ],
    stats: { label: "Call Reliability", value: "99.8%" },
    ctaText: "Launch Voice & Video",
    screenKey: "call"
  },
  {
    id: "module-06",
    number: "06",
    badge: "Military Security",
    title: "Zero-Knowledge Encrypted Private Vault",
    tagline: "Hardware-Backed Client-Side AES-256 Storage & Steganography",
    description: "A zero-knowledge secure enclosure protected by native PBKDF2 key derivation, biometric pattern locks, and client-side AES-GCM encryption for private media and secret chats.",
    accentColor: "#F59E0B",
    highlights: [
      "Hardware-Accelerated Client-Side AES-256-GCM Encryption",
      "Biometric Pattern Lock, PIN Access & Steganographic Camouflage",
      "Encrypted Local Storage via Native SQLite & MMKV Secure Layer"
    ],
    stats: { label: "Plaintext Exposure", value: "0.00%" },
    ctaText: "Unlock Secure Vault",
    screenKey: "vault"
  },
  {
    id: "module-07",
    number: "07",
    badge: "Synchronized Live",
    title: "Watch Party & Synchronized Live Media",
    tagline: "Frame-Accurate Shared Media Theater with Floating Reactions",
    description: "A shared social viewing experience allowing users to stream video together in real-time with sub-50ms websocket synchronization and interactive floating reaction overlays.",
    accentColor: "#A855F7",
    highlights: [
      "Sub-50ms Real-Time Playback State Machine Synchronization",
      "Live Floating Emoji Reactions & Real-Time Group Side-Chat",
      "Picture-in-Picture (PiP) Support & Adaptive Buffer Management"
    ],
    stats: { label: "Sync Accuracy", value: "< 35ms Drift" },
    ctaText: "Start Watch Party",
    screenKey: "watch"
  },
  {
    id: "module-08",
    number: "08",
    badge: "Autonomous AI",
    title: "EnzoChatOS & Administrative Command",
    tagline: "Autonomous Operations Agents & Real-Time Control Cockpit",
    description: "An autonomous operations engine powered by a multi-LLM fallback matrix (DeepSeek / Groq / Gemini), automated student verification lightbox, and live server telemetry.",
    accentColor: "#06B6D4",
    highlights: [
      "Autonomous AI Ops (Verification, Moderation, Automated Crons)",
      "Web Admin Cockpit with 1-Tap Verification Lightbox Inspection",
      "Multi-LLM Autonomous Agent Pipeline with Instant Fallbacks"
    ],
    stats: { label: "Automation Uptime", value: "99.9%" },
    ctaText: "Access Admin Cockpit",
    screenKey: "admin"
  }
];

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
}

export const ENZOCHAT_ECOSYSTEM_MODULES: AppEcosystemModule[] = SHOWCASE_SCREENS.map((s) => ({
  id: s.id,
  moduleNumber: `${s.number} / 08`,
  badge: s.badge || "Live Engine",
  title: s.title,
  subtitle: s.tagline,
  description: s.description,
  capabilities: s.highlights,
  metricLabel: s.stats.label,
  metricValue: s.stats.value,
  ctaText: s.ctaText || "Explore Module",
  screenKey: s.screenKey || "chat",
}));

export const FEATURES_LIST = [
  {
    id: "student-management",
    name: "Student Management",
    category: "Administration",
    short: "Complete lifecycle tracking from inquiry to alumni.",
    details: "Centralize student records, batch assignments, guardian contacts, previous academic history, and document vaults in a secure, searchable directory."
  },
  {
    id: "attendance",
    name: "Attendance System",
    category: "Operations",
    short: "Biometric and digital QR attendance with instant notifications.",
    details: "Instant roll call logs, automated daily SMS alerts to parents if students are absent, and monthly attendance percentage thresholds."
  },
  {
    id: "online-tests",
    name: "Online Tests Engine",
    category: "Academics",
    short: "NTA-grade online testing with timed sections and anti-cheat.",
    details: "Supports objective MCQ, numerical type, and subjective questions with negative marking, question scrambling, and comprehensive answer keys."
  },
  {
    id: "results",
    name: "Results & Analytics",
    category: "Academics",
    short: "Micro-level topic analysis and automated report cards.",
    details: "Identify exactly which concepts students stumble on. Generate shareable graphical report cards with comparative batch percentiles."
  },
  {
    id: "fees",
    name: "Fee Collection & Invoicing",
    category: "Finance",
    short: "Frictionless UPI Payments & Automated Receipts.",
    details: "No more awkward reminder phone calls. Send automated WhatsApp fee payment links with direct UPI, NetBanking, and credit card support. Instant GST-compliant receipts delivered automatically."
  },
  {
    id: "study-material",
    name: "Study Material & Notes",
    category: "Content",
    short: "DRM-protected digital library with dynamic student watermarking.",
    details: "Upload notes, formula sheets, and mock tests with user-specific watermark overlays to prevent unauthorized piracy and file sharing."
  },
  {
    id: "notifications",
    name: "Broadcast Notifications",
    category: "Communication",
    short: "Batch-wise push alerts and emergency notifications.",
    details: "Direct communication channel that students actually read. Filter alerts by branch, target exam year, or specific batches."
  },
  {
    id: "live-classes",
    name: "Live Classes & Streaming",
    category: "Classroom",
    short: "Encrypted HD video streaming with live doubt resolution.",
    details: "Interactive live classrooms without external links. Enable live chat, screen sharing, and auto-archived recordings."
  },
  {
    id: "assignments",
    name: "Assignments & Homework",
    category: "Academics",
    short: "Digital submission, teacher remarks, and deadline tracking.",
    details: "Students photograph handwritten work or upload digital assignments. Faculty annotates and assigns marks directly in the app."
  },
  {
    id: "teacher-dashboard",
    name: "Teacher Dashboard",
    category: "Faculty",
    short: "Dedicated portal for marks entry, lecture planning, and doubt logs.",
    details: "Faculty can take rapid attendance, create quick chapter tests, view class performance trends, and answer student doubt requests."
  },
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    category: "Leadership",
    short: "Executive birds-eye view of revenue, admissions, and faculty hours.",
    details: "Complete institutional visibility. Track multiple branches, revenue metrics, admission conversions, and staff utilization in one interface."
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    timeline: "Day 1",
    description: "Share your coaching centre's identity, target courses (JEE, NEET, UPSC, K-12, Commerce), batch structures, and custom feature wishlist.",
    deliverable: "Custom Platform Architecture & UI Blueprint"
  },
  {
    step: "02",
    title: "We build your platform",
    timeline: "Days 2 – 7",
    description: "Our engineering team deploys your production-grade mobile app (Android & iOS) and web portal, styled precisely with your institute's logo, colors, and curriculum.",
    deliverable: "Private App Store Staging & Admin Control Panel"
  },
  {
    step: "03",
    title: "Launch your coaching app",
    timeline: "Day 8 & Beyond",
    description: "Go live to hundreds or thousands of students with zero server maintenance hassle. We handle cloud scaling, security patches, and ongoing tech support.",
    deliverable: "Official App Store Deployment & Dedicated Account Manager"
  }
];

export const BRAND_VARIANTS = [
  {
    id: "generic",
    name: "Generic Education App",
    subtitle: "What most coaching centres get stuck with",
    brandName: "EdLearn Pro v1.2",
    tagline: "Generic SaaS template with someone else's logo",
    bgGradient: "from-slate-900 to-slate-950",
    deviceColor: "#27272a",
    primaryAccent: "#64748b",
    accentLight: "#94a3b8",
    logoText: "ED",
    statusText: "Cookie-cutter experience",
    description: "Your students see generic branding, generic layouts, and confusing menus. No brand loyalty is created.",
    features: [
      "Third-party vendor branding everywhere",
      "Cluttered interfaces confusing parents",
      "No control over student communication",
      "Your institute looks like just another batch"
    ]
  },
  {
    id: "webvibez-core",
    name: "WebVibez Engine",
    subtitle: "The high-performance technological core",
    brandName: "WebVibez Flagship",
    tagline: "The modern digital campus engine",
    bgGradient: "from-blue-950/40 via-black to-black",
    deviceColor: "#0f172a",
    primaryAccent: "#5B8CFF",
    accentLight: "#7AA2FF",
    logoText: "WV",
    statusText: "Architectural Precision",
    description: "Our proprietary high-speed mobile and cloud architecture powering instantaneous tests, video security, and real-time synchronization.",
    features: [
      "Sub-second sync across mobile and web",
      "Enterprise encryption & anti-piracy DRM",
      "Integrated UPI zero-friction checkout",
      "99.98% guaranteed cloud uptime"
    ]
  },
  {
    id: "branded-institute",
    name: "Your Branded Platform",
    subtitle: "What your students and parents experience",
    brandName: "Apex Medical & IIT Academy",
    tagline: "Empowering 2,400+ Future Rankers",
    bgGradient: "from-emerald-950/40 via-black to-black",
    deviceColor: "#064e3b",
    primaryAccent: "#FF9A6B",
    accentLight: "#FFB07A",
    logoText: "APEX",
    statusText: "100% Whitelabel Authority",
    description: "A digital experience entirely centered around your coaching institute. Your crest, your colors, your domain, and your App Store listing.",
    features: [
      "Your coaching app on Google Play & App Store",
      "Custom domain (e.g. portal.apexacademy.com)",
      "Branded SMS & WhatsApp sender IDs",
      "Instant parent trust & premium brand prestige"
    ]
  }
];

export const PROBLEM_CHAOS_ITEMS = [
  {
    id: "whatsapp",
    title: "Lost WhatsApp Threads",
    snippet: "\"Sir, please re-send the Physics PDF!\"",
    stat: "14+ chaotic groups per batch",
    iconName: "MessageSquare",
    color: "#22c55e"
  },
  {
    id: "excel",
    title: "Broken Excel Spreadsheets",
    snippet: "Formula error on row 412 • Unpaid fee?",
    stat: "Manual data entry errors",
    iconName: "FileSpreadsheet",
    color: "#10b981"
  },
  {
    id: "paper",
    title: "Paper Attendance Registers",
    snippet: "Torn pages • Unverified student presence",
    stat: "No proof for concerned parents",
    iconName: "FileText",
    color: "#f59e0b"
  },
  {
    id: "test-portals",
    title: "Separate Test Websites",
    snippet: "Another login ID & password forgotten",
    stat: "Poor test attempt rate",
    iconName: "AlertTriangle",
    color: "#ef4444"
  },
  {
    id: "fee-followups",
    title: "Awkward Fee Calls",
    snippet: "\"Hello ma'am, pending fees for last 2 months...\"",
    stat: "Delayed cash flow & bad debts",
    iconName: "PhoneOff",
    color: "#ec4899"
  },
  {
    id: "piracy",
    title: "Curriculum Piracy",
    snippet: "Proprietary study material forwarded freely",
    stat: "Zero copyright protection",
    iconName: "ShieldAlert",
    color: "#8b5cf6"
  }
];

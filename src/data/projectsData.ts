export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'future';
  subtitle: string;
  description: string;
  techStack: string[];
  features: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  apkDownloadUrl?: string;
  qrCodeUrl?: string;
  zone: 'plaza' | 'ai_lab' | 'mobile_hub' | 'hall' | 'future_portal';
  position: [number, number, number];
  color: string;
  isFuture?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  // AI Research Lab
  {
    id: 'ai-resume-builder',
    title: 'AI Resume Builder',
    category: 'ai',
    subtitle: 'Intelligent Career Document Generator',
    description: 'An AI-powered resume generator leveraging Gemini/OpenAI models to craft tailored, ATS-optimized resumes and cover letters with real-time preview and multi-format exports.',
    techStack: ['Next.js 15', 'Python FastAPI', 'Gemini API', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Automated ATS resume score evaluation',
      'Dynamic AI section suggestions & auto-tuning',
      'PDF & DOCX export engine',
      'Custom template themes & instant previews'
    ],
    liveDemoUrl: 'https://ai-resume-builder.demo',
    githubUrl: 'https://github.com/developer/ai-resume-builder',
    zone: 'ai_lab',
    position: [0, 1.5, 20],
    color: '#A855F7'
  },
  
  // Mobile Innovation Hub
  {
    id: 'wake-up-darling',
    title: 'Wake-up Darling',
    category: 'mobile',
    subtitle: 'Smart Motivational Alarm & Routine Manager',
    description: 'A voice-guided intelligent alarm clock application that uses custom audio missions, morning weather synth summaries, and partner alarm sync to replace unpleasant morning buzzers.',
    techStack: ['Flutter', 'Firebase', 'Cloud Functions', 'Dart'],
    features: [
      'Partner alarm sync & wake-up audio drops',
      'Custom voice mission challenges',
      'Sleep cycle analysis & smart snooze limiting',
      'Offline alarm cache fallback'
    ],
    githubUrl: 'https://github.com/developer/wakeup-darling',
    apkDownloadUrl: 'https://example.com/downloads/wakeup-darling.apk',
    zone: 'mobile_hub',
    position: [-22, 1.5, 4],
    color: '#06B6D4'
  },
  {
    id: 'paalkaran',
    title: 'Paalkaran',
    category: 'mobile',
    subtitle: 'Dairy Logistics & Distribution Suite',
    description: 'Full-stack mobile distribution platform for milk and dairy vendors, featuring daily route tracking, automated customer subscriptions, and digital billing.',
    techStack: ['Flutter', 'Firebase Firestore', 'Razorpay API', 'PDF Engine'],
    features: [
      'Daily automated subscription billing engine',
      'Real-time delivery route tracking',
      'WhatsApp billing notifications',
      'Offline invoice generation'
    ],
    githubUrl: 'https://github.com/developer/paalkaran-app',
    apkDownloadUrl: 'https://example.com/downloads/paalkaran.apk',
    zone: 'mobile_hub',
    position: [-22, 1.5, -4],
    color: '#3B82F6'
  },
  {
    id: 'vibesync',
    title: 'VibeSync',
    category: 'web',
    subtitle: 'Synchronized Real-time Audio Lounge',
    description: 'Collaborative real-time spatial audio sync platform allowing friends to listen to synchronized tracks, share visualizer effects, and chat in high-fidelity 3D audio space.',
    techStack: ['React', 'WebSockets', 'Web Audio API', 'Node.js'],
    features: [
      'Low-latency WebSocket audio clock synchronization',
      'Interactive 3D dynamic equalizer visualizer',
      'Shared playlist queue with voting system'
    ],
    liveDemoUrl: 'https://vibesync.demo',
    githubUrl: 'https://github.com/developer/vibesync',
    zone: 'mobile_hub',
    position: [-26, 1.5, 0],
    color: '#EC4899'
  },
  {
    id: 'spendguard',
    title: 'SpendGuard',
    category: 'mobile',
    subtitle: 'Encrypted Personal Finance & Budget Shield',
    description: 'Privacy-focused mobile budget tracker with automatic SMS expense parsing, local AES-256 vault encryption, and visual spending analytics.',
    techStack: ['React Native', 'SQLite', 'AES Encryption', 'Reanimated'],
    features: [
      'Automatic offline SMS transaction parsing',
      'AES-256 local encrypted database',
      'Custom category budgets & threshold alerts',
      'Dark mode chart visualizers'
    ],
    githubUrl: 'https://github.com/developer/spendguard',
    apkDownloadUrl: 'https://example.com/downloads/spendguard.apk',
    zone: 'mobile_hub',
    position: [-18, 1.5, 0],
    color: '#10B981'
  },

  // Future Portal (Upcoming Projects)
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    category: 'future',
    subtitle: 'Next-Gen Enterprise Inventory SaaS',
    description: 'AI-assisted multi-warehouse inventory management platform with predictive stock forecasting, barcode scanning, and supplier integration.',
    techStack: ['Next.js 15', 'PostgreSQL', 'Prisma', 'AI Forecasting'],
    features: [
      'Predictive stockout ML algorithms',
      'Barcode & QR batch tracking',
      'Automated PO dispatch'
    ],
    zone: 'future_portal',
    position: [-4, 2, -22],
    color: '#8B5CF6',
    isFuture: true
  },
  {
    id: 'fillpill',
    title: 'FillPill',
    category: 'future',
    subtitle: 'Smart Healthcare & Medication Manager',
    description: 'IoT-connected medication reminder and automated pharmacy refill system ensuring zero missed dosages for chronic patients.',
    techStack: ['Flutter', 'IoT WebSockets', 'HealthKit API'],
    features: [
      'Prescription OCR parser',
      'Smart pill dispenser Bluetooth sync',
      'Emergency caregiver alert trigger'
    ],
    zone: 'future_portal',
    position: [0, 2, -26],
    color: '#06B6D4',
    isFuture: true
  },
  {
    id: 'photographic-memory-game',
    title: 'Photographic Memory Game',
    category: 'future',
    subtitle: '3D Spatial Visual Recall Brain Trainer',
    description: 'An interactive 3D WebGL brain training game designed to measure and sharpen photographic visual recall through cyber grid challenges.',
    techStack: ['React Three Fiber', 'Three.js', 'WebAudio API'],
    features: [
      'Procedural 3D matrix pattern generation',
      'Global speedrun leaderboards',
      'Spatial auditory cues'
    ],
    zone: 'future_portal',
    position: [4, 2, -22],
    color: '#F43F5E',
    isFuture: true
  }
];

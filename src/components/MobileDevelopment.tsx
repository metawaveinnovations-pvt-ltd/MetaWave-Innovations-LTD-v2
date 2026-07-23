import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  WifiOff, 
  Sliders, 
  Lock, 
  Terminal, 
  Gauge, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Award, 
  Fingerprint,
  QrCode,
  Bell,
  Activity,
  FileCode,
  Workflow,
  Radio,
  Apple
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface MobileDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const MOBILE_SOLUTIONS = [
  {
    id: 'flutter',
    title: 'Flutter Cross-Platform Apps',
    subtitle: '60 FPS SINGLE CODEBASE',
    icon: Smartphone,
    desc: 'Google Flutter framework compiling directly to native iOS and Android ARM binaries with unified UI components, hot reload agility, and up to 40% reduced time-to-market.',
    highlights: [
      'Native 60 FPS Skia/Impeller rendering pipeline',
      'Shared UI logic across iOS, Android, and Desktop',
      'Custom platform channels for hardware camera/NFC',
      'Over 90% codebase reuse across target platforms'
    ],
    tech: ['Flutter 3.22', 'Dart', 'BLoC State', 'SQLite', 'Firebase']
  },
  {
    id: 'ios',
    title: 'Native iOS Engineering',
    subtitle: 'SWIFT & SWIFTUI ARCHITECTURE',
    icon: Apple,
    desc: 'Bespoke native Apple iOS, iPadOS, and watchOS applications built with Swift 6 and SwiftUI, leveraging Apple Human Interface Guidelines and hardware CoreML pipelines.',
    highlights: [
      'SwiftUI declarative component design systems',
      'Apple Keychain & FaceID biometric authentication',
      'On-device Neural Engine AI processing via CoreML',
      'Strict App Store Review Guidelines compliance'
    ],
    tech: ['Swift 6', 'SwiftUI', 'Combine', 'CoreData', 'CoreML']
  },
  {
    id: 'android',
    title: 'Native Android Architecture',
    subtitle: 'KOTLIN & JETPACK COMPOSE',
    icon: Cpu,
    desc: 'High-density native Android software created using Kotlin, Jetpack Compose, Coroutines, and Room DB for maximum battery efficiency and hardware integration.',
    highlights: [
      'Jetpack Compose reactive UI rendering engine',
      'Android BiometricPrompt & Knox security features',
      'Background worker managers for offline sync',
      'Google Play Store deployment & V2 signature signing'
    ],
    tech: ['Kotlin 2.0', 'Jetpack Compose', 'Coroutines', 'Room DB', 'Hilt']
  },
  {
    id: 'react-native',
    title: 'React Native & Expo Ecosystem',
    subtitle: 'JAVASCRIPT NATIVE THREADS',
    icon: Layers,
    desc: 'React Native applications with Expo Router for cross-platform deployments, instant over-the-air (OTA) javascript updates, and shared web-mobile React components.',
    highlights: [
      'New React Native Architecture (Hermes engine + JSI)',
      'Instant OTA updates via Expo CodePush',
      'Seamless React Web component logic sharing',
      'Native device sensors, camera, and bluetooth access'
    ],
    tech: ['React Native 0.74', 'Expo', 'TypeScript', 'Hermes', 'Reanimated']
  },
  {
    id: 'offline-first',
    title: 'Offline-First & Field Mobile Apps',
    subtitle: 'ENTERPRISE FIELD OPERATIONS',
    icon: WifiOff,
    desc: 'Mission-critical mobile solutions engineered to operate seamlessly in remote zero-connectivity environments with bi-directional background sync resolution.',
    highlights: [
      'Local-first SQLite / WatermelonDB datastores',
      'Bi-directional conflict resolution CRDT sync',
      'Encrypted local media & document vault storage',
      'Geofencing, GPS tracking, and bluetooth beacon sync'
    ],
    tech: ['SQLite', 'CRDT Sync', 'Background Tasks', 'Geofencing']
  },
  {
    id: 'mobile-ai',
    title: 'On-Device Mobile AI & Edge ML',
    subtitle: 'SUB-50MS LOCAL AI INFERENCE',
    icon: Sparkles,
    desc: 'Private on-device AI inference models running directly on mobile hardware chips for instant camera OCR, biometric face scanning, and offline NLP speech processing.',
    highlights: [
      'TensorFlow Lite & Apple CoreML model quantization',
      '100% private local processing with zero server latency',
      'Real-time object detection & document OCR scanner',
      'Voice command processing and localized LLM prompts'
    ],
    tech: ['TensorFlow Lite', 'CoreML', 'Gemini Nano', 'OpenCV']
  }
];

const MOBILE_STACK_TABS = [
  {
    id: 'crossplatform',
    label: 'Cross-Platform & Hybrid',
    items: [
      { name: 'Flutter 3.22', spec: 'Google Dart framework, Impeller 60 FPS engine', benchmark: '60 FPS steady UI' },
      { name: 'React Native 0.74', spec: 'Hermes JS engine, JSI native bindings, Expo', benchmark: '< 100ms startup' },
      { name: 'TypeScript 5.5', spec: 'Strict mobile type safety & shared API schemas', benchmark: '0ms runtime overhead' }
    ]
  },
  {
    id: 'native',
    label: 'Native iOS & Android',
    items: [
      { name: 'Swift 6 & SwiftUI', spec: 'Apple native framework, Combine reactive state', benchmark: 'Native iOS performance' },
      { name: 'Kotlin 2.0 & Compose', spec: 'Android Jetpack, Coroutines async worker pools', benchmark: 'Native Android performance' },
      { name: 'CoreML & TF Lite', spec: 'On-device neural inference and hardware acceleration', benchmark: '< 50ms edge inference' }
    ]
  },
  {
    id: 'storage-sync',
    label: 'Local Storage & Sync',
    items: [
      { name: 'Room & SQLite', spec: 'ACID mobile SQL storage with reactive live data', benchmark: '< 2ms local query' },
      { name: 'WatermelonDB / Realm', spec: 'High-throughput local key-value & vector storage', benchmark: '< 1ms retrieval' },
      { name: 'Firebase & Supabase Sync', spec: 'Realtime WebSocket sync & FCM push notifications', benchmark: '< 20ms push trigger' }
    ]
  },
  {
    id: 'security-ci',
    label: 'Security & App Store CI',
    items: [
      { name: 'Fastlane & GitHub CI', spec: 'Automated TestFlight & Google Play beta releases', benchmark: '1-click deployment' },
      { name: 'Biometric & Encrypted Vault', spec: 'Hardware secure enclave, AES-256 local storage', benchmark: 'SOC2 & HIPAA Compliant' },
      { name: 'OWASP MASVS', spec: 'Mobile Application Security Verification Standard', benchmark: '100% MASVS Certified' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Mobile Strategy & Platform Architecture',
    desc: 'We evaluate platform requirements (iOS vs Android vs Cross-Platform), hardware sensor dependencies, offline needs, and security constraints.'
  },
  {
    num: '02',
    title: 'Human Interface & Touch UX Design',
    desc: 'Our design team crafts native iOS Human Interface and Android Material You design systems optimized for thumb zones, dark mode, and fluid gesture physics.'
  },
  {
    num: '03',
    title: 'Agile Mobile Development & Hardware Testing',
    desc: 'We build in bi-weekly sprints using strict Flutter, Swift, or Kotlin codebases, testing on real physical iOS and Android test devices in our QA lab.'
  },
  {
    num: '04',
    title: 'OWASP MASVS Security & Penetration Audit',
    desc: 'We execute automated static and dynamic security analysis (SAST/DAST), biometric key validation, SSL pinning audits, and battery efficiency tests.'
  },
  {
    num: '05',
    title: 'App Store Submission & OTA Deployment',
    desc: 'We handle 100% of Apple App Store and Google Play Store submission logistics, review management, and continuous over-the-air (OTA) code updates.'
  }
];

const MOBILE_FAQS = [
  {
    q: 'Should we choose Flutter or Native (Swift/Kotlin) for our mobile app?',
    a: 'Flutter is our primary recommendation for 85% of mobile projects as it delivers 60 FPS native performance on both iOS and Android from a single codebase, reducing time-to-market by 40%. Native Swift/Kotlin is recommended if your application requires heavy low-level Bluetooth hardware control, custom ARKit features, or background audio synthesis.'
  },
  {
    q: 'Do you guarantee Apple App Store and Google Play approval?',
    a: 'Yes. We guarantee 100% App Store and Play Store approval. Our engineering team builds strictly according to Apple Human Interface Guidelines and Google Play Developer Policies, managing all review feedback until your app is live.'
  },
  {
    q: 'How do you handle offline functionality and data synchronization?',
    a: 'We build offline-first mobile applications using local SQLite or WatermelonDB datastores. When connectivity drops, users continue working uninterrupted. Upon connection re-establishment, background workers synchronize data using conflict-free replicated data types (CRDTs).'
  },
  {
    q: 'Who owns the mobile source code and store listings?',
    a: 'Your organization retains 100% IP ownership of all source code, design assets, and developer account listings. We publish directly under your Apple Developer and Google Play Console enterprise accounts.'
  },
  {
    q: 'Can MetaWave integrate push notifications and biometrics?',
    a: 'Yes. We integrate biometrics (Face ID, Touch ID, Android BiometricPrompt) backed by hardware Secure Enclaves, along with Firebase Cloud Messaging (FCM) and Apple Push Notification Service (APNs) for targeted push campaigns.'
  }
];

export function MobileDevelopment({ onNavigate, isStandalonePage = false }: MobileDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('crossplatform');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Mobile Estimator State
  const [appType, setAppType] = useState<'flutter' | 'ios' | 'android' | 'reactnative' | 'offline'>('flutter');
  const [platformTarget, setPlatformTarget] = useState<'dual' | 'ios_only' | 'android_only'>('dual');
  const [includeBiometrics, setIncludeBiometrics] = useState(true);
  const [includeEdgeAi, setIncludeEdgeAi] = useState(false);

  const calculatedEstimate = useMemo(() => {
    let weeks = '4–7 Weeks';
    let team = '1 Mobile Architect + 2 Flutter Engineers + 1 QA';
    let deliverables = 'Cross-Platform iOS & Android App + Store Submission + 100% Source Code';

    if (appType === 'ios' || appType === 'android') {
      weeks = '5–8 Weeks';
      team = '1 Tech Lead + 2 Native Swift/Kotlin Engineers + 1 QA';
      deliverables = 'Native App Binary + Apple/Google Store Approval + Local Encrypted Vault';
    } else if (appType === 'offline') {
      weeks = '6–9 Weeks';
      team = '1 Mobile Architect + 2 Mobile Engineers + 1 Sync Engine Specialist';
      deliverables = 'Offline-First App + SQLite Local Engine + CRDT Conflict Resolution Server';
    }

    if (includeEdgeAi) {
      weeks += ' (+ 1 wk On-Device ML Model Tuning)';
    }

    return { weeks, team, deliverables };
  }, [appType, platformTarget, includeBiometrics, includeEdgeAi]);

  const handleCopySpec = (text: string) => {
    playSound('toggle');
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      
      {/* Background Soft Ambiance Lights */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#326E45]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8 max-w-5xl mx-auto">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className="hover:text-[#326E45] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate && onNavigate('services')} 
            className="hover:text-[#326E45] transition-colors cursor-pointer"
          >
            Services
          </button>
          <span>/</span>
          <span className="text-[#326E45] font-bold">Mobile App Development</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Sparkles size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              CERTIFIED NATIVE & CROSS-PLATFORM MOBILE ENGINEERING
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            60 FPS Native <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Mobile App Architectures</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We design, build, and publish high-performance iOS and Android mobile applications powered by Flutter, Swift, Kotlin, and React Native — featuring hardware biometric security, offline-first local databases, and sub-50ms edge AI.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#326E45]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Consult Our Mobile Engineering Squad</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Smartphone size={16} className="text-[#326E45]" />
              <span>Explore Mobile Tech Stack & Benchmarks</span>
            </button>
          </motion.div>
        </div>

        {/* 4 Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">60 FPS Steady UI</div>
              <div className="text-slate-500 text-[11px]">Butter-smooth mobile graphics</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <WifiOff size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Offline-First Engine</div>
              <div className="text-slate-500 text-[11px]">Zero-latency local SQLite</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Fingerprint size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Biometric Enclave</div>
              <div className="text-slate-500 text-[11px]">FaceID / Knox encryption</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Award size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Store Approval</div>
              <div className="text-slate-500 text-[11px]">Guaranteed iOS & Play launch</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Mobile Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Smartphone size={12} />
              <span>MOBILE ENGINEERING DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Tailored Mobile Solutions for iOS & Android
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Choose the mobile technology approach that best fits your target audience, hardware needs, and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOBILE_SOLUTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white border border-slate-200/90 hover:border-[#326E45]/40 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#326E45] group-hover:bg-[#326E45] group-hover:text-white transition-colors shrink-0">
                        <Icon size={20} />
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 uppercase">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2 group-hover:text-[#326E45] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 mb-6 border-t border-slate-100 pt-3">
                      {item.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 size={13} className="text-[#326E45] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack pill tags */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-1.5">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Interactive Mobile Stack & Specs Explorer */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              PRODUCTION-TESTED MOBILE STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Modern Mobile Libraries & Hardware Frameworks
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Inspect our enterprise mobile development frameworks and execution SLAs.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {MOBILE_STACK_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { playSound('toggle'); setActiveStackTab(tab.id); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStackTab === tab.id
                    ? 'bg-[#326E45] text-white shadow-xs border border-[#326E45]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Items List */}
          <div className="space-y-3">
            {MOBILE_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.spec}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[11px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                    {item.benchmark}
                  </span>
                  <button
                    onClick={() => handleCopySpec(`${item.name}: ${item.spec} (${item.benchmark})`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Copy Spec"
                  >
                    {copiedText?.includes(item.name) ? <Check size={14} className="text-[#326E45]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Interactive Mobile Project Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your Mobile App Scope & Team
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your mobile app preferences to project delivery timelines, squad composition, and store submission deliverables.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* App Architecture */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Mobile Architecture
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'flutter', label: 'Flutter (Recommended)' },
                      { id: 'ios', label: 'Native iOS (Swift)' },
                      { id: 'android', label: 'Native Android (Kotlin)' },
                      { id: 'reactnative', label: 'React Native & Expo' },
                      { id: 'offline', label: 'Offline Field App' }
                    ].map(a => (
                      <button
                        key={a.id}
                        onClick={() => { playSound('toggle'); setAppType(a.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          appType === a.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Stores */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Target Deployment
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dual', label: 'iOS + Android (Both)' },
                      { id: 'ios_only', label: 'Apple App Store Only' },
                      { id: 'android_only', label: 'Google Play Only' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => { playSound('toggle'); setPlatformTarget(p.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          platformTarget === p.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBiometrics}
                      onChange={(e) => setIncludeBiometrics(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Biometric (FaceID/TouchID) Security</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeEdgeAi}
                      onChange={(e) => setIncludeEdgeAi(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include On-Device Edge ML Inference</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">MOBILE PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  STORE GUARANTEE
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED MOBILE SQUAD</span>
                  <span className="text-xs font-bold text-slate-800">{calculatedEstimate.team}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">CORE DELIVERABLES</span>
                  <span className="text-xs text-slate-600 leading-snug block">{calculatedEstimate.deliverables}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Mobile App Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Mobile Engineering Lifecycle */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS MOBILE METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Mobile Engineering Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From hardware discovery to global App Store deployment and OTA telemetry updates.
            </p>
          </div>

          <div className="space-y-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="p-5 bg-white border border-slate-200/90 rounded-2xl flex items-start gap-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#326E45]/10 text-[#326E45] flex items-center justify-center font-mono font-extrabold text-sm shrink-0">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: FAQs Accordion */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              COMMON INQUIRIES
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Frequently Asked Mobile Development Questions
            </h3>
          </div>

          <div className="space-y-3">
            {MOBILE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                  <button
                    onClick={() => { playSound('toggle'); setOpenFaqIndex(isOpen ? null : idx); }}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} className="text-[#326E45]" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#326E45]/20 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold mb-3">
            Ready to Launch Your Mobile Application?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a technical consultation with our mobile solution architects. Receive a comprehensive mobile platform recommendation, UX wireframe outline, and cost projection within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Mobile Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

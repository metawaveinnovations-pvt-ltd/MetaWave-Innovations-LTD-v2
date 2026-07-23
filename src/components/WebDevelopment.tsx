import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Server, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Smartphone, 
  Sliders, 
  Lock, 
  Terminal, 
  Gauge, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Check,
  Copy,
  HelpCircle,
  Clock,
  Layout,
  Workflow,
  Search,
  Settings,
  Shield,
  FileCode,
  Award
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface WebDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const WEB_SOLUTIONS = [
  {
    id: 'saas',
    title: 'Enterprise SaaS Platforms',
    subtitle: 'MULTI-TENANT ARCHITECTURE',
    icon: Layout,
    desc: 'Scalable multi-tenant web applications featuring granular RBAC permissions, integrated subscription billing engines, and real-time telemetry dashboards.',
    highlights: [
      'Multi-tenant DB isolation (Row-Level Security)',
      'Stripe & PayPal billing webhook controllers',
      'Granular Role-Based Access Control (RBAC)',
      'Sub-200ms real-time metric visualization'
    ],
    tech: ['React 19', 'Next.js 15', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: 'spa',
    title: 'Custom Web Applications & Portals',
    subtitle: 'HIGH-FREQUENCY SPAS',
    icon: Code2,
    desc: 'Lightning-fast client-side React 19 single-page applications and customer portals engineered for sub-150ms rendering and zero layout shift (CLS).',
    highlights: [
      'React 19 Concurrent Mode & Vite v6 bundling',
      'Optimistic state updates & offline state sync',
      'Tailwind CSS v4 zero-runtime design systems',
      'Accessible WCAG AA compliant interface components'
    ],
    tech: ['React 19', 'Vite 6', 'TypeScript', 'Tailwind CSS', 'Motion']
  },
  {
    id: 'pwa',
    title: 'Progressive Web Apps (PWAs)',
    subtitle: 'OFFLINE-FIRST WEB EXPERIENCE',
    icon: Smartphone,
    desc: 'Mobile-first web applications with Service Workers, background sync, offline data caching, push notifications, and home-screen installability.',
    highlights: [
      'Service Worker offline caching & background sync',
      'Native push notification triggers & badges',
      'Cross-platform iOS and Android installability',
      'Fast 60 FPS touch response & gestures'
    ],
    tech: ['Workbox', 'IndexedDB', 'Service Workers', 'Web Push API']
  },
  {
    id: 'ecommerce',
    title: 'Headless E-Commerce Engines',
    subtitle: 'SUB-SECOND STOREFRONTS',
    icon: Globe,
    desc: 'Next.js 15 headless e-commerce platforms connected to Shopify, Medusa, or custom PostgreSQL catalogs for maximum checkout conversion.',
    highlights: [
      'Next.js 15 App Router static product regeneration',
      'Sub-second cart & checkout transaction flows',
      'Global edge CDN asset caching',
      'SEO-optimized Schema.org structured data'
    ],
    tech: ['Next.js 15', 'GraphQL', 'Shopify API', 'Tailwind', 'Stripe']
  },
  {
    id: 'modernization',
    title: 'Legacy Monolith Modernization',
    subtitle: 'DECOUPLED MIGRATIONS',
    icon: Workflow,
    desc: 'Phased, risk-free migration of legacy PHP, ASP.NET, or jQuery codebases into modern decoupled React and microservice architectures.',
    highlights: [
      'Zero-downtime strangler-fig migration patterns',
      'API wrapper layers over legacy databases',
      'Automated regression testing suites',
      'Up to 80% reduction in server infrastructure overhead'
    ],
    tech: ['Docker', 'REST Wrappers', 'TypeScript', 'PostgreSQL', 'AWS']
  },
  {
    id: 'apis',
    title: 'High-Throughput API Gateways',
    subtitle: 'REST, GRAPHQL & GRPC',
    icon: Server,
    desc: 'Bulletproof REST, GraphQL, and gRPC endpoints built with Node.js and Python FastAPI, protected by rate limiting and automated schema validation.',
    highlights: [
      'Strict Pydantic & Zod input validation schemas',
      'JWT OAuth2 / SAML single sign-on integration',
      'Redis sub-millisecond API response caching',
      'Interactive Swagger & OpenAPI documentation'
    ],
    tech: ['Node.js', 'FastAPI', 'gRPC', 'GraphQL', 'Swagger']
  }
];

const WEB_STACK_TABS = [
  {
    id: 'frontend',
    label: 'Frontend Core',
    items: [
      { name: 'React 19', spec: 'Concurrent Mode, Server Components, Hooks API', benchmark: '< 16ms render loop' },
      { name: 'Next.js 15', spec: 'App Router, Hybrid SSR/SSG, Edge Middleware', benchmark: 'Sub-100ms FCP' },
      { name: 'TypeScript 5.5', spec: 'Strict compile-time typing, 0 runtime overhead', benchmark: '100% Type Safety' },
      { name: 'Tailwind CSS v4', spec: 'Atomic design tokens, zero-runtime bloat', benchmark: '< 12KB CSS bundle' },
      { name: 'Vite 6.0', spec: 'Native ESM dev server, Rollup tree-shaking', benchmark: '< 100ms HMR' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    items: [
      { name: 'Node.js 22 LTS', spec: 'Async event loop, high-concurrency gateway', benchmark: '< 8ms response' },
      { name: 'Python FastAPI', spec: 'ASGI async framework, OpenAPI automation', benchmark: '< 10ms processing' },
      { name: 'NestJS', spec: 'Modular enterprise architecture, gRPC native', benchmark: '< 12ms middleware' },
      { name: 'Express / TS', spec: 'Lightweight REST microservice routes', benchmark: '< 5ms execution' }
    ]
  },
  {
    id: 'databases',
    label: 'Databases & Storage',
    items: [
      { name: 'PostgreSQL 16', spec: 'ACID transactional integrity, PGVector', benchmark: '< 3ms query' },
      { name: 'Redis Enterprise', spec: 'In-memory key-value cache, Pub/Sub broker', benchmark: '< 0.5ms lookup' },
      { name: 'Supabase / Firestore', spec: 'Serverless real-time DB, Row Level Security', benchmark: '< 15ms WebSocket' }
    ]
  },
  {
    id: 'devops',
    label: 'DevOps & Security',
    items: [
      { name: 'Docker & Kubernetes', spec: 'Immutable containerization & pod scaling', benchmark: 'Zero-downtime updates' },
      { name: 'GCP & AWS Cloud', spec: 'Cloud Run, AWS ECS, Global Edge CDN', benchmark: '99.99% Uptime SLA' },
      { name: 'SonarQube & OWASP', spec: 'Static code security audits & vulnerability scans', benchmark: '100% Security Pass' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Architecture Blueprinting & Discovery',
    desc: 'We analyze your commercial goals, define user journeys, map database schemas, and establish security boundaries before writing a single line of code.'
  },
  {
    num: '02',
    title: 'UX System & Interactive Prototyping',
    desc: 'Our design team crafts responsive Figma design tokens, high-contrast visual component libraries, and clickable prototypes tested for accessibility.'
  },
  {
    num: '03',
    title: 'Type-Safe Agile Sprint Execution',
    desc: 'We build in bi-weekly sprints using strict TypeScript, conducting continuous peer code reviews, automated CI/CD builds, and staging environment deployments.'
  },
  {
    num: '04',
    title: 'OWASP Security & Performance Hardening',
    desc: 'We perform automated SonarQube static code analysis, penetration testing, Lighthouse 100/100 audits, and load tests simulating peak user traffic.'
  },
  {
    num: '05',
    title: 'Global Edge Deployment & SLA Monitoring',
    desc: 'We launch on production multi-region cloud containers with automated auto-scaling, SSL encryption, and 24/7 telemetry monitoring.'
  }
];

const WEB_FAQS = [
  {
    q: 'How quickly can MetaWave mobilize a web development team?',
    a: 'We mobilize certified senior web engineers and solution architects within 48 to 72 hours of project sign-off. Kickoff includes immediate setup of a dedicated staging environment, Git repository, and Slack/Teams channel.'
  },
  {
    q: 'Do we retain 100% intellectual property (IP) and code ownership?',
    a: 'Yes. Upon milestone completion, 100% of the source code, Git repositories, deployment scripts, and intellectual property rights are fully assigned to your business with zero vendor lock-in.'
  },
  {
    q: 'What performance benchmarks do you guarantee for web applications?',
    a: 'We target sub-150ms Time to First Byte (TTFB), 100/100 Core Web Vitals scores on Lighthouse, and sub-1-second total page load times across global mobile and desktop connections.'
  },
  {
    q: 'Can MetaWave integrate our existing corporate CRM or legacy APIs?',
    a: 'Absoluty. We specialize in building secure API adapter middleware to connect web portals with legacy ERPs, Salesforce, HubSpot, SAP, custom PostgreSQL databases, and OAuth2 identity providers.'
  },
  {
    q: 'What post-launch support and SLAs do you offer?',
    a: 'We offer flexible post-launch support plans featuring 99.99% uptime guarantees, 24/7 telemetry monitoring, automated security patch updates, and dedicated monthly engineering hours.'
  }
];

export function WebDevelopment({ onNavigate, isStandalonePage = false }: WebDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('frontend');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Web Project Estimator state
  const [projectType, setProjectType] = useState<'saas' | 'spa' | 'pwa' | 'ecommerce' | 'modernization'>('saas');
  const [projectScale, setProjectScale] = useState<'startup' | 'growth' | 'enterprise'>('growth');
  const [includeAi, setIncludeAi] = useState(true);
  const [includePwa, setIncludePwa] = useState(false);

  const calculatedEstimate = useMemo(() => {
    let weeks = '4–6 Weeks';
    let team = '1 Architect + 2 Full-Stack Engineers + 1 QA';
    let deliverables = 'Production Web App + CI/CD Pipeline + 100% Source Code';

    if (projectType === 'saas') {
      weeks = projectScale === 'enterprise' ? '8–12 Weeks' : '5–8 Weeks';
      team = '1 Solution Architect + 3 Senior Engineers + 1 UI Designer + 1 SecOps';
      deliverables = 'Multi-tenant SaaS Platform + Stripe Billing + Admin Dashboard + SOC2 Compliance';
    } else if (projectType === 'ecommerce') {
      weeks = projectScale === 'enterprise' ? '6–10 Weeks' : '4–7 Weeks';
      team = '1 Tech Lead + 2 Next.js Engineers + 1 Shopify/Payment Specialist';
      deliverables = 'Headless Next.js Storefront + Cart Gateway + CMS Back-office';
    } else if (projectType === 'modernization') {
      weeks = '6–10 Weeks';
      team = '1 Legacy Migration Architect + 2 Full-Stack Engineers';
      deliverables = 'Decoupled React Architecture + Microservices Wrapper + Zero-Downtime Cutover';
    }

    if (includeAi) {
      weeks += ' (+ 1 wk AI Integration)';
    }

    return { weeks, team, deliverables };
  }, [projectType, projectScale, includeAi, includePwa]);

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
          <span className="text-[#326E45] font-bold">Custom Web Development</span>
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
              CERTIFIED ENTERPRISE WEB ENGINEERING
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            High-Performance <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Custom Web Applications</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We engineer sub-150ms TTFB web applications, multi-tenant SaaS platforms, progressive web apps (PWAs), and headless storefronts built with React 19, Next.js 15, strict TypeScript, and serverless edge backends.
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
              <span>Consult Our Web Architecture Team</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileCode size={16} className="text-[#326E45]" />
              <span>Explore Tech Stack & Benchmarks</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&lt; 150ms TTFB</div>
              <div className="text-slate-500 text-[11px]">Global edge CDN response</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Gauge size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100/100 Lighthouse</div>
              <div className="text-slate-500 text-[11px]">Perfect Core Web Vitals</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">OWASP Hardened</div>
              <div className="text-slate-500 text-[11px]">Bank-grade web security</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% IP Transfer</div>
              <div className="text-slate-500 text-[11px]">Full legal code assignment</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Web Solutions Matrix */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Code2 size={12} />
              <span>PRODUCTION WEB ARCHITECTURES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Purpose-Built Web Solutions for Scale
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Select the web architecture tailored to your specific commercial requirements and performance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEB_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Web Stack & Specs Explorer */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ENTERPRISE WEB STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Type-Safe, Zero-Bloat Engineering Tools
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Click through our standardized web technology stack layers and benchmark SLAs.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {WEB_STACK_TABS.map((tab) => (
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
            {WEB_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive Web Project Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your Web Project Scope & Team
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Configure your web application parameters to receive instant timeline, engineering team size, and key deliverable projections.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Application Type */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Application Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'saas', label: 'Enterprise SaaS' },
                      { id: 'spa', label: 'Custom Web Portal' },
                      { id: 'ecommerce', label: 'Headless Store' },
                      { id: 'pwa', label: 'Progressive Web App' },
                      { id: 'modernization', label: 'Legacy Migration' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => { playSound('toggle'); setProjectType(t.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          projectType === t.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale & Complexity */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Business Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'startup', label: 'MVP / Startup' },
                      { id: 'growth', label: 'Growth Business' },
                      { id: 'enterprise', label: 'Enterprise Grade' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => { playSound('toggle'); setProjectScale(s.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          projectScale === s.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAi}
                      onChange={(e) => setIncludeAi(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Gemini AI / LLM Integration</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePwa}
                      onChange={(e) => setIncludePwa(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include PWA Offline Caching</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">PROJECT PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  GUARANTEED SLA
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED SQUAD</span>
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
                <span>Request Custom Web Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Web Engineering Lifecycle */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS DEVELOPMENT METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Web Engineering Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From architectural discovery to global CDN deployment and telemetry monitoring.
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
              Frequently Asked Web Engineering Questions
            </h3>
          </div>

          <div className="space-y-3">
            {WEB_FAQS.map((faq, idx) => {
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
            Ready to Build Your Enterprise Web Architecture?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a technical consultation with our lead web architects. Receive a comprehensive system diagram, tech stack recommendation, and timeline estimate within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Architecture Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Workflow, 
  Sliders, 
  Lock, 
  Terminal, 
  Gauge, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Award, 
  Code2, 
  Server, 
  Layout, 
  Cloud, 
  Radio, 
  FileCode, 
  GitBranch, 
  Key, 
  Bot
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface FullStackDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const FULLSTACK_SOLUTIONS = [
  {
    id: 'nextjs-fullstack',
    title: 'Next.js 15 & React 19 Full-Stack Apps',
    subtitle: 'UNIFIED MONOREPO ARCHITECTURE',
    icon: Layout,
    desc: 'Server-Side Rendered (SSR) and Static Site Generated (SSG) web applications with React Server Components, Server Actions, and unified TypeScript types across frontend and backend.',
    highlights: [
      'React 19 Server Components with zero bundle overhead',
      'Next.js App Router with Server Actions & Streaming SSR',
      'Sub-100ms Time-To-First-Byte (TTFB) worldwide via Edge CDNs',
      'End-to-end type safety from database models to UI components'
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel / Cloud Run']
  },
  {
    id: 'serverless-apis',
    title: 'Serverless Backends & API Gateways',
    subtitle: 'ELASTIC AUTOMATIC SCALING',
    icon: Server,
    desc: 'Event-driven serverless architectures powered by AWS Lambda, GCP Cloud Functions, or Cloudflare Workers paired with high-performance Node.js, Go, or Python micro-backends.',
    highlights: [
      'RESTful & gRPC enterprise API endpoints',
      'Automated zero-to-hero elastic autoscaling under burst traffic',
      'API rate limiting, CORS configuration, and JWT authentication',
      'OpenAPI / Swagger interactive API documentation generation'
    ],
    tech: ['Node.js', 'Go', 'Express', 'FastAPI', 'AWS Lambda', 'OpenAPI']
  },
  {
    id: 'realtime-graphql',
    title: 'GraphQL & Real-Time Sync Engines',
    subtitle: 'WEBSOCKET & SUBSCRIPTION INFRASTRUCTURE',
    icon: Radio,
    desc: 'High-speed GraphQL schemas and WebSocket channels enabling instant live data streaming, collaborative multi-user whiteboards, and real-time operational telemetry dashboards.',
    highlights: [
      'Apollo Server & Hasura real-time subscription engine',
      'Optimized query resolvers preventing N+1 database queries',
      'Sub-20ms WebSocket message dispatch across client sockets',
      'Automated schema stitching and federated GraphQL graphs'
    ],
    tech: ['GraphQL', 'Apollo', 'WebSockets', 'Redis Pub/Sub', 'Hasura']
  },
  {
    id: 'headless-cms',
    title: 'Headless CMS & E-Commerce Platforms',
    subtitle: 'MODULAR CONTENT & COMMERCE',
    icon: Globe,
    desc: 'Composable digital experiences integrating headless CMS platforms (Strapi, Sanity, Contentful) with high-converting Shopify Hydrogen or custom payment gateways.',
    highlights: [
      'Instant content updates with webhooks and incremental revalidation',
      'Stripe, PayPal, and Apple Pay payment gateway integrations',
      'Multi-currency, localized internationalization (i18n)',
      '99+ Google Lighthouse performance and accessibility scores'
    ],
    tech: ['Strapi', 'Sanity', 'Shopify', 'Stripe API', 'Tailwind']
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends & Distributed Services',
    subtitle: 'INDEPENDENT DEPLOYMENT TEAMS',
    icon: Layers,
    desc: 'Decoupled micro-frontend architecture enabling parallel development across engineering squads with Module Federation, shared design systems, and independent deployment releases.',
    highlights: [
      'Webpack / Vite Module Federation runtime loading',
      'Isolated team ownership of distinct web portals and sub-routes',
      'Shared design system tokens & component libraries',
      'Independent CI/CD pipelines with zero cross-squad release blocking'
    ],
    tech: ['Module Federation', 'Vite', 'React', 'Docker', 'Single-SPA']
  },
  {
    id: 'ai-fullstack',
    title: 'Enterprise AI & Vector Search Full-Stack',
    subtitle: 'INTELLIGENT APPLICATION AGENTS',
    icon: Bot,
    desc: 'Full-stack software embedded with Generative AI capabilities, streaming LLM chat interfaces, RAG (Retrieval-Augmented Generation) pipelines, and PGVector similarity search.',
    highlights: [
      'Server-side Gemini API, OpenAI & Claude model orchestration',
      'Vector database search via PGVector, Pinecone, and Qdrant',
      'Streaming server-sent events (SSE) for instant token output',
      'Strict API key secret isolation & prompt injection guardrails'
    ],
    tech: ['Gemini API', 'LangChain', 'PGVector', 'SSE', 'TypeScript']
  }
];

const FULLSTACK_STACK_TABS = [
  {
    id: 'frontend',
    label: 'Frontend Core',
    items: [
      { name: 'React 19 & Next.js 15', spec: 'Server Actions, React Server Components, Streaming SSR', benchmark: '100 Lighthouse score' },
      { name: 'TypeScript 5.5', spec: 'End-to-end strict static typing with zero runtime overhead', benchmark: '100% Type Safe' },
      { name: 'Tailwind CSS v4', spec: 'Utility-first responsive design, zero runtime CSS footprint', benchmark: '< 15KB CSS bundle' },
      { name: 'Motion / Framer', spec: 'Declarative 60 FPS UI transitions and micro-interactions', benchmark: '60 FPS Smooth' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    items: [
      { name: 'Node.js 22 LTS / Express', spec: 'Non-blocking event-driven API services', benchmark: '< 5ms execution' },
      { name: 'Go (Golang 1.22)', spec: 'High-throughput compiled concurrent microservices', benchmark: '< 2ms response' },
      { name: 'GraphQL & REST', spec: 'Type-safe API endpoints with Zod schema validation', benchmark: '< 10ms payload' },
      { name: 'Python FastAPI', spec: 'Asynchronous backend for AI/ML model inference', benchmark: '< 12ms processing' }
    ]
  },
  {
    id: 'database',
    label: 'Databases & Caching',
    items: [
      { name: 'PostgreSQL & Drizzle ORM', spec: 'ACID relational database with type-safe SQL queries', benchmark: '< 3ms query speed' },
      { name: 'Redis Enterprise', spec: 'In-memory caching layer & WebSocket pub/sub messaging', benchmark: '< 0.5ms lookup' },
      { name: 'MongoDB / Supabase', spec: 'Document storage and real-time changefeed listeners', benchmark: '< 5ms document sync' }
    ]
  },
  {
    id: 'devops',
    label: 'Cloud & CI/CD Pipelines',
    items: [
      { name: 'Docker & Cloud Run', spec: 'Containerized server applications with auto-scaling', benchmark: '100% Environment Parity' },
      { name: 'Vercel / AWS Amplify', spec: 'Global edge network hosting with instant previews', benchmark: '< 50ms Edge TTFB' },
      { name: 'GitHub Actions CI/CD', spec: 'Automated test suite, security linting, and zero-downtime deploys', benchmark: 'Continuous Delivery' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Full-Stack Discovery & Database Modeling',
    desc: 'We map out domain models, design ERDs, specify OpenAPI/GraphQL contracts, and select the optimal frontend/backend stack.'
  },
  {
    num: '02',
    title: 'UI/UX Design & Component Architecture',
    desc: 'Our design team crafts responsive wireframes and accessible design tokens, pairing them with React 19 component trees.'
  },
  {
    num: '03',
    title: 'Parallel Frontend & Backend Engineering',
    desc: 'We develop in bi-weekly sprints using strict TypeScript interfaces, building API endpoints and UI screens in lockstep.'
  },
  {
    num: '04',
    title: 'End-to-End Testing & Security Audit',
    desc: 'We run automated Playwright E2E tests, Jest unit tests, OWASP vulnerability scans, and lighthouse performance optimization.'
  },
  {
    num: '05',
    title: 'Cloud Deployment & Telemetry Setup',
    desc: 'We launch on production cloud infrastructure with blue/green deployment strategy, Sentry error logging, and APM telemetry.'
  }
];

const FULLSTACK_FAQS = [
  {
    q: 'What is the main advantage of hiring a full-stack engineering squad?',
    a: 'A dedicated full-stack squad handles the entire software lifecycle from database schema design to responsive UI components and cloud deployments. This eliminates communication bottlenecks between separate frontend and backend teams, ensuring faster feature delivery and unified type safety.'
  },
  {
    q: 'Why does MetaWave prefer Next.js 15 and React 19 for full-stack apps?',
    a: 'Next.js 15 combined with React 19 allows us to execute server-side data fetching and rendering directly on the edge while serving minimal JavaScript to the client. This results in sub-100ms TTFB loading speeds, superior Google SEO rankings, and seamless interactive user experiences.'
  },
  {
    q: 'How do you handle state management and data fetching across the stack?',
    a: 'We leverage React 19 Server Components and Server Actions for direct server data fetching, combined with React Query / TanStack Query for client-side caching and optimistic UI updates, ensuring smooth zero-flicker interfaces.'
  },
  {
    q: 'Can MetaWave integrate existing third-party APIs or legacy databases?',
    a: 'Yes. We frequently build full-stack web applications that interface with legacy SQL databases, enterprise SAP/Salesforce APIs, custom REST endpoints, or third-party payment and auth services.'
  },
  {
    q: 'Who owns the full-stack codebase and deployment infrastructure?',
    a: 'Your enterprise retains 100% full IP ownership of all source code, database migrations, CI/CD scripts, and cloud accounts upon completion with zero vendor lock-in.'
  }
];

export function FullStackDevelopment({ onNavigate, isStandalonePage = false }: FullStackDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('frontend');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Estimator State
  const [appType, setAppType] = useState<'nextjs' | 'serverless' | 'graphql' | 'ai'>('nextjs');
  const [deploymentTarget, setDeploymentTarget] = useState<'cloud_run' | 'vercel' | 'aws'>('cloud_run');
  const [includeDatabase, setIncludeDatabase] = useState(true);
  const [includeAuth, setIncludeAuth] = useState(true);

  const calculatedEstimate = useMemo(() => {
    let weeks = '4–8 Weeks';
    let team = '1 Full-Stack Tech Lead + 2 Full-Stack Engineers + 1 QA';
    let deliverables = 'Full-Stack Web App + Cloud Deployment + 100% Source Code & Docs';

    if (appType === 'graphql') {
      weeks = '5–9 Weeks';
      team = '1 Tech Lead + 2 Full-Stack Engineers + 1 Database Architect + 1 QA';
      deliverables = 'GraphQL Subscriptions Engine + React 19 Web App + Redis Caching';
    } else if (appType === 'ai') {
      weeks = '6–10 Weeks';
      team = '1 AI Solutions Architect + 2 Full-Stack Engineers + 1 QA';
      deliverables = 'Full-Stack App + Streaming LLM API + PGVector Search + Admin Portal';
    }

    if (deploymentTarget === 'aws') {
      weeks += ' (+ 1 wk AWS IaC Hardening)';
    }

    return { weeks, team, deliverables };
  }, [appType, deploymentTarget, includeDatabase, includeAuth]);

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
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

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
          <span className="text-[#326E45] font-bold">Full-Stack Development</span>
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
              END-TO-END FULL-STACK APPLICATION ENGINEERING
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Unified <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Full-Stack Web Architectures</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We build cohesive, scalable full-stack applications that pair React 19 and Next.js 15 frontends with Node.js, Go, or Python backends, type-safe database ORMs, and automated cloud infrastructure.
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
              <span>Consult Our Full-Stack Squad</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Layers size={16} className="text-[#326E45]" />
              <span>Explore Full-Stack Technology Stack</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&lt; 100ms Global TTFB</div>
              <div className="text-slate-500 text-[11px]">Edge-rendered performance</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Code2 size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Type-Safe</div>
              <div className="text-slate-500 text-[11px]">Database to UI safety</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Cloud size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Serverless & Docker</div>
              <div className="text-slate-500 text-[11px]">Elastic auto-scaling</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">OWASP Hardened</div>
              <div className="text-slate-500 text-[11px]">Bank-level security standards</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Full-Stack Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Layers size={12} />
              <span>FULL-STACK DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Complete Full-Stack Application Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Select the full-stack architecture model designed for your target workload, concurrency requirements, and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FULLSTACK_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Stack & Specs Explorer */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED FULL-STACK TECH MATRIX
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Modern Frontend, Backend & Database Frameworks
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Review our battle-tested full-stack technology stack and performance benchmarks.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {FULLSTACK_STACK_TABS.map((tab) => (
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
            {FULLSTACK_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive Full-Stack Project Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your Full-Stack Scope & Team
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your full-stack architecture options to generate immediate delivery timelines, squad compositions, and core deliverables.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Application Model */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Application Model
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'nextjs', label: 'Next.js 15 & React 19' },
                      { id: 'serverless', label: 'Serverless REST API' },
                      { id: 'graphql', label: 'GraphQL & Live Sync' },
                      { id: 'ai', label: 'Enterprise AI Full-Stack' }
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

                {/* Cloud Deployment */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Cloud Deployment Target
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cloud_run', label: 'GCP Cloud Run / Docker' },
                      { id: 'vercel', label: 'Vercel Edge Network' },
                      { id: 'aws', label: 'AWS ECS / Lambda' }
                    ].map(d => (
                      <button
                        key={d.id}
                        onClick={() => { playSound('toggle'); setDeploymentTarget(d.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          deploymentTarget === d.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDatabase}
                      onChange={(e) => setIncludeDatabase(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Managed PostgreSQL Database & ORM</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAuth}
                      onChange={(e) => setIncludeAuth(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Enterprise OAuth / JWT Security</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">FULL-STACK PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  SLA GUARANTEE
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED FULL-STACK SQUAD</span>
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
                <span>Request Full-Stack Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Full-Stack Engineering Lifecycle */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS FULL-STACK METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Full-Stack Engineering Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From database schema blueprinting to edge deployment and APM telemetry.
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
              Frequently Asked Full-Stack Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FULLSTACK_FAQS.map((faq, idx) => {
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
            Ready to Build Your Full-Stack Application?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a technical consultation with our lead full-stack solution architects. Receive a comprehensive full-stack architecture diagram, tech stack recommendation, and project projection within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Full-Stack Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Code2, 
  Database, 
  Layers, 
  CloudLightning, 
  Cpu, 
  Smartphone, 
  BrainCircuit, 
  CheckCircle,
  CheckCircle2,
  Zap,
  Terminal,
  Box,
  RefreshCw,
  Server,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Search,
  X,
  Copy,
  Check,
  Globe,
  Sliders,
  Gauge,
  ArrowRight,
  FileCode,
  Workflow,
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { playSound } from '../utils/audio';

export interface TechItem {
  id: string;
  name: string;
  version: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'cloud' | 'mobile' | 'security';
  categoryLabel: string;
  desc: string;
  longDesc: string;
  icon: any;
  status: 'PROD_ACTIVE' | 'ENTERPRISE_GRADE' | 'SUB_5MS_LATENCY' | 'SOC2_COMPLIANT';
  tags: string[];
  latencyBenchmark: string;
  useCase: string;
}

interface TechnologyStackProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Ecosystems', icon: Layers },
  { id: 'frontend', label: 'Frontend & Rendering', icon: Code2 },
  { id: 'backend', label: 'Backend & APIs', icon: Server },
  { id: 'database', label: 'Databases & Storage', icon: Database },
  { id: 'ai', label: 'AI & Neural Models', icon: BrainCircuit },
  { id: 'cloud', label: 'Cloud & SecOps', icon: CloudLightning },
  { id: 'mobile', label: 'Mobile & Cross-Platform', icon: Smartphone },
  { id: 'security', label: 'Security, QA & Audits', icon: ShieldCheck },
];

const TECH_ITEMS: TechItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React JS',
    version: 'v19.0',
    category: 'frontend',
    categoryLabel: 'Frontend & Rendering',
    desc: 'Component orchestration engine with Concurrent Mode & Server Components.',
    longDesc: 'React 19 powers our dynamic, high-performance web applications. It provides declarative component architectures, automatic batching, optimized virtual DOM reconciliation, and full compatibility with modern state management solutions.',
    icon: Code2,
    status: 'PROD_ACTIVE',
    tags: ['Server Components', 'Hooks API', 'Concurrent Mode', 'Virtual DOM'],
    latencyBenchmark: '< 16ms render loop',
    useCase: 'Interactive client dashboards, web apps, SaaS frontends, real-time control panels.'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    version: 'v15.1',
    category: 'frontend',
    categoryLabel: 'Frontend & Rendering',
    desc: 'Hybrid SSR, SSG, Edge routing, and automatic image/font optimization.',
    longDesc: 'Next.js enables enterprise web applications with hybrid rendering strategies. By combining static site generation (SSG) with server-side rendering (SSR) and edge middleware, we achieve sub-100ms First Contentful Paint (FCP).',
    icon: Server,
    status: 'ENTERPRISE_GRADE',
    tags: ['App Router', 'Edge Middleware', 'Hybrid SSR/SSG', 'SEO Optimization'],
    latencyBenchmark: 'Sub-100ms FCP',
    useCase: 'SEO-critical corporate portals, multi-tenant SaaS, e-commerce stores, content hubs.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    version: 'v5.5',
    category: 'frontend',
    categoryLabel: 'Frontend & Rendering',
    desc: 'Strong static typing eliminating runtime null/undefined defects across full stack.',
    longDesc: 'We enforce 100% strict TypeScript across all frontend and backend projects. Static type safety catches errors at compile time, accelerates developer onboarding, and guarantees robust API contracts.',
    icon: FileCode,
    status: 'PROD_ACTIVE',
    tags: ['Strict Typing', 'Generics', 'Compile-time Safety', 'Auto Complete'],
    latencyBenchmark: '0ms runtime overhead',
    useCase: 'Mission-critical enterprise software, complex data pipelines, multi-developer codebases.'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    version: 'v4.0',
    category: 'frontend',
    categoryLabel: 'Frontend & Rendering',
    desc: 'Utility-first CSS framework producing atomic, zero-runtime bloat design tokens.',
    longDesc: 'Tailwind CSS v4 provides atomic utility classes that purge unused CSS in production builds, resulting in minified stylesheets under 15KB with perfect responsive consistency.',
    icon: Layers,
    status: 'PROD_ACTIVE',
    tags: ['Utility-First', 'Zero Runtime', 'Design Tokens', 'PurgeCSS Engine'],
    latencyBenchmark: '< 12KB CSS bundle',
    useCase: 'Consistent design system engineering, dark/light themes, ultra-fast mobile layouts.'
  },
  {
    id: 'vite',
    name: 'Vite',
    version: 'v6.0',
    category: 'frontend',
    categoryLabel: 'Frontend & Rendering',
    desc: 'Native ES-module dev server and lightning Rollup production bundler.',
    longDesc: 'Vite leverages native browser ES modules during development and optimized Rollup bundling for production, offering sub-second Hot Module Replacement (HMR) and instantaneous build times.',
    icon: Zap,
    status: 'SUB_5MS_LATENCY',
    tags: ['Native ESM', 'Sub-second HMR', 'Rollup Bundler', 'Tree-shaking'],
    latencyBenchmark: '< 100ms dev start',
    useCase: 'Rapid SPA compilation, component library development, lightweight web tools.'
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    version: 'v22 LTS',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    desc: 'Asynchronous event-driven JavaScript/TypeScript server runtime engine.',
    longDesc: 'Node.js LTS provides non-blocking I/O operations ideal for high-concurrency API gateways, WebSocket servers, and real-time streaming services handling tens of thousands of concurrent connections.',
    icon: Terminal,
    status: 'ENTERPRISE_GRADE',
    tags: ['Non-blocking I/O', 'V8 Engine', 'Event Loop', 'TypeScript Native'],
    latencyBenchmark: '< 8ms API response',
    useCase: 'High-throughput microservices, REST/GraphQL gateways, real-time chat & telemetry.'
  },
  {
    id: 'python',
    name: 'Python FastAPI',
    version: 'v3.12 / v0.111',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    desc: 'High-performance ASGI framework with automated OpenAPI spec & Pydantic models.',
    longDesc: 'FastAPI combines Starlette and Pydantic to deliver microsecond Python REST APIs with automatic request validation, async/await concurrency, and interactive Swagger documentation.',
    icon: Terminal,
    status: 'SUB_5MS_LATENCY',
    tags: ['ASGI Async', 'Pydantic Types', 'Swagger OpenAPI', 'Python ML Native'],
    latencyBenchmark: '< 10ms processing',
    useCase: 'AI model serving pipelines, vector retrieval APIs, data science automation.'
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    version: 'v10.3',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    desc: 'Modular, scalable enterprise backend framework built on TypeScript & RxJS.',
    longDesc: 'NestJS provides an opinionated architecture incorporating Dependency Injection, decorators, modular organization, and native support for microservice transport layers (gRPC, NATS, Kafka).',
    icon: Server,
    status: 'ENTERPRISE_GRADE',
    tags: ['Dependency Injection', 'Modular Architecture', 'gRPC Support', 'Microservices'],
    latencyBenchmark: '< 12ms middleware',
    useCase: 'Large-scale corporate backends, banking platforms, enterprise ERP/CRM engines.'
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    version: 'v1.22',
    category: 'backend',
    categoryLabel: 'Backend & APIs',
    desc: 'Compiled concurrent systems language engineered for high-density cloud nodes.',
    longDesc: 'Go delivers near-C performance with lightweight Goroutines, making it our primary choice for low-level network proxies, high-frequency transaction processing, and custom cloud controllers.',
    icon: Cpu,
    status: 'SUB_5MS_LATENCY',
    tags: ['Goroutines', 'Garbage Collected', 'Static Binary', 'gRPC Native'],
    latencyBenchmark: '< 2ms execution',
    useCase: 'High-frequency trading engines, network proxies, distributed worker pools.'
  },

  // Database
  {
    id: 'postgres',
    name: 'PostgreSQL / Cloud SQL',
    version: 'v16.2',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    desc: 'ACID-compliant relational database standard with native JSONB & PGVector.',
    longDesc: 'PostgreSQL is our primary relational datastore. It guarantees strict transactional integrity (ACID), supports complex JOIN operations, JSONB document querying, and vector similarity search via PGVector.',
    icon: Database,
    status: 'ENTERPRISE_GRADE',
    tags: ['ACID Integrity', 'PGVector Search', 'JSONB Document', 'Connection Pooling'],
    latencyBenchmark: '< 3ms query return',
    useCase: 'Core relational data models, financial transaction ledgers, inventory systems.'
  },
  {
    id: 'redis',
    name: 'Redis Enterprise',
    version: 'v7.2',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    desc: 'In-memory data structure store used as database, cache, and message broker.',
    longDesc: 'Redis provides sub-millisecond data retrieval for session caching, rate-limiting counters, pub/sub websocket broadcasting, and temporary queue management.',
    icon: Zap,
    status: 'SUB_5MS_LATENCY',
    tags: ['Sub-ms Retrieval', 'Pub/Sub Broker', 'Key-Value Cache', 'Rate Limiting'],
    latencyBenchmark: '< 0.5ms lookup',
    useCase: 'Session management, API rate limiting, database query caching, real-time feeds.'
  },
  {
    id: 'pinecone',
    name: 'Pinecone Vector DB',
    version: 'Enterprise Cloud',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    desc: 'Fully managed cloud vector database for ultra-fast ANN similarity search.',
    longDesc: 'Pinecone stores high-dimensional embeddings generated by LLMs, allowing AI applications to perform semantic similarity searches over millions of corporate documents in milliseconds.',
    icon: BrainCircuit,
    status: 'PROD_ACTIVE',
    tags: ['Vector Similarity', 'Semantic Search', 'RAG Indexing', 'Million+ Scale'],
    latencyBenchmark: '< 25ms vector ANN',
    useCase: 'RAG knowledgebases, document search engines, AI agent memory context.'
  },
  {
    id: 'supabase',
    name: 'Supabase & Firestore',
    version: 'v2.0 / Firebase',
    category: 'database',
    categoryLabel: 'Databases & Storage',
    desc: 'Serverless real-time database backends with Row Level Security (RLS).',
    longDesc: 'Supabase and Firestore provide instant REST/GraphQL APIs, real-time WebSocket state synchronization, automated storage buckets, and granular row-level security policies.',
    icon: CloudLightning,
    status: 'SOC2_COMPLIANT',
    tags: ['Row Level Security', 'Real-time Sync', 'Serverless APIs', 'Cloud Buckets'],
    latencyBenchmark: '< 15ms WebSocket',
    useCase: 'Rapid MVP launches, collaborative multi-user apps, real-time notification feeds.'
  },

  // AI & ML
  {
    id: 'gemini',
    name: 'Google Gemini 2.0',
    version: 'Flash & Pro',
    category: 'ai',
    categoryLabel: 'AI & Neural Models',
    desc: 'Multimodal AI reasoning engine with 2M+ token context & real-time Live API.',
    longDesc: 'Gemini 2.0 powers MetaWave’s enterprise AI solutions. With industry-leading multimodal understanding (text, audio, vision, video) and 2M token context windows, Gemini handles complex document extraction, code generation, and agentic workflows.',
    icon: Sparkles,
    status: 'PROD_ACTIVE',
    tags: ['2M Token Window', 'Multimodal Vision', 'Function Calling', 'Structured JSON'],
    latencyBenchmark: '< 300ms first token',
    useCase: 'Automated document processing, agentic AI workflows, code audit assistants.'
  },
  {
    id: 'openai',
    name: 'OpenAI GPT-4o',
    version: 'Omni Model',
    category: 'ai',
    categoryLabel: 'AI & Neural Models',
    desc: 'Advanced language generation, reasoning, and tool-calling execution framework.',
    longDesc: 'GPT-4o delivers high-precision semantic understanding, multilingual translation, and tool integration via function calling, enabling autonomous business agents.',
    icon: BrainCircuit,
    status: 'ENTERPRISE_GRADE',
    tags: ['Tool Calling', 'Multilingual', 'Advanced Reasoning', 'Structured Output'],
    latencyBenchmark: '< 400ms first token',
    useCase: 'Customer support agents, automated code refactoring, complex decision pipelines.'
  },
  {
    id: 'langchain',
    name: 'LangChain & LlamaIndex',
    version: 'v0.2',
    category: 'ai',
    categoryLabel: 'AI & Neural Models',
    desc: 'Frameworks for connecting LLMs to private enterprise data via RAG pipelines.',
    longDesc: 'We construct custom Retrieval-Augmented Generation (RAG) pipelines using LangChain and LlamaIndex to allow enterprise AI models to securely query internal databases, PDF repositories, and CRM records without hallucinating.',
    icon: Workflow,
    status: 'SOC2_COMPLIANT',
    tags: ['RAG Pipeline', 'Document Chunking', 'Embeddings Routing', 'Zero Hallucination'],
    latencyBenchmark: '< 350ms total loop',
    useCase: 'Private corporate knowledge search, medical record query systems, legal analysis.'
  },

  // Cloud & SecOps
  {
    id: 'gcp-aws',
    name: 'GCP & AWS Cloud',
    version: 'Enterprise Tier',
    category: 'cloud',
    categoryLabel: 'Cloud & SecOps',
    desc: 'Managed cloud infrastructure across Cloud Run, GKE, AWS ECS, and Lambda.',
    longDesc: 'Our multi-cloud deployment strategy spans Google Cloud Platform and Amazon Web Services, offering automated horizontal container scaling, multi-region failover, and serverless edge execution.',
    icon: CloudLightning,
    status: 'SOC2_COMPLIANT',
    tags: ['Multi-Cloud', 'Auto-scaling', 'Serverless Containers', 'Global Edge CDN'],
    latencyBenchmark: '99.99% Uptime SLA',
    useCase: 'Mission-critical enterprise hosting, global load balancing, serverless microservices.'
  },
  {
    id: 'docker-k8s',
    name: 'Docker & Kubernetes',
    version: 'v26 / v1.30',
    category: 'cloud',
    categoryLabel: 'Cloud & SecOps',
    desc: 'Immutable container packaging and automated cluster orchestration.',
    longDesc: 'Every MetaWave application is packaged into lightweight Docker containers and managed via Kubernetes, guaranteeing identical behavior across developer laptops, staging servers, and production clouds.',
    icon: Box,
    status: 'ENTERPRISE_GRADE',
    tags: ['Immutable Containers', 'Self-Healing Pods', 'Blue/Green Rollout', 'Helm Charts'],
    latencyBenchmark: '< 1s pod spawn',
    useCase: 'Zero-downtime rolling updates, microservice isolation, cloud-agnostic portability.'
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions CI/CD',
    version: 'v4 Pipeline',
    category: 'cloud',
    categoryLabel: 'Cloud & SecOps',
    desc: 'Automated build, lint, unit test, SonarQube audit, and container deployment.',
    longDesc: 'Our automated CI/CD pipelines run code linting, unit/integration tests, vulnerability security scans, and automated deployments upon every pull request approval.',
    icon: RefreshCw,
    status: 'PROD_ACTIVE',
    tags: ['Automated Testing', 'SonarQube Lint', 'Docker Registry', 'Zero Downtime'],
    latencyBenchmark: '< 3min build pipeline',
    useCase: 'Continuous integration, automated regression testing, instant production releases.'
  },

  // Mobile
  {
    id: 'flutter',
    name: 'Flutter',
    version: 'v3.22',
    category: 'mobile',
    categoryLabel: 'Mobile & Cross-Platform',
    desc: 'Google single-codebase framework producing 60 FPS native iOS & Android binaries.',
    longDesc: 'Flutter compiles directly to native ARM machine code, offering 60 FPS smooth rendering, custom design system controls, and up to 40% reduction in mobile development timelines.',
    icon: Smartphone,
    status: 'PROD_ACTIVE',
    tags: ['Native ARM Code', '60 FPS Canvas', 'iOS & Android', 'Shared Codebase'],
    latencyBenchmark: '60 FPS steady UI',
    useCase: 'Cross-platform mobile apps, enterprise field operations apps, Fintech mobile wallets.'
  },
  {
    id: 'react-native',
    name: 'React Native & Expo',
    version: 'v0.74',
    category: 'mobile',
    categoryLabel: 'Mobile & Cross-Platform',
    desc: 'Native mobile UI framework using JavaScript/TypeScript logic thread.',
    longDesc: 'React Native allows web engineering teams to build native mobile experiences with shared React components, instant OTA updates, and native device hardware access.',
    icon: Code2,
    status: 'ENTERPRISE_GRADE',
    tags: ['Native Widgets', 'OTA CodePush', 'React Ecosystem', 'Shared Logic'],
    latencyBenchmark: '< 100ms startup',
    useCase: 'E-commerce mobile apps, social media feeds, healthcare patient portals.'
  },

  // Security
  {
    id: 'sonarqube',
    name: 'SonarQube & OWASP',
    version: 'v10.5',
    category: 'security',
    categoryLabel: 'Security, QA & Audits',
    desc: 'Static code security analysis detecting OWASP Top 10 vulnerabilities & code smells.',
    longDesc: 'We mandate SonarQube static code analysis across all Git pull requests to prevent security vulnerabilities, SQL injections, hardcoded secrets, and memory leaks before merge.',
    icon: ShieldCheck,
    status: 'SOC2_COMPLIANT',
    tags: ['OWASP Top 10', 'Static Code Analysis', 'CVE Scanning', 'Secret Leak Guard'],
    latencyBenchmark: '100% Security Pass',
    useCase: 'Security audit compliance, HIPAA/PCI-DSS code verification, code quality gates.'
  }
];

export function TechnologyStack({ onNavigate, isStandalonePage = false }: TechnologyStackProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemModal, setActiveItemModal] = useState<TechItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Stack Estimator State
  const [estimatorPlatform, setEstimatorPlatform] = useState<'web' | 'mobile' | 'saas' | 'ai'>('web');
  const [estimatorFrontend, setEstimatorFrontend] = useState('react');
  const [estimatorBackend, setEstimatorBackend] = useState('nodejs');
  const [estimatorDatabase, setEstimatorDatabase] = useState('postgres');
  const [estimatorAi, setEstimatorAi] = useState('gemini');

  // Filter items
  const filteredTech = useMemo(() => {
    return TECH_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.longDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (catId: string) => {
    playSound('toggle');
    setSelectedCategory(catId);
  };

  const handleCardClick = (item: TechItem) => {
    playSound('click');
    setActiveItemModal(item);
  };

  const handleCopySpec = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('toggle');
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stack Estimator calculations
  const stackScore = useMemo(() => {
    let latency = '< 25ms';
    let securityGrade = 'A+ (SOC 2)';
    let scaleLimit = '100k+ Active Users';
    let devTimeline = '3–6 Weeks';

    if (estimatorPlatform === 'ai') {
      latency = '< 250ms (LLM)';
      securityGrade = 'A++ (Zero Public Data)';
      scaleLimit = '50k+ Concurrent AI Tokens';
      devTimeline = '4–8 Weeks';
    } else if (estimatorPlatform === 'mobile') {
      latency = '60 FPS Native';
      devTimeline = '4–7 Weeks';
    }

    return { latency, securityGrade, scaleLimit, devTimeline };
  }, [estimatorPlatform, estimatorFrontend, estimatorBackend, estimatorDatabase, estimatorAi]);

  return (
    <div id="tech-stack" className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      
      {/* Background soft ambiance glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#326E45]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Header / Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Sparkles size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              CERTIFIED ENTERPRISE PRODUCTION ECOSYSTEM
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
          >
            Vetted Technical Architectures for <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Scale & Security</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            We build software using type-safe, open-standard enterprise frameworks engineered for sub-150ms page load speeds, bank-grade encryption, and 100% client IP portability.
          </motion.p>
        </div>

        {/* 4 Core Guarantees Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Sub-150ms TTFB</div>
              <div className="text-slate-500 text-[11px]">Global edge CDN routes</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Type-Safe</div>
              <div className="text-slate-500 text-[11px]">Strict TypeScript & Python</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">ISO 27001 & SOC 2</div>
              <div className="text-slate-500 text-[11px]">SecOps & OWASP compliance</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Box size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Zero Lock-In</div>
              <div className="text-slate-500 text-[11px]">Dockerized container portability</div>
            </div>
          </div>
        </div>

        {/* Live Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frameworks, databases, cloud tools (e.g., 'React', 'Gemini', 'PostgreSQL', 'AWS')..."
              className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200/90 rounded-2xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#326E45] focus:ring-3 focus:ring-[#326E45]/10 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? TECH_ITEMS.length 
                : TECH_ITEMS.filter(t => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#326E45] text-white shadow-xs border border-[#326E45]'
                      : 'bg-white hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-slate-200/90'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#245032] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between text-xs text-slate-500 font-mono px-1">
          <div>
            SHOWING <span className="text-[#326E45] font-bold">{filteredTech.length}</span> TECHNOLOGIES
            {searchQuery && <span> MATCHING "<span className="text-slate-900">{searchQuery}</span>"</span>}
          </div>
          {filteredTech.length < TECH_ITEMS.length && (
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-[#326E45] hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Technology Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredTech.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs">
              <Info size={40} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-2">No technologies match your search</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto mb-5">
                Try searching with different framework names or reset your category filter.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Search Filters
              </button>
            </div>
          ) : (
            filteredTech.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => handleCardClick(item)}
                  className="bg-white border border-slate-200/90 hover:border-[#326E45]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group relative overflow-hidden"
                >
                  {/* Radial accent glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#326E45]/[0.02] to-teal-500/[0.02] rounded-full blur-xl group-hover:from-[#326E45]/[0.08] transition-all duration-300 pointer-events-none" />

                  <div>
                    {/* Top Row: Icon + Version Tag + Category */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#326E45] group-hover:bg-[#326E45] group-hover:text-white transition-all duration-300 shrink-0 shadow-3xs">
                        <Icon size={20} />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200/60">
                          {item.version}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 uppercase font-bold">
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-[#326E45] transition-colors">
                          {item.name}
                        </h3>
                        <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#326E45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom benchmark indicator */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                      <Gauge size={13} className="text-[#326E45]" />
                      <span>{item.latencyBenchmark}</span>
                    </div>

                    <span className="text-[#326E45] font-bold text-[11px] group-hover:underline inline-flex items-center gap-1">
                      Deep Specs →
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Custom Interactive Architecture Stack Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-16 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE STACK ARCHITECT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Configure Your Ideal Production Stack
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your core software layers to preview estimated system latency, security ratings, and deployment timelines.
                </p>
              </div>

              {/* Selector Controls */}
              <div className="space-y-4">
                {/* Platform Target */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Target Platform
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'web', label: 'Web Application' },
                      { id: 'mobile', label: 'Mobile App' },
                      { id: 'saas', label: 'SaaS Platform' },
                      { id: 'ai', label: 'AI Agent / RAG' },
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => { playSound('toggle'); setEstimatorPlatform(p.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          estimatorPlatform === p.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frontend Layer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1 uppercase">
                      2. Frontend Layer
                    </label>
                    <select
                      value={estimatorFrontend}
                      onChange={(e) => setEstimatorFrontend(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#326E45]"
                    >
                      <option value="react">React 19 + Vite</option>
                      <option value="nextjs">Next.js 15 App Router</option>
                      <option value="flutter">Flutter Cross-Platform</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1 uppercase">
                      3. Backend Framework
                    </label>
                    <select
                      value={estimatorBackend}
                      onChange={(e) => setEstimatorBackend(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#326E45]"
                    >
                      <option value="nodejs">Node.js / Express</option>
                      <option value="python">Python FastAPI</option>
                      <option value="nestjs">NestJS Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1 uppercase">
                      4. Primary Database
                    </label>
                    <select
                      value={estimatorDatabase}
                      onChange={(e) => setEstimatorDatabase(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#326E45]"
                    >
                      <option value="postgres">PostgreSQL / Cloud SQL</option>
                      <option value="redis">Redis + Postgres</option>
                      <option value="pinecone">Pinecone Vector + Postgres</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Score Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">ESTIMATED BENCHMARK</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  PROD_READY
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Target Latency:</span>
                  <span className="font-mono font-bold text-slate-900">{stackScore.latency}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Security Grade:</span>
                  <span className="font-mono font-bold text-slate-900">{stackScore.securityGrade}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Concurrency Limit:</span>
                  <span className="font-mono font-bold text-slate-900">{stackScore.scaleLimit}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Target MVP Timeline:</span>
                  <span className="font-mono font-bold text-[#326E45]">{stackScore.devTimeline}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Consult Our CTO On This Stack</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Drawer for Deep Tech Details */}
        <AnimatePresence>
          {activeItemModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left"
              >
                <button
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#326E45] text-white flex items-center justify-center shadow-md">
                    {React.createElement(activeItemModal.icon, { size: 24 })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-display font-bold text-slate-900">{activeItemModal.name}</h3>
                      <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 border border-slate-200">
                        {activeItemModal.version}
                      </span>
                    </div>
                    <span className="text-xs text-[#326E45] font-mono font-bold uppercase">{activeItemModal.categoryLabel}</span>
                  </div>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-5">
                  {activeItemModal.longDesc}
                </p>

                <div className="space-y-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Latency Benchmark:</span>
                    <span className="font-mono font-bold text-[#326E45]">{activeItemModal.latencyBenchmark}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200/60 pt-2">
                    <span className="text-slate-500">Primary Role in Projects:</span>
                    <span className="font-medium text-slate-800 text-right max-w-[240px] truncate">{activeItemModal.useCase}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={(e) => handleCopySpec(`${activeItemModal.name} (${activeItemModal.version}) - ${activeItemModal.desc}`, activeItemModal.id, e)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {copiedId === activeItemModal.id ? <Check size={14} className="text-[#326E45]" /> : <Copy size={14} />}
                    <span>{copiedId === activeItemModal.id ? 'Spec Copied!' : 'Copy Technology Spec'}</span>
                  </button>

                  <button
                    onClick={() => { setActiveItemModal(null); onNavigate && onNavigate('contact'); }}
                    className="px-5 py-2.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Discuss Architectural Need
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

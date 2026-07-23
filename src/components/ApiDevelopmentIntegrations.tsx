import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Database, 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Sparkles, 
  Bot, 
  Workflow, 
  Cpu, 
  Globe2, 
  Lock, 
  Server, 
  Layers, 
  Radio, 
  Key, 
  GitMerge, 
  Webhook, 
  FileCode2, 
  Network
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface ApiDevelopmentIntegrationsProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const API_SOLUTIONS = [
  {
    id: 'rest-graphql-engineering',
    title: 'RESTful & GraphQL API Engineering',
    subtitle: 'SCHEMA-FIRST MICROSERVICES',
    icon: Code2,
    desc: 'Architect high-speed, type-safe RESTful and GraphQL APIs with OpenAPI 3.0 specification, sub-50ms query latency, automated SDK generation, and interactive developer documentation portals.',
    highlights: [
      'Schema-first GraphQL & REST API design with OpenAPI/Swagger contracts',
      'Sub-50ms response times backed by Redis caching & database indexing',
      'Type-safe SDK generation for TypeScript, Python, Swift & Kotlin',
      'Interactive Swagger / Postman developer portal documentation'
    ],
    tools: ['Node.js', 'Fastify', 'GraphQL', 'PostgreSQL', 'Redis', 'Swagger']
  },
  {
    id: 'api-gateway-middleware',
    title: 'Enterprise API Gateways & Middleware',
    subtitle: 'HIGH-THROUGHPUT ROUTING HUBS',
    icon: Network,
    desc: 'Deploy resilient API Gateways that handle request routing, rate limiting, token bucket throttling, SSL termination, request transformation, and circuit breaker fault tolerance.',
    highlights: [
      'Centralized request routing, header manipulation & load balancing',
      'DDoS protection, rate limiting & IP throttling policies',
      'Circuit breaker pattern implementation for graceful degradation',
      'Zero-downtime blue/green deployment orchestration'
    ],
    tools: ['Kong Gateway', 'AWS API Gateway', 'Envoy', 'Nginx', 'Docker']
  },
  {
    id: 'event-driven-webhooks',
    title: 'Event-Driven Webhooks & Real-Time Streams',
    subtitle: 'LOW-LATENCY EVENT BUSES',
    icon: Webhook,
    desc: 'Build scalable event streams and webhooks engines utilizing message queues, real-time WebSockets, and idempotent delivery handlers to broadcast live updates to millions of clients.',
    highlights: [
      'Event-driven pub/sub architecture using Kafka & RabbitMQ',
      'Idempotent webhook delivery with automated retry & exponential backoff',
      'Sub-10ms real-time WebSocket / SSE bi-directional streaming',
      'Dead-letter queue (DLQ) inspection & message replay capabilities'
    ],
    tools: ['Apache Kafka', 'RabbitMQ', 'Socket.io', 'Redis Streams', 'Node.js']
  },
  {
    id: 'third-party-saas-connectors',
    title: 'Third-Party SaaS & ERP Integration Middleware',
    subtitle: 'BI-DIRECTIONAL SYNC ENGINES',
    icon: GitMerge,
    desc: 'Connect disparate software systems seamlessly. We build custom API connectors between CRMs, ERPs, payment gateways, shipping providers, and marketing engines with zero data loss.',
    highlights: [
      'Custom middleware connecting Salesforce, SAP, NetSuite, and Stripe',
      'Real-time bi-directional data synchronization with conflict resolution',
      'Automated data transformation, sanitization & field mapping pipelines',
      'Comprehensive error logging, Slack alerts & webhook health dashboards'
    ],
    tools: ['Node.js Middleware', 'PostgreSQL', 'Zapier/Make', 'Rest API', 'Webhooks']
  },
  {
    id: 'legacy-system-wrappers',
    title: 'Legacy System Modernization & Facades',
    subtitle: 'ZERO-RISK API MODERNIZATION',
    icon: Server,
    desc: 'Wrap monolithic legacy databases, SOAP services, or mainframe applications in modern RESTful/GraphQL microservice facades without replacing underlying core databases.',
    highlights: [
      'SOAP-to-REST and XML-to-JSON automated transformation layers',
      'Microservice abstraction over legacy SQL & mainframe databases',
      'Zero-downtime incremental migration strategies (Strangler Fig pattern)',
      'High-performance connection pooling & query optimization'
    ],
    tools: ['Node.js', 'Express', 'Go (Golang)', 'GraphQL', 'Docker']
  },
  {
    id: 'oauth2-api-security',
    title: 'OAuth2, JWT & API Security Governance',
    subtitle: 'ZERO-TRUST API DEFENSE',
    icon: ShieldCheck,
    desc: 'Secure your API endpoints against OWASP API Top 10 vulnerabilities with OAuth 2.0 / OIDC authentication servers, signed JWT tokens, mTLS, and fine-grained scope authorization.',
    highlights: [
      'Custom OAuth 2.0 PKCE & OIDC authorization server implementation',
      'Signed JWT access tokens with short-lived refresh token rotation',
      'Mutual TLS (mTLS) for secure server-to-server communications',
      'Automated OWASP API vulnerability scanning & penetration testing'
    ],
    tools: ['OAuth2.0', 'Auth0', 'JWT', 'Kong Security', 'Vault', 'Crypto']
  }
];

const API_STACK_TABS = [
  {
    id: 'protocols_frameworks',
    label: 'API Protocols & Core Frameworks',
    items: [
      { name: 'Node.js, Express & Fastify', spec: 'Asynchronous event loop for 50,000+ concurrent connections', benchmark: 'Ultra-Fast I/O' },
      { name: 'Go (Golang) Microservices', spec: 'Compiled high-performance microservices with gRPC protocol buffers', benchmark: 'Sub-5ms Latency' },
      { name: 'GraphQL (Apollo Server)', spec: 'Type-safe unified API graph with client-driven query resolution', benchmark: 'Zero Over-Fetching' }
    ]
  },
  {
    id: 'gateways_queues',
    label: 'API Gateways & Event Streaming',
    items: [
      { name: 'Kong & AWS API Gateway', spec: 'Centralized request routing, SSL termination, and rate limiting', benchmark: 'Enterprise Standard' },
      { name: 'Apache Kafka & RabbitMQ', spec: 'Distributed event bus processing millions of events/sec', benchmark: 'High Throughput' },
      { name: 'Redis Streams & Cluster', spec: 'In-memory caching layer & pub/sub messaging queue', benchmark: 'Sub-2ms Cache' }
    ]
  },
  {
    id: 'security_governance',
    label: 'Security, Auth & Governance',
    items: [
      { name: 'OAuth 2.0, OIDC & JWT', spec: 'Token-based authentication with PKCE flows & scope validation', benchmark: 'Zero-Trust Security' },
      { name: 'OpenAPI 3.0 / Swagger', spec: 'Machine-readable API contracts with automated client SDK generation', benchmark: 'Developer Friendly' },
      { name: 'HashiCorp Vault & mTLS', spec: 'Hardware-grade secret storage & mutual TLS certificate encryption', benchmark: 'PCI-DSS Compliant' }
    ]
  }
];

const API_PROCESS_STEPS = [
  {
    num: '01',
    title: 'API Architecture & Schema Contract Specification',
    desc: 'We define strict OpenAPI/GraphQL contracts, endpoint routes, payload schemas, and authentication requirements before writing a single line of code.'
  },
  {
    num: '02',
    title: 'Microservice Engineering & Middleware Pipeline',
    desc: 'We engineer high-speed microservices, write database ORM query models, and build custom request/response transformation middleware.'
  },
  {
    num: '03',
    title: 'OAuth2 Security, Rate Limiting & Gateway Config',
    desc: 'We configure the API Gateway with JWT authorization tokens, IP throttling rules, CORS policies, and SSL/mTLS encryption.'
  },
  {
    num: '04',
    title: 'Automated Fuzzing, Load Testing & Latency Tuning',
    desc: 'We execute stress tests up to 100,000 requests/sec, optimize SQL index queries, and verify circuit breaker fault tolerance.'
  },
  {
    num: '05',
    title: 'Deployment, Developer Portal & Telemetry Monitoring',
    desc: 'We deploy to containerized Kubernetes clusters, publish interactive Swagger documentation, and monitor API telemetry 24/7.'
  }
];

const API_FAQS = [
  {
    q: 'Should our company choose RESTful APIs or GraphQL for our mobile & web apps?',
    a: 'RESTful APIs are ideal for standard CRUD operations, third-party partner integrations, and strict caching. GraphQL excels for complex web/mobile apps where clients require nested relational data in a single request without over-fetching. We often build hybrid architectures leveraging REST for external partners and GraphQL for frontend applications.'
  },
  {
    q: 'How do you ensure API security and prevent OWASP API vulnerabilities?',
    a: 'We implement zero-trust security architecture including OAuth 2.0 with PKCE, JWT token rotation, strict rate limiting, input payload sanitization, CORS restrictions, SQL injection protection, and mTLS for server-to-server communication.'
  },
  {
    q: 'Can MetaWave integrate our new APIs with our legacy databases and systems?',
    a: 'Yes. We build modern API wrapper facades (using the Strangler Fig pattern) around legacy databases, monolithic backends, or SOAP web services, allowing you to launch modern React/Mobile apps without risky core system overhauls.'
  },
  {
    q: 'How do you handle API versioning and backward compatibility?',
    a: 'We implement semantic API versioning (e.g., /v1/, /v2/ or GraphQL schema evolution) and deprecation headers, ensuring legacy mobile app versions continue operating seamlessly as new API features are released.'
  },
  {
    q: 'What uptime SLA and performance latency do your APIs deliver?',
    a: 'Our engineered APIs routinely deliver sub-50ms average query latency and 99.999% uptime SLAs backed by auto-scaling Kubernetes container clusters and multi-region Redis cache redundancy.'
  }
];

export function ApiDevelopmentIntegrations({ onNavigate, isStandalonePage = false }: ApiDevelopmentIntegrationsProps) {
  const [activeStackTab, setActiveStackTab] = useState('protocols_frameworks');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive API Throughput & Latency Performance Calculator
  const [monthlyRequestsMillion, setMonthlyRequestsMillion] = useState(15); // millions
  const [avgPayloadKb, setAvgPayloadKb] = useState(8); // KB
  const [cacheHitRatio, setCacheHitRatio] = useState(75); // %

  const calculatedApiPerformance = useMemo(() => {
    const totalRequests = monthlyRequestsMillion * 1_000_000;
    const cacheHitRequests = totalRequests * (cacheHitRatio / 100);
    const dbRequests = totalRequests - cacheHitRequests;
    
    // Bandwidth in GB
    const monthlyBandwidthGb = Math.round((totalRequests * avgPayloadKb) / 1024 / 1024);
    
    // Average Latency Estimate (Cache = 5ms, DB = 45ms)
    const avgLatencyMs = Math.round((cacheHitRequests * 5 + dbRequests * 45) / totalRequests);
    
    // Estimated Server Compute Cost Saved via Caching & Gateway Optimization
    const estimatedMonthlySavings = Math.round((totalRequests / 1_000_000) * 85 * (cacheHitRatio / 100));

    return {
      monthlyBandwidthGb,
      avgLatencyMs,
      cacheHitRequests: Math.round(cacheHitRequests / 1_000_000),
      estimatedMonthlySavings
    };
  }, [monthlyRequestsMillion, avgPayloadKb, cacheHitRatio]);

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
          <span className="text-[#326E45] font-bold">API Development & Integration</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Code2 size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              ENTERPRISE API ENGINEERING & SYSTEM INTEGRATION STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            High-Performance <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">API Development & Integrations</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Architect high-throughput RESTful & GraphQL APIs, microservice gateways, real-time webhook streaming, third-party SaaS connectors, and zero-downtime legacy system integration solutions.
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
              <span>Schedule API Strategy Session</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore API Tech Stack</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Sub-50ms Latency</div>
              <div className="text-slate-500 text-[11px]">gRPC & Redis Caching</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Server size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">99.999% Uptime SLA</div>
              <div className="text-slate-500 text-[11px]">Kubernetes Auto-scaling</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Zero-Trust Security</div>
              <div className="text-slate-500 text-[11px]">OAuth2 & JWT Rotation</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Network size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">10M+ Daily Requests</div>
              <div className="text-slate-500 text-[11px]">High Throughput Microservices</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core API Solutions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Code2 size={12} />
              <span>CORE API & SYSTEM INTEGRATION SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Enterprise API & Middleware Engineering
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From REST/GraphQL schema design to API gateways, real-time pub/sub webhooks, and zero-risk legacy wrappers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {API_SOLUTIONS.map((item) => {
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

                  {/* Tools pill tags */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-1.5">
                    {item.tools.map((t, tIdx) => (
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

        {/* Section 2: Interactive API Latency & Bandwidth Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>API PERFORMANCE & LATENCY ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate API Latency & Infrastructure Savings
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Optimizing API query execution, Redis memory caching, and gRPC payload compression dramatically lowers server compute overhead and speeds up response times.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Monthly API Requests Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Monthly API Request Volume:</span>
                    <span className="text-[#326E45] font-mono">{monthlyRequestsMillion} Million req/mo</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={monthlyRequestsMillion}
                    onChange={(e) => { playSound('toggle'); setMonthlyRequestsMillion(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Avg Payload Size Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Payload Size:</span>
                    <span className="text-[#326E45] font-mono">{avgPayloadKb} KB / request</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={avgPayloadKb}
                    onChange={(e) => { playSound('toggle'); setAvgPayloadKb(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Redis Cache Hit Ratio Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Redis Cache Hit Target Ratio:</span>
                    <span className="text-[#326E45] font-mono">{cacheHitRatio}% cache hit</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    step="5"
                    value={cacheHitRatio}
                    onChange={(e) => { playSound('toggle'); setCacheHitRatio(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">ESTIMATED BENCHMARK OUTPUT</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  HIGH SPEED API
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED AVERAGE API LATENCY</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">{calculatedApiPerformance.avgLatencyMs} ms / request</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">MONTHLY BANDWIDTH THROUGHPUT</span>
                  <span className="text-sm font-bold text-slate-700">{calculatedApiPerformance.monthlyBandwidthGb.toLocaleString()} GB / month</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED COMPUTE INFRASTRUCTURE SAVINGS</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    + ${calculatedApiPerformance.estimatedMonthlySavings.toLocaleString()} / month
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request API Architecture Audit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED API TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              API Protocols, Gateways & Security
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Battle-tested microservice frameworks, message queues, and API security tools.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {API_STACK_TABS.map((tab) => (
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
            {API_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 4: 5-Step Engineering Methodology */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              ENGINEERING LIFECYCLE
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step API Engineering Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From OpenAPI contract definition to microservices development, load testing, and telemetry.
            </p>
          </div>

          <div className="space-y-4">
            {API_PROCESS_STEPS.map((step, idx) => (
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
              Frequently Asked API Questions
            </h3>
          </div>

          <div className="space-y-3">
            {API_FAQS.map((faq, idx) => {
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
            Ready to Build High-Performance APIs & Integrations?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our senior API systems architects. Receive an OpenAPI contract proposal, microservice architecture blueprint, and fixed proposal within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book API Strategy Session</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

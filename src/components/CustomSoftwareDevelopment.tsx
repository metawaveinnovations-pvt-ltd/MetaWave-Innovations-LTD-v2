import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Server, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Layers, 
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
  GitBranch, 
  Box, 
  Activity, 
  FileCode, 
  Shield, 
  Network, 
  Settings, 
  Cloud
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface CustomSoftwareDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const SOFTWARE_SOLUTIONS = [
  {
    id: 'microservices',
    title: 'Distributed Microservices Architecture',
    subtitle: 'FAULT-TOLERANT & SCALABLE',
    icon: Network,
    desc: 'Decoupled, event-driven microservices engineered with Go, Node.js, or Java Spring Boot that independently scale to millions of concurrent user transactions with zero downtime.',
    highlights: [
      'gRPC & REST high-throughput service communication',
      'Apache Kafka & RabbitMQ asynchronous message streams',
      'Distributed tracing via Jaeger & OpenTelemetry',
      'Circuit breakers and automated fallback handling'
    ],
    tech: ['Go', 'Node.js', 'gRPC', 'Kafka', 'Docker', 'Kubernetes']
  },
  {
    id: 'cloud-native',
    title: 'Cloud-Native Enterprise Systems',
    subtitle: 'HYBRID & MULTI-CLOUD',
    icon: Cloud,
    desc: 'Bespoke enterprise applications built natively for AWS, GCP, or Microsoft Azure with serverless compute, automated elastic autoscaling, and multi-region failover.',
    highlights: [
      'Terraform & Pulumi Infrastructure-as-Code (IaC)',
      'Multi-region active-active database replication',
      'Zero-downtime blue/green deployment pipelines',
      'AWS ECS, GCP Cloud Run & Kubernetes pod orchestration'
    ],
    tech: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'PostgreSQL']
  },
  {
    id: 'legacy-modernization',
    title: 'Legacy Software Modernization',
    subtitle: 'RISK-FREE TRANSFORMATION',
    icon: Workflow,
    desc: 'Transform aging legacy monolithic systems into modern, high-performance cloud architectures without disrupting ongoing business operations or risking data loss.',
    highlights: [
      'Strangler-fig migration for zero business downtime',
      'Legacy database schema refactoring & normalization',
      'Automated API wrappers over legacy COBOL/C# backends',
      'Up to 70% reduction in legacy maintenance overhead'
    ],
    tech: ['Docker', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API']
  },
  {
    id: 'data-engines',
    title: 'High-Throughput Data & Analytics Engines',
    subtitle: 'REAL-TIME STREAM PROCESSING',
    icon: Database,
    desc: 'Ultra-fast data processing pipelines capable of ingesting, validating, and analyzing millions of telemetry records per second with millisecond query speeds.',
    highlights: [
      'Apache Spark & ClickHouse real-time analytics',
      'Redis & Memcached distributed in-memory caching',
      'PGVector & Milvus vector databases for AI searching',
      'Automated ETL pipelines with Airflow & dbt'
    ],
    tech: ['Python', 'ClickHouse', 'PostgreSQL', 'Redis', 'Kafka']
  },
  {
    id: 'erp-crm',
    title: 'Custom ERP & Operations Systems',
    subtitle: 'TAILORED WORKFLOW AUTOMATION',
    icon: Layers,
    desc: 'Tailor-made enterprise resource planning (ERP) and supply-chain management suites designed around your exact business logic and compliance standards.',
    highlights: [
      'Custom inventory, logistics, and order fulfillment tracking',
      'Granular Role-Based Access Control (RBAC) & Audit Logs',
      'Seamless integration with SAP, Salesforce & Oracle',
      'Real-time executive BI reporting dashboards'
    ],
    tech: ['React 19', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript']
  },
  {
    id: 'iot-embedded',
    title: 'IoT & Edge Computing Software',
    subtitle: 'HARDWARE & TELEMETRY CONTROL',
    icon: Cpu,
    desc: 'Embedded firmware and edge gateway software that connects hardware devices, sensors, and industrial machinery directly to secure cloud telemetry platforms.',
    highlights: [
      'MQTT & CoAP lightweight IoT messaging protocols',
      'On-device anomaly detection & predictive maintenance',
      'Hardware secure enclave encryption & device certificates',
      'Low-power edge computing for industrial automation'
    ],
    tech: ['C++', 'Rust', 'Python', 'MQTT', 'Docker Edge']
  }
];

const SOFTWARE_STACK_TABS = [
  {
    id: 'backend',
    label: 'Backend Core',
    items: [
      { name: 'Go (Golang 1.22)', spec: 'Ultra-fast compiled concurrency with goroutines', benchmark: '< 2ms API latency' },
      { name: 'Node.js 22 LTS', spec: 'Non-blocking event loop for high IOPS API gateways', benchmark: '< 5ms execution' },
      { name: 'Python 3.12 / FastAPI', spec: 'Asynchronous Python framework with Pydantic validation', benchmark: '< 8ms processing' },
      { name: 'Java 21 / Spring Boot', spec: 'Enterprise dependency injection & thread safety', benchmark: 'Enterprise Hardened' }
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    items: [
      { name: 'Kubernetes & Helm', spec: 'Production cluster orchestration & autoscaling', benchmark: '99.99% Uptime SLA' },
      { name: 'Terraform IaC', spec: 'Immutable infrastructure definition & versioning', benchmark: '100% Reproducible' },
      { name: 'Docker Containers', spec: 'Lightweight multi-stage container builds', benchmark: '< 50MB image size' }
    ]
  },
  {
    id: 'data',
    label: 'Databases & Message Queues',
    items: [
      { name: 'PostgreSQL 16', spec: 'ACID transactional integrity, PGVector & JSONB', benchmark: '< 3ms query speed' },
      { name: 'Apache Kafka', spec: 'High-throughput event streaming queue', benchmark: '> 100k msg/sec' },
      { name: 'Redis Enterprise', spec: 'Sub-millisecond distributed cache & session state', benchmark: '< 0.5ms lookup' }
    ]
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    items: [
      { name: 'OWASP Top 10 Hardening', spec: 'Bank-grade threat mitigation & SAN input cleansing', benchmark: '100% Security Pass' },
      { name: 'SOC2 & ISO 27001', spec: 'Strict encryption at rest (AES-256) and in transit (TLS 1.3)', benchmark: 'Audited Architecture' },
      { name: 'SonarQube SAST', spec: 'Automated static code security scanning in CI/CD', benchmark: 'Zero Vulnerabilities' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Architecture Blueprinting & Feasibility',
    desc: 'We analyze business workflows, evaluate throughput constraints, map domain data models, and design fault-tolerant system architecture diagrams.'
  },
  {
    num: '02',
    title: 'Domain-Driven Design (DDD) & API Contracts',
    desc: 'Our architects establish clean bounded contexts, define type-safe OpenAPI/gRPC schemas, and set up local Docker dev environments.'
  },
  {
    num: '03',
    title: 'Agile Microservice Development & Testing',
    desc: 'We build modular services in bi-weekly sprints with strict unit test coverage, integration tests, and continuous peer code reviews.'
  },
  {
    num: '04',
    title: 'Load Testing, Chaos Engineering & Security Audit',
    desc: 'We run automated load generators simulating 10x peak traffic, perform penetration testing, and test chaos failover procedures.'
  },
  {
    num: '05',
    title: 'Multi-Region Cloud Cutover & 24/7 SLA Telemetry',
    desc: 'We deploy to multi-region cloud clusters with automated blue/green cutover, 24/7 Prometheus/Grafana monitoring, and dedicated SLAs.'
  }
];

const SOFTWARE_FAQS = [
  {
    q: 'Why choose custom software development over off-the-shelf SaaS solutions?',
    a: 'Off-the-shelf software often forces your business to adapt its core processes to rigid vendor limitations and charge escalating per-user licensing fees. Custom software gives you 100% ownership, zero recurring vendor license costs, custom competitive features, and seamless integration with your existing IT stack.'
  },
  {
    q: 'How does MetaWave ensure 99.99% uptime and system scalability?',
    a: 'We architect for resilience from day one using decoupled microservices, containerized Kubernetes pods with automated horizontal pod autoscalers (HPA), circuit breaker fault isolation, and active-active multi-region database clustering.'
  },
  {
    q: 'Can MetaWave modernize our existing legacy software without downtime?',
    a: 'Yes. We utilize the industry-proven "Strangler-Fig" migration pattern. We wrap legacy systems in modern API facades and incrementally replace individual sub-modules one by one, ensuring zero interruption to daily business operations.'
  },
  {
    q: 'Who owns the source code, patents, and intellectual property?',
    a: 'Your enterprise retains 100% full intellectual property (IP) rights, source code ownership, patent rights, and design assets upon milestone completion with zero vendor lock-in or licensing royalties.'
  },
  {
    q: 'What post-launch maintenance and engineering support do you provide?',
    a: 'We offer flexible post-launch SLAs including 24/7 incident response, telemetry monitoring, automated security vulnerability patching, system performance optimizations, and dedicated monthly feature enhancement sprints.'
  }
];

export function CustomSoftwareDevelopment({ onNavigate, isStandalonePage = false }: CustomSoftwareDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('backend');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Estimator State
  const [systemCategory, setSystemCategory] = useState<'microservices' | 'cloud' | 'modernization' | 'erp'>('microservices');
  const [scaleGrade, setScaleGrade] = useState<'midmarket' | 'enterprise' | 'global'>('enterprise');
  const [includeAi, setIncludeAi] = useState(true);
  const [include247Sla, setInclude247Sla] = useState(true);

  const calculatedEstimate = useMemo(() => {
    let weeks = '6–10 Weeks';
    let team = '1 Principal Architect + 3 Senior Backend Engineers + 1 DevOps + 1 QA';
    let deliverables = 'Production System + CI/CD Infrastructure + 100% Source Code & Docs';

    if (systemCategory === 'modernization') {
      weeks = '8–12 Weeks';
      team = '1 Migration Architect + 3 Full-Stack Engineers + 1 SecOps';
      deliverables = 'Decoupled Microservice Architecture + Zero-Downtime Data Cutover Plan';
    } else if (systemCategory === 'erp') {
      weeks = '8–14 Weeks';
      team = '1 Solution Architect + 4 Senior Engineers + 1 UI/UX Specialist + 1 QA';
      deliverables = 'Custom ERP Suite + Granular RBAC + SAP/Salesforce API Integrations';
    }

    if (scaleGrade === 'global') {
      weeks = '12–16 Weeks';
      team = '2 Solution Architects + 5 Senior Engineers + 2 DevOps + 1 SecOps Lead';
      deliverables = 'Multi-Region Active-Active Cloud Architecture + SOC2 Hardened Vault';
    }

    return { weeks, team, deliverables };
  }, [systemCategory, scaleGrade, includeAi, include247Sla]);

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
          <span className="text-[#326E45] font-bold">Custom Software Development</span>
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
              CERTIFIED ENTERPRISE SOFTWARE ENGINEERING
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Fault-Tolerant <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Custom Enterprise Software</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We architect, engineer, and scale mission-critical custom enterprise software, distributed microservices, cloud-native backend engines, and legacy system modernizations with sub-10ms response times and 99.99% uptime SLAs.
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
              <span>Consult Our Lead Solutions Architect</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Cpu size={16} className="text-[#326E45]" />
              <span>Explore Tech Stack & Architecture</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&lt; 10ms API Latency</div>
              <div className="text-slate-500 text-[11px]">High-throughput backends</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Gauge size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">99.99% Uptime SLA</div>
              <div className="text-slate-500 text-[11px]">Multi-region active cloud</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC2 & ISO Compliant</div>
              <div className="text-slate-500 text-[11px]">Enterprise grade security</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% IP Assignment</div>
              <div className="text-slate-500 text-[11px]">Full ownership & zero lock-in</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Custom Software Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Code2 size={12} />
              <span>CUSTOM SOFTWARE ARCHITECTURES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Tailored Enterprise Software Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Select the software engineering model built specifically for your enterprise performance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOFTWARE_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Software Stack & Specs Explorer */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              PROVEN ENTERPRISE TECHNOLOGY STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              High-Concurrency Backend Frameworks
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Explore our approved software engineering languages, cloud orchestrators, and database engines.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {SOFTWARE_STACK_TABS.map((tab) => (
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
            {SOFTWARE_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive Custom Software Project Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your Custom Software Scope & Team
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Configure your enterprise software parameters to generate immediate delivery timelines, engineering squad allocations, and SLA commitments.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* System Category */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. System Architecture
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'microservices', label: 'Distributed Microservices' },
                      { id: 'cloud', label: 'Cloud-Native Platform' },
                      { id: 'modernization', label: 'Legacy Modernization' },
                      { id: 'erp', label: 'Custom ERP / CRM Suite' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => { playSound('toggle'); setSystemCategory(s.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          systemCategory === s.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale Grade */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Throughput & Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'midmarket', label: 'Mid-Market Scale' },
                      { id: 'enterprise', label: 'Enterprise Grade' },
                      { id: 'global', label: 'Global Active-Active' }
                    ].map(g => (
                      <button
                        key={g.id}
                        onClick={() => { playSound('toggle'); setScaleGrade(g.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          scaleGrade === g.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {g.label}
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
                    <span>Include Enterprise AI Agent Integration</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={include247Sla}
                      onChange={(e) => setInclude247Sla(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include 24/7 Managed SLA Monitoring</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">SOFTWARE PROJECTION</span>
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
                <span>Request Custom Software Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Software Engineering Lifecycle */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS SOFTWARE METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Enterprise Engineering Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From domain-driven design discovery to multi-region cloud deployment and 24/7 telemetry.
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
              Frequently Asked Custom Software Questions
            </h3>
          </div>

          <div className="space-y-3">
            {SOFTWARE_FAQS.map((faq, idx) => {
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
            Ready to Build Your Custom Enterprise Software?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a technical consultation with our principal software architects. Receive a comprehensive domain system diagram, technology stack blueprint, and budget projection within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Software Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

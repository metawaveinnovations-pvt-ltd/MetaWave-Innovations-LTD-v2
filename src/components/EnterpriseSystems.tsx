import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Server, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Cloud, 
  Layers, 
  Network, 
  Lock, 
  Database, 
  Activity, 
  GitBranch, 
  Workflow, 
  Terminal, 
  Globe2, 
  Box, 
  BarChart3, 
  Key, 
  RefreshCw,
  Clock,
  DollarSign
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface EnterpriseSystemsProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const ENTERPRISE_SOLUTIONS = [
  {
    id: 'monolith-microservices',
    title: 'Monolith-to-Microservices Modernization',
    subtitle: 'STRANGLER FIG MIGRATION',
    icon: GitBranch,
    desc: 'Decompose rigid legacy monolithic codebases into scalable, decoupled microservices containerized on Kubernetes with zero service disruption to ongoing business operations.',
    highlights: [
      'Incremental Strangler Fig pattern for zero-downtime refactoring',
      'Domain-Driven Design (DDD) & bounded context mapping',
      'Container orchestration using Kubernetes (EKS, GKE, AKS)',
      'Service mesh implementation with Istio for mTLS traffic control'
    ],
    tools: ['Docker', 'Kubernetes', 'Istio', 'Go (Golang)', 'Node.js', 'gRPC']
  },
  {
    id: 'multi-tenant-saas',
    title: 'Multi-Tenant SaaS Architecture',
    subtitle: 'HIGH-ISOLATION PLATFORMS',
    icon: Building2,
    desc: 'Architect enterprise multi-tenant software with isolated tenant data schemas, custom domain white-labeling, granular RBAC permissions, and automated tenant provisioning.',
    highlights: [
      'Row-level security (RLS) & dedicated schema tenant isolation',
      'SAML 2.0 / Okta / Azure AD Enterprise Single Sign-On (SSO)',
      'Tiered feature flagging & automated tenant usage metering',
      'Custom domain SSL routing with dynamic Nginx ingress'
    ],
    tools: ['PostgreSQL', 'Redis', 'Auth0/Okta', 'Node.js', 'GraphQL', 'AWS']
  },
  {
    id: 'cloud-native-infrastructure',
    title: 'Cloud-Native High Availability & IaC',
    subtitle: 'MULTI-REGION RESILIENCE',
    icon: Cloud,
    desc: 'Build resilient, multi-region cloud infrastructures using Infrastructure as Code (IaC) with automated failover, load balancing, and disaster recovery RTO/RPO targets.',
    highlights: [
      'Terraform & Ansible Infrastructure as Code (IaC) automation',
      'Multi-region active-active cloud deployment on AWS/GCP/Azure',
      'Automated database cross-region replication & point-in-time recovery',
      'Sub-second global DNS failover with Cloudflare Enterprise'
    ],
    tools: ['Terraform', 'AWS', 'Google Cloud', 'Azure', 'Ansible', 'Cloudflare']
  },
  {
    id: 'enterprise-service-bus',
    title: 'Enterprise Service Bus & Message Brokers',
    subtitle: 'DECOUPLED EVENT BUSES',
    icon: Network,
    desc: 'Connect heterogeneous enterprise software applications using event-driven architectures, distributed message queues, and real-time pub/sub channels.',
    highlights: [
      'High-throughput message streaming with Apache Kafka & RabbitMQ',
      'Event sourcing & CQRS (Command Query Responsibility Segregation)',
      'Idempotent transactional event handlers with dead-letter queueing',
      'Real-time streaming ETL pipelines for enterprise analytics'
    ],
    tools: ['Apache Kafka', 'RabbitMQ', 'Redis Streams', 'Apache Flink', 'Java/Go']
  },
  {
    id: 'enterprise-security-governance',
    title: 'Zero-Trust Security & Compliance',
    subtitle: 'SOC2, HIPAA & ISO 27001',
    icon: ShieldCheck,
    desc: 'Fortify your software ecosystem with zero-trust network boundaries, hardware-grade secret vaults, end-to-end data encryption, and continuous automated compliance auditing.',
    highlights: [
      'AES-256 data encryption at rest & TLS 1.3 encryption in transit',
      'HashiCorp Vault secret management & dynamic credential injection',
      'Comprehensive audit trails with Immutable Write-Once logs',
      'Automated SOC2 Type II, HIPAA, and GDPR compliance readiness'
    ],
    tools: ['HashiCorp Vault', 'OAuth2', 'Keycloak', 'WAF', 'SonarQube', 'AWS KMS']
  },
  {
    id: 'observability-telemetry',
    title: 'Real-Time Telemetry & Observability',
    subtitle: 'FULL-STACK MONITORING',
    icon: Activity,
    desc: 'Gain 360-degree operational visibility across all microservices with distributed tracing, automated log aggregation, custom executive dashboards, and AI anomaly alerts.',
    highlights: [
      'OpenTelemetry distributed tracing across all microservice hops',
      'Centralized log aggregation with Grafana Loki / ELK Stack',
      'Real-time Prometheus metric collection & P99 latency alerts',
      'Automated PagerDuty integration & incident triage playbooks'
    ],
    tools: ['Prometheus', 'Grafana', 'OpenTelemetry', 'ELK Stack', 'Datadog']
  }
];

const ENTERPRISE_STACK_TABS = [
  {
    id: 'containers_orchestration',
    label: 'Microservices & Containers',
    items: [
      { name: 'Kubernetes (EKS / GKE / AKS)', spec: 'Self-healing container orchestration with horizontal pod auto-scaling', benchmark: '99.999% SLA' },
      { name: 'Docker & Podman Runtime', spec: 'OCI-compliant immutable container packaging & security scanning', benchmark: 'Zero-Drift Builds' },
      { name: 'Istio Service Mesh', spec: 'mTLS sidecar proxy encryption, traffic management & circuit breaking', benchmark: 'Zero-Trust Transit' }
    ]
  },
  {
    id: 'cloud_iac',
    label: 'Cloud Infrastructure & IaC',
    items: [
      { name: 'HashiCorp Terraform & Ansible', spec: 'Declarative Infrastructure as Code for multi-cloud deployments', benchmark: '100% Automated' },
      { name: 'AWS / GCP / Azure Multi-Region', spec: 'Active-active multi-region cloud topology with automated failover', benchmark: 'Sub-Minute RTO' },
      { name: 'Apache Kafka & RabbitMQ', spec: 'Enterprise message streaming bus handling 1,000,000+ events/sec', benchmark: 'High Throughput' }
    ]
  },
  {
    id: 'security_observability',
    label: 'Security & Observability',
    items: [
      { name: 'HashiCorp Vault & AWS KMS', spec: 'Hardware security module (HSM) key management & secret rotation', benchmark: 'FIPS 140-2' },
      { name: 'OpenTelemetry & Prometheus', spec: 'Unified metrics, logs, and distributed traces across all microservices', benchmark: 'P99 Precision' },
      { name: 'Keycloak & Okta Enterprise SSO', spec: 'SAML 2.0 / OIDC single sign-on with multi-factor auth enforcement', benchmark: 'Enterprise Auth' }
    ]
  }
];

const ENTERPRISE_PROCESS_STEPS = [
  {
    num: '01',
    title: 'Enterprise Audit & Architecture Blueprint',
    desc: 'We conduct a thorough technical audit of legacy software, database schemas, bottleneck dependencies, and compliance requirements to produce a clear migration roadmap.'
  },
  {
    num: '02',
    title: 'Domain-Driven Design & Microservice Decomposition',
    desc: 'We map bounded contexts, design clean REST/gRPC interfaces, and establish containerized microservice boilerplates with automated CI/CD deployment pipelines.'
  },
  {
    num: '03',
    title: 'Incremental Migration & Strangler Fig Refactoring',
    desc: 'We migrate legacy monolith functions step-by-step behind an API gateway, ensuring zero downtime and continuous verification throughout the transition.'
  },
  {
    num: '04',
    title: 'Zero-Trust Security Hardening & Penetration Testing',
    desc: 'We enforce hardware secret vaults, SAML/SSO authentication, mTLS encryption, and execute automated penetration vulnerability scans.'
  },
  {
    num: '05',
    title: '24/7 Telemetry Monitoring & High-Availability Operations',
    desc: 'We configure Prometheus/Grafana observability dashboards, PagerDuty incident alerts, and multi-region auto-scaling triggers for guaranteed 99.999% uptime.'
  }
];

const ENTERPRISE_FAQS = [
  {
    q: 'How do you migrate a legacy monolithic system without causing business downtime?',
    a: 'We use the Strangler Fig migration pattern. We deploy a high-performance API Gateway in front of your legacy system, then incrementally replace legacy functions with modern microservices one module at a time. The legacy system remains fully operational throughout the transition until all services are safely modernized.'
  },
  {
    q: 'Can MetaWave build multi-tenant SaaS platforms with strict data isolation?',
    a: 'Yes. We architect enterprise multi-tenant architectures featuring row-level database security (RLS), dedicated schema isolation per enterprise tenant, custom white-label domain routing, and Okta/Azure AD SAML 2.0 Single Sign-On.'
  },
  {
    q: 'What cloud providers and infrastructure tools do you support?',
    a: 'We engineer cloud-native solutions across AWS, Google Cloud Platform (GCP), and Microsoft Azure using Terraform and Ansible for Infrastructure as Code. We ensure your system is vendor-flexible and multi-region redundant.'
  },
  {
    q: 'How do you ensure compliance with SOC2, HIPAA, and GDPR standards?',
    a: 'We integrate zero-trust security from day one: hardware key encryption (AES-256), HashiCorp Vault secrets, immutable audit logging, automated vulnerability scanning, mTLS communications, and strict Role-Based Access Controls (RBAC).'
  },
  {
    q: 'What level of operational support and SLA guarantees do you offer?',
    a: 'We provide 24/7/365 telemetry monitoring, guaranteed 99.999% uptime SLAs, automated sub-minute failover, and dedicated senior DevOps engineers assigned to your account.'
  }
];

export function EnterpriseSystems({ onNavigate, isStandalonePage = false }: EnterpriseSystemsProps) {
  const [activeStackTab, setActiveStackTab] = useState('containers_orchestration');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Enterprise TCO & Modernization Calculator
  const [serverCount, setServerCount] = useState(25); // Physical / VM legacy servers
  const [monthlyDowntimeHours, setMonthlyDowntimeHours] = useState(4); // Hours
  const [devTeamSize, setDevTeamSize] = useState(12); // Engineers maintaining legacy code

  const calculatedTcoImpact = useMemo(() => {
    // Infrastructure cost estimate per legacy server (~$350/mo) vs cloud containerized (~$120/mo)
    const currentInfraCost = serverCount * 350 * 12;
    const modernInfraCost = serverCount * 120 * 12;
    const infraSavings = currentInfraCost - modernInfraCost;

    // Cost of downtime (~$8,500/hr for enterprise)
    const annualDowntimeCostCurrent = monthlyDowntimeHours * 12 * 8500;
    const annualDowntimeCostModern = (monthlyDowntimeHours * 0.05) * 12 * 8500; // 95% reduction
    const downtimeSavings = annualDowntimeCostCurrent - annualDowntimeCostModern;

    // Productivity gain from modernized CI/CD and microservices (~25% efficiency gain per dev)
    const productivityGainDollar = devTeamSize * 130000 * 0.25;

    const totalAnnualBenefit = Math.round(infraSavings + downtimeSavings + productivityGainDollar);
    const total5YearBenefit = totalAnnualBenefit * 5;

    return {
      infraSavings: Math.round(infraSavings),
      downtimeSavings: Math.round(downtimeSavings),
      productivityGainDollar: Math.round(productivityGainDollar),
      totalAnnualBenefit,
      total5YearBenefit
    };
  }, [serverCount, monthlyDowntimeHours, devTeamSize]);

  const handleCopySpec = (text: string) => {
    playSound('toggle');
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      
      {/* Background Soft Ambiance Lights */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#326E45]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

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
          <span className="text-[#326E45] font-bold">Enterprise Systems Architecture</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Building2 size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              MISSION-CRITICAL ENTERPRISE SYSTEMS & DIGITAL MODERNIZATION
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Custom <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Enterprise Systems</span> Engineering
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Modernize legacy software, engineer high-availability cloud microservices, implement multi-tenant SaaS architectures, and fortify enterprise security with zero operational downtime.
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
              <span>Schedule Enterprise Audit</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore Architecture Stack</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Server size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">99.999% SLA Uptime</div>
              <div className="text-slate-500 text-[11px]">Multi-Region Failover</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100k+ Concurrency</div>
              <div className="text-slate-500 text-[11px]">Kubernetes Auto-scaling</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC2 & ISO 27001</div>
              <div className="text-slate-500 text-[11px]">Zero-Trust Compliance</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <RefreshCw size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Zero Downtime</div>
              <div className="text-slate-500 text-[11px]">Strangler Fig Refactoring</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Enterprise Solutions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Building2 size={12} />
              <span>ENTERPRISE ARCHITECTURE CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Comprehensive Enterprise Software Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From legacy monolith refactoring to multi-tenant SaaS platforms, event bus message brokers, and zero-trust security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENTERPRISE_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Enterprise TCO & Modernization Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>ENTERPRISE TCO & MODERNIZATION CALCULATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Calculate Modernization ROI & Cloud Cost Reductions
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Transitioning from monolithic legacy servers to containerized microservices significantly cuts server hardware waste, eliminates costly downtime, and boosts developer velocity.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Legacy Server Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Legacy Physical/VM Server Fleet:</span>
                    <span className="text-[#326E45] font-mono">{serverCount} Servers</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={serverCount}
                    onChange={(e) => { playSound('toggle'); setServerCount(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Monthly Unplanned Downtime Hours */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Current Monthly Unplanned Downtime:</span>
                    <span className="text-[#326E45] font-mono">{monthlyDowntimeHours} Hours / Month</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="1"
                    value={monthlyDowntimeHours}
                    onChange={(e) => { playSound('toggle'); setMonthlyDowntimeHours(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Engineering Team Size */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Engineering Team Size:</span>
                    <span className="text-[#326E45] font-mono">{devTeamSize} Developers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="2"
                    value={devTeamSize}
                    onChange={(e) => { playSound('toggle'); setDevTeamSize(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">PROJECTED VALUE REALIZATION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  ROI GAIN
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ANNUAL INFRASTRUCTURE SAVINGS</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">+ ${calculatedTcoImpact.infraSavings.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PREVENTED DOWNTIME LOSSES</span>
                  <span className="text-sm font-bold text-slate-700">+ ${calculatedTcoImpact.downtimeSavings.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">TOTAL 5-YEAR ENTERPRISE VALUE GAIN</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    ${calculatedTcoImpact.total5YearBenefit.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Enterprise TCO Analysis</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ENTERPRISE TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Cloud, Container & Security Technologies
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Industry-standard open-source tools and enterprise cloud platforms.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ENTERPRISE_STACK_TABS.map((tab) => (
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
            {ENTERPRISE_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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
              ENGINEERING METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Enterprise Engineering Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From initial codebase audit to zero-downtime strangler fig refactoring and 24/7 SLA operations.
            </p>
          </div>

          <div className="space-y-4">
            {ENTERPRISE_PROCESS_STEPS.map((step, idx) => (
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
              ENTERPRISE QUESTIONS
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Frequently Asked Enterprise Questions
            </h3>
          </div>

          <div className="space-y-3">
            {ENTERPRISE_FAQS.map((faq, idx) => {
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
            Ready to Modernize Your Enterprise Software Systems?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our Principal Enterprise Architects. Receive a comprehensive modernization assessment, microservice architecture blueprint, and proposal within 48 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Enterprise Strategy Session</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

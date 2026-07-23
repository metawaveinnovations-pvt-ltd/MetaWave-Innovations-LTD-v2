import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Server, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Lock, 
  Gauge, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Layers, 
  Cpu, 
  Activity, 
  Database, 
  Globe, 
  Sparkles, 
  Terminal, 
  TrendingDown, 
  RefreshCw, 
  GitBranch, 
  Workflow
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface CloudSolutionsProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const CLOUD_SOLUTIONS_CARDS = [
  {
    id: 'cloud-migration',
    title: 'Cloud Migration & Modernization',
    subtitle: 'ZERO-DOWNTIME LIFT & SHIFT / REFACTOR',
    icon: Cloud,
    desc: 'Seamlessly transition legacy on-premise workloads to AWS, Google Cloud, or Azure with automated migration pipelines, database re-platforming, and zero downtime.',
    highlights: [
      'Automated VM & bare-metal cloud lift & shift migration',
      'Database re-platforming (PostgreSQL, MySQL to Cloud Native DBs)',
      'Legacy monolith refactoring into cloud-native microservices',
      'Zero-data-loss sync with cutover execution plans'
    ],
    tools: ['AWS MGN', 'GCP Database Migration', 'Azure Migrate', 'Terraform']
  },
  {
    id: 'kubernetes-devops',
    title: 'Kubernetes & Container Orchestration',
    subtitle: 'ENTERPRISE CONTAINER SCALING',
    icon: Server,
    desc: 'Production-grade Kubernetes cluster design (EKS, GKE, AKS) featuring automated horizontal pod autoscaling, GitOps deployments, service mesh, and container security.',
    highlights: [
      'EKS, GKE & AKS multi-region cluster provisioning',
      'GitOps CD workflows with ArgoCD and FluxCD',
      'Istio / Linkerd service mesh for mTLS & traffic routing',
      'Automated Horizontal & Vertical Pod Autoscaling (HPA/VPA)'
    ],
    tools: ['Kubernetes', 'Helm', 'ArgoCD', 'Istio', 'Docker']
  },
  {
    id: 'devops-iac',
    title: 'Infrastructure as Code & CI/CD Pipelines',
    subtitle: 'AUTOMATED INFRASTRUCTURE DEPLOYMENT',
    icon: GitBranch,
    desc: '100% reproducible cloud environments managed via Terraform and Pulumi with automated GitHub Actions / GitLab CI pipelines for zero-touch deployments.',
    highlights: [
      'Terraform & Pulumi enterprise module libraries',
      'Automated CI/CD pipelines with policy-as-code security scans',
      'Immutable infrastructure & blue/green / canary releases',
      'Secret management with HashiCorp Vault & Cloud KMS'
    ],
    tools: ['Terraform', 'Pulumi', 'GitHub Actions', 'Vault', 'Checkov']
  },
  {
    id: 'serverless-microservices',
    title: 'Serverless & Cloud-Native Architectures',
    subtitle: 'EVENT-DRIVEN HIGH CONCURRENCY',
    icon: Zap,
    desc: 'High-performance event-driven serverless architectures using AWS Lambda, GCP Cloud Run, and Azure Functions for sub-second auto-scaling and zero idle cost.',
    highlights: [
      'Event-driven messaging via Apache Kafka, RabbitMQ & AWS SQS',
      'Serverless GraphQL & REST API Gateways',
      'Cold-start optimization & memory tuning for sub-50ms execution',
      'Pay-per-use architecture maximizing cost efficiency'
    ],
    tools: ['AWS Lambda', 'GCP Cloud Run', 'Kafka', 'API Gateway', 'DynamoDB']
  },
  {
    id: 'finops-optimization',
    title: 'FinOps & Cloud Cost Optimization',
    subtitle: '45% AVERAGE COST REDUCTION',
    icon: TrendingDown,
    desc: 'Eliminate cloud waste, optimize reserved instances, implement auto-parking for dev environments, and establish real-time cloud cost allocation metrics.',
    highlights: [
      'Deep architectural audits identifying idle & over-provisioned assets',
      'Spot instance & Savings Plans optimization strategies',
      'Kubernetes pod-level cost attribution with Kubecost',
      'Automated cloud resource scheduling & budget alert triggers'
    ],
    tools: ['Kubecost', 'AWS Cost Explorer', 'GCP Active Assist', 'Datadog']
  },
  {
    id: 'cloud-security',
    title: 'Multi-Cloud Security & Compliance',
    subtitle: 'SOC 2 & ISO 27001 COMPLIANT',
    icon: ShieldCheck,
    desc: 'Hardened cloud security postures featuring zero-trust network access, centralized IAM policies, automated vulnerability scanning, and SOC 2 / HIPAA compliance.',
    highlights: [
      'Zero-Trust network architecture & IAM least-privilege policies',
      'Real-time cloud posture management (CSPM) & threat detection',
      'Encryption at rest (KMS) & in transit (mTLS 1.3)',
      'Automated compliance reporting for SOC 2, HIPAA & ISO 27001'
    ],
    tools: ['Wiz', 'Prisma Cloud', 'AWS GuardDuty', 'Cloudflare Enterprise']
  }
];

const CLOUD_STACK_TABS = [
  {
    id: 'cloud_providers',
    label: 'Cloud Platforms',
    items: [
      { name: 'Amazon Web Services (AWS)', spec: 'EKS, Lambda, Aurora Serverless, CloudFront, IAM, S3', benchmark: '99.99% Uptime SLA' },
      { name: 'Google Cloud Platform (GCP)', spec: 'GKE, Cloud Run, BigQuery, Cloud Spanner, Pub/Sub', benchmark: 'Sub-10ms Global Edge' },
      { name: 'Microsoft Azure', spec: 'AKS, Azure Functions, Cosmos DB, Azure DevOps, Entra ID', benchmark: 'Enterprise Hybrid' }
    ]
  },
  {
    id: 'containers',
    label: 'Containers & Mesh',
    items: [
      { name: 'Kubernetes (K8s)', spec: 'Multi-region enterprise cluster management & autoscaling', benchmark: '10,000+ Pod Scale' },
      { name: 'ArgoCD & FluxCD', spec: 'GitOps Continuous Delivery with automated drift detection', benchmark: 'Zero-Touch CD' },
      { name: 'Istio Service Mesh', spec: 'mTLS security, canary traffic routing & distributed tracing', benchmark: 'Zero-Trust Mesh' }
    ]
  },
  {
    id: 'iac_devops',
    label: 'DevOps & IaC',
    items: [
      { name: 'Terraform & OpenTofu', spec: 'Modular infrastructure provisioning across multi-cloud', benchmark: '100% Code Managed' },
      { name: 'GitHub Actions / GitLab', spec: 'Automated CI/CD workflows with automated security linting', benchmark: '< 5 min Build-to-Deploy' },
      { name: 'HashiCorp Vault', spec: 'Centralized secret management, dynamic PKI & database leases', benchmark: 'Bank-Grade Encryption' }
    ]
  },
  {
    id: 'observability',
    label: 'Observability & FinOps',
    items: [
      { name: 'Datadog & New Relic', spec: 'Full-stack APM, distributed tracing & log aggregation', benchmark: 'Real-time Telemetry' },
      { name: 'Prometheus & Grafana', spec: 'Open-source metric collection & custom cloud dashboards', benchmark: '1s Resolution' },
      { name: 'Kubecost & Spot.io', spec: 'Real-time Kubernetes cost allocation & automated spot scaling', benchmark: '45% Cost Reduction' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Cloud Discovery & Infrastructure Audit',
    desc: 'We perform deep architectural audits of your workloads, data flows, cloud spend, security postures, and compliance requirements.'
  },
  {
    num: '02',
    title: 'Target Architecture Design & Blueprint',
    desc: 'Our principal architects design multi-region, fault-tolerant, high-concurrency cloud blueprints tailored to your uptime SLAs.'
  },
  {
    num: '03',
    title: 'Automated IaC & CI/CD Pipeline Setup',
    desc: 'We codify all infrastructure using Terraform modules, setup GitOps pipelines, and implement automated vulnerability gates.'
  },
  {
    num: '04',
    title: 'Zero-Downtime Migration & Cutover',
    desc: 'We execute phased, automated migrations with continuous data replication, traffic shadow testing, and zero-downtime cutover.'
  },
  {
    num: '05',
    title: 'Managed FinOps & 24/7 Cloud Operations',
    desc: 'We implement real-time observability, automated autoscaling policies, cost optimization bots, and 24/7 site reliability engineering.'
  }
];

const CLOUD_FAQS = [
  {
    q: 'How does MetaWave guarantee zero downtime during cloud migration?',
    a: 'We use continuous data replication and traffic-shadowing techniques. We sync on-premise and target cloud databases in real time, run parallel validation benchmarks, and perform instant DNS cutovers using weighted traffic routing so users experience zero interruption.'
  },
  {
    q: 'Which cloud provider (AWS, GCP, or Azure) should our enterprise choose?',
    a: 'The choice depends on your workload requirements: AWS offers the widest ecosystem of services, GCP excels in AI, data analytics, and Kubernetes (GKE), while Azure is ideal for Microsoft enterprise environments. We frequently architect multi-cloud solutions to leverage the strengths of each.'
  },
  {
    q: 'How much can FinOps cost optimization save on our current cloud bill?',
    a: 'Our FinOps engagements typically achieve 30% to 50% reductions in monthly cloud spend. We achieve this by rightsizing over-provisioned instances, leveraging spot & reserved instances, automating non-production environment shutdowns, and tuning Kubernetes pod resources.'
  },
  {
    q: 'How do you ensure cloud security and compliance (SOC 2, HIPAA, GDPR)?',
    a: 'We embed security directly into Infrastructure as Code via policy-as-code tools (Checkov, TFSec). We enforce Zero-Trust network segmentation, KMS encryption for data in transit and at rest, IAM least-privilege policies, and automated compliance logging.'
  },
  {
    q: 'Do you provide ongoing 24/7 Site Reliability Engineering (SRE) support?',
    a: 'Yes. We offer managed 24/7 SRE and Cloud Operations with guaranteed response SLAs, automated incident resolution scripts, real-time Datadog/Prometheus monitoring, and proactive cloud maintenance.'
  }
];

export function CloudSolutions({ onNavigate, isStandalonePage = false }: CloudSolutionsProps) {
  const [activeStackTab, setActiveStackTab] = useState('cloud_providers');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Estimator State
  const [workloadSize, setWorkloadSize] = useState<'startup_mvp' | 'midmarket' | 'enterprise_global'>('midmarket');
  const [cloudProvider, setCloudProvider] = useState<'aws' | 'gcp' | 'azure' | 'multicloud'>('aws');
  const [needKubernetes, setNeedKubernetes] = useState(true);
  const [needFinops, setNeedFinops] = useState(true);

  const calculatedEstimate = useMemo(() => {
    let weeks = '4–8 Weeks';
    let team = '1 Principal Cloud Architect + 1 Senior DevOps Engineer + 1 Cloud Security Lead';
    let deliverables = 'Terraform Modules + Automated CI/CD Pipelines + Cloud Migration Plan';

    if (workloadSize === 'startup_mvp') {
      weeks = '2–4 Weeks';
      team = '1 Cloud Solutions Architect + 1 DevOps Engineer';
      deliverables = 'Base IaC Setup + CI/CD Pipelines + Cloud Run/ECS Deployment';
    } else if (workloadSize === 'enterprise_global') {
      weeks = '8–14 Weeks';
      team = '1 Lead Cloud Architect + 2 SRE Engineers + 1 Security Architect + 1 FinOps Specialist';
      deliverables = 'Multi-Region Kubernetes + Zero-Trust IAM + 24/7 Observability + FinOps Bot';
    }

    if (cloudProvider === 'multicloud') {
      weeks += ' (+ 3 wks Multi-Cloud Sync)';
    }

    return { weeks, team, deliverables };
  }, [workloadSize, cloudProvider, needKubernetes, needFinops]);

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
          <span className="text-[#326E45] font-bold">Cloud Solutions & DevOps</span>
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
              ENTERPRISE CLOUD ARCHITECTURE & DEVOPS ENGINEERING
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Enterprise <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Cloud Solutions & Architecture</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We architect, migrate, and optimize resilient multi-cloud infrastructures across AWS, Google Cloud, and Azure. Powered by Kubernetes, Terraform IaC, serverless microservices, and FinOps cost engineering for 99.99% uptime SLAs.
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
              <span>Consult Our Cloud Architects</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Cloud size={16} className="text-[#326E45]" />
              <span>Explore Cloud Tech Stack</span>
            </button>
          </motion.div>
        </div>

        {/* 4 Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">99.99% Uptime SLA</div>
              <div className="text-slate-500 text-[11px]">Multi-region resilience</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <RefreshCw size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Zero-Downtime</div>
              <div className="text-slate-500 text-[11px]">Seamless cloud migration</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingDown size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Up to 45% FinOps</div>
              <div className="text-slate-500 text-[11px]">Cloud bill optimization</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC 2 / ISO 27001</div>
              <div className="text-slate-500 text-[11px]">Hardened security rules</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Cloud Solutions Cards Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Cloud size={12} />
              <span>CLOUD SOLUTIONS & DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Cloud Infrastructure & DevOps Offerings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From zero-downtime migrations to Kubernetes orchestration, automated IaC pipelines, and FinOps cost reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLOUD_SOLUTIONS_CARDS.map((item) => {
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

        {/* Section 2: Interactive Cloud Stack & Specs Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ENTERPRISE CLOUD TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              AWS, GCP, Azure & DevOps Matrix
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Inspect our production-ready cloud technologies, IaC frameworks, and observability benchmarks.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CLOUD_STACK_TABS.map((tab) => (
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
            {CLOUD_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive Cloud Infrastructure Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your Cloud Infrastructure Scope
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Configure your enterprise workload scale and cloud targets to calculate project timelines, DevOps squad sizing, and core deliverables.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Workload Scale */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Workload Scale & Complexity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'startup_mvp', label: 'Startup / MVP' },
                      { id: 'midmarket', label: 'Mid-Market App' },
                      { id: 'enterprise_global', label: 'Global Enterprise' }
                    ].map(w => (
                      <button
                        key={w.id}
                        onClick={() => { playSound('toggle'); setWorkloadSize(w.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          workloadSize === w.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cloud Provider */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Primary Cloud Ecosystem
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'aws', label: 'AWS' },
                      { id: 'gcp', label: 'Google Cloud' },
                      { id: 'azure', label: 'Azure' },
                      { id: 'multicloud', label: 'Multi-Cloud' }
                    ].map(cp => (
                      <button
                        key={cp.id}
                        onClick={() => { playSound('toggle'); setCloudProvider(cp.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          cloudProvider === cp.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needKubernetes}
                      onChange={(e) => setNeedKubernetes(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Managed Kubernetes Cluster (EKS/GKE/AKS)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needFinops}
                      onChange={(e) => setNeedFinops(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include FinOps Cloud Cost Audit & Optimization</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">CLOUD PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  99.99% SLA
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED MIGRATION / BUILD TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED DEVOPS & CLOUD SQUAD</span>
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
                <span>Request Cloud Architecture Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Cloud Delivery Methodology */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS CLOUD METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Cloud Lifecycle & Migration Roadmap
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From initial infrastructure audit to automated IaC provisioning, cutover, and 24/7 FinOps.
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
              Frequently Asked Cloud & DevOps Questions
            </h3>
          </div>

          <div className="space-y-3">
            {CLOUD_FAQS.map((faq, idx) => {
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
            Ready to Modernize Your Enterprise Cloud Architecture?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a confidential architectural audit with our certified cloud directors. Receive a customized migration strategy, IaC security review, and FinOps cost projection within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Cloud Architecture Audit</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

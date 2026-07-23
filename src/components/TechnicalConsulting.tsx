import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  FileSearch, 
  Cpu, 
  TrendingUp, 
  Users, 
  Lock, 
  Cloud, 
  Search, 
  Award, 
  BarChart3, 
  Layers, 
  DollarSign, 
  Terminal, 
  BrainCircuit, 
  Lightbulb, 
  ShieldAlert, 
  Code2
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface TechnicalConsultingProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const CONSULTING_SOLUTIONS = [
  {
    id: 'fractional-cto',
    title: 'Fractional CTO & Strategic Tech Leadership',
    subtitle: 'EXECUTIVE ADVISORY',
    icon: Compass,
    desc: 'Access executive technology guidance without full-time executive overhead. Align software engineering roadmaps with core business KPIs, investor decks, and scale objectives.',
    highlights: [
      'Strategic technology roadmap & engineering budget planning',
      'Vendor selection, software license negotiation & RFPs',
      'Team structuring, hiring assessment & engineering culture',
      'Board-level technical reporting & investor pitch technical support'
    ],
    tools: ['Technology Roadmap', 'Resource Allocation', 'Vendor Management', 'Agile Governance']
  },
  {
    id: 'architecture-code-audit',
    title: 'Software Architecture & Codebase Health Audit',
    subtitle: 'DEEP-DIVE CODE REVIEW',
    icon: FileSearch,
    desc: 'Uncover hidden technical debt, scalability bottlenecks, security vulnerabilities, and code quality issues through comprehensive automated and manual architectural reviews.',
    highlights: [
      'Static code analysis, cyclomatic complexity & refactoring roadmap',
      'Database query indexing, lock contention & bottleneck diagnosis',
      'API design, payload sizing & latency profiling',
      'Actionable prioritzed audit matrix with impact vs effort scoring'
    ],
    tools: ['SonarQube', 'Lighthouse', 'k6 Load Testing', 'PostgreSQL Profiler', 'ESLint']
  },
  {
    id: 'cloud-finops-optimization',
    title: 'Cloud FinOps & Infrastructure Cost Optimization',
    subtitle: 'INFRASTRUCTURE EFFICIENCY',
    icon: DollarSign,
    desc: 'Slash cloud infrastructure bills on AWS, Google Cloud, and Azure without sacrificing application performance, uptime SLA, or development velocity.',
    highlights: [
      'Idle resource identification, right-sizing & auto-scaling setup',
      'Reserved Instance (RI) & Savings Plan portfolio management',
      'Kubernetes cluster bin-packing & spot instance orchestration',
      'Real-time cost anomaly alerts & engineering attribution tags'
    ],
    tools: ['AWS Cost Explorer', 'Kubecost', 'Datadog FinOps', 'Terraform', 'GCP Billing']
  },
  {
    id: 'cybersecurity-compliance',
    title: 'Cybersecurity Risk & Compliance Readiness',
    subtitle: 'SOC2, HIPAA & ISO 27001',
    icon: ShieldCheck,
    desc: 'Prepare your platform for SOC2 Type II, HIPAA, ISO 27001, and GDPR certifications through gap analysis, zero-trust security policies, and vulnerability remediation.',
    highlights: [
      'SOC2 / HIPAA compliance gap analysis & policy drafting',
      'Penetration testing, OWASP Top 10 vulnerability remediation',
      'Hardware secret vault integration & data encryption enforcement',
      'Incident response playbooks & continuous automated compliance'
    ],
    tools: ['HashiCorp Vault', 'Vanta', 'Drata', 'AWS KMS', 'OWASP ZAP']
  },
  {
    id: 'ai-digital-transformation',
    title: 'AI & Digital Transformation Strategy',
    subtitle: 'INNOVATION ROADMAPPING',
    icon: BrainCircuit,
    desc: 'Identify high-ROI AI integration opportunities across your business processes. Evaluate LLMs, RAG architectures, and custom ML pipelines for tangible operational impact.',
    highlights: [
      'AI feasibility assessment & ROI proof-of-concept design',
      'LLM model selection (Gemini, Claude, GPT) & vector database setup',
      'Proprietary data privacy, governance & AI safety guardrails',
      'Workflow automation mapping for operational efficiency'
    ],
    tools: ['Gemini API', 'LangChain', 'Pinecone', 'Python', 'PyTorch']
  },
  {
    id: 'ma-due-diligence',
    title: 'M&A Technical Due Diligence',
    subtitle: 'ACQUISITION ASSURANCE',
    icon: Search,
    desc: 'Perform thorough technical due diligence for private equity, venture capital firms, or acquiring corporations evaluating software company acquisitions.',
    highlights: [
      'IP risk assessment, open-source license compliance (GPL/MIT)',
      'Infrastructure scalability, security vulnerability & debt rating',
      'Team velocity, key-person risk & engineering process audit',
      'Post-merger technical integration & consolidation planning'
    ],
    tools: ['FOSS ID', 'Snyk', 'Black Duck', 'Security Audits', 'Architecture Review']
  }
];

const CONSULTING_STACK_TABS = [
  {
    id: 'audit_architecture',
    label: 'Architecture & Quality Audit',
    items: [
      { name: 'SonarQube & Static Analysis', spec: 'Automated code quality, security flaw & duplication scanning', benchmark: 'A-Grade Code' },
      { name: 'k6 & Apache JMeter Load Profiling', spec: 'Stress testing up to 100,000 requests/sec for bottleneck identification', benchmark: 'Sub-50ms Target' },
      { name: 'Database & Indexing Optimization', spec: 'Query execution plan analysis, lock contention & caching layer setup', benchmark: '10x Speedup' }
    ]
  },
  {
    id: 'finops_cloud',
    label: 'FinOps & Cloud Optimization',
    items: [
      { name: 'Kubecost & AWS Savings Plans', spec: 'Kubernetes container cost allocation & cloud reservation strategy', benchmark: '30-50% Cost Cut' },
      { name: 'Terraform & Cloudflare Enterprise', spec: 'Infrastructure as Code audit & global CDN edge performance tuning', benchmark: 'Zero-Drift' },
      { name: 'Datadog & Grafana Cost Telemetry', spec: 'Real-time billing attribution tagged by team, service & tenant', benchmark: '100% Visibility' }
    ]
  },
  {
    id: 'security_governance',
    label: 'Security & Compliance Frameworks',
    items: [
      { name: 'SOC2 Type II & ISO 27001', spec: 'End-to-end security control implementation & auditor readiness', benchmark: 'Certified Ready' },
      { name: 'HashiCorp Vault & AWS KMS', spec: 'Hardware secret key rotation & zero-trust identity access (IAM)', benchmark: 'Enterprise Grade' },
      { name: 'OWASP ZAP & Snyk Vulnerability Scan', spec: 'Continuous dependency & container CVE scanning with auto-remediation', benchmark: 'Zero Criticals' }
    ]
  }
];

const CONSULTING_PROCESS_STEPS = [
  {
    num: '01',
    title: 'Initial Discovery & Objective Alignment',
    desc: 'We conduct structured interviews with business leaders and engineering stakeholders to define goals, timelines, and technical requirements.'
  },
  {
    num: '02',
    title: 'Comprehensive Technical Audit & Data Gathering',
    desc: 'We analyze code repositories, cloud infrastructure billing, security policies, and performance metrics using automated diagnostic tools.'
  },
  {
    num: '03',
    title: 'Strategic Roadmap & Prioritized Action Plan',
    desc: 'We deliver an executive presentation and granular technical roadmap categorized by impact vs effort, highlighting immediate quick wins.'
  },
  {
    num: '04',
    title: 'Hands-On Advisory & Guided Implementation',
    desc: 'Our principal architects work alongside your team to execute refactoring, cloud cost optimization, and compliance remediation.'
  },
  {
    num: '05',
    title: 'Verification, Metrics Review & Ongoing Governance',
    desc: 'We measure post-implementation KPIs, verify benchmark improvements, and provide ongoing executive advisory to maintain momentum.'
  }
];

const CONSULTING_FAQS = [
  {
    q: 'What is the difference between a Fractional CTO and full-time IT consulting?',
    a: 'A Fractional CTO acts as an embedded executive part-time, leading long-term technology strategy, engineering roadmaps, team hiring, and board reporting. IT consulting focuses on specific project deliverables such as a code audit or cloud cost optimization campaign.'
  },
  {
    q: 'How much can MetaWave save us on our monthly cloud infrastructure bills?',
    a: 'Our cloud FinOps audits typically yield 30% to 55% monthly cost reductions through idle resource cleanup, right-sizing Kubernetes clusters, spot instance orchestration, and optimized AWS/GCP savings plans without sacrificing performance.'
  },
  {
    q: 'How long does a typical software architecture and codebase audit take?',
    a: 'A comprehensive codebase and architecture audit usually takes 1 to 2 weeks depending on repository size. We deliver a detailed executive summary, security risk assessment, and a prioritized refactoring task list.'
  },
  {
    q: 'Can MetaWave assist with M&A technical due diligence for acquisitions?',
    a: 'Yes. We assist venture capital firms, private equity groups, and corporate buyers by evaluating target software companies for open-source license risk, security vulnerabilities, technical debt, and team scalability.'
  },
  {
    q: 'How do you ensure confidentiality and security during a technical audit?',
    a: 'We sign strict mutual NDAs before reviewing any repository or cloud credential. All code reviews are conducted in secure, air-gapped environments with read-only access.'
  }
];

export function TechnicalConsulting({ onNavigate, isStandalonePage = false }: TechnicalConsultingProps) {
  const [activeStackTab, setActiveStackTab] = useState('audit_architecture');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Advisory & FinOps Value Calculator
  const [monthlyCloudSpend, setMonthlyCloudSpend] = useState(15000); // $
  const [engineeringTeamCount, setEngineeringTeamCount] = useState(10); // dev count
  const [targetComplianceLevel, setTargetComplianceLevel] = useState(80); // % target

  const calculatedConsultingImpact = useMemo(() => {
    // Cloud FinOps Savings (~35% average reduction)
    const annualCloudSpend = monthlyCloudSpend * 12;
    const estimatedCloudSavingsAnnual = Math.round(annualCloudSpend * 0.35);

    // Productivity acceleration from codebase health & refactoring (~20% velocity boost)
    const annualDevBudget = engineeringTeamCount * 120000;
    const devVelocityGainDollar = Math.round(annualDevBudget * 0.20);

    // Total estimated annual business value created
    const totalAnnualValueCreated = estimatedCloudSavingsAnnual + devVelocityGainDollar;

    return {
      annualCloudSpend,
      estimatedCloudSavingsAnnual,
      devVelocityGainDollar,
      totalAnnualValueCreated
    };
  }, [monthlyCloudSpend, engineeringTeamCount, targetComplianceLevel]);

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
          <span className="text-[#326E45] font-bold">Technical Consulting & Advisory</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Compass size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              STRATEGIC TECHNICAL CONSULTING & FRACTIONAL CTO ADVISORY
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Expert <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Technical Consulting</span> & Advisory
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Empower your organization with fractional CTO leadership, architectural audits, cloud FinOps cost optimization, SOC2 compliance readiness, and M&A technical due diligence.
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
              <span>Book Technical Strategy Session</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore Advisory Matrix</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <DollarSign size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">30-55% FinOps Cuts</div>
              <div className="text-slate-500 text-[11px]">Cloud Cost Optimization</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Compass size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Fractional CTO</div>
              <div className="text-slate-500 text-[11px]">Executive Tech Advisory</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <FileSearch size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Deep Code Audit</div>
              <div className="text-slate-500 text-[11px]">Refactoring Roadmap</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC2 & HIPAA Ready</div>
              <div className="text-slate-500 text-[11px]">Cybersecurity Governance</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Consulting Solutions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Compass size={12} />
              <span>CORE TECHNICAL ADVISORY SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Strategic Technical Consulting Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From executive CTO guidance to codebase health audits, cloud cost optimization, and M&A due diligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONSULTING_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive FinOps & Advisory ROI Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>FINOPS & ADVISORY IMPACT ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Cloud Savings & Velocity Impact
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Strategic technical advisory eliminates wasteful cloud spend, speeds up developer shipping cadence, and minimizes security compliance risks.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Monthly Cloud Spend */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Monthly Cloud Infrastructure Spend:</span>
                    <span className="text-[#326E45] font-mono">${monthlyCloudSpend.toLocaleString()} / month</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={monthlyCloudSpend}
                    onChange={(e) => { playSound('toggle'); setMonthlyCloudSpend(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Developer Team Size */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Software Engineering Team Size:</span>
                    <span className="text-[#326E45] font-mono">{engineeringTeamCount} Engineers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="1"
                    value={engineeringTeamCount}
                    onChange={(e) => { playSound('toggle'); setEngineeringTeamCount(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Target Compliance Readiness */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Compliance & Security Target:</span>
                    <span className="text-[#326E45] font-mono">{targetComplianceLevel}% Readiness</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={targetComplianceLevel}
                    onChange={(e) => { playSound('toggle'); setTargetComplianceLevel(Number(e.target.value)); }}
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
                  HIGH RETURN
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ANNUAL CLOUD COST SAVINGS</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">+ ${calculatedConsultingImpact.estimatedCloudSavingsAnnual.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEVELOPER VELOCITY VALUE GAIN</span>
                  <span className="text-sm font-bold text-slate-700">+ ${calculatedConsultingImpact.devVelocityGainDollar.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED TOTAL ANNUAL IMPACT</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    ${calculatedConsultingImpact.totalAnnualValueCreated.toLocaleString()} / year
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom Advisory Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ADVISORY FRAMEWORKS
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Audit Tools & Advisory Methodologies
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Enterprise diagnostic tools, FinOps platforms, and security compliance scanners.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CONSULTING_STACK_TABS.map((tab) => (
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
            {CONSULTING_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 4: 5-Step Strategic Process */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              ADVISORY LIFECYCLE
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Technical Advisory Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From discovery & audit data collection to roadmap execution and ongoing executive guidance.
            </p>
          </div>

          <div className="space-y-4">
            {CONSULTING_PROCESS_STEPS.map((step, idx) => (
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
              FREQUENT INQUIRIES
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Frequently Asked Technical Consulting Questions
            </h3>
          </div>

          <div className="space-y-3">
            {CONSULTING_FAQS.map((faq, idx) => {
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
            Ready for Executive Technology Guidance?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our Principal Architects and Fractional CTOs. Receive an initial audit roadmap and strategic proposal within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Advisory Session</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

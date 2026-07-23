import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Boxes, 
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
  Code2, 
  Building2, 
  Layers, 
  Factory, 
  Truck, 
  DollarSign, 
  Users, 
  FileText, 
  Cpu, 
  Globe2, 
  Briefcase,
  Lock,
  Workflow
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface ErpDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const ERP_SOLUTIONS = [
  {
    id: 'custom-erp-modules',
    title: 'Bespoke Enterprise ERP Core',
    subtitle: 'TAILORED OPERATIONAL ENGINES',
    icon: Factory,
    desc: 'Architect proprietary ERP modules purpose-built for your manufacturing, assembly, supply chain, and resource allocation workflows with zero recurring seat licensing costs.',
    highlights: [
      'Custom database schemas designed for multi-subsidiary enterprise operations',
      'High-speed real-time transaction processing & sub-200ms query performance',
      'Role-based access control (RBAC) with granular department-level auditing',
      'On-premise hybrid cloud deployment options (AWS, Azure, Private Data Centers)'
    ],
    tools: ['Next.js', 'PostgreSQL', 'Node.js', 'Redis', 'Tailwind CSS']
  },
  {
    id: 'financial-accounting-ledger',
    title: 'Financial Accounting & General Ledger',
    subtitle: 'AUTOMATED COMPLIANCE & BILLING',
    icon: DollarSign,
    desc: 'Automate multi-currency general ledgers, accounts payable/receivable, automated bank reconciliation, tax compliance, and multi-entity financial consolidation.',
    highlights: [
      'Automated double-entry bookkeeping with real-time trial balances',
      'Multi-currency auto-conversion with automated spot rate updates',
      'Tax compliance automation (VAT, GST, Sales Tax) with audit logs',
      'Automated invoice generation & recurring subscription dunning'
    ],
    tools: ['PostgreSQL', 'Stripe API', 'TaxJar API', 'Node.js', 'Recharts']
  },
  {
    id: 'supply-chain-inventory',
    title: 'Supply Chain & Multi-Warehouse Inventory',
    subtitle: 'REAL-TIME ASSET TRACKING',
    icon: Truck,
    desc: 'Track materials across multi-warehouse locations with barcode scanning, automated reorder triggers, purchase order workflows, and carrier shipping logistics.',
    highlights: [
      'Real-time multi-warehouse stock level tracking & SKU batching',
      'Barcode / QR code scanning & mobile inventory audit capabilities',
      'Predictive material reordering alerts based on historical lead times',
      'Automated carrier label printing & parcel tracking (EasyPost / ShipEngine)'
    ],
    tools: ['ShipEngine', 'PostgreSQL', 'Redis Webhooks', 'Node.js']
  },
  {
    id: 'hr-payroll-management',
    title: 'HR, Payroll & Resource Management',
    subtitle: 'WORKFORCE AUTOMATION HUBS',
    icon: Users,
    desc: 'Streamline employee onboarding, attendance tracking, shift scheduling, automated tax withholdings, direct deposit payroll, and performance review logs.',
    highlights: [
      'Automated gross-to-net payroll processing with direct deposit integration',
      'Biometric / Geo-fenced timeclock attendance tracking & leave approvals',
      'Centralized employee documents repository with expiration reminders',
      'Resource planning for project billable hours & workload balancing'
    ],
    tools: ['Node.js', 'PostgreSQL', 'Twilio API', 'SendGrid', 'Next.js']
  },
  {
    id: 'sap-netsuite-odoo-connectors',
    title: 'SAP, NetSuite & Odoo Modernization',
    subtitle: 'LEGACY ERP HYBRID EXTENSIONS',
    icon: Code2,
    desc: 'Extend legacy ERP installations (SAP S/4HANA, Oracle NetSuite, Odoo, Microsoft Dynamics 365) with modern web frontends, GraphQL APIs, and custom microservices.',
    highlights: [
      'Custom SAP ABAP / OData API microservices & React web portals',
      'Oracle NetSuite SuiteScript & RESTlet bi-directional data pipelines',
      'Odoo Python module customization & headless web app frontends',
      'Data cleaning, transformation, and conflict-resolution middleware'
    ],
    tools: ['SAP OData', 'NetSuite SuiteScript', 'Odoo API', 'GraphQL', 'Node.js']
  },
  {
    id: 'executive-bi-dashboards',
    title: 'Executive BI & Operational Telemetry',
    subtitle: 'PREDICTIVE ENTERPRISE ANALYTICS',
    icon: LineChart,
    desc: 'Empower executive leadership with real-time operational telemetry, COGS analysis, inventory turnover rates, profit margin forecasting, and automated executive PDF digests.',
    highlights: [
      'Interactive executive BI dashboards with drill-down line-item views',
      'Automated COGS, gross margin, and working capital telemetry',
      'AI-assisted predictive demand forecasting and bottleneck detection',
      'Scheduled automated PDF executive reports sent to email & Slack'
    ],
    tools: ['D3.js', 'Recharts', 'PostgreSQL', 'Gemini AI', 'Tailwind CSS']
  }
];

const ERP_STACK_TABS = [
  {
    id: 'erp_architectures',
    label: 'ERP Architectures & Core Databases',
    items: [
      { name: 'Next.js 15 & React Enterprise', spec: 'App Router architecture with Edge SSR & Sub-200ms data query performance', benchmark: 'Ultra-Fast UX' },
      { name: 'PostgreSQL & CockroachDB', spec: 'Distributed ACID-compliant relational databases with row-level security', benchmark: '100% Data Integrity' },
      { name: 'Node.js & Redis Caching', spec: 'High-concurrency microservice APIs with Redis memory cache for inventory lookup', benchmark: 'Sub-10ms Cache' }
    ]
  },
  {
    id: 'legacy_connectors',
    label: 'Enterprise Connectors & Legacy ERP APIs',
    items: [
      { name: 'SAP S/4HANA & OData APIs', spec: 'Secure enterprise connectors for SAP finance, materials, and production modules', benchmark: 'SAP Certified' },
      { name: 'Oracle NetSuite SuiteTalk REST', spec: 'Bi-directional order, inventory, and customer account sync webhooks', benchmark: 'Real-Time Sync' },
      { name: 'Odoo & Dynamics 365 APIs', spec: 'Python & C# microservices interfacing with core ERP database schemas', benchmark: 'Enterprise Grade' }
    ]
  },
  {
    id: 'security_telemetry',
    label: 'Security, Compliance & Telemetry',
    items: [
      { name: 'AES-256 Encryption & MFA', spec: 'Field-level database encryption, SAML 2.0 / SSO, and mandatory MFA access', benchmark: 'SOC2 & ISO 27001' },
      { name: 'ShipEngine & TaxJar APIs', spec: 'Automated multi-carrier logistics rates, address validation & VAT calculation', benchmark: 'Automated Logistics' },
      { name: 'D3.js & Recharts Visualizers', spec: 'Responsive vector data chart engines for executive working capital dashboards', benchmark: 'Real-Time Telemetry' }
    ]
  }
];

const ERP_PROCESS_STEPS = [
  {
    num: '01',
    title: 'Enterprise Workflow Discovery & Process Audit',
    desc: 'We map out your current operational departments, supply chain flows, accounting rules, and legacy software dependencies to design a clean ERP architecture.'
  },
  {
    num: '02',
    title: 'Relational Database Schema & Security Architecture',
    desc: 'We engineer multi-tenant relational schemas, establish row-level access permissions, and design zero-trust data access protocols.'
  },
  {
    num: '03',
    title: 'Core Module Engineering & API Connectors',
    desc: 'We build custom inventory, finance, HR, and purchasing modules, connecting them via high-speed internal APIs to existing tools and supplier gateways.'
  },
  {
    num: '04',
    title: 'Data Migration, Stress Testing & Security Hardening',
    desc: 'We execute zero-data-loss data migration scripts from legacy systems, simulate high-concurrency transaction loads, and conduct penetration tests.'
  },
  {
    num: '05',
    title: 'Deployment, Staff Onboarding & Operational Monitoring',
    desc: 'We execute smooth cutovers, train department leaders with custom video documentation, and monitor system performance 24/7.'
  }
];

const ERP_FAQS = [
  {
    q: 'Why should an enterprise choose a custom ERP over SAP, NetSuite, or Oracle?',
    a: 'Off-the-shelf ERP platforms like SAP or NetSuite carry massive annual licensing fees ($200–$500 per user/month), require expensive implementation consultants, and force your business to change its processes to fit rigid software constraints. A custom ERP gives you 100% data ownership, zero recurring user fees, exact alignment with your workflows, and total custom flexibility.'
  },
  {
    q: 'Can MetaWave integrate our custom ERP with our existing SAP, NetSuite, or Odoo installation?',
    a: 'Yes. We frequently build custom modern web frontends and microservice modules that integrate bi-directionally with existing SAP, NetSuite, or Odoo backends using REST, GraphQL, or OData APIs.'
  },
  {
    q: 'How do you ensure zero data loss during migration from legacy ERP spreadsheets or databases?',
    a: 'We build automated data ETL (Extract, Transform, Load) pipelines that clean, validate, and verify record parity before, during, and after migration. We execute full dry runs on staging environments prior to production cutovers.'
  },
  {
    q: 'Is the custom ERP system secure and compliant with industry regulations?',
    a: 'Yes. All ERP platforms engineered by MetaWave feature field-level AES-256 data encryption, role-based access control (RBAC), multi-factor authentication (MFA), SAML 2.0 / SSO integration, and detailed audit logs compliant with SOC2, GDPR, and ISO 27001 requirements.'
  },
  {
    q: 'Can the ERP system handle multi-currency, multi-entity, and international tax rules?',
    a: 'Yes. We design global ERP engines that support multi-entity company trees, multi-currency accounting with automated exchange rate updates, and automated regional tax rules (VAT, GST, Sales Tax).'
  }
];

export function ErpDevelopment({ onNavigate, isStandalonePage = false }: ErpDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('erp_architectures');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive ERP Operational Efficiency & Cost Savings Calculator
  const [employeeCount, setEmployeeCount] = useState(45);
  const [avgHourlyCost, setAvgHourlyCost] = useState(48);
  const [hoursSavedPerWeekPerEmployee, setHoursSavedPerWeekPerEmployee] = useState(5); // hours saved via ERP automation

  const calculatedErpSavings = useMemo(() => {
    const weeklyHoursSavedTotal = employeeCount * hoursSavedPerWeekPerEmployee;
    const annualHoursSavedTotal = weeklyHoursSavedTotal * 50;
    const annualLaborCostSaved = annualHoursSavedTotal * avgHourlyCost;
    
    // Estimated seat licensing savings vs SAP/NetSuite ($200/mo per user)
    const annualSoftwareLicensingSaved = employeeCount * 200 * 12;
    const totalAnnualValueCreated = annualLaborCostSaved + annualSoftwareLicensingSaved;

    return {
      annualHoursSavedTotal,
      annualLaborCostSaved,
      annualSoftwareLicensingSaved,
      totalAnnualValueCreated
    };
  }, [employeeCount, avgHourlyCost, hoursSavedPerWeekPerEmployee]);

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
          <span className="text-[#326E45] font-bold">ERP Development</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Boxes size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              ENTERPRISE ERP ENGINEERING & RESOURCE PLANNING STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Custom Enterprise <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">ERP Systems & Modules</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Architect high-concurrency custom ERP platforms, multi-warehouse inventory tracking, financial general ledgers, SAP/NetSuite API integrations, and real-time executive BI dashboards with zero recurring per-user licensing fees.
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
              <span>Schedule ERP Architecture Audit</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore ERP Tech Stack</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Sub-200ms Queries</div>
              <div className="text-slate-500 text-[11px]">ACID compliant databases</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">$0 User Seat Tax</div>
              <div className="text-slate-500 text-[11px]">100% Proprietary IP</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Truck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Multi-Warehouse Sync</div>
              <div className="text-slate-500 text-[11px]">Real-time barcode scanning</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC2 & ISO 27001</div>
              <div className="text-slate-500 text-[11px]">AES-256 field encryption</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core ERP Solutions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Boxes size={12} />
              <span>ENTERPRISE ERP MODULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Custom ERP Development Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From bespoke core operational engines and financial ledgers to supply chain logistics and SAP/NetSuite integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ERP_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Operational Efficiency & Cost Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>ERP EFFICIENCY & COST SAVINGS CALCULATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Annual Value Created By Custom ERP
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Automating repetitive operational tasks and eliminating third-party user seat licensing fees creates massive recurring bottom-line value.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Employee Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Enterprise Headcount (Users):</span>
                    <span className="text-[#326E45] font-mono">{employeeCount} employees</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={employeeCount}
                    onChange={(e) => { playSound('toggle'); setEmployeeCount(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Avg Hourly Cost Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Blended Hourly Labor Cost ($):</span>
                    <span className="text-[#326E45] font-mono">${avgHourlyCost} / hr</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={avgHourlyCost}
                    onChange={(e) => { playSound('toggle'); setAvgHourlyCost(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Weekly Hours Saved Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Weekly Hours Saved Per Employee via Automation:</span>
                    <span className="text-[#326E45] font-mono">{hoursSavedPerWeekPerEmployee} hrs / week</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={hoursSavedPerWeekPerEmployee}
                    onChange={(e) => { playSound('toggle'); setHoursSavedPerWeekPerEmployee(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">ANNUAL VALUE CREATION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  ERP BENCHMARK
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ANNUAL LABOR EFFICIENCY SAVINGS</span>
                  <span className="text-sm font-bold text-slate-700">${calculatedErpSavings.annualLaborCostSaved.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">AVOIDED SEAT LICENSING TAX (VS SAP/NETSUITE)</span>
                  <span className="text-sm font-bold text-slate-700">${calculatedErpSavings.annualSoftwareLicensingSaved.toLocaleString()} / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">TOTAL ESTIMATED ANNUAL VALUE CREATED</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">
                    + ${calculatedErpSavings.totalAnnualValueCreated.toLocaleString()} / year
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom ERP Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ERP TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              ERP Frameworks, Databases & APIs
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              High-availability relational database engines, microservice middleware, and ERP APIs.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ERP_STACK_TABS.map((tab) => (
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
            {ERP_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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
              5-Step ERP Development Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From operational workflow audit to database schema design, migration, and team onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {ERP_PROCESS_STEPS.map((step, idx) => (
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
              Frequently Asked ERP Questions
            </h3>
          </div>

          <div className="space-y-3">
            {ERP_FAQS.map((faq, idx) => {
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
            Ready to Build an Enterprise Custom ERP System?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our senior enterprise ERP architects. Receive a tailored module blueprint, data migration plan, and fixed cost proposal within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book ERP Architecture Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
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
  Mail, 
  MessageSquare, 
  PhoneCall, 
  Workflow, 
  Lock, 
  Cpu, 
  Globe2, 
  Briefcase
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface CrmDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const CRM_SOLUTIONS = [
  {
    id: 'custom-crm-platforms',
    title: 'Custom Enterprise CRM Platforms',
    subtitle: 'ZERO-LICENSING BESPOKE SYSTEMS',
    icon: Building2,
    desc: 'Build tailored, proprietary CRM engines designed around your exact sales workflows, custom object schemas, automated lead routing, and strict data residency rules with zero per-user subscription fees.',
    highlights: [
      'Custom object relational schemas tailored to your operational workflows',
      'Granular role-based access control (RBAC) & field-level data privacy',
      'Sub-200ms record retrieval & offline sync capabilities',
      'Cloud-native self-hosted deployment on AWS, Azure, or GCP'
    ],
    tools: ['Next.js', 'PostgreSQL', 'Node.js', 'GraphQL', 'Tailwind CSS']
  },
  {
    id: 'sales-pipeline-automation',
    title: 'Sales Pipeline & Lead Scoring Engines',
    subtitle: 'AUTOMATED DEAL ACCELERATION',
    icon: Workflow,
    desc: 'Automate lead ingestion, real-time qualification scoring, dynamic stage transitions, SLA alert escalations, and rep assignment algorithms to close deals 4x faster.',
    highlights: [
      'Multi-channel lead ingestion from Webforms, Ads, Email & Webhooks',
      'AI-powered lead scoring based on buyer intent & engagement signals',
      'Automated rep round-robin distribution & SLA response timers',
      'Visual drag-and-drop Kanban sales pipelines with stage automation'
    ],
    tools: ['Node.js Workflows', 'Redis', 'Webhooks', 'Gemini AI', 'PostgreSQL']
  },
  {
    id: 'salesforce-hubspot-integrations',
    title: 'Salesforce & HubSpot Custom Integrations',
    subtitle: 'ENTERPRISE APEX & API MIDDLEWARE',
    icon: Code2,
    desc: 'Extend Salesforce Sales Cloud or HubSpot Enterprise with custom Lightning Web Components (LWC), Apex triggers, custom bi-directional sync middleware, and ERP connectors.',
    highlights: [
      'Bespoke Salesforce Apex, LWC, and Flow trigger engineering',
      'HubSpot custom app development with OAuth2 & REST webhooks',
      'Bi-directional real-time data sync with ERPs (SAP, NetSuite, Dynamics)',
      'Conflict-resolution data deduplication & record cleansing pipelines'
    ],
    tools: ['Salesforce Apex/LWC', 'HubSpot API', 'Zapier/Make', 'Node.js Middleware']
  },
  {
    id: 'omnichannel-customer-support',
    title: 'Omnichannel Customer Support & Helpdesk',
    subtitle: 'UNIFIED SERVICE DESK PORTALS',
    icon: MessageSquare,
    desc: 'Unify customer interactions across Email, Live Chat, WhatsApp, SMS, and Voice calls into a single agent inbox with ticket auto-categorization and AI support copilots.',
    highlights: [
      'Unified omnichannel agent inbox with customer timeline history',
      'AI ticket summarization & automated response suggestions',
      'SLA tracking, priority escalation rules & automated CSAT surveys',
      'Integrated knowledge base & self-service customer portal'
    ],
    tools: ['Twilio Flex', 'Zendesk API', 'SendGrid', 'Socket.io', 'Gemini AI']
  },
  {
    id: 'marketing-automation-dunning',
    title: 'Marketing Automation & Email Dunning',
    subtitle: 'RETENTION & REVENUE RECOVERY',
    icon: Mail,
    desc: 'Deploy dynamic customer journey maps, behavior-triggered drip emails, automated SMS follow-ups, and smart payment dunning sequences to prevent customer churn.',
    highlights: [
      'Visual workflow builder for multi-touch nurture email campaigns',
      'Real-time behavioral trigger alerts when key prospects visit pricing',
      'Smart automated dunning retry schedules for failed credit card payments',
      'A/B testing for email subject lines, send times, and CTAs'
    ],
    tools: ['Klaviyo API', 'SendGrid', 'Stripe Billing', 'PostgreSQL', 'Redis']
  },
  {
    id: 'executive-dashboards-analytics',
    title: 'Executive Dashboards & Sales Telemetry',
    subtitle: 'REAL-TIME REVENUE FORECASTING',
    icon: LineChart,
    desc: 'Empower executive leadership with real-time revenue velocity dashboards, rep leaderboards, win/loss analytics, commission calculation engines, and predictive forecasting.',
    highlights: [
      'Real-time ARR, MRR, CAC, LTV, and Churn rate visualization',
      'Predictive quarterly sales forecasting with machine learning models',
      'Custom automated rep commission calculation & payout reports',
      'Exportable executive PDF/CSV reports and scheduled Slack alerts'
    ],
    tools: ['Recharts', 'D3.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js']
  }
];

const CRM_STACK_TABS = [
  {
    id: 'custom_backends',
    label: 'Custom CRM Frontends & Backends',
    items: [
      { name: 'Next.js 15 & React Admin', spec: 'App Router framework with Server Components & Sub-200ms record loads', benchmark: 'Lightning Fast UX' },
      { name: 'PostgreSQL & Firestore DB', spec: 'Relational data schemas with row-level security & JSONB field flexibility', benchmark: 'ACID Compliant' },
      { name: 'Node.js & GraphQL API Layer', spec: 'Strongly typed API endpoints with gRPC microservice connectivity', benchmark: 'High Throughput' }
    ]
  },
  {
    id: 'platforms_apis',
    label: 'Enterprise CRM Platforms & Middleware',
    items: [
      { name: 'Salesforce Sales & Service Cloud', spec: 'Apex Controllers, LWC, REST/SOAP APIs, and MuleSoft integration', benchmark: 'Enterprise Standard' },
      { name: 'HubSpot Enterprise API', spec: 'Custom timeline events, webhooks, and custom object development', benchmark: 'Marketing & Sales Sync' },
      { name: 'SAP & NetSuite ERP Middleware', spec: 'Bi-directional financial, order, and customer data sync pipelines', benchmark: 'Real-Time ERP Sync' }
    ]
  },
  {
    id: 'telemetry_comms',
    label: 'Communication & AI Telemetry APIs',
    items: [
      { name: 'Twilio & SendGrid APIs', spec: 'Programmable voice, WhatsApp, SMS, and transactional email routing', benchmark: '99.99% Delivery Rate' },
      { name: 'Gemini AI & Semantic Vector Search', spec: 'Automated deal scoring, meeting transcription summarization & support AI', benchmark: 'Smart Sales Copilot' },
      { name: 'Stripe Billing & Dunning APIs', spec: 'Subscription metrics, automated payment retry logic, and invoice sync', benchmark: 'PCI-DSS Level 1' }
    ]
  }
];

const CRM_PROCESS_STEPS = [
  {
    num: '01',
    title: 'Sales Workflow & Data Schema Mapping',
    desc: 'We audit your existing deal stages, lead sources, sales rep handoffs, and customer object fields to design an optimized relational data model.'
  },
  {
    num: '02',
    title: 'Custom UX/UI Wireframing & Pipeline Architecture',
    desc: 'We design intuitive, clutter-free lead views, activity timelines, and Kanban pipeline cards tailored to minimize sales rep click fatigue.'
  },
  {
    num: '03',
    title: 'Platform Engineering, APIs & Migration Engine',
    desc: 'We build custom CRM portals, develop bi-directional API connectors, and execute zero-data-loss migrations from legacy CRMs or spreadsheets.'
  },
  {
    num: '04',
    title: 'Role-Based Security, Audit Logs & Compliance',
    desc: 'We configure granular team permissions, field-level encryption, multi-factor authentication (MFA), and GDPR/HIPAA compliance audit logs.'
  },
  {
    num: '05',
    title: 'Deployment, Staff Onboarding & Analytics Monitoring',
    desc: 'We train your sales & support teams, establish automated daily backup routines, and monitor system telemetry for optimal performance.'
  }
];

const CRM_FAQS = [
  {
    q: 'Why should we build a custom CRM instead of paying for Salesforce or HubSpot?',
    a: 'Off-the-shelf enterprise CRMs like Salesforce and HubSpot charge $150–$300 per user/month, leading to massive annual licensing bills as your team expands. A custom CRM gives you 100% data ownership, zero recurring user fees, exact alignment with your unique sales workflows, and complete freedom from platform limitations.'
  },
  {
    q: 'Can MetaWave migrate our existing data from Salesforce, HubSpot, or Excel spreadsheets?',
    a: 'Yes. We build custom data migration scripts that clean, deduplicate, and safely import all historical lead records, customer contact histories, deal logs, communication timelines, and attached documents with zero downtime or data loss.'
  },
  {
    q: 'Can you integrate our custom CRM with our existing ERP and billing systems?',
    a: 'Absolutely. We specialize in bi-directional API integrations connecting CRMs with ERP systems (SAP, NetSuite, Dynamics 365), payment processors (Stripe, QuickBooks), and email/communication tools (Twilio, SendGrid, Outlook, Gmail).'
  },
  {
    q: 'How does AI lead scoring work inside the CRM?',
    a: 'Our AI lead scoring engines evaluate incoming prospect attributes (company size, industry, job title) along with digital engagement signals (email opens, link clicks, pricing page visits) to calculate a dynamic intent score that prioritizes high-value leads for immediate rep outreach.'
  },
  {
    q: 'Is the custom CRM mobile-friendly for sales reps in the field?',
    a: 'Yes! All CRM frontends engineered by MetaWave are built using responsive mobile-first architecture (PWA / React Native) featuring quick contact click-to-call, voice note transcription, and offline record caching for sales reps on the go.'
  }
];

export function CrmDevelopment({ onNavigate, isStandalonePage = false }: CrmDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('custom_backends');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Sales Rep & CRM Productivity ROI Calculator
  const [salesReps, setSalesReps] = useState(12);
  const [avgDealValue, setAvgDealValue] = useState(4500);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(8); // hours saved per rep per week

  const calculatedCrmRoi = useMemo(() => {
    const totalWeeklyHoursSaved = salesReps * hoursSavedPerWeek;
    const annualHoursSaved = totalWeeklyHoursSaved * 50;
    
    // Assuming 1 deal closed per 40 hours of effective rep time
    const additionalDealsPerYear = Math.round((annualHoursSaved / 40) * 0.35);
    const estimatedAnnualRevenueUplift = additionalDealsPerYear * avgDealValue;

    return {
      totalWeeklyHoursSaved,
      annualHoursSaved,
      additionalDealsPerYear,
      estimatedAnnualRevenueUplift
    };
  }, [salesReps, avgDealValue, hoursSavedPerWeek]);

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
          <span className="text-[#326E45] font-bold">CRM Development</span>
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
              ENTERPRISE CRM ENGINEERING & PIPELINE AUTOMATION STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Custom Enterprise <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">CRM & Pipeline Systems</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Engineered custom CRM software, automated lead qualification pipelines, AI deal scoring models, Salesforce & HubSpot API integrations, and real-time executive telemetry dashboards with zero recurring per-user fees.
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
              <span>Schedule CRM Strategy Call</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore CRM Tech Stack</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingUp size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">4.8x Sales Velocity</div>
              <div className="text-slate-500 text-[11px]">Automated deal routing</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Data Ownership</div>
              <div className="text-slate-500 text-[11px]">Zero user seat tax</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Database size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Zero Data Loss</div>
              <div className="text-slate-500 text-[11px]">Seamless ERP & DB sync</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">GDPR & SOC2 Ready</div>
              <div className="text-slate-500 text-[11px]">Field-level encryption</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core CRM Solutions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Users size={12} />
              <span>CUSTOM CRM SOLUTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Enterprise CRM & Pipeline Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From bespoke proprietary CRM portals to automated lead scoring, Salesforce extensions, and real-time sales telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CRM_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Sales Productivity & ROI Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>CRM PRODUCTIVITY & REVENUE ROI CALCULATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Calculate Annual ROI From Sales Automation
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Eliminating manual clerk entries, automated task reminders, and instant lead assignment frees up sales reps to close more deals. Adjust variables to estimate your ROI.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Sales Reps Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Number of Active Sales Reps:</span>
                    <span className="text-[#326E45] font-mono">{salesReps} reps</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={salesReps}
                    onChange={(e) => { playSound('toggle'); setSalesReps(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Avg Deal Value Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Deal Size ($):</span>
                    <span className="text-[#326E45] font-mono">${avgDealValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={avgDealValue}
                    onChange={(e) => { playSound('toggle'); setAvgDealValue(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Hours Saved Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Weekly Hours Saved Per Rep via Automation:</span>
                    <span className="text-[#326E45] font-mono">{hoursSavedPerWeek} hrs / week</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={hoursSavedPerWeek}
                    onChange={(e) => { playSound('toggle'); setHoursSavedPerWeek(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">PROJECTED TEAM PRODUCTIVITY GAIN</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  ROI ESTIMATE
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">TOTAL TEAM HOURS SAVED / YEAR</span>
                  <span className="text-sm font-bold text-slate-700">{calculatedCrmRoi.annualHoursSaved.toLocaleString()} hours / year</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED EXTRA DEALS CLOSED / YEAR</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">+{calculatedCrmRoi.additionalDealsPerYear} closed deals</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED ANNUAL REVENUE UPLIFT</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    + ${calculatedCrmRoi.estimatedAnnualRevenueUplift.toLocaleString()} / year
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom CRM Audit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED CRM TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              CRM Frameworks, APIs & Connectors
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Battle-tested database architectures, microservices, and communication APIs.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CRM_STACK_TABS.map((tab) => (
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
            {CRM_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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
              5-Step CRM Development Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From workflow discovery to data migration, security hardening, and staff onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {CRM_PROCESS_STEPS.map((step, idx) => (
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
              Frequently Asked CRM Questions
            </h3>
          </div>

          <div className="space-y-3">
            {CRM_FAQS.map((faq, idx) => {
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
            Ready to Build an Enterprise Custom CRM System?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our senior CRM systems architects. Receive a custom workflow blueprint, data migration plan, and fixed proposal within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book CRM Strategy Session</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

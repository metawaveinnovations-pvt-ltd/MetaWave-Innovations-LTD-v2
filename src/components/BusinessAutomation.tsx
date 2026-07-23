import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Workflow, 
  Bot, 
  Cpu, 
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
  Database, 
  Globe, 
  Search, 
  ShieldCheck, 
  FileText, 
  Repeat, 
  Network, 
  Settings, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Coins, 
  GitBranch, 
  Server
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface BusinessAutomationProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const AUTOMATION_SOLUTIONS = [
  {
    id: 'robotic-process-automation',
    title: 'Robotic Process Automation (RPA)',
    subtitle: 'UNATTENDED & ATTENDED BOT FLEETS',
    icon: Bot,
    desc: 'Deploy resilient software bots (UiPath, Power Automate, Custom Python) to automate repetitive data entry, legacy software interactions, and invoice processing with 100% accuracy.',
    highlights: [
      'Unattended bot execution scheduled 24/7/365 with automated exception handling',
      'Legacy terminal & mainframe green-screen GUI emulation scrapers',
      'Cross-system data reconciliation between SAP, Salesforce & Oracle ERPs',
      'Human-in-the-loop validation dashboards for edge-case approvals'
    ],
    tools: ['UiPath', 'Power Automate', 'Python Playwright', 'Selenium', 'Automation Anywhere']
  },
  {
    id: 'intelligent-document-processing',
    title: 'Intelligent Document Processing (IDP)',
    subtitle: 'AI-POWERED OCR & DATA EXTRACTION',
    icon: FileText,
    desc: 'Extract structured JSON from unstructured invoices, PDFs, receipts, bills of lading, and medical forms using multimodal AI vision transformers and LLMs.',
    highlights: [
      'Zero-shot layout document parsing with > 99.4% field accuracy',
      'Automated line-item table parsing & tax validation against ERPs',
      'Multilingual document translation & handwriting recognition',
      'Automated PII masking & redaction for GDPR & HIPAA compliance'
    ],
    tools: ['Google Document AI', 'AWS Textract', 'Gemini Vision', 'Azure Form Recognizer', 'PaddleOCR']
  },
  {
    id: 'workflow-orchestration',
    title: 'Enterprise Workflow Orchestration',
    subtitle: 'EVENT-DRIVEN MULTI-SYSTEM PIPELINES',
    icon: Workflow,
    desc: 'Orchestrate complex cross-departmental business processes across CRM, HRIS, accounting, and cloud services using event-driven microservice workflows.',
    highlights: [
      'Self-hosted n8n & Camunda BPMN 2.0 process engine deployments',
      'Real-time webhook triggers, polling queues, and dead-letter queue retry loops',
      'Custom Zapier & Make.com enterprise integrations with OAuth security',
      'Audit logging, state versioning, and execution telemetry dashboards'
    ],
    tools: ['n8n Enterprise', 'Camunda 8', 'Temporal.io', 'Make.com', 'Zapier']
  },
  {
    id: 'api-erp-integration',
    title: 'API & ERP Ecosystem Integration',
    subtitle: 'REAL-TIME DATA SYNCHRONIZATION',
    icon: Network,
    desc: 'Connect disparate cloud SaaS apps and legacy databases through custom REST, GraphQL, gRPC, and webhooks middleware with sub-second data synchronization.',
    highlights: [
      'Bi-directional real-time sync between CRM (Salesforce/HubSpot) & ERP',
      'Rate-limiting, backpressure handling & token refreshment wrappers',
      'Custom middleware microservices in Node.js, Go, and Python FastAPI',
      'Automated data transformation, schema mapping, and validation'
    ],
    tools: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'Apache Kafka']
  },
  {
    id: 'ai-customer-support-bots',
    title: 'Conversational Support & Email Automation',
    subtitle: 'AI-ASSISTED CUSTOMER & INTERNAL TICKET ROUTING',
    icon: Repeat,
    desc: 'Automate tier-1 customer inquiries, internal IT helpdesk ticketing, and inbound lead qualification with LLM-powered agents integrated into Slack, Teams, and Zendesk.',
    highlights: [
      'Automated email inbox triage, intent classification & auto-draft replies',
      'Zendesk, Salesforce Service Cloud & Intercom AI agent escalation',
      'WhatsApp & Telegram business messaging API integration',
      'Real-time sentiment tracking and human agent handover'
    ],
    tools: ['Zendesk API', 'Slack Webhooks', 'LangGraph', 'Intercom API', 'Twilio']
  },
  {
    id: 'business-intelligence-etl',
    title: 'Automated BI & ETL Data Pipelines',
    subtitle: 'SCHEDULED REPORTING & WAREHOUSE INGESTION',
    icon: BarChart3,
    desc: 'Automate nightly data extraction from multiple databases into Snowflake, BigQuery, or PostgreSQL, generating automated executive PDF reports and Slack alerts.',
    highlights: [
      'Automated dbt & Airflow ETL/ELT scheduling and data cleaning',
      'Scheduled automated PDF report generation & executive email delivery',
      'Real-time anomaly detection alerts on key KPI drops via webhooks',
      'Data warehousing cost optimization & incremental refresh models'
    ],
    tools: ['Apache Airflow', 'dbt', 'BigQuery', 'Snowflake', 'Looker']
  }
];

const AUTOMATION_STACK_TABS = [
  {
    id: 'rpa_idp',
    label: 'RPA & Document AI',
    items: [
      { name: 'UiPath & Power Automate', spec: 'Enterprise unattended bot orchestration with SOC 2 compliance', benchmark: 'Zero-Error Bot' },
      { name: 'Google Document AI & Textract', spec: 'Multimodal vision transformer OCR for invoices and medical forms', benchmark: '99.4% Accuracy' },
      { name: 'Python Playwright & Selenium', spec: 'Headless browser web scrapers & automated GUI interaction scripts', benchmark: 'Sub-100ms Scrape' }
    ]
  },
  {
    id: 'orchestration',
    label: 'Workflow Engines & iPaaS',
    items: [
      { name: 'n8n Enterprise (Self-Hosted)', spec: 'Fair-code workflow engine with 400+ native app integrations', benchmark: '100% On-Prem' },
      { name: 'Camunda 8 & Temporal.io', spec: 'High-throughput BPMN 2.0 microservice stateful event pipelines', benchmark: '100k Exec/Sec' },
      { name: 'Make.com & Zapier Enterprise', spec: 'Rapid cloud integration flows with team role access controls', benchmark: '99.99% Uptime' }
    ]
  },
  {
    id: 'middleware_api',
    label: 'Middleware & Messaging',
    items: [
      { name: 'FastAPI & Node.js Middleware', spec: 'High-speed REST & Webhook payload transformers with Redis queue', benchmark: 'Sub-10ms API' },
      { name: 'Apache Kafka & RabbitMQ', spec: 'Distributed message broker for high-volume enterprise transactions', benchmark: 'Zero Data Loss' },
      { name: 'PostgreSQL & Redis', spec: 'Transactional state cache & idempotency lock storage', benchmark: 'Sub-1ms Lock' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Process Discovery & Bottleneck Audit',
    desc: 'We map your existing manual workflows, analyze time logs, identify error-prone repetitive tasks, and calculate expected ROI hours saved.'
  },
  {
    num: '02',
    title: 'Architecture Design & Security Review',
    desc: 'We design idempotent workflow blueprints, select RPA/iPaaS tools, establish error-handling fallback loops, and ensure compliance.'
  },
  {
    num: '03',
    title: 'Bot Development & Middleware Integration',
    desc: 'We construct automated bots, build API connector wrappers, configure AI document parsers, and connect target ERP/CRM systems.'
  },
  {
    num: '04',
    title: 'Staging Testing & Exception Edge-Case Handling',
    desc: 'We stress-test workflows against thousands of edge cases, bad inputs, network drops, and setup human-in-the-loop review portals.'
  },
  {
    num: '05',
    title: 'Production Deployment & Continuous Telemetry',
    desc: 'We launch production bots with 24/7 monitoring dashboards, error alert webhooks, execution logs, and automated scaling.'
  }
];

const AUTOMATION_FAQS = [
  {
    q: 'What is the ROI of implementing Business Process Automation?',
    a: 'Most MetaWave clients achieve 60%–80% reduction in processing time and 100% elimination of manual human data entry errors within 60 days. On average, our custom RPA and workflow orchestrations pay for themselves in under 4 months.'
  },
  {
    q: 'Can automation connect with our legacy software that lacks modern APIs?',
    a: 'Yes. We build custom Robotic Process Automation (RPA) software bots using Python Playwright, Selenium, and UiPath that interact directly with desktop GUIs, legacy green screens, and web portals exactly as a human employee would.'
  },
  {
    q: 'What happens if a third-party website or API changes its layout or schema?',
    a: 'We build self-healing automation pipelines with automated retry logic, alerting webhooks, and fallback selectors. If an unhandled exception occurs, the system automatically routes the item to a human-in-the-loop review dashboard without halting the entire pipeline.'
  },
  {
    q: 'Is our sensitive company and customer data secure during automated processing?',
    a: 'Absolutely. We enforce zero-trust security practices: end-to-end TLS encryption, self-hosted n8n/Camunda instances inside your private cloud VPC, ephemeral processing without data persistence, and SOC 2 / GDPR / HIPAA compliance.'
  },
  {
    q: 'How long does a typical business automation project take to go live?',
    a: 'Simple workflow integrations and AI document processing pipelines take 2 to 4 weeks. Complex enterprise-wide ERP integrations or multi-bot RPA fleets take 4 to 8 weeks with dedicated staging and validation phases.'
  }
];

export function BusinessAutomation({ onNavigate, isStandalonePage = false }: BusinessAutomationProps) {
  const [activeStackTab, setActiveStackTab] = useState('rpa_idp');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive ROI Calculator State
  const [employeeCount, setEmployeeCount] = useState(15);
  const [hoursPerWeekPerPerson, setHoursPerWeekPerPerson] = useState(12);
  const [avgHourlyCost, setAvgHourlyCost] = useState(45);

  const calculatedRoi = useMemo(() => {
    const weeklyManualHours = employeeCount * hoursPerWeekPerPerson;
    const yearlyManualHours = weeklyManualHours * 52;
    const yearlyManualCost = yearlyManualHours * avgHourlyCost;

    // Estimate 75% hours saved with automation
    const yearlyHoursSaved = Math.round(yearlyManualHours * 0.75);
    const yearlyCostSaved = Math.round(yearlyManualCost * 0.75);

    return {
      weeklyManualHours,
      yearlyManualCost,
      yearlyHoursSaved,
      yearlyCostSaved
    };
  }, [employeeCount, hoursPerWeekPerPerson, avgHourlyCost]);

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
          <span className="text-[#326E45] font-bold">Business Automation</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Workflow size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              ENTERPRISE PROCESS AUTOMATION & RPA STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Intelligent <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Business Process Automation</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Eliminate operational friction with Robotic Process Automation (RPA), AI-powered document extraction (IDP), enterprise workflow orchestrations, and seamless ERP/CRM API middleware.
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
              <span>Schedule Workflow Audit</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Bot size={16} className="text-[#326E45]" />
              <span>Explore RPA Stack</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Clock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">75% Hours Saved</div>
              <div className="text-slate-500 text-[11px]">Automated task execution</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Accuracy</div>
              <div className="text-slate-500 text-[11px]">Zero manual entry error</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingUp size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&lt; 90 Days Payback</div>
              <div className="text-slate-500 text-[11px]">Proven ROI timeline</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">SOC 2 Compliant</div>
              <div className="text-slate-500 text-[11px]">Self-hosted private VPC</div>
            </div>
          </div>
        </div>

        {/* Section 1: Business Automation Offerings */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Bot size={12} />
              <span>AUTOMATION DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              RPA, IDP & Workflow Automation Offerings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              End-to-end automation solutions engineered to scale with your enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUTOMATION_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive ROI & Hours Saved Calculator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Coins size={13} />
            <span>INTERACTIVE ROI CALCULATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Calculate Your Automation Cost Savings
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Adjust team size and manual effort metrics to see projected annual cost savings and recovered productive hours with MetaWave process automation.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                {/* Employee Count */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Team Members Performing Repetitive Tasks:</span>
                    <span className="text-[#326E45] font-mono">{employeeCount} Employees</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={employeeCount}
                    onChange={(e) => { playSound('toggle'); setEmployeeCount(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Hours per week */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Manual Effort Per Employee / Week:</span>
                    <span className="text-[#326E45] font-mono">{hoursPerWeekPerPerson} Hours/Week</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={hoursPerWeekPerPerson}
                    onChange={(e) => { playSound('toggle'); setHoursPerWeekPerPerson(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Average Hourly Cost */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Hourly Employee Cost ($):</span>
                    <span className="text-[#326E45] font-mono">${avgHourlyCost} / Hour</span>
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
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">ROI PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  EST. 75% EFFICIENCY
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED ANNUAL SAVINGS</span>
                  <span className="text-2xl font-display font-extrabold text-[#326E45]">
                    ${calculatedRoi.yearlyCostSaved.toLocaleString()} / year
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">RECOVERED PRODUCTIVE TIME</span>
                  <span className="text-base font-bold text-slate-800">
                    {calculatedRoi.yearlyHoursSaved.toLocaleString()} Hours Saved / year
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">CURRENT MANUAL EXPENSE</span>
                  <span className="text-xs text-slate-500">
                    ${calculatedRoi.yearlyManualCost.toLocaleString()} per year ({calculatedRoi.weeklyManualHours} hrs/wk)
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom Automation Audit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED AUTOMATION TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              RPA Engines, Document AI & iPaaS Middleware
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Enterprise-grade tools tested for high availability, security, and low latency.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {AUTOMATION_STACK_TABS.map((tab) => (
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
            {AUTOMATION_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 4: Process Delivery Steps */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Automation Engineering Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From process mapping and security audits to bot staging and production telemetry.
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
              Frequently Asked Business Automation Questions
            </h3>
          </div>

          <div className="space-y-3">
            {AUTOMATION_FAQS.map((faq, idx) => {
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
            Ready to Automate Your Manual Operations?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a complimentary workflow discovery call with our Automation Directors. Receive a tailored process blueprint and cost-saving breakdown within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Business Automation Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

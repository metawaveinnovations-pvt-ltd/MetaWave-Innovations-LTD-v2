import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  BrainCircuit, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  FileSearch, 
  TrendingUp, 
  Lock, 
  Sparkles, 
  BarChart3, 
  DollarSign, 
  Terminal, 
  Zap, 
  Database, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Calendar, 
  Send, 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  Activity, 
  Compass, 
  Boxes
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface AiAutomationConsultingProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

interface ConsultingSolution {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  desc: string;
  highlights: string[];
  tools: string[];
}

const AI_CONSULTING_SOLUTIONS: ConsultingSolution[] = [
  {
    id: 'agentic-workflows',
    title: 'Autonomous Agent & Multi-Agent Network Consulting',
    subtitle: 'AGENTIC AI ARCHITECTURE',
    icon: Bot,
    desc: 'Design and deploy state-of-the-art autonomous AI agents capable of executing multi-step complex workflows, API calls, dynamic decision routing, and task decomposition.',
    highlights: [
      'Multi-agent orchestration using LangChain, LangGraph, and CrewAI',
      'Function calling & tool integration with ERP, CRM, and internal databases',
      'Human-in-the-loop (HITL) safety verification and exception routing',
      'Custom Gemini 1.5 Pro / Claude 3.5 Sonnet context window optimization'
    ],
    tools: ['Gemini API', 'LangGraph', 'CrewAI', 'FastAPI', 'Python']
  },
  {
    id: 'process-automation',
    title: 'Intelligent Process Automation (IPA) & Hyperautomation',
    subtitle: 'END-TO-END WORKFLOW AUTOMATION',
    icon: Workflow,
    desc: 'Eliminate manual data entry, paper-based document processing, and fragmented software bridging through intelligent RPA bots, web scrapers, and event-driven automation.',
    highlights: [
      'Zero-touch document processing (IDP) for invoices, contracts, & claims',
      'Event-driven webhook integrations between legacy software and cloud APIs',
      'Automated email intake, sentiment analysis, & ticket escalation loops',
      'Sub-second data transformation and queue-based batch execution'
    ],
    tools: ['Temporal', 'n8n', 'Apache Airflow', 'PyTorch', 'Docker']
  },
  {
    id: 'rag-vector-db',
    title: 'Enterprise RAG & Private Knowledge Graph Advisory',
    subtitle: 'DATA PRIVACY & KNOWLEDGE RETRIEVAL',
    icon: Database,
    desc: 'Connect foundational LLMs to your private corporate repositories securely using high-performance Retrieval-Augmented Generation (RAG) and domain vector databases.',
    highlights: [
      'Hybrid semantic & keyword search with vector database indexing',
      'Automated document chunking, token embedding, and metadata filtering',
      'Strict RBAC permissions & document level access control enforcement',
      'Hallucination prevention guardrails & source attribution tracking'
    ],
    tools: ['Pinecone', 'Qdrant', 'PGVector', 'LlamaIndex', 'Elasticsearch']
  },
  {
    id: 'finops-cost-optimization',
    title: 'AI FinOps, Model Quantization & Token Optimization',
    subtitle: 'INFERENCE COST & SPEED OPTIMIZATION',
    icon: DollarSign,
    desc: 'Slash monthly AI inference API costs by 60%–80% without degrading response quality through smart prompt caching, open-source model self-hosting, and token pruning.',
    highlights: [
      'Self-hosted quantized open-source models (Llama 3, Mistral) on vLLM',
      'Semantic caching & prompt hash deduplication layers',
      'Dynamic routing between high-tier and low-cost LLMs based on task complexity',
      'Real-time token cost budgeting, latency profiling, and usage analytics'
    ],
    tools: ['vLLM', 'Ollama', 'Redis Caching', 'Triton Server', 'Prometheus']
  },
  {
    id: 'computer-vision-idp',
    title: 'Computer Vision & Intelligent Document Processing (IDP)',
    subtitle: 'VISUAL AI & AUTOMATED OCR',
    icon: EyeIcon,
    desc: 'Automate visual quality assurance, document scanning, optical character recognition (OCR), and spatial media parsing with custom computer vision models.',
    highlights: [
      'Automated invoice, bill-of-lading, and medical record data extraction',
      'Visual defect inspection for manufacturing and warehouse operations',
      'Facial recognition, liveness verification, and identity compliance',
      'Edge AI device deployment (NVIDIA Jetson, ONNX runtime optimization)'
    ],
    tools: ['OpenCV', 'YOLOv8', 'Tesseract OCR', 'ONNX', 'PyTorch']
  },
  {
    id: 'ai-governance-security',
    title: 'AI Security, Governance & Red-Teaming Compliance',
    subtitle: 'ENTERPRISE AI GUARDRAILS',
    icon: ShieldCheck,
    desc: 'Ensure compliance with GDPR, EU AI Act, HIPAA, and SOC2 standards while protecting your corporate IP against prompt injection, model poisoning, and data leaks.',
    highlights: [
      'Real-time PII redacting and sensitive data anonymization middleware',
      'Prompt injection defense, jailbreak mitigation, and output filtering',
      'Comprehensive AI audit logging, explainability, and bias reporting',
      'Enterprise AI usage policies, employee risk training, and security audits'
    ],
    tools: ['NeMo Guardrails', 'LangKit', 'HashiCorp Vault', 'Presidio', 'OpenTelemetry']
  }
];

function EyeIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 20} 
      height={props.size || 20} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const AI_FRAMEWORKS = [
  {
    category: 'GenAI & Agents',
    name: 'Gemini 1.5 Pro & LangGraph Agent Network',
    type: 'Multi-Agent Autonomous Framework',
    desc: 'Production-grade agent architecture capable of handling 2M token context, asynchronous tool calls, and stateful workflow graphs.',
    specSnippet: `// Gemini 1.5 Pro LangGraph Agent Orchestration
import { GoogleGenAI } from '@google/genai';
import { StateGraph } from '@langchain/langgraph';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const workflow = new StateGraph({ channels: { messages: { value: (x, y) => x.concat(y) } } });
// Configured with HITL verification & automatic retry logic`
  },
  {
    category: 'RPA & Automation',
    name: 'Temporal & n8n Enterprise Workflow Engine',
    type: 'Resilient Event-Driven Orchestration',
    desc: 'Durable execution framework that guarantees zero lost state during server restarts, API rate limits, or network timeouts.',
    specSnippet: `// Temporal Durable Workflow Definition
import { proxyActivities } from '@temporalio/workflow';

const { extractInvoiceData, updateERP, notifySlack } = proxyActivities({
  startToCloseTimeout: '1 minute',
  retry: { initialInterval: '1s', maximumAttempts: 5 }
});`
  },
  {
    category: 'Vector Search',
    name: 'Qdrant & PGVector Hybrid Search Engine',
    type: 'High-Performance Vector Indexing',
    desc: 'Sub-15ms vector retrieval combining dense neural embeddings with sparse BM25 keyword matching for 99.4% precision.',
    specSnippet: `// PGVector Hybrid HNSW Index Creation
CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
-- Filtered by user tenant_id and document security ACLs`
  },
  {
    category: 'AI FinOps',
    name: 'vLLM & Semantic Prompt Cache Layer',
    type: 'Self-Hosted Model Inference & Caching',
    desc: 'Reduces API costs by 70%+ through semantic embedding similarity matching on historical prompt queries.',
    specSnippet: `// Redis Semantic Prompt Cache Match
const queryEmbedding = await getEmbedding(userPrompt);
const cachedResponse = await redis.vectorSearch('prompt_cache', queryEmbedding, {
  similarityThreshold: 0.96
});
if (cachedResponse) return cachedResponse;`
  }
];

const FAQS = [
  {
    q: 'Will our proprietary corporate data be used to train public AI models?',
    a: 'No, absolutely not. All AI automation architectures engineered by MetaWave Innovations utilize strict enterprise API endpoints with explicit zero-data-retention guarantees, or completely self-hosted open-source models deployed inside your private VPC (AWS/GCP/Azure).'
  },
  {
    q: 'How long does a typical AI Automation Consulting engagement take to show ROI?',
    a: 'Most clients see initial proof-of-concept (PoC) agent deployments within 2 to 3 weeks. Full production integration with measurable labor savings and process velocity gains is usually achieved in 6 to 8 weeks.'
  },
  {
    q: 'Can AI automation integrate with legacy ERP or on-premise databases?',
    a: 'Yes. We build custom API middleware wrappers, secure SSH tunnel bridges, or intelligent RPA screen-scraping bots to interface seamlessly with legacy software like SAP, Oracle, custom AS/400 systems, or older SQL databases.'
  },
  {
    q: 'How do you prevent AI model hallucinations in critical business workflows?',
    a: 'We implement strict Retrieval-Augmented Generation (RAG) architectures with citation requirements, output JSON schema validation, boundary guardrails (NeMo Guardrails), and Human-in-the-Loop (HITL) escalation triggers for high-risk decisions.'
  },
  {
    q: 'What is the cost structure for AI Automation Consulting?',
    a: 'We offer flexible engagement models tailored to your requirements, including fixed-scope strategic advisory projects, milestone-based implementation phases, or dedicated Fractional AI Engineering teams.'
  }
];

const STEPS = [
  {
    num: '01',
    title: 'Process Discovery & Automation Mapping',
    desc: 'We analyze your team’s manual workflows, identify highest-ROI bottlenecks, evaluate data readiness, and quantify target labor savings.'
  },
  {
    num: '02',
    title: 'Architecture & LLM Model Selection',
    desc: 'We design custom agentic architectures, evaluate proprietary vs. open-source models, map security guardrails, and define API specifications.'
  },
  {
    num: '03',
    title: 'Proof-of-Concept & Pilot Agent Deployment',
    desc: 'We construct a fully functional prototype agent or workflow in a sandbox environment within 14 days to validate accuracy and speed.'
  },
  {
    num: '04',
    title: 'Enterprise Integration & Safety Hardening',
    desc: 'We connect the automation to your live ERP/CRM, implement strict PII redacting, set up semantic caching, and run security red-teaming.'
  },
  {
    num: '05',
    title: 'Continuous Monitoring, Fine-Tuning & Scaling',
    desc: 'We deploy real-time token telemetry dashboards, establish automated evaluation loops, and continuously optimize inference costs.'
  }
];

export function AiAutomationConsulting({ onNavigate, isStandalonePage = true }: AiAutomationConsultingProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState<ConsultingSolution | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // ROI Calculator States
  const [employees, setEmployees] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [weeklyManualHours, setWeeklyManualHours] = useState(15);
  const [automationPercent, setAutomationPercent] = useState(60);

  // Consultation Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    company: '',
    projectScope: 'AI Agent Workflows',
    timeline: '1-3 Months',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ROI Calculation Math
  const monthlyHoursSaved = useMemo(() => {
    return Math.round(employees * weeklyManualHours * 4.33 * (automationPercent / 100));
  }, [employees, weeklyManualHours, automationPercent]);

  const monthlySavings = useMemo(() => {
    return Math.round(monthlyHoursSaved * hourlyRate);
  }, [monthlyHoursSaved, hourlyRate]);

  const annualSavings = useMemo(() => {
    return monthlySavings * 12;
  }, [monthlySavings]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    playSound('click');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) return;
    setIsSubmitted(true);
    playSound('success');
  };

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      
      {/* Background Soft Ambiance Lights */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#326E45]/[0.04] rounded-full blur-[150px] pointer-events-none" />
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
          <span className="text-[#326E45] font-bold">AI & Automation Consulting</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <BrainCircuit size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              STRATEGIC AI & AUTOMATION ADVISORY
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Empower Operations with <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">AI Automation & Autonomous Agents</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We help enterprise engineering teams and forward-thinking businesses architect multi-agent systems, intelligent document processing (IDP), zero-trust RAG knowledge bases, and hyperautomated workflow orchestration.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => { playSound('click'); setIsModalOpen(true); setIsSubmitted(false); }}
              className="px-6 py-3.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#326E45]/20 flex items-center gap-2 cursor-pointer"
            >
              <Calendar size={16} />
              <span>Book AI Strategy Session</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="#roi-calculator"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('roi-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Sliders size={16} className="text-[#326E45]" />
              <span>Calculate Automation ROI</span>
            </a>
          </motion.div>
        </div>

        {/* Telemetry Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingUp size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base">85%+ Gain</div>
              <div className="text-slate-500 text-[11px]">Workflow Velocity</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <DollarSign size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base">$420k+ Saved</div>
              <div className="text-slate-500 text-[11px]">Avg Annual Labor ROI</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base">100% Private</div>
              <div className="text-slate-500 text-[11px]">Zero Data Retention</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base">&lt;100ms Latency</div>
              <div className="text-slate-500 text-[11px]">Semantic Caching</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core AI Automation Consulting Capabilities */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Boxes size={12} />
              <span>CONSULTING DOMAINS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Comprehensive AI Automation Practice
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From high-level executive AI roadmaps to hands-on multi-agent code orchestration and FinOps cost optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_CONSULTING_SOLUTIONS.map((solution) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={solution.id}
                  className="bg-white border border-slate-200/90 hover:border-[#326E45]/40 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#326E45] group-hover:bg-[#326E45] group-hover:text-white transition-colors shrink-0">
                        <Icon size={20} />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 uppercase">
                        {solution.subtitle}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-[#326E45] transition-colors mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {solution.desc}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-3">
                      {solution.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 size={13} className="text-[#326E45] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {solution.tools.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => { playSound('click'); setSelectedSolution(solution); }}
                      className="text-xs font-bold text-[#326E45] hover:text-[#245032] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Interactive AI & Automation ROI Calculator */}
        <div id="roi-calculator" className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Sliders size={12} />
              <span>INTERACTIVE ROI MODELING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Calculate Your AI Automation Financial Savings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Adjust your team parameters to see real-time projections for reclaimed labor hours and annualized cost reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input Panel */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Employee Count */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Team Size (Involved Employees):</span>
                  <span className="text-[#326E45] font-mono font-extrabold text-sm">{employees} Employees</span>
                </div>
                <input 
                  type="range" 
                  min={2} 
                  max={200} 
                  step={1} 
                  value={employees} 
                  onChange={(e) => { playSound('toggle'); setEmployees(Number(e.target.value)); }}
                  className="w-full accent-[#326E45] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>2 team members</span>
                  <span>200 team members</span>
                </div>
              </div>

              {/* Slider 2: Average Hourly Rate */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Average Blended Hourly Rate ($/hr):</span>
                  <span className="text-[#326E45] font-mono font-extrabold text-sm">${hourlyRate} / hr</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={180} 
                  step={5} 
                  value={hourlyRate} 
                  onChange={(e) => { playSound('toggle'); setHourlyRate(Number(e.target.value)); }}
                  className="w-full accent-[#326E45] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$20/hr</span>
                  <span>$180/hr</span>
                </div>
              </div>

              {/* Slider 3: Weekly Manual Hours */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Repetitive Task Hours Per Employee/Wk:</span>
                  <span className="text-[#326E45] font-mono font-extrabold text-sm">{weeklyManualHours} Hours/Wk</span>
                </div>
                <input 
                  type="range" 
                  min={3} 
                  max={35} 
                  step={1} 
                  value={weeklyManualHours} 
                  onChange={(e) => { playSound('toggle'); setWeeklyManualHours(Number(e.target.value)); }}
                  className="w-full accent-[#326E45] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>3 hrs/wk</span>
                  <span>35 hrs/wk</span>
                </div>
              </div>

              {/* Slider 4: Automation Target % */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Target AI Automation Percentage:</span>
                  <span className="text-[#326E45] font-mono font-extrabold text-sm">{automationPercent}% Automation</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={90} 
                  step={5} 
                  value={automationPercent} 
                  onChange={(e) => { playSound('toggle'); setAutomationPercent(Number(e.target.value)); }}
                  className="w-full accent-[#326E45] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20% (Assisted)</span>
                  <span>90% (Autonomous)</span>
                </div>
              </div>

            </div>

            {/* Live Calculation Projection Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#326E45]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block">
                  ESTIMATED SAVINGS PROJECTION
                </span>
                <h3 className="text-lg font-bold text-white">Projected Efficiency Return</h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
                  <div className="text-[11px] text-slate-400 font-mono">Reclaimed Monthly Team Hours</div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400 mt-1">
                    {monthlyHoursSaved.toLocaleString()} <span className="text-xs text-slate-400 font-normal">hrs / month</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
                  <div className="text-[11px] text-slate-400 font-mono">Estimated Monthly Cost Savings</div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    ${monthlySavings.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/60">
                  <div className="text-[11px] text-emerald-300 font-mono">Projected Annual Financial Impact</div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-400 mt-1">
                    ${annualSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => { playSound('click'); setIsModalOpen(true); setIsSubmitted(false); }}
                className="w-full py-3 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-[#326E45]/30"
              >
                <span>Request Custom ROI Audit</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Section 3: AI Frameworks & Architecture Tech Stack Matrix */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Code2 size={12} />
              <span>APPROVED TECH STACK & BLUEPRINTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Battle-Tested AI Architecture Blueprints
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Sample production code patterns used in our AI automation consulting engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AI_FRAMEWORKS.map((fw, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs hover:border-[#326E45]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 uppercase">
                      {fw.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">{fw.name}</h3>
                  </div>

                  <button
                    onClick={() => handleCopyCode(fw.specSnippet, idx)}
                    className="p-2 text-slate-400 hover:text-[#326E45] bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Copy Code Snippet"
                  >
                    {copiedIndex === idx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">{fw.desc}</p>

                <div className="bg-slate-950 text-slate-100 rounded-xl p-3.5 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
                  <pre>{fw.specSnippet}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 5-Step AI & Automation Transformation Lifecycle */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              PROVEN CONSULTING LIFECYCLE
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step AI Transformation Methodology
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Structured engineering advisory designed to de-risk AI adoption and deliver predictable, measurable outcomes.
            </p>
          </div>

          <div className="space-y-4">
            {STEPS.map((s, idx) => (
              <div 
                key={idx}
                className="p-5 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/80 rounded-2xl flex items-start gap-4 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#326E45]/10 text-[#326E45] flex items-center justify-center font-mono font-extrabold text-sm shrink-0">
                  {s.num}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Frequently Asked Questions Accordion */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <HelpCircle size={12} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              AI Automation Advisory Insights
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => { playSound('toggle'); setOpenFaqIndex(isOpen ? null : idx); }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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

        {/* Section 6: High-Impact Consultation CTA Banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center border border-slate-800">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#326E45]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-widest block bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50 w-fit mx-auto">
              24-HOUR STRATEGY RESPONSE GUARANTEE
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Ready to Architect Your Enterprise AI Automation Roadmap?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book a 45-minute technical discovery session with our Principal AI Architects to evaluate your workflows, security requirements, and ROI timeline.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => { playSound('click'); setIsModalOpen(true); setIsSubmitted(false); }}
                className="px-8 py-3.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#326E45]/30 flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={16} />
                <span>Schedule Advisory Session</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Contact Engineering Team</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* DETAIL MODAL FOR SOLUTIONS */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full relative p-6 sm:p-8 flex flex-col gap-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[#326E45] flex items-center justify-center font-bold">
                    {React.createElement(selectedSolution.icon, { size: 20 })}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#326E45] uppercase block">
                      {selectedSolution.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedSolution.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSolution(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedSolution.desc}
              </p>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                  DELIVERABLES INCLUDED:
                </span>
                {selectedSolution.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={13} className="text-[#326E45] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedSolution(null);
                    setIsModalOpen(true);
                    setIsSubmitted(false);
                  }}
                  className="w-full py-3 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Solution Advisory</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STRATEGY SESSION BOOKING MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full relative p-6 sm:p-8 flex flex-col gap-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[9px] font-mono font-bold text-[#326E45] uppercase block">
                    AI AUTOMATION DISCOVERY
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Schedule Technical Strategy Session
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Company Name</label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={bookingForm.company}
                        onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Primary Focus Area</label>
                      <select
                        value={bookingForm.projectScope}
                        onChange={(e) => setBookingForm({ ...bookingForm, projectScope: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                      >
                        <option value="AI Agent Workflows">AI Agent Workflows</option>
                        <option value="Process Automation (RPA)">Process Automation (RPA)</option>
                        <option value="Enterprise RAG / Knowledge Base">Enterprise RAG / Knowledge Base</option>
                        <option value="AI FinOps & Model Optimization">AI FinOps & Model Optimization</option>
                        <option value="Security & Compliance Audit">Security & Compliance Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Current Manual Workflow & Objectives</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the processes, team size, or systems you wish to automate with AI..."
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-[#326E45]/20"
                  >
                    <span>Transmit Strategy Request</span>
                    <Send size={14} />
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Advisory Session Request Confirmed</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Thank you, <span className="font-bold text-slate-900">{bookingForm.name}</span>! Our Principal AI Architects will review your notes and reply to <span className="font-bold text-slate-900">{bookingForm.email}</span> within 24 hours with calendar availability.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

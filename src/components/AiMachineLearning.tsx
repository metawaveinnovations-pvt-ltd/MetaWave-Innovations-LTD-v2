import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Brain, 
  Sparkles, 
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
  Search, 
  Terminal, 
  ShieldCheck, 
  Workflow, 
  Eye, 
  MessageSquare, 
  Network, 
  Code, 
  Flame, 
  Binary
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface AiMachineLearningProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const AI_SOLUTIONS_CARDS = [
  {
    id: 'generative-ai-llm',
    title: 'Generative AI & LLM Orchestration',
    subtitle: 'GEMINI, GPT-4 & CLAUDE INTEGRATION',
    icon: Sparkles,
    desc: 'Custom enterprise integration of Google Gemini 1.5 Pro/Flash, OpenAI GPT-4o, and Anthropic Claude models. We build secure multi-modal prompt engineering and function calling pipelines.',
    highlights: [
      'Multi-modal processing (Text, Code, Audio, Video, PDF Documents)',
      'Enterprise Google GenAI SDK & OpenAI function calling integration',
      'Structured JSON output validation & schema enforcement',
      'Zero-data retention enterprise privacy compliance (SOC 2, HIPAA)'
    ],
    tools: ['Google GenAI SDK', 'Gemini 1.5', 'LangChain', 'LlamaIndex', 'OpenAI API']
  },
  {
    id: 'rag-vector-search',
    title: 'Retrieval-Augmented Generation (RAG)',
    subtitle: 'ENTERPRISE KNOWLEDGE GRAPH SEARCH',
    icon: Search,
    desc: 'Connect large language models to your proprietary corporate databases and document repositories. Achieve accurate, grounded responses with sub-second hybrid vector search.',
    highlights: [
      'Hybrid semantic vector search + BM25 keyword matching',
      'High-throughput embedding pipelines (Pinecone, Qdrant, PGVector)',
      'Document chunking, re-ranking (Cohere) & citation attribution',
      'Grounding validation to prevent LLM hallucinations'
    ],
    tools: ['Pinecone', 'Qdrant', 'PGVector', 'ChromaDB', 'Cohere Rerank']
  },
  {
    id: 'custom-fine-tuning',
    title: 'Custom Model Fine-Tuning & Quantization',
    subtitle: 'DOMAIN-SPECIFIC AI MODELS',
    icon: Brain,
    desc: 'Fine-tune open-source models (Llama 3, Mistral, Gemma) on your industry dataset. Quantize models for low-latency GPU/NPU deployment at a fraction of public API costs.',
    highlights: [
      'LoRA & QLoRA parameter-efficient fine-tuning pipelines',
      'Custom instruction dataset curation & synthetic data generation',
      'Model quantization (AWQ, GGUF, INT8/INT4) for fast inference',
      'Private cloud deployment (AWS SageMaker, GCP Vertex AI)'
    ],
    tools: ['PyTorch', 'Hugging Face', 'vLLM', 'Vertex AI', 'SageMaker']
  },
  {
    id: 'autonomous-ai-agents',
    title: 'Autonomous AI Agents & Workflows',
    subtitle: 'MULTI-AGENT TASK AUTOMATION',
    icon: Bot,
    desc: 'Build self-organizing multi-agent networks capable of executing complex multi-step workflows, web research, code synthesis, tool usage, and database operations autonomously.',
    highlights: [
      'Multi-agent collaboration architectures (CrewAI, Autogen, LangGraph)',
      'Tool execution loops with human-in-the-loop approval thresholds',
      'Stateful memory management (short-term & long-term episodic memory)',
      'Asynchronous task queues with automated error recovery'
    ],
    tools: ['LangGraph', 'CrewAI', 'AutoGen', 'FastAPI', 'Redis']
  },
  {
    id: 'computer-vision-nlp',
    title: 'Computer Vision & Deep Learning',
    subtitle: 'REAL-TIME IMAGE & VIDEO ANALYTICS',
    icon: Eye,
    desc: 'Edge-optimized computer vision and natural language processing models for automated quality inspection, OCR document extraction, facial recognition, and anomaly detection.',
    highlights: [
      'YOLOv8 & Transformer object detection for edge/cloud streams',
      'Multi-language OCR & Intelligent Document Processing (IDP)',
      'Real-time video stream ingestion & spatial analytics',
      'Edge deployment on NVIDIA Jetson, TensorRT & ONNX Runtime'
    ],
    tools: ['OpenCV', 'YOLOv8', 'TensorRT', 'ONNX', 'PyTorch']
  },
  {
    id: 'mlops-llmops',
    title: 'MLOps & LLMOps Infrastructure',
    subtitle: 'PRODUCTION MODEL MONITORING & GOVERNANCE',
    icon: Network,
    desc: 'Automate model training, continuous evaluation, drift detection, and LLM telemetry. Ensure 99.99% reliability with prompt versioning and token cost optimization.',
    highlights: [
      'Automated model retraining pipelines & feature stores (Feast)',
      'LLM request tracing, latency benchmarking & token cost analytics',
      'Prompt evaluation test suites (Ragas, DeepEval) & guardrails',
      'Model deployment with vLLM, Triton Server & Kubernetes'
    ],
    tools: ['MLflow', 'LangSmith', 'Arize Phoenix', 'Triton', 'vLLM']
  }
];

const AI_STACK_TABS = [
  {
    id: 'llms',
    label: 'LLMs & Generative AI',
    items: [
      { name: 'Google Gemini 1.5 Pro / Flash', spec: '2 Million token context window, native multimodal support', benchmark: 'Top Grounding' },
      { name: 'OpenAI GPT-4o & O1', spec: 'Advanced reasoning, vision, and function calling integration', benchmark: 'Sub-300ms API' },
      { name: 'Llama 3.3 & Mistral Large', spec: 'Open-weights foundation models for private cloud hosting', benchmark: '100% On-Prem' }
    ]
  },
  {
    id: 'vector_rag',
    label: 'Vector DBs & RAG',
    items: [
      { name: 'Pinecone Enterprise', spec: 'Serverless vector index with multi-tenant namespaces', benchmark: '< 20ms Query' },
      { name: 'Qdrant & PGVector', spec: 'Open-source hybrid vector + payload filtering engine', benchmark: 'High Throughput' },
      { name: 'LangChain & LlamaIndex', spec: 'Data ingestion, document chunking & RAG agent orchestration', benchmark: 'Enterprise Standard' }
    ]
  },
  {
    id: 'frameworks_ml',
    label: 'ML Frameworks & Vision',
    items: [
      { name: 'PyTorch & Hugging Face', spec: 'Custom deep learning neural network training & transformers', benchmark: 'Industry Standard' },
      { name: 'vLLM & TensorRT-LLM', spec: 'High-throughput PagedAttention inference server engines', benchmark: '5x Token/Sec' },
      { name: 'YOLOv8 & OpenCV', spec: 'Real-time computer vision object detection and tracking', benchmark: '60 FPS Edge' }
    ]
  },
  {
    id: 'mlops_eval',
    label: 'MLOps & Evaluation',
    items: [
      { name: 'LangSmith & Phoenix', spec: 'LLM observability, latency tracing, and hallucination evaluation', benchmark: 'Full Telemetry' },
      { name: 'MLflow & Feast', spec: 'Experiment tracking, model registry, and feature store', benchmark: 'Reproducible ML' },
      { name: 'Guardrails AI & NeMo', spec: 'Input/output toxicity filtering, PII masking, and safety rails', benchmark: 'Zero Data Leak' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'AI Use Case Audit & Data Readiness Check',
    desc: 'We assess your business goals, evaluate dataset quality, define accuracy target benchmarks, and select optimal foundation AI models.'
  },
  {
    num: '02',
    title: 'Data Ingestion & RAG Architecture Setup',
    desc: 'We build vector indexing pipelines, chunk corporate knowledge bases, and configure semantic hybrid search algorithms.'
  },
  {
    num: '03',
    title: 'Model Fine-Tuning & Prompt Engineering',
    desc: 'We optimize system prompts, fine-tune domain-specific LLMs using QLoRA, and implement function calling API connectors.'
  },
  {
    num: '04',
    title: 'Evaluation, Guardrails & Security Audits',
    desc: 'We run comprehensive hallucination tests (Ragas), inject safety guardrails, enforce PII masking, and audit response latency.'
  },
  {
    num: '05',
    title: 'Production MLOps Deployment & Monitoring',
    desc: 'We deploy to scalable Kubernetes/vLLM endpoints with real-time LangSmith tracing, token cost controls, and continuous retraining.'
  }
];

const AI_FAQS = [
  {
    q: 'How does MetaWave prevent AI hallucinations and ungrounded responses?',
    a: 'We implement Retrieval-Augmented Generation (RAG) coupled with re-ranking models (Cohere) and grounding verification layers. By forcing the LLM to source answers strictly from verified vector database chunks with exact citation links, we reduce hallucinations by over 98%.'
  },
  {
    q: 'Will our proprietary corporate data be used to train public AI models?',
    a: 'No. We enforce strict enterprise data privacy protocols. All models are deployed via dedicated enterprise cloud endpoints (e.g. Google Vertex AI, AWS Bedrock) or hosted in your private VPC using open-source models (Llama 3) with zero data retention or public training.'
  },
  {
    q: 'What is the difference between RAG and custom model fine-tuning?',
    a: 'RAG supplies up-to-date external knowledge to an LLM at query time, making it ideal for document search and customer support. Fine-tuning modifies the internal weights of a model to teach it specific domain jargon, tone, or complex reasoning syntax.'
  },
  {
    q: 'How much do LLM API token costs typically run for enterprise apps?',
    a: 'Costs depend on request volume and model choice. We optimize token expenses using hybrid architectures: routing 80% of routine queries to fast, low-cost models (Gemini Flash, GPT-4o-mini) and reserving heavy models for complex reasoning. We also implement semantic prompt caching to cut costs by up to 60%.'
  },
  {
    q: 'Can you integrate autonomous AI agents into our existing software stack?',
    a: 'Yes. We build stateful agent workflows using LangGraph and CrewAI that connect directly to your REST/GraphQL APIs, SQL databases, CRM, and internal messaging channels like Slack or Teams for automated task execution.'
  }
];

export function AiMachineLearning({ onNavigate, isStandalonePage = false }: AiMachineLearningProps) {
  const [activeStackTab, setActiveStackTab] = useState('llms');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Estimator State
  const [aiProjectType, setAiProjectType] = useState<'rag_knowledge' | 'fine_tuned_llm' | 'ai_agent' | 'computer_vision'>('rag_knowledge');
  const [dataVolume, setDataVolume] = useState<'small' | 'medium' | 'enterprise'>('medium');
  const [needPrivateVpc, setNeedPrivateVpc] = useState(true);
  const [needMlopsTracing, setNeedMlopsTracing] = useState(true);

  const calculatedEstimate = useMemo(() => {
    let weeks = '4–8 Weeks';
    let team = '1 Principal AI Engineer + 1 Data Engineer + 1 MLOps Specialist';
    let deliverables = 'Vector Database RAG Index + Hybrid Search API + Evaluation Benchmarks';

    if (aiProjectType === 'fine_tuned_llm') {
      weeks = '6–10 Weeks';
      team = '1 Lead ML Scientist + 1 Data Curation Lead + 1 Cloud GPU Engineer';
      deliverables = 'Fine-Tuned Llama 3 Model + Quantized vLLM Server + Training Scripts';
    } else if (aiProjectType === 'ai_agent') {
      weeks = '5–9 Weeks';
      team = '1 AI Systems Architect + 1 Backend Engineer + 1 Prompt Engineer';
      deliverables = 'LangGraph Agent Network + Custom API Tool Connectors + Guardrails';
    } else if (aiProjectType === 'computer_vision') {
      weeks = '4–7 Weeks';
      team = '1 Computer Vision Engineer + 1 Edge Deployment Specialist';
      deliverables = 'Custom Trained YOLO Model + TensorRT Edge Pipeline + Stream Analytics';
    }

    if (dataVolume === 'enterprise') {
      weeks += ' (+ 2 wks Large Ingestion Pipeline)';
    }

    return { weeks, team, deliverables };
  }, [aiProjectType, dataVolume, needPrivateVpc, needMlopsTracing]);

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
          <span className="text-[#326E45] font-bold">AI & Machine Learning</span>
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
              ENTERPRISE GENERATIVE AI & MACHINE LEARNING STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Enterprise <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">AI & Machine Learning Solutions</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Unlock business value with custom Generative AI models, Retrieval-Augmented Generation (RAG), vector databases, LLM fine-tuning, autonomous agents, and enterprise MLOps pipelines.
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
              <span>Consult Our AI Directors</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Brain size={16} className="text-[#326E45]" />
              <span>Explore AI Tech Stack</span>
            </button>
          </motion.div>
        </div>

        {/* 4 Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&gt; 98% Accuracy</div>
              <div className="text-slate-500 text-[11px]">Grounded RAG search</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Zap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">&lt; 300ms Latency</div>
              <div className="text-slate-500 text-[11px]">vLLM GPU acceleration</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Flame size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">60% Token Savings</div>
              <div className="text-slate-500 text-[11px]">Semantic caching</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Private VPC</div>
              <div className="text-slate-500 text-[11px]">Zero model data leak</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core AI & ML Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Brain size={12} />
              <span>AI & MACHINE LEARNING DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Generative AI, RAG & MLOps Offerings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From enterprise RAG knowledge search to custom LLM fine-tuning, computer vision, and autonomous agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_SOLUTIONS_CARDS.map((item) => {
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

        {/* Section 2: Interactive AI Stack & Specs Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED ENTERPRISE AI TECHNOLOGY STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Foundation LLMs, Vector DBs & MLOps Stack
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Inspect our production-ready AI models, vector engines, and evaluation frameworks.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {AI_STACK_TABS.map((tab) => (
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
            {AI_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive AI Project Scope Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your AI / ML Engineering Scope
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your AI implementation type and data scale to generate project timelines, dedicated AI scientist squad compositions, and core deliverables.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* AI Solution Type */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. AI Solution Architecture
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'rag_knowledge', label: 'RAG Knowledge Search' },
                      { id: 'fine_tuned_llm', label: 'Custom Fine-Tuned LLM' },
                      { id: 'ai_agent', label: 'Autonomous AI Agents' },
                      { id: 'computer_vision', label: 'Computer Vision / Edge' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => { playSound('toggle'); setAiProjectType(type.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          aiProjectType === type.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Scale */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Ingestion Dataset Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'small', label: '< 10k Docs' },
                      { id: 'medium', label: '10k – 500k Docs' },
                      { id: 'enterprise', label: '500k+ Docs / Multimodal' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => { playSound('toggle'); setDataVolume(s.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          dataVolume === s.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needPrivateVpc}
                      onChange={(e) => setNeedPrivateVpc(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Deploy in Private Cloud VPC (AWS / GCP / Azure)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needMlopsTracing}
                      onChange={(e) => setNeedMlopsTracing(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include LangSmith / MLOps Latency & Cost Tracing</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">AI PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  GUARANTEED SLA
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED DELIVERY TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED AI SCIENTIST SQUAD</span>
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
                <span>Request AI Architecture Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: AI Delivery Methodology */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS AI METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Enterprise AI Development Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From data readiness audits to vector database chunking, fine-tuning, guardrails, and production MLOps.
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
              Frequently Asked AI & Machine Learning Questions
            </h3>
          </div>

          <div className="space-y-3">
            {AI_FAQS.map((faq, idx) => {
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
            Ready to Build Your Enterprise AI Capabilities?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a confidential AI consultation with our lead machine learning scientists. Receive a customized RAG architecture, model choice recommendation, and project scope estimate within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book AI Architecture Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

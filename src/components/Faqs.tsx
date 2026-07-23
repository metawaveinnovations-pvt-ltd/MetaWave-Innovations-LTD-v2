import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  DollarSign, 
  Lock, 
  BrainCircuit, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  Zap,
  Clock,
  Send,
  RefreshCw,
  X
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface FaqItem {
  id: string;
  category: 'general' | 'engineering' | 'pricing' | 'security' | 'ai';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
  tip?: string;
}

interface FaqsProps {
  onNavigate?: (sectionId: string) => void;
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle, count: 10 },
  { id: 'general', label: 'General & Process', icon: Users, count: 2 },
  { id: 'engineering', label: 'Engineering & Tech', icon: Code2, count: 2 },
  { id: 'pricing', label: 'Pricing & IP', icon: DollarSign, count: 2 },
  { id: 'security', label: 'Security & SLAs', icon: Lock, count: 2 },
  { id: 'ai', label: 'AI & Custom Solutions', icon: BrainCircuit, count: 2 },
];

const FAQ_DATA: FaqItem[] = [
  // General & Process
  {
    id: 'faq-1',
    category: 'general',
    categoryLabel: 'General & Process',
    question: 'How does MetaWave Innovations handle software project discovery and onboarding?',
    answer: 'Our discovery process begins with a comprehensive technical audit and architectural consultation led by a Senior Solutions Architect. We evaluate your functional requirements, data models, scalability targets, and timeline constraints before issuing a formal Statement of Work (SOW) with clear deliverables, milestones, and sprint schedules.',
    highlights: [
      'Dedicated Senior CTO/Architect assignment within 24 hours',
      'Mutual Non-Disclosure Agreement (NDA) executed before code review',
      'Detailed visual wireframes, user flow diagrams, and schema specifications'
    ],
    tip: 'Pro Tip: You can request an initial zero-obligation 30-minute CTO audit call through our Contact page.'
  },
  {
    id: 'faq-2',
    category: 'general',
    categoryLabel: 'General & Process',
    question: 'How fast can MetaWave assemble and deploy a dedicated engineering team?',
    answer: 'Thanks to our pre-vetted onshore and offshore engineering pools across Pakistan, the UK, and UAE, we can mobilize a fully staffed, dedicated engineering team (including full-stack developers, QA leads, and DevOps specialists) within 48 to 72 hours of contract execution.',
    highlights: [
      '48-72 hour rapid team assembly guarantee',
      'Pre-configured developer sandboxes and staging servers',
      'Scalable staffing flexibility—scale up or down with 14-day notice'
    ]
  },

  // Engineering & Tech Stack
  {
    id: 'faq-3',
    category: 'engineering',
    categoryLabel: 'Engineering & Tech Stack',
    question: 'What programming languages, frameworks, and cloud technologies do you specialize in?',
    answer: 'We build enterprise-grade applications using modern, type-safe production stacks. On the frontend, we use React 19, Next.js, Vite, TypeScript, and Tailwind CSS. On the backend, we leverage Node.js (Express, NestJS), Python (FastAPI, Django), Laravel, and PostgreSQL / Cloud SQL. For cloud infrastructure, we specialize in AWS, Google Cloud Platform (GCP), Azure, Docker, and Kubernetes.',
    highlights: [
      'Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion',
      'Backend & DB: Node.js, Express, Python, PostgreSQL, Firestore, Redis',
      'Cloud & DevOps: AWS, GCP, Cloud Run, Docker, Kubernetes, Terraform'
    ],
    tip: 'Visit our dedicated Technology Stack page to inspect our full production technology ecosystem matrix.'
  },
  {
    id: 'faq-4',
    category: 'engineering',
    categoryLabel: 'Engineering & Tech Stack',
    question: 'Do you build native or cross-platform mobile applications?',
    answer: 'We specialize in high-performance cross-platform mobile engineering using Flutter and React Native, which allow 60 FPS native performance, shared business logic across iOS and Android, and up to 40% reduction in time-to-market. When hardware-level or specialized native capabilities are required, we also build fully native iOS (Swift) and Android (Kotlin) applications.',
    highlights: [
      'Single codebase for iOS & Android with Flutter or React Native',
      '60 FPS smooth transitions and offline-first local synchronization',
      'Full App Store and Google Play Store submission and compliance management'
    ]
  },

  // Pricing, IP & Contracts
  {
    id: 'faq-5',
    category: 'pricing',
    categoryLabel: 'Pricing, IP & Contracts',
    question: 'Who owns the intellectual property (IP) and source code created during a project?',
    answer: 'You do—100%. Upon settlement of contractual milestones, all source code, design assets, database schemas, documentation, and intellectual property rights belong entirely to your organization. We transfer repository ownership directly to your GitHub/GitLab account with no proprietary lock-in.',
    highlights: [
      '100% Client IP ownership assigned in formal written agreements',
      'Full Git repository ownership and credentials transfer upon launch',
      'Zero ongoing licensing royalties or proprietary vendor lock-in'
    ],
    tip: 'SLA Guarantee: All IP protection terms are legally backed by SECP corporate governance regulations.'
  },
  {
    id: 'faq-6',
    category: 'pricing',
    categoryLabel: 'Pricing, IP & Contracts',
    question: 'What engagement and pricing models does MetaWave offer?',
    answer: 'We offer three flexible contract structures tailored to project maturity: 1) Fixed-Price Contracts (ideal for well-defined scopes and MVP builds), 2) Time & Materials / Hourly Sprints (best for evolving products requiring dynamic prioritization), and 3) Dedicated Engineering Teams (monthly retainer for long-term platform development with full developer dedication).',
    highlights: [
      'Fixed-Price: Guaranteed scope, budget predictability, and milestones',
      'Time & Materials: Flexible weekly/bi-weekly sprint iterations',
      'Dedicated Team: Full-time developers starting at competitive monthly retainers'
    ]
  },

  // Security & SLAs
  {
    id: 'faq-7',
    category: 'security',
    categoryLabel: 'Security, SLA & Compliance',
    question: 'How does MetaWave ensure software security and regulatory compliance?',
    answer: 'We enforce SecOps practices across the software lifecycle. Our applications adhere to OWASP Top 10 security guidelines, featuring AES-256 data encryption at rest, TLS 1.3 in transit, automated vulnerability dependency scanning, and zero-trust authentication. We build fully compliant software for HIPAA (healthcare), PCI-DSS (fintech), GDPR (data privacy), and SOC 2 Type II controls.',
    highlights: [
      'ISO 27001 & SOC 2 aligned engineering processes',
      'HIPAA & GDPR compliant data storage and sanitization',
      'AES-256 encryption, OAuth2 / SAML authentication, and automated audit logs'
    ]
  },
  {
    id: 'faq-8',
    category: 'security',
    categoryLabel: 'Security, SLA & Compliance',
    question: 'What Service Level Agreements (SLAs) and post-launch support do you provide?',
    answer: 'Every contract includes 30 days of complimentary post-launch warranty covering bug fixes and system stabilization. For ongoing peace of mind, we offer tiered Managed SLA Maintenance plans guaranteeing up to 99.99% system uptime, 24/7 incident response with under 15-minute emergency resolution SLAs, continuous security patching, and server load monitoring.',
    highlights: [
      '30-day complimentary post-launch stability warranty',
      '24/7/365 active server telemetry and incident response SLAs',
      'Guaranteed 15-minute response times for critical severity outages'
    ]
  },

  // AI & Custom Solutions
  {
    id: 'faq-9',
    category: 'ai',
    categoryLabel: 'AI & Custom Solutions',
    question: 'How can MetaWave integrate custom AI and LLMs into our software?',
    answer: 'We build custom AI engines leveraging state-of-the-art models including Google Gemini 1.5/2.0, OpenAI GPT-4o, and open-source Llama models. We construct Retrieval-Augmented Generation (RAG) architectures with vector databases (Pinecone, PGVector) to allow AI agents to securely query your internal corporate documents, customer tickets, and database records without hallucinating.',
    highlights: [
      'Custom RAG systems connected securely to internal corporate knowledgebases',
      'Gemini LLM semantic search, document extraction, and predictive loops',
      'Token optimization strategies cutting AI API costs by up to 40%'
    ]
  },
  {
    id: 'faq-10',
    category: 'ai',
    categoryLabel: 'AI & Custom Solutions',
    question: 'What pre-engineered software products are available in the MetaWave Store?',
    answer: 'Our Solutions Store offers customizable, enterprise-grade software products including MetaCRM (sales pipelines), MetaERP (resource & ledger matrix), MetaProperty (real estate management), MetaCare (clinical telemetry), MetaHR (talent management), and MetaLearn (interactive LMS). These platforms can be deployed instantly or customized to your specific workflow.',
    highlights: [
      'Ready-to-deploy platforms customizable in under 7 business days',
      'Significantly lower initial investment compared to ground-up builds',
      'Full access to clean source code and dedicated customization support'
    ],
    tip: 'Explore our Solutions Store (Shop) from the main menu to view live product previews.'
  }
];

export function Faqs({ onNavigate }: FaqsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'yes' | 'no'>>({});

  // Question Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('General');
  const [inquiryQuestion, setInquiryQuestion] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.highlights && faq.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (catId: string) => {
    playSound('toggle');
    setActiveCategory(catId);
  };

  const handleToggleAccordion = (id: string) => {
    playSound('click');
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('toggle');
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, val: 'yes' | 'no', e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('toggle');
    setFeedback(prev => ({ ...prev, [id]: val }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryQuestion.trim()) return;

    playSound('form_input');
    setIsSubmittingInquiry(true);

    setTimeout(() => {
      setIsSubmittingInquiry(false);
      setInquirySuccess(true);
      playSound('click');
      setInquiryName('');
      setInquiryEmail('');
      setInquiryQuestion('');
      setTimeout(() => setInquirySuccess(false), 6000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      {/* Light subtle background glow ambiance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#326E45]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Sparkles size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
          >
            Everything You Need to Know About <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">MetaWave Innovations</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal"
          >
            Detailed technical answers regarding our enterprise software development cycles, AI integrations, IP ownership guarantees, transparent pricing, security protocols, and 24/7 SLAs.
          </motion.p>
        </div>

        {/* Live Search Bar & Filter Controls */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g., 'IP ownership', 'React', 'pricing', 'HIPAA', 'SLA', 'Gemini')..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200/90 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#326E45] focus:ring-3 focus:ring-[#326E45]/10 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#326E45] text-white shadow-sm border border-[#326E45]'
                      : 'bg-white hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-slate-200/90'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#245032] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.id === 'all' ? FAQ_DATA.length : FAQ_DATA.filter(f => f.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* Results Counter / Search state indicator */}
        <div className="max-w-4xl mx-auto mb-5 flex items-center justify-between text-xs text-slate-500 font-mono px-1">
          <div>
            SHOWING <span className="text-[#326E45] font-bold">{filteredFaqs.length}</span> RESULTS
            {searchQuery && <span> FOR "<span className="text-slate-900">{searchQuery}</span>"</span>}
          </div>
          {filteredFaqs.length < FAQ_DATA.length && (
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-[#326E45] hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* FAQs Accordion Container */}
        <div className="max-w-4xl mx-auto space-y-3.5 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs">
              <HelpCircle size={44} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">No answers match your search criteria</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
                Try searching with different keywords or submit your specific question directly to our technical team below.
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;
              const isCopied = copiedId === faq.id;
              const userFeedback = feedback[faq.id];

              return (
                <motion.div
                  key={faq.id}
                  id={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-[#326E45]/40 shadow-md ring-1 ring-[#326E45]/10' 
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => handleToggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold transition-colors ${
                        isExpanded 
                          ? 'bg-[#326E45] text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover:text-[#326E45] group-hover:bg-[#326E45]/10'
                      }`}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#326E45]/8 border border-[#326E45]/15 text-[#326E45] uppercase tracking-wider font-bold">
                            {faq.categoryLabel}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-display font-bold transition-colors leading-snug ${
                          isExpanded ? 'text-[#245032]' : 'text-slate-900 group-hover:text-[#326E45]'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'bg-[#326E45]/10 text-[#326E45] rotate-180' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/60"
                      >
                        <div className="p-5 sm:p-6 sm:pl-18 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                          <p className="text-slate-700">{faq.answer}</p>

                          {/* Highlights List */}
                          {faq.highlights && (
                            <div className="space-y-2 pt-2 border-t border-slate-200/60">
                              <span className="text-[11px] font-mono font-bold text-[#326E45] uppercase tracking-wider block">
                                Key Takeaways & Commitments:
                              </span>
                              <ul className="space-y-1.5">
                                {faq.highlights.map((item, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                    <CheckCircle2 size={16} className="text-[#326E45] shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Pro Tip Box */}
                          {faq.tip && (
                            <div className="bg-[#326E45]/6 border border-[#326E45]/20 rounded-xl p-3.5 text-xs text-[#245032] flex items-start gap-2.5">
                              <Sparkles size={16} className="text-[#326E45] shrink-0 mt-0.5" />
                              <div className="font-medium">{faq.tip}</div>
                            </div>
                          )}

                          {/* Footer Actions: Copy Link & Helpful Feedback */}
                          <div className="pt-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                            <button
                              onClick={(e) => handleCopyLink(faq.id, e)}
                              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#326E45] transition-colors font-mono cursor-pointer"
                            >
                              {isCopied ? <Check size={14} className="text-[#326E45]" /> : <Copy size={14} />}
                              <span>{isCopied ? 'Direct URL Copied!' : 'Copy Direct Link'}</span>
                            </button>

                            <div className="flex items-center gap-2.5">
                              <span className="text-slate-500 text-xs">Was this answer helpful?</span>
                              <button
                                onClick={(e) => handleFeedback(faq.id, 'yes', e)}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                  userFeedback === 'yes'
                                    ? 'bg-[#326E45]/15 border-[#326E45] text-[#245032] font-bold'
                                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                                }`}
                                title="Yes, helpful"
                              >
                                <ThumbsUp size={13} />
                                <span className="text-[10px]">Yes</span>
                              </button>
                              <button
                                onClick={(e) => handleFeedback(faq.id, 'no', e)}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                  userFeedback === 'no'
                                    ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                                }`}
                                title="No, not helpful"
                              >
                                <ThumbsDown size={13} />
                                <span className="text-[10px]">No</span>
                              </button>
                              {userFeedback && (
                                <span className="text-[11px] text-[#326E45] font-mono font-bold animate-fade-in">
                                  Thanks for your feedback!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Interactive "Didn't Find Your Answer?" Inquiry Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold">
                <MessageSquare size={13} />
                <span>DIRECT TECH SUPPORT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-tight">
                Have a Specific Technical Question?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Submit your query directly to our Senior Solutions Architects. We guarantee an itemized technical evaluation response within 4 business hours.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#326E45] shrink-0 shadow-3xs">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-slate-500">Direct Engineering Email</div>
                    <div className="text-slate-900 font-mono font-semibold">contact@metawaveinnovations.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#326E45] shrink-0 shadow-3xs">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <div className="text-slate-500">Schedule CTO Consultation</div>
                    <button 
                      onClick={() => onNavigate && onNavigate('contact')}
                      className="text-[#326E45] hover:underline font-bold cursor-pointer"
                    >
                      Book 30-min Technical Discovery Audit →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative">
              {inquirySuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#326E45]/15 text-[#326E45] flex items-center justify-center mx-auto border border-[#326E45]/30">
                    <Check size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Technical Inquiry Received!</h4>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you. Our Senior Architect has received your question and will respond with an architectural review to your email shortly.
                  </p>
                  <button
                    onClick={() => setInquirySuccess(false)}
                    className="text-xs text-[#326E45] hover:underline font-mono font-bold cursor-pointer pt-2 inline-block"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-[#326E45] focus:ring-2 focus:ring-[#326E45]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-[#326E45] focus:ring-2 focus:ring-[#326E45]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">INQUIRY CATEGORY</label>
                    <select
                      value={inquiryCategory}
                      onChange={(e) => setInquiryCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-[#326E45] focus:ring-2 focus:ring-[#326E45]/10 cursor-pointer"
                    >
                      <option value="General">General & Project Discovery</option>
                      <option value="Engineering">Custom Web / Mobile Architecture</option>
                      <option value="AI">Gemini AI & Machine Learning</option>
                      <option value="Pricing">Pricing, Retainers & Contracts</option>
                      <option value="Security">Security, HIPAA & SLAs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">YOUR QUESTION OR TECHNICAL REQUIREMENT *</label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryQuestion}
                      onChange={(e) => setInquiryQuestion(e.target.value)}
                      placeholder="Describe your question, required tech stack, or project scope..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-[#326E45] focus:ring-2 focus:ring-[#326E45]/10 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20 disabled:opacity-50"
                  >
                    {isSubmittingInquiry ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Sending Query to Tech Leads...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Technical Query</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

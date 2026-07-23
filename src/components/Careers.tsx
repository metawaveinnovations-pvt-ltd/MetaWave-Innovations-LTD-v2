import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Laptop, 
  Heart, 
  Search, 
  X, 
  Check, 
  CheckCircle, 
  Send, 
  AlertTriangle,
  Globe,
  Award,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Code2,
  BrainCircuit,
  Layers,
  Clock,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  category: 'engineering' | 'ai' | 'frontend' | 'security' | 'design';
  location: string;
  type: string;
  salary: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
}

interface CareersProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Openings' },
  { id: 'engineering', label: 'Cloud & Infrastructure' },
  { id: 'ai', label: 'AI & Data Science' },
  { id: 'frontend', label: 'Frontend & Apps' },
  { id: 'security', label: 'Security & DevOps' },
  { id: 'design', label: 'Product & Design' }
];

const PERKS = [
  {
    icon: Laptop,
    title: '100% Remote-First & Flexible Hours',
    desc: 'Work asynchronously from anywhere in the world. We provide $1,500 home office budgets, M3 Max MacBook Pros, and ergonomic workstation setups.'
  },
  {
    icon: GraduationCap,
    title: '$1,800 Annual L&D Budget',
    desc: 'Dedicated annual stipend for cloud certifications (AWS/GCP), system design courses, technical conference passes, and research papers.'
  },
  {
    icon: Users,
    title: 'Elite Engineering Peers',
    desc: 'Collaborate with seasoned architects, machine learning scholars, and veteran systems engineers who value clean code, peer reviews, and mentorship.'
  },
  {
    icon: Heart,
    title: 'Comprehensive Health & Wellness',
    desc: 'Top-tier medical, dental, and vision insurance for you and dependents, plus 30 days of paid annual leave and matching regional bank holidays.'
  },
  {
    icon: Award,
    title: 'Performance Bonuses & Equity',
    desc: 'Competitive global salaries aligned with tier-1 markets, annual profit-sharing bonuses, and equity options for core contributors.'
  },
  {
    icon: ShieldCheck,
    title: 'Zero Bureaucracy Culture',
    desc: 'Flat organization structure focused purely on engineering craft, architectural autonomy, and shipping high-performance software.'
  }
];

const CULTURE_VALUES = [
  {
    num: '01',
    title: 'Uncompromising Engineering Quality',
    desc: 'We write tested, type-safe, sub-100ms responsive code. We take pride in building software that scales effortlessly under extreme traffic loads.'
  },
  {
    num: '02',
    title: 'Async Communication First',
    desc: 'We respect deep focus time. We minimize unnecessary meetings in favor of thorough technical specifications, pull request discussions, and clear documentation.'
  },
  {
    num: '03',
    title: 'Continuous Innovation & R&D',
    desc: 'We dedicate 10% of engineering bandwidth to research, prototyping next-gen AI capabilities, benchmark testing, and open-source contributions.'
  },
  {
    num: '04',
    title: 'Psychological Safety & Growth',
    desc: 'We foster a blameless culture where mistakes are treated as systemic learning opportunities. Everyone is encouraged to ask questions and share ideas.'
  }
];

const HIRING_STEPS = [
  {
    step: '01',
    title: 'Application & Portfolio Review',
    desc: 'Submit your resume, GitHub, or system architecture portfolio. Our engineering directors review every application within 48 hours.'
  },
  {
    step: '02',
    title: 'Technical Discovery Call',
    desc: 'A 30-minute conversational video chat with an engineering lead to discuss your background, interests, and technical philosophy.'
  },
  {
    step: '03',
    title: 'Practical System Design / Code Pair',
    desc: 'A 60-minute practical session solving real-world architectural challenges. No trick algorithm riddles or inverted binary tree whiteboarding.'
  },
  {
    step: '04',
    title: 'Team Architecture Discussion',
    desc: 'Meet future teammates, learn about ongoing initiatives, and evaluate mutual culture fit in a relaxed 45-minute discussion.'
  },
  {
    step: '05',
    title: 'Formal Offer & Smooth Onboarding',
    desc: 'Receive a competitive offer package, pre-configured hardware delivered to your doorstep, and a structured 30-day onboarding mentor.'
  }
];

const JOBS: JobOpening[] = [
  {
    id: 'j1',
    title: 'Principal Cloud Systems Architect',
    department: 'Infrastructure & Cloud Platform Group',
    category: 'engineering',
    location: 'London, UK / Global Remote',
    type: 'Full-time',
    salary: '£90,000 - £120,000 / yr',
    experience: '7+ Years',
    skills: ['AWS / GCP', 'Kubernetes', 'TypeScript / Go', 'Terraform', 'PostgreSQL'],
    responsibilities: [
      'Design high-availability, sub-50ms multi-region cloud backend architectures compliant with ISO 27001 and SOC2 standards',
      'Lead enterprise client technical roadmap discussions and partner on cloud migration and modernization strategies',
      'Define automated CI/CD pipelines, zero-downtime deployment patterns, and infrastructure cost optimization models'
    ],
    requirements: [
      'Proven track record designing multi-tenant microservices or distributed event-driven systems at scale',
      'Deep mastery of Kubernetes, Docker container orchestration, and Infrastructure-as-Code (Terraform/Pulumi)',
      'Strong expertise in relational database tuning (PostgreSQL), caching (Redis), and message queues (Kafka/RabbitMQ)'
    ]
  },
  {
    id: 'j2',
    title: 'Lead Machine Learning Scientist',
    department: 'AI & Cognitive Computing R&D',
    category: 'ai',
    location: 'Global Remote (UK/US Hours)',
    type: 'Full-time',
    salary: '£80,000 - £105,000 / yr',
    experience: '5+ Years',
    skills: ['Python', 'PyTorch', 'Gemini API', 'LangChain', 'Vector DBs', 'FastAPI'],
    responsibilities: [
      'Architect fine-tuned LLM pipelines, Retrieval-Augmented Generation (RAG) models, and multimodal vector databases',
      'Develop custom ML inference endpoints optimized for low latency and high throughput across enterprise applications',
      'Conduct empirical benchmark audits for model drift, token efficiency, hallucination bounds, and data privacy guardrails'
    ],
    requirements: [
      'M.Sc or Ph.D. in Computer Science, Machine Learning, or equivalent practical industry research experience',
      'Hands-on expertise deploying production LLM solutions with LangChain, LlamaIndex, Pinecone, or Qdrant',
      'Proficiency with Python ML ecosystems (PyTorch, HuggingFace Transformers, NumPy, pandas, vLLM)'
    ]
  },
  {
    id: 'j3',
    title: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'User Experience & Web Applications',
    category: 'frontend',
    location: 'Global Remote',
    type: 'Full-time',
    salary: '£60,000 - £80,000 / yr',
    experience: '4+ Years',
    skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion', 'Next.js'],
    responsibilities: [
      'Build pixel-perfect, highly responsive React web applications with sub-100ms interaction latency and 100/100 Lighthouse scores',
      'Craft fluid layout animations, dynamic data visualizers, and reusable UI design systems using Tailwind CSS and Motion',
      'Ensure strict WCAG 2.1 AA accessibility standards, cross-browser compatibility, and bundle size performance tuning'
    ],
    requirements: [
      'Expert-level mastery of modern TypeScript, React functional hooks, state management, and performance optimization',
      'Strong command of CSS/Tailwind layout math, responsive grid mechanics, and micro-interaction animation principles',
      'Experience with Vite, Next.js, frontend testing frameworks, and REST/GraphQL API integration'
    ]
  },
  {
    id: 'j4',
    title: 'Cybersecurity & Compliance Lead',
    department: 'Information Security & Governance',
    category: 'security',
    location: 'London / Connected Remote',
    type: 'Full-time',
    salary: '£75,000 - £95,000 / yr',
    experience: '5+ Years',
    skills: ['SOC2 Type II', 'HIPAA / GDPR', 'HashiCorp Vault', 'Penetration Testing', 'SIEM'],
    responsibilities: [
      'Direct continuous automated security audits, vulnerability management, and SOC2 / ISO 27001 compliance certifications',
      'Perform zero-trust access audits, hardware secret vault rotations, and identity access management (IAM) hardening',
      'Conduct periodic penetration testing, OWASP vulnerability assessments, and incident response drill exercises'
    ],
    requirements: [
      'Certified Information Systems Security Professional (CISSP) or Certified Information Security Manager (CISM) credential preferred',
      'In-depth knowledge of cloud security standards across AWS, Azure, or GCP environments',
      'Experience guiding enterprise B2B SaaS organizations through external SOC2 Type II and HIPAA compliance audits'
    ]
  },
  {
    id: 'j5',
    title: 'Full-Stack Software Engineer (Node/Python/React)',
    department: 'Core Product Engineering',
    category: 'engineering',
    location: 'Global Remote',
    type: 'Full-time',
    salary: '£55,000 - £75,000 / yr',
    experience: '3+ Years',
    skills: ['TypeScript', 'Node.js', 'Python', 'React', 'PostgreSQL', 'GraphQL'],
    responsibilities: [
      'Develop end-to-end features across Node.js/Python backend services and modern React single-page frontend interfaces',
      'Implement robust REST/GraphQL APIs with strict JSON schema validation, authentication middleware, and rate limiting',
      'Write comprehensive unit, integration, and end-to-end tests to maintain >85% code coverage across repositories'
    ],
    requirements: [
      'Strong proficiency with TypeScript across both server-side (Node.js/Express) and client-side (React) codebases',
      'Solid foundation in SQL query design, database indexing, ORM usage (Prisma, Drizzle), and RESTful architecture',
      'Passionate about writing clean, maintainable code with clear documentation and peer review rigor'
    ]
  },
  {
    id: 'j6',
    title: 'Lead UI/UX Product Designer',
    department: 'Design Studio & Brand Experience',
    category: 'design',
    location: 'Global Remote',
    type: 'Full-time',
    salary: '£55,000 - £75,000 / yr',
    experience: '4+ Years',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'UI/UX'],
    responsibilities: [
      'Lead design strategy for complex enterprise web applications, administrative dashboards, and mobile user journeys',
      'Maintain and expand MetaWave unified multi-theme Figma design system with tokens, variables, and auto-layout components',
      'Conduct qualitative user research, usability testing, and wireframe iterations to optimize user conversion and task velocity'
    ],
    requirements: [
      'Exceptional portfolio showcasing end-to-end product design, wireframes, high-fidelity prototypes, and design systems',
      'Deep understanding of grid systems, mathematical typographic scaling, micro-interactions, and visual ergonomics',
      'Familiarity with modern web technology constraints (CSS Flexbox/Grid, Tailwind utility mapping) to collaborate seamlessly with developers'
    ]
  }
];

export function Careers({ onNavigate, isStandalonePage = true }: CareersProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);
  const [jobApplied, setJobApplied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: '',
    motivation: ''
  });
  const [applyError, setApplyError] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleApplyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplyForm(prev => ({ ...prev, [name]: value }));
    if (applyError) setApplyError(null);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      setApplyError('Please fill in your Full Name and Work Email address.');
      return;
    }
    setJobApplied(true);
    setApplyError(null);
    playSound('success');
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
          <span className="text-[#326E45] font-bold">Careers & Engineering Culture</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Briefcase size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              JOIN OUR GLOBAL ENGINEERING INSTITUTION
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Build High-Impact Systems at <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">MetaWave Innovations</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We are a remote-first international software engineering team crafting mission-critical platforms, AI models, and cloud architectures. Join engineers who care deeply about craft, performance, and autonomy.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#openings"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('openings');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#326E45]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Active Openings</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => onNavigate && onNavigate('about')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Users size={16} className="text-[#326E45]" />
              <span>Learn About Our Stewardship</span>
            </button>
          </motion.div>
        </div>

        {/* Key Metrics / Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Laptop size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% Remote-First</div>
              <div className="text-slate-500 text-[11px]">Async Working Hours</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <GraduationCap size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">$1,800 L&D Budget</div>
              <div className="text-slate-500 text-[11px]">Annual Learning Allowance</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Heart size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">30 Days Paid Leave</div>
              <div className="text-slate-500 text-[11px]">+ Regional Holidays</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Award size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Tier-1 Market Rates</div>
              <div className="text-slate-500 text-[11px]">Competitive Salary & Equity</div>
            </div>
          </div>
        </div>

        {/* Section 1: Perks & Employee Benefits */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Sparkles size={12} />
              <span>EMPLOYEE BENEFITS & ENVIRONMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Designed for High Performance & Well-being
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              We provide the tools, autonomy, and environment required for world-class engineering execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/90 hover:border-[#326E45]/40 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md group"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#326E45] group-hover:bg-[#326E45] group-hover:text-white transition-colors shrink-0 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-display font-bold text-slate-900 mb-2 group-hover:text-[#326E45] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Culture & Core Values */}
        <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#326E45]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-2 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50 w-fit mx-auto">
              OUR ENGINEERING ETHOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              The MetaWave Engineering Culture
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Four principles that define how we build systems, communicate, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CULTURE_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-2 backdrop-blur-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#326E45] bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                    PILLAR {val.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white pt-1">{val.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Active Job Openings Board */}
        <div id="openings" className="max-w-5xl mx-auto mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Briefcase size={12} />
              <span>CAREER OPPORTUNITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Active Strategic Openings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select a position to view detailed responsibilities, technical stack requirements, and submit your application profile.
            </p>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { playSound('toggle'); setActiveCategory(cat.id); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#326E45] text-white shadow-xs border border-[#326E45]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search stack, title, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45] transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Job Cards List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div 
                key={job.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200/90 hover:border-[#326E45]/40 hover:shadow-md transition-all rounded-2xl p-6 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 uppercase">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-mono font-bold text-slate-500">{job.location}</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{job.type}</span>
                  </div>

                  <h3 className="text-lg font-display font-extrabold text-slate-900 group-hover:text-[#326E45] transition-colors">
                    {job.title}
                  </h3>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span key={skill} className="text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-start md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-mono font-extrabold text-[#326E45] block">{job.salary}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Experience: {job.experience}</span>
                  </div>
                  
                  <button
                    onClick={() => { playSound('click'); setActiveJob(job); setJobApplied(false); }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-[#326E45] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-xs hover:shadow-md"
                  >
                    <span>View & Apply</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
                <Search size={28} className="text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No matching positions found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your search criteria or category filter. You can also send us a speculative application below.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: 5-Step Transparent Hiring Lifecycle */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              TRANSPARENT RECRUITMENT
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Hiring Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              We respect your time. Our hiring process is streamlined, respectful, and focused on real-world engineering capability.
            </p>
          </div>

          <div className="space-y-4">
            {HIRING_STEPS.map((s, idx) => (
              <div 
                key={idx}
                className="p-5 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/80 rounded-2xl flex items-start gap-4 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#326E45]/10 text-[#326E45] flex items-center justify-center font-mono font-extrabold text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Speculative Application Banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-50 via-white to-slate-50 border border-emerald-200/80 rounded-3xl p-8 sm:p-10 shadow-sm mb-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#326E45] uppercase">
              <FileText size={14} />
              <span>OPEN SPECULATIVE APPLICATIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Don't see an exact opening for your stack?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              We are always eager to meet exceptional software engineers, cloud architects, and AI researchers. Send us your CV or GitHub profile directly.
            </p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setActiveJob({
                id: 'speculative',
                title: 'Open Speculative Engineering Application',
                department: 'Talent Network / General Pool',
                category: 'engineering',
                location: 'Global Remote',
                type: 'Full-time / Advisory',
                salary: 'Competitive Market Rate',
                experience: 'All Levels Welcome',
                skills: ['Systems Architecture', 'AI / ML', 'Full-Stack', 'DevOps', 'Mobile'],
                responsibilities: [
                  'Build next-generation software platforms alongside MetaWave principal leads',
                  'Participate in high-impact client systems development and R&D projects'
                ],
                requirements: [
                  'Passion for software craft, system architecture, and modern engineering standards'
                ]
              });
              setJobApplied(false);
            }}
            className="px-6 py-3.5 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#326E45]/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Submit Open Application</span>
            <Send size={14} />
          </button>
        </div>

      </div>

      {/* DETAILED JOB POPUP MODAL & APPLICATION FORM */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 flex flex-col gap-6 text-left"
            >
              
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-4 right-4 w-9 h-9 border border-slate-200 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-all active:scale-90"
                aria-label="Close jobs modal"
              >
                <X size={15} />
              </button>

              <div className="space-y-4">
                
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 uppercase inline-block">
                    {activeJob.department}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 leading-tight">
                    {activeJob.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 font-mono text-[11px] text-slate-500 font-bold pt-1">
                    <span>📍 {activeJob.location}</span>
                    <span>•</span>
                    <span>💼 {activeJob.type}</span>
                    <span>•</span>
                    <span>💰 {activeJob.salary}</span>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase block">
                    KEY STRATEGIC RESPONSIBILITIES:
                  </span>
                  <ul className="space-y-2">
                    {activeJob.responsibilities.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                        <span className="p-0.5 rounded-full bg-emerald-50 text-[#326E45] mt-0.5 shrink-0">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Requirements */}
                {activeJob.requirements && activeJob.requirements.length > 0 && (
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase block">
                      CANDIDATE REQUIREMENTS:
                    </span>
                    <ul className="space-y-2">
                      {activeJob.requirements.map((req, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                          <span className="p-0.5 rounded-full bg-slate-100 text-slate-600 mt-0.5 shrink-0">
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Application Form */}
                <div className="border-t border-slate-200 pt-4 space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    SUBMIT APPLICATION PROFILE:
                  </span>

                  {!jobApplied ? (
                    <form onSubmit={handleApplySubmit} className="space-y-3">
                      
                      {applyError && (
                        <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold">
                          <AlertTriangle size={14} />
                          <span>{applyError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="name"
                          required
                          value={applyForm.name}
                          onChange={handleApplyInputChange}
                          placeholder="Full Name *"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                        />

                        <input
                          type="email"
                          name="email"
                          required
                          value={applyForm.email}
                          onChange={handleApplyInputChange}
                          placeholder="Work or Personal Email *"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="url"
                          name="linkedin"
                          value={applyForm.linkedin}
                          onChange={handleApplyInputChange}
                          placeholder="LinkedIn Profile URL"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                        />

                        <input
                          type="url"
                          name="github"
                          value={applyForm.github}
                          onChange={handleApplyInputChange}
                          placeholder="GitHub / GitLab URL"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                        />
                      </div>

                      <input
                        type="url"
                        name="portfolio"
                        value={applyForm.portfolio}
                        onChange={handleApplyInputChange}
                        placeholder="Personal Website or Portfolio Link"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45]"
                      />

                      <textarea
                        name="motivation"
                        value={applyForm.motivation}
                        onChange={handleApplyInputChange}
                        placeholder="Brief summary of systems you built, architecture experience, or technical accomplishments..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#326E45] resize-none"
                      />

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-[#326E45]/20"
                      >
                        <span>Submit Application</span>
                        <Send size={14} />
                      </button>

                    </form>
                  ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle size={24} />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Application Successfully Transmitted</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Thank you, <span className="font-bold text-slate-900">{applyForm.name}</span>! Your application for <span className="font-bold text-slate-900">{activeJob.title}</span> has been logged into our recruitment system. Our engineering leads will review your profile and reach out within 48 hours.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

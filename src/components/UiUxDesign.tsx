import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layout, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Lock, 
  Gauge, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Eye, 
  Layers, 
  Figma, 
  Smartphone, 
  Monitor, 
  Zap, 
  Activity, 
  Target, 
  PenTool, 
  Search, 
  ShieldCheck, 
  Component, 
  Workflow, 
  Smile, 
  Flame
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface UiUxDesignProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const UIUX_SOLUTIONS = [
  {
    id: 'product-strategy',
    title: 'Product Strategy & User Research',
    subtitle: 'DATA-DRIVEN UX DISCOVERY',
    icon: Search,
    desc: 'Deep user interviews, competitor benchmarking, journey mapping, and persona creation to ensure your product solves high-value user pain points with friction-free workflows.',
    highlights: [
      'Qualitative user interviews & quantitative survey insights',
      'End-to-end user journey mapping & information architecture',
      'Information architecture (IA) & navigation hierarchy optimization',
      'Value proposition validation & feature prioritization matrices'
    ],
    tools: ['Figma', 'Miro', 'Hotjar', 'Mixpanel', 'Notion']
  },
  {
    id: 'design-systems',
    title: 'Enterprise Figma Design Systems',
    subtitle: 'TOKENIZED & SCALABLE',
    icon: Component,
    desc: 'Comprehensive design systems with standardized color tokens, typography scales, dark/light modes, and reusable Figma auto-layout components mapped directly to React / Tailwind code.',
    highlights: [
      'Design Token architecture (Color, Spacing, Elevation, Motion)',
      '100+ accessible Figma UI components with variant properties',
      'Sync with Tailwind CSS, Radix, and Shadcn component libraries',
      'Multi-brand & multi-theme token support for global enterprises'
    ],
    tools: ['Figma Tokens', 'Tokens Studio', 'Storybook', 'Tailwind']
  },
  {
    id: 'interactive-prototyping',
    title: 'Interactive Prototyping & Motion',
    subtitle: 'HIGH-FIDELITY UX PREVIEWS',
    icon: Workflow,
    desc: 'Clickable, high-fidelity prototypes with realistic micro-interactions, spring animations, and state transitions that look and feel like a live production web or mobile app.',
    highlights: [
      'Advanced Figma component logic & variant states',
      'Motion animations with Framer & Lottie web assets',
      'Usability testing-ready interactive flows for stakeholders',
      'Sub-10ms transition responses mimicking production code'
    ],
    tools: ['Figma', 'Protopie', 'Framer', 'Lottie', 'After Effects']
  },
  {
    id: 'accessibility-wcag',
    title: 'Accessibility & WCAG 2.1 Compliance',
    subtitle: 'INCLUSIVE DESIGN STANDARDS',
    icon: ShieldCheck,
    desc: 'Inclusive product design engineered to meet strict WCAG 2.1 AA/AAA accessibility benchmarks, ensuring contrast compliance, screen-reader compatibility, and keyboard navigation.',
    highlights: [
      'Color contrast ratio audits (4.5:1 for text, 3:1 for UI bounds)',
      'Screen reader (NVDA, VoiceOver) semantic landmark structure',
      'Focus indicator styling & keyboard navigation flows',
      'VPAT (Voluntary Product Accessibility Template) certification'
    ],
    tools: ['Stark', 'Axe DevTools', 'Wave', 'Figma Accessibility']
  },
  {
    id: 'usability-testing',
    title: 'Usability Testing & Conversion Optimization',
    subtitle: 'EMPIRICAL USER FEEDBACK',
    icon: Target,
    desc: 'Rigorous task-based user testing and A/B design experimentations that uncover UX friction points, boost task completion rates, and maximize funnel conversion metrics.',
    highlights: [
      'Unmoderated & moderated task-completion usability sessions',
      'Heatmap & click-tracking session analysis via Hotjar/Clarity',
      'Frictionless checkout & onboarding funnel redesigns',
      'Up to 3x increase in key user conversion metrics'
    ],
    tools: ['Maze', 'UserTesting', 'Hotjar', 'Google Optimize']
  },
  {
    id: 'ux-engineering',
    title: 'UX Engineering & Handoff',
    subtitle: 'PIXEL-PERFECT CODE ALIGNMENT',
    icon: PenTool,
    desc: 'Bridge the gap between design and frontend engineering. We deliver clean, inspection-ready specs, Tailwind CSS classes, and React component props for zero-friction developer handoffs.',
    highlights: [
      'Pixel-perfect Figma-to-React/Tailwind specs',
      'Design token sync scripts generating CSS/TypeScript constants',
      'Comprehensive animation guidelines & easing specs',
      'Zero design debt during frontend implementation'
    ],
    tools: ['Figma Dev Mode', 'Storybook', 'Zeplin', 'GitHub']
  }
];

const UIUX_STACK_TABS = [
  {
    id: 'design',
    label: 'Design & Systems',
    items: [
      { name: 'Figma Enterprise', spec: 'Design tokens, auto-layout 5.0, variables & component variants', benchmark: '100% Tokenized' },
      { name: 'Tokens Studio', spec: 'Multi-theme token sync with GitHub and Tailwind CSS config', benchmark: 'Automated Sync' },
      { name: 'Adobe Creative Suite', spec: 'Vector asset creation, custom illustration & photo editing', benchmark: 'Vector Precise' }
    ]
  },
  {
    id: 'prototyping',
    label: 'Prototyping & Motion',
    items: [
      { name: 'Framer / ProtoPie', spec: 'High-fidelity logic, conditional flows, and micro-interactions', benchmark: 'Native Feel' },
      { name: 'Lottie / After Effects', spec: 'Lightweight vector animations for WebGL & React', benchmark: '< 20KB animation' },
      { name: 'Rive', spec: 'Interactive state-machine animations with low runtime CPU usage', benchmark: '60 FPS Smooth' }
    ]
  },
  {
    id: 'research',
    label: 'Research & Testing',
    items: [
      { name: 'Maze & UserTesting', spec: 'Automated unmoderated usability testing & click tracking', benchmark: 'Empirical Data' },
      { name: 'Hotjar & Microsoft Clarity', spec: 'Heatmaps, scroll maps, and session recordings', benchmark: 'Real User Insights' },
      { name: 'Miro / Whimsical', spec: 'Collaborative user journey mapping & IA diagrams', benchmark: 'Agile Discovery' }
    ]
  },
  {
    id: 'handoff',
    label: 'Code Handoff & Specs',
    items: [
      { name: 'Figma Dev Mode', spec: 'Inspection specs, Tailwind CSS class code generation', benchmark: 'Zero Spec Ambiguity' },
      { name: 'Storybook', spec: 'Interactive component library testing & documentation', benchmark: 'Isolated UI Components' },
      { name: 'Stark Accessibility', spec: 'Real-time WCAG contrast check & screen reader simulation', benchmark: 'WCAG 2.1 AA Pass' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Empathize & UX Discovery Audit',
    desc: 'We conduct stakeholder interviews, audit existing product interfaces, map user personas, and define clear KPI metrics for product success.'
  },
  {
    num: '02',
    title: 'Information Architecture & Low-Fi Wireframes',
    desc: 'We map out user navigation flows, establish content hierarchy, and create interactive low-fidelity wireframes to validate usability early.'
  },
  {
    num: '03',
    title: 'High-Fidelity UI & Design System Tokenization',
    desc: 'We apply brand aesthetics, typography mathematical scales, color tokens, and craft pixel-perfect Figma component libraries.'
  },
  {
    num: '04',
    title: 'Interactive Prototyping & Usability Testing',
    desc: 'We build clickable high-fidelity prototypes and conduct usability testing with target users to refine friction points before coding.'
  },
  {
    num: '05',
    title: 'Developer Handoff & Quality Assurance Audit',
    desc: 'We hand off structured Figma Dev Mode specs, design token files, and partner with frontend engineers to audit pixel accuracy.'
  }
];

const UIUX_FAQS = [
  {
    q: 'Why invest in a custom Figma design system for our product?',
    a: 'A custom design system creates a single source of truth across product designers and frontend developers. It accelerates feature velocity by up to 50%, eliminates visual inconsistencies, and ensures instant global branding updates across all web and mobile apps.'
  },
  {
    q: 'How does MetaWave ensure WCAG accessibility compliance?',
    a: 'We integrate accessibility standards from step one of our design process. We use automated tools like Stark and Axe alongside manual audits to verify color contrast ratios, screen-reader semantic landmarks, keyboard focus rings, and scalable font sizes.'
  },
  {
    q: 'What deliverables will our team receive upon project completion?',
    a: 'You receive 100% organized Figma design files, an interactive design system library with component variants, high-fidelity clickable prototypes, design token export files (JSON/Tailwind), and a developer handoff guide.'
  },
  {
    q: 'Can you redesign an existing live platform without breaking user habits?',
    a: 'Yes. We perform UX audits and heat-map analyses to identify what currently works well and what creates friction. We then implement evolutionary, phased redesigns that preserve core mental models while significantly upgrading usability and visual polish.'
  },
  {
    q: 'How do you collaborate with our internal development team during handoff?',
    a: 'We work closely with your developers using Figma Dev Mode, Storybook documentation, and automated token sync scripts. Our designers remain available during the frontend build phase to perform UI QA audits and resolve edge-case layout questions.'
  }
];

export function UiUxDesign({ onNavigate, isStandalonePage = false }: UiUxDesignProps) {
  const [activeStackTab, setActiveStackTab] = useState('design');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Estimator State
  const [projectScope, setProjectScope] = useState<'design_system' | 'web_app_ui' | 'mobile_app_ui' | 'full_redesign'>('web_app_ui');
  const [platformScale, setPlatformScale] = useState<'mvp' | 'enterprise' | 'multi_brand'>('enterprise');
  const [includeUsabilityTesting, setIncludeUsabilityTesting] = useState(true);
  const [includeDesignTokens, setIncludeDesignTokens] = useState(true);

  const calculatedEstimate = useMemo(() => {
    let weeks = '3–6 Weeks';
    let team = '1 Principal Product Designer + 1 UX Researcher + 1 Design Systems Lead';
    let deliverables = 'Figma Master Library + Clickable Prototype + Handoff Specs';

    if (projectScope === 'design_system') {
      weeks = '4–7 Weeks';
      team = '1 Design System Architect + 1 UI Engineer';
      deliverables = 'Figma Design System + Tailwind CSS Token Sync + Component Docs';
    } else if (projectScope === 'full_redesign') {
      weeks = '6–10 Weeks';
      team = '1 Lead Product Designer + 1 UX Researcher + 1 Interaction Designer + 1 QA';
      deliverables = 'Full UX Audit + Re-imagined Wireframes + Design System + Prototypes';
    }

    if (platformScale === 'multi_brand') {
      weeks += ' (+ 2 wks Multi-Brand Tokens)';
    }

    return { weeks, team, deliverables };
  }, [projectScope, platformScale, includeUsabilityTesting, includeDesignTokens]);

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
          <span className="text-[#326E45] font-bold">UI/UX Design Studio</span>
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
              HUMAN-CENTERED PRODUCT EXPERIENCE STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Enterprise <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">UI/UX & Product Design Systems</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            We design intuitive, high-converting digital product experiences, scalable Figma design systems, interactive prototypes, and WCAG-compliant web and mobile interfaces that delight users and drive business growth.
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
              <span>Consult Our Design Directors</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Palette size={16} className="text-[#326E45]" />
              <span>Explore Design System Tools</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">WCAG 2.1 AA Pass</div>
              <div className="text-slate-500 text-[11px]">100% Accessible UI</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Component size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Tokenized Systems</div>
              <div className="text-slate-500 text-[11px]">Figma to React sync</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Flame size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">3x Conversion Lift</div>
              <div className="text-slate-500 text-[11px]">Empirical UX testing</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Lock size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% IP Ownership</div>
              <div className="text-slate-500 text-[11px]">Figma files & assets</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core UI/UX Design Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Palette size={12} />
              <span>UI/UX DESIGN DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Product Experience & Design Capabilities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Explore our design solutions engineered for consumer apps, SaaS dashboards, and enterprise platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UIUX_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Design Tools & Specs Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED DESIGN TECHNOLOGY STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Figma Enterprise, Motion & Testing Stack
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Review our industry-standard design tools, token management pipelines, and accessibility checkers.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {UIUX_STACK_TABS.map((tab) => (
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
            {UIUX_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 3: Interactive UI/UX Project Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Estimate Your UI/UX Design Scope & Team
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your design project parameters to generate immediate delivery timelines, squad compositions, and core deliverables.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Project Scope */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Design Engagement Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'web_app_ui', label: 'SaaS / Web App UI/UX' },
                      { id: 'mobile_app_ui', label: 'iOS & Android App UI' },
                      { id: 'design_system', label: 'Figma Design System' },
                      { id: 'full_redesign', label: 'Full Product UX Redesign' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => { playSound('toggle'); setProjectScope(s.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          projectScope === s.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale Grade */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    2. Product Scale & Multi-Brand
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'mvp', label: 'MVP / Startup' },
                      { id: 'enterprise', label: 'Enterprise Platform' },
                      { id: 'multi_brand', label: 'Multi-Brand / Multi-Theme' }
                    ].map(scale => (
                      <button
                        key={scale.id}
                        onClick={() => { playSound('toggle'); setPlatformScale(scale.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          platformScale === scale.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {scale.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox Add-ons */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUsabilityTesting}
                      onChange={(e) => setIncludeUsabilityTesting(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Task-Based Usability User Testing</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDesignTokens}
                      onChange={(e) => setIncludeDesignTokens(e.target.checked)}
                      className="accent-[#326E45] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Include Tailwind / React Design Token Sync</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">DESIGN PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  SLA GUARANTEE
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED TIMELINE</span>
                  <span className="text-lg font-display font-extrabold text-slate-900">{calculatedEstimate.weeks}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">DEDICATED DESIGN SQUAD</span>
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
                <span>Request UI/UX Design Proposal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: UI/UX Design Methodology */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              RIGOROUS DESIGN METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Product Experience Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From empathy user research to tokenized Figma design systems and developer handoff.
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
              Frequently Asked UI/UX Design Questions
            </h3>
          </div>

          <div className="space-y-3">
            {UIUX_FAQS.map((faq, idx) => {
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
            Ready to Design Your Enterprise Product Experience?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a design audit and consultation with our lead product experience directors. Receive a customized UX analysis, design system roadmap, and scope estimate within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book UI/UX Design Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

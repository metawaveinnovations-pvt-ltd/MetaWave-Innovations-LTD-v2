import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Globe2, 
  TrendingUp, 
  Target, 
  BarChart3, 
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
  Sparkles, 
  Bot, 
  Code2, 
  MapPin, 
  ShoppingBag, 
  FileText, 
  Share2, 
  Award, 
  LineChart, 
  ShieldCheck,
  Cpu,
  Terminal,
  Link2
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface SeoServicesProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const SEO_SOLUTIONS = [
  {
    id: 'technical-seo',
    title: 'Enterprise Technical SEO & Core Web Vitals',
    subtitle: 'INFRASTRUCTURE & SPEED OPTIMIZATION',
    icon: Gauge,
    desc: 'Eliminate crawl budget waste, resolve indexation bottlenecks, fix JavaScript rendering issues, and optimize Core Web Vitals (LCP, INP, CLS) for enterprise-scale platforms.',
    highlights: [
      'Core Web Vitals & speed optimization (Sub-1.2s LCP acceleration)',
      'JavaScript SEO & SSR/ISR indexability audits for React & Next.js',
      'XML sitemaps, robots.txt, canonicalization & hreflang multi-region setup',
      'Log file crawl analysis & canonical redirect chain resolution'
    ],
    tools: ['Screaming Frog', 'Google Search Console', 'PageSpeed Insights', 'Lighthouse', 'Botify']
  },
  {
    id: 'programmatic-seo',
    title: 'Programmatic SEO & Scalable Content Architecture',
    subtitle: 'HIGH-INTENT LANDING PAGE ENGINES',
    icon: Code2,
    desc: 'Generate thousands of high-converting, template-driven landing pages dynamically targeting long-tail commercial queries with rich structured data schema.',
    highlights: [
      'Dynamic page templates with custom JSON-LD schema injection',
      'Automated location-based & directory landing page creation',
      'Internal linking algorithms for maximized PageRank distribution',
      'Unique content variation rules avoiding duplicate content penalties'
    ],
    tools: ['Next.js', 'Schema.org', 'Ahrefs API', 'OpenAI API', 'Supabase']
  },
  {
    id: 'geo-generative-engine-optimization',
    title: 'Generative Engine Optimization (GEO & AI Search)',
    subtitle: 'OPTIMIZING FOR GEMINI, CHATGPT & PERPLEXITY',
    icon: Bot,
    desc: 'Ensure your brand is cited and recommended as a top authority in AI Search answers across Google AI Overviews, Gemini, ChatGPT, Claude, and Perplexity.',
    highlights: [
      'Entity-based SEO & Knowledge Graph entity mapping',
      'Brand citation optimization in trusted AI training datasets & Wikipedia',
      'Q&A conversational content structuring for LLM extraction',
      'Direct factual indexing and semantic vector embeddings'
    ],
    tools: ['Google AI Overviews', 'Gemini', 'Perplexity Pro', 'Diffbot', 'Wikidata']
  },
  {
    id: 'enterprise-link-building',
    title: 'Authority Link Building & Digital PR',
    subtitle: 'HIGH-DA BACKLINK ACQUISITION',
    icon: Link2,
    desc: 'Acquire editorial, contextual backlinks from high Domain Authority (DA 60+) publications through data-driven industry reports, expert quotes, and digital PR.',
    highlights: [
      'White-hat editorial link placement in top-tier tech & business news',
      'Proprietary data study creation & infographics for viral press citations',
      'Unlinked brand mention reclamation & broken link replacement',
      'Competitor backlink gap analysis & targeted outreach sequences'
    ],
    tools: ['Ahrefs', 'BuzzStream', 'HARO / Connectively', 'Muck Rack', 'Hunter.io']
  },
  {
    id: 'ecommerce-seo',
    title: 'E-Commerce & High-Volume Catalog SEO',
    subtitle: 'PRODUCT PAGE & CATEGORY DOMINANCE',
    icon: ShoppingBag,
    desc: 'Drive organic sales for online stores with optimized category taxonomies, Product Schema markup, review snippet star ratings, and faceted navigation indexing.',
    highlights: [
      'Product & Offer Schema markup for Google Shopping rich snippets',
      'Faceted navigation index control preventing URL parameter bloat',
      'High-converting product description optimization & internal linking',
      'Out-of-stock management strategies preserving earned page authority'
    ],
    tools: ['Shopify Plus', 'WooCommerce', 'Magento', 'SEMrush Merchant', 'Google Merchant Center']
  },
  {
    id: 'local-enterprise-seo',
    title: 'Multi-Location Local SEO & Google Maps',
    subtitle: 'GEO-TARGETED DOMINANCE',
    icon: MapPin,
    desc: 'Dominate local 3-Pack map rankings for multi-location enterprises with synchronized NAP citations, Google Business Profile management, and localized reviews.',
    highlights: [
      'Google Business Profile (GBP) multi-location verification & optimization',
      'Automated NAP (Name, Address, Phone) citation sync across directories',
      'Local schema markup injection & neighborhood landing page creation',
      'Review generation campaigns & sentiment analysis'
    ],
    tools: ['BrightLocal', 'Whitespark', 'Yext', 'Google Maps Platform', 'Local Viking']
  }
];

const SEO_STACK_TABS = [
  {
    id: 'audit_crawling',
    label: 'Auditing & Crawling',
    items: [
      { name: 'Screaming Frog Enterprise', spec: 'JavaScript rendering crawler for log file analysis, 100k+ page site audits', benchmark: 'Deep Index Scan' },
      { name: 'Google Search Console & Bing Webmaster', spec: 'Direct indexation monitoring, sitemap health checks, and impression data', benchmark: 'Real-Time Sync' },
      { name: 'Sitebulb & Botify', spec: 'Enterprise crawl budget optimization and rendering performance analysis', benchmark: 'Log File Insights' }
    ]
  },
  {
    id: 'keyword_rank',
    label: 'Keyword & Rank Tracking',
    items: [
      { name: 'Ahrefs Enterprise Suite', spec: 'Global backlink index with 35T+ links, keyword volume gap analysis', benchmark: 'Daily Rank Updates' },
      { name: 'SEMrush Guru', spec: 'Competitor ad & organic rank tracking across 120+ regional search engines', benchmark: 'SERP Feature Tracking' },
      { name: 'AccuRanker', spec: 'Sub-minute keyword rank updates with desktop vs. mobile SERP breakdown', benchmark: '99.9% Accuracy' }
    ]
  },
  {
    id: 'speed_schema',
    label: 'Core Web Vitals & Schema',
    items: [
      { name: 'Google PageSpeed Insights & Lighthouse', spec: 'Field & lab Core Web Vitals testing (LCP, INP, CLS measurements)', benchmark: '< 1.2s Target LCP' },
      { name: 'Schema.org JSON-LD Validator', spec: 'Structured data implementation for Products, FAQ, Organization & Articles', benchmark: '100% Rich Snippets' },
      { name: 'Cloudflare Edge SEO Workers', spec: 'Serverless HTTP header optimization, dynamic rendering, and prerendering', benchmark: 'Sub-20ms Edge Response' }
    ]
  }
];

const SEO_PROCESS_STEPS = [
  {
    num: '01',
    title: 'Technical Infrastructure & Core Web Vitals Audit',
    desc: 'We crawl your site with enterprise crawlers to identify indexing blocks, slow page speeds, redirect chains, mobile usability issues, and missing schema.'
  },
  {
    num: '02',
    title: 'Commercial Intent Keyword Research & SERP Mapping',
    desc: 'We map transactional and informational search queries to targeted URLs, identifying high-ROI search volume opportunities and competitor content gaps.'
  },
  {
    num: '03',
    title: 'On-Page Optimization & Programmatic Schema Injection',
    desc: 'We refactor titles, meta descriptions, H1-H3 headings, internal link graphs, and structured JSON-LD data to maximize relevance and rich snippet eligibility.'
  },
  {
    num: '04',
    title: 'Digital PR & High-DA Backlink Acquisition',
    desc: 'We execute white-hat outreach, publishing data reports and securing authoritative editorial backlinks from industry publications to boost domain rating.'
  },
  {
    num: '05',
    title: 'Generative Engine Optimization (GEO) & Rank Scaling',
    desc: 'We optimize content for AI search engines (Gemini, ChatGPT, Perplexity) while monitoring rank momentum, traffic growth, and lead conversions.'
  }
];

const SEO_FAQS = [
  {
    q: 'How long does it take to see results from technical SEO services?',
    a: 'Technical SEO fixes (such as resolving crawl budget blocks or Core Web Vitals failures) can show positive ranking and indexation improvements within 14 to 30 days. Broad keyword position growth and organic traffic compounding typically mature over 60 to 90 days.'
  },
  {
    q: 'What is Generative Engine Optimization (GEO) and why does it matter?',
    a: 'GEO is the practice of structuring website information, schema, and entity citations so that AI models (such as Google AI Overviews, Gemini, ChatGPT, and Perplexity) directly reference and cite your brand when users ask conversational questions.'
  },
  {
    q: 'Does MetaWave use white-hat SEO techniques?',
    a: '100% yes. We strictly adhere to Google Webmaster Guidelines and Search Essentials. We do not use link farms, automated spam comments, or deceptive PBNs. All link acquisition is achieved through genuine editorial outreach and digital PR.'
  },
  {
    q: 'What is Programmatic SEO and how can it scale our business?',
    a: 'Programmatic SEO involves building automated, database-driven page templates that target thousands of long-tail search queries (e.g., location pages, product comparison matrices, directory pages) with unique content and structured schema.'
  },
  {
    q: 'How do you track organic ROI and lead conversion value?',
    a: 'We integrate Google Search Console with Google Analytics 4 (GA4) event tracking. You receive a live Looker Studio dashboard that connects organic keyword rankings directly to form submissions, e-commerce purchases, and pipeline value.'
  }
];

export function SeoServices({ onNavigate, isStandalonePage = false }: SeoServicesProps) {
  const [activeStackTab, setActiveStackTab] = useState('audit_crawling');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Organic Traffic & Revenue Estimator
  const [targetMonthlyTraffic, setTargetMonthlyTraffic] = useState(25000);
  const [avgLeadValue, setAvgLeadValue] = useState(150);
  const [conversionRate, setConversionRate] = useState(2.5);

  const calculatedSeoMetrics = useMemo(() => {
    const estimatedLeads = Math.round((targetMonthlyTraffic * (conversionRate / 100)));
    const estimatedRevenue = Math.round(estimatedLeads * avgLeadValue);
    const estimatedPpcValue = Math.round(targetMonthlyTraffic * 3.85); // ~$3.85 avg CPC value equivalent

    return {
      estimatedLeads,
      estimatedRevenue,
      estimatedPpcValue
    };
  }, [targetMonthlyTraffic, avgLeadValue, conversionRate]);

  const handleCopySpec = (text: string) => {
    playSound('toggle');
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 pb-24 relative overflow-hidden">
      
      {/* Soft Background Ambiance Glows */}
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
          <span className="text-[#326E45] font-bold">SEO Services</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Search size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              ENTERPRISE TECHNICAL & PROGRAMMATIC SEO STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Dominate Search & <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">AI Search Engines</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Scale high-intent organic rankings and brand authority with Core Web Vitals optimization, programmatic SEO page engines, white-hat link building, and Generative Engine Optimization (GEO) for Google AI Overviews & ChatGPT.
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
              <span>Get Free Technical SEO Audit</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>Explore SEO Tool Stack</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">+ 185% Avg Organic Traffic</div>
              <div className="text-slate-500 text-[11px]">Compounding growth</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Gauge size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Sub-1.2s LCP Speed</div>
              <div className="text-slate-500 text-[11px]">Core Web Vitals pass</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Bot size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">GEO & AI Search Ready</div>
              <div className="text-slate-500 text-[11px]">Gemini & ChatGPT cited</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% White-Hat</div>
              <div className="text-slate-500 text-[11px]">Zero penalty guarantee</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core SEO Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Search size={12} />
              <span>SEARCH ENGINE OPTIMIZATION SOLUTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Full-Spectrum Search Engine Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From technical audits and Core Web Vitals to programmatic keyword architecture and AI search citation strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEO_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Organic Traffic & Revenue Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>ORGANIC TRAFFIC & REVENUE ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Calculate Organic SEO Pipeline Value
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Adjust the sliders to estimate the potential monthly leads, revenue, and equivalent paid search PPC savings generated through organic ranking growth.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Traffic Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Target Monthly Organic Visitors:</span>
                    <span className="text-[#326E45] font-mono">{targetMonthlyTraffic.toLocaleString()} visits / mo</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    value={targetMonthlyTraffic}
                    onChange={(e) => { playSound('toggle'); setTargetMonthlyTraffic(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Conversion Rate Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Estimated Visitor-to-Lead Conversion Rate:</span>
                    <span className="text-[#326E45] font-mono">{conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.25"
                    value={conversionRate}
                    onChange={(e) => { playSound('toggle'); setConversionRate(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Average Deal Size Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Customer / Lead Value ($):</span>
                    <span className="text-[#326E45] font-mono">${avgLeadValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="2500"
                    step="25"
                    value={avgLeadValue}
                    onChange={(e) => { playSound('toggle'); setAvgLeadValue(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">ESTIMATED ORGANIC PIPELINE</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  SEO ROI CALCULATOR
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED MONTHLY LEADS / ORDERS</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">{calculatedSeoMetrics.estimatedLeads.toLocaleString()} Leads / mo</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED MONTHLY ORGANIC REVENUE</span>
                  <span className="text-xl font-display font-extrabold text-slate-900">${calculatedSeoMetrics.estimatedRevenue.toLocaleString()} / mo</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">EQUIVALENT GOOGLE ADS PPC SAVINGS</span>
                  <span className="text-xs font-bold text-slate-700 block">
                    ${calculatedSeoMetrics.estimatedPpcValue.toLocaleString()} / mo in ad spend value
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom SEO Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology & Tool Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED SEO TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Enterprise SEO Platforms & Indexing Tools
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Software and infrastructure used for site auditing, rank tracking, schema injection, and speed engineering.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {SEO_STACK_TABS.map((tab) => (
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
            {SEO_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 4: 5-Step Strategic SEO Methodology */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              STRUCTURED SEO ROADMAP
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Search Engine Growth Methodology
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From initial audit and keyword mapping to Core Web Vitals, digital PR links, and AI search GEO optimization.
            </p>
          </div>

          <div className="space-y-4">
            {SEO_PROCESS_STEPS.map((step, idx) => (
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
              Frequently Asked SEO Questions
            </h3>
          </div>

          <div className="space-y-3">
            {SEO_FAQS.map((faq, idx) => {
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
            Ready to Outrank Competitors & Capture Organic Search Traffic?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule an executive technical SEO audit with our lead search engineers. Receive a comprehensive breakdown of Core Web Vitals, keyword gap opportunities, and GEO citation readiness.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Free Technical SEO Audit</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

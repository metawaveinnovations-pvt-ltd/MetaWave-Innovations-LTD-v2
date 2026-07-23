import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Globe2, 
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
  Share2, 
  Mail, 
  PieChart, 
  MousePointerClick, 
  DollarSign, 
  Award, 
  LineChart, 
  Users
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface DigitalMarketingProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const MARKETING_SOLUTIONS = [
  {
    id: 'search-engine-optimization',
    title: 'Enterprise Technical & Content SEO',
    subtitle: 'ORGANIC RANKING & DOMAIN AUTHORITY',
    icon: Search,
    desc: 'Dominate high-intent search queries with technical SEO audits, Core Web Vitals optimization, programmatic keyword structuring, and authoritative backlink strategies.',
    highlights: [
      'Comprehensive technical site audit & Core Web Vitals optimization',
      'Programmatic SEO content architecture & semantic keyword mapping',
      'Local SEO & Google Business Profile optimization for multi-location brands',
      'Data-driven link acquisition & digital PR outreach campaigns'
    ],
    tools: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console', 'Schema.org']
  },
  {
    id: 'ppc-programmatic-ads',
    title: 'Pay-Per-Click (PPC) & Programmatic Ads',
    subtitle: 'HIGH-CONVERSION SEARCH & DISPLAY ADS',
    icon: MousePointerClick,
    desc: 'Maximize return on ad spend (ROAS) across Google Ads, Meta Ads, LinkedIn Ads, and programmatic DSP networks through algorithmic bidding and custom ad creative.',
    highlights: [
      'Precision LinkedIn & B2B audience targeting and ABM ad campaigns',
      'Google Performance Max, Search & Remarketing campaign management',
      'A/B tested ad copy, video creatives, and responsive display banners',
      'Conversion tracking pixel setup with CAPI (Server-Side Conversion API)'
    ],
    tools: ['Google Ads', 'Meta Business Manager', 'LinkedIn Campaign Manager', 'StackAdapt', 'TikTok Ads']
  },
  {
    id: 'cro-landing-pages',
    title: 'Conversion Rate Optimization (CRO)',
    subtitle: 'DATA-BACKED UX & FUNNEL OPTIMIZATION',
    icon: Target,
    desc: 'Turn existing web traffic into qualified leads and paying customers through heatmaps, user session recordings, hypothesis-driven A/B testing, and friction-free landing page UX.',
    highlights: [
      'Heatmap behavior analysis & user recording funnel audits',
      'High-converting landing page design & speed optimization',
      'Multivariate A/B testing for CTAs, headlines, and checkout flows',
      'Form friction reduction & lead magnet conversion funnels'
    ],
    tools: ['Hotjar', 'Optimizely', 'VWO', 'Google Analytics 4', 'Unbounce']
  },
  {
    id: 'content-strategy-social',
    title: 'Content Strategy & Performance Social',
    subtitle: 'AUTHORITY BUILDING & ENGAGEMENT',
    icon: Share2,
    desc: 'Establish thought leadership and build an engaged audience across LinkedIn, Twitter/X, YouTube, and industry publications with multi-format content creation.',
    highlights: [
      'Executive thought-leadership branding & editorial calendars',
      'Short-form video scriptwriting, editing & multi-platform distribution',
      'Interactive whitepapers, industry benchmark reports & case studies',
      'Community engagement monitoring & brand reputation management'
    ],
    tools: ['HubSpot', 'Buffer', 'Canva Enterprise', 'Figma', 'Hootsuite']
  },
  {
    id: 'email-lifecycle-marketing',
    title: 'Email & Lifecycle Marketing Automation',
    subtitle: 'RETENTION, NURTURING & REVENUE RECOVERY',
    icon: Mail,
    desc: 'Nurture cold leads and increase Customer Lifetime Value (LTV) through automated email sequences, SMS campaigns, customer segmentation, and churn prevention flows.',
    highlights: [
      'Behavioral lead-nurturing drips & automated onboarding sequences',
      'E-commerce cart recovery, upsell & win-back automated flows',
      'Advanced subscriber segmentation based on RFM (Recency, Frequency, Monetary) metrics',
      'Deliverability optimization, SPF/DKIM/DMARC authentication'
    ],
    tools: ['Klaviyo', 'HubSpot Marketing Hub', 'ActiveCampaign', 'Mailchimp', 'Customer.io']
  },
  {
    id: 'marketing-analytics-attribution',
    title: 'Marketing Analytics & Multi-Touch Attribution',
    subtitle: 'FULL-FUNNEL METRIC VISIBILITY',
    icon: PieChart,
    desc: 'Gain crystal-clear visibility into revenue attribution across channels. We build unified Looker Studio dashboards tracking Cost Per Acquisition (CPA), LTV, and ROAS in real time.',
    highlights: [
      'Custom Google Analytics 4 (GA4) e-commerce & lead event measurement',
      'Multi-touch attribution modeling (First Touch, Last Touch, Linear, W-Shaped)',
      'Real-time automated Looker Studio & PowerBI executive dashboards',
      'Customer Acquisition Cost (CAC) vs. LTV ratio monitoring'
    ],
    tools: ['Google Analytics 4', 'Looker Studio', 'Segment', 'Mixpanel', 'Supermetrics']
  }
];

const MARKETING_STACK_TABS = [
  {
    id: 'seo_analytics',
    label: 'SEO & Web Analytics',
    items: [
      { name: 'Google Search Console & GA4', spec: 'Server-side event measurement, funnel tracking, and search impression audits', benchmark: '100% Data Accuracy' },
      { name: 'Ahrefs & SEMrush Enterprise', spec: 'Deep backlink analysis, competitor gap intelligence, and rank tracking', benchmark: 'Daily Index Refresh' },
      { name: 'Screaming Frog & PageSpeed Insights', spec: 'Technical crawler for log file analysis, JavaScript SEO, and Core Web Vitals', benchmark: 'Sub-1.5s LCP Target' }
    ]
  },
  {
    id: 'ad_networks',
    label: 'Paid Media & Advertising DSPs',
    items: [
      { name: 'Google Ads & Performance Max', spec: 'Smart bidding algorithms, keyword negative lists, and YouTube Video campaigns', benchmark: 'Max ROAS' },
      { name: 'LinkedIn Campaign Manager', spec: 'Account-Based Marketing (ABM) matching job titles, seniority, and company size', benchmark: 'B2B Precision' },
      { name: 'Meta Business Manager & CAPI', spec: 'Server-side pixel conversion tracking for Facebook and Instagram ad funnels', benchmark: 'Zero Attribution Loss' }
    ]
  },
  {
    id: 'cro_automation',
    label: 'CRO & Email Automation',
    items: [
      { name: 'HubSpot & Klaviyo Enterprise', spec: 'Automated subscriber segmentation, RFM predictive metrics, and SMS flows', benchmark: '> 45% Open Rate' },
      { name: 'Hotjar & Optimizely', spec: 'User heatmap tracking, session recordings, and split A/B test variations', benchmark: 'Statistically Significant' },
      { name: 'Looker Studio & Supermetrics', spec: 'Cross-channel automated KPI dashboards with live currency conversions', benchmark: 'Real-Time Sync' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Market Research & Competitor Benchmarking',
    desc: 'We perform a deep audit of your current digital footprint, competitor ad spend, organic keyword gaps, and target customer buyer personas.'
  },
  {
    num: '02',
    title: 'Full-Funnel Growth Strategy & Budgeting',
    desc: 'We craft a tailored multichannel marketing plan detailing channel allocation (SEO, PPC, Social, Email), CAC targets, and projected ROAS timelines.'
  },
  {
    num: '03',
    title: 'Campaign Infrastructure & Conversion Pixel Setup',
    desc: 'We configure GA4 server-side tracking, Meta CAPI, Google Ads conversion tags, ad creative assets, and high-converting landing pages.'
  },
  {
    num: '04',
    title: 'A/B Testing, Optimization & Ad Scaling',
    desc: 'We launch campaigns, monitor real-time CPA metrics, trim low-performing keywords, and continuously scale winning ad angles and landing page variants.'
  },
  {
    num: '05',
    title: 'Executive Attribution Reporting & Strategy Iteration',
    desc: 'We deliver transparent weekly Looker Studio performance dashboards, conduct bi-weekly strategy reviews, and reallocate budgets to maximize ROAS.'
  }
];

const MARKETING_FAQS = [
  {
    q: 'How quickly can we expect results from digital marketing campaigns?',
    a: 'PPC campaigns (Google Ads, Meta Ads) generate immediate traffic and leads within 24 to 48 hours of launch. Organic Search Engine Optimization (SEO) and content authority strategies typically build compounding momentum with noticeable rank improvements within 60 to 90 days.'
  },
  {
    q: 'How does MetaWave measure return on ad spend (ROAS)?',
    a: 'We implement server-side conversion tracking (GA4 + Meta CAPI) and custom multi-touch attribution models. You receive a live Looker Studio dashboard that tracks total ad spend directly against closed leads, e-commerce revenue, Customer Acquisition Cost (CAC), and net ROAS.'
  },
  {
    q: 'Do you manage both creative assets (ad copy, graphics, video) and media buying?',
    a: 'Yes. MetaWave provides full end-to-end digital marketing services. Our team handles strategy, copywriting, graphic design, video ad editing, landing page creation, media buying, keyword bidding, and daily campaign optimization.'
  },
  {
    q: 'What budget range do you recommend for paid ad campaigns?',
    a: 'While budgets depend on industry competitiveness and target geographic regions, we recommend starting with a minimum ad spend of $2,500 – $5,000 / month across channels to ensure statistical significance during initial A/B testing and algorithmic learning phases.'
  },
  {
    q: 'Will we have full ownership of our ad accounts and marketing data?',
    a: '100% yes. All ad accounts (Google Ads, Meta, LinkedIn), analytics properties (GA4), and domain assets remain in your organization’s name with direct admin ownership. MetaWave operates as an authorized management partner.'
  }
];

export function DigitalMarketing({ onNavigate, isStandalonePage = false }: DigitalMarketingProps) {
  const [activeStackTab, setActiveStackTab] = useState('seo_analytics');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Growth Projection Estimator State
  const [monthlyAdBudget, setMonthlyAdBudget] = useState(5000);
  const [avgOrderValue, setAvgOrderValue] = useState(250);
  const [targetChannel, setTargetChannel] = useState<'b2b_lead_gen' | 'ecommerce_growth' | 'seo_organic' | 'full_funnel'>('full_funnel');

  const calculatedProjection = useMemo(() => {
    let estRoas = '3.5x – 5.2x ROAS';
    let estLeadsSales = '120 – 180 Qualified Leads / mo';
    let keyFocus = 'Google Search Ads + LinkedIn B2B Targeting + CRO Landing Pages';

    if (targetChannel === 'ecommerce_growth') {
      const estimatedRevenue = Math.round(monthlyAdBudget * 4.2);
      estRoas = '4.0x – 6.0x ROAS';
      estLeadsSales = `$${estimatedRevenue.toLocaleString()} Projected Monthly Sales`;
      keyFocus = 'Google Performance Max + Meta Advantage+ Ads + Klaviyo Email Automations';
    } else if (targetChannel === 'seo_organic') {
      estRoas = '6.0x+ Long-Term ROI';
      estLeadsSales = '250+ Organic Inbound Leads / mo (Month 6+)';
      keyFocus = 'Technical Core Web Vitals + Programmatic SEO + High-Authority Backlinks';
    } else if (targetChannel === 'b2b_lead_gen') {
      const estimatedLeads = Math.round(monthlyAdBudget / 65);
      estRoas = '3.2x – 4.5x Pipeline ROI';
      estLeadsSales = `~ ${estimatedLeads} MQLs (Marketing Qualified Leads) / mo`;
      keyFocus = 'LinkedIn Account-Based Marketing + Retargeting + Automated Email Nurturing';
    }

    return { estRoas, estLeadsSales, keyFocus };
  }, [monthlyAdBudget, avgOrderValue, targetChannel]);

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
          <span className="text-[#326E45] font-bold">Digital Marketing</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <Megaphone size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              DATA-DRIVEN DIGITAL MARKETING & GROWTH STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            Performance <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Digital Marketing & Growth</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Scale brand reach and maximize Return on Ad Spend (ROAS) with technical SEO, precision PPC advertising, conversion rate optimization (CRO), automated email nurture flows, and real-time attribution analytics.
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
              <span>Get Free Marketing & SEO Audit</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>View Marketing Tech Stack</span>
            </button>
          </motion.div>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingUp size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">3.8x Avg ROAS</div>
              <div className="text-slate-500 text-[11px]">Paid media performance</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Search size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">+ 140% Organic Traffic</div>
              <div className="text-slate-500 text-[11px]">Technical SEO growth</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <MousePointerClick size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">+ 42% Conversion Uplift</div>
              <div className="text-slate-500 text-[11px]">CRO landing page tests</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <BarChart3 size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">100% GA4 & CAPI</div>
              <div className="text-slate-500 text-[11px]">Server-side attribution</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Digital Marketing Offerings */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <Megaphone size={12} />
              <span>DIGITAL MARKETING SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Full-Funnel Growth & Marketing Offerings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From technical SEO and precision PPC campaigns to conversion rate optimization and full attribution analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETING_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive Growth Projection Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>INTERACTIVE GROWTH ESTIMATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Project Your Digital Marketing ROAS & Leads
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Select your primary marketing channel and monthly ad spend budget to calculate expected ROAS benchmarks, lead projections, and channel strategy focus.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Channel Goal */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
                    1. Primary Growth Objective
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'full_funnel', label: 'Full-Funnel Growth' },
                      { id: 'b2b_lead_gen', label: 'B2B Lead Generation' },
                      { id: 'ecommerce_growth', label: 'E-Commerce Sales' },
                      { id: 'seo_organic', label: 'Organic SEO Dominance' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => { playSound('toggle'); setTargetChannel(type.id as any); }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          targetChannel === type.id 
                            ? 'bg-[#326E45] text-white border-[#326E45]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ad Budget Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Estimated Monthly Paid Ad Budget:</span>
                    <span className="text-[#326E45] font-mono">${monthlyAdBudget.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="50000"
                    step="500"
                    value={monthlyAdBudget}
                    onChange={(e) => { playSound('toggle'); setMonthlyAdBudget(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">MARKETING PROJECTION</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  DATA-BACKED BENCHMARK
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED ROAS / ROI RANGE</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">{calculatedProjection.estRoas}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED MONTHLY OUTPUT</span>
                  <span className="text-sm font-bold text-slate-900">{calculatedProjection.estLeadsSales}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">STRATEGIC CHANNEL FOCUS</span>
                  <span className="text-xs text-slate-600 leading-snug block">{calculatedProjection.keyFocus}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request Custom Marketing Strategy</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED MARKETING TECH STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              SEO Platforms, Paid DSPs & Analytics Stack
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Enterprise platforms used to power campaign execution, tracking, and attribution.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {MARKETING_STACK_TABS.map((tab) => (
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
            {MARKETING_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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

        {/* Section 4: Growth Lifecycle Process Steps */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              STRUCTURED GROWTH METHODOLOGY
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              5-Step Data-Driven Growth Lifecycle
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From competitor research to server-side attribution, A/B testing, and campaign scaling.
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
              Frequently Asked Digital Marketing Questions
            </h3>
          </div>

          <div className="space-y-3">
            {MARKETING_FAQS.map((faq, idx) => {
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
            Ready to Scale Your Digital Growth & ROAS?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Book a complimentary marketing growth strategy session with our performance directors. Receive a free SEO & PPC audit with clear channel recommendations within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Growth Strategy Session</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

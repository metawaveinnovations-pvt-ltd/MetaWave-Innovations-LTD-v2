import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  CreditCard, 
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
  Bot, 
  Code2, 
  Store, 
  Package, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  Users, 
  DollarSign, 
  LineChart, 
  Boxes,
  BarChart3,
  Cpu
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface EcommerceDevelopmentProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const ECOMMERCE_SOLUTIONS = [
  {
    id: 'headless-commerce',
    title: 'Headless Commerce & Next.js Frontends',
    subtitle: 'ULTRA-FAST DECOUPLED ARCHITECTURE',
    icon: Code2,
    desc: 'Decouple frontend user experience from backend commerce engines using Next.js, React, and GraphQL for lightning-fast sub-second page loads and complete design freedom.',
    highlights: [
      'Sub-500ms page transitions with Server-Side Rendering (SSR) & Edge Caching',
      'Unified GraphQL API orchestration across PIM, CMS, and Checkout engines',
      'Custom progressive web app (PWA) offline cart capabilities',
      'Omnichannel frontend deployment across Web, Mobile, and IoT kiosks'
    ],
    tools: ['Next.js', 'Storefront API', 'GraphQL', 'Vercel', 'Tailwind CSS']
  },
  {
    id: 'shopify-plus-custom',
    title: 'Shopify Plus & Enterprise Platform Setup',
    subtitle: 'SCALABLE STOREFRONTS & APP HUBS',
    icon: Store,
    desc: 'Custom Liquid & Hydrogen theme engineering, bespoke private app development, automated checkout customization, and seamless ERP/CRM data integrations.',
    highlights: [
      'Bespoke Shopify Hydrogen & Remix storefront development',
      'Custom private Shopify app development with REST/GraphQL APIs',
      'Shopify Checkout Extensibility customization & one-click upsells',
      'Automated inventory & catalog sync across multiple warehouse locations'
    ],
    tools: ['Shopify Plus', 'Hydrogen', 'Remix', 'Liquid', 'GraphQL App API']
  },
  {
    id: 'b2b-wholesale-portals',
    title: 'Enterprise B2B Digital Commerce Portals',
    subtitle: 'WHOLESALE & BULK ORDERING ENGINES',
    icon: Boxes,
    desc: 'Empower wholesale buyers with personalized tier pricing, custom line-of-credit terms, bulk CSV order uploads, punchout catalog integration, and multi-user roles.',
    highlights: [
      'Custom customer group pricing matrices & volume discount tiers',
      'Net-30/60 credit term payment workflows & purchase order invoice approvals',
      'Quick order forms with SKU auto-complete & bulk CSV uploads',
      'ERP integration with SAP, NetSuite, Dynamics 365, and Salesforce'
    ],
    tools: ['Shopify B2B', 'BigCommerce B2B Edition', 'Next.js B2B Hub', 'REST APIs']
  },
  {
    id: 'payments-subscriptions',
    title: 'Global Payment Gateways & Subscription Engines',
    subtitle: 'FRICTIONLESS CHECKOUT & RECURRING BILLING',
    icon: CreditCard,
    desc: 'Maximize conversion with localized payment methods (Apple Pay, Google Pay, BNPL), multi-currency routing, 3D Secure 2 compliance, and automated subscription flows.',
    highlights: [
      'Multi-currency auto-conversion with real-time exchange rates',
      'Buy Now Pay Later (BNPL) integration with Klarna, Affirm & Afterpay',
      'Automated recurring subscription billing with smart dunning retry logic',
      'PCI-DSS Level 1 compliant secure payment tokenization'
    ],
    tools: ['Stripe Elements', 'Adyen', 'Recharge', 'Bold Subscriptions', 'PayPal Braintree']
  },
  {
    id: 'ai-recommendations-search',
    title: 'AI Product Recommendations & Smart Search',
    subtitle: 'PERSONALIZED MERCHANDISING ENGINES',
    icon: Bot,
    desc: 'Boost Average Order Value (AOV) with AI-powered vector product search, personalized cross-sell recommendations, dynamic price optimization, and predictive inventory.',
    highlights: [
      'Typo-tolerant instant search with natural language query parsing',
      'Real-time behavioral product recommendation carousels',
      'Automated dynamic merchandising rules & promotional banners',
      'Visual search & image-based similar product discovery'
    ],
    tools: ['Algolia', 'Constructor.io', 'Klevu', 'Nosto', 'Gemini AI']
  },
  {
    id: 'multi-vendor-marketplaces',
    title: 'Multi-Vendor Marketplaces & Catalog Engines',
    subtitle: 'SCALABLE PLATFORM ECOSYSTEMS',
    icon: Users,
    desc: 'Build scalable multi-seller marketplaces with custom seller onboarding portals, automated commission splits, multi-warehouse shipping calculations, and review verification.',
    highlights: [
      'Vendor dashboard for product listing, stock management & payout tracking',
      'Automated payout distribution via Stripe Connect & PayPal Hyperwallet',
      'Multi-origin split shipping calculations & tax compliance (TaxJar/Avalara)',
      'Verified buyer reviews & dispute management ticket workflows'
    ],
    tools: ['Stripe Connect', 'Mirakl', 'Custom Node.js/React', 'Avalara', 'ShipEngine']
  }
];

const ECOMMERCE_STACK_TABS = [
  {
    id: 'headless_frontend',
    label: 'Headless Frontends & UI',
    items: [
      { name: 'Next.js 15 & React Commerce', spec: 'App Router architecture with Edge SSR, React Server Components & Sub-500ms render', benchmark: 'Edge Fast Cache' },
      { name: 'Shopify Hydrogen & Remix', spec: 'React-based storefront framework with built-in Storefront API GraphQL utilities', benchmark: 'Native Shopify Sync' },
      { name: 'Tailwind CSS & Framer Motion', spec: 'Responsive micro-interaction UI design system with fluid layout transitions', benchmark: '60 FPS Smooth UX' }
    ]
  },
  {
    id: 'engines_platforms',
    label: 'E-Commerce Engines & Headless CMS',
    items: [
      { name: 'Shopify Plus & Commerce Layer', spec: 'Enterprise e-commerce engine with infinite scalability and global CDN delivery', benchmark: '99.99% Uptime' },
      { name: 'Medusa.js & Custom Node.js', spec: 'Open-source headless commerce API with modular cart, order, and fulfillment engine', benchmark: '100% Extensible' },
      { name: 'Sanity.io & Contentful CMS', spec: 'Structured headless content modeling for rich editorial landing pages and lookbooks', benchmark: 'Real-Time Preview' }
    ]
  },
  {
    id: 'payments_logistics',
    label: 'Payments & Logistics APIs',
    items: [
      { name: 'Stripe, Adyen & PayPal Braintree', spec: 'Global payment gateway routing with Apple Pay, Google Pay, and localized methods', benchmark: 'PCI-DSS Level 1' },
      { name: 'ShipEngine & EasyPost APIs', spec: 'Multi-carrier label generation, real-time rate quotes, and tracking webhooks', benchmark: 'Automated Shipping' },
      { name: 'TaxJar & Avalara AvaTax', spec: 'Automated global sales tax, VAT, and GST calculation at checkout', benchmark: '100% Tax Accuracy' }
    ]
  }
];

const ECOMMERCE_PROCESS_STEPS = [
  {
    num: '01',
    title: 'E-Commerce Architecture & Catalog Strategy',
    desc: 'We analyze your SKU structure, target demographics, payment gateway requirements, and ERP integrations to select the ideal platform setup.'
  },
  {
    num: '02',
    title: 'High-Converting UX/UI Wireframing & Mobile-First Design',
    desc: 'We craft intuitive, friction-free mobile storefront designs optimized for fast product discovery, quick add-to-cart, and streamlined single-page checkouts.'
  },
  {
    num: '03',
    title: 'Headless / Platform Engineering & API Integrations',
    desc: 'We build custom frontend storefronts, integrate payment processors, configure inventory management sync, and implement AI search engines.'
  },
  {
    num: '04',
    title: 'Security Audits, Load Testing & PCI Compliance',
    desc: 'We conduct penetration testing, simulate high-concurrency Cyber Monday traffic loads, verify SSL encryption, and pass PCI-DSS security compliance.'
  },
  {
    num: '05',
    title: 'Store Launch, Conversion Monitoring & Scale Optimization',
    desc: 'We execute zero-downtime DNS cutover, establish real-time order tracking webhooks, and continuously optimize checkout conversion rates.'
  }
];

const ECOMMERCE_FAQS = [
  {
    q: 'Why should we choose Headless Commerce over a traditional monolithic store?',
    a: 'Headless commerce decouples your frontend storefront from backend commerce logic. This delivers sub-500ms page load speeds, complete custom design freedom, superior mobile conversion rates, and the flexibility to publish to web, mobile apps, and smart displays effortlessly.'
  },
  {
    q: 'Can MetaWave migrate our existing store from WooCommerce or Magento to Shopify Plus / Next.js?',
    a: 'Yes. We specialize in zero-data-loss e-commerce migrations. We safely transfer all historical order logs, customer profiles, product catalog taxonomies, inventory counts, and 301 URL redirect maps to preserve your search engine SEO rankings.'
  },
  {
    q: 'How do you handle multi-currency, multi-language, and global tax compliance?',
    a: 'We integrate automated location detection that displays prices in local currencies, supports multi-language URL structures with hreflang tags, and connects TaxJar or Avalara to calculate exact regional sales tax, VAT, and GST at checkout.'
  },
  {
    q: 'Do you build custom B2B wholesale portals with custom tier pricing?',
    a: 'Yes. We engineer bespoke B2B wholesale portals featuring customer-specific catalog pricing, net payment terms (Net-30/60), bulk order CSV uploads, quick re-ordering lists, and multi-tier approval workflows.'
  },
  {
    q: 'How do you ensure our checkout can handle flash sales and high traffic spikes?',
    a: 'Our headless architecture relies on edge CDN deployment (Vercel/Cloudflare) and decoupled APIs capable of processing tens of thousands of concurrent checkouts per minute without performance degradation.'
  }
];

export function EcommerceDevelopment({ onNavigate, isStandalonePage = false }: EcommerceDevelopmentProps) {
  const [activeStackTab, setActiveStackTab] = useState('headless_frontend');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive E-Commerce Revenue & GMV Growth Estimator
  const [monthlyOrders, setMonthlyOrders] = useState(1500);
  const [avgOrderValue, setAvgOrderValue] = useState(85);
  const [conversionUplift, setConversionUplift] = useState(35); // % conversion rate uplift from headless speed/UX

  const calculatedCommerceRevenue = useMemo(() => {
    const currentGmv = monthlyOrders * avgOrderValue;
    const projectedGmvGrowth = Math.round(currentGmv * (conversionUplift / 100));
    const totalProjectedGmv = currentGmv + projectedGmvGrowth;
    const additionalAnnualRevenue = projectedGmvGrowth * 12;

    return {
      currentGmv,
      projectedGmvGrowth,
      totalProjectedGmv,
      additionalAnnualRevenue
    };
  }, [monthlyOrders, avgOrderValue, conversionUplift]);

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
          <span className="text-[#326E45] font-bold">E-Commerce Development</span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-slate-200 bg-white shadow-xs mb-4"
          >
            <ShoppingBag size={13} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              ENTERPRISE E-COMMERCE & HEADLESS COMMERCE STUDIO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
          >
            High-Conversion <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">E-Commerce Platforms</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Build scalable digital storefronts and B2B portals with Headless Next.js, Shopify Plus, custom payment engines, AI recommendations, and multi-warehouse inventory synchronization.
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
              <span>Schedule E-Commerce Strategy Call</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('tech-stack')}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BarChart3 size={16} className="text-[#326E45]" />
              <span>View Commerce Tech Stack</span>
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
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Sub-500ms Page Load</div>
              <div className="text-slate-500 text-[11px]">Headless SSR speed</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <ShieldCheck size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">PCI-DSS Level 1</div>
              <div className="text-slate-500 text-[11px]">Secure payment gateways</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <TrendingUp size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">+ 35% Conversion Uplift</div>
              <div className="text-slate-500 text-[11px]">Optimized checkout UX</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#326E45]/8 border border-[#326E45]/15 flex items-center justify-center text-[#326E45] shrink-0">
              <Globe2 size={19} />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">Multi-Currency & Tax</div>
              <div className="text-slate-500 text-[11px]">Global shipping & VAT</div>
            </div>
          </div>
        </div>

        {/* Section 1: Core E-Commerce Offerings */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-[10px] font-mono uppercase font-bold mb-3">
              <ShoppingCart size={12} />
              <span>DIGITAL COMMERCE SOLUTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Enterprise E-Commerce Engineering Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From headless frontends and Shopify Plus setups to B2B portals and AI merchandising engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOMMERCE_SOLUTIONS.map((item) => {
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

        {/* Section 2: Interactive E-Commerce Revenue Growth Estimator */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#326E45]/8 text-[#326E45] border border-[#326E45]/15 text-xs font-mono uppercase font-bold mb-4">
            <Sliders size={13} />
            <span>E-COMMERCE REVENUE GROWTH CALCULATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
                  Project Revenue Growth From Headless Speed & UX
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Fast page loads and friction-free checkouts directly increase conversion rates. Adjust your order metrics to estimate your projected GMV growth.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Monthly Orders Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Current Monthly Order Volume:</span>
                    <span className="text-[#326E45] font-mono">{monthlyOrders.toLocaleString()} orders / mo</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="20000"
                    step="100"
                    value={monthlyOrders}
                    onChange={(e) => { playSound('toggle'); setMonthlyOrders(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* AOV Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Average Order Value (AOV):</span>
                    <span className="text-[#326E45] font-mono">${avgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="500"
                    step="5"
                    value={avgOrderValue}
                    onChange={(e) => { playSound('toggle'); setAvgOrderValue(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>

                {/* Conversion Uplift Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Target Conversion Rate Uplift (%):</span>
                    <span className="text-[#326E45] font-mono">+{conversionUplift}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="75"
                    step="5"
                    value={conversionUplift}
                    onChange={(e) => { playSound('toggle'); setConversionUplift(Number(e.target.value)); }}
                    className="w-full accent-[#326E45] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Output Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#326E45] uppercase">PROJECTED COMMERCE GROWTH</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#326E45] px-2 py-0.5 rounded-full font-bold">
                  GMV BENCHMARK
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">CURRENT MONTHLY GMV</span>
                  <span className="text-sm font-bold text-slate-700">${calculatedCommerceRevenue.currentGmv.toLocaleString()} / mo</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED MONTHLY GMV (AFTER REFACTOR)</span>
                  <span className="text-xl font-display font-extrabold text-[#326E45]">${calculatedCommerceRevenue.totalProjectedGmv.toLocaleString()} / mo</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">PROJECTED ANNUAL NET REVENUE GAIN</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    + ${calculatedCommerceRevenue.additionalAnnualRevenue.toLocaleString()} / year
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full mt-4 py-3 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#326E45]/20"
              >
                <span>Request E-Commerce Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack Matrix */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block mb-1">
              APPROVED E-COMMERCE STACK
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              E-Commerce Frameworks, APIs & Gateways
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Battle-tested frameworks and third-party APIs used to power high-concurrency storefronts.
            </p>
          </div>

          {/* Stack Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ECOMMERCE_STACK_TABS.map((tab) => (
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
            {ECOMMERCE_STACK_TABS.find(t => t.id === activeStackTab)?.items.map((item, idx) => (
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
              5-Step E-Commerce Development Process
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              From initial store architecture to load testing, payment integrations, and zero-downtime launch.
            </p>
          </div>

          <div className="space-y-4">
            {ECOMMERCE_PROCESS_STEPS.map((step, idx) => (
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
              Frequently Asked E-Commerce Questions
            </h3>
          </div>

          <div className="space-y-3">
            {ECOMMERCE_FAQS.map((faq, idx) => {
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
            Ready to Build a High-Conversion E-Commerce Platform?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Consult with our senior digital commerce architects. Receive a tailored headless architecture plan, platform migration roadmap, and fixed cost proposal within 24 hours.
          </p>

          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="px-8 py-4 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book E-Commerce Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

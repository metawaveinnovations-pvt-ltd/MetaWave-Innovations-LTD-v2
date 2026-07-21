import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Filter, Calendar, Clock, User, ArrowRight, X, ArrowUpRight, BookOpen } from 'lucide-react';

interface ArticlePost {
  id: string;
  title: string;
  summary: string;
  category: 'Artificial Intelligence' | 'Software Engineering' | 'Digital Transformation' | 'Business Automation' | 'Cloud Computing' | 'Technology Trends' | 'UK Business Technology';
  content: string;
  author: string;
  date: string;
  readTime: string;
  imgUrl: string;
}

export function Insights() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ArticlePost | null>(null);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Software Engineering',
    'Digital Transformation',
    'Business Automation',
    'Cloud Computing',
    'Technology Trends',
    'UK Business Technology'
  ];

  const articles: ArticlePost[] = [
    {
      id: 'a1',
      title: 'Architecting High-Performance Large Language Assistant Pipelines for Enterprise SLA Targets',
      summary: 'An analytical review of token caching strategies, regional redundancy configurations, and request queuing frameworks necessary to maintain stable sub-second responses.',
      category: 'Artificial Intelligence',
      content: 'Large Language Models (LLMs) are rapidly transitioning from conversational sandboxes to core enterprise operating layers. However, integrating models into systems like multi-lane billing registries or patient clinical queues requires meeting strict uptime and latency SLAs.\n\nTo achieve sub-second response limits, enterprise architectures must look beyond standard cloud endpoints. Standard cloud endpoints suffer from severe request processing queues and network path latency variations. Vetted systems developers must implement pre-prompt semantic caching layers. These semantic caching layers identify repeating user intents and instantly route matching answers from local high-speed cache storage.\n\nFurthermore, routing must be dynamically spread across multiple global cloud nodes (including AWS BEDROCK, Google Vertex AI, and regional Azure instances). This prevents individual cloud provider service degradation from impacting user experiences. Dual-active queuing databases and automatic timeout policies are mandatory to maintain consistent SLA compliance.',
      author: 'Alistair Thorne (Strategic AI Principal)',
      date: '12 May 2026',
      readTime: '6 min read',
      imgUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a2',
      title: 'How UK Small & Medium Enterprises Are Accelerating Digital Transformation with SECP Vetted Tech Teams',
      summary: 'A strategic blueprint evaluating how offshore technology R&D centers in South Asia are helping London-based companies modernize legacy ERP and cloud solutions cost-efficiently.',
      category: 'UK Business Technology',
      content: 'The UK enterprise market is facing unprecedented pressure to modernise legacy workflows, secure database assets, and implement predictive business telemetry systems. However, a local shortage of senior systems developers has driven consulting expenses to unsustainable levels.\n\nAs a solution, leading UK organisations are partnering with SECP-vetted private limited development institutions in Pakistan. These entities act as seamless extensions of London strategy hubs, working in adjacent zones to facilitate joint development. This distributed delivery model allows UK firms to build highly customized ERP systems, CRM platforms, and e-learning hubs at fractional costs compared to traditional local agencies.\n\nCrucially, complete code sovereignty must remain protected. High-end partnerships require comprehensive IP assignment contracts, air-gapped server configurations, and rigorous data protection routines complying fully with GDPR.',
      author: 'Marcus Vance (Director of Client Engagement)',
      date: '28 April 2026',
      readTime: '8 min read',
      imgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a3',
      title: 'The Shift to Headless Commerce Architecture: Overcoming the 70% Cart Dismissal Hurdle',
      summary: 'Re-engineering bloated retail storefronts with React + Next.js static rendering, reducing core web-vitals load metrics down to 150ms to drive conversion rates.',
      category: 'Software Engineering',
      content: 'Standard e-commerce templates built with bloated plugins are suffering from severe loading lag. Recent research shows that a simple 1-second delay in page loading rates causes cart dismissal ratios to climb by up to 22%.\n\nTo overcome these performance bottlenecks, enterprise brands are shifting to headless, decoupled architectures. By decoupling front-end presentation from back-end inventory databases, developers can compile the entire catalog into statically-cached, ultra-responsive HTML and CSS files.\n\nUsing modern systems like React + Next.js with high-speed GraphQL endpoints allows product search filters and checkout forms to process transactions in under 150ms. Additionally, this decoupled structure protects internal inventory resources. Should sudden shopping traffic spikes flood your storefront, your checkout and inventory databases remain safely insulated behind Content Delivery Networks (CDNs).',
      author: 'Edward Sterling (Lead Visual Systems Developer)',
      date: '04 April 2026',
      readTime: '5 min read',
      imgUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a4',
      title: 'Automating Commercial Real Estate Workflows: Deploying Smart Preventative IoT Maintenance Portals',
      summary: 'Exploring how customized Property Management Systems (PMS) are utilizing cognitive alert rules to schedule inspection cycles and coordinate supplier logistics autonomously.',
      category: 'Business Automation',
      content: 'Property management operations have historically depended on intensive manual email processing and clunky spreadsheet lists. When tenant maintenance tickets sit unaddressed due to administrative delays, landlords suffer vacancy risk and direct asset depreciation.\n\nDeploying custom business automation systems linked to IoT sensors completely changes the speed of property maintenance. When a smart sensor registers a system parameter anomaly (such as a drop in air duct pressure), the system automatically triages the problem, queries vendor service availability, and sends a scheduled inspection invitation.\n\nFurthermore, this PMS generates legally compliant lease contracts, manages digital rent split balances, and parses returned files using military-grade OCR. Routine clerical operations are reduced to simple, unified executive click workflows.',
      author: 'Sarah Jenkins (Chief Technology Officer)',
      date: '18 March 2026',
      readTime: '7 min read',
      imgUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a5',
      title: 'Multi-Region Google Cloud & AWS High-Availability Blueprints for FinTech Ledgers',
      summary: 'Practical approaches to database clustering, transactional locking, and cross-border latency management under strict financial rules.',
      category: 'Cloud Computing',
      content: 'FinTech applications demand seamless transaction processing and absolute data durability. A single transaction ledger synchronization error can violate SEC and state regulations, undermining consumer confidence.\n\nTo solve this, systems architects deploy multi-region active-active database clusters using advanced replication tools like CockroachDB or Google Cloud Spanner. These databases ensure consistent transaction validation without relying on single central database nodes, maintaining high speed across continents.\n\nAll configurations are handled using automated infrastructure tools (Terraform, Docker), facilitating rapid environment matching. Regular, scheduled failover testing ensures code clusters can self-heal without any loss of active transaction data.',
      author: 'Tariq Mehmood (Principal Cloud Architect)',
      date: '02 March 2026',
      readTime: '9 min read',
      imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredArticles = selectedCat === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCat);

  return (
    <section id="insights" className="py-24 bg-slate-50 border-b border-slate-200/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#397A56]/[0.012] blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
            <BookOpen size={11} className="text-[#397A56]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#397A56] uppercase">
              RESEARCH & ANALYTICS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Vanguard Technology Insights
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Thought leadership and analytical research prepared by our chief software engineers and digital transformation advisors.
          </p>
        </div>

        {/* Categories Horizontal Filter Scroll */}
        <div className="flex overflow-x-auto gap-2 pb-6 scrollbar-thin scrollbar-thumb-slate-200 justify-start max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-[#397A56] to-[#2F6547] border-[#397A56] text-white shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-350 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post List Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-350 hover:shadow-lg transition-all duration-300 relative text-left min-h-[390px]"
                id={`article-${article.id}`}
              >
                <div>
                  {/* Category Pill Tag */}
                  <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
                    <span className="text-[8px] font-mono font-bold bg-[#397A56]/10 text-[#397A56] px-2.5 py-0.5 rounded-full uppercase leading-none">
                      {article.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">{article.readTime}</span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2 text-[10px] font-mono text-slate-400 font-bold leading-none">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        <span>{article.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User size={10} />
                        <span>By Specialist</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-display font-black text-slate-900 leading-tight group-hover:text-[#397A56] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal lines-clipped overflow-hidden h-14">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Read trigger button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#397A56] hover:text-white border border-slate-200 group-hover:border-[#397A56] transition-all rounded-xl text-[10px] font-mono font-black uppercase tracking-wider text-slate-705 flex items-center justify-center gap-1 .5 cursor-pointer shadow-2xs active:scale-95 duration-200"
                  >
                    <span>Read Analysis Blueprint</span>
                    <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* If no articles are present in active category */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-slate-450 text-xs">
            No research papers published in this category yet. Please check back shortly.
          </div>
        )}

      </div>

      {/* FULL ARTICLE POPUP MODAL SCREEN */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="bg-white rounded-3xl border border-slate-205 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 flex flex-col gap-6 text-left"
            >
              
              {/* Close Button Trigger */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 border border-slate-200/90 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-all active:scale-90"
                aria-label="Close article modal"
              >
                <X size={15} />
              </button>

              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[8px] font-mono font-bold bg-[#397A56]/15 text-[#397A56] px-2.5 py-1 rounded-full uppercase leading-none">
                    {activeArticle.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
                    <Clock size={11} />
                    <span>{activeArticle.readTime}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">|</span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
                    <Calendar size={11} />
                    <span>{activeArticle.date}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 leading-tight">
                  {activeArticle.title}
                </h3>

                {/* Author Info */}
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-display font-black text-[12px] text-[#397A56] border border-slate-300">
                    M
                  </div>
                  <div className="leading-tight text-left">
                    <span className="block text-xs font-bold text-slate-800">{activeArticle.author}</span>
                    <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest font-extrabold">METAWAVE ADVISOR R&D</span>
                  </div>
                </div>

                {/* Article Content with whitespace formatting */}
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-normal whitespace-pre-line pt-2">
                  {activeArticle.content}
                </p>
              </div>

              {/* Consultation trigger callback */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[9px] font-mono text-slate-400 leading-none">© 2026 METAWAVE RESEARCH GROUP</span>
                <button
                  onClick={() => { setActiveArticle(null); const el = document.getElementById('contact'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-4 py-2 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider text-white bg-slate-900 hover:bg-[#397A56] flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                >
                  <span>Consult Regarding This Solution</span>
                  <ArrowRight size={11} />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Check, AlertCircle, Cpu, ShieldCheck } from 'lucide-react';

export function PortfolioShowcase() {
  const caseStudies = [
    {
      id: 'cs1',
      title: 'Aegis Enterprise EHR Hub',
      industry: 'Healthcare Tech',
      techStack: ['React', 'AWS FHIR', 'Node.js', 'PostgreSQL'],
      problem: 'Severe clinical data transmission lag delaying emergency doctor alerts and violating patient HIPAA safety guidelines.',
      solution: 'Connected a secure FHIR socket server parsing clinical medical telemetry data vectors with sub-10ms automatic doctor notifications.',
      metrics: [
        { label: 'Revenue Growth', val: '+32% Clinic Yield YoY' },
        { label: 'Efficiency Increase', val: '40% Admissions Improvement' },
        { label: 'Cost Reduction', val: '$1.2M Annual Logistics Saved' },
        { label: 'User Growth', val: '2.5M Active Regular Patients' }
      ],
      color: 'border-emerald-200 bg-emerald-50/20'
    },
    {
      id: 'cs2',
      title: 'Prism Commercial Asset Portal',
      industry: 'Real Estate Modernization',
      techStack: ['Vue.js', 'Laravel', 'MySQL', 'Mapbox API'],
      problem: 'Excessive lease contract negotiation latency causing premium business properties to sit vacant for months.',
      solution: 'Deployed a custom digital tenant portal with automated e-signature pipelines and preventative smart IoT maintenance alert logs.',
      metrics: [
        { label: 'Revenue Growth', val: '+45% Monthly Lease Signings' },
        { label: 'Efficiency Increase', val: '3.2x Vacancy Turnovers' },
        { label: 'Cost Reduction', val: '18% Inspection Fees Cut' },
        { label: 'User Growth', val: '450k Active Corporate Tenants' }
      ],
      color: 'border-teal-200 bg-teal-50/20'
    },
    {
      id: 'cs3',
      title: 'Aura Headless Global Commerce',
      industry: 'Retail Ecosystems',
      techStack: ['Next.js', 'Stripe', 'GraphQL', 'Tailwind CSS'],
      problem: 'High retail cart dismissal rates (78%) stemming from slow page response times exceeding 4.5 seconds.',
      solution: 'Re-engineered a headless static-rendered React storefront, pre-packaging catalog query results under a rapid 150ms standard.',
      metrics: [
        { label: 'Revenue Growth', val: '+$15.4M Annual Gross Sales' },
        { label: 'Efficiency Increase', val: 'Sub-150ms Page Loads Established' },
        { label: 'Cost Reduction', val: '22% Drop in Retargeting Costs' },
        { label: 'User Growth', val: '1.2M Global Shoppers Served' }
      ],
      color: 'border-[#397A56]/30 bg-[#397A56]/5'
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Decorative grids */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-mwi-base via-mwi-tint-30 to-mwi-base" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/50 shadow-xs">
            <Sparkles size={11} className="text-[#397A56]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              RELIABLE SHIPMENTS IN DEPLOYMENT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Premium Case Studies & Enterprise Portfolio
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Real measurable business impact engineered for multi-million dollar corporations worldwide.
          </p>
        </div>

        {/* 3 columns list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.025, y: -4 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  opacity: { duration: 0.5, delay: idx * 0.08 },
                  y: { duration: 0.5, delay: idx * 0.08 },
                  scale: { type: "spring", stiffness: 350, damping: 25 }
                }}
                className={`group relative rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between min-h-[500px] hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-xs hover:shadow-lg`}
                id={`case-study-${item.id}`}
              >
                {/* Visual order decoration */}
                <div className="space-y-4">
                  
                  {/* Category Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#397A56] bg-emerald-50/50 px-2.5 py-1 rounded-full uppercase">
                      {item.industry}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-[#397A56] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={12} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-black text-slate-900 leading-tight">
                    {item.title}
                  </h3>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-mono text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Problem & Solution block */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase font-black">
                        <AlertCircle size={11} className="text-rose-500" />
                        <span>Business Problem</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        {item.problem}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase font-black">
                        <Cpu size={11} className="text-[#397A56]" />
                        <span>Solution Provided</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Metrics list wrapper */}
                <div className="pt-4 border-t border-slate-200/50 mt-4 space-y-2">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    VERIFIED ROI PERFORMANCE STATS:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-white border border-slate-150 p-2.5 rounded-xl shadow-xs">
                        <span className="block text-[8px] font-mono text-slate-400 uppercase leading-none">{m.label}</span>
                        <span className="block text-[11px] font-display font-black text-slate-800 mt-1 leading-tight">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

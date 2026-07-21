import { motion } from 'motion/react';
import { HelpCircle, Sparkles, ArrowRight, Briefcase, Award, Zap, Cloud, Shield, HeartHandshake, MessageSquare, ChevronRight } from 'lucide-react';

interface Differentiator {
  title: string;
  desc: string;
  icon: any;
}

export function WhyChooseUs() {

  const differentiators: Differentiator[] = [
    { title: 'Business-First Approach', desc: 'We align raw technical outputs directly with your corporate KPIs, conversion statistics, and operating margins to ensure a clear financial ROI.', icon: Briefcase },
    { title: 'Engineering Excellence', desc: 'Writing strictly typed, air-gapped, pristine TypeScript codebases following military-grade architectural practices.', icon: Award },
    { title: 'AI-Driven Innovation', desc: 'Directly integrating intelligent LLMs, cognitive assistants, predictive analytics models, and advanced automation pipelines.', icon: Zap },
    { title: 'Scalable Solutions', desc: 'Engineering modular container pipelines and distributed cloud networks capable of supporting millions of active sessions.', icon: Cloud },
    { title: 'International Delivery', desc: 'Strategically matching high-authority Consulting Hubs in London/Dubai with our state-of-the-art offshore R&D centers.', icon: Sparkles },
    { title: 'Quality-Focused Processes', desc: 'Enforcing standardized testing coverage, complete regression validations, and strict performance latency metrics.', icon: Shield },
    { title: 'Long-Term Partnerships', desc: 'Advisory structures supporting our client partners long after product launch to manage scale, security, and updates.', icon: HeartHandshake },
    { title: 'Transparent Communication', desc: 'Providing absolute visibility with comprehensive sprint boards, weekly audits, direct communication channels, and clear logs.', icon: MessageSquare },
    { title: 'Agile Execution', desc: 'Using iterative rapid sprints to roll out complete functional software features in recorded weeks rather than months.', icon: ChevronRight }
  ];

  const criteriaList = [
    {
      id: 0,
      title: 'Service Scope & Depth',
      metawave: 'Enterprise codebases, custom SaaS platforms, AI-driven pipelines, and high-throughput cloud middleware.',
      agency: 'Simple marketing landing layouts, basic WordPress templates, and static digital brochures.',
      freelancer: 'Isolated bug adjustments, fragile scripts, and short-term code overrides.',
      detail: 'MetaWave designs deep architectural environments, whereas typical contractors supply superficial templates.'
    },
    {
      id: 1,
      title: 'Reliability & IP Trust',
      metawave: 'Full-time corporate engineers, strict legally-binding NDAs, complete IP ownership assignment, and SECP filing backing.',
      agency: 'Fluid, high-turnover freelancer staffing pools, ambiguous templates, and prolonged onboarding times.',
      freelancer: 'High delivery risks, sudden visual dropouts, and zero statutory legal assets or enforcement recourse.',
      detail: 'Our corporate registration protects your IP absolutely. We support client operations 24/7 without developer dependency risks.'
    },
    {
      id: 2,
      title: 'Engineering Rigour',
      metawave: 'Pristine TypeScript, rigorous ESLint syntax compliance, automated regression testing, and dense architecture wikis.',
      agency: 'Standard open-source boilerplates, minimal testing, and thin developer-facing documentation logs.',
      freelancer: 'Unstable or undocumented scripts, manual file transfers, and highly varying technology standards.',
      detail: 'Every single file we ship compiles cleanly through automated pipelines to ensure seamless updates and code handovers.'
    },
    {
      id: 3,
      title: 'Support Compliance SLA',
      metawave: 'Proactive round-the-clock server health tracking, rapid hotfix staging paths, and dedicated strategy advisors.',
      agency: 'Standard operating hours only. Urgent weekend outages remain ignored until standard business hours resume.',
      freelancer: 'Asynchronous, highly delayed email cycles with zero availability indicators or server monitoring tools.',
      detail: 'We provide immediate deployment paths and telemetry alerts so that your systems experience absolute maximum uptime.'
    }
  ];

  return (
    <section id="why-metawave" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Background soft color blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.012] blur-[110px]" />
        <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-slate-500/[0.012] blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs">
            <HelpCircle size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              THE METAWAVE DIFFERENCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            A New Paradigm of <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Technology Delivery</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            By combining high-end consulting leadership with rigid onshore engineering standards, we eliminate common software delivery bottlenecks.
          </p>
        </div>

        {/* 9 Corporate Differentiators Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {differentiators.map((diff, dIdx) => {
            const DiffIcon = diff.icon;
            
            // Refined corporate color scheme mapping that aligns with MetaWave green/charcoal
            const colors = [
              { text: 'text-[#326E45]', bg: 'bg-[#326E45]/8', border: 'border-[#326E45]/15', badge: 'bg-[#326E45]/6 text-[#326E45]', status: 'ALIGN_KPI' },
              { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', badge: 'bg-indigo-50 text-indigo-700', status: 'MIL_SPEC' },
              { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', badge: 'bg-purple-50 text-purple-700', status: 'COGNITIVE' },
              { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', badge: 'bg-blue-50 text-blue-700', status: 'POD_SCALE' },
              { text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100', badge: 'bg-sky-50 text-sky-700', status: 'GLOBAL_RND' },
              { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', badge: 'bg-emerald-50 text-emerald-700', status: 'TEST_100' },
              { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100', badge: 'bg-teal-50 text-teal-700', status: 'LONG_TERM' },
              { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-150', badge: 'bg-slate-50 text-slate-700', status: 'LIVE_AUDIT' },
              { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', badge: 'bg-amber-50 text-amber-700', status: 'RAPID_ITER' },
            ][dIdx] || { text: 'text-[#326E45]', bg: 'bg-[#326E45]/8', border: 'border-[#326E45]/15', badge: 'bg-[#326E45]/6 text-[#326E45]', status: 'ACTIVE' };

            return (
              <motion.div 
                key={diff.title}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative p-6.5 rounded-2xl border border-slate-200/80 bg-white hover:border-[#326E45]/30 hover:shadow-[0_16px_36px_rgba(50,110,69,0.06)] transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
              >
                {/* Modern subtle corner gradient accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#326E45]/[0.02] to-transparent rounded-bl-full pointer-events-none group-hover:from-[#326E45]/[0.06] transition-all duration-300" />
                
                <div className="space-y-4.5">
                  {/* Card Header with Icon & Tech Meta Node */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} transition-all duration-300 group-hover:scale-105`}>
                      <DiffIcon size={19} strokeWidth={2.2} />
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider ${colors.badge}`}>
                        {colors.status}
                      </span>
                      <span className="font-mono text-[9px] font-extrabold tracking-widest text-slate-400 group-hover:text-[#326E45] transition-colors">
                        [0{dIdx + 1}]
                      </span>
                    </div>
                  </div>

                  {/* Colored Headings tailored for corporate design */}
                  <div className="space-y-2">
                    <h4 className="text-[14px] sm:text-[15px] font-display font-extrabold text-[#245032] tracking-tight leading-snug group-hover:text-[#326E45] transition-colors">
                      {diff.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom line highly-structured decorative indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#326E45]/50 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#326E45]/80"></span>
                    </span>
                    <span className="text-[8.5px] font-mono tracking-wider text-slate-400 font-bold uppercase select-none group-hover:text-slate-500">
                      SYSTEM_OK // METRICS
                    </span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#326E45]/5 text-slate-400 group-hover:text-[#326E45] border border-slate-100/80 group-hover:border-[#326E45]/20 flex items-center justify-center transition-all shadow-3xs shrink-0">
                    <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
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

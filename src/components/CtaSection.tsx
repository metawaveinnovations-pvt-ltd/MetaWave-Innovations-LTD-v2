import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

// Newly generated high-fidelity asset path
const enterpriseDashboardMockup = '/src/assets/images/enterprise_dashboard_mockup_1782045880160.jpg';

interface CtaSectionProps {
  onCtaclick: (sectionId: string) => void;
}

export function CtaSection({ onCtaclick }: CtaSectionProps) {
  return (
    <section className="py-24 bg-white border-b border-slate-200/50 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[30%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#326E45]/[0.015] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.015] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / Info Col */}
          <div className="lg:col-span-7 xl:col-span-6 text-left space-y-6">
            
            {/* Glowing Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/50 shadow-3xs">
              <Sparkles size={11} className="text-[#326E45] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
                Start Your Transformation Project
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
              Ready To Build Your Next <br />
              <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#0F172A] bg-clip-text text-transparent">
                Custom Digital Product?
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-xl">
              Partner with MetaWave Innovations to launch highly secure, compliant, and performant corporate software frameworks engineered for measurable operational growth.
            </p>

            {/* Core SLA checklist row inside */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2 text-xs font-bold text-slate-850">
                <span className="p-0.5 rounded-full bg-emerald-50 text-[#326E45] mt-0.5 shrink-0">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </span>
                <div className="space-y-0.5">
                  <span className="block leading-none font-black text-slate-800">100% IP Code Ownership</span>
                  <p className="text-[10px] font-normal text-slate-450 leading-normal">Full transfer of developer copyrights in Pakistan and abroad.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs font-bold text-slate-850">
                <span className="p-0.5 rounded-full bg-emerald-50 text-[#326E45] mt-0.5 shrink-0">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </span>
                <div className="space-y-0.5">
                  <span className="block leading-none font-black text-slate-800">Dedicated SLA Pods</span>
                  <p className="text-[10px] font-normal text-slate-450 leading-normal">Exclusive full-stack developers allotted completely to your project.</p>
                </div>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => onCtaclick('contact')}
                className="px-8 py-4 w-full sm:w-auto rounded-xl text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#326E45] to-[#0F172A] hover:brightness-105 transition-all duration-300 shadow-md shadow-[#326E45]/10 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Book Free Strategy SLA</span>
                <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button
                onClick={() => onCtaclick('contact')}
                className="px-8 py-4 w-full sm:w-auto rounded-xl text-xs font-bold tracking-wider text-slate-700 hover:text-slate-900 border border-slate-250 hover:border-slate-350 bg-white hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Get Custom Proposal</span>
              </button>
            </div>

          </div>

          {/* Right Imagery / Mockup Showcase Column */}
          <div className="lg:col-span-5 xl:col-span-6 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Visual ambient soft shadow blur on background */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#326E45]/5 to-emerald-500/5 rounded-[2.5rem] blur-2xl opacity-70" />

            {/* Detailed browser-like frame */}
            <div className="relative w-full max-w-md bg-slate-900 p-2 sm:p-2.5 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden group">
              
              {/* Top notch browser header */}
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-800/80 mb-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                
                <div className="px-6 py-0.5 rounded bg-slate-800/60 font-mono text-[8px] text-slate-450 tracking-wide">
                  secure_dashboard.metawave.app
                </div>
                
                <div className="w-4 h-4" />
              </div>

              {/* Core Image container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10]">
                <img 
                  src={enterpriseDashboardMockup} 
                  alt="MetaWave Enterprise Dashboard Control Center" 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Interactive floating label metric */}
              <div className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-md max-w-[170px] space-y-1 text-left hidden sm:block">
                <span className="text-[7.5px] font-mono text-slate-400 font-extrabold uppercase tracking-wider block">SYSTEM LATENCY</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-slate-900 tracking-tight">4.82ms</span>
                  <span className="text-[8px] font-mono font-black text-[#326E45] bg-emerald-50 px-1 py-0.5 rounded leading-none uppercase">STABLE</span>
                </div>
              </div>

              {/* Interactive bottom bar stamp */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/50 flex justify-between items-center px-2 text-[8px] font-mono text-slate-500">
                <span>ENCRYPTED_SSL // TLS-1.3</span>
                <span>METRICS_SERVICE ACTIVE</span>
              </div>
              
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}


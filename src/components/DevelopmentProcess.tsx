import { motion } from 'motion/react';
import { CheckCircle2, Award, Zap, HeartHandshake, Compass, Activity, ShieldCheck, Box, MessageSquare } from 'lucide-react';

export function DevelopmentProcess() {
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Consultation',
      tag: 'OBJECTIVES REVIEW',
      icon: MessageSquare,
      description: 'Engaging in detailed consultations to thoroughly comprehend your business strategy, legacy bottlenecks, and regulatory standards. We translate operational aims into a structured project scope roadmap.'
    },
    {
      step: '02',
      title: 'Research & Analysis',
      tag: 'FEASIBILITY AUDIT',
      icon: Compass,
      description: 'Conducting in-depth user trends study, data integrity audits, and rigorous technical feasibility checks. This ensures your custom modules are built for maximum target efficiency and absolute performance boundaries.'
    },
    {
      step: '03',
      title: 'Solution Architecture',
      tag: 'SCHEMAS & DIAGRAMS',
      icon: Box,
      description: 'Drafting high-precision system diagrams, database relation schemas, API payload structures, and finalising cloud hosting technology stacks. All database setups are completed before coding starts.'
    },
    {
      step: '04',
      title: 'Design & Development',
      tag: 'PRISTINE ENGINEERING',
      icon: Zap,
      description: 'Our senior systems developers craft military-grade, clean TypeScript code in parallel modules styled with responsive, high-contrast, beautiful Tailwind CSS utility classes.'
    },
    {
      step: '05',
      title: 'Quality Assurance & Validation',
      tag: 'STRESS DIAGNOSTICS',
      icon: ShieldCheck,
      description: 'Subjecting all compiled modules to automated end-to-end unit tests, manual audits, and extreme performance diagnostics. We target a rigid 99.99% build stability pass mandate.'
    },
    {
      step: '06',
      title: 'Deployment & Continuous Improvement',
      tag: 'SLA DEPLOYMENT',
      icon: Activity,
      description: 'Deploying secure containers to host servers using automated zero-downtime CI/CD orchestration. We establish active performance alerts and continue to provide long-term structural maintenance.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Radial soft ambient background flares */}
      <div className="absolute inset-0 pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }}>
        <div className="absolute top-[25%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.015] blur-[110px]" />
        <div className="absolute bottom-[25%] right-[-10%] w-[450px] h-[450px] rounded-full bg-slate-500/[0.015] blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/50 shadow-xs">
            <CheckCircle2 size={11} className="text-[#397A56]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#397A56] uppercase">
              DELIVERY SYSTEMATIC PROTOCOL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Premium Six-Stage Development Methodology
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Our meticulously structured technology pipeline guarantees absolute design precision, bulletproof systems scalability, and transparent progress reports at every turn.
          </p>
        </div>

        {/* Timeline body with vertical linking line */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          
          {/* Central spine line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-200 via-emerald-250 to-slate-200 -translate-x-1/2" />
          
          <div className="space-y-12">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const StepIcon = step.icon;

              return (
                <div key={step.step} className="relative flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 items-center min-h-[90px]">
                  
                  {/* Circle Step Number Indicator inside the Spine */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-10 h-10 rounded-full bg-slate-900 border-4 border-white text-white font-mono text-xs font-black flex items-center justify-center shadow-md shadow-[#397A56]/25 hover:bg-[#397A56] transition-colors cursor-help group"
                    >
                      <span className="group-hover:hidden">{step.step}</span>
                      <StepIcon size={12} className="hidden group-hover:block" />
                    </motion.div>
                  </div>

                  {/* Left Column Card (Even indices) */}
                  <div className={`col-span-5 w-full ${isEven ? 'block' : 'hidden md:block md:invisible'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45 }}
                      className="bg-white border border-slate-200 p-5 rounded-2xl text-left shadow-2xs hover:border-[#397A56]/40 hover:shadow-md transition-all duration-300 pl-14 md:pl-5 group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#397A56] to-[#2F6547] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[8px] font-mono font-bold text-[#397A56] tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                        STAGE {step.step} // {step.tag}
                      </span>
                      <h3 className="text-xs sm:text-sm font-sans font-black text-slate-800 mt-2.5 mb-1.5 group-hover:text-[#397A56] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spine Center Gutter */}
                  <div className="hidden md:block col-span-2" />

                  {/* Right Column Card (Odd indices) */}
                  <div className={`col-span-5 w-full ${!isEven ? 'block' : 'hidden md:block md:invisible'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45 }}
                      className="bg-white border border-slate-200 p-5 rounded-2xl text-left shadow-2xs hover:border-[#397A56]/40 hover:shadow-md transition-all duration-300 pl-14 md:pl-5 group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#397A56] to-[#2F6547] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[8px] font-mono font-bold text-[#2F6547] tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                        STAGE {step.step} // {step.tag}
                      </span>
                      <h3 className="text-xs sm:text-sm font-sans font-black text-slate-800 mt-2.5 mb-1.5 group-hover:text-[#397A56] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Consultation Call block */}
        <div className="mt-16 text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-505 font-bold uppercase shadow-2xs">
            <HeartHandshake size={13} className="text-[#397A56]" />
            <span>Average Onboarding SLA: 14 Days from technical architecture confirmation</span>
          </span>
        </div>

      </div>
    </section>
  );
}

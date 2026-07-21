import { motion } from 'motion/react';
import { 
  Cpu, 
  HeartPulse, 
  Home, 
  Scale, 
  BarChart3, 
  ShoppingBag, 
  GraduationCap, 
  FileCheck, 
  Rocket, 
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function Industries() {
  const targetIndustries = [
    { 
      name: 'Technology Sector', 
      desc: 'Partnering with software corporations and digital creators to ship core SaaS platforms, fast API schemas, and cloud database pools.', 
      icon: Cpu, 
      tag: 'TECH R&D ACCELERATION' 
    },
    { 
      name: 'Healthcare Providers', 
      desc: 'Deploying patient database dashboards, telehealth stream routers, and automated clinical metrics complying with strict regulations.', 
      icon: HeartPulse, 
      tag: 'COMPLIANT ENGINEERING' 
    },
    { 
      name: 'Real Estate Networks', 
      desc: 'Modernising custom asset lease-signing pipelines, automated rent splits, and building maintenance alert systems.', 
      icon: Home, 
      tag: 'YIELD OPTIMISATION' 
    },
    { 
      name: 'Professional Services', 
      desc: 'Providing consulting organizations, law firms, and advisory groups with automated operational workspaces and paper workflows.', 
      icon: Scale, 
      tag: 'WORKFLOW REDUCTION' 
    },
    { 
      name: 'Financial Services', 
      desc: 'Build high-security transaction ledgers, currency-exchanges, and live trend monitors keeping client data air-gapped.', 
      icon: BarChart3, 
      tag: 'ZERO-TRUST PLATFORMS' 
    },
    { 
      name: 'Retail & E-Commerce', 
      desc: 'Re-engineering bloated checkout templates into high-performance headless React models loading under a standard 150ms benchmark.', 
      icon: ShoppingBag, 
      tag: 'HEADLESS CONVERSIONS' 
    },
    { 
      name: 'Educational Institutions', 
      desc: 'Launching stable e-learning hubs, student profiles, syllabus builders, and video workspace configurations.', 
      icon: GraduationCap, 
      tag: 'E-LEARNING SYSTEMS' 
    },
    { 
      name: 'Government & Public Sector', 
      desc: 'Engineering accessible service directories, public records indices, and secure database clusters adhering to national standards.', 
      icon: FileCheck, 
      tag: 'COMPLIANT REGISTRIES' 
    },
    { 
      name: 'Start-ups, SMEs & Enterprises', 
      desc: 'We support all organisational sizes, scaling from agile MVP prototyping in record weeks up to complex multi-tier enterprise systems.', 
      icon: Building2, 
      tag: 'SECURE ORCHESTRATION' 
    }
  ];

  return (
    <section id="industries" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.012] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
            <Sparkles size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              SECTOR-SPECIFIC VERTICALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Tailored Solutions For Industry Leaders
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            We adapt our core components and development frameworks to meet the strict regulatory, security, and velocity requirements of your sector.
          </p>
        </div>

        {/* Industries Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {targetIndustries.map((ind, idx) => {
            const IndustryIcon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between h-[230px] hover:bg-white hover:border-slate-350 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left"
                id={`industry-${idx}`}
              >
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-250 flex items-center justify-center group-hover:bg-emerald-50/50 group-hover:border-emerald-250/50 transition-all duration-300">
                      <IndustryIcon size={16} className="text-[#326E45] group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase leading-none">
                      {ind.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#326E45] transition-colors leading-tight">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal mt-1 flex-grow">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>METAMAVE INDUSTRY MATRIX</span>
                  <a href="#contact" className="text-[#326E45] font-bold flex items-center gap-0.5 group/arrow hover:text-slate-900 transition-all cursor-pointer">
                    <span>SLA Core</span>
                    <ArrowRight size={10} className="transition-transform group-hover/arrow:translate-x-0.5" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

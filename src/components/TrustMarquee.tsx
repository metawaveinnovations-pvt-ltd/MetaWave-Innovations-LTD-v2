import React from 'react';
import { 
  Atom, 
  Layers, 
  Flame, 
  Smartphone, 
  Hexagon, 
  Code2, 
  Server, 
  Database,
  Cpu,
  Workflow,
  Shield,
  Terminal,
  FileCode,
  Binary
} from 'lucide-react';

const techCategories = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    icon: Code2,
    color: 'text-emerald-700 bg-emerald-50/90 border-emerald-200/80 hover:border-emerald-400',
    dotColor: 'bg-emerald-500',
    glowColor: 'shadow-[0_2px_10px_rgba(16,185,129,0.1)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.2)]',
    items: [
      { name: 'HTML5', icon: FileCode, colorClass: 'text-orange-500' },
      { name: 'CSS3', icon: Layers, colorClass: 'text-blue-500' },
      { name: 'JavaScript', icon: Code2, colorClass: 'text-yellow-500' },
      { name: 'React.js', icon: Atom, colorClass: 'text-cyan-500' },
      { name: 'Angular', icon: Shield, colorClass: 'text-rose-600' },
    ]
  },
  {
    id: 'backend',
    label: 'BACKEND',
    icon: Server,
    color: 'text-blue-700 bg-blue-50/90 border-blue-200/80 hover:border-blue-400',
    dotColor: 'bg-blue-500',
    glowColor: 'shadow-[0_2px_10px_rgba(59,130,246,0.1)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.2)]',
    items: [
      { name: 'Node.js', icon: Hexagon, colorClass: 'text-emerald-600' },
      { name: 'Express.js', icon: Terminal, colorClass: 'text-slate-800' },
      { name: 'PHP', icon: FileCode, colorClass: 'text-indigo-500' },
      { name: 'Laravel', icon: Flame, colorClass: 'text-rose-500' },
      { name: 'ASP.NET Core', icon: Server, colorClass: 'text-purple-600' },
    ]
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    icon: Smartphone,
    color: 'text-sky-700 bg-sky-50/90 border-sky-200/80 hover:border-sky-400',
    dotColor: 'bg-sky-500',
    glowColor: 'shadow-[0_2px_10px_rgba(14,165,233,0.1)] hover:shadow-[0_4px_16px_rgba(14,165,233,0.2)]',
    items: [
      { name: 'Flutter', icon: Smartphone, colorClass: 'text-sky-500' },
      { name: 'React Native', icon: Atom, colorClass: 'text-cyan-500' },
    ]
  },
  {
    id: 'database',
    label: 'DATABASE',
    icon: Database,
    color: 'text-teal-700 bg-teal-50/90 border-teal-200/80 hover:border-teal-400',
    dotColor: 'bg-teal-500',
    glowColor: 'shadow-[0_2px_10px_rgba(20,184,166,0.1)] hover:shadow-[0_4px_16px_rgba(20,184,166,0.2)]',
    items: [
      { name: 'MongoDB', icon: Server, colorClass: 'text-emerald-500' },
      { name: 'MySQL', icon: Database, colorClass: 'text-blue-600' },
    ]
  },
  {
    id: 'ai-automation',
    label: 'AI & AUTOMATION',
    icon: Cpu,
    color: 'text-purple-700 bg-purple-50/90 border-purple-200/80 hover:border-purple-400',
    dotColor: 'bg-purple-500',
    glowColor: 'shadow-[0_2px_10px_rgba(168,85,247,0.1)] hover:shadow-[0_4px_16px_rgba(168,85,247,0.2)]',
    items: [
      { name: 'Python', icon: Binary, colorClass: 'text-yellow-600' },
      { name: 'AI Agents', icon: Cpu, colorClass: 'text-teal-600' },
      { name: 'AI Workflows', icon: Workflow, colorClass: 'text-indigo-600' },
    ]
  }
];

export function TrustMarquee() {
  // Triple the list to ensure the marquee fills even giant widescreen displays and loops seamlessly
  const marqueeList = [...techCategories, ...techCategories, ...techCategories];

  return (
    <section id="trustees" className="py-10 bg-[#FAFBFD] border-y border-slate-200/50 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-[#326E45] via-[#245032] to-slate-800 bg-clip-text text-transparent select-none drop-shadow-xs">
          VETTED GLOBAL ENTERPRISE STACK & COMPLIANT CLOUD PARTNERS
        </span>
        <h2 className="mt-1 text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Languages & Technologies Stack
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-medium">
          Our specialized development ecosystem engineered for industry-grade performance, high-density AI modeling, and scalable cloud orchestration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200/50 p-4.5 shadow-xs flex flex-col md:flex-row md:items-center gap-4 relative overflow-hidden">
          
          {/* Infinite Scrolling Marquee Wrapper */}
          <div className="relative flex overflow-hidden w-full select-none rounded-xl py-1">
            {/* Subtle inner fade overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none" />

            {/* Marquee Track 1 */}
            <div className="flex shrink-0 items-center gap-11 pr-11 min-w-max animate-[marquee_50s_linear_infinite]">
              {marqueeList.map((category, idx) => (
                <React.Fragment key={`track1-${idx}`}>
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Category Label badge with beautiful focused design and custom shadow */}
                    <div className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-extrabold tracking-wider border uppercase ${category.color} ${category.glowColor} flex items-center gap-2 bg-gradient-to-br transition-all duration-300 hover:scale-[1.04]`}>
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${category.dotColor} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${category.dotColor}`}></span>
                      </span>
                      {category.icon && <category.icon size={13} className="shrink-0 opacity-90" />}
                      <span>{category.label}</span>
                    </div>
                    {/* Inline items of this category */}
                    <div className="flex items-center gap-3">
                      {category.items.map((item, itemIdx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={itemIdx}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50/60 border border-slate-200/40 hover:border-[#326E45]/30 hover:bg-[#326E45]/5 hover:scale-[1.02] transition-all duration-200 shadow-3xs"
                          >
                            <Icon className={`${item.colorClass} shrink-0`} size={16} />
                            <span className="text-xs sm:text-[13.5px] font-sans font-bold text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Modern dot/slash category separator */}
                  <span className="text-slate-300 font-bold px-1 shrink-0 select-none text-xl">/</span>
                </React.Fragment>
              ))}
            </div>

            {/* Marquee Track 2 (Identical loop duplicate for perfect continuity) */}
            <div className="flex shrink-0 items-center gap-11 pr-11 min-w-max animate-[marquee_50s_linear_infinite]" aria-hidden="true">
              {marqueeList.map((category, idx) => (
                <React.Fragment key={`track2-${idx}`}>
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Category Label badge with beautiful focused design and custom shadow */}
                    <div className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-extrabold tracking-wider border uppercase ${category.color} ${category.glowColor} flex items-center gap-2 bg-gradient-to-br transition-all duration-300 hover:scale-[1.04]`}>
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${category.dotColor} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${category.dotColor}`}></span>
                      </span>
                      {category.icon && <category.icon size={13} className="shrink-0 opacity-90" />}
                      <span>{category.label}</span>
                    </div>
                    {/* Inline items of this category */}
                    <div className="flex items-center gap-3">
                      {category.items.map((item, itemIdx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={itemIdx}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50/60 border border-slate-200/40 hover:border-[#326E45]/30 hover:bg-[#326E45]/5 hover:scale-[1.02] transition-all duration-200 shadow-3xs"
                          >
                            <Icon className={`${item.colorClass} shrink-0`} size={16} />
                            <span className="text-xs sm:text-[13.5px] font-sans font-bold text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Modern dot/slash category separator */}
                  <span className="text-slate-300 font-bold px-1 shrink-0 select-none text-xl">/</span>
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

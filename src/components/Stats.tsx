import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, CheckCircle2, Globe2, Briefcase, Building2, ShieldCheck } from 'lucide-react';

export function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const customStats = [
    { value: '150+', label: 'Enterprise Projects', description: 'Enterprise-grade custom systems launched globally', icon: Briefcase, color: 'text-[#326E45]', bg: 'bg-[#326E45]/10' },
    { value: '98%', label: 'Delivery Success Rate', description: 'Uncompromising standard of elite performance', icon: CheckCircle2, color: 'text-[#326E45]', bg: 'bg-[#326E45]/10' },
    { value: '12+', label: 'Industries Served', description: 'Domain solutions built for operational scale', icon: Building2, color: 'text-[#326E45]', bg: 'bg-[#326E45]/10' },
    { value: '4+', label: 'Countries Reached', description: 'Empowering enterprise visionaries worldwide', icon: Globe2, color: 'text-[#326E45]', bg: 'bg-[#326E45]/10' },
    { value: '5+', label: 'International Certification', description: 'Compliant with peak global industry standards', icon: Award, color: 'text-[#326E45]', bg: 'bg-[#326E45]/10' },
  ];

  return (
    <section className="py-20 bg-mwi-tint-40 border-y border-mwi-shade-10/40 relative overflow-hidden" ref={containerRef}>
      
      {/* Background ambient radial lights */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#326E45]/[0.02] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Intro Tagline */}
        <div className="text-center md:text-left mb-12 max-w-2xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#326E45] block mb-2">
            COMPANY IMPACT & VALUE GENERATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900">
            Engineered For Measurable Business Growth 
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Vetted operational statistics proving the scalable strength of MetaWave's modern software frameworks.
          </p>
        </div>

        {/* 5 columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {customStats.map((stat, idx) => {
            return (
              <StatCard
                key={idx}
                stat={stat}
                index={idx}
                startTrigger={isInView}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

interface StatCardProps {
  key?: number | string;
  stat: { 
    value: string; 
    label: string; 
    description: string; 
    icon: any; 
    color: string; 
    bg: string; 
  };
  index: number;
  startTrigger: boolean;
}

function StatCard({ stat, index, startTrigger }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    // Numerical counter regex parser
    const numericPart = parseInt(stat.value, 10);
    if (isNaN(numericPart)) {
      setDisplayValue(1);
      return;
    }

    let start = 0;
    const end = numericPart;
    const duration = 1200; // ms
    const stepTime = 15; // fixed fast step interval

    const timer = setInterval(() => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startTrigger, stat.value]);

  // Determine static markers
  const hasPlus = stat.value.includes('+');
  const hasPercent = stat.value.includes('%');
  const hasM = stat.value.includes('M');

  const CardIcon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={startTrigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between h-[195px] shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Decorative accent color underline on hover */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#326E45] to-[#245032] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />

      <div className="flex justify-between items-start">
        <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center transition-all group-hover:scale-105`}>
          <CardIcon size={16} className={stat.color} />
        </div>
        <span className="text-[9px] font-mono text-slate-400 font-bold tracking-widest">
          METRIC 0{index + 1}
        </span>
      </div>

      <div className="space-y-1 mt-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-display font-black tracking-tight text-slate-900 group-hover:text-[#326E45] transition-colors">
            {displayValue === 0 ? parseInt(stat.value, 10) || stat.value : displayValue}
            {hasM && 'M'}
            {hasPlus && '+'}
            {hasPercent && '%'}
          </span>
        </div>
        
        <p className="text-xs font-bold text-slate-800 tracking-tight leading-none">
          {stat.label}
        </p>
        <p className="text-[11px] text-slate-500 leading-snug font-normal">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

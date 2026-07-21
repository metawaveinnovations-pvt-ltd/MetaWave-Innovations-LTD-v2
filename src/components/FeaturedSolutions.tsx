import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Users, 
  Layers, 
  BrainCircuit, 
  HeartPulse, 
  Home, 
  GraduationCap, 
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Lock
} from 'lucide-react';

interface FeaturedSolutionsProps {
  onCtaclick: (sectionId: string) => void;
}

export function FeaturedSolutions({ onCtaclick }: FeaturedSolutionsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const businessSolutions = [
    {
      id: 1,
      title: 'Enterprise Software',
      icon: Building2,
      tag: 'OPERATIONAL EXCELLENCE',
      description: 'Custom business platforms built for supreme operational efficiency, streamlined departments, and cross-border workspace logistics.',
      features: ['Unified organizational single-source-of-truth', 'High-density workflow coordinators', 'Audit-ready compliance logging'],
      color: 'from-[#326E45] to-[#20462c]',
      metric: '72% Ops Efficiency Gain',
      textColor: 'text-[#326E45]',
      bgColor: 'bg-emerald-50/70',
      borderColor: 'group-hover:border-emerald-300'
    },
    {
      id: 2,
      title: 'CRM Systems',
      icon: Users,
      tag: 'COMMERCIAL VELOCITY',
      description: 'Manage customers, leads, sales pipelines, and key corporate accounts natively with 360-degree activity stitching.',
      features: ['Automated email sequence pipelines', 'Interactive sales-funnel health panels', 'AI lead-nurturing and touchpoint reminders'],
      color: 'from-teal-600 to-emerald-500',
      metric: '3.2x Lead Conversion Speed',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50/70',
      borderColor: 'group-hover:border-teal-300'
    },
    {
      id: 3,
      title: 'ERP Solutions',
      icon: Layers,
      tag: 'RESOURCE PLANNING',
      description: 'Centralized business management solutions syncing general ledger finances, dynamic supply chains, and procurement lists.',
      features: ['Double-entry automatic banking balance sheets', 'IoT inventory-shortage automated triggers', 'Multi-subsidiary global consolidation'],
      color: 'from-slate-700 to-[#326E45]',
      metric: '18% Supply Overhead Slashed',
      textColor: 'text-slate-800',
      bgColor: 'bg-slate-100',
      borderColor: 'group-hover:border-slate-300'
    },
    {
      id: 4,
      title: 'AI & Automation',
      icon: BrainCircuit,
      tag: 'COGNITIVE ROBOTICS',
      description: 'Identify and automate repetitive back-office work, heavy data entry, and PDF extraction using self-learning pipelines.',
      features: ['Military-grade optical character reading (OCR)', 'Multi-system automated robotic synchronization', 'Large Language Model custom neural agent training'],
      color: 'from-emerald-500 to-teal-500',
      metric: '70% Manual Labor Saved',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/70',
      borderColor: 'group-hover:border-emerald-300'
    },
    {
      id: 5,
      title: 'Healthcare Platforms',
      icon: HeartPulse,
      tag: 'HIPAA & FHIR MEDICAL CORE',
      description: 'Secure, high-performance healthcare management systems, dynamic patient intake hubs, and encrypted telemetry tools.',
      features: ['Rigorous HIPAA-compliant data encryption layers', 'Custom FHIR-standard medical record synchronization', 'Secure electronic patient clinical dashboards'],
      color: 'from-emerald-500 to-teal-500',
      metric: '99.99% Hospital System Uptime',
      textColor: 'text-[#326E45]',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'group-hover:border-emerald-300'
    },
    {
      id: 6,
      title: 'Property Management',
      icon: Home,
      tag: 'REAL ESTATE MODERNIZATION',
      description: 'Centralized tenant, commercial property leasing profiles, lease contract parsing, and preventive maintenance control matrices.',
      features: ['Digital tenant secure banking portals', 'Smart IoT building diagnostic notifications', 'Automated rental invoicing and ledger auditing'],
      color: 'from-amber-500 to-orange-500',
      metric: '45% Faster Ticket Resolution',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50/50',
      borderColor: 'group-hover:border-amber-300'
    },
    {
      id: 7,
      title: 'Education Platforms',
      icon: GraduationCap,
      tag: 'ACADEMIC KNOWLEDGE HUBS',
      description: 'Modern Learning Management Systems (LMS), secure student portals, and adaptive, personalized syllabus paths.',
      features: ['Fluid interactive classrooms and virtual quizzes', 'Real-time peer discussion channels', 'Centralized academic progress tracking dashboard'],
      color: 'from-rose-500 to-pink-500',
      metric: '100k+ Active Learners Ready',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50/50',
      borderColor: 'group-hover:border-rose-300'
    },
    {
      id: 8,
      title: 'E-Commerce Ecosystems',
      icon: ShoppingBag,
      tag: 'HIGH-DENSITY TRANSACTIONS',
      description: 'Enterprise multi-vendor marketplaces, modern headless static storefronts loading instantly, and secure checkout wrappers.',
      features: ['Sub-150ms structural page loading speed', 'PCI-DSS bulletproof customer banking security', 'Multi-currency settlement networks'],
      color: 'from-teal-500 to-[#326E45]',
      metric: '$15.4M Annual Growth Lift',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50/50',
      borderColor: 'group-hover:border-teal-300'
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Delicate layout grids */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-mwi-base via-mwi-tint-30 to-mwi-base" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/60 shadow-xs">
            <Zap size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              Operational Impact Matrices
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Solutions Built For Business Growth
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal">
            We architect bespoke corporate platforms that boost productivity, unlock new digital revenue pipelines, and scale effortlessly on the cloud.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessSolutions.map((sol, index) => {
            const CardIcon = sol.icon;
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 flex flex-col justify-between h-[395px] hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1"
                id={`solution-card-${sol.id}`}
              >
                
                {/* Decorative glow band */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${sol.color} rounded-t-2xl`} />

                <div className="space-y-3.5">
                  {/* Icon & Metrics badge */}
                  <div className="flex items-center justify-between pt-2">
                    <div className={`w-9 h-9 rounded-xl ${sol.bgColor} flex items-center justify-center`}>
                      <CardIcon size={16} className={sol.textColor} />
                    </div>
                    
                    <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <TrendingUp size={10} />
                      <span>{sol.metric}</span>
                    </span>
                  </div>

                  {/* Metadata Tag */}
                  <span className="block text-[8px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
                    {sol.tag}
                  </span>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-base font-display font-black text-slate-900 group-hover:text-[#326E45] transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-[11px] text-slate-550 mt-1 lines-clipped leading-relaxed font-normal">
                      {sol.description}
                    </p>
                  </div>

                  {/* Dynamic checklist */}
                  <div className="space-y-1.5 pt-1.5 border-t border-slate-200/40">
                    <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">CORE CAPABILITIES:</span>
                    {sol.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-[10px] text-slate-600 leading-tight">
                        <CheckCircle size={10} className="text-[#326E45] mt-0.5 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Callout */}
                <div className="pt-2">
                  <button
                    onClick={() => onCtaclick('contact')}
                    className="w-full py-2 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 group-hover:border-[#326E45] group-hover:bg-[#326E45] group-hover:text-white transition-all text-[10px] font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer text-slate-700"
                  >
                    <span>Request Custom Build</span>
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Direct Link to complete consultation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onCtaclick('contact')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#326E45] hover:text-slate-900 group cursor-pointer"
          >
            <span>Need a specialized hybrid system architecture? Let's connect</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}

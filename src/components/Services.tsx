import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  TrendingUp, 
  HelpCircle,
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Settings, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SubService {
  name: string;
  description: string;
}

interface ServiceGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  overview: string;
  subservices: SubService[];
  indexRef: string;
}

export function Services() {
  const [activeGroup, setActiveGroup] = useState<string>('software');

  const serviceCategories: ServiceGroup[] = [
    {
      id: 'software',
      title: 'Software Engineering',
      subtitle: 'SCALABLE ENTERPRISE CODEBASES',
      icon: Code2,
      overview: 'We design, develop, and integrate custom software ecosystems built with strict type safety, modular performance matrices, and durable cloud-native back-ends.',
      indexRef: 'SRV-01',
      subservices: [
        { name: 'Custom Web Applications', description: 'Statically-rendered static layouts and dynamic portals built on React + Vite, designed to load in under 150ms.' },
        { name: 'Enterprise Platforms', description: 'High-availability ERP, CRM, and asset management platforms mapped for multi-department alignment.' },
        { name: 'SaaS Development', description: 'Multi-tenant cloud platform development including secure metering, transaction gateways, and active subscription controllers.' },
        { name: 'API Development', description: 'Rest, gRPC, and GraphQL endpoints styled with rigid schema constraints and bulletproof documentation.' },
        { name: 'System Integration', description: 'Linking isolated enterprise subsystems, active cloud directory protocols, and transaction logs seamlessly.' },
        { name: 'Mobile Applications', description: 'Cross-platform iOS and Android solutions built using Flutter and React Native with beautiful, responsive, native target sizes.' }
      ]
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      subtitle: 'COGNITIVE OPERATIONS & ML',
      icon: BrainCircuit,
      overview: 'We deploy custom cognitive architectures and machine learning systems that automate corporate bottlenecks and derive predictive analytics models.',
      indexRef: 'SRV-02',
      subservices: [
        { name: 'AI Assistants', description: 'Intelligent, semantic prompt workflows and automated customer support interfaces adhering to compliance buffers.' },
        { name: 'Business Automation', description: 'Eliminating routine human clerk entries via optical character recognition and automated content processing engines.' },
        { name: 'Machine Learning Solutions', description: 'Vetted training, fine-tuning, and deployment pipelines using modern libraries to classify operational data.' },
        { name: 'Predictive Analytics', description: 'Identifying business pipeline variances, future stock trends, or tenant inspection cycles using telemetry metrics.' },
        { name: 'Natural Language Systems', description: 'Advanced search interfaces, automatic categorization systems, and GDPR-compliant summarizers.' }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud & Infrastructure',
      subtitle: 'DEVOPS & ZERO-TRUST SCALABILITY',
      icon: Cloud,
      overview: 'Our certified cloud developers engineer high-availability network profiles with active redundancies, secure deployment trees, and steady hosting bills.',
      indexRef: 'SRV-03',
      subservices: [
        { name: 'Cloud Architecture', description: 'Multi-region deployments on AWS, Google Cloud, and Azure configured using advanced Terraform infrastructure rules.' },
        { name: 'DevOps Pipelines', description: 'Continuous integration and continuous delivery (CI/CD) pipelines coupled with end-to-end automated testing verifications.' },
        { name: 'Deployment Orchestration', description: 'Deploying secure Docker containers managed inside Kubernetes clusters for effortless, high-density traffic scalability.' },
        { name: 'Monitoring & Reliability', description: 'Round-the-clock telemetry monitoring and immediate hotfix routing strategies to guarantee 99.99% system availability.' },
        { name: 'Enterprise Scalability', description: 'Auto-scaling networks, horizontal database clustering, and localized content delivery network caches.' }
      ]
    },
    {
      id: 'consultancy',
      title: 'IT Consultancy',
      subtitle: 'STRATEGIC ARCHITECTURAL DESIGN',
      icon: Settings,
      overview: 'We partner with corporate executives to design bulletproof software modernization roadmaps, governance rules, and digital structures.',
      indexRef: 'SRV-04',
      subservices: [
        { name: 'Technology Strategy', description: 'Translating commercial aims into reliable system designs, selecting codebases, and protecting intellectual property.' },
        { name: 'Digital Transformation', description: 'Direct, structured guidance migrating manual legacy real estate, healthcare, or financial sheets into cloud databases.' },
        { name: 'Architecture Planning', description: 'Creating robust system diagrams, data flow schemas, and security boundaries before any code deployment is started.' },
        { name: 'Business Process Optimisation', description: 'Conducting system analysis metrics to strip redundant API queries and improve database performance indexes.' }
      ]
    },
    {
      id: 'growth',
      title: 'Business Growth Systems',
      subtitle: 'CRM & REVENUE ACCELERATION',
      icon: TrendingUp,
      overview: 'We build integrated growth technology products that optimize customer pipelines, automate outreach operations, and track business metrics.',
      indexRef: 'SRV-05',
      subservices: [
        { name: 'CRM Solutions', description: 'Tailored customer relationship platforms with structured lead capture and integrated email marketing automation.' },
        { name: 'Lead Management Systems', description: 'Automated ingestion pipelines that organize, score, and distribute incoming inquiries based on availability.' },
        { name: 'Automation Workflows', description: 'Autonomous communication sequences designed to nurture potential customer relationships securely.' },
        { name: 'Sales Optimisation', description: 'Advanced executive dashboards providing visibility into conversion trends and sales pipeline performance.' }
      ]
    }
  ];

  const currentGroup = serviceCategories.find(g => g.id === activeGroup) || serviceCategories[0];
  const ActiveIcon = currentGroup.icon;

  return (
    <section id="capabilities" className="py-24 bg-mwi-tint-40 border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Background soft glowing elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.015] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#326E45]/[0.015] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
            <Award size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              VETTED TECHNOLOGY SUITE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Enterprise Services & Capabilities
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            MetaWave Innovations delivers premium engineering across five core technology groups, designed to support mission-critical corporate operations.
          </p>
        </div>

        {/* Categories Tab Selectors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto mb-12">
          {serviceCategories.map((group) => {
            const GroupIcon = group.icon;
            const isActive = activeGroup === group.id;
             return (
              <motion.button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                whileHover={{ scale: 1.025, translateY: isActive ? -4 : -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[120px] transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white border-[#326E45] shadow-md -translate-y-1' 
                    : 'bg-white/60 border-slate-200/85 hover:border-slate-350 hover:bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                  isActive ? 'bg-emerald-50 border-emerald-250 text-[#326E45]' : 'bg-slate-50 border-slate-205 text-slate-450'
                }`}>
                  <GroupIcon size={15} />
                </div>

                <div>
                  <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">{group.indexRef}</span>
                  <h3 className={`text-[11px] font-serif font-black leading-tight mt-0.5 ${isActive ? 'text-[#326E45]' : 'text-slate-755'}`}>
                    {group.title}
                  </h3>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Category Display Showcase */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="bg-white border border-slate-250/90 rounded-3xl p-6 sm:p-8 shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column Overview info */}
              <div className="lg:col-span-4 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{currentGroup.subtitle}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-955 flex items-center gap-2">
                    <ActiveIcon size={18} className="text-[#326E45]" />
                    <span>{currentGroup.title}</span>
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                  {currentGroup.overview}
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-[8px] font-mono font-bold text-slate-400 tracking-wider block">DELIVERY ASSURANCE:</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-semibold font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Onshore UK Delivery SLA compliant</span>
                  </div>
                </div>
              </div>

              {/* Right Column Custom Sub-services grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentGroup.subservices.map((sub, sIdx) => (
                  <motion.div 
                    key={sIdx} 
                    whileHover={{ scale: 1.025, y: -2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all duration-300 pointer group/sub text-left space-y-1.5 shadow-3xs hover:shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs font-sans">
                      <ChevronRight size={12} className="text-[#326E45] group-hover/sub:translate-x-0.5 transition-transform" />
                      <span className="group-hover/sub:text-[#326E45] transition-colors">{sub.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal pl-4.5 font-normal">
                      {sub.description}
                    </p>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

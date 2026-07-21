import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Layers, 
  UserCheck, 
  Home, 
  HeartPulse, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Award,
  ShieldAlert,
  Sliders,
  Sparkles
} from 'lucide-react';

export function FeaturedProducts() {
  const [activeProd, setActiveProd] = useState<'crm' | 'erp' | 'hr' | 'prop' | 'care' | 'learn'>('crm');

  const productsList = [
    {
      id: 'crm',
      name: 'MetaCRM',
      label: 'Customer Relationship Platform',
      icon: Users,
      badge: 'SALES VELOCITY',
      roi: '340% Avg. ROI',
      metricTitle: 'Deal Velocity',
      metricVal: '+58% faster',
      bgColor: 'emerald',
      features: [
        'Automated multi-channel client conversion paths',
        'AI real-time lead grading & customer propensity score',
        'Integrated email sequencing & voice record logging'
      ],
      benefits: [
        'Eliminates duplicate client entries completely',
        'Accelerates sales team velocity',
        'Full tracking of forecasted deal pipeline value'
      ],
      previewStats: [
        { label: 'Active Pipeline', val: '$4,810,900' },
        { label: 'Conversion Rate', val: '24.8%' },
        { label: 'Avg Sale Cycle', val: '14 Days' }
      ]
    },
    {
      id: 'erp',
      name: 'MetaERP',
      label: 'Business Operations Platform',
      icon: Layers,
      badge: 'FINANCIAL CONTROL',
      roi: '18% Capital Saved',
      metricTitle: 'Supply Audit',
      metricVal: '0.1s Automated',
      bgColor: 'teal',
      features: [
        'Double-entry automatic ledger reconciliation',
        'IoT inventory supply matching triggers',
        'Multi-subsidiary taxation planning'
      ],
      benefits: [
        'Single database source of truth for global logistics',
        'Audit readiness with cryptographic logs',
        'Ensures multi-currency stability'
      ],
      previewStats: [
        { label: 'Subsidiaries Active', val: '12 Regions' },
        { label: 'Ledger Variance', val: '0.00%' },
        { label: 'Transaction / sec', val: '4,150 /s' }
      ]
    },
    {
      id: 'hr',
      name: 'MetaHR',
      label: 'Human Resource Management',
      icon: UserCheck,
      badge: 'HUMAN CAPITAL',
      roi: '3.1x Onboarding Speed',
      metricTitle: 'Retention Lift',
      metricVal: '+22% annually',
      bgColor: 'slate',
      features: [
        'Automated corporate compliance onboarding checklists',
        'Intelligent payroll disbursements',
        'AI-assisted employee performance reviews'
      ],
      benefits: [
        'Cuts onboarding friction',
        'Transparent feedback loops',
        'Ensures perfect labor regulatory alignment'
      ],
      previewStats: [
        { label: 'Employees Tracked', val: '1,280 FTE' },
        { label: 'SLA Performance', val: '98.5%' },
        { label: 'Payroll Latency', val: '< 2 hours' }
      ]
    },
    {
      id: 'prop',
      name: 'MetaProperty',
      label: 'Property Management Platform',
      icon: Home,
      badge: 'ASSET PERFORMANCE',
      roi: '42% Lower Delinquency',
      metricTitle: 'Yield Optimization',
      metricVal: '+12.5% yield',
      bgColor: 'emerald',
      features: [
        'Integrated contract lease e-signature flow',
        'Preventative tenant maintenance IoT notifications',
        'Centralized automated rent collection'
      ],
      benefits: [
        'Provides perfect lease tracking visibility',
        'Optimizes facility physical lifetime',
        'Frictionless tenant communication portals'
      ],
      previewStats: [
        { label: 'Units Listed', val: '4,500 Units' },
        { label: 'Occupancy Rate', val: '97.2%' },
        { label: 'Collection Rate', val: '99.1%' }
      ]
    },
    {
      id: 'care',
      name: 'MetaCare',
      label: 'Healthcare Management Solution',
      icon: HeartPulse,
      badge: 'PATIENT TRANSFORMATION',
      roi: '70% Intake Cost Cut',
      metricTitle: 'Compliance Score',
      metricVal: '100% HIPAA Strict',
      bgColor: 'teal',
      features: [
        'Secure FHIR-standard medical record indexing',
        'Encrypted HD browser-native telemedicine software',
        'Automatic medical claim pre-checks'
      ],
      benefits: [
        'Strict HIPAA and GDPR regulatory peace of mind',
        'Shortens waiting room dry times',
        'Delivers fluid post-consult care plans'
      ],
      previewStats: [
        { label: 'Patient Record SLA', val: '0.0ms delay' },
        { label: 'Telehealth Quality', val: '1080p WebRTC' },
        { label: 'Billing Speed', val: 'Realtime' }
      ]
    },
    {
      id: 'learn',
      name: 'MetaLearn',
      label: 'Education Management System',
      icon: GraduationCap,
      badge: 'ACADEMIC GROWTH',
      roi: '220% Class Engagement',
      metricTitle: 'Completion Rate',
      metricVal: '92% Average',
      bgColor: 'rose',
      features: [
        'Creative drag-and-drop syllabus trees',
        'Self-paced testing with AI custom questions',
        'Interactive peer learning discussion rooms'
      ],
      benefits: [
        'Allows training of thousands of students safely',
        'Improves student retention & engagement metrics',
        'Provides teachers with deep clinical assessment tools'
      ],
      previewStats: [
        { label: 'Active Students', val: '48,000 Users' },
        { label: 'Average Quiz Score', val: '86.4%' },
        { label: 'System Load Latency', val: '85ms avg' }
      ]
    }
  ];

  const activeProductData = productsList.find(p => p.id === activeProd) || productsList[0];
  const ActiveIcon = activeProductData.icon;

  return (
    <section id="products" className="py-24 bg-slate-50/50 border-b border-slate-200/50 relative overflow-hidden">
      
      {/* Absolute backgrounds */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.012] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#326E45]/[0.012] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs">
            <Award size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              MetaWave Signature Platforms
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Featured Software Products
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Pre-engineered SaaS suites customized to optimize department routines and secure your competitive market edge.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {productsList.map((prod) => {
            const IsActive = activeProd === prod.id;
            const ProductIcon = prod.icon;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveProd(prod.id as any)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${
                  IsActive
                    ? 'bg-gradient-to-r from-[#326E45] to-[#20462c] text-white shadow-[#326E45]/10 border-transparent'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border border-slate-200'
                }`}
              >
                <ProductIcon size={14} />
                <span>{prod.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProd}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-lg relative"
          >
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#326E45] bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  {activeProductData.badge}
                </span>
                
                <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                  <TrendingUp size={10} />
                  <span>{activeProductData.roi}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 flex items-center gap-2 leading-none">
                  <ActiveIcon size={22} className="text-[#326E45]" />
                  <span>{activeProductData.name}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider font-bold">
                  {activeProductData.label}
                </p>
              </div>

              <div className="space-y-4">
                {/* Capabilities list */}
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-black block mb-2">
                    RELIABLE CAPABILITIES
                  </span>
                  <div className="space-y-2">
                    {activeProductData.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-normal">
                        <CheckCircle size={12} className="text-[#326E45] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth ROI Metrics Callout */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 relative overflow-hidden">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold mb-1.5">
                    GUARANTEED ENTERPRISE ROI
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-display font-bold text-slate-900">
                      {activeProductData.roi.split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">
                      leading to {activeProductData.metricVal} improvement in {activeProductData.metricTitle}.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#326E45] hover:bg-[#20462c] transition-all flex items-center gap-1.5 group cursor-pointer shadow-md shadow-[#326E45]/10"
                >
                  <span>Request Custom SLA Sandboxing</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

            {/* Right Interactive Mockup Dashboard Screenshot (Realistic light-mode interface representation) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-slate-200/90 bg-slate-50 shadow-inner p-4 overflow-hidden">
                
                {/* Laptop style frame elements */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#326E45]" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                    {activeProductData.name.toLowerCase()}_production_instance
                  </span>
                </div>

                {/* Dashboard Screenshot content */}
                <div className="space-y-4">
                  
                  {/* Stats list */}
                  <div className="grid grid-cols-3 gap-3">
                    {activeProductData.previewStats.map((statItem, idx) => (
                      <div key={idx} className="bg-white border border-slate-150 p-3 rounded-xl shadow-xs">
                        <span className="block text-[8px] font-mono text-slate-400 uppercase leading-none">{statItem.label}</span>
                        <span className="block text-sm font-display font-black text-slate-900 mt-1">{statItem.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Operational Telemetry Chart */}
                  <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
                        INTELLIGENT COMPLIANCE BENCHMARK LOGS:
                      </span>
                      <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">100% HEALTHY</span>
                    </div>

                    {/* Chart simulator lines */}
                    <div className="relative h-20 w-full flex items-end justify-between gap-1.5 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      {[60, 45, 80, 55, 95, 75, 50, 85, 90, 65, 40, 72, 88].map((val, idx) => (
                        <div key={idx} className="flex-1 bg-slate-200 rounded-sm h-full flex items-end">
                           <div 
                            className="bg-gradient-to-t from-[#326E45] to-emerald-500 w-full rounded-sm"
                            style={{ height: `${val}%` }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono border-t border-slate-100">
                      <span>Server response clock:</span>
                      <span className="font-bold text-slate-800">0.05ms (SLA secured)</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

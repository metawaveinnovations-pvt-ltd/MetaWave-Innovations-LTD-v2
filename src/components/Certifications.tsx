import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, CheckCircle, Scale, Lock, ExternalLink, Link, AlertCircle, HelpCircle, HardDrive, Cpu } from 'lucide-react';

export function Certifications() {
  const [activeGovernanceMenu, setActiveGovernanceMenu] = useState<string>('secp');

  const complianceSections = [
    {
      id: 'secp',
      title: 'SECP Registration',
      subtitle: 'CORPORATE IDENTIFICATION',
      desc: 'MetaWave Innovations (Private) Limited is a fully registered private limited entity under the Securities and Exchange Commission of Pakistan (SECP). We operate in strict compliance with all administrative and corporate directives.',
      provisions: [
        'Registered body status, operating with complete corporate standing',
        'Official memorandum and articles of association on file',
        'Corporate verification available upon formal onboarding request',
        'Transparent shareholding structure satisfying international standards'
      ],
      legalRef: 'SECP Filing Status: Vetted & Active'
    },
    {
      id: 'compliance',
      title: 'Companies Act 2017 Compliance',
      subtitle: 'REGULATORY FRAMEWORK',
      desc: 'We satisfy all obligations outlined in the Companies Act 2017, conducting routine executive audit tracking and filing quarterly financial balances with the appropriate administrative bureaus.',
      provisions: [
        'Annual general meetings (AGM) held in accordance with legal timelines',
        'Strict statutory register maintenance and record tracking',
        'Corporate directors adhere to duty of care and ethical code',
        'Corporate documents available during onboarding and due diligence'
      ],
      legalRef: 'Companies Act 2017: Fully Compliant'
    },
    {
      id: 'tax',
      title: 'Tax Compliance',
      subtitle: 'FISCAL STANDING',
      desc: 'We maintain impeccable standing with state revenue authorities, including the Federal Board of Revenue (FBR) and regional revenue bodies, operating in full compliance with all relevant tax directives.',
      provisions: [
        'Active corporate taxpayer status with verified filings',
        'Strict compliance with sales tax rules on consulting service outputs',
        'Quarterly FBR withholding returns processed on schedule',
        'Corporate tax documents available for audit during partner onboard'
      ],
      legalRef: 'Tax Filings: Current & Disclosed'
    },
    {
      id: 'gdpr',
      title: 'Client Confidentiality & Data Protection',
      subtitle: 'ZERO-TRUST PARADIGM',
      desc: 'Our client relations operate under absolute NDA protections. We incorporate GDPR frameworks and PCI-DSS compliance models as our standard data protection code of conduct.',
      provisions: [
        'Legally-binding intellectual property (IP) assignment contracts',
        'Secure multi-region air-gapping for sensitive codebase access',
        'Strict GDPR user right-to-be-forgotten software pipelines',
        'Complete confidentiality protocols for all corporate transactions'
      ],
      legalRef: 'Data Status: Zero-Leak Policy'
    },
    {
      id: 'qa',
      title: 'QA Framework & Risks',
      subtitle: 'SYSTEM RECOVERIES',
      desc: 'Quality is a governance matter. Our standardized QA practices protect against deployment errors, while our complete Business Continuity models keep operations safe.',
      provisions: [
        'Mandatory ESLint, static types, and automated unit testing steps',
        'Disaster recovery plans with hot-swapping backups',
        'Strategic risk assessments matching corporate liability parameters',
        'Continuous performance and speed stress check milestones'
      ],
      legalRef: 'QA Audit: 99.99% Build Pass Guarantee'
    }
  ];

  const activeSec = complianceSections.find(s => s.id === activeGovernanceMenu) || complianceSections[0];

  return (
    <section id="certifications-compliance" className="py-24 bg-white border-b border-slate-200/50 relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-slate-50/20 via-white to-slate-50/20" />
      <div className="absolute top-[25%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.012] blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/50 shadow-xs">
            <Scale size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              GOVERNANCE & TRUST
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Corporate Compliance & Governance
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            MetaWave Innovations is built on institutional trusts. We operate under rigid legal frameworks, clear tax policies, and bulletproof confidentiality agreements.
          </p>
        </div>

        {/* Security Alert Indicator Banner */}
        <div className="mb-12 max-w-5xl mx-auto p-4 bg-emerald-50/40 border border-emerald-150 rounded-2xl flex items-start gap-3.5 text-left shadow-xs">
          <Shield size={18} className="text-[#326E45] mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 leading-none">Security & Privacy Protocol Compliance</h4>
            <p className="text-[11.5px] text-slate-650 leading-relaxed font-normal">
              In strict adherence to international safety policies and privacy standards, <strong className="text-slate-800">we never publish sensitive documents, registration serials, tax IDs, or private records online.</strong> Full registration archives, legal verifications, and compliance filings are readily shared with authorised partners during onboard reviews and due diligence assessments.
            </p>
          </div>
        </div>

        {/* Dynamic Interactive Governance Tab Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left Column menu selector */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[8px] font-mono font-black text-slate-400 block tracking-widest pl-1 mb-2">
              COMPLIANCE DIRECTORY:
            </span>
            {complianceSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveGovernanceMenu(sec.id)}
                className={`w-full text-left p-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                  activeGovernanceMenu === sec.id
                    ? 'bg-emerald-50 border-emerald-200 text-[#326E45] shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-650'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText size={13} className={activeGovernanceMenu === sec.id ? 'text-[#326E45]' : 'text-slate-400'} />
                  <span>{sec.title}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${activeGovernanceMenu === sec.id ? 'bg-[#326E45]' : 'bg-slate-300'}`} />
              </button>
            ))}
          </div>

          {/* Right Column active info panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGovernanceMenu}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left"
              >
                
                {/* Panel Title & Header */}
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase leading-none">
                      {activeSec.subtitle}
                    </span>
                    <h3 className="text-base font-display font-black text-slate-900 leading-none">
                      {activeSec.title}
                    </h3>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">
                    GOVERNOR ACCREDITED
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {activeSec.desc}
                </p>

                {/* Provision List checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-[8px] font-mono font-bold tracking-wider text-[#326E45] uppercase block">
                    GOVERNANCE CONSTRAINTS & COMPLIANCES:
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeSec.provisions.map((provision, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-650 leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                          <CheckCircle size={10} strokeWidth={3} />
                        </span>
                        <span className="font-semibold">{provision}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory status line footer */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-mono text-[9px] h-10">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Lock size={10} className="text-[#326E45]" />
                    <span className="font-bold">STATUS REFERENCE:</span>
                    <span className="text-slate-800 font-extrabold">{activeSec.legalRef}</span>
                  </div>
                  <span className="flex items-center gap-1 text-slate-400 font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>SECURE NODE</span>
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Verification Portals Call To Action Card */}
        <div className="mt-16 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-md">
            <h4 className="text-sm font-display font-black text-slate-900 flex items-center gap-1.5">
              <Link size={14} className="text-[#326E45]" />
              <span>Official Government Portal Verifications</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal font-normal">
              Our legal structures are completely auditable. You can verify our active status directly on the national electronic services portals under the Companies Act guidelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a 
              href="https://eservices.secp.gov.pk/eServices/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/95 text-[10px] font-mono font-black uppercase tracking-wider text-slate-700 rounded-xl flex items-center gap-1.5 cursor-pointer hover:border-[#326E45]/40 transition-colors shadow-2xs active:scale-95 duration-200"
            >
              <span>SECP eServices Portal</span>
              <ExternalLink size={10} />
            </a>

            <a 
              href="https://irservices.fbr.gov.pk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/95 text-[10px] font-mono font-black uppercase tracking-wider text-slate-700 rounded-xl flex items-center gap-1.5 cursor-pointer hover:border-[#326E45]/40 transition-colors shadow-2xs active:scale-95 duration-200"
            >
              <span>FBR Tax Portal</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

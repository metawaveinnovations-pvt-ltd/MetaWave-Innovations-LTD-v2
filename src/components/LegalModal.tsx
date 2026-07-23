import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, FileText, Cookie } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookie' | 'faqs' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-10 text-slate-200 shadow-2xl relative my-8 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {type === 'privacy' && <Lock size={20} />}
                {type === 'terms' && <FileText size={20} />}
                {type === 'cookie' && <Cookie size={20} />}
                {type === 'faqs' && <ShieldCheck size={20} />}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {type === 'privacy' && 'Privacy Directive & Data Protection Policy'}
                  {type === 'terms' && 'Terms of Service & Security Protocols'}
                  {type === 'cookie' && 'Cookie Directive & Transparency Statement'}
                  {type === 'faqs' && 'Frequently Asked Questions & SLAs'}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  MetaWave Innovations (Private) Limited — Official Governance Document
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto pr-2 pt-6 space-y-6 text-sm text-slate-300 font-normal leading-relaxed">
            {type === 'privacy' && (
              <>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-mono">
                  EFFECTIVE DATE: JULY 22, 2026 | COMPLIANCE: GDPR, CCPA, ISO 27001
                </div>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">1. Scope of Data Collection</h3>
                  <p>
                    MetaWave Innovations (Private) Limited collects minimal necessary information strictly to execute software services, maintain client communications, and deliver custom technical proposals. Information collected includes corporate contact names, official email addresses, project requirements, and technical query logs.
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">2. Data Security & Storage</h3>
                  <p>
                    All client telemetry and codebase data processed by MetaWave Innovations are protected with AES-256 encryption at rest and TLS 1.3 in transit. We maintain isolated database schemas and strict Non-Disclosure Agreements (NDAs) across all internal engineering personnel.
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">3. Third-Party Sharing</h3>
                  <p>
                    MetaWave Innovations strictly never sells, rents, or monetizes client data to third parties. Data is shared exclusively with certified cloud infrastructure providers (AWS, Azure, Google Cloud) as necessary for hosting client application workloads under contract.
                  </p>
                </section>
              </>
            )}

            {type === 'terms' && (
              <>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-mono">
                  GOVERNING LAW: SECP & COMPANIES ACT 2017 | SLA ASSURANCE: 99.99% UPTIME
                </div>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">1. Intellectual Property Ownership</h3>
                  <p>
                    Upon complete settlement of contractual invoices, all custom software source code, repository rights, database schemas, and intellectual property developed by MetaWave Innovations belong 100% to the client.
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">2. Confidentiality & Non-Disclosure</h3>
                  <p>
                    MetaWave Innovations treats all client specifications, trade secrets, data models, and business logic as strict proprietary secrets. Dual-signed mutual NDAs precede all technical discovery audits.
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">3. SLA & Maintenance Commitments</h3>
                  <p>
                    MetaWave guarantees deployment delivery milestones according to signed statements of work (SOWs), backed by dedicated 24/7 technical emergency response for high-tier SLA contracts.
                  </p>
                </section>
              </>
            )}

            {type === 'cookie' && (
              <>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-mono">
                  COOKIE CHOICE: ESSENTIAL COOKIES ONLY & ANONYMIZED ANALYTICS
                </div>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">1. Use of Essential Cookies</h3>
                  <p>
                    We utilize small technical cookies required for security session management, load balancing, navigation state preservation, and theme preferences.
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-white">2. Performance & Analytics</h3>
                  <p>
                    We collect anonymized performance telemetry through Google Tag Manager to measure Page Speed, Core Web Vitals, and conversion efficiency. No personally identifiable information (PII) is attached to analytics cookies.
                  </p>
                </section>
              </>
            )}

            {type === 'faqs' && (
              <>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-mono">
                  ENTERPRISE TECHNICAL FAQ & SLA DIRECTORY
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-emerald-400 text-sm mb-1">Q: How fast can MetaWave assemble a full engineering team?</h4>
                    <p className="text-xs text-slate-300">
                      Our onshore and offshore engineering pools allow us to onboard senior full-stack React, Node, and AI developers within 48 to 72 hours.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-emerald-400 text-sm mb-1">Q: Do you offer post-deployment software support?</h4>
                    <p className="text-xs text-slate-300">
                      Yes. We provide 30 days of complimentary post-launch warranty, followed by tiered SLA maintenance packages covering security patches, cloud monitoring, and feature iterations.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-emerald-400 text-sm mb-1">Q: What regions do you serve?</h4>
                    <p className="text-xs text-slate-300">
                      MetaWave serves enterprises globally across Pakistan, the United Kingdom, United Arab Emirates, Saudi Arabia, and North America.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-800 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

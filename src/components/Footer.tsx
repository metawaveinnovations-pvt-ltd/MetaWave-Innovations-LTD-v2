import { motion } from 'motion/react';
import { Mail, Phone, Clock, Zap, ArrowRight, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import MetaWaveLogo from './MetaWaveLogo';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerCols = [
    {
      title: 'Company',
      links: [
        { label: 'Stewardship', id: 'about' },
        { label: 'Why Choose Us', id: 'why-metawave' },
        { label: 'Executive Team', id: 'executive-team' },
        { label: 'Enterprise Process', id: 'process' },
        { label: 'Partner Credentials', id: 'trustees' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Custom Software', id: 'capabilities' },
        { label: 'Web Development', id: 'capabilities' },
        { label: 'AI Intelligence', id: 'capabilities' },
        { label: 'Cloud Infrastructure', id: 'capabilities' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'CRM & ERP Systems', id: 'solutions' },
        { label: 'FinTech Platforms', id: 'solutions' },
        { label: 'Healthcare Portals', id: 'solutions' },
        { label: 'Property Portals', id: 'solutions' },
        { label: 'Solutions Store (Shop)', id: 'shop' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Engineering Blog', id: 'blog' },
        { label: 'Technical Audits', id: 'contact' },
        { label: 'Platform Status', id: 'home' },
        { label: 'Support SLA', id: 'contact' },
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 border-t border-slate-800/80 pt-20 pb-12 relative overflow-hidden">
      
      {/* Background glowing gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.03),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Links Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16">
          
          {/* Brand Col spanning 2 slots */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <button
              onClick={() => onNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-emerald-800 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <MetaWaveLogo size={24} />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    MetaWave Innovations
                  </span>
                  <span className="font-sans font-light text-[7px] text-slate-400 tracking-wider uppercase leading-none ml-0.5">
                    LTD
                  </span>
                </div>
                {/* Beautiful, thin teal/emerald horizontal divider line as in the logo image */}
                <div className="h-[1.1px] bg-gradient-to-r from-emerald-500 via-[#326E45] to-teal-600 w-full mt-1 mb-0.5 rounded-full opacity-70" />
                <span className="block text-[7px] font-mono tracking-[0.16em] text-emerald-450 uppercase leading-none font-bold">
                  GLOBAL TECH PARTNERS
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              Global systems engineering firm automating business workflows, training large neural model parameters, and deploying secure software solutions to enterprises worldwide.
            </p>

            {/* Social pills */}
            <div className="flex items-center gap-2 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave GitHub Link">
                <Github size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave LinkedIn Link">
                <Linkedin size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave Twitter Link">
                <Twitter size={14} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave Support Messenger Link">
                <MessageSquare size={14} />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {footerCols.map((col, idx) => (
            <div key={idx} className="space-y-4 text-left">
              <span className="block text-[10px] font-mono font-black tracking-widest text-emerald-400 uppercase">
                {col.title}
              </span>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => onNavClick(link.id)}
                      className="text-xs text-slate-400 hover:text-white transition-colors text-left font-normal cursor-pointer focus:outline-none"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Lower Regulatory & copyright row */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
          <div>
            © {currentYear} MetaWave Innovations (Private) Limited. All Rights Reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <a href="#privacy" className="hover:text-slate-300 transition-colors cursor-pointer">PRIVACY DIRECTIVE</a>
            <span className="text-slate-800">|</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors cursor-pointer">SECURITY PROTOCOLS</a>
            <span className="text-slate-800">|</span>
            <a href="#uptime" className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SLA NODE GREEN: 99.998% UPTIME</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

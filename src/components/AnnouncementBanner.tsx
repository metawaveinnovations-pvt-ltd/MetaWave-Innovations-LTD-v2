import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Sparkles, 
  Activity, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  X,
  ArrowRight,
  ShieldAlert,
  Terminal
} from 'lucide-react';

interface AnnouncementBannerProps {
  onCtaclick: (sectionId: string) => void;
  onClose: () => void;
}

export function AnnouncementBanner({ onCtaclick, onClose }: AnnouncementBannerProps) {
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic status bar messages targeting MetaWave Innovations ideology & mission
  const activeMissions = [
    "MetaWave Innovations • Shaping Global Technological Dimensions",
    "Where Innovation Meets Development • 140+ Global Client Nodes",
    "Umbrella Tech Partner • Custom SLA-Grade Enterprise Infrastructures",
    "Pioneering POS, ERP, and AI Analytics Suites Worldwide",
    "99.9% High Availability Sandbox Environment Online"
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeMissionMessage = activeMissions[tick % activeMissions.length];

  return (
    <div
      className="w-full h-[46px] sm:h-[50px] bg-[#245032] text-slate-100 border-b border-[#326E45]/40 relative flex items-center select-none font-sans z-[60]"
      id="announcement-banner"
    >
      {/* Visual background pattern accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#245032] via-[#326E45] to-[#245032] opacity-95 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      <div className="w-[94%] xl:w-[90%] max-w-7xl mx-auto flex items-center justify-between relative h-full">
        
        {/* ========================================================= */}
        {/* LEFT COMPARTMENT: Live Stream Mission Carousel           */}
        {/* ========================================================= */}
        <div 
          className="flex items-center gap-2.5 max-w-[45%] md:max-w-[40%] overflow-hidden cursor-help"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title="Pause Mission Stream"
        >
          {/* Glowing pulse diagnostic status beacon */}
          <div className="relative w-2 h-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-75" />
            <span className="absolute inset-px rounded-full bg-emerald-200" />
          </div>

          <span className="hidden xl:inline text-[9px] font-mono tracking-widest text-emerald-100/60 font-black uppercase">
            LIVE_FEED:
          </span>

          <AnimatePresence mode="wait">
            <motion.p
              key={tick}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis leading-none mt-0.5"
            >
              {activeMissionMessage}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* CENTER COMPARTMENT: Professional Global Socials Hub       */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 sm:gap-4 justify-center shrink-0">
          <span className="hidden sm:inline text-[9.5px] font-mono tracking-wider font-extrabold text-emerald-50 uppercase">
            Connect Worldwide
          </span>

          <div className="flex items-center gap-1.5">
            {/* LinkedIn social node */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 hover:border-white hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              title="LinkedIn Official MetaWave Node"
            >
              <Linkedin size={12} />
            </a>

            {/* Facebook social node */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 hover:border-white hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              title="Facebook Official MetaWave Node"
            >
              <Facebook size={12} />
            </a>

            {/* Instagram social node */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 hover:border-white hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              title="Instagram Official MetaWave Node"
            >
              <Instagram size={12} />
            </a>

            {/* Gmail Client System Ingress tunnel */}
            <a
              href="mailto:metawave.innovations@gmail.com"
              className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 hover:border-emerald-300 hover:bg-white/25 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              title="Email: metawave.innovations@gmail.com"
            >
              <Mail size={12} />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COMPARTMENT: Action Endpoint & Dismiss trigger        */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 shrink-0 justify-end">
          
          {/* Quick Consultation Trigger */}
          <button
            onClick={() => onCtaclick('contact')}
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white text-white font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer hover:shadow-md hover:scale-105 active:scale-95 duration-200"
          >
            <span>Book Ingress</span>
            <ArrowRight size={9} />
          </button>

          {/* MWI.OS Staff Ingress */}
          <button
            onClick={() => onCtaclick('admin')}
            className="hidden md:flex items-center gap-1.5 text-[9px] font-mono font-bold text-emerald-100 hover:text-white border border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/35 hover:bg-emerald-900/40 px-2.5 py-1 rounded cursor-pointer transition-all duration-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.15)] uppercase leading-none mt-0.5"
            title="MWI.OS STAFF SECURE INGRESS"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>MWI.OS • STAFF INGRESS</span>
          </button>

          <div className="w-[1px] h-3.5 bg-white/20 hidden md:block" />

          {/* CROSS DISMISS TRIGGER */}
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white text-emerald-100 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-90"
            aria-label="Close Top Banner"
            title="Dismiss top banner"
          >
            <X size={11} />
          </button>

        </div>

      </div>
    </div>
  );
}

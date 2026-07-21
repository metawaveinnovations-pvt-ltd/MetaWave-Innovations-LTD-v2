import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  DollarSign,
  Clock,
  UserCheck,
  Target,
  MessageSquare,
  Mail,
  Package,
  Barcode,
  Truck,
  Utensils,
  Calendar,
  Flame,
  ChevronDown,
  ChevronUp,
  Globe,
  BookOpen
} from 'lucide-react';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function Hero({ onCtaclick }: HeroProps) {
  const [showAllHrms, setShowAllHrms] = useState(false);
  const [showAllCrm, setShowAllCrm] = useState(false);
  const [showAllWarehouse, setShowAllWarehouse] = useState(false);
  const [showAllRestaurant, setShowAllRestaurant] = useState(false);

  useEffect(() => {
    if (showAllHrms) {
      const timer = setTimeout(() => {
        setShowAllHrms(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showAllHrms]);

  useEffect(() => {
    if (showAllCrm) {
      const timer = setTimeout(() => {
        setShowAllCrm(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showAllCrm]);

  useEffect(() => {
    if (showAllWarehouse) {
      const timer = setTimeout(() => {
        setShowAllWarehouse(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showAllWarehouse]);

  useEffect(() => {
    if (showAllRestaurant) {
      const timer = setTimeout(() => {
        setShowAllRestaurant(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showAllRestaurant]);

  return (
    <section id="home" className="relative min-h-[80vh] lg:min-h-[88vh] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 lg:pb-32 flex items-center bg-mwi-base overflow-hidden">
      
      {/* Decorative premium background lights, light mode themed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-b from-mwi-tint-80 via-mwi-tint-40 to-mwi-base">
        {/* Soft elegant warm/cool ambient gradient blobs */}
        <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#397A56]/[0.025] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />
        <div className="absolute top-[30%] left-[45%] w-[400px] h-[400px] rounded-full bg-teal-500/[0.015] blur-[100px]" />

        {/* Fine, luxurious technical grid representing precision engineering */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{
            backgroundImage: `radial-gradient(#E2E8F0 1.2px, transparent 1.2px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Interactive Content Info */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-7 text-left lg:-mt-10"
        >
          
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-100 bg-emerald-50/30 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={13} className="text-[#397A56] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#2F6547] uppercase">
              Global Software Solutions Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[1.05] text-slate-900"
          >
            Building Software <br className="hidden sm:inline" />
            That{' '}
            <span className="bg-gradient-to-r from-[#397A56] via-[#2F6547] to-[#1E293B] bg-clip-text text-transparent">
              Powers Modern
            </span> <br />
            Businesses
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-[17px] text-slate-600 font-normal leading-relaxed max-w-xl"
          >
            MetaWave Innovations delivers enterprise software, web applications, mobile apps, AI solutions, cloud infrastructure, automation systems, and digital transformation services that help organizations scale faster and operate smarter.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.025, translateY: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onCtaclick('contact')}
              className="px-8 py-4 rounded-xl text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#397A56] to-[#1E293B] hover:brightness-105 transition-all duration-300 shadow-lg shadow-[#397A56]/15 flex items-center justify-center gap-2 group cursor-pointer"
              id="hero-primary-cta"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.025, translateY: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onCtaclick('solutions')}
              className="px-8 py-4 rounded-xl text-xs font-bold tracking-wider text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              id="hero-secondary-cta"
            >
              <span>Explore Solutions</span>
            </motion.button>
          </motion.div>

          {/* Core Trust Statistics Tagline */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-slate-100 flex flex-wrap justify-center sm:justify-start items-center text-center sm:text-left gap-x-10 gap-y-4 w-full"
          >
            <div className="flex flex-col items-center sm:items-start min-w-[120px] sm:min-w-0 transition-all duration-300">
              <span className="block text-xl sm:text-2xl font-display font-bold text-[#326E45] leading-tight">150+</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold">Enterprise Projects</span>
            </div>
            <div className="flex flex-col items-center sm:items-start min-w-[120px] sm:min-w-0 transition-all duration-300">
              <span className="block text-xl sm:text-2xl font-display font-bold text-[#326E45] leading-tight">98%</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold">Delivery Success Rate</span>
            </div>
            <div className="flex flex-col items-center sm:items-start min-w-[120px] sm:min-w-0 transition-all duration-300">
              <span className="block text-xl sm:text-2xl font-display font-bold text-[#326E45] leading-tight">12+</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold">Industries Served</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Side - Staggered Bento Grid of 4 Designable Solution Boxes */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 w-full relative z-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start w-full">
            
            {/* Column 1 - Left Column of Staggered Boxes */}
            <div className="space-y-5 flex flex-col justify-start">
              
              {/* Box 1 (HRMS Solution) */}
              <motion.div
                variants={cardItemVariants}
                className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
              >
                {/* Subtle Backdrop Numbering Watermark */}
                <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                  01
                </div>

                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                      TALENT OPERATIONS
                    </span>
                    <Users size={38} className="p-2 rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2">
                    HRMS Solution
                  </h3>

                  {/* Structured Feature List - 2 features shown by default, remaining 3 on toggle */}
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <UserCheck size={12} className="text-[#397A56] shrink-0" />
                      <span>Attendances management</span>
                    </span>
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Users size={12} className="text-[#397A56] shrink-0" />
                      <span>Staff Management</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {showAllHrms && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2 overflow-hidden"
                        >
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <DollarSign size={12} className="text-[#397A56] shrink-0" />
                            <span>Accounts management</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Layers size={12} className="text-[#397A56] shrink-0" />
                            <span>Projects Management</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <ShieldCheck size={12} className="text-[#397A56] shrink-0" />
                            <span className="leading-snug">Role Management (Founder, Admin, Staff, Special Clients)</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="flex flex-col gap-1.5 mt-1 self-start">
                      <button
                        onClick={() => setShowAllHrms(!showAllHrms)}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showAllHrms ? 'See less' : '+ See three more'}</span>
                        {showAllHrms ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      <AnimatePresence>
                        {showAllHrms && (
                          <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                            <motion.div
                              key="hrms-timer"
                              initial={{ width: "100%" }}
                              animate={{ width: "0%" }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 10, ease: "linear" }}
                              className="bg-[#397A56] h-full"
                            />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-5 pt-3.5 border-t border-slate-100/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-[80px]">
                    {/* Blog Buttons */}
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://metawave-blogs.com/hrms" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="MetaWave Blogs"
                        id="metawave-blog-hrms"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                      >
                        <Globe size={15} className="shrink-0" />
                      </a>
                      <a 
                        href="https://blogger.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="blogger.com"
                        id="blogger-hrms"
                        className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                      >
                        <BookOpen size={15} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                  <button
                    id="cta-hrms-optimize"
                    onClick={() => onCtaclick('contact')}
                    className="h-[34px] px-3.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                  >
                    <span>Optimize</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </motion.div>

              {/* Box 2 (CRM Solution) */}
              <motion.div
                variants={cardItemVariants}
                className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
              >
                {/* Subtle Backdrop Numbering Watermark */}
                <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                  02
                </div>

                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                      COMMERCIAL VELOCITY
                    </span>
                    <Target size={38} className="p-2 rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2">
                    CRM Solution
                  </h3>

                  {/* Structured Feature List - 2 features shown by default, remaining 3 on toggle */}
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Target size={12} className="text-[#397A56] shrink-0" />
                      <span>Lead Scoring Intelligence</span>
                    </span>
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <TrendingUp size={12} className="text-[#397A56] shrink-0" />
                      <span>Pipeline Deal Flow</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {showAllCrm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2 overflow-hidden"
                        >
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Mail size={12} className="text-[#397A56] shrink-0" />
                            <span>Email Campaigns Hub</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <BarChart3 size={12} className="text-[#397A56] shrink-0" />
                            <span>Funnels & Metrics Tracker</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Users size={12} className="text-[#397A56] shrink-0" />
                            <span>Client Accounts Manager</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="flex flex-col gap-1.5 mt-1 self-start">
                      <button
                        onClick={() => setShowAllCrm(!showAllCrm)}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showAllCrm ? 'See less' : '+ See three more'}</span>
                        {showAllCrm ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      <AnimatePresence>
                        {showAllCrm && (
                          <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                            <motion.div
                              key="crm-timer"
                              initial={{ width: "100%" }}
                              animate={{ width: "0%" }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 10, ease: "linear" }}
                              className="bg-[#397A56] h-full"
                            />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-5 pt-3.5 border-t border-slate-100/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-[80px]">
                    {/* Blog Buttons */}
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://metawave-blogs.com/crm" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="MetaWave Blogs"
                        id="metawave-blog-crm"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                      >
                        <Globe size={15} className="shrink-0" />
                      </a>
                      <a 
                        href="https://blogger.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="blogger.com"
                        id="blogger-crm"
                        className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                      >
                        <BookOpen size={15} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                  <button
                    id="cta-crm-accelerate"
                    onClick={() => onCtaclick('contact')}
                    className="h-[34px] px-3.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                  >
                    <span>Accelerate</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Column 2 - Right Column (staggered downwards for attractive symmetry) */}
            <div className="space-y-5 flex flex-col justify-start sm:mt-8">
              
              {/* Box 3 (Business & Warehouse System) */}
              <motion.div
                variants={cardItemVariants}
                className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
              >
                {/* Subtle Backdrop Numbering Watermark */}
                <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                  03
                </div>

                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                      RESOURCES LOGISTICS
                    </span>
                    <Package size={38} className="p-2 rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2">
                    Warehouse & Inventory
                  </h3>

                  {/* Structured Feature List - 2 features shown by default, remaining 3 on toggle */}
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Activity size={12} className="text-[#397A56] shrink-0" />
                      <span>Stock Threshold Alerts</span>
                    </span>
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Barcode size={12} className="text-[#397A56] shrink-0" />
                      <span>Barcode Scan System</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {showAllWarehouse && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2 overflow-hidden"
                        >
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Truck size={12} className="text-[#397A56] shrink-0" />
                            <span>Supplier Collaboration Hub</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Package size={12} className="text-[#397A56] shrink-0" />
                            <span>Real-time Inventory Track</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Layers size={12} className="text-[#397A56] shrink-0" />
                            <span>Logistics & Fleet Logs</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="flex flex-col gap-1.5 mt-1 self-start">
                      <button
                        onClick={() => setShowAllWarehouse(!showAllWarehouse)}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showAllWarehouse ? 'See less' : '+ See three more'}</span>
                        {showAllWarehouse ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      <AnimatePresence>
                        {showAllWarehouse && (
                          <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                            <motion.div
                              key="warehouse-timer"
                              initial={{ width: "100%" }}
                              animate={{ width: "0%" }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 10, ease: "linear" }}
                              className="bg-[#397A56] h-full"
                            />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-5 pt-3.5 border-t border-slate-100/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-[80px]">
                    {/* Blog Buttons */}
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://metawave-blogs.com/warehouse" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="MetaWave Blogs"
                        id="metawave-blog-warehouse"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                      >
                        <Globe size={15} className="shrink-0" />
                      </a>
                      <a 
                        href="https://blogger.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="blogger.com"
                        id="blogger-warehouse"
                        className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                      >
                        <BookOpen size={15} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                  <button
                    id="cta-warehouse-scalesmart"
                    onClick={() => onCtaclick('contact')}
                    className="h-[34px] px-3.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                  >
                    <span>Scale Smart</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </motion.div>

              {/* Box 4 (Restaurant Management System) */}
              <motion.div
                variants={cardItemVariants}
                className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
              >
                {/* Subtle Backdrop Numbering Watermark */}
                <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                  04
                </div>

                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                      HOSPITALITY COGNITION
                    </span>
                    <Utensils size={38} className="p-2 rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2">
                    Restaurant System
                  </h3>

                  {/* Structured Feature List - 2 features shown by default, remaining 3 on toggle */}
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Cpu size={12} className="text-[#397A56] shrink-0" />
                      <span>Sub-second POS Terminal</span>
                    </span>
                    <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                      <Calendar size={12} className="text-[#397A56] shrink-0" />
                      <span>Table Seats Booking</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {showAllRestaurant && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2 overflow-hidden"
                        >
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Flame size={12} className="text-[#397A56] shrink-0" />
                            <span>Kitchen Orders Router</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <Utensils size={12} className="text-[#397A56] shrink-0" />
                            <span>Dining Operations Coordinator</span>
                          </span>
                          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                            <UserCheck size={12} className="text-[#397A56] shrink-0" />
                            <span>Guest Check & Audit</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="flex flex-col gap-1.5 mt-1 self-start">
                      <button
                        onClick={() => setShowAllRestaurant(!showAllRestaurant)}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showAllRestaurant ? 'See less' : '+ See three more'}</span>
                        {showAllRestaurant ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      <AnimatePresence>
                        {showAllRestaurant && (
                          <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                            <motion.div
                              key="restaurant-timer"
                              initial={{ width: "100%" }}
                              animate={{ width: "0%" }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 10, ease: "linear" }}
                              className="bg-[#397A56] h-full"
                            />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-5 pt-3.5 border-t border-slate-100/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-[80px]">
                    {/* Blog Buttons */}
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://metawave-blogs.com/restaurant" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="MetaWave Blogs"
                        id="metawave-blog-restaurant"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                      >
                        <Globe size={15} className="shrink-0" />
                      </a>
                      <a 
                        href="https://blogger.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="blogger.com"
                        id="blogger-restaurant"
                        className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                      >
                        <BookOpen size={15} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                  <button
                    id="cta-restaurant-deploy"
                    onClick={() => onCtaclick('contact')}
                    className="h-[34px] px-3.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                  >
                    <span>Deploy POS</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

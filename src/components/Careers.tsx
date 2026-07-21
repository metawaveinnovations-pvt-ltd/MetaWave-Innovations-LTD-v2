import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ArrowUpRight, GraduationCap, Users, Laptop, Heart, Search, X, Check, CheckCircle, Send, AlertTriangle } from 'lucide-react';
import { playSound } from '../utils/audio';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
}

export function Careers() {
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);
  const [jobApplied, setJobApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    motivation: ''
  });
  const [applyError, setApplyError] = useState<string | null>(null);

  const perks = [
    {
      icon: Laptop,
      title: 'Remote Collaboration',
      desc: 'Collaborate seamlessly from anywhere. We provide complete hardware allowances, ergonomic chair budgets, and modern asynchronous tools.'
    },
    {
      icon: GraduationCap,
      title: 'Individual Learning Budgets',
      desc: 'UK £1,200 annual budget for online training courses, system design certificates, academic journal registrations, or technology conferences.'
    },
    {
      icon: Users,
      title: 'Advanced Engineering Teams',
      desc: 'Work alongside certified solution experts, machine learning scholars, and veteran systems engineers who operate without bureaucratic noise.'
    },
    {
      icon: Heart,
      title: 'Premium Healthcare & Rest',
      desc: 'Comprehensive medical benefits packages, wellness resources, and 28 days of paid annual leave plus matching regional holidays.'
    }
  ];

  const jobs: JobOpening[] = [
    {
      id: 'j1',
      title: 'Senior Systems Architect',
      department: 'Infrastructure & Solutions Group',
      location: 'London / Connected Remote',
      salary: '£85,000 - £110,000',
      experience: '7+ Years',
      skills: ['AWS / GCP', 'Kubernetes', 'TypeScript', 'PostgreSQL', 'Docker'],
      responsibilities: [
        'Design secure, high-throughput backend services complying with ISO 27001 models',
        'Partner directly with UK corporate partners to outline cloud migration roadmaps',
        'Direct core integration patterns of high-availability microservices across geographical hubs'
      ]
    },
    {
      id: 'j2',
      title: 'Lead Machine Learning Scientist',
      department: 'Cognitive Computing & R&D',
      location: 'Global Remote',
      salary: '£75,000 - £95,000 equivalent',
      experience: '5+ Years',
      skills: ['Python', 'PyTorch / TensorFlow', 'HuggingFace', 'FastAPI', 'Vector DBs'],
      responsibilities: [
        'Train, fine-tune, and deploy predictive analytics models and natural language systems',
        'Build custom retrieval-augmented generation (RAG) models for commercial real estate data',
        'Conduct rigorous algorithm performance audits to satisfy strict sub-second response times'
      ]
    },
    {
      id: 'j3',
      title: 'Senior Frontend Engineer (React/TypeScript)',
      department: 'User Experience Division',
      location: 'Global Remote',
      salary: '£55,000 - £75,000 equivalent',
      experience: '4+ Years',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Motion'],
      responsibilities: [
        'Develop lightning-fast headless storefront modules with sub-150ms rendering benchmarks',
        'Build highly accessible Web Content Accessibility Guidelines (WCAG) compliance components',
        'Craft smooth fluid animations using Motion to represent data flows and telemetry charts'
      ]
    }
  ];

  const handleApplyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplyForm(prev => ({ ...prev, [name]: value }));
    if (applyError) setApplyError(null);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      setApplyError('Please fill out your Name and Corporate Email address.');
      return;
    }
    setJobApplied(true);
    setApplyError(null);
    playSound('success');
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="careers" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-mwi-tint-80 via-mwi-tint-40 to-mwi-base" />
      <div className="absolute top-[30%] right-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.012] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50/50 shadow-xs">
            <Briefcase size={11} className="text-[#397A56]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#397A56] uppercase">
              WORK WITH US
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Where Innovation Meets Career Execution
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Join an international software institution dedicated to engineering excellence, transparent communication, and professional growth.
          </p>
        </div>

        {/* Perks & Pillars Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC]/75 text-left space-y-3 shadow-2xs hover:bg-white hover:border-[#397A56]/30 hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#397A56]">
                  <Icon size={16} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 font-sans tracking-tight leading-tight">
                  {p.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Career Openings Header & Search */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="text-left">
            <h3 className="text-base font-display font-black text-slate-900">
              Active Strategic Roles
            </h3>
            <p className="text-[11px] text-slate-450 font-normal">
              Apply to join MetaWave Innovations team across our UK, US, or global remote delivery hubs.
            </p>
          </div>

          {/* Search bar inside */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-705 focus:outline-none focus:border-[#397A56] transition-colors"
            />
          </div>
        </div>

        {/* Job Listings Columns */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white border border-slate-200/90 hover:border-slate-350 hover:shadow-md transition-all rounded-2xl p-5 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              id={`job-${job.id}`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[8px] font-mono font-black text-[#397A56] bg-emerald-50 px-2 py-0.5 rounded uppercase leading-none">
                    {job.department}
                  </span>
                  <span className="text-[8px] font-mono font-bold text-slate-400">|</span>
                  <span className="text-[9px] font-sans font-bold text-slate-450">{job.location}</span>
                </div>

                <h4 className="text-sm sm:text-base font-display font-black text-slate-900 leading-tight">
                  {job.title}
                </h4>

                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill) => (
                    <span key={skill} className="text-[8px] font-mono text-slate-500 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 font-bold leading-none">{job.salary}</span>
                <button
                  onClick={() => { setActiveJob(job); setJobApplied(false); }}
                  className="px-4 py-2 bg-slate-900 hover:bg-[#397A56] text-white text-[9px] font-mono font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 duration-200"
                >
                  View Details & Apply
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-6 text-slate-450 text-xs">
              No matching roles found. Send an open speculative cv to careers@metawaveinnovations.com.
            </div>
          )}
        </div>

      </div>

      {/* DETAILED JOB POPUP VIEW AND APPLICATION MODAL */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="bg-white rounded-3xl border border-slate-205 shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 flex flex-col gap-6 text-left"
            >
              
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-4 right-4 w-9 h-9 border border-slate-200 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-all active:scale-90"
                aria-label="Close jobs modal"
              >
                <X size={15} />
              </button>

              <div className="space-y-4">
                
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-black text-[#397A56] bg-emerald-50 px-2 py-0.5 rounded uppercase inline-block">
                    {activeJob.department}
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-black text-slate-955 leading-tight">
                    {activeJob.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 font-mono text-[10px] text-slate-400 font-bold">
                    <span>LOCATION: {activeJob.location}</span>
                    <span>•</span>
                    <span>EXP: {activeJob.experience}</span>
                    <span>•</span>
                    <span>REWARD: {activeJob.salary}</span>
                  </div>
                </div>

                {/* Main section responsibilities checklist */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[8px] font-mono font-bold text-[#397A56] uppercase block">
                    KEY STRATEGIC RESPONSIBILITIES:
                  </span>
                  <ul className="space-y-2">
                    {activeJob.responsibilities.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-650 leading-relaxed font-semibold">
                        <span className="p-0.5 rounded-full bg-emerald-50 text-[#397A56] mt-0.5 shrink-0">
                          <Check size={8} strokeWidth={4} />
                        </span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Application Panel Inline Form */}
                <div className="border-t border-slate-150 pt-4 space-y-4">
                  <span className="text-[8px] font-mono font-bold text-slate-400 uppercase block">
                    SUBMIT BRIEF BACKGROUND PROFILE PROTOCOL:
                  </span>

                  {!jobApplied ? (
                    <form onSubmit={handleApplySubmit} className="space-y-3">
                      
                      {applyError && (
                        <div className="flex items-center gap-1.5 p-2.5 rounded bg-rose-50 border border-rose-250 text-[10px] text-rose-700 font-bold">
                          <AlertTriangle size={12} />
                          <span>{applyError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="name"
                          required
                          value={applyForm.name}
                          onChange={handleApplyInputChange}
                          placeholder="Your Human Name *"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#397A56]"
                        />

                        <input
                          type="email"
                          name="email"
                          required
                          value={applyForm.email}
                          onChange={handleApplyInputChange}
                          placeholder="Corporate Email Address *"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#397A56]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="url"
                          name="linkedin"
                          value={applyForm.linkedin}
                          onChange={handleApplyInputChange}
                          placeholder="LinkedIn Profile URL"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#397A56]"
                        />

                        <input
                          type="url"
                          name="github"
                          value={applyForm.github}
                          onChange={handleApplyInputChange}
                          placeholder="GitHub Archive URL"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#397A56]"
                        />
                      </div>

                      <textarea
                        name="motivation"
                        value={applyForm.motivation}
                        onChange={handleApplyInputChange}
                        placeholder="Tell us about a high-concurrency or ML system you built..."
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#397A56] resize-none"
                      />

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#397A56] hover:bg-[#2F6547] text-white text-[10px] font-mono font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Transmit Application Portfolio</span>
                        <Send size={11} />
                      </button>

                    </form>
                  ) : (
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle size={20} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">Application Successfully Logged</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                        Thanks, <span className="font-bold text-slate-800">{applyForm.name}</span>. Your technology background metrics have been transmitted cleanly to our recruiting partners. We will respond within 48 hours.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

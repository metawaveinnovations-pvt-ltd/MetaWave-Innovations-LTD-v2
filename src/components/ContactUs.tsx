import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Clock, MapPin, CheckCircle, Sparkles, Send, Globe, AlertTriangle, ShieldCheck, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';
import { playSound } from '../utils/audio';
import { createClient } from '../../lib/supabase/client';

const supabase = createClient();

interface FaqItem {
  q: string;
  a: string;
}

export function ContactUs() {
  const [activeOffice, setActiveOffice] = useState<'london' | 'dubai' | 'ny' | 'islamabad'>('london');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceNeeded: 'Custom Software Development',
    budgetRange: '£30,000 - £50,050',
    projectDetails: ''
  });

  const offices = {
    london: {
      city: 'London Hub (UK HQ)',
      address: '30 St Mary Axe (The Gherkin), London, EC3A 8EP',
      coords: '51.5144° N, 0.0803° W',
      phone: '+44 20 7496 0192',
      email: 'london@metawaveinnovations.com',
      hours: '09:00 AM - 06:00 PM GMT'
    },
    dubai: {
      city: 'Dubai Office (GCC)',
      address: 'The Gate District, DIFC, Dubai, UAE',
      coords: '25.2048° N, 55.2708° E',
      phone: '+971 4 362 0000',
      email: 'dubai@metawaveinnovations.com',
      hours: '09:00 AM - 06:00 PM GST'
    },
    ny: {
      city: 'New York Strategics (US)',
      address: 'One World Trade Center, Suite 85, New York, NY 10007',
      coords: '40.7128° N, 74.0060° W',
      phone: '+1 (212) 555-0185',
      email: 'ny@metawaveinnovations.com',
      hours: '09:00 AM - 06:00 PM EST'
    },
    islamabad: {
      city: 'Islamabad Engineering Hub (PK)',
      address: 'MetaWave Tower, Sector F-11, Islamabad, Pakistan',
      coords: '33.6844° N, 73.0479° E',
      phone: '+92 51 555 8290',
      email: 'pk@metawaveinnovations.com',
      hours: '09:00 AM - 06:00 PM PKT'
    }
  };

  const faqList: FaqItem[] = [
    {
      q: 'What is MetaWave\'s standard onboarding timeline?',
      a: 'Once your technical specifications are mapped and agreed upon, we establish dual-active sprint registers and onboard developers within 14 business days.'
    },
    {
      q: 'How is client intellectual property (IP) protected?',
      a: 'We execute complete, legally-binding IP assignment contracts. All source repositories are fully owned by our partners from day one, backed by strict corporate NDAs.'
    },
    {
      q: 'Do you satisfy regional GDPR and data protection criteria?',
      a: 'Yes. MetaWave Innovations is registered in Pakistan under SECP (Companies Act 2017) and enforces strict compliance practices including GDPR, HIPAA data controls, and ISO 27001 systems guidelines.'
    },
    {
      q: 'How are custom consulting service fees structured?',
      a: 'We design bespoke budget frameworks based on milestones and team allocation sizes. Our custom corporate budgets typically scale from £30,000 upwards, guaranteeing transparent, on-time delivery.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setValidationError('Please fill out the required Name and Corporate Email fields.');
      return;
    }
    
    setIsSubmitting(true);
    setValidationError(null);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim() || null,
            phone: formData.phone.trim() || null,
            service_needed: formData.serviceNeeded,
            budget_range: formData.budgetRange,
            project_details: formData.projectDetails.trim() || null,
          }
        ]);

      if (error) {
        throw error;
      }

      setFormSubmitted(true);
      playSound('success');
    } catch (err: any) {
      console.error('Supabase contact submission failed:', err);
      let errMsg = err?.message || '';
      if (err?.details) {
        errMsg += ` Details: ${err.details}`;
      }
      if (err?.hint) {
        errMsg += ` Hint: ${err.hint}`;
      }
      if (!errMsg) {
        errMsg = typeof err === 'string' ? err : JSON.stringify(err);
      }
      
      setValidationError(
        errMsg || 
        'Unable to connect to the database or save inquiry. Please check your Supabase connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-mwi-tint-40 border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#326E45]/[0.015] blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-500/[0.015] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
            <Mail size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              STRATEGIC INGRESS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Consultation Form & Ingress Node
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Submit your technology objectives or specification sheets below. Our certified solution design group will draft a comprehensive timeline and proposal review within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-3xl p-6 sm:p-8 shadow-sm text-left relative">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  
                  {validationError && (
                    <div className="space-y-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      <div className="flex items-start gap-2.5 font-bold text-rose-900">
                        <AlertTriangle size={16} className="shrink-0 text-rose-600 mt-0.5" />
                        <div className="flex-1">
                          <p>{validationError}</p>
                          {(validationError.toLowerCase().includes('relation') || validationError.toLowerCase().includes('connection') || validationError.toLowerCase().includes('failed') || validationError.toLowerCase().includes('database') || validationError.toLowerCase().includes('api')) && (
                            <p className="text-[11px] font-normal text-rose-700 mt-1">
                              This usually happens if the <code className="bg-rose-100 px-1 py-0.5 rounded text-rose-900 font-mono">contact_submissions</code> table or its anonymous Row-Level Security (RLS) policies are not yet set up in your Supabase project.
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {(validationError.toLowerCase().includes('relation') || validationError.toLowerCase().includes('connection') || validationError.toLowerCase().includes('failed') || validationError.toLowerCase().includes('database') || validationError.toLowerCase().includes('api')) && (
                        <div className="border-t border-rose-150 pt-2.5 mt-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              playSound('click');
                              const el = document.getElementById('supabase-setup-guide');
                              if (el) el.classList.toggle('hidden');
                            }}
                            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-rose-700 hover:text-rose-900 transition-colors cursor-pointer"
                          >
                            <ChevronDown size={12} />
                            <span>Toggle Supabase Setup SQL Guide</span>
                          </button>
                          
                          <div id="supabase-setup-guide" className="hidden mt-2 space-y-2 bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-[10px] leading-relaxed overflow-x-auto border border-slate-800">
                            <p className="text-emerald-400 font-bold mb-1 border-b border-slate-800 pb-1">-- Copy and run this in your Supabase SQL Editor:</p>
                            <pre className="text-slate-300">
{`-- 1. Create the target table
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  company text,
  phone text,
  service_needed text,
  budget_range text,
  project_details text
);

-- 2. Enable Row Level Security (RLS)
alter table contact_submissions enable row level security;

-- 3. Create public anonymous insert policy
create policy "Allow public inserts" 
on contact_submissions 
for insert 
to anon 
with check (true);`}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Elizabeth Thorne"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        CORPORATE EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ethorne@vanguard-cloud.co.uk"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        ORGANISATION NAME
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        disabled={isSubmitting}
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Vanguard Cloud Systems"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        TELEPHONE NUMBER
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 20 7496 0192"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="serviceNeeded" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        SERVICE CLASSIFICATION
                      </label>
                      <select
                        name="serviceNeeded"
                        id="serviceNeeded"
                        disabled={isSubmitting}
                        value={formData.serviceNeeded}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-705 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="Custom Software Development">Software Engineering</option>
                        <option value="Artificial Intelligence">Artificial Intelligence Systems</option>
                        <option value="Cloud Infrastructure & DevOps">Cloud & Infrastructure</option>
                        <option value="IT Consultancy">IT Consultancy & Strategy</option>
                        <option value="Business Growth Systems">Business Growth Systems</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budgetRange" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                        BUDGET EXPECTATION
                      </label>
                      <select
                        name="budgetRange"
                        id="budgetRange"
                        disabled={isSubmitting}
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-705 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="£10,000 - £30,000">£10,000 - £30,000</option>
                        <option value="£30,000 - £50,000">£30,000 - £50,000</option>
                        <option value="£50,000 - £100,000">£50,000 - £100,000</option>
                        <option value="£100,000+">£100,000+ Enterprise Class</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="projectDetails" className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black pl-0.5">
                      BUSINESS OBJECTIVES & OVERVIEW
                    </label>
                    <textarea
                      name="projectDetails"
                      id="projectDetails"
                      disabled={isSubmitting}
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      placeholder="Detail specific platform parameters, anticipated user metrics, or legacy systems requirements..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-white bg-slate-900 hover:bg-[#326E45] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Transmitting Ingress payload...</span>
                        <Loader2 size={12} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Transmit Ingress payload</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-150 text-[#326E45] flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle size={24} />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-display font-black text-slate-955">
                    Integration Payload Transmitted
                  </h3>
                  
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-850">{formData.name}</span>. Your technology request metrics have been catalogued and routed. A chief systems designer will follow up on your proposal immediately.
                  </p>

                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ name:'', email:'', company:'', phone:'', serviceNeeded:'Custom Software Development', budgetRange:'£30,000 - £50,050', projectDetails:'' }); }}
                    className="text-xs font-semibold text-[#326E45] hover:underline pt-4"
                  >
                    ← Submit another proposal
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Office Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-5 shadow-2xs relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[#326E45]/10">
                <Globe size={45} className="animate-spin" style={{ animationDuration: '60s' }} />
              </div>

              <div className="space-y-4">
                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45] uppercase block pl-0.5">
                  DELIVERY STAGING HUB
                </span>

                <div className="space-y-3.5">
                  <h4 className="text-sm sm:text-base font-display font-black text-slate-850">
                    {offices[activeOffice].city}
                  </h4>

                  <div className="space-y-2.5 text-xs text-slate-500 font-normal">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={13} className="text-[#326E45] shrink-0 mt-0.5" />
                      <span className="leading-tight">{offices[activeOffice].address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Globe size={13} className="text-slate-400 shrink-0" />
                      <span className="font-mono text-[9px] text-slate-400 font-semibold">{offices[activeOffice].coords}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone size={13} className="text-slate-400 shrink-0" />
                      <a href={`tel:${offices[activeOffice].phone}`} className="hover:text-[#326E45] transition-all font-semibold">{offices[activeOffice].phone}</a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail size={13} className="text-slate-400 shrink-0" />
                      <a href={`mailto:${offices[activeOffice].email}`} className="hover:text-[#326E45] transition-all font-semibold">{offices[activeOffice].email}</a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-slate-400 shrink-0" />
                      <span>{offices[activeOffice].hours}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro grid indicators */}
            <div className="p-5 rounded-3xl border border-slate-200 bg-white text-left space-y-4 shadow-2xs">
              <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                GLOBAL ROUTING INDEX
              </span>

              <div className="relative h-44 bg-slate-50 rounded-2xl border border-slate-205 overflow-hidden flex items-center justify-center">
                <div 
                  className="absolute inset-0 opacity-[0.22]" 
                  style={{
                    backgroundImage: `radial-gradient(circle, #94A3B8 1px, transparent 1px)`,
                    backgroundSize: '12px 12px'
                  }}
                />

                {/* NY Dot */}
                <button onClick={() => setActiveOffice('ny')} className="absolute left-[20%] top-[34%] group cursor-pointer">
                  <span className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/10 blur-xs -translate-x-1.5 -translate-y-1.5 animate-ping" />
                  <span className={`block w-2.5 h-2.5 rounded-full border border-white ${activeOffice === 'ny' ? 'bg-[#326E45] scale-125 shadow-sm' : 'bg-slate-450'}`} />
                </button>

                {/* London Dot */}
                <button onClick={() => setActiveOffice('london')} className="absolute left-[45%] top-[24%] group cursor-pointer">
                  <span className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/10 blur-xs -translate-x-1.5 -translate-y-1.5 animate-ping" />
                  <span className={`block w-2.5 h-2.5 rounded-full border border-white ${activeOffice === 'london' ? 'bg-[#326E45] scale-125 shadow-sm' : 'bg-slate-450'}`} strokeWidth={2} />
                </button>

                {/* Dubai Dot */}
                <button onClick={() => setActiveOffice('dubai')} className="absolute left-[63%] top-[42%] group cursor-pointer">
                  <span className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/10 blur-xs -translate-x-1.5 -translate-y-1.5 animate-ping" />
                  <span className={`block w-2.5 h-2.5 rounded-full border border-white ${activeOffice === 'dubai' ? 'bg-[#326E45] scale-125 shadow-sm' : 'bg-slate-450'}`} />
                </button>

                {/* Islamabad Dot */}
                <button onClick={() => setActiveOffice('islamabad')} className="absolute right-[22%] top-[40%] group cursor-pointer">
                  <span className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/15 blur-xs -translate-x-1.5 -translate-y-1.5 animate-ping" />
                  <span className={`block w-3.5 h-3.5 rounded-full border border-white ${activeOffice === 'islamabad' ? 'bg-[#326E45] scale-125 shadow-md' : 'bg-[#326E45]'}`} />
                </button>

                <div className="absolute bottom-2 left-3 text-[8px] font-mono text-slate-400">
                  ROUTED VIA SECURE INTEGRATION METAGRID
                </div>
              </div>

              {/* Node Switcher Links */}
              <div className="flex h-11 items-center justify-between gap-1 border-t border-slate-100 pt-3 text-[9px] font-mono">
                <span className="text-slate-400">ACTIVE SEGMENT:</span>
                <div className="flex gap-1">
                  <button onClick={() => setActiveOffice('london')} className={`px-2 py-0.5 rounded border cursor-pointer ${activeOffice === 'london' ? 'border-[#326E45] text-[#326E45] bg-emerald-50/50 font-bold' : 'border-slate-200 text-slate-500'}`}>UK</button>
                  <button onClick={() => setActiveOffice('dubai')} className={`px-2 py-0.5 rounded border cursor-pointer ${activeOffice === 'dubai' ? 'border-[#326E45] text-[#326E45] bg-emerald-50/50 font-bold' : 'border-slate-200 text-slate-500'}`}>UAE</button>
                  <button onClick={() => setActiveOffice('ny')} className={`px-2 py-0.5 rounded border cursor-pointer ${activeOffice === 'ny' ? 'border-[#326E45] text-[#326E45] bg-emerald-50/50 font-bold' : 'border-slate-200 text-slate-500'}`}>USA</button>
                  <button onClick={() => setActiveOffice('islamabad')} className={`px-2 py-0.5 rounded border cursor-pointer ${activeOffice === 'islamabad' ? 'border-[#326E45] text-[#326E45] bg-emerald-50/50 font-bold' : 'border-slate-200 text-slate-500'}`}>PK</button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Corporate Support FAQ Component */}
        <div className="max-w-4xl mx-auto text-left border-t border-slate-200/60 pt-16">
          <div className="mb-8 space-y-2">
            <span className="text-[9px] font-mono font-black text-[#326E45] uppercase tracking-widest block leading-none">
              RESOURCES & ARCHIVES
            </span>
            <h3 className="text-lg sm:text-xl font-display font-black text-slate-800">
              Corporate Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, fIdx) => (
              <div 
                key={fIdx} 
                className="bg-white border border-slate-205 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:bg-slate-50/30 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-[#326E45] shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown 
                    size={14} 
                    className={`text-slate-400 shrink-0 transition-transform duration-250 ${expandedFaq === fIdx ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedFaq === fIdx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-4 pb-4 pr-10 text-[11px] text-slate-500 leading-relaxed font-normal border-t border-slate-50 pt-2">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaWaveLogo from './MetaWaveLogo';
import { 
  Sparkles, 
  Mail, 
  Linkedin, 
  Copy, 
  Check, 
  Globe, 
  Users2, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  PhoneCall, 
  Users, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  Briefcase,
  Award,
  X
} from 'lucide-react';
import { LucideIcon } from './LucideIcon';

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  desc: string;
}

interface ExpertiseItem {
  subject: string;
  score: number;
}

interface TeamMember {
  name: string;
  initials: string;
  roles: string[];
  email: string;
  badge: string;
  focus: string;
  color: string;
  bgGradient: string;
  tagline: string;
  skills: string[];
  bio: string;
  expertise: ExpertiseItem[];
  experience: ExperienceItem[];
  education: string;
  linkedin: string;
}

const ecosystemNodes = [
  {
    title: "Global Technology Network",
    short: "Global Network",
    icon: "Globe",
    tagline: "Borderless technical reach, local compliance.",
    desc: "Deploy highly optimized specialized clusters across EMEA, APAC, and North America. Ensure absolute timezone alignment and seamless local data sovereignty under strict SLA frameworks.",
    nodesCount: "120+ Active Nodes",
    leadTime: "Instant Provisioning",
    metrics: [
      { label: "Active Hubs", value: "24" },
      { label: "Connections", value: "3,500+" },
      { label: "Compliance SLA", value: "99.98%" }
    ],
    coordinates: [
      { cx: "25%", cy: "35%", label: "EMEA Region" },
      { cx: "75%", cy: "40%", label: "APAC Core" },
      { cx: "45%", cy: "70%", label: "LATAM Node" }
    ]
  },
  {
    title: "AI & Automation Specialists",
    short: "AI & Automation",
    icon: "Sparkles",
    tagline: "Intelligent pipelines & modern cognitive reasoning.",
    desc: "Leverage advanced custom integrations with Gemini, OpenAI, and Claude AI. Fine-tuned agent workflows and high-performance vector databases engineered directly into your enterprise stack.",
    nodesCount: "80+ Specialized Models",
    leadTime: "Rapid Deployment",
    metrics: [
      { label: "LLM Pipelines", value: "150+" },
      { label: "Accuracy Rate", value: "99.4%" },
      { label: "Latency Target", value: "<150ms" }
    ],
    coordinates: [
      { cx: "50%", cy: "45%", label: "Cognitive Router" },
      { cx: "30%", cy: "60%", label: "Vector Pipeline" },
      { cx: "70%", cy: "30%", label: "Model Weights" }
    ]
  },
  {
    title: "Digital Innovation Experts",
    short: "Digital Innovation",
    icon: "Cpu",
    tagline: "High-velocity systems driving rapid product maturity.",
    desc: "Accelerate your concept-to-market lifecycle. We co-create advanced technical proofs-of-concept, scalable software architectures, and automated digital properties that capture market share.",
    nodesCount: "450+ Active Sprints",
    leadTime: "7-Day Prototypes",
    metrics: [
      { label: "POC Delivered", value: "120+" },
      { label: "Efficiency Boost", value: "3.2x" },
      { label: "Success Ratio", value: "98.5%" }
    ],
    coordinates: [
      { cx: "40%", cy: "30%", label: "Blueprint Node" },
      { cx: "60%", cy: "70%", label: "IP Core Layer" }
    ]
  },
  {
    title: "Enterprise Solution Partners",
    short: "Enterprise Partners",
    icon: "ShieldCheck",
    tagline: "Ironclad operational compliance and secure alignment.",
    desc: "Maintain rigorous enterprise security standards, business continuity, and risk assurance. ISO 27001, SOC2 Type II, and military-grade encryption models engineered natively.",
    nodesCount: "100% Certified Standard",
    leadTime: "Continuous Audits",
    metrics: [
      { label: "Compliances Managed", value: "8+" },
      { label: "Threat Sentinel", value: "Active" },
      { label: "Data Integrity", value: "100%" }
    ],
    coordinates: [
      { cx: "50%", cy: "20%", label: "Sovereign HSM" },
      { cx: "20%", cy: "50%", label: "Secured Audit" },
      { cx: "80%", cy: "65%", label: "Threat Radar" }
    ]
  },
  {
    title: "Product & Experience Designers",
    short: "Product & UX",
    icon: "Compass",
    tagline: "Visually arresting layouts and high-retention touchpoints.",
    desc: "Unite elite UI/UX designers and interaction engineers. We architect responsive layouts, intuitive design systems, and rich typography structures focused on maximizing client retention.",
    nodesCount: "10,000+ Components",
    leadTime: "Figma to Code",
    metrics: [
      { label: "UX Satisfaction", value: "4.9/5" },
      { label: "Interaction Speed", value: "60fps" },
      { label: "User Retention", value: "+24%" }
    ],
    coordinates: [
      { cx: "30%", cy: "65%", label: "Interface Mesh" },
      { cx: "70%", cy: "35%", label: "Typography Unit" }
    ]
  },
  {
    title: "24/7 Client Support",
    short: "24/7 Support",
    icon: "PhoneCall",
    tagline: "Always-on communication tunnels with rapid resolution SLAs.",
    desc: "Secure end-to-end encrypted service desks always active across every hemisphere. Seamless follow-the-sun ticketing and dedicated coordinators handling your critical needs.",
    nodesCount: "24/7 Coverage",
    leadTime: "15-Min Critical SLA",
    metrics: [
      { label: "Hemispheres Active", value: "All" },
      { label: "Average Response", value: "4.5m" },
      { label: "SLA Adherence", value: "100%" }
    ],
    coordinates: [
      { cx: "35%", cy: "45%", label: "APAC Support" },
      { cx: "65%", cy: "55%", label: "EMEA Center" },
      { cx: "50%", cy: "80%", label: "US Hotline" }
    ]
  }
];

export function TeamSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Interactive SVG detailed vector world map represents company reach with geographic accuracy

  // Esc key closes the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLeader(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const coreLeaders: TeamMember[] = [
    {
      name: "Ali Hassan Chand",
      initials: "AHC",
      roles: ["Founder", "Chief Executive Officer (CEO)", "Managing Director (MD)"],
      email: "leadership@metawaveinnovations.com",
      badge: "FOUNDER & BOARD MEMBER",
      focus: "Directs long-term corporate governance, executive partnerships, and strategic tech deployment pipelines.",
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
      bgGradient: "from-emerald-600 to-[#326E45]",
      tagline: "Steering the frontier of modern software engineering.",
      skills: ["Strategic Governance", "Enterprise Partnerships", "Venture Growth"],
      bio: "Ali Hassan Chand is an elite visionary in systems design and cloud-native architecture. Over his decade-long career, he has successfully directed and scaled enterprise application architectures, oversaw secure multi-cloud integrations, and forged deep strategic alliances across APAC, Europe, and UAE. As CEO, he leads MetaWave Innovations' global expansion and technology strategies.",
      expertise: [
        { subject: "Enterprise Architecture & Governance", score: 98 },
        { subject: "Venture Scaling & Growth Systems", score: 95 },
        { subject: "Deep Tech Integration (AI/ML)", score: 92 },
        { subject: "Multi-Cloud Security & Standards", score: 96 }
      ],
      experience: [
        { period: "2024 - Present", title: "Chief Executive Officer & MD", company: "MetaWave Innovations Pvt Ltd", desc: "Directing strategic roadmaps, corporate alliances, and governing elite design matrices." },
        { period: "2021 - 2024", title: "Lead Systems Architect", company: "Apex Digital Holdings", desc: "Architected enterprise core banking pipelines handling millions of transactions daily." },
        { period: "2018 - 2021", title: "Principal Software Engineer", company: "NextGen Software Labs", desc: "Built modern Web2/Web3 bridges and high-density state machines." }
      ],
      education: "B.S. in Computer Science - Advanced Systems Engineering Track",
      linkedin: "https://linkedin.com/in/ali-hassan-chand-metawave"
    },
    {
      name: "Suhail Siyal",
      initials: "SS",
      roles: ["Partner", "Director of Marketing & Business Growth"],
      email: "suhail.md@metawaveinnovations.com",
      badge: "PARTNER & STRATEGIST",
      focus: "Manages international corporate client relationships, brand capitalization, and global market positioning.",
      color: "text-blue-700 bg-blue-50 border-blue-100",
      bgGradient: "from-blue-600 to-indigo-700",
      tagline: "Catalyzing scalable commercial architectures.",
      skills: ["Global Scale", "Brand Capitalization", "Client Stewardship"],
      bio: "Suhail Siyal is an expert brand strategist and market growth partner with years of experience steering high-impact campaigns and international market expansion. He specializes in enterprise lead generation, SaaS monetization pipelines, and complex client retention strategies, helping tech startups transform into industry powerhouses.",
      expertise: [
        { subject: "Brand Capitalization & Equity", score: 96 },
        { subject: "International Market Strategy", score: 94 },
        { subject: "Enterprise Client Stewardship", score: 98 },
        { subject: "Digital Conversion Funnels", score: 95 }
      ],
      experience: [
        { period: "2024 - Present", title: "Director of Marketing & Growth", company: "MetaWave Innovations Pvt Ltd", desc: "Governing client satisfaction, brand capital, and global market outreach." },
        { period: "2022 - 2024", title: "VP of Business Development", company: "Synergy Global Marketing", desc: "Acquired and managed Fortune 500 client relationships across EMEA region." },
        { period: "2019 - 2022", title: "Senior Growth Lead", company: "ByteForce Media Group", desc: "Scaled inbound user acquisitions by 350% within consecutive fiscal quarters." }
      ],
      education: "Master of Business Administration (MBA) - Strategic Growth & Marketing",
      linkedin: "https://linkedin.com/in/suhail-siyal-metawave"
    },
    {
      name: "Muntaha Sheikh",
      initials: "MS",
      roles: ["Partner", "Lead Full-Stack & Mobile Solutions Architect"],
      email: "muntaha@metawaveinnovations.com",
      badge: "PARTNER & SYSTEMS LEAD",
      focus: "Architects high-density, cloud-native backend environments and premium mobile applications for scale.",
      color: "text-purple-700 bg-purple-50 border-purple-100",
      bgGradient: "from-purple-600 to-violet-700",
      tagline: "Translating extreme operational logic into pristine code.",
      skills: ["Systems Architecture", "Cloud-Native", "Mobile Engineering"],
      bio: "Muntaha Sheikh is an outstanding full-stack authority and mobile architecture leader. Fusing extreme-density Node.js backends with gorgeous, lightning-fast native and cross-platform mobile frameworks, Muntaha leads the engineering squads with rigorous automated test protocols, modular component trees, and ironclad microservice paradigms.",
      expertise: [
        { subject: "High-Density Backend Architecture", score: 97 },
        { subject: "Cross-Platform Mobile Ecosystems", score: 95 },
        { subject: "Distributed State & Databases", score: 94 },
        { subject: "DevOps & Continuous Integration", score: 92 }
      ],
      experience: [
        { period: "2024 - Present", title: "Lead Full-Stack Solutions Architect", company: "MetaWave Innovations Pvt Ltd", desc: "Orchestrating robust microservice networks, serverless pipelines, and native iOS/Android builds." },
        { period: "2021 - 2024", title: "Senior Full-Stack Engineer", company: "CloudScale Software Co", desc: "Designed, audited, and deployed secure APIs supporting over 2.5M concurrent active clients." },
        { period: "2018 - 2021", title: "Mobile UI Specialist", company: "Frictionless App Studio", desc: "Engineered ultra-responsive layouts utilizing gesture handlers and shared element transitions." }
      ],
      education: "B.E. in Software Engineering - Advanced Computing & Database Systems",
      linkedin: "https://linkedin.com/in/muntaha-sheikh-metawave"
    },
    {
      name: "Abdul Ahad Arain",
      initials: "AAA",
      roles: ["Partner", "Front-End Development Supervisor & UI/UX Specialist"],
      email: "ahad@metawaveinnovations.com",
      badge: "PARTNER & CREATIVE LEAD",
      focus: "Supervises interactive layout development, front-end quality engineering, and high-fidelity product design.",
      color: "text-teal-700 bg-teal-50 border-teal-100",
      bgGradient: "from-teal-600 to-emerald-600",
      tagline: "Refining visual hierarchy into ultimate human interfaces.",
      skills: ["UI/UX Engineering", "Design Systems", "Web Performance"],
      bio: "Abdul Ahad Arain is a master interface designer and front-end developer who transforms abstract concepts into highly aesthetic and accessible user journeys. He leads MetaWave's front-end divisions, maintaining design system guidelines, pixel-perfect accuracy, web vitals performance optimization, and custom micro-animations.",
      expertise: [
        { subject: "Advanced UI/UX Interaction Design", score: 98 },
        { subject: "Front-End Quality Engineering", score: 96 },
        { subject: "Design Systems & Token Design", score: 95 },
        { subject: "Performance Audits & Web Vitals", score: 94 }
      ],
      experience: [
        { period: "2024 - Present", title: "Front-End Development Supervisor", company: "MetaWave Innovations Pvt Ltd", desc: "Governing user interaction guidelines, design systems, and framer-motion animations." },
        { period: "2022 - 2024", title: "Senior UI Designer", company: "Vertex Interactive Labs", desc: "Crafted interactive financial dashboards, visual analytics suites, and spatial UX canvases." },
        { period: "2020 - 2022", title: "Creative Front-End Developer", company: "PixelCraft Agency", desc: "Developed highly award-winning promotional websites, custom shaders, and responsive UI kits." }
      ],
      education: "Bachelor of Design (B.Des) - Interactive Media & Human-Computer Interaction",
      linkedin: "https://linkedin.com/in/abdul-ahad-arain-metawave"
    }
  ];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <section id="executive-team" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Decorative Grid Line System */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[350px] h-[350px] bg-[#326E45]/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[400px] h-[400px] bg-emerald-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-3xs">
            <Sparkles size={11} className="text-[#326E45] animate-pulse" />
            <span className="text-[10px] font-mono font-extrabold tracking-widest text-[#326E45] uppercase">
              EXECUTIVE BOARD & ARCHITECTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            The Master Assembly of <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Elite Leadership</span>
          </h2>
          <p className="text-sm sm:text-[14.5px] text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Our governance board fuses business-growth mastery with rigorous technical supervision to guarantee flawless product deliveries. Click on any profile card to view detailed dossiers.
          </p>
        </div>

        {/* Master Team Grid (4 Members) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {coreLeaders.map((member) => (
            <motion.div
              key={member.name}
              onClick={() => setSelectedLeader(member)}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.015)] hover:shadow-[0_20px_45px_rgba(50,110,69,0.05)] hover:border-[#326E45]/25 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group cursor-pointer text-left"
            >
              {/* Internal subtle header shine card */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#326E45]/40 via-emerald-600/30 to-[#326E45]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="p-6 space-y-5">
                {/* Visual Avatar Monogram */}
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.bgGradient} p-0.5 shadow-md shadow-slate-200/40 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden group-hover:bg-slate-50/50 transition-colors">
                      {/* Stylized visual vector network in background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#326E45_1px,transparent_1px)] [background-size:6px_6px] opacity-10" />
                      <span className="text-base font-display font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent relative z-10">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-2.5 py-0.5 rounded text-[8.5px] font-mono font-extrabold tracking-wider ${member.color}`}>
                    {member.badge}
                  </span>
                </div>

                {/* Team member Identity details */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-base font-display font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#326E45] transition-colors">
                    {member.name}
                  </h3>
                  
                  {/* List out all official roles with delicate separator borders */}
                  <div className="flex flex-col gap-1 pt-1">
                    {member.roles.map((role, rIdx) => (
                      <span key={rIdx} className="text-[11.5px] text-slate-500 font-medium leading-none flex items-center gap-1">
                        {rIdx === 0 ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#326E45]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        )}
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative focus description with a border accent */}
                <div className="text-left border-l border-slate-100 pl-3 pt-0.5">
                  <p className="text-[11.5px] text-slate-400 italic font-medium leading-relaxed mb-2">
                    "{member.tagline}"
                  </p>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">
                    {member.focus}
                  </p>
                </div>

                {/* Click callback indicator */}
                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-[#326E45] group-hover:underline">
                  <span>View Executive Dossier</span>
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom footer compartment of card with email interactions */}
              <div 
                className="px-6 py-4.5 bg-slate-50/70 border-t border-slate-100/80 flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-start truncate min-w-0">
                  <span className="text-[8px] font-mono text-slate-400 font-extrabold tracking-wider uppercase leading-none">
                    SECURED MAILBOX
                  </span>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-[11px] font-mono font-semibold text-[#326E45] hover:text-[#20462c] transition-colors truncate block mt-0.5"
                    title={member.email}
                  >
                    {member.email}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyEmail(member.email)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#326E45] hover:border-[#326E45]/20 hover:bg-[#326E45]/5 transition-all shadow-3xs cursor-pointer flex items-center justify-center relative"
                    title="Copy Email Address"
                  >
                    <AnimatePresence mode="wait">
                      {copiedEmail === member.email ? (
                        <motion.div
                          key="copied"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={11} className="text-emerald-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy size={11} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      {/* Immersive Executive Profile Detail Dialog Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <>
            {/* Dark blur overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="fixed inset-0 bg-slate-955/80 backdrop-blur-md z-50 cursor-zoom-out"
            />

            {/* Scrollable container for modal centering */}
            <div className="fixed inset-0 z-55 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white max-w-4xl w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-left pointer-events-auto max-h-[90vh] md:max-h-[85vh] select-none"
              >
                
                {/* Left Visual Column - Identity Card (Full representation of profile) */}
                <div className={`md:w-2/5 bg-gradient-to-b ${selectedLeader.bgGradient === 'from-emerald-600 to-[#326E45]' ? 'from-emerald-950 to-[#122b1a]' : selectedLeader.bgGradient === 'from-blue-600 to-indigo-700' ? 'from-blue-950 to-indigo-950' : selectedLeader.bgGradient === 'from-purple-600 to-violet-700' ? 'from-purple-950 to-violet-950' : 'from-teal-950 to-emerald-950'} text-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                  
                  {/* Subtle decorative grid overlay inside visual column */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

                  <div className="relative z-10 space-y-6">
                    {/* Badge & Monogram block */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-widest uppercase">
                        {selectedLeader.badge}
                      </span>
                      <span className="text-2xl font-mono font-black tracking-tighter opacity-70">
                        {selectedLeader.initials}
                      </span>
                    </div>

                    {/* Avatar with customized gradient ring */}
                    <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md p-1.5 shadow-xl border border-white/15">
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(#326E45_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-15" />
                        <span className="text-2xl font-display font-black text-slate-900 relative z-10">
                          {selectedLeader.initials}
                        </span>
                      </div>
                    </div>

                    {/* Identity Titles */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-extrabold tracking-tight">
                        {selectedLeader.name}
                      </h3>
                      <div className="space-y-1">
                        {selectedLeader.roles.map((role, idx) => (
                          <div key={idx} className="text-[12.5px] font-medium text-white/80 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academics & Secured Pipeline Connection in footer */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-4">
                    {/* Education */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50 tracking-wider uppercase font-bold">
                        <BookOpen size={11} className="text-emerald-400" />
                        <span>Academic Dossier</span>
                      </div>
                      <p className="text-[11.5px] leading-relaxed text-white/90 font-medium">
                        {selectedLeader.education}
                      </p>
                    </div>

                    {/* Quick Mail to Executive with click callback */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[9px] font-mono text-white/50 tracking-wider uppercase font-bold">
                        Direct Secure Routing
                      </div>
                      <a 
                        href={`mailto:${selectedLeader.email}`}
                        className="text-[11.5px] font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1"
                      >
                        <Mail size={11} />
                        <span className="underline truncate">{selectedLeader.email}</span>
                      </a>
                    </div>
                  </div>

                </div>

                {/* Right Interactive Column - Technical Dossier, Timeline & Philosophy */}
                <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between relative max-h-[90vh] md:max-h-full">
                  
                  {/* Close absolute node button */}
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Close Dossier"
                  >
                    <X size={18} />
                  </button>

                  <div className="space-y-6">
                    {/* Dossier tag */}
                    <div className="space-y-1">
                      <div className="text-[9.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">
                        EXECUTIVE DOSSIER AND PROFESSIONAL PORTFOLIO
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-slate-900">
                        Strategic Capabilities
                      </h4>
                    </div>

                    {/* Philosophy Quote block */}
                    <div className="bg-slate-50 border-l-4 border-[#326E45] p-4 rounded-r-2xl">
                      <p className="text-[12.5px] text-slate-600 italic font-medium leading-relaxed">
                        "{selectedLeader.tagline}"
                      </p>
                    </div>

                    {/* Deep-dive Biography */}
                    <div className="space-y-2">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        EXECUTIVE SUMMARY & INFLUENCE
                      </h5>
                      <p className="text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                        {selectedLeader.bio}
                      </p>
                    </div>

                    {/* Technical / Strategic Expertise Progress Gauges */}
                    <div className="space-y-4 pt-1">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        VETTED EXPERTISE METRICS
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedLeader.expertise.map((exp, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[11.5px] font-bold text-slate-700">
                              <span>{exp.subject}</span>
                              <span className="font-mono text-[#326E45]">{exp.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${exp.score}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-[#326E45] to-emerald-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Milestones Timeline */}
                    <div className="space-y-4 pt-2">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        CAREER MILESTONES & REPUTATION TIMELINE
                      </h5>
                      <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
                        {selectedLeader.experience.map((exp, idx) => (
                          <div key={idx} className="relative space-y-1">
                            {/* timeline circle node */}
                            <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#326E45] ring-4 ring-white" />
                            
                            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                              <span className="text-[12px] font-extrabold text-[#326E45] font-mono">
                                {exp.period}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {exp.company}
                              </span>
                            </div>
                            <h6 className="text-[12.5px] font-extrabold text-slate-800">
                              {exp.title}
                            </h6>
                            <p className="text-[11.5px] text-slate-500 leading-relaxed">
                              {exp.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    {/* LinkedIn button */}
                    <a
                      href={selectedLeader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white text-xs font-semibold rounded-xl hover:bg-[#006294] transition-all cursor-pointer shadow-3xs hover:shadow-md"
                    >
                      <Linkedin size={13} />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink size={11} />
                    </a>

                    {/* Copy dossier notification */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const dossierText = `${selectedLeader.name} - ${selectedLeader.roles.join(', ')}\nEmail: ${selectedLeader.email}\nEducation: ${selectedLeader.education}\nBio: ${selectedLeader.bio}`;
                          navigator.clipboard.writeText(dossierText);
                          setCopiedEmail(selectedLeader.name);
                          setTimeout(() => setCopiedEmail(null), 2000);
                        }}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedEmail === selectedLeader.name ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-600">Dossier Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Full Dossier</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedLeader(null)}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Close Profile
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

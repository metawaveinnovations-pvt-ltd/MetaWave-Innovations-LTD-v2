import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  UserCheck, 
  CheckCircle2, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Send, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';
import MetaWaveLogo from './MetaWaveLogo';

interface HeadOfOperations {
  name: string;
  title: string;
  roleType: string;
  initials: string;
  experience: string;
  focus: string;
  status: string;
  avatarBg: string;
  photo: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
}

interface NetworkNode {
  code: string;
  country: string;
  city: string;
  flag: string;
  role: string;
  coords: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  width: number;
  height: number;
  isHq?: boolean;
  isDomestic?: boolean;
  headOfOperations: HeadOfOperations;
}

export function GlobalNetworkSection() {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [contactMode, setContactMode] = useState<boolean>(false);
  const [contactSent, setContactSent] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Karachi HQ (Primary Global Headquarters)
  const karachiHQ: NetworkNode = {
    code: 'PK_KHI',
    country: 'Pakistan',
    city: 'Karachi',
    flag: '🇵🇰',
    role: 'Global Headquarters (HQ)',
    coords: '24.8607° N, 67.0011° E',
    x: 630,
    y: 270,
    labelX: 630 - 105,
    labelY: 270 + 26,
    width: 210,
    height: 64,
    isHq: true,
    headOfOperations: {
      name: 'Engr. Syed M. Faraz',
      title: 'Chief Operating Officer & Global Lead',
      roleType: 'Global Head of Operations',
      initials: 'SF',
      experience: '14+ Yrs Executive Leadership',
      focus: 'Global Architecture, Delivery & Cloud Pipelines',
      status: 'Active • Global Command HQ',
      avatarBg: 'bg-emerald-600',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'Spearheads MetaWave Innovations\' global technology strategy, overseeing cloud architecture pipelines, AI system deployments, and enterprise engineering teams across all international hubs.',
      email: 'faraz.coo@metawaveinnovations.com',
      phone: '+92 (21) 3456-7890',
      address: 'MetaWave Tower, Main Clifton Rd, Karachi, Pakistan'
    }
  };

  // Islamabad (National Operations & Government Relations)
  const islamabadNode: NetworkNode = {
    code: 'PK_ISL',
    country: 'Pakistan',
    city: 'Islamabad',
    flag: '🇵🇰',
    role: 'National Operations & Govt Relations',
    coords: '33.6844° N, 73.0479° E',
    x: 638,
    y: 236,
    labelX: 638 + 14,
    labelY: 236 - 38,
    width: 200,
    height: 42,
    isDomestic: true,
    headOfOperations: {
      name: 'Malik Tariq Khan',
      title: 'Director of Federal & Public Sector Tech',
      roleType: 'National Operations Lead',
      initials: 'TK',
      experience: '12+ Yrs Govt Tech Systems',
      focus: 'Federal Enterprise & Defense Alliances',
      status: 'Active • Federal Hub',
      avatarBg: 'bg-emerald-700',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      bio: 'Leads national technology integration, public sector digitization, and high-security enterprise framework partnerships with federal institutions and corporate enterprises across Pakistan.',
      email: 'tariq.khan@metawaveinnovations.com',
      phone: '+92 (51) 2345-678',
      address: 'Blue Area Tech Complex, Sector F-6, Islamabad, Pakistan'
    }
  };

  // International Nodes directly connected from Karachi HQ
  const internationalNodes: NetworkNode[] = [
    {
      code: 'US_SF',
      country: 'United States',
      city: 'San Francisco',
      flag: '🇺🇸',
      role: 'Innovation, AI & Cloud Technology',
      coords: '37.7749° N, 122.4194° W',
      x: 165,
      y: 205,
      labelX: 165 - 175,
      labelY: 205 - 42,
      width: 175,
      height: 42,
      headOfOperations: {
        name: 'David Vance',
        title: 'VP of Americas Operations & AI Systems',
        roleType: 'Head of Americas Operations',
        initials: 'DV',
        experience: '15+ Yrs Silicon Valley Tech',
        focus: 'AI Models, Enterprise Cloud & Silicon Alliances',
        status: 'Active • Americas Hub',
        avatarBg: 'bg-[#326E45]',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        bio: 'Directs Americas AI & Cloud technology innovation, fostering Silicon Valley alliances and scaling enterprise machine learning frameworks for Fortune 500 clients.',
        email: 'david.vance@metawaveinnovations.com',
        phone: '+1 (415) 890-1234',
        address: '500 Howard St, Financial District, San Francisco, CA, USA'
      }
    },
    {
      code: 'US_CHI',
      country: 'United States',
      city: 'Chicago',
      flag: '🇺🇸',
      role: 'Business Solutions & Enterprise Clients',
      coords: '41.8781° N, 87.6298° W',
      x: 245,
      y: 190,
      labelX: 245 + 12,
      labelY: 190 - 18,
      width: 185,
      height: 42,
      headOfOperations: {
        name: 'Sarah Jenkins',
        title: 'Regional Director - Enterprise Client Operations',
        roleType: 'Midwest Head of Operations',
        initials: 'SJ',
        experience: '11+ Yrs Enterprise Systems',
        focus: 'Fortune 500 ERP & Scale Systems',
        status: 'Active • Midwest Hub',
        avatarBg: 'bg-[#326E45]',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        bio: 'Oversees enterprise client solutions, enterprise system integration, and ERP modernization for corporate partners throughout North America.',
        email: 'sarah.jenkins@metawaveinnovations.com',
        phone: '+1 (312) 567-8901',
        address: '233 S Wacker Dr, Willis Tower, Chicago, IL, USA'
      }
    },
    {
      code: 'GB_LDN',
      country: 'United Kingdom',
      city: 'London',
      flag: '🇬🇧',
      role: 'UK Clients & Business Partnerships',
      coords: '51.5074° N, 0.1278° W',
      x: 475,
      y: 145,
      labelX: 475 - 85,
      labelY: 145 - 46,
      width: 175,
      height: 42,
      headOfOperations: {
        name: 'Oliver Sterling',
        title: 'Head of European Operations & Alliances',
        roleType: 'EMEA Head of Operations',
        initials: 'OS',
        experience: '13+ Yrs UK Enterprise Tech',
        focus: 'FinTech, EU Cloud & Banking Architecture',
        status: 'Active • Europe HQ',
        avatarBg: 'bg-indigo-700',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        bio: 'Drives European expansion, managing FinTech security protocols, sovereign cloud compliance, and banking technology alliances across the UK and EMEA.',
        email: 'oliver.sterling@metawaveinnovations.com',
        phone: '+44 (20) 7946-0912',
        address: '30 St Mary Axe, City of London, London, UK'
      }
    },
    {
      code: 'SA_RUH',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      flag: '🇸🇦',
      role: 'AI, Software & Digital Transformation',
      coords: '24.7136° N, 46.6753° E',
      x: 582,
      y: 285,
      labelX: 582 - 180,
      labelY: 285 + 16,
      width: 180,
      height: 42,
      headOfOperations: {
        name: 'Sheikh Tariq Al-Mansoor',
        title: 'Director of Middle East Operations',
        roleType: 'KSA Head of Operations',
        initials: 'TM',
        experience: '10+ Yrs Vision 2030 Tech',
        focus: 'Digital Transformation & Enterprise AI',
        status: 'Active • KSA Operations',
        avatarBg: 'bg-emerald-800',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        bio: 'Manages digital transformation initiatives aligned with Saudi Vision 2030, delivering enterprise AI, bespoke software, and smart infrastructure solutions.',
        email: 'tariq.almansoor@metawaveinnovations.com',
        phone: '+966 (11) 456-7890',
        address: 'King Fahd Road, Olaya District, Riyadh, Saudi Arabia'
      }
    },
    {
      code: 'QA_DOH',
      country: 'Qatar',
      city: 'Doha',
      flag: '🇶🇦',
      role: 'Enterprise & Digital Solutions',
      coords: '25.2854° N, 51.5310° E',
      x: 600,
      y: 280,
      labelX: 600 + 12,
      labelY: 280 + 12,
      width: 165,
      height: 42,
      headOfOperations: {
        name: 'Hassan Al-Kuwari',
        title: 'Head of Gulf Digital Operations',
        roleType: 'Qatar Operations Lead',
        initials: 'HK',
        experience: '9+ Yrs Infrastructure Lead',
        focus: 'Enterprise FinTech & Smart Infrastructure',
        status: 'Active • Gulf Hub',
        avatarBg: 'bg-[#326E45]',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
        bio: 'Oversees Gulf regional digital infrastructure, high-concurrency enterprise software deployments, and sovereign cloud tech architecture for leading Qatar enterprises.',
        email: 'hassan.alkuwari@metawaveinnovations.com',
        phone: '+974 4455 6677',
        address: 'West Bay Tech Tower, Corniche Rd, Doha, Qatar'
      }
    },
    {
      code: 'MY_KUL',
      country: 'Malaysia',
      city: 'Kuala Lumpur',
      flag: '🇲🇾',
      role: 'Technology & Startup Partnerships',
      coords: '3.1390° N, 101.6869° E',
      x: 755,
      y: 338,
      labelX: 755 + 12,
      labelY: 338 - 18,
      width: 175,
      height: 42,
      headOfOperations: {
        name: 'Wei Chen Tan',
        title: 'Managing Director - APAC Operations',
        roleType: 'APAC Head of Operations',
        initials: 'WT',
        experience: '12+ Yrs APAC Software Lead',
        focus: 'South East Asia Cloud & Startup Ventures',
        status: 'Active • APAC Hub',
        avatarBg: 'bg-[#245032]',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        bio: 'Leads South East Asian growth, directing technology partnerships, startup accelerators, and cross-border software engineering teams across the Asia-Pacific region.',
        email: 'weichen.tan@metawaveinnovations.com',
        phone: '+60 (3) 2181-9000',
        address: 'KLCC Tech Park, Jalan Ampang, Kuala Lumpur, Malaysia'
      }
    }
  ];

  const allLocations = [karachiHQ, islamabadNode, ...internationalNodes];
  const activeHoveredNode = allLocations.find(loc => loc.code === hoveredCode);

  const handleOpenModal = (node: NetworkNode) => {
    setSelectedNode(node);
    setContactMode(false);
    setContactSent(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setContactSent(true);
  };

  return (
    <section 
      id="global-network" 
      className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden select-none"
    >
      {/* Background soft glowing blur */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#326E45]/[0.015] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-slate-500/[0.015] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (MetaWave Innovations Signature Theme) */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs">
            <Globe size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              GLOBAL ENTERPRISE INFRASTRUCTURE
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            Our <span className="bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1a3d24] bg-clip-text text-transparent">Global Network</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Connecting businesses across the world through innovative software, AI solutions, enterprise systems, cloud technologies, and digital transformation. Click any pin to connect with our Regional Head of Operations.
          </p>
        </div>

        {/* Real World Map Container */}
        <div className="relative w-full aspect-[1000/520] max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-slate-950 shadow-md overflow-hidden p-1 sm:p-2 mb-12">
          
          {/* Real Photographic World Map Background */}
          <img
            src="/src/assets/images/real_world_map_1784669236101.jpg"
            alt="Real World Satellite Map - MetaWave Innovations Global Infrastructure"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-[1.15] brightness-[0.85]"
            referrerPolicy="no-referrer"
          />

          {/* Dark tech vignette & overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/50 pointer-events-none" />

          {/* Subtle grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none" 
            style={{
              backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          />

          {/* Interactive Floating Hover Card for Head of Operations */}
          <AnimatePresence>
            {activeHoveredNode && !selectedNode && (
              <motion.div
                key={activeHoveredNode.code}
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={() => setHoveredCode(activeHoveredNode.code)}
                onMouseLeave={() => setHoveredCode(null)}
                onClick={() => handleOpenModal(activeHoveredNode)}
                style={{
                  left: `${Math.min(Math.max((activeHoveredNode.x / 1000) * 100, 16), 84)}%`,
                  top: `${activeHoveredNode.y > 260 ? ((activeHoveredNode.y - 125) / 520) * 100 : ((activeHoveredNode.y + 35) / 520) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
                className="absolute z-30 pointer-events-auto cursor-pointer w-72 sm:w-80 bg-slate-950/95 backdrop-blur-xl border border-emerald-500/60 rounded-2xl p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-white hover:border-emerald-400 transition-colors"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base select-none">{activeHoveredNode.flag}</span>
                    <span className="text-xs font-bold font-sans text-white uppercase tracking-wider">
                      {activeHoveredNode.city}, {activeHoveredNode.country}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40 uppercase tracking-wider">
                    {activeHoveredNode.headOfOperations.roleType}
                  </span>
                </div>

                {/* Head of Operations Profile Info */}
                <div className="flex items-start gap-3">
                  <img 
                    src={activeHoveredNode.headOfOperations.photo} 
                    alt={activeHoveredNode.headOfOperations.name}
                    className="w-10 h-10 rounded-xl object-cover border border-emerald-400/40 shadow-md shrink-0"
                  />

                  <div className="flex flex-col min-w-0 text-left">
                    <div className="flex items-center gap-1">
                      <UserCheck size={13} className="text-emerald-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-white leading-tight truncate">
                        {activeHoveredNode.headOfOperations.name}
                      </h4>
                    </div>
                    <p className="text-[10px] font-mono text-emerald-300/90 leading-tight mt-0.5 font-medium truncate">
                      {activeHoveredNode.headOfOperations.title}
                    </p>
                  </div>
                </div>

                {/* Operational Details */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-left">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-sans">Experience:</span>
                    <span className="text-slate-200 font-mono font-bold">{activeHoveredNode.headOfOperations.experience}</span>
                  </div>
                  <div className="flex items-start justify-between text-[10px] gap-2">
                    <span className="text-slate-400 font-sans shrink-0">Domain Focus:</span>
                    <span className="text-emerald-300 font-mono text-right text-[9px] leading-tight truncate">{activeHoveredNode.headOfOperations.focus}</span>
                  </div>
                </div>

                {/* Footer Click Prompt */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-emerald-400 font-bold">
                  <span>Click pin for full profile & office contact</span>
                  <ArrowRight size={11} className="animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Real Geographic Vector HUD & Network Arcs SVG */}
          <svg
            viewBox="0 0 1000 520"
            preserveAspectRatio="xMidYMid meet"
            className="relative w-full h-full z-10 block pointer-events-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="mwiGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="mwiHqGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Arc Gradients */}
              <linearGradient id="mwiArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="mwiDomesticArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Latitude / Longitude Subtle Reference Grid */}
            <g stroke="#ffffff" strokeWidth="0.4" opacity="0.12" fill="none" strokeDasharray="2 6">
              <line x1="0" y1="130" x2="1000" y2="130" />
              <line x1="0" y1="260" x2="1000" y2="260" />
              <line x1="0" y1="390" x2="1000" y2="390" />
              <line x1="250" y1="0" x2="250" y2="520" />
              <line x1="500" y1="0" x2="500" y2="520" />
              <line x1="750" y1="0" x2="750" y2="520" />
            </g>

            {/* 1. DOMESTIC CONNECTION ARC: KARACHI (HQ) ↔ ISLAMABAD */}
            {(() => {
              const k = karachiHQ;
              const i = islamabadNode;
              const ctrlX = (k.x + i.x) / 2 + 10;
              const ctrlY = (k.y + i.y) / 2 - 10;
              const pathD = `M ${k.x} ${k.y} Q ${ctrlX} ${ctrlY} ${i.x} ${i.y}`;
              const isHovered = hoveredCode === 'PK_KHI' || hoveredCode === 'PK_ISL';

              return (
                <g key="domestic-connection-arc" className="pointer-events-none">
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#mwiDomesticArcGrad)"
                    strokeWidth={isHovered ? 3 : 2}
                    filter="url(#mwiHqGlow)"
                  />
                  <path
                    id="track-domestic-flow"
                    d={pathD}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.2"
                    strokeDasharray="4 8"
                    style={{ animation: 'dataFlow 2s linear infinite' }}
                  />
                  <circle r="3" fill="#ffffff" filter="url(#mwiGlow)">
                    <animateMotion dur="1.6s" repeatCount="indefinite">
                      <mpath href="#track-domestic-flow" />
                    </animateMotion>
                  </circle>
                </g>
              );
            })()}

            {/* 2. INTERNATIONAL CONNECTION ARCS (ALL RADIATING FROM KARACHI HQ) */}
            {internationalNodes.map((target, idx) => {
              const source = karachiHQ;
              const ctrlX = (source.x + target.x) / 2;
              const ctrlY = ((source.y + target.y) / 2) - Math.abs(source.x - target.x) * 0.18 - 25;
              const pathD = `M ${source.x} ${source.y} Q ${ctrlX} ${ctrlY} ${target.x} ${target.y}`;
              const isHovered = hoveredCode === source.code || hoveredCode === target.code;

              return (
                <g key={`intl-arc-${target.code}`} className="pointer-events-none">
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#mwiArcGrad)"
                    strokeWidth={isHovered ? 2.8 : 1.5}
                    opacity={hoveredCode ? (isHovered ? 1 : 0.2) : 0.75}
                    className="transition-all duration-300"
                  />
                  <path
                    id={`track-${target.code}`}
                    d={pathD}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    strokeDasharray="4 10"
                    opacity={hoveredCode ? (isHovered ? 1 : 0.1) : 0.6}
                    style={{ animation: 'dataFlow 3s linear infinite' }}
                  />
                  <circle r={isHovered ? 3.5 : 2.5} fill="#ffffff" filter="url(#mwiGlow)">
                    <animateMotion dur={`${2.2 + (idx % 3) * 0.5}s`} repeatCount="indefinite">
                      <mpath href={`#track-${target.code}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* 3. ISLAMABAD NODE PIN & HUD CARD */}
            {(() => {
              const node = islamabadNode;
              const isHovered = hoveredCode === node.code;

              return (
                <g
                  key={`node-${node.code}`}
                  onMouseEnter={() => setHoveredCode(node.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onClick={() => handleOpenModal(node)}
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={hoveredCode && !isHovered && hoveredCode !== 'PK_KHI' ? 0.45 : 1}
                >
                  {/* Invisible Hit Area */}
                  <circle cx={node.x} cy={node.y} r="24" fill="transparent" />

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 9 : 5.5}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.5"
                    filter="url(#mwiGlow)"
                    className="transition-all duration-300"
                  />
                  <circle cx={node.x} cy={node.y} r="2.8" fill="#34d399" />

                  <foreignObject
                    x={node.labelX}
                    y={node.labelY}
                    width={node.width}
                    height={node.height}
                    className="pointer-events-auto cursor-pointer overflow-visible select-none"
                    onMouseEnter={() => setHoveredCode(node.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => handleOpenModal(node)}
                  >
                    <div className={`backdrop-blur-md bg-[#021f16]/90 border border-emerald-500/50 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg transition-all duration-200 ${
                      isHovered ? 'opacity-100 scale-105 border-emerald-300 bg-[#043324] pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
                    }`}>
                      <span className="text-xs leading-none select-none" role="img" aria-label={node.country}>{node.flag}</span>
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-[10px] font-sans font-bold text-white leading-none truncate uppercase">{node.city}</span>
                        <span className="text-[8px] font-mono text-emerald-300 leading-none truncate uppercase mt-0.5 font-medium">{node.role}</span>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })()}

            {/* 4. INTERNATIONAL NODE PINS & HUD CARDS */}
            {internationalNodes.map((n) => {
              const isHovered = hoveredCode === n.code;

              return (
                <g
                  key={`node-${n.code}`}
                  onMouseEnter={() => setHoveredCode(n.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onClick={() => handleOpenModal(n)}
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={hoveredCode && !isHovered && hoveredCode !== 'PK_KHI' ? 0.4 : 1}
                >
                  {/* Invisible Hit Area */}
                  <circle cx={n.x} cy={n.y} r="24" fill="transparent" />

                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isHovered ? 11 : 6.5}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    filter="url(#mwiGlow)"
                    className="transition-all duration-300"
                  />
                  <circle cx={n.x} cy={n.y} r="2.8" fill="#ffffff" />

                  <foreignObject
                    x={n.labelX}
                    y={n.labelY}
                    width={n.width}
                    height={n.height}
                    className="pointer-events-auto cursor-pointer overflow-visible select-none"
                    onMouseEnter={() => setHoveredCode(n.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => handleOpenModal(n)}
                  >
                    <div className={`backdrop-blur-md bg-[#09152b]/90 border border-sky-500/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg transition-all duration-200 ${
                      isHovered ? 'opacity-100 scale-105 border-sky-300 bg-[#0f2347] pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
                    }`}>
                      <span className="text-xs leading-none select-none" role="img" aria-label={n.country}>{n.flag}</span>
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-[10px] font-sans font-bold text-white leading-none truncate uppercase">{n.city}</span>
                        <span className="text-[8px] font-mono text-sky-300 leading-none truncate uppercase mt-0.5">{n.role}</span>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* 5. PRIMARY GLOBAL HEADQUARTERS HUB — KARACHI, PAKISTAN */}
            {(() => {
              const hq = karachiHQ;
              const isHovered = hoveredCode === hq.code;

              return (
                <g
                  key="hq-primary-node"
                  onMouseEnter={() => setHoveredCode(hq.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onClick={() => handleOpenModal(hq)}
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={hoveredCode && !isHovered ? 0.5 : 1}
                >
                  {/* Invisible Hit Area */}
                  <circle cx={hq.x} cy={hq.y} r="32" fill="transparent" />

                  {/* Pulsing Ripple Rings */}
                  <circle cx={hq.x} cy={hq.y} className="animate-ripple-1" fill="none" stroke="#34d399" />
                  <circle cx={hq.x} cy={hq.y} className="animate-ripple-2" fill="none" stroke="#34d399" />

                  {/* Backing Emerald Glow */}
                  <circle
                    cx={hq.x}
                    cy={hq.y}
                    r="20"
                    fill="#10b981"
                    opacity="0.4"
                    filter="url(#mwiHqGlow)"
                    className="animate-pulse"
                  />

                  {/* Company Emblem Center Pin */}
                  <g transform={`translate(${hq.x - 15}, ${hq.y - 15})`}>
                    <circle cx="15" cy="15" r="13" fill="#064e3b" className="border-2 border-emerald-400 shadow-xl" />
                    <foreignObject x="4.5" y="4.5" width="21" height="21" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <MetaWaveLogo size={14} showText={false} />
                      </div>
                    </foreignObject>
                  </g>

                  {/* GLOBAL HQ PROMINENT BADGE CARD - KARACHI */}
                  <foreignObject
                    x={hq.labelX}
                    y={hq.labelY}
                    width={hq.width}
                    height={hq.height}
                    className="pointer-events-auto cursor-pointer overflow-visible select-none"
                    onMouseEnter={() => setHoveredCode(hq.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => handleOpenModal(hq)}
                  >
                    <div className={`backdrop-blur-xl bg-[#022118]/95 border-2 border-emerald-400/80 rounded-xl p-2 flex flex-col gap-1 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] ${
                      isHovered ? 'opacity-100 scale-105 border-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.6)] pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base leading-none select-none" role="img" aria-label="Pakistan">{hq.flag}</span>
                        <span className="text-[9px] font-mono font-black text-emerald-300 tracking-wider uppercase bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                          GLOBAL HQ – KARACHI
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-left pt-1 border-t border-emerald-800/60">
                        <div className="w-4.5 h-4.5 bg-emerald-950 rounded flex items-center justify-center p-0.5 border border-emerald-500/40 shrink-0">
                          <MetaWaveLogo size={13} showText={false} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-sans font-bold text-white leading-none truncate">MetaWave Innovations LTD</span>
                          <span className="text-[8px] font-mono font-medium text-emerald-400 uppercase tracking-wider leading-none mt-0.5">Karachi, Pakistan</span>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Structured Corporate Directory Cards Grid (MetaWave Theme) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10">
          {allLocations.map((loc, idx) => {
            const isHq = loc.isHq;
            const isIsl = loc.isDomestic;
            const isHovered = hoveredCode === loc.code;

            return (
              <motion.div
                key={loc.code}
                onMouseEnter={() => setHoveredCode(loc.code)}
                onMouseLeave={() => setHoveredCode(null)}
                onClick={() => handleOpenModal(loc)}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[160px] transition-all duration-300 cursor-pointer ${
                  isHq
                    ? 'bg-white border-[#326E45] shadow-[0_8px_30px_rgba(50,110,69,0.12)] ring-1 ring-[#326E45]/20'
                    : isIsl
                    ? 'bg-white/90 border-emerald-200 hover:border-[#326E45]/40 shadow-xs'
                    : 'bg-white/80 border-slate-200 hover:border-[#326E45]/30 hover:bg-white shadow-xs'
                } ${isHovered ? 'ring-2 ring-[#326E45] scale-[1.01]' : ''}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl" role="img" aria-label={loc.country}>
                        {loc.flag}
                      </span>
                      <div>
                        <h4 className="text-sm font-display font-extrabold text-slate-900 tracking-tight leading-none">
                          {loc.city}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-sans font-medium block mt-0.5">
                          {loc.country}
                        </span>
                      </div>
                    </div>

                    {isHq ? (
                      <span className="text-[9px] font-mono font-black text-[#326E45] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        GLOBAL HQ
                      </span>
                    ) : isIsl ? (
                      <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-100">
                        NATIONAL OPS
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                        NODE [0{idx + 1}]
                      </span>
                    )}
                  </div>

                  <p className={`text-xs font-sans font-normal leading-relaxed ${
                    isHq ? 'text-slate-800 font-medium' : 'text-slate-600'
                  }`}>
                    {loc.role}
                  </p>

                  {/* Head of Operations Badge in Card */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2.5">
                    <img
                      src={loc.headOfOperations.photo}
                      alt={loc.headOfOperations.name}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold font-sans text-slate-800 truncate leading-none">
                        {loc.headOfOperations.name}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-700 font-medium truncate mt-0.5">
                        {loc.headOfOperations.roleType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[#326E45] font-bold">Contact Office &rarr;</span>
                  <span className="text-[#326E45] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#326E45] animate-ping" />
                    <span>ACTIVE</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Status & Connectivity Legend */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 bg-white border border-slate-200/90 rounded-full shadow-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#326E45] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#326E45]"></span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold text-[#326E45] tracking-wider uppercase">
                GLOBAL HQ: KARACHI, PAKISTAN 🇵🇰
              </span>
            </div>

            <span className="text-slate-300 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-[#326E45]" />
              <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-700 tracking-wider uppercase">
                24/7 ENTERPRISE PIPELINE ACTIVE
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ELEGANT MODAL CARD FOR HEAD OF OPERATIONS */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 text-slate-900 my-auto"
            >
              {/* Header Banner Background */}
              <div className="bg-gradient-to-r from-slate-900 via-[#183923] to-[#326E45] p-6 text-white relative">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-slate-200 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <Globe size={14} />
                  <span>Regional Operations Command • {selectedNode.country}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={selectedNode.country}>
                    {selectedNode.flag}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-white leading-tight">
                      {selectedNode.city}, {selectedNode.country}
                    </h3>
                    <p className="text-xs font-sans text-slate-300 mt-0.5">
                      {selectedNode.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Profile Card Header */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={selectedNode.headOfOperations.photo}
                      alt={selectedNode.headOfOperations.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#326E45]/30 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white border-2 border-white shadow-xs">
                      <UserCheck size={12} />
                    </div>
                  </div>

                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 w-fit mb-1">
                      {selectedNode.headOfOperations.roleType}
                    </span>
                    <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
                      {selectedNode.headOfOperations.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-600 mt-0.5 font-medium">
                      {selectedNode.headOfOperations.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-emerald-700">
                      <Clock size={12} />
                      <span className="font-semibold">{selectedNode.headOfOperations.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Executive Bio */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
                  <h5 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#326E45]" />
                    <span>Executive Biography</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                    {selectedNode.headOfOperations.bio}
                  </p>
                </div>

                {/* Regional Details & Contact info */}
                {!contactMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div className="p-3 rounded-xl border border-slate-200 bg-white">
                        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Primary Focus Area</div>
                        <div className="text-xs font-sans font-bold text-slate-800 mt-1 leading-tight">
                          {selectedNode.headOfOperations.focus}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-slate-200 bg-white">
                        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Regional Office Address</div>
                        <div className="text-xs font-sans font-medium text-slate-700 mt-1 leading-tight flex items-start gap-1">
                          <MapPin size={12} className="text-[#326E45] shrink-0 mt-0.5" />
                          <span className="truncate">{selectedNode.headOfOperations.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => setContactMode(true)}
                        className="flex-1 px-5 py-3 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Mail size={15} />
                        <span>Contact Regional Office</span>
                      </button>
                      <a
                        href={`mailto:${selectedNode.headOfOperations.email}`}
                        className="px-4 py-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink size={14} />
                        <span>Direct Email</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Inline Regional Office Inquiry Form */
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 text-left space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold font-sans text-slate-900">
                        <Send size={14} className="text-[#326E45]" />
                        <span>Inquire with {selectedNode.city} Regional Office</span>
                      </div>
                      <button 
                        onClick={() => setContactMode(false)}
                        className="text-xs font-mono text-slate-500 hover:text-slate-800 underline"
                      >
                        Back
                      </button>
                    </div>

                    {contactSent ? (
                      <div className="py-6 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <CheckCircle2 size={20} />
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">Message Transmitted</h5>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto">
                          Your request has been routed to <strong>{selectedNode.headOfOperations.name}</strong> ({selectedNode.city} Office). We will respond shortly.
                        </p>
                        <button
                          onClick={() => { setContactSent(false); setContactMode(false); }}
                          className="mt-3 px-4 py-1.5 rounded-lg bg-slate-900 text-white font-sans text-xs font-bold"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Corporate Email</label>
                          <input
                            type="email"
                            required
                            placeholder="j.doe@company.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Project or Inquiry Details</label>
                          <textarea
                            required
                            rows={3}
                            placeholder={`How can the MetaWave ${selectedNode.city} team assist your enterprise?`}
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <Send size={13} />
                          <span>Transmit Inquiry to {selectedNode.city} Regional Team</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Animation keyframes */}
      <style>{`
        @keyframes dataFlow {
          to {
            stroke-dashoffset: -28;
          }
        }
        @keyframes ripple {
          0% {
            r: 5px;
            opacity: 0.9;
            stroke-width: 1.5;
          }
          100% {
            r: 40px;
            opacity: 0;
            stroke-width: 0.5;
          }
        }
        .animate-ripple-1 {
          animation: ripple 3.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .animate-ripple-2 {
          animation: ripple 3.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          animation-delay: 1.75s;
        }
      `}</style>
    </section>
  );
}

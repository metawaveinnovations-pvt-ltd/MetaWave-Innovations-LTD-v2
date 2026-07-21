import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Server, Sparkles, Building, ArrowUpRight, ArrowRight } from 'lucide-react';

interface Market {
  country: string;
  role: string;
  description: string;
  tag: string;
  coords: string;
  presenceType: 'Hub' | 'Delivery' | 'Expansion';
}

export function GlobalPresence() {
  const [hoveredMarket, setHoveredMarket] = useState<number | null>(null);

  const markets: Market[] = [
    {
      country: 'United Kingdom',
      role: 'Client Consultation & Business Development',
      description: 'Headquarters for our executive strategy, client relations, and digital transformation consulting divisions. Servicing enterprise clients across London, Manchester, and the wider UK.',
      tag: 'LONDON HUB',
      coords: '51.5074° N, 0.1278° W',
      presenceType: 'Hub'
    },
    {
      country: 'United Arab Emirates',
      role: 'Strategic Middle-East Delivery',
      description: 'Strategic headquarters for automated CRM/ERP ecosystems, retail business growth systems, and smart automation systems servicing Dubai, Abu Dhabi, and the GCC region.',
      tag: 'DUBAI OFFICE',
      coords: '25.2048° N, 55.2708° E',
      presenceType: 'Hub'
    },
    {
      country: 'United States',
      role: 'Enterprise Strategy & Technology Architecture',
      description: 'Serving North American clients with high-end cloud migration blueprints, zero-trust cybersecurity frameworks, and custom SaaS platform architecture.',
      tag: 'NEW YORK HUB',
      coords: '40.7128° N, 74.0060° W',
      presenceType: 'Hub'
    },
    {
      country: 'Pakistan',
      role: 'Global Offshore Engineering & Systems R&D Center',
      description: 'Vanguard systems development hub specialising in custom software development, artificial intelligence model training, automated QA, and high-performance engineering delivery.',
      tag: 'ISLAMABAD HQ',
      coords: '33.6844° N, 73.0479° E',
      presenceType: 'Delivery'
    },
    {
      country: 'Saudi Arabia & EU Zone',
      role: 'Target Future Expansion Territories',
      description: 'Advancing our regional capabilities to support government digitisation initiatives and enterprise technology modernisation across Riyadh and Berlin.',
      tag: 'FUTURE EXPANSION',
      coords: 'Riyadh & Berlin',
      presenceType: 'Expansion'
    }
  ];

  return (
    <section id="global-presence" className="py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-mwi-base via-mwi-tint-30 to-mwi-base" />
      
      {/* Background soft glowing blur */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-500/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-slate-500/[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
            <Globe size={11} className="text-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
              OPERATIONAL REACH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Global distributed delivery model
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            MetaWave operates a secure, unified delivery architecture spanning major economic corridors to ensure 24/7 technical continuity and strategic agility.
          </p>
        </div>

        {/* Global Strategy Layer Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-12 xl:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase block">
                DELIVERY ORCHESTRATION
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 leading-tight">
                Empowering businesses across borders with complete operational oversight
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Our unique distributed model unites high-authority client consultation teams in London, Dubai, and New York with our state-of-the-art engineering hubs in Pakistan. By using direct real-time communication bridges and agile code reviews, we completely eliminate standard outsourcing communication bottlenecks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200/80 bg-white p-5 rounded-2xl shadow-2xs hover:border-[#326E45]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-800">
                  <div className="p-1 rounded-lg bg-emerald-50 text-[#326E45]">
                    <Server size={14} />
                  </div>
                  <h4 className="text-xs font-bold font-sans">Active Redundancy</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Dual-active staging databases and hot-redundant container registries ensure zero risk during global rollouts.
                </p>
              </div>

              <div className="border border-slate-200/80 bg-white p-5 rounded-2xl shadow-2xs hover:border-[#326E45]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-800">
                  <div className="p-1 rounded-lg bg-emerald-50 text-[#326E45]">
                    <MapPin size={14} />
                  </div>
                  <h4 className="text-xs font-bold font-sans">Overlapping Segments</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Synchronised sprint review sessions in European, Middle Eastern, and Asian time zones to accommodate our clients\' schedules.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Visual World Map Grid */}
          <div className="lg:col-span-12 xl:col-span-6">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[440px]">
              
              {/* Custom SVG/Pattern Styled Map */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 bg-slate-950">
                <img
                  src="/src/assets/images/mwi_global_systems_1782517569461.jpg"
                  alt="MetaWave Global Distributed Software Delivery Pipeline Network"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 transform hover:scale-[1.03] transition-transform duration-[2.5s]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay subtle tech pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.08]" 
                  style={{
                    backgroundImage: `radial-gradient(circle, #FFF 1px, transparent 1px)`,
                    backgroundSize: '12px 12px'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Simulated World Lines connecting hubs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-55 z-10">
                  {/* Lines between Pakistan (72%, 39%), UK (46%, 20%), Dubai (62%, 38%), NY (25%, 25%) */}
                  <path d="M 120 56 Q 160 30 220 44" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 220 44 Q 260 75 300 85" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="3,3" />
                </svg>

                {/* US Hub Dot */}
                <button 
                  onMouseEnter={() => setHoveredMarket(2)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  className="absolute left-[25%] top-[25%] group cursor-pointer z-20"
                >
                  <span className="absolute inset-0 w-6 h-6 rounded-full bg-emerald-400/20 -translate-x-2 -translate-y-2 animate-ping" />
                  <span className={`block w-3.5 h-3.5 rounded-full border-2 border-slate-900 shadow-xs transition-all ${
                    hoveredMarket === 2 ? 'bg-[#34D399]' : 'bg-slate-300'
                  }`} />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[7px] font-bold px-1 py-0.5 rounded shadow-xs whitespace-nowrap">NY</span>
                </button>

                {/* UK Hub Dot */}
                <button 
                  onMouseEnter={() => setHoveredMarket(0)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  className="absolute left-[46%] top-[20%] group cursor-pointer z-20"
                >
                  <span className="absolute inset-0 w-6 h-6 rounded-full bg-emerald-400/20 -translate-x-2 -translate-y-2 animate-ping" />
                  <span className={`block w-3.5 h-3.5 rounded-full border-2 border-slate-900 shadow-xs transition-all ${
                    hoveredMarket === 0 ? 'bg-[#34D399]' : 'bg-slate-300'
                  }`} />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[7px] font-bold px-1 py-0.5 rounded shadow-xs whitespace-nowrap">LDN</span>
                </button>

                {/* Dubai Hub Dot */}
                <button 
                  onMouseEnter={() => setHoveredMarket(1)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  className="absolute left-[62%] top-[38%] group cursor-pointer z-20"
                >
                  <span className="absolute inset-0 w-6 h-6 rounded-full bg-emerald-400/20 -translate-x-2 -translate-y-2 animate-ping" />
                  <span className={`block w-3.5 h-3.5 rounded-full border-2 border-slate-900 shadow-xs transition-all ${
                    hoveredMarket === 1 ? 'bg-[#34D399]' : 'bg-slate-300'
                  }`} />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[7px] font-bold px-1 py-0.5 rounded shadow-xs whitespace-nowrap">DXB</span>
                </button>

                {/* PK Hub Dot */}
                <button 
                  onMouseEnter={() => setHoveredMarket(3)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  className="absolute left-[72%] top-[39%] group cursor-pointer z-20"
                >
                  <span className="absolute inset-0 w-6 h-6 rounded-full bg-emerald-400/30 -translate-x-2 -translate-y-2 animate-ping" fill="currentColor" />
                  <span className={`block w-4 h-4 rounded-full border-2 border-slate-900 shadow-xs transition-all ${
                    hoveredMarket === 3 ? 'bg-[#34D399] scale-125 shadow-md' : 'bg-[#34D399]'
                  }`} />
                  <span className="absolute top-5 left-1/2 -translate-x-1/2 bg-emerald-950 text-emerald-300 font-mono text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs border border-emerald-500/25 whitespace-nowrap">PK R&D Center</span>
                </button>

                <div className="absolute bottom-2 right-3 font-mono text-[8px] text-slate-300 z-10">
                  REAL-TIME DISTRIBUTED INFRASTRUCTURE MATRIX // ACTIVE
                </div>

              </div>

              {/* Detail Info of Selected/Hovered Hub */}
              <div className="border-t border-slate-100 pt-5 space-y-3 text-left">
                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45] uppercase block">
                  FOCUS LOCATION CLASSIFICATION:
                </span>
                
                {/* Fallback show Islamabad HQ by default, otherwise hovered */}
                <div className="min-h-[110px]">
                  {(() => {
                    const currentIdx = hoveredMarket !== null ? hoveredMarket : 3;
                    const market = markets[currentIdx];
                    return (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#326E45]" />
                            <h4 className="text-sm font-display font-black leading-none">{market.country}</h4>
                          </div>
                          <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            market.presenceType === 'Hub' 
                              ? 'bg-emerald-50 border border-emerald-100 text-[#326E45]' 
                              : market.presenceType === 'Delivery' 
                                ? 'bg-blue-50 border border-blue-105 text-blue-600' 
                                : 'bg-slate-150 text-slate-550'
                          }`}>
                            {market.tag}
                          </span>
                        </div>
                        <span className="block text-[10px] font-mono text-slate-400 font-bold leading-none">{market.coords}</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-normal pt-1">{market.description}</p>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Market Grid Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {markets.map((m, idx) => (
            <div 
              key={m.country}
              onMouseEnter={() => setHoveredMarket(idx)}
              onMouseLeave={() => setHoveredMarket(null)}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[160px] cursor-pointer transition-all duration-300 ${
                hoveredMarket === idx 
                  ? 'bg-white border-[#326E45] shadow-md -translate-y-1' 
                  : 'bg-white/60 border-slate-200/80 hover:border-slate-350 hover:bg-white'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded inline-block">
                  {m.tag}
                </span>
                <h4 className="text-xs font-bold text-slate-800 font-sans tracking-tight leading-tight">
                  {m.country}
                </h4>
                <p className="text-[10px] text-slate-450 leading-normal font-normal lines-clipped text-ellipsis overflow-hidden h-12">
                  {m.role}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span>{m.presenceType.toUpperCase()} STATUS</span>
                {m.presenceType === 'Hub' || m.presenceType === 'Delivery' ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                    <span>ONLINE</span>
                  </span>
                ) : (
                  <span className="text-slate-450 font-bold">PLANNED</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { Zap, Cable, Clock, CheckCircle2 } from "lucide-react";

export const ServicesDetail: React.FC = () => {
  const details = [
    {
      id: "substation-epc",
      title: "Substation EPC Erection",
      category: "POWER DISTRIBUTION",
      subtitle: "33kV / 22kV / 11kV Turnkey Substation Setup",
      desc: "We deliver comprehensive engineering, procurement, and construction (EPC) services for outdoor and indoor substations. From civil foundations to structural steel gantries, power transformer installation, and protection control panel setups, we ensure grid compatibility and safety.",
      specs: [
        "Erection of Transformers up to 10 MVA",
        "Erection of structural steel gantries & towers",
        "Installation of SF6 circuit breakers & isolators",
        "Laying of substation grounding/earthing grids",
        "Liaison approvals with electricity boards & MSEDCL"
      ],
      icon: Zap,
      accentColor: "#E87722",
      // Custom SVG engineering drawing representation
      blueprint: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-glow-amber">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(232, 119, 34, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Transformer outline */}
          <rect x="130" y="110" width="140" height="100" rx="6" fill="none" stroke="#E87722" strokeWidth="2" strokeDasharray="4 2" />
          {/* Radiator fins */}
          <line x1="100" y1="120" x2="130" y2="120" stroke="#E87722" strokeWidth="1.5" />
          <line x1="100" y1="140" x2="130" y2="140" stroke="#E87722" strokeWidth="1.5" />
          <line x1="100" y1="160" x2="130" y2="160" stroke="#E87722" strokeWidth="1.5" />
          <line x1="100" y1="180" x2="130" y2="180" stroke="#E87722" strokeWidth="1.5" />
          <line x1="100" y1="200" x2="130" y2="200" stroke="#E87722" strokeWidth="1.5" />
          
          <line x1="270" y1="120" x2="300" y2="120" stroke="#E87722" strokeWidth="1.5" />
          <line x1="270" y1="140" x2="300" y2="140" stroke="#E87722" strokeWidth="1.5" />
          <line x1="270" y1="160" x2="300" y2="160" stroke="#E87722" strokeWidth="1.5" />
          <line x1="270" y1="180" x2="300" y2="180" stroke="#E87722" strokeWidth="1.5" />
          <line x1="270" y1="200" x2="300" y2="200" stroke="#E87722" strokeWidth="1.5" />
          {/* Conservator tank */}
          <rect x="170" y="65" width="60" height="25" rx="3" fill="none" stroke="#E87722" strokeWidth="1.5" />
          <line x1="200" y1="90" x2="200" y2="110" stroke="#E87722" strokeWidth="2" />
          {/* Bushings */}
          <line x1="150" y1="110" x2="150" y2="85" stroke="#00D4FF" strokeWidth="2" />
          <circle cx="150" cy="80" r="5" fill="#00D4FF" />
          <line x1="200" y1="110" x2="200" y2="85" stroke="#00D4FF" strokeWidth="2" />
          <circle cx="200" cy="80" r="5" fill="#00D4FF" />
          <line x1="250" y1="110" x2="250" y2="85" stroke="#00D4FF" strokeWidth="2" />
          <circle cx="250" cy="80" r="5" fill="#00D4FF" />
          {/* Ground indicator */}
          <line x1="130" y1="190" x2="130" y2="230" stroke="#39FF14" strokeWidth="1.5" />
          <line x1="120" y1="230" x2="140" y2="230" stroke="#39FF14" strokeWidth="2" />
          <line x1="124" y1="235" x2="136" y2="235" stroke="#39FF14" strokeWidth="1.5" />
          <line x1="128" y1="240" x2="132" y2="240" stroke="#39FF14" strokeWidth="1" />
          <text x="20" y="40" className="font-mono text-[9px] fill-[#E87722] tracking-widest uppercase">SCHEMATIC: DB-T1 CORE MVA</text>
        </svg>
      )
    },
    {
      id: "cable-jointing",
      title: "HT & LT Cabling Works",
      category: "CABLE ENGINEERING",
      subtitle: "Underground Cabling, Jointing & End Terminations",
      desc: "Our team excels in laying High Tension (HT) and Low Tension (LT) XLPE/PVC cables. We carry out precision cable straight jointing and end terminations using heat-shrinkable kits, backed by insulation resistance (IR) and High Potential (HiPot) safety testing.",
      specs: [
        "Laying of XLPE cables up to 33kV",
        "Heat-shrinkable straight through joints",
        "Indoor & outdoor cable end terminations",
        "High Potential (HiPot) testing & insulation profiling",
        "Cable trenching, piping, and backfilling operations"
      ],
      icon: Cable,
      accentColor: "#00D4FF",
      blueprint: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-glow-cyan">
          <defs>
            <pattern id="grid-cyan" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cyan)" />
          {/* Cable profile */}
          <rect x="50" y="130" width="300" height="40" rx="4" fill="none" stroke="#00D4FF" strokeWidth="2" />
          {/* Inside core lines */}
          <line x1="50" y1="150" x2="350" y2="150" stroke="#00D4FF" strokeWidth="1" strokeDasharray="3 3" />
          {/* Joint sleeve */}
          <rect x="140" y="115" width="120" height="70" rx="8" fill="none" stroke="#E87722" strokeWidth="2.5" />
          {/* Copper joints inside */}
          <circle cx="160" cy="150" r="8" fill="none" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="8" fill="none" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="240" cy="150" r="8" fill="none" stroke="#00D4FF" strokeWidth="1.5" />
          {/* Measurement line */}
          <line x1="140" y1="210" x2="260" y2="210" stroke="#E8EDF5" strokeWidth="1" />
          <line x1="140" y1="205" x2="140" y2="215" stroke="#E8EDF5" strokeWidth="1" />
          <line x1="260" y1="205" x2="260" y2="215" stroke="#E8EDF5" strokeWidth="1" />
          <text x="165" y="225" className="font-mono text-[9px] fill-text-light/60 tracking-wider">SLEEVE: 1200mm</text>
          
          <text x="20" y="40" className="font-mono text-[9px] fill-[#00D4FF] tracking-widest uppercase">SECTION: HT JOINT SLEEVE PROFILE</text>
        </svg>
      )
    },
    {
      id: "emergency-restoration",
      title: "24/7 Emergency Services",
      category: "GRID RELIABILITY",
      subtitle: "Rapid Breakdown Troubleshooting & Power Restoration",
      desc: "Grid shutdowns hurt productivity. Our 24/7 rapid response unit is equipped with advanced diagnostic tools to trace underground faults, filter deteriorated transformer oil, replace blown fuses/insulators, and safely restore power to your premises.",
      specs: [
        "24-Hour emergency industrial call-out support",
        "Underground cable fault location & trace testing",
        "On-site transformer oil filtration & BDV testing",
        "Rapid replacement of damaged structure materials",
        "Temporary backup grid setups & safety clearances"
      ],
      icon: Clock,
      accentColor: "#39FF14",
      blueprint: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <pattern id="grid-green" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(57, 255, 20, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-green)" />
          {/* Oscilloscope boundary */}
          <rect x="60" y="70" width="280" height="160" rx="10" fill="none" stroke="#39FF14" strokeWidth="2" strokeOpacity="0.8" />
          {/* Center line */}
          <line x1="60" y1="150" x2="340" y2="150" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.3" />
          {/* Voltage spike line */}
          <path d="M 60 150 L 120 150 L 140 180 L 160 80 L 180 210 L 200 140 L 220 155 L 240 150 L 340 150" fill="none" stroke="#39FF14" strokeWidth="2.5" />
          {/* Grid markers */}
          <circle cx="160" cy="80" r="4" fill="#39FF14" />
          <text x="160" y="65" className="font-mono text-[9px] fill-[#39FF14] text-center">FAULT DETECTED: PHASE B</text>
          
          <text x="20" y="40" className="font-mono text-[9px] fill-[#39FF14] tracking-widest uppercase">MONITOR: 24/7 GRID OSCILLOGRAM</text>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="services-detail" 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          const isEven = index % 2 === 0;

          return (
            <div 
              key={detail.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Text Area (Even index: left, Odd index: right on desktop) */}
              <div className={`lg:col-span-6 flex flex-col ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-substation-dark border border-neutral-800 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" style={{ color: detail.accentColor }} />
                  </div>
                  <span className="text-[10px] md:text-xs font-mono px-2 py-0.5 rounded border border-neutral-800 bg-substation-dark text-arc-cyan tracking-widest">
                    {detail.category}
                  </span>
                </div>
                
                <h3 className="font-orbitron font-extrabold text-2xl md:text-4xl text-text-light mb-2">
                  {detail.title}
                </h3>
                
                <h4 className="font-orbitron text-xs md:text-sm font-semibold text-electric-amber mb-6 tracking-wide">
                  {detail.subtitle}
                </h4>
                
                <p className="font-inter text-xs md:text-sm text-text-light/60 leading-relaxed mb-6">
                  {detail.desc}
                </p>

                {/* Specs List */}
                <ul className="flex flex-col gap-3">
                  {detail.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="flex items-start gap-3">
                      <CheckCircle2 
                        className="w-4 h-4 mt-0.5 flex-shrink-0" 
                        style={{ color: detail.accentColor }} 
                      />
                      <span className="font-inter text-xs md:text-sm text-text-light/80">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Graphical Blueprint Area */}
              <div 
                className={`lg:col-span-6 h-[260px] md:h-[340px] rounded-2xl border border-neutral-900 bg-[#0F3460]/15 overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center p-4 relative group ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Visual corners to reinforce industrial style */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-800" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-800" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-neutral-800" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-neutral-800" />

                {detail.blueprint}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesDetail;

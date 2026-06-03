import React from "react";
import { Zap } from "lucide-react";

export const TrustBar: React.FC = () => {
  const trustItems = [
    "62+ Technical Professionals",
    "10,000+ Jointing Operations",
    "20% YoY Grid Growth",
    "Established since 1987",
    "Chikhali, Pune Hub",
    "MSEDCL Class-A License",
    "CEA Safety Compliant",
    "5+ Turnkey Substations"
  ];

  // Double items to create smooth infinite wrap
  const marqueeItems = [...trustItems, ...trustItems];

  return (
    <div className="relative py-6 bg-[#080b15] border-t border-b border-neutral-900 overflow-hidden z-10">
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5A623]/5 to-transparent pointer-events-none" />

      <div className="flex w-max items-center">
        {/* Repeating List */}
        <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap pr-16 md:pr-24">
          {marqueeItems.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 text-xs md:text-sm font-orbitron font-bold tracking-widest text-text-light/60 group cursor-default"
            >
              <Zap className="w-3.5 h-3.5 text-electric-amber group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_2px_#F5A623]" />
              <span className="hover:text-text-light transition-colors duration-300">
                {item.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

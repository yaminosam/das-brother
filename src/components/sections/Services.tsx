import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Network, Cable, Cpu, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

interface ServicesProps {
  hoveredService: number | null;
  onHoverService: (index: number | null) => void;
}

export const Services: React.FC<ServicesProps> = ({ hoveredService, onHoverService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const servicesData = [
    {
      title: "Electrical Design",
      desc: "Custom engineering layout designs, CAD blueprints, system protection coordination, and load calculation sheets.",
      icon: Compass,
      color: "from-arc-cyan/20 to-transparent",
      borderColor: "group-hover:border-arc-cyan/40",
      iconColor: "text-arc-cyan"
    },
    {
      title: "Substation Construction",
      desc: "Turnkey erection & commissioning of 11kV / 22kV / 33kV substations, power transformers, and switchyard gantries.",
      icon: Network,
      color: "from-electric-amber/20 to-transparent",
      borderColor: "group-hover:border-electric-amber/40",
      iconColor: "text-electric-amber"
    },
    {
      title: "HT & LT Works",
      desc: "High Tension & Low Tension underground cable laying, straight jointing, end termination, and overhead line structures.",
      icon: Cable,
      color: "from-arc-cyan/20 to-transparent",
      borderColor: "group-hover:border-arc-cyan/40",
      iconColor: "text-arc-cyan"
    },
    {
      title: "Panel Fabrication",
      desc: "Manufacturing custom electric control panels, power distribution boards (PDB), motor control centers (MCC), and APFC panels.",
      icon: Cpu,
      color: "from-electric-amber/20 to-transparent",
      borderColor: "group-hover:border-electric-amber/40",
      iconColor: "text-electric-amber"
    },
    {
      title: "Emergency Services",
      desc: "24/7 emergency breakdown troubleshooting, fault location trace testing, transformer oil filtration, and rapid restoration.",
      icon: AlertTriangle,
      color: "from-red-500/10 to-transparent",
      borderColor: "group-hover:border-red-500/40",
      iconColor: "text-red-500"
    },
    {
      title: "Installation & Commissioning",
      desc: "Final testing parameters validation, safety statutory inspection approvals, and full energization sequence execution.",
      icon: ShieldCheck,
      color: "from-success-live/15 to-transparent",
      borderColor: "group-hover:border-success-live/40",
      iconColor: "text-success-live"
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 55 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10 bg-[#1A1A2E]/40"
    >
      {/* Background elements */}
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-electric-amber/5 blur-[150px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-arc-cyan/5 blur-[120px] -z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono text-electric-amber tracking-[0.3em] uppercase mb-3"
          >
            Capabilities & EPC Solutions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight mb-4"
          >
            Wired for Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-text-light/60 text-sm md:text-base leading-relaxed"
          >
            Hover on cards or interact with the 3D Circuit Board to inspect our high-voltage electrical grid capabilities.
          </motion.p>
        </div>

        {/* Split Layout: 3D PCB Left | Service Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Static Image Replacement */}
          <div className="lg:col-span-5 min-h-[400px] lg:min-h-0 rounded-2xl border border-neutral-900 bg-[#0F3460]/25 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative isolate z-0 flex flex-col justify-stretch">
            
            {/* Floating Label */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1A2E]/80 border border-neutral-800 text-[10px] font-mono text-text-light/50">
              <span className="w-1.5 h-1.5 rounded-full bg-arc-cyan" />
              OUR EXPERTISE
            </div>
            
            {/* The Image */}
            <div className="w-full h-full min-h-[400px] lg:h-auto flex-grow relative">
              <img 
                src="public/images/circuitborard.png" 
                alt="Electrical Services" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
          </div>

          {/* Right Column: HTML Cards Grid (2 columns on desktop/tablet) */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full"
            >
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                const isHovered = hoveredService === index;

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="group cursor-pointer"
                    onMouseEnter={() => onHoverService(index)}
                    onMouseLeave={() => onHoverService(null)}
                  >
                    <div 
                      className={`h-full p-6 rounded-2xl glass-panel border transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden ${
                        isHovered 
                          ? "border-electric-amber shadow-[0_0_30px_rgba(245,166,35,0.25)] bg-[#0F3460]/90" 
                          : "border-neutral-900 bg-[#0F3460]/30 hover:border-neutral-800"
                      }`}
                    >
                      {/* Subtle color highlight circle on active hover */}
                      <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${service.color} blur-2xl group-hover:scale-125 transition-transform duration-700`} />
                      
                      <div>
                        {/* Glowing Icon Container */}
                        <div className={`w-11 h-11 rounded-xl bg-substation-dark border border-neutral-800/80 flex items-center justify-center mb-5 group-hover:border-electric-amber/30 transition-all duration-300 ${
                          isHovered ? "border-electric-amber/60 shadow-[0_0_15px_rgba(245,166,35,0.15)]" : ""
                        }`}>
                          <IconComponent className={`w-5 h-5 ${service.iconColor} filter drop-shadow-[0_0_3px_currentColor]`} />
                        </div>

                        <h3 className="font-orbitron font-extrabold text-base text-text-light group-hover:text-electric-amber transition-colors duration-300 mb-2 flex items-center gap-2">
                          {service.title}
                          {isHovered && (
                            <span className="w-1.5 h-1.5 rounded-full bg-success-live animate-ping" />
                          )}
                        </h3>

                        <p className="font-inter text-xs md:text-sm text-text-light/60 group-hover:text-text-light/80 transition-colors leading-relaxed mb-5">
                          {service.desc}
                        </p>
                      </div>

                      <div className="font-orbitron text-[10px] font-bold tracking-widest text-arc-cyan group-hover:text-electric-amber transition-colors duration-300 flex items-center gap-1 mt-auto">
                        LEARN DETAILS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;

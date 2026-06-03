import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Award, ArrowRight } from "lucide-react";

export const Careers: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const pathways = [
    {
      title: "HV Technical Workshops",
      type: "STUDENTS & ACADEMICS",
      desc: "Comprehensive 2-day on-site training sessions covering safety protocols, high-voltage equipment structures, and cable jointing principles.",
      eligibility: "Engineering students (Electrical/EE)",
      highlights: ["Live outdoor substation visit", "Hands-on joint kit demo", "Official certificate of merit"],
      icon: GraduationCap,
      delay: 0,
      duration: 6,
      accentColor: "#00D4FF"
    },
    {
      title: "Power Grid Internships",
      type: "GRADUATES & FRESHERS",
      desc: "A immersive 3 to 6-month hands-on apprenticeship program working alongside licensed project managers on real substations and wiring networks.",
      eligibility: "Degree/Diploma fresh graduates",
      highlights: ["Monthly stipend allowance", "Real-world site assignment", "PPO (Pre-Placement Offer) scope"],
      icon: Award,
      delay: 0.8,
      duration: 5.5,
      accentColor: "#E87722"
    },
    {
      title: "HV Engineer Careers",
      type: "EXPERIENCED PROFESSIONALS",
      desc: "Full-time roles for licensed, high-voltage certified electrical engineers, project managers, panel fabricators, and safety officers.",
      eligibility: "MSEDCL licensed, 2+ yrs exp",
      highlights: ["Competitive industry salary package", "PF, gratuity, and accident cover", "Performance project bonuses"],
      icon: Briefcase,
      delay: 1.6,
      duration: 6.5,
      accentColor: "#39FF14"
    }
  ];

  return (
    <section 
      id="careers" 
      ref={sectionRef} 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      {/* Background glowing overlays */}
      <div className="absolute top-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-[#39FF14]/3 blur-[140px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-arc-cyan/3 blur-[120px] -z-20 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Title Heading */}
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-xs font-mono text-electric-amber tracking-[0.35em] uppercase block mb-3">
            Talent & Apprenticeships
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight">
            Join the High Voltage Team
          </h2>
          <p className="font-inter text-text-light/60 text-xs md:text-sm mt-3 leading-relaxed">
            We are always scouting for energetic minds. Explore technical workshops, site internships, and full-time engineering careers in Pune.
          </p>
        </div>

        {/* Floating cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">
          {pathways.map((path, index) => {
            const Icon = path.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                {/* Anti-Gravity Floating Wrapper */}
                <motion.div
                  animate={{
                    y: [0, -16, 0],
                    rotate: [-0.8, 0.8, -0.8]
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: path.delay
                  }}
                  className="h-full p-8 rounded-2xl border border-neutral-900 bg-[#0F3460]/25 flex flex-col justify-between hover:border-electric-amber/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,119,34,0.05)] relative overflow-hidden group"
                >
                  {/* Glowing background badge */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent blur-md pointer-events-none" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-[#1A1A2E] text-text-light/50 tracking-wider">
                        {path.type}
                      </span>
                      <Icon className="w-5 h-5" style={{ color: path.accentColor }} />
                    </div>

                    <h3 className="font-orbitron font-extrabold text-lg md:text-xl text-text-light mb-2 group-hover:text-electric-amber transition-colors">
                      {path.title}
                    </h3>

                    <p className="font-inter text-xs md:text-sm text-text-light/60 leading-relaxed mb-6">
                      {path.desc}
                    </p>

                    {/* Eligibility details */}
                    <div className="mb-6 pb-6 border-b border-neutral-900/60">
                      <span className="text-[10px] font-mono text-arc-cyan tracking-wider block mb-1">
                        ELIGIBILITY
                      </span>
                      <span className="text-xs font-inter text-text-light/80 font-medium">
                        {path.eligibility}
                      </span>
                    </div>

                    {/* Highlights checklists */}
                    <ul className="flex flex-col gap-2.5 mb-8">
                      {path.highlights.map((hl, hlIdx) => (
                        <li key={hlIdx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success-live" />
                          <span className="font-inter text-xs text-text-light/75">
                            {hl}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <a
                    href="#contact"
                    className="w-full py-3 rounded-xl border border-neutral-800 bg-substation-dark/40 hover:bg-electric-amber hover:text-deep-grid-navy hover:border-electric-amber font-orbitron text-xs font-bold tracking-widest text-text-light/85 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_0_20px_rgba(245,166,35,0.1)]"
                  >
                    APPLY NOW <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Careers;

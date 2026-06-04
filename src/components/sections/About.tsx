import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Briefcase, Award, TrendingUp } from "lucide-react";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const timelineData = [
    {
      year: "1987",
      title: "The Founding Spark",
      desc: "Founded in Chikhali, Pune as a proprietary electrical contracting firm. Initiated with low-tension wiring contracts for local manufacturing workshops.",
      icon: Calendar,
      badge: "Estd. Pune"
    },
    {
      year: "2000",
      title: "HT Licensing & Expansion",
      desc: "Secured Class-A contractor license. Commenced heavy industrial high-tension (HT) terminations and distribution network setups up to 22kV.",
      icon: Briefcase,
      badge: "HT Licensing"
    },
    {
      year: "2010",
      title: "Substation Engineering",
      desc: "Built our first outdoor 33kV substation. Incorporated as Das & Brothers Electricals Pvt Ltd, onboarding 30+ full-time testing engineers.",
      icon: Award,
      badge: "Pvt Ltd status"
    },
    {
      year: "2020",
      title: "Panel Erection & Automation",
      desc: "Inaugurated dedicated fabrication panel assembly units. Standardized state-of-the-art MCC, APFC, and PLC automated panels.",
      icon: TrendingUp,
      badge: "Fabrication Unit"
    },
    {
      year: "Present",
      title: "Empowering Maharashtra",
      desc: "Trusted EPC grid partner with 62+ professionals, 10,000+ completed joint operations, and active substation maintenance contracts across the state.",
      icon: Calendar,
      badge: "62+ Team members"
    }
  ];

  // Letter drop stagger animation variables
  const headingText = "Empowering Maharashtra Since 1987";
  
  const letterContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none -z-20" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div ref={titleRef} className="mb-16 text-center lg:text-left max-w-3xl">
          <span className="text-xs font-mono text-arc-cyan tracking-[0.35em] uppercase block mb-3">
            Our Legacy & Story
          </span>
          <motion.div
            variants={letterContainerVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center lg:justify-start font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight mb-4"
          >
            {headingText.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap mr-3 last:mr-0">
                {word.split("").map((char, charIndex) => (
                  <motion.span 
                    key={charIndex} 
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>
          <p className="font-inter text-text-light/60 text-sm md:text-base leading-relaxed">
            From humble beginnings to building Maharashtra's critical power infrastructure, our journey is defined by engineering precision and electrical reliability.
          </p>
        </div>

        {/* Two Column Layout (Substation Sticky Left | Timeline Scroll Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: STICKY 3D Canvas Substation Scene */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-[350px] lg:h-[500px] rounded-2xl border border-neutral-900 bg-[#0F3460]/25 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group relative isolate z-0">
            
            {/* Static Image Overlays */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1A2E]/80 border border-neutral-800 text-[10px] font-mono text-text-light/60">
              <span className="w-1.5 h-1.5 rounded-full bg-arc-cyan" />
              OUR INFRASTRUCTURE
            </div>

            {/* Render Static Image */}
            <div className="w-full h-full min-h-[400px] lg:h-auto flex-grow relative overflow-hidden rounded-b-2xl lg:rounded-br-2xl">
              <img 
                src="/images/cameremode.PNG" 
                alt="Substation Infrastructure" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
            {/* Render 3D Substation Model */}
          </div>

          {/* Right Column: Historical Vertical Timeline */}
          <div className="lg:col-span-7 relative">
            
            {/* Vertical Timeline Guide Line */}
            <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-electric-amber via-arc-cyan to-[#0F3460] shadow-[0_0_8px_rgba(0,212,255,0.2)]" />

            {/* Timeline Cards */}
            <div className="flex flex-col gap-12">
              {timelineData.map((milestone, index) => {
                const IconComponent = milestone.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                    className="relative pl-10 md:pl-12 group"
                  >
                    {/* Node Pointer Bullet Dot */}
                    <div className="absolute left-[3px] top-1.5 w-6 h-6 rounded-full bg-substation-dark border-2 border-electric-amber flex items-center justify-center z-15 shadow-[0_0_10px_rgba(245,166,35,0.4)] group-hover:border-arc-cyan transition-colors duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-electric-amber group-hover:bg-arc-cyan animate-pulse-glow" />
                    </div>

                    {/* Timeline Bubble Content */}
                    <div className="p-6 md:p-8 rounded-2xl glass-panel border border-neutral-900 bg-[#0F3460]/25 hover:border-neutral-800 hover:bg-[#0F3460]/45 hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative">
                      
                      {/* Year badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-electric-amber group-hover:text-arc-cyan transition-colors" />
                          <span className="font-mono text-2xl md:text-3xl font-black text-electric-amber tracking-wider text-glow-amber">
                            {milestone.year}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded border border-neutral-800 bg-substation-dark text-[9px] font-mono text-text-light/50 tracking-wider">
                          {milestone.badge}
                        </span>
                      </div>

                      <h3 className="font-orbitron font-extrabold text-base md:text-lg text-text-light group-hover:text-arc-cyan transition-colors mb-2">
                        {milestone.title}
                      </h3>

                      <p className="font-inter text-xs md:text-sm text-text-light/60 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      
    </section>
  );
};

export default About;

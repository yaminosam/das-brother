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

        {/* Title Block with Background Image */}
        <div
          ref={titleRef}
          className="mb-16 text-center max-w-5xl mx-auto rounded-3xl border border-neutral-900 overflow-hidden relative p-8 md:p-12 lg:p-16 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] group"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center -z-10 opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: "url('/images/cameremode.png')" }}
          />
          {/* Radial/Linear Gradient overlay to ensure high readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/90 via-[#0F3460]/75 to-[#1A1A2E]/90 -z-10" />

          <span className="text-xs font-mono text-arc-cyan tracking-[0.35em] uppercase block mb-3 relative z-10">
            Our Legacy & Story
          </span>
          <motion.div
            variants={letterContainerVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight mb-4 relative z-10"
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
          <p className="font-inter text-text-light/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto relative z-10">
            From humble beginnings to building Maharashtra's critical power infrastructure, our journey is defined by engineering precision and electrical reliability.
          </p>
        </div>

        {/* Timeline Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {timelineData.map((milestone, index) => {
            const IconComponent = milestone.icon;
            const isLast = index === timelineData.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className={`group ${isLast
                    ? "md:col-span-2 md:justify-self-center w-full md:max-w-xl"
                    : "w-full"
                  }`}
              >
                {/* Timeline Bubble Content */}
                <div className="p-6 md:p-8 rounded-2xl glass-panel border border-neutral-900 bg-[#0F3460]/25 hover:border-neutral-800 hover:bg-[#0F3460]/45 hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative h-full flex flex-col justify-between">
                  <div>
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>


    </section>
  );
};

export default About;

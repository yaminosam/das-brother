import React from "react";
import { motion, type Variants } from "framer-motion";
import { Zap, ArrowRight, ChevronDown } from "lucide-react";


export const Hero: React.FC = () => {
  const words = "Empowering Maharashtra Since 1987".split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] // No need for 'as const' anymore
      }
    }
  };
  return (
    <section

      id="home"
      className="relative h-screen flex flex-col justify-center items-start text-left px-6 md:px-12 lg:px-24 overflow-hidden pt-20 bg-cover bg-center"
      style={{
        // Fixed path: removed "public"
        backgroundImage: "url('/images/dasbro.jpeg')",
      }}
    >

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-slate-950/55 z-0" />
      <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#00D4FF]/5 blur-[120px] -z-20 pointer-events-none" />

      {/* Content wrapper stacked above the background 3D Scene */}
      <div className="relative z-20 w-full flex flex-col justify-center items-start">

        {/* Main Title Heading - Word by word reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.08] text-text-light mb-6">
            {words.map((word, idx) => (
              <span key={idx} className="inline-block mr-3 md:mr-5">
                {word === "Maharashtra" ? (
                  <span className="text-electric-amber text-glow-amber">
                    {word}
                  </span>
                ) : word === "1987" ? (
                  <span className="text-arc-cyan text-glow-cyan">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Subtext description */}
          <motion.p
            variants={wordVariants}
            className="font-inter text-base md:text-xl text-text-light/75 leading-relaxed max-w-2xl mb-10"
          >
            Specialist Electrical EPC Contractors. Engineering high-voltage substations, complete HT/LT networks, and precision power panels for Pune's leading industrial grids.
          </motion.p>

          {/* Action Call to Buttons - NOW WITH SOLID DARK BACKGROUNDS */}
          <motion.div
            variants={wordVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#services"
              className="px-8 py-4 rounded-xl font-orbitron text-xs md:text-sm font-bold tracking-widest text-white bg-slate-950 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              OUR SERVICES <Zap className="w-4 h-4 text-electric-amber" />
            </a>

            <a
              href="#about"
              className="px-8 py-4 rounded-xl font-orbitron text-xs md:text-sm font-bold tracking-widest text-white bg-slate-950 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              VIEW PROJECTS <ArrowRight className="w-4 h-4 text-arc-cyan" />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-5xl border-t border-neutral-900/60 pt-8"
        >
          {[
            { num: "37+", label: "YEARS OF TRUST" },
            { num: "5+", label: "SUBSTATIONS BUILT" },
            { num: "10K+", label: "HT/LT JOINTS" },
            { num: "62", label: "SKILLED ENGINEERS" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-xl md:text-3xl font-black text-arc-cyan tracking-wider">
                {stat.num}
              </span>
              <span className="text-[10px] md:text-xs font-orbitron font-semibold tracking-widest text-text-light/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
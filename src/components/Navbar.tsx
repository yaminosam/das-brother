import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ArrowRight, PhoneCall } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to style navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Substations", href: "#about" },
    { name: "Milestones", href: "#timeline" },
    { name: "Stats", href: "#stats" },
    { name: "Careers", href: "#careers" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled 
            ? "glass-panel py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-neutral-900/60" 
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand area */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-substation-dark/80 border border-neutral-800 shadow-[0_0_15px_rgba(245,166,35,0.1)] group-hover:border-electric-amber/50 transition-all duration-300">
              <Zap className="w-5 h-5 text-electric-amber filter drop-shadow-[0_0_4px_rgba(245,166,35,0.7)] group-hover:rotate-12 transition-transform duration-300" />
              {/* Pulsing ring around logo */}
              <div className="absolute inset-0 rounded-xl border border-arc-cyan/20 animate-ping [animation-duration:3s]" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-orbitron font-black text-sm md:text-base tracking-wider text-text-light group-hover:text-electric-amber transition-colors duration-300">
                DAS & BROTHERS
              </span>
              <span className="text-[9px] font-mono text-arc-cyan tracking-[0.2em] font-medium leading-none">
                ELECTRICALS PVT LTD
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - NOW WITH DARK BUTTON STYLING */}
          <div className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-inter text-sm font-medium text-text-light/80 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/50 shadow-sm backdrop-blur-sm group"
              >
                {link.name}
                {/* Electric hover sweep line */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-electric-amber to-arc-cyan origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(0,212,255,0.5)] rounded-b-xl" />
              </a>
            ))}
          </div>

          {/* Get a Quote CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact"
              className="relative hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-orbitron text-xs font-bold tracking-wider text-deep-grid-navy bg-electric-amber hover:bg-electric-amber-dark transition-all duration-300 overflow-hidden group shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:shadow-[0_0_25px_rgba(245,166,35,0.6)]"
            >
              {/* Electric pulse rings behind button */}
              <span className="absolute inset-0 w-full h-full rounded-xl border border-electric-amber animate-pulse-ring" />
              
              <span className="relative z-10 flex items-center gap-2">
                GET A QUOTE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-800 hover:border-electric-amber/50 hover:bg-[#0F3460]/50 text-text-light transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5 text-electric-amber" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden glass-panel flex flex-col justify-center px-8 border-none"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  onClick={() => setIsOpen(false)}
                  className="font-orbitron text-xl font-bold tracking-wide text-text-light hover:text-electric-amber transition-colors duration-300 py-2 border-b border-neutral-900/40"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-6 flex flex-col gap-4 items-center"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-xs py-3.5 rounded-xl font-orbitron text-sm font-bold tracking-widest text-deep-grid-navy bg-electric-amber hover:bg-electric-amber-dark flex items-center justify-center gap-2"
                >
                  GET A QUOTE <Zap className="w-4 h-4" />
                </a>
                
                <a 
                  href="tel:+91201234567" 
                  className="flex items-center gap-2 font-mono text-xs text-arc-cyan hover:text-text-light transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> +91 20 2749 1987
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
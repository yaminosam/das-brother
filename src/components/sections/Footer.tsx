import React from "react";
import { Zap, Globe, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05070c] border-t border-neutral-950 pt-16 pb-8 px-6 md:px-12 lg:px-24 z-10">
      
      {/* Decorative Technical Diagram Overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-electric-amber" />
              <div className="flex flex-col">
                <span className="font-orbitron font-extrabold text-sm tracking-wider text-text-light">
                  DAS & BROTHERS
                </span>
                <span className="text-[9px] font-mono text-arc-cyan tracking-widest leading-none">
                  ELECTRICALS PVT LTD
                </span>
              </div>
            </a>
            <p className="font-inter text-xs text-text-light/50 leading-relaxed mt-2">
              Class-A Electrical EPC Contractors. Erecting heavy power substations and industrial grids across Maharashtra since 1987.
            </p>
          </div>

          {/* Core Services Links */}
          <div className="flex flex-col gap-4">
            <span className="font-orbitron text-xs font-bold text-text-light/80 tracking-widest">
              EPC SERVICES
            </span>
            <ul className="flex flex-col gap-2 font-inter text-xs text-text-light/55">
              <li><a href="#services" className="hover:text-electric-amber transition-colors">Substation Construction</a></li>
              <li><a href="#services" className="hover:text-electric-amber transition-colors">HT/LT Cable Jointing</a></li>
              <li><a href="#services" className="hover:text-electric-amber transition-colors">Control Panel Assemblies</a></li>
              <li><a href="#services" className="hover:text-electric-amber transition-colors">Grid Erection & Design</a></li>
            </ul>
          </div>

          {/* Milestones / Quick Links */}
          <div className="flex flex-col gap-4">
            <span className="font-orbitron text-xs font-bold text-text-light/80 tracking-widest">
              QUICK NAVIGATION
            </span>
            <ul className="flex flex-col gap-2 font-inter text-xs text-text-light/55">
              <li><a href="#about" className="hover:text-arc-cyan transition-colors">About Legacy</a></li>
              <li><a href="#stats" className="hover:text-arc-cyan transition-colors">Grid Metrics</a></li>
              <li><a href="#careers" className="hover:text-arc-cyan transition-colors">Careers & Workshops</a></li>
              <li><a href="#contact" className="hover:text-arc-cyan transition-colors">Request Callback</a></li>
            </ul>
          </div>

          {/* Licensing and safety */}
          <div className="flex flex-col gap-4">
            <span className="font-orbitron text-xs font-bold text-text-light/80 tracking-widest">
              LICENSING & CODES
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-success-live flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success-live animate-pulse" />
                CLASS-A MSEDCL LICENSE
              </span>
              <span className="text-[10px] font-mono text-arc-cyan flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                CEA SAFETY CODE COMPLIANT
              </span>
              <span className="text-[10px] font-mono text-text-light/45">
                GSTIN: 27AACCD4481P1ZX
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-text-light/35">
          <span>
            &copy; {currentYear} Das & Brothers Electricals Pvt Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-electric-amber transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LINKEDIN
            </a>
            <a 
              href="https://dasbrothers.co.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-arc-cyan transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> OFFICIAL DOMAIN
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

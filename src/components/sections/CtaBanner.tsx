import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

export const CtaBanner: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Substation",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", projectType: "Substation", message: "" });
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10 border-t border-neutral-900/60 bg-[#1A1A2E]/80"
    >
      {/* Background graphic */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-electric-amber/5 blur-[160px] -z-20 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information & Address */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-xs font-mono text-arc-cyan tracking-[0.35em] uppercase block mb-3">
              Power Your Project
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight mb-4">
              Get an EPC Quote
            </h2>
            <p className="font-inter text-text-light/60 text-xs md:text-sm leading-relaxed mb-8">
              Discuss your electrical grid requirements with our expert technicians. From design approvals to complete turnkey commissioning in Maharashtra.
            </p>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-substation-dark border border-neutral-800 flex items-center justify-center text-electric-amber group-hover:border-electric-amber/50 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-text-light/40">PHONE CONNECTION</span>
                  <a href="tel:+912027491987" className="font-mono text-sm text-text-light/80 hover:text-electric-amber transition-colors">
                    +91 20 2749 1987
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-substation-dark border border-neutral-800 flex items-center justify-center text-arc-cyan group-hover:border-arc-cyan/50 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-text-light/40">EMAIL ENQUIRIES</span>
                  <a href="mailto:info@dasbrothers.co.in" className="font-mono text-sm text-text-light/80 hover:text-arc-cyan transition-colors">
                    info@dasbrothers.co.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-substation-dark border border-neutral-800 flex items-center justify-center text-success-live mt-1 group-hover:border-success-live/50 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-text-light/40">SUBSTATION OFFICE</span>
                  <span className="font-inter text-xs md:text-sm text-text-light/85 leading-relaxed">
                    Sector 10, PCNTDA, Chikhali, Pune,<br />
                    Maharashtra - 411019, India.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Quote Request Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl border border-neutral-900 bg-[#0F3460]/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
            
            {/* Visual Grid Indicators */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-800" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-800" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-neutral-800" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-neutral-800" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-orbitron text-[10px] font-bold tracking-wider text-text-light/75">
                    CONTACT NAME
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter name"
                    className="px-4 py-3 rounded-xl border border-neutral-800 bg-substation-dark/40 text-sm font-inter text-text-light focus:outline-none focus:border-electric-amber transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-orbitron text-[10px] font-bold tracking-wider text-text-light/75">
                    EMAIL ADDRESS
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter email"
                    className="px-4 py-3 rounded-xl border border-neutral-800 bg-substation-dark/40 text-sm font-inter text-text-light focus:outline-none focus:border-[#00D4FF] transition-colors"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-2">
                <label className="font-orbitron text-[10px] font-bold tracking-wider text-text-light/75">
                  PROJECT CATEGORY
                </label>
                <select 
                  value={formState.projectType}
                  onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-substation-dark/40 text-sm font-inter text-text-light focus:outline-none focus:border-electric-amber transition-colors appearance-none cursor-pointer"
                >
                  <option value="Substation">Substation Construction (11k/33kV)</option>
                  <option value="Cabling">Underground HT/LT Cabling</option>
                  <option value="Panel">Control Panel Fabrication</option>
                  <option value="Maintenance">Annual Maintenance Contract (AMC)</option>
                  <option value="Other">Other Grid Requirements</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-orbitron text-[10px] font-bold tracking-wider text-text-light/75">
                  SPECIFIC GRID REQUIREMENTS
                </label>
                <textarea 
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your project scope..."
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-substation-dark/40 text-sm font-inter text-text-light focus:outline-none focus:border-electric-amber transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={submitted}
                className="w-full py-4 rounded-xl font-orbitron text-xs md:text-sm font-bold tracking-widest text-deep-grid-navy bg-electric-amber hover:bg-electric-amber-dark flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_15px_rgba(245,166,35,0.2)]"
              >
                {submitted ? (
                  <>
                    QUOTE REQUEST TRANSMITTED <CheckCircle className="w-4 h-4 text-deep-grid-navy" />
                  </>
                ) : (
                  <>
                    SUBMIT ENQUIRY <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Subtitle Message */}
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded border border-success-live/20 bg-success-live/5 text-success-live text-center text-xs font-mono tracking-wider"
                >
                  TRANSMISSION SUCCESS: Grid coordinator will reply within 4 hours.
                </motion.div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

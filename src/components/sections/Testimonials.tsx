import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reviews = [
    {
      name: "Rajesh Kulkarni",
      company: "Kulkarni Engineering Works, Pune",
      text: "Das & Brothers completed our 33kV substation erection in record time. Their technical documentation, liaising support with the electricity board, and commitment to electrical safety standards were outstanding.",
      rating: 5
    },
    {
      name: "Amit Deshmukh",
      company: "Deshmukh Auto Industries, Chikhali",
      text: "When we faced a critical HT underground cable blow-out, their emergency team located the fault within hours and carried out straight joints overnight. Exceptional breakdown response time!",
      rating: 5
    },
    {
      name: "Sanjay Shah",
      company: "Shah Metal Fabricators, Bhosari",
      text: "The custom APFC panel manufactured and installed by them has significantly improved our power factor from 0.82 to 0.98, drastically reducing our monthly MSEDCL utility bills.",
      rating: 5
    },
    {
      name: "Vikram Patil",
      company: "Patil Cold Storage & logistics",
      text: "We hired Das & Brothers for complete electrical design and cabling works. Outstanding engineering precision, neat layout cabling, and professional testing parameters verification.",
      rating: 5
    }
  ];

  // Auto advance logic
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1.25; // Speed of progress fill (about 4 seconds total)
      });
    }, 50);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section 
      id="testimonials" 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10 bg-substation-dark/15 border-t border-b border-neutral-900/40"
    >
      {/* Background glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-[#00D4FF]/3 blur-[140px] -z-20 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-xl">
          <span className="text-xs font-mono text-electric-amber tracking-[0.35em] uppercase block mb-3">
            Client Testimonials & Feedback
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight">
            Trusted by Industries
          </h2>
          <p className="font-inter text-text-light/60 text-xs md:text-sm mt-3 leading-relaxed">
            See what our leading industrial clients say about our high-tension engineering quality and emergency restoration speeds.
          </p>
        </div>

        {/* 3D Perspective Carousel Container */}
        <div className="relative w-full max-w-4xl h-[380px] md:h-[320px] flex items-center justify-center [perspective:1000px] overflow-hidden select-none">
          
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            {reviews.map((review, idx) => {
              // Calculate positional offset relative to active card
              let offset = idx - activeIndex;
              // Handle loop wrapping
              if (offset < -1 && activeIndex === reviews.length - 1) offset = 1;
              if (offset > 1 && activeIndex === 0) offset = -1;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              // Compute 3D translation settings
              const rotateY = isActive ? 0 : isPrev ? 30 : -30;
              const translateX = isActive ? 0 : isPrev ? (isMobile ? -80 : -220) : (isMobile ? 80 : 220);
              const translateZ = isActive ? 0 : (isMobile ? -120 : -150);
              const scale = isActive ? 1.0 : (isMobile ? 0.72 : 0.82);
              const opacity = isActive ? 1.0 : (isMobile ? 0.15 : 0.45);
              const zIndex = isActive ? 10 : 5;

              return (
                <motion.div
                  key={idx}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  className={`absolute w-full max-w-sm md:max-w-md h-[250px] p-6 md:p-8 rounded-2xl border glass-panel flex flex-col justify-between cursor-pointer ${
                    isActive 
                      ? "border-electric-amber bg-[#0F3460]/70 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
                      : "border-neutral-900 bg-[#0F3460]/25 hover:border-neutral-800"
                  }`}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                >
                  {/* Quote decoration */}
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-[#E87722]/10 pointer-events-none" />

                  {/* Body quote */}
                  <p className="font-inter text-xs md:text-sm text-text-light/80 italic leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Footer Client details */}
                  <div className="flex flex-col mt-4">
                    <span className="font-orbitron text-sm font-bold text-text-light group-hover:text-electric-amber">
                      {review.name}
                    </span>
                    <span className="text-[10px] font-mono text-arc-cyan mt-0.5">
                      {review.company}
                    </span>

                    {/* Star Rating list */}
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(review.rating)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-3.5 h-3.5 fill-[#E87722] text-[#E87722] filter drop-shadow-[0_0_2px_#E87722]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Carousel Indicators & Controls */}
        <div className="flex flex-col items-center gap-6 mt-8 z-10">
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-electric-amber hover:bg-[#0F3460]/80 flex items-center justify-center text-text-light/60 hover:text-electric-amber transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-electric-amber" : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-electric-amber hover:bg-[#0F3460]/80 flex items-center justify-center text-text-light/60 hover:text-electric-amber transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Auto advance progress line */}
          <div className="w-48 h-1 bg-substation-dark rounded-full overflow-hidden border border-neutral-900 p-[0.5px]">
            <div 
              className="h-full bg-electric-amber transition-all duration-100 ease-linear shadow-[0_0_6px_#F5A623]"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;

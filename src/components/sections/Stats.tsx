import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Shield, Users, Zap, TrendingUp, Calendar } from "lucide-react";

// CountUp component inside Stats
const CountUpValue: React.FC<{ value: string; startCount: boolean }> = ({ value, startCount }) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  // Extract number and suffix
  const numPart = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!startCount) return;

    const end = numPart;
    if (end === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quad ease-out
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * end);
      
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value, startCount, numPart, suffix]);

  return <span>{displayValue}</span>;
};

// Sub-component for individual Oscilloscope Canvas Waveform
const Oscilloscope: React.FC<{ color: string; speedMultiplier: number; heightMultiplier: number }> = ({ 
  color, 
  speedMultiplier,
  heightMultiplier
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth || 200);
    const height = (canvas.height = canvas.offsetHeight || 80);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
    };
    window.addEventListener("resize", handleResize);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 0.5;
      const gridSize = 15;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw horizontal center reference line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw active sine waveform
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        // Calculate y coordinate based on composite sine waves
        const y = height / 2 + 
          Math.sin(x * 0.03 + offset * speedMultiplier) * (18 * heightMultiplier) +
          Math.cos(x * 0.015 - offset * speedMultiplier * 0.5) * (6 * heightMultiplier);
          
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      offset += 0.08;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, speedMultiplier, heightMultiplier]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-35" />;
};

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    {
      label: "YEARS ESTABLISHED",
      value: "1987",
      sub: "Founded in Pune, Maharashtra",
      icon: Calendar,
      color: "#E87722",
      speed: 1.0,
      height: 0.8
    },
    {
      label: "SUBSTATIONS COMPLETED",
      value: "5+",
      sub: "Heavy 33kV outdoor grids",
      icon: Zap,
      color: "#00D4FF",
      speed: 1.5,
      height: 1.2
    },
    {
      label: "HT/LT CABLE JOINTS",
      value: "10000+",
      sub: "Certified straight jointing",
      icon: Activity,
      color: "#39FF14",
      speed: 2.0,
      height: 0.9
    },
    {
      label: "SKILLED ENGINEERS",
      value: "62",
      sub: "On-site electrical team",
      icon: Users,
      color: "#00D4FF",
      speed: 0.8,
      height: 0.7
    },
    {
      label: "SAFETY INDEX RATIO",
      value: "100%",
      sub: "Zero hazard reportings",
      icon: Shield,
      color: "#E87722",
      speed: 0.5,
      height: 0.5
    },
    {
      label: "YEAR-ON-YEAR GROWTH",
      value: "20%",
      sub: "Annual capacity expansion",
      icon: TrendingUp,
      color: "#39FF14",
      speed: 1.8,
      height: 1.1
    }
  ];

  return (
    <section 
      id="stats" 
      ref={containerRef} 
      className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10 bg-[#1A1A2E]/60 border-t border-neutral-900/40"
    >
      {/* Background circular gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-arc-cyan/5 blur-[120px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-electric-amber/5 blur-[120px] -z-20 pointer-events-none" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-16 max-w-xl">
          <span className="text-xs font-mono text-arc-cyan tracking-[0.35em] uppercase block mb-3 animate-pulse">
            Grid Dashboard & Metrics
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-text-light tracking-tight">
            Power Grid Stats
          </h2>
          <p className="font-inter text-text-light/60 text-xs md:text-sm mt-3 leading-relaxed">
            Real-time visual monitoring of historical parameters, safety records, and project volumes completed.
          </p>
        </div>

        {/* Dashboard 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="relative h-48 rounded-2xl border border-neutral-900/80 bg-[#0F3460]/25 overflow-hidden flex flex-col justify-between p-6 group hover:border-[#E87722]/25 hover:shadow-[0_0_20px_rgba(232,119,34,0.05)] transition-all duration-300"
              >
                {/* 1. Oscilloscope Active Background */}
                <Oscilloscope 
                  color={stat.color} 
                  speedMultiplier={stat.speed} 
                  heightMultiplier={stat.height} 
                />

                {/* 2. Card Header (Icons + Labels) */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-text-light/50 tracking-wider">
                      PARAMETER CODE: DB-{(index + 1) * 100}
                    </span>
                    <span className="font-orbitron text-[10px] md:text-xs font-black tracking-widest text-text-light/80 mt-1">
                      {stat.label}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded bg-substation-dark border border-neutral-800 flex items-center justify-center text-text-light/50 group-hover:text-electric-amber transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. Card Footer (Values + Subtext) */}
                <div className="relative z-10 mt-auto flex flex-col">
                  <span 
                    className="font-mono text-3xl md:text-4xl font-extrabold tracking-wider filter drop-shadow-[0_0_6px_var(--glow-col)]"
                    style={{ color: stat.color, "--glow-col": stat.color } as any}
                  >
                    <CountUpValue value={stat.value} startCount={isInView} />
                  </span>
                  <span className="text-[10px] md:text-xs font-inter text-text-light/40 mt-1">
                    {stat.sub}
                  </span>
                </div>

                {/* Cyber Corner brackets to reinforce dashboard layout */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-800" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-800" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-neutral-800" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-neutral-800" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;

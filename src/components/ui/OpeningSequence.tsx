import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Volume2, VolumeX } from "lucide-react";

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Black, 1: Flash/Strike, 2: Logo, 3: Typewriter, 4: Charge, 5: Surge, 6: Complete
  const [voltage, setVoltage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const fullText = "DAS & BROTHERS ELECTRICALS";

  // Typewriter effect
  useEffect(() => {
    if (step >= 3) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setStep(4), 400);
        }
      }, 55);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Voltage Charging Effect
  useEffect(() => {
    if (step === 4) {
      const duration = 1200; // 1.2s
      const startTime = performance.now();
      
      const animateCharge = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Voltage target 440 (representing 440V or 440kV)
        const currentVoltage = Math.floor(progress * 440);
        setVoltage(currentVoltage);
        
        // Pitch increase of hum based on charge
        if (oscillatorRef.current && gainNodeRef.current && audioEnabled) {
          oscillatorRef.current.frequency.value = 50 + progress * 40; // 50Hz grid frequency up to 90Hz
          gainNodeRef.current.gain.value = 0.05 + progress * 0.1;
        }

        if (progress < 1) {
          requestAnimationFrame(animateCharge);
        } else {
          setTimeout(() => {
            setStep(5);
            // Flicker audio before shut off
            if (gainNodeRef.current) gainNodeRef.current.gain.value = 0.25;
            setTimeout(() => {
              stopAudio();
              setStep(6);
              onComplete();
            }, 600); // Surge duration
          }, 300);
        }
      };
      
      requestAnimationFrame(animateCharge);
    }
  }, [step]);

  // Main timeline sequencer
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300); // Strike/Flash
    const t2 = setTimeout(() => setStep(2), 700); // Logo reveal
    const t3 = setTimeout(() => setStep(3), 1400); // Typewriter start
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      stopAudio();
    };
  }, []);

  // Lightning canvas strike rendering
  useEffect(() => {
    if (step === 1 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Draw lightning bolt
      ctx.strokeStyle = "#00D4FF";
      ctx.shadowColor = "#00D4FF";
      ctx.shadowBlur = 30;
      ctx.lineWidth = 4;

      const drawBolt = (startX: number, startY: number, endX: number, endY: number, segments: number) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        let currX = startX;
        let currY = startY;
        const distY = (endY - startY) / segments;

        for (let i = 0; i < segments; i++) {
          currY += distY;
          currX += (Math.random() - 0.5) * 80;
          ctx.lineTo(currX, currY);
        }
        ctx.lineTo(endX, endY);
        ctx.stroke();
      };

      // Play audio zap
      playZap();

      // Trigger 2 quick bolts
      drawBolt(canvas.width / 2, 0, canvas.width / 2 + 30, canvas.height * 0.7, 12);
      
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#E87722";
        ctx.shadowColor = "#E87722";
        drawBolt(canvas.width / 2 + 30, 0, canvas.width / 2 - 10, canvas.height * 0.75, 10);
      }, 100);

      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 250);
    }
  }, [step]);

  // Web Audio API Synthesizer functions
  const initAudio = () => {
    if (audioContextRef.current) return;
    
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 50; // 50Hz sub hum
      gain.gain.value = 0.05;

      // Add a lowpass filter to make it warmer/subby
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 150;

      // Connect
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setAudioEnabled(true);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  };

  const playZap = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    // Quick burst of high freq saw wave + noise
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setAudioEnabled(false);
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      stopAudio();
    } else {
      initAudio();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#1A1A2E] flex flex-col items-center justify-center select-none overflow-hidden ${step === 5 ? "animate-flicker" : ""}`}>
      {/* Grid overlay for electrical aesthetic */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Lightning Strike Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Ambient Audio Enable Button */}
      <button 
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-[#0F3460]/80 hover:bg-[#0F3460] text-xs font-mono text-text-light/70 hover:text-electric-amber transition-all duration-300"
      >
        {audioEnabled ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-electric-amber animate-pulse" />
            <span>50Hz HUM ACTIVE</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span>ENABLE AUDIO INTRO</span>
          </>
        )}
      </button>

      {/* Screen White Flash Overlay */}
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#00D4FF]/20 mix-blend-screen pointer-events-none z-20"
        />
      )}
      {step === 5 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0, 0.9, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white pointer-events-none z-20"
        />
      )}

      {/* Main Intro Brand Info */}
      <div className="text-center z-10 flex flex-col items-center px-4">
        {/* Glowing Lightning SVG */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="relative w-24 h-24 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F3460] to-[#1A1A2E] border border-neutral-800/80 shadow-[0_0_30px_rgba(0,212,255,0.15)] group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-arc-cyan/20 to-electric-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="w-12 h-12 text-[#E87722] filter drop-shadow-[0_0_8px_#E87722] animate-pulse" />
              
              {/* Spinning outer rings */}
              <div className="absolute inset-0 border border-[#00D4FF]/20 rounded-2xl animate-spin [animation-duration:12s]" />
              <div className="absolute -inset-1.5 border border-dashed border-[#E87722]/10 rounded-3xl animate-spin [animation-duration:8s] [animation-direction:reverse]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Company Title */}
        <div className="h-8 md:h-12 flex items-center justify-center font-orbitron text-xl md:text-3xl font-extrabold tracking-wider text-text-light">
          {typedText}
          {step >= 3 && step < 4 && (
            <span className="w-2.5 h-6 md:h-8 ml-1 bg-[#00D4FF] animate-pulse filter drop-shadow-[0_0_4px_#00D4FF]" />
          )}
        </div>

        {/* Subtitle & Date */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 text-xs md:text-sm font-mono text-[#00D4FF] tracking-[0.25em] uppercase flex items-center gap-2"
            >
              <span>POWERING MAHARASHTRA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success-live animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Charging Voltage Meter */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 w-64 md:w-80 flex flex-col items-center gap-2"
            >
              <div className="flex justify-between w-full text-xs font-mono text-text-light/50">
                <span>GRID FREQ: 50.00 Hz</span>
                <span className="text-[#00D4FF] filter drop-shadow-[0_0_3px_#00D4FF] font-semibold">
                  {voltage} kV
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#0F3460] rounded-full overflow-hidden border border-neutral-800 p-[1px]">
                <div 
                  className="h-full rounded-full voltage-meter-fill transition-all duration-75"
                  style={{ width: `${(voltage / 440) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#E87722] tracking-widest uppercase animate-pulse mt-1">
                {voltage < 440 ? "CHARGING SUBSTATION CAPACITORS..." : "SYSTEM ONLINE — SURGING POWER"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Safety warning tag */}
      <div className="absolute bottom-6 text-[10px] font-mono text-neutral-600 tracking-wider text-center">
        DAS & BROTHERS ELECTRICALS PVT LTD &bull; ESTD 1987 &bull; HIGH VOLTAGE AREA
      </div>
    </div>
  );
};
export default OpeningSequence;

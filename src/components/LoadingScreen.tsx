import { useEffect, useState } from "react";
import { Terminal, Cpu, Database, BarChart3 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TERMINAL_LOGS = [
  "CONNECTING SECURE SHELL INTERFACE...",
  "LOADING ADITYA_RESUME_CORE.JSON...",
  "PARSING PYTHON MACHINE LEARNING PACKAGES...",
  "LOADING SCIKIT-LEARN, NUMPY, PANDAS ENGINES...",
  "CONFIGURING LINEAR REGRESSION PREDICTORS...",
  "INITIALIZING POWER BI DAX METRICS GENERATOR...",
  "TUNING DATABASE CONSTRAINTS & SQL INDEXES...",
  "DEPLOYING AUGMENTED REALITY ORDERING WORKFLOWS...",
  "ESTABLISHING SERVER-SIDE GEMINI INTEL ROUTER...",
  "COMPILING CREATIVE PORTFOLIO VISUALS...",
  "CINEMATIC PROTOCOLS ENGAGED. SYSTEM ONLINE."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDramatize, setIsDramatize] = useState(false);

  useEffect(() => {
    let progressInterval: number;
    let logInterval: number;

    // Fast initial climb, slow near end, then final burst
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds total load

    progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / duration);
      
      // Exponential curve
      const nextProgress = Math.floor(Math.pow(ratio, 0.7) * 100);
      
      if (nextProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
        
        // Final transition trigger
        setTimeout(() => {
          setIsDramatize(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      } else {
        setProgress(nextProgress);
      }
    }, 30);

    // Stagger terminal logs based on progress
    logInterval = window.setInterval(() => {
      setLogIndex((prev) => {
        if (prev < TERMINAL_LOGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-dark-bg transition-all duration-700 ease-in-out ${
        isDramatize ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

      <div className="relative max-w-md w-full px-6 flex flex-col items-center">
        {/* Core Animated Hologram Logo */}
        <div className="relative mb-12 flex items-center justify-center w-24 h-24">
          {/* External orbit halo */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-cyan/20 animate-spin" style={{ animationDuration: "12s" }} />
          <div className="absolute inset-2 rounded-full border border-brand-purple/20 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          
          {/* Glow center */}
          <div className="absolute inset-6 rounded-full bg-brand-cyan/10 blur-xl animate-pulse" />

          {/* Central Monogram */}
          <div className="absolute inset-4 rounded-full glass-panel flex items-center justify-center border border-white/10 glow-cyan">
            <span className="font-display font-black text-2xl bg-gradient-to-tr from-brand-cyan via-white to-brand-purple bg-clip-text text-transparent">
              AB
            </span>
          </div>
        </div>

        {/* Big percentage counter */}
        <div className="mb-2 flex items-baseline justify-center gap-1">
          <span className="font-display font-black text-6xl md:text-7xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
            {progress}
          </span>
          <span className="font-display text-lg text-brand-cyan font-bold animate-pulse">%</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden mb-6 relative">
          <div
            className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-gold transition-all duration-100 ease-out shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Activity/System Term Logs */}
        <div className="w-full glass-panel rounded-lg p-4 border border-white/5 font-mono text-[10px] md:text-xs text-neutral-400 h-28 overflow-hidden flex flex-col justify-end gap-1.5 shadow-2xl relative">
          {/* Grid ambient background inside panel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          
          {/* Scroll lines */}
          {TERMINAL_LOGS.slice(Math.max(0, logIndex - 3), logIndex + 1).map((log, i) => {
            const isLatest = i === Math.min(3, logIndex) || (logIndex < 4 && i === logIndex);
            return (
              <div key={i} className={`flex items-center gap-2 ${isLatest ? "text-brand-cyan" : "opacity-45"}`}>
                <span className="text-[9px] text-neutral-500">[{i + 1}]</span>
                <span className="truncate">{log}</span>
              </div>
            );
          })}
        </div>

        {/* Tech Badges loading indicator */}
        <div className="mt-8 flex items-center gap-6 text-neutral-500 text-xs">
          <div className={`flex items-center gap-1.5 transition-all duration-300 ${progress > 20 ? "text-brand-cyan opacity-100" : "opacity-35"}`}>
            <Terminal size={14} />
            <span className="font-mono text-[9px]">PYTHON</span>
          </div>
          <div className={`flex items-center gap-1.5 transition-all duration-300 ${progress > 45 ? "text-brand-purple opacity-100" : "opacity-35"}`}>
            <Database size={14} />
            <span className="font-mono text-[9px]">SQL</span>
          </div>
          <div className={`flex items-center gap-1.5 transition-all duration-300 ${progress > 75 ? "text-brand-gold opacity-100" : "opacity-35"}`}>
            <BarChart3 size={14} />
            <span className="font-mono text-[9px]">POWER BI</span>
          </div>
          <div className={`flex items-center gap-1.5 transition-all duration-300 ${progress > 90 ? "text-emerald-400 opacity-100" : "opacity-35"}`}>
            <Cpu size={14} />
            <span className="font-mono text-[9px]">GENAI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

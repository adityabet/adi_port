import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowUpRight, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  FileText, 
  Code2, 
  Database, 
  Cpu, 
  TrendingUp, 
  Layers, 
  CheckCircle, 
  Sparkles, 
  MessageSquare,
  Flame,
  Calendar,
  Briefcase,
  GraduationCap,
  Play,
  RotateCcw
} from "lucide-react";

import { PORTFOLIO_DATA, Project, Experience } from "./types";
import resumePdf from "../assets/Aditya_Bet_Resume_7083353166.pdf";
import BackgroundEffects from "./components/BackgroundEffects";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import SkillsSphere from "./components/SkillsSphere";
import AIChatbot from "./components/AIChatbot";

const HERO_SEQUENCE = [
  { prefix: "HI, I'M", main: "Aditya Bet", accent: "AI Builder & Developer", bg: "from-cyan-500/10 to-transparent" },
  { prefix: "I AM A", main: "Data Scientist", accent: "Turning Data into Intelligence", bg: "from-purple-500/10 to-transparent" },
  { prefix: "I SPECIALIZE IN", main: "Machine Learning", accent: "Linear Regression, Trees & XGBoost", bg: "from-blue-500/10 to-transparent" },
  { prefix: "I AM A", main: "Software Intern", accent: "At AmbuGrid System LLP", bg: "from-emerald-500/10 to-transparent" },
  { prefix: "I AM A", main: "Data Intern", accent: "At Yadgreen Saudi Arabia", bg: "from-amber-500/10 to-transparent" },
  { prefix: "WE CAN BUILD", main: "The Future", accent: "Let's Collaborate Today", bg: "from-pink-500/10 to-transparent" }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(PORTFOLIO_DATA.projects[0]);
  const [activeProjectTab, setActiveProjectTab] = useState<"overview" | "problem" | "features">("overview");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Python Terminal Emulator States
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Python 3.10.8 (main, Jan 2026, 12:44) [GCC 11.2.0] on linux",
    'Type "help", "copyright", "credits" or "license" for more info.',
    "adityabet@portfolio:~$"
  ]);
  const [terminalIsRunning, setTerminalIsRunning] = useState(false);
  const [terminalActiveScript, setTerminalActiveScript] = useState<"ml" | "sql">("ml");

  // Section refs for parallax effects
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // useScroll and useTransform for About section
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutBlobY = useTransform(aboutScrollY, [0, 1], [-80, 80]);
  const aboutBlob2Y = useTransform(aboutScrollY, [0, 1], [60, -60]);

  // useScroll and useTransform for Projects section
  const { scrollYProgress: projectsScrollY } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  });
  const projectsBlobY = useTransform(projectsScrollY, [0, 1], [-100, 100]);
  const projectsImageY = useTransform(projectsScrollY, [0, 1], ["-15%", "15%"]);

  // Hero Auto-Cycle Timer
  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SEQUENCE.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isLoading]);

  // Handle manual project selection
  const selectProject = (proj: Project) => {
    setSelectedProject(proj);
    setActiveProjectTab("overview");
  };

  // Run Mock Terminal Code
  const runTerminalScript = (type: "ml" | "sql") => {
    if (terminalIsRunning) return;
    setTerminalActiveScript(type);
    setTerminalIsRunning(true);
    
    let logs: string[] = [];
    if (type === "ml") {
      logs = [
        "adityabet@portfolio:~$ python stock_model_train.py",
        "[INFO] Loading stock data index from database...",
        "[INFO] Parsing dates and configuring time-series split (70/30)...",
        "[MODEL] Initializing Linear Regression with MA100, MA200 and RSI indicators...",
        "[MODEL] Training on 10,000 transaction candles...",
        "[METRICS] Evaluating model fit...",
        "[METRICS] R-Squared Score achieved: 0.8923",
        "[METRICS] Mean Absolute Error: $1.24",
        "[SUCCESS] Signal generated: STRONG BUY triggered at 154.20, RSI: 32.1",
        "adityabet@portfolio:~$"
      ];
    } else {
      logs = [
        "adityabet@portfolio:~$ mysql -u admin -p fraud_audit",
        "Connecting to remote cluster: main-database-read...",
        "Query: SELECT DISTINCT user_id, count(id) as flag_count FROM transactions...",
        "Evaluating partition windows: partition_by = card_number, order_by = date...",
        "Optimizing subqueries and checking index triggers...",
        "Execution complete: scanned 100,000 rows in 0.08s.",
        "[INFO] Flagged 12 suspicious high-velocity duplications with CASE statement logic.",
        "[REPORT] Fraud rate reduction index computed: 40% efficiency gains.",
        "adityabet@portfolio:~$"
      ];
    }

    setTerminalOutput([`adityabet@portfolio:~$ Running ${type === "ml" ? "Stock Predictor Model..." : "SQL Anomaly Detector..."}`]);
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setTerminalIsRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  // Render bento item coordinates tilt script if needed
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xAngle = ((y / rect.height) - 0.5) * 8; // Max 4 deg tilt
    const yAngle = ((x / rect.width) - 0.5) * -8;
    
    el.style.transform = `perspective(1000px) rotateX(${xAngle}deg) rotateY(${yAngle}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#0b0d10] text-slate-100 selection:bg-brand-cyan/30 selection:text-white">
          {/* Audio/Video/Visual atmospheric layers */}
          <BackgroundEffects />
          <CustomCursor />
          <Navbar onOpenAIChat={() => setAiChatOpen(true)} />

          {/* FLOAT TRIGGER AI AGENT */}
          <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-30">
            <button
              type="button"
              aria-label="Open AI assistant"
              onClick={() => setAiChatOpen(true)}
              data-cursor="chat"
              className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-dark-card border border-brand-cyan/25 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-semibold text-brand-cyan tracking-[0.18em] uppercase hover:bg-brand-cyan hover:text-dark-bg transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.15)] active:scale-95 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>ASK MY AI COGNITIVE REPLICA</span>
            </button>
          </div>

          <main className="w-full">
            {/* 1. HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 py-24 sm:py-28 lg:py-32 overflow-hidden">
              {/* Decorative background grids */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,132,252,0.05),transparent_60%)] pointer-events-none" />
              <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand-cyan/3 rounded-full blur-[100px] pointer-events-none animate-pulse" />

              <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left sequence reveal */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  
                  {/* Floating active chip status */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900/60 border border-white/10 backdrop-blur-md rounded-full text-[10px] font-mono tracking-[0.22em] text-brand-cyan uppercase mb-8 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                    <span>AI-Engineered Portfolio v1.5</span>
                  </div>

                  {/* Sequential slider text layer */}
                  <div className="relative h-44 sm:h-48 md:h-52 lg:h-60 w-full overflow-hidden mb-6">
                    {HERO_SEQUENCE.map((seq, index) => {
                      const isActive = index === currentHeroIndex;
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 flex flex-col items-start justify-center transition-all duration-1000 ease-out-quint ${
                            isActive 
                              ? "opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto" 
                              : "opacity-0 -translate-y-8 scale-95 blur-sm pointer-events-none"
                          }`}
                        >
                          <span className="font-mono text-xs md:text-sm text-neutral-400 tracking-[0.3em] uppercase mb-2">
                            {seq.prefix}
                          </span>
                          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem] tracking-[-0.05em] text-white leading-[0.9] max-w-[11ch]">
                            {seq.main}
                          </h1>
                          <p className="mt-4 text-sm md:text-base text-brand-cyan font-semibold flex items-center gap-1.5 font-mono tracking-[0.08em] uppercase">
                            <Sparkles size={14} className="animate-spin" style={{ animationDuration: "8s" }} />
                            <span>{seq.accent}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bullet navigation indicators */}
                  <div className="flex items-center gap-2 mb-10">
                    {HERO_SEQUENCE.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentHeroIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                          idx === currentHeroIndex ? "w-8 bg-brand-cyan" : "w-2 bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Master CTA Deck */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                      className="group px-5 sm:px-6 py-3.5 bg-white text-dark-bg hover:bg-brand-cyan rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_14px_36px_rgba(255,255,255,0.08)] cursor-pointer"
                    >
                      <span>Explore Projects</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="px-5 sm:px-6 py-3.5 bg-neutral-900/45 hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer"
                    >
                      Contact Me
                    </button>
                  </div>
                </div>

                {/* Right Interactive Developer Hub Visualizer */}
                <div className="lg:col-span-5 relative w-full flex justify-center">
                  {/* Concentric spinning rings behind */}
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: "25s" }} />
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                  
                  {/* Core Glass Profile Mockup Card */}
                  <div 
                    onMouseMove={handleTiltMove}
                    onMouseLeave={handleTiltLeave}
                    className="relative w-full max-w-[340px] glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl transition-all duration-200 cursor-pointer group"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-mono text-neutral-400 uppercase">Interactive</span>
                    </div>

                    {/* Developer Meta */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-gold p-[1px] shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center overflow-hidden">
                          {/* Generated abstract creative profile fallback placeholder */}
                          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.4),rgba(3,3,3,1))] flex items-center justify-center font-display font-black text-lg text-white">AB</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white tracking-tight">Aditya Bet</h3>
                        <p className="text-xs text-neutral-400 font-mono">adityabet214@gmail.com</p>
                        <p className="text-[10px] text-brand-cyan font-mono mt-0.5">Pune, India</p>
                      </div>
                    </div>

                    {/* Interactive Resume download & Quick link matrices */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs bg-neutral-900/50 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Briefcase size={12} className="text-brand-purple" />
                          <span className="font-mono text-[10px]">CURRENT INTERN</span>
                        </div>
                        <span className="font-display font-bold text-[10px] text-white">AmbuGrid System LLP</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-neutral-900/50 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <GraduationCap size={12} className="text-brand-gold" />
                          <span className="font-mono text-[10px]">DEGREE</span>
                        </div>
                        <span className="font-display font-bold text-[10px] text-white">B.Sc Computer Science</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-neutral-900/50 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Flame size={12} className="text-brand-cyan" />
                          <span className="font-mono text-[10px]">CORE GRADE</span>
                        </div>
                        <span className="font-display font-bold text-[10px] text-brand-cyan">8.50 CGPA</span>
                      </div>
                    </div>

                    {/* Social networks container */}
                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Connect Channels</span>
                      <div className="flex items-center gap-3">
                        <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900/60 hover:bg-brand-cyan hover:text-dark-bg rounded-lg border border-white/5 hover:border-transparent transition-all">
                          <Github size={13} />
                        </a>
                        <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900/60 hover:bg-brand-purple hover:text-white rounded-lg border border-white/5 hover:border-transparent transition-all">
                          <Linkedin size={13} />
                        </a>
                        <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="p-2 bg-neutral-900/60 hover:bg-brand-gold hover:text-dark-bg rounded-lg border border-white/5 hover:border-transparent transition-all">
                          <Mail size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 2. DYNAMIC STORIES / INTERACTIVE PROGRAM CLI */}
            <section id="about" ref={aboutRef} className="py-24 px-6 md:px-12 bg-neutral-950/20 relative overflow-hidden">
              {/* Parallax background elements for cinematic space */}
              <motion.div 
                style={{ y: aboutBlobY }}
                className="absolute -top-20 -left-20 w-[45vw] h-[45vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none -z-10"
              />
              <motion.div 
                style={{ y: aboutBlob2Y }}
                className="absolute -bottom-24 -right-24 w-[35vw] h-[35vw] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none -z-10"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.02),transparent_70%)] pointer-events-none" />
              
              <div className="max-w-6xl mx-auto w-full">
                
                {/* Visual Label */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">STORYTELLING & DEMOS</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Semantic Story */}
                  <div className="lg:col-span-6 flex flex-col items-start">
                    <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mb-6 leading-tight">
                      Blending Software Engineering with Deep Data Analytics
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
                      {PORTFOLIO_DATA.profile.bio}
                    </p>

                    {/* Numerical Stats Bento Columns */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {PORTFOLIO_DATA.profile.stats.map((stat, i) => (
                        <div key={i} className="glass-panel rounded-xl p-4 border border-white/5">
                          <span className="font-display font-black text-3xl text-brand-cyan block mb-1">
                            {stat.value}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Python/SQL terminal executing indicators */}
                  <div className="lg:col-span-6 w-full">
                    <div className="w-full glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono flex flex-col h-[400px]">
                      
                      {/* Terminal header */}
                      <div className="bg-dark-bg/95 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] tracking-wide text-neutral-400 flex items-center gap-1.5">
                          <Terminal size={11} className="text-brand-cyan" />
                          <span>AdityaBet@TerminalEmulator</span>
                        </span>
                        <span className="text-[9px] text-neutral-500">v1.2</span>
                      </div>

                      {/* Code Execution Panel select rail */}
                      <div className="bg-neutral-900/50 border-b border-white/5 px-4 py-2 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => runTerminalScript("ml")}
                            disabled={terminalIsRunning}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              terminalActiveScript === "ml" 
                                ? "bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/30" 
                                : "text-neutral-500 hover:text-white"
                            }`}
                          >
                            python stock_predictor.py
                          </button>
                          <button
                            onClick={() => runTerminalScript("sql")}
                            disabled={terminalIsRunning}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              terminalActiveScript === "sql" 
                                ? "bg-brand-purple/25 text-brand-purple border border-brand-purple/30" 
                                : "text-neutral-500 hover:text-white"
                            }`}
                          >
                            mysql fraud_check.sql
                          </button>
                        </div>

                        <button
                          onClick={() => runTerminalScript(terminalActiveScript)}
                          disabled={terminalIsRunning}
                          className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                        >
                          <Play size={10} />
                          <span>RUN</span>
                        </button>
                      </div>

                      {/* Live Output lines */}
                      <div className="flex-1 p-4 bg-black/40 overflow-y-auto text-xs flex flex-col gap-1.5 h-full relative">
                        {/* Terminal grid lines overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />

                        {terminalOutput.map((line, idx) => {
                          const isCommand = line.startsWith("adityabet@portfolio");
                          const isSuccess = line.includes("[SUCCESS]") || line.includes("[REPORT]");
                          const isWarning = line.includes("[METRICS]") || line.includes("[MODEL]");
                          return (
                            <div 
                              key={idx} 
                              className={`leading-relaxed ${
                                isCommand 
                                  ? "text-white font-semibold" 
                                  : isSuccess 
                                    ? "text-emerald-400 font-bold" 
                                    : isWarning 
                                      ? "text-brand-purple" 
                                      : "text-neutral-400"
                              }`}
                            >
                              {line}
                            </div>
                          );
                        })}
                        {terminalIsRunning && (
                          <div className="w-1.5 h-4 bg-brand-cyan animate-pulse inline-block" />
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 3. EXPERIENCE TIMELINE SECTION */}
            <section id="timeline" className="py-24 px-6 md:px-12 relative overflow-hidden">
              <div className="max-w-6xl mx-auto w-full">
                
                {/* Visual Label */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  <span className="font-mono text-xs text-brand-purple tracking-widest uppercase">PROFESSIONAL EXPERIENCE</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left explanation block */}
                  <div className="lg:col-span-4 flex flex-col items-start sticky top-24 self-start">
                    <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mb-6 leading-tight">
                      My Professional Journey
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                      Detailed chronological breakdown of Aditya's core internship milestones, optimizing analytical programs, and developing AI systems in production.
                    </p>
                    <div className="p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-xl text-neutral-300 text-xs font-mono flex items-center gap-2">
                      <CheckCircle size={14} className="text-brand-purple" />
                      <span>Ready for permanent full-time roles</span>
                    </div>
                  </div>

                  {/* Right actual track */}
                  <div className="lg:col-span-8 flex flex-col gap-12 relative pl-8 border-l border-white/5">
                    {/* SVG track light lines */}
                    <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-gradient-to-b from-brand-cyan via-brand-purple to-transparent pointer-events-none" />

                    {PORTFOLIO_DATA.experiences.map((exp, index) => (
                      <div key={exp.id} className="relative group">
                        {/* Node point light */}
                        <div className="absolute left-[-37px] top-2.5 w-4 h-4 rounded-full bg-dark-bg border-2 border-brand-purple flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-transform duration-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" />
                        </div>

                        {/* Experience Card */}
                        <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-brand-purple/20 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.03)]">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <div>
                              <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-purple transition-colors duration-300">
                                {exp.role}
                              </h3>
                              <p className="text-xs text-neutral-400 font-medium">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="inline-block px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-brand-cyan mb-1">
                                {exp.duration}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                {exp.location}
                              </p>
                            </div>
                          </div>

                          <ul className="space-y-2">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-400 leading-relaxed">
                                <span className="text-brand-purple font-bold mt-1">↳</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* 4. TECHNICAL SKILLS GRID & 3D SPHERE */}
            <section id="skills" className="py-24 px-6 md:px-12 bg-neutral-950/20 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.02),transparent_70%)] pointer-events-none" />

              <div className="max-w-6xl mx-auto w-full">
                
                {/* Visual Label */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="font-mono text-xs text-brand-gold tracking-widest uppercase">TECHNICAL TOOLKIT</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left: 3D orbiting Canvas Sphere Tag cloud */}
                  <div className="lg:col-span-5 w-full flex flex-col items-center">
                    <div className="w-full text-center lg:text-left mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">3D Skill Cloud</span>
                      <h2 className="font-display font-black text-3xl text-white tracking-tight mt-1">Interactive Tag-Orbit</h2>
                    </div>
                    <div className="w-full relative glass-panel rounded-2xl border border-white/5 shadow-2xl p-4 flex items-center justify-center">
                      <SkillsSphere />
                    </div>
                  </div>

                  {/* Right: Categorized structural skill blocks */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    {PORTFOLIO_DATA.skillCategories.map((category, idx) => (
                      <div key={idx} className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-brand-gold/15 transition-all">
                        <h3 className={`font-display font-bold text-sm bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-4 tracking-wider uppercase`}>
                          {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 bg-neutral-900/60 border border-white/5 rounded-full text-xs text-neutral-300 font-medium hover:text-white hover:bg-neutral-800 hover:border-white/10 transition-all cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* 5. PROJECTS HORIZONTAL SHOW & CASE STUDY DRAWER */}
            <section id="projects" ref={projectsRef} className="py-24 px-6 md:px-12 relative overflow-hidden">
              {/* Parallax background elements for cinematic space */}
              <motion.div 
                style={{ y: projectsBlobY }}
                className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none -z-10"
              />
              <div className="max-w-6xl mx-auto w-full">
                
                {/* Visual Label */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">CREATIVE WORK & DEEP DIVES</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Project Stack list */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <div className="mb-4">
                      <h2 className="font-display font-black text-4xl tracking-tighter text-white mb-2">Featured Work</h2>
                      <p className="text-xs text-neutral-400">Select a project to load its corresponding deep architectural layout and validation logs.</p>
                    </div>

                    {PORTFOLIO_DATA.projects.map((proj) => {
                      const isSelected = selectedProject?.id === proj.id;
                      return (
                        <button
                          key={proj.id}
                          onClick={() => selectProject(proj)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none ${
                            isSelected 
                              ? "bg-brand-cyan/10 border-brand-cyan/30 shadow-[0_0_20px_rgba(249,115,22,0.05)]" 
                              : "bg-neutral-900/40 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <div>
                            <span className="text-[9px] font-mono tracking-widest text-brand-cyan uppercase block mb-1">
                              {proj.category}
                            </span>
                            <h3 className="font-display font-bold text-sm text-white">{proj.title}</h3>
                          </div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? "bg-brand-cyan text-dark-bg" : "bg-neutral-800 text-neutral-400"
                          }`}>
                            <ArrowUpRight size={14} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Complete High-Fidelity project display frame */}
                  {selectedProject && (
                    <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 animate-fadeIn relative">
                      
                      {/* Interactive graphic frame representation */}
                      <div className="relative h-60 w-full overflow-hidden border-b border-white/5">
                        <motion.img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title} 
                          referrerPolicy="no-referrer"
                          style={{ y: projectsImageY }}
                          className="absolute inset-0 w-full h-[130%] object-cover brightness-50" 
                        />
                        {/* High-contrast category tag badge */}
                        <span className="absolute top-4 left-4 bg-dark-bg/85 border border-brand-cyan/25 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-brand-cyan uppercase">
                          {selectedProject.category}
                        </span>
                        
                        {/* Shadow mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                        
                        {/* Project main header title overlay */}
                        <div className="absolute bottom-4 left-6 right-6">
                          <span className="text-[10px] font-mono text-neutral-400 block mb-1">{selectedProject.date}</span>
                          <h3 className="font-display font-black text-2xl text-white tracking-tight">{selectedProject.subtitle}</h3>
                        </div>
                      </div>

                      {/* Project navigation detail tabs */}
                      <div className="flex border-b border-white/5 bg-neutral-900/30">
                        {["overview", "problem", "features"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveProjectTab(tab as any)}
                            className={`flex-1 py-3 text-center text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 focus:outline-none ${
                              activeProjectTab === tab 
                                ? "text-brand-cyan border-brand-cyan bg-brand-cyan/5" 
                                : "text-neutral-500 border-transparent hover:text-neutral-300"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Detailed tab content context panels */}
                      <div className="p-6 h-[250px] overflow-y-auto">
                        {activeProjectTab === "overview" && (
                          <div className="space-y-4">
                            <p className="text-xs text-neutral-300 leading-relaxed">{selectedProject.overview}</p>
                            <div>
                              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">Metrics & Benchmarks</span>
                              <div className="grid grid-cols-2 gap-2">
                                {selectedProject.metrics.map((metric, i) => (
                                  <div key={i} className="bg-neutral-900/40 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                                    <span className="font-mono text-[10px] text-neutral-300">{metric}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeProjectTab === "problem" && (
                          <div className="space-y-4">
                            <div className="bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-xl">
                              <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest block mb-1">THE PAIN</span>
                              <p className="text-xs text-neutral-300 leading-relaxed">{selectedProject.problem}</p>
                            </div>
                            <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl">
                              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">THE REMEDY</span>
                              <p className="text-xs text-neutral-300 leading-relaxed">{selectedProject.solution}</p>
                            </div>
                          </div>
                        )}

                        {activeProjectTab === "features" && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Engineering Features</span>
                            {selectedProject.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                                <CheckCircle size={12} className="text-brand-cyan mt-1 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer containing tech stack tags and buttons */}
                      <div className="p-6 bg-dark-bg/85 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.techStack.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono text-neutral-400">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <a 
                            href={selectedProject.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-900 border border-white/5 hover:border-brand-cyan rounded-lg text-neutral-300 hover:text-brand-cyan transition-all"
                          >
                            <Github size={14} />
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </section>

            {/* 6. RESUME SECTION */}
            <section id="resume" className="py-24 px-6 md:px-12 relative overflow-hidden">
              <div className="max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="font-mono text-xs text-brand-gold tracking-widest uppercase">Resume</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-0">
                    <div className="p-6 md:p-8 lg:p-10">
                      <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-cyan">
                        <FileText size={12} />
                        Profile Summary
                      </span>
                      <h2 className="mt-6 font-display font-black text-3xl md:text-4xl tracking-tighter text-white">
                        Resume
                      </h2>
                      <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-300 leading-relaxed">
                        You can view or download my latest resume below.
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <a
                          href={resumePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-dark-bg transition-all duration-300 hover:bg-brand-cyan"
                        >
                          <FileText size={14} />
                          Open Resume
                        </a>
                        <a
                          href={resumePdf}
                          download
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-neutral-900/40 px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-100 transition-all duration-300 hover:border-brand-gold/40 hover:text-brand-gold"
                        >
                          <ArrowUpRight size={14} />
                          Download Resume
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-white/5 bg-neutral-950/40 p-6 md:p-8 lg:p-10 lg:border-l lg:border-t-0">
                      <div className="rounded-2xl border border-white/10 bg-dark-card p-5">
                        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/5">
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">Document</p>
                            <h3 className="mt-2 font-display font-bold text-lg text-white">Aditya Bet</h3>
                          </div>
                          <div className="rounded-full bg-brand-cyan/10 p-2 text-brand-cyan">
                            <FileText size={16} />
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span>Latest Resume</span>
                            <span className="font-mono text-brand-cyan">PDF</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span>Updated</span>
                            <span className="font-mono">2026</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span>Role Focus</span>
                            <span className="font-mono text-brand-gold">AI / Data</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. TESTIMONIALS MARQUEE SCREEN */}
            <section className="py-24 overflow-hidden relative bg-neutral-950/20">
              <div className="max-w-6xl mx-auto w-full px-6 md:px-12 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="font-mono text-xs text-brand-gold tracking-widest uppercase">ENDORSEMENTS & CERTIFICATES</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>
              </div>

              {/* Infinite scrolling marquee track columns */}
              <div className="flex flex-col gap-4">
                {/* Row 1 - Left to Right */}
                <div className="w-full overflow-hidden whitespace-nowrap relative flex py-2 bg-neutral-950/40">
                  <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] pointer-events-auto">
                    {[...PORTFOLIO_DATA.certificates, ...PORTFOLIO_DATA.certificates].map((cert, i) => (
                      <div 
                        key={i} 
                        className="inline-flex items-center gap-3.5 bg-dark-card border border-white/5 rounded-2xl px-6 py-4 backdrop-blur-md hover:border-brand-gold/30 transition-all cursor-pointer shadow-lg"
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-gold/10 flex items-center justify-center text-xs text-brand-gold font-mono">
                          🏆
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Verified Certification</span>
                          <span className="font-display font-bold text-xs text-white tracking-wide">{cert.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Intersect Interests */}
                <div className="w-full overflow-hidden whitespace-nowrap relative flex py-2">
                  <div className="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused] pointer-events-auto">
                    {[...PORTFOLIO_DATA.interests, ...PORTFOLIO_DATA.interests].map((interest, i) => (
                      <div 
                        key={i} 
                        className="inline-flex items-center gap-3.5 bg-dark-card border border-white/5 rounded-2xl px-6 py-4 backdrop-blur-md hover:border-brand-cyan/30 transition-all cursor-pointer shadow-lg"
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-cyan/10 flex items-center justify-center text-xs text-brand-cyan font-mono">
                          🔥
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Core Focus</span>
                          <span className="font-display font-bold text-xs text-white tracking-wide">{interest.title} — <span className="text-neutral-400 font-normal">{interest.description}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 7. CONTACT DECK FORM */}
            <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/3 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-6xl mx-auto w-full relative z-10">
                
                {/* Visual Label */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">GET IN TOUCH</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left info column */}
                  <div className="lg:col-span-5 flex flex-col items-start justify-between">
                    <div>
                      <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-white mb-6">
                        Let's Engineer the Next Big Thing.
                      </h2>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                        If you are a recruiter looking to hire a highly proactive Software Developer and Data Analyst who understands machine learning and AI, let's connect right now!
                      </p>
                    </div>

                    {/* Contact Channels list */}
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex items-center gap-4 p-4 bg-neutral-900/30 border border-white/5 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                          <Mail size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase block">DIRECT EMAIL</span>
                          <a href="mailto:adityabet214@gmail.com" className="text-xs text-white font-bold hover:text-brand-cyan transition-all">
                            adityabet214@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-neutral-900/30 border border-white/5 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                          <Phone size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase block">PHONE CHANNEL</span>
                          <span className="text-xs text-white font-bold">
                            +91 7083353166
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Glass form deck */}
                  <div className="lg:col-span-7">
                    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl relative">
                      
                      {formSubmitted ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center animate-fadeIn">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                            <CheckCircle size={22} className="animate-bounce" />
                          </div>
                          <h3 className="font-display font-black text-xl text-white tracking-tight">Signal Received Successfully!</h3>
                          <p className="text-xs text-neutral-400 mt-2 max-w-sm">
                            Thank you. Aditya has been notified and his AI counterpart has recorded this interaction. He will reach back to you shortly.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-5">
                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">FULL NAME</label>
                            <input 
                              type="text" 
                              required
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              placeholder="e.g. Hiring Manager" 
                              className="w-full bg-neutral-950/60 border border-white/5 hover:border-white/10 focus:border-brand-cyan/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-neutral-600 transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">EMAIL ADDRESS</label>
                            <input 
                              type="email" 
                              required
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              placeholder="e.g. company@hiring.com" 
                              className="w-full bg-neutral-950/60 border border-white/5 hover:border-white/10 focus:border-brand-cyan/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-neutral-600 transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">TRANSMIT MESSAGE</label>
                            <textarea 
                              rows={4}
                              required
                              value={contactForm.message}
                              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                              placeholder="Write your contract offer or meeting schedule here..." 
                              className="w-full bg-neutral-950/60 border border-white/5 hover:border-white/10 focus:border-brand-cyan/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-neutral-600 transition-all resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={formLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-brand-cyan to-brand-purple hover:brightness-110 active:scale-[0.99] transition-all rounded-xl text-xs font-black tracking-widest uppercase text-dark-bg cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(249,115,22,0.25)] focus:outline-none disabled:opacity-50"
                          >
                            {formLoading ? "TRANSMITTING..." : "TRANSMIT TRANSMISSION"}
                          </button>
                        </form>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            </section>
          </main>

          {/* Footer information blocks */}
          <footer className="py-8 px-6 border-t border-white/5 bg-neutral-950/60 font-mono text-[9px] text-neutral-500 relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span>© 2026 ADITYA BET. ALL PORTFOLIO ARTIFACTS RECORDED SECURELY.</span>
              </div>
              <div className="flex items-center gap-6">
                <span>PUNE, INDIA (GMT +5:30)</span>
                <span className="text-brand-cyan">COGNITIVE EMULATOR ACTIVE</span>
              </div>
            </div>
          </footer>

          {/* AI TWIN COMPACT DECK MODAL */}
          <AIChatbot isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { MessageSquareCode, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAIChat: () => void;
}

const NAV_ITEMS = [
  { label: "Intro", targetId: "hero" },
  { label: "About", targetId: "about" },
  { label: "Skills", targetId: "skills" },
  { label: "Projects", targetId: "projects" },
  { label: "Resume", targetId: "resume" },
  { label: "Timeline", targetId: "timeline" },
  { label: "Contact", targetId: "contact" }
];

export default function Navbar({ onOpenAIChat }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if scrolled
      setIsScrolled(window.scrollY > 50);

      // Scroll spy logic
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.targetId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? "bg-dark-bg/60 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram Brand */}
        <button
          type="button"
          aria-label="Go to hero section"
          onClick={() => scrollToSection("hero")}
          className="group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all duration-300">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
              <span className="font-display font-black text-xs text-white">AB</span>
            </div>
          </div>
          <span className="font-display font-medium text-sm tracking-widest uppercase text-neutral-300 group-hover:text-white transition-colors duration-300">
            ADITYA BET
          </span>
        </button>

        {/* Desktop floating dock */}
        <nav className="hidden md:flex items-center gap-1.5 glass-panel px-2.5 py-1.5 rounded-full border border-white/5 shadow-2xl relative">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <button
                key={item.targetId}
                onClick={() => scrollToSection(item.targetId)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/10 -z-10 layoutId='activeNav'" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Interface Panel Triggers */}
        <div className="flex items-center gap-3">
          {/* Mobile menu triggers */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer drop */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-dark-bg/95 backdrop-blur-xl z-30 border-t border-white/5 p-8 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Navigation</span>
            <div className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId;
                return (
                  <button
                    key={item.targetId}
                    onClick={() => scrollToSection(item.targetId)}
                    className={`text-left text-2xl font-display font-bold tracking-tight py-1 transition-all ${
                      isActive ? "text-brand-cyan pl-2 border-l-2 border-brand-cyan" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Contact info</span>
            <a href="mailto:adityabet214@gmail.com" className="text-neutral-300 hover:text-white text-sm">
              adityabet214@gmail.com
            </a>
            <span className="text-xs text-neutral-500 font-mono">+91 7083353166</span>
          </div>
        </div>
      )}
    </header>
  );
}

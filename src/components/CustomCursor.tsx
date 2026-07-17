import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const ringRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const type = interactive.getAttribute("data-cursor");
        setHoverType(type);
      } else {
        const link = target.closest("a, button, input, textarea, select, [role='button']");
        if (link) {
          setHoverType("pointer");
        } else {
          setHoverType(null);
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", handleHoverStart);

    // Smooth inertia follow for the outer ring
    let animationFrameId: number;
    const updateRing = () => {
      const ease = 0.15; // spring rate
      ringRef.current.x += (ringPosition.x - ringRef.current.x) * ease;
      ringRef.current.y += (ringPosition.y - ringRef.current.y) * ease;

      const ringEl = document.getElementById("custom-cursor-ring");
      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringRef.current.x - 24}px, ${ringRef.current.y - 24}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateRing);
    };
    updateRing();

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", handleHoverStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ringPosition]);

  // Synchronize ring target coordinate
  useEffect(() => {
    setRingPosition(position);
  }, [position]);

  if (!isVisible) return null;

  const isView = hoverType === "view";
  const isDrag = hoverType === "drag";
  const isSpin = hoverType === "spin";
  const isChat = hoverType === "chat";
  const isClose = hoverType === "close";
  const isPointer = hoverType === "pointer" || isView || isDrag || isSpin || isChat || isClose;

  return (
    <>
      {/* Inner precise dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ${
          isClicking ? "scale-50 opacity-50" : "scale-100 opacity-100"
        } ${isPointer ? "bg-brand-cyan shadow-orange-500/50 shadow-[0_0_10px_2px]" : ""}`}
        style={{ left: position.x, top: position.y }}
      />

      {/* Spring outer ring */}
      <div
        id="custom-cursor-ring"
        className={`fixed top-0 left-0 w-12 h-12 rounded-full border pointer-events-none z-50 transition-all duration-300 flex items-center justify-center text-[8px] font-mono font-black tracking-widest text-center uppercase select-none ${
          isClicking ? "border-brand-purple scale-75 bg-brand-purple/10" : "border-white/30"
        } ${
          isPointer
            ? "w-16 h-16 border-brand-cyan/80 bg-brand-cyan/5 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.15)] text-brand-cyan"
            : ""
        }`}
      >
        {isView && <span className="animate-pulse">VIEW</span>}
        {isDrag && <span className="animate-pulse">DRAG</span>}
        {isSpin && <span className="animate-pulse">SPIN</span>}
        {isChat && <span className="animate-pulse">CHAT</span>}
        {isClose && <span className="animate-pulse">CLOSE</span>}
      </div>
    </>
  );
}

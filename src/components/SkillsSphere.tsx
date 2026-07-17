import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "../types";

interface SkillTag {
  text: string;
  x: number;
  y: number;
  z: number;
  color: string;
  scale: number;
}

export default function SkillsSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high pixel density
    const dpr = window.devicePixelRatio || 1;
    let rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height || 450;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // List of all skills merged
    const skillsList = PORTFOLIO_DATA.skillCategories.flatMap((cat) => cat.skills);
    
    // Unique colors for visual excitement
    const colors = [
      "#f97316", // orange-500
      "#3b82f6", // blue-500
      "#fb923c", // orange-400
      "#ffffff", // pure white
      "#fb7185"  // rose-400
    ];

    const radius = Math.min(width, height) * 0.45;
    const count = skillsList.length;

    // Position skills on a 3D sphere using Fibonacci lattice
    const tags: SkillTag[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      tags.push({
        text: skillsList[i],
        x,
        y,
        z,
        color: colors[i % colors.length],
        scale: 1
      });
    }

    // Animation rotation speeds
    let angleX = 0.003;
    let angleY = 0.003;
    let targetAngleX = 0.003;
    let targetAngleY = 0.003;

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const currentX = e.clientX - bounds.left;
      const currentY = e.clientY - bounds.top;

      mouseX = currentX - width / 2;
      mouseY = currentY - height / 2;

      if (isDragging) {
        const dx = currentX - prevMouseX;
        const dy = currentY - prevMouseY;
        // Drag turns sphere
        targetAngleY = dx * 0.001;
        targetAngleX = -dy * 0.001;
        prevMouseX = currentX;
        prevMouseY = currentY;
      } else {
        // Natural lean based on hover
        targetAngleY = (mouseX / (width / 2)) * 0.008;
        targetAngleX = (-mouseY / (height / 2)) * 0.008;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const bounds = canvas.getBoundingClientRect();
      prevMouseX = e.clientX - bounds.left;
      prevMouseY = e.clientY - bounds.top;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const handleResize = () => {
      if (!container || !canvas) return;
      rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height || 450;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp rotation speeds toward target
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      // Slow friction back to natural rotation if not dragging
      if (!isDragging && Math.abs(targetAngleX) > 0.003) targetAngleX *= 0.95;
      if (!isDragging && Math.abs(targetAngleY) > 0.003) targetAngleY *= 0.95;

      // Apply rotation math in 3D
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Sort tags by depth (z value) so closer tags overlap back ones
      tags.forEach((tag) => {
        // Rotate around Y-axis
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.x * sinY + tag.z * cosY;

        // Rotate around X-axis
        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = tag.y * sinX + z1 * cosX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;
      });

      // Sort
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);

      let currentHovered: string | null = null;

      // Projection point center
      const centerX = width / 2;
      const centerY = height / 2;
      const cameraDepth = 500;

      sortedTags.forEach((tag) => {
        // Perspective projection calculation
        const scale = cameraDepth / (cameraDepth + tag.z);
        const projectedX = centerX + tag.x * scale;
        const projectedY = centerY + tag.y * scale;

        // Calculate visual properties based on depth
        const alpha = Math.min(1, Math.max(0.12, (tag.z + radius) / (2 * radius)));
        const fontSize = Math.max(9, Math.round(11 * scale + 3));

        // Interaction hover detection
        let isTagHovered = false;
        if (mouseX > 0 && mouseY > 0) {
          const testX = mouseX + centerX;
          const testY = mouseY + centerY;
          const dx = testX - projectedX;
          const dy = testY - projectedY;
          const labelWidth = ctx.measureText(tag.text).width;
          if (Math.abs(dx) < labelWidth / 1.5 && Math.abs(dy) < fontSize) {
            isTagHovered = true;
            currentHovered = tag.text;
          }
        }

        ctx.font = `bold ${fontSize}px var(--font-display)`;

        if (isTagHovered) {
          ctx.fillStyle = tag.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = tag.color;
        } else {
          ctx.fillStyle = tag.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 0;
        }

        // Draw label
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tag.text, projectedX, projectedY);
        ctx.globalAlpha = 1.0; // reset
        ctx.shadowBlur = 0; // reset

        // Draw subtle halo circle around glowing hovered tags
        if (isTagHovered) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, fontSize * 1.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      setHoveredTag(currentHovered);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        data-cursor="spin"
        className="block bg-transparent cursor-grab active:cursor-grabbing max-w-full"
      />
      
      {/* Floating active skill notification label */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-bg/80 border border-white/5 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl transition-all duration-300 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 mr-2 uppercase">Focused skill:</span>
        <span className="text-xs font-display font-black text-brand-cyan uppercase animate-pulse">
          {hoveredTag || "Spin & Hover Tags"}
        </span>
      </div>
    </div>
  );
}

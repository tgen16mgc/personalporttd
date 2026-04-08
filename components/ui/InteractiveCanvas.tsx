"use client";

import { useEffect, useRef } from "react";

interface InteractiveCanvasProps {
  dotColor?: string;
  lineColor?: string;
  gridCols?: number;
  gridRows?: number;
  maxDistance?: number;
  dotSizeMultiplier?: number;
}

export function InteractiveCanvas({
  dotColor = "rgba(26,26,26,0.22)",
  lineColor = "rgba(6,182,212,0.08)",
  gridCols = 45,
  gridRows = 30,
  maxDistance = 4,
  dotSizeMultiplier = 180,
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<
    { x: number; y: number; ox: number; oy: number; size?: number; angle?: number }[]
  >([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      createDots(w, h);
    };

    const createDots = (w: number, h: number) => {
      dotsRef.current = [];
      for (let i = 0; i < gridCols; i++) {
        const x = (w / (gridCols - 1)) * i;
        for (let j = 0; j < gridRows; j++) {
          const y = (h / (gridRows - 1)) * j;
          dotsRef.current.push({ x, y, ox: x, oy: y });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const w = canvas.width / ratio;
      const h = canvas.height / ratio;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = mx - dot.x;
        const dy = my - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const size = Math.max(1, (dotSizeMultiplier - dist) / 30);
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist, maxDistance);
        const vx = clampedDist * Math.cos(angle);
        const vy = clampedDist * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(dot.x + vx, dot.y + vy);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dot.x + vx, dot.y + vy, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dotColor, lineColor, gridCols, gridRows, maxDistance, dotSizeMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}

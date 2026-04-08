"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { heroContent } from "@/content/pages/home";

const TAGS = heroContent.gravityTags;

export function GravityTags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; angle: number }[]
  >([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Composite } = Matter;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    canvas.width = W;
    canvas.height = H;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.5, scale: 0.001 },
    });

    const wallThickness = 60;
    const walls = [
      Bodies.rectangle(W / 2, H + wallThickness / 2, W + wallThickness * 2, wallThickness, { isStatic: true, restitution: 0.3 }),
      Bodies.rectangle(-wallThickness / 2, H / 2, wallThickness, H * 2, { isStatic: true }),
      Bodies.rectangle(W + wallThickness / 2, H / 2, wallThickness, H * 2, { isStatic: true }),
    ];
    World.add(engine.world, walls);

    const tagBodies: Matter.Body[] = [];

    TAGS.forEach((tag, i) => {
      const w = tag.label.length * 7.5 + 24;
      const h = 28;
      const x = 40 + Math.random() * (W - 80);
      const y = -40 - i * 50;

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: 8 },
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.01,
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.4,
        label: `tag-${i}`,
      });
      tagBodies.push(body);
    });

    World.add(engine.world, tagBodies);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const updatePositions = () => {
      setPositions(
        tagBodies.map((b) => ({
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
        }))
      );
      rafRef.current = requestAnimationFrame(updatePositions);
    };
    rafRef.current = requestAnimationFrame(updatePositions);

    return () => {
      cancelAnimationFrame(rafRef.current);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-10"
    >
      {/* Invisible canvas for Matter.js mouse input */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0, cursor: "grab" }}
      />

      {TAGS.map((tag, i) => {
        const pos = positions[i];
        if (!pos) return null;

        const w = tag.label.length * 7.5 + 24;

        return (
          <div
            key={tag.label}
            className="absolute px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap pointer-events-none select-none shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            style={{
              left: pos.x - w / 2,
              top: pos.y - 14,
              transform: `rotate(${pos.angle}rad)`,
              backgroundColor: tag.color,
              color: tag.color === "#1A1A1A" ? "#FDFBF7" : "#FDFBF7",
              willChange: "transform",
            }}
          >
            {tag.label}
          </div>
        );
      })}
    </div>
  );
}

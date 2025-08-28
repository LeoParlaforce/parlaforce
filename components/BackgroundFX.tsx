"use client";
import { useEffect, useRef } from "react";

/** Étincelles/étoiles très légères et discrètes */
export default function BackgroundSparkles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x:number;y:number;vx:number;vy:number;r:number;a:number;tw:number;h:number };
    const count = Math.min(90, Math.floor((c.width * c.height) / 20000)); // densité douce
    const parts: P[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r: 0.6 + Math.random() * 1.1,
      a: Math.random() * Math.PI * 2,
      tw: 0.01 + Math.random() * 0.02,
      h: 40 + Math.random() * 15, // teinte dorée
    }));

    const render = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.a += p.tw;
        if (p.x < -10) p.x = c.width + 10;
        if (p.x > c.width + 10) p.x = -10;
        if (p.y < -10) p.y = c.height + 10;
        if (p.y > c.height + 10) p.y = -10;

        const alpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(p.a));
        // halo doux
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.h}, 80%, 85%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.h}, 80%, 85%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // cœur
        ctx.fillStyle = `hsla(${p.h}, 90%, 92%, ${Math.min(1, alpha + 0.15)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(render);
    };
    raf.current = requestAnimationFrame(render);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="sparkles-canvas" aria-hidden />;
}

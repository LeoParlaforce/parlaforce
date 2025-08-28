"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; tw: number };
    const N = Math.min(120, Math.floor((c.width * c.height) / 15000));
    const parts: P[] = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * Math.PI * 2,
      tw: 0.015 + Math.random() * 0.02,
    }));

    const render = () => {
      // voile léger
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, c.width, c.height);

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.tw;

        if (p.x < -10) p.x = c.width + 10;
        if (p.x > c.width + 10) p.x = -10;
        if (p.y < -10) p.y = c.height + 10;
        if (p.y > c.height + 10) p.y = -10;

        const alpha = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(p.a));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `rgba(255,255,220,${alpha})`);
        grad.addColorStop(1, `rgba(255,255,220,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,240,180,${Math.min(1, alpha + 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(render);
    };

    rafRef.current = window.requestAnimationFrame(render);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* étincelles */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden />

      {/* arbres “fenêtres” */}
      <div className="fixed inset-0 -z-9 pointer-events-none">
        <svg className="absolute right-[10%] top-[8%] w-[22vw] h-[22vh] tree-sway" viewBox="0 0 200 120" aria-hidden>
          <g opacity="0.6">
            <path d="M20,110 C40,80 60,80 80,110" fill="none" stroke="rgba(40,120,60,0.9)" strokeWidth="6" strokeLinecap="round"/>
            <path d="M50,110 C70,70 90,70 110,110" fill="none" stroke="rgba(40,120,60,0.7)" strokeWidth="5" strokeLinecap="round"/>
            <path d="M80,110 C100,75 120,75 140,110" fill="none" stroke="rgba(40,120,60,0.6)" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </svg>

        <svg className="absolute left-[12%] top-[18%] w-[18vw] h-[18vh] tree-sway-delayed" viewBox="0 0 200 120" aria-hidden>
          <g opacity="0.55">
            <path d="M20,110 C40,80 60,80 80,110" fill="none" stroke="rgba(30,100,55,0.9)" strokeWidth="6" strokeLinecap="round"/>
            <path d="M50,110 C70,70 90,70 110,110" fill="none" stroke="rgba(30,100,55,0.7)" strokeWidth="5" strokeLinecap="round"/>
            <path d="M80,110 C100,75 120,75 140,110" fill="none" stroke="rgba(30,100,55,0.6)" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      {/* disques supplémentaires */}
      <img src="/plate-stack-left.png" alt="" className="hidden md:block fixed bottom-8 left-10 w-48 opacity-95 plates-heavy pointer-events-none -z-8" />
      <img src="/plate-stack-right.png" alt="" className="hidden md:block fixed bottom-9 right-12 w-52 opacity-95 plates-heavy pointer-events-none -z-8" />
    </>
  );
}

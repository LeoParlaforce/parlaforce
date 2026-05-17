"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useBg } from "./BgContext";

interface StickySceneProps {
  id: string;
  length?: string;
  bgId?: string;
  hudLeft?: string;
  hudRight?: string;
  children: (props: { progress: MotionValue<number> }) => React.ReactNode;
}

export default function StickyScene({
  id,
  length = "220vh",
  bgId,
  hudLeft,
  hudRight,
  children,
}: StickySceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { setActive } = useBg();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Drive the CSS progress bar width via a plain style update (no re-render)
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (barRef.current) barRef.current.style.width = `${v * 100}%`;
      if (hudRef.current) {
        const pct = String(Math.round(v * 100)).padStart(3, "0");
        hudRef.current.textContent = `${pct} / 100`;
      }
    });
  }, [scrollYProgress]);

  // Activate background when scene is ≥40% visible
  const pinRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pinRef.current || !bgId) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(bgId); },
      { threshold: 0.4 }
    );
    obs.observe(pinRef.current);
    return () => obs.disconnect();
  }, [bgId, setActive]);

  return (
    <section ref={ref} className="scene" style={{ height: length }} data-scene={id}>
      <div ref={pinRef} className="scene-pin">
        <div ref={barRef} className="scene-progress-bar" style={{ width: "0%" }} />
        <div className="scene-content">
          {children({ progress: scrollYProgress })}
        </div>
        <div className="scene-hud">
          <span>{hudLeft ?? `// ${id}`}</span>
          <span ref={hudRef}>000 / 100</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let dx = mx, dy = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const tgt = (e.target as Element).closest("[data-cursor]");
      if (tgt) {
        setVariant(tgt.getAttribute("data-cursor") || "hover");
        setLabel(tgt.getAttribute("data-cursor-label") || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const ringClass = `cursor-ring ${variant !== "default" ? variant : ""}`.trim();

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}>
      <div ref={ringRef} className={ringClass}>{label}</div>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: variant === "default" ? 1 : 0 }}
      />
    </div>
  );
}

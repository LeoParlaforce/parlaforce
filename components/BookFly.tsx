// components/BookFly.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  pdfImage: string;                  // ex: "/pdf-previews/strongman.jpg"
  from?: { x: number; y: number };   // optionnel
  onDone?: () => void;
};

export default function BookFly({ pdfImage, from, onDone }: Props) {
  const [mounted, setMounted] = useState(false);
  const flyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const el = flyRef.current;
    if (el) {
      if (from) {
        el.style.setProperty("--from-x", `${from.x}px`);
        el.style.setProperty("--from-y", `${from.y}px`);
      } else {
        el.style.setProperty("--from-x", `-28vw`);
        el.style.setProperty("--from-y", `-6vh`);
      }
    }
    const t = setTimeout(() => onDone?.(), 1200);
    return () => clearTimeout(t);
  }, [from, onDone]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] pointer-events-none grid place-items-center">
      <div ref={flyRef} className="relative w-[260px] h-[180px] book-fly">
        {/* Livre fermé */}
        <img
          src="/book-closed.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Livre ouvert avec page */}
        <div className="absolute inset-0 book-open">
          <img
            src="/book-open.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="book-frame">
            <img
              src={pdfImage}
              alt="aperçu PDF"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

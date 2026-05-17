"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

interface WordStaggerProps {
  text: string;
  baseDelay?: number;
  stagger?: number;
  className?: string;
}

export default function WordStagger({
  text,
  baseDelay = 0,
  stagger = 50,
  className = "",
}: WordStaggerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            padding: "0 0.04em",
            margin: "0 -0.04em",
            verticalAlign: "top",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.9,
              ease: EASE_CINEMA,
              delay: (baseDelay + i * stagger) / 1000,
            }}
          >
            {word}{i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

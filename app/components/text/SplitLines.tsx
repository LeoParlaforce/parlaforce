"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

interface SplitLinesProps {
  lines: React.ReactNode[];
  baseDelay?: number;
  stagger?: number;
  className?: string;
}

export default function SplitLines({
  lines,
  baseDelay = 0,
  stagger = 90,
  className = "",
}: SplitLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: "block", overflow: "hidden", padding: "0.05em 0" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : { y: "105%" }}
            transition={{
              duration: 1.1,
              ease: EASE_CINEMA,
              delay: (baseDelay + i * stagger) / 1000,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

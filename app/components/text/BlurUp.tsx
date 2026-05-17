"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function BlurUp({ children, delay = 0, className = "" }: BlurUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(12px)", y: 20 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

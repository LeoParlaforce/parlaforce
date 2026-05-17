"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RiseProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Rise({ children, delay = 0, className = "" }: RiseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

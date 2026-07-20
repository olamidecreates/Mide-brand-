"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor, 0–1. */
  strength?: number;
  className?: string;
}

/**
 * Wraps any element (typically a CTA button) with a subtle magnetic pull
 * toward the cursor on hover, and springs back on leave. Kept snappy —
 * spring is tuned to settle in well under 300ms — so it reads as a premium
 * micro-interaction rather than a sluggish drag effect.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * strength, y: relY * strength });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

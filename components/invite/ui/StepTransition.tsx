"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StepTransitionProps = {
  stepKey: string;
  children: ReactNode;
  variant?: "fadeUp" | "slide" | "scale";
  celebrate?: boolean;
};

const VARIANTS = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
    transition: { duration: 0.35 },
  },
  slide: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.32 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 0.45 },
  },
} as const;

export function StepTransition({
  stepKey,
  children,
  variant = "slide",
  celebrate = false,
}: StepTransitionProps) {
  const motionProps = VARIANTS[variant];

  return (
    <motion.section
      key={stepKey}
      className={`step${celebrate ? " celebrate" : ""}`}
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
    >
      {children}
    </motion.section>
  );
}

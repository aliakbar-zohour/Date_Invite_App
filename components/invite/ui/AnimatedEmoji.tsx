"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedEmojiProps = {
  children: ReactNode;
  className?: string;
  big?: boolean;
} & Pick<MotionProps, "animate" | "transition">;

const DEFAULT_ANIMATE = {
  scale: [1, 1.08, 1],
  rotate: [0, -6, 6, 0],
};

const DEFAULT_TRANSITION = {
  duration: 2.4,
  repeat: Infinity,
};

export function AnimatedEmoji({
  children,
  className = "",
  big = false,
  animate = DEFAULT_ANIMATE,
  transition = DEFAULT_TRANSITION,
}: AnimatedEmojiProps) {
  return (
    <motion.div
      className={`hero-emoji ${big ? "big" : ""} ${className}`.trim()}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

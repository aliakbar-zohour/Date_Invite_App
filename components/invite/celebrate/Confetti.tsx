"use client";

import { motion } from "framer-motion";
import { CELEBRATION_EMOJIS } from "@/lib/invite/constants";

export function Confetti() {
  return (
    <div className="confetti" aria-hidden>
      {CELEBRATION_EMOJIS.map((emoji, index) => (
        <motion.span
          key={`${emoji}-${index}`}
          className="confetti-piece"
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, -40 - index * 8, -90 - index * 12],
            x: [0, (index % 2 === 0 ? 1 : -1) * (18 + index * 6)],
            rotate: [0, index % 2 === 0 ? 25 : -25],
            scale: [0.4, 1.1, 1],
          }}
          transition={{
            duration: 2.2,
            delay: index * 0.08,
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

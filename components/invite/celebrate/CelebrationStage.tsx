"use client";

import { Fireworks } from "@/components/invite/celebrate/Fireworks";
import { motion } from "framer-motion";

export function CelebrationStage() {
  return (
    <div className="celebration-stage" aria-hidden>
      <motion.div
        className="celebration-veil"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      <Fireworks />
    </div>
  );
}

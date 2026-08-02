"use client";

import { BackgroundAtmosphere } from "@/components/invite/BackgroundAtmosphere";
import { CelebrationStage } from "@/components/invite/celebrate/CelebrationStage";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type InviteShellProps = {
  children: ReactNode;
  celebrating?: boolean;
};

export function InviteShell({
  children,
  celebrating = false,
}: InviteShellProps) {
  return (
    <div className={`invite-shell${celebrating ? " is-celebrating" : ""}`}>
      <BackgroundAtmosphere />
      {celebrating ? <CelebrationStage /> : null}
      <motion.main
        className={`invite-card${celebrating ? " is-focused" : ""}`}
        layout
        animate={
          celebrating
            ? {
                scale: 1.02,
                y: -6,
              }
            : {
                scale: 1,
                y: 0,
              }
        }
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {children}
      </motion.main>
    </div>
  );
}

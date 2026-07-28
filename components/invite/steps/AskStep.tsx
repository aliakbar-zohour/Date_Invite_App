"use client";

import { motion } from "framer-motion";
import { AnimatedEmoji } from "@/components/invite/ui/AnimatedEmoji";
import { StepHeader } from "@/components/invite/ui/StepHeader";

type AskStepProps = {
  yesScale: number;
  noScale: number;
  onYes: () => void;
  onNo: () => void;
};

export function AskStep({ yesScale, noScale, onYes, onNo }: AskStepProps) {
  return (
    <>
      <AnimatedEmoji>💘</AnimatedEmoji>
      <StepHeader
        as="h1"
        titleClassName="title"
        title="با من میای سر قرار؟"
        subtitle={
          <>
            فقط یه سوال سادست و جواب فقط یکیشونه{" "}
            <span className="inline-emoji">😄</span>
          </>
        }
      />

      <div className="ask-actions">
        <motion.button
          type="button"
          className="btn btn-yes"
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          whileTap={{ scale: yesScale * 0.96 }}
          onClick={onYes}
        >
          آره <span>❤️</span>
        </motion.button>

        <motion.button
          type="button"
          className="btn btn-no"
          animate={{ scale: noScale }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          whileTap={{ scale: noScale * 0.9 }}
          onClick={onNo}
          aria-label="نه"
        >
          نه
        </motion.button>
      </div>
    </>
  );
}

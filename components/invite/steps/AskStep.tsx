"use client";

import { motion } from "framer-motion";
import { Emoji } from "@/components/invite/ui/Emoji";
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
      <motion.div
        className="hero-emoji"
        animate={{ scale: [1, 1.08, 1], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <Emoji emoji="💘" size="1em" label="قلب" />
      </motion.div>

      <StepHeader
        as="h1"
        titleClassName="title"
        title="با من میای سر قرار؟"
        subtitle={
          <>
            فقط یه سوال سادست و جواب فقط یکیشونه{" "}
            <Emoji emoji="😄" size="1.15em" className="inline-emoji" />
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
          آره <Emoji emoji="❤️" size="1.1em" className="btn-emoji" />
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

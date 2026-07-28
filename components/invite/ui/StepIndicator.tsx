"use client";

import { motion } from "framer-motion";
import { INDICATOR_STEPS } from "@/lib/invite/constants";
import { getStepProgressIndex } from "@/lib/invite/format";
import type { InviteStep } from "@/lib/invite/types";

type StepIndicatorProps = {
  currentStep: InviteStep;
};

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressIndex = getStepProgressIndex(currentStep);
  const isCelebrate = currentStep === "celebrate";
  const total = INDICATOR_STEPS.length;
  const filledRatio = isCelebrate
    ? 1
    : progressIndex / Math.max(total - 1, 1);

  return (
    <nav className="step-indicator" aria-label="پیشرفت مراحل">
      <div className="step-indicator-line" aria-hidden>
        <motion.span
          className="step-indicator-progress"
          initial={false}
          animate={{ scaleX: Math.min(filledRatio, 1) }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        />
      </div>

      <ol className="step-indicator-nodes">
        {INDICATOR_STEPS.map((step, index) => {
          const isComplete = isCelebrate || index < progressIndex;
          const isActive = !isCelebrate && index === progressIndex;

          return (
            <li
              key={step}
              className={[
                "step-indicator-node",
                isComplete ? "is-complete" : "",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              <motion.span
                className="step-indicator-dot"
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : isComplete ? 1 : 0.85,
                  opacity: isActive || isComplete ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

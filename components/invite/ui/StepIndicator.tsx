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

  return (
    <nav className="step-indicator" aria-label="پیشرفت مراحل">
      <ol className="step-indicator-track">
        {INDICATOR_STEPS.map((step, index) => {
          const isComplete = isCelebrate || index < progressIndex;
          const isActive = !isCelebrate && index === progressIndex;
          const shouldFill = isComplete || isActive;

          return (
            <li
              key={step}
              className={[
                "step-indicator-segment",
                isComplete ? "is-complete" : "",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="step-indicator-rail">
                <motion.span
                  className="step-indicator-fill"
                  initial={false}
                  animate={{ scaleX: shouldFill ? 1 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    delay: isCelebrate ? index * 0.1 : isActive ? 0.05 : 0,
                  }}
                />
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import { Confetti } from "@/components/invite/celebrate/Confetti";
import { DateSummary } from "@/components/invite/celebrate/DateSummary";
import { Emoji } from "@/components/invite/ui/Emoji";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import type { FoodOption } from "@/lib/invite/types";
import type { JalaliDate } from "@/lib/jalali";
import { motion } from "framer-motion";

type CelebrateStepProps = {
  date: JalaliDate;
  hour: number;
  minute: number;
  food: FoodOption;
};

const HEART_ROW = ["💕", "✨", "🥰", "💖"] as const;

export function CelebrateStep({
  date,
  hour,
  minute,
  food,
}: CelebrateStepProps) {
  return (
    <>
      <Confetti />
      <motion.div
        className="hero-emoji big"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <Emoji emoji="🥳" size="1em" label="جشن" />
      </motion.div>
      <StepHeader as="h2" titleClassName="title" title="خوشحالم که نه نگفتی" />
      <p className="celebrate-hearts">
        {HEART_ROW.map((emoji) => (
          <Emoji key={emoji} emoji={emoji} size="1.25rem" />
        ))}
      </p>
      <DateSummary date={date} hour={hour} minute={minute} food={food} />
    </>
  );
}

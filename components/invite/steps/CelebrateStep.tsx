"use client";

import { Confetti } from "@/components/invite/celebrate/Confetti";
import { DateSummary } from "@/components/invite/celebrate/DateSummary";
import { AnimatedEmoji } from "@/components/invite/ui/AnimatedEmoji";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import type { FoodOption } from "@/lib/invite/types";
import type { JalaliDate } from "@/lib/jalali";

type CelebrateStepProps = {
  date: JalaliDate;
  hour: number;
  minute: number;
  food: FoodOption;
};

export function CelebrateStep({
  date,
  hour,
  minute,
  food,
}: CelebrateStepProps) {
  return (
    <>
      <Confetti />
      <AnimatedEmoji
        big
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        🥳
      </AnimatedEmoji>
      <StepHeader as="h2" titleClassName="title" title="خوشحالم که نه نگفتی" />
      <p className="celebrate-hearts">💕✨🥰💖</p>
      <DateSummary date={date} hour={hour} minute={minute} food={food} />
    </>
  );
}

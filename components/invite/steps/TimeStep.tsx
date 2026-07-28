"use client";

import { TimePicker } from "@/components/invite/time/TimePicker";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import { StepNav } from "@/components/invite/ui/StepNav";
import { STEP_META } from "@/lib/invite/constants";

type TimeStepProps = {
  hour: number;
  minute: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export function TimeStep({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  onBack,
  onNext,
}: TimeStepProps) {
  const meta = STEP_META.time!;

  return (
    <>
      <StepHeader
        title={meta.title}
        subtitle={meta.subtitle}
      />
      <TimePicker
        hour={hour}
        minute={minute}
        onHourChange={onHourChange}
        onMinuteChange={onMinuteChange}
      />
      <StepNav onBack={onBack} onNext={onNext} nextLabel="بعدی 💫" />
    </>
  );
}

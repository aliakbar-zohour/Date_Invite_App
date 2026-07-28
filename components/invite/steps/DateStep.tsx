"use client";

import { PersianCalendar } from "@/components/invite/calendar/PersianCalendar";
import { EmojiText } from "@/components/invite/ui/EmojiText";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import { StepNav } from "@/components/invite/ui/StepNav";
import { STEP_META } from "@/lib/invite/constants";
import type { JalaliDate } from "@/lib/jalali";

type DateStepProps = {
  value: JalaliDate | null;
  onChange: (date: JalaliDate) => void;
  onNext: () => void;
};

export function DateStep({ value, onChange, onNext }: DateStepProps) {
  const meta = STEP_META.date!;

  return (
    <>
      <StepHeader
        title={meta.title}
        subtitle={<EmojiText text={meta.subtitle} />}
      />
      <PersianCalendar value={value} onChange={onChange} />
      <StepNav
        showBack={false}
        onNext={onNext}
        nextLabel={<EmojiText text="بعدی 💫" />}
        nextDisabled={!value}
      />
    </>
  );
}

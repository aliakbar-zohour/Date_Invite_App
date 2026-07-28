"use client";

import { FoodGrid } from "@/components/invite/food/FoodGrid";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import { StepNav } from "@/components/invite/ui/StepNav";
import { STEP_META } from "@/lib/invite/constants";
import type { FoodOption } from "@/lib/invite/types";

type FoodStepProps = {
  value: FoodOption | null;
  onChange: (food: FoodOption) => void;
  onBack: () => void;
  onNext: () => void;
};

export function FoodStep({
  value,
  onChange,
  onBack,
  onNext,
}: FoodStepProps) {
  const meta = STEP_META.food!;

  return (
    <>
      <StepHeader
        title={meta.title}
        subtitle={meta.subtitle}
      />
      <FoodGrid value={value} onChange={onChange} />
      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="تمومه 💝"
        nextDisabled={!value}
      />
    </>
  );
}

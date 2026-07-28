import { Button } from "@/components/invite/ui/Button";
import type { ReactNode } from "react";

type StepNavProps = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: ReactNode;
  nextDisabled?: boolean;
  showBack?: boolean;
};

export function StepNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  showBack = true,
}: StepNavProps) {
  if (!showBack) {
    return (
      <Button onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
    );
  }

  return (
    <div className="step-nav">
      <Button onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
      <Button variant="ghost" onClick={onBack}>
        قبلی
      </Button>
    </div>
  );
}

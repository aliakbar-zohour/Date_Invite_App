import type { ReactNode } from "react";

type StepHeaderProps = {
  badge?: string;
  title: string;
  subtitle?: ReactNode;
  as?: "h1" | "h2";
  titleClassName?: string;
};

export function StepHeader({
  badge,
  title,
  subtitle,
  as = "h2",
  titleClassName = "title title-sm",
}: StepHeaderProps) {
  const TitleTag = as;

  return (
    <>
      {badge ? <p className="step-badge">{badge}</p> : null}
      <TitleTag className={titleClassName}>{title}</TitleTag>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </>
  );
}

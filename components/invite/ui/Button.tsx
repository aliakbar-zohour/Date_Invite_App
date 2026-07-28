"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "yes" | "no";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  yes: "btn btn-yes",
  no: "btn btn-no",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

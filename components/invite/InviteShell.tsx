import { FLOATING_PETALS } from "@/lib/invite/constants";
import type { ReactNode } from "react";

type InviteShellProps = {
  children: ReactNode;
};

export function InviteShell({ children }: InviteShellProps) {
  return (
    <div className="invite-shell">
      <div className="invite-glow invite-glow-a" aria-hidden />
      <div className="invite-glow invite-glow-b" aria-hidden />
      <div className="invite-petals" aria-hidden>
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className={`petal petal-${index % 6}`}>
            {FLOATING_PETALS[index % FLOATING_PETALS.length]}
          </span>
        ))}
      </div>
      <main className="invite-card">{children}</main>
    </div>
  );
}

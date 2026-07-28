import { BackgroundAtmosphere } from "@/components/invite/BackgroundAtmosphere";
import type { ReactNode } from "react";

type InviteShellProps = {
  children: ReactNode;
};

export function InviteShell({ children }: InviteShellProps) {
  return (
    <div className="invite-shell">
      <BackgroundAtmosphere />
      <main className="invite-card">{children}</main>
    </div>
  );
}

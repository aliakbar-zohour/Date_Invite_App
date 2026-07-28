"use client";

import { Emoji } from "@/components/invite/ui/Emoji";
import {
  ATMOSPHERE_PARTICLES,
  ATMOSPHERE_SPARKLES,
} from "@/lib/invite/constants";

export function BackgroundAtmosphere() {
  return (
    <div className="invite-atmosphere" aria-hidden>
      <div className="invite-glow invite-glow-a" />
      <div className="invite-glow invite-glow-b" />
      <div className="invite-glow invite-glow-c" />

      <div className="invite-aurora invite-aurora-a" />
      <div className="invite-aurora invite-aurora-b" />

      <div className="invite-sparkles">
        {ATMOSPHERE_SPARKLES.map((sparkle, index) => (
          <span
            key={`sparkle-${index}`}
            className="invite-sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>

      <div className="invite-petals">
        {ATMOSPHERE_PARTICLES.map((particle, index) => (
          <span
            key={`particle-${index}`}
            className={`petal petal-${particle.variant}`}
            style={{
              left: particle.left,
              fontSize: particle.size,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              ["--petal-drift" as string]: particle.drift,
              ["--petal-opacity" as string]: String(particle.opacity),
            }}
          >
            <Emoji emoji={particle.emoji} size="1em" />
          </span>
        ))}
      </div>
    </div>
  );
}

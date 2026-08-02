"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  trail: boolean;
};

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  exploded: boolean;
};

const PALETTE = [
  "#ff6b8a",
  "#ffd166",
  "#fff5f8",
  "#ff8fa3",
  "#ffb703",
  "#ff4d6d",
  "#ffe5ec",
  "#f72585",
];

function randomColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function spawnBurst(particles: Particle[], x: number, y: number, color: string) {
  const count = 42 + Math.floor(Math.random() * 28);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35;
    const speed = 1.6 + Math.random() * 3.8;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 45 + Math.random() * 40,
      size: 1.4 + Math.random() * 2.2,
      color: Math.random() > 0.35 ? color : randomColor(),
      trail: Math.random() > 0.55,
    });
  }

  // secondary glitter ring
  for (let i = 0; i < 18; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * 1.4;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 55 + Math.random() * 30,
      size: 0.8 + Math.random() * 1.2,
      color: "#fff8fb",
      trail: false,
    });
  }
}

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let nextLaunch = 0;
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = (now: number) => {
      const lane = 0.12 + Math.random() * 0.76;
      rockets.push({
        x: width * lane,
        y: height + 8,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(6.2 + Math.random() * 3.4),
        targetY: height * (0.18 + Math.random() * 0.32),
        color: randomColor(),
        exploded: false,
      });
      nextLaunch = now + 320 + Math.random() * 520;
    };

    const frame = (now: number) => {
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      if (now >= nextLaunch && rockets.length < 5) {
        launch(now);
        if (Math.random() > 0.55) launch(now + 40);
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        rocket.x += rocket.vx;
        rocket.y += rocket.vy;
        rocket.vy += 0.045;

        ctx.beginPath();
        ctx.fillStyle = rocket.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = rocket.color;
        ctx.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // spark trail
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 1.2,
          life: 0,
          maxLife: 12 + Math.random() * 10,
          size: 1,
          color: rocket.color,
          trail: true,
        });

        if (rocket.y <= rocket.targetY || rocket.vy >= -0.4) {
          spawnBurst(particles, rocket.x, rocket.y, rocket.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.trail ? 0.02 : 0.035;
        p.vx *= 0.985;
        p.vy *= 0.99;

        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.trail ? 1 - t : Math.sin((1 - t) * Math.PI);
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.beginPath();
        ctx.fillStyle = p.color;
        if (!p.trail) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.35), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // soft ambient sparkles near card edges
      if (Math.random() > 0.92) {
        particles.push({
          x: width * (0.2 + Math.random() * 0.6),
          y: height * (0.25 + Math.random() * 0.45),
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.4,
          life: 0,
          maxLife: 40,
          size: 1.1,
          color: "#ffe5ec",
          trail: false,
        });
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    nextLaunch = performance.now() + 180;
    // Opening double burst for impact
    spawnBurst(particles, width * 0.32, height * 0.28, PALETTE[0]);
    spawnBurst(particles, width * 0.68, height * 0.24, PALETTE[1]);
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="celebration-fireworks" aria-hidden />;
}

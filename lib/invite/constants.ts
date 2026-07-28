import type { FoodOption, InviteStep } from "@/lib/invite/types";

export const FOOD_OPTIONS: FoodOption[] = [
  { id: "pizza", label: "پیتزا", emoji: "🍕" },
  { id: "coffee", label: "قهوه", emoji: "☕" },
  { id: "chocolate", label: "شکلات", emoji: "🍫" },
  { id: "kebab", label: "کوبیده", emoji: "🍖" },
  { id: "pasta", label: "پاستا", emoji: "🍝" },
];

export const CELEBRATION_EMOJIS = [
  "💕",
  "✨",
  "🥰",
  "💖",
  "🎉",
  "💗",
  "🥳",
  "💘",
  "🌸",
  "🎀",
] as const;

export const FLOATING_PETALS = [
  "💕",
  "🌸",
  "✨",
  "💗",
  "💖",
  "🎀",
  "💘",
  "🌺",
] as const;

export type AtmosphereParticle = {
  emoji: (typeof FLOATING_PETALS)[number];
  left: string;
  size: string;
  duration: string;
  delay: string;
  drift: string;
  variant: "rise" | "drift" | "sway";
  opacity: number;
};

export const ATMOSPHERE_PARTICLES: AtmosphereParticle[] = [
  { emoji: "💕", left: "4%", size: "1.05rem", duration: "14s", delay: "0s", drift: "18px", variant: "rise", opacity: 0.42 },
  { emoji: "✨", left: "11%", size: "0.75rem", duration: "11s", delay: "1.2s", drift: "-22px", variant: "drift", opacity: 0.5 },
  { emoji: "🌸", left: "18%", size: "1.2rem", duration: "16s", delay: "2.4s", drift: "28px", variant: "sway", opacity: 0.38 },
  { emoji: "💗", left: "26%", size: "0.9rem", duration: "13s", delay: "0.6s", drift: "-14px", variant: "rise", opacity: 0.4 },
  { emoji: "💖", left: "34%", size: "1.35rem", duration: "18s", delay: "3.1s", drift: "24px", variant: "drift", opacity: 0.34 },
  { emoji: "🎀", left: "42%", size: "0.85rem", duration: "12s", delay: "4.5s", drift: "-30px", variant: "sway", opacity: 0.36 },
  { emoji: "💘", left: "50%", size: "1.1rem", duration: "15s", delay: "1.8s", drift: "16px", variant: "rise", opacity: 0.4 },
  { emoji: "🌺", left: "58%", size: "0.95rem", duration: "17s", delay: "5.2s", drift: "-20px", variant: "drift", opacity: 0.32 },
  { emoji: "💕", left: "66%", size: "1.25rem", duration: "14s", delay: "2.8s", drift: "26px", variant: "sway", opacity: 0.38 },
  { emoji: "✨", left: "74%", size: "0.7rem", duration: "10s", delay: "0.3s", drift: "-12px", variant: "rise", opacity: 0.55 },
  { emoji: "🌸", left: "82%", size: "1.15rem", duration: "16s", delay: "3.7s", drift: "20px", variant: "drift", opacity: 0.36 },
  { emoji: "💗", left: "90%", size: "0.88rem", duration: "13s", delay: "6s", drift: "-26px", variant: "sway", opacity: 0.4 },
  { emoji: "💖", left: "7%", size: "0.8rem", duration: "19s", delay: "7.5s", drift: "14px", variant: "rise", opacity: 0.3 },
  { emoji: "🎀", left: "47%", size: "1rem", duration: "12s", delay: "8.2s", drift: "-18px", variant: "drift", opacity: 0.34 },
  { emoji: "💘", left: "93%", size: "1.3rem", duration: "15s", delay: "4.1s", drift: "22px", variant: "sway", opacity: 0.33 },
  { emoji: "✨", left: "30%", size: "0.65rem", duration: "9s", delay: "5.8s", drift: "10px", variant: "rise", opacity: 0.48 },
  { emoji: "💕", left: "63%", size: "0.78rem", duration: "11s", delay: "9s", drift: "-16px", variant: "drift", opacity: 0.37 },
  { emoji: "🌸", left: "85%", size: "0.92rem", duration: "14s", delay: "6.6s", drift: "30px", variant: "rise", opacity: 0.35 },
];

export const ATMOSPHERE_SPARKLES = [
  { top: "12%", left: "8%", delay: "0s", size: "3px" },
  { top: "18%", left: "78%", delay: "0.8s", size: "2px" },
  { top: "28%", left: "92%", delay: "1.6s", size: "3px" },
  { top: "42%", left: "6%", delay: "2.2s", size: "2px" },
  { top: "55%", left: "88%", delay: "0.4s", size: "3px" },
  { top: "68%", left: "14%", delay: "1.1s", size: "2px" },
  { top: "76%", left: "72%", delay: "2.8s", size: "3px" },
  { top: "88%", left: "48%", delay: "1.9s", size: "2px" },
  { top: "8%", left: "52%", delay: "3.2s", size: "2px" },
  { top: "36%", left: "38%", delay: "2.5s", size: "3px" },
] as const;


export const STEP_ORDER: InviteStep[] = [
  "ask",
  "date",
  "time",
  "food",
  "celebrate",
];

/** Segmented progress bar steps (celebration counts as fully filled). */
export const INDICATOR_STEPS: Exclude<InviteStep, "celebrate">[] = [
  "ask",
  "date",
  "time",
  "food",
];

export const STEP_META: Partial<
  Record<InviteStep, { badge: string; title: string; subtitle: string }>
> = {
  date: {
    badge: "مرحله ۲ از ۴ 📅",
    title: "کی وقت داری؟",
    subtitle: "یه روز قشنگ انتخاب کن ✨",
  },
  time: {
    badge: "مرحله ۳ از ۴ ⏰",
    title: "ساعت چند بیام؟",
    subtitle: "ساعت و دقیقش رو مشخص کن 🕰️",
  },
  food: {
    badge: "مرحله ۴ از ۴ 🍽️",
    title: "چی دوس داری بخوریم؟",
    subtitle: "یکی رو با دل انتخاب کن 😋",
  },
};

export const YES_SCALE_STEP = 0.18;
export const YES_SCALE_MAX = 2.4;
export const NO_SCALE_STEP = 0.14;
export const NO_SCALE_MIN = 0.28;

export const DEFAULT_HOUR = 14;
export const DEFAULT_MINUTE = 0;
export const MINUTE_STEP = 5;

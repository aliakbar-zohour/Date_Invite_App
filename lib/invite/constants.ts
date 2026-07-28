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

export const FLOATING_PETALS = ["💕", "🌸", "✨", "💗"] as const;

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

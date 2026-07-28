import { formatJalaliDate, toPersianDigits, type JalaliDate } from "@/lib/jalali";
import type { FoodOption, InviteStep } from "@/lib/invite/types";
import {
  INDICATOR_STEPS,
  NO_SCALE_MIN,
  NO_SCALE_STEP,
  YES_SCALE_MAX,
  YES_SCALE_STEP,
} from "@/lib/invite/constants";

export function formatPersianTime(hour: number, minute: number): string {
  const h = toPersianDigits(String(hour).padStart(2, "0"));
  if (minute === 0) return h;
  return `${h}:${toPersianDigits(String(minute).padStart(2, "0"))}`;
}

export function formatPadPersian(value: number, digits = 2): string {
  return toPersianDigits(String(value).padStart(digits, "0"));
}

export function getYesButtonScale(noClicks: number): number {
  return Math.min(1 + noClicks * YES_SCALE_STEP, YES_SCALE_MAX);
}

export function getNoButtonScale(noClicks: number): number {
  return Math.max(1 - noClicks * NO_SCALE_STEP, NO_SCALE_MIN);
}

export function buildDateSummary(
  date: JalaliDate,
  hour: number,
  minute: number,
  food: FoodOption,
): string {
  return `پس ${formatJalaliDate(date)} ساعت ${formatPersianTime(hour, minute)} میام دنبالت. برای ${food.label} ${food.emoji}`;
}

/** How many indicator segments should be filled (0–4). Active step fills its own. */
export function getStepProgressIndex(step: InviteStep): number {
  if (step === "celebrate") return INDICATOR_STEPS.length;
  const index = INDICATOR_STEPS.indexOf(step);
  return index < 0 ? 0 : index;
}

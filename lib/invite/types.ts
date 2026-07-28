import type { JalaliDate } from "@/lib/jalali";

export type InviteStep = "ask" | "date" | "time" | "food" | "celebrate";

export type FoodOption = {
  id: string;
  label: string;
  emoji: string;
};

export type InviteAnswers = {
  date: JalaliDate | null;
  hour: number;
  minute: number;
  food: FoodOption | null;
};

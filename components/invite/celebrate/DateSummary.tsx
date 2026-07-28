"use client";

import { EmojiText } from "@/components/invite/ui/EmojiText";
import { buildDateSummary } from "@/lib/invite/format";
import type { FoodOption } from "@/lib/invite/types";
import type { JalaliDate } from "@/lib/jalali";

type DateSummaryProps = {
  date: JalaliDate;
  hour: number;
  minute: number;
  food: FoodOption;
};

export function DateSummary({ date, hour, minute, food }: DateSummaryProps) {
  return (
    <div className="summary">
      <EmojiText
        as="p"
        className="summary-main"
        text={buildDateSummary(date, hour, minute, food)}
        emojiSize="1.2em"
      />
      <EmojiText
        as="p"
        className="summary-line"
        text="خودم میام دنبالت 🚗💫"
        emojiSize="1.15em"
      />
      <EmojiText
        as="p"
        className="summary-note"
        text="بخاطر درخواست قرار کردن ازت یه اپلیکیشن نوشتم. چیز مهمی نبود ولی خلاقانه بود 🫶"
        emojiSize="1.1em"
      />
    </div>
  );
}

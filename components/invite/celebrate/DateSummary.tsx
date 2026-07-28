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
      <p className="summary-main">
        {buildDateSummary(date, hour, minute, food)}
      </p>
      <p className="summary-line">خودم میام دنبالت 🚗💫</p>
      <p className="summary-note">
        بخاطر درخواست قرار کردن ازت یه اپلیکیشن نوشتم. چیز مهمی نبود ولی خلاقانه
        بود 🫶
      </p>
    </div>
  );
}

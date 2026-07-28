"use client";

import { isJalaliPast, sameJalaliDay, toPersianDigits, type JalaliDate } from "@/lib/jalali";

type CalendarDayProps = {
  date: JalaliDate;
  selected: boolean;
  isToday: boolean;
  onSelect: (date: JalaliDate) => void;
  minDate?: JalaliDate;
};

export function CalendarDay({
  date,
  selected,
  isToday,
  onSelect,
  minDate,
}: CalendarDayProps) {
  const past = minDate ? isJalaliPast(date, minDate) : false;

  return (
    <button
      type="button"
      disabled={past}
      className={[
        "day",
        selected ? "selected" : "",
        isToday ? "today" : "",
        past ? "past" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={`${toPersianDigits(date.day)}`}
    >
      {toPersianDigits(date.day)}
    </button>
  );
}

export function sameDayOrFalse(
  selected: JalaliDate | null,
  date: JalaliDate,
): boolean {
  return Boolean(selected && sameJalaliDay(selected, date));
}

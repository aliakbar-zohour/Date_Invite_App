"use client";

import { CalendarDay, sameDayOrFalse } from "@/components/invite/calendar/CalendarDay";
import { usePersianCalendar } from "@/hooks/usePersianCalendar";
import {
  PERSIAN_MONTHS,
  PERSIAN_WEEKDAYS,
  sameJalaliDay,
  toPersianDigits,
  type JalaliDate,
} from "@/lib/jalali";

type PersianCalendarProps = {
  value: JalaliDate | null;
  onChange: (date: JalaliDate) => void;
};

export function PersianCalendar({ value, onChange }: PersianCalendarProps) {
  const { today, viewMonth, cells } = usePersianCalendar();

  return (
    <div className="calendar">
      <div className="calendar-head calendar-head-static">
        <div className="calendar-title">
          {PERSIAN_MONTHS[viewMonth.month - 1]}{" "}
          {toPersianDigits(viewMonth.year)}
        </div>
      </div>

      <div className="calendar-weekdays">
        {PERSIAN_WEEKDAYS.map((day) => (
          <span key={day}>{day.slice(0, 1)}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} className="day empty" />;
          }

          return (
            <CalendarDay
              key={`${cell.year}-${cell.month}-${cell.day}`}
              date={cell}
              selected={sameDayOrFalse(value, cell)}
              isToday={sameJalaliDay(cell, today)}
              minDate={today}
              onSelect={onChange}
            />
          );
        })}
      </div>
    </div>
  );
}

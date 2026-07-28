"use client";

import { useMemo } from "react";
import {
  buildCalendarCells,
  todayJalali,
  type JalaliDate,
} from "@/lib/jalali";

export function usePersianCalendar() {
  const today = useMemo(() => todayJalali(), []);
  const viewMonth = useMemo(
    () => ({ year: today.year, month: today.month }),
    [today.year, today.month],
  );
  const cells = useMemo(() => buildCalendarCells(viewMonth), [viewMonth]);

  return {
    today,
    viewMonth,
    cells,
  };
}

export type CalendarSelection = JalaliDate | null;

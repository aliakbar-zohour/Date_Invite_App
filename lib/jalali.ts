export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export const PERSIAN_WEEKDAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
] as const;

export type JalaliDate = {
  year: number;
  month: number;
  day: number;
};

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number,
): JalaliDate {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { year: jy, month: jm, day: jd };
}

export function jalaliToGregorian(
  jy: number,
  jm: number,
  jd: number,
): { year: number; month: number; day: number } {
  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  const days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * Math.floor(days / 146097);
  let remaining = days % 146097;
  if (remaining > 36524) {
    gy += 100 * Math.floor(--remaining / 36524);
    remaining %= 36524;
    if (remaining >= 365) remaining++;
  }
  gy += 4 * Math.floor(remaining / 1461);
  remaining %= 1461;
  if (remaining > 365) {
    gy += Math.floor((remaining - 1) / 365);
    remaining = (remaining - 1) % 365;
  }
  const gd = remaining + 1;
  const sal_a = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gm = 0;
  let dayCount = gd;
  for (gm = 1; gm <= 12 && dayCount > sal_a[gm]; gm++) {
    dayCount -= sal_a[gm];
  }
  return { year: gy, month: gm, day: dayCount };
}

export function daysInJalaliMonth(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isJalaliLeap(year) ? 30 : 29;
}

export function isJalaliLeap(year: number): boolean {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  const bl = breaks.length;
  let jp = breaks[0];
  let jump = 0;
  for (let i = 1; i < bl; i++) {
    const jm = breaks[i];
    jump = jm - jp;
    if (year < jm) break;
    jp = jm;
  }
  let n = year - jp;
  if (jump - n < 6) n = n - jump + Math.floor((jump + 4) / 33) * 33;
  let leap = ((((n + 1) % 33) - 1) % 4);
  if (leap === -1) leap = 4;
  return leap === 0;
}

export function todayJalali(): JalaliDate {
  const now = new Date();
  return gregorianToJalali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
  );
}

export function getWeekdayIndex(j: JalaliDate): number {
  const g = jalaliToGregorian(j.year, j.month, j.day);
  const date = new Date(g.year, g.month - 1, g.day);
  // JS: 0=Sun ... convert to Persian week starting Saturday
  return (date.getDay() + 1) % 7;
}

export function formatJalaliDate(j: JalaliDate): string {
  const weekday = PERSIAN_WEEKDAYS[getWeekdayIndex(j)];
  return `${weekday} ${toPersianDigits(j.day)} ${PERSIAN_MONTHS[j.month - 1]}`;
}

export function sameJalaliDay(a: JalaliDate, b: JalaliDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export type JalaliMonth = {
  year: number;
  month: number;
};

export function compareJalaliDate(a: JalaliDate, b: JalaliDate): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export function isJalaliPast(date: JalaliDate, relativeTo = todayJalali()): boolean {
  return compareJalaliDate(date, relativeTo) < 0;
}

export function shiftJalaliMonth(
  current: JalaliMonth,
  delta: number,
): JalaliMonth {
  let month = current.month + delta;
  let year = current.year;

  while (month > 12) {
    month -= 12;
    year += 1;
  }
  while (month < 1) {
    month += 12;
    year -= 1;
  }

  return { year, month };
}

export function buildCalendarCells(
  view: JalaliMonth,
): Array<JalaliDate | null> {
  const days = daysInJalaliMonth(view.year, view.month);
  const firstWeekday = getWeekdayIndex({
    year: view.year,
    month: view.month,
    day: 1,
  });

  const cells: Array<JalaliDate | null> = Array.from(
    { length: firstWeekday },
    () => null,
  );

  for (let day = 1; day <= days; day += 1) {
    cells.push({ year: view.year, month: view.month, day });
  }

  return cells;
}

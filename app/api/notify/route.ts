import { NextResponse } from "next/server";
import { notifyConfig } from "@/config/notify";
import { FOOD_OPTIONS } from "@/lib/invite/constants";
import {
  buildNotifyMessage,
  sendTelegramMessage,
  type NotifyPayload,
} from "@/lib/telegram/notify";
import type { JalaliDate } from "@/lib/jalali";

type Body = {
  date?: JalaliDate;
  hour?: number;
  minute?: number;
  food?: { id?: string; label?: string; emoji?: string };
};

function isValidDate(date: unknown): date is JalaliDate {
  if (!date || typeof date !== "object") return false;
  const d = date as JalaliDate;
  return (
    Number.isInteger(d.year) &&
    Number.isInteger(d.month) &&
    Number.isInteger(d.day) &&
    d.month >= 1 &&
    d.month <= 12 &&
    d.day >= 1 &&
    d.day <= 31
  );
}

function parsePayload(body: Body): NotifyPayload | null {
  if (!isValidDate(body.date)) return null;
  if (typeof body.hour !== "number" || body.hour < 0 || body.hour > 23) {
    return null;
  }
  if (typeof body.minute !== "number" || body.minute < 0 || body.minute > 59) {
    return null;
  }

  const foodId = body.food?.id;
  const food = FOOD_OPTIONS.find((option) => option.id === foodId);
  if (!food) return null;

  return {
    date: body.date,
    hour: body.hour,
    minute: body.minute,
    food,
  };
}

export async function POST(request: Request) {
  if (!notifyConfig.enabled) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const text = buildNotifyMessage(payload);
    await sendTelegramMessage(text);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send notification";
    console.error("[notify]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

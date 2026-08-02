import { notifyConfig } from "@/config/notify";
import { formatPersianTime } from "@/lib/invite/format";
import type { FoodOption } from "@/lib/invite/types";
import { formatJalaliDate, type JalaliDate } from "@/lib/jalali";

export type NotifyPayload = {
  date: JalaliDate;
  hour: number;
  minute: number;
  food: FoodOption;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function buildNotifyMessage(payload: NotifyPayload): string {
  const date = formatJalaliDate(payload.date);
  const time = formatPersianTime(payload.hour, payload.minute);
  const food = escapeHtml(payload.food.label);
  const foodEmoji = payload.food.emoji;

  return notifyConfig.messageTemplate
    .replaceAll("{{date}}", escapeHtml(date))
    .replaceAll("{{time}}", escapeHtml(time))
    .replaceAll("{{food}}", food)
    .replaceAll("{{foodEmoji}}", foodEmoji);
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = String(notifyConfig.telegram.chatId).trim();

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing in .env.local");
  }
  if (!chatId) {
    throw new Error(
      "telegram.chatId is empty in config/notify.ts — run npm run telegram:chat-id after messaging the bot",
    );
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const data = (await response.json()) as {
    ok: boolean;
    description?: string;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.description ?? `Telegram API error (${response.status})`);
  }
}

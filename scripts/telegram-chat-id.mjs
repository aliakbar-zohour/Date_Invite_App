#!/usr/bin/env node
/**
 * Prints recent chat ids that messaged your bot.
 * 1) Open the bot in Telegram and send /start
 * 2) Run: npm run telegram:chat-id
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN in .env.local");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();

if (!data.ok) {
  console.error("Telegram error:", data.description ?? data);
  process.exit(1);
}

const chats = new Map();
for (const update of data.result ?? []) {
  const msg = update.message ?? update.edited_message ?? update.my_chat_member;
  const chat = msg?.chat;
  if (!chat?.id) continue;
  const label =
    chat.username ??
    [chat.first_name, chat.last_name].filter(Boolean).join(" ") ??
    chat.title ??
    "unknown";
  chats.set(String(chat.id), label);
}

if (chats.size === 0) {
  console.log(`No chats yet.

1. Open your bot in Telegram and tap Start
2. Send any message (e.g. /start)
3. Run this command again`);
  process.exit(0);
}

console.log("Paste one of these into config/notify.ts → telegram.chatId:\n");
for (const [id, label] of chats) {
  console.log(`  ${id}  (${label})`);
}

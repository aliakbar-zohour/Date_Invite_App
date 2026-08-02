/**
 * ─────────────────────────────────────────────────────────────
 *  Notify config — edit this file when you fork / reuse the app
 * ─────────────────────────────────────────────────────────────
 *
 * Secrets (bot token) live in `.env.local` — never put them here.
 * See `.env.example` for the required env vars.
 *
 * Setup checklist:
 *  1. Create a bot with @BotFather → put the token in `.env.local`
 *  2. Open your bot in Telegram and tap Start / ارسال /start
 *  3. Run:  npm run telegram:chat-id
 *  4. Paste the printed chat id into `telegram.chatId` below
 *  5. Tweak the message template if you like
 */

export const notifyConfig = {
  /** Master switch — set false to skip sending entirely */
  enabled: true,

  telegram: {
    /** Public bot handle (without or with @) — for docs / debugging only */
    botUsername: "AliakbarN8NBot",

    /**
     * Your numeric Telegram user id (or a group/channel id).
     * The bot can only message chats that have already started it.
     */
    chatId: "311767980",
  },

  /**
   * Message sent when someone finishes the invite flow.
   * Placeholders:
   *   {{date}}       — e.g. جمعه ۱۵ مرداد
   *   {{time}}       — e.g. ۱۹:۳۰
   *   {{food}}       — e.g. پیتزا
   *   {{foodEmoji}}  — e.g. 🍕
   *
   * Uses Telegram HTML parse mode.
   */
  messageTemplate: `
💌 <b>دعوت‌نامه قبول شد</b>

فرد مورد نظرت جواب <b>بله</b> داد
و قرارتون رسمی شد ✨

<blockquote>📅  {{date}}
⏰  {{time}}
{{foodEmoji}}  {{food}}</blockquote>

حالا فقط بمونه یه قرار قشنگ 💕
`.trim(),
} as const;

export type NotifyConfig = typeof notifyConfig;

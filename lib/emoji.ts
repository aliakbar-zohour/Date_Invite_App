const EMOJI_SEGMENT =
  /\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?)*/gu;

/** Local Twemoji SVG filenames for every glyph used in the app. */
const EMOJI_FILES: Record<string, string> = {
  "💕": "1f495",
  "🌸": "1f338",
  "✨": "2728",
  "💗": "1f497",
  "💖": "1f496",
  "🎀": "1f380",
  "💘": "1f498",
  "🌺": "1f33a",
  "🥰": "1f970",
  "🎉": "1f389",
  "🥳": "1f973",
  "🍕": "1f355",
  "☕": "2615",
  "🍫": "1f36b",
  "🍖": "1f356",
  "🍝": "1f35d",
  "😄": "1f604",
  "❤️": "2764",
  "❤": "2764",
  "💫": "1f4ab",
  "🚗": "1f697",
  "🫶": "1faf6",
  "📅": "1f4c5",
  "⏰": "23f0",
  "🕰️": "1f570",
  "🕰": "1f570",
  "🍽️": "1f37d",
  "🍽": "1f37d",
  "💝": "1f49d",
  "😋": "1f60b",
};

export function emojiToCodePoint(emoji: string): string {
  const points: string[] = [];

  for (const char of emoji) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;
    if (code === 0xfe0f || code === 0xfe0e) continue;
    points.push(code.toString(16));
  }

  return points.join("-");
}

export function getEmojiSrc(emoji: string): string {
  const mapped = EMOJI_FILES[emoji] ?? emojiToCodePoint(emoji);
  return `/emojis/${mapped}.svg`;
}

export function splitEmojiText(text: string): Array<
  | { type: "text"; value: string }
  | { type: "emoji"; value: string }
> {
  const parts: Array<
    | { type: "text"; value: string }
    | { type: "emoji"; value: string }
  > = [];

  let lastIndex = 0;
  for (const match of text.matchAll(EMOJI_SEGMENT)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, index) });
    }
    parts.push({ type: "emoji", value: match[0] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts;
}

export function hasEmoji(text: string): boolean {
  EMOJI_SEGMENT.lastIndex = 0;
  return EMOJI_SEGMENT.test(text);
}

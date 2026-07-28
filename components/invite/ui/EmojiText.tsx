"use client";

import { Emoji } from "@/components/invite/ui/Emoji";
import { hasEmoji, splitEmojiText } from "@/lib/emoji";
import type { ReactNode } from "react";

type EmojiTextProps = {
  text: string;
  className?: string;
  emojiSize?: number | string;
  as?: "span" | "p" | "div";
};

export function EmojiText({
  text,
  className = "",
  emojiSize = "1.15em",
  as: Tag = "span",
}: EmojiTextProps) {
  if (!hasEmoji(text)) {
    return <Tag className={className}>{text}</Tag>;
  }

  const nodes: ReactNode[] = splitEmojiText(text).map((part, index) => {
    if (part.type === "text") {
      return <span key={`t-${index}`}>{part.value}</span>;
    }

    return (
      <Emoji
        key={`e-${index}-${part.value}`}
        emoji={part.value}
        size={emojiSize}
        className="emoji-inline"
      />
    );
  });

  return <Tag className={className}>{nodes}</Tag>;
}

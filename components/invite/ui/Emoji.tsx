"use client";

import { getEmojiSrc } from "@/lib/emoji";
import type { CSSProperties } from "react";

type EmojiProps = {
  emoji: string;
  label?: string;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Emoji({
  emoji,
  label = emoji,
  size = "1em",
  className = "",
  style,
}: EmojiProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <img
      src={getEmojiSrc(emoji)}
      alt={label}
      draggable={false}
      className={`emoji-img ${className}`.trim()}
      style={{
        width: dimension,
        height: dimension,
        ...style,
      }}
    />
  );
}

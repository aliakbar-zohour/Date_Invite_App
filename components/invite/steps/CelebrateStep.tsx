"use client";

import { useEffect, useRef } from "react";
import { DateSummary } from "@/components/invite/celebrate/DateSummary";
import { Emoji } from "@/components/invite/ui/Emoji";
import { StepHeader } from "@/components/invite/ui/StepHeader";
import type { FoodOption } from "@/lib/invite/types";
import type { JalaliDate } from "@/lib/jalali";
import { motion } from "framer-motion";

type CelebrateStepProps = {
  date: JalaliDate;
  hour: number;
  minute: number;
  food: FoodOption;
};

const HEART_ROW = ["💕", "✨", "🥰", "💖"] as const;

function notifyKey(
  date: JalaliDate,
  hour: number,
  minute: number,
  foodId: string,
): string {
  return `invite-notified:${date.year}-${date.month}-${date.day}:${hour}:${minute}:${foodId}`;
}

export function CelebrateStep({
  date,
  hour,
  minute,
  food,
}: CelebrateStepProps) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;

    const key = notifyKey(date, hour, minute, food.id);
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // private mode / blocked storage — fall through once via ref
    }

    sentRef.current = true;

    void fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, hour, minute, food }),
    }).catch(() => {
      // Silent — celebration UI shouldn't break if notify fails
    });
  }, [date, hour, minute, food]);

  return (
    <>
      <motion.div
        className="hero-emoji big"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <Emoji emoji="🥳" size="1em" label="جشن" />
      </motion.div>
      <StepHeader as="h2" titleClassName="title" title="خوشحالم که نه نگفتی" />
      <p className="celebrate-hearts">
        {HEART_ROW.map((emoji) => (
          <Emoji key={emoji} emoji={emoji} size="1.25rem" />
        ))}
      </p>
      <DateSummary date={date} hour={hour} minute={minute} food={food} />
    </>
  );
}

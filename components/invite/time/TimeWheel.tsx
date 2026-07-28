"use client";

import { formatPadPersian } from "@/lib/invite/format";

type TimeWheelProps = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementLabel: string;
  decrementLabel: string;
};

export function TimeWheel({
  label,
  value,
  onIncrement,
  onDecrement,
  incrementLabel,
  decrementLabel,
}: TimeWheelProps) {
  return (
    <div className="time-col">
      <span className="time-label">{label}</span>
      <div className="time-wheel">
        <button
          type="button"
          className="icon-btn"
          onClick={onIncrement}
          aria-label={incrementLabel}
        >
          ▲
        </button>
        <div className="time-value" aria-live="polite">
          {formatPadPersian(value)}
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onDecrement}
          aria-label={decrementLabel}
        >
          ▼
        </button>
      </div>
    </div>
  );
}

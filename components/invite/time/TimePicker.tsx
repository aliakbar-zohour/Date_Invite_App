"use client";

import { TimeWheel } from "@/components/invite/time/TimeWheel";
import { MINUTE_STEP } from "@/lib/invite/constants";

type TimePickerProps = {
  hour: number;
  minute: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
};

export function TimePicker({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}: TimePickerProps) {
  return (
    <div className="time-picker">
      <TimeWheel
        label="ساعت"
        value={hour}
        onIncrement={() => onHourChange((hour + 1) % 24)}
        onDecrement={() => onHourChange((hour + 23) % 24)}
        incrementLabel="ساعت بیشتر"
        decrementLabel="ساعت کمتر"
      />

      <div className="time-colon" aria-hidden>
        :
      </div>

      <TimeWheel
        label="دقیقه"
        value={minute}
        onIncrement={() => onMinuteChange((minute + MINUTE_STEP) % 60)}
        onDecrement={() =>
          onMinuteChange((minute + (60 - MINUTE_STEP)) % 60)
        }
        incrementLabel="دقیقه بیشتر"
        decrementLabel="دقیقه کمتر"
      />
    </div>
  );
}

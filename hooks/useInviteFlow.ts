"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_HOUR,
  DEFAULT_MINUTE,
  STEP_ORDER,
} from "@/lib/invite/constants";
import type { FoodOption, InviteStep } from "@/lib/invite/types";
import {
  getNoButtonScale,
  getYesButtonScale,
} from "@/lib/invite/format";
import type { JalaliDate } from "@/lib/jalali";

export function useInviteFlow() {
  const [step, setStep] = useState<InviteStep>("ask");
  const [noClicks, setNoClicks] = useState(0);
  const [selectedDate, setSelectedDate] = useState<JalaliDate | null>(null);
  const [hour, setHour] = useState(DEFAULT_HOUR);
  const [minute, setMinute] = useState(DEFAULT_MINUTE);
  const [food, setFood] = useState<FoodOption | null>(null);

  const yesScale = useMemo(() => getYesButtonScale(noClicks), [noClicks]);
  const noScale = useMemo(() => getNoButtonScale(noClicks), [noClicks]);

  const goTo = useCallback((next: InviteStep) => {
    setStep(next);
  }, []);

  const goNext = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)];
    });
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.max(index - 1, 0)];
    });
  }, []);

  const rejectNo = useCallback(() => {
    setNoClicks((count) => count + 1);
  }, []);

  const acceptYes = useCallback(() => {
    setStep("date");
  }, []);

  const canContinueFromDate = selectedDate !== null;
  const canContinueFromFood = food !== null;

  return {
    step,
    noClicks,
    selectedDate,
    hour,
    minute,
    food,
    yesScale,
    noScale,
    goTo,
    goNext,
    goBack,
    rejectNo,
    acceptYes,
    setSelectedDate,
    setHour,
    setMinute,
    setFood,
    canContinueFromDate,
    canContinueFromFood,
  };
}

export type InviteFlow = ReturnType<typeof useInviteFlow>;

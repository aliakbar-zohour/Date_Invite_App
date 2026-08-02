"use client";

import { AnimatePresence } from "framer-motion";
import { InviteShell } from "@/components/invite/InviteShell";
import { AskStep } from "@/components/invite/steps/AskStep";
import { CelebrateStep } from "@/components/invite/steps/CelebrateStep";
import { DateStep } from "@/components/invite/steps/DateStep";
import { FoodStep } from "@/components/invite/steps/FoodStep";
import { TimeStep } from "@/components/invite/steps/TimeStep";
import { StepIndicator } from "@/components/invite/ui/StepIndicator";
import { StepTransition } from "@/components/invite/ui/StepTransition";
import { useInviteFlow } from "@/hooks/useInviteFlow";

export default function DateInviteApp() {
  const flow = useInviteFlow();
  const celebrating = flow.step === "celebrate";

  return (
    <InviteShell celebrating={celebrating}>
      <StepIndicator currentStep={flow.step} />

      <div className="invite-body">
        <AnimatePresence mode="wait">
          {flow.step === "ask" ? (
            <StepTransition key="ask" stepKey="ask" variant="fadeUp">
              <AskStep
                yesScale={flow.yesScale}
                noScale={flow.noScale}
                onYes={flow.acceptYes}
                onNo={flow.rejectNo}
              />
            </StepTransition>
          ) : null}

          {flow.step === "date" ? (
            <StepTransition key="date" stepKey="date">
              <DateStep
                value={flow.selectedDate}
                onChange={flow.setSelectedDate}
                onNext={() => flow.goTo("time")}
              />
            </StepTransition>
          ) : null}

          {flow.step === "time" ? (
            <StepTransition key="time" stepKey="time">
              <TimeStep
                hour={flow.hour}
                minute={flow.minute}
                onHourChange={flow.setHour}
                onMinuteChange={flow.setMinute}
                onBack={() => flow.goTo("date")}
                onNext={() => flow.goTo("food")}
              />
            </StepTransition>
          ) : null}

          {flow.step === "food" ? (
            <StepTransition key="food" stepKey="food">
              <FoodStep
                value={flow.food}
                onChange={flow.setFood}
                onBack={() => flow.goTo("time")}
                onNext={() => flow.goTo("celebrate")}
              />
            </StepTransition>
          ) : null}

          {flow.step === "celebrate" && flow.selectedDate && flow.food ? (
            <StepTransition
              key="celebrate"
              stepKey="celebrate"
              variant="scale"
              celebrate
            >
              <CelebrateStep
                date={flow.selectedDate}
                hour={flow.hour}
                minute={flow.minute}
                food={flow.food}
              />
            </StepTransition>
          ) : null}
        </AnimatePresence>
      </div>
    </InviteShell>
  );
}

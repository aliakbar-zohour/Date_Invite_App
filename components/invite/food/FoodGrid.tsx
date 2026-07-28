"use client";

import { FoodOptionCard } from "@/components/invite/food/FoodOptionCard";
import { FOOD_OPTIONS } from "@/lib/invite/constants";
import type { FoodOption } from "@/lib/invite/types";

type FoodGridProps = {
  value: FoodOption | null;
  onChange: (option: FoodOption) => void;
};

export function FoodGrid({ value, onChange }: FoodGridProps) {
  return (
    <div className="food-grid" role="listbox" aria-label="انتخاب غذا">
      {FOOD_OPTIONS.map((option) => (
        <FoodOptionCard
          key={option.id}
          option={option}
          selected={value?.id === option.id}
          onSelect={onChange}
        />
      ))}
    </div>
  );
}

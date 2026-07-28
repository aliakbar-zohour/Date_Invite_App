"use client";

import { motion } from "framer-motion";
import type { FoodOption } from "@/lib/invite/types";

type FoodOptionCardProps = {
  option: FoodOption;
  selected: boolean;
  onSelect: (option: FoodOption) => void;
};

export function FoodOptionCard({
  option,
  selected,
  onSelect,
}: FoodOptionCardProps) {
  return (
    <motion.button
      type="button"
      className={`food-option ${selected ? "active" : ""}`}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(option)}
      aria-pressed={selected}
    >
      <span className="food-emoji">{option.emoji}</span>
      <span className="food-label">{option.label}</span>
    </motion.button>
  );
}

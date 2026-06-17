"use client";

import Button from "./Button";

interface GameControlsProps {
  selectedCount: number;
  maxSelections: number;
  remainingHealth: number;
  onSubmit: () => void;
  deSelet: () => void;
  isSubmitting: boolean;
  isGameActive: boolean;
}

export default function GameControls({
  selectedCount,
  maxSelections,
  remainingHealth,
  onSubmit,
  deSelet,
  isSubmitting,
  isGameActive,
}: GameControlsProps) {
  if (isGameActive) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center select-none w-full">
        <div className="flex gap-2">
          <div className="flex gap-2 text-primary">
            {[...Array(remainingHealth)].map((_, i) => (
              <span
                key={i}
                className="text-2xl text-shadow-lg"
              >
                ✦
              </span>
            ))}
            {[...Array(4 - remainingHealth)].map((_, i) => (
              <span key={i} className="text-2xl opacity-40">
                ✧
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-1 w-full">
          <Button 
            onClick={onSubmit}
            disabled={selectedCount !== maxSelections || isSubmitting}
            className={`flex-auto rounded-s-2xl rounded-e-md`}
          >
            {isSubmitting ? "بررسی..." : "ثبت حدس"}
          </Button>
          <Button
            onClick={deSelet}
            disabled={!selectedCount || isSubmitting}
            className={`flex-auto rounded-e-2xl rounded-s-md`}
          >
            از انتخاب دراوردن
          </Button>
        </div>
      </div>
    );
  }
}

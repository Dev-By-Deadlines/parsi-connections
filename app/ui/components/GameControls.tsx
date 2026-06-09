"use client";

import Loading from "./Loading";

interface GameControlsProps {
  selectedCount: number;
  maxSelections: number;
  remainingHealth: number;
  onSubmit: () => void;
  deSelet: () => void;
  isSubmitting: boolean;
}

export default function GameControls({
  selectedCount,
  maxSelections,
  remainingHealth,
  onSubmit,
  deSelet,
  isSubmitting,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center select-none w-full">
      <div className="flex gap-2">
        <div className="flex gap-2 text-primary">
          {[...Array(remainingHealth)].map((_, i) => (
            <span key={i} className="text-2xl">
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
      <div className="flex gap-1 w-full">
        <button
          onClick={onSubmit}
          disabled={selectedCount !== maxSelections || isSubmitting}
          className={`flex w-full items-center justify-center h-full px-6 py-2 rounded-s-2xl rounded-e-md transition-all
          ${selectedCount === maxSelections && !isSubmitting
              ? "font-bold bg-primary hover:bg-primary-hover text-onSurfaceDark cursor-pointer"
              : "bg-surface/20 text-onSurfaceDark"
          }`}
        >
          {isSubmitting ? <Loading text="درحال بررسی..." /> : "ثبت حدس"}
        </button>
        <button
          onClick={deSelet}
          disabled={!selectedCount || isSubmitting}
          className={`flex w-full items-center justify-center h-full px-6 py-2 rounded-e-2xl rounded-s-md transition-all
          ${selectedCount >= 1 && !isSubmitting
              ? "font-bold bg-primary hover:bg-primary-hover text-onSurfaceDark cursor-pointer"
              : "bg-surface/20 text-onSurfaceDark"
          }`}
        >
          از انتخاب دراوردن
        </button>
      </div>
    </div>
  );
}

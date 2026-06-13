"use client";

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
  const buttonBase = 'flex flex-auto w-full items-center justify-center py-2 transition-all text-sm md:text-md lg:text-lg';
  const buttonActiveState = 'font-bold bg-primary text-onSurfaceDark cursor-pointer hover:bg-primary-hover hover:shadow-lg hover:shadow-primary-hover/10'
  return (
    <div className="w-full">
      {isGameActive && (
      <div className="flex flex-col gap-3 justify-center items-center select-none w-full">
        <div className="flex gap-2">
          <div className="flex gap-2 text-primary">
            {[...Array(remainingHealth)].map((_, i) => (
              <span key={i} className="text-2xl text-shadow-lg text-shadow-primary/20">
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
          <button
            onClick={onSubmit}
            disabled={selectedCount !== maxSelections || isSubmitting}
            className={`${buttonBase} rounded-s-2xl rounded-e-md
            ${selectedCount === maxSelections && !isSubmitting
                ? buttonActiveState
                : "bg-primary/12 text-onSurfaceDark"
            }`}
          >
            {isSubmitting ? "بررسی...": "ثبت حدس"}
          </button>
          <button
            onClick={deSelet}
            disabled={!selectedCount || isSubmitting}
            className={`${buttonBase} rounded-e-2xl rounded-s-md
            ${selectedCount >= 1 && !isSubmitting
                ? buttonActiveState
                : "bg-primary/12 text-onSurfaceDark"
            }`}
          >
            از انتخاب دراوردن
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

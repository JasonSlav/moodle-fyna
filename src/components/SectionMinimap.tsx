"use client";

import type { SectionStep } from "@/sections/types";

type Props = {
  steps: SectionStep[];
  currentIndex: number;
  savedKeys: Record<string, boolean>;
};

export function SectionMinimap({ steps, currentIndex, savedKeys }: Props) {
  const activityIndexes = steps
    .map((step, index) => (step.kind === "activity" ? index : -1))
    .filter((index) => index !== -1);
  const currentActivityNumber =
    activityIndexes.indexOf(currentIndex) + 1;
  const currentIsActivity = currentActivityNumber > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex gap-1.5 overflow-x-auto pb-1"
        role="list"
        aria-label="Daftar langkah bagian"
      >
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isActivity = step.kind === "activity";
          const done =
            isActivity
              ? savedKeys[step.activityKey] === true
              : index < currentIndex;

          let className =
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition";
          if (isCurrent) {
            className += " bg-gold text-navy ring-2 ring-white";
          } else if (done) {
            className += " bg-navy text-white";
          } else {
            className += " border-2 border-sky-2 bg-white text-navy/60";
          }

          return (
            <span
              key={index}
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Langkah ${index + 1}${
                isActivity ? `, aktivitas ${activityIndexes.indexOf(index) + 1}` : ""
              }${done ? ", selesai" : ""}`}
              className={className}
            >
              {index + 1}
            </span>
          );
        })}
      </div>

      {currentIsActivity && (
        <p className="text-sm font-semibold text-navy">
          Aktivitas {currentActivityNumber} dari {activityIndexes.length}
        </p>
      )}
    </div>
  );
}
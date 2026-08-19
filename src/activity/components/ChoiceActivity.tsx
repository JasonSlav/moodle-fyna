"use client";

import type { ChoiceActivityConfig, ChoiceAnswer } from "@/activity/types";

type Props = {
  config: ChoiceActivityConfig;
  value: ChoiceAnswer | null;
  onChange: (answer: ChoiceAnswer) => void;
};

export function ChoiceActivity({ config, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {config.options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-sky-2 p-3 text-navy transition hover:border-gold"
        >
          <input
            type="radio"
            name={config.key}
            checked={value?.selectedId === option.id}
            onChange={() => onChange({ selectedId: option.id })}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

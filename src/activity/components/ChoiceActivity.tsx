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
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 p-3"
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

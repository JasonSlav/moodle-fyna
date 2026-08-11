"use client";

import type { MultipleChoiceActivityConfig, MultipleChoiceAnswer } from "@/activity/types";

type Props = {
  config: MultipleChoiceActivityConfig;
  value: MultipleChoiceAnswer | null;
  onChange: (answer: MultipleChoiceAnswer) => void;
};

export function MultipleChoiceActivity({ config, value, onChange }: Props) {
  const selected = value?.selectedIds ?? [];

  function toggle(optionId: string) {
    const next = selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId];
    onChange({ selectedIds: next });
  }

  return (
    <div className="flex flex-col gap-2">
      {config.options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 p-3"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.id)}
            onChange={() => toggle(option.id)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

"use client";

import type { TrueFalseActivityConfig, TrueFalseAnswer } from "@/activity/types";

type Props = {
  config: TrueFalseActivityConfig;
  value: TrueFalseAnswer | null;
  onChange: (answer: TrueFalseAnswer) => void;
};

export function TrueFalseActivity({ config, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
        {config.statement}
      </p>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 p-3">
        <input
          type="radio"
          name={config.key}
          checked={value?.value === true}
          onChange={() => onChange({ value: true })}
        />
        <span>Benar</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 p-3">
        <input
          type="radio"
          name={config.key}
          checked={value?.value === false}
          onChange={() => onChange({ value: false })}
        />
        <span>Salah</span>
      </label>
    </div>
  );
}

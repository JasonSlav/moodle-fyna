"use client";

import type { TrueFalseActivityConfig, TrueFalseAnswer } from "@/activity/types";

type Props = {
  config: TrueFalseActivityConfig;
  value: TrueFalseAnswer | null;
  onChange: (answer: TrueFalseAnswer) => void;
};

export function TrueFalseActivity({ config, value, onChange }: Props) {
  const positive = config.labels?.positive ?? "Benar";
  const negative = config.labels?.negative ?? "Salah";

  return (
    <div className="flex flex-col gap-2">
      <p className="rounded-2xl border border-sky-2 bg-sky-2 p-3 text-navy">
        {config.statement}
      </p>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-sky-2 p-3 text-navy transition hover:border-gold">
        <input
          type="radio"
          name={config.key}
          checked={value?.value === true}
          onChange={() => onChange({ value: true })}
        />
        <span>{positive}</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-sky-2 p-3 text-navy transition hover:border-gold">
        <input
          type="radio"
          name={config.key}
          checked={value?.value === false}
          onChange={() => onChange({ value: false })}
        />
        <span>{negative}</span>
      </label>
    </div>
  );
}

"use client";

import type { TextInputActivityConfig, TextInputAnswer } from "@/activity/types";

type Props = {
  config: TextInputActivityConfig;
  value: TextInputAnswer | null;
  onChange: (answer: TextInputAnswer) => void;
};

export function TextInputActivity({ value, onChange }: Props) {
  return (
    <textarea
      value={value?.text ?? ""}
      onChange={(e) => onChange({ text: e.target.value })}
      placeholder="Tulis jawabanmu di sini…"
      rows={4}
      className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:border-zinc-500"
    />
  );
}

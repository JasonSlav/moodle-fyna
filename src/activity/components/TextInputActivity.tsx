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
      className="w-full rounded-2xl border-2 border-sky-2 p-3 text-navy outline-none focus:border-gold"
    />
  );
}

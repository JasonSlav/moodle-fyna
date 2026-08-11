"use client";

import type { ReactNode } from "react";
import { MediaContent } from "@/components/MediaContent";
import type {
  ActivityAnswer,
  ActivityConfig,
  ChoiceAnswer,
  DragDropAnswer,
  MultipleChoiceAnswer,
  TextInputAnswer,
  TrueFalseAnswer,
} from "@/activity/types";
import { ChoiceActivity } from "./ChoiceActivity";
import { DragDropActivity } from "./DragDropActivity";
import { MultipleChoiceActivity } from "./MultipleChoiceActivity";
import { TextInputActivity } from "./TextInputActivity";
import { TrueFalseActivity } from "./TrueFalseActivity";
import { useActivityEngine } from "./useActivityEngine";

type Props = {
  config: ActivityConfig;
  initialAnswer?: ActivityAnswer | null;
  onSaved?: () => void;
};

export function ActivityRenderer({ config, initialAnswer, onSaved }: Props) {
  const engine = useActivityEngine(config, { initialAnswer, onSaved });

  let input: ReactNode = null;
  switch (config.type) {
    case "choice":
      input = (
        <ChoiceActivity
          config={config}
          value={engine.answer as ChoiceAnswer | null}
          onChange={engine.setAnswer}
        />
      );
      break;
    case "multiple_choice":
      input = (
        <MultipleChoiceActivity
          config={config}
          value={engine.answer as MultipleChoiceAnswer | null}
          onChange={engine.setAnswer}
        />
      );
      break;
    case "true_false":
      input = (
        <TrueFalseActivity
          config={config}
          value={engine.answer as TrueFalseAnswer | null}
          onChange={engine.setAnswer}
        />
      );
      break;
    case "text_input":
      input = (
        <TextInputActivity
          config={config}
          value={engine.answer as TextInputAnswer | null}
          onChange={engine.setAnswer}
        />
      );
      break;
    case "drag_drop":
      input = (
        <DragDropActivity
          config={config}
          value={engine.answer as DragDropAnswer | null}
          onChange={engine.setAnswer}
        />
      );
      break;
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-900">{config.title}</h2>
      {config.prompt && (
        <p className="text-sm text-zinc-600">{config.prompt}</p>
      )}

      <MediaContent media={config.media} />

      {input}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={engine.checkAndSave}
          disabled={!engine.canCheck || engine.saveState === "saving"}
          className="self-start rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Periksa Jawaban
        </button>

        {engine.error && (
          <p className="text-sm text-red-600">{engine.error}</p>
        )}

        {engine.result && (
          <p
            className={
              engine.result.checkable && engine.result.correct
                ? "text-sm font-medium text-emerald-700"
                : engine.result.checkable
                  ? "text-sm font-medium text-amber-700"
                  : "text-sm text-zinc-600"
            }
          >
            {engine.result.feedback}
          </p>
        )}

        {engine.saveState === "saving" && (
          <p className="text-sm text-zinc-500">Menyimpan jawaban…</p>
        )}
        {engine.saveState === "saved" && (
          <p className="text-sm text-emerald-600">Jawaban tersimpan.</p>
        )}
        {engine.saveState === "error" && (
          <p className="text-sm text-red-600">Gagal menyimpan jawaban.</p>
        )}
        {engine.saveState === "no-identity" && (
          <p className="text-sm text-amber-700">
            Identitas belum tersimpan. Buka halaman utama untuk mengisi nama.
          </p>
        )}
      </div>
    </div>
  );
}

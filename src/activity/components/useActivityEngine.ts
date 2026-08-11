"use client";

import { useCallback, useMemo, useState } from "react";
import { evaluateActivity, parseAnswer } from "@/activity/evaluate";
import type { ActivityAnswer, ActivityConfig, CheckResult } from "@/activity/types";
import { clearLocalStudentId, getLocalStudentId } from "@/lib/student-identity";

export type SaveState = "idle" | "saving" | "saved" | "error" | "no-identity";

type Options = {
  initialAnswer?: ActivityAnswer | null;
  onSaved?: () => void;
};

export function useActivityEngine(config: ActivityConfig, options?: Options) {
  const [answer, setAnswer] = useState<ActivityAnswer | null>(
    options?.initialAnswer ?? null,
  );
  const [result, setResult] = useState<CheckResult | null>(null);
  const [saveState, setSaveState] = useState<SaveState>(
    options?.initialAnswer ? "saved" : "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const canCheck = useMemo(() => {
    if (!answer) return false;
    return parseAnswer(config, answer).ok;
  }, [answer, config]);

  const checkAndSave = useCallback(() => {
    if (!answer) return;

    const parsed = parseAnswer(config, answer);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    setError(null);
    setResult(evaluateActivity(config, parsed.answer));

    const studentId = getLocalStudentId();
    if (!studentId) {
      setSaveState("no-identity");
      return;
    }

    setSaveState("saving");
    fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        sectionNumber: config.sectionNumber,
        activityKey: config.key,
        answer: parsed.answer,
      }),
    })
      .then(async (res) => {
        if (res.status === 404) {
          const body = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          if (body?.error === "Siswa tidak ditemukan.") {
            clearLocalStudentId();
            setSaveState("no-identity");
            return;
          }
        }
        if (!res.ok) throw new Error("Gagal menyimpan jawaban.");
        setSaveState("saved");
        options?.onSaved?.();
      })
      .catch(() => setSaveState("error"));
  }, [answer, config, options]);

  return { answer, setAnswer, result, saveState, error, canCheck, checkAndSave };
}

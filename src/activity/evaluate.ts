import type {
  ActivityAnswer,
  ActivityConfig,
  CheckResult,
  ChoiceAnswer,
  DragDropAnswer,
  MultipleChoiceAnswer,
  TextInputAnswer,
  TrueFalseAnswer,
} from "./types";

export type ParseResult =
  | { ok: true; answer: ActivityAnswer }
  | { ok: false; error: string };

const DEFAULT_CORRECT_FEEDBACK = "Benar!";
const DEFAULT_INCORRECT_FEEDBACK = "Kurang tepat, coba lagi.";
const DEFAULT_SAVED_FEEDBACK = "Jawabanmu telah disimpan.";

export function parseAnswer(config: ActivityConfig, raw: unknown): ParseResult {
  if (raw === null || typeof raw !== "object") {
    return { ok: false, error: "Jawaban tidak valid." };
  }
  const payload = raw as Record<string, unknown>;

  switch (config.type) {
    case "choice": {
      const { selectedId } = payload;
      if (typeof selectedId !== "string") {
        return { ok: false, error: "Jawaban tidak valid." };
      }
      if (!config.options.some((option) => option.id === selectedId)) {
        return { ok: false, error: "Pilihan tidak dikenal." };
      }
      return { ok: true, answer: { selectedId } };
    }

    case "multiple_choice": {
      const { selectedIds } = payload;
      if (
        !Array.isArray(selectedIds) ||
        selectedIds.some((id) => typeof id !== "string")
      ) {
        return { ok: false, error: "Jawaban tidak valid." };
      }
      const ids = selectedIds as string[];
      if (new Set(ids).size !== ids.length) {
        return { ok: false, error: "Pilihan tidak boleh berulang." };
      }
      if (!ids.every((id) => config.options.some((option) => option.id === id))) {
        return { ok: false, error: "Pilihan tidak dikenal." };
      }
      return { ok: true, answer: { selectedIds: ids } };
    }

    case "true_false": {
      if (typeof payload.value !== "boolean") {
        return { ok: false, error: "Jawaban tidak valid." };
      }
      return { ok: true, answer: { value: payload.value } };
    }

    case "text_input": {
      if (typeof payload.text !== "string") {
        return { ok: false, error: "Jawaban tidak valid." };
      }
      const text = payload.text.trim();
      if (text.length === 0) {
        return { ok: false, error: "Jawaban tidak boleh kosong." };
      }
      if (text.length > 2000) {
        return { ok: false, error: "Jawaban terlalu panjang." };
      }
      return { ok: true, answer: { text } };
    }

    case "drag_drop": {
      const { placements } = payload;
      if (!Array.isArray(placements)) {
        return { ok: false, error: "Jawaban tidak valid." };
      }
      const normalized: { itemId: string; targetId: string }[] = [];
      for (const placement of placements) {
        if (placement === null || typeof placement !== "object") {
          return { ok: false, error: "Jawaban tidak valid." };
        }
        const { itemId, targetId } = placement as Record<string, unknown>;
        if (typeof itemId !== "string" || typeof targetId !== "string") {
          return { ok: false, error: "Jawaban tidak valid." };
        }
        normalized.push({ itemId, targetId });
      }

      const itemIds = config.items.map((item) => item.id);
      const targetIds = config.targets.map((target) => target.id);
      const placedItemIds = normalized.map((placement) => placement.itemId);

      if (new Set(placedItemIds).size !== placedItemIds.length) {
        return {
          ok: false,
          error: "Setiap item hanya boleh ditempatkan satu kali.",
        };
      }
      if (placedItemIds.length !== itemIds.length) {
        return { ok: false, error: "Semua item harus ditempatkan." };
      }
      if (!placedItemIds.every((id) => itemIds.includes(id))) {
        return { ok: false, error: "Item tidak dikenal." };
      }
      if (!normalized.every((placement) => targetIds.includes(placement.targetId))) {
        return { ok: false, error: "Target tidak dikenal." };
      }
      return { ok: true, answer: { placements: normalized } };
    }

    default:
      return { ok: false, error: "Tipe aktivitas tidak dikenal." };
  }
}

function feedbackFor(config: ActivityConfig, correct: boolean): string {
  if (correct) {
    return config.feedback?.correct ?? DEFAULT_CORRECT_FEEDBACK;
  }
  return config.feedback?.incorrect ?? DEFAULT_INCORRECT_FEEDBACK;
}

export function evaluateActivity(
  config: ActivityConfig,
  answer: ActivityAnswer,
): CheckResult {
  switch (config.type) {
    case "choice": {
      if (!config.correctId) {
        return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
      }
      const correct =
        (answer as ChoiceAnswer).selectedId === config.correctId;
      return { checkable: true, correct, feedback: feedbackFor(config, correct) };
    }

    case "multiple_choice": {
      if (!config.correctIds || config.correctIds.length === 0) {
        return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
      }
      const correct = sameSet(
        (answer as MultipleChoiceAnswer).selectedIds,
        config.correctIds,
      );
      return { checkable: true, correct, feedback: feedbackFor(config, correct) };
    }

    case "true_false": {
      if (config.correctValue === undefined) {
        return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
      }
      const correct = (answer as TrueFalseAnswer).value === config.correctValue;
      return { checkable: true, correct, feedback: feedbackFor(config, correct) };
    }

    case "text_input": {
      if (!config.expectedAnswers || config.expectedAnswers.length === 0) {
        return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
      }
      const normalized = (answer as TextInputAnswer).text.trim().toLowerCase();
      const correct = config.expectedAnswers.some(
        (expected) => expected.trim().toLowerCase() === normalized,
      );
      return { checkable: true, correct, feedback: feedbackFor(config, correct) };
    }

    case "drag_drop": {
      if (!config.correctPlacements || config.correctPlacements.length === 0) {
        return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
      }
      const correct = samePlacements(
        (answer as DragDropAnswer).placements,
        config.correctPlacements,
      );
      return { checkable: true, correct, feedback: feedbackFor(config, correct) };
    }

    default:
      return { checkable: false, feedback: DEFAULT_SAVED_FEEDBACK };
  }
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
}

function samePlacements(
  a: { itemId: string; targetId: string }[],
  b: { itemId: string; targetId: string }[],
): boolean {
  if (a.length !== b.length) return false;
  const mapA = new Map(a.map((placement) => [placement.itemId, placement.targetId]));
  return b.every((placement) => mapA.get(placement.itemId) === placement.targetId);
}

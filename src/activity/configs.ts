import type { ActivityConfig, TextInputActivityConfig } from "./types";

export const DEMO_ACTIVITY_CONFIGS: ActivityConfig[] = [
  {
    key: "demo-choice",
    sectionNumber: 1,
    type: "choice",
    title: "Contoh: Pilihan Ganda",
    prompt: "Pilih satu jawaban yang benar.",
    options: [
      { id: "a", label: "Pilihan A" },
      { id: "b", label: "Pilihan B" },
      { id: "c", label: "Pilihan C" },
    ],
    correctId: "b",
    feedback: {
      correct: "Benar! Pilihan B adalah jawaban yang tepat.",
      incorrect: "Kurang tepat. Pilihan B adalah jawaban yang benar.",
    },
  },
  {
    key: "demo-multiple-choice",
    sectionNumber: 1,
    type: "multiple_choice",
    title: "Contoh: Pilihan Ganda (Beberapa Jawaban)",
    prompt: "Pilih semua jawaban yang benar.",
    options: [
      { id: "a", label: "Pernyataan A" },
      { id: "b", label: "Pernyataan B" },
      { id: "c", label: "Pernyataan C" },
      { id: "d", label: "Pernyataan D" },
    ],
    correctIds: ["a", "c"],
    feedback: {
      correct: "Benar! Kamu memilih semua pernyataan yang tepat.",
      incorrect: "Belum tepat. Periksa kembali pilihanmu.",
    },
  },
  {
    key: "demo-true-false",
    sectionNumber: 1,
    type: "true_false",
    title: "Contoh: Benar atau Salah",
    prompt: "Tentukan apakah pernyataan berikut benar atau salah.",
    statement: "Pernyataan contoh yang dinilai benar.",
    correctValue: true,
    feedback: {
      correct: "Benar!",
      incorrect: "Salah. Pernyataan tersebut bernilai benar.",
    },
  },
  {
    key: "demo-text-input",
    sectionNumber: 1,
    type: "text_input",
    title: "Contoh: Isian Teks",
    prompt: "Tuliskan kata kunci yang diminta.",
    expectedAnswers: ["bumi"],
    feedback: {
      correct: "Benar!",
      incorrect: "Belum tepat, coba jawaban lain.",
    },
  },
  {
    key: "demo-drag-drop",
    sectionNumber: 1,
    type: "drag_drop",
    title: "Contoh: Drag & Drop",
    prompt: "Tempatkan setiap item ke kelompok yang sesuai.",
    targets: [
      { id: "siang", label: "Siang hari" },
      { id: "malam", label: "Malam hari" },
    ],
    items: [
      { id: "matahari", label: "Matahari terlihat" },
      { id: "bulan", label: "Bulan terlihat" },
    ],
    correctPlacements: [
      { itemId: "matahari", targetId: "siang" },
      { itemId: "bulan", targetId: "malam" },
    ],
    feedback: {
      correct: "Benar! Semua item ditempatkan dengan tepat.",
      incorrect: "Belum tepat. Periksa kembali penempatan item.",
    },
  },
];

function buildPlaceholderActivity(
  sectionNumber: number,
): TextInputActivityConfig {
  return {
    key: `${sectionNumber}-aktivitas`,
    sectionNumber,
    type: "text_input",
    title: "Aktivitas",
    prompt: "[Aktivitas pembelajaran akan ditambahkan di sini.]",
  };
}

export const PLACEHOLDER_ACTIVITY_CONFIGS: ActivityConfig[] = [1, 2, 3, 4].map(
  buildPlaceholderActivity,
);

export function getActivityConfig(
  sectionNumber: number,
  key: string,
): ActivityConfig | null {
  return (
    [...DEMO_ACTIVITY_CONFIGS, ...PLACEHOLDER_ACTIVITY_CONFIGS].find(
      (config) =>
        config.sectionNumber === sectionNumber && config.key === key,
    ) ?? null
  );
}

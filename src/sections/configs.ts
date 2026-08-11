import type { SectionConfig, SectionStep } from "./types";

const SECTION_TITLES: Record<number, string> = {
  1: "Menelusuri Efek Rumah Kaca dan Pemanasan Global",
  2: "Gas Rumah Kaca, Penyebab, dan Bukti Pemanasan Global",
  3: "Dampak Pemanasan Global bagi Lingkungan dan Manusia",
  4: "Mitigasi, Adaptasi, dan Solusi Pemanasan Global",
};

function buildSectionTemplate(
  number: number,
  options: { hasDiscussion?: boolean } = {},
): SectionConfig {
  const steps: SectionStep[] = [
    {
      kind: "introduction",
      title: SECTION_TITLES[number],
      text: "[Deskripsi singkat bagian akan ditambahkan di sini.]",
    },
    {
      kind: "content",
      title: "Apa yang Akan Kamu Pelajari?",
      text:
        "[Tujuan pembelajaran akan ditambahkan di sini.]\n\n" +
        "Aktivitas yang akan dilakukan:\n" +
        "- [Aktivitas 1]\n" +
        "- [Aktivitas 2]\n" +
        "- [Aktivitas 3]",
    },
    {
      kind: "content",
      title: "Materi",
      text: "[Materi pembelajaran akan ditambahkan di sini.]",
      media: [
        { type: "image", caption: "[Gambar]" },
        { type: "image", caption: "[Grafik]" },
        { type: "video", caption: "[Video/Animasi]" },
        { type: "embed", caption: "[Simulasi/Embed]" },
      ],
    },
    { kind: "activity", activityKey: `${number}-aktivitas` },
  ];

  if (options.hasDiscussion) {
    steps.push({
      kind: "content",
      title: "Diskusi Kelompok",
      text: "[Hasil diskusi kelompok akan dibagikan melalui Forum Moodle.]",
    });
  }

  steps.push({ kind: "completion" });

  return { number, title: SECTION_TITLES[number], steps };
}

export const SECTION_CONFIGS: SectionConfig[] = [
  buildSectionTemplate(1),
  buildSectionTemplate(2),
  buildSectionTemplate(3, { hasDiscussion: true }),
  buildSectionTemplate(4),
];

export function getSectionConfig(number: number): SectionConfig | null {
  return SECTION_CONFIGS.find((config) => config.number === number) ?? null;
}

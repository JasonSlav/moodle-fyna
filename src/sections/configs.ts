import type { SectionConfig, SectionStep } from "./types";

const SECTION_TITLES: Record<number, string> = {
  1: "Menelusuri Efek Rumah Kaca dan Pemanasan Global",
  2: "Gas Rumah Kaca, Penyebab, dan Bukti Pemanasan Global",
  3: "Dampak Pemanasan Global bagi Lingkungan dan Manusia",
  4: "Mitigasi, Adaptasi, dan Solusi Pemanasan Global",
};

const SECTION_1_STEPS: SectionStep[] = [
  {
    kind: "introduction",
    title: SECTION_TITLES[1],
    text: "Bagian ini membantu kamu memahami hubungan antara efek rumah kaca dan pemanasan global melalui pengamatan grafik, gambar, video, dan aktivitas interaktif.",
  },
  {
    kind: "content",
    title: "Apa yang Akan Kamu Pelajari?",
    text:
      "Pada bagian ini kamu akan:\n" +
      "- Mengamati perubahan suhu Bumi\n" +
      "- Menelusuri pergerakan energi antara Matahari, Bumi, dan atmosfer\n" +
      "- Mengamati peran gas rumah kaca\n" +
      "- Membandingkan dua kondisi atmosfer\n" +
      "- Menyusun penjelasan berdasarkan fakta",
  },
  {
    kind: "content",
    title: "Fakta 1: Suhu Bumi",
    text: "Amati grafik dan ketiga gambar berikut.",
    media: [
      {
        type: "image",
        src: "/media/section1/grafik-suhu.webp",
        caption: "Perubahan Suhu Rata-Rata Permukaan Bumi Tahun 1880–2025",
        source: "NASA Goddard Institute for Space Studies (GISS), 2026",
      },
      {
        type: "image",
        src: "/media/section1/gelombang-panas.webp",
        caption: "Gambar gelombang panas",
        source: "bmkg.go.id",
      },
      {
        type: "image",
        src: "/media/section1/kekeringan.webp",
        caption: "Gambar kekeringan",
        source: "cnnindonesia.com",
      },
      {
        type: "image",
        src: "/media/section1/es-mencair.webp",
        caption: "Gambar es mencair",
        source: "harian.disway.id",
      },
    ],
  },
  { kind: "activity", activityKey: "s1-fakta1-fakta" },
  { kind: "activity", activityKey: "s1-fakta2-urutan" },
  {
    kind: "content",
    title: "Fakta 3: Peran Gas Rumah Kaca",
    text:
      "Perhatikan video/animasi berikut tentang bagaimana gas rumah kaca berinteraksi dengan radiasi inframerah.",
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/jyTUczZaSXg",
        caption: "Video: Peran Gas Rumah Kaca",
      },
    ],
  },
  { kind: "activity", activityKey: "s1-fakta3-pilih" },
  {
    kind: "content",
    title: "Membandingkan Dua Kondisi Atmosfer",
    text: "Perhatikan gambar perbandingan di bawah ini.",
    media: [
      {
        type: "image",
        src: "/media/section1/perbandingan-atmosfer.webp",
      },
    ],
  },
  { kind: "activity", activityKey: "s1-banding-kondisi" },
  { kind: "activity", activityKey: "s1-banding-alasan" },
  {
    kind: "content",
    title: "Bangun Penjelasanmu",
    text:
      "Kamu sudah mempelajari:\n" +
      "- Energi dari Matahari\n" +
      "- Permukaan Bumi menjadi hangat\n" +
      "- Radiasi inframerah dari Bumi\n" +
      "- Interaksi gas rumah kaca dengan radiasi inframerah\n" +
      "- Suhu Bumi meningkat\n\n" +
      "Susun diagram sederhana, lalu tuliskan penjelasan singkat 2–3 kalimat.\n(Simpan hasil dalam bentuk tangkapan layar/gambar atau PDF untuk dikumpulkan di Moodle.)",
  },
  { kind: "activity", activityKey: "s1-diagram" },
  { kind: "activity", activityKey: "s1-penjelasan" },
  {
    kind: "content",
    title: "Uji Miskonsepsi",
    text:
      "Penipisan lapisan ozon — berkaitan dengan radiasi ultraviolet\nEfek rumah kaca — berkaitan dengan radiasi inframerah dan gas rumah kaca",
  },
  { kind: "activity", activityKey: "s1-miskonsepsi" },
  { kind: "completion" },
];

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
  { number: 1, title: SECTION_TITLES[1], steps: SECTION_1_STEPS },
  buildSectionTemplate(2),
  buildSectionTemplate(3, { hasDiscussion: true }),
  buildSectionTemplate(4),
];

export function getSectionConfig(number: number): SectionConfig | null {
  return SECTION_CONFIGS.find((config) => config.number === number) ?? null;
}

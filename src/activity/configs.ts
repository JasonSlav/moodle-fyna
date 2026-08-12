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

export const SECTION_1_ACTIVITY_CONFIGS: ActivityConfig[] = [
  {
    key: "s1-fakta1-fakta",
    sectionNumber: 1,
    type: "multiple_choice",
    title: "Fakta 1: Suhu Bumi",
    prompt:
      "Amati grafik dan ketiga gambar. Berdasarkan seluruh informasi yang sudah diamati, pilih dua fakta yang sesuai.",
    options: [
      {
        id: "a",
        label: "Grafik menunjukkan suhu Bumi cenderung meningkat dari waktu ke waktu.",
      },
      {
        id: "b",
        label: "Pada gambar, terlihat lingkungan menjadi lebih kering dan es semakin berkurang.",
      },
      {
        id: "c",
        label: "Suhu Bumi selalu naik setiap tahun tanpa pernah turun.",
      },
      {
        id: "d",
        label: "Semua wilayah di Bumi mengalami kondisi yang sama.",
      },
    ],
    correctIds: ["a", "b"],
    feedback: {
      correct:
        "Tepat! Kamu berhasil menemukan dua fakta berdasarkan grafik dan gambar.",
      incorrect:
        "Coba amati kembali grafik dan gambar dengan lebih teliti. Perhatikan perubahan suhu pada grafik serta kondisi lingkungan yang terlihat pada gambar.",
    },
  },
  {
    key: "s1-fakta2-urutan",
    sectionNumber: 1,
    type: "drag_drop",
    title: "Fakta 2: Bagaimana Energi Bergerak?",
    prompt:
      "Radiasi Matahari merupakan sumber utama energi yang masuk ke dalam sistem iklim Bumi. Tidak semua energi Matahari yang mencapai Bumi diserap oleh permukaan. Sebagian dipantulkan kembali, sedangkan sebagian lainnya diserap oleh atmosfer dan permukaan Bumi (Wild & Bosilovich, 2024; Loeb et al., 2024).\n\nSusun kartu proses berikut sesuai urutan yang benar.",
    targets: [
      { id: "pos1", label: "Urutan 1" },
      { id: "pos2", label: "Urutan 2" },
      { id: "pos3", label: "Urutan 3" },
      { id: "pos4", label: "Urutan 4" },
    ],
    items: [
      {
        id: "p1",
        label: "Energi Matahari menuju Bumi",
        image: "/media/section1/kartu-1.webp",
      },
      {
        id: "p2",
        label: "Sebagian energi diserap permukaan Bumi",
        image: "/media/section1/kartu-2.webp",
      },
      {
        id: "p3",
        label: "Permukaan Bumi menjadi hangat",
        image: "/media/section1/kartu-3.webp",
      },
      {
        id: "p4",
        label: "Bumi memancarkan kembali energi panas sebagai radiasi inframerah",
        image: "/media/section1/kartu-4.webp",
      },
    ],
    correctPlacements: [
      { itemId: "p1", targetId: "pos1" },
      { itemId: "p2", targetId: "pos2" },
      { itemId: "p3", targetId: "pos3" },
      { itemId: "p4", targetId: "pos4" },
    ],
    feedback: {
      correct:
        "Tepat! Urutanmu benar: energi Matahari → diserap permukaan → permukaan hangat → dipancarkan kembali sebagai radiasi inframerah.",
      incorrect:
        "Belum tepat. Telusuri kembali alurnya dari energi Matahari hingga Bumi memancarkan kembali panas.",
    },
  },
  {
    key: "s1-fakta3-pilih",
    sectionNumber: 1,
    type: "choice",
    title: "Fakta 3: Peran Gas Rumah Kaca",
    prompt: "Setelah mengamati video/animasi, pilih pernyataan yang paling sesuai.",
    options: [
      {
        id: "a",
        label: "Gas rumah kaca menyerap seluruh radiasi inframerah sehingga tidak ada panas yang keluar.",
      },
      {
        id: "b",
        label: "Gas rumah kaca menyerap sebagian radiasi inframerah dari Bumi, lalu memancarkannya kembali ke berbagai arah sehingga sebagian panas tetap berada di sekitar Bumi.",
      },
      {
        id: "c",
        label: "Gas rumah kaca memantulkan kembali seluruh cahaya Matahari sebelum mencapai permukaan Bumi.",
      },
      {
        id: "d",
        label: "Gas rumah kaca hanya menyerap radiasi ultraviolet dari Matahari.",
      },
    ],
    correctId: "b",
    feedback: {
      correct:
        "Tepat! Gas rumah kaca menyerap sebagian radiasi inframerah dan memancarkannya kembali ke berbagai arah.",
      incorrect:
        "Belum tepat. Perhatikan kembali video tentang penyerapan dan pemancaran kembali radiasi inframerah.",
    },
  },
  {
    key: "s1-banding-kondisi",
    sectionNumber: 1,
    type: "choice",
    title: "Membandingkan Dua Kondisi Atmosfer",
    prompt: "Pilih kondisi yang menyebabkan lebih banyak panas kembali ke permukaan Bumi.",
    options: [
      { id: "a", label: "Kondisi A — gas rumah kaca lebih sedikit" },
      { id: "b", label: "Kondisi B — gas rumah kaca lebih banyak" },
    ],
    correctId: "b",
    feedback: {
      correct:
        "Tepat! Semakin banyak gas rumah kaca, semakin banyak radiasi inframerah yang diserap dan dipancarkan kembali ke permukaan Bumi.",
      incorrect: "Belum tepat. Bandingkan kembali banyaknya gas rumah kaca pada kedua kondisi.",
    },
  },
  {
    key: "s1-banding-alasan",
    sectionNumber: 1,
    type: "choice",
    title: "Membandingkan — Alasan",
    prompt: "Pilih alasan yang paling sesuai dengan pilihan kondisimu.",
    options: [
      {
        id: "a",
        label: "Pada Kondisi B, gas rumah kaca lebih banyak sehingga lebih banyak radiasi inframerah diserap dan dipancarkan kembali ke permukaan Bumi.",
      },
      {
        id: "b",
        label: "Pada Kondisi B, cahaya Matahari yang masuk lebih besar sehingga Bumi menjadi lebih panas.",
      },
      {
        id: "c",
        label: "Pada Kondisi A, gas rumah kaca lebih sedikit sehingga panas yang masuk lebih banyak.",
      },
      {
        id: "d",
        label: "Kedua kondisi tidak memengaruhi panas yang kembali ke permukaan Bumi.",
      },
    ],
    correctId: "a",
    feedback: {
      correct: "Tepat! Alasanmu menunjukkan pemahaman yang benar tentang peran gas rumah kaca.",
      incorrect: "Belum tepat. Perhatikan hubungan banyaknya gas rumah kaca dengan radiasi inframerah yang dipancarkan kembali.",
    },
  },
  {
    key: "s1-diagram",
    sectionNumber: 1,
    type: "drag_drop",
    title: "Bangun Penjelasanmu — Diagram",
    prompt: "Susun langkah-langkah berikut menjadi diagram sederhana dengan urutan yang benar.",
    targets: [
      { id: "pos1", label: "Urutan 1" },
      { id: "pos2", label: "Urutan 2" },
      { id: "pos3", label: "Urutan 3" },
      { id: "pos4", label: "Urutan 4" },
      { id: "pos5", label: "Urutan 5" },
      { id: "pos6", label: "Urutan 6" },
    ],
    items: [
      { id: "d1", label: "Energi Matahari masuk ke Bumi" },
      { id: "d2", label: "Permukaan Bumi menyerap energi dan menjadi hangat" },
      {
        id: "d3",
        label: "Bumi melepaskan energi panas sebagai radiasi inframerah",
      },
      {
        id: "d4",
        label: "Gas rumah kaca menyerap dan memancarkan kembali sebagian panas",
      },
      { id: "d5", label: "Lebih banyak panas berada di sekitar Bumi" },
      { id: "d6", label: "Suhu Bumi meningkat" },
    ],
    correctPlacements: [
      { itemId: "d1", targetId: "pos1" },
      { itemId: "d2", targetId: "pos2" },
      { itemId: "d3", targetId: "pos3" },
      { itemId: "d4", targetId: "pos4" },
      { itemId: "d5", targetId: "pos5" },
      { itemId: "d6", targetId: "pos6" },
    ],
    feedback: {
      correct: "Tepat! Diagrammu sudah tersusun dengan benar.",
      incorrect: "Belum tepat. Periksa kembali urutan langkahnya.",
    },
  },
  {
    key: "s1-penjelasan",
    sectionNumber: 1,
    type: "text_input",
    title: "Bangun Penjelasanmu — Penjelasan",
    prompt:
      "Tuliskan penjelasan singkatmu dalam 2–3 kalimat berdasarkan diagram yang sudah kamu susun.",
  },
  {
    key: "s1-miskonsepsi",
    sectionNumber: 1,
    type: "true_false",
    title: "Uji Miskonsepsi",
    prompt: "Jawablah pertanyaan berikut.",
    statement: "Apakah kenaikan suhu Bumi terutama disebabkan oleh menipisnya lapisan ozon?",
    labels: { positive: "Ya", negative: "Tidak" },
    correctValue: false,
    feedback: {
      correct:
        "Benar! Kenaikan suhu Bumi terutama berkaitan dengan meningkatnya gas rumah kaca, bukan menipisnya lapisan ozon.",
      incorrect:
        "Kenaikan suhu Bumi terutama berkaitan dengan meningkatnya gas rumah kaca. Penipisan lapisan ozon berkaitan dengan meningkatnya radiasi ultraviolet yang mencapai permukaan Bumi.",
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
    [
      ...DEMO_ACTIVITY_CONFIGS,
      ...SECTION_1_ACTIVITY_CONFIGS,
      ...PLACEHOLDER_ACTIVITY_CONFIGS,
    ].find(
      (config) =>
        config.sectionNumber === sectionNumber && config.key === key,
    ) ?? null
  );
}

import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/answers/route";
import { DEMO_ACTIVITY_CONFIGS, getActivityConfig } from "@/activity/configs";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { evaluateActivity, parseAnswer } from "@/activity/evaluate";
import { prisma } from "@/lib/prisma";
import { createStudent } from "@/lib/students";
import type {
  ActivityConfig,
  CheckResult,
  ChoiceActivityConfig,
  DragDropActivityConfig,
  MultipleChoiceActivityConfig,
  TextInputActivityConfig,
  TrueFalseActivityConfig,
} from "@/activity/types";

function correctOf(result: CheckResult): boolean | null {
  if (!result.checkable) return null;
  return result.correct;
}

function configOfType(type: ActivityConfig["type"]): ActivityConfig {
  const config = DEMO_ACTIVITY_CONFIGS.find((c) => c.type === type);
  if (!config) throw new Error(`no demo config for ${type}`);
  return config;
}

describe("registry aktivitas", () => {
  it("memiliki satu config demo untuk setiap tipe yang didukung", () => {
    expect(DEMO_ACTIVITY_CONFIGS).toHaveLength(5);
    const types = DEMO_ACTIVITY_CONFIGS.map((config) => config.type);
    expect(types).toEqual(
      expect.arrayContaining([
        "choice",
        "multiple_choice",
        "true_false",
        "text_input",
        "drag_drop",
      ]),
    );
  });

  it("setiap config memiliki key dan sectionNumber", () => {
    for (const config of DEMO_ACTIVITY_CONFIGS) {
      expect(config.key.length).toBeGreaterThan(0);
      expect(config.sectionNumber).toBe(1);
    }
  });

  it("getActivityConfig menemukan config berdasarkan section + key", () => {
    expect(getActivityConfig(1, "demo-choice")?.type).toBe("choice");
    expect(getActivityConfig(1, "demo-text-input")?.type).toBe("text_input");
  });

  it("getActivityConfig mengembalikan null untuk key yang tidak dikenal", () => {
    expect(getActivityConfig(1, "nope")).toBeNull();
    expect(getActivityConfig(2, "demo-choice")).toBeNull();
  });
});

describe("parseAnswer (validasi payload)", () => {
  it("choice: menerima pilihan valid, menolak pilihan tidak dikenal", () => {
    const config = configOfType("choice");
    expect(parseAnswer(config, { selectedId: "b" }).ok).toBe(true);
    expect(parseAnswer(config, { selectedId: "z" }).ok).toBe(false);
    expect(parseAnswer(config, {}).ok).toBe(false);
    expect(parseAnswer(config, null).ok).toBe(false);
  });

  it("multiple_choice: menolak duplikat dan id tidak dikenal", () => {
    const config = configOfType("multiple_choice");
    expect(parseAnswer(config, { selectedIds: ["a", "c"] }).ok).toBe(true);
    expect(parseAnswer(config, { selectedIds: ["a", "a"] }).ok).toBe(false);
    expect(parseAnswer(config, { selectedIds: ["a", "z"] }).ok).toBe(false);
  });

  it("true_false: hanya menerima boolean", () => {
    const config = configOfType("true_false");
    expect(parseAnswer(config, { value: true }).ok).toBe(true);
    expect(parseAnswer(config, { value: false }).ok).toBe(true);
    expect(parseAnswer(config, { value: "yes" }).ok).toBe(false);
  });

  it("text_input: menolak kosong dan terlalu panjang", () => {
    const config = configOfType("text_input");
    expect(parseAnswer(config, { text: "  bumi  " }).ok).toBe(true);
    expect(parseAnswer(config, { text: "" }).ok).toBe(false);
    expect(parseAnswer(config, { text: "   " }).ok).toBe(false);
    expect(parseAnswer(config, { text: "x".repeat(2001) }).ok).toBe(false);
  });

  it("drag_drop: menolak item hilang, duplikat, atau id tidak dikenal", () => {
    const config = configOfType("drag_drop");
    expect(
      parseAnswer(config, {
        placements: [
          { itemId: "matahari", targetId: "siang" },
          { itemId: "bulan", targetId: "malam" },
        ],
      }).ok,
    ).toBe(true);
    expect(parseAnswer(config, { placements: [] }).ok).toBe(false);
    expect(
      parseAnswer(config, {
        placements: [
          { itemId: "matahari", targetId: "siang" },
          { itemId: "matahari", targetId: "malam" },
        ],
      }).ok,
    ).toBe(false);
    expect(
      parseAnswer(config, {
        placements: [
          { itemId: "matahari", targetId: "siang" },
          { itemId: "planet", targetId: "malam" },
        ],
      }).ok,
    ).toBe(false);
    expect(
      parseAnswer(config, {
        placements: [
          { itemId: "matahari", targetId: "senja" },
          { itemId: "bulan", targetId: "malam" },
        ],
      }).ok,
    ).toBe(false);
  });
});

describe("evaluateActivity (feedback/result)", () => {
  it("choice: feedback benar/salah sesuai jawaban", () => {
    const config = configOfType("choice") as ChoiceActivityConfig;
    const correct = evaluateActivity(config, { selectedId: "b" });
    expect(correct).toMatchObject({
      checkable: true,
      correct: true,
      feedback: config.feedback?.correct,
    });
    const wrong = evaluateActivity(config, { selectedId: "a" });
    expect(wrong).toMatchObject({ checkable: true, correct: false });
  });

  it("multiple_choice: mencocokkan set jawaban secara tepat", () => {
    const config = configOfType("multiple_choice") as MultipleChoiceActivityConfig;
    expect(correctOf(evaluateActivity(config, { selectedIds: ["a", "c"] }))).toBe(
      true,
    );
    expect(correctOf(evaluateActivity(config, { selectedIds: ["c", "a"] }))).toBe(
      true,
    );
    expect(correctOf(evaluateActivity(config, { selectedIds: ["a"] }))).toBe(
      false,
    );
  });

  it("true_false: benar dan salah", () => {
    const config = configOfType("true_false") as TrueFalseActivityConfig;
    expect(correctOf(evaluateActivity(config, { value: true }))).toBe(true);
    expect(correctOf(evaluateActivity(config, { value: false }))).toBe(false);
  });

  it("text_input: matching case-insensitive", () => {
    const config = configOfType("text_input") as TextInputActivityConfig;
    expect(correctOf(evaluateActivity(config, { text: "BUMI" }))).toBe(true);
    expect(correctOf(evaluateActivity(config, { text: "  Bumi  " }))).toBe(true);
    expect(correctOf(evaluateActivity(config, { text: "mars" }))).toBe(false);
  });

  it("drag_drop: mencocokkan penempatan", () => {
    const config = configOfType("drag_drop") as DragDropActivityConfig;
    const correct = evaluateActivity(config, {
      placements: [
        { itemId: "matahari", targetId: "siang" },
        { itemId: "bulan", targetId: "malam" },
      ],
    });
    expect(correct).toMatchObject({ checkable: true, correct: true });
    const wrong = evaluateActivity(config, {
      placements: [
        { itemId: "matahari", targetId: "malam" },
        { itemId: "bulan", targetId: "siang" },
      ],
    });
    expect(wrong).toMatchObject({ checkable: true, correct: false });
  });

  it("aktivitas tanpa kunci jawaban tidak dapat diperiksa", () => {
    const config: TextInputActivityConfig = {
      key: "test-open",
      sectionNumber: 1,
      type: "text_input",
      title: "Refleksi",
      prompt: "Tulis refleksimu.",
    };
    const result = evaluateActivity(config, { text: "jawaban bebas" });
    expect(result.checkable).toBe(false);
    if (!result.checkable) expect(result.feedback.length).toBeGreaterThan(0);
  });
});

describe("ActivityRenderer (rendering)", () => {
  function escapeHtml(value: string): string {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  it("merender title dan tombol Periksa Jawaban untuk semua tipe", () => {
    for (const config of DEMO_ACTIVITY_CONFIGS) {
      const html = renderToStaticMarkup(<ActivityRenderer config={config} />);
      expect(html).toContain(escapeHtml(config.title));
      expect(html).toContain("Periksa Jawaban");
    }
  });

  it("menampilkan label opsi untuk choice & multiple_choice", () => {
    const choiceHtml = renderToStaticMarkup(
      <ActivityRenderer config={configOfType("choice")} />,
    );
    expect(choiceHtml).toContain("Pilihan A");
    const mcHtml = renderToStaticMarkup(
      <ActivityRenderer config={configOfType("multiple_choice")} />,
    );
    expect(mcHtml).toContain("Pernyataan A");
  });

  it("menampilkan statement dan pilihan Benar/Salah untuk true_false", () => {
    const html = renderToStaticMarkup(
      <ActivityRenderer config={configOfType("true_false")} />,
    );
    expect(html).toContain("Pernyataan contoh");
    expect(html).toContain("Benar");
    expect(html).toContain("Salah");
  });
});

describe("POST /api/answers (penyimpanan)", () => {
  beforeEach(async () => {
    await prisma.answer.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    await prisma.answer.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.student.deleteMany();
    await prisma.$disconnect();
  });

  async function postAnswer(body: unknown) {
    const request = new Request("http://localhost/api/answers", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return POST(request);
  }

  it("menyimpan jawaban dan mengaitkan ke student + section + activity", async () => {
    const student = await createStudent("Dewi");
    const res = await postAnswer({
      studentId: student.id,
      sectionNumber: 1,
      activityKey: "demo-choice",
      answer: { selectedId: "b" },
    });
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.answer.studentId).toBe(student.id);
    expect(body.answer.sectionNumber).toBe(1);
    expect(body.answer.data).toEqual({ selectedId: "b" });
    expect(body.answer.createdAt).toBeTruthy();
    expect(body.result).toMatchObject({ checkable: true, correct: true });

    const activity = await prisma.activity.findUnique({
      where: { sectionNumber_key: { sectionNumber: 1, key: "demo-choice" } },
    });
    expect(activity).not.toBeNull();
    const stored = await prisma.answer.findUnique({
      where: { id: body.answer.id },
    });
    expect(stored?.activityId).toBe(activity?.id);
  });

  it("menolak payload jawaban yang tidak valid", async () => {
    const student = await createStudent("Andi");
    const res = await postAnswer({
      studentId: student.id,
      sectionNumber: 1,
      activityKey: "demo-choice",
      answer: { selectedId: "zzz" },
    });
    expect(res.status).toBe(400);
  });

  it("mengembalikan 404 untuk aktivitas yang tidak dikenal", async () => {
    const student = await createStudent("Andi");
    const res = await postAnswer({
      studentId: student.id,
      sectionNumber: 2,
      activityKey: "tidak-ada",
      answer: { text: "x" },
    });
    expect(res.status).toBe(404);
  });

  it("mengembalikan 404 untuk siswa yang tidak dikenal", async () => {
    const res = await postAnswer({
      studentId: "00000000-0000-4000-8000-000000000000",
      sectionNumber: 1,
      activityKey: "demo-choice",
      answer: { selectedId: "b" },
    });
    expect(res.status).toBe(404);
  });

  it("jawaban antar siswa tidak tercampur", async () => {
    const studentA = await createStudent("Siswa A");
    const studentB = await createStudent("Siswa B");

    await postAnswer({
      studentId: studentA.id,
      sectionNumber: 1,
      activityKey: "demo-choice",
      answer: { selectedId: "b" },
    });
    await postAnswer({
      studentId: studentB.id,
      sectionNumber: 1,
      activityKey: "demo-choice",
      answer: { selectedId: "a" },
    });

    const answersA = await prisma.answer.findMany({
      where: { studentId: studentA.id },
    });
    const answersB = await prisma.answer.findMany({
      where: { studentId: studentB.id },
    });

    expect(answersA).toHaveLength(1);
    expect(answersB).toHaveLength(1);
    expect(answersA[0].data).toEqual({ selectedId: "b" });
    expect(answersB[0].data).toEqual({ selectedId: "a" });
  });

  it("submission berulang menyimpan riwayat baru", async () => {
    const student = await createStudent("Ratna");
    await postAnswer({
      studentId: student.id,
      sectionNumber: 1,
      activityKey: "demo-text-input",
      answer: { text: "bumi" },
    });
    await postAnswer({
      studentId: student.id,
      sectionNumber: 1,
      activityKey: "demo-text-input",
      answer: { text: "mars" },
    });

    const answers = await prisma.answer.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: "asc" },
    });
    expect(answers).toHaveLength(2);
    expect(answers[0].data).toEqual({ text: "bumi" });
    expect(answers[1].data).toEqual({ text: "mars" });
  });
});

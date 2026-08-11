import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/answers/route";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { getActivityConfig } from "@/activity/configs";
import { evaluateActivity, parseAnswer } from "@/activity/evaluate";
import { prisma } from "@/lib/prisma";
import { createStudent } from "@/lib/students";
import { getSectionConfig } from "@/sections/configs";
import type { ActivityConfig, DragDropActivityConfig, MultipleChoiceActivityConfig, TrueFalseActivityConfig } from "@/activity/types";

function configOf(key: string): ActivityConfig {
  const config = getActivityConfig(1, key);
  if (!config) throw new Error(`config ${key} tidak ditemukan`);
  return config;
}

describe("alur konten Bagian 1 (section config)", () => {
  const section = getSectionConfig(1);

  it("Section 1 memiliki struktur lengkap", () => {
    expect(section).not.toBeNull();
    if (!section) return;
    expect(section.steps[0].kind).toBe("introduction");
    expect(section.steps[section.steps.length - 1].kind).toBe("completion");
  });

  it("memuat langkah tujuan, fakta, membandingkan, bangun penjelasan, dan miskonsepsi", () => {
    if (!section) return;
    const titles: string[] = [];
    const activityKeys: string[] = [];
    for (const step of section.steps) {
      if (step.kind === "content") titles.push(step.title);
      if (step.kind === "activity") activityKeys.push(step.activityKey);
    }
    expect(titles).toContain("Apa yang Akan Kamu Pelajari?");
    expect(titles).toContain("Fakta 1: Suhu Bumi");
    expect(titles).toContain("Fakta 3: Peran Gas Rumah Kaca");
    expect(titles).toContain("Membandingkan Dua Kondisi Atmosfer");
    expect(titles).toContain("Bangun Penjelasanmu");
    expect(titles).toContain("Uji Miskonsepsi");
    expect(activityKeys).toContain("s1-fakta2-urutan");
  });

  it("langkah Fakta 1 berisi 4 media dengan sumber", () => {
    if (!section) return;
    const fakta1 = section.steps.find(
      (step) => step.kind === "content" && step.title === "Fakta 1: Suhu Bumi",
    );
    expect(fakta1?.kind).toBe("content");
    if (fakta1?.kind !== "content") return;
    const media = fakta1.media ?? [];
    expect(media).toHaveLength(4);
    for (const item of media) {
      expect(item.type).toBe("image");
      expect(item.src).toMatch(/^\/media\/section1\//);
      expect(item.source).toBeTruthy();
    }
  });

  it("langkah Fakta 3 menyediakan embed video YouTube", () => {
    if (!section) return;
    const fakta3 = section.steps.find(
      (step) => step.kind === "content" && step.title === "Fakta 3: Peran Gas Rumah Kaca",
    );
    expect(fakta3?.kind).toBe("content");
    if (fakta3?.kind !== "content") return;
    const media = fakta3.media?.[0];
    expect(media?.type).toBe("embed");
    expect(media?.src).toContain("youtube.com/embed/jyTUczZaSXg");
  });
});

describe("config aktivitas Bagian 1", () => {
  it("s1-fakta1-fakta: multiple_choice dengan 4 opsi dan kunci A & B", () => {
    const config = configOf("s1-fakta1-fakta") as MultipleChoiceActivityConfig;
    expect(config.type).toBe("multiple_choice");
    expect(config.options).toHaveLength(4);
    expect(config.correctIds).toEqual(["a", "b"]);
    expect(config.feedback?.correct).toBeTruthy();
    expect(config.feedback?.incorrect).toBeTruthy();
  });

  it("s1-fakta2-urutan: drag_drop 4 kartu dengan kunci urutan", () => {
    const config = configOf("s1-fakta2-urutan") as DragDropActivityConfig;
    expect(config.type).toBe("drag_drop");
    expect(config.items).toHaveLength(4);
    expect(config.targets).toHaveLength(4);
    expect(config.correctPlacements).toHaveLength(4);
  });

  it("s1-fakta3-pilih dan s1-banding-* adalah choice dengan kunci", () => {
    expect(configOf("s1-fakta3-pilih").type).toBe("choice");
    const kondisi = configOf("s1-banding-kondisi");
    const alasan = configOf("s1-banding-alasan");
    expect(kondisi.type).toBe("choice");
    expect(alasan.type).toBe("choice");
  });

  it("s1-diagram: drag_drop 6 langkah", () => {
    const config = configOf("s1-diagram") as DragDropActivityConfig;
    expect(config.type).toBe("drag_drop");
    expect(config.items).toHaveLength(6);
    expect(config.correctPlacements).toHaveLength(6);
  });

  it("s1-penjelasan: text_input terbuka (non-checkable)", () => {
    const config = configOf("s1-penjelasan");
    expect(config.type).toBe("text_input");
  });

  it("s1-miskonsepsi: true_false Ya/Tidak dengan kunci Tidak", () => {
    const config = configOf("s1-miskonsepsi") as TrueFalseActivityConfig;
    expect(config.type).toBe("true_false");
    expect(config.labels).toEqual({ positive: "Ya", negative: "Tidak" });
    expect(config.correctValue).toBe(false);
    expect(config.feedback?.incorrect).toContain("gas rumah kaca");
  });
});

describe("evaluasi konten Bagian 1", () => {
  it("s1-fakta1-fakta: A & B benar, selain itu belum tepat", () => {
    const config = configOf("s1-fakta1-fakta");
    const parsed = parseAnswer(config, { selectedIds: ["a", "b"] });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(evaluateActivity(config, parsed.answer)).toMatchObject({
        checkable: true,
        correct: true,
      });
    }
    const wrong = parseAnswer(config, { selectedIds: ["a", "c"] });
    if (wrong.ok) {
      expect(evaluateActivity(config, wrong.answer)).toMatchObject({
        checkable: true,
        correct: false,
      });
    }
  });

  it("s1-miskonsepsi: Tidak (false) benar, Ya salah dengan feedback dokumen", () => {
    const config = configOf("s1-miskonsepsi");
    const ok = evaluateActivity(config, { value: false });
    expect(ok).toMatchObject({ checkable: true, correct: true });
    const wrong = evaluateActivity(config, { value: true });
    expect(wrong).toMatchObject({ checkable: true, correct: false });
    if (wrong.checkable) {
      expect(wrong.feedback).toContain("lapisan ozon");
    }
  });

  it("s1-penjelasan: non-checkable", () => {
    const config = configOf("s1-penjelasan");
    const result = evaluateActivity(config, { text: "penjelasan bebas" });
    expect(result.checkable).toBe(false);
  });

  it("merender label Ya/Tidak pada Uji Miskonsepsi", () => {
    const html = renderToStaticMarkup(
      <ActivityRenderer config={configOf("s1-miskonsepsi")} />,
    );
    expect(html).toContain("Ya");
    expect(html).toContain("Tidak");
    expect(html).toContain("Periksa Jawaban");
  });
});

describe("POST /api/answers untuk aktivitas Bagian 1", () => {
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

  it("menyimpan jawaban s1-miskonsepsi", async () => {
    const student = await createStudent("Dewi");
    const request = new Request("http://localhost/api/answers", {
      method: "POST",
      body: JSON.stringify({
        studentId: student.id,
        sectionNumber: 1,
        activityKey: "s1-miskonsepsi",
        answer: { value: false },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(request);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.answer.sectionNumber).toBe(1);
    expect(body.result).toMatchObject({ checkable: true, correct: true });
  });
});

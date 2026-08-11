import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getActivityConfig } from "@/activity/configs";
import { evaluateActivity, parseAnswer } from "@/activity/evaluate";
import { ContentStepView } from "@/sections/ContentStepView";
import { getSectionConfig, SECTION_CONFIGS } from "@/sections/configs";

describe("template struktur pembelajaran Section 1-4", () => {
  it("setiap bagian memiliki struktur lengkap", () => {
    for (const section of SECTION_CONFIGS) {
      const kinds = section.steps.map((step) => step.kind);
      expect(section.steps[0].kind).toBe("introduction");
      expect(section.steps[section.steps.length - 1].kind).toBe("completion");
      expect(kinds).toContain("content");
      expect(kinds).toContain("activity");
    }
  });

  it("halaman awal berisi judul dan deskripsi placeholder", () => {
    for (const section of SECTION_CONFIGS) {
      const intro = section.steps[0];
      if (intro.kind === "introduction") {
        expect(intro.title).toBe(section.title);
        expect(intro.text).toContain("[Deskripsi");
      }
    }
  });

  it("setiap bagian memiliki langkah tujuan, materi, dan aktivitas", () => {
    for (const section of SECTION_CONFIGS) {
      const titles: string[] = [];
      for (const step of section.steps) {
        if (step.kind === "content") titles.push(step.title);
      }
      expect(titles).toContain("Apa yang Akan Kamu Pelajari?");
      expect(titles).toContain("Materi");
      expect(section.steps.some((step) => step.kind === "activity")).toBe(true);
    }
  });

  it("hanya Bagian 3 yang memiliki slot Diskusi Kelompok", () => {
    for (const section of SECTION_CONFIGS) {
      const hasDiscussion = section.steps.some(
        (step) => step.kind === "content" && step.title === "Diskusi Kelompok",
      );
      expect(hasDiscussion).toBe(section.number === 3);
    }
  });

  it("semua activity key ter-resolve", () => {
    for (const section of SECTION_CONFIGS) {
      for (const step of section.steps) {
        if (step.kind === "activity") {
          expect(
            getActivityConfig(section.number, step.activityKey),
          ).not.toBeNull();
        }
      }
    }
  });

  it("bagian 1-4 memiliki judul dari biz_specs", () => {
    expect(getSectionConfig(1)?.title).toContain("Efek Rumah Kaca");
    expect(getSectionConfig(2)?.title).toContain("Gas Rumah Kaca");
    expect(getSectionConfig(3)?.title).toContain("Dampak Pemanasan Global");
    expect(getSectionConfig(4)?.title).toContain("Mitigasi, Adaptasi");
  });
});

describe("placeholder aktivitas", () => {
  it("placeholder aktivitas non-checkable (tanpa kunci jawaban)", () => {
    const config = getActivityConfig(1, "1-aktivitas");
    if (!config) throw new Error("config placeholder tidak ditemukan");
    expect(config.type).toBe("text_input");

    const parsed = parseAnswer(config, { text: "jawaban placeholder" });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      const result = evaluateActivity(config, parsed.answer);
      expect(result.checkable).toBe(false);
      expect(result.feedback.length).toBeGreaterThan(0);
    }
  });

  it("placeholder aktivitas tersedia untuk semua section", () => {
    for (const number of [1, 2, 3, 4]) {
      expect(getActivityConfig(number, `${number}-aktivitas`)).not.toBeNull();
    }
  });
});

describe("media array di langkah Materi", () => {
  it("langkah Materi berisi slot gambar, grafik, video, dan embed", () => {
    const section = getSectionConfig(1);
    const materi = section?.steps.find(
      (step) => step.kind === "content" && step.title === "Materi",
    );
    expect(materi).toBeTruthy();
    if (materi?.kind === "content") {
      const types = (materi.media ?? []).map((media) => media.type);
      expect(types).toContain("image");
      expect(types).toContain("video");
      expect(types).toContain("embed");
    }
  });

  it("merender placeholder box untuk semua slot media", () => {
    const html = renderToStaticMarkup(
      <ContentStepView
        title="Materi"
        media={[
          { type: "image" },
          { type: "image" },
          { type: "video" },
          { type: "embed" },
        ]}
      />,
    );
    expect(html).toContain("Gambar belum tersedia");
    expect(html).toContain("Video belum tersedia");
    expect(html).toContain("Embed belum tersedia");
  });
});

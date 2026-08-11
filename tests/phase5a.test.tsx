import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { getActivityConfig } from "@/activity/configs";
import type { ChoiceActivityConfig } from "@/activity/types";
import { MediaContent } from "@/components/MediaContent";
import { ContentStepView } from "@/sections/ContentStepView";
import { getSectionConfig } from "@/sections/configs";
import type { MediaContent as MediaContentType } from "@/sections/types";

describe("MediaContent", () => {
  it("menampilkan placeholder saat media tidak ada atau daftar kosong", () => {
    const htmlWithout = renderToStaticMarkup(<MediaContent />);
    expect(htmlWithout).toContain("Media belum tersedia");

    const htmlEmpty = renderToStaticMarkup(<MediaContent media={[]} />);
    expect(htmlEmpty).toContain("Media belum tersedia");
  });

  it("menampilkan placeholder per tipe saat src kosong", () => {
    const html = renderToStaticMarkup(
      <MediaContent media={[{ type: "image" }, { type: "video" }, { type: "embed" }]} />,
    );
    expect(html).toContain("Gambar belum tersedia");
    expect(html).toContain("Video belum tersedia");
    expect(html).toContain("Embed belum tersedia");
  });

  it("merender gambar dengan alt, caption, dan sumber", () => {
    const media: MediaContentType = {
      type: "image",
      src: "/grafik.png",
      alt: "Grafik contoh",
      caption: "Grafik contoh",
      source: "NASA",
    };
    const html = renderToStaticMarkup(<MediaContent media={[media]} />);
    expect(html).toContain("/grafik.png");
    expect(html).toContain("Grafik contoh");
    expect(html).toContain("Sumber: NASA");
  });

  it("merender video dengan kontrol", () => {
    const html = renderToStaticMarkup(
      <MediaContent media={[{ type: "video", src: "/video.mp4" }]} />,
    );
    expect(html).toContain("/video.mp4");
    expect(html).toContain("<video");
    expect(html).toContain("controls");
  });

  it("merender embed sebagai iframe", () => {
    const html = renderToStaticMarkup(
      <MediaContent
        media={[{ type: "embed", src: "https://example.com/embed" }]}
      />,
    );
    expect(html).toContain("<iframe");
    expect(html).toContain("https://example.com/embed");
  });

  it("merender beberapa media sekaligus", () => {
    const html = renderToStaticMarkup(
      <MediaContent
        media={[
          { type: "image", src: "/a.png" },
          { type: "image", src: "/b.png" },
        ]}
      />,
    );
    expect(html).toContain("/a.png");
    expect(html).toContain("/b.png");
  });

  it("tidak menampilkan caption/sumber jika tidak ada", () => {
    const html = renderToStaticMarkup(
      <MediaContent media={[{ type: "image", src: "/a.png" }]} />,
    );
    expect(html).not.toContain("Sumber:");
  });
});

describe("ContentStepView", () => {
  it("merender judul, teks, dan media placeholder", () => {
    const html = renderToStaticMarkup(
      <ContentStepView
        title="Materi"
        text="Konten materi akan ditampilkan di sini."
        media={[{ type: "image" }]}
      />,
    );
    expect(html).toContain("Materi");
    expect(html).toContain("Konten materi akan ditampilkan di sini.");
    expect(html).toContain("Gambar belum tersedia");
  });

  it("mempertahankan baris baru pada teks (whitespace-pre-line)", () => {
    const html = renderToStaticMarkup(<ContentStepView text="Baris satu\nBaris dua" />);
    expect(html).toContain("whitespace-pre-line");
  });
});

describe("ActivityRenderer dengan media", () => {
  it("menampilkan media dalam aktivitas", () => {
    const config: ChoiceActivityConfig = {
      key: "test-media",
      sectionNumber: 1,
      type: "choice",
      title: "Aktivitas dengan media",
      media: [{ type: "image", src: "/media.png", alt: "Media uji" }],
      options: [{ id: "a", label: "Pilihan A" }],
    };
    const html = renderToStaticMarkup(<ActivityRenderer config={config} />);
    expect(html).toContain("/media.png");
    expect(html).toContain("Periksa Jawaban");
  });
});

describe("section configs (framework konten)", () => {
  it("Section 1 memiliki step content dengan title", () => {
    const section = getSectionConfig(1);
    expect(section).not.toBeNull();
    const contentStep = section?.steps.find((step) => step.kind === "content");
    expect(contentStep?.kind).toBe("content");
    if (contentStep?.kind === "content") {
      expect(contentStep.title.length).toBeGreaterThan(0);
    }
  });

  it("activity key pada Section 1 merujuk config yang tersedia", () => {
    const section = getSectionConfig(1);
    for (const step of section?.steps ?? []) {
      if (step.kind === "activity") {
        expect(getActivityConfig(1, step.activityKey)).not.toBeNull();
      }
    }
  });
});

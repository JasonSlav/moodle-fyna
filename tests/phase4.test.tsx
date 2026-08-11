import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/answers/route";
import { getActivityConfig } from "@/activity/configs";
import { getAnswersByStudent } from "@/activity/store";
import { prisma } from "@/lib/prisma";
import { createStudent } from "@/lib/students";
import { getSectionConfig, SECTION_CONFIGS } from "@/sections/configs";

describe("section configs", () => {
  it("memiliki 4 bagian dengan nomor 1-4", () => {
    expect(SECTION_CONFIGS).toHaveLength(4);
    expect(SECTION_CONFIGS.map((config) => config.number)).toEqual([1, 2, 3, 4]);
  });

  it("setiap bagian diawali introduction dan diakhiri completion", () => {
    for (const section of SECTION_CONFIGS) {
      expect(section.steps[0].kind).toBe("introduction");
      expect(section.steps[section.steps.length - 1].kind).toBe("completion");
    }
  });

  it("activity key pada tiap bagian merujuk config yang tersedia", () => {
    for (const section of SECTION_CONFIGS) {
      for (const step of section.steps) {
        if (step.kind === "activity") {
          expect(getActivityConfig(section.number, step.activityKey)).not.toBeNull();
        }
      }
    }
  });

  it("getSectionConfig mengembalikan null untuk nomor di luar 1-4", () => {
    expect(getSectionConfig(5)).toBeNull();
    expect(getSectionConfig(0)).toBeNull();
  });
});

describe("GET /api/answers", () => {
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

  async function getAnswers(query: string) {
    const request = new Request(`http://localhost/api/answers?${query}`);
    return GET(request);
  }

  async function saveAnswer(studentId: string, answer: unknown) {
    const request = new Request("http://localhost/api/answers", {
      method: "POST",
      body: JSON.stringify({
        studentId,
        sectionNumber: 1,
        activityKey: "demo-choice",
        answer,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(request);
    expect(res.status).toBe(201);
  }

  it("mengembalikan jawaban siswa beserta key aktivitas", async () => {
    const student = await createStudent("Dewi");
    await saveAnswer(student.id, { selectedId: "b" });

    const res = await getAnswers(`studentId=${student.id}&sectionNumber=1`);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.answers).toHaveLength(1);
    expect(body.answers[0].activity.key).toBe("demo-choice");
    expect(body.answers[0].data).toEqual({ selectedId: "b" });
    expect(body.answers[0].studentId).toBe(student.id);
  });

  it("memfilter jawaban berdasarkan section", async () => {
    const student = await createStudent("Andi");
    await saveAnswer(student.id, { selectedId: "b" });

    const activity2 = await prisma.activity.create({
      data: { sectionNumber: 2, key: "test-filter" },
    });
    await prisma.answer.create({
      data: {
        studentId: student.id,
        sectionNumber: 2,
        activityId: activity2.id,
        data: { text: "x" },
      },
    });

    const section1 = await getAnswers(`studentId=${student.id}&sectionNumber=1`);
    const body1 = await section1.json();
    expect(body1.answers).toHaveLength(1);
    expect(body1.answers[0].sectionNumber).toBe(1);

    const all = await getAnswers(`studentId=${student.id}`);
    const bodyAll = await all.json();
    expect(bodyAll.answers).toHaveLength(2);
  });

  it("mengembalikan 404 untuk siswa yang tidak dikenal", async () => {
    const res = await getAnswers(
      "studentId=00000000-0000-4000-8000-000000000000&sectionNumber=1",
    );
    expect(res.status).toBe(404);
  });

  it("mengembalikan 400 jika studentId tidak ada", async () => {
    const res = await getAnswers("sectionNumber=1");
    expect(res.status).toBe(400);
  });

  it("mengembalikan 400 untuk nomor section yang tidak valid", async () => {
    const student = await createStudent("Budi");
    const res = await getAnswers(`studentId=${student.id}&sectionNumber=abc`);
    expect(res.status).toBe(400);
  });

  it("store.getAnswersByStudent mengembalikan jawaban dengan relasi activity", async () => {
    const student = await createStudent("Ratna");
    await saveAnswer(student.id, { selectedId: "b" });

    const answers = await getAnswersByStudent(student.id, 1);
    expect(answers).toHaveLength(1);
    expect(answers[0].activity.key).toBe("demo-choice");
  });
});

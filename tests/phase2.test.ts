import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/students/route";
import { GET } from "@/app/api/students/[id]/route";
import { createStudent, getStudentById, validateName } from "@/lib/students";
import { prisma } from "@/lib/prisma";

const TEST_SECTION = 99;

async function postStudent(name: unknown) {
  const request = new Request("http://localhost/api/students", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" },
  });
  return POST(request);
}

async function getStudent(id: string) {
  const request = new Request(`http://localhost/api/students/${id}`);
  return GET(request, { params: Promise.resolve({ id }) });
}

beforeEach(async () => {
  await prisma.answer.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.student.deleteMany();
  await prisma.section.deleteMany({ where: { number: TEST_SECTION } });
});

afterAll(async () => {
  await prisma.answer.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.student.deleteMany();
  await prisma.section.deleteMany({ where: { number: TEST_SECTION } });
  await prisma.$disconnect();
});

describe("validateName", () => {
  it("menerima nama valid dan menghilangkan spasi di tepi", () => {
    const result = validateName("  Budi Santoso  ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.name).toBe("Budi Santoso");
  });

  it("menolak nilai bukan string", () => {
    expect(validateName(undefined).ok).toBe(false);
    expect(validateName(123).ok).toBe(false);
    expect(validateName(null).ok).toBe(false);
  });

  it("menolak nama kosong atau hanya spasi", () => {
    expect(validateName("").ok).toBe(false);
    expect(validateName("   ").ok).toBe(false);
  });

  it("menolak nama melebihi batas panjang", () => {
    expect(validateName("a".repeat(121)).ok).toBe(false);
  });
});

describe("POST /api/students", () => {
  it("membuat student dengan nama ter-trim dan id UUID", async () => {
    const res = await postStudent("  Siti Aminah  ");
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe("Siti Aminah");
    expect(body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(body.createdAt).toBeTruthy();
  });

  it("mengembalikan 400 untuk nama kosong", async () => {
    const res = await postStudent("");
    expect(res.status).toBe(400);
  });

  it("mengembalikan 400 untuk nama hanya spasi", async () => {
    const res = await postStudent("    ");
    expect(res.status).toBe(400);
  });

  it("mengembalikan 400 untuk nama terlalu panjang", async () => {
    const res = await postStudent("a".repeat(121));
    expect(res.status).toBe(400);
  });

  it("mengembalikan 400 untuk body tanpa nama", async () => {
    const res = await postStudent(undefined);
    expect(res.status).toBe(400);
  });
});

describe("GET /api/students/[id]", () => {
  it("mengembalikan student yang sudah dibuat", async () => {
    const created = await createStudent("Andi");
    const res = await getStudent(created.id);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.id).toBe(created.id);
    expect(body.name).toBe("Andi");
  });

  it("mengembalikan 404 untuk id yang tidak dikenal", async () => {
    const res = await getStudent("00000000-0000-4000-8000-000000000000");
    expect(res.status).toBe(404);
  });

  it("identitas konsisten: create lalu get menghasilkan siswa yang sama", async () => {
    const created = await createStudent("Ratna");
    const fetched = await getStudentById(created.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(created.id);
    expect(fetched?.name).toBe("Ratna");
  });
});

describe("Penyimpanan dan isolasi data jawaban", () => {
  it("menyimpan jawaban dan menghubungkan ke siswa, section, dan activity", async () => {
    const student = await createStudent("Dewi");
    await prisma.section.create({ data: { number: TEST_SECTION } });
    const activity = await prisma.activity.create({
      data: { sectionNumber: TEST_SECTION, key: "test-activity" },
    });

    const answer = await prisma.answer.create({
      data: {
        studentId: student.id,
        sectionNumber: TEST_SECTION,
        activityId: activity.id,
        data: { choice: "A" },
      },
    });

    const stored = await prisma.answer.findUnique({ where: { id: answer.id } });
    expect(stored).not.toBeNull();
    expect(stored?.studentId).toBe(student.id);
    expect(stored?.sectionNumber).toBe(TEST_SECTION);
    expect(stored?.activityId).toBe(activity.id);
    expect(stored?.createdAt).toBeTruthy();
    expect(stored?.data).toEqual({ choice: "A" });
  });

  it("jawaban siswa tidak tercampur antar siswa", async () => {
    const studentA = await createStudent("A");
    const studentB = await createStudent("B");
    await prisma.section.create({ data: { number: TEST_SECTION } });
    const activity = await prisma.activity.create({
      data: { sectionNumber: TEST_SECTION, key: "test-activity" },
    });

    await prisma.answer.create({
      data: {
        studentId: studentA.id,
        sectionNumber: TEST_SECTION,
        activityId: activity.id,
        data: { text: "jawaban A" },
      },
    });
    await prisma.answer.create({
      data: {
        studentId: studentB.id,
        sectionNumber: TEST_SECTION,
        activityId: activity.id,
        data: { text: "jawaban B" },
      },
    });

    const answersA = await prisma.answer.findMany({
      where: { studentId: studentA.id },
    });
    const answersB = await prisma.answer.findMany({
      where: { studentId: studentB.id },
    });

    expect(answersA).toHaveLength(1);
    expect(answersB).toHaveLength(1);
    expect(answersA[0].data).toEqual({ text: "jawaban A" });
    expect(answersB[0].data).toEqual({ text: "jawaban B" });
  });

  it("jawaban dapat diambil berdasarkan section dan activity", async () => {
    const student = await createStudent("C");
    await prisma.section.create({ data: { number: TEST_SECTION } });
    const activity = await prisma.activity.create({
      data: { sectionNumber: TEST_SECTION, key: "test-activity" },
    });

    await prisma.answer.create({
      data: {
        studentId: student.id,
        sectionNumber: TEST_SECTION,
        activityId: activity.id,
        data: { value: 7 },
      },
    });

    const bySection = await prisma.answer.findMany({
      where: { sectionNumber: TEST_SECTION },
    });
    const byActivity = await prisma.answer.findMany({
      where: { activityId: activity.id },
    });

    expect(bySection).toHaveLength(1);
    expect(byActivity).toHaveLength(1);
    expect(byActivity[0].studentId).toBe(student.id);
  });
});

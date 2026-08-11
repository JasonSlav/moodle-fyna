import { NextResponse } from "next/server";
import { getActivityConfig } from "@/activity/configs";
import { evaluateActivity, parseAnswer } from "@/activity/evaluate";
import { createAnswer, ensureActivity, getAnswersByStudent } from "@/activity/store";
import { getStudentById } from "@/lib/students";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId");
  const sectionParam = url.searchParams.get("sectionNumber");

  if (typeof studentId !== "string" || studentId.length === 0) {
    return NextResponse.json(
      { error: "Identitas siswa tidak valid." },
      { status: 400 },
    );
  }

  const student = await getStudentById(studentId);
  if (!student) {
    return NextResponse.json(
      { error: "Siswa tidak ditemukan." },
      { status: 404 },
    );
  }

  let sectionNumber: number | undefined;
  if (sectionParam !== null) {
    sectionNumber = Number(sectionParam);
    if (!Number.isInteger(sectionNumber)) {
      return NextResponse.json(
        { error: "Nomor section tidak valid." },
        { status: 400 },
      );
    }
  }

  const answers = await getAnswersByStudent(studentId, sectionNumber);
  return NextResponse.json({ answers });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body tidak valid." },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown> | null;
  const { studentId, sectionNumber, activityKey, answer } = payload ?? {};

  if (typeof sectionNumber !== "number" || !Number.isInteger(sectionNumber)) {
    return NextResponse.json(
      { error: "Nomor section tidak valid." },
      { status: 400 },
    );
  }
  if (typeof activityKey !== "string" || activityKey.length === 0) {
    return NextResponse.json(
      { error: "Aktivitas tidak valid." },
      { status: 400 },
    );
  }
  if (typeof studentId !== "string" || studentId.length === 0) {
    return NextResponse.json(
      { error: "Identitas siswa tidak valid." },
      { status: 400 },
    );
  }

  const config = getActivityConfig(sectionNumber, activityKey);
  if (!config) {
    return NextResponse.json(
      { error: "Aktivitas tidak ditemukan." },
      { status: 404 },
    );
  }

  const parsed = parseAnswer(config, answer);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const student = await getStudentById(studentId);
  if (!student) {
    return NextResponse.json(
      { error: "Siswa tidak ditemukan." },
      { status: 404 },
    );
  }

  const activity = await ensureActivity(sectionNumber, activityKey);
  const stored = await createAnswer({
    studentId,
    sectionNumber,
    activityId: activity.id,
    data: parsed.answer,
  });

  return NextResponse.json(
    { answer: stored, result: evaluateActivity(config, parsed.answer) },
    { status: 201 },
  );
}

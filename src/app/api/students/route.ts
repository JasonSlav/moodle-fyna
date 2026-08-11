import { NextResponse } from "next/server";
import { createStudent, validateName } from "@/lib/students";

export const dynamic = "force-dynamic";

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

  const name = (body as Record<string, unknown> | null)?.name;
  const validation = validateName(name);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const student = await createStudent(validation.name);
  return NextResponse.json(student, { status: 201 });
}

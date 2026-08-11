import { NextResponse } from "next/server";
import { getStudentById } from "@/lib/students";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    return NextResponse.json({ error: "Siswa tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json(student);
}

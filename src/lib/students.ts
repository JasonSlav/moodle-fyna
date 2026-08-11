import { prisma } from "@/lib/prisma";

export const MAX_NAME_LENGTH = 120;

export type NameValidation =
  | { ok: true; name: string }
  | { ok: false; error: string };

export function validateName(value: unknown): NameValidation {
  if (typeof value !== "string") {
    return { ok: false, error: "Nama harus berupa teks." };
  }

  const name = value.trim();

  if (name.length === 0) {
    return { ok: false, error: "Nama tidak boleh kosong." };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return {
      ok: false,
      error: `Nama maksimal ${MAX_NAME_LENGTH} karakter.`,
    };
  }

  return { ok: true, name };
}

export function createStudent(name: string) {
  return prisma.student.create({ data: { name } });
}

export function getStudentById(id: string) {
  return prisma.student.findUnique({ where: { id } });
}

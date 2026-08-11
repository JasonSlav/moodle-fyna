"use client";

import Link from "next/link";
import { useStudent } from "@/hooks/use-student";
import { SECTION_CONFIGS } from "@/sections/configs";

export default function StudentPage() {
  const { loading, student } = useStudent();

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <p className="text-zinc-500">Memuat…</p>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <p className="max-w-md text-zinc-600">
          Kamu perlu mengisi nama terlebih dahulu.{" "}
          <Link href="/" className="font-medium text-zinc-900 underline">
            Buka halaman utama
          </Link>{" "}
          untuk memulai.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 bg-zinc-50 p-6">
      <h1 className="text-xl font-semibold text-zinc-900">
        Pilih Bagian Pembelajaran
      </h1>
      <div className="flex flex-col gap-4">
        {SECTION_CONFIGS.map((section) => (
          <Link
            key={section.number}
            href={`/student/section/${section.number}`}
            className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-400"
          >
            <p className="text-sm font-medium text-zinc-500">
              Bagian {section.number}
            </p>
            <p className="mt-1 font-semibold text-zinc-900">{section.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

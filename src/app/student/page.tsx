"use client";

import Link from "next/link";
import { useStudent } from "@/hooks/use-student";
import { SECTION_CONFIGS } from "@/sections/configs";

export default function StudentPage() {
  const { loading, student } = useStudent();

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-sky p-6">
        <p className="text-navy/60">Memuat…</p>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="flex flex-1 items-center justify-center bg-sky p-6">
        <p className="max-w-md text-navy/70">
          Kamu perlu mengisi nama terlebih dahulu.{" "}
          <Link href="/" className="font-semibold text-navy underline">
            Buka halaman utama
          </Link>{" "}
          untuk memulai.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 bg-sky p-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-navy p-8">
        <span className="inline-flex w-fit items-center rounded-full bg-gold px-4 py-1 text-sm font-bold uppercase tracking-wide text-navy">
          Pilih Bagian
        </span>
        <h1 className="text-3xl font-extrabold text-white">
          Pilih <span className="text-gold">Bagian Pembelajaran</span>
        </h1>
        <p className="text-sm font-medium text-sky-2">
          Mulai dari Bagian 1 dan lanjutkan ke bagian berikutnya.
        </p>
        <Link
          href="/student/section/1"
          className="w-fit rounded-full bg-gold px-8 py-3 text-sm font-bold text-navy shadow-lg transition hover:bg-gold-2"
        >
          Mulai dari Bagian 1
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {SECTION_CONFIGS.map((section) => (
          <Link
            key={section.number}
            href={`/student/section/${section.number}`}
            className="flex items-center gap-4 rounded-3xl border border-sky-2 bg-white p-5 shadow-sm transition hover:border-gold"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-base font-bold text-white">
              {section.number}
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-sm font-bold uppercase tracking-wide text-gold">
                Bagian {section.number}
              </span>
              <span className="font-semibold text-navy">{section.title}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

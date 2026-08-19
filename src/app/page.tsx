"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { HeroIllustration } from "@/components/HeroIllustration";
import { WaveDivider } from "@/components/WaveDivider";
import {
  clearLocalStudentId,
  getLocalStudentId,
  setLocalStudentId,
} from "@/lib/student-identity";

type Student = { id: string; name: string; createdAt: string };

type Status =
  | { state: "loading" }
  | { state: "new" }
  | { state: "ready"; student: Student };

export default function Home() {
  const [status, setStatus] = useState<Status>({ state: "loading" });
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedId = getLocalStudentId();

    const lookup = storedId
      ? fetch(`/api/students/${storedId}`)
          .then((res) => {
            if (res.status === 404) {
              clearLocalStudentId();
              return null;
            }
            if (!res.ok) throw new Error("Gagal memuat data siswa.");
            return res.json() as Promise<Student>;
          })
          .catch(() => null)
      : Promise.resolve(null);

    let cancelled = false;

    lookup.then((student) => {
      if (cancelled) return;
      if (student) setStatus({ state: "ready", student });
      else setStatus({ state: "new" });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "Gagal menyimpan data siswa.");
      return;
    }

    const student = (await res.json()) as Student;
    setLocalStudentId(student.id);
    setStatus({ state: "ready", student });
  }

  return (
    <main className="flex min-h-full flex-1 flex-col md:flex-row">
      <div className="relative hidden w-[45%] items-center justify-center overflow-hidden bg-sky-2 md:flex">
        <div className="dot-grid absolute inset-0 opacity-70" />
        <HeroIllustration />
      </div>

      <div className="relative flex w-full flex-col justify-center overflow-hidden bg-navy px-6 py-14 md:w-[55%] md:px-12">
        <div className="dot-grid absolute right-0 top-0 h-44 w-44 opacity-20" />

        <div className="relative z-10 flex w-full max-w-md flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-gold px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-navy ring-4 ring-white/30">
            IPA SMP
          </span>

          {status.state === "loading" && <p className="text-sky-2">Memuat…</p>}

          {status.state === "new" && (
            <>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Menjelajahi <span className="text-gold">Pemanasan Global</span>
              </h1>
              <p className="text-sm font-medium text-sky-2 md:text-base">
                Media pembelajaran interaktif untuk memahami efek rumah kaca,
                gas rumah kaca, dampaknya bagi lingkungan, serta solusi yang
                bisa kita lakukan.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tulis namamu di sini…"
                  className="w-full rounded-full border-2 border-white/25 bg-white px-5 py-3 text-sm font-medium text-navy outline-none focus:border-gold"
                />
                {error && <p className="text-sm font-medium text-gold-2">{error}</p>}
                <button
                  type="submit"
                  className="w-fit rounded-full bg-gold px-8 py-3 text-sm font-bold text-navy shadow-lg transition hover:bg-gold-2"
                >
                  Mulai
                </button>
              </form>
            </>
          )}

          {status.state === "ready" && (
            <>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Selamat datang kembali,{" "}
                <span className="text-gold">{status.student.name}</span>
              </h1>
              <p className="text-sm font-medium text-sky-2 md:text-base">
                Identitasmu tersimpan dan akan digunakan untuk seluruh bagian
                pembelajaran.
              </p>
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="/student"
                  className="rounded-full bg-gold px-8 py-3 text-sm font-bold text-navy shadow-lg transition hover:bg-gold-2"
                >
                  Mulai
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearLocalStudentId();
                    setName("");
                    setError(null);
                    setStatus({ state: "new" });
                  }}
                  className="text-sm font-medium text-sky-2 underline hover:text-white"
                >
                  Ganti nama
                </button>
              </div>
            </>
          )}
        </div>

        <WaveDivider className="pointer-events-none absolute bottom-0 left-0 h-24 w-full" />
      </div>
    </main>
  );
}

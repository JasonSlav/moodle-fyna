"use client";

import { FormEvent, useEffect, useState } from "react";
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
    <main className="flex flex-1 items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        {status.state === "loading" && <p className="text-zinc-500">Memuat…</p>}

        {status.state === "new" && (
          <>
            <h1 className="text-xl font-semibold text-zinc-900">
              Selamat datang
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Masukkan namamu satu kali untuk mulai menggunakan media
              pembelajaran.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Mulai
              </button>
            </form>
          </>
        )}

        {status.state === "ready" && (
          <>
            <h1 className="text-xl font-semibold text-zinc-900">
              Selamat datang kembali, {status.student.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Identitasmu tersimpan di browser dan akan digunakan untuk seluruh
              bagian pembelajaran.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

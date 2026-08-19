"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { DEMO_ACTIVITY_CONFIGS } from "@/activity/configs";
import { getLocalStudentId } from "@/lib/student-identity";

export default function ActivityDemoPage() {
  const [hasIdentity, setHasIdentity] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const storedId = getLocalStudentId();
    Promise.resolve().then(() => {
      if (!cancelled) setHasIdentity(storedId !== null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (hasIdentity === null) {
    return (
      <main className="flex flex-1 items-center justify-center bg-sky p-6">
        <p className="text-navy/60">Memuat…</p>
      </main>
    );
  }

  if (!hasIdentity) {
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
      <h1 className="text-2xl font-extrabold text-navy">
        Demo <span className="text-gold">Activity Engine</span>
      </h1>
      <p className="text-sm text-navy/70">
        Halaman demo internal untuk menguji semua tipe aktivitas. Konten di sini
        bukan materi pembelajaran asli.
      </p>
      {DEMO_ACTIVITY_CONFIGS.map((config) => (
        <ActivityRenderer
          key={`${config.sectionNumber}-${config.key}`}
          config={config}
        />
      ))}
    </main>
  );
}

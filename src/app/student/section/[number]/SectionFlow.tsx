"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { getActivityConfig } from "@/activity/configs";
import type { ActivityAnswer } from "@/activity/types";
import { useStudent } from "@/hooks/use-student";
import { clearLocalStudentId } from "@/lib/student-identity";
import { SectionMinimap } from "@/components/SectionMinimap";
import { ContentStepView } from "@/sections/ContentStepView";
import { getSectionConfig } from "@/sections/configs";

type SavedAnswer = {
  id: string;
  activity: { key: string } | null;
  data: unknown;
};

export default function SectionFlow({
  sectionNumber,
}: {
  sectionNumber: number;
}) {
  const { loading, student } = useStudent();
  const section = getSectionConfig(sectionNumber);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, SavedAnswer> | null>(
    null,
  );
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [identityLost, setIdentityLost] = useState(false);

  useEffect(() => {
    if (!student) return;

    let cancelled = false;
    fetch(`/api/answers?studentId=${student.id}&sectionNumber=${sectionNumber}`)
      .then((res) => {
        if (res.status === 404) throw new Error("student-not-found");
        if (!res.ok) throw new Error("load-failed");
        return res.json() as Promise<{ answers: SavedAnswer[] }>;
      })
      .then((body) => {
        if (cancelled) return;
        const latest: Record<string, SavedAnswer> = {};
        for (const answer of body.answers) {
          const key = answer.activity?.key;
          if (key) latest[key] = answer;
        }
        setAnswers(latest);
        setSavedKeys(
          Object.fromEntries(
            Object.keys(latest).map((key) => [key, true]),
          ),
        );
        setLoaded(true);
      })
      .catch((error) => {
        if (cancelled) return;
        if (error instanceof Error && error.message === "student-not-found") {
          clearLocalStudentId();
          setIdentityLost(true);
          return;
        }
        setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [student, sectionNumber]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-sky p-6">
        <p className="text-navy/60">Memuat…</p>
      </main>
    );
  }

  if (identityLost || !student) {
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

  if (!section) {
    return (
      <main className="flex flex-1 items-center justify-center bg-sky p-6">
        <div className="max-w-md">
          <h1 className="text-xl font-extrabold text-navy">
            Bagian tidak ditemukan
          </h1>
          <Link href="/student" className="mt-2 inline-block text-sm font-semibold text-navy underline">
            Kembali ke daftar bagian
          </Link>
        </div>
      </main>
    );
  }

  const activitySteps = section.steps.filter(
    (step): step is { kind: "activity"; activityKey: string } =>
      step.kind === "activity",
  );
  const completedCount = activitySteps.filter(
    (step) => savedKeys[step.activityKey],
  ).length;
  const step = section.steps[stepIndex];
  const nextSection = getSectionConfig(section.number + 1);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 bg-sky p-6">
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center rounded-full bg-gold px-3 py-0.5 text-sm font-bold uppercase tracking-wide text-navy">
          Bagian {section.number}
        </span>
        <h1 className="text-2xl font-extrabold text-navy">{section.title}</h1>
        {loaded && activitySteps.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-navy/70">
              Progres: {completedCount} / {activitySteps.length} aktivitas
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-sky-2">
              <div
                className="h-full rounded-full bg-navy"
                style={{
                  width: `${(completedCount / activitySteps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <SectionMinimap steps={section.steps} currentIndex={stepIndex} savedKeys={savedKeys} />

      <div className="rounded-3xl border border-sky-2 bg-white p-6">
        {step.kind === "introduction" && (
          <ContentStepView
            title={step.title ?? `Bagian ${section.number}`}
            text={step.text}
            media={step.media}
          />
        )}

        {step.kind === "content" && (
          <ContentStepView title={step.title} text={step.text} media={step.media} />
        )}

        {step.kind === "activity" && (
          <ActivityStep
            key={`${section.number}-${step.activityKey}`}
            sectionNumber={sectionNumber}
            activityKey={step.activityKey}
            initialAnswer={
              answers?.[step.activityKey]?.data as ActivityAnswer | null
            }
            onSaved={() =>
              setSavedKeys((prev) => ({
                ...prev,
                [step.activityKey]: true,
              }))
            }
          />
        )}

        {step.kind === "completion" && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold text-navy">
              Bagian {section.number} selesai
            </h2>
            <p className="text-sm text-navy/70">
              [Ringkasan pembelajaran akan ditambahkan di sini.]
            </p>
            <p className="text-sm text-navy/70">
              Kamu telah menyelesaikan {completedCount} dari{" "}
              {activitySteps.length} aktivitas di bagian ini.
            </p>
            <div className="flex flex-wrap gap-2">
              {nextSection && (
                <Link
                  href={`/student/section/${nextSection.number}`}
                  className="rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-white hover:bg-navy-2"
                >
                  Lanjut ke Bagian {nextSection.number}
                </Link>
              )}
              <Link
                href="/student"
                className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-bold text-navy hover:bg-sky-2"
              >
                Kembali ke daftar bagian
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStepIndex((i) => i - 1)}
          disabled={stepIndex === 0}
          className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-bold text-navy hover:bg-sky-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sebelumnya
        </button>
        {stepIndex < section.steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStepIndex((i) => i + 1)}
            className="rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-white hover:bg-navy-2"
          >
            Berikutnya
          </button>
        ) : (
          <Link
            href="/student"
            className="rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-white hover:bg-navy-2"
          >
            Selesai
          </Link>
        )}
      </div>
    </main>
  );
}

function ActivityStep({
  sectionNumber,
  activityKey,
  initialAnswer,
  onSaved,
}: {
  sectionNumber: number;
  activityKey: string;
  initialAnswer: ActivityAnswer | null;
  onSaved: () => void;
}) {
  const config = getActivityConfig(sectionNumber, activityKey);

  if (!config) {
    return (
      <p className="text-sm text-zinc-600">
        Konten aktivitas ini belum tersedia.
      </p>
    );
  }

  return (
    <ActivityRenderer config={config} initialAnswer={initialAnswer} onSaved={onSaved} />
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ActivityRenderer } from "@/activity/components/ActivityRenderer";
import { getActivityConfig } from "@/activity/configs";
import type { ActivityAnswer } from "@/activity/types";
import { useStudent } from "@/hooks/use-student";
import { clearLocalStudentId } from "@/lib/student-identity";
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
      <main className="flex flex-1 items-center justify-center p-6">
        <p className="text-zinc-500">Memuat…</p>
      </main>
    );
  }

  if (identityLost || !student) {
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

  if (!section) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-md">
          <h1 className="text-xl font-semibold text-zinc-900">
            Bagian tidak ditemukan
          </h1>
          <Link href="/student" className="mt-2 inline-block text-sm font-medium text-zinc-900 underline">
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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 bg-zinc-50 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-zinc-500">
          Bagian {section.number}
        </p>
        <h1 className="text-xl font-semibold text-zinc-900">{section.title}</h1>
        {loaded && activitySteps.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-600">
              Progres: {completedCount} / {activitySteps.length} aktivitas
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-zinc-900"
                style={{
                  width: `${(completedCount / activitySteps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
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
            <h2 className="text-lg font-semibold text-zinc-900">
              Bagian {section.number} selesai
            </h2>
            <p className="text-sm text-zinc-600">
              [Ringkasan pembelajaran akan ditambahkan di sini.]
            </p>
            <p className="text-sm text-zinc-600">
              Kamu telah menyelesaikan {completedCount} dari{" "}
              {activitySteps.length} aktivitas di bagian ini.
            </p>
            <div className="flex flex-wrap gap-2">
              {nextSection && (
                <Link
                  href={`/student/section/${nextSection.number}`}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
                >
                  Lanjut ke Bagian {nextSection.number}
                </Link>
              )}
              <Link
                href="/student"
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
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
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sebelumnya
        </button>
        {stepIndex < section.steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStepIndex((i) => i + 1)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Berikutnya
          </button>
        ) : (
          <Link
            href="/student"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
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

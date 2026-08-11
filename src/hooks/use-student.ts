"use client";

import { useEffect, useState } from "react";
import { clearLocalStudentId, getLocalStudentId } from "@/lib/student-identity";

type Student = { id: string; name: string; createdAt: string };

export function useStudent() {
  const [state, setState] = useState<{
    loading: boolean;
    student: Student | null;
  }>({ loading: true, student: null });

  useEffect(() => {
    let cancelled = false;
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

    lookup.then((student) => {
      if (cancelled) return;
      setState({ loading: false, student });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

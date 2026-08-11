import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export function ensureActivity(sectionNumber: number, key: string) {
  return prisma.activity.upsert({
    where: { sectionNumber_key: { sectionNumber, key } },
    update: {},
    create: { sectionNumber, key },
  });
}

export function createAnswer(input: {
  studentId: string;
  sectionNumber: number;
  activityId: string;
  data: unknown;
}) {
  return prisma.answer.create({
    data: {
      studentId: input.studentId,
      sectionNumber: input.sectionNumber,
      activityId: input.activityId,
      data: input.data as Prisma.InputJsonValue,
    },
  });
}

export function getAnswersByStudent(studentId: string, sectionNumber?: number) {
  return prisma.answer.findMany({
    where: {
      studentId,
      ...(sectionNumber !== undefined ? { sectionNumber } : {}),
    },
    include: { activity: true },
    orderBy: { createdAt: "asc" },
  });
}

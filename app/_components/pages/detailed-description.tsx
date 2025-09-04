"use client";
import { Status } from "@/src/types/status";

interface DetailedDescriptionProps {
  status: Status | undefined;
  detailedDescription: string | undefined;
}

export function DetailedDescription({
  status,
  detailedDescription,
}: DetailedDescriptionProps) {
  return <main className="mt-2"></main>;
}

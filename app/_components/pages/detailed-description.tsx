"use client";
import { Status } from "@/src/types/status";
import { DetailedDescription as DetailedDescriptionType } from "@/src/types/detailed-description";
interface DetailedDescriptionProps {
  status: Status | undefined;
  detailedDescription: DetailedDescriptionType[] | undefined;
}

export function DetailedDescription({
  status,
  detailedDescription,
}: DetailedDescriptionProps) {
  return <main className="mt-2"></main>;
}

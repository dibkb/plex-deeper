"use client";
import { cn } from "@/lib/utils";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner";
import React from "react";

interface TimelineStepProps {
  title: string;
  description: string;
  isActive: boolean;
  isActiveStep: boolean;
}

export default function TimelineStep({
  title,
  description,
  isActive,
  isActiveStep,
}: TimelineStepProps) {
  return (
    <div className="grid gap-1 text-sm relative">
      {isActiveStep ? (
        <Spinner className="w-5 h-5 absolute left-0 translate-x-[-33.5px] z-10 top-1" />
      ) : (
        <div
          className={cn(
            "aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50",
            !isActive && "opacity-20"
          )}
        />
      )}
      <div
        className={cn(
          "text-lg font-medium text-zinc-600 dark:text-zinc-200",
          !isActive && "opacity-50",
          isActiveStep && "animate-pulse"
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "text-zinc-500 dark:text-zinc-400 text-sm",
          !isActive && "opacity-50"
        )}
      >
        {description}
      </div>
    </div>
  );
}

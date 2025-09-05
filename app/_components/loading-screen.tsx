"use client";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner";

export function LoadingScreen({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <main className="flex items-start gap-2">
      <Spinner />
      <div className="flex flex-col gap-2">
        {" "}
        <h1 className="">{title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      </div>
    </main>
  );
}

import { PendingResponse } from "@/app/api/pending/route";
import { scrapeWebsite } from "@/src/chomre-scrape";
import { Status } from "@/src/types/status";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";

const CONCURRENCY_LIMIT = 3;

const MIN_REFETCH_INTERVAL = 3_000; // 3 s
const MAX_REFETCH_INTERVAL = 60_000; // 60 s

export function useFetchScrape() {
  const client = useQueryClient();

  const inProgressRef = useRef<Set<string>>(new Set());

  const pollingIntervalRef = useRef<number>(MIN_REFETCH_INTERVAL);

  const { data } = useQuery<PendingResponse[]>({
    queryKey: ["pending"],
    queryFn: () =>
      axios.get<PendingResponse[]>("/api/pending").then((r) => r.data),
    refetchInterval: pollingIntervalRef.current,
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      pollingIntervalRef.current = Math.min(
        pollingIntervalRef.current * 2,
        MAX_REFETCH_INTERVAL
      );
      return;
    }

    pollingIntervalRef.current = MIN_REFETCH_INTERVAL;

    const runJob = async (item: PendingResponse) => {
      const { id, searchResults } = item;

      if (inProgressRef.current.has(id)) return;
      inProgressRef.current.add(id);

      try {
        const urls = searchResults.map((r) => r.link).filter(Boolean);
        if (urls.length === 0) return;

        await scrapeWebsite(urls, Status.PENDING_WEB_SCRAPING, id);
        client.invalidateQueries({ queryKey: ["pending"] });
      } catch (err) {
        console.error(`❌ Scrape failed for qid ${item.id}`, err);
      } finally {
        inProgressRef.current.delete(id);
      }
    };

    const availableJobs = data.filter((d) => !inProgressRef.current.has(d.id));
    const jobsSlice = availableJobs.slice(0, CONCURRENCY_LIMIT);

    Promise.allSettled(jobsSlice.map(runJob)).catch((e) => {
      console.error("Unhandled scrape error", e);
    });
  }, [data, client]);
}

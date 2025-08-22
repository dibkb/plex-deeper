"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import type { AutoCompleteResponse } from "@/app/api/auto-complete/route";

export function useAutoComplete(query: string, debounceMs = 400) {
  const debouncedQuery = useDebounce(query, debounceMs);

  return useQuery<AutoCompleteResponse>({
    queryKey: ["auto-complete", debouncedQuery],
    enabled: Boolean(debouncedQuery && debouncedQuery.length > 0),
    queryFn: async () => {
      const { data } = await axios.get<AutoCompleteResponse>(
        `/api/auto-complete`,
        { params: { query: debouncedQuery } }
      );
      return data;
    },
  });
}

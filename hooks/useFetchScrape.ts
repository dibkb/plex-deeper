import { PendingResponse } from "@/app/api/pending/route";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchScrape() {
  const { data, isLoading, error } = useQuery<PendingResponse>({
    queryKey: ["pending"],
    queryFn: () =>
      axios.get<PendingResponse>("/api/pending").then((res) => res.data),
    enabled: true,
    refetchInterval: 1000,
  });
  console.log(data);
}

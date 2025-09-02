"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HistoryResponse } from "../api/history/route";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AppSidebar() {
  const { data, isLoading, error } = useQuery<HistoryResponse[]>({
    queryKey: ["history"],
    queryFn: () =>
      axios<HistoryResponse[]>("/api/history").then((res) => res.data),
    enabled: true,
    refetchInterval: 1000,
  });
  const router = useRouter();
  const { qid } = useParams();
  const historyRender = data?.map((history) => (
    <motion.button
      key={history.id}
      className={cn(
        "cursor-pointer w-full text-left truncate text-sm text-zinc-500 dark:text-zinc-500 px-2 py-1 font-medium rounded-md transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
        qid === history.id && "text-zinc-900 dark:text-zinc-100"
      )}
      onClick={() => {
        router.push(`/query/${history.id}`);
      }}
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      {history.query}
    </motion.button>
  ));
  return (
    <Sidebar className="bg-background">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel className="px-2">Search History</SidebarGroupLabel>
        <SidebarGroup className="">{historyRender}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

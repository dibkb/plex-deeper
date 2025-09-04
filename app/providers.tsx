"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/_components/app-sidebar";
import { useFetchScrape } from "@/hooks/useFetchScrape";
type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <AppProviders>{children}</AppProviders>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

const AppProviders = ({ children }: ProvidersProps) => {
  useFetchScrape();
  return (
    <SidebarProvider>
      <AppSidebar />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarTrigger />
        {children}
        <Toaster />
      </ThemeProvider>
    </SidebarProvider>
  );
};

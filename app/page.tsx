"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoveRightIcon } from "lucide-react";
import { ModeToggle } from "../src/components/theme-toggle";
import { useState } from "react";
import { useAutoComplete } from "../src/hooks/useAutoComplete";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, ArrowUpLeftIcon } from "lucide-react";
export default function Home() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data, isLoading, error } = useAutoComplete(query);

  const handleSubmit = () => {
    chrome.runtime.sendMessage(
      "hllpaboeikojhlocchflcampbcccjjaa",
      {
        type: "SCRAPE_URLS",
        urls: ["https://example.com", "https://news.ycombinator.com"],
      },
      (resp) => {
        console.log(resp);
      }
    );
  };
  return (
    <main className="w-full h-screen">
      <ModeToggle />
      <section className="p-4 flex flex-col gap-6 items-center justify-center h-full">
        <h3 className="text-2xl text-zinc-400">Query X</h3>
        <div className="w-full max-w-2xl relative">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask me anything..."
            className={cn(
              "w-full max-w-2xl h-28 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-zinc-700 focus-visible:border-zinc-600 shadow-none focus-ring-0 placeholder:text-zinc-500 rounded-xl border-[1px] manrope-font !text-base"
            )}
          />
          <Button
            onClick={handleSubmit}
            className="absolute rounded-lg right-3 bottom-3 transition-colors animate-in fade-in-0 duration-300 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 cursor-pointer dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
          >
            <MoveRightIcon className="w-4 h-4 " />
          </Button>
          <AnimatePresence>
            {isFocused && data?.suggestions && data.suggestions.length > 0 ? (
              <motion.div
                key="suggestions-panel"
                initial={{ opacity: 0, scaleY: 0.85 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.85 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-0 right-0 top-[calc(100%+0.3rem)] rounded-xl border border-zinc-300/40 dark:border-zinc-700/40 bg-zinc-100/10 dark:bg-input/30 overflow-hidden"
              >
                <ul className="divide-y dark:divide-zinc-700/20 divide-zinc-300/40">
                  {data.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60 cursor-pointer flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2">
                        <SearchIcon className="w-4 h-4" />
                        {suggestion}
                      </div>
                      <ArrowUpLeftIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

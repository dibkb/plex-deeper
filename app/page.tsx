import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoveRightIcon } from "lucide-react";
import { ModeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <ModeToggle />
      <section className="p-4 flex flex-col gap-6 items-center justify-center h-full">
        <h3 className="text-2xl text-zinc-400">perplex deeper</h3>
        <div className="w-full max-w-2xl relative">
          <Textarea
            placeholder="Ask me anything..."
            className="w-full max-w-2xl h-28 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-zinc-700 focus-visible:border-zinc-600 shadow-none focus-ring-0 placeholder:text-zinc-500 rounded-xl border-[1px] manrope-font !text-base"
          />
          <Button className="absolute rounded-lg right-3 bottom-3 transition-colors animate-in fade-in-0 duration-300 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 cursor-pointer dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
            <MoveRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}

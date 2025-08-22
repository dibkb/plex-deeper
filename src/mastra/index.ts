import { Mastra } from "@mastra/core/mastra";
import { searchEngineAutoCompleteAgent } from "./agents/auto-complete-tool";
export const mastra = new Mastra({
  agents: { searchEngineAutoCompleteAgent },
});
